<script setup lang="ts">
import KdsIcon from "../../accessories/Icon/KdsIcon.vue";

import BaseListItem from "./BaseListItem.vue";
import ListItemAccessory from "./ListItemAccessory.vue";
import type { KdsListItemMultilineProps } from "./types";

const props = withDefaults(defineProps<KdsListItemMultilineProps>(), {
  accessory: undefined,
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
  <BaseListItem
    :id="props.id"
    border-radius="var(--kds-border-radius-container-0-31x)"
    :selected="props.selected"
    :active="props.active"
    :missing="props.missing"
    :disabled="props.disabled"
    @click="emit('click', $event)"
  >
    <div class="multiline" :class="{ disabled: props.disabled }">
      <ListItemAccessory
        v-if="props.accessory"
        :accessory="props.accessory"
        size="large"
      />

      <span class="content">
        <span
          class="label"
          :title="props.missing ? `(Missing) ${props.label}` : props.label"
        >
          <span v-if="props.missing" class="missing-prefix">(Missing)</span>
          <span class="label-text">{{ props.label }}</span>
        </span>
        <span class="subtitle" :title="props.subText">
          {{ props.subText }}
        </span>
      </span>

      <KdsIcon
        v-if="props.selected && !props.missing"
        name="checkmark"
        size="small"
      />
    </div>
  </BaseListItem>
</template>

<style scoped>
.multiline {
  display: flex;
  gap: var(--kds-spacing-container-0-5x);
  align-items: center;
  width: 100%;
  min-height: var(--kds-dimension-component-height-2-5x);
  padding: var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-5x);
}

.content {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: var(--kds-spacing-container-0-12x);
  min-width: 0;
}

.label {
  overflow: hidden;
  text-overflow: ellipsis;
  font: var(--kds-font-base-interactive-small-strong);
  white-space: nowrap;
}

.missing-prefix {
  margin-right: var(--kds-spacing-container-0-12x);
  font-style: normal;
}

.label-text {
  font: inherit;
  color: var(--kds-color-text-and-icon-neutral);
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

.multiline.disabled .label-text,
.multiline.disabled .subtitle {
  color: var(--kds-color-text-and-icon-disabled);
}
</style>
