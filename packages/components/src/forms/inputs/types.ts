import type { KdsInputFieldProps } from "./baseTypes";

export type { KdsInputFieldProps } from "./baseTypes";

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

export type { KdsMultiSelectDropdownProps } from "./Dropdown/multiSelectTypes";
export type KdsTextareaProps = KdsInputFieldProps & {
  /**
   * The number of visible text lines.
   */
  rows?: number;
};

export type { KdsDropdownOption, KdsDropdownProps } from "./Dropdown/types";
