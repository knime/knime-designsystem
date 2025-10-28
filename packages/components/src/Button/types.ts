import type { IconName } from "@knime/kds-styles/img/icons/def";

import type { Size } from "../types";

import type { Variant } from "./BaseButton.vue";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  destructive?: boolean;
  disabled?: boolean;
};

type WithLabelOrLeadingIcon = BaseProps & {
  label: string;
  leadingIcon?: IconName;
  trailingIcon?: IconName;
};

type EnsureLabelAndTrailingIcon = BaseProps & {
  label?: never;
  leadingIcon: IconName;
  trailingIcon?: never;
};

export type BaseButtonProps =
  | WithLabelOrLeadingIcon
  | EnsureLabelAndTrailingIcon;

// supports just label
propTypeTester<BaseButtonProps>({ label: "foo" });
// supports just leading icon
propTypeTester<BaseButtonProps>({ leadingIcon: "ai-general" });
// supports both leading icon and label
propTypeTester<BaseButtonProps>({ leadingIcon: "ai-general", label: "foo" });
// supports label and trailing icon
propTypeTester<BaseButtonProps>({ label: "foo", trailingIcon: "ai-general" });
// supports both leading supports all 3
propTypeTester<BaseButtonProps>({
  leadingIcon: "ai-general",
  label: "foo",
  trailingIcon: "ai-general",
});
// @ts-expect-error - should not allow leading and trailing icons without label
propTypeTester<BaseButtonProps>({
  leadingIcon: "ai-general",
  trailingIcon: "ai-general",
});
