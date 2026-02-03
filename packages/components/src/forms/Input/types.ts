export type KdsInputLabelProps = {
  /**
   * Label text displayed above the input
   */
  label?: string;
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
