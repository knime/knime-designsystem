import type {
  KdsButtonProps,
  KdsButtonVariant,
  KdsLinkButtonProps,
} from "../Button/types";

export type KdsEmptyStateProps = {
  headline: string;
  description?: string;
  label?: string;
  variant?: KdsButtonVariant;
};

export type KdsEmptyStateWithActionProps = KdsEmptyStateProps &
  Partial<Omit<KdsButtonProps, "label">> & {
    buttonAction: () => void;
    buttonLink?: never;
    label: string;
  };

export type KdsEmptyStateWithLinkProps = KdsEmptyStateProps &
  Partial<Omit<KdsLinkButtonProps, "label">> & {
    buttonAction?: never;
    buttonLink: string;
    label: string;
  };

export type KdsEmptyState =
  | KdsEmptyStateProps
  | KdsEmptyStateWithActionProps
  | KdsEmptyStateWithLinkProps;

/**
 * Testers
 */
