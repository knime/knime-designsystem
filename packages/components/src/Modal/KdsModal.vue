<script setup lang="ts">
import { nextTick, ref, useTemplateRef, watch } from "vue";

import KdsModalLayout from "./KdsModalLayout.vue";
import { maxAnimationDurationMs } from "./constants";
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

const onClose = (event: Event) => {
  emit("close", event);
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

const renderDialog = ref(props.active);
watch(
  () => props.active,
  (value, lastValue) => {
    // on close wait until the animation has run
    if (value === false && lastValue === true) {
      setTimeout(() => (renderDialog.value = false), maxAnimationDurationMs);
    } else {
      renderDialog.value = value;
    }
  },
);
</script>

<template>
  <dialog
    v-if="renderDialog"
    ref="dialogElement"
    :class="['kds-modal', `width-${width}`, `height-${height}`]"
    :closedby="closedby"
    @cancel.prevent="onClose"
  >
    <slot :title="title" :icon="icon" :variant="variant" :on-close="onClose">
      <KdsModalLayout
        :title="title"
        :icon="icon"
        :variant="variant"
        @close="onClose"
      >
        <template #body>
          <slot name="body" />
        </template>

        <template #footer>
          <slot name="footer" />
        </template>
      </KdsModalLayout>
    </slot>
  </dialog>
</template>

<style>
/** see: https://github.com/whatwg/html/issues/7732  */
body:has(dialog.modal[open]) {
  overflow: hidden;
}
</style>

<style lang="postcss" scoped>
.kds-modal {
  /* rule is broken it complains about local variables for no reason */
  /* stylelint-disable csstools/value-no-unknown-custom-properties */
  --modal-full-size: 95%;
  --modal-backdrop-animation-time: 125ms;

  &.width-small {
    --modal-width: var(--kds-dimension-component-width-25x);
    --modal-animation-time: 100ms;
    --modal-scale-base: 0.85;
  }

  &.width-medium {
    --modal-width: var(--kds-dimension-component-width-32x);
    --modal-animation-time: 140ms;
    --modal-scale-base: 0.88;
  }

  &.width-large {
    --modal-width: var(--kds-dimension-component-width-45x);
    --modal-animation-time: 210ms;
    --modal-scale-base: 0.88;
  }

  &.width-xlarge {
    --modal-width: var(--kds-dimension-component-width-61x);
    --modal-animation-time: 300ms;
    --modal-scale-base: 0.88;
  }

  &.width-full {
    --modal-width: var(--modal-full-size);
    --modal-animation-time: 350ms;
    --modal-scale-base: 0.92;
  }

  &.height-full {
    --modal-height: var(--modal-full-size);
  }

  &.height-auto {
    --modal-height: fit-content;
  }

  display: grid;
  grid-template-rows: auto 1fr auto;
  width: min(var(--modal-full-size), var(--modal-width));
  height: var(--modal-height);
  max-height: var(--modal-full-size);
  padding: 0;
  overflow: hidden;
  font: var(--kds-font-base-body-medium);
  color: var(--kds-color-text-and-icon-neutral);
  background-color: var(--kds-color-surface-default);
  border: none;
  border-radius: var(--kds-border-radius-container-0-37x);
  box-shadow: var(--kds-elevation-level-3);

  /* hide if its not open */
  &:not([open]) {
    display: none;
  }

  /* hide animation <dialog> */
  opacity: 0;
  transform: scale(var(--modal-scale-base));
  transition:
    opacity var(--modal-animation-time) cubic-bezier(0, 0, 0.2, 1),
    transform var(--modal-animation-time) cubic-bezier(0, 0, 0.2, 1),
    overlay var(--modal-animation-time) cubic-bezier(0, 0, 0.2, 1)
      allow-discrete,
    display var(--modal-animation-time) cubic-bezier(0, 0, 0.2, 1)
      allow-discrete;

  &:focus-visible,
  &:focus {
    outline: none;
  }

  &::backdrop {
    background: var(--kds-color-blanket-default);

    /* hide animation ::backdrop */
    opacity: 0;
    transition:
      display var(--modal-backdrop-animation-time)
        cubic-bezier(0.39, 0.58, 0.57, 1) allow-discrete,
      overlay var(--modal-backdrop-animation-time)
        cubic-bezier(0.39, 0.58, 0.57, 1) allow-discrete,
      opacity var(--modal-backdrop-animation-time)
        cubic-bezier(0.39, 0.58, 0.57, 1);

    @starting-style {
      opacity: 1;
    }
  }

  /** show animation ::backdrop */
  &[open]::backdrop {
    opacity: 1;

    @starting-style {
      opacity: 0;
    }
  }

  @starting-style {
    opacity: 1;
    transform: scale(1);
  }

  /** show animation <dialog> */
  &[open] {
    opacity: 1;
    transform: scale(1);

    @starting-style {
      opacity: 0;
      transform: scale(var(--modal-scale-base));
    }
  }
}
</style>
