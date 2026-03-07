<script setup lang="ts">
import { computed, useTemplateRef } from "vue";

import KdsIcon from "../../../../accessories/Icon/KdsIcon.vue";
import { useKdsIsTruncated } from "../../../../util";
import ListItemAccessory from "../ListItemAccessory/ListItemAccessory.vue";

import { kdsListItemVariant } from "./enums.ts";
import type { KdsListItemProps } from "./types.ts";

const props = withDefaults(defineProps<KdsListItemProps>(), {
  accessory: undefined,
  subText: undefined,
  variant: kdsListItemVariant.SMALL,
  shortcut: undefined,
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
const hasShortcut = computed(
  () => props.shortcut !== undefined && !props.selected && !props.missing,
);
const accessorySize = computed(() =>
  props.variant === kdsListItemVariant.LARGE ? "large" : "small",
);

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
      props.variant,
      {
        multiline: isMultiline,
        selected: props.selected,
        active: props.active,
        missing: props.missing,
        disabled: props.disabled,
      },
    ]"
    @click="onClick"
  >
    <div class="kds-list-item-wrapper">
      <ListItemAccessory
        v-if="props.accessory"
        :accessory="props.accessory"
        :size="accessorySize"
      />

      <!-- Singleline layout -->
      <template v-if="!isMultiline">
        <span class="kds-list-item-content-singleline">
          <span class="kds-list-item-title-singleline">
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
          </span>
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

      <span v-if="hasShortcut" class="kds-list-item-trailing-item">
        <span class="kds-list-item-shortcut">
          {{ props.shortcut }}
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
  border-radius: var(--kds-border-radius-container-0-31x);

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

.kds-list-item-wrapper {
  display: flex;
  gap: var(--kds-spacing-container-0-5x);
  align-items: center;
  width: 100%;
  min-height: var(--kds-dimension-component-height-2-5x);
  padding: var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-5x);
}

.kds-list-item.small {
  font: var(--kds-font-base-interactive-small);
}

.kds-list-item.small:not(.multiline) .kds-list-item-wrapper {
  gap: var(--kds-spacing-container-0-25x);
  min-height: var(--kds-dimension-component-height-1-5x);
  padding-top: var(--kds-spacing-container-0-37x);
  padding-bottom: var(--kds-spacing-container-0-37x);
}

.kds-list-item.large {
  font: var(--kds-font-base-interactive-small-strong);
}

.kds-list-item-content-singleline {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  min-width: 0;
}

.kds-list-item-title-singleline {
  display: flex;
  flex: 1 1 auto;
  gap: var(--kds-spacing-container-0-12x);
  align-items: center;
  min-width: 0;
}

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
  font: inherit;
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

.kds-list-item-trailing-item {
  display: flex;
  flex-shrink: 0;
  gap: var(--kds-spacing-container-0-12x);
  align-items: center;
  justify-content: flex-end;
  color: var(--kds-color-text-and-icon-muted);
}

.kds-list-item-shortcut {
  width: var(--kds-dimension-component-width-2-25x);
  overflow: hidden;
  text-overflow: ellipsis;
  font: var(--kds-font-base-interactive-xsmall-strong);
  text-align: right;
  white-space: nowrap;
}

.kds-list-item.disabled .kds-list-item-trailing-item {
  color: var(--kds-color-text-and-icon-disabled);
}
</style>
