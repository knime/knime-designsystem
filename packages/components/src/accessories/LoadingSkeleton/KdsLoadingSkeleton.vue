<script setup lang="ts">
import { computed, toRefs } from "vue";

import type { KdsLoadingSkeletonProps } from "./types";

const props = withDefaults(defineProps<KdsLoadingSkeletonProps>(), {
  width: "100%",
  height: "var(--kds-spacing-container-1-25x)",
  variant: "generic",
  repeat: 1,
  loading: true,
  repeatGap: "var(--kds-spacing-container-0-12x)",
});

const { width, height } = toRefs(props);
const isCombinedVariant = computed(() => props.variant === "combined");

const borderRadius = computed(() => {
  if (props.borderRadius) {
    return props.borderRadius;
  }

  const valueMap: Partial<
    Record<NonNullable<KdsLoadingSkeletonProps["variant"]>, string>
  > = {
    button: "var(--kds-border-radius-container-pill)",
    "icon-button": "50%",
    "rounded-sm": "var(--kds-border-radius-container-0-25x)",
    "rounded-md": "var(--kds-border-radius-container-0-50x)",
  };

  return (
    valueMap[props.variant ?? "generic"] ??
    "var(--kds-border-radius-container-pill)"
  );
});

const styles = computed(() => {
  return {
    width: width.value,
    height: height.value,
    borderRadius: borderRadius.value,
    marginBottom: props.repeat > 1 ? props.repeatGap : "",
  };
});

const combinedLayoutStyles = computed(() => {
  const combinedStyles: Record<string, string> = {
    width: width.value,
  };

  if (props.height !== "var(--kds-spacing-container-1-25x)") {
    combinedStyles["--kds-loading-skeleton-combined-icon-size"] = height.value;
    combinedStyles["--kds-loading-skeleton-combined-line-height"] =
      height.value;
  }

  return combinedStyles;
});
</script>

<template>
  <div v-if="loading" class="wrapper">
    <div
      v-if="isCombinedVariant"
      class="combined-layout"
      v-bind="$attrs"
      :style="combinedLayoutStyles"
    >
      <div class="skeleton-item combined-icon" />
      <div class="combined-lines">
        <div class="skeleton-item combined-line" />
        <div class="skeleton-item combined-line" />
      </div>
    </div>
    <div v-else>
      <div
        v-for="index in repeat"
        :key="index"
        class="skeleton-item"
        v-bind="$attrs"
        :style="styles"
      />
    </div>
  </div>
  <slot v-else v-bind="$attrs" />
</template>

<style scoped>
@keyframes knight-rider {
  from {
    background-position-x: -100%;
  }

  to {
    background-position-x: 100%;
  }
}

.wrapper {
  display: contents;
  width: 100%;
}

.combined-layout {
  display: flex;
  gap: var(--kds-spacing-container-0-75x);
  align-items: center;
  width: 100%;
  min-width: 0;
  max-width: 100%;
}

.combined-lines {
  display: grid;
  flex: 1;
  gap: var(--kds-spacing-container-0-5x);
  min-width: 0;
}

.skeleton-item {
  background-color: var(--kds-color-surface-muted);
  background-image: linear-gradient(
    90deg,
    color-mix(in srgb, var(--kds-color-text-and-icon-neutral) 2%, transparent)
      0%,
    color-mix(in srgb, var(--kds-color-text-and-icon-neutral) 15%, transparent)
      25%,
    color-mix(in srgb, var(--kds-color-text-and-icon-neutral) 2%, transparent)
      50%,
    transparent 100%
  );
  background-repeat: no-repeat;
  background-size: 200% 100%;
  animation: knight-rider 2s linear 200ms infinite;
}

.combined-icon {
  flex: 0 0 auto;
  width: var(
    --kds-loading-skeleton-combined-icon-size,
    var(--kds-spacing-container-2x)
  );
  height: var(
    --kds-loading-skeleton-combined-icon-size,
    var(--kds-spacing-container-2x)
  );
  border-radius: var(--kds-border-radius-container-pill);
}

.combined-line {
  width: 100%;
  height: var(
    --kds-loading-skeleton-combined-line-height,
    var(--kds-spacing-container-0-75x)
  );
  border-radius: var(--kds-border-radius-container-0-25x);
}
</style>
