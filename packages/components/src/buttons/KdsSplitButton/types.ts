import type { KdsMenuItem } from "../KdsMenuButton/types";
import type { KdsButtonCommonProps, WithLabelAndIcons } from "../types";

/**
 * KdsSplitButton component props
 */
export type KdsSplitButtonProps = KdsButtonCommonProps &
  WithLabelAndIcons & {
    /**
     * Alternative actions rendered in the context menu.
     * Items with `href` are rendered as `<a>` tags for native link behavior.
     * Items with `to` use RouterLink/NuxtLink if available, otherwise fall back to `<a>`.
     */
    alternativeActions: KdsMenuItem[];

    /**
     * Optional maximum height for the context menu dropdown (CSS value, e.g. "200px").
     */
    menuMaxHeight?: string;
  };

/**
 * Testers
 */

// minimal: just a label and one alternative action
propTypeTester<KdsSplitButtonProps>({
  label: "Save",
  alternativeActions: [{ id: "save-as", text: "Save as" }],
});

// icon-only primary button
propTypeTester<KdsSplitButtonProps>({
  leadingIcon: "placeholder",
  ariaLabel: "Save",
  alternativeActions: [{ id: "save-as", text: "Save as" }],
});

// with all optional props
propTypeTester<KdsSplitButtonProps>({
  label: "Save",
  variant: "outlined",
  size: "large",
  disabled: true,
  leadingIcon: "placeholder",
  alternativeActions: [
    { id: "save-as", text: "Save as" },
    { id: "docs", text: "Docs", href: "https://example.com" },
    { id: "settings", text: "Settings", to: "/settings" },
  ],
  menuMaxHeight: "200px",
});

// @ts-expect-error - label or leadingIcon+ariaLabel is required
propTypeTester<KdsSplitButtonProps>({
  alternativeActions: [],
});
