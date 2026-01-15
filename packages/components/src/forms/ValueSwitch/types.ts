import type { KdsLabelProps, KdsSubTextProps } from "../types.ts";

export type KdsValueSwitchSize = "small" | "medium";

type AtLeastTwo<T> = [T, T, ...T[]];

export type KdsValueSwitchOption = {
  text: string;
  id: string;
  disabled?: boolean;
  helperText?: string;
  error?: boolean;
};

export type KdsValueSwitchProps = {
  possibleValues: AtLeastTwo<string | KdsValueSwitchOption>;
  size?: KdsValueSwitchSize;
  disabled?: boolean;
} & KdsLabelProps &
  KdsSubTextProps;

// supports minimal props
propTypeTester<KdsValueSwitchProps>({
  id: "value-switch-id",
  possibleValues: [
    { text: "Option A", id: "a" },
    { text: "Option B", id: "b" },
  ],
});

// supports optional label
propTypeTester<KdsValueSwitchProps>({
  label: "Group label",
  possibleValues: [
    { text: "Option A", id: "a" },
    { text: "Option B", id: "b" },
  ],
});

// @ts-expect-error - possibleValues are required
propTypeTester<KdsValueSwitchProps>({
  label: "Group label",
});

// supports size
propTypeTester<KdsValueSwitchProps>({
  id: "value-switch-id",
  possibleValues: ["Option A", "Option B"],
  size: "small",
});
