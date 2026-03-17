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

type KdsCredentialsFieldProps = Pick<
  KdsInputFieldProps,
  "placeholder" | "subText" | "error" | "validating"
> & {
  /**
   * ID of element that describes this input.
   */
  ariaDescribedby?: string;
};

export type KdsSecretAutocomplete =
  | "new-password"
  | "current-password"
  | "one-time-code"
  | "off";

export type KdsCredentialsUsernameProps = KdsCredentialsFieldProps & {
  /**
   * Autocomplete value for the username field.
   */
  autocomplete?: KdsInputFieldProps["autocomplete"];
};

export type KdsCredentialsPasswordProps = KdsCredentialsFieldProps & {
  /**
   * Autocomplete value for the password field.
   */
  autocomplete?: KdsSecretAutocomplete;
  /**
   * Whether to show the visibility toggle for the password field.
   */
  showVisibilityToggle?: boolean;
};

export type KdsCredentialsKeyProps = KdsCredentialsFieldProps & {
  /**
   * Autocomplete value for the key field.
   */
  autocomplete?: KdsSecretAutocomplete;
  /**
   * Accessible/display name of the key field used for aria labels and toggle text.
   */
  name?: string;
  /**
   * Whether to show the visibility toggle for the key field.
   */
  showVisibilityToggle?: boolean;
};

type KdsUsernameConfigProps =
  | {
      showUsername?: true;
      usernameField?: KdsCredentialsUsernameProps;
    }
  | {
      showUsername: false;
      usernameField?: never;
    };

type KdsPasswordConfigProps =
  | {
      showPassword?: true;
      passwordField?: KdsCredentialsPasswordProps;
    }
  | {
      showPassword: false;
      passwordField?: never;
    };

type KdsKeyConfigProps =
  | {
      showKey?: true;
      keyField?: KdsCredentialsKeyProps;
    }
  | {
      showKey: false;
      keyField?: never;
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
   * Reserve subtext space to avoid layout shifts.
   */
  preserveSubTextSpace?: boolean;
} & Pick<KdsInputFieldProps, "id" | "label" | "ariaLabel" | "disabled"> &
  KdsCredentialsVisibilityProps &
  KdsUsernameConfigProps &
  KdsPasswordConfigProps &
  KdsKeyConfigProps;

/**
 * Testers
 */
propTypeTester<KdsCredentialsInputProps>({
  id: "credentials-group",
  ariaLabel: "Credentials",
  ariaDescribedby: "credentials-help",
  usernameField: {
    placeholder: "Username",
  },
  passwordField: {
    placeholder: "Password",
  },
  showUsername: true,
  showPassword: true,
  showKey: true,
  keyField: {
    name: "API token",
    placeholder: "Token",
  },
  disabled: false,
});

propTypeTester<KdsCredentialsInputProps>({
  showUsername: true,
  showPassword: true,
  showKey: true,
  passwordField: { autocomplete: "one-time-code" },
  keyField: { autocomplete: "off" },
});

// @ts-expect-error - at least one field must be enabled
propTypeTester<KdsCredentialsInputProps>({
  showUsername: false,
  showPassword: false,
  showKey: false,
});

// @ts-expect-error - username config requires showUsername to be enabled
propTypeTester<KdsCredentialsInputProps>({
  showUsername: false,
  showPassword: true,
  usernameField: { placeholder: "Username" },
});

// @ts-expect-error - password config requires showPassword to be enabled
propTypeTester<KdsCredentialsInputProps>({
  showUsername: true,
  showPassword: false,
  passwordField: { placeholder: "Password" },
});

// @ts-expect-error - key config requires showKey to be enabled
propTypeTester<KdsCredentialsInputProps>({
  showUsername: true,
  showPassword: true,
  showKey: false,
  keyField: { name: "Token" },
});

propTypeTester<KdsCredentialsInputProps>({
  showUsername: true,
  showPassword: true,
  // @ts-expect-error - password autocomplete must use secret-specific values
  passwordField: { autocomplete: "username" },
});

propTypeTester<KdsCredentialsInputProps>({
  showUsername: true,
  showPassword: true,
  showKey: true,
  // @ts-expect-error - key autocomplete must use secret-specific values
  keyField: { autocomplete: "email" },
});
