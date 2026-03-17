import { describe, expect, it } from "vitest";

import {
  formatDateToString,
  parseDateString,
  tryParseAnyDate,
} from "../dateUtils";

describe("dateUtils", () => {
  describe("tryParseAnyDate", () => {
    describe("valid inputs", () => {
      it("parses strict yyyy-MM-dd format", () => {
        const date = tryParseAnyDate("2026-03-11");
        expect(date).not.toBeNull();
        expect(date?.getFullYear()).toBe(2026);
        expect(date?.getMonth()).toBe(2);
        expect(date?.getDate()).toBe(11);
      });

      it("parses yyyy-M-d format (single-digit month/day)", () => {
        const date = tryParseAnyDate("2026-3-5");
        expect(date).not.toBeNull();
        expect(date?.getFullYear()).toBe(2026);
        expect(date?.getMonth()).toBe(2);
        expect(date?.getDate()).toBe(5);
      });

      it("parses natural language date strings", () => {
        const date = tryParseAnyDate("March 11, 2026");
        expect(date).not.toBeNull();
        expect(date?.getMonth()).toBe(2);
        expect(date?.getDate()).toBe(11);
      });

      it("parses ISO date strings with time", () => {
        const date = tryParseAnyDate("2026-03-11T10:30:00");
        expect(date).not.toBeNull();
      });

      it("parses short date formats", () => {
        const date = tryParseAnyDate("3/11/2026");
        expect(date).not.toBeNull();
      });
    });

    describe("invalid inputs", () => {
      it("returns null for invalid date strings", () => {
        expect(tryParseAnyDate("not-a-date")).toBeNull();
      });

      it("returns null for empty string", () => {
        expect(tryParseAnyDate("")).toBeNull();
      });

      it("returns null for whitespace-only string", () => {
        expect(tryParseAnyDate("   ")).toBeNull();
      });

      it("accepts numerically valid but semantically invalid dates (rollover happens)", () => {
        // tryParseAnyDate is lenient and allows Date constructor rollover
        // Month 13, day 45 rolls over to next year
        const date = tryParseAnyDate("2026-13-45");
        expect(date).not.toBeNull();
        expect(date?.getFullYear()).toBe(2027); // Rolled over
      });
    });

    describe("edge cases", () => {
      it("handles leap year dates", () => {
        const date = tryParseAnyDate("2024-02-29");
        expect(date).not.toBeNull();
        expect(date?.getMonth()).toBe(1);
        expect(date?.getDate()).toBe(29);
      });

      it("handles year boundaries", () => {
        const date = tryParseAnyDate("2026-01-01");
        expect(date?.getMonth()).toBe(0);
        expect(date?.getDate()).toBe(1);
      });

      it("handles end of year", () => {
        const date = tryParseAnyDate("2026-12-31");
        expect(date?.getMonth()).toBe(11);
        expect(date?.getDate()).toBe(31);
      });
    });
  });

  describe("parseDateString", () => {
    describe("valid strict format", () => {
      it("parses yyyy-MM-dd format correctly", () => {
        const date = parseDateString("2026-03-11");
        expect(date).not.toBeNull();
        expect(date?.getFullYear()).toBe(2026);
        expect(date?.getMonth()).toBe(2);
        expect(date?.getDate()).toBe(11);
      });

      it("parses with leading zeros", () => {
        const date = parseDateString("2026-01-05");
        expect(date).not.toBeNull();
        expect(date?.getFullYear()).toBe(2026);
        expect(date?.getMonth()).toBe(0);
        expect(date?.getDate()).toBe(5);
      });

      it("handles leap year date", () => {
        const date = parseDateString("2024-02-29");
        expect(date).not.toBeNull();
        expect(date?.getMonth()).toBe(1);
        expect(date?.getDate()).toBe(29);
      });

      it("handles December 31st", () => {
        const date = parseDateString("2026-12-31");
        expect(date).not.toBeNull();
        expect(date?.getMonth()).toBe(11);
        expect(date?.getDate()).toBe(31);
      });
    });

    describe("format validation", () => {
      it("returns null for single-digit month", () => {
        expect(parseDateString("2026-3-11")).toBeNull();
      });

      it("returns null for single-digit day", () => {
        expect(parseDateString("2026-03-5")).toBeNull();
      });

      it("returns null for three-digit year", () => {
        expect(parseDateString("026-03-11")).toBeNull();
      });

      it("returns null for five-digit year", () => {
        expect(parseDateString("20260-03-11")).toBeNull();
      });

      it("returns null for missing separators", () => {
        expect(parseDateString("20260311")).toBeNull();
      });

      it("returns null for wrong separator", () => {
        expect(parseDateString("2026/03/11")).toBeNull();
      });

      it("returns null for trailing characters", () => {
        expect(parseDateString("2026-03-11T00:00:00")).toBeNull();
      });

      it("returns null for leading characters", () => {
        expect(parseDateString("x2026-03-11")).toBeNull();
      });
    });

    describe("date rollover validation", () => {
      it("returns null for invalid day in month (February 30)", () => {
        expect(parseDateString("2026-02-30")).toBeNull();
      });

      it("returns null for February 29 in non-leap year", () => {
        expect(parseDateString("2026-02-29")).toBeNull();
      });

      it("returns null for day 32 in January", () => {
        expect(parseDateString("2026-01-32")).toBeNull();
      });

      it("returns null for day 31 in April (30-day month)", () => {
        expect(parseDateString("2026-04-31")).toBeNull();
      });

      it("returns null for month 13", () => {
        expect(parseDateString("2026-13-01")).toBeNull();
      });

      it("returns null for month 00", () => {
        expect(parseDateString("2026-00-15")).toBeNull();
      });

      it("returns null for day 00", () => {
        expect(parseDateString("2026-03-00")).toBeNull();
      });
    });

    describe("empty and null inputs", () => {
      it("returns null for empty string", () => {
        expect(parseDateString("")).toBeNull();
      });
    });
  });

  describe("formatDateToString", () => {
    describe("date object input", () => {
      it("formats Date to yyyy-MM-dd", () => {
        const date = new Date(2026, 2, 11);
        expect(formatDateToString(date)).toBe("2026-03-11");
      });

      it("pads single-digit months with leading zero", () => {
        const date = new Date(2026, 0, 15);
        expect(formatDateToString(date)).toBe("2026-01-15");
      });

      it("pads single-digit days with leading zero", () => {
        const date = new Date(2026, 2, 5);
        expect(formatDateToString(date)).toBe("2026-03-05");
      });

      it("handles December", () => {
        const date = new Date(2026, 11, 31);
        expect(formatDateToString(date)).toBe("2026-12-31");
      });

      it("handles January 1st", () => {
        const date = new Date(2026, 0, 1);
        expect(formatDateToString(date)).toBe("2026-01-01");
      });

      it("handles leap year date", () => {
        const date = new Date(2024, 1, 29);
        expect(formatDateToString(date)).toBe("2024-02-29");
      });
    });

    describe("string input", () => {
      it("parses and re-formats valid date string", () => {
        expect(formatDateToString("2026-03-11")).toBe("2026-03-11");
      });

      it("normalizes natural language date", () => {
        const result = formatDateToString("March 11, 2026");
        expect(result).toBe("2026-03-11");
      });
    });

    describe("null and empty inputs", () => {
      it("returns empty string for null", () => {
        expect(formatDateToString(null)).toBe("");
      });

      it("returns empty string for empty string", () => {
        expect(formatDateToString("")).toBe("");
      });
    });

    describe("edge cases", () => {
      it("handles dates with large years", () => {
        const date = new Date(9999, 11, 31);
        expect(formatDateToString(date)).toBe("9999-12-31");
      });

      it("handles dates with year 1000", () => {
        const date = new Date(1000, 0, 1);
        expect(formatDateToString(date)).toBe("1000-01-01");
      });
    });
  });

  describe("round-trip conversions", () => {
    it("parseDateString → formatDateToString preserves valid date", () => {
      const input = "2026-03-11";
      const parsed = parseDateString(input);
      const formatted = formatDateToString(parsed);
      expect(formatted).toBe(input);
    });

    it("tryParseAnyDate → formatDateToString normalizes format", () => {
      const parsed = tryParseAnyDate("March 11, 2026");
      const formatted = formatDateToString(parsed);
      expect(formatted).toBe("2026-03-11");
    });

    it("formatDateToString → parseDateString creates identical date", () => {
      const original = new Date(2026, 2, 11);
      const formatted = formatDateToString(original);
      const parsed = parseDateString(formatted);

      expect(parsed?.getFullYear()).toBe(original.getFullYear());
      expect(parsed?.getMonth()).toBe(original.getMonth());
      expect(parsed?.getDate()).toBe(original.getDate());
    });
  });
});
