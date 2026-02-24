<script setup lang="ts">
import { useTemplateRef } from "vue";

import KdsIcon from "../../accessories/Icon/KdsIcon.vue";
import { useKdsIsTruncated } from "../../util";

import BaseListItem from "./BaseListItem.vue";
import ListItemAccessory from "./ListItemAccessory.vue";
import type { KdsListItemSinglelineProps } from "./types";

const props = withDefaults(defineProps<KdsListItemSinglelineProps>(), {
  accessory: undefined,
  special: false,
  selected: false,
  active: false,
  missing: false,
  disabled: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const textEl = useTemplateRef("textEl");
const { isTruncated } = useKdsIsTruncated(textEl);
</script>

<template>
  <BaseListItem
    :id="props.id"
    :selected="props.selected"
    :active="props.active"
    :missing="props.missing"
    :disabled="props.disabled"
    @click="emit('click', $event)"
  >
    <div class="singleline">
      <ListItemAccessory
        v-if="props.accessory"
        :accessory="props.accessory"
        size="small"
      />

      <span v-if="props.missing" class="missing-prefix">(Missing)</span>
      <span
        ref="textEl"
        :class="{ label: true, special: props.special }"
        :title="isTruncated ? props.label : undefined"
      >
        {{ props.label }}
      </span>

      <KdsIcon v-if="props.selected" name="checkmark" size="xsmall" />
      <KdsIcon
        v-else-if="props.missing && !props.disabled"
        name="trash"
        size="small"
      />
    </div>
  </BaseListItem>
</template>

<style scoped>
.singleline {
  display: flex;
  gap: var(--kds-spacing-container-0-25x);
  align-items: center;
  width: 100%;
  min-height: var(--kds-dimension-component-height-1-5x);
  padding: 0 var(--kds-spacing-container-0-5x);
  font: var(--kds-font-base-interactive-small);

  .missing-prefix {
    flex-shrink: 0;
  }

  .label {
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
</style>
