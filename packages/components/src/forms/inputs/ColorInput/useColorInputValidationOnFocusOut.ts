/**
 * Behavior for normalizing hex color input on focus out. It supports the following formats:
 * - 1-digit hex -> repeat up to 6 digits (e.g. #a -> #AAAAAA)
 * - 2-digit hex -> repeat up to 6 digits (e.g. #ab -> #ABABAB)
 * - 3-digit hex -> convert to 6-digit representation (e.g. #abc -> #AABBCC)
 * - 4-digit hex -> convert to 6-digit representation (e.g. #abcd -> #AABBCC); we do not support alpha values for
 *   now, so the last digit is ignored
 * - 5-digit hex -> unsupported, restore last valid hex
 * - 6-digit hex -> normalize to uppercase (e.g. #aabbcc -> #AABBCC) and add missing hash if needed
 *   (e.g. aabbcc -> #AABBCC)
 */

import { type Ref, ref, watch } from "vue";

const HEX_LENGTH_1 = 1;
const HEX_LENGTH_2 = 2;
const HEX_LENGTH_3 = 3;
const HEX_LENGTH_4 = 4;
const HEX_LENGTH_6 = 6;

const normalize = (
  value: string,
  fallbackValue: string,
): string | undefined => {
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return fallbackValue;
  }

  const withoutHash = trimmed.startsWith("#") ? trimmed.slice(1) : trimmed;
  if (!/^[0-9a-fA-F]+$/.test(withoutHash)) {
    return fallbackValue;
  }

  if (withoutHash.length === HEX_LENGTH_1) {
    return `#${withoutHash.repeat(HEX_LENGTH_6)}`.toUpperCase();
  }

  if (withoutHash.length === HEX_LENGTH_2) {
    return `#${withoutHash.repeat(HEX_LENGTH_3)}`.toUpperCase();
  }

  if (
    withoutHash.length === HEX_LENGTH_3 ||
    withoutHash.length === HEX_LENGTH_4
  ) {
    const [r, g, b] = withoutHash;
    return `#${r}${r}${g}${g}${b}${b}`.toUpperCase();
  }
  if (withoutHash.length === HEX_LENGTH_6) {
    return `#${withoutHash}`.toUpperCase();
  }
  return fallbackValue;
};

export const useColorInputValidationOnFocusOut = (modelValue: Ref<string>) => {
  const lastValidHexColor = ref<string>("");

  watch(
    modelValue,
    (value) => {
      const withoutHash = value.startsWith("#") ? value.slice(1) : value;
      if (/^[0-9a-fA-F]{6}$/.test(withoutHash)) {
        lastValidHexColor.value = `#${withoutHash.toUpperCase()}`;
      }
    },
    { immediate: true },
  );

  const handleFocusOut = (event: FocusEvent) => {
    const currentTarget = event.currentTarget;
    if (!(currentTarget instanceof HTMLElement)) {
      return;
    }
    const nextFocusedElement = event.relatedTarget;
    if (
      nextFocusedElement instanceof Node &&
      currentTarget.contains(nextFocusedElement)
    ) {
      return;
    }

    const normalized = normalize(modelValue.value, lastValidHexColor.value);
    if (normalized !== undefined) {
      modelValue.value = normalized;
    }
  };

  return { handleFocusOut };
};
