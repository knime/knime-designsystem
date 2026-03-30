import type {
  WithAnchorElementAttributes,
  WithLinkNavigation,
} from "../linkTypes";

type KdsLinkBaseProps = {
  /**
   * Label rendered as the clickable link text.
   */
  label: string;
  /**
   * Optional base title text shown on hover.
   *
   * The rendered title is variant-aware: internal links are prefixed with
   * `Open`, download links with `Download`, and external links append
   * ` (opens in a new tab)` when their effective target is `_blank`.
   */
  title?: string;
  /**
   * If set to true, the link is visually disabled and non-interactive.
   */
  disabled?: boolean;
} & WithAnchorElementAttributes;

export type KdsLinkProps = WithLinkNavigation &
  KdsLinkBaseProps & {
    /**
     * Optional file size in bytes.
     *
     * If provided, the link is rendered in document style and shows the
     * formatted file size suffix.
     */
    fileSize?: number;
  };

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
  download: true,
  fileSize: 159744,
  title: "document",
  disabled: false,
  target: "_blank",
  rel: "noopener",
});

// supports inferred document variant when download is provided
propTypeTester<KdsLinkProps>({
  label: "Document",
  to: "https://www.knime.com/whitepaper.pdf",
  download: true,
  fileSize: 159744,
});

// supports download without fileSize
propTypeTester<KdsLinkProps>({
  label: "Document",
  to: "https://www.knime.com/foo.pdf",
  download: true,
});

// supports inferred document variant when fileSize is provided
propTypeTester<KdsLinkProps>({
  label: "External",
  to: "https://www.knime.com/foo.pdf",
  fileSize: 159744,
});

// @ts-expect-error - KdsLink only accepts a string URL/path in "to"
propTypeTester<KdsLinkProps>({ label: "Internal", to: { path: "/workflows" } });
