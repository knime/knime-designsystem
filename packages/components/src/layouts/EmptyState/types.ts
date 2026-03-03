import type { KdsButtonProps, KdsLinkButtonProps } from "../../buttons";

export type KdsEmptyStateProps = {
  headline: string;
  description?: string;
  button?: KdsButtonProps | KdsLinkButtonProps;
};

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
// supports headline and button with label
propTypeTester<KdsEmptyStateProps>({
  headline: "headline",
  button: { label: "foo" },
});
// supports headline and link button with label and to
propTypeTester<KdsEmptyStateProps>({
  headline: "headline",
  button: { label: "foo", to: "#" },
});
// supports icon buttons
propTypeTester<KdsEmptyStateProps>({
  headline: "headline",
  button: { leadingIcon: "placeholder", ariaLabel: "placeholder" },
});
// @ts-expect-error - headline is required
propTypeTester<KdsEmptyStateProps>({
  button: { label: "foo" },
});
// button requires at least label or leadingIcon
propTypeTester<KdsEmptyStateProps>({
  headline: "headline",
  // @ts-expect-error - button requires at least label or leadingIcon
  button: { to: "#" },
});
