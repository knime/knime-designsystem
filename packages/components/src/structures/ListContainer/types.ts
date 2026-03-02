import {
  type KdsColorSwatchColor,
  type KdsIconName,
  type KdsLiveStatusStatus,
  type KdsTypeIconName,
} from "../../accessories";

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
  imageSrc?: string;
  title?: string;
};

export type KdsListItemAccessory =
  | KdsIconAccessory
  | KdsDataTypeAccessory
  | KdsColorSwatchAccessory
  | KdsLiveStatusAccessory
  | KdsAvatarAccessory;

export type KdsListItemCommonProps = {
  /** Unique identifier for the list item (also used as DOM id for aria-activedescendant patterns). */
  id: string;

  /** Optional leading accessory (icon, data type, color swatch, avatar). */
  accessory?: KdsListItemAccessory;

  /** Applies selected styling. */
  selected?: boolean;

  /** Highlights the item as the current keyboard-active option. */
  active?: boolean;

  /** Applies missing/error styling and prepends "(Missing)". */
  missing?: boolean;

  /** Disables interaction and dims the content. */
  disabled?: boolean;
};

export type KdsListItemMultilineProps = KdsListItemCommonProps & {
  /** Single-line label shown in the list item. */
  label: string;

  /** Two-line subtext shown below the label. */
  subText: string;
};

export type KdsListItemSinglelineProps = KdsListItemCommonProps & {
  /** Text shown in the list item. */
  label: string;

  /** Applies "special content" styling (used when the content is not a standard data field). */
  special?: boolean;
};
