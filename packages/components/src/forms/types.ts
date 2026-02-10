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
};

export type KdsSubTextProps = {
  /**
   * Id to link the subtext to form elements via `aria-describedby`.
   */
  id: string;
  /**
   * Subtext to provide additional information about the form field, such as helper text or error messages.
   */
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

export type KdsFormFieldProps = {
  /**
   * Input id
   */
  id?: string;
  /**
   * Label text or an object with an aria-label for accessibility when a visible label is not desired.
   */
  label: string | { ariaLabel: string };
} & Omit<KdsSubTextProps, "id">;
