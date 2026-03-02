import type { KdsListItemAccessory } from "../ListItemAccessory/types.ts";

export type KdsListItemProps = {
  /** Unique identifier for the list item (also used as DOM id for aria-activedescendant patterns). */
  id: string;

  /** Text shown in the list item. */
  label: string;

  /** Optional leading accessory (icon, data type, color swatch, avatar, or live status). */
  accessory?: KdsListItemAccessory;

  /** Two-line subtext shown below the label. When provided, the item renders in multiline mode. */
  subText?: string;

  /** Applies "special content" styling (used when the content is not a standard data field). Only applies in singleline mode. */
  special?: boolean;

  /** Applies selected styling. */
  selected?: boolean;

  /** Highlights the item as the current keyboard-active option. */
  active?: boolean;

  /** Applies missing/error styling and prepends "(Missing)". */
  missing?: boolean;

  /** Disables interaction and dims the content. */
  disabled?: boolean;
};
