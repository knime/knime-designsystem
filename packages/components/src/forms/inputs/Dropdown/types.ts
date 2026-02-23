import type { KdsListItemSinglelineAccessory } from "../../../structures";
import type { KdsInputFieldProps } from "../baseTypes";

export type KdsDropdownOption = {
  id: string;
  text: string;
  /** Optional leading accessory (icon, data type, or color swatch) shown before the text */
  accessory?: KdsListItemSinglelineAccessory;
  /** Disables the option in the list */
  disabled?: boolean;
};

export type KdsDropdownProps = KdsInputFieldProps & {
  /** Values shown in the dropdown list */
  possibleValues: KdsDropdownOption[];

  /** Text shown when no entries match the search */
  noEntriesText?: string;
};
