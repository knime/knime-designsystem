export const kdsLiveStatusStatuses = [
  "red",
  "yellow",
  "green",
  "disabled",
] as const;

export type KdsLiveStatusStatus = (typeof kdsLiveStatusStatuses)[number];

export const kdsLiveStatusSizes = ["large", "medium", "small"] as const;

export type KdsLiveStatusSize = (typeof kdsLiveStatusSizes)[number];

export type KdsLiveStatusProps = {
  /**
   * Traffic light status. Use "disabled" for a greyed-out indicator.
   */
  status?: KdsLiveStatusStatus;

  /**
   * Tooltip text shown on hover. Also used as aria label.
   */
  title: string;

  /**
   * Size of the indicator.
   */
  size?: KdsLiveStatusSize;

  /**
   * Optional label displayed next to the indicator dot.
   */
  label?: string;
};
