import type { KdsIconSize } from "../Icon/types";

export type KdsLoadingSpinnerVariant = "onPrimary" | "onSurface";

export type KdsLoadingSpinnerProps = {
  size?: KdsIconSize;
  variant?: KdsLoadingSpinnerVariant;
};
