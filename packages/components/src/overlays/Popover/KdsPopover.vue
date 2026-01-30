<script setup lang="ts">
import { nextTick, ref, toRef, useId, watch } from "vue";
import { onClickOutside, useFocusWithin } from "@vueuse/core";
import { autoUpdate, flip, offset, shift, useFloating } from "@floating-ui/vue";

import BasePopover from "./BasePopover.vue";
import type { KdsPopoverProps } from "./types";

const props = withDefaults(defineProps<KdsPopoverProps>(), {
  ignoredClickOutsideTarget: null,
  mainContainer: () => document.body,
  placement: "top",
});
const open = defineModel<boolean>({ default: false });
const referenceEl = ref<HTMLElement | null>(null);
const floatingEl = ref<HTMLElement | null>(null);
const popoverId = useId();

/**
 * Floating UI setup
 */
const floatingOffset = 8;
const { x, y } = useFloating(referenceEl, floatingEl, {
  placement: toRef(props, "placement"),
  strategy: "fixed",
  whileElementsMounted: autoUpdate,
  middleware: [shift({ padding: 8 }), offset(floatingOffset), flip()],
});

/**
 * Click/Focus outside to close popover
 */
const ignoredClickOutsideTarget = toRef(props, "ignoredClickOutsideTarget");
onClickOutside(floatingEl, () => (open.value = false), {
  ignore: [ignoredClickOutsideTarget],
});

function focusActivatorButton() {
  const button = referenceEl.value?.querySelector<HTMLButtonElement>("button");
  button?.focus({ preventScroll: true });
}

function closePopover() {
  open.value = false;
  // Restore focus back to the activator without causing the page to scroll.
  nextTick(() => focusActivatorButton());
}

const { focused } = useFocusWithin(floatingEl);

watch(open, (isOpen) => {
  if (isOpen) {
    // Focus the popover when it opens; prevent scroll jumps in Storybook.
    nextTick(() => {
      floatingEl.value?.focus({ preventScroll: true });
    });
  }
});

watch(focused, (isFocused) => {
  if (!isFocused && open.value) {
    closePopover();
  }
});
</script>

<template>
  <div class="kds-popover">
    <div
      ref="referenceEl"
      class="activator"
      :data-open="open"
      :aria-expanded="open"
      :aria-controls="popoverId"
      aria-haspopup="dialog"
    >
      <slot name="activator" />
    </div>

    <Teleport v-if="$slots.default" :to="props.mainContainer">
      <div
        v-if="open"
        :id="popoverId"
        ref="floatingEl"
        class="floating"
        :data-open="open"
        :style="{
          left: x == null ? undefined : `${x}px`,
          top: y == null ? undefined : `${y}px`,
        }"
        role="dialog"
        aria-modal="true"
        tabindex="-1"
        @keydown.esc="closePopover"
      >
        <BasePopover>
          <slot />
          <div tabindex="0" @focus="closePopover" />
        </BasePopover>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.activator {
  display: flex;
}

.floating {
  position: fixed;
  z-index: 1000;

  &:focus-visible {
    outline: var(--kds-border-action-focused);
    outline-offset: var(--kds-spacing-offset-focus);
    border-radius: var(--kds-border-radius-container-0-37x);
  }
}
</style>
