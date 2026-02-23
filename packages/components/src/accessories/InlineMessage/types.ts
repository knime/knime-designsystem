import type { kdsInlineMessageVariant } from "./enums";

export type KdsInlineMessageVariant =
  (typeof kdsInlineMessageVariant)[keyof typeof kdsInlineMessageVariant];

export type KdsInlineMessageProps = {
  /** Message content displayed in the inline message. */
  message?: string;

  /** Optional variant. */
  variant: KdsInlineMessageVariant;

  /** Title on top of the inline message. */
  title: string;
};
