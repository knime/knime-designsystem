<script setup lang="ts">
import { computed } from "vue";

import BaseButton from "../BaseButton.vue";
import KdsMenuButton from "../KdsMenuButton/KdsMenuButton.vue";

import type {
  KdsSplitButtonAlternativeAction,
  KdsSplitButtonProps,
} from "./types";

const props = withDefaults(defineProps<KdsSplitButtonProps>(), {
  variant: "filled",
  size: "medium",
  alternativeActions: () => [],
  selectedActionId: undefined,
});

const emit = defineEmits<{
  "click:primary": [event: MouseEvent];
  "click:alternative": [action: KdsSplitButtonAlternativeAction];
  "update:selectedActionId": [actionId: string];
}>();

const selectedAction = computed(() =>
  props.alternativeActions?.find(
    (action) => action.id === props.selectedActionId,
  ),
);

const primaryButtonLabel = computed(
  () => selectedAction.value?.label ?? props.label,
);

const primaryButtonIcon = computed(
  () => selectedAction.value?.leadingIcon ?? props.leadingIcon,
);

const buttonClasses = computed(() => ({
  "kds-split-button": true,
  [props.variant]: true,
  [props.size]: true,
  disabled: props.disabled,
}));

const primaryButtonClasses = computed(() => ({
  "kds-split-button-primary": true,
  [props.variant]: true,
}));

const menuItems = computed(() =>
  props.alternativeActions.map((action) => ({
    id: action.id,
    text: action.label,
    accessory: action.leadingIcon
      ? { type: "icon" as const, name: action.leadingIcon }
      : undefined,
    disabled: action.disabled,
    selected: action.id === props.selectedActionId,
  })),
);

function handlePrimaryClick(e: MouseEvent) {
  if (!props.disabled) {
    emit("click:primary", e);
  }
}

function handleMenuItemClick(actionId: string) {
  const action = props.alternativeActions.find((a) => a.id === actionId);
  if (!action || props.disabled) {
    return;
  }

  emit("update:selectedActionId", action.id);
  emit("click:alternative", action);
}
</script>

<template>
  <div :class="buttonClasses">
    <BaseButton
      :class="primaryButtonClasses"
      :size="props.size"
      :variant="props.variant"
      :disabled="props.disabled"
      :title="props.title"
      :label="primaryButtonLabel"
      :leading-icon="primaryButtonIcon"
      :aria-label="props.primaryAriaLabel"
      @click="handlePrimaryClick"
    />

    <KdsMenuButton
      class="kds-split-button-secondary"
      leading-icon="chevron-down"
      :size="props.size"
      :variant="props.variant"
      :disabled="props.disabled"
      aria-label="Change option"
      :items="menuItems"
      :style="{
        width: 'var(--kds-split-secondary-width)',
        borderRadius: 'var(--kds-split-secondary-border-radius)',
        gap: '0',
        '--kds-color-text-and-icon-selected':
          'var(--kds-split-secondary-text-color)',
        '--kds-color-background-selected-initial':
          'var(--kds-split-secondary-bg)',
        '--kds-color-background-selected-hover':
          'var(--kds-split-secondary-bg-hover)',
        '--kds-color-background-selected-active':
          'var(--kds-split-secondary-bg-active)',
        '--kds-border-action-selected': 'var(--kds-split-secondary-border)',
      }"
      @item-click="handleMenuItemClick"
    />
  </div>
</template>

<style scoped>
.kds-split-button {
  display: flex;

  &.filled {
    gap: var(--kds-spacing-container-0-10x);

    /* Override toggled colors so secondary button keeps filled appearance */
    --kds-split-secondary-text-color: var(
      --kds-color-text-and-icon-primary-inverted
    );
    --kds-split-secondary-bg: var(--kds-color-background-primary-bold-active);
    --kds-split-secondary-bg-hover: var(
      --kds-color-background-primary-bold-hover
    );
    --kds-split-secondary-bg-active: var(
      --kds-color-background-primary-bold-active
    );
    --kds-split-secondary-border: var(--kds-border-action-transparent);
  }

  &.outlined {
    gap: var(--kds-spacing-container-none);

    --kds-split-secondary-text-color: var(--kds-color-text-and-icon-neutral);
    --kds-split-secondary-bg: var(--kds-color-background-neutral-active);
    --kds-split-secondary-bg-hover: var(--kds-color-background-neutral-hover);
    --kds-split-secondary-bg-active: var(--kds-color-background-neutral-active);
    --kds-split-secondary-border: var(--kds-border-action-default);
  }

  &.transparent {
    --kds-split-secondary-text-color: var(--kds-color-text-and-icon-neutral);
    --kds-split-secondary-bg: var(--kds-color-background-neutral-active);
    --kds-split-secondary-bg-hover: var(--kds-color-background-neutral-hover);
    --kds-split-secondary-bg-active: var(--kds-color-background-neutral-active);
    --kds-split-secondary-border: var(--kds-border-action-transparent);
  }

  &.disabled {
    cursor: default;
  }
}

