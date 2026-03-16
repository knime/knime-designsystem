<script setup lang="ts">
import BaseButton from "../BaseButton.vue";

import type { KdsButtonProps } from "./types";

// Sets the "filled" default for $props.variant, used via v-bind="$props" in the template.
const { variant: _variant = "filled" } = defineProps<KdsButtonProps>();

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<template>
  <BaseButton v-bind="$props" @click="emit('click', $event)" />
</template>
