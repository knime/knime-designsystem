type BaseProps = {
  /**
   * The checked or indeterminate state of the checkbox
   */
  modelValue?: boolean | "indeterminate";
  /**
   * Whether the checkbox is disabled
   */
  disabled?: boolean;
  /**
   * Whether the checkbox is in an error state
   */
  error?: boolean;
  /**
   * Title text shown on hover
   */
  title?: string;
};

type WithoutLabelAndHelperText = BaseProps & {
  label?: never;
  helperText?: never;
};

type WithLabelAndHelperText = BaseProps & {
  /**
   * The label text for the checkbox
   */
  label: string;
  /**
   * Helper text displayed below the label
   */
  helperText?: string;
};

export type KdsCheckboxProps =
  | WithoutLabelAndHelperText
  | WithLabelAndHelperText;

// supports without label
propTypeTester<KdsCheckboxProps>({});
// supports just label
propTypeTester<KdsCheckboxProps>({ label: "foo" });
// supports both label and helper text
propTypeTester<KdsCheckboxProps>({ label: "foo", helperText: "bar" });
// @ts-expect-error - should not allow helper text without label
propTypeTester<KdsCheckboxProps>({ helperText: "foo" });
