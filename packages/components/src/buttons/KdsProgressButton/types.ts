import type { KdsIconName } from "../../accessories/Icon/types";
import type { KdsButtonCommonProps } from "../types";

import { kdsProgressButtonState } from "./enums";

export type KdsProgressButtonState =
  (typeof kdsProgressButtonState)[keyof typeof kdsProgressButtonState];

type KdsProgressButtonIconWithLabel = {
  label: string;
  leadingIcon: KdsIconName;
  ariaLabel?: never;
};

type KdsProgressButtonIconOnly = {
  label?: never;
  leadingIcon: KdsIconName;
  ariaLabel: string;
};

export type KdsProgressButtonProps = KdsButtonCommonProps &
  (KdsProgressButtonIconWithLabel | KdsProgressButtonIconOnly);

/**
 * Testers
 */

// ProgressButton supports label + icon
propTypeTester<KdsProgressButtonProps>({
  label: "Label",
  leadingIcon: "ai-general",
});

// ProgressButton supports icon-only variant
propTypeTester<KdsProgressButtonProps>({
  leadingIcon: "ai-general",
  ariaLabel: "Icon only progress button",
});

// @ts-expect-error - aria-label is required for icon-only buttons
propTypeTester<KdsProgressButtonProps>({
  leadingIcon: "ai-general",
});
