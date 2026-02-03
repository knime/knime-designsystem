<script setup lang="ts">
import { computed, ref, useId, watch } from "vue";

import BasePopover from "./BasePopover.vue";
import type { KdsPopoverProps } from "./types";

const props = withDefaults(defineProps<KdsPopoverProps>(), {
  placement: "bottom-right",
  mainContainer: () => document.body,
  ignoredClickOutsideTarget: null,
});
const open = defineModel<boolean>({ default: false });
const referenceEl = ref<HTMLElement | null>(null);
const floatingEl = ref<HTMLElement | null>(null);
const popoverId = useId();

const _ignoredClickOutsideTarget = computed<(HTMLElement | null)[]>(() => {
  const targets = props.ignoredClickOutsideTarget;
  if (targets === null) {
    return [referenceEl.value];
  }
  if (Array.isArray(targets)) {
    return [referenceEl.value, ...targets];
  }
  return [referenceEl.value, targets];
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

const anchorId = `--${useId()}`;
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
      :style="'anchor-name: ' + anchorId"
    >
      <slot name="activator" />
    </div>

    <div
      v-if="$slots.default"
      :id="popoverId"
      ref="floatingEl"
      :class="['floating', placement]"
      popover="auto"
      :style="'position-anchor: ' + anchorId"
      @toggle="onNativeToggle"
    >
      <BasePopover>
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
  margin: var(--kds-spacing-container-0-5x);
  overflow: visible;
  border: 0;
}

/* stylelint-disable declaration-property-value-no-unknown, at-rule-descriptor-value-no-unknown */
.floating.top-left {
  inset: auto anchor(right) anchor(top) auto;
  margin-right: 0;
  position-try-fallbacks:
    --kds-popover-try-top-right, --kds-popover-try-bottom-left,
    --kds-popover-try-bottom-right;
}

.floating.top-right {
  inset: auto auto anchor(top) anchor(left);
  margin-left: 0;
  position-try-fallbacks:
    --kds-popover-try-top-left, --kds-popover-try-bottom-right,
    --kds-popover-try-bottom-left;
}

.floating.bottom-left {
  inset: anchor(bottom) anchor(right) auto auto;
  margin-right: 0;
  position-try-fallbacks:
    --kds-popover-try-bottom-right, --kds-popover-try-top-left,
    --kds-popover-try-top-right;
}

.floating.bottom-right {
  inset: anchor(bottom) auto auto anchor(left);
  margin-left: 0;
  position-try-fallbacks:
    --kds-popover-try-bottom-left, --kds-popover-try-top-right,
    --kds-popover-try-top-left;
}

@position-try --kds-popover-try-top-left {
  inset: auto anchor(right) anchor(top) auto;
  margin: var(--kds-spacing-container-0-5x) 0;
}

@position-try --kds-popover-try-top-right {
  inset: auto auto anchor(top) anchor(left);
  margin: var(--kds-spacing-container-0-5x) 0;
}

@position-try --kds-popover-try-bottom-left {
  inset: anchor(bottom) anchor(right) auto auto;
  margin: var(--kds-spacing-container-0-5x) 0;
}

@position-try --kds-popover-try-bottom-right {
  inset: anchor(bottom) auto auto anchor(left);
  margin: var(--kds-spacing-container-0-5x) 0;
}
/* stylelint-enable declaration-property-value-no-unknown, at-rule-descriptor-value-no-unknown */
</style>
