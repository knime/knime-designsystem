export type KdsLabelProps = { label?: string };

export type KdsSubTextProps = {
  subText?: string;
  /**
   * Reserve space for subtext to prevent layout shifts when helper text or errors appear
   */
  preserveSubTextSpace?: boolean;
};
