<script setup lang="ts">
import { ref, toRef, useId } from "vue";
import { onClickOutside } from "@vueuse/core";
import { autoUpdate, flip, offset, shift, useFloating } from "@floating-ui/vue";
import { FocusTrap } from "focus-trap-vue";

import BasePopover from "./BasePopover.vue";
import type { KdsPopoverProps } from "./types";

const props = withDefaults(defineProps<KdsPopoverProps>(), {
  ignoredClickOutsideTarget: null,
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

    <Teleport v-if="$slots.default" to="body">
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
      >
        <FocusTrap
          v-model:active="open"
          fallback-focus="body"
          @deactivate="referenceEl?.querySelector('button')?.focus()"
        >
          <BasePopover>
            <slot />
          </BasePopover>
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
}
</style>
