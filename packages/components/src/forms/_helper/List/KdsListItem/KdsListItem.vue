<script setup lang="ts">
import { computed, useTemplateRef } from "vue";

import KdsIcon from "../../../../accessories/Icon/KdsIcon.vue";
import { useKdsIsTruncated } from "../../../../util";
import ListItemAccessory from "../ListItemAccessory/ListItemAccessory.vue";

import type { KdsListItemProps } from "./types.ts";

const props = withDefaults(defineProps<KdsListItemProps>(), {
  accessory: undefined,
  subText: undefined,
  special: false,
  selected: false,
  active: false,
  missing: false,
  disabled: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const isMultiline = computed(() => props.subText !== undefined);

const onClick = (event: MouseEvent) => {
  if (props.disabled) {
    event.stopPropagation();
    event.preventDefault();
    return;
  }
  emit("click", event);
};

const labelEl = useTemplateRef("labelEl");
const { isTruncated: isLabelTruncated } = useKdsIsTruncated(labelEl);

const subtitleEl = useTemplateRef("subtitleEl");
const { isTruncated: isSubtitleTruncated } = useKdsIsTruncated(subtitleEl);
</script>

<template>
  <li
    :id="props.id"
    role="option"
    :aria-selected="props.selected"
    :aria-disabled="props.disabled"
    :class="[
      'kds-list-item',
      isMultiline ? 'large' : 'small',
      {
        selected: props.selected,
        active: props.active,
        missing: props.missing,
        disabled: props.disabled,
      },
    ]"
    @click="onClick"
  >
    <div
      :class="
        isMultiline ? 'kds-list-item-multiline' : 'kds-list-item-singleline'
      "
    >
      <ListItemAccessory
        v-if="props.accessory"
        :accessory="props.accessory"
        size="small"
      />

      <!-- Singleline layout -->
      <template v-if="!isMultiline">
        <span v-if="props.missing" class="kds-list-item-missing-prefix">
          (Missing)
        </span>
        <span
          ref="labelEl"
          :class="{ 'kds-list-item-label': true, special: props.special }"
          :title="isLabelTruncated ? props.label : undefined"
        >
          {{ props.label }}
        </span>
      </template>

      <!-- Multiline layout -->
      <span v-else class="kds-list-item-content">
        <span
          ref="labelEl"
          class="kds-list-item-title"
          :title="isLabelTruncated ? props.label : undefined"
        >
          <span v-if="props.missing" class="kds-list-item-missing-prefix">
            (Missing)
          </span>
          <span>
            {{ props.label }}
          </span>
        </span>
        <span
          ref="subtitleEl"
          class="kds-list-item-subtitle"
          :title="isSubtitleTruncated ? props.subText : undefined"
        >
          {{ props.subText }}
        </span>
      </span>

      <KdsIcon
        v-if="props.selected && !props.missing"
        name="checkmark"
        size="small"
      />
      <KdsIcon
        v-else-if="props.missing && !props.disabled"
        name="trash"
        size="small"
      />
    </div>
  </li>
</template>

<style scoped>
.kds-list-item {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  color: var(--kds-color-text-and-icon-neutral);
  cursor: pointer;
  list-style: none;
  background: var(--kds-color-background-neutral-initial);
  border: none;

  &.small {
    border-radius: var(--kds-border-radius-container-0-25x);
  }

  &.large {
    border-radius: var(--kds-border-radius-container-0-31x);
  }

  &.disabled {
    color: var(--kds-color-text-and-icon-disabled);
    cursor: default;
  }

  &:not(.disabled):hover {
    background: var(--kds-color-background-neutral-hover);
  }

  &:not(.disabled):active {
    background: var(--kds-color-background-neutral-active);
  }

  &.selected:not(.disabled) {
    color: var(--kds-color-text-and-icon-selected);
    background: var(--kds-color-background-selected-initial);

    &:hover {
      background: var(--kds-color-background-selected-hover);
    }

    &:active {
      background: var(--kds-color-background-selected-active);
    }
  }

  &.missing:not(.disabled) {
    color: var(--kds-color-text-and-icon-danger);
    background: var(--kds-color-background-danger-initial);

    &:hover {
      background: var(--kds-color-background-danger-hover);
    }

    &:active {
      background: var(--kds-color-background-danger-active);
    }
  }

  &.active:not(.disabled) {
    &:not(.selected, .missing) {
      background: var(--kds-color-background-neutral-hover);
    }

    &.selected {
      background: var(--kds-color-background-selected-hover);
    }

    &.missing {
      background: var(--kds-color-background-danger-hover);
    }
  }
}

.kds-list-item-singleline {
  display: flex;
  gap: var(--kds-spacing-container-0-25x);
  align-items: center;
  width: 100%;
  min-height: var(--kds-dimension-component-height-1-5x);
  padding: 0 var(--kds-spacing-container-0-5x);
  font: var(--kds-font-base-interactive-small);

  .kds-list-item-missing-prefix {
    flex-shrink: 0;
  }

  .kds-list-item-label {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    font: inherit;
    white-space: nowrap;

    &.special {
      font: var(--kds-font-base-interactive-small-italic);
    }
  }
}

.kds-list-item-multiline {
  display: flex;
  gap: var(--kds-spacing-container-0-5x);
  align-items: center;
  width: 100%;
  min-height: var(--kds-dimension-component-height-2-5x);
  padding: var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-5x);
}

.kds-list-item-content {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: var(--kds-spacing-container-0-12x);
  min-width: 0;
}

.kds-list-item-title {
  overflow: hidden;
  text-overflow: ellipsis;
  font: var(--kds-font-base-interactive-small-strong);
  white-space: nowrap;

  .kds-list-item-missing-prefix {
    margin-right: var(--kds-spacing-container-0-12x);
  }
}

.kds-list-item-subtitle {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  font: var(--kds-font-base-subtext-small);
  -webkit-box-orient: vertical;
}
</style>
