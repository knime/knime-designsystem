<script setup lang="ts" generic="UNUSED">
import type { ButtonProps } from "./BaseButton.vue";
import BaseButton from "./BaseButton.vue";

type LinkButtonProps = ButtonProps & {}; // intersection needed for Storybook to work
const props = defineProps<LinkButtonProps>();

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();
</script>

<template>
  <BaseButton v-bind="props" @click="emit('click', $event)" />
</template>
