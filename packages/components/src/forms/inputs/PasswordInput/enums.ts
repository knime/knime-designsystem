export const kdsPasswordInputVariant = {
  PASSWORD: "password",
  KEY: "key",
} as const;

export const kdsPasswordInputVariants = Object.values(kdsPasswordInputVariant);

export const kdsPasswordInputAutocomplete = {
  CURRENT_PASSWORD: "current-password",
  NEW_PASSWORD: "new-password",
  ONE_TIME_CODE: "one-time-code",
  OFF: "off",
} as const;

export const kdsPasswordInputAutocompletes = Object.values(
  kdsPasswordInputAutocomplete,
);
