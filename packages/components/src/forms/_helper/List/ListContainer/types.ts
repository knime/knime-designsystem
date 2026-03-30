import type { Ref } from "vue";

import type { KdsIconName } from "../../../../accessories";
import type { KdsListItemVariant } from "../KdsListItem";
import type { KdsListItemAccessory } from "../ListItemAccessory/types";

import { kdsListContainerRole } from "./enums";

export type KdsListContainerRole =
  (typeof kdsListContainerRole)[keyof typeof kdsListContainerRole];

export type KdsListOption = {
  id: string;
  text: string;
  /** Optional subtext shown below the main label (multiline list item layout) */
  subText?: string;
  /** Renders the item as selected */
  selected?: boolean;
  /** Renders the label with emphasis (italic) for special content like columns */
  special?: boolean;
  /** Optional leading accessory (icon, data type, or color swatch) shown before the text */
  accessory?: KdsListItemAccessory;
  /** Disables the option in the list */
  disabled?: boolean;
  /** Shows the option as missing in the list */
  missing?: boolean;
  /**
   * When true, the item is rendered as a non-selectable section headline
   * (styled as a section title row). Section headline items are skipped
   * during keyboard navigation and cannot be clicked.
   */
  sectionHeadline?: boolean;
  /** Optional leading icon shown before a section headline */
  sectionHeadlineIcon?: KdsIconName;
  /** Show a separator below the item if it's not the last in the list */
  separator?: boolean;
  /** When provided, renders the item as an <a> tag linking to this URL. */
  href?: string;
  /**
   * Optional route path. When provided, the item renders using
   * RouterLink/NuxtLink if available, otherwise falls back to an <a> tag.
   * Only string paths are supported (e.g. "/settings"); route objects are
   * not accepted because the fallback <a> tag cannot resolve them.
   */
  to?: string;
};

export type KdsListContainerProps = {
  /**
   * Options to show in the list.
   * Items with `sectionHeadline: true` are rendered as non-selectable
   * section titles. Items with `separator: true` show a divider below them.
   */
  possibleValues: KdsListOption[];
  /** Visual size variant of the list items. Defaults to "small". */
  variant?: KdsListItemVariant;
  /** Text shown when no entries are provided */
  emptyText?: string;
  /** Whether the list is in loading state */
  loading?: boolean;
  /** Accessible label for the list container */
  ariaLabel?: string;
  /** When true, the list is controlled externally (e.g. by a search input). The list will not be focusable and the parent must forward events via the exposed handleKeydown/handleFocus/handleBlur methods. */
  controlledExternally?: boolean;
  /** When true, the active highlight can be cleared so that no item is active. ArrowUp from the first item and ArrowDown from the last item move to the unselected state, and focusing the list does not auto-activate an item. Useful for search result lists where the user may not want any pre-selection. */
  allowNoSelection?: boolean;
  /** ARIA role applied to the root element. */
  role?: KdsListContainerRole;
};

export type KdsListContainerExpose = {
  /** Forward a keydown event to the list for keyboard navigation */
  handleKeydown: (event: KeyboardEvent) => void;
  /** Notify the list that its controlling element received focus */
  handleFocus: () => void;
  /** Notify the list that its controlling element lost focus */
  handleBlur: () => void;
  /** The DOM id of the currently active (highlighted) option, or undefined. Prefixed to avoid DOM id collisions. */
  activeDescendant: Readonly<Ref<string | undefined>>;
  /** Moves focus to the list container element */
  focus: () => void;
};
