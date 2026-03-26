export type KdsPatternInputOptions = {
  caseSensitive: boolean;
  excludeMatches: boolean;
  useRegex: boolean;
};

const escapeRegex = (value: string) =>
  value.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);

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

export const buildRegexFromPatternInput = (
  input: string,
  options: KdsPatternInputOptions,
): string => {
  const body = options.useRegex ? input : wildcardToRegexBody(input);
  const grouped = `(?:${body})`;
  const withCase = options.caseSensitive ? grouped : `(?i:${grouped})`;

  if (!options.excludeMatches) {
    return withCase;
  }

  return `^(?!.*${withCase}).*$`;
};
