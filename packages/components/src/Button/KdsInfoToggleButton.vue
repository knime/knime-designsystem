<script setup lang="ts">
import KdsIcon from "../Icon/KdsIcon.vue";

import type { KdsInfoToggleButtonProps } from "./types";

const props = withDefaults(defineProps<KdsInfoToggleButtonProps>(), {
  disabled: false,
  visible: false,
});

const title = "Click for more information";

const modelValue = defineModel<boolean>({ default: false });
</script>

<template>
  <button
    :class="{
      'info-toggle-button': true,
      selected: modelValue,
      disabled: props.disabled,
      hidden: !props.visible && !modelValue,
    }"
    :disabled="props.disabled"
    :title="title"
    :aria-label="title"
    :aria-pressed="modelValue"
    type="button"
    @click="modelValue = !modelValue"
    @blur="modelValue = false"
  >
    <KdsIcon name="circle-question" size="xsmall" />
  </button>
</template>

<style scoped>
.info-toggle-button {
  --bg-initial: transparent;
  --bg-hover: var(--kds-color-background-neutral-hover);
  --bg-active: var(--kds-color-background-neutral-active);
  --border: var(--kds-border-action-transparent);
  --icon-color: var(--kds-color-text-and-icon-neutral);

  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: var(--kds-dimension-component-width-0-75x);
  height: var(--kds-dimension-component-height-0-75x);
  padding: calc(
    var(--kds-spacing-container-0-25x) - var(--kds-core-border-width-xs)
  );
  color: var(--icon-color);
  pointer-events: auto;
  cursor: pointer;
  background-color: var(--bg-initial);
  border: none;
  border: var(--border);
  border-radius: var(--kds-border-radius-container-0-12x);
  opacity: 1;

  &.hidden:not(:focus-visible, :hover, .disabled) {
    opacity: 0;
  }

  &:focus-visible {
    outline: none;

    & .container {
      outline: var(--kds-border-action-focused);
      outline-offset: var(--kds-spacing-offset-focus);
    }
  }

  &:hover:not(.disabled) .container {
    background-color: var(--bg-hover);
  }

  &:active:not(.disabled) .container {
    background-color: var(--bg-active);
  }

  &.selected {
    --bg-initial: var(--kds-color-background-selected-initial);
    --bg-hover: var(--kds-color-background-selected-hover);
    --bg-active: var(--kds-color-background-selected-active);
    --border: var(--kds-border-action-selected);
    --icon-color: var(--kds-color-text-and-icon-selected);
  }

  &.disabled {
    --icon-color: var(--kds-color-text-and-icon-disabled);

    cursor: default;
  }

  &.selected.disabled {
    --border: var(--kds-border-action-disabled);
  }
}
</style>
