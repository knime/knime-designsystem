import type { IconName } from "@knime/kds-styles/img/icons/def";

import type { Size } from "../types";

import type { buttonVariants } from "./constants";

export type ButtonVariant = (typeof buttonVariants)[number];

type BaseProps = {
  variant?: ButtonVariant;
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

export type ButtonProps = BaseButtonProps;

export type LinkButtonProps = BaseButtonProps & {
  // RouterLink props

  /**
   * Route Location the link should navigate to when clicked on; passed to RouterLink/NuxtLink component if globally available
   */
  to: string | Record<string, unknown>; // not the exact type, but don't want to add the dependency on vue-router
} & {
  // Anchor element attributes

  /**
   * If set to true, the link will be downloaded instead of navigating to it.
   */
  download?: boolean;
  /**
   * Where to display the linked URL, as the name for a browsing context.
   */
  target?: "_blank" | "_parent" | "_self" | "_top" | string | null;
  /**
   * A rel attribute value to apply on the link. In Nuxt, defaults to "noopener noreferrer" for external links.
   */
  rel?:
    | "noopener"
    | "noreferrer"
    | "nofollow"
    | "sponsored"
    | "ugc"
    | string
    | null;
};
