import type { KdsListItemAccessory } from "../../_helper/List/ListItemAccessory/types";

export type KdsDropdownOption = {
  id: string;
  text: string;
  /** Optional leading accessory (icon, data type, or color swatch) shown before the text */
  accessory?: KdsListItemAccessory;
  /** Disables the option in the list */
  disabled?: boolean;
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
};
