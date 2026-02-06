export type KdsPatternInputOptions = {
  caseSensitive: boolean;
  excludeMatches: boolean;
  useRegex: boolean;
};

const escapeRegex = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const wildcardToRegexBody = (pattern: string) => {
  // Convert a simple wildcard pattern to a regex body.
  // - `*` => `.*`
  // - `?` => `.`
  // All other characters are escaped.
  let body = "";
  for (const char of pattern) {
    if (char === "*") {
      body += ".*";
      continue;
    }

    if (char === "?") {
      body += ".";
      continue;
    }

    body += escapeRegex(char);
  }

  return body;
};

const regexBodyToWildcard = (regexBody: string) => {
  // Best-effort conversion:
  // - `.*` => `*`
  // - `.`  => `?`
  // - escaped chars -> literal chars
  // If we encounter other regex constructs, we bail out and return undefined.
  let wildcard = "";
  for (let i = 0; i < regexBody.length; i += 1) {
    const char = regexBody[i];

    if (char === "\\") {
      const next = regexBody[i + 1];
      if (next === undefined) {
        return undefined;
      }
      wildcard += next;
      i += 1;
      continue;
    }

    if (char === ".") {
      const next = regexBody[i + 1];
      if (next === "*") {
        wildcard += "*";
        i += 1;
        continue;
      }
      wildcard += "?";
      continue;
    }

    if (/[[\]{}()+^$|]/.test(char)) {
      return undefined;
    }

    wildcard += char;
  }

  return wildcard;
};

const CASE_INSENSITIVE_PREFIX = "(?i:";

const stripOuterGroup = (pattern: string, prefix: string) => {
  const trimmed = pattern.trim();
  if (trimmed.startsWith(prefix) && trimmed.endsWith(")")) {
    return trimmed.slice(prefix.length, -1);
  }
  return trimmed;
};

export const buildRegexFromPatternInput = (
  input: string,
  options: KdsPatternInputOptions,
): string => {
  const body = options.useRegex ? input : wildcardToRegexBody(input);
  const grouped = `(?:${body})`;
  const withCase = options.caseSensitive
    ? grouped
    : `${CASE_INSENSITIVE_PREFIX}${grouped})`;

  if (!options.excludeMatches) {
    return withCase;
  }

  return `^(?!.*${withCase}).*$`;
};

// Removed buildRegExpFromPatternInput: case sensitivity is encoded via the
// optional `(?i:...)` wrapper in the pattern string.

const stripOuterNonCapturingGroup = (pattern: string) =>
  stripOuterGroup(pattern, "(?:");

const stripCaseInsensitiveWrapper = (pattern: string) =>
  stripOuterGroup(pattern, CASE_INSENSITIVE_PREFIX);

const tryParseExcluded = (regex: string): { excludedInner?: string } => {
  // Matches `^(?!.*<inner>).*$` where <inner> is the pattern we emitted.
  const match = regex.trim().match(/^\^\(\?!\.\*([\s\S]*)\)\.\*\$$/);
  if (!match) {
    return {};
  }
  return { excludedInner: match[1] };
};

export const parseRegexToPatternInputValue = (
  regex: string,
  options: Pick<KdsPatternInputOptions, "useRegex" | "excludeMatches"> & {
    caseSensitive?: boolean;
  },
): string => {
  if (regex === "") {
    return "";
  }

  const { excludedInner } = tryParseExcluded(regex);
  const inner = excludedInner === undefined ? regex : excludedInner;

  const withoutCase = options.caseSensitive
    ? inner
    : stripCaseInsensitiveWrapper(inner);

  const body = stripOuterNonCapturingGroup(withoutCase);

  if (options.useRegex) {
    return body;
  }

  const wildcard = regexBodyToWildcard(body);
  return wildcard ?? body;
};
