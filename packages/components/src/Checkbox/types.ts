type BaseProps = {
  /**
   * Whether to allow the indeterminate state. When false, the checkbox only supports boolean values.
   * @default true
   */
  allowIndeterminate?: boolean;
  /**
   * The checked or indeterminate state of the checkbox.
   * When allowIndeterminate is false, this should only be boolean.
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

// Type helper for boolean-only checkboxes
export type KdsBooleanCheckboxProps = KdsCheckboxProps & {
  allowIndeterminate: false;
  modelValue?: boolean;
};

// supports without label
propTypeTester<KdsCheckboxProps>({});
// supports just label
propTypeTester<KdsCheckboxProps>({ label: "foo" });
// supports both label and helper text
propTypeTester<KdsCheckboxProps>({ label: "foo", helperText: "bar" });
// @ts-expect-error - should not allow helper text without label
propTypeTester<KdsCheckboxProps>({ helperText: "foo" });
// supports indeterminate by default
propTypeTester<KdsCheckboxProps>({ modelValue: "indeterminate" });
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
// supports boolean-only checkbox with explicit type
propTypeTester<KdsBooleanCheckboxProps>({
  allowIndeterminate: false,
  modelValue: true,
});
