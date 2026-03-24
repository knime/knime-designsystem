<script setup lang="ts">
import { computed, useTemplateRef } from "vue";

import { usePointerHandler } from "../../../util/usePointerHandler";

import { clamp } from "./colorUtils";

export type ColorPickerSliderProps = {
  label: string;
  valueNow: number;
  valueMin: number;
  valueMax: number;
  valueText: string;
  min: number;
  max: number;
  step: number;
  largeStep: number;
};

const props = defineProps<ColorPickerSliderProps>();
const emit = defineEmits<{
  "update:slider-value": [value: number];
}>();

const modelValue = defineModel<number>({ required: true });

const sliderEl = useTemplateRef<HTMLElement>("sliderEl");

const setFromPointerEvent = (event: PointerEvent) => {
  const el = sliderEl.value;
  if (!el) {
    return;
  }

  const rect = el.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width;
  const ratio = clamp(x, 0, 1);
  modelValue.value = props.min + ratio * (props.max - props.min);
  emit("update:slider-value", modelValue.value);
};

const { onPointerDown, onPointerMove, onPointerUp } =
  usePointerHandler(setFromPointerEvent);

const onKeyDown = (event: KeyboardEvent) => {
  const delta = event.shiftKey ? props.largeStep : props.step;
  let handled = true;

  switch (event.key) {
    case "ArrowLeft":
      modelValue.value = clamp(modelValue.value - delta, props.min, props.max);
      break;
    case "ArrowRight":
      modelValue.value = clamp(modelValue.value + delta, props.min, props.max);
      break;
    default:
      handled = false;
  }

  if (handled) {
    event.preventDefault();
    emit("update:slider-value", modelValue.value);
  }
};

const handlePosition = computed(() => {
  const ratio = (modelValue.value - props.min) / (props.max - props.min);
  return `${clamp(ratio, 0, 1) * 100}%`;
});
</script>

<template>
  <div
    ref="sliderEl"
    class="kds-color-picker-slider"
    role="slider"
    :aria-label="label"
    :aria-valuenow="valueNow"
    :aria-valuemin="valueMin"
    :aria-valuemax="valueMax"
    :aria-valuetext="valueText"
    tabindex="0"
    @pointerdown.prevent="onPointerDown"
    @pointermove.prevent="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
    @lostpointercapture="onPointerUp"
    @keydown="onKeyDown"
  >
    <div class="handle" />
  </div>
</template>

<style scoped>
.kds-color-picker-slider {
  position: relative;
  width: 100%;
  height: var(--kds-dimension-component-height-0-75x);
  touch-action: none;
  cursor: pointer;
  user-select: none;
  outline: none;
  border-radius: var(--kds-border-radius-container-pill);

  & .handle {
    position: absolute;
    top: 50%;
    left: v-bind(handlePosition);
    width: var(--kds-dimension-icon-0-75x);
    height: var(--kds-dimension-icon-0-75x);
    pointer-events: none;
    border: var(--kds-border-color-picker-handle-initial);
    border-radius: var(--kds-border-radius-container-pill);
    box-shadow: var(--kds-elevation-level-3);
    transform: translate(-50%, -50%);
  }
}

.kds-color-picker-slider:focus {
  outline: none;
}

.kds-color-picker-slider:focus .handle,
.kds-color-picker-slider:focus-visible .handle {
  outline: var(--kds-border-action-focused);
  outline-offset: calc(-1 * var(--kds-spacing-offset-focus));
}
</style>
