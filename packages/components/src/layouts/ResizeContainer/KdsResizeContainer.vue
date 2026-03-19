<script setup lang="ts">
import { type CSSProperties, computed, ref, useTemplateRef, watch } from "vue";

import { usePointerHandler } from "../../util/usePointerHandler";

import ResizeHandle from "./ResizeHandle/ResizeHandle.vue";
import type { KdsResizeContainerProps } from "./types";

const DEFAULT_INITIAL_HEIGHT = 200;
const KEYBOARD_RESIZE_STEP = 10;

const {
  height = DEFAULT_INITIAL_HEIGHT,
  minHeight = 0,
  maxHeight,
  numberOfHandles = 1,
  handleGap = "0px",
} = defineProps<KdsResizeContainerProps>();

const clamp = (value: number) =>
  Math.max(
    minHeight,
    maxHeight === undefined ? value : Math.min(value, maxHeight),
  );

const currentHeight = ref(clamp(height));
const isMaximized = ref(false);

const contentRef = useTemplateRef("content");
const heightAtDragStart = ref(0);
const startY = ref<number | null>(null);

const { activePointerId, onPointerDown, onPointerMove, onPointerUp } =
  usePointerHandler((event) => {
    if (startY.value === null) {
      startY.value = event.clientY;
      heightAtDragStart.value =
        contentRef.value?.getBoundingClientRect().height ?? currentHeight.value;
      currentHeight.value = clamp(heightAtDragStart.value);
      isMaximized.value = false;
      return;
    }

    currentHeight.value = clamp(
      heightAtDragStart.value + event.clientY - startY.value,
    );
  });

watch(activePointerId, (id) => {
  if (id === null) {
    startY.value = null;
  }
});

const onDoubleClick = () => {
  isMaximized.value = !isMaximized.value;
};

const onKeydown = (event: KeyboardEvent) => {
  const renderedHeight =
    contentRef.value?.getBoundingClientRect().height ?? currentHeight.value;

  if (event.key === "ArrowDown") {
    currentHeight.value = clamp(renderedHeight + KEYBOARD_RESIZE_STEP);
    isMaximized.value = false;
    event.preventDefault();
  } else if (event.key === "ArrowUp") {
    currentHeight.value = clamp(renderedHeight - KEYBOARD_RESIZE_STEP);
    isMaximized.value = false;
    event.preventDefault();
  } else if (event.key === "Enter" || event.key === " ") {
    onDoubleClick();
  }
};

const contentStyle = computed<CSSProperties>(() => ({
  minBlockSize: `${minHeight}px`,
  blockSize: isMaximized.value ? "fit-content" : `${currentHeight.value}px`,
  maxBlockSize: maxHeight === undefined ? undefined : `${maxHeight}px`,
}));
</script>

<template>
  <div
    :class="['kds-resize-container', { dragging: activePointerId !== null }]"
  >
    <div ref="content" class="kds-resize-container-content">
      <slot :content-style="contentStyle" />
    </div>
    <ResizeHandle
      :number-of-handles="numberOfHandles"
      :handle-gap="handleGap"
      @pointerdown="onPointerDown"
      @pointermove.prevent="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
      @keydown="onKeydown"
      @dblclick="onDoubleClick"
    />
  </div>
</template>

<style scoped>
.kds-resize-container {
  display: flex;
  flex-direction: column;
  gap: var(--kds-spacing-container-0-37x);

  &.dragging {
    user-select: none;
  }
}

.kds-resize-container-content {
  inline-size: 100%;
}
</style>
