export const kdsButtonVariants = ["filled", "outlined", "transparent"] as const;

export const kdsToggleButtonVariants = kdsButtonVariants.filter((variant) => {
  return variant !== "filled";
});
