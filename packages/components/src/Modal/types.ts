import type { IconName } from "../Icon/types";

export const closedByOptions = ["any", "closerequest", "none"] as const;
export type ClosedByOptionsType = (typeof closedByOptions)[number];

export type BaseModalProps = {
  icon?: IconName;
  title?: string;
  /**
   * default: does scroll and has padding
   * plain: no scrolling or padding of the content
   */
  variant?: "default" | "plain";
  width?: "small" | "medium" | "large" | "full";
  /**
   * full: take all space,
   * auto: dialog is growing with the content.
   */
  height?: "full" | "auto";
  /** Whether the dialog is visible or not */
  active?: boolean;
  /** https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#closedby */
  closedby?: ClosedByOptionsType;
};
