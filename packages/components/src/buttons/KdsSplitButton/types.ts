import type { KdsIconName } from "../../accessories/Icon/types";
import { kdsButtonSize, kdsButtonVariant } from "../enums";

export type KdsButtonSize = (typeof kdsButtonSize)[keyof typeof kdsButtonSize];
export type KdsButtonVariant =
  (typeof kdsButtonVariant)[keyof typeof kdsButtonVariant];

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
   * Optional aria-label for the menu item.
   */
  ariaLabel?: string;

  /**
   * Whether the action is disabled.
   */
  disabled?: boolean;
};

/**
 * KdsSplitButton component props
 */
export type KdsSplitButtonProps = {
  /**
   * The size of the button
   */
  size?: KdsButtonSize;
  /**
   * The variant of the button (filled, outlined, transparent)
   */
  variant?: KdsButtonVariant;
  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
  /**
   * The label of the primary button
   */
  label: string;
  /**
   * The optional leading icon in the primary button
   */
  leadingIcon?: KdsIconName;
  /**
   * Optional title attribute for accessibility
   */
  title?: string;
  /**
   * Optional aria-label for the primary button
   */
  primaryAriaLabel?: string;
  /**
   * Optional aria-label for the secondary button
   */
  secondaryAriaLabel?: string;

  /**
   * Alternative actions rendered in the context menu.
   */
  alternativeActions?: KdsSplitButtonAlternativeAction[];

  /**
   * Accessible label for the context menu.
   */
  contextMenuAriaLabel?: string;
};
