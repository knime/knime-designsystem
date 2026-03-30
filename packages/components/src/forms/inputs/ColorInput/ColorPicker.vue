<script setup lang="ts">
import { computed, ref, watch } from "vue";

import { usePointerHandler } from "../../../util/usePointerHandler";
import KdsTextInput from "../TextInput/KdsTextInput.vue";

import ColorPickerSlider from "./ColorPickerSlider.vue";
import {
  clamp,
  hexToRgba,
  hsvToRgb,
  normalizeHexColor,
  rgbToHsv,
  rgbaToHex,
} from "./colorUtils";

const DEFAULT_HUE_DEG = 270;
const DEFAULT_SATURATION = 0.8;
const DEFAULT_VALUE = 0.9;
const DEFAULT_ALPHA = 1;

const HUE_MAX_DEG = 360;
const HUE_MAX_EXCLUSIVE_DEG = 359.999;
const PERCENT = 100;

const KEYBOARD_STEP = 0.01;
const KEYBOARD_LARGE_STEP = 0.1;
const HUE_KEYBOARD_STEP_DEG = 1;
const HUE_KEYBOARD_LARGE_STEP_DEG = 10;

const modelValue = defineModel<string>({ default: "" });

const colorspaceEl = ref<HTMLElement | null>(null);

const hue = ref(DEFAULT_HUE_DEG);
const saturation = ref(DEFAULT_SATURATION);
const value = ref(DEFAULT_VALUE);
const alpha = ref(DEFAULT_ALPHA);
/**
 * This flag is used to prevent feedback loops when updating the internal HSV state from the external modelValue.
 * When the user updates the color using the UI, we first set this flag to indicate that the next modelValue update is
 * coming from an internal change, so the watcher should ignore it.
 * Without this flag, updating the color would adapt the position of the handle (i.e. the handle jumps), because the
 * same color can occur in multiple places in the color space.
 */
const hasPendingInternalModelUpdate = ref(false);

const syncFromModelValue = (next: string) => {
  const rgba = hexToRgba(next);
  if (!rgba) {
    return;
  }

  const hsv = rgbToHsv(rgba);
  hue.value = hsv.h;
  saturation.value = hsv.s;
  value.value = hsv.v;
  alpha.value = rgba.a;
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

const currentRgb = computed(() =>
  hsvToRgb({
    h: hue.value,
    s: saturation.value,
    v: value.value,
  }),
);

const currentHex = computed(() => {
  const hex = rgbaToHex({
    ...currentRgb.value,
    a: alpha.value,
  });
  // rgbaToHex always returns #RRGGBBAA; for fully opaque colors, omit the alpha suffix
  return alpha.value === DEFAULT_ALPHA && hex.length === 9
    ? hex.slice(0, 7)
    : hex;
});

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

const alphaBackgroundImage = computed(() => {
  const { r, g, b } = currentRgb.value;
  return `
    linear-gradient(to right, rgba(${r}, ${g}, ${b}, 0), rgb(${r}, ${g}, ${b})),
    repeating-conic-gradient(
      var(--kds-color-background-neutral-active) 0 25%,
      var(--kds-color-surface-default) 0 50%
    )
  `;
});

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

const {
  onPointerDown: onColorspacePointerDown,
  onPointerMove: onColorspacePointerMove,
  onPointerUp: onColorspacePointerUp,
} = usePointerHandler(updateFromColorspaceEvent);

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
const alphaPercent = computed(() => Math.round(alpha.value * PERCENT));
const alphaValueText = computed(() => `${alphaPercent.value} percent`);

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

    <ColorPickerSlider
      v-model="hue"
      class="hue"
      label="Hue"
      :value-now="Math.round(hue)"
      :value-min="0"
      :value-max="HUE_MAX_DEG"
      :value-text="hueValueText"
      :min="0"
      :max="HUE_MAX_EXCLUSIVE_DEG"
      :step="HUE_KEYBOARD_STEP_DEG"
      :large-step="HUE_KEYBOARD_LARGE_STEP_DEG"
      @update:slider-value="setModelValueFromHsv"
    />

    <ColorPickerSlider
      v-model="alpha"
      class="alpha"
      label="Alpha"
      :value-now="alphaPercent"
      :value-min="0"
      :value-max="PERCENT"
      :value-text="alphaValueText"
      :min="0"
      :max="1"
      :step="KEYBOARD_STEP"
      :large-step="KEYBOARD_LARGE_STEP"
      @update:slider-value="setModelValueFromHsv"
    />
    <KdsTextInput
      :model-value="modelValue"
      ariaLabel="Color hex value"
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

.colorspace:focus {
  outline: none;
}

.colorspace:focus .handle,
.colorspace:focus-visible .handle {
  outline: var(--kds-border-action-focused);
  outline-offset: calc(-1 * var(--kds-spacing-offset-focus));
}

.hue {
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
}

.alpha {
  background-image: v-bind(alphaBackgroundImage);
  background-size:
    100% 100%,
    calc(var(--kds-dimension-component-height-0-75x) / 2)
      calc(var(--kds-dimension-component-height-0-75x) / 2);
}
</style>
