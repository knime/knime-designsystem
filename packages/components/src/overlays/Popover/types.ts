export type KdsPopoverProps = {
  /**
   * Optional additional element that should be treated as "inside" for click-outside handling.
   * For example, a separate panel or a nested menu that should not close the popover.
   */
  ignoredClickOutsideTarget?: HTMLElement | null;
};
