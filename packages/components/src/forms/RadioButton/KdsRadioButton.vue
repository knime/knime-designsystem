<script lang="ts" setup>
import { useId } from "vue";

import type { KdsRadioButtonProps } from "./types.ts";

const props = withDefaults(defineProps<KdsRadioButtonProps>(), {
  disabled: false,
  error: false,
});

const modelValue = defineModel<boolean>({ default: false });

const id = useId();

const handleClick = () => {
  if (props.disabled) {
    return;
  }
  // Radio buttons do not toggle off when clicked; they only set to selected
  if (!modelValue.value) {
    modelValue.value = true;
  }
};
</script>

<template>
  <button
    :aria-checked="modelValue"
    :aria-describedby="props.helperText ? `${id}-helper` : undefined"
    :aria-invalid="props.error"
    :class="{
      radio: true,
      selected: modelValue,
      disabled: props.disabled,
      error: props.error,
    }"
    :disabled="props.disabled"
    role="radio"
    type="button"
    @click="handleClick"
  >
    <div class="control">
      <svg
        v-if="modelValue"
        class="dot"
        viewBox="0 0 2 2"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="1" cy="1" r="1" />
      </svg>
    </div>
    <div class="content">
      <div class="label">{{ props.text }}</div>
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
  --text-color: var(--kds-color-text-and-icon-neutral);
  --helper-text-color: var(--kds-color-text-and-icon-muted);

  display: flex;
  gap: var(--kds-spacing-container-0-37x);
  align-items: flex-start;
  padding: 0;
  margin: 0;
  text-align: left;
  cursor: pointer;
  outline: none;
  background: none;
  border: none;

  .control {
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

  .control .dot {
    display: block;
    flex-shrink: 0;
    width: 100%;
    height: 100%;
  }

  .control .dot circle {
    fill: var(--dot-color);
    transform: scale(0.5);
    transform-origin: center;
    transform-box: fill-box;
  }

  &:focus-visible .control {
    outline: var(--kds-border-action-focused);
    outline-offset: var(--kds-spacing-offset-focus);
    background: var(--bg-hover);
  }

  &:hover:not(.disabled) .control {
    background: var(--bg-hover);
  }

  &:active:not(.disabled) .control {
    background: var(--bg-active);
  }

  &.selected {
    --border: var(--kds-border-action-selected);
    --bg-initial: var(--kds-color-background-selected-initial);
    --bg-hover: var(--kds-color-background-selected-hover);
    --bg-active: var(--kds-color-background-selected-active);
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: var(--kds-spacing-container-0-25x);

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
    --bg-initial: var(--kds-color-background-input-initial);
    --border: var(--kds-border-action-disabled);
    --dot-color: var(--kds-color-text-and-icon-disabled);
    --text-color: var(--kds-color-text-and-icon-disabled);
    --helper-text-color: var(--kds-color-text-and-icon-disabled);

    cursor: default;
  }

  &.error {
    --bg-hover: var(--kds-color-background-danger-hover);
    --bg-active: var(--kds-color-background-danger-active);
    --border: var(--kds-border-action-error);
    --dot-color: var(--kds-color-text-and-icon-danger);
    --text-color: var(--kds-color-text-and-icon-danger);

    &.selected {
      --bg-initial: var(--kds-color-background-danger-initial);
      --border: var(--kds-border-action-error);
    }
  }
}
</style>
