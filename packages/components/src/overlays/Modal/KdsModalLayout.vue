<script setup lang="ts">
import KdsButton from "../../Button/KdsButton.vue";
import KdsIcon from "../../Icon/KdsIcon.vue";

import { modalLayoutPropsDefault } from "./constants";
import type { KdsModalLayoutProps } from "./types";

const props = withDefaults(
  defineProps<KdsModalLayoutProps>(),
  modalLayoutPropsDefault,
);
defineOptions({ inheritAttrs: false });
</script>

<template>
  <header class="modal-header">
    <KdsIcon v-if="props.icon" :name="props.icon" size="medium" />
    <div class="modal-header-title">{{ props.title }}</div>
    <KdsButton
      leading-icon="x-close"
      variant="transparent"
      size="medium"
      title="Close"
      @click="props.onClose"
    />
  </header>

  <div class="modal-body" :data-variant="variant">
    <slot name="body" />
  </div>

  <footer v-if="$slots.footer" class="modal-footer">
    <slot name="footer" />
  </footer>
</template>

<style lang="postcss" scoped>
.modal-header {
  display: flex;
  gap: var(--kds-spacing-container-0-5x);
  align-items: center;
  padding: var(--kds-spacing-container-0-5x) var(--kds-spacing-container-0-5x)
    var(--kds-spacing-container-0-5x) var(--kds-spacing-container-1-5x);
  font: var(--kds-font-base-title-medium-strong);
  color: var(--kds-color-text-and-icon-neutral);

  & .modal-header-title {
    flex: 1 1 auto;
  }
}

.modal-body {
  --modal-padding-left: var(--kds-spacing-container-1-5x);
  --modal-padding-right: var(--kds-spacing-container-1-5x);
  --modal-padding-top: var(--kds-spacing-container-0-5x);
  --modal-padding-bottom: var(--kds-spacing-container-1x);
  --modal-gap: var(--kds-spacing-container-1x);

  display: flex;
  flex-direction: column;
  overflow: v-bind(overflow);
  font: var(--kds-font-base-body-small);
  color: var(--kds-color-text-and-icon-neutral);

  &[data-variant="padded"] {
    gap: var(--modal-gap);
    padding: var(--modal-padding-top) var(--modal-padding-right)
      var(--modal-padding-bottom) var(--modal-padding-left);
  }
}

.modal-footer {
  display: flex;
  gap: var(--kds-spacing-container-0-5x);
  justify-content: right;
  padding: var(--kds-spacing-container-1x) var(--kds-spacing-container-1-5x);
}
</style>
