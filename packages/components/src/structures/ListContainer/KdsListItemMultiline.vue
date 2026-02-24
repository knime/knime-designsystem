<script setup lang="ts">
import { useTemplateRef } from "vue";

import KdsIcon from "../../accessories/Icon/KdsIcon.vue";
import { useKdsIsTruncated } from "../../util";

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

const labelEl = useTemplateRef("labelEl");
const { isTruncated: isLabelTruncated } = useKdsIsTruncated(labelEl);

const subtitleEl = useTemplateRef("subtitleEl");
const { isTruncated: isSubtitleTruncated } = useKdsIsTruncated(subtitleEl);
</script>

<template>
  <BaseListItem
    :id="props.id"
    size="large"
    :selected="props.selected"
    :active="props.active"
    :missing="props.missing"
    :disabled="props.disabled"
    @click="emit('click', $event)"
  >
    <div class="multiline">
      <ListItemAccessory
        v-if="props.accessory"
        :accessory="props.accessory"
        size="large"
      />

      <span class="content">
        <span class="label">
          <span v-if="props.missing" class="missing-prefix">(Missing)</span>
          <span
            ref="labelEl"
            :title="isLabelTruncated ? props.label : undefined"
          >
            {{ props.label }}
          </span>
        </span>
        <span
          ref="subtitleEl"
          class="subtitle"
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

  .missing-prefix {
    margin-right: var(--kds-spacing-container-0-12x);
  }
}

.subtitle {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  font: var(--kds-font-base-subtext-small);
  -webkit-box-orient: vertical;
}
</style>
