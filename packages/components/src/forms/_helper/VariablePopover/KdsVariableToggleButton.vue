<script setup lang="ts">
import { computed, useTemplateRef } from "vue";

import KdsIcon from "../../../accessories/Icon/KdsIcon.vue";
import KdsPopover from "../../../overlays/Popover/KdsPopover.vue";

import VariablePopover from "./VariablePopover.vue";
import type { KdsVariableToggleButtonProps } from "./types.ts";

/**
 * @slot default - Custom content for the popover. When provided, overrides the `content` prop.
 */

const props = withDefaults(defineProps<KdsVariableToggleButtonProps>(), {
  disabled: false,
  inSet: false,
  outSet: false,
  error: false,
  hidden: false,
});

const modelValue = defineModel<boolean>({ default: false });
const buttonEl = useTemplateRef("buttonEl");

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
    ref="buttonEl"
    v-bind="$attrs"
    :class="{
      'variable-toggle-button': true,
      disabled: props.disabled,
      error: props.error,
      'pressed-or-set': modelValue || props.inSet || props.outSet,
      hidden: props.hidden && !modelValue,
    }"
    :disabled="props.disabled"
    :title="title"
    :aria-label="title"
    :aria-pressed="modelValue"
    type="button"
    @click="modelValue = !modelValue"
  >
    <KdsIcon :name="iconName" size="xsmall" />
  </button>

  <KdsPopover
    v-model="modelValue"
    :activator-el="buttonEl"
    placement="bottom-right"
  >
    <VariablePopover>
      <slot>
        {{ props.content }}
      </slot>
    </VariablePopover>
  </KdsPopover>
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
  width: var(--kds-dimension-component-width-0-75x);
  height: var(--kds-dimension-component-height-0-75x);
  padding: 0;
  color: var(--icon-color);
  cursor: pointer;
  background-color: var(--bg-initial);
  border: var(--border);
  border-radius: var(--kds-border-radius-container-0-12x);
  opacity: 1;

  &.hidden:not(:focus-visible, :hover, .disabled) {
    opacity: 0;
  }

  &:focus-visible {
    outline: var(--kds-border-action-focused);
    outline-offset: var(--kds-spacing-offset-focus);
  }

  &:hover:not(.disabled) {
    background-color: var(--bg-hover);
  }

  &:active:not(.disabled) {
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
