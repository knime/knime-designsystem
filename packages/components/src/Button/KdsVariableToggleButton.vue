<script setup lang="ts">
import { computed } from "vue";

import KdsIcon from "../Icon/KdsIcon.vue";

import type { KdsVariableToggleButtonProps } from "./types";

const props = withDefaults(defineProps<KdsVariableToggleButtonProps>(), {
  disabled: false,
  inSet: false,
  outSet: false,
  error: false,
  pressed: false,
});

const iconState = computed(() => {
  if (props.inSet && props.outSet) {
    return "in-out" as const;
  }

  if (props.inSet) {
    return "in" as const;
  }

  if (props.outSet) {
    return "out" as const;
  }

  return "none" as const;
});

const iconName = computed(() => {
  switch (iconState.value) {
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

const baseTitleByState: Record<typeof iconState.value, string> = {
  in: "Input Flow Variable",
  out: "Output Flow Variable",
  "in-out": "Input and Output Flow Variable",
  none: "No Flow Variable set",
};

const errorTitleByState: Partial<Record<typeof iconState.value, string>> = {
  in: "Error in input Flow Variable",
  out: "Error in output Flow Variable",
  "in-out": "Error in Flow Variables",
};

const title = computed(() => {
  const baseTitle = baseTitleByState[iconState.value];
  if (!props.error) {
    return baseTitle;
  }
  return errorTitleByState[iconState.value] ?? baseTitle;
});
</script>

<template>
  <button
    :class="{
      'variable-toggle-button': true,
      disabled: props.disabled,
      error: props.error,
      'pressed-or-set': props.pressed || props.inSet || props.outSet,
    }"
    :disabled="props.disabled"
    :title="title"
    :aria-label="title"
    :aria-pressed="props.pressed"
    type="button"
  >
    <div class="container">
      <KdsIcon :name="iconName" size="xsmall" />
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

  &.pressed-or-set {
    --bg-initial: var(--kds-color-background-selected-initial);
    --bg-hover: var(--kds-color-background-selected-hover);
    --bg-active: var(--kds-color-background-selected-active);
    --border: var(--kds-border-action-selected);
    --icon-color: var(--kds-color-text-and-icon-success);
  }

  &.error {
    --bg-initial: var(--kds-color-background-danger-initial);
    --bg-hover: var(--kds-color-background-danger-hover);
    --bg-active: var(--kds-color-background-danger-active);
    --border: var(--kds-border-action-error);
    --icon-color: var(--kds-color-text-and-icon-danger);
  }

  &.disabled {
    --icon-color: var(--kds-color-text-and-icon-disabled);

    cursor: default;

    &.pressed-or-set {
      --border: var(--kds-border-action-disabled);
    }
  }
}
</style>
