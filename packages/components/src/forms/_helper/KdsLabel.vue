<script setup lang="ts">
import { defineAsyncComponent, useTemplateRef } from "vue";

import { useKdsIsTruncated } from "../../util";
import type { KdsLabelProps } from "../types.ts";

const props = defineProps<KdsLabelProps>();

const KdsInfoToggleButton = defineAsyncComponent(
  () => import("./InfoPopover/KdsInfoToggleButton.vue"),
);

const labelEl = useTemplateRef("labelEl");
const { isTruncated } = useKdsIsTruncated(labelEl);
</script>

<template>
  <div class="kds-label-wrapper">
    <label
      :id="props.id"
      ref="labelEl"
      :for="props.for"
      class="label"
      :title="isTruncated ? props.label : undefined"
    >
      {{ props.label }}
    </label>
    <KdsInfoToggleButton
      v-if="props.description"
      :content="props.description"
      :hidden="!props.isHovered"
    />
  </div>
</template>

<style scoped>
.kds-label-wrapper {
  display: flex;
  gap: var(--kds-spacing-container-0-12x);
  align-items: center;
  max-width: 100%;
  min-height: var(--kds-dimension-component-height-0-75x);
  padding-bottom: var(--kds-spacing-input-label-spacing-bottom);
}

.label {
  display: block;
  flex-grow: 1;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  font: var(--kds-font-base-title-small-strong);
  color: var(--kds-color-text-and-icon-neutral);
  white-space: nowrap;
}
</style>
