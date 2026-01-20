<script setup lang="ts">
import { onBeforeUnmount, ref, toRef, watch } from "vue";
import {
  autoUpdate,
  flip,
  offset as floatingOffset,
  shift,
  useFloating,
} from "@floating-ui/vue";

import type { KdsPopoverProps } from "./types";

const props = withDefaults(defineProps<KdsPopoverProps>(), {
  ignoredClickOutsideTarget: null,
});

const open = defineModel<boolean>({ default: false });

const ignoredClickOutsideTarget = toRef(props, "ignoredClickOutsideTarget");

const offset = 8;

const referenceEl = ref<HTMLElement | null>(null);
const floatingEl = ref<HTMLElement | null>(null);

const { x, y, update } = useFloating(referenceEl, floatingEl, {
  placement: "top",
  whileElementsMounted: autoUpdate,
  middleware: [shift({ padding: 8 }), floatingOffset(offset), flip()],
});

let cleanupAutoUpdate: (() => void) | null = null;

const startAutoUpdate = () => {
  if (!referenceEl.value || !floatingEl.value) {
    return;
  }

  cleanupAutoUpdate?.();
  cleanupAutoUpdate = autoUpdate(referenceEl.value, floatingEl.value, update);
};

const stopAutoUpdate = () => {
  cleanupAutoUpdate?.();
  cleanupAutoUpdate = null;
};

const onDocumentPointerDown = (event: PointerEvent) => {
  if (!open.value) {
    return;
  }

  const targetNode = event.target as Node | null;
  const targets: Array<HTMLElement | null | undefined> = [
    referenceEl.value,
    floatingEl.value,
    ignoredClickOutsideTarget.value,
  ];

  const clickedInside = targets.some((el) => el?.contains(targetNode ?? null));

  if (!clickedInside) {
    open.value = false;
  }
};

const onDocumentKeydown = (event: KeyboardEvent) => {
  if (!open.value) {
    return;
  }

  if (event.key === "Escape") {
    event.stopPropagation();
    open.value = false;

    // keep focus behavior simple & predictable: return focus to activator
    referenceEl.value?.focus();
  }
};

watch(
  () => open.value,
  (isOpen) => {
    if (isOpen) {
      startAutoUpdate();
      document.addEventListener("pointerdown", onDocumentPointerDown, true);
      document.addEventListener("keydown", onDocumentKeydown, true);

      // ensure popover positions correctly after it appears
      update();
    } else {
      stopAutoUpdate();
      document.removeEventListener("pointerdown", onDocumentPointerDown, true);
      document.removeEventListener("keydown", onDocumentKeydown, true);
    }
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  stopAutoUpdate();
  document.removeEventListener("pointerdown", onDocumentPointerDown, true);
  document.removeEventListener("keydown", onDocumentKeydown, true);
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
        <div class="content">
          <slot />
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.kds-popover {
  display: inline-flex;
}

.activator {
  display: inline-flex;
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
