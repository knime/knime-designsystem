import type { WithAnchorElementAttributes } from "../linkTypes";

import { kdsLinkVariant } from "./enums";

export type KdsLinkVariant =
  (typeof kdsLinkVariant)[keyof typeof kdsLinkVariant];

type KdsLinkBaseProps = {
  /**
   * Label rendered as the clickable link text.
   */
  label: string;
  /**
   * Optional base title text shown on hover.
   *
   * The rendered title is variant-aware: internal links are prefixed with
   * `Open`, document links with `Download`, and external links append
   * ` (opens in a new tab)` when their effective target is `_blank`.
   */
  title?: string;
  /**
   * If set to true, the link is visually disabled and non-interactive.
   */
  disabled?: boolean;
} & WithAnchorElementAttributes;

export type KdsInternalLinkProps = KdsLinkBaseProps & {
  /**
   * URL or path string to navigate to.
   */
  to: string;
  /**
   * File size suffix is only supported for document links.
   */
  fileSize?: never;
  /**
   * Visual link variant.
   *
   * If omitted, the component infers `internal` vs `external` from `to`.
   * `document` is never inferred automatically because that would require
   * fetching the resource metadata.
   */
  variant?: typeof kdsLinkVariant.INTERNAL;
};

export type KdsExternalLinkProps = KdsLinkBaseProps & {
  /**
   * File size suffix is only supported for document links.
   */
  fileSize?: never;
  /**
   * Visual link variant.
   */
  variant: typeof kdsLinkVariant.EXTERNAL;
  /**
   * URL to navigate to.
   */
  to: string;
};

export type KdsDocumentLinkProps = KdsLinkBaseProps & {
  /**
   * File size text shown after the label.
   */
  fileSize: string;
  /**
   * Visual link variant.
   */
  variant: typeof kdsLinkVariant.DOCUMENT;
  /**
   * URL to the document.
   */
  to: string;
};

export type KdsLinkProps =
  | KdsInternalLinkProps
  | KdsExternalLinkProps
  | KdsDocumentLinkProps;

/**
 * Testers
 */

// @ts-expect-error - KdsLink should require "label"
propTypeTester<KdsLinkProps>({ to: "/path" });

// @ts-expect-error - KdsLink should require "to"
propTypeTester<KdsLinkProps>({ label: "Link" });

// supports required props
propTypeTester<KdsLinkProps>({ label: "Link", to: "/path" });

// supports all optional props
propTypeTester<KdsLinkProps>({
  label: "Document",
  to: "/document.pdf",
  variant: "document",
  fileSize: "156 KB",
  title: "Download document",
  disabled: false,
  download: true,
  target: "_blank",
  rel: "noopener",
});

// @ts-expect-error - document links should require "fileSize"
propTypeTester<KdsLinkProps>({
  label: "Document",
  variant: "document",
  to: "/document.pdf",
});

// @ts-expect-error - fileSize is only allowed for document links
propTypeTester<KdsLinkProps>({
  label: "External",
  variant: "external",
  to: "https://www.knime.com",
  fileSize: "156 KB",
});

// @ts-expect-error - KdsLink only accepts a string URL/path in "to"
propTypeTester<KdsLinkProps>({ label: "Internal", to: { path: "/workflows" } });
