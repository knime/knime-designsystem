import type { KdsListItemAccessory } from "../../_helper/List/ListItemAccessory/types";

export type KdsMultiselectListBoxOption = {
  /** Unique identifier for the option */
  id: string;
  /** Display text shown in the list item */
  text: string;
  /** Optional leading accessory (icon, data type, or color swatch) shown before the text */
  accessory?: KdsListItemAccessory;
  /** Renders the label with emphasis (italic) for special content */
  special?: boolean;
  /** Disables the option in the list */
  disabled?: boolean;
};

export type KdsMultiselectListBoxProps = {
  /** Values shown in the list box */
  possibleValues: KdsMultiselectListBoxOption[];
  /** Whether the list box is disabled */
  disabled?: boolean;
  /** Accessible label for the list box */
  ariaLabel: string;
  /**
   * Controls the visible height of the list. Number of visible items (for others user needs to scroll).
   * 0 means all items are visible.
   */
  size?: number;
};
