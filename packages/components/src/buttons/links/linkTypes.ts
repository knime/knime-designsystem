export type LiteralUnion<T extends string> = T | (string & {});

export type WithLinkNavigation = {
  /**
   * URL or path string to navigate to.
   *
   * To support typed routes and route-location objects, please create an app-level wrapper
   * (e.g. with `RouterLink`/`NuxtLink`) as described in the Storybook documentation of this component.
   */
  to: string;
};

export type WithAnchorElementAttributes = {
  /**
   * If true, the link will be downloaded instead of navigating to it.
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
