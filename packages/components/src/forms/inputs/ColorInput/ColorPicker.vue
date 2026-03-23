<script setup lang="ts">
import { computed, ref, watch } from "vue";

import { usePointerHandler } from "../../../util/usePointerHandler";
import KdsTextInput from "../TextInput/KdsTextInput.vue";

import {
  clamp,
  hexToRgb,
  hsvToHex,
  hsvToRgb,
  normalizeHexColor,
  rgbToHsv,
} from "./colorUtils";

const DEFAULT_HUE_DEG = 270;
const DEFAULT_SATURATION = 0.8;
const DEFAULT_VALUE = 0.9;

const HUE_MAX_DEG = 360;
const HUE_MAX_EXCLUSIVE_DEG = 359.999;
const PERCENT = 100;

const KEYBOARD_STEP = 0.01;
const KEYBOARD_LARGE_STEP = 0.1;
const HUE_KEYBOARD_STEP_DEG = 1;
const HUE_KEYBOARD_LARGE_STEP_DEG = 10;

const modelValue = defineModel<string>({ default: "" });

const colorspaceEl = ref<HTMLElement | null>(null);
const hueEl = ref<HTMLElement | null>(null);

const hue = ref(DEFAULT_HUE_DEG);
const saturation = ref(DEFAULT_SATURATION);
const value = ref(DEFAULT_VALUE);
/**
 * This flag is used to prevent feedback loops when updating the internal HSV state from the external modelValue.
 * When the user updates the color using the UI, we first set this flag to indicate that the next modelValue update is
 * coming from an internal change, so the watcher should ignore it.
 * Without this flag, updating the color would adapt the position of the handle (i.e. the handle jumps), because the
 * same color can occur in multiple places in the color space.
 */
const hasPendingInternalModelUpdate = ref(false);

const syncFromModelValue = (next: string) => {
  const rgb = hexToRgb(next);
  if (!rgb) {
    return;
  }

  const hsv = rgbToHsv(rgb);
  hue.value = hsv.h;
  saturation.value = hsv.s;
  value.value = hsv.v;
};

watch(
  () => modelValue.value,
  (next) => {
    if (hasPendingInternalModelUpdate.value) {
      hasPendingInternalModelUpdate.value = false;
      return;
    }

    syncFromModelValue(next);
  },
  { immediate: true },
);

const currentHex = computed(() =>
  hsvToHex({
    h: hue.value,
    s: saturation.value,
    v: value.value,
  }),
);

const hueRgb = computed(() => hsvToRgb({ h: hue.value, s: 1, v: 1 }));

const TO_BOTTOM_GRADIENT = "linear-gradient(to bottom, transparent, black)";

const colorspaceBackground = computed(() => {
  const { r, g, b } = hueRgb.value;
  return {
    background: `${TO_BOTTOM_GRADIENT}, linear-gradient(to right, white, rgb(${r}, ${g}, ${b}))`,
  };
});

const colorspaceHandleStyle = computed(() => ({
  left: `${saturation.value * 100}%`,
  top: `${(1 - value.value) * 100}%`,
}));

const hueHandleStyle = computed(() => ({
  left: `${(hue.value / HUE_MAX_DEG) * PERCENT}%`,
}));

const setModelValueFromHsv = () => {
  hasPendingInternalModelUpdate.value = true;
  modelValue.value = currentHex.value;
};

const updateFromColorspaceEvent = (event: PointerEvent) => {
  const el = colorspaceEl.value;
  if (!el) {
    return;
  }

  const rect = el.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width;
  const y = (event.clientY - rect.top) / rect.height;

  saturation.value = Math.min(1, Math.max(0, x));
  value.value = 1 - Math.min(1, Math.max(0, y));

  setModelValueFromHsv();
};

const updateFromHueEvent = (event: PointerEvent) => {
  const el = hueEl.value;
  if (!el) {
    return;
  }

  const rect = el.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width;
  hue.value = Math.min(HUE_MAX_EXCLUSIVE_DEG, Math.max(0, x * HUE_MAX_DEG));

  setModelValueFromHsv();
};

const {
  onPointerDown: onColorspacePointerDown,
  onPointerMove: onColorspacePointerMove,
  onPointerUp: onColorspacePointerUp,
} = usePointerHandler(updateFromColorspaceEvent);

const {
  onPointerDown: onHuePointerDown,
  onPointerMove: onHuePointerMove,
  onPointerUp: onHuePointerUp,
} = usePointerHandler(updateFromHueEvent);

const updateFromTextValue = (next: string) => {
  modelValue.value = next;

  const normalized = normalizeHexColor(next);
  if (normalized) {
    syncFromModelValue(normalized);
  }
};

const saturationPercent = computed(() =>
  Math.round(saturation.value * PERCENT),
);
const valuePercent = computed(() => Math.round(value.value * PERCENT));

const colorspaceValueText = computed(
  () =>
    `Saturation ${saturationPercent.value} percent, brightness ${valuePercent.value} percent`,
);

