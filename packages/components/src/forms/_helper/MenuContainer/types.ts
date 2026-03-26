import type { KdsMenuItem } from "../../../buttons/KdsMenuButton/types";

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
