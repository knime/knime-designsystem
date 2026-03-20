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
  /** Width in % or token variable. Defaults to 100%. */
  width?: KdsLoadingSkeletonCssLength;

  /** Height in % or token variable. Defaults to var(--kds-spacing-container-1-25x). */
  height?: KdsLoadingSkeletonCssLength;

  /** selects the rendered skeleton shape */
  shape?: kdsLoadingSkeletonItemShape;
};

export type KdsLoadingSkeletonProps = {
  /** Width in % or token variable. Defaults to 100%. */
  width?: KdsLoadingSkeletonCssLength;

  /** Height in % or token variable. Defaults to var(--kds-spacing-container-1-25x). */
  height?: KdsLoadingSkeletonCssLength;

  /** Main API: selects the rendered skeleton preset/layout. */
  variant?: KdsLoadingSkeletonVariant;

  /** Whether to render skeletons (true) or slot content (false). */
  loading?: boolean;

  /** Number of skeleton items to render. Defaults to 1. */
  repeat?: number;

  /** Gap between repeated skeleton items as token variable. */
  repeatGap?: `var(--${string})`;
};
