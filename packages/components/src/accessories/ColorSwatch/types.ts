export const kdsColorSwatchTypes = [
  "learner",
  "manipulator",
  "predictor",
  "sink",
  "source",
  "visualizer",
  "other",
] as const;

export type KdsColorSwatchType = (typeof kdsColorSwatchTypes)[number];

/**
 * A CSS color string starting with `#` (for example `#fff` or `#ff0000`).
 *
 * Note: We intentionally keep this type simple to avoid TypeScript's
 * "union type too complex" errors that can happen with fully enumerated
 * template-literal unions. This type does not guarantee a valid hex format.
 */
export type KdsHexColor = `#${string}`;

export type KdsColorSwatchProps = {
  /**
   * Semantic swatch type (maps to `kds.color.nodes-and-variables.*` tokens),
   * or a custom CSS color string starting with `#` (typically a short or long hex value).
   */
  color: KdsColorSwatchType | KdsHexColor;

  /** Tooltip text shown on hover and aria label. */
  title?: string;
};
