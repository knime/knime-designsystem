import type { KdsInputFieldProps } from "../types";

export type KdsCredentialsInputValue = {
  /**
   * Username value.
   */
  username: string;
  /**
   * Password value.
   */
  password: string;
  /**
   * Key value.
   */
  key: string;
};

type KdsCredentialsVisibilityProps =
  | {
      showUsername?: true;
      showPassword?: boolean;
      showKey?: boolean;
    }
  | {
      showUsername?: boolean;
      showPassword?: true;
      showKey?: boolean;
    }
  | {
      showUsername?: boolean;
      showPassword?: boolean;
      showKey?: true;
    };

export type KdsCredentialsInputProps = {
  /**
   * ID of element that labels this credentials input.
   */
  ariaLabelledby?: string;
  /**
   * ID of element that describes this credentials input.
   */
  ariaDescribedby?: string;
  /**
   * ID of element that describes the username input.
   */
  usernameAriaDescribedby?: string;
  /**
   * ID of element that describes the password input.
   */
  passwordAriaDescribedby?: string;
  /**
   * ID of element that describes the key input.
   */
  keyAriaDescribedby?: string;
  /**
   * Placeholder for the username field.
   */
  usernamePlaceholder?: string;
  /**
   * Placeholder for the password field.
   */
  passwordPlaceholder?: string;
  /**
   * Placeholder for the key field.
   */
  keyPlaceholder?: string;
  /**
   * Accessible/display name of the key field used for aria labels and toggle text.
   */
  keyName?: string;
  /**
   * Autocomplete value for the username field.
   */
  usernameAutocomplete?: string;
  /**
   * Autocomplete value for the password field.
   */
  passwordAutocomplete?: string;
  /**
   * Autocomplete value for the key field.
   */
  keyAutocomplete?: string;
  /**
   * Subtext shown below username.
   */
  usernameSubText?: string;
  /**
   * Subtext shown below password.
   */
  passwordSubText?: string;
  /**
   * Subtext shown below key.
   */
  keySubText?: string;
  /**
   * Error state for username.
   */
  usernameError?: boolean;
  /**
   * Error state for password.
   */
  passwordError?: boolean;
  /**
   * Error state for key.
   */
  keyError?: boolean;
  /**
   * Validating state for username.
   */
  usernameValidating?: boolean;
  /**
   * Validating state for password.
   */
  passwordValidating?: boolean;
  /**
   * Validating state for key.
   */
  keyValidating?: boolean;
  /**
   * Reserve subtext space to avoid layout shifts.
   */
  preserveSubTextSpace?: boolean;
  /**
   * Whether to show the visibility toggle on secret fields.
   */
  showVisibilityToggle?: boolean;
} & Pick<KdsInputFieldProps, "id" | "label" | "ariaLabel" | "disabled"> &
  KdsCredentialsVisibilityProps;

/**
 * Testers
 */
propTypeTester<KdsCredentialsInputProps>({
  id: "credentials-group",
  ariaLabel: "Credentials",
  ariaDescribedby: "credentials-help",
  keyName: "API token",
  showUsername: true,
  showPassword: true,
  showKey: true,
  disabled: false,
});

// @ts-expect-error - at least one field must be enabled
propTypeTester<KdsCredentialsInputProps>({
  showUsername: false,
  showPassword: false,
  showKey: false,
});
