import { kdsLoadingSkeletonVariant, loadingSkeletonItemShape } from "./enums";

export type KdsLoadingSkeletonVariant =
  (typeof kdsLoadingSkeletonVariant)[keyof typeof kdsLoadingSkeletonVariant];

export type LoadingSkeletonItemShape =
  (typeof loadingSkeletonItemShape)[keyof typeof loadingSkeletonItemShape];

type CssLength = `${number}%` | `var(--${string})`;

export type LoadingSkeletonItemProps = {
  /** Width in % or token variable. Defaults to 100% or default shape width. */
  width?: CssLength;

  /** Height in % or token variable. Only possible for `card` variant. */
  height?: CssLength;

  /** Selects the rendered skeleton shape */
  shape?: LoadingSkeletonItemShape;
};

type BaseProps = {
  /** Selects the rendered skeleton shapes/combined layout. */
  variant?: KdsLoadingSkeletonVariant;

  /** Whether to render skeletons (true) or slot content (false). */
  loading?: boolean;

  /** Number of skeletons to render. Defaults to 1. */
  repeat?: number;

  /** Gap between repeated skeletons as CSS token variable. Defaults to `var(--kds-spacing-container-1x)`. */
  repeatGap?: `var(--${string})`;

  /** Width in % or CSS token variable. Defaults to 100% or default shape width. */
  width?: CssLength;
};

type WithoutHeight = BaseProps & {
  /** Height in % or CSS token variable. Only possible for `card` variant. */
  height?: never;
};

type WithHeight = BaseProps & {
  variant: "card";

  /** Height in % or CSS token variable. Only possible for `card` variant. */
  height?: string;
};

export type KdsLoadingSkeletonProps = WithoutHeight | WithHeight;

/**
 * Testers
 */

propTypeTester<KdsLoadingSkeletonProps>({
  variant: "text",
  loading: true,
  repeat: 1,
  repeatGap: "var(--kds-spacing-container-1x)",
  width: "100%",
});

// @ts-expect-error - should not allow height for non-card variants
propTypeTester<KdsLoadingSkeletonProps>({
  variant: "button-medium",
  height: "var(--kds-size-unit-1x)",
});

propTypeTester<KdsLoadingSkeletonProps>({
  variant: "card",
  height: "var(--kds-size-unit-1x)",
});
