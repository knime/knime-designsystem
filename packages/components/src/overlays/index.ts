export { default as KdsModal } from "./Modal/KdsModal.vue";
export { default as KdsModalLayout } from "./Modal/KdsModalLayout.vue";
export { default as KdsDynamicModalProvider } from "./Modal/KdsDynamicModalProvider.vue";
export { default as KdsPopover } from "./Popover/KdsPopover.vue";
export { default as KdsInfoPopover } from "./Popover/KdsInfoPopover.vue";
export {
  type KdsDynamicDialogConfirmConfig,
  type KdsDynamicModalTemplateConfig,
  type KdsDynamicModalPropsAPI,
  useKdsDynamicModal,
} from "./Modal/useKdsDynamicModal";

export type * from "./Modal/types";
export type * from "./Popover/types";
