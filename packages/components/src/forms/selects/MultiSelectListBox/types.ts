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
  /** Applies missing/error styling and prepends "(Missing)". Shows a trash icon as trailing icon. */
  missing?: boolean;
};

export type KdsMultiSelectListBoxProps = {
  /** Values shown in the list box */
  possibleValues: KdsMultiSelectListBoxOption[];
  /** Whether the list box is disabled */
  disabled?: boolean;
  /** Whether to render a resize handle below the list box and allow vertical resizing */
  useResizeHandle?: boolean;
  /** Optional item pinned to the bottom of the list, always visible while scrolling. Interacts like a regular item for selection, keyboard navigation, and drag. */
  bottomValue?: KdsMultiSelectListBoxOption;
} & KdsFormFieldProps;
