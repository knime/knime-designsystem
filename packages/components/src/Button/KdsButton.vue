<script setup lang="ts" generic="UNUSED">
import BaseButton from "./BaseButton.vue";
import type { KdsButtonProps } from "./types";

const props = defineProps<KdsButtonProps>();

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<template>
  <BaseButton v-bind="props" @click="emit('click', $event)" />
</template>
