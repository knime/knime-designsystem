import { kdsAvatarSize } from "./enums";

export type KdsAvatarSize = (typeof kdsAvatarSize)[keyof typeof kdsAvatarSize];

export type KdsAvatarProps = {
  /** Initials shown in the background as fallback and as base avatar content. */
  initials: string;

  /** Optional image. If provided and successfully loaded, it is shown instead of the initials. */
  src?: string;

  /**
   * Size of the avatar.
   * - Use "small" and "large" mainly for list item accessories.
   * - Use "xlarge" for standalone avatars.
   *
   * Defaults to "xlarge".
   */
  size?: KdsAvatarSize;

  /** Tooltip text shown on hover and aria label. */
  title?: string;
};
