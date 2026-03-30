import type { KdsFormFieldProps } from "../../types";
import type { KdsMultiSelectListBoxOption } from "../MultiSelectListBox/types";

export type KdsSortableListBoxOption = KdsMultiSelectListBoxOption;

export type KdsSortableListBoxProps = {
  /** All available options with their metadata. The display order is determined by the v-model. */
  possibleValues: KdsSortableListBoxOption[];
  /** Whether the list box is disabled */
  disabled?: boolean;
  /** Whether to render a resize handle below the list box and allow vertical resizing */
  useResizeHandle?: boolean;
  /** Optional item pinned to the bottom of the list, always visible while scrolling. Interacts like a regular item for selection, keyboard navigation, and drag. */
  bottomValue?: KdsSortableListBoxOption;
} & KdsFormFieldProps;
