<script setup lang="ts">
import { computed, reactive } from "vue";

interface Props {
  label: string;
  primary?: boolean;
  size?: "small" | "medium" | "large";
  backgroundColor?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "click"): void;
}>();

const reactiveProps = reactive(props);

const classes = computed(() => ({
  "storybook-button": true,
  "storybook-button-primary": reactiveProps.primary,
  "storybook-button-secondary": !reactiveProps.primary,
  [`storybook-button-${reactiveProps.size || "medium"}`]: true,
}));

const style = computed(() => ({
  backgroundColor: reactiveProps.backgroundColor,
}));

const onClick = () => {
  emit("click");
};
</script>

<template>
  <button type="button" :class="classes" :style="style" @click="onClick">
    {{ label }}
  </button>
</template>

<style scoped>
.storybook-button {
  display: inline-block;
  cursor: pointer;
  border: 0;
  border-radius: var(--kds-border-radius-container-pill);
  font-weight: var(--kds-core-font-weight-strong);
  line-height: var(--kds-core-line-height-singleline);
  font-family: var(--kds-core-font-family-roboto);
}

.storybook-button-primary {
  background-color: var(--kds-core-color-green-250);
  color: var(--kds-core-color-neutral-25);
}

.storybook-button-secondary {
  box-shadow: var(--kds-color-border-base-subtle);
  background-color: var(--kds-core-color-transparent);
  color: var(--kds-core-color-neutral-650);
}

.storybook-button-small {
  padding: var(--kds-spacing-container-0-75x) var(--kds-spacing-container-1x);
  font-size: var(--kds-core-font-size-scaled-0-75x);
}

.storybook-button-medium {
  padding: var(--kds-spacing-container-0-75x) var(--kds-spacing-container-1-25x);
  font-size: var(--kds-core-font-size-scaled-0-87x);
}

.storybook-button-large {
  padding: var(--kds-spacing-container-0-75x) var(--kds-spacing-container-1-5x);
  font-size: var(--kds-core-font-size-scaled-1x);
}
</style>
