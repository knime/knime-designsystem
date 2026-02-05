export type KdsLabelProps = {
  label: string;
  /**
   * Id to link the label to form elements via `aria-labelledby`.
   */
  id: string;
  /**
   * Id of the form control this label is for.
   */
  for?: string;
  /**
   * Optional description/help text for the label.
   * When provided, an info toggle button is shown that opens a popover with this text.
   */
  description?: string;
};

export type KdsSubTextProps = {
  /**
   * Id to link the subtext to form elements via `aria-describedby`.
   */
  id: string;
  subText?: string;
  /**
   * When true, applies error styling to the subtext and shows the error icon.
   */
  error?: boolean;
  /**
   * When true, shows a loading spinner in the subtext area.
   */
  validating?: boolean;
  /**
   * Reserve space for subtext to prevent layout shifts when helper text or errors appear
   */
  preserveSubTextSpace?: boolean;
};
