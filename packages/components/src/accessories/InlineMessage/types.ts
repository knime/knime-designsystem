import { kdsInlineMessageVariant } from "./enums";

export type KdsInlineMessageVariant =
  (typeof kdsInlineMessageVariant)[keyof typeof kdsInlineMessageVariant];

export type KdsInlineMessageProps = {
  /** The title displayed at the top of the inline message. */
  title: string;

  /** The message content displayed inside the inline message. To render rich text or other components, use the default slot instead. */
  message?: string;

  /** Variant of the inline message. */
  variant?: KdsInlineMessageVariant;
};
