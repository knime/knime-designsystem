import type { KdsInputFieldProps } from "../types";

import type {
  kdsPasswordInputAutocomplete,
  kdsPasswordInputVariant,
} from "./enums";

export type KdsPasswordInputVariant =
  (typeof kdsPasswordInputVariant)[keyof typeof kdsPasswordInputVariant];

export type KdsPasswordInputAutocomplete =
  (typeof kdsPasswordInputAutocomplete)[keyof typeof kdsPasswordInputAutocomplete];

export type KdsPasswordInputProps = Omit<KdsInputFieldProps, "autocomplete"> & {
  /**
   * Visual variant controlling the leading icon.
   * `"password"` shows a lock icon, `"key"` shows a key icon.
   */
  variant?: KdsPasswordInputVariant;
  /**
   * Whether to show the visibility toggle button.
   */
  showVisibilityToggle?: boolean;
  /**
   * Label used for the visibility toggle button's aria-label.
   * Defaults to `"Password"` for the `"password"` variant and `"Key"` for `"key"`.
   */
  toggleLabel?: string;
  /**
   * Autocomplete attribute for the input element.
   */
  autocomplete?: KdsPasswordInputAutocomplete;
};
