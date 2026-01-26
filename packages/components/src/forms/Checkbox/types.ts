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

export type KdsCheckboxGroupOption = {
  text: string;
  id: string;
  disabled?: boolean;
  helperText?: string;
  error?: boolean;
};

export type KdsCheckboxGroupAlignment = "vertical" | "horizontal";

export type KdsCheckboxGroupProps = {
  id?: string;
  label?: string;
  possibleValues: Array<string | KdsCheckboxGroupOption>;
  alignment?: KdsCheckboxGroupAlignment;
  disabled?: boolean;
  subText?: string;
  preserveSubTextSpace?: boolean;
};

// supports minimal props
propTypeTester<KdsCheckboxGroupProps>({
  id: "checkbox-group-id",
  possibleValues: [
    { text: "Option A", id: "a" },
    { text: "Option B", id: "b" },
  ],
});

// supports without label
propTypeTester<KdsCheckboxProps>({});
// supports just label
propTypeTester<KdsCheckboxProps>({ label: "foo" });
// supports both label and helper text
propTypeTester<KdsCheckboxProps>({ label: "foo", helperText: "bar" });
// @ts-expect-error - should not allow helper text without label
propTypeTester<KdsCheckboxProps>({ helperText: "foo" });

// supports string array
propTypeTester<KdsCheckboxGroupProps>({
  id: "checkbox-group-id",
  possibleValues: ["Option A", "Option B"],
});
// supports optional label
propTypeTester<KdsCheckboxGroupProps>({
  id: "checkbox-group-id",
  label: "Group label",
  possibleValues: [
    { text: "Option A", id: "a" },
    { text: "Option B", id: "b" },
  ],
});
// @ts-expect-error - possibleValues are required
propTypeTester<KdsCheckboxGroupProps>({
  label: "Group label",
});
