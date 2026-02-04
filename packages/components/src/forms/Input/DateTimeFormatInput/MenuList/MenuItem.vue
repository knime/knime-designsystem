<script setup lang="ts">
import KdsIcon from "../../../../Icon/KdsIcon.vue";

import type { MenuItemEmits, MenuItemProps } from "./types.ts";

const props = withDefaults(defineProps<MenuItemProps>(), {
  selected: false,
  active: false,
});

const emit = defineEmits<MenuItemEmits>();
</script>

<template>
  <li
    :id="props.id"
    role="option"
    :aria-selected="props.selected"
    :aria-disabled="props.item.disabled"
    :class="{
      selected: props.selected,
      active: props.active,
      disabled: props.item.disabled,
    }"
    @mouseenter="emit('mouseenter')"
    @click="emit('click')"
  >
    <span class="content">
      <span class="label">{{ props.item.text }}</span>
      <span v-if="props.item.subtext" class="subtext">
        {{ props.item.subtext }}
      </span>
    </span>

    <KdsIcon
      v-if="props.selected"
      class="checkmark"
      name="checkmark"
      size="xsmall"
    />
  </li>
</template>

<style scoped>
li {
  display: flex;
  gap: var(--kds-spacing-container-0-25x);
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-5x);
  cursor: pointer;
  background: var(--kds-color-background-neutral-initial);
  border-radius: var(--kds-border-radius-container-0-31x);

  .content {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    gap: var(--kds-spacing-container-0-12x);
    align-items: flex-start;
    min-width: 0;
  }

  .label {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    font: var(--kds-font-base-interactive-small);
    color: var(--kds-color-text-and-icon-neutral);
    text-align: left;
    white-space: nowrap;
  }

  .subtext {
    display: block;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    font: var(--kds-font-base-subtext-small);
    color: var(--kds-color-text-and-icon-muted);
    text-align: left;
    white-space: nowrap;
  }

  &.active {
    background: var(--kds-color-background-neutral-hover);
  }

  &.selected {
    color: var(--kds-color-text-and-icon-selected);
    background: var(--kds-color-background-selected-initial);

    .label {
      color: var(--kds-color-text-and-icon-selected);
    }

    .subtext {
      color: var(--kds-color-text-and-icon-selected);
    }
  }

  &.selected.active {
    background: var(--kds-color-background-selected-hover);
  }

  &.disabled {
    cursor: default;
  }

  .checkmark {
    flex-shrink: 0;
  }
}
</style>
