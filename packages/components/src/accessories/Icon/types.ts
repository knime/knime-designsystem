import { kdsDataTypeSize, kdsIconSize } from "./enums";

export type KdsIconSize = (typeof kdsIconSize)[keyof typeof kdsIconSize];

export type KdsDataTypeSize =
  (typeof kdsDataTypeSize)[keyof typeof kdsDataTypeSize];

export type { IconName as KdsIconName } from "@knime/kds-styles/img/icons/def";
export type { TypeIconName as KdsTypeIconName } from "@knime/kds-styles/img/type-icons/def";
