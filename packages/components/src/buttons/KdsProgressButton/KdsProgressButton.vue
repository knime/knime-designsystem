<script setup lang="ts">
import { computed } from "vue";

import type { KdsIconSize } from "../../accessories";
import KdsIcon from "../../accessories/Icon/KdsIcon.vue";
import KdsLoadingSpinner from "../../accessories/LoadingSpinner/KdsLoadingSpinner.vue";
import BaseButton from "../BaseButton.vue";

import type { KdsProgressButtonProps, KdsProgressButtonState } from "./types";

const props = withDefaults(defineProps<KdsProgressButtonProps>(), {
  variant: "filled",
  size: "medium",
  disabled: false,
});

const emit = defineEmits<{
  /**
   * Fired when the button is clicked.
   *
   * This event is only emitted when `state` is `default`.
   * Clicks while in `progress`, `success` or `error` are ignored.
   */
  click: [event: MouseEvent];
}>();

const state = defineModel<KdsProgressButtonState>("state", {
  default: "default",
});

const iconSize = computed<KdsIconSize>(() => {
  if (props.size === "xsmall") {
    return "small";
  }
  return props.size;
});

function onClick(event: MouseEvent) {
  event.preventDefault();

  if (state.value !== "default") {
    return;
  }

  emit("click", event);
}

const baseButtonProps = computed(() => ({
  variant: props.variant,
  size: props.size,
  disabled: props.disabled,
  success: state.value === "success",
  error: state.value === "error",
  title: props.ariaLabel,
  label: props.label,
  leadingIcon: props.leadingIcon,
  ariaLabel: props.ariaLabel,
}));
</script>

<template>
  <BaseButton
    v-bind="baseButtonProps"
    class="kds-progress-button"
    :data-kds-progress-state="state"
    @click="onClick"
  >
    <template #leading>
      <span :class="['leading', iconSize]">
        <span class="leading-icon" :data-visible="state !== 'progress'">
          <KdsIcon :name="props.leadingIcon" :size="iconSize" />
        </span>
        <span class="spinner" :data-visible="state === 'progress'">
          <KdsLoadingSpinner
            :size="iconSize"
            :variant="props.variant === 'filled' ? 'onPrimary' : 'onSurface'"
          />
        </span>
      </span>
    </template>
  </BaseButton>
</template>

<style scoped>
.leading {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--kds-dimension-icon-1x);
  height: var(--kds-dimension-icon-1x);

  &.xsmall {
    width: var(--kds-dimension-icon-0-56x);
    height: var(--kds-dimension-icon-0-56x);
  }

  &.small {
    width: var(--kds-dimension-icon-0-75x);
    height: var(--kds-dimension-icon-0-75x);
  }

  &.large {
    width: var(--kds-dimension-icon-1-25x);
    height: var(--kds-dimension-icon-1-25x);
  }
}

.leading-icon,
.spinner {
  position: absolute;
  inset: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 200ms ease-out;
}

.leading-icon[data-visible="true"],
.spinner[data-visible="true"] {
  opacity: 1;
}
</style>
