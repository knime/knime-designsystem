import type { KdsListItemAccessory } from "../../_helper/List/ListItemAccessory/types";
import type { KdsFormFieldProps } from "../../types";

import { kdsTwinListSearchMode } from "./enums";

export type KdsTwinListPossibleValue = {
  /** Unique identifier of the value. */
  id: string;
  /** Main text shown in the list. */
  text: string;
  /** Optional secondary text. */
  subText?: string;
  /** Optional accessory rendered before the label. */
  accessory?: KdsListItemAccessory;
  /** Optional type id used by the type filter mode. */
  type?: string;
};

export type KdsTwinListPossibleType = {
  id: string;
  text: string;
};

export type KdsTwinListSearchMode =
  (typeof kdsTwinListSearchMode)[keyof typeof kdsTwinListSearchMode];

/**
 * Combined model value used internally by TwinListBody.
 * `includeUnknownValues` being `null` hides the unknown-values option entirely.
 */
export type KdsTwinListModelValue = {
  includedValues: string[];
  excludedValues: string[];
  includeUnknownValues: boolean | null;
};

export type TwinListHeaderProps = {
  /**
   * Types available in the type-filter mode. When provided, the "Type" tab is
   * shown. `undefined` hides it.
   */
  filterTypes?: KdsTwinListPossibleType[];
  /** Whether the pattern filter mode is available. */
  enablePatternFilter?: boolean;
  disabled?: boolean;
};

export type TwinListBodyProps = {
  /** Disables moving items between the lists. */
  disabled?: boolean;
  /** Values shown in the two lists. */
  possibleValues: KdsTwinListPossibleValue[];
  /** Current search term used to filter items in both lists. */
  searchTerm?: string;
  /** Label for the left (excluded) column. */
  excludeLabel?: string;
  /** Label for the right (included) column. */
  includeLabel?: string;
  /** Text shown for the unknown-values option. */
  unknownValuesText?: string;
  /** Text shown when a list is empty. */
  emptyStateLabel?: string;
  /**
   * Whether the twinlist is in a loading state. When true, a loading
   * indicator is shown and the lists are non-interactive.
   */
  loading?: boolean;
};

/** Props passed to defineProps (excludes model-bound fields handled by defineModel). */
export type KdsTwinListProps = KdsFormFieldProps & {
  /** Disables moving items between the lists. */
  disabled?: boolean;
  /** Values shown in the two lists. */
  possibleValues: KdsTwinListPossibleValue[];
  /**
   * Types available in the type-filter mode. When provided (even if empty
   * array), the "Type" tab is shown in the mode switcher. The caller is
   * responsible for merging types extracted from `possibleValues` with any
   * additional/previously-selected types before passing them here.
   *
   * `undefined` (default) hides the type-filter mode entirely.
   */
  filterTypes?: KdsTwinListPossibleType[];
  /**
   * Whether the pattern filter mode is available. Defaults to `false`.
   */
  enablePatternFilter?: boolean;
  /** Label for the left (excluded) column. */
  excludeLabel?: string;
  /** Label for the right (included) column. */
  includeLabel?: string;
  /** Text shown for the unknown-values option. */
  unknownValuesText?: string;
  /** Text shown when a list is empty. */
  emptyStateLabel?: string;
  /**
   * Whether the twinlist is in a loading state. When true, a loading
   * indicator is shown instead of the list contents while the header and mode
   * switcher remain visible.
   */
  loading?: boolean;
};

/** Full external-facing props including the v-model bindings. */
export type KdsTwinListAllProps = KdsTwinListProps & {
  mode?: KdsTwinListSearchMode;
  manuallyIncluded?: string[];
  manuallyExcluded?: string[];
  /**
   * Whether unknown values are included or excluded.
   * - `true` – unknown values are on the include side.
   * - `false` – unknown values are on the exclude side.
   * - `null` – unknown values handling is disabled entirely (the sticky
   *   option is hidden).
   */
  includeUnknownValues?: boolean | null;
  pattern?: string;
  selectedTypes?: string[];
  caseSensitive?: boolean;
  excludeMatches?: boolean;
  useRegex?: boolean;
};
