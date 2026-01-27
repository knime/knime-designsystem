<script setup lang="ts">
import { computed } from "vue";

import type { KdsEmptyStateProps } from "./types";

const props = defineProps<KdsEmptyStateProps>();

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();

const hasButton = computed(() => {
  // FIXME: this is wrong
  return (
    "buttonLabel" in props &&
    props.buttonLabel !== undefined &&
    props.buttonLabel !== ""
  );
});

const buttonType = computed(() => {
  if (hasButton.value && "buttonTo" in props && props.buttonTo !== undefined) {
    return "KdsLinkButton";
  }
  return "KdsButton";
});

const buttonProps = computed(() => {
  if (!hasButton.value) {
    return {};
  }

  // FIXME: check if this can be done more dynamic with a mapping

  const baseProps = {
    label: props.buttonLabel,
    leadingIcon: props.buttonLeadingIcon,
    trailingIcon: props.buttonTrailingIcon,
    ariaLabel: props.buttonAriaLabel,
    disabled: props.buttonDisabled,
    variant: props.buttonVariant,
  };

  if ("buttonTo" in props && props.buttonTo !== undefined) {
    return {
      ...baseProps,
      to: props.buttonTo,
      target: props.buttonTarget,
      rel: props.buttonRel,
      download: props.buttonDownload,
    };
  } else {
    return {
      ...baseProps,
    };
  }
});
</script>

<template>
  <div class="kds-empty-state">
    <h2 class="kds-empty-state-headline">{{ props.headline }}</h2>
    <p v-if="props.description" class="kds-empty-state-description">
      {{ props.description }}
    </p>
    <div class="kds-empty-state-action">
      <component
        :is="buttonType"
        v-if="hasButton"
        v-bind="buttonProps"
        @click="emit('click', $event)"
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
