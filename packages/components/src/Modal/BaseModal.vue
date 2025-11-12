<script setup lang="ts">
import { computed, nextTick, useTemplateRef, watch } from "vue";

import Button from "../Button/Button.vue";
import Icon from "../Icon/Icon.vue";

import type { BaseModalProps } from "./types";

const props = withDefaults(defineProps<BaseModalProps>(), {
  icon: undefined,
  title: "",
  active: false,
  height: "auto",
  width: "medium",
  bodyPadding: true,
  bodyScroll: true,
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
  async (active) => {
    if (active) {
      await nextTick();
      dialogElement.value?.showModal();
    } else {
      dialogElement.value?.close();
    }
  },
);

const widthMapping = {
  small: 25,
  medium: 32,
  large: 45,
};

const cssModalWidth = computed(() => {
  if (props.width === "full") {
    return "var(--modal-full-size)";
  }
  return `var(--kds-dimension-component-width-${widthMapping[props.width]}x)`;
});

const cssModalHeight = computed(() => {
  if (props.height === "full") {
    return "var(--modal-full-size)";
  }
  return "fit-content";
});
</script>

<template>
  <dialog
    ref="dialogElement"
    class="base-modal"
    :closedby="closedby"
    @close="onClose"
    @cancel.prevent="onClose"
  >
    <header class="modal-header">
      <Icon v-if="props.icon" :name="props.icon" size="medium" />
      <div class="modal-header-title">{{ title }}</div>
      <Button
        leading-icon="x-close"
        variant="transparent"
        size="medium"
        @click="onClose"
      />
    </header>

    <div
      :class="[
        'modal-body',
        { 'modal-body-padding': bodyPadding, 'modal-body-scroll': bodyScroll },
      ]"
    >
      <slot />
    </div>

    <footer class="modal-footer">
      <div class="footer-start"><slot name="footerStart" /></div>
      <div class="footer-end"><slot name="footerEnd" /></div>
    </footer>
  </dialog>
</template>

<style>
/** see: https://github.com/whatwg/html/issues/7732  */
body:has(dialog.modal[open]) {
  overflow: hidden;
}
</style>

<style scoped>
.base-modal {
  --modal-full-size: 95%;
  --modal-side-padding: var(--kds-spacing-container-1-5x);

  display: grid;
  grid-template-rows: auto 1fr auto;
  width: min(var(--modal-full-size, 95%), v-bind("cssModalWidth"));
  height: v-bind("cssModalHeight");
  max-height: var(--modal-full-size, 95%);
  padding: 0;
  overflow: hidden;
  font: var(--kds-font-base-body-medium);
  color: var(--kds-color-text-and-icon-neutral);
  background-color: var(--kds-color-surface-default);
  border: none;
  border-radius: var(--kds-border-radius-container-0-37x);
  box-shadow: var(--kds-elevation-level-3);

  &:not([open]) {
    display: none;
  }

  &::backdrop {
    background: var(--kds-color-blanket-default);
  }

  & .modal-header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: var(--kds-spacing-container-0-5x);
    align-items: center;
    padding: var(--kds-spacing-container-0-5x) var(--kds-spacing-container-0-5x)
      var(--kds-spacing-container-0-5x) var(--kds-spacing-container-1-5x);
    font: var(--kds-font-base-title-medium-strong);
    color: var(--kds-color-text-and-icon-neutral);
  }

  & .modal-body {
    display: flex;
    flex-direction: column;
    gap: var(--kds-spacing-container-1x);
    padding-top: var(--kds-spacing-container-0-5x);
    padding-bottom: var(--kds-spacing-container-1x);
    overflow-y: hidden;
    font: var(--kds-font-base-body-medium);
    color: var(--kds-color-text-and-icon-neutral);

    &.modal-body-scroll {
      overflow-y: auto; /* scroll if needed */
      overscroll-behavior: contain;
    }

    &.modal-body-padding {
      padding-right: var(--modal-side-padding, --kds-spacing-container-1-5x);
      padding-left: var(--modal-side-padding, --kds-spacing-container-1-5x);
    }
  }

  & .modal-footer {
    display: grid;
    grid-auto-flow: column;
    gap: var(--kds-spacing-container-0-5x);
    justify-content: space-between;
    padding: var(--kds-spacing-container-1x) var(--kds-spacing-container-1-5x);

    & .footer-end,
    & .footer-start {
      display: flex;
      gap: var(--kds-spacing-container-0-5x);
    }
  }
}
</style>
