export type LiteralUnion<T extends string> = T | (string & {});

export type WithAnchorElementAttributes = {
  /**
   * If set to true, the link will be downloaded instead of navigating to it.
   */
  download?: boolean;
  /**
   * Where to display the linked URL, as the name for a browsing context.
   */
  target?: LiteralUnion<"_blank" | "_parent" | "_self" | "_top"> | null;
  /**
   * A rel attribute value to apply on the link.
   */
  rel?: LiteralUnion<
    "noopener" | "noreferrer" | "nofollow" | "sponsored" | "ugc"
  > | null;
};
