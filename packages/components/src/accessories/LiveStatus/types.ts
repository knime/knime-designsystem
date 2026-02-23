import { kdsLiveStatusSize, kdsLiveStatusStatus } from "./enums";

export type KdsLiveStatusStatus =
  (typeof kdsLiveStatusStatus)[keyof typeof kdsLiveStatusStatus];

export type KdsLiveStatusSize =
  (typeof kdsLiveStatusSize)[keyof typeof kdsLiveStatusSize];

export type KdsLiveStatusProps = {
  /**
   * Traffic light status. Use "disabled" for a greyed-out indicator.
   */
  status?: KdsLiveStatusStatus;

  /**
   * Size of the indicator.
   */
  size?: KdsLiveStatusSize;

  /**
   * Optional label displayed next to the indicator dot.
   */
  label?: string;

  /**
   * Tooltip text shown on hover. Also used as aria label.
   * If omitted, a default text like "Status is ${status}" is used.
   */
  title?: string;
};
