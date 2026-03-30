import {
  kdsLoadingSkeletonItemShape,
  kdsLoadingSkeletonVariant,
} from "./enums";

export type KdsLoadingSkeletonVariant =
  (typeof kdsLoadingSkeletonVariant)[keyof typeof kdsLoadingSkeletonVariant];

export type kdsLoadingSkeletonItemShape =
  (typeof kdsLoadingSkeletonItemShape)[keyof typeof kdsLoadingSkeletonItemShape];

type KdsLoadingSkeletonCssLength = `${number}%` | `var(--${string})`;

export type KdsLoadingSkeletonItemProps = {
  /** Width in % or token variable. Defaults to 100% or default shape width. */
  width?: KdsLoadingSkeletonCssLength;

  /** Height in % or token variable. Only possible for `card` variant. */
  height?: KdsLoadingSkeletonCssLength;

  /** Selects the rendered skeleton shape */
  shape?: kdsLoadingSkeletonItemShape;
};

export type KdsLoadingSkeletonProps = {
  /** Selects the rendered skeleton shapes/combined layout. */
  variant?: KdsLoadingSkeletonVariant;

  /** Whether to render skeletons (true) or slot content (false). */
  loading?: boolean;

  /** Number of skeletons to render. Defaults to 1. */
  repeat?: number;

  /** Gap between repeated skeletons as CSS token variable. Defaults to `var(--kds-spacing-container-1x)`. */
  repeatGap?: `var(--${string})`;

  /** Width in % or CSS token variable. Defaults to 100% or default shape width. */
  width?: KdsLoadingSkeletonCssLength;

  /** Height in % or CSS token variable. Only possible for `card` variant. */
  height?: KdsLoadingSkeletonCssLength;
};
