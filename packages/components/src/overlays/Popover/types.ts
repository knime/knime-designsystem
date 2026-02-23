import type { ComponentPublicInstance, MaybeRef } from "vue";

import { kdsPopoverPlacements } from "./constants";

export type KdsPopoverPlacement = (typeof kdsPopoverPlacements)[number];

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
   * Where the popover should be positioned relative to its anchor.
   */
  placement?: KdsPopoverPlacement;

  /**
   * Role of the popover element (for accessibility).
   *
   * Defaults to "dialog".
   */
  role?: "dialog" | "menu" | "listbox";

  /**
   * When true, enforces the popover's minimum width to match the anchor element's width.
   */
  fullWidth?: boolean;
};
