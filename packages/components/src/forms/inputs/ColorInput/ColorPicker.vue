<script setup lang="ts">
import { computed, ref, watch } from "vue";

import KdsTextInput from "../TextInput/KdsTextInput.vue";

import {
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

const modelValue = defineModel<string>({ default: "" });

const colorspaceEl = ref<HTMLElement | null>(null);
const hueEl = ref<HTMLElement | null>(null);

const hue = ref(DEFAULT_HUE_DEG);
const saturation = ref(DEFAULT_SATURATION);
const value = ref(DEFAULT_VALUE);

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

const colorspaceBackground = computed(() => {
  const { r, g, b } = hueRgb.value;
  return {
    backgroundImage: `linear-gradient(90deg, rgba(${r}, ${g}, ${b}, 0) 0%, rgb(${r}, ${g}, ${b}) 100%), linear-gradient(0deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)`,
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

const activeColorspacePointerId = ref<number | null>(null);
const activeHuePointerId = ref<number | null>(null);

const onColorspacePointerDown = (event: PointerEvent) => {
  if (event.button !== 0) {
    return;
  }

  activeColorspacePointerId.value = event.pointerId;
  (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  updateFromColorspaceEvent(event);
};

const onColorspacePointerMove = (event: PointerEvent) => {
  if (activeColorspacePointerId.value !== event.pointerId) {
    return;
  }

  updateFromColorspaceEvent(event);
};

const onColorspacePointerUp = (event: PointerEvent) => {
  if (activeColorspacePointerId.value !== event.pointerId) {
    return;
  }

  activeColorspacePointerId.value = null;
};

const onHuePointerDown = (event: PointerEvent) => {
  if (event.button !== 0) {
    return;
  }

  activeHuePointerId.value = event.pointerId;
  (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  updateFromHueEvent(event);
};

const onHuePointerMove = (event: PointerEvent) => {
  if (activeHuePointerId.value !== event.pointerId) {
    return;
  }

  updateFromHueEvent(event);
};

const onHuePointerUp = (event: PointerEvent) => {
  if (activeHuePointerId.value !== event.pointerId) {
    return;
  }

  activeHuePointerId.value = null;
};

const updateFromTextValue = (next: string) => {
  modelValue.value = next;

  const normalized = normalizeHexColor(next);
  if (normalized) {
    syncFromModelValue(normalized);
  }
};
</script>

<template>
  <div class="kds-color-picker">
    <div
      ref="colorspaceEl"
      class="colorspace"
      role="application"
      aria-label="Color selection"
      tabindex="0"
      :style="colorspaceBackground"
      @pointerdown.prevent="onColorspacePointerDown"
      @pointermove.prevent="onColorspacePointerMove"
      @pointerup="onColorspacePointerUp"
      @pointercancel="onColorspacePointerUp"
    >
      <div class="colorspace-handle" :style="colorspaceHandleStyle" />
    </div>

    <div
      ref="hueEl"
      class="hue"
      role="application"
      aria-label="Hue selection"
      tabindex="0"
      @pointerdown.prevent="onHuePointerDown"
      @pointermove.prevent="onHuePointerMove"
      @pointerup="onHuePointerUp"
      @pointercancel="onHuePointerUp"
    >
      <div class="hue-handle" :style="hueHandleStyle" />
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
  padding: var(--kds-spacing-container-0-75x);
}

.colorspace {
  position: relative;
  width: 100%;
  min-width: 200px;
  height: 200px;
  cursor: crosshair;
  outline: none;
  border-radius: var(--kds-border-radius-container-0-37x);
}

.colorspace:focus-visible {
  outline: var(--kds-border-action-focused);
  outline-offset: var(--kds-spacing-offset-focus);
}

.colorspace-handle {
  position: absolute;
  width: var(--kds-dimension-icon-0-75x);
  height: var(--kds-dimension-icon-0-75x);
  pointer-events: none;
  border: var(--kds-border-node-status-empty);
  border-radius: 50%;
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
  border-radius: 100px;
}

.hue:focus-visible {
  outline: var(--kds-border-action-focused);
  outline-offset: var(--kds-spacing-offset-focus);
}

.hue-handle {
  position: absolute;
  top: 50%;
  width: var(--kds-dimension-icon-0-75x);
  height: var(--kds-dimension-icon-0-75x);
  pointer-events: none;
  background: var(--kds-color-surface-default);
  border: var(--kds-border-node-status-empty);
  border-radius: 50%;
  box-shadow: var(--kds-elevation-level-3);
  transform: translate(-50%, -50%);
}
</style>
