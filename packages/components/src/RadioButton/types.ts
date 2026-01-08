type BaseProps = {
  /**
   * The selected state of the radio button
   */
  modelValue?: boolean;
  /**
   * Whether the radio button is disabled
   */
  disabled?: boolean;
  /**
   * Whether the radio button is in an error state
   */
  error?: boolean;
  /**
   * Title text shown on hover
   */
  title?: string;
};

export type KdsRadioButtonProps = BaseProps & {
  /**
   * The label text for the radio button (required)
   */
  label: string;
  /**
   * Helper text displayed below the label
   */
  helperText?: string;
};

// supports just label
propTypeTester<KdsRadioButtonProps>({ label: "foo" });
// supports both label and helper text
propTypeTester<KdsRadioButtonProps>({ label: "foo", helperText: "bar" });
// @ts-expect-error - label is required
propTypeTester<KdsRadioButtonProps>({});
// @ts-expect-error - should not allow helper text without label
propTypeTester<KdsRadioButtonProps>({ helperText: "foo" });
