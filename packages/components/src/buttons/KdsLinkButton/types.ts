import type { PrefixedKdsButtonProps } from "../KdsButton/types";
import type {
  KdsButtonCommonProps,
  WithDestructive,
  WithLabelAndIcons,
} from "../types";

type WithRouterNavigation = {
  /**
   * Route Location the link should navigate to when clicked on; passed to RouterLink/NuxtLink component if globally available
   */
  to: string | Record<string, unknown>;
};

type WithAnchorElementAttributes = {
  /**
   * If set to true, the link will be downloaded instead of navigating to it.
   */
  download?: boolean;
  /**
   * Where to display the linked URL, as the name for a browsing context.
   */
  target?: "_blank" | "_parent" | "_self" | "_top" | string | null;
  /**
   * A rel attribute value to apply on the link. In Nuxt, defaults to "noopener noreferrer" for external links.
   */
  rel?:
    | "noopener"
    | "noreferrer"
    | "nofollow"
    | "sponsored"
    | "ugc"
    | string
    | null;
};

export type KdsLinkButtonProps = KdsButtonCommonProps &
  WithLabelAndIcons &
  WithDestructive &
  WithRouterNavigation &
  WithAnchorElementAttributes;

/**
 * Prefixed version of link-specific props for use in composite components.
 * Explicitly defined to avoid Vue compiler issues with complex mapped types.
 */
type PrefixedLinkProps = {
  buttonTo: string | Record<string, unknown>;
  buttonDownload?: boolean;
  buttonTarget?: "_blank" | "_parent" | "_self" | "_top" | string | null;
  buttonRel?:
    | "noopener"
    | "noreferrer"
    | "nofollow"
    | "sponsored"
    | "ugc"
    | string
    | null;
};

export type PrefixedKdsLinkButtonProps = PrefixedKdsButtonProps &
  PrefixedLinkProps;

export type PrefixedKdsLinkButtonPropsAsNever = {
  buttonTo?: never;
  buttonDownload?: never;
  buttonTarget?: never;
  buttonRel?: never;
};

/**
 * Testers
 */

// @ts-expect-error - KdsLinkButton should require "to" prop
propTypeTester<KdsLinkButtonProps>({ label: "Label" });

// KdsLinkButton with to prop
propTypeTester<KdsLinkButtonProps>({ label: "Label", to: "/path" });
