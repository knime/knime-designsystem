<script setup lang="ts">
import { computed } from "vue";

import KdsButton from "../buttons/KdsButton.vue";
import KdsLinkButton from "../buttons/KdsLinkButton.vue";
import { isDefinedAndNotEmpty } from "../util/isDefinedAndNotEmpty";

import type { KdsEmptyStateProps } from "./types";

const props = defineProps<KdsEmptyStateProps>();

const emit = defineEmits<{
  (e: "buttonClick", event: MouseEvent): void;
}>();

const hasButton = computed(() => {
  return (
    isDefinedAndNotEmpty(props, "buttonLabel") ||
    isDefinedAndNotEmpty(props, "buttonLeadingIcon")
  );
});

const buttonType = computed(() => {
  if (isDefinedAndNotEmpty(props, "buttonTo")) {
    return KdsLinkButton;
  }
  return KdsButton;
});

const mapProps = (
  mappings: ReadonlyArray<readonly [string, keyof KdsEmptyStateProps]>,
) => {
  return Object.fromEntries(
    mappings
      .map(([targetKey, sourceKey]) => [targetKey, props[sourceKey]] as const)
      .filter(([, value]) => value !== undefined),
  );
};

const buttonProps = computed(() => {
  if (!hasButton.value) {
    return {};
  }

  const baseProps = mapProps([
    ["label", "buttonLabel"],
    ["leadingIcon", "buttonLeadingIcon"],
    ["trailingIcon", "buttonTrailingIcon"],
    ["ariaLabel", "buttonAriaLabel"],
    ["disabled", "buttonDisabled"],
    ["variant", "buttonVariant"],
    ["size", "buttonSize"],
    ["destructive", "buttonDestructive"],
    ["title", "buttonTitle"],
  ]);

  if (buttonType.value !== KdsLinkButton) {
    return baseProps;
  }

  return {
    ...baseProps,
    ...mapProps([
      ["to", "buttonTo"],
      ["target", "buttonTarget"],
      ["rel", "buttonRel"],
      ["download", "buttonDownload"],
    ]),
  };
});
</script>

<template>
  <div class="kds-empty-state">
    <p class="kds-empty-state-headline">{{ props.headline }}</p>
    <p v-if="props.description" class="kds-empty-state-description">
      {{ props.description }}
    </p>
    <div v-if="hasButton" class="kds-empty-state-action">
      <component
        :is="buttonType"
        v-bind="buttonProps"
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
