import type { KdsIconName } from "..";

export type KdsLabelProps =
  | { label?: never; trailingIcon?: never; trailingIconTitle?: never }
  | { label: string; trailingIcon?: never; trailingIconTitle?: never }
  | {
      label: string;
      trailingIcon: KdsIconName;
      trailingIconTitle: string;
    };

export type KdsSubTextProps = {
  subText?: string;
  preserveSubTextSpace?: boolean;
};
