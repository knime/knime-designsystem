<script setup lang="ts" generic="UNUSED">
import BaseButton, { type BaseButtonProps } from "./BaseButton.vue";

export type ButtonProps = BaseButtonProps & {}; // intersection needed for Storybook to work
const props = defineProps<ButtonProps>();

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();
</script>

<template>
  <BaseButton v-bind="props" @click="emit('click', $event)" />
</template>
