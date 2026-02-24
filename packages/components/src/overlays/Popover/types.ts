import type { ComponentPublicInstance, MaybeRef } from "vue";

import { kdsPopoverPlacement, kdsPopoverRole } from "./enums";

export type KdsPopoverPlacement =
  (typeof kdsPopoverPlacement)[keyof typeof kdsPopoverPlacement];

export type KdsPopoverRole =
  (typeof kdsPopoverRole)[keyof typeof kdsPopoverRole];

export type KdsPopoverProps = {
  /**
   * Reference to the activator element (typically a button element).
   *
   * Can be an HTMLElement or a Vue component instance.
   */
  activatorEl: MaybeRef<HTMLElement | ComponentPublicInstance | null>;

  /**
   * Optional reference to the anchor element used for positioning.
   *
   * Defaults to `activatorEl`.
   */
  anchorEl?: MaybeRef<HTMLElement | ComponentPublicInstance | null>;

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
   * Defaults to "dialog".
   */
  role?: KdsPopoverRole;

  /**
   * When true, enforces the popover's minimum width to match the anchor element's width.
   */
  fullWidth?: boolean;

  /**
   * Optional content rendered when no default slot is provided.
   */
  content?: string;
};
