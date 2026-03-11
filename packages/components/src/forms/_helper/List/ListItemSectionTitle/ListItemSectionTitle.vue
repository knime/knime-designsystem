<script setup lang="ts">
import { useTemplateRef } from "vue";

import KdsIcon from "../../../../accessories/Icon/KdsIcon.vue";
import { useKdsIsTruncated } from "../../../../util";

import type { KdsListItemSectionTitleProps } from "./types.ts";

const props = defineProps<KdsListItemSectionTitleProps>();

const labelEl = useTemplateRef("labelEl");
const { isTruncated } = useKdsIsTruncated(labelEl);
</script>

<template>
  <div class="kds-list-item-section-title">
    <span v-if="props.iconName" class="icon">
      <KdsIcon :name="props.iconName" size="small" />
    </span>

    <span
      ref="labelEl"
      class="label"
      :title="isTruncated ? props.label : undefined"
    >
      {{ props.label }}
    </span>
  </div>
</template>

<style scoped>
.kds-list-item-section-title {
  display: flex;
  gap: var(--kds-spacing-container-0-25x);
  align-items: center;
  width: 100%;
  min-height: var(--kds-dimension-component-height-1-5x);
  padding: var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-5x);
  color: var(--kds-color-text-and-icon-muted);
  background: var(--kds-color-background-neutral-initial);
  border-radius: var(--kds-border-radius-container-0-31x);

  .icon {
    display: flex;
    flex-shrink: 0;
    align-items: center;
  }

  .label {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    font: var(--kds-font-base-title-xsmall);
    white-space: nowrap;
  }
}
</style>
