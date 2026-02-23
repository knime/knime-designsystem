<script setup lang="ts">
import BaseButton from "../BaseButton.vue";

import type { KdsButtonProps } from "./types";

const props = withDefaults(defineProps<KdsButtonProps>(), {
  variant: "filled",
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<template>
  <BaseButton v-bind="props" @click="emit('click', $event)" />
</template>
