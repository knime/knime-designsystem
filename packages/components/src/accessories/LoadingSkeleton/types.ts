export type KdsLoadingSkeletonVariant =
  | "generic"
  | "button"
  | "icon-button"
  | "rounded-sm"
  | "rounded-md";

export type KdsLoadingSkeletonProps = {
  /** Width in px or %. Defaults to 100%. */
  width?: `${number}px` | `${number}%`;

  /** Height in px or %. Defaults to 100%. */
  height?: `${number}px` | `${number}%`;

  /** Optional border radius value (for example a KDS token variable). Defaults to pill radius. */
  borderRadius?: string;

  /** Skeleton shape variant. */
  variant?: KdsLoadingSkeletonVariant;

  /** Whether to render skeletons (true) or slot content (false). */
  loading?: boolean;

  /** Number of skeleton items to render. Defaults to 1. */
  repeat?: number;

  /** Gap between repeated skeleton items in px. */
  repeatGap?: `${number}px`;
};
