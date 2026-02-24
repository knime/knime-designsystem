import type { KdsIconName } from "../../../../accessories";
import type { KdsListItemAccessory } from "../ListItemAccessory/types.ts";

import type { kdsListItemVariant } from "./enums";

export type KdsListItemVariant =
  (typeof kdsListItemVariant)[keyof typeof kdsListItemVariant];

export type KdsListItemProps = {
  /** Unique identifier for the list item (also used as DOM id for aria-activedescendant patterns). */
  id: string;

  /** Text shown in the list item. */
  label: string;

  /** Optional leading accessory (icon, data type, color swatch, avatar, or live status). */
  accessory?: KdsListItemAccessory;

  /** One or two-line subtext shown below the label */
  subText?: string;

  /** Visual size variant of the list item. Influences accessory/icon sizing, gaps and typography. */
  variant?: KdsListItemVariant;

  /** Optional shortcut text shown at the end of the row (e.g. "Ctrl + 1"). Only shown when the item is not selected and not missing. */
  shortcut?: string;

  /** Optional trailing icon displayed at the end of the row (e.g. "checkmark" for selected, "trash" for missing). */
  trailingIcon?: KdsIconName;

  /** Applies "special content" styling (used when the content is not a standard data field). Only applies in singleline mode. */
  special?: boolean;

  /** Applies selected styling. */
  selected?: boolean;

  /** Highlights the item as the current keyboard-active option with the focused outline. */
  active?: boolean;

  /** Applies missing/error styling and prepends "(Missing)". */
  missing?: boolean;

  /** Disables interaction and dims the content. */
  disabled?: boolean;
};
