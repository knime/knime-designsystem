import type { KdsIconName } from "../accessories/Icon/types";
import type { KdsSize } from "../types";

import type { kdsButtonVariants, kdsToggleButtonVariants } from "./constants";

export type KdsButtonVariant = (typeof kdsButtonVariants)[number];
export type KdsToggleButtonVariant = (typeof kdsToggleButtonVariants)[number];

/**
 * Properties common to all button components
 */
type CommonProps = {
  size?: KdsSize;
  disabled?: boolean;
  title?: string;
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

/**
 * Composable button types
 */
type WithVariant<TVariant> = {
  variant: TVariant;
};

type WithLabelAndIcons = LabelAndIcons | LeadingIconOnly;

type WithDestructive = {
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

export type WithRouterNavigation = {
  /**
   * Route Location the link should navigate to when clicked on; passed to RouterLink/NuxtLink component if globally available
   */
  to: string | Record<string, unknown>; // not the exact type, but don't want to add the dependency on vue-router
};

export type WithAnchorElementAttributes = {
  /**
   * If set to true, the link will be downloaded instead of navigating to it.
   */
  download?: boolean;
  /**
   * Where to display the linked URL, as the name for a browsing context.
   */
  target?: "_blank" | "_parent" | "_self" | "_top" | string | null;
  /**
   * A rel attribute value to apply on the link. In Nuxt, defaults to "noopener noreferrer" for external links.
   */
  rel?:
    | "noopener"
    | "noreferrer"
    | "nofollow"
    | "sponsored"
    | "ugc"
    | string
    | null;
};

type WithToggled = {
  /**
   * Represents the button's toggled state
   */
  toggled?: boolean;
};

/**
 * Prefixed versions of composable types for use in composite components
 * Pre-computed here to avoid Vue SFC compiler issues with mapped types
 */
type PrefixedCommonProps = {
  buttonSize?: CommonProps["size"];
  buttonDisabled?: CommonProps["disabled"];
  buttonTitle?: CommonProps["title"];
};

type PrefixedLabelAndIcons = {
  buttonLabel: string;
  buttonLeadingIcon?: LabelAndIcons["leadingIcon"];
  buttonTrailingIcon?: LabelAndIcons["trailingIcon"];
  buttonAriaLabel?: never;
};

type PrefixedLeadingIconOnly = {
  buttonLabel?: never;
  buttonLeadingIcon: LeadingIconOnly["leadingIcon"];
  buttonTrailingIcon?: never;
  buttonAriaLabel: string;
};

type PrefixedWithLabelAndIcons =
  | PrefixedLabelAndIcons
  | PrefixedLeadingIconOnly;

type PrefixedWithVariant = {
  buttonVariant?: KdsButtonVariant;
};

type PrefixedWithDestructive = {
  buttonDestructive?: WithDestructive["destructive"];
};

type PrefixedWithRouterNavigation = {
  buttonTo: WithRouterNavigation["to"];
};

type PrefixedWithAnchorElementAttributes = {
  buttonDownload?: WithAnchorElementAttributes["download"];
  buttonTarget?: WithAnchorElementAttributes["target"];
  buttonRel?: WithAnchorElementAttributes["rel"];
};

/**
 * Type for BaseButton component which supports all behaviors
 */
export type BaseButtonProps = CommonProps &
  WithVariant<KdsButtonVariant> &
  WithLabelAndIcons &
  WithDestructive &
  WithSuccess &
  WithError &
  WithToggled;

/**
 * Component types
 */
export type KdsButtonProps = CommonProps &
  Partial<WithVariant<KdsButtonVariant>> &
  WithLabelAndIcons &
  WithDestructive;

export type KdsLinkButtonProps = CommonProps &
  Partial<WithVariant<KdsButtonVariant>> &
  WithLabelAndIcons &
  WithDestructive &
  WithRouterNavigation &
  WithAnchorElementAttributes;

export type KdsToggleButtonProps = CommonProps &
  Partial<WithVariant<KdsToggleButtonVariant>> &
  WithLabelAndIcons;

export type KdsVariableToggleButtonProps = KdsInfoToggleButtonProps & {
  /**
   * If set to true, indicates that an input flow variable is configured.
   */
  inSet?: boolean;
  /**
   * If set to true, indicates that an output flow variable is configured.
   */
  outSet?: boolean;
  /**
   * If set to true, the button indicates an error state.
   */
  error?: boolean;
};

export type KdsInfoToggleButtonProps = {
  disabled?: boolean;
  /**
   * If set to true, the button is visible even when not focused.
   */
  hidden?: boolean;
};

/**
 * Progress button types
 */
export type KdsProgressButtonState =
  | "default"
  | "progress"
  | "success"
  | "error";

type KdsProgressButtonCommonProps = {
  size?: KdsSize;
  variant?: KdsButtonVariant;
  disabled?: boolean;
};

type KdsProgressButtonIconWithLabel = {
  label: string;
  leadingIcon: KdsIconName;
  ariaLabel?: never;
};

type KdsProgressButtonIconOnly = {
  label?: never;
  leadingIcon: KdsIconName;
  ariaLabel: string;
};

export type KdsProgressButtonProps = KdsProgressButtonCommonProps &
  (KdsProgressButtonIconWithLabel | KdsProgressButtonIconOnly);

/**
 * Prefixed component types for use in composite components
 * Pre-computed here to avoid Vue SFC compiler issues with mapped types
 */
export type PrefixedKdsButtonProps = PrefixedCommonProps &
  PrefixedWithVariant &
  PrefixedWithLabelAndIcons &
  PrefixedWithDestructive;

export type PrefixedKdsLinkButtonProps = PrefixedCommonProps &
  PrefixedWithVariant &
  PrefixedWithLabelAndIcons &
  PrefixedWithDestructive &
  PrefixedWithRouterNavigation &
  PrefixedWithAnchorElementAttributes;

/**
 * Helper types for excluding button props in composite components
 * These represent the negation of prefixed button props
 */
export type PrefixedButtonPropsAsNever = {
  buttonLabel?: never;
  buttonLeadingIcon?: never;
  buttonTrailingIcon?: never;
  buttonAriaLabel?: never;
  buttonSize?: never;
  buttonDisabled?: never;
  buttonTitle?: never;
  buttonVariant?: never;
  buttonDestructive?: never;
  buttonTo?: never;
  buttonDownload?: never;
  buttonTarget?: never;
  buttonRel?: never;
};

export type PrefixedAnchorAttributesAsNever = {
  buttonDownload?: never;
  buttonTarget?: never;
  buttonRel?: never;
};

export type PrefixedRouterNavigationAsNever = {
  buttonTo?: never;
};

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
// supports both leading supports all 3
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

// KdsButton supports "destructive" prop
propTypeTester<KdsButtonProps>({ label: "Label", destructive: true });

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

// @ts-expect-error - KdsLinkButton should require "to" prop
propTypeTester<KdsLinkButtonProps>({ label: "Label" });

// KdsToggleButton should not support "destructive" prop
propTypeTester<KdsToggleButtonProps>({
  leadingIcon: "ai-general",
  // @ts-expect-error see above
  destructive: true,
});
// KdsToggleButton should not support "filled" variant
propTypeTester<KdsToggleButtonProps>({
  // @ts-expect-error see above
  variant: "filled",
  leadingIcon: "ai-general",
});

// KdsVariableToggleButton supports inSet/outSet, error and disabled
propTypeTester<KdsVariableToggleButtonProps>({});
propTypeTester<KdsVariableToggleButtonProps>({ inSet: true });
propTypeTester<KdsVariableToggleButtonProps>({ outSet: true });
propTypeTester<KdsVariableToggleButtonProps>({ inSet: true, outSet: true });
propTypeTester<KdsVariableToggleButtonProps>({ disabled: true });
propTypeTester<KdsVariableToggleButtonProps>({ error: true });

// KdsInfoToggleButton supports disabled
propTypeTester<KdsInfoToggleButtonProps>({ disabled: true });
// KdsInfoToggleButton supports visible
propTypeTester<KdsInfoToggleButtonProps>({ hidden: true });

// ProgressButton supports label + icon
propTypeTester<KdsProgressButtonProps>({
  label: "Label",
  leadingIcon: "ai-general",
});

// ProgressButton supports icon-only variant
propTypeTester<KdsProgressButtonProps>({
  leadingIcon: "ai-general",
  ariaLabel: "Icon only progress button",
});

// @ts-expect-error - aria-label is required for icon-only buttons
propTypeTester<KdsProgressButtonProps>({
  leadingIcon: "ai-general",
});

// PrefixedKdsButtonProps - supports just label
propTypeTester<PrefixedKdsButtonProps>({ buttonLabel: "foo" });
// supports just leading icon
propTypeTester<PrefixedKdsButtonProps>({
  buttonLeadingIcon: "ai-general",
  buttonAriaLabel: "bond",
});
// @ts-expect-error - aria-label is required for icon-only buttons
propTypeTester<PrefixedKdsButtonProps>({
  buttonLeadingIcon: "ai-general",
});
// supports both leading icon and label
propTypeTester<PrefixedKdsButtonProps>({
  buttonLeadingIcon: "ai-general",
  buttonLabel: "foo",
});
// supports label and trailing icon
propTypeTester<PrefixedKdsButtonProps>({
  buttonLabel: "foo",
  buttonTrailingIcon: "ai-general",
});
// supports all 3
propTypeTester<PrefixedKdsButtonProps>({
  buttonLeadingIcon: "ai-general",
  buttonLabel: "foo",
  buttonTrailingIcon: "ai-general",
});
// @ts-expect-error - should not allow leading and trailing icons without label
propTypeTester<PrefixedKdsButtonProps>({
  buttonLeadingIcon: "ai-general",
  buttonTrailingIcon: "ai-general",
});
// supports destructive
propTypeTester<PrefixedKdsButtonProps>({
  buttonLabel: "Label",
  buttonDestructive: true,
});

// PrefixedKdsLinkButtonProps - requires buttonTo
propTypeTester<PrefixedKdsLinkButtonProps>({
  buttonLabel: "Label",
  buttonTo: "/path",
});
// @ts-expect-error - buttonTo is required
propTypeTester<PrefixedKdsLinkButtonProps>({ buttonLabel: "Label" });
// supports icon-only with buttonTo
propTypeTester<PrefixedKdsLinkButtonProps>({
  buttonLeadingIcon: "ai-general",
  buttonAriaLabel: "bond",
  buttonTo: "/path",
});
// supports anchor attributes
propTypeTester<PrefixedKdsLinkButtonProps>({
  buttonLabel: "Label",
  buttonTo: "/path",
  buttonTarget: "_blank",
  buttonRel: "noopener",
});
