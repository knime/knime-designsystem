<script setup lang="ts">
import KdsIcon from "../../Icon/KdsIcon.vue";

import type { KdsValueSwitchItemProps } from "./types.ts";

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
    :aria-label="props.text ? undefined : props.title"
    :class="{
      option: true,
      selected: props.selected,
      disabled: props.disabled,
      'variant-muted': props.variant === 'muted',
      'size-small': props.size === 'small',
    }"
    :disabled="props.disabled"
    :tabindex="props.tabIndex"
    :title="props.title"
  >
    <KdsIcon
      v-if="props.leadingIcon"
      :name="props.leadingIcon"
      :size="props.size"
    />
    <span v-if="props.text" class="option-label">
      {{ props.text }}
    </span>
    <KdsIcon
      v-if="props.trailingIcon"
      :name="props.trailingIcon"
      :size="props.size"
    />
  </button>
</template>

<style scoped>
.option {
  display: flex;
  flex: 0 1 auto;
  gap: var(--kds-spacing-container-0-25x);
  align-items: center;
  justify-content: center;
  min-width: calc(
    var(--kds-dimension-icon-1x) + (2 * var(--kds-spacing-container-0-37x))
  );
  max-width: 100%;
  height: var(--kds-dimension-component-height-1-5x);
  padding: 0 var(--kds-spacing-container-0-37x);
  font: var(--kds-font-base-interactive-medium-strong);
  color: var(--kds-color-text-and-icon-neutral);
  text-align: center;
  cursor: pointer;

  /* variant=default */
  background: var(--kds-color-background-neutral-initial);
  border: var(--kds-border-action-transparent);
  border-radius: var(--kds-border-radius-container-0-25x);

  &.size-small {
    height: var(--kds-dimension-component-height-1-25x);
    font: var(--kds-font-base-interactive-small-strong);
  }

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
      color: var(--kds-color-text-and-icon-neutral);
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

  &.disabled.selected {
    color: var(--kds-color-text-and-icon-disabled);
    border: var(--kds-border-action-disabled);
  }
}

.option-label {
  min-width: 0;
  padding: 0 var(--kds-spacing-container-0-12x);
  overflow: hidden;
  text-overflow: ellipsis;
  font: inherit;
  color: currentcolor;
  white-space: nowrap;
}
</style>
