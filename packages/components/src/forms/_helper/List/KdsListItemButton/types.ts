import type { KdsIconName } from "../../../../accessories";

export type KdsListItemButtonProps = {
  /** Text shown in the button item. */
  label: string;

  /** Leading icon displayed before the label. */
  leadingIcon: KdsIconName;

  /** Disables interaction and dims the content. */
  disabled?: boolean;
};
