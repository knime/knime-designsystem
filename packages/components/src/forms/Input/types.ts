export type KdsInputLabelProps = {
  /**
   * Label text displayed above the input
   */
  label?: string;
  /**
   * Optional description/help text for the label.
   */
  description?: string;
  /**
   * Helper text or error message displayed below the input
   */
  subText?: string;
  /**
   * Reserve space for subtext to prevent layout shifts
   */
  preserveSubTextSpace?: boolean;
  /**
   * Placeholder text when input is empty
   */
  placeholder?: string;
  /**
   * Name attribute for the input element
   */
  name?: string;
  /**
   * Autocomplete attribute for the input element
   */
  autocomplete?: string;
};

export type KdsInputStateProps = {
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
   * Whether the input has an error state
   */
  error?: boolean;
  /**
   * Whether the input is in a validating state (shows loading indicator)
   */
  validating?: boolean;
};

export type KdsTextInputProps = KdsInputLabelProps & KdsInputStateProps;

export type KdsNumberInputProps = KdsInputLabelProps & {
  /**
   * Unit shown next to the input value
   */
  unit?: string;
  /**
   * Minimum allowed value
   */
  min?: number;
  /**
   * Maximum allowed value
   */
  max?: number;
  /**
   * Step size used for +/- buttons and arrow key increments
   */
  step?: number;
} & KdsInputStateProps;

export type KdsPatternInputProps = KdsInputLabelProps & KdsInputStateProps;

export type KdsSearchInputProps = KdsInputLabelProps &
  KdsInputStateProps & {
    /** ID for the input element. If not provided, a unique ID will be generated. */
    id?: string;
  };

export type KdsCredentialsUserPasswordProps = KdsInputLabelProps &
  KdsInputStateProps;

export type KdsCredentialsApiKeyProps = KdsInputLabelProps & KdsInputStateProps;

export type KdsTemporalType = "DATE" | "TIME" | "DATE_TIME" | "ZONED_DATE_TIME";

export type KdsDateFormatCategory =
  | "RECENT"
  | "STANDARD"
  | "EUROPEAN"
  | "AMERICAN";

export type KdsDateTimeFormatEntry = {
  format: string;
  temporalType: KdsTemporalType;
  category: KdsDateFormatCategory;
  example?: string;
};

export type KdsDateTimeFormatInputProps = KdsInputLabelProps &
  KdsInputStateProps & {
    /** Text shown when the list of format options is empty. */
    emptyText?: string;

    /**
     * Restricts the available date/time format options by their temporal type.
     * If omitted, there are no restrictions.
     */
    allowedFormats?: KdsTemporalType[];

    /**
     * Full list of available date/time formats.
     * Defaults to the built-in formats from `./constants`.
     */
    allDefaultFormats?: KdsDateTimeFormatEntry[];
  };
