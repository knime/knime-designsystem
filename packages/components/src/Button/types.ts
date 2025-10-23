import type { IconName } from "src/Icon/Icon.vue";

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
  icon?: IconName;
  trailingIcon?: IconName;
};

type EnsureLabelAndTrailingIcon = BaseProps & {
  label?: never;
  icon: IconName;
  trailingIcon?: never;
};

export type BaseButtonProps =
  | WithLabelOrLeadingIcon
  | EnsureLabelAndTrailingIcon;

declare function buttonPropTester(p: BaseButtonProps): void;

// supports just label
buttonPropTester({ label: "foo" });
// supports just leading icon
buttonPropTester({ icon: "ai-general" });
// supports both leading icon and label
buttonPropTester({ icon: "ai-general", label: "foo" });
// supports label and trailing icon
buttonPropTester({ label: "foo", trailingIcon: "ai-general" });
// supports both leading supports all 3
buttonPropTester({
  icon: "ai-general",
  label: "foo",
  trailingIcon: "ai-general",
});
// @ts-expect-error - should not allow leading and trailing icons without label
buttonPropTester({ icon: "ai-general", trailingIcon: "ai-general" });
