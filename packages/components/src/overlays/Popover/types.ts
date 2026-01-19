import { kdsPopoverPlacements } from "./constants";

export type KdsPopoverPlacement = (typeof kdsPopoverPlacements)[number];

export type KdsPopoverProps = {
  /**
   * Where the popover should be positioned relative to its activator.
   */
  placement?: KdsPopoverPlacement;

  /**
   * Container that defines the positioning boundary.
   *
   * Defaults to `document.body`.
   */
  mainContainer?: HTMLElement | (() => HTMLElement);

  /**
   * Optional additional element (or elements) that should be treated as "inside" for click-outside handling.
   * For example, a separate panel or a nested menu that should not close the popover.
   */
  ignoredClickOutsideTarget?: HTMLElement | HTMLElement[] | null;
};
