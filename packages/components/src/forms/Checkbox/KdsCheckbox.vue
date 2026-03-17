<script setup lang="ts">
import BaseCheckbox from "./BaseCheckbox.vue";
import type { KdsCheckboxProps, KdsCheckboxValue } from "./types";

defineProps<KdsCheckboxProps>();

const modelValue = defineModel<KdsCheckboxValue>({ default: false });
</script>

<template>
  <BaseCheckbox v-model="modelValue" v-bind="$props" />
</template>
