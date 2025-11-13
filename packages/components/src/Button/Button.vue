<script setup lang="ts" generic="UNUSED">
import BaseButton from "./BaseButton.vue";
import type { ButtonProps } from "./types";

const props = defineProps<ButtonProps>();

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<template>
  <BaseButton v-bind="props" @click="emit('click', $event)" />
</template>
