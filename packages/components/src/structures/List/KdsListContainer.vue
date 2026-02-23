<script setup lang="ts">
import KdsListItemSingleline from "./KdsListItemSingleline.vue";
import type { KdsListContainerProps } from "./types.ts";

const props = withDefaults(defineProps<KdsListContainerProps>(), {
  id: undefined,
  ariaLabelledby: undefined,
  emptyText: "No entries in this list",
});

const emit = defineEmits<{
  itemClick: [id: string];
}>();
</script>

<template>
  <div
    :id="props.id"
    class="kds-list-container"
    role="listbox"
    aria-orientation="vertical"
    :aria-labelledby="props.ariaLabelledby"
  >
    <template v-if="props.items.length">
      <KdsListItemSingleline
        v-for="item in props.items"
        v-bind="item"
        :key="item.id"
        @click="!item.disabled && emit('itemClick', item.id)"
      />
    </template>

    <div v-else class="empty-state">
      <div class="empty-content">
        <span class="empty-text">{{ props.emptyText }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.kds-list-container {
  display: flex;
  flex-direction: column;
  gap: var(--kds-spacing-container-0-10x);
  align-items: stretch;
  height: 100%;
  padding: var(--kds-spacing-container-0-25x);
}

.empty-state {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  min-height: var(--kds-dimension-component-height-1-5x);
}

.empty-content {
  display: flex;
  flex-direction: column;
  gap: var(--kds-spacing-container-0-5x);
  align-items: center;
  justify-content: center;
  padding: var(--kds-spacing-container-0-5x);
  text-align: center;
}

.empty-text {
  font: var(--kds-font-base-interactive-small);
  color: var(--kds-color-text-and-icon-muted);
}
</style>
