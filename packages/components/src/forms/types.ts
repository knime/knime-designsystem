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

export type KdsInputProps = {
  /**
   * Placeholder text for the input element
   */
  placeholder?: string;
  /**
   * Whether the input is disabled
   */
  disabled?: boolean;
  /**
   * Whether the input is readonly
   */
  readonly?: boolean;
  /**
   * Whether the input is required
   */
  required?: boolean;
  /**
   * Name attribute for the input element
   */
  name?: string;
  /**
   * Autocomplete attribute for the input element
   */
  autocomplete?: string;
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
   * When true, applies error styling to the subtext and shows the error icon when subtext is present.
   */
  error?: boolean;
  /**
   * When true and subtext is present, shows a loading spinner in the subtext area.
   */
  validating?: boolean;
  /**
   * Reserve space for subtext to prevent layout shifts when helper text or errors appear
   */
  preserveSubTextSpace?: boolean;
};

export type KdsFormFieldProps = KdsLabelProps & KdsInputProps & KdsSubTextProps;
