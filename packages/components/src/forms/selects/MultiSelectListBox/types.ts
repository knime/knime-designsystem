import type { KdsListItemAccessory } from "../../_helper/List/ListItemAccessory/types";
import type { KdsFormFieldProps } from "../../types";

export type KdsMultiSelectListBoxOptionAccessory = KdsListItemAccessory;

export type KdsMultiSelectListBoxOption = {
  /** Unique identifier for the option */
  id: string;
  /** Display text shown in the list item */
  text: string;
  /** Optional leading accessory (icon, data type, or color swatch) shown before the text */
  accessory?: KdsMultiSelectListBoxOptionAccessory;
};

export type KdsMultiSelectListBoxProps = {
  /** Values shown in the list box */
  possibleValues: KdsMultiSelectListBoxOption[];
  /** Whether the list box is disabled */
  disabled?: boolean;
  /**
   * Controls the visible height of the list. Number of visible items (additional items require scrolling).
   * 0 means all items are visible.
   */
  size?: number;
  /** Optional item pinned to the bottom of the list, always visible while scrolling. Interacts like a regular item for selection, keyboard navigation, and drag. */
  bottomValue?: KdsMultiSelectListBoxOption;
} & KdsFormFieldProps;
