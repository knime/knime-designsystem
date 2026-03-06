import type { KdsMenuItem } from "../KdsMenuButton/types";
import type { KdsButtonCommonProps, WithLabelAndIcons } from "../types";

/**
 * KdsSplitButton component props
 */
export type KdsSplitButtonProps = KdsButtonCommonProps &
  WithLabelAndIcons & {
    /**
     * Alternative actions rendered in the context menu.
     * Only action items are allowed — link items (`href` / `to`) are not
     * supported because every action is dispatched through the
     * `clickItem` event.
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

// with all optional props (no href/to allowed)
propTypeTester<KdsSplitButtonProps>({
  label: "Save",
  variant: "outlined",
  size: "large",
  disabled: true,
  leadingIcon: "placeholder",
  alternativeActions: [
    { id: "save-as", text: "Save as" },
    { id: "export", text: "Export" },
  ],
  menuMaxHeight: "200px",
});

// prettier-ignore
// @ts-expect-error - href is not allowed on split button action items
propTypeTester<KdsSplitButtonActionItem>({ id: "docs", text: "Docs", href: "https://example.com" });

// prettier-ignore
// @ts-expect-error - to is not allowed on split button action items
propTypeTester<KdsSplitButtonActionItem>({ id: "settings", text: "Settings", to: "/settings" });

// @ts-expect-error - label or leadingIcon+ariaLabel is required
propTypeTester<KdsSplitButtonProps>({
  alternativeActions: [],
});
