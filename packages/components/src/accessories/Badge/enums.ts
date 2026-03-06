export const kdsBadgeVariant = {
  NEUTRAL: "neutral",
  INFO: "info",
  WARNING: "warning",
  SUCCESS: "success",
  ERROR: "error",
  GHOST: "ghost",
} as const;

export const kdsBadgeVariants = Object.values(kdsBadgeVariant);

export const kdsBadgeSize = {
  XXSMALL: "xxsmall",
  XSMALL: "xsmall",
} as const;

export const kdsBadgeSizes = Object.values(kdsBadgeSize);
