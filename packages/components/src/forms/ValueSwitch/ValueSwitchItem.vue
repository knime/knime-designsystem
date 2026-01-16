<script setup lang="ts">
import type { KdsValueSwitchSize } from "./types";

type ValueSwitchItemVariant = "default" | "muted";

type ValueSwitchItemProps = {
  /** Visual label */
  text: string;
  /** Marks the item as selected */
  selected: boolean;
  /** Disables the item */
  disabled?: boolean;
  /** Size must match the surrounding switch */
  size?: KdsValueSwitchSize;
  /** Variant of the switch item */
  variant?: ValueSwitchItemVariant;
  /** Calculated tabIndex for roving focus */
  tabIndex?: number;
};

const props = withDefaults(defineProps<ValueSwitchItemProps>(), {
  disabled: false,
  size: "medium",
  variant: "default",
  tabIndex: undefined,
});
</script>

<template>
  <button
    :aria-checked="props.selected"
    :class="{
      option: true,
      selected: props.selected,
      disabled: props.disabled,
      'variant-muted': props.variant === 'muted',
    }"
    :disabled="props.disabled"
    :tabindex="props.tabIndex"
    role="radio"
    type="button"
  >
    <span class="option-label">{{ props.text }}</span>
  </button>
</template>

<style scoped>
.option {
  display: flex;
  align-items: center;
  justify-content: center;

  /* Fallbacks so Stylelint recognizes the custom properties */
  height: var(
    --kds-value-switch-height,
    var(--kds-dimension-component-height-1-5x)
  );
  padding: 0;
  padding-right: var(
    --kds-value-switch-padding-x,
    var(--kds-spacing-container-0-37x)
  );
  padding-left: var(
    --kds-value-switch-padding-x,
    var(--kds-spacing-container-0-37x)
  );
  font: var(
    --kds-value-switch-font,
    var(--kds-font-base-interactive-medium-strong)
  );
  color: var(--kds-color-text-and-icon-neutral);
  text-align: center;
  cursor: pointer;

  /* variant=default */
  background: var(--kds-color-background-neutral-initial);
  border: var(--kds-border-action-transparent);
  border-radius: var(--kds-border-radius-container-0-25x);

  &:focus-visible {
    outline: none;
  }

  &:hover:not(:disabled) {
    background: var(--kds-color-background-neutral-hover);
  }

  &:active:not(:disabled) {
    background: var(--kds-color-background-neutral-active);
  }

  &.variant-muted {
    background: var(--kds-color-surface-muted);

    &:hover:not(:disabled) {
      background: var(--kds-color-background-neutral-hover);
    }

    &:active:not(:disabled) {
      background: var(--kds-color-background-neutral-active);
    }
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
