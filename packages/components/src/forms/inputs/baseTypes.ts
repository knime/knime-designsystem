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
   * Whether the input is readonly
   */
  readonly?: boolean;
  /**
   * Whether the input is required
   */
  required?: boolean;
  /**
   * Name attribute for the input element
   */
  name?: string;
  /**
   * Autocomplete attribute for the input element
   */
  autocomplete?: string;
};

export type KdsInputFieldProps = KdsFormFieldProps & KdsCommonInputProps;
