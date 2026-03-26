<script setup lang="ts">
import { useTemplateRef } from "vue";

import { KdsIcon } from "../../../../accessories";
import { useKdsIsTruncated } from "../../../../util";

import type { KdsListItemButtonProps } from "./types.ts";

const { disabled = false, ...props } = defineProps<KdsListItemButtonProps>();

const emit = defineEmits<{
  /**
   * Emitted when the button item is clicked.
   */
  click: [event: MouseEvent];
}>();

const labelEl = useTemplateRef("labelEl");
const { isTruncated: isLabelTruncated } = useKdsIsTruncated(labelEl);
</script>

<template>
  <button
    type="button"
    :disabled="disabled"
    class="kds-list-item-button"
    @click="emit('click', $event)"
  >
    <KdsIcon :name="props.leadingIcon" size="small" :disabled="disabled" />

    <span
      ref="labelEl"
      class="label"
      :title="isLabelTruncated ? props.label : undefined"
    >
      {{ props.label }}
    </span>
  </button>
</template>

<style scoped>
.kds-list-item-button {
  position: relative;
  display: flex;
  gap: var(--kds-spacing-container-0-25x);
  align-items: center;
  width: 100%;
  min-width: var(--kds-dimension-component-width-12x);
  padding: var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-5x);
  font: var(--kds-font-base-interactive-small);
  color: var(--kds-color-text-and-icon-neutral);
  text-align: left;
  cursor: pointer;
  user-select: none;
  background: var(--kds-color-background-neutral-initial);
  border: none;
  border-radius: var(--kds-border-radius-container-0-31x);

  .label {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:disabled {
    color: var(--kds-color-text-and-icon-disabled);
    pointer-events: none;
    cursor: default;
  }

  &:focus-visible:not(:disabled) {
    outline: var(--kds-border-action-focused);
    outline-offset: var(--kds-spacing-offset-focus);
  }

  &:hover:not(:disabled) {
    background: var(--kds-color-background-neutral-hover);
  }

  &:active:not(:disabled) {
    background: var(--kds-color-background-neutral-active);
  }
}
</style>
