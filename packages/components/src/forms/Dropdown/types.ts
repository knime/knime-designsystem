import type { KdsTypeIconName } from "../../Icon/types";
import type { KdsInputLabelProps, KdsInputStateProps } from "../Input/types.ts";

export type KdsDropdownOption = {
  id: string;
  text: string;
  /** Optional data type icon shown before the text */
  leadingIcon?: KdsTypeIconName;
  /** Disables the option in the list */
  disabled?: boolean;
};

export type KdsDropdownProps = KdsInputLabelProps &
  KdsInputStateProps & {
    /** Values shown in the dropdown list */
    possibleValues: KdsDropdownOption[];

    /** Text shown when no entries match the search */
    noEntriesText?: string;
  };

export type KdsDropdownEmits = {
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
  /** Fires when a selection is committed */
  change: [value: string | null];
};
