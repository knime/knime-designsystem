import type { KdsInputFieldProps } from "../types";

export type KdsTextareaProps = KdsInputFieldProps & {
  /**
   * The number of visible text lines.
   */
  rows?: number;
};
