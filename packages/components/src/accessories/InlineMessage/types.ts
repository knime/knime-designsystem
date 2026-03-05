import { kdsInlineMessageVariant } from "./enums";

export type KdsInlineMessageVariant =
  (typeof kdsInlineMessageVariant)[keyof typeof kdsInlineMessageVariant];

export type KdsInlineMessageProps = {
  /** Optional title displayed on top of the inline message. */
  title?: string;

  /** Message content displayed in the inline message. */
  message?: string;

  /** Optional variant. */
  variant?: KdsInlineMessageVariant;
};
