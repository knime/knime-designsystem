import type { KdsIconName } from "../../Icon/types";

export type KdsBaseInputProps = {
  /**
   * The value of the input field
   */
  modelValue: string;
  /**
   * The type of input field
   */
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
  /**
   * Placeholder text when input is empty
   */
  placeholder?: string;
  /**
   * ID for the input element. If not provided, a unique ID will be generated.
   */
  id?: string;
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
   * Icon displayed at the start of the input
   */
  leadingIcon?: KdsIconName;
  /**
   * Icon displayed at the end of the input
   */
  trailingIcon?: KdsIconName;
  /**
   * Whether the input has an error state
   */
  error?: boolean;
  /**
   * Whether the input is in a validating state (shows loading indicator)
   */
  validating?: boolean;
  /**
   * Accessible label for screen readers when no visible label is present
   */
  ariaLabel?: string;
  /**
   * ID of element that labels this input (for aria-labelledby)
   */
  ariaLabelledby?: string;
  /**
   * ID of element that describes this input (for aria-describedby)
   */
  ariaDescribedby?: string;
  /**
   * Name attribute for the input element
   */
  name?: string;
  /**
   * Autocomplete attribute for the input element
   */
  autocomplete?: string;
};

export type KdsBaseInputEmits = {
  "update:modelValue": [value: string];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
  input: [value: string];
  keydown: [event: KeyboardEvent];
};

export type KdsTextInputProps = {
  /**
   * The value of the text input
   */
  modelValue: string;
  /**
   * Label text displayed above the input
   */
  label?: string;
  /**
   * Helper text or error message displayed below the input
   */
  subText?: string;
  /**
   * Placeholder text when input is empty
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
   * Icon displayed at the start of the input
   */
  leadingIcon?: KdsIconName;
  /**
   * Icon displayed at the end of the input
   */
  trailingIcon?: KdsIconName;
  /**
   * Whether the input has an error state
   */
  error?: boolean;
  /**
   * Whether the input is in a validating state (shows loading indicator)
   */
  validating?: boolean;
  /**
   * Name attribute for the input element
   */
  name?: string;
  /**
   * Autocomplete attribute for the input element
   */
  autocomplete?: string;
  /**
   * Reserve space for subtext to prevent layout shifts
   */
  preserveSubTextSpace?: boolean;
};

export type KdsTextInputEmits = {
  "update:modelValue": [value: string];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
  input: [value: string];
  keydown: [event: KeyboardEvent];
};
