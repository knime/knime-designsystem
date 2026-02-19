import type { KdsIconName } from "../accessories/Icon/types";

import { kdsButtonSize, kdsButtonVariant } from "./enums";

export type KdsButtonSize = (typeof kdsButtonSize)[keyof typeof kdsButtonSize];
export type KdsButtonVariant =
  (typeof kdsButtonVariant)[keyof typeof kdsButtonVariant];

/**
 * Properties common to all button components
 */
export type KdsButtonCommonProps<
  TVariant extends KdsButtonVariant = KdsButtonVariant,
> = {
  size?: KdsButtonSize;
  disabled?: boolean;
  title?: string;
  variant?: TVariant;
};

/**
 * Helper types
 */
type LabelAndIcons = {
  label: string;
  leadingIcon?: KdsIconName;
  trailingIcon?: KdsIconName;
  ariaLabel?: never;
};

type LeadingIconOnly = {
  label?: never;
  leadingIcon: KdsIconName;
  trailingIcon?: never;
  ariaLabel: string;
};

export type WithLabelAndIcons = LabelAndIcons | LeadingIconOnly;

export type WithDestructive = {
  /**
   * If set to true, the button will prominently warn the user of a destructive action.
   */
  destructive?: boolean;
};

type WithSuccess = {
  /**
   * If set to true, the button will be styled as a success/positive action.
   */
  success?: boolean;
};

type WithError = {
  /**
   * If set to true, the button will be styled as an error/negative action.
   */
  error?: boolean;
};

type WithToggled = {
  /**
   * Represents the button's toggled state
   */
  toggled?: boolean;
};

/**
 * Type for BaseButton component which supports all behaviors
 */
export type BaseButtonProps = KdsButtonCommonProps &
  WithLabelAndIcons &
  WithDestructive &
  WithSuccess &
  WithError &
  WithToggled;

/**
 * Testers
 */

// supports just label
propTypeTester<BaseButtonProps>({ variant: "filled", label: "foo" });
// supports just leading icon
propTypeTester<BaseButtonProps>({
  variant: "filled",
  leadingIcon: "ai-general",
  ariaLabel: "bond",
});
// @ts-expect-error - aria-label is required for icon-only buttons
propTypeTester<BaseButtonProps>({
  variant: "filled",
  leadingIcon: "ai-general",
});

// supports both leading icon and label
propTypeTester<BaseButtonProps>({
  variant: "filled",
  leadingIcon: "ai-general",
  label: "foo",
});
// supports label and trailing icon
propTypeTester<BaseButtonProps>({
  variant: "filled",
  label: "foo",
  trailingIcon: "ai-general",
});
// supports all 3
propTypeTester<BaseButtonProps>({
  variant: "filled",
  leadingIcon: "ai-general",
  label: "foo",
  trailingIcon: "ai-general",
});
// @ts-expect-error - should not allow leading and trailing icons without label
propTypeTester<BaseButtonProps>({
  variant: "filled",
  leadingIcon: "ai-general",
  trailingIcon: "ai-general",
});

// BaseButton supports "success" prop
propTypeTester<BaseButtonProps>({
  variant: "filled",
  label: "Label",
  success: true,
});

// BaseButton supports "error" prop
propTypeTester<BaseButtonProps>({
  variant: "filled",
  label: "Label",
  error: true,
});
