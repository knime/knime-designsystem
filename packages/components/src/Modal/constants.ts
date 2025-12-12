export const closedByOptions = ["any", "closerequest", "none"] as const;
export const widthSizes = [
  "small",
  "medium",
  "large",
  "xlarge",
  "full",
] as const;
export const heightSizes = ["auto", "full"] as const;
export const modalVariants = ["padded", "plain"] as const;
export const modalLayoutPropsDefault = {
  title: "",
  variant: "padded",
  overflow: "auto",
  icon: undefined,
} as const;

export const modalPropsDefault = {
  active: false,
  height: "auto",
  width: "medium",
  closedby: "closerequest",
  ...modalLayoutPropsDefault,
} as const;
