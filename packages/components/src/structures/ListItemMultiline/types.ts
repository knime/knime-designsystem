export type KdsListItemMultilineAvatarAccessory = {
  type: "avatar";
  initials: string;
  imageSrc?: string;
  title?: string;
};

export type KdsListItemMultilineProps = {
  /** Single-line title shown in the list item. */
  title: string;

  /** Two-line subtitle shown below the title. */
  subtitle: string;

  /** Optional leading avatar accessory. */
  accessory?: KdsListItemMultilineAvatarAccessory;

  /** Applies selected styling and shows a checkmark. */
  selected?: boolean;

  /** Applies missing/error styling and prepends "(Missing)". */
  missing?: boolean;

  /** Disables interaction and dims the content. */
  disabled?: boolean;
};
