<script setup lang="ts">
import { useTemplateRef, watch } from "vue";

import Button from "../Button/Button.vue";
import Icon from "../Icon/Icon.vue";

import type { BaseModalProps } from "./types";

const props = withDefaults(defineProps<BaseModalProps>(), {
  icon: undefined,
  title: "",
  message: "",
  active: false,
  closedby: "closerequest",
});

const emit = defineEmits<{
  close: [event: Event];
}>();

const dialogElement = useTemplateRef("dialogElement");

const onClose = (e: Event) => {
  emit("close", e);
};

watch(
  () => props.active,
  (active) => {
    if (active) {
      dialogElement.value?.showModal();
    } else {
      dialogElement.value?.close();
    }
  },
);
</script>

<template>
  <dialog
    ref="dialogElement"
    class="modal"
    :closedby="closedby"
    @close="onClose"
    @cancel.prevent="onClose"
  >
    <header class="modal-header">
      <Icon v-if="props.icon" :name="props.icon" size="medium" />
      <div class="modal-header-title">
        <slot name="header">{{ title }}</slot>
      </div>
      <Button
        leading-icon="x-close"
        variant="transparent"
        size="medium"
        @click="onClose"
      />
    </header>

    <div class="modal-body">
      <slot>{{ message }}</slot>
    </div>

    <footer class="modal-footer">
      <slot name="footer" />
    </footer>
  </dialog>
</template>

<style>
body:has(dialog.modal[open]) {
  overflow: hidden;
}
</style>

<style scoped>
.modal {
  display: flex;
  flex-direction: column;
  width: min(95%, var(--base-modal-width, 510px));
  height: var(--base-modal-height, fit-content);
  max-height: 95%;
  padding: 0;
  overflow: hidden;
  font: var(--kds-font-base-body-medium);
  color: var(--kds-color-text-and-icon-neutral);
  background-color: var(--kds-color-surface-default);
  border: none;
  border-radius: var(--kds-border-radius-container-0-25x);
  box-shadow: var(--kds-elevation-level-3);

  &:not([open]) {
    display: none;
  }
}

.modal::backdrop {
  background-color: var(--kds-color-blanket-default);
}

.modal-header {
  display: flex;
  gap: var(--kds-spacing-container-0-25x);
  align-items: center;
  padding: var(--kds-spacing-container-0-5x) var(--kds-spacing-container-0-5x)
    var(--kds-spacing-container-0-5x) var(--kds-spacing-container-1x);
  font: var(--kds-font-base-title-large);
  border-bottom: var(--kds-border-base-subtle);

  & .modal-header-title {
    flex: 1 1 auto;
  }
}

.modal-body {
  flex: 1 1 auto; /* take remaining space */
  padding: var(--kds-spacing-container-1x) var(--kds-spacing-container-1-5x)
    var(--kds-spacing-container-1-5x) var(--kds-spacing-container-1-5x);
  overflow-y: auto; /* scroll if needed */
  overscroll-behavior: contain;
  font-size: var(--kds-core-font-size-1x);
  line-height: var(--kds-core-line-height-multiline-wide);
}

.modal-footer {
  display: flex;
  flex-shrink: 0; /* prevent shrinking - required for scrolling the body */
  gap: var(--kds-spacing-container-0-25x);
  justify-content: space-between;
  padding: 0 var(--kds-spacing-container-1-5x) var(--kds-spacing-container-1-5x)
    var(--kds-spacing-container-1-5x);

  /* show one button on the left all the others on the right */

  /* use margin as its easy to customize if needed */
  & :nth-child(2) {
    margin-left: auto;
  }
}
</style>
