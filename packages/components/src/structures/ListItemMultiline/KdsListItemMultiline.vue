<script setup lang="ts">
import KdsAvatar from "../../accessories/Avatar/KdsAvatar.vue";
import KdsColorSwatch from "../../accessories/ColorSwatch/KdsColorSwatch.vue";
import KdsDataType from "../../accessories/Icon/KdsDataType.vue";
import KdsIcon from "../../accessories/Icon/KdsIcon.vue";

import type { KdsListItemMultilineProps } from "./types";

const props = withDefaults(defineProps<KdsListItemMultilineProps>(), {
  accessory: undefined,
  selected: false,
  missing: false,
  disabled: false,
});
</script>

<template>
  <div
    class="list-item"
    :class="{
      selected: props.selected,
      missing: props.missing,
      disabled: props.disabled,
    }"
    role="option"
    :aria-selected="props.selected"
    :aria-disabled="props.disabled"
  >
    <KdsAvatar
      v-if="props.accessory?.type === 'avatar'"
      class="accessory accessory-avatar"
      :title="props.accessory.title"
      :src="props.accessory.imageSrc"
      :initials="props.accessory.initials"
    />
    <span
      v-else-if="props.accessory"
      class="accessory accessory-small"
      aria-hidden="true"
    >
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
    </span>

    <span class="content">
      <span
        class="title"
        :title="props.missing ? `(Missing) ${props.title}` : props.title"
      >
        <span v-if="props.missing" class="missing-prefix">(Missing)</span>
        <span class="title-text">{{ props.title }}</span>
      </span>
      <span class="subtitle" :title="props.subtitle">{{ props.subtitle }}</span>
    </span>

    <span v-if="props.selected && !props.missing" class="trailing">
      <KdsIcon name="checkmark" size="small" />
    </span>
  </div>
</template>

<style scoped>
.list-item {
  position: relative;
  display: flex;
  gap: var(--kds-spacing-container-0-5x);
  align-items: center;
  width: 100%;
  min-height: var(--kds-dimension-component-height-2-5x);
  padding: var(--kds-spacing-container-0-5x);
  cursor: pointer;
  background: var(--kds-color-background-neutral-initial);
  border: none;
  border-radius: var(--kds-border-radius-container-0-31x);
}

.list-item.selected {
  background: var(--kds-color-background-selected-initial);
}

.list-item.missing {
  background: var(--kds-color-background-danger-initial);
}

.list-item.disabled {
  cursor: default;
}

.list-item:not(.disabled):hover {
  background: var(--kds-color-background-neutral-hover);
}

.list-item.selected:not(.disabled):hover {
  background: var(--kds-color-background-selected-hover);
}

.list-item.missing:not(.disabled):hover {
  background: var(--kds-color-background-danger-hover);
}

.list-item:not(.disabled):active {
  background: var(--kds-color-background-neutral-active);
}

.list-item.selected:not(.disabled):active {
  background: var(--kds-color-background-selected-active);
}

.list-item.missing:not(.disabled):active {
  background: var(--kds-color-background-danger-active);
}

.accessory {
  flex-shrink: 0;
}

.accessory-avatar {
  width: var(--kds-dimension-component-width-1-25x);
  height: var(--kds-dimension-component-height-1-25x);
}

.accessory-small {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.content {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: var(--kds-spacing-container-0-12x);
  min-width: 0;
}

.title {
  overflow: hidden;
  text-overflow: ellipsis;
  font: var(--kds-font-base-interactive-small-strong);
  color: var(--kds-color-text-and-icon-neutral);
  white-space: nowrap;
}

.list-item.missing .title {
  color: var(--kds-color-text-and-icon-danger);
}

.missing-prefix {
  margin-right: var(--kds-spacing-container-0-12x);
  font-style: normal;
}

.title-text {
  font: inherit;
}

.subtitle {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  font: var(--kds-font-base-subtext-small);
  color: var(--kds-color-text-and-icon-muted);
  -webkit-box-orient: vertical;
}

.list-item.disabled .title,
.list-item.disabled .subtitle {
  color: var(--kds-color-text-and-icon-disabled);
}

.trailing {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
}
</style>
