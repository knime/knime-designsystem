// Generic base type with conditional modelValue based on allowIndeterminate
type KdsCheckboxBaseProps<T extends boolean = boolean> = {
  /**
   * Whether to allow the indeterminate state. When true, the checkbox supports tri-state values.
   * @default false
   */
  allowIndeterminate?: T;
  /**
   * The checked or indeterminate state of the checkbox
   */
  modelValue?: T extends true ? boolean | "indeterminate" : boolean;
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

type WithoutLabelAndHelperText<T extends boolean = boolean> =
  KdsCheckboxBaseProps<T> & {
    label?: never;
    helperText?: never;
  };

type WithLabelAndHelperText<T extends boolean = boolean> =
  KdsCheckboxBaseProps<T> & {
    /**
     * The label text for the checkbox
     */
    label: string;
    /**
     * Helper text displayed below the label
     */
    helperText?: string;
  };

// Main props type - use wide boolean type internally
export type KdsCheckboxProps<T extends boolean = boolean> =
  | WithoutLabelAndHelperText<T>
  | WithLabelAndHelperText<T>;

// Emit types with conditional modelValue
export type KdsCheckboxEmits<T extends boolean = boolean> = {
  "update:modelValue": [
    value: T extends true ? boolean | "indeterminate" : boolean,
  ];
};

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
propTypeTester<KdsCheckboxProps<true>>({
  allowIndeterminate: true,
  modelValue: "indeterminate",
});
// supports boolean when allowIndeterminate is false
propTypeTester<KdsCheckboxProps<false>>({
  allowIndeterminate: false,
  modelValue: true,
});
