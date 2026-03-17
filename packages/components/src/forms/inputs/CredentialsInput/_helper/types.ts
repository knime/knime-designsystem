import type { KdsIconName } from "../../../../accessories/Icon/types";
import type { KdsInputFieldProps } from "../../types";
import type { KdsSecretAutocomplete } from "../types";

type PasswordInputBaseProps = Pick<
  KdsInputFieldProps,
  "id" | "placeholder" | "error" | "disabled"
> & {
  /**
   * Autocomplete value for secret inputs.
   */
  autocomplete?: KdsSecretAutocomplete;
  /**
   * Accessible label override for the input.
   */
  ariaLabel?: KdsInputFieldProps["ariaLabel"];
  /**
   * ID of element that describes this input.
   */
  ariaDescribedby?: string;
};

export type PasswordInputProps = PasswordInputBaseProps & {
  /**
   * Name used for accessibility labels on the input and toggle button.
   */
  fieldName: string;
  /**
   * Leading icon shown in the input field.
   */
  leadingIcon: KdsIconName;
  /**
   * Whether to show the visibility toggle button.
   */
  showVisibilityToggle?: boolean;
};
