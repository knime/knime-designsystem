<script setup lang="ts" generic="UNUSED">
import { computed, useId } from "vue";

import Icon from "../Icon/Icon.vue";

import type { CheckboxProps } from "./types";

type CheckboxModelValue = CheckboxProps["modelValue"];

const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: false,
  disabled: false,
  error: false,
});

const emit = defineEmits<{
  /**
   * Emitted when the checkbox value changes
   */
  "update:modelValue": [value: CheckboxModelValue];
}>();

const id = useId();

const isChecked = computed(() => props.modelValue === true);
const isIndeterminate = computed(() => props.modelValue === "indeterminate");
const icon = computed(() => {
  if (isChecked.value) {
    return "checkmark";
  }
  if (isIndeterminate.value) {
    return "minus";
  }
  return null;
});

const ariaChecked = computed(() => {
  if (isIndeterminate.value) {
    return "mixed";
  }
  return isChecked.value;
});

const handleClick = () => {
  if (props.disabled) {
    return;
  }

  let newValue: CheckboxModelValue;

  if (isIndeterminate.value) {
    newValue = false;
  } else if (isChecked.value) {
    newValue = false;
  } else {
    newValue = true;
  }

  emit("update:modelValue", newValue);
};
</script>

<template>
  <button
    :class="{
      checkbox: true,
      checked: isChecked,
      indeterminate: isIndeterminate,
      disabled: props.disabled,
      error: props.error,
    }"
    :disabled="props.disabled"
    :aria-checked="ariaChecked"
    :aria-describedby="props.helperText ? `${id}-helper` : undefined"
    :aria-invalid="props.error"
    :title="props.title"
    type="button"
    role="checkbox"
    @click="handleClick"
  >
    <div class="control">
      <Icon v-if="icon" :name="icon" class="icon" size="xsmall" />
    </div>
    <div v-if="props.label || props.helperText" class="content">
      <div class="label">{{ props.label }}</div>
      <div v-if="props.helperText" :id="`${id}-helper`" class="helper-text">
        {{ props.helperText }}
      </div>
    </div>
  </button>
</template>

<style scoped>
.checkbox {
  --bg-initial: var(--kds-color-background-input-initial);
  --bg-hover: var(--kds-color-background-input-hover);
  --bg-active: var(--kds-color-background-input-active);
  --border: var(--kds-border-action-input);
  --icon-color: var(--kds-color-text-and-icon-selected);
  --text-color: var(--kds-color-text-and-icon-neutral);
  --helper-text-color: var(--kds-color-text-and-icon-muted);

  display: flex;
  gap: var(--kds-spacing-container-0-5x);
  align-items: flex-start;
  padding: 0;
  margin: 0;
  text-align: left;
  cursor: pointer;
  background: none;
  border: none;

  & .control {
    position: relative;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: var(--kds-dimension-component-height-0-88x);
    height: var(--kds-dimension-component-height-0-88x);
    color: var(--icon-color);
    background: var(--bg-initial);
    border: var(--border);
    border-radius: var(--kds-border-radius-container-0-25x);
  }

  &:focus-visible {
    outline: none;

    & .control {
      outline: var(--kds-border-action-focused);
      outline-offset: var(--kds-focus-outline-offset);
    }
  }

  &:hover:not(.disabled) .control {
    background: var(--bg-hover);
  }

  &:active:not(.disabled) .control {
    background: var(--bg-active);
  }

  &.checked,
  &.indeterminate {
    --bg-initial: var(--kds-color-background-selected-initial);
    --bg-hover: var(--kds-color-background-selected-hover);
    --bg-active: var(--kds-color-background-selected-active);
    --border: var(--kds-border-action-selected);
  }

  & .content {
    display: flex;
    flex-direction: column;
    gap: var(--kds-spacing-container-0-12x);
    text-rendering: geometricprecision;

    & .label {
      padding-top: var(--kds-spacing-container-0-10x);
      font: var(--kds-font-base-interactive-small);
      color: var(--text-color);
    }

    & .helper-text {
      font: var(--kds-font-base-subtext-small);
      color: var(--helper-text-color);
    }
  }

  &.disabled {
    --border: var(--kds-border-action-disabled);
    --icon-color: var(--kds-color-text-and-icon-disabled);
    --text-color: var(--kds-color-text-and-icon-disabled);
    --helper-text-color: var(--kds-color-text-and-icon-disabled);

    cursor: not-allowed;
  }

  &.error {
    --border: var(--kds-border-action-error);
    --icon-color: var(--kds-color-text-and-icon-danger);
    --text-color: var(--kds-color-text-and-icon-danger);
    --helper-text-color: var(--kds-color-text-and-icon-danger);
    --bg-hover: var(--kds-color-background-danger-hover);
    --bg-active: var(--kds-color-background-danger-active);

    &.checked,
    &.indeterminate {
      --bg-initial: var(--kds-color-background-danger-initial);
    }
  }
}
</style>
