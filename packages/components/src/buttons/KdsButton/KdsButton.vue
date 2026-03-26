<script setup lang="ts">
import BaseButton from "../BaseButton.vue";

import type { KdsButtonProps } from "./types";

const { variant = "filled", ...props } = defineProps<KdsButtonProps>();

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<template>
  <BaseButton
    v-bind="props"
    :variant="variant"
    @click="emit('click', $event)"
  />
</template>
