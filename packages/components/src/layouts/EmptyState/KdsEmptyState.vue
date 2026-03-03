<script setup lang="ts">
import { computed } from "vue";

import KdsButton from "../../buttons/KdsButton/KdsButton.vue";
import KdsLinkButton from "../../buttons/KdsLinkButton/KdsLinkButton.vue";

import type { KdsEmptyStateProps } from "./types";

const props = defineProps<KdsEmptyStateProps>();

const emit = defineEmits<{
  /**
   * Fired when the button is clicked
   *
   * This event is only emitted when the `button` prop is provided.
   */
  buttonClick: [event: MouseEvent];
}>();

const isLinkButton = computed(
  () => props.button && "to" in props.button && props.button.to !== undefined,
);

const buttonComponent = computed(() =>
  isLinkButton.value ? KdsLinkButton : KdsButton,
);
</script>

<template>
  <div class="kds-empty-state">
    <p class="kds-empty-state-headline">{{ props.headline }}</p>
    <p v-if="props.description" class="kds-empty-state-description">
      {{ props.description }}
    </p>
    <div v-if="props.button" class="kds-empty-state-action">
      <component
        :is="buttonComponent"
        v-bind="props.button"
        @click="emit('buttonClick', $event)"
      />
    </div>
  </div>
</template>

<style scoped>
.kds-empty-state {
  display: flex;
  flex-direction: column;
  gap: var(--kds-spacing-container-0-5x);
  align-items: center;
  max-width: 280px;
  padding: var(--kds-spacing-container-0-5x);
}

.kds-empty-state-headline {
  margin: 0;
  font: var(--kds-font-base-title-small);
  color: var(--kds-color-text-and-icon-muted);
  text-align: center;
}

.kds-empty-state-description {
  margin: 0;
  font: var(--kds-font-base-body-small);
  color: var(--kds-color-text-and-icon-muted);
  text-align: center;
}

.kds-empty-state-action {
  margin-top: var(--kds-spacing-container-0-12x);
}
</style>
