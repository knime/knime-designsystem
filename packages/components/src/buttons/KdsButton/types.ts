import type {
  KdsButtonCommonProps,
  WithDestructive,
  WithLabelAndIcons,
} from "../types";

export type KdsButtonProps = KdsButtonCommonProps &
  WithLabelAndIcons &
  WithDestructive;

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
