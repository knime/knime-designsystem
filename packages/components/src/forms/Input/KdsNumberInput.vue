<script setup lang="ts">
import { computed, ref, useId, watch } from "vue";

import KdsButton from "../../buttons/KdsButton.vue";
import KdsLabel from "../KdsLabel.vue";
import KdsSubText from "../KdsSubText.vue";

import KdsBaseInput from "./BaseInput.vue";
import type { KdsNumberInputProps } from "./types";

const props = withDefaults(defineProps<KdsNumberInputProps>(), {
  disabled: false,
  readonly: false,
  required: false,
  error: false,
  validating: false,
  preserveSubTextSpace: false,
  unit: "",
  step: 1,
});

const modelValue = defineModel<number>({ default: NaN });

const generatedId = useId();
const inputId = computed(() => `${generatedId}-input`);
const labelId = computed(() => `${generatedId}-label`);
const subTextId = computed(() => `${generatedId}-subtext`);

const isFocused = ref(false);

/**
 * String representation of what's currently shown in the input.
 *
 * Important: we keep this separate from the numeric model to allow intermediate
 * typing states and to avoid clamping away out-of-range values before external
 * validation (e.g. JSONForms/builtin validations) can kick in.
 */
const localValue = ref<string>("");

const formatForDisplay = (value: number) => {
  return Number.isFinite(value) ? `${value}` : "";
};

const parseFromInput = (value: string) => {
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return NaN;
  }
  const parsed = Number.parseFloat(trimmed);
  return Number.isFinite(parsed) ? parsed : NaN;
};

const clamp = (value: number) => {
  if (!Number.isFinite(value)) {
    return NaN;
  }

  let next = value;

  if (props.min !== undefined && !Number.isNaN(props.min)) {
    next = Math.max(props.min, next);
  }
  if (props.max !== undefined && !Number.isNaN(props.max)) {
    next = Math.min(props.max, next);
  }

  return next;
};

watch(
  () => modelValue.value,
  (next) => {
    // While focused, let the user keep typing without being overridden by external updates.
    if (isFocused.value) {
      return;
    }
    localValue.value = formatForDisplay(next);
  },
  { immediate: true },
);

const canDecrease = computed(() => {
  if (props.disabled || props.readonly) {
    return false;
  }

  if (props.min === undefined || Number.isNaN(props.min)) {
    return true;
  }

  return !(modelValue.value <= props.min);
});

const canIncrease = computed(() => {
  if (props.disabled || props.readonly) {
    return false;
  }

  if (props.max === undefined || Number.isNaN(props.max)) {
    return true;
  }

  return !(modelValue.value >= props.max);
});

const roundToStep = (value: number) => {
  if (!Number.isFinite(value)) {
    return NaN;
  }

  // Avoid floating point artifacts when working with decimal steps.
  const step = props.step;
  const precision = Math.max(0, (step.toString().split(".")[1] ?? "").length);
  const factor = Number(`1e${precision}`);

  const scaledNext = Math.round(value * factor);
  const scaledStep = Math.round(step * factor);
  if (scaledStep === 0) {
    return value;
  }

  const roundedScaled = Math.round(scaledNext / scaledStep) * scaledStep;
  return roundedScaled / factor;
};

const adjustByStep = (direction: -1 | 1) => {
  if (props.step <= 0) {
    return;
  }

  const base = Number.isFinite(modelValue.value)
    ? modelValue.value
    : parseFromInput(localValue.value);

  const nextRaw = Number.isFinite(base) ? base + direction * props.step : 0;
  // Only round to step, don't clamp - clamping happens on blur
  const next = roundToStep(nextRaw);

  modelValue.value = next;
  localValue.value = formatForDisplay(next);
};

const handleKeydown = (event: KeyboardEvent) => {
  if (props.disabled || props.readonly) {
    return;
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();
    adjustByStep(1);
    return;
  }
  if (event.key === "ArrowDown") {
    event.preventDefault();
    adjustByStep(-1);
  }
};

const handleUpdateModelValue = (value: string) => {
  localValue.value = value;
  modelValue.value = parseFromInput(value);
};

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false;

  // Normalize, round to step, and clamp only when leaving the field.
  const parsed = parseFromInput(localValue.value);
  const base = Number.isFinite(parsed) ? parsed : 0;
  const rounded = roundToStep(base);
  const normalized = clamp(rounded);

  modelValue.value = normalized;
  localValue.value = formatForDisplay(normalized);

  // Also force the native input to normalize its internal value.
  const target = event.target as HTMLInputElement | null;
  if (target && Number.isFinite(normalized)) {
    target.valueAsNumber = normalized;
  }
};
</script>

<template>
  <div class="number-input">
    <KdsLabel
      v-if="props.label"
      :id="labelId"
      :for="inputId"
      :label="props.label"
    />

    <KdsBaseInput
      :id="inputId"
      :model-value="localValue"
      type="number"
      :inputmode="props.step >= 1 ? 'numeric' : 'decimal'"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :readonly="props.readonly"
      :required="props.required"
      :error="props.error"
      :validating="props.validating"
      :name="props.name"
      :autocomplete="props.autocomplete"
      :min="props.min"
      :max="props.max"
      :step="props.step"
      :unit="props.unit"
      :aria-labelledby="props.label ? labelId : undefined"
      :aria-describedby="props.subText ? subTextId : undefined"
      @update:model-value="handleUpdateModelValue"
      @keydown="handleKeydown"
      @focus="isFocused = true"
      @blur="handleBlur"
    >
      <template #trailing>
        <div class="button-wrapper">
          <KdsButton
            type="button"
            size="xsmall"
            variant="outlined"
            leading-icon="minus"
            aria-label="Decrease"
            :disabled="!canDecrease"
            @click="adjustByStep(-1)"
          />
          <KdsButton
            type="button"
            size="xsmall"
            variant="outlined"
            leading-icon="plus"
            aria-label="Increase"
            :disabled="!canIncrease"
            @click="adjustByStep(1)"
          />
        </div>
      </template>
    </KdsBaseInput>

    <KdsSubText
      :id="subTextId"
      :sub-text="props.subText"
      :error="props.error"
      :validating="props.validating"
      :preserve-sub-text-space="props.preserveSubTextSpace"
    />
  </div>
</template>

<style scoped>
.number-input {
  display: flex;
  flex-direction: column;
}

.button-wrapper {
  display: flex;
  flex-shrink: 0;
  gap: var(--kds-spacing-container-0-12x);
  align-items: center;
}
</style>
