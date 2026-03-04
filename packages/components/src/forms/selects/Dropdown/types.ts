import type { KdsListItemAccessory } from "../../_helper/List/ListItemAccessory/types";
import type { KdsFormFieldProps } from "../../types";

export type KdsDropdownOption = {
  id: string;
  text: string;
  /** Optional subtext shown below the main label (multiline list item layout) */
  subText?: string;
  /** Renders the label with emphasis (italic) for special content like columns */
  special?: boolean;
  /** Optional leading accessory (icon, data type, or color swatch) shown before the text */
  accessory?: KdsListItemAccessory;
  /** Disables the option in the list */
  disabled?: boolean;
  /** Shows the option as selected in the list */
};

export type KdsDropdownProps = {
  /** Placeholder text for the input element */
  placeholder?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is readonly */
  readonly?: boolean;
  /** Whether the input is required */
  required?: boolean;
  /** Values shown in the dropdown list */
  possibleValues: KdsDropdownOption[];
  /** Text shown when no entries match the search */
  noEntriesText?: string;
} & KdsFormFieldProps;
