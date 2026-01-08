<script setup lang="ts">
import { computed, useId } from "vue";

import type { KdsRadioButtonProps } from "./types";

const props = withDefaults(defineProps<KdsRadioButtonProps>(), {
  modelValue: false,
  disabled: false,
  error: false,
});

const emit = defineEmits<{
  /**
   * Emitted when the radio selection changes
   */
  "update:modelValue": [value: boolean];
}>();

const id = useId();

const isSelected = computed(() => props.modelValue);

const ariaChecked = computed(() => isSelected.value);

const handleClick = () => {
  if (props.disabled) {
    return;
  }
  // Radio buttons do not toggle off when clicked; they only set to selected
  if (!isSelected.value) {
    emit("update:modelValue", true);
  }
};
</script>

<template>
  <button
    :class="{
      radio: true,
      selected: isSelected,
      disabled: props.disabled,
      error: props.error,
    }"
    :disabled="props.disabled"
    :aria-checked="ariaChecked"
    :aria-describedby="props.helperText ? `${id}-helper` : undefined"
    :aria-invalid="props.error"
    :title="props.title"
    type="button"
    role="radio"
    @click="handleClick"
  >
    <div class="control" />
    <div class="content">
      <div class="label">{{ props.label }}</div>
      <div v-if="props.helperText" :id="`${id}-helper`" class="helper-text">
        {{ props.helperText }}
      </div>
    </div>
  </button>
</template>

<style scoped>
.radio {
  --bg-initial: var(--kds-color-background-input-initial);
  --bg-hover: var(--kds-color-background-input-hover);
  --bg-active: var(--kds-color-background-input-active);
  --border: var(--kds-border-action-input);
  --dot-color: var(--kds-color-text-and-icon-selected);
  --dot-size: round(calc(var(--kds-dimension-component-height-0-88x) / 2), 2px);
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
    background: var(--bg-initial);
    border: var(--border);
    border-radius: 50%;
  }

  & .control::after {
    display: block;
    width: var(--dot-size);
    height: var(--dot-size);
    content: "";
    background: var(--dot-color);
    border-radius: 50%;
    opacity: 0;
  }

  &:focus-visible {
    outline: none;

    & .control {
      outline: var(--kds-border-action-focused);
      outline-offset: var(--kds-spacing-offset-focus);
    }
  }

  &:hover:not(.disabled) .control {
    background: var(--bg-hover);
  }

  &:active:not(.disabled) .control {
    background: var(--bg-active);
  }

  &.selected {
    /* Radios keep neutral background; emphasize selected via dot + border */
    --border: var(--kds-border-action-selected);

    & .control::after {
      opacity: 1;
    }
  }

  & .content {
    display: flex;
    flex-direction: column;
    gap: var(--kds-spacing-container-0-12x);

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
    --dot-color: var(--kds-color-text-and-icon-disabled);
    --text-color: var(--kds-color-text-and-icon-disabled);
    --helper-text-color: var(--kds-color-text-and-icon-disabled);

    cursor: not-allowed;
  }

  &.error {
    --border: var(--kds-border-action-error);
    --dot-color: var(--kds-color-text-and-icon-danger);
    --text-color: var(--kds-color-text-and-icon-danger);
    --helper-text-color: var(--kds-color-text-and-icon-danger);
    --bg-hover: var(--kds-color-background-danger-hover);
    --bg-active: var(--kds-color-background-danger-active);

    &.selected {
      --bg-initial: var(--kds-color-background-danger-initial);
    }
  }
}
</style>
