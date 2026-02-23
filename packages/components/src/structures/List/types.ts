import type { KdsAccessory } from "../../accessories";

export type KdsListItemAccessory = KdsAccessory | { type: "reserveSpace" };

export type KdsListItemMultilineProps = {
  /** Single-line title shown in the list item. */
  title: string;

  /** Two-line subtitle shown below the title. */
  subtitle: string;

  /** Optional leading accessory (icon, data type, color swatch, or avatar). */
  accessory?: KdsListItemAccessory;

  /** Applies selected styling and shows a checkmark. */
  selected?: boolean;

  /** Applies missing/error styling and prepends "(Missing)". */
  missing?: boolean;

  /** Disables interaction and dims the content. */
  disabled?: boolean;
};

export type KdsListItemSinglelineProps = {
  /** Unique identifier for the list item (also used as DOM id for aria-activedescendant patterns). */
  id: string;

  /** Text shown in the list item. */
  label: string;

  /** Optional leading accessory (icon, data type, color swatch, avatar, or reserveSpace for alignment). */
  accessory?: KdsListItemAccessory;

  /** Applies "special content" styling (used when the content is not a standard data field). */
  specialContent?: boolean;

  /** Applies selected styling. */
  selected?: boolean;

  /** Highlights the item as the current keyboard-active option. */
  active?: boolean;

  /** Applies missing/error styling and prepends "(Missing)". */
  missing?: boolean;

  /** Disables interaction and dims the content. */
  disabled?: boolean;
};

export type KdsListContainerProps = {
  /** Optional DOM id for the listbox element. */
  id?: string;

  /** ID of element(s) that label this listbox. */
  ariaLabelledby?: string;

  /** Items to render inside the list container. */
  items: readonly KdsListItemSinglelineProps[];

  /** Text shown when the list is empty. */
  emptyText?: string;
};
