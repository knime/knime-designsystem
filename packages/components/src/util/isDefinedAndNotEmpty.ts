import { isDefined } from "@vueuse/core";

/**
 * Checks if a value is defined and not an empty string.
 * @param obj - The object in which to check
 * @param field - The field name to check in the object
 * @returns true if the value is defined and not an empty string
 */
export function isDefinedAndNotEmpty(
  obj: Record<string, unknown>,
  field: string,
): boolean {
  return isDefined(obj[field]) && obj[field] !== "";
}
