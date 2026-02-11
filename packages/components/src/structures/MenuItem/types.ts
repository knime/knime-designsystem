import type { KdsIconName } from "../../Icon/types";

export const kdsMenuItemSizes = ["small", "medium"] as const;

export type KdsMenuItemSize = (typeof kdsMenuItemSizes)[number];

export type KdsMenuItemProps = {
  size?: KdsMenuItemSize;
  title: string;
  subtext?: string;
  selected?: boolean;
  active?: boolean;
  disabled?: boolean;
  leadingAccessory?: KdsIconName;
  trailingIcon?: KdsIconName;
  shortcut?: string;
};
