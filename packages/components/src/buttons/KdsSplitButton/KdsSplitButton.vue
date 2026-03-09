<script setup lang="ts">
import { computed, ref, useTemplateRef } from "vue";

import KdsListItem from "../../forms/_helper/List/KdsListItem/KdsListItem.vue";
import KdsPopover from "../../overlays/Popover/KdsPopover.vue";
import BaseButton from "../BaseButton.vue";

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
  "click:secondary": [event: MouseEvent];
  "click:alternative": [
    action: KdsSplitButtonAlternativeAction,
    event: MouseEvent,
  ];
  "update:selectedActionId": [actionId: string];
}>();

const contextMenuOpen = ref(false);
const popoverEl = useTemplateRef("popoverEl");

const hasAlternativeActions = computed(
  () => props.alternativeActions?.some((action) => !action.disabled) ?? false,
);

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

function handlePrimaryClick(e: MouseEvent) {
  if (!props.disabled) {
    contextMenuOpen.value = false;
    emit("click:primary", e);
  }
}

function handleSecondaryClick(e: MouseEvent) {
  if (!props.disabled) {
    emit("click:secondary", e);
    if (hasAlternativeActions.value) {
      contextMenuOpen.value = !contextMenuOpen.value;
    }
  }
}

function handleAlternativeClick(
  action: KdsSplitButtonAlternativeAction,
  e: MouseEvent,
) {
  if (action.disabled || props.disabled) {
    return;
  }

  contextMenuOpen.value = false;
  emit("update:selectedActionId", action.id);
  emit("click:alternative", action, e);
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

    <div
      class="kds-split-button-secondary-anchor"
      :style="popoverEl?.anchorStyle"
    >
      <BaseButton
        :class="'kds-split-button-secondary'"
        :size="props.size"
        :variant="props.variant"
        :leading-icon="'chevron-down'"
        :disabled="props.disabled"
        :aria-label="'Change option'"
        @click="handleSecondaryClick"
      />
    </div>

    <KdsPopover
      v-if="hasAlternativeActions"
      ref="popoverEl"
      v-model="contextMenuOpen"
      role="menu"
      placement="bottom-right"
      :popover-aria-label="props.contextMenuAriaLabel || 'Alternative actions'"
    >
      <ul
        :aria-label="props.contextMenuAriaLabel || 'Alternative actions'"
        :class="'kds-menu-container'"
      >
        <KdsListItem
          v-for="action in props.alternativeActions"
          :id="action.id"
          :key="action.id"
          :label="action.label"
          :accessory="
            action.leadingIcon
              ? { type: 'icon', name: action.leadingIcon }
              : undefined
          "
          :disabled="action.disabled"
          :selected="action.id === props.selectedActionId"
          @click="handleAlternativeClick(action, $event)"
        />
      </ul>
    </KdsPopover>
  </div>
</template>

<style scoped>
.kds-split-button {
  display: flex;

  &.filled {
    gap: var(--kds-spacing-container-0-10x);
  }

  &.outlined {
    gap: var(--kds-spacing-container-none);
  }

  &.disabled {
    cursor: default;
  }
}

.kds-split-button-primary {
  &.outlined {
    /* Override BaseButton's border to prevent double borders in outlined variant */
    border-right: none !important;
  }
}

.kds-split-button-secondary-anchor {
  display: flex;
}

/* Size-specific styling */
.kds-split-button.xsmall {
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

  .kds-split-button-secondary {
    gap: var(--kds-spacing-container-none);
    width: var(--kds-dimension-component-height-1-25x) !important;
    height: var(--kds-dimension-component-height-1-25x);
    border-radius: var(--kds-border-radius-container-none)
      var(--kds-border-radius-container-0-25x)
      var(--kds-border-radius-container-0-25x)
      var(--kds-border-radius-container-none);
  }
}

.kds-split-button.small {
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

  .kds-split-button-secondary {
    gap: var(--kds-spacing-container-none);
    width: var(--kds-dimension-component-height-1-5x) !important;
    height: var(--kds-dimension-component-height-1-5x);
    border-radius: var(--kds-border-radius-container-none)
      var(--kds-border-radius-container-0-37x)
      var(--kds-border-radius-container-0-37x)
      var(--kds-border-radius-container-none);
  }
}

.kds-split-button.medium {
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

  .kds-split-button-secondary {
    gap: var(--kds-spacing-container-none);
    width: var(--kds-dimension-component-height-1-75x) !important;
    height: var(--kds-dimension-component-height-1-75x);
    border-radius: var(--kds-border-radius-container-none)
      var(--kds-border-radius-container-0-37x)
      var(--kds-border-radius-container-0-37x)
      var(--kds-border-radius-container-none);
  }
}

.kds-split-button.large {
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

  .kds-split-button-secondary {
    gap: var(--kds-spacing-container-none);
    width: var(--kds-dimension-component-height-2-25x) !important;
    height: var(--kds-dimension-component-height-2-25x);
    border-radius: var(--kds-border-radius-container-none)
      var(--kds-border-radius-container-0-50x)
      var(--kds-border-radius-container-0-50x)
      var(--kds-border-radius-container-none);

    /* background-color: var(--kds-color-background-primary-bold-initial); LOOK AGAIN */
  }

  .kds-menu-container {
    display: flex;
    flex-direction: column;
    gap: var(--kds-spacing-container-0-10x);
    padding: var(--kds-spacing-container-0-25x);
    margin: 0;
    list-style: none;
    background: var(--kds-color-surface-default);
    border-radius: var(--kds-border-radius-container-0-50x);
    box-shadow: var(--kds-elevation-level-3);
  }

  .kds-item-small {
    min-height: var(--kds-dimension-component-height-1-5x);
    border-radius: var(--kds-border-radius-container-0-25x);
  }
}
</style>
