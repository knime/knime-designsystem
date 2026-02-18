<script setup lang="ts">
import { computed } from "vue";

import type { KdsCardProps } from "./types";

const {
  variant = "filled",
  selectable = false,
  disabled = false,
  ariaLabel,
  ariaLabelledby,
} = defineProps<KdsCardProps>();

/**
 * Controls the selected state of the card when `selectable` is true.
 * When `selectable` is false, this model is ignored.
 */
const modelValue = defineModel<boolean>({ default: false });

const emit = defineEmits<{
  /**
   * Fired when the card is clicked.
   *
   * This event is only emitted when `selectable` is false.
   * Clicks while `selectable` is true toggle the card.
   */
  click: [event: MouseEvent | KeyboardEvent];
}>();

const selected = computed(() => modelValue.value && selectable);

const handleClick = (event: MouseEvent | KeyboardEvent) => {
  if (disabled) {
    return;
  }

  if (selectable) {
    modelValue.value = !modelValue.value;
  } else {
    emit("click", event);
  }
};
</script>

<template>
  <div
    class="kds-card"
    :class="[
      `variant-${variant}`,
      { selected: selected },
      { disabled: disabled },
    ]"
    role="button"
    :aria-label="ariaLabel"
    :aria-labelledby="ariaLabelledby"
    :aria-disabled="disabled"
    :aria-pressed="selectable ? modelValue : undefined"
    :tabindex="disabled ? -1 : 0"
    @click="handleClick"
    @keydown.enter.prevent="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <slot />
  </div>
</template>

<style scoped>
.kds-card {
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  outline: none;
  border-style: solid;
  border-radius: var(--kds-border-radius-container-0-50x);
  transition:
    background-color 0.2s,
    border-color 0.2s,
    box-shadow 0.2s;

  &:focus-visible {
    outline: var(--kds-border-action-focused);
    outline-offset: var(--kds-spacing-offset-focus);
    border-radius: var(--kds-border-radius-container-0-56x);
  }

  &.disabled {
    cursor: default;
  }
}

/* Variant: Filled, Value: False */
.variant-filled {
  background: var(--kds-color-surface-default);
  border: var(--kds-border-base-subtle);

  &:hover:not(.disabled) {
    box-shadow: var(--kds-elevation-level-3);
  }

  &:active:not(.disabled) {
    background: var(--kds-color-background-neutral-active);
    box-shadow: var(--kds-elevation-level-1);
  }
}

/* Variant: Outlined, Value: False */
.variant-outlined {
  background: var(--kds-color-background-neutral-initial);
  border: var(--kds-border-base-muted);

  &:hover:not(.disabled) {
    box-shadow: var(--kds-elevation-level-3);
  }

  &:active:not(.disabled) {
    background: var(--kds-color-background-neutral-active);
    box-shadow: var(--kds-elevation-level-1);
  }
}

/* Variant: Transparent, Value: False */
.variant-transparent {
  background: var(--kds-color-background-neutral-initial);
  border: var(--kds-border-action-transparent);

  &:hover:not(.disabled) {
    background: var(--kds-color-background-neutral-hover);
    box-shadow: var(--kds-elevation-level-3);
  }

  &:active:not(.disabled) {
    background: var(--kds-color-background-neutral-active);
    box-shadow: var(--kds-elevation-level-1);
  }
}

/* Variant: Filled, Value: True */
.variant-filled.selected {
  background: var(--kds-color-background-selected-initial);
  border: var(--kds-border-action-selected);

  &:hover:not(.disabled) {
    box-shadow: var(--kds-elevation-level-3);
  }

  &:active:not(.disabled) {
    background: var(--kds-color-background-selected-active);
    box-shadow: var(--kds-elevation-level-1);
  }
}

/* Variant: Outlined, Value: True */
.variant-outlined.selected {
  background: var(--kds-color-background-selected-initial);
  border: var(--kds-border-action-selected);

  &:hover:not(.disabled) {
    box-shadow: var(--kds-elevation-level-3);
  }

  &:active:not(.disabled) {
    background: var(--kds-color-background-selected-active);
    box-shadow: var(--kds-elevation-level-1);
  }
}

/* Variant: Transparent, Value: True */
.variant-transparent.selected {
  background: var(--kds-color-background-selected-initial);
  border: var(--kds-border-action-selected);

  &:hover:not(.disabled) {
    background: var(--kds-color-background-selected-initial);
    box-shadow: var(--kds-elevation-level-3);
  }

  &:active:not(.disabled) {
    background: var(--kds-color-background-selected-active);
    box-shadow: var(--kds-elevation-level-1);
  }
}
</style>
