import type { KdsListItemSinglelineProps } from "../ListItemSingleline/types";

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
