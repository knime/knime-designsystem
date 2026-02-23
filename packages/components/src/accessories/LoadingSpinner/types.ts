import type { KdsIconSize } from "../Icon";

import { kdsLoadingSpinnerVariant } from "./enums";

export type KdsLoadingSpinnerVariant =
  (typeof kdsLoadingSpinnerVariant)[keyof typeof kdsLoadingSpinnerVariant];

export type KdsLoadingSpinnerProps = {
  size?: KdsIconSize;
  variant?: KdsLoadingSpinnerVariant;
};
