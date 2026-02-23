import type { KdsInputFieldProps } from "../baseTypes";

import type { KdsDropdownOption } from "./types";

export type KdsMultiSelectDropdownProps = KdsInputFieldProps & {
  /** Values shown in the dropdown list */
  possibleValues: KdsDropdownOption[];

  /** Text shown when no entries match the search */
  noEntriesText?: string;

  /** Enables adding new values via the search field */
  allowNewValues?: boolean;

  /** Text label for the sticky bottom action when nothing is selected */
  selectAllText?: string;

  /** Text label for the sticky bottom action when something is selected */
  clearAllText?: string;

  /** Minimum number of selected values (enforced when toggling/clearing) */
  minSelected?: number;

  /** Maximum number of selected values (enforced when selecting) */
  maxSelected?: number;
};
