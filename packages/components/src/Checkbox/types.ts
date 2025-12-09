type BasePropsWithIndeterminate = {
  /**
   * Whether to allow the indeterminate state. When true, the checkbox supports tri-state values.
   * @default false
   */
  allowIndeterminate: true;
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

type BasePropsWithoutIndeterminate = {
  /**
   * Whether to allow the indeterminate state. When true, the checkbox supports tri-state values.
   * @default false
   */
  allowIndeterminate?: false;
  /**
   * The checked state of the checkbox
   */
  modelValue?: boolean;
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

type BaseProps = BasePropsWithIndeterminate | BasePropsWithoutIndeterminate;

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
// supports boolean by default
propTypeTester<KdsCheckboxProps>({ modelValue: true });
// supports indeterminate when explicitly enabled
propTypeTester<KdsCheckboxProps>({
  allowIndeterminate: true,
  modelValue: "indeterminate",
});
// supports boolean when allowIndeterminate is false
propTypeTester<KdsCheckboxProps>({
  allowIndeterminate: false,
  modelValue: true,
});
