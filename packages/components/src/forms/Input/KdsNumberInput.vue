<script setup lang="ts">
import { computed, useId } from "vue";

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

const ariaLabelledby = computed(() =>
  props.label ? labelId.value : undefined,
);
const ariaDescribedby = computed(() =>
  props.subText ? subTextId.value : undefined,
);

const clamp = (value: number) => {
  let next = value;

  if (props.min !== undefined && !Number.isNaN(props.min)) {
    next = Math.max(props.min, next);
  }
  if (props.max !== undefined && !Number.isNaN(props.max)) {
    next = Math.min(props.max, next);
  }

  return next;
};

const normalizeInteger = (value: number) => Math.trunc(value);

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

const adjustByStep = (direction: -1 | 1) => {
  const stepInt = normalizeInteger(props.step);
  if (stepInt <= 0) {
    return;
  }

  if (!Number.isFinite(modelValue.value)) {
    const next = clamp(0);
    modelValue.value = next;
    return;
  }

  const next = clamp(modelValue.value + direction * stepInt);
  modelValue.value = next;
};

const updateModelValue = (value: string) => {
  const parsedValue = Number(value);
  const normalized = normalizeInteger(parsedValue);
  const next = clamp(normalized);
  modelValue.value = next;
};

const inputMode = computed(() => "numeric" as const);

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
      :model-value="Number.isFinite(modelValue) ? `${modelValue}` : ''"
      type="number"
      :inputmode="inputMode"
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
      :aria-labelledby="ariaLabelledby"
      :aria-describedby="ariaDescribedby"
      @update:model-value="updateModelValue"
      @keydown="handleKeydown"
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
