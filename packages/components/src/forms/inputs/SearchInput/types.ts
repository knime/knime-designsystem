import type { KdsIconName } from "../../../accessories";
import type { KdsIconAccessory } from "../../_helper/List/ListItemAccessory/types";
import type { KdsInputFieldProps } from "../types";

export type KdsSearchResult = {
  id: string;
  /** Optional leading icon shown before a section headline */
  sectionHeadlineIcon?: KdsIconName;
  /**
   * When true, the item is rendered as a non-selectable section headline
   * (styled as a section title row). Section headline items are skipped
   * during keyboard navigation and cannot be clicked.
   */
  sectionHeadline?: boolean;
  /** Optional leading accessory (icon only) shown before the text */
  accessory?: KdsIconAccessory;
  text: string;
  /** Optional subtext shown below the main label (multiline list item layout) */
  subText?: string;
  /** Show a separator below the item if it's not the last in the list */
  separator?: boolean;
};

export type KdsSearchInputProps = KdsInputFieldProps & {
  /**
   * Results to show in the ListContainer rendered below the input field.
   * If it's undefined, ListContainer is not loaded.
   * Items with `sectionHeadline: true` are rendered as non-selectable
   * section titles. Items with `separator: true` show a divider below them.
   */
  results?: KdsSearchResult[];
  /** Max height of the results container */
  resultsMaxHeight?: string;
};
