<script setup lang="ts">
import { computed, nextTick, useTemplateRef, watch } from "vue";

import KdsButton from "../Button/KdsButton.vue";
import KdsIcon from "../Icon/KdsIcon.vue";

import type { KdsModalProps } from "./types";

const props = withDefaults(defineProps<KdsModalProps>(), {
  icon: undefined,
  title: "",
  active: false,
  height: "auto",
  width: "medium",
  variant: "default",
  closedby: "closerequest",
});

const emit = defineEmits<{
  close: [event: Event];
}>();

const dialog = useTemplateRef("dialogElement");

const onClose = (e: Event) => {
  emit("close", e);
};

watch(
  () => props.active,
  async (active) => {
    if (active) {
      await nextTick();
      dialog.value?.showModal();
    } else {
      dialog.value?.close();
    }
  },
  { immediate: true },
);

const widthMapping = {
  small: 25,
  medium: 32,
  large: 45,
  xlarge: 61,
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
    @cancel.prevent="onClose"
  >
    <template v-if="active">
      <header class="modal-header">
        <KdsIcon v-if="props.icon" :name="props.icon" size="medium" />
        <div class="modal-header-title">{{ title }}</div>
        <KdsButton
          leading-icon="x-close"
          variant="transparent"
          size="medium"
          title="Close"
          @click="onClose"
        />
      </header>

      <div :class="['modal-body', `modal-body-variant-${variant}`]">
        <slot />
      </div>

      <footer class="modal-footer">
        <slot name="footer" />
      </footer>
    </template>
  </dialog>
</template>

<style>
/** see: https://github.com/whatwg/html/issues/7732  */
body:has(dialog.modal[open]) {
  overflow: hidden;
}
</style>

<style lang="postcss" scoped>
.base-modal {
  /* rule is broken it complains about local variables for no reason */
  /* stylelint-disable csstools/value-no-unknown-custom-properties */
  --modal-full-size: 95%;
  --modal-padding-left: var(--kds-spacing-container-1-5x);
  --modal-padding-right: var(--kds-spacing-container-1-5x);
  --modal-padding-top: var(--kds-spacing-container-0-5x);
  --modal-padding-bottom: var(--kds-spacing-container-1x);
  --modal-gap: var(--kds-spacing-container-1x);

  display: grid;
  grid-template-rows: auto 1fr auto;
  width: min(var(--modal-full-size), v-bind("cssModalWidth"));
  height: v-bind("cssModalHeight");
  max-height: var(--modal-full-size);
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

  &:focus-visible,
  &:focus {
    outline: none;
  }

  &::backdrop {
    background: var(--kds-color-blanket-default);
  }

  & .modal-header {
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

  & .modal-body {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    font: var(--kds-font-base-body-medium);
    color: var(--kds-color-text-and-icon-neutral);

    &.modal-body-variant-default {
      gap: var(--modal-gap);
      padding: var(--modal-padding-top) var(--modal-padding-right)
        var(--modal-padding-bottom) var(--modal-padding-left);
      overflow-y: auto; /* scroll if needed */
      overscroll-behavior: contain;
    }
  }

  & .modal-footer {
    display: flex;
    gap: var(--kds-spacing-container-0-5x);
    justify-content: right;
    padding: var(--kds-spacing-container-1x) var(--kds-spacing-container-1-5x);
  }
}
</style>
