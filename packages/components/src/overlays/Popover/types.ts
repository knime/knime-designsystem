import type { ComponentPublicInstance, MaybeRef } from "vue";

import { kdsPopoverPaddingSizes, kdsPopoverPlacements } from "./constants";

export type KdsPopoverPlacement = (typeof kdsPopoverPlacements)[number];

export type KdsPopoverPaddingSize = (typeof kdsPopoverPaddingSizes)[number];

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
   * The padding size of the popover.
   *
   * - "medium": 12px padding (default)
   * - "small": 4px padding
   */
  paddingSize?: KdsPopoverPaddingSize;
};
