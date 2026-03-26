<script setup lang="ts">
import { useTemplateRef } from "vue";

import KdsListContainer from "../List/ListContainer/KdsListContainer.vue";

import type { KdsMenuContainerExpose, KdsMenuContainerProps } from "./types";

const {
  ariaLabel = "Actions",
  menuMaxHeight,
  ...props
} = defineProps<KdsMenuContainerProps>();

const emit = defineEmits<{
  /** Emitted when item is clicked */
  itemClick: [id: string];
}>();

const listContainerEl = useTemplateRef("listContainerEl");

const onItemClick = (itemId?: string) => {
  if (itemId) {
    emit("itemClick", itemId);
  }
};

defineExpose<KdsMenuContainerExpose>({
  focus: () => {
    listContainerEl.value?.focus();
  },
});
</script>

<template>
  <div class="kds-menu-container">
    <KdsListContainer
      :id="props.id"
      ref="listContainerEl"
      :possible-values="props.items"
      empty-text="Menu is empty"
      :aria-label="ariaLabel"
      role="menu"
      :style="{ maxHeight: menuMaxHeight }"
      @item-click="onItemClick"
    />
  </div>
</template>

<style scoped>
.kds-menu-container {
  min-width: var(--kds-dimension-component-width-12x);
  max-width: var(--kds-dimension-component-width-20x);
  background-color: var(--kds-color-surface-default);
  border-radius: var(--kds-border-radius-container-0-50x);
  box-shadow: var(--kds-elevation-level-3);
}
</style>
