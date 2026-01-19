<script setup lang="ts">
import { computed } from "vue";

import KdsIcon from "../Icon/KdsIcon.vue";

import type { KdsVariableToggleButtonProps } from "./types";

const props = withDefaults(defineProps<KdsVariableToggleButtonProps>(), {
  disabled: false,
  icon: "none",
  error: false,
});

const iconName = computed(() => {
  switch (props.icon) {
    case "in":
      return "flow-variable-in";
    case "out":
      return "flow-variable-out";
    case "in-out":
      return "flow-variable-in-out";
    case "none":
    default:
      return "flow-variable-default";
  }
});

const title = computed(() => {
  const base = (() => {
    switch (props.icon) {
      case "in":
        return "Input flow variable";
      case "out":
        return "Output flow variable";
      case "in-out":
        return "Input & Output Flow Variable";
      case "none":
      default:
        return "No flow variable set";
    }
  })();

  if (props.icon === "none" || !props.error) {
    return base;
  }

  return `Error in ${base.toLowerCase()}`;
});
</script>

<template>
  <button
    :class="{
      'variable-toggle-button': true,
      disabled: props.disabled,
      error: props.error && props.icon !== 'none',
    }"
    :disabled="props.disabled"
    :title="title"
    :aria-label="title"
    type="button"
  >
    <div class="container">
      <KdsIcon :name="iconName" size="small" />
    </div>
  </button>
</template>

<style scoped>
.variable-toggle-button {
  --bg-initial: var(--kds-color-background-neutral-initial);
  --bg-hover: var(--kds-color-background-neutral-hover);
  --bg-active: var(--kds-color-background-neutral-active);
  --border: var(--kds-border-action-transparent);
  --icon-color: var(--kds-color-text-and-icon-neutral);

  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;
  background: none;
  border: none;

  & .container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--kds-dimension-component-width-0-75x);
    height: var(--kds-dimension-component-height-0-75x);
    padding: 0;
    color: var(--icon-color);
    background-color: var(--bg-initial);
    border: var(--border);
    border-radius: var(--kds-border-radius-container-0-12x);
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

  &.disabled {
    --icon-color: var(--kds-color-text-and-icon-disabled);

    cursor: default;
  }

  &.error:not(.disabled) {
    --border: var(--kds-border-action-error);
    --icon-color: var(--kds-color-text-and-icon-danger);
  }

  &.error.disabled {
    --border: var(--kds-border-action-disabled);
  }
}
</style>
