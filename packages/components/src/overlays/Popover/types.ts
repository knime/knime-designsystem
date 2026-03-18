import { kdsPopoverPlacement, kdsPopoverRole, kdsPopoverType } from "./enums";

export type KdsPopoverPlacement =
  (typeof kdsPopoverPlacement)[keyof typeof kdsPopoverPlacement];

export type KdsPopoverRole =
  (typeof kdsPopoverRole)[keyof typeof kdsPopoverRole];

export type KdsPopoverType =
  (typeof kdsPopoverType)[keyof typeof kdsPopoverType];

export type KdsPopoverProps = {
  /**
   * Placement of the popover relative to the anchor element.
   *
   * Format: `{side}-{edge}` where:
   * - `side`: which side of the anchor the popover appears on (`top`, `bottom`)
   * - `edge`: which edge of the popover aligns with the anchor's edge (`left`, `right`)
   *
   * @default "bottom-left"
   */
  placement?: KdsPopoverPlacement;

  /**
   * Role of the popover element (for accessibility).
   *
   * Defaults to undefined.
   */
  role?: KdsPopoverRole;

  /**
   * Type of popover element's popover functionality.
   *
   * Defaults to "auto".
   */
  popoverType?: KdsPopoverType;

  /**
   * When true, enforces the popover's minimum width to match the anchor element's width.
   */
  fullWidth?: boolean;

  /**
   * Accessible label for the popover element.
   *
   * Required so screen readers can announce the popover
   * when focus moves into it (e.g. for `dialog`, `menu`, `listbox` roles).
   * Rendered as `aria-label` on the popover element.
   */
  popoverAriaLabel: string;

  /**
   * Optional content rendered when no default slot is provided.
   */
  content?: string;
};

export type KdsPopoverExpose = {
  /**
   * Ready-to-use inline style object (`{ "anchor-name": "..." }`) to apply
   * on the anchor/activator element via `:style="popoverRef?.anchorStyle"`.
   */
  anchorStyle: Record<string, string>;

  /**
   * The popover element's ID. Use for `aria-controls` on the activator.
   */
  popoverId: string;
};
