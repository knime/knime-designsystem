export { default as KdsModal } from "./KdsModal.vue";
export { default as KdsModalLayout } from "./KdsModalLayout.vue";
export { default as KdsDynamicModalProvider } from "./KdsDynamicModalProvider.vue";

export {
  type KdsDynamicDialogConfirmConfig,
  type KdsDynamicModalTemplateConfig,
  type KdsDynamicModalPropsAPI,
  useKdsDynamicModal,
} from "./useKdsDynamicModal";

export {
  kdsModalClosedBy,
  kdsModalClosedByOptions,
  kdsModalHeight,
  kdsModalHeightSizes,
  kdsModalVariant,
  kdsModalVariants,
  kdsModalWidth,
  kdsModalWidthSizes,
} from "./enums";

export type * from "./types";
