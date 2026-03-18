import type { KdsMenuItem } from "../types.ts";

export type KdsMenuContainerProps = {
  /** id of the menu to be linked via aria-controls */
  id: string;
  /** id of the button that opens the menu */
  ariaLabelledBy?: string;
  /** Menu items rendered in the list */
  items: KdsMenuItem[];
  /** Limits the height of the menu container */
  menuMaxHeight?: string;
};

export type KdsMenuContainerExpose = {
  /** Moves focus to the menu list */
  focus: () => void;
};
