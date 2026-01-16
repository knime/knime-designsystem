<script setup lang="ts">
import type { KdsValueSwitchItemProps } from "./types";

const props = withDefaults(defineProps<KdsValueSwitchItemProps>(), {
  disabled: false,
  size: "medium",
  variant: "default",
  tabIndex: undefined,
});
</script>

<template>
  <button
    role="radio"
    :aria-checked="props.selected"
    :class="{
      option: true,
      selected: props.selected,
      disabled: props.disabled,
      'variant-muted': props.variant === 'muted',
      'size-small': props.size === 'small',
    }"
    :disabled="props.disabled"
    :tabindex="props.tabIndex"
  >
    <span class="option-label">{{ props.text }}</span>
  </button>
</template>

<style scoped>
.option {
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--kds-dimension-component-height-1-5x);
  padding: 0 var(--kds-spacing-container-0-37x);
  font: var(--kds-font-base-interactive-medium-strong);
  color: var(--kds-color-text-and-icon-neutral);
  text-align: center;
  cursor: pointer;

  &.size-small {
    height: var(--kds-dimension-component-height-1-25x);
    font: var(--kds-font-base-interactive-small-strong);
  }

  /* variant=default */
  background: var(--kds-color-background-neutral-initial);
  border: var(--kds-border-action-transparent);
  border-radius: var(--kds-border-radius-container-0-37x);

  &:focus-visible {
    outline: none;
  }

  &:hover:not(:disabled) {
    background: var(--kds-color-background-neutral-hover);
  }

  &:active:not(:disabled) {
    background: var(--kds-color-background-neutral-active);
  }

  &.selected {
    color: var(--kds-color-text-and-icon-selected);
    background: var(--kds-color-background-selected-initial);
    border: var(--kds-border-action-selected);

    &:hover:not(:disabled) {
      background: var(--kds-color-background-selected-hover);
    }

    &:active:not(:disabled) {
      background: var(--kds-color-background-selected-active);
    }

    &.variant-muted {
      background: var(--kds-color-background-input-initial);

      &:hover:not(:disabled) {
        background: var(--kds-color-background-input-hover);
      }

      &:active:not(:disabled) {
        background: var(--kds-color-background-input-active);
      }
    }
  }

  &.disabled {
    color: var(--kds-color-text-and-icon-disabled);
    cursor: default;
  }
}

.option-label {
  font: inherit;
  color: currentcolor;
}
</style>
