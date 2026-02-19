import type { KdsIconName } from "../../accessories/Icon/types";
import type {
  KdsButtonCommonProps,
  KdsButtonSize,
  KdsButtonVariant,
  WithDestructive,
  WithLabelAndIcons,
} from "../types";

export type KdsButtonProps = KdsButtonCommonProps &
  WithLabelAndIcons &
  WithDestructive;

/**
 * Prefixed version of KdsButtonProps for use in composite components.
 * Explicitly defined to avoid Vue compiler issues with complex mapped types.
 */
type PrefixedButtonCommonProps = {
  buttonSize?: KdsButtonSize;
  buttonDisabled?: boolean;
  buttonTitle?: string;
  buttonVariant?: KdsButtonVariant;
  buttonDestructive?: boolean;
};

type PrefixedButtonWithLabel = {
  buttonLabel: string;
  buttonLeadingIcon?: KdsIconName;
  buttonTrailingIcon?: KdsIconName;
  buttonAriaLabel?: never;
};

type PrefixedButtonWithIconOnly = {
  buttonLabel?: never;
  buttonLeadingIcon: KdsIconName;
  buttonTrailingIcon?: never;
  buttonAriaLabel: string;
};

export type PrefixedKdsButtonProps = PrefixedButtonCommonProps &
  (PrefixedButtonWithLabel | PrefixedButtonWithIconOnly);

export type PrefixedKdsButtonPropsAsNever = {
  buttonSize?: never;
  buttonDisabled?: never;
  buttonTitle?: never;
  buttonVariant?: never;
  buttonDestructive?: never;
  buttonLabel?: never;
  buttonLeadingIcon?: never;
  buttonTrailingIcon?: never;
  buttonAriaLabel?: never;
};

/**
 * Testers
 */

// supports just label
propTypeTester<KdsButtonProps>({ label: "foo" });
// supports just leading icon
propTypeTester<KdsButtonProps>({
  leadingIcon: "ai-general",
  ariaLabel: "bond",
});
// @ts-expect-error - aria-label is required for icon-only buttons
propTypeTester<KdsButtonProps>({
  leadingIcon: "ai-general",
});

// supports both leading icon and label
propTypeTester<KdsButtonProps>({
  leadingIcon: "ai-general",
  label: "foo",
});
// supports label and trailing icon
propTypeTester<KdsButtonProps>({
  label: "foo",
  trailingIcon: "ai-general",
});
// supports all 3
propTypeTester<KdsButtonProps>({
  leadingIcon: "ai-general",
  label: "foo",
  trailingIcon: "ai-general",
});
// @ts-expect-error - should not allow leading and trailing icons without label
propTypeTester<KdsButtonProps>({
  leadingIcon: "ai-general",
  trailingIcon: "ai-general",
});

// KdsButton supports "destructive" prop
propTypeTester<KdsButtonProps>({ label: "Label", destructive: true });
