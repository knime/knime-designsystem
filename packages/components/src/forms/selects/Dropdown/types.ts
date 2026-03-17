import type { KdsListItemAccessory } from "../../_helper/List/ListItemAccessory/types";
import type { KdsFormFieldProps } from "../../types";

export type KdsDropdownOptionAccessory = KdsListItemAccessory;

export type KdsDropdownOption = {
  /** Unique identifier for the option */
  id: string;
  /** Display text shown in the list item */
  text: string;
  /** Optional subtext shown below the main label (multiline list item layout) */
  subText?: string;
  /** Renders the label with emphasis (italic) for special content like columns */
  special?: boolean;
  /** Optional leading accessory (icon, data type, or color swatch) shown before the text */
  accessory?: KdsDropdownOptionAccessory;
  /** Disables the option in the list */
  disabled?: boolean;
};

export type KdsDropdownProps = {
  /** Placeholder text for the input element */
  placeholder?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the dropdown list is in loading state */
  loading?: boolean;
  /** Values shown in the dropdown list */
  possibleValues: KdsDropdownOption[];
} & KdsFormFieldProps;

/* ---- Internal types (not re-exported from index.ts) ---- */

export type DropdownContainerProps = {
  /** Text shown when the list is empty (no entries or no search results) */
  emptyText: string;
  /** Whether the list is in loading state */
  loading?: boolean;
  /** Values shown in the dropdown list */
  possibleValues: KdsDropdownOption[];
};

export type BaseDropdownProps = {
  /** Text displayed on the dropdown trigger button */
  text?: string;
  /** Placeholder text shown when no value is selected */
  placeholder: string;
  /** Whether the dropdown is disabled */
  disabled?: boolean;
  /** Whether the dropdown is in an error state */
  error?: boolean;
  /** Whether the current value is missing from the possible values */
  missing?: boolean;
  /** Optional leading accessory displayed on the trigger button */
  accessory?: KdsListItemAccessory;

  /** Forwarded a11y/field attributes from BaseFormFieldWrapper */
  id?: string;
  /** ID of the element labelling this dropdown */
  ariaLabelledby?: string;
  /** ID of the element describing this dropdown */
  ariaDescribedby?: string;
  /** Accessible label for the dropdown */
  ariaLabel?: string;
  /** Whether the dropdown value is invalid */
  ariaInvalid?: boolean;
  /** ID of the associated popover element */
  popoverId?: string;
};
