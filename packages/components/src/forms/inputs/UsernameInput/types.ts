import type { KdsInputFieldProps } from "../types";

import type { kdsUsernameInputAutocomplete } from "./enums";

export type KdsUsernameInputAutocomplete =
  (typeof kdsUsernameInputAutocomplete)[keyof typeof kdsUsernameInputAutocomplete];

export type KdsUsernameInputProps = Omit<KdsInputFieldProps, "autocomplete"> & {
  autocomplete?: KdsUsernameInputAutocomplete;
};
