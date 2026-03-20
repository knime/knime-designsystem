import type { KdsInputFieldProps } from "../types";

import type { kdsPasswordInputVariant } from "./enums";

export type KdsPasswordInputVariant =
  (typeof kdsPasswordInputVariant)[keyof typeof kdsPasswordInputVariant];

export type KdsPasswordInputProps = KdsInputFieldProps & {
  /**
   * Visual variant controlling the leading icon.
   * `"password"` shows a lock icon, `"second-factor"` shows a key icon.
   */
  variant?: KdsPasswordInputVariant;
  /**
   * Whether to show the visibility toggle button.
   */
  showVisibilityToggle?: boolean;
};
