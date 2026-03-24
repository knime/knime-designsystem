import type { KdsListItemAccessory } from "../../_helper/List/ListItemAccessory/types";

export type KdsMultiselectListBoxOption = {
  /** Unique identifier for the option */
  id: string;
  /** Display text shown in the list item */
  text: string;
  /** Optional leading accessory (icon, data type, or color swatch) shown before the text */
  accessory?: KdsListItemAccessory;
};

export type KdsMultiselectListBoxProps = {
  /** Values shown in the list box */
  possibleValues: KdsMultiselectListBoxOption[];
  /** Whether the list box is disabled */
  disabled?: boolean;
  /** Accessible label for the list box */
  ariaLabel: string;
  /**
   * Controls the visible height of the list. Number of visible items (additional items require scrolling).
   * 0 means all items are visible.
   */
  size?: number;
  /** Optional item pinned to the bottom of the list, always visible while scrolling. Interacts like a regular item for selection, keyboard navigation, and drag. */
  bottomValue?: KdsMultiselectListBoxOption;
};
