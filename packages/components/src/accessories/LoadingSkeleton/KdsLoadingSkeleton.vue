<script setup lang="ts">
import { computed, toRefs } from "vue";

import type { KdsLoadingSkeletonProps } from "./types";

const props = withDefaults(defineProps<KdsLoadingSkeletonProps>(), {
  width: "100%",
  height: "100%",
  variant: "generic",
  repeat: 1,
  loading: true,
  repeatGap: "2px",
});

const { width, height } = toRefs(props);

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

const gradient = computed(
  () => "var(--kds-color-skeleton-bar-background-default)",
);

const styles = computed(() => {
  return {
    width: width.value,
    height: height.value,
    borderRadius: borderRadius.value,
    marginBottom: props.repeat > 1 ? props.repeatGap : "",
  };
});
</script>

<template>
  <div v-if="loading" class="wrapper">
    <div
      v-for="index in repeat"
      :key="index"
      class="skeleton-item"
      v-bind="$attrs"
      :style="styles"
    />
  </div>
  <slot v-else v-bind="$attrs" />
</template>

<style scoped>
@keyframes knight-rider {
  to {
    background-position-x: -200%;
  }
}

.wrapper {
  display: contents;
}

.skeleton-item {
  background: v-bind(gradient);
  background-size: 200% 100%;
  animation: 2s knight-rider linear infinite;
}
</style>
