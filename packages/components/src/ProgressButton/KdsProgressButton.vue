<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from "vue";

import BaseButton from "../Button/BaseButton.vue";
import KdsIcon from "../Icon/KdsIcon.vue";
import type { KdsIconSize } from "../Icon/types";
import KdsLoadingSpinner from "../LoadingSpinner/KdsLoadingSpinner.vue";

import type { KdsProgressButtonProps, KdsProgressButtonState } from "./types";

type LoadingSpinnerStyle = "onPrimary" | "onSurface";

const props = withDefaults(defineProps<KdsProgressButtonProps>(), {
  variant: "filled",
  size: "medium",
  disabled: false,
  progressDelayMs: 200,
  successDurationMs: 750,
  errorDurationMs: 1000,
});

const state = defineModel<KdsProgressButtonState>("state", {
  default: "default",
});

const emit = defineEmits<{
  click: [event: MouseEvent];
  success: [];
  error: [error: unknown];
  done: [];
}>();

const iconSize = computed<KdsIconSize>(() => {
  if (props.size === "xsmall") {
    return "small";
  }
  return props.size;
});

const spinnerStyle = computed<LoadingSpinnerStyle>(() => {
  if (props.variant === "filled") {
    return "onPrimary";
  }
  return "onSurface";
});

const showSpinner = ref(false);
let spinnerDelayTimer: number | undefined;

function clearSpinnerDelayTimer() {
  if (spinnerDelayTimer !== undefined) {
    window.clearTimeout(spinnerDelayTimer);
    spinnerDelayTimer = undefined;
  }
}

watch(
  () => state.value,
  (nextState) => {
    clearSpinnerDelayTimer();

    if (nextState === "progress") {
      showSpinner.value = false;
      spinnerDelayTimer = window.setTimeout(() => {
        showSpinner.value = true;
      }, props.progressDelayMs);
      return;
    }

    showSpinner.value = false;
  },
  { immediate: true },
);

const runId = ref(0);

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

async function runAction(event: MouseEvent) {
  if (!props.action) {
    return;
  }

  const currentRunId = ++runId.value;

  state.value = "progress";

  try {
    await props.action(event);

    if (currentRunId !== runId.value) {
      return;
    }

    state.value = "success";
    emit("success");
    await sleep(props.successDurationMs);

    if (currentRunId !== runId.value) {
      return;
    }

    state.value = "default";
    emit("done");
  } catch (error) {
    if (currentRunId !== runId.value) {
      return;
    }

    state.value = "error";
    emit("error", error);
    await sleep(props.errorDurationMs);

    if (currentRunId !== runId.value) {
      return;
    }

    state.value = "default";
    emit("done");
  }
}

function onClick(event: MouseEvent) {
  if (state.value !== "default") {
    return;
  }

  emit("click", event);

  if (!props.action) {
    return;
  }

  runAction(event);
}

const baseButtonProps = computed(() => ({
  variant: props.variant,
  size: props.size,
  disabled: props.disabled,
  success: state.value === "success",
  error: state.value === "error",
  title: props.title,
  label: props.label,
  leadingIcon: props.leadingIcon,
  ariaLabel: props.ariaLabel,
}));

onBeforeUnmount(() => {
  clearSpinnerDelayTimer();
  runId.value++;
});
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
          <KdsLoadingSpinner :size="iconSize" :style="spinnerStyle" />
        </span>
      </span>
    </template>
  </BaseButton>
</template>

<style>
.kds-progress-button.button {
  transition:
    background-color 300ms ease-out,
    border-color 200ms ease-out,
    color 200ms ease-out;
}

/* Match the ProgressButton spec: 800ms ease-in-out per loop */
.kds-progress-button .kds-loading-spinner .loader {
  animation-duration: 800ms;
  animation-timing-function: ease-in-out;
}
</style>

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
