<script setup lang="ts">
import { computed, useId } from "vue";

import Icon from "../Icon/Icon.vue";

// TODO make sure helperText can only be set if label is set

type CheckboxProps = {
  /**
   * The checked state of the checkbox
   */
  modelValue?: boolean | "indeterminate";
  /**
   * The label text for the checkbox
   */
  label?: string;
  /**
   * Helper text displayed below the label
   */
  helperText?: string;
  /**
   * Whether the checkbox is disabled
   */
  disabled?: boolean;
  /**
   * Whether the checkbox is in an error state
   */
  error?: boolean;
};

type CheckboxEmits = {
  /**
   * Emitted when the checkbox value changes
   */
  "update:modelValue": [value: boolean | "indeterminate"];
};

const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: false,
  label: "",
  helperText: "",
  disabled: false,
  error: false,
});

const emit = defineEmits<CheckboxEmits>();

const id = useId();

const isChecked = computed(() => props.modelValue === true);
const isIndeterminate = computed(() => props.modelValue === "indeterminate");

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

  let newValue: boolean | "indeterminate";

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
      disabled: disabled,
      error: error,
    }"
    :disabled="disabled"
    :aria-checked="ariaChecked"
    :aria-describedby="helperText ? `${id}-helper` : undefined"
    :aria-invalid="error"
    type="button"
    role="checkbox"
    @click="handleClick"
  >
    <div class="control">
      <Icon v-if="isChecked" name="checkmark" class="icon" size="xsmall" />
      <Icon
        v-else-if="isIndeterminate"
        name="minus"
        class="icon"
        size="xsmall"
      />
    </div>
    <div v-if="label || helperText" class="content">
      <div class="label">{{ label }}</div>
      <div v-if="helperText" :id="`${id}-helper`" class="helper-text">
        {{ helperText }}
      </div>
    </div>
  </button>
</template>

<style scoped>
.checkbox {
  display: flex;
  gap: var(--kds-spacing-container-0-5x);
  align-items: flex-start;
  padding: 0;
  margin: 0;
  color: var(--kds-color-text-and-icon-selected);
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
    width: 14px;
    height: 14px;
    background: var(--kds-color-background-input-initial);
    border: var(--kds-border-action-input);
    border-radius: var(--kds-border-radius-container-0-25x);
  }

  &:hover:not(.disabled) .control {
    background: var(--kds-color-background-input-hover);
  }

  &:active:not(.disabled) .control {
    background: var(--kds-color-background-input-active);
  }

  &:focus-visible {
    outline: none;

    & .control {
      outline: var(--kds-border-action-focused);
      outline-offset: var(--kds-focus-outline-offset);
    }
  }

  &.indeterminate {
    & .control {
      background: var(--kds-color-background-neutral-initial);
      border: var(--kds-border-action-selected);
    }

    &:hover:not(.disabled) .control {
      background: var(--kds-color-background-input-hover);
    }

    &:active:not(.disabled) .control {
      background: var(--kds-color-background-input-active);
    }
  }

  &.checked {
    & .control {
      background: var(--kds-color-background-selected-initial);
      border: var(--kds-border-action-selected);
    }

    &:hover:not(.disabled) .control {
      background: var(--kds-color-background-selected-hover);
    }

    &:active:not(.disabled) .control {
      background: var(--kds-color-background-selected-active);
    }
  }

  & .content {
    display: flex;
    flex-direction: column;
    gap: var(--kds-spacing-container-0-12x);
    text-rendering: geometricprecision;

    & .label {
      padding-top: var(--kds-spacing-container-0-12x);
      font: var(--kds-font-base-interactive-small);
      color: var(--kds-color-text-and-icon-neutral);
    }

    & .helper-text {
      font: var(--kds-font-base-subtext-small);
      color: var(--kds-color-text-and-icon-muted);
    }
  }

  &.disabled {
    color: var(--kds-color-text-and-icon-disabled);
    cursor: not-allowed;

    & .control {
      border: var(--kds-border-action-disabled);
    }

    &.checked .control {
      border: var(--kds-border-action-disabled);
    }

    & .content {
      text-rendering: auto;

      & .label,
      & .helper-text {
        color: inherit;
      }
    }
  }

  &.error {
    color: var(--kds-color-text-and-icon-danger);

    & .control {
      border: var(--kds-border-action-error);
    }

    &.checked .control {
      border: var(--kds-border-action-error);
    }

    & .content .label,
    & .content .helper-text {
      color: inherit;
    }
  }
}
</style>
