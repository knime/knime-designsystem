export const kdsModalClosedBy = {
  ANY: "any",
  CLOSEREQUEST: "closerequest",
  NONE: "none",
} as const;

export const kdsModalClosedByOptions = Object.values(kdsModalClosedBy);

export const kdsModalWidth = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
  XLARGE: "xlarge",
  FULL: "full",
} as const;

export const kdsModalWidthSizes = Object.values(kdsModalWidth);

export const kdsModalHeight = {
  AUTO: "auto",
  FULL: "full",
} as const;

export const kdsModalHeightSizes = Object.values(kdsModalHeight);

export const kdsModalVariant = {
  PADDED: "padded",
  PLAIN: "plain",
} as const;

export const kdsModalVariants = Object.values(kdsModalVariant);

export const kdsModalLayoutPropsDefault = {
  title: "",
  variant: kdsModalVariant.PADDED,
  overflow: "auto",
  icon: undefined,
} as const;

export const kdsModalPropsDefault = {
  active: false,
  height: kdsModalHeight.AUTO,
  width: kdsModalWidth.MEDIUM,
  closedby: kdsModalClosedBy.CLOSEREQUEST,
  ...kdsModalLayoutPropsDefault,
} as const;
