<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from "vue";

import KdsIcon from "../Icon/KdsIcon.vue";
import type { KdsIconSize } from "../Icon/types.ts";
import KdsLoadingSpinner from "../LoadingSpinner/KdsLoadingSpinner.vue";

import BaseButton from "./BaseButton.vue";
import type {
  KdsProgressButtonProps,
  KdsProgressButtonState,
} from "./types.ts";

type LoadingSpinnerStyle = "onPrimary" | "onSurface";

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
      }, PROGRESS_DELAY_MS);
      return;
    }

    showSpinner.value = false;
  },
  { immediate: true },
);

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

async function onClick(event: MouseEvent) {
  emit("click", event);

  if (state.value !== "default" || !props.action) {
    return;
  }

  state.value = "progress";

  try {
    await props.action(event);

    state.value = "success";
    emit("success");
    await sleep(SUCCESS_DURATION_MS);

    state.value = "default";
    emit("done");
  } catch (error) {
    state.value = "error";
    emit("error", error);
    await sleep(ERROR_DURATION_MS);

    state.value = "default";
    emit("done");
  }
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
