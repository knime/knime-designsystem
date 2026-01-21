import type { KdsLabelProps, KdsSubTextProps } from "../../forms/types.ts";

export type KdsCheckboxGroupAlignment = "vertical" | "horizontal";

export type KdsCheckboxGroupOption = {
  text: string;
  id: string;
  disabled?: boolean;
  helperText?: string;
  error?: boolean;
};

export type KdsCheckboxGroupProps = {
  possibleValues: Array<string | KdsCheckboxGroupOption>;
  alignment?: KdsCheckboxGroupAlignment;
  disabled?: boolean;
} & KdsLabelProps &
  KdsSubTextProps;

// supports minimal props
propTypeTester<KdsCheckboxGroupProps>({
  id: "checkbox-group-id",
  possibleValues: [
    { text: "Option A", id: "a" },
    { text: "Option B", id: "b" },
  ],
});

// supports string array
propTypeTester<KdsCheckboxGroupProps>({
  id: "checkbox-group-id",
  possibleValues: ["Option A", "Option B"],
});

// supports optional label
propTypeTester<KdsCheckboxGroupProps>({
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
