import type { IconName } from "@knime/kds-styles/img/icons/def";

import type { KdsButtonVariant } from "../Button/types";
import type { KdsSize } from "../types";

export type KdsProgressButtonState =
  | "default"
  | "progress"
  | "success"
  | "error";

type CommonProps = {
  size?: KdsSize;
  variant?: KdsButtonVariant;
  disabled?: boolean;
  title?: string;
};

type IconWithLabel = {
  label: string;
  leadingIcon: IconName;
  ariaLabel?: never;
};

type IconOnly = {
  label?: never;
  leadingIcon: IconName;
  ariaLabel: string;
};

type BehaviorProps = {
  /**
   * Current visual state of the progress button.
   * Use `v-model:state` to control the state externally.
   */
  state?: KdsProgressButtonState;

  /**
   * Optional async action handler.
   * If provided, the button will automatically switch through progress/success/error states.
   */
  action?: (event: MouseEvent) => Promise<unknown>;

  /** Delay before showing the spinner when `state` becomes `progress` (default: 200ms). */
  progressDelayMs?: number;

  /** Duration the success state is shown when using `action` (default: 750ms). */
  successDurationMs?: number;

  /** Duration the error state is shown when using `action` (default: 1000ms). */
  errorDurationMs?: number;
};

export type KdsProgressButtonProps = CommonProps &
  (IconWithLabel | IconOnly) &
  BehaviorProps;

propTypeTester<KdsProgressButtonProps>({
  label: "Label",
  leadingIcon: "ai-general",
});

propTypeTester<KdsProgressButtonProps>({
  leadingIcon: "ai-general",
  ariaLabel: "Icon only progress button",
});

// @ts-expect-error - aria-label is required for icon-only buttons
propTypeTester<KdsProgressButtonProps>({
  leadingIcon: "ai-general",
});
