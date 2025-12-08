<script setup lang="ts">
import BaseButton from "./BaseButton.vue";
import type { KdsToggleButtonProps } from "./types";

const props = withDefaults(defineProps<KdsToggleButtonProps>(), {
  variant: "outlined",
});

const emit = defineEmits<{
  click: [event: MouseEvent];
  keydown: [event: KeyboardEvent];
}>();

function onClick(event: MouseEvent) {
  emit("click", event);
}

function onKeyDown(event: KeyboardEvent) {
  emit("keydown", event);
}
</script>

<template>
  <BaseButton
    v-bind="props"
    @click="onClick($event)"
    @keydown="onKeyDown($event)"
  />
</template>
