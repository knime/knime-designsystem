export const kdsColorSwatchType = {
  LEARNER: "learner",
  MANIPULATOR: "manipulator",
  PREDICTOR: "predictor",
  SINK: "sink",
  SOURCE: "source",
  VISUALIZER: "visualizer",
  OTHER: "other",
} as const;

export const kdsColorSwatchTypes = Object.values(kdsColorSwatchType);

export const kdsColorSwatchSize = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
} as const;

export const kdsColorSwatchSizes = Object.values(kdsColorSwatchSize);
