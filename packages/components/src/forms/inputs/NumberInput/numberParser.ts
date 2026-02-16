export type KdsNumberParser = {
  locale: string;
  decimalSeparator: string;
  groupSeparator: string;
  /**
   * Maximum number of fraction digits implied by `step`.
   *
   * Example:
   * - step=1 => 0
   * - step=0.01 => 2
   * - step=1e-7 => 7
   */
  stepFractionDigits: number;
  formatForDisplay: (value: number) => string;
  parseFromInput: (value: string) => number;
  /**
   * Round a number to the nearest step increment.
   * Returns NaN for non-finite values.
   */
  roundToStep: (value: number) => number;
};

const additionalGroupSeparators = [" ", "\u00A0", "\u202F"];
const decimalSeparatorSample = 1.1;
const groupSeparatorSample = 1000.1;

const countFractionDigits = (value: number) => {
  if (!Number.isFinite(value)) {
    return 0;
  }

  // Handle exponential notation (e.g. 1e-7) deterministically.
  // We only care about the number of digits right of the decimal point.
  // Examples:
  //  - 1e-7 => 7
  //  - 1.23e-4 => 6 (0.000123)
  //  - 1e+3 => 0
  const exp = value.toExponential();
  const match = exp.match(/^[-+]?(\d+)(?:\.(\d+))?e([+-]?\d+)$/i);
  if (!match) {
    return 0;
  }

  const fractionDigitsInMantissa = match[2]?.length ?? 0;
  const exponent = Number.parseInt(match[3]!, 10);

  if (exponent >= 0) {
    // Shift decimal point to the right -> no additional fraction digits required.
    return Math.max(0, fractionDigitsInMantissa - exponent);
  }

  // Shift decimal point to the left -> adds (-exponent) fraction digits.
  return fractionDigitsInMantissa + Math.abs(exponent);
};

export const createKdsNumberParser = (params: {
  locale: string;
  step: number;
}): KdsNumberParser => {
  const formatter = new Intl.NumberFormat(params.locale);

  const decimalSeparator =
    formatter
      .formatToParts(decimalSeparatorSample)
      .find((part) => part.type === "decimal")?.value ?? ".";

  const groupSeparator =
    formatter
      .formatToParts(groupSeparatorSample)
      .find((part) => part.type === "group")?.value ?? ",";

  const removeGroupingSeparators = (input: string) =>
    [groupSeparator, ...additionalGroupSeparators].reduce(
      (acc, groupSep) =>
        groupSep.length > 0 ? acc.split(groupSep).join("") : acc,
      input,
    );

  const formattersByMaxDecimals = new Map<number, Intl.NumberFormat>();
  const getFormatterForMaxDecimals = (maxDecimals: number) => {
    const cached = formattersByMaxDecimals.get(maxDecimals);
    if (cached) {
      return cached;
    }

    const created = new Intl.NumberFormat(params.locale, {
      useGrouping: false,
      minimumFractionDigits: 0,
      maximumFractionDigits: maxDecimals,
    });

    formattersByMaxDecimals.set(maxDecimals, created);
    return created;
  };

  const stepFractionDigits = countFractionDigits(params.step);
  const precisionFactor = Number(`1e${stepFractionDigits}`);

  const formatForDisplay = (value: number) => {
    if (!Number.isFinite(value)) {
      return "";
    }

    // Use at least the step's precision, but also preserve the value's own precision.
    // Note: values can also stringify to exponent form, so use the same helper.
    const valueDecimals = countFractionDigits(value);

    const maxDecimals = Math.max(stepFractionDigits, valueDecimals);

    return getFormatterForMaxDecimals(maxDecimals).format(value);
  };

  const roundToStep = (value: number) => {
    if (!Number.isFinite(value)) {
      return NaN;
    }

    const step = params.step;

    if (!Number.isFinite(step) || step <= 0) {
      return value;
    }

    // Avoid floating point artifacts when working with decimal steps.
    // Use a fixed factor derived from stepFractionDigits (handles exponent notation reliably).
    if (!Number.isFinite(precisionFactor) || precisionFactor <= 0) {
      return value;
    }

    const scaledNext = Math.round(value * precisionFactor);
    const scaledStep = Math.round(step * precisionFactor);

    // If step can't be represented at the current precision, don't round.
    if (scaledStep === 0) {
      return value;
    }

    const roundedScaled = Math.round(scaledNext / scaledStep) * scaledStep;
    return roundedScaled / precisionFactor;
  };

  const isValidNormalizedNumber = (normalized: string) =>
    // Accept plain decimals as well as scientific notation.
    // Note: whitespace is removed earlier; we don't accept grouping separators here.
    /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][-+]?\d+)?$/.test(normalized);

  /**
   * Parse a localized number string to a number.
   *
   * Supported input patterns:
   * - Locale decimal separator (e.g. "1,2" in de-DE)
   * - Locale grouping + decimal (e.g. "1.234,56" in de-DE)
   * - Grouped integer without decimal separator (e.g. "1,234" in en-US, "1.234" in de-DE)
   * - "." as a fallback decimal separator when the locale uses "," (common user input)
   */
  const parseFromInput = (value: string) => {
    const trimmed = value.trim();
    if (trimmed.length === 0) {
      return NaN;
    }

    const localeDecimal = decimalSeparator;

    const hasLocaleDecimal =
      localeDecimal.length > 0 && trimmed.includes(localeDecimal);

    // If the locale decimal separator is present, we can safely remove grouping chars.
    if (hasLocaleDecimal) {
      const withoutGrouping = removeGroupingSeparators(trimmed);
      const normalized = withoutGrouping.split(localeDecimal).join(".");
      if (!isValidNormalizedNumber(normalized)) {
        return NaN;
      }
      const parsed = Number.parseFloat(normalized);
      return Number.isFinite(parsed) ? parsed : NaN;
    }

    // No locale decimal separator present.
    //
    // Case A: locale uses ',' as decimal separator (e.g. de-DE). Accept '.' as fallback decimal.
    // While doing so, we still want to support locale grouping separators like '1.234'.
    if (localeDecimal !== "." && trimmed.includes(".")) {
      const lastDotIndex = trimmed.lastIndexOf(".");
      const digitsAfterDot = trimmed.slice(lastDotIndex + 1);

      const looksLikeDecimal =
        digitsAfterDot.length > 0 && digitsAfterDot.length <= 2;

      const normalized = looksLikeDecimal
        ? `${removeGroupingSeparators(trimmed.slice(0, lastDotIndex))}.${removeGroupingSeparators(
            digitsAfterDot,
          )}`
        : removeGroupingSeparators(trimmed);

      if (!isValidNormalizedNumber(normalized)) {
        return NaN;
      }

      const parsed = Number.parseFloat(normalized);
      return Number.isFinite(parsed) ? parsed : NaN;
    }

    // Case B: locale uses '.' as decimal separator (e.g. en-US).
    // Remove grouping separators such as ',' and whitespace, so '1,234' => '1234'.
    // Note: we intentionally do NOT treat ',' as a decimal separator here.
    const normalized = removeGroupingSeparators(trimmed);
    if (!isValidNormalizedNumber(normalized)) {
      return NaN;
    }
    const parsed = Number.parseFloat(normalized);
    return Number.isFinite(parsed) ? parsed : NaN;
  };

  return {
    locale: params.locale,
    decimalSeparator,
    groupSeparator,
    stepFractionDigits,
    formatForDisplay,
    parseFromInput,
    roundToStep,
  };
};
