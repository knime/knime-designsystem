<script setup lang="ts">
import type { KdsListContainerProps } from "./types";

const props = defineProps<KdsListContainerProps>();
</script>

<template>
  <ul
    :id="props.id"
    class="list"
    role="listbox"
    :aria-labelledby="props.ariaLabelledby"
    @click.stop
  >
    <li v-if="props.empty" class="empty" aria-disabled="true">
      {{ props.emptyText }}
    </li>
    <slot v-else />
  </ul>
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: var(--kds-spacing-container-0-10x);
  max-height: calc(var(--kds-dimension-component-height-1-5x) * 8);
  padding: var(--kds-spacing-container-0-25x);
  margin: 0;
  overflow: auto;
  list-style: none;
}

.empty {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(var(--kds-dimension-component-height-1-5x) * 4);
  padding: var(--kds-spacing-container-0-25x);
  font: var(--kds-font-base-interactive-small);
  color: var(--kds-color-text-and-icon-muted);
}
</style>
