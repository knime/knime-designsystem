import type { KdsColorSwatchColor } from "./ColorSwatch/types";
import type { KdsIconName, KdsTypeIconName } from "./Icon/types";

export type KdsIconAccessory = {
  type: "icon";
  name: KdsIconName;
};

export type KdsDataTypeAccessory = {
  type: "dataType";
  name: KdsTypeIconName;
};

export type KdsColorSwatchAccessory = {
  type: "colorSwatch";
  color: KdsColorSwatchColor;
  title?: string;
};

export type KdsAvatarAccessory = {
  type: "avatar";
  initials: string;
  imageSrc?: string;
  title?: string;
};

export type KdsAccessory =
  | KdsIconAccessory
  | KdsDataTypeAccessory
  | KdsColorSwatchAccessory
  | KdsAvatarAccessory;
