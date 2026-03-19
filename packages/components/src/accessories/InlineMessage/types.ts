import { kdsInlineMessageVariant } from "./enums";

export type KdsInlineMessageVariant =
  (typeof kdsInlineMessageVariant)[keyof typeof kdsInlineMessageVariant];

export type KdsInlineMessageProps = {
  /** The headline displayed at the top of the inline message. */
  headline: string;

  /** The description content displayed inside the inline message. */
  description?: string;

  /** Variant of the inline message. */
  variant?: KdsInlineMessageVariant;
};
