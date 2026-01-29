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

type LabelOrTitle =
  | {
      /**
       * The label text for the checkbox
       */
      label: string;
      title?: never;
    }
  | {
      label?: "" | undefined | never;
      /**
       * Used when no visible label is provided (required for accessibility).
       */
      title: string;
    };

export type BaseCheckboxProps = BaseProps &
  LabelOrTitle & {
    /**
     * Helper text displayed below the label
     */
    helperText?: string;
  };

export type KdsCheckboxProps = BaseProps & LabelOrTitle;

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

// BaseCheckbox supports without label (but requires aria-label)
// @ts-expect-error - BaseCheckbox requires either label or aria-label
propTypeTester<BaseCheckboxProps>({});
// BaseCheckbox supports title only
propTypeTester<BaseCheckboxProps>({ title: "foo" });
// BaseCheckbox supports label
propTypeTester<BaseCheckboxProps>({ label: "foo" });
// BaseCheckbox supports helper text
propTypeTester<BaseCheckboxProps>({ label: "foo", helperText: "bar" });
// KdsCheckbox supports label or title
propTypeTester<KdsCheckboxProps>({ label: "foo" });
propTypeTester<KdsCheckboxProps>({ title: "foo" });
// @ts-expect-error - KdsCheckbox should not allow helperText
propTypeTester<KdsCheckboxProps>({ label: "foo", helperText: "bar" });
// @ts-expect-error - KdsCheckbox requires label or aria-label
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
