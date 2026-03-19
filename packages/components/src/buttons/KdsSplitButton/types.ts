import type { KdsIconName } from "../../accessories/Icon/types";
import type { KdsButtonCommonProps } from "../types";

export type KdsSplitButtonAlternativeAction = {
  /**
   * Stable identifier of the alternative action.
   */
  id: string;

  /**
   * Visible label rendered in the context menu.
   */
  label: string;

  /**
   * Optional icon rendered before the label.
   */
  leadingIcon?: KdsIconName;

  /**
   * Whether the action is disabled.
   */
  disabled?: boolean;

  /**
   * Optional URL. When provided, clicking the menu item navigates to this URL.
   */
  href?: string;

  /**
   * Optional route location. When provided, clicking the menu item navigates
   * using RouterLink/NuxtLink if available, otherwise falls back to an anchor.
   */
  to?: string | Record<string, unknown>;
};

/**
 * KdsSplitButton component props
 */
export type KdsSplitButtonProps = KdsButtonCommonProps & {
  /**
   * The label of the primary button.
   */
  label: string;
  /**
   * The optional leading icon in the primary button.
   */
  leadingIcon?: KdsIconName;
  /**
   * Optional aria-label for the primary button.
   */
  primaryAriaLabel?: string;

  /**
   * Alternative actions rendered in the context menu.
   * Must contain at least one action; otherwise the secondary menu button would open an empty menu, which is undesirable UX.
   */
  alternativeActions: KdsSplitButtonAlternativeAction[];

  /**
   * Accessible label for the context menu.
   */
  contextMenuAriaLabel?: string;

  /**
   * Optional maximum height for the context menu dropdown (CSS value, e.g. "200px").
   */
  menuMaxHeight?: string;
};

/**
 * Testers
 */

// minimal: just a label an one alternative action
propTypeTester<KdsSplitButtonProps>({
  label: "Save",
  alternativeActions: [{ id: "save-as", label: "Save as" }],
});

// with all optional props
propTypeTester<KdsSplitButtonProps>({
  label: "Save",
  variant: "outlined",
  size: "large",
  disabled: true,
  leadingIcon: "placeholder",
  primaryAriaLabel: "Save workflow",
  alternativeActions: [
    { id: "save-as", label: "Save as" },
    { id: "docs", label: "Docs", href: "https://example.com" },
    { id: "settings", label: "Settings", to: "/settings" },
  ],
  contextMenuAriaLabel: "Save options",
  menuMaxHeight: "200px",
});

// @ts-expect-error - label is required
propTypeTester<KdsSplitButtonProps>({});
