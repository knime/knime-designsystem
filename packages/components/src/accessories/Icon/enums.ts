import { iconNames as kdsIconNames } from "@knime/kds-styles/img/icons/def";
import { typeIconNames as kdsTypeIconNames } from "@knime/kds-styles/img/type-icons/def";

export { kdsIconNames, kdsTypeIconNames };

const toEnumKey = (name: string) =>
  name.toUpperCase().replace(/-/g, "_") as Uppercase<typeof name>;

export const kdsIconName = Object.fromEntries(
  kdsIconNames.map((name) => [toEnumKey(name), name] as const),
) as { [K in (typeof kdsIconNames)[number] as Uppercase<K>]: K };

export const kdsTypeIconName = Object.fromEntries(
  kdsTypeIconNames.map((name) => [toEnumKey(name), name] as const),
) as { [K in (typeof kdsTypeIconNames)[number] as Uppercase<K>]: K };

export const kdsIconSize = {
  XSMALL: "xsmall",
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
} as const;

export const kdsIconSizes = Object.values(kdsIconSize);

export const kdsDataTypeSize = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
} as const;

export const kdsDataTypeSizes = Object.values(kdsDataTypeSize);
