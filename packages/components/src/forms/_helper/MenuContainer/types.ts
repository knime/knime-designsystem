import type { KdsIconName } from "../../../accessories";
import type {
  KdsAvatarAccessory,
  KdsIconAccessory,
  KdsLiveStatusAccessory,
} from "../List/ListItemAccessory/types";

type KdsMenuItemAccessory =
  | KdsIconAccessory
  | KdsLiveStatusAccessory
  | KdsAvatarAccessory;

export type KdsMenuItem = {
  id: string;
  /** Optional leading icon shown before a section headline */
  sectionHeadlineIcon?: KdsIconName;
  /**
   * When true, the item is rendered as a non-selectable section headline
   * (styled as a section title row). Section headline items are skipped
   * during keyboard navigation and cannot be clicked.
   */
  sectionHeadline?: boolean;
  /** Disables the option in the list */
  disabled?: boolean;
  /** Optional leading accessory (icon, data type, or color swatch) shown before the text */
  accessory?: KdsMenuItemAccessory;
  text: string;
  /** Optional subtext shown below the main label (multiline list item layout) */
  subText?: string;
  /** Show a separator below the item if it's not the last in the list */
  separator?: boolean;
};

export type KdsMenuContainerProps = {
  /** id of the menu to be linked via aria-controls */
  id: string;
  /** Accessible label for the menu */
  ariaLabel?: string;
  /** Menu items rendered in the list */
  items: KdsMenuItem[];
  /** Limits the height of the menu container */
  menuMaxHeight?: string;
};

export type KdsMenuContainerExpose = {
  /** Moves focus to the menu list */
  focus: () => void;
};
