export type KdsCheckboxValue = boolean | "indeterminate";

type BaseProps = {
  /**
   * Whether the checkbox is disabled
   */
  disabled?: boolean;
  /**
   * Whether the checkbox is in an error state
   */
  error?: boolean;
  /**
   * Optional helper or error text shown below the checkbox and referenced via aria-describedby.
   */
  subText?: string;
  /**
   * Reserve space for subtext to prevent layout shifts when helper text or errors appear.
   */
  preserveSubTextSpace?: boolean;
};

export type BaseCheckboxProps = BaseProps & {
  /**
   * The label text for the checkbox
   */
  label?: string;
  /**
   * Helper text displayed below the label
   */
  helperText?: string;
};

export type KdsCheckboxProps = BaseProps & {
  /**
   * The label text for the checkbox
   */
  label?: string;
};

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

// BaseCheckbox supports without label
propTypeTester<BaseCheckboxProps>({});
// BaseCheckbox supports label
propTypeTester<BaseCheckboxProps>({ label: "foo" });
// BaseCheckbox supports helper text
propTypeTester<BaseCheckboxProps>({ label: "foo", helperText: "bar" });
// KdsCheckbox supports label
propTypeTester<KdsCheckboxProps>({ label: "foo" });
// @ts-expect-error - KdsCheckbox should not allow helperText
propTypeTester<KdsCheckboxProps>({ label: "foo", helperText: "bar" });
// KdsCheckbox supports without label (e.g. for useHideOnNull)
propTypeTester<KdsCheckboxProps>({});
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
