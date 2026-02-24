import type { KdsListItemAccessory } from "./types";

export const iconAccessory: KdsListItemAccessory = {
  type: "icon",
  name: "text",
};

export const dataTypeAccessory: KdsListItemAccessory = {
  type: "dataType",
  name: "string-datatype",
};

export const colorSwatchAccessory: KdsListItemAccessory = {
  type: "colorSwatch",
  color: "#dc3545",
  title: "Danger",
};

export const avatarAccessory: KdsListItemAccessory = {
  type: "avatar",
  initials: "AB",
  title: "Avatar",
};

export const liveStatusAccessory: KdsListItemAccessory = {
  type: "liveStatus",
  status: "green",
  title: "Running",
};

export const demoAccessories: Record<string, KdsListItemAccessory> = {
  Icon: iconAccessory,
  DataType: dataTypeAccessory,
  ColorSwatch: colorSwatchAccessory,
  Avatar: avatarAccessory,
  LiveStatus: liveStatusAccessory,
};
