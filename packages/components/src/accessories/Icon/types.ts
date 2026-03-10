import type { IconName } from "@knime/kds-styles/img/icons/def";
import type { TypeIconName } from "@knime/kds-styles/img/type-icons/def";

import type { TypeId } from "./IdToIconNameMapping";
import { kdsDataTypeSize, kdsIconSize } from "./enums";

export type KdsIconName = IconName;

export type KdsIconSize = (typeof kdsIconSize)[keyof typeof kdsIconSize];

export type KdsTypeIconName = TypeIconName;

export type KdsDataTypeSize =
  (typeof kdsDataTypeSize)[keyof typeof kdsDataTypeSize];

export type KdsIconProps = {
  /**
   * Name of the icon to display from the KDS icon set.
   */
  name: KdsIconName;

  /**
   * Size of the icon.
   */
  size?: KdsIconSize;

  /**
   * When true, renders the icon in a disabled/greyed-out style
   * using the `kds.color.text-and-icon.disabled` token instead of
   * inheriting the parent text color.
   */
  disabled?: boolean;
};

export type KdsDataTypeProps = {
  /**
   * Name of the data type icon, a TypeId, or a custom string.
   * Falls back to "unknown-datatype" if unrecognised.
   */
  iconName?: KdsTypeIconName | TypeId | string;

  /**
   * Tooltip / title text for the data type icon.
   */
  iconTitle?: string;

  /**
   * Size of the data type icon container.
   */
  size?: KdsDataTypeSize;

  /**
   * When true, renders the data type icon in a disabled/greyed-out style.
   */
  disabled?: boolean;
};
