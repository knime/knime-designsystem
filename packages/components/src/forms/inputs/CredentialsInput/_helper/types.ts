import type { KdsIconName } from "../../../../accessories/Icon/types";

export type PasswordInputProps = {
  /**
   * ID for the input element.
   */
  id?: string;
  /**
   * Name used for accessibility labels on the input and toggle button.
   */
  fieldName: string;
  /**
   * Placeholder text shown when input is empty.
   */
  placeholder?: string;
  /**
   * Autocomplete value for the input element.
   */
  autocomplete?: string;
  /**
   * Leading icon shown in the input field.
   */
  leadingIcon: KdsIconName;
  /**
   * ID of element that describes this input.
   */
  ariaDescribedby?: string;
  /**
   * Accessible label override for the input.
   */
  ariaLabel?: string;
  /**
   * Whether this input has an error state.
   */
  error?: boolean;
  /**
   * Whether this input is disabled.
   */
  disabled?: boolean;
  /**
   * Whether to show the visibility toggle button.
   */
  showVisibilityToggle?: boolean;
};
