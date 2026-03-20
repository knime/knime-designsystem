<script setup lang="ts">
import {
  computed,
  defineAsyncComponent,
  ref,
  useId,
  useTemplateRef,
} from "vue";

import { useKdsIsTruncated } from "../../util";
import type { KdsFieldsetProps } from "../types";

import KdsSubText from "./KdsSubText.vue";

const props = defineProps<KdsFieldsetProps>();

const KdsInfoToggleButton = defineAsyncComponent(
  () => import("./InfoPopover/KdsInfoToggleButton.vue"),
);

const fallbackId = useId();
const fieldsetId = computed(() => props.id?.trim() || fallbackId);
const legendId = computed(() => `${fieldsetId.value}-legend`);
const subTextId = computed(() => `${fieldsetId.value}-subtext`);

const isHovered = ref(false);

const legendTextEl = useTemplateRef("legendTextEl");
const { isTruncated } = useKdsIsTruncated(legendTextEl);
</script>

<template>
  <fieldset
    :id="fieldsetId"
    class="kds-fieldset"
    :role="props.role"
    :aria-label="props.label ? undefined : props.ariaLabel"
    :aria-labelledby="props.label ? legendId : undefined"
    :aria-describedby="props.subText ? subTextId : undefined"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <legend v-if="props.label" :id="legendId" class="kds-fieldset-legend">
      <span
        ref="legendTextEl"
        class="legend-text"
        :title="isTruncated ? props.label : undefined"
      >
        {{ props.label }}
      </span>
      <KdsInfoToggleButton
        v-if="props.description"
        :content="props.description"
        :hidden="!isHovered"
      />
    </legend>
    <div class="kds-fieldset-content">
      <slot />
    </div>
    <KdsSubText
      :id="subTextId"
      :sub-text="props.subText"
      :error="props.error"
      :validating="props.validating"
      :preserve-sub-text-space="props.preserveSubTextSpace"
    />
  </fieldset>
</template>

<style scoped>
.kds-fieldset {
  display: flex;
  flex-direction: column;
  min-inline-size: 0;
  padding: 0;
  margin: 0;
  border: none;
}

.kds-fieldset-legend {
  display: flex;
  gap: var(--kds-spacing-container-0-12x);
  align-items: center;
  max-width: 100%;
  min-height: var(--kds-dimension-component-height-0-75x);
  padding: 0 0 var(--kds-spacing-input-label-spacing-bottom);
}

.kds-fieldset-content {
  display: flex;
  flex-direction: column;
  gap: var(--kds-spacing-container-0-75x);
}

.legend-text {
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
