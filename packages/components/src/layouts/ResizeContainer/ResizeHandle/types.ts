export type ResizeHandleProps = {
  /**
   * Number of handle lines to display.
   * @default 1
   */
  numberOfHandles?: number;

  /**
   * Gap between multiple handle lines (CSS value).
   * Only applies when numberOfHandles > 1.
   * @default "0px"
   */
  handleGap?: string;
};
