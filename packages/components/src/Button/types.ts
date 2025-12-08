import type { IconName } from "@knime/kds-styles/img/icons/def";

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
};

/**
 * Helper types
 */
type LabelAndIcons = {
  label: string;
  leadingIcon?: IconName;
  trailingIcon?: IconName;
};

type LeadingIconOnly = {
  label?: never;
  leadingIcon: IconName;
  trailingIcon?: never;
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

type WithRouterNavigation = {
  /**
   * Route Location the link should navigate to when clicked on; passed to RouterLink/NuxtLink component if globally available
   */
  to: string | Record<string, unknown>; // not the exact type, but don't want to add the dependency on vue-router
};

type WithAnchorElementAttributes = {
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

type WithSelected = {
  /**
   * Represents the button's toggled/selected state
   */
  selected?: boolean;
};

/**
 * Type for BaseButton component which supports all behaviors
 */
export type BaseButtonProps = CommonProps &
  WithVariant<KdsButtonVariant> &
  WithLabelAndIcons &
  WithDestructive &
  WithSelected;

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
  WithLabelAndIcons &
  Required<WithSelected>;

/**
 * Testers
 */

// supports just label
propTypeTester<BaseButtonProps>({ variant: "filled", label: "foo" });
// supports just leading icon
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

// @ts-expect-error - KdsLinkButton should require "to" prop
propTypeTester<KdsLinkButtonProps>({ label: "Label" });

// @ts-expect-error - KdsToggleButton should require "selected" prop
propTypeTester<KdsToggleButtonProps>({ leadingIcon: "ai-general" });
// KdsToggleButton should not support "destructive" prop
propTypeTester<KdsToggleButtonProps>({
  leadingIcon: "ai-general",
  selected: true,
  // @ts-expect-error see above
  destructive: true,
});
// KdsToggleButton should not support "filled" variant
propTypeTester<KdsToggleButtonProps>({
  // @ts-expect-error see above
  variant: "filled",
  leadingIcon: "ai-general",
  selected: true,
});
