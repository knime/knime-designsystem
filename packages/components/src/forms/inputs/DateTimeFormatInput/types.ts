import type { KdsInputFieldProps } from "../types";

import { kdsDateFormatCategory, kdsTemporalType } from "./enums";

export type KdsTemporalType =
  (typeof kdsTemporalType)[keyof typeof kdsTemporalType];

export type KdsDateFormatCategory =
  (typeof kdsDateFormatCategory)[keyof typeof kdsDateFormatCategory];

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
   */
  allDefaultFormats: KdsDateTimeFormatEntry[];
};
