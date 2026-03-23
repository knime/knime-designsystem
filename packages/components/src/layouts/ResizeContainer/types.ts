import type { CSSProperties } from "vue";

export type KdsResizeContainerProps = {
  /**
   * Initial height of the container in pixels.
   * @default 200
   */
  height?: number;

  /**
   * Minimum height in pixels. The container cannot be resized below this value.
   * @default 0
   */
  minHeight?: number;

  /**
   * Maximum height in pixels. The container cannot be resized above this value.
   * When not set, there is no upper limit.
   */
  maxHeight?: number;

  /**
   * Number of resize handles to display.
   * @default 1
   */
  numberOfHandles?: number;

  /**
   * Gap between multiple handles (CSS value).
   * Only applies when numberOfHandles > 1.
   * @default "0px"
   */
  handleGap?: string;
};

/**
 * Scoped slot props exposed by the default slot of KdsResizeContainer.
 * Apply `contentStyle` to the slotted element to inherit size constraints.
 */
export type KdsResizeContainerSlotProps = {
  contentStyle: CSSProperties;
};
