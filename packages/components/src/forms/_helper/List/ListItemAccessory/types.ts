import {
  type KdsColorSwatchColor,
  type KdsIconName,
  type KdsLiveStatusStatus,
  type KdsTypeIconName,
} from "../../../../accessories";

import { kdsListItemAccessorySize } from "./enums";

export type KdsListItemAccessorySize =
  (typeof kdsListItemAccessorySize)[keyof typeof kdsListItemAccessorySize];

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

export type KdsLiveStatusAccessory = {
  type: "liveStatus";
  status: KdsLiveStatusStatus;
  title?: string;
};

export type KdsAvatarAccessory = {
  type: "avatar";
  initials: string;
  src?: string;
  title?: string;
};

export type KdsListItemAccessory =
  | KdsIconAccessory
  | KdsDataTypeAccessory
  | KdsColorSwatchAccessory
  | KdsLiveStatusAccessory
  | KdsAvatarAccessory;
