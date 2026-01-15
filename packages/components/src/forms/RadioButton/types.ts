import type { KdsLabelProps, KdsSubTextProps } from "../types.ts";

export type KdsRadioButtonProps = {
  text: string;
  helperText?: string;
  disabled?: boolean;
  error?: boolean;
};

export type KdsRadioButtonGroupAlignment = "vertical" | "horizontal";

type AtLeastTwo<T> = [T, T, ...T[]];

export type KdsRadioButtonGroupOption = {
  text: string;
  id: string;
  disabled?: boolean;
  helperText?: string;
  error?: boolean;
};

export type KdsRadioButtonGroupProps = {
  possibleValues: AtLeastTwo<string | KdsRadioButtonGroupOption>;
  alignment?: KdsRadioButtonGroupAlignment;
  disabled?: boolean;
} & KdsLabelProps &
  KdsSubTextProps;

// supports just text
propTypeTester<KdsRadioButtonProps>({ text: "foo" });
// supports both text and helper text
propTypeTester<KdsRadioButtonProps>({ text: "foo", helperText: "bar" });
// @ts-expect-error - text is required
propTypeTester<KdsRadioButtonProps>({});
// @ts-expect-error - should not allow helper text without text
propTypeTester<KdsRadioButtonProps>({ helperText: "foo" });

// supports minimal props
propTypeTester<KdsRadioButtonGroupProps>({
  possibleValues: [
    { text: "Option A", id: "a" },
    { text: "Option B", id: "b" },
  ],
});

// supports optional label
propTypeTester<KdsRadioButtonGroupProps>({
  label: "Group label",
  possibleValues: [
    { text: "Option A", id: "a" },
    { text: "Option B", id: "b" },
  ],
});

// @ts-expect-error - possibleValues are required
propTypeTester<KdsRadioButtonGroupProps>({
  label: "Group label",
});
