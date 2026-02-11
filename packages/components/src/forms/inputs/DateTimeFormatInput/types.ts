import type { KdsInputFieldProps } from "../types";

export type KdsTemporalType = "DATE" | "TIME" | "DATE_TIME" | "ZONED_DATE_TIME";

export type KdsDateFormatCategory =
  | "RECENT"
  | "STANDARD"
  | "EUROPEAN"
  | "AMERICAN";

export type KdsDateTimeFormatEntry = {
  format: string;
  temporalType: KdsTemporalType;
  category: KdsDateFormatCategory;
  example?: string;
};

export type KdsDateTimeFormatInputProps = KdsInputFieldProps & {
  /**
   * Restricts the available date/time format options by their temporal type.
   * If omitted, there are no restrictions.
   */
  allowedFormats?: KdsTemporalType[];

  /**
   * Full list of available date/time formats.
   * Defaults to the built-in formats from `./constants`.
   */
  allDefaultFormats?: KdsDateTimeFormatEntry[];
};
