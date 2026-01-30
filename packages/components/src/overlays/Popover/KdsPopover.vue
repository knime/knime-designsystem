<script setup lang="ts">
import { computed, nextTick, ref, toRef, useId, watch } from "vue";
import { onClickOutside } from "@vueuse/core";
import { autoUpdate, flip, offset, shift, useFloating } from "@floating-ui/vue";

import BasePopover from "./BasePopover.vue";
import type { KdsPopoverProps } from "./types";

const props = withDefaults(defineProps<KdsPopoverProps>(), {
  placement: "top",
  mainContainer: () => document.body,
  ignoredClickOutsideTarget: null,
});
const open = defineModel<boolean>({ default: false });
const referenceEl = ref<HTMLElement | null>(null);
const floatingEl = ref<HTMLElement | null>(null);
const focusCatch = ref<HTMLElement | null>(null);
const popoverId = useId();

const teleportTarget = computed<HTMLElement>(() => {
  // Storybook (and some app shells) can temporarily hand us an object that's not a DOM Node.
  // Vue Teleport expects an Element; if it's not, patching can crash (parent.insertBefore).
  const target = props.mainContainer;
  return target instanceof HTMLElement ? target : document.body;
});

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

const ignoredClickOutsideTarget = computed<(HTMLElement | null)[]>(() => {
  const targets = props.ignoredClickOutsideTarget;
  if (targets === null) {
    return [referenceEl.value];
  }
  if (Array.isArray(targets)) {
    return [referenceEl.value, ...targets];
  }
  return [referenceEl.value, targets];
});
onClickOutside(floatingEl, () => closePopover(), {
  ignore: ignoredClickOutsideTarget,
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

    <Teleport v-if="$slots.default" :to="teleportTarget">
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
}
</style>
