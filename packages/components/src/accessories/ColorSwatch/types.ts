import { kdsColorSwatchType } from "./enums";

export type KdsColorSwatchType =
  (typeof kdsColorSwatchType)[keyof typeof kdsColorSwatchType];

/**
 * A CSS color string starting with `#` (for example `#fff` or `#ff0000`).
 *
 * Note: We intentionally keep this type simple to avoid TypeScript's
 * "union type too complex" errors that can happen with fully enumerated
 * template-literal unions. This type does not guarantee a valid hex format.
 */
export type KdsHexColor = `#${string}`;

export type KdsColorSwatchColor = KdsColorSwatchType | KdsHexColor;

export type KdsColorSwatchProps = {
  /**
   * Semantic swatch type (maps to `kds.color.nodes-and-variables.*` tokens),
   * or a custom CSS color string starting with `#` (typically a short or long hex value).
   */
  color: KdsColorSwatchColor;

  /** Tooltip text shown on hover and aria label. */
  title?: string;
};
