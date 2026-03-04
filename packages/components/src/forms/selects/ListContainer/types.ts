import type { ComponentPublicInstance, MaybeRef } from "vue";

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
  /** Shows the option as selected in the list */
};

export type KdsListContainerProps = {
  /** Possible values to show in the list */
  possibleValues: KdsListOption[];
  /** Text shown when no entries match the search */
  noEntriesText?: string;
  /** Reference to the controlling element (e.g. filter input). If empty, list is focusable and controls itself. */
  controlEl?: MaybeRef<HTMLElement | ComponentPublicInstance | null>;
};
