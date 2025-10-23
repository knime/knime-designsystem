<script setup lang="ts" generic="UNUSED">
import BaseButton from "./BaseButton.vue";
import type { BaseButtonProps } from "./types";

export type ButtonProps = BaseButtonProps & {}; // intersection needed for Storybook to work
const props = defineProps<ButtonProps>();

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<template>
  <BaseButton v-bind="props" @click="emit('click', $event)" />
</template>
