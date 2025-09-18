export const variants = ["filled", "outlined", "transparent"] as const;
export type Variant = (typeof variants)[number];
