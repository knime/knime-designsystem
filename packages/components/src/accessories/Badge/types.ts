import type { KdsIconName } from "../Icon";

import { kdsBadgeSize, kdsBadgeVariant } from "./enums";

export type KdsBadgeVariant =
  (typeof kdsBadgeVariant)[keyof typeof kdsBadgeVariant];

export type KdsBadgeSize = (typeof kdsBadgeSize)[keyof typeof kdsBadgeSize];

export type KdsBadgeProps = {
  /** Text content of the badge. */
  label: string;

  /** Visual variant of the badge. */
  variant?: KdsBadgeVariant;

  /** Size of the badge. Defaults to "xsmall". */
  size?: KdsBadgeSize;

  /** Icon shown next to the label. */
  icon?: KdsIconName;
};
