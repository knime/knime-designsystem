import type { KdsIconName } from "../../../../accessories";

export type KdsListItemSectionTitleProps = {
  /** Text shown in the section title row. */
  label: string;
  /** Optional leading icon shown before the section title. */
  iconName?: KdsIconName;
};
