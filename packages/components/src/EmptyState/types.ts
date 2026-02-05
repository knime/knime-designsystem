import type {
  PrefixedAnchorAttributesAsNever,
  PrefixedButtonPropsAsNever,
  PrefixedKdsButtonProps,
  PrefixedKdsLinkButtonProps,
  PrefixedRouterNavigationAsNever,
} from "../buttons/types";

type CommonProps = {
  headline: string;
  description?: string;
};

type BaseEmptyStateProps = CommonProps & PrefixedButtonPropsAsNever;

type EmptyStateWithButtonProps = CommonProps &
  PrefixedKdsButtonProps &
  PrefixedRouterNavigationAsNever &
  PrefixedAnchorAttributesAsNever;

type EmptyStateWithLinkButtonProps = CommonProps & PrefixedKdsLinkButtonProps;

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
// @ts-expect-error - buttonTo requires buttonLabel or icon
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
