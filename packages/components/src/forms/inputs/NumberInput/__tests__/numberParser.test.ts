import { describe, expect, it } from "vitest";

import { createKdsNumberParser } from "../numberParser";

describe("numberParser", () => {
  describe("en-US", () => {
    const parser = createKdsNumberParser({ locale: "en-US", step: 1 });

    it("detects separators", () => {
      expect(parser.decimalSeparator).toBe(".");
      expect(parser.groupSeparator).toBe(",");
    });

    it.each([
      ["", NaN],
      ["   ", NaN],
      ["-", NaN],
      [".", NaN],
      [",", NaN],
      ["foo", NaN],
      ["--1", NaN],
      ["1-", NaN],
    ])("returns NaN for invalid input: '%s'", (input) => {
      const parsed = parser.parseFromInput(input);
      expect(Number.isNaN(parsed)).toBe(true);
    });

    it.each([
      ["0", 0],
      ["-0", -0],
      ["1", 1],
      ["-1", -1],
      ["1.25", 1.25],
      ["-1.25", -1.25],
      ["1,234", 1234],
      ["12,345", 12345],
      ["  12,345  ", 12345],
      ["1 234", 1234],
      ["1\u00A0234", 1234],
      ["1\u202F234", 1234],
      ["1,234,567", 1234567],
      ["12,345,678", 12345678],
      ["1,234,567.89", 1234567.89],
      ["1 234 567", 1234567],
      ["1\u00A0234\u00A0567", 1234567],
      ["1\u202F234\u202F567", 1234567],
      // Some ambiguous inputs are treated as grouping in en-US
      ["1,2,3", 123],
      ["+ 1", 1],
      ["1e3", 1000],
      ["1e-3", 0.001],
      ["-1.2e+3", -1200],
    ])("parses '%s' -> %s", (input, expected) => {
      expect(parser.parseFromInput(input)).toBe(expected);
    });

    it("rejects malformed repeated decimal separators", () => {
      expect(Number.isNaN(parser.parseFromInput("1..2"))).toBe(true);
    });

    it("does not treat ',' as decimal separator in en-US", () => {
      expect(parser.parseFromInput("1,2")).toBe(12);
    });

    it.each([
      [".5", 0.5],
      ["-.5", -0.5],
      ["+.5", 0.5],
      ["1.", 1],
      ["-1.", -1],
    ])("parses common native-like patterns '%s' -> %s", (input, expected) => {
      expect(parser.parseFromInput(input)).toBe(expected);
    });

    it.each([
      ["-.", NaN],
      ["+.", NaN],
      ["..5", NaN],
      ["1..", NaN],
    ])("still rejects malformed decimals '%s'", (input) => {
      expect(Number.isNaN(parser.parseFromInput(input))).toBe(true);
    });
  });

  describe("de-DE", () => {
    const parser = createKdsNumberParser({ locale: "de-DE", step: 1 });

    it("detects separators", () => {
      expect(parser.decimalSeparator).toBe(",");
      // de-DE grouping is usually '.'
      expect(parser.groupSeparator).toBe(".");
    });

    it.each([
      ["", NaN],
      ["   ", NaN],
      ["-", NaN],
      [",", NaN],
      [".", NaN],
      ["foo", NaN],
      ["--1", NaN],
      ["1-", NaN],
      ["1,,2", NaN],
    ])("returns NaN for invalid input: '%s'", (input) => {
      const parsed = parser.parseFromInput(input);
      expect(Number.isNaN(parsed)).toBe(true);
    });

    it.each([
      ["0", 0],
      ["1", 1],
      ["-1", -1],
      ["1,25", 1.25],
      ["-1,25", -1.25],
      ["1.234", 1234],
      ["12.345", 12345],
      ["1.234,56", 1234.56],
      ["  1.234,56  ", 1234.56],
      ["1 234", 1234],
      ["1\u00A0234", 1234],
      ["1\u202F234", 1234],
      ["1.234.567", 1234567],
      ["12.345.678", 12345678],
      ["1.234.567,89", 1234567.89],
      ["1 234 567", 1234567],
      // Ambiguous inputs without locale decimal are treated as grouping
      ["+ 1", 1],
      // With ',' as locale decimal separator, '.' is treated as decimal fallback.
      ["1..2", 1.2],
      ["1e3", 1000],
      ["1e-3", 0.001],
    ])("parses '%s' -> %s", (input, expected) => {
      expect(parser.parseFromInput(input)).toBe(expected);
    });

    it.each([
      [",5", 0.5],
      ["-,5", -0.5],
      ["+,5", 0.5],
      ["1,", 1],
      ["-1,", -1],
    ])("parses common native-like patterns '%s' -> %s", (input, expected) => {
      expect(parser.parseFromInput(input)).toBe(expected);
    });

    it.each([
      ["-,", NaN],
      ["+,", NaN],
      [",,5", NaN],
      ["1,,", NaN],
    ])("still rejects malformed decimals '%s'", (input) => {
      expect(Number.isNaN(parser.parseFromInput(input))).toBe(true);
    });

    it("accepts '.' as a fallback decimal separator when locale uses ','", () => {
      expect(parser.parseFromInput("1.2")).toBe(1.2);
      expect(parser.parseFromInput("-1.2")).toBe(-1.2);
    });

    it("still supports grouping with '.' without decimal part", () => {
      expect(parser.parseFromInput("1.234")).toBe(1234);
    });

    describe("fallback '.' decimal vs grouping depends on expected precision", () => {
      it("treats '.' as grouping for 3-digit groups when step expects 3 decimals", () => {
        const preciseParser = createKdsNumberParser({
          locale: "de-DE",
          step: 0.001,
        });

        // With 3 digits after '.', this should continue to be interpreted as grouping,
        // not as a fallback decimal.
        expect(preciseParser.parseFromInput("1.234")).toBe(1234);

        // But with 1 or 2 digits after '.', it should still be treated as a fallback decimal.
        expect(preciseParser.parseFromInput("1.2")).toBe(1.2);
        expect(preciseParser.parseFromInput("1.23")).toBe(1.23);

        // And invalid repetitions still behave as before.
        expect(preciseParser.parseFromInput("1..2")).toBe(1.2);
      });

      it("continues to accept '.' as fallback decimal for negative values", () => {
        const preciseParser = createKdsNumberParser({
          locale: "de-DE",
          step: 0.001,
        });
        expect(preciseParser.parseFromInput("-1.2")).toBe(-1.2);
        expect(preciseParser.parseFromInput("-1.23")).toBe(-1.23);
      });

      it("does not misinterpret grouping as decimal for very small steps", () => {
        const tinyStepParser = createKdsNumberParser({
          locale: "de-DE",
          step: 0.0000001,
        });

        expect(tinyStepParser.parseFromInput("1.234")).toBe(1234);
        expect(tinyStepParser.parseFromInput("12.345.678")).toBe(12345678);
      });
    });
  });

  describe("fr-FR", () => {
    const parser = createKdsNumberParser({ locale: "fr-FR", step: 1 });

    it("detects decimal separator", () => {
      expect(parser.decimalSeparator).toBe(",");
    });

    it("parses numbers with narrow no-break space grouping", () => {
      // fr-FR commonly uses narrow no-break space (\u202F) as grouping separator
      expect(parser.parseFromInput("1\u202F234")).toBe(1234);
      expect(parser.parseFromInput("1\u202F234,5")).toBe(1234.5);
      expect(parser.parseFromInput("1\u202F234\u202F567")).toBe(1234567);
      expect(parser.parseFromInput("1\u202F234\u202F567,89")).toBe(1234567.89);
    });

    describe("fallback '.' decimal vs grouping depends on expected precision", () => {
      it("continues to treat '.' as fallback decimal since it's not a fr-FR grouping separator", () => {
        const preciseParser = createKdsNumberParser({
          locale: "fr-FR",
          step: 0.001,
        });

        // fr-FR groups with whitespace (often \u202F), so '.' can be unambiguously treated
        // as a decimal fallback even if the fraction has 3 digits.
        expect(preciseParser.parseFromInput("1.234")).toBe(1.234);

        expect(preciseParser.parseFromInput("1.2")).toBe(1.2);
        expect(preciseParser.parseFromInput("1.23")).toBe(1.23);

        // Grouping with whitespace must still work.
        expect(preciseParser.parseFromInput("1\u202F234")).toBe(1234);
        expect(preciseParser.parseFromInput("1\u00A0234")).toBe(1234);
      });

      it("does not misinterpret whitespace grouping as decimal for very small steps", () => {
        const tinyStepParser = createKdsNumberParser({
          locale: "fr-FR",
          step: 0.0000001,
        });

        expect(tinyStepParser.parseFromInput("1\u202F234")).toBe(1234);
        expect(tinyStepParser.parseFromInput("12\u202F345\u202F678")).toBe(
          12345678,
        );
      });
    });
  });

  describe("formatForDisplay", () => {
    it("formats using step precision when the value has fewer decimals", () => {
      const parser = createKdsNumberParser({ locale: "en-US", step: 0.01 });
      expect(parser.formatForDisplay(1)).toBe("1");
      expect(parser.formatForDisplay(1.2)).toBe("1.2");
      expect(parser.formatForDisplay(1.23)).toBe("1.23");
    });

    it("preserves value precision if it has more decimals than step", () => {
      const parser = createKdsNumberParser({ locale: "en-US", step: 0.1 });
      expect(parser.formatForDisplay(1.234)).toBe("1.234");
    });

    it("returns empty string for non-finite values", () => {
      const parser = createKdsNumberParser({ locale: "en-US", step: 1 });
      expect(parser.formatForDisplay(NaN)).toBe("");
      expect(parser.formatForDisplay(Number.POSITIVE_INFINITY)).toBe("");
      expect(parser.formatForDisplay(Number.NEGATIVE_INFINITY)).toBe("");
    });

    it("supports very small steps that stringify to exponential notation", () => {
      const parser = createKdsNumberParser({
        locale: "en-US",
        step: 0.0000001,
      });

      expect(parser.formatForDisplay(0.0000001)).toBe("0.0000001");
      expect(parser.formatForDisplay(1.2e-7)).toBe("0.00000012");
    });
  });

  describe("roundToStep", () => {
    it("rounds using step precision for decimal steps", () => {
      const parser = createKdsNumberParser({ locale: "en-US", step: 0.01 });

      expect(parser.stepFractionDigits).toBe(2);
      expect(parser.roundToStep(1)).toBe(1);
      expect(parser.roundToStep(1.234)).toBe(1.23);
      expect(parser.roundToStep(1.235)).toBe(1.24);
    });

    it("supports steps provided in scientific notation", () => {
      const parser = createKdsNumberParser({ locale: "en-US", step: 1e-3 });

      expect(parser.stepFractionDigits).toBe(3);
      expect(parser.roundToStep(1.2344)).toBe(1.234);
      expect(parser.roundToStep(1.2345)).toBe(1.235);
    });

    it("supports very small scientific-notation steps", () => {
      const parser = createKdsNumberParser({ locale: "en-US", step: 1e-7 });

      expect(parser.stepFractionDigits).toBe(7);
      // Ensure we don't get floating point artifacts.
      expect(parser.roundToStep(0.00000012)).toBe(0.0000001);
      expect(parser.roundToStep(0.00000015)).toBe(0.0000002);
    });

    it("returns NaN for non-finite values", () => {
      const parser = createKdsNumberParser({ locale: "en-US", step: 0.1 });
      expect(Number.isNaN(parser.roundToStep(NaN))).toBe(true);
      expect(Number.isNaN(parser.roundToStep(Number.POSITIVE_INFINITY))).toBe(
        true,
      );
    });
  });
});
