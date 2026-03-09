import type { KdsFormFieldProps } from "../types";

type KdsCommonInputProps = {
  /**
   * Placeholder text for the input element
   */
  placeholder?: string;
  /**
   * Whether the input is disabled
   */
  disabled?: boolean;
  /**
   * Autocomplete attribute for the input element
   */
  autocomplete?: string;
};

export type KdsInputFieldProps = KdsFormFieldProps & KdsCommonInputProps;
