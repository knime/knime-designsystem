<script setup lang="ts">
import { ref, toRef } from "vue";
import { onClickOutside } from "@vueuse/core";
import { autoUpdate, flip, offset, shift, useFloating } from "@floating-ui/vue";
import { FocusTrap } from "focus-trap-vue";

import type { KdsPopoverProps } from "./types";

const props = withDefaults(defineProps<KdsPopoverProps>(), {
  ignoredClickOutsideTarget: null,
});
const open = defineModel<boolean>({ default: false });
const referenceEl = ref<HTMLElement | null>(null);
const floatingEl = ref<HTMLElement | null>(null);

/**
 * Floating UI setup
 */
const floatingOffset = 8;
const { x, y } = useFloating(referenceEl, floatingEl, {
  placement: "top",
  whileElementsMounted: autoUpdate,
  middleware: [shift({ padding: 8 }), offset(floatingOffset), flip()],
});

/**
 * Click outside to close popover
 */
const ignoredClickOutsideTarget = toRef(props, "ignoredClickOutsideTarget");
onClickOutside(floatingEl, () => (open.value = false), {
  ignore: [referenceEl, ignoredClickOutsideTarget],
});
</script>

<template>
  <div class="kds-popover">
    <div ref="referenceEl" class="activator" :data-open="open">
      <slot name="activator" />
    </div>

    <Teleport v-if="$slots.default" to="body">
      <div
        v-if="open"
        ref="floatingEl"
        class="floating"
        :data-open="open"
        :style="{
          left: `${x}px`,
          top: `${y}px`,
        }"
        role="dialog"
        aria-modal="false"
      >
        <FocusTrap
          v-model:active="open"
          fallback-focus="body"
          @deactivate="referenceEl?.querySelector('button')?.focus()"
        >
          <div class="content">
            <slot />
          </div>
        </FocusTrap>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.activator {
  display: flex;
}

.floating {
  position: absolute;
  z-index: 1000;
  max-width: 400px;
}

.content {
  padding: var(--kds-spacing-container-0-5x) var(--kds-spacing-container-0-75x);
  font: var(--kds-font-base-body-small);
  color: var(--kds-color-text-and-icon-neutral);
  background: var(--kds-color-surface-default);
  border-radius: var(--kds-border-radius-container-0-37x);
  box-shadow: var(--kds-elevation-level-3);
}
</style>
