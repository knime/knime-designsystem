<script setup lang="ts">
import { useId, useTemplateRef, watchEffect } from "vue";

import type { KdsPopoverExpose, KdsPopoverProps } from "./types";

const {
  placement = "bottom-left",
  popoverType = "auto",
  fullWidth = false,
  ...props
} = defineProps<KdsPopoverProps>();

const open = defineModel<boolean>({ default: false });
const popoverEl = useTemplateRef("popoverEl");

const popoverId = useId();
const anchorName = `--anchor-${popoverId}`;

// Sync the open state with the native popover element's open state
watchEffect(() => {
  if (open.value) {
    popoverEl.value?.showPopover?.();
  } else {
    popoverEl.value?.hidePopover?.();
  }
});

const anchorStyle = { "anchor-name": anchorName };

const onToggle = (event: ToggleEvent) => {
  open.value = event.newState === "open";
};

defineExpose<KdsPopoverExpose>({ anchorStyle, popoverId });
</script>

<template>
  <div
    :id="popoverId"
    ref="popoverEl"
    class="kds-popover"
    :class="['floating', placement, { 'full-width': fullWidth }]"
    :popover="popoverType"
    :style="{ 'position-anchor': anchorName }"
    :role="props.role"
    @toggle="onToggle"
  >
    <slot>
      <div
        v-if="props.content?.trim().length"
        class="kds-popover-default-content"
      >
        {{ props.content }}
      </div>
    </slot>
  </div>
</template>

<style scoped>
.kds-popover {
  padding: 0;
  margin: 0;
  overflow: visible;
  font: inherit;
  color: inherit;
  background-color: transparent;
  border: none;
  border-radius: 0;
  box-shadow: none;

  /* noinspection CssInvalidFunction */
  &.full-width {
    min-inline-size: anchor-size(width);
  }

  /* noinspection CssInvalidFunction,CssInvalidAtRule */
  &.floating.top-right {
    inset: auto anchor(right) anchor(top) auto;
    margin: var(--kds-spacing-container-0-25x) 0
      var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-25x);
    position-try-fallbacks:
      --kds-popover-try-top-left, --kds-popover-try-bottom-right,
      --kds-popover-try-bottom-left, --kds-popover-try-top-right;
  }

  /* noinspection CssInvalidFunction,CssInvalidAtRule */
  &.floating.top-left {
    inset: auto auto anchor(top) anchor(left);
    margin: var(--kds-spacing-container-0-25x)
      var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-25x) 0;
    position-try-fallbacks:
      --kds-popover-try-top-right, --kds-popover-try-bottom-left,
      --kds-popover-try-bottom-right, --kds-popover-try-top-left;
  }

  /* noinspection CssInvalidFunction,CssInvalidAtRule */
  &.floating.bottom-right {
    inset: anchor(bottom) anchor(right) auto auto;
    margin: var(--kds-spacing-container-0-25x) 0
      var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-25x);
    position-try-fallbacks:
      --kds-popover-try-bottom-left, --kds-popover-try-top-right,
      --kds-popover-try-top-left, --kds-popover-try-bottom-right;
  }

  /* noinspection CssInvalidFunction,CssInvalidAtRule */
  &.floating.bottom-left {
    inset: anchor(bottom) auto auto anchor(left);
    margin: var(--kds-spacing-container-0-25x)
      var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-25x) 0;
    position-try-fallbacks:
      --kds-popover-try-bottom-right, --kds-popover-try-top-left,
      --kds-popover-try-top-right, --kds-popover-try-bottom-left;
  }
}

/* noinspection CssInvalidFunction,CssInvalidAtRule */
@position-try --kds-popover-try-top-right {
  inset: auto anchor(right) anchor(top) auto;
  margin: var(--kds-spacing-container-0-25x) 0
    var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-25x);
}

/* noinspection CssInvalidFunction,CssInvalidAtRule */
@position-try --kds-popover-try-top-left {
  inset: auto auto anchor(top) anchor(left);
  margin: var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-25x)
    var(--kds-spacing-container-0-25x) 0;
}

/* noinspection CssInvalidFunction,CssInvalidAtRule */
@position-try --kds-popover-try-bottom-right {
  inset: anchor(bottom) anchor(right) auto auto;
  margin: var(--kds-spacing-container-0-25x) 0
    var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-25x);
}

/* noinspection CssInvalidFunction,CssInvalidAtRule */
@position-try --kds-popover-try-bottom-left {
  inset: anchor(bottom) auto auto anchor(left);
  margin: var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-25x)
    var(--kds-spacing-container-0-25x) 0;
}

.kds-popover-default-content {
  padding: var(--kds-spacing-container-0-75x);
  font: var(--kds-font-base-body-small);
  color: var(--kds-color-text-and-icon-neutral);
  background-color: var(--kds-color-surface-default);
  border-radius: var(--kds-border-radius-container-0-37x);
  box-shadow: var(--kds-elevation-level-3);
}
</style>
