import { kdsLoadingSkeletonVariant } from "./enums";

export type KdsLoadingSkeletonVariant =
  (typeof kdsLoadingSkeletonVariant)[keyof typeof kdsLoadingSkeletonVariant];

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
