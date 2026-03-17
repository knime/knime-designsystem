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
   * Visible group label rendered as legend.
   */
  label?: string;
  /**
   * Accessible label for the fieldset when no visible label is rendered.
   */
  ariaLabel?: string;
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
   * Whether all fields are disabled.
   */
  disabled?: boolean;
  /**
   * Whether to show the visibility toggle on secret fields.
   */
  showVisibilityToggle?: boolean;
} & KdsCredentialsVisibilityProps;

/**
 * Testers
 */
propTypeTester<KdsCredentialsInputProps>({
  ariaLabel: "Credentials",
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
