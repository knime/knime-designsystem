<script setup lang="ts">
import BaseCheckbox from "./BaseCheckbox.vue";
import type { KdsCheckboxProps, KdsCheckboxValue } from "./types";

const {
  disabled = false,
  error = false,
  preserveSubTextSpace = false,
  ...props
} = defineProps<KdsCheckboxProps>();

const modelValue = defineModel<KdsCheckboxValue>({ default: false });
</script>

<template>
  <BaseCheckbox
    v-model="modelValue"
    v-bind="props"
    :disabled="disabled"
    :error="error"
    :preserve-sub-text-space="preserveSubTextSpace"
  />
</template>