.kds-split-button-primary {
  flex-shrink: 1;
  min-width: 0;

  &.outlined {
    /* Override BaseButton's border to prevent double borders in outlined variant */
    border-right: none !important;
  }
}

.kds-split-button-secondary {
  flex-shrink: 0;
}

/* Size-specific styling */
.kds-split-button.xsmall {
  --kds-split-secondary-width: var(--kds-dimension-component-height-1-25x);
  --kds-split-secondary-border-radius: 0
    var(--kds-border-radius-container-0-25x)
    var(--kds-border-radius-container-0-25x) 0;

  .kds-split-button-primary {
    gap: var(--kds-spacing-container-0-12x);
    height: var(--kds-dimension-component-height-1-25x);
    padding-right: var(--kds-spacing-container-0-25x);
    padding-left: var(--kds-spacing-container-0-25x);
    font: var(--kds-font-base-interactive-xsmall-strong);
    border-radius: var(--kds-border-radius-container-0-25x)
      var(--kds-border-radius-container-none)
      var(--kds-border-radius-container-none)
      var(--kds-border-radius-container-0-25x);
  }
}

.kds-split-button.small {
  --kds-split-secondary-width: var(--kds-dimension-component-height-1-5x);
  --kds-split-secondary-border-radius: 0
    var(--kds-border-radius-container-0-37x)
    var(--kds-border-radius-container-0-37x) 0;

  .kds-split-button-primary {
    gap: var(--kds-spacing-container-0-12x);
    height: var(--kds-dimension-component-height-1-5x);
    padding-right: var(--kds-spacing-container-0-37x);
    padding-left: var(--kds-spacing-container-0-37x);
    font: var(--kds-font-base-interactive-small-strong);
    border-radius: var(--kds-border-radius-container-0-37x)
      var(--kds-border-radius-container-none)
      var(--kds-border-radius-container-none)
      var(--kds-border-radius-container-0-37x);
  }
}

.kds-split-button.medium {
  --kds-split-secondary-width: var(--kds-dimension-component-height-1-75x);
  --kds-split-secondary-border-radius: 0
    var(--kds-border-radius-container-0-37x)
    var(--kds-border-radius-container-0-37x) 0;

  .kds-split-button-primary {
    gap: var(--kds-spacing-container-0-12x);
    height: var(--kds-dimension-component-height-1-75x);
    padding-right: var(--kds-spacing-container-0-37x);
    padding-left: var(--kds-spacing-container-0-37x);
    font: var(--kds-font-base-interactive-medium-strong);
    border-radius: var(--kds-border-radius-container-0-37x)
      var(--kds-border-radius-container-none)
      var(--kds-border-radius-container-none)
      var(--kds-border-radius-container-0-37x);
  }
}

.kds-split-button.large {
  --kds-split-secondary-width: var(--kds-dimension-component-height-2-25x);
  --kds-split-secondary-border-radius: 0
    var(--kds-border-radius-container-0-50x)
    var(--kds-border-radius-container-0-50x) 0;

  .kds-split-button-primary {
    gap: var(--kds-spacing-container-none);
    height: var(--kds-dimension-component-height-2-25x);
    padding-right: var(--kds-spacing-container-0-5x);
    padding-left: var(--kds-spacing-container-0-5x);
    font: var(--kds-font-base-interactive-large-strong);
    border-radius: var(--kds-border-radius-container-0-50x)
      var(--kds-border-radius-container-none)
      var(--kds-border-radius-container-none)
      var(--kds-border-radius-container-0-50x);
  }
}
</style>
