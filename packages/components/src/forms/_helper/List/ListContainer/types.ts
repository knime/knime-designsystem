import type { Ref } from "vue";

import type { KdsIconName } from "../../../../accessories";
import type { KdsListItemAccessory } from "../ListItemAccessory/types";

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
};

/** A group of options with an optional section title */
export type KdsListGroup = {
  /** Optional section title label shown above the group */
  label?: string;
  /** Optional leading icon shown before the section title */
  leadingIcon?: KdsIconName;
  /** Selectable options in this group */
  options: KdsListOption[];
};

export type KdsListContainerProps = {
  /**
   * Options to show in the list.
   * Pass a flat `KdsListOption[]` for an ungrouped list, or
   * `KdsListGroup[]` to render labelled groups separated by dividers.
   */
  possibleValues: KdsListOption[] | KdsListGroup[];
  /** Text shown when no entries are provided */
  emptyText?: string;
  /** Accessible label for the listbox */
  ariaLabel?: string;
  /** When true, the list is controlled externally (e.g. by a search input). The list will not be focusable and the parent must forward events via the exposed handleKeydown/handleFocus/handleBlur methods. */
  controlledExternally?: boolean;
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
};
