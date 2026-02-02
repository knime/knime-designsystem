<script setup lang="ts">
import { computed, ref, toRef, useId, watch } from "vue";
import { onClickOutside, useElementBounding } from "@vueuse/core";

import BasePopover from "./BasePopover.vue";
import type { KdsPopoverProps } from "./types";

const props = withDefaults(defineProps<KdsPopoverProps>(), {
  placement: "top-center",
  mainContainer: () => document.body,
  ignoredClickOutsideTarget: null,
});
const open = defineModel<boolean>({ default: false });
const referenceEl = ref<HTMLElement | null>(null);
const floatingEl = ref<HTMLElement | null>(null);
const popoverId = useId();

const safeMainContainer = computed<HTMLElement>(() => {
  const target = props.mainContainer;
  return target instanceof HTMLElement ? target : document.body;
});

const boundaryPaddingPx = 8;
const { width } = useElementBounding(safeMainContainer);

const placement = toRef(props, "placement");
const actualBasePlacement = computed(() => placement.value);

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

onClickOutside(floatingEl, () => (open.value = false), {
  ignore: ignoredClickOutsideTarget,
});

watch(
  open,
  (isOpen) => {
    if (isOpen) {
      floatingEl.value?.showPopover();
    } else {
      floatingEl.value?.hidePopover();
    }
  },
  { immediate: true },
);

function onNativeToggle(e: Event) {
  const isOpen = (
    e.target as unknown as { matches?: (sel: string) => boolean }
  )?.matches?.(":popover-open");
  open.value = Boolean(isOpen);
}
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

    <div
      v-if="$slots.default"
      :id="popoverId"
      ref="floatingEl"
      class="floating"
      popover="auto"
      @toggle="onNativeToggle"
    >
      <BasePopover
        :placement="actualBasePlacement"
        :anchor="referenceEl"
        :style="{ 'max-width': width - 2 * boundaryPaddingPx + 'px' }"
      >
        <slot />
      </BasePopover>

      <div class="arrow" aria-hidden="true" />
    </div>
  </div>
</template>

<style scoped>
.activator {
  display: inline-flex;
}

.floating {
  padding: 0;
  overflow: visible;
  background: transparent;
  border: 0;
}
</style>
