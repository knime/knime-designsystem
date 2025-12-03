import type { KdsIconName } from "../Icon/types";

import type {
  closedByOptions,
  heightSizes,
  modalVariants,
  widthSizes,
} from "./constants";

type WidthSizes = (typeof widthSizes)[number];
type HeightSizes = (typeof heightSizes)[number];
type ModalVariants = (typeof modalVariants)[number];
type ClosedByOptionsType = (typeof closedByOptions)[number];

export type KdsModalProps = {
  /** Icon for the header of the modal.
   *
   * **Only used for special dialogs most regular ones do not need one.**
   */
  icon?: KdsIconName;
  title?: string;
  /**
   * `default` does scroll and has padding
   *
   * `plain` no scrolling or padding of the content
   */
  variant?: ModalVariants;
  width?: WidthSizes;
  /**
   * `full` take all space
   *
   * `auto` dialog is growing with the content
   */
  height?: HeightSizes;
  /** Whether the dialog is visible or not */
  active?: boolean;
  /** https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#closedby */
  closedby?: ClosedByOptionsType;
};

export type KdsModalLayoutProps = Pick<
  KdsModalProps,
  "title" | "variant" | "icon"
> & { onClose: (event: Event) => void };
