<script setup lang="ts">
import { ref } from "vue";

import KdsInfoToggleButton from "../buttons/KdsInfoToggleButton.vue";
import KdsInfoPopover from "../overlays/Popover/KdsInfoPopover.vue";
import { useKdsPopover } from "../overlays/Popover/useKdsPopover";
import { useKdsIsTruncated } from "../util";

import type { KdsLabelProps } from "./types";

const props = defineProps<KdsLabelProps>();

const labelEl = ref<HTMLLabelElement | null>(null);
const { isTruncated } = useKdsIsTruncated(labelEl);

const descriptionOpen = ref(false);
const isHovered = ref(false);

const activatorEl = ref<HTMLButtonElement | null>(null);
const popoverEl = ref<HTMLElement | null>(null);

useKdsPopover({
  open: descriptionOpen,
  activatorEl,
  popoverEl,
  placement: "top-left",
  type: "grid",
});
</script>

<template>
  <div
    class="label-row"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @focusin="isHovered = true"
    @focusout="isHovered = false"
  >
    <label
      :id="props.id"
      ref="labelEl"
      :for="props.for"
      class="label"
      :title="isTruncated ? props.label : undefined"
    >
      {{ props.label }}
    </label>

    <div v-if="props.description" class="description">
      <KdsInfoToggleButton
        ref="activatorEl"
        v-model="descriptionOpen"
        :hidden="!isHovered"
      />

      <KdsInfoPopover ref="popoverEl">
        {{ props.description }}
      </KdsInfoPopover>
    </div>
  </div>
</template>

<style scoped>
.label-row {
  display: flex;
  gap: var(--kds-spacing-container-0-25x);
  align-items: center;
  max-width: 100%;
}

.label {
  display: block;
  flex: 1;
  min-width: 0;
  max-width: 100%;
  min-height: var(--kds-dimension-component-height-0-75x);
  padding-bottom: var(--kds-spacing-input-label-spacing-bottom);
  overflow: hidden;
  text-overflow: ellipsis;
  font: var(--kds-font-base-title-small-strong);
  color: var(--kds-color-text-and-icon-neutral);
  white-space: nowrap;
}

.description {
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  margin-left: auto;
}
</style>
