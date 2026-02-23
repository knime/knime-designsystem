<script setup lang="ts">
import { computed, ref, watch } from "vue";

import KdsButton from "../../../buttons/KdsButton/KdsButton.vue";
import BaseFormFieldWrapper from "../../BaseFormFieldWrapper.vue";
import BaseInput from "../BaseInput.vue";
import type { KdsNumberInputProps } from "../types";

import { createKdsNumberParser } from "./numberParser";

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
    return NaN;
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
  if (props.disabled || props.readonly) {
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
  if (props.disabled || props.readonly) {
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
  if (props.disabled || props.readonly) {
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

const handleBlur = () => {
  isFocused.value = false;

  // Normalize, round to step, and clamp only when leaving the field.
  const parsed = numberParser.value.parseFromInput(localValue.value);
  const normalized = clamp(parsed);

  modelValue.value = normalized;
  localValue.value = numberParser.value.formatForDisplay(normalized);
};
</script>

<template>
  <BaseFormFieldWrapper v-bind="props">
    <template #default="slotProps">
      <BaseInput
        v-bind="slotProps"
        :model-value="localValue"
        type="text"
        :inputmode="props.step >= 1 ? 'numeric' : 'decimal'"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :readonly="props.readonly"
        :required="props.required"
        :error="props.error"
        :name="props.name"
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
            @click="adjustByStep(-1)"
          />
          <KdsButton
            type="button"
            size="xsmall"
            variant="outlined"
            leading-icon="plus"
            :aria-label="`Increase ${props.label ?? props.ariaLabel}`"
            :disabled="!canIncrease"
            @click="adjustByStep(1)"
          />
        </template>
      </BaseInput>
    </template>
  </BaseFormFieldWrapper>
</template>
