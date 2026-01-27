import type {
  KdsButtonProps,
  KdsLinkButtonProps,
  WithAnchorElementAttributes,
  WithRouterNavigation,
} from "../Button/types";
import type { PrefixKeys, TypeAsNever } from "../types";

type CommonProps = {
  headline: string;
  description?: string;
};

type buttonPropsPrefix = "button";

type ButtonPrefixedProps = PrefixKeys<KdsButtonProps, buttonPropsPrefix>;
type LinkButtonPrefixedProps = PrefixKeys<
  KdsLinkButtonProps,
  buttonPropsPrefix
>;
type AnchorAttributesAsNever = TypeAsNever<
  PrefixKeys<WithAnchorElementAttributes, buttonPropsPrefix>
>;
type RouterNavigationAsNever = TypeAsNever<
  PrefixKeys<WithRouterNavigation, buttonPropsPrefix>
>;
type LinkButtonPropsAsNever = TypeAsNever<LinkButtonPrefixedProps>;

type BaseEmptyStateProps = CommonProps & LinkButtonPropsAsNever;

type EmptyStateWithButtonProps = CommonProps &
  ButtonPrefixedProps &
  RouterNavigationAsNever &
  AnchorAttributesAsNever;

type EmptyStateWithLinkButtonProps = CommonProps & LinkButtonPrefixedProps;

export type KdsEmptyStateProps =
  | BaseEmptyStateProps
  | EmptyStateWithButtonProps
  | EmptyStateWithLinkButtonProps;

/**
 * Testers
 */
// supports just headline
propTypeTester<KdsEmptyStateProps>({ headline: "headline" });
// supports headline and description
propTypeTester<KdsEmptyStateProps>({
  headline: "headline",
  description: "description",
});
// supports headline and minimal button props
propTypeTester<KdsEmptyStateProps>({
  headline: "headline",
  buttonLabel: "foo",
});
// supports headline and minimal link button props
propTypeTester<KdsEmptyStateProps>({
  headline: "headline",
  buttonLabel: "foo",
  buttonTo: "#",
});
// supports icon buttons
propTypeTester<KdsEmptyStateProps>({
  headline: "headline",
  buttonLeadingIcon: "placeholder",
  buttonAriaLabel: "placeholder",
});
// @ts-expect-error trailing icon requires label
propTypeTester<KdsEmptyStateProps>({
  headline: "headline",
  buttonTrailingIcon: "placeholder",
});
// @ts-expect-error - headline is required
propTypeTester<KdsEmptyStateProps>({
  buttonLabel: "foo",
});
// @ts-expect-error - buttonTo requires buttonLabel
propTypeTester<KdsEmptyStateProps>({
  headline: "headline",
  buttonTo: "#",
});
// @ts-expect-error - buttonTarget requires buttonTo
propTypeTester<KdsEmptyStateProps>({
  headline: "headline",
  buttonLabel: "foo",
  buttonTarget: "_blank",
});
