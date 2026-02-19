import type { KdsIconName } from "../../accessories/Icon/types";

import {
  kdsModalClosedBy,
  kdsModalHeight,
  kdsModalVariant,
  kdsModalWidth,
} from "./enums";

export type KdsModalClosedBy =
  (typeof kdsModalClosedBy)[keyof typeof kdsModalClosedBy];
export type KdsModalHeight =
  (typeof kdsModalHeight)[keyof typeof kdsModalHeight];
export type KdsModalVariant =
  (typeof kdsModalVariant)[keyof typeof kdsModalVariant];
export type KdsModalWidth = (typeof kdsModalWidth)[keyof typeof kdsModalWidth];

export type KdsModalProps = {
  /** Icon for the header of the modal.
   *
   * **Only used for special modals most regular ones do not need one.**
   */
  icon?: KdsIconName;
  title?: string;
  /**
   * `padded` adds gap and padding to the content
   *
   * `plain` no padding
   *
   * @default padded
   */
  variant?: KdsModalVariant;
  /**
   * - small:  25 × 16 = 400px
   * - medium: 32 × 16 = 512px
   * - large:  45 × 16 = 720px
   * - xlarge: 61 × 16 = 976px
   * - full:   all available space (with some spacing)
   *
   * @default medium
   */
  width?: KdsModalWidth;
  /**
   * `full` take all space
   *
   * `auto` modal is growing with the content
   *
   * @default auto
   */
  height?: KdsModalHeight;
  /** Whether the modal is visible or not */
  active?: boolean;
  /** https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#closedby */
  closedby?: KdsModalClosedBy;
  /**
   * Overflow of the dialog and the body.
   *
   * @default auto
   */
  overflow?: "hidden" | "auto" | "visible";
};

export type KdsModalLayoutProps = Pick<
  KdsModalProps,
  "title" | "variant" | "icon" | "overflow"
> & { onClose: (event?: Event) => void };
