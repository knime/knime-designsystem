<script setup lang="ts">
import { useTemplateRef } from "vue";

import { KdsListContainer } from "../../forms/_helper/List/ListContainer";
import KdsPopover from "../Popover/KdsPopover.vue";

import type { KdsMenuContainerProps } from "./types";

defineProps<KdsMenuContainerProps>();

const emit = defineEmits<{
  /** Emitted when item is clicked */
  itemClick: [id: string];
}>();

const popoverEl = useTemplateRef("popoverEl");
const listContainerEl = useTemplateRef("listContainerEl");

const modelValue = defineModel<boolean>({ default: false });

defineExpose({
  popoverEl,
  focus: () => listContainerEl.value?.focus(),
});
</script>

<template>
  <KdsPopover
    ref="popoverEl"
    v-model="modelValue"
    role="menu"
    :placement="placement"
    popover-aria-label="Menu items"
  >
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
  </KdsPopover>
</template>

<style scoped>
.kds-menu-container {
  background-color: var(--kds-color-surface-default);
  border-radius: var(--kds-border-radius-container-0-50x);
  box-shadow: var(--kds-elevation-level-3);
}
</style>
