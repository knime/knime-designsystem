import type { KdsIconName, KdsTypeIconName } from "../../../Icon/types";

type BaseListItemProps = {
  id: string;
  text: string;
  active: boolean;
  selected: boolean;
  disabled?: boolean;
};

export type KdsDropdownContainerProps = {
  anchorName: string;
};

export type KdsDropdownContainerEmits = {
  toggle: [event: Event];
};

export type KdsDropdownContainerExposed = {
  showPopover: () => void;
  hidePopover: () => void;
};

export type KdsListContainerProps = {
  id: string;
  ariaLabelledby?: string;
  empty: boolean;
  emptyText: string;
};

export type KdsListItemProps = BaseListItemProps & {
  missing?: boolean;
  leadingIcon?: KdsTypeIconName;
};

export type KdsListItemEmits = {
  click: [];
  mouseenter: [];
};

export type KdsListItemActionProps = {
  icon: KdsIconName;
  "aria-label": string;
  title?: string;
};

export type KdsListItemActionEmits = {
  click: [];
};
