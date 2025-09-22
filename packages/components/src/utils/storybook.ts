// eslint-disable func-style

/**
 * Generate all combinations of the provided props by providing an array of possible values for each prop, e.g.:
 *
 * @example
 * generateCombinations({
 *   disabled: [false, true],
 *   destructive: [false, true],
 *   label: ["Button", undefined]
 * })
 */

export function generateCombinations(
  props: Record<string, readonly unknown[]>,
): Record<string, unknown>[] {
  const keys = Object.keys(props);

  function helper(
    index: number,
    acc: Record<string, unknown>,
  ): Record<string, unknown>[] {
    if (index === keys.length) {
      return [acc];
    }
    const key = keys[index];
    return props[key].flatMap((value) =>
      helper(index + 1, { ...acc, [key]: value }),
    );
  }

  return helper(0, {});
}
