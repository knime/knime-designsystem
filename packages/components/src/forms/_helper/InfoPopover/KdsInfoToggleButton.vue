<script setup lang="ts">
import { ref } from "vue";

import KdsIcon from "../../../accessories/Icon/KdsIcon.vue";
import KdsPopover from "../../../overlays/Popover/KdsPopover.vue";

import InfoPopover from "./InfoPopover.vue";
import type { KdsInfoToggleButtonProps } from "./types.ts";

/**
 * @slot default - Custom content for the popover. When provided, overrides the `content` prop.
 */

const props = withDefaults(defineProps<KdsInfoToggleButtonProps>(), {
  disabled: false,
  hidden: false,
});

const TITLE = "Click for more information";

const modelValue = defineModel<boolean>({ default: false });
const buttonEl = ref<HTMLButtonElement | null>(null);
</script>

<template>
  <button
    ref="buttonEl"
    v-bind="$attrs"
    :class="{
      'info-toggle-button': true,
      selected: modelValue,
      disabled: props.disabled,
      hidden: props.hidden && !modelValue,
    }"
    :disabled="props.disabled"
    :title="TITLE"
    :aria-label="TITLE"
    :aria-pressed="modelValue"
    type="button"
    @click="modelValue = !modelValue"
  >
    <KdsIcon name="circle-question" size="xsmall" />
  </button>

  <KdsPopover
    v-model="modelValue"
    :activator-el="buttonEl"
    placement="top-right"
  >
    <InfoPopover :content="props.content">
      <slot />
    </InfoPopover>
  </KdsPopover>
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
  padding: 0;
  color: var(--icon-color);
  cursor: pointer;
  background-color: var(--bg-initial);
  border: var(--border);
  border-radius: var(--kds-border-radius-container-0-12x);
  opacity: 1;

  &.hidden:not(:focus, :focus-visible, :hover, .disabled) {
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
