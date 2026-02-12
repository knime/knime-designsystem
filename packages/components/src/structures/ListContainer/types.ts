import type { KdsListItemSinglelineProps } from "../ListItemSingleline/types";

export type KdsListContainerProps = {
  /** Optional DOM id for the listbox element. */
  id?: string;

  /** ID of element(s) that label this listbox. */
  ariaLabelledby?: string;

  /** Prefix used to generate DOM ids for options (for aria-activedescendant patterns). */
  optionIdPrefix?: string;

  /** Items to render inside the list container. */
  items: readonly KdsListItemSinglelineProps[];

  /** Shows the default leading datatype icon for each item. */
  showLeadingAccessory?: boolean;

  /** Text shown when the list is empty. */
  emptyText?: string;
};
