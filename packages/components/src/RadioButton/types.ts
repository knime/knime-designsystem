import type { KdsIconName } from "../Icon/types";

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

export type KdsRadioButtonGroupValue = string | number;

export type KdsRadioButtonGroupAlignment = "vertical" | "horizontal";

type AtLeastTwo<T> = [T, T, ...T[]];

export type KdsRadioButtonGroupOption<
  TValue extends KdsRadioButtonGroupValue = KdsRadioButtonGroupValue,
> = {
  label: string;
  value: TValue;
  disabled?: boolean;
  helperText?: string;
  title?: string;
};

export type KdsRadioButtonGroupProps<
  TValue extends KdsRadioButtonGroupValue = KdsRadioButtonGroupValue,
> = {
  label: string;
  modelValue?: TValue | null;
  alignment?: KdsRadioButtonGroupAlignment;
  options: AtLeastTwo<KdsRadioButtonGroupOption<TValue>>;
  disabled?: boolean;
  error?: boolean;
  labelIcon?: KdsIconName;
  labelIconTitle?: string;
};

// supports minimal props
propTypeTester<KdsRadioButtonGroupProps>({
  label: "Group label",
  options: [
    { label: "Option A", value: "a" },
    { label: "Option B", value: "b" },
  ],
  alignment: "horizontal",
});

// supports optional label icon
propTypeTester<KdsRadioButtonGroupProps>({
  label: "Group label",
  options: [
    { label: "Option A", value: "a" },
    { label: "Option B", value: "b" },
  ],
  labelIcon: "re-execution",
});

// @ts-expect-error - label is required
propTypeTester<KdsRadioButtonGroupProps>({
  options: [
    { label: "Option", value: "a" },
    { label: "Option", value: "b" },
  ],
});

// @ts-expect-error - options are required
propTypeTester<KdsRadioButtonGroupProps>({
  label: "Group label",
});

propTypeTester<KdsRadioButtonGroupProps>({
  label: "Group label",
  // @ts-expect-error - options must contain at least two entries
  options: [{ label: "Option", value: "a" }],
});
