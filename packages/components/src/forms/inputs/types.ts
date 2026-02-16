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

type KdsInputFieldProps = KdsFormFieldProps & KdsCommonInputProps;

export type KdsTextInputProps = KdsInputFieldProps;

export type KdsNumberInputProps = KdsInputFieldProps & {
  /**
   * Unit shown next to the input value
   */
  unit?: string;
  /**
   * Minimum allowed value
   */
  min?: number;
  /**
   * Maximum allowed value
   */
  max?: number;
  /**
   * Step size used for +/- buttons and arrow key increments.
   * Must be a positive number greater than 0.
   *
   * Scientific notation (e.g. `1e-3`) is supported.
   */
  step?: number;
};

export type KdsPatternInputProps = KdsInputFieldProps;

export type KdsSearchInputProps = KdsInputFieldProps;

export type KdsTextareaProps = KdsInputFieldProps & {
  /**
   * The number of visible text lines.
   */
  rows?: number;
};
