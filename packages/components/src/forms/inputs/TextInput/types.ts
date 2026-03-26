import type { KdsInputFieldProps } from "../types";

export type KdsTextInputProps = KdsInputFieldProps & {
  /**
   * Optional list of suggestion strings displayed in a popover.
   * The user can still enter free text; selecting a suggestion fills the input.
   */
  suggestions?: string[];
  /**
   * An optional headline displayed in the suggestions dropdown popover,
   * shown only when the dropdown contains at least one suggestion.
   */
  suggestionsHeadline?: string;
};
