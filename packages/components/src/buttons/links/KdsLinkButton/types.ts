import type {
  KdsButtonCommonProps,
  WithDestructive,
  WithLabelAndIcons,
} from "../../types";
import type { WithAnchorElementAttributes } from "../linkTypes";

type WithLinkNavigation = {
  /**
   * URL or path string to navigate to.
   *
   * If your app uses typed route-location objects, create an app-level wrapper
   * (e.g. with `RouterLink`/`NuxtLink`) that accepts those props and passes a
   * string URL/path to this component.
   */
  to: string;
};

export type KdsLinkButtonProps = KdsButtonCommonProps &
  WithLabelAndIcons &
  WithDestructive &
  WithLinkNavigation &
  WithAnchorElementAttributes;

/**
 * Testers
 */

// @ts-expect-error - KdsLinkButton should require "to" prop
propTypeTester<KdsLinkButtonProps>({ label: "Label" });

// KdsLinkButton with to prop
propTypeTester<KdsLinkButtonProps>({ label: "Label", to: "/path" });
