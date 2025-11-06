import type { IconName } from "../Icon/types";

export const closedByOptions = ["any", "closerequest", "none"] as const;

export type BaseModalProps = {
  icon?: IconName;
  title?: string;
  message?: string;
  /** Wether the dialog is visible or not */
  active?: boolean;
  /** https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#closedby */
  closedby?: (typeof closedByOptions)[number];
};
