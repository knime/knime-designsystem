import type { KdsSubTextProps } from "../types.ts";

type KdsInputLabelProps =
  | {
      /**
       * Visible label text for the input.
       */
      label: string;
      ariaLabel?: never;
    }
  | {
      label?: never;
      /**
       * Accessible label used when no visible label is rendered.
       */
      ariaLabel: string;
    };

type KdsInputProps = {
  /**
   * Id for associating labels and hint/error text.
   */
  id?: string;
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

type KdsInputSubTextProps = Omit<KdsSubTextProps, "id">;

type KdsFormFieldProps = KdsInputLabelProps &
  KdsInputProps &
  KdsInputSubTextProps;

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
