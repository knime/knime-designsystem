import type { KdsIconName } from "../../Icon/types.ts";

export type KdsRadioButtonProps = {
  modelValue?: boolean;
  label: string;
  subText?: string;
  disabled?: boolean;
  error?: boolean;
  title?: string;
};

type KdsRadioButtonGroupAlignment = "vertical" | "horizontal";

type AtLeastTwo<T> = [T, T, ...T[]];

type KdsLabelProps =
  | { label?: never; labelTrailingIcon?: never; labelTrailingIconTitle?: never }
  | { label: string; labelTrailingIcon?: never; labelTrailingIconTitle?: never }
  | {
      label: string;
      labelTrailingIcon: KdsIconName;
      labelTrailingIconTitle: string;
    };

export type KdsRadioButtonGroupOption<TValue extends string = string> = {
  label: string;
  value: TValue;
  disabled?: boolean;
  subText?: string;
  title?: string;
  error?: boolean;
};

export type KdsRadioButtonGroupProps<TValue extends string = string> = {
  modelValue?: TValue | null;
  options: AtLeastTwo<KdsRadioButtonGroupOption<TValue>>;
  alignment?: KdsRadioButtonGroupAlignment;
  disabled?: boolean;
  subText?: string;
} & KdsLabelProps;

// supports just label
propTypeTester<KdsRadioButtonProps>({ label: "foo" });
// supports both label and helper text
propTypeTester<KdsRadioButtonProps>({ label: "foo", subText: "bar" });
// @ts-expect-error - label is required
propTypeTester<KdsRadioButtonProps>({});
// @ts-expect-error - should not allow helper text without label
propTypeTester<KdsRadioButtonProps>({ subText: "foo" });

// supports minimal props
propTypeTester<KdsRadioButtonGroupProps>({
  options: [
    { label: "Option A", value: "a" },
    { label: "Option B", value: "b" },
  ],
});

// supports optional label and icon
propTypeTester<KdsRadioButtonGroupProps>({
  label: "Group label",
  labelTrailingIcon: "re-execution",
  labelTrailingIconTitle: "Needs re-execution",
  options: [
    { label: "Option A", value: "a" },
    { label: "Option B", value: "b" },
  ],
});

// @ts-expect-error - options are required
propTypeTester<KdsRadioButtonGroupProps>({
  label: "Group label",
});

// @ts-expect-error - icon must also define a title
propTypeTester<KdsRadioButtonGroupProps>({
  label: "Group label",
  labelTrailingIcon: "re-execution",
  options: [
    { label: "Option A", value: "a" },
    { label: "Option B", value: "b" },
  ],
});