const hueValueText = computed(() => `${Math.round(hue.value)} degrees`);

const onColorspaceKeyDown = (event: KeyboardEvent) => {
  const step = event.shiftKey ? KEYBOARD_LARGE_STEP : KEYBOARD_STEP;
  let handled = true;

  switch (event.key) {
    case "ArrowLeft":
      saturation.value = clamp(saturation.value - step, 0, 1);
      break;
    case "ArrowRight":
      saturation.value = clamp(saturation.value + step, 0, 1);
      break;
    case "ArrowUp":
      value.value = clamp(value.value + step, 0, 1);
      break;
    case "ArrowDown":
      value.value = clamp(value.value - step, 0, 1);
      break;
    default:
      handled = false;
  }

  if (handled) {
    event.preventDefault();
    setModelValueFromHsv();
  }
};

const onHueKeyDown = (event: KeyboardEvent) => {
  const step = event.shiftKey
    ? HUE_KEYBOARD_LARGE_STEP_DEG
    : HUE_KEYBOARD_STEP_DEG;
  let handled = true;

  switch (event.key) {
    case "ArrowLeft":
      hue.value = clamp(hue.value - step, 0, HUE_MAX_EXCLUSIVE_DEG);
      break;
    case "ArrowRight":
      hue.value = clamp(hue.value + step, 0, HUE_MAX_EXCLUSIVE_DEG);
      break;
    default:
      handled = false;
  }

  if (handled) {
    event.preventDefault();
    setModelValueFromHsv();
  }
};
</script>

<template>
  <div class="kds-color-picker">
    <div
      ref="colorspaceEl"
      class="colorspace"
      role="slider"
      aria-label="Color selection"
      aria-roledescription="2D color slider"
      :aria-valuetext="colorspaceValueText"
      :style="colorspaceBackground"
      tabindex="0"
      @pointerdown.prevent="onColorspacePointerDown"
      @pointermove.prevent="onColorspacePointerMove"
      @lostpointercapture="onColorspacePointerUp"
      @keydown="onColorspaceKeyDown"
    >
      <div class="handle" :style="colorspaceHandleStyle" />
    </div>

    <div
      ref="hueEl"
      class="hue"
      role="slider"
      aria-label="Hue"
      :aria-valuenow="Math.round(hue)"
      aria-valuemin="0"
      :aria-valuemax="HUE_MAX_DEG"
      :aria-valuetext="hueValueText"
      tabindex="0"
      @pointerdown.prevent="onHuePointerDown"
      @pointermove.prevent="onHuePointerMove"
      @lostpointercapture="onHuePointerUp"
      @keydown="onHueKeyDown"
    >
      <div class="handle" :style="hueHandleStyle" />
    </div>

    <KdsTextInput
      :model-value="modelValue"
      aria-label="Color hex value"
      placeholder="#FFFFFF"
      @update:model-value="updateFromTextValue"
    />
  </div>
</template>

<style scoped>
.kds-color-picker {
  display: flex;
  flex-direction: column;
  gap: var(--kds-spacing-container-1x);
  width: calc(206px + 2 * var(--kds-spacing-container-0-75x));
  max-width: 100%;
  padding: var(--kds-spacing-container-0-75x);
  background: var(--kds-color-surface-default);
  border-radius: var(--kds-border-radius-container-0-50x);
  box-shadow: var(--kds-elevation-level-3);
}

.colorspace {
  position: relative;
  width: 100%;
  height: 200px;
  cursor: crosshair;
  outline: none;
  border-radius: var(--kds-border-radius-container-0-37x);
}

.handle {
  position: absolute;
  width: var(--kds-dimension-icon-0-75x);
  height: var(--kds-dimension-icon-0-75x);
  pointer-events: none;
  border: var(--kds-border-color-picker-handle-initial);
  border-radius: var(--kds-border-radius-container-pill);
  box-shadow: var(--kds-elevation-level-3);
  transform: translate(-50%, -50%);
}

.hue {
  position: relative;
  width: 100%;
  height: var(--kds-dimension-component-height-0-75x);
  cursor: pointer;
  outline: none;
  background: linear-gradient(
    90deg,
    hsl(0deg 100% 50%) 0%,
    hsl(60deg 100% 50%) 17%,
    hsl(120deg 100% 50%) 33%,
    hsl(180deg 100% 50%) 50%,
    hsl(240deg 100% 50%) 67%,
    hsl(300deg 100% 50%) 83%,
    hsl(360deg 100% 50%) 100%
  );
  border-radius: var(--kds-border-radius-container-pill);

  & .handle {
    top: 50%;
  }
}

.colorspace:focus,
.hue:focus {
  outline: none;
}

.colorspace:focus .handle,
.colorspace:focus-visible .handle,
.hue:focus .handle,
.hue:focus-visible .handle {
  outline: var(--kds-border-action-focused);
  outline-offset: calc(-1 * var(--kds-spacing-offset-focus));
}
</style>
