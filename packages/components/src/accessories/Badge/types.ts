import type { KdsIconName } from "../Icon";

import { kdsBadgeSize, kdsBadgeVariant } from "./enums";

export type KdsBadgeVariant =
  (typeof kdsBadgeVariant)[keyof typeof kdsBadgeVariant];

export type KdsBadgeSize = (typeof kdsBadgeSize)[keyof typeof kdsBadgeSize];

export type KdsBadgeProps = {
  /** Visual variant of the badge. */
  variant: KdsBadgeVariant;

  /** Text content of the badge. */
  label: string;

  /** Size of the badge. Defaults to "xsmall". */
  size?: KdsBadgeSize;

  /** Icon shown next to the label. */
  icon?: KdsIconName;
};
