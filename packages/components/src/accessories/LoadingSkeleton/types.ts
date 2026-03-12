export const kdsLoadingSkeletonVariants = [
  "default",
  "text-default",
  "text-headline-with-paragraph",
  "icon-large",
  "icon-medium",
  "icon-small",
  "button-large",
  "button-medium",
  "button-small",
  "button-xsmall",
  "input-field",
  "list-item-large",
  "list-item-large-with-subtext",
  "list-item-small",
  "list-item-small-with-subtext",
  "card-default",
  "combined",
] as const;

export type KdsLoadingSkeletonVariant =
  (typeof kdsLoadingSkeletonVariants)[number];

type KdsLoadingSkeletonCssLength = `${number}%` | `var(--${string})`;

export type KdsLoadingSkeletonProps = {
  /** Width in % or token variable. Defaults to 100%. */
  width?: KdsLoadingSkeletonCssLength;

  /** Height in % or token variable. Defaults to var(--kds-spacing-container-1-25x). */
  height?: KdsLoadingSkeletonCssLength;

  /** Multiplies width and height values. Defaults to 1. */
  size?: number;

  /** Optional border radius value (for example a KDS token variable). Defaults to pill radius. */
  borderRadius?: string;

  /** Main API: selects the rendered skeleton preset/layout. */
  variant?: KdsLoadingSkeletonVariant;

  /** Whether to render skeletons (true) or slot content (false). */
  loading?: boolean;

  /** Number of skeleton items to render. Defaults to 1. */
  repeat?: number;

  /** Gap between repeated skeleton items as token variable. */
  repeatGap?: `var(--${string})`;
};
