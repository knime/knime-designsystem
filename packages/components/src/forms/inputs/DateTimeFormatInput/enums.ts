export const kdsTemporalType = {
  DATE: "DATE",
  TIME: "TIME",
  DATE_TIME: "DATE_TIME",
  ZONED_DATE_TIME: "ZONED_DATE_TIME",
} as const;

export const kdsTemporalTypes = Object.values(kdsTemporalType);

export const kdsDateFormatCategory = {
  RECENT: "RECENT",
  STANDARD: "STANDARD",
  EUROPEAN: "EUROPEAN",
  AMERICAN: "AMERICAN",
} as const;

export const kdsDateFormatCategories = Object.values(kdsDateFormatCategory);
