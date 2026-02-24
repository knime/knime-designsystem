<script setup lang="ts">
import { computed, useTemplateRef } from "vue";

import KdsIcon from "../../../../accessories/Icon/KdsIcon.vue";
import { useKdsIsTruncated } from "../../../../util";
import ListItemAccessory from "../ListItemAccessory/ListItemAccessory.vue";
import { kdsListItemAccessorySize } from "../ListItemAccessory/enums.ts";

import { kdsListItemVariant } from "./enums.ts";
import type { KdsListItemProps } from "./types.ts";

const props = withDefaults(defineProps<KdsListItemProps>(), {
  accessory: undefined,
  subText: undefined,
  variant: kdsListItemVariant.SMALL,
  shortcut: undefined,
  trailingIcon: undefined,
  special: false,
  selected: false,
  active: false,
  missing: false,
  disabled: false,
});

const emit = defineEmits<{
  /**
   * Emitted when the list item is clicked.
   */
  click: [event: MouseEvent];
}>();

const accessorySize = computed(() =>
  props.variant === kdsListItemVariant.LARGE
    ? kdsListItemAccessorySize.LARGE
    : kdsListItemAccessorySize.SMALL,
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

const subtextEl = useTemplateRef("subtextEl");
const { isTruncated: isSubtextTruncated } = useKdsIsTruncated(subtextEl);
</script>

<template>
  <div
    :id="props.id"
    role="option"
    :aria-selected="props.selected"
    :aria-disabled="props.disabled"
    :class="[
      'kds-list-item',
      props.variant,
      {
        selected: props.selected,
        active: props.active,
        missing: props.missing,
        disabled: props.disabled,
      },
    ]"
    @click="onClick"
  >
    <span v-if="props.accessory" class="accessory">
      <ListItemAccessory :accessory="props.accessory" :size="accessorySize" />
    </span>

    <span class="content">
      <span
        ref="labelEl"
        class="label"
        :title="isLabelTruncated ? props.label : undefined"
      >
        <span v-if="props.missing" class="prefix">(Missing)&nbsp;</span>
        <span :class="{ special: props.special }">{{ props.label }}</span>
      </span>
      <span
        v-if="props.subText"
        ref="subtextEl"
        class="subtext"
        :title="isSubtextTruncated ? props.subText : undefined"
      >
        {{ props.subText }}
      </span>
    </span>

    <span v-if="props.shortcut || props.trailingIcon" class="trailing-item">
      <span v-if="props.shortcut" class="shortcut">
        {{ props.shortcut }}
      </span>

      <KdsIcon
        v-if="props.trailingIcon"
        :name="props.trailingIcon"
        size="small"
      />
    </span>
  </div>
</template>

<style scoped>
.kds-list-item {
  position: relative;
  display: flex;
  gap: var(--kds-spacing-container-0-5x);
  align-items: center;
  width: 100%;
  padding: var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-5x);
  color: var(--kds-color-text-and-icon-neutral);
  cursor: pointer;
  user-select: none;
  background: var(--kds-color-background-neutral-initial);
  border: none;
  border-radius: var(--kds-border-radius-container-0-31x);

  &.small {
    gap: var(--kds-spacing-container-0-25x);
    align-items: flex-start;
    padding: var(--kds-spacing-container-0-25x)
      var(--kds-spacing-container-0-5x);
    font: var(--kds-font-base-interactive-small);

    .accessory {
      display: flex;
      padding: var(--kds-spacing-container-0-12x) 0;
    }
  }

  &.large {
    min-height: var(--kds-dimension-component-height-2-5x);
    font: var(--kds-font-base-interactive-small-strong);

    .accessory {
      display: flex;
      align-items: center;
    }
  }

  .content {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    min-width: 0;

    .label {
      overflow: hidden;
      text-overflow: ellipsis;
      font: inherit;
      white-space: nowrap;

      .prefix {
        flex-shrink: 0;
      }

      .special {
        font: var(--kds-font-base-interactive-small-italic);
      }
    }

    .subtext {
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      font: var(--kds-font-base-subtext-small);
      color: var(--kds-color-text-and-icon-muted);
      -webkit-box-orient: vertical;
    }
  }

  .trailing-item {
    display: flex;
    flex-shrink: 0;
    gap: var(--kds-spacing-container-0-12x);
    align-items: center;
    align-self: center;
    justify-content: flex-end;

    .shortcut {
      flex-shrink: 0;
      font: var(--kds-font-base-interactive-xsmall-strong);
      color: var(--kds-color-text-and-icon-muted);
      text-align: right;
      white-space: nowrap;
    }
  }

  &:hover:not(.disabled),
  &.active:not(.disabled) {
    background: var(--kds-color-background-neutral-hover);
  }

  &:active:not(.disabled) {
    background: var(--kds-color-background-neutral-active);
  }

  &.selected {
    color: var(--kds-color-text-and-icon-selected);
    background: var(--kds-color-background-selected-initial);

    .subtext {
      color: var(--kds-color-text-and-icon-selected);
    }

    &:hover,
    &.active {
      background: var(--kds-color-background-selected-hover);
    }

    &:active {
      background: var(--kds-color-background-selected-active);
    }

    &.disabled {
      background: var(--kds-color-background-selected-initial);
    }
  }

  &.missing {
    color: var(--kds-color-text-and-icon-danger);
    background: var(--kds-color-background-danger-initial);

    .subtext {
      color: var(--kds-color-text-and-icon-danger);
    }

    &:hover,
    &.active {
      background: var(--kds-color-background-danger-hover);
    }

    &:active {
      background: var(--kds-color-background-danger-active);
    }

    &.disabled {
      background: var(--kds-color-background-danger-initial);
    }
  }

  &.disabled {
    color: var(--kds-color-text-and-icon-disabled);
    cursor: default;

    .shortcut,
    .subtext {
      color: var(--kds-color-text-and-icon-disabled);
    }
  }
}
</style>
