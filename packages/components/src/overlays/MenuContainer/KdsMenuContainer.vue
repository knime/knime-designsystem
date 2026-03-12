<script setup lang="ts">
import { useTemplateRef } from "vue";

import { KdsListContainer } from "../../forms/_helper/List/ListContainer";

import type { KdsMenuContainerProps } from "./types";

defineProps<KdsMenuContainerProps>();

const emit = defineEmits<{
  /** Emitted when item is clicked */
  itemClick: [id: string];
}>();

const listContainerEl = useTemplateRef("listContainerEl");

defineExpose({
  focus: () => listContainerEl.value?.focus(),
});
</script>

<template>
  <div class="kds-menu-container">
    <KdsListContainer
      ref="listContainerEl"
      :possible-values="items"
      empty-text="Menu is empty"
      aria-label="Menu"
      is-menu
      @item-click="emit('itemClick', $event)"
    />
  </div>
</template>

<style scoped>
.kds-menu-container {
  background-color: var(--kds-color-surface-default);
  border-radius: var(--kds-border-radius-container-0-50x);
  box-shadow: var(--kds-elevation-level-3);
}
</style>
