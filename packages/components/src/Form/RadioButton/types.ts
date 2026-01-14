import type { KdsLabelProps, KdsSubTextProps } from "../types.ts";

export type KdsRadioButtonProps = {
  text: string;
  subText?: string;
  disabled?: boolean;
  error?: boolean;
};

type KdsRadioButtonGroupAlignment = "vertical" | "horizontal";

type AtLeastTwo<T> = [T, T, ...T[]];

export type KdsRadioButtonGroupOption = {
  text: string;
  id: string;
  disabled?: boolean;
  subText?: string;
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
propTypeTester<KdsRadioButtonProps>({ text: "foo", subText: "bar" });
// @ts-expect-error - text is required
propTypeTester<KdsRadioButtonProps>({});
// @ts-expect-error - should not allow helper text without text
propTypeTester<KdsRadioButtonProps>({ subText: "foo" });

// supports minimal props
propTypeTester<KdsRadioButtonGroupProps>({
  possibleValues: [
    { text: "Option A", id: "a" },
    { text: "Option B", id: "b" },
  ],
});

// supports optional label and icon
propTypeTester<KdsRadioButtonGroupProps>({
  label: "Group label",
  trailingIcon: "re-execution",
  trailingIconTitle: "Needs re-execution",
  possibleValues: [
    { text: "Option A", id: "a" },
    { text: "Option B", id: "b" },
  ],
});

// @ts-expect-error - possibleValues are required
propTypeTester<KdsRadioButtonGroupProps>({
  label: "Group label",
});

// @ts-expect-error - icon must also define a title
propTypeTester<KdsRadioButtonGroupProps>({
  label: "Group label",
  trailingIcon: "re-execution",
  possibleValues: [
    { text: "Option A", id: "a" },
    { text: "Option B", id: "b" },
  ],
});
