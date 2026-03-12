<script setup lang="ts">
import { useTemplateRef } from "vue";

import KdsIcon from "../../accessories/Icon/KdsIcon.vue";
import { useKdsIsTruncated } from "../../util";

import type { KdsValueSwitchItemProps } from "./types";

const {
  disabled = false,
  size = "medium",
  variant = "default",
  tabIndex,
  text,
  title,
  leadingIcon,
  trailingIcon,
  selected,
  hideIcons,
} = defineProps<KdsValueSwitchItemProps>();

const optionTextEl = useTemplateRef("optionTextEl");
const { isTruncated } = useKdsIsTruncated(optionTextEl);
</script>

<template>
  <button
    role="radio"
    :aria-checked="selected"
    :aria-label="text ? undefined : title"
    :class="{
      option: true,
      selected: selected,
      disabled: disabled,
      'variant-muted': variant === 'muted',
      'size-small': size === 'small',
    }"
    :disabled="disabled"
    :tabindex="tabIndex"
    :title="title ?? (isTruncated && text ? text : undefined)"
  >
    <KdsIcon
      v-if="leadingIcon && (!hideIcons || !text)"
      :name="leadingIcon"
      :size="size"
    />
    <span v-if="text" ref="optionTextEl" class="option-label">
      {{ text }}
    </span>
    <KdsIcon
      v-if="trailingIcon && !hideIcons"
      :name="trailingIcon"
      :size="size"
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
  white-space: nowrap;
}
</style>
