export const kdsCheckboxGroupAlignment = {
  VERTICAL: "vertical",
  HORIZONTAL: "horizontal",
} as const;

export const kdsCheckboxGroupAlignments = Object.values(
  kdsCheckboxGroupAlignment,
);

export const kdsCheckboxValue = {
  CHECKED: true,
  UNCHECKED: false,
  INDETERMINATE: "indeterminate",
} as const;

export const kdsCheckboxValues = Object.values(kdsCheckboxValue);
