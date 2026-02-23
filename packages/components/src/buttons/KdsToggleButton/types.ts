import type { KdsButtonCommonProps, WithLabelAndIcons } from "../types";

import { kdsToggleButtonVariant } from "./enums";

export type KdsToggleButtonVariant =
  (typeof kdsToggleButtonVariant)[keyof typeof kdsToggleButtonVariant];

export type KdsToggleButtonProps =
  KdsButtonCommonProps<KdsToggleButtonVariant> & WithLabelAndIcons;

/**
 * Testers
 */

// KdsToggleButton should not support "destructive" prop
propTypeTester<KdsToggleButtonProps>({
  leadingIcon: "ai-general",
  ariaLabel: "toggle",
  // @ts-expect-error - destructive not supported
  destructive: true,
});
// KdsToggleButton should not support "filled" variant
propTypeTester<KdsToggleButtonProps>({
  // @ts-expect-error - filled variant not supported
  variant: "filled",
  leadingIcon: "ai-general",
  ariaLabel: "toggle",
});

// Valid toggle button usage
propTypeTester<KdsToggleButtonProps>({
  variant: "outlined",
  leadingIcon: "ai-general",
  ariaLabel: "toggle",
});
propTypeTester<KdsToggleButtonProps>({
  variant: "transparent",
  label: "Toggle",
});
