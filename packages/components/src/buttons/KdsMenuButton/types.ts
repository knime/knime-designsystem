import type { KdsIconName } from "../../accessories";
import type {
  KdsAvatarAccessory,
  KdsIconAccessory,
  KdsLiveStatusAccessory,
} from "../../forms/_helper/List/ListItemAccessory/types";
import type { KdsToggleButtonProps } from "../KdsToggleButton";

import type { kdsMenuButtonPopoverPlacement } from "./enums";

export type KdsMenuButtonPopoverPlacement =
  (typeof kdsMenuButtonPopoverPlacement)[keyof typeof kdsMenuButtonPopoverPlacement];

type KdsMenuItemAccessory =
  | KdsIconAccessory
  | KdsLiveStatusAccessory
  | KdsAvatarAccessory;

export type KdsMenuItem = {
  id: string;
  text: string;
  /** Optional subtext shown below the main label (multiline list item layout) */
  subText?: string;
  /** Renders the item as selected */
  selected?: boolean;
  /** Optional leading accessory (icon, data type, or color swatch) shown before the text */
  accessory?: KdsMenuItemAccessory;
  /** Disables the option in the list */
  disabled?: boolean;
  /**
   * When true, the item is rendered as a non-selectable section headline
   * (styled as a section title row). Section headline items are skipped
   * during keyboard navigation and cannot be clicked.
   */
  sectionHeadline?: boolean;
  /** Optional leading icon shown before a section headline */
  sectionHeadlineIcon?: KdsIconName;
  /** Show a separator below the item if it's not the last in the list */
  separator?: boolean;
};

export type KdsMenuButtonProps = KdsToggleButtonProps & {
  items: KdsMenuItem[];
  placement?: KdsMenuButtonPopoverPlacement;
};
