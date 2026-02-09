import type { KdsFormFieldProps } from "../types.ts";

export type KdsTextInputProps = KdsFormFieldProps;

export type KdsNumberInputProps = KdsFormFieldProps & {
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
   */
  step?: number;
};

export type KdsPatternInputProps = KdsFormFieldProps;

export type KdsSearchInputProps = KdsFormFieldProps;
