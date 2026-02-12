import type { KdsIconName } from "../../accessories/Icon/types";

export type KdsRadioButtonProps = {
  text: string;
  helperText?: string;
  disabled?: boolean;
  error?: boolean;
};

export type KdsRadioButtonGroupAlignment = "vertical" | "horizontal";

export type KdsRadioButtonGroupOption = {
  text: string;
  id: string;
  disabled?: boolean;
  helperText?: string;
  error?: boolean;
};

export type KdsRadioButtonGroupProps = {
  id?: string;
  label?: string;
  possibleValues: (string | KdsRadioButtonGroupOption)[];
  alignment?: KdsRadioButtonGroupAlignment;
  disabled?: boolean;
  subText?: string;
  preserveSubTextSpace?: boolean;
};

export type KdsValueSwitchSize = "small" | "medium";
export type KdsValueSwitchVariant = "default" | "muted";

export type KdsValueSwitchItemProps = {
  selected: boolean;
  disabled?: boolean;
  size?: KdsValueSwitchSize;
  variant?: KdsValueSwitchVariant;
  tabIndex?: number;
  /**
   * Internal/responsive: when true, leading/trailing icons are not rendered.
   */
  hideIcons?: boolean;
} & KdsValueSwitchItemContent;

type KdsValueSwitchItemContent =
  | {
      text: string;
      leadingIcon?: KdsIconName;
      trailingIcon?: KdsIconName;
      title?: undefined;
    }
  | {
      text?: never;
      leadingIcon: KdsIconName;
      title: string;
      trailingIcon?: never;
    };

export type KdsValueSwitchOption = {
  id: string;
  disabled?: boolean;
} & KdsValueSwitchItemContent;

export type KdsValueSwitchProps = {
  id?: string;
  label?: string;
  possibleValues: (string | KdsValueSwitchOption)[];
  size?: KdsValueSwitchSize;
  variant?: KdsValueSwitchVariant;
  disabled?: boolean;
  subText?: string;
  error?: boolean;
  preserveSubTextSpace?: boolean;
};

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
  id: "radio-group-id",
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

// supports group error state
propTypeTester<KdsValueSwitchProps>({
  id: "value-switch-id",
  possibleValues: ["Option A", "Option B"],
  error: true,
  subText: "Error message",
});

// supports variant
propTypeTester<KdsValueSwitchProps>({
  id: "value-switch-id",
  possibleValues: ["Option A", "Option B"],
  variant: "muted",
});
