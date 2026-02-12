import type { KdsColorSwatchColor } from "../../accessories";
import type {
  KdsIconName,
  KdsTypeIconName,
} from "../../accessories/Icon/types";

export type KdsListItemSinglelineAccessory =
  | {
      type: "icon";
      name: KdsIconName;
    }
  | {
      type: "dataType";
      name: KdsTypeIconName;
    }
  | {
      type: "colorSwatch";
      /** Any valid CSS color value (prefer CSS vars from kds tokens). */
      color: KdsColorSwatchColor;
      title?: string;
    };

export type KdsListItemSinglelineProps = {
  /** Unique identifier for the list item (also used as DOM id for aria-activedescendant patterns). */
  id: string;

  /** Text shown in the list item. */
  label: string;

  /** Optional leading accessory (icon, data type, or color swatch). */
  accessory?: KdsListItemSinglelineAccessory;

  /** Applies "special content" styling (used when the content is not a standard data field). */
  specialContent?: boolean;

  /** Applies selected styling. */
  selected?: boolean;

  /** Highlights the item as the current keyboard-active option. */
  active?: boolean;

  /** Applies missing/error styling and prepends "(Missing)". */
  missing?: boolean;

  /** Disables interaction and dims the content. */
  disabled?: boolean;
};
