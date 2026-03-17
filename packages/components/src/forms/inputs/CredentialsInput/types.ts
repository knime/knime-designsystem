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

type KdsCredentialsFieldProps = {
  /**
   * ID of element that describes this input.
   */
  ariaDescribedby?: string;
  /**
   * Placeholder shown when the field is empty.
   */
  placeholder?: string;
  /**
   * Autocomplete value for this field.
   */
  autocomplete?: string;
  /**
   * Subtext shown below the field.
   */
  subText?: string;
  /**
   * Error state for this field.
   */
  error?: boolean;
  /**
   * Validating state for this field.
   */
  validating?: boolean;
};

export type KdsCredentialsUsernameProps = KdsCredentialsFieldProps;

export type KdsCredentialsPasswordProps = KdsCredentialsFieldProps;

export type KdsCredentialsKeyProps = KdsCredentialsFieldProps & {
  /**
   * Accessible/display name of the key field used for aria labels and toggle text.
   */
  name?: string;
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
  /**
   * Whether to show the visibility toggle on secret fields.
   */
  showVisibilityToggle?: boolean;
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
