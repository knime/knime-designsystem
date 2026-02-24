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
   * Optional description displayed in an info popover next to the label.
   */
  description?: string;
  /**
   * When true, shows the info toggle button (used when hovering the form field).
   */
  showDescriptionButton?: boolean;
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

type KdsInputDescriptionProps = {
  /**
   * Optional description displayed in an info popover next to the label.
   * The info toggle button is only visible when hovering the input field.
   */
  description?: string;
};

type KdsInputLabelProps = KdsInputDescriptionProps &
  (
    | {
        /**
         * Visible label text for the input.
         */
        label: string;
        ariaLabel?: never;
      }
    | {
        label?: never;
        /**
         * Accessible label used when no visible label is rendered.
         */
        ariaLabel: string;
      }
  );

type KdsInputSubTextProps = Omit<KdsSubTextProps, "id">;

type KdsInputElementProps = {
  /**
   * Id for associating labels and hint/error text.
   */
  id?: string;
};

export type KdsFormFieldProps = KdsInputLabelProps &
  KdsInputElementProps &
  KdsInputSubTextProps;

export type KdsFormFieldExpose = {
  /**
   * Focuses the input element
   */
  focus: () => void;
};
