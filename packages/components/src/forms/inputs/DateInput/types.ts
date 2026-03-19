import type { DatePickerDate } from "v-calendar/dist/types/src/use/datePicker.js";

import type { KdsInputFieldProps } from "../types";

export type KdsDateInputProps = KdsInputFieldProps & {
  /**
   * Minimum allowed date passed to the date picker. The value is NOT used for validation, but only to restrict the date picker UI.
   */
  datePickerMin?: DatePickerDate;
  /**
   * Maximum allowed date passed to the date picker. The value is NOT used for validation, but only to restrict the date picker UI.
   */
  datePickerMax?: DatePickerDate;
};
