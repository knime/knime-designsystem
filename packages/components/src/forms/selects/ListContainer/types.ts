import type { Ref } from "vue";

import type { KdsListItemAccessory } from "../../_helper/List/ListItemAccessory/types.ts";

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

export type KdsListContainerProps = {
  /** Possible values to show in the list */
  possibleValues: KdsListOption[];
  /** Text shown when no entries match the search */
  noEntriesText?: string;
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
  /** The id of the currently active (highlighted) option, or undefined */
  activeId: Readonly<Ref<string | undefined>>;
};
