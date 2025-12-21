<script setup lang="ts">
import KdsButton from "../Button/KdsButton.vue";
import KdsLinkButton from "../Button/KdsLinkButton.vue";

import type {
  KdsEmptyStateProps,
  KdsEmptyStateWithActionProps,
  KdsEmptyStateWithLinkProps,
} from "./types";

const props = withDefaults(
  defineProps<
    | KdsEmptyStateProps
    | KdsEmptyStateWithActionProps
    | KdsEmptyStateWithLinkProps
  >(),
  {},
);
</script>

<template>
  <div class="kds-empty-state">
    <h2 class="kds-empty-state-headline">{{ props.headline }}</h2>
    <p v-if="props.description" class="kds-empty-state-description">
      {{ props.description }}
    </p>
    <div class="kds-empty-state-action">
      <KdsButton
        v-if="'buttonAction' in props && props.buttonAction"
        :label="props.label"
        :variant="props.variant"
        :leading-icon="props.leadingIcon"
        :trailing-icon="props.trailingIcon"
        :disabled="props.disabled"
        :destructive="props.destructive"
        @click="props.buttonAction"
      />
      <KdsLinkButton
        v-else-if="'buttonLink' in props && props.buttonLink"
        :to="props.buttonLink"
        :label="props.label"
        :variant="props.variant"
        leading-icon="external-link"
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
  padding: var(--kds-spacing-container-0-5x);
}

.kds-empty-state-headline {
  max-width: 280px;
  margin: 0;
  font: var(--kds-font-base-title-small);
  color: var(--kds-color-text-and-icon-muted);
  text-align: center;
}

.kds-empty-state-description {
  max-width: 280px;
  margin: 0;
  font: var(--kds-font-base-body-small);
  color: var(--kds-color-text-and-icon-muted);
  text-align: center;
}

.kds-empty-state-action {
  margin-top: var(--kds-spacing-container-0-12x);
}
</style>
