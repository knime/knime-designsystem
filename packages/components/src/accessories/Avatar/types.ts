export type KdsAvatarProps = {
  /** Initials shown in the background as fallback and as base avatar content. */
  initials: string;

  /** Optional image. If provided and successfully loaded, it is shown instead of the initials. */
  src?: string;

  /** Tooltip text shown on hover and aria label (if provided). */
  title?: string;
};
