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
   * When enabled, an arrow is shown that visually connects the popover to its anchor.
   */
  showArrow?: boolean;

  /**
   * Optional additional element (or elements) that should be treated as "inside" for click-outside handling.
   * Can be HTMLElements or Vue component instances.
   */
  ignoredClickOutsideTarget?:
    | HTMLElement
    | ComponentPublicInstance
    | (HTMLElement | ComponentPublicInstance)[]
    | null;
};
