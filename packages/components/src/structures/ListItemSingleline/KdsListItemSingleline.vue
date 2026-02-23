<script setup lang="ts">
import KdsAvatar from "../../accessories/Avatar/KdsAvatar.vue";
import KdsColorSwatch from "../../accessories/ColorSwatch/KdsColorSwatch.vue";
import KdsDataType from "../../accessories/Icon/KdsDataType.vue";
import KdsIcon from "../../accessories/Icon/KdsIcon.vue";

import type { KdsListItemSinglelineProps } from "./types";

const props = withDefaults(defineProps<KdsListItemSinglelineProps>(), {
  specialContent: false,
  selected: false,
  active: false,
  missing: false,
  disabled: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<template>
  <div
    :id="props.id"
    role="option"
    :aria-selected="props.selected"
    :aria-disabled="props.disabled"
    :class="{
      selected: props.selected,
      active: props.active,
      missing: props.missing,
      'special-content': props.specialContent,
      disabled: props.disabled,
    }"
    @click="emit('click', $event)"
  >
    <span class="content">
      <span class="label">
        <span v-if="props.accessory" class="accessory" aria-hidden="true">
          <KdsIcon
            v-if="props.accessory.type === 'icon'"
            :name="props.accessory.name"
            size="small"
          />
          <KdsDataType
            v-else-if="props.accessory.type === 'dataType'"
            :icon-name="props.accessory.name"
            size="small"
          />
          <KdsColorSwatch
            v-else-if="props.accessory.type === 'colorSwatch'"
            :color="props.accessory.color"
            :title="props.accessory.title"
          />
          <KdsAvatar
            v-else-if="props.accessory.type === 'avatar'"
            class="avatar"
            :initials="props.accessory.initials"
            :src="props.accessory.imageSrc"
            :title="props.accessory.title"
          />
        </span>
        <span class="text" :title="props.label">
          <span v-if="props.missing" class="missing-prefix">(Missing)</span>
          <span class="label-text">{{ props.label }}</span>
        </span>
      </span>
    </span>

    <span v-if="$slots.trailing || props.selected" class="trailing">
      <slot name="trailing">
        <KdsIcon v-if="!props.missing" name="checkmark" size="xsmall" />
      </slot>
    </span>
  </div>
</template>

<style scoped>
div[role="option"] {
  position: relative;
  display: flex;
  gap: var(--kds-spacing-container-none);
  align-items: center;
  width: 100%;
  min-height: var(--kds-dimension-component-height-1-5x);
  padding: 0 var(--kds-spacing-container-0-5x);
  font: var(--kds-font-base-interactive-small);
  color: var(--kds-color-text-and-icon-neutral);
  cursor: pointer;
  background: var(--kds-color-background-neutral-initial);
  border: none;
  border-radius: var(--kds-border-radius-container-0-25x);

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

  &.selected {
    color: var(--kds-color-text-and-icon-selected);
    background: var(--kds-color-background-selected-initial);

    &:not(.disabled):hover {
      background: var(--kds-color-background-selected-hover);
    }

    &:not(.disabled):active {
      background: var(--kds-color-background-selected-active);
    }
  }

  &.missing {
    color: var(--kds-color-text-and-icon-danger);
    background: var(--kds-color-background-danger-initial);

    &:not(.disabled):hover {
      background: var(--kds-color-background-danger-hover);
    }

    &:not(.disabled):active {
      background: var(--kds-color-background-danger-active);
    }
  }

  &.active {
    &:not(.disabled, .selected, .missing) {
      background: var(--kds-color-background-neutral-hover);
    }

    &.selected:not(.disabled) {
      background: var(--kds-color-background-selected-hover);
    }

    &.missing:not(.disabled) {
      background: var(--kds-color-background-danger-hover);
    }
  }
}

.content {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  min-width: 0;
  padding-block: var(--kds-spacing-container-0-25x);
}

.label {
  display: flex;
  gap: var(--kds-spacing-container-0-25x);
  align-items: center;
  min-width: 0;
}

.accessory {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
}

.avatar {
  width: var(--kds-dimension-component-width-0-75x);
  height: var(--kds-dimension-component-width-0-75x);
}

.text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.missing-prefix {
  margin-right: var(--kds-spacing-container-0-25x);
  font-style: normal;
}

.label-text {
  font: inherit;
}

.special-content .text {
  font: var(--kds-font-base-interactive-small-italic);
}

.trailing {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  color: inherit;
}
</style>
