export type MenuListItem = {
  id: string;
  text: string;
  subtext?: string;
  disabled?: boolean;
};

export type MenuListProps = {
  id?: string;
  ariaLabel?: string;
  ariaLabelledby?: string;
  items: MenuListItem[];
  emptyText?: string;
};

export type MenuItemProps = {
  id: string;
  item: MenuListItem;
  selected: boolean;
  active: boolean;
};

export type MenuItemEmits = {
  click: [];
  mouseenter: [];
};
