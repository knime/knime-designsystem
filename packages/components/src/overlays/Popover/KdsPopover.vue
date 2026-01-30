<script setup lang="ts">
import { nextTick, ref, toRef, useId, watch } from "vue";
import { onClickOutside } from "@vueuse/core";
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
const focusCatch = ref<HTMLElement | null>(null);
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
function focusActivatorButton() {
  const button = referenceEl.value?.querySelector<HTMLButtonElement>("button");
  button?.focus({ preventScroll: true });
}

function closePopover() {
  open.value = false;
  // Restore focus back to the activator without causing the page to scroll.
  nextTick(() => focusActivatorButton());
}

const ignoredClickOutsideTarget = toRef(props, "ignoredClickOutsideTarget");
onClickOutside(floatingEl, () => closePopover(), {
  ignore: [referenceEl, ignoredClickOutsideTarget],
});

watch(open, (isOpen) => {
  if (isOpen) {
    // Focus the popover when it opens; prevent scroll jumps in Storybook.
    nextTick(() => {
      focusCatch.value?.focus({ preventScroll: true });
    });
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
          <div tabindex="0" @focus="closePopover" />
          <div ref="focusCatch" class="focus-catch" tabindex="-1" />
          <slot />
          <div tabindex="0" @focus="closePopover" />
          <button
            class="close-button"
            aria-label="Close popover"
            @click="closePopover"
          />
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

  .focus-catch {
    outline: none;
  }

  &:has(.focus-catch:focus-visible) {
    outline: var(--kds-border-action-focused);
    outline-offset: var(--kds-spacing-offset-focus);
    border-radius: var(--kds-border-radius-container-0-37x);
  }

  .close-button {
    /*
      Screen-reader-only close control.
      - Keeps the button available to assistive tech (e.g., VoiceOver)
      - Removes it from the visual layout to avoid an invisible focus target
    */
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    white-space: nowrap;
    border: 0;
    clip-path: inset(50%);
  }
}
</style>
