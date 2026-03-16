<script setup lang="ts">
import { computed, ref } from "vue";

import type { ResizeHandleProps } from "./types";

const props = withDefaults(defineProps<ResizeHandleProps>(), {
  numberOfHandles: 1,
  handleGap: "0px",
});

const isHovered = ref(false);

const hasMultipleHandles = computed(() => props.numberOfHandles > 1);

const handleWidth = computed(() => {
  const n = props.numberOfHandles;
  const gap = props.handleGap;
  return `calc((100% - ${n - 1} * ${gap}) / ${2 * n})`;
});
</script>

<template>
  <div
    class="kds-resize-handle-area"
    :style="{ gap: props.handleGap }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <button
      v-for="i in props.numberOfHandles"
      :key="i"
      class="kds-resize-handle"
      :class="{
        'kds-resize-handle-sibling-hover': hasMultipleHandles && isHovered,
      }"
      aria-label="Resize vertically"
      :style="{ inlineSize: handleWidth }"
      type="button"
    >
      <span class="kds-resize-handle-line" />
    </button>
  </div>
</template>

<style scoped>
.kds-resize-handle-area {
  display: flex;
  justify-content: space-around;
}

.kds-resize-handle {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  block-size: calc(2 * var(--kds-spacing-container-0-37x));
  padding: 0;
  appearance: none;
  touch-action: none;
  cursor: row-resize;
  user-select: none;
  background: none;
  border: none;
  border-radius: var(--kds-border-radius-container-0-25x);
  -webkit-touch-callout: none;

  &:focus-visible {
    outline: var(--kds-border-action-focused);
    outline-offset: var(--kds-spacing-offset-focus);
  }

  & .kds-resize-handle-line {
    inline-size: 100%;
    block-size: 0;
    border-top: var(--kds-border-resize-handle-initial);
  }

  &:hover > .kds-resize-handle-line,
  &.kds-resize-handle-sibling-hover > .kds-resize-handle-line {
    border-top: var(--kds-border-resize-handle-hover);
  }

  &:active > .kds-resize-handle-line {
    border-top: var(--kds-border-resize-handle-active);
  }
}
</style>
