<script setup lang="ts">
import KdsIcon from "../../Icon/KdsIcon.vue";
import { KdsSubText } from "../../forms";

import type { KdsMenuItemProps } from "./types";

const props = withDefaults(defineProps<KdsMenuItemProps>(), {
  size: "small",
  subtext: undefined,
  selected: false,
  active: false,
  disabled: false,
  leadingAccessory: undefined,
  trailingIcon: undefined,
  shortcut: undefined,
});
</script>

<template>
  <button
    type="button"
    role="menuitem"
    :class="[
      'size-' + props.size,
      {
        selected: props.selected,
        active: props.active,
        disabled: props.disabled,
      },
    ]"
    :disabled="props.disabled"
  >
    <div class="kds-menu-item">
      <span v-if="props.leadingAccessory" class="accessory">
        <KdsIcon :name="props.leadingAccessory" :size="size" />
      </span>

      <span class="content">
        <span class="title">{{ props.title }}</span>
      </span>

      <span v-if="props.shortcut || props.trailingIcon" class="trailing">
        <span v-if="props.shortcut" class="shortcut">{{ props.shortcut }}</span>
        <KdsIcon
          v-if="props.trailingIcon"
          class="trailing-icon"
          :name="props.trailingIcon"
          size="small"
        />
      </span>
    </div>
    <KdsSubText v-if="props.subtext" id="some" :sub-text="props.subtext" />
  </button>
</template>

<style scoped>
.title {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  font: inherit;
  color: inherit;
  white-space: nowrap;
}

.subtext {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  font: var(--kds-font-base-subtext-small);
  color: var(--kds-color-text-and-icon-muted);
  white-space: nowrap;
}

button {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  padding: var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-5x);
  font: var(--kds-font-base-interactive-small);
  color: var(--kds-color-text-and-icon-neutral);
  text-align: left;
  cursor: pointer;
  background: var(--kds-color-background-neutral-initial);
  border: none;
  border-radius: var(--kds-border-radius-container-0-31x);

  &.size-small {
    min-height: var(--kds-dimension-component-height-1-5x);
  }

  &.size-medium {
    gap: var(--kds-spacing-container-0-37x);
    height: var(--kds-dimension-component-height-1-75x);
    min-height: var(--kds-dimension-component-height-1-5x);
    padding: var(--kds-spacing-container-0-25x)
      var(--kds-spacing-container-0-75x);
    font: var(--kds-font-base-interactive-medium);
  }

  &:focus-visible {
    outline: var(--kds-border-action-focused);
    outline-offset: var(--kds-spacing-offset-focus);
  }

  &:disabled,
  &.disabled {
    color: var(--kds-color-text-and-icon-muted);
    cursor: default;
  }

  &.disabled .title,
  &.disabled .subtext,
  &:disabled .title,
  &:disabled .subtext {
    color: var(--kds-color-text-and-icon-muted);
  }

  &:not(:disabled):hover {
    background: var(--kds-color-background-neutral-hover);
  }

  &:not(:disabled):active,
  &.active {
    background: var(--kds-color-background-neutral-active);
  }

  &.selected {
    color: var(--kds-color-text-and-icon-selected);
    background: var(--kds-color-background-selected-initial);

    .subtext {
      color: var(--kds-color-text-and-icon-selected);
    }
  }

  &.selected:not(:disabled):hover {
    background: var(--kds-color-background-selected-hover);
  }

  &.selected:not(:disabled):active,
  &.selected.active {
    background: var(--kds-color-background-selected-active);
  }
}

.kds-menu-item {
  display: flex;
  gap: var(--kds-spacing-container-0-25x);
  align-items: center;
}

.accessory {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
}

.content {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: var(--kds-spacing-container-0-12x);
  align-items: flex-start;
  min-width: 0;
}

.trailing {
  display: flex;
  flex-shrink: 0;
  gap: var(--kds-spacing-container-0-12x);
  align-items: center;
  justify-content: flex-end;
}

.shortcut {
  overflow: hidden;
  text-overflow: ellipsis;
  font: var(--kds-font-base-interactive-xsmall-strong);
  color: var(--kds-color-text-and-icon-muted);
  white-space: nowrap;
}

.trailing-icon {
  flex-shrink: 0;
}
</style>
