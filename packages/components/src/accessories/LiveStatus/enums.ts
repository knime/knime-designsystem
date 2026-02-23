export const kdsLiveStatusStatus = {
  RED: "red",
  ORANGE: "orange",
  GREEN: "green",
  DISABLED: "disabled",
} as const;

export const kdsLiveStatusStatuses = Object.values(kdsLiveStatusStatus);

export const kdsLiveStatusSize = {
  LARGE: "large",
  MEDIUM: "medium",
  SMALL: "small",
} as const;

export const kdsLiveStatusSizes = Object.values(kdsLiveStatusSize);
