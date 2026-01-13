import type { KdsIconName } from "..";

export type KdsLabelProps =
  | { label?: never; labelTrailingIcon?: never; labelTrailingIconTitle?: never }
  | { label: string; labelTrailingIcon?: never; labelTrailingIconTitle?: never }
  | {
      label: string;
      labelTrailingIcon: KdsIconName;
      labelTrailingIconTitle: string;
    };

export type KdsSubTextProps = {
  subText?: string;
  preserveSubTextSpace?: boolean;
};
