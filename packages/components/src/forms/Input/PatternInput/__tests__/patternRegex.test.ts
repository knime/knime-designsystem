import { describe, expect, it } from "vitest";

import {
  buildRegexFromPatternInput,
  parseRegexToPatternInputValue,
} from "../patternRegex";

describe("patternRegex", () => {
  const expectParsableRegExp = (pattern: string) => {
    expect(() => new RegExp(pattern)).not.toThrow();
  };

  it("wraps default output in (?i:...) and removes it in case-sensitive mode", () => {
    const insensitive = buildRegexFromPatternInput("a", {
      caseSensitive: false,
      excludeMatches: false,
      useRegex: false,
    });

    const sensitive = buildRegexFromPatternInput("a", {
      caseSensitive: true,
      excludeMatches: false,
      useRegex: false,
    });

    expect(insensitive).toBe("(?i:(?:a))");
    expect(sensitive).toBe("(?:a)");

    expectParsableRegExp(insensitive);
    expectParsableRegExp(sensitive);
  });

  it("parses according to toggles: wildcard + insensitive strips wrapper and converts", () => {
    expect(
      parseRegexToPatternInputValue("(?i:(?:a.*))", {
        useRegex: false,
        excludeMatches: false,
        caseSensitive: false,
      }),
    ).toBe("a*");
  });

  it("parses according to toggles: case-sensitive does not strip wrapper", () => {
    expect(
      parseRegexToPatternInputValue("(?i:(?:a.*))", {
        useRegex: true,
        excludeMatches: false,
        caseSensitive: true,
      }),
    ).toBe("(?i:(?:a.*))");
  });

  it("always emits modelValue that can be compiled via RegExp", () => {
    const emitted = [
      buildRegexFromPatternInput("a", {
        caseSensitive: false,
        excludeMatches: false,
        useRegex: false,
      }),
      buildRegexFromPatternInput("a*", {
        caseSensitive: false,
        excludeMatches: false,
        useRegex: false,
      }),
      buildRegexFromPatternInput("a?b", {
        caseSensitive: false,
        excludeMatches: true,
        useRegex: false,
      }),
      buildRegexFromPatternInput("^foo(bar)+$", {
        caseSensitive: true,
        excludeMatches: false,
        useRegex: true,
      }),
    ];

    for (const value of emitted) {
      expectParsableRegExp(value);
    }
  });

  it("returns an empty string for empty modelValue", () => {
    expect(
      parseRegexToPatternInputValue("", {
        useRegex: false,
        excludeMatches: false,
        caseSensitive: false,
      }),
    ).toBe("");
  });

  it("case-insensitive wrapper makes matching insensitive without flags", () => {
    const source = buildRegexFromPatternInput("a", {
      caseSensitive: false,
      excludeMatches: false,
      useRegex: false,
    });

    expect(new RegExp(source).test("A")).toBe(true);

    const sensitive = buildRegexFromPatternInput("a", {
      caseSensitive: true,
      excludeMatches: false,
      useRegex: false,
    });

    expect(new RegExp(sensitive).test("A")).toBe(false);
  });
});
