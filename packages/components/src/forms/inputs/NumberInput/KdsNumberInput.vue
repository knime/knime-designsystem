<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useTemplateRef, watch } from "vue";

import KdsButton from "../../../buttons/KdsButton/KdsButton.vue";
import BaseFormFieldWrapper from "../../_helper/BaseFormFieldWrapper.vue";
import type { KdsFormFieldExpose } from "../../types.ts";
import BaseInput from "../BaseInput.vue";

import { createKdsNumberParser } from "./numberParser";
import type { KdsNumberInputProps } from "./types";

const props = withDefaults(defineProps<KdsNumberInputProps>(), {
  disabled: false,
  error: false,
  validating: false,
  preserveSubTextSpace: false,
  unit: "",
  step: 1,
});

const modelValue = defineModel<number>({ default: Number.NaN });

const isFocused = ref(false);

/**
 * String representation of what's currently shown in the input.
 *
 * Important: we keep this separate from the numeric model to allow intermediate
 * typing states and to avoid clamping away out-of-range values before external
 * validation (e.g. JSONForms/builtin validations) can kick in.
 */
const localValue = ref<string>("");

const numberParser = computed(() =>
  createKdsNumberParser({ locale: "en-US", step: props.step }),
);

const ariaValuenow = computed(() =>
  Number.isFinite(modelValue.value) ? modelValue.value : undefined,
);

const ariaValuetext = computed(() => {
  if (!Number.isFinite(modelValue.value)) {
    return undefined;
  }

  // Format the spoken feedback using en-US locale (decimal separator, etc.).
  return numberParser.value.formatForDisplay(modelValue.value);
});

const clamp = (value: number) => {
  if (!Number.isFinite(value)) {
    return Number.NaN;
  }

  let result = value;

  if (props.min !== undefined && !Number.isNaN(props.min)) {
    result = Math.max(props.min, result);
  }
  if (props.max !== undefined && !Number.isNaN(props.max)) {
    result = Math.min(props.max, result);
  }

  return result;
};

watch(
  () => modelValue.value,
  (next) => {
    // While focused, let the user keep typing without being overridden by external updates.
    if (isFocused.value) {
      return;
    }
    localValue.value = numberParser.value.formatForDisplay(next);
  },
  { immediate: true },
);

const canDecrease = computed(() => {
  if (props.disabled) {
    return false;
  }

  if (props.min === undefined || Number.isNaN(props.min)) {
    return true;
  }

  if (Number.isNaN(modelValue.value)) {
    return true;
  }

  return modelValue.value > props.min;
});

const canIncrease = computed(() => {
  if (props.disabled) {
    return false;
  }

  if (props.max === undefined || Number.isNaN(props.max)) {
    return true;
  }

  if (Number.isNaN(modelValue.value)) {
    return true;
  }

  return modelValue.value < props.max;
});

const adjustByStep = (direction: -1 | 1) => {
  if (props.step <= 0) {
    return;
  }

  const base = Number.isFinite(modelValue.value)
    ? modelValue.value
    : numberParser.value.parseFromInput(localValue.value);

  const nextRaw = Number.isFinite(base) ? base + direction * props.step : 0;
  // Round due to precision issues that can arise when adding steps to certain numbers, e.g. 0.1 + 0.1 + 0.1.
  const rounded = numberParser.value.roundToStep(nextRaw);
  const next = clamp(rounded);

  modelValue.value = next;
  localValue.value = numberParser.value.formatForDisplay(next);
};

const handleKeydown = (event: KeyboardEvent) => {
  if (props.disabled) {
    return;
  }

  if (event.key === "ArrowUp" && canIncrease.value) {
    event.preventDefault();
    adjustByStep(1);
    return;
  }
  if (event.key === "ArrowDown" && canDecrease.value) {
    event.preventDefault();
    adjustByStep(-1);
  }
};

const handleUpdateModelValue = (value: string) => {
  localValue.value = value;
  modelValue.value = numberParser.value.parseFromInput(value);
};

const baseInput = useTemplateRef("baseInput");

const REPEAT_INITIAL_DELAY_MS = 400;
const REPEAT_INTERVAL_MS = 100;

let repeatTimer: ReturnType<typeof setTimeout> | null = null;
let isStepping = false;

const handleBlur = () => {
  // When a step button is clicked, the input briefly loses focus. Skip
  // normalization and restore focus so the user does not see a focus blink.
  if (isStepping) {
    baseInput.value?.focus();
    return;
  }

  isFocused.value = false;

  // Normalize, round to step, and clamp only when leaving the field.
  const parsed = numberParser.value.parseFromInput(localValue.value);
  const normalized = clamp(parsed);

  modelValue.value = normalized;
  localValue.value = numberParser.value.formatForDisplay(normalized);
};

const stopRepeating = () => {
  if (repeatTimer !== null) {
    clearTimeout(repeatTimer);
    repeatTimer = null;
  }
  isStepping = false;
};

const startRepeating = (direction: -1 | 1) => {
  stopRepeating();
  isStepping = true;
  adjustByStep(direction);

  repeatTimer = setTimeout(function tick() {
    adjustByStep(direction);
    repeatTimer = setTimeout(tick, REPEAT_INTERVAL_MS);
  }, REPEAT_INITIAL_DELAY_MS);
};

onBeforeUnmount(stopRepeating);

/**
 * Handles keyboard-initiated button clicks (Enter / Space).
 * Pointer clicks are already handled by `startRepeating` via `@pointerdown`,
 * so we skip them here (keyboard clicks have `event.detail === 0`).
 */
const handleButtonClick = (direction: -1 | 1, event: MouseEvent) => {
  if (event.detail !== 0) {
    return;
  }
  adjustByStep(direction);
};

defineExpose<KdsFormFieldExpose>({
  focus: () => baseInput.value?.focus(),
});
</script>

<template>
  <BaseFormFieldWrapper v-bind="props">
    <template #default="slotProps">
      <BaseInput
        ref="baseInput"
        v-bind="slotProps"
        :model-value="localValue"
        type="text"
        :inputmode="Number.isInteger(props.step) ? 'numeric' : 'decimal'"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :error="props.error"
        :autocomplete="props.autocomplete"
        :unit="props.unit"
        role="spinbutton"
        :aria-valuenow="ariaValuenow"
        :aria-valuemin="props.min"
        :aria-valuemax="props.max"
        :aria-valuetext="ariaValuetext"
        @update:model-value="handleUpdateModelValue"
        @keydown="handleKeydown"
        @focus="isFocused = true"
        @blur="handleBlur"
      >
        <template #trailing>
          <KdsButton
            type="button"
            size="xsmall"
            variant="outlined"
            leading-icon="minus"
            :aria-label="`Decrease ${props.label ?? props.ariaLabel}`"
            :disabled="!canDecrease"
            @click="handleButtonClick(-1, $event)"
            @pointerdown="startRepeating(-1)"
            @pointerup="stopRepeating"
            @pointerleave="stopRepeating"
          />
          <KdsButton
            type="button"
            size="xsmall"
            variant="outlined"
            leading-icon="plus"
            :aria-label="`Increase ${props.label ?? props.ariaLabel}`"
            :disabled="!canIncrease"
            @click="handleButtonClick(1, $event)"
            @pointerdown="startRepeating(1)"
            @pointerup="stopRepeating"
            @pointerleave="stopRepeating"
          />
        </template>
      </BaseInput>
    </template>
  </BaseFormFieldWrapper>
</template>
