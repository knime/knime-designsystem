import type { KdsAccessory } from "../../accessories";

export type KdsListItemMultilineProps = {
  /** Single-line title shown in the list item. */
  title: string;

  /** Two-line subtitle shown below the title. */
  subtitle: string;

  /** Optional leading accessory (icon, data type, color swatch, or avatar). */
  accessory?: KdsAccessory;

  /** Applies selected styling and shows a checkmark. */
  selected?: boolean;

  /** Applies missing/error styling and prepends "(Missing)". */
  missing?: boolean;

  /** Disables interaction and dims the content. */
  disabled?: boolean;
};
