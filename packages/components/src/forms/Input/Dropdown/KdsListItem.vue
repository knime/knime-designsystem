<script setup lang="ts">
import KdsDataType from "../../../Icon/KdsDataType.vue";

import type { KdsListItemEmits, KdsListItemProps } from "./types";

const props = withDefaults(defineProps<KdsListItemProps>(), {
  disabled: false,
  missing: false,
  dataTypeIconName: undefined,
});

const emit = defineEmits<KdsListItemEmits>();
</script>

<template>
  <li
    :id="props.id"
    role="option"
    :aria-selected="props.selected"
    :aria-disabled="props.disabled"
    :class="{
      'list-item': true,
      active: props.active,
      selected: props.selected,
      disabled: props.disabled,
      missing: props.missing,
    }"
    @mouseenter="emit('mouseenter')"
    @click="emit('click')"
  >
    <div class="content">
      <KdsDataType
        v-if="props.dataTypeIconName"
        size="small"
        :icon-name="props.dataTypeIconName"
      />

      <span v-if="props.missing" class="missing-label">(Missing)</span>
      <span class="label">{{ props.label }}</span>
    </div>

    <div v-if="$slots.trailing" class="trailing">
      <slot name="trailing" />
    </div>
  </li>
</template>

<style scoped>
.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: var(--kds-dimension-component-height-1-5x);
  padding-right: var(--kds-spacing-container-0-25x);
  padding-left: var(--kds-spacing-container-0-5x);
  cursor: pointer;
  background: var(--kds-color-background-neutral-initial);
  border-radius: var(--kds-border-radius-container-0-25x);

  &:hover:not(.disabled) {
    background: var(--kds-color-background-neutral-hover);
  }

  &.active:not(.disabled) {
    background: var(--kds-color-background-neutral-hover);
  }

  &.disabled {
    cursor: default;
    opacity: 0.6;
  }

  &.missing {
    background: var(--kds-color-background-danger-initial);
  }
}

.content {
  display: flex;
  gap: var(--kds-spacing-container-0-25x);
  align-items: center;
  min-width: 0;
  padding: var(--kds-spacing-container-0-25x) 0;
  font: var(--kds-font-base-interactive-small);
  color: var(--kds-color-text-and-icon-neutral);

  & .label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & .missing-label {
    flex-shrink: 0;
    color: var(--kds-color-text-and-icon-danger);
  }

  .list-item.missing & {
    color: var(--kds-color-text-and-icon-danger);
  }
}

.trailing {
  display: flex;
  flex-shrink: 0;
  align-items: center;
}
</style>
