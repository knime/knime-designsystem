<script setup lang="ts">
import { computed, nextTick, useTemplateRef, watch } from "vue";

import KdsModalLayout from "./KdsModalLayout.vue";
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
    <slot
      v-if="active"
      :title="title"
      :icon="icon"
      :variant="variant"
      :on-close="onClose"
    >
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
.base-modal {
  /* rule is broken it complains about local variables for no reason */
  /* stylelint-disable csstools/value-no-unknown-custom-properties */
  --modal-full-size: 95%;

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
}
</style>
