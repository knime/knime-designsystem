<script setup lang="ts">
import { computed, ref, useTemplateRef, watch } from "vue";

import KdsButton from "../../../buttons/KdsButton/KdsButton.vue";
import BaseFormFieldWrapper from "../../_helper/BaseFormFieldWrapper.vue";
import type { KdsFormFieldExpose } from "../../types.ts";
import BaseInput from "../BaseInput.vue";

import { createKdsNumberParser } from "./numberParser";
import type { KdsNumberInputProps } from "./types";

const {
  disabled = false,
  error = false,
  unit = "",
  step = 1,
  min,
  max,
  placeholder,
  autocomplete,
  label,
  ariaLabel,
} = defineProps<KdsNumberInputProps>();

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
  createKdsNumberParser({ locale: "en-US", step }),
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

  if (min !== undefined && !Number.isNaN(min)) {
    result = Math.max(min, result);
  }
  if (max !== undefined && !Number.isNaN(max)) {
    result = Math.min(max, result);
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
  if (disabled) {
    return false;
  }

  if (min === undefined || Number.isNaN(min)) {
    return true;
  }

  if (Number.isNaN(modelValue.value)) {
    return true;
  }

  return modelValue.value > min;
});

const canIncrease = computed(() => {
  if (disabled) {
    return false;
  }

  if (max === undefined || Number.isNaN(max)) {
    return true;
  }

  if (Number.isNaN(modelValue.value)) {
    return true;
  }

  return modelValue.value < max;
});

const adjustByStep = (direction: -1 | 1) => {
  if (step <= 0) {
    return;
  }

  const base = Number.isFinite(modelValue.value)
    ? modelValue.value
    : numberParser.value.parseFromInput(localValue.value);

  const nextRaw = Number.isFinite(base) ? base + direction * step : 0;
  // Round due to precision issues that can arise when adding steps to certain numbers, e.g. 0.1 + 0.1 + 0.1.
  const rounded = numberParser.value.roundToStep(nextRaw);
  const next = clamp(rounded);

  modelValue.value = next;
  localValue.value = numberParser.value.formatForDisplay(next);
};

const handleKeydown = (event: KeyboardEvent) => {
  if (disabled) {
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

const baseInput = useTemplateRef("baseInput");

defineExpose<KdsFormFieldExpose>({
  focus: () => baseInput.value?.focus(),
});
</script>

<template>
  <BaseFormFieldWrapper v-bind="$props">
    <template #default="slotProps">
      <BaseInput
        ref="baseInput"
        v-bind="slotProps"
        :model-value="localValue"
        type="text"
        :inputmode="step >= 1 ? 'numeric' : 'decimal'"
        :placeholder="placeholder"
        :disabled="disabled"
        :error="error"
        :autocomplete="autocomplete"
        :unit="unit"
        role="spinbutton"
        :aria-valuenow="ariaValuenow"
        :aria-valuemin="min"
        :aria-valuemax="max"
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
            :aria-label="`Decrease ${label ?? ariaLabel}`"
            :disabled="!canDecrease"
            @click="adjustByStep(-1)"
          />
          <KdsButton
            type="button"
            size="xsmall"
            variant="outlined"
            leading-icon="plus"
            :aria-label="`Increase ${label ?? ariaLabel}`"
            :disabled="!canIncrease"
            @click="adjustByStep(1)"
          />
        </template>
      </BaseInput>
    </template>
  </BaseFormFieldWrapper>
</template>
