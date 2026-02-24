export const kdsPopoverPlacement = {
  TOP_LEFT: "top-left",
  TOP_RIGHT: "top-right",
  BOTTOM_LEFT: "bottom-left",
  BOTTOM_RIGHT: "bottom-right",
} as const;

export const kdsPopoverPlacements = Object.values(kdsPopoverPlacement);

export const kdsPopoverRole = {
  DIALOG: "dialog",
  MENU: "menu",
  LISTBOX: "listbox",
} as const;

export const kdsPopoverRoles = Object.values(kdsPopoverRole);
