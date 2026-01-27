import { isDefined } from "@vueuse/core";

/**
 * Checks if a value is defined and not an empty string.
 * @param value - The value to check
 * @returns true if the value is defined and not an empty string
 */
export function isDefinedAndNotEmpty(
  o: Record<string, unknown>,
  field: string,
): boolean {
  return isDefined(o[field]) && o[field] !== "";
}
