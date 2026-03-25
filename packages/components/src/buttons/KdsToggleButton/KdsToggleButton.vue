<script setup lang="ts">
import BaseButton from "../BaseButton.vue";

import type { KdsToggleButtonProps } from "./types";

const { variant = "outlined", ...props } = defineProps<KdsToggleButtonProps>();

const modelValue = defineModel<boolean>({ default: false });
</script>

<template>
  <BaseButton
    v-bind="props"
    :variant="variant"
    :toggled="modelValue"
    :aria-pressed="modelValue"
    @click="modelValue = !modelValue"
  />
</template>
