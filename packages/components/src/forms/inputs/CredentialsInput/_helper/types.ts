import type { KdsIconName } from "../../../../accessories/Icon/types";
import type { KdsInputFieldProps } from "../../types";
import type {
  KdsCredentialsKeyProps,
  KdsCredentialsPasswordProps,
  KdsCredentialsUsernameProps,
  KdsSecretAutocomplete,
} from "../types";

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

export type CredentialsFieldsProps = {
  insideFieldset: boolean;
  groupAriaLabel?: KdsInputFieldProps["ariaLabel"];
  groupAriaLabelledby?: string;
  groupAriaDescribedby?: string;
  showUsername: boolean;
  showPassword: boolean;
  showKey: boolean;
  disabled: boolean;
  preserveSubTextSpace: boolean;
  usernameField: KdsCredentialsUsernameProps;
  passwordField: KdsCredentialsPasswordProps;
  keyField: KdsCredentialsKeyProps;
  usernameInputId: string;
  passwordInputId: string;
  keyInputId: string;
  usernameSubTextId: string;
  passwordSubTextId: string;
  keySubTextId: string;
};

/**
 * Testers
 */
propTypeTester<CredentialsFieldsProps>({
  insideFieldset: true,
  groupAriaLabel: "Credentials",
  groupAriaLabelledby: "credentials-label",
  groupAriaDescribedby: "credentials-help",
  showUsername: true,
  showPassword: true,
  showKey: true,
  disabled: false,
  preserveSubTextSpace: false,
  usernameField: {
    placeholder: "Username",
  },
  passwordField: {
    placeholder: "Password",
  },
  keyField: {
    name: "Key",
  },
  usernameInputId: "credentials-username",
  passwordInputId: "credentials-password",
  keyInputId: "credentials-key",
  usernameSubTextId: "credentials-username-subtext",
  passwordSubTextId: "credentials-password-subtext",
  keySubTextId: "credentials-key-subtext",
});
