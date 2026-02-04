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
