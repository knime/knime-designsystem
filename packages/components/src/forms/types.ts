export type KdsLabelProps =
  | { label?: string; id: string }
  | { label: string; id?: string };

export type KdsSubTextProps = {
  subText?: string;
  /**
   * Reserve space for subtext to prevent layout shifts when helper text or errors appear
   */
  preserveSubTextSpace?: boolean;
};
