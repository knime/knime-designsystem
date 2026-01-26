<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useTimeoutFn } from "@vueuse/core";

import KdsIcon from "../Icon/KdsIcon.vue";
import type { KdsIconSize } from "../Icon/types.ts";
import KdsLoadingSpinner from "../LoadingSpinner/KdsLoadingSpinner.vue";

import BaseButton from "./BaseButton.vue";
import type {
  KdsProgressButtonProps,
  KdsProgressButtonState,
} from "./types.ts";

const PROGRESS_DELAY_MS = 200;
const SUCCESS_DURATION_MS = 750;
const ERROR_DURATION_MS = 1000;

const props = withDefaults(defineProps<KdsProgressButtonProps>(), {
  variant: "filled",
  size: "medium",
  disabled: false,
});

const state = defineModel<KdsProgressButtonState>("state", {
  default: "default",
});

const iconSize = computed<KdsIconSize>(() => {
  if (props.size === "xsmall") {
    return "small";
  }
  return props.size;
});

const showSpinner = ref(false);
const { start: startSpinnerDelay, stop: stopSpinnerDelay } = useTimeoutFn(
  () => {
    showSpinner.value = true;
  },
  PROGRESS_DELAY_MS,
  { immediate: false },
);

watch(
  () => state.value,
  (nextState) => {
    stopSpinnerDelay();
    showSpinner.value = false;

    if (nextState === "progress") {
      startSpinnerDelay();
    }
  },
  { immediate: true },
);

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

async function onClick() {
  if (state.value !== "default") {
    return;
  }

  state.value = "progress";

  try {
    await props.action();

    state.value = "success";
    await sleep(SUCCESS_DURATION_MS);
    state.value = "default";
  } catch {
    state.value = "error";
    await sleep(ERROR_DURATION_MS);
    state.value = "default";
  }
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
        <span class="leading-icon" :data-visible="!showSpinner">
          <KdsIcon :name="props.leadingIcon" :size="iconSize" />
        </span>
        <span class="spinner" :data-visible="showSpinner">
          <KdsLoadingSpinner
            :size="iconSize"
            :style="props.variant === 'filled' ? 'onPrimary' : 'onSurface'"
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
