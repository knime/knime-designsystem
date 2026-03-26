<script setup lang="ts">
import { ref, useTemplateRef } from "vue";

import KdsIcon from "../../../accessories/Icon/KdsIcon.vue";
import KdsPopover from "../../../overlays/Popover/KdsPopover.vue";

import InfoPopover from "./InfoPopover.vue";
import type { KdsInfoToggleButtonProps } from "./types";

/**
 * @slot default - Custom content for the popover. When provided, overrides the `content` prop.
 */

const { hidden = false, ...props } = defineProps<KdsInfoToggleButtonProps>();

const TITLE = "Click for more information";

const modelValue = defineModel<boolean>({ default: false });
const popoverEl = useTemplateRef("popoverEl");
const isHovered = ref(false);
const isFocused = ref(false);
</script>

<template>
  <button
    v-bind="$attrs"
    :class="{
      'info-toggle-button': true,
      selected: modelValue,
      hidden: hidden && !modelValue && !isHovered && !isFocused,
    }"
    :title="TITLE"
    :aria-label="TITLE"
    :aria-pressed="modelValue"
    :aria-expanded="modelValue"
    :aria-controls="popoverEl?.popoverId"
    aria-haspopup="dialog"
    :style="popoverEl?.anchorStyle"
    type="button"
    @click="modelValue = !modelValue"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @focus="isFocused = true"
    @blur="isFocused = false"
  >
    <KdsIcon name="circle-question" size="small" />
  </button>

  <KdsPopover
    ref="popoverEl"
    v-model="modelValue"
    placement="top-right"
    role="dialog"
    aria-label="Description"
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
  width: var(--kds-dimension-component-width-1x);
  height: var(--kds-dimension-component-height-1x);
  padding: 0;
  color: var(--icon-color);
  cursor: pointer;
  background-color: var(--bg-initial);
  border: var(--border);
  border-radius: var(--kds-border-radius-container-0-12x);
  opacity: 1;

  &.hidden {
    opacity: 0;
  }

  &:focus-visible {
    outline: var(--kds-border-action-focused);
    outline-offset: var(--kds-spacing-offset-focus);
  }

  &:hover {
    background-color: var(--bg-hover);
  }

  &:active {
    background-color: var(--bg-active);
  }

  &.selected {
    --bg-initial: var(--kds-color-background-selected-initial);
    --bg-hover: var(--kds-color-background-selected-hover);
    --bg-active: var(--kds-color-background-selected-active);
    --border: var(--kds-border-action-selected);
    --icon-color: var(--kds-color-text-and-icon-selected);
  }
}
</style>
