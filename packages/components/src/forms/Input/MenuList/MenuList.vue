<script setup lang="ts">
import { computed } from "vue";

import KdsIcon from "../../../Icon/KdsIcon.vue";

import type { MenuListItem, MenuListProps } from "./types";

const props = withDefaults(defineProps<MenuListProps>(), {
  emptyText: "No entries in this list",
  ariaLabel: undefined,
  ariaLabelledby: undefined,
  id: undefined,
});

const modelValue = defineModel<string | undefined>();

const isEmpty = computed(() => props.items.length === 0);

const isSelected = (item: MenuListItem) => modelValue.value === item.id;

const handleSelect = (item: MenuListItem) => {
  if (item.disabled) {
    return;
  }
  modelValue.value = item.id;
};
</script>

<template>
  <div :class="{ 'menu-list-wrapper': true, empty: isEmpty }">
    <ul
      v-if="!isEmpty"
      :id="props.id"
      class="menu-list"
      role="listbox"
      :aria-label="props.ariaLabel"
      :aria-labelledby="props.ariaLabelledby"
      @click.stop
    >
      <li v-for="item in props.items" :key="item.id" class="item">
        <button
          type="button"
          data-menu-item="true"
          :class="{
            'item-button': true,
            selected: isSelected(item),
            disabled: item.disabled,
          }"
          role="option"
          :aria-selected="isSelected(item)"
          :disabled="item.disabled"
          @click="handleSelect(item)"
        >
          <span class="content">
            <span class="label">{{ item.text }}</span>
            <span v-if="item.subtext" class="subtext">{{ item.subtext }}</span>
          </span>

          <KdsIcon v-if="isSelected(item)" name="checkmark" size="xsmall" />
        </button>
      </li>
    </ul>

    <div v-else class="empty-state" aria-disabled="true">
      {{ props.emptyText }}
    </div>
  </div>
</template>

<style scoped>
.menu-list-wrapper {
  overflow: hidden;
  border: var(--kds-border-base-subtle);
  border-radius: var(--kds-border-radius-container-0-31x);

  &.empty {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(var(--kds-dimension-component-height-1-5x) * 4);
  }
}

.menu-list {
  display: flex;
  flex-direction: column;
  gap: var(--kds-spacing-container-0-10x);
  max-height: calc(var(--kds-dimension-component-height-1-5x) * 8);
  padding: var(--kds-spacing-container-0-25x);
  margin: 0;
  overflow: auto;
  overscroll-behavior: contain;
  list-style: none;
}

.item {
  min-height: var(--kds-dimension-component-height-1-5x);
}

.item-button {
  display: flex;
  gap: var(--kds-spacing-container-0-25x);
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: var(--kds-dimension-component-height-1-5x);
  padding: var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-5x);
  color: var(--kds-color-text-and-icon-neutral);
  cursor: pointer;
  background: var(--kds-color-background-neutral-initial);
  border: none;
  border-radius: var(--kds-border-radius-container-0-31x);

  &:hover {
    background: var(--kds-color-background-neutral-hover);
  }

  &:focus-visible {
    outline: var(--kds-border-action-focused);
    outline-offset: var(--kds-spacing-offset-focus);
  }

  &.selected {
    color: var(--kds-color-text-and-icon-selected);
    background: var(--kds-color-background-selected-initial);

    &:hover {
      background: var(--kds-color-background-selected-hover);
    }
  }

  &.disabled {
    cursor: default;
  }
}

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

  .item-button.selected & {
    color: var(--kds-color-text-and-icon-selected);
  }
}

.subtext {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  font: var(--kds-font-base-subtext-small);
  color: var(--kds-color-text-and-icon-muted);
  text-align: left;
  white-space: nowrap;

  .item-button.selected & {
    color: var(--kds-color-text-and-icon-selected);
  }
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: var(--kds-spacing-container-0-75x) var(--kds-spacing-container-0-25x);
  font: var(--kds-font-base-interactive-small);
  color: var(--kds-color-text-and-icon-muted);
}
</style>
