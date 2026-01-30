<script setup lang="ts">
import { computed, useId } from "vue";

import KdsButton from "../../buttons/KdsButton.vue";
import KdsLabel from "../KdsLabel.vue";
import KdsSubText from "../KdsSubText.vue";

import KdsBaseInput from "./BaseInput.vue";
import type { KdsNumberInputEmits, KdsNumberInputProps } from "./types";

const props = withDefaults(defineProps<KdsNumberInputProps>(), {
  disabled: false,
  readonly: false,
  required: false,
  error: false,
  validating: false,
  preserveSubTextSpace: false,
  unit: "",
  stepsize: 1,
});

const emit = defineEmits<KdsNumberInputEmits>();

const modelValue = defineModel<string>({ default: "" });

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

const parseCurrent = () => {
  if (modelValue.value.trim().length === 0) {
    return undefined;
  }
  const parsed = Number(modelValue.value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

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

const stepDecimals = computed(() => {
  const step = props.stepsize;
  if (!Number.isFinite(step)) {
    return 0;
  }
  const [, decimals = ""] = step.toString().split(".");
  return decimals.length;
});

const decimalRadix = 10;

const normalizeNumber = (value: number) => {
  const decimals = stepDecimals.value;
  const factor = decimalRadix ** decimals;
  return Math.round(value * factor) / factor;
};

const getBaseValue = () => {
  const parsed = parseCurrent();
  if (parsed !== undefined) {
    return parsed;
  }

  if (props.min !== undefined && !Number.isNaN(props.min)) {
    return props.min;
  }

  return 0;
};

const setValue = (value: number) => {
  const normalized = normalizeNumber(clamp(value));
  modelValue.value = normalized.toString();
  emit("input", modelValue.value);
};

const canDecrease = computed(() => {
  if (props.disabled || props.readonly) {
    return false;
  }

  if (props.min === undefined || Number.isNaN(props.min)) {
    return true;
  }

  return getBaseValue() > props.min;
});

const canIncrease = computed(() => {
  if (props.disabled || props.readonly) {
    return false;
  }

  if (props.max === undefined || Number.isNaN(props.max)) {
    return true;
  }

  return getBaseValue() < props.max;
});

const adjustByStep = (direction: -1 | 1) => {
  const step = props.stepsize;
  if (!Number.isFinite(step) || step <= 0) {
    return;
  }

  const base = getBaseValue();
  setValue(base + direction * step);
};

const handleInput = (value: string) => {
  emit("input", value);
};

const handleFocus = (event: FocusEvent) => {
  emit("focus", event);
};

const handleBlur = (event: FocusEvent) => {
  emit("blur", event);
};

const handleKeydown = (event: KeyboardEvent) => {
  if (!props.disabled && !props.readonly) {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      adjustByStep(1);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      adjustByStep(-1);
    }
  }
  emit("keydown", event);
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
      v-model="modelValue"
      type="number"
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
      :step="props.stepsize"
      :unit="props.unit"
      :aria-labelledby="ariaLabelledby"
      :aria-describedby="ariaDescribedby"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
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
