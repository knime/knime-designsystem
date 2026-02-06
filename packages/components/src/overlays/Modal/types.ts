import type { KdsIconName } from "../../Icon/types";

import type {
  closedByOptions,
  heightSizes,
  modalVariants,
  widthSizes,
} from "./constants";

/**
 * - small:  25 × 16 = 400px
 * - medium: 32 × 16 = 512px
 * - large:  45 × 16 = 720px
 * - xlarge: 61 × 16 = 976px
 * - full:   all available space (with some spacing)
 */
type WidthSizes = (typeof widthSizes)[number];
type HeightSizes = (typeof heightSizes)[number];
type ModalVariants = (typeof modalVariants)[number];
type ClosedByOptionsType = (typeof closedByOptions)[number];

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
  variant?: ModalVariants;
  /**
   * - small:  25 × 16 = 400px
   * - medium: 32 × 16 = 512px
   * - large:  45 × 16 = 720px
   * - xlarge: 61 × 16 = 976px
   * - full:   all available space (with some spacing)
   *
   * @default medium
   */
  width?: WidthSizes;
  /**
   * `full` take all space
   *
   * `auto` modal is growing with the content
   *
   * @default auto
   */
  height?: HeightSizes;
  /** Whether the modal is visible or not */
  active?: boolean;
  /** https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#closedby */
  closedby?: ClosedByOptionsType;
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
