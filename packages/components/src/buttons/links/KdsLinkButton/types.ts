import type {
  KdsButtonCommonProps,
  WithDestructive,
  WithLabelAndIcons,
} from "../../types";
import type {
  WithAnchorElementAttributes,
  WithLinkNavigation,
} from "../linkTypes";

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
