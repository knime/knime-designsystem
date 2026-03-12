<script setup lang="ts">
import BaseCheckbox from "./BaseCheckbox.vue";
import type { KdsCheckboxProps, KdsCheckboxValue } from "./types";

const {
  disabled = false,
  error = false,
  preserveSubTextSpace = false,
  label,
  title,
  subText,
} = defineProps<KdsCheckboxProps>();

const modelValue = defineModel<KdsCheckboxValue>({ default: false });
</script>

<template>
  <BaseCheckbox
    v-model="modelValue"
    :disabled="disabled"
    :error="error"
    :label="label"
    :title="title"
    :sub-text="subText"
    :preserve-sub-text-space="preserveSubTextSpace"
  />
</template>
