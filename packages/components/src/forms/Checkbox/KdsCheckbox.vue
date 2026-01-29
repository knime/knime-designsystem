<script setup lang="ts">
import BaseCheckbox from "./BaseCheckbox.vue";
import type { KdsCheckboxProps, KdsCheckboxValue } from "./types";

const props = withDefaults(defineProps<KdsCheckboxProps>(), {
  disabled: false,
  error: false,
  preserveSubTextSpace: false,
});

const modelValue = defineModel<KdsCheckboxValue>({ default: false });
</script>

<template>
  <BaseCheckbox
    v-model="modelValue"
    :disabled="props.disabled"
    :error="props.error"
    :label="props.label"
    :aria-label="props.ariaLabel"
    :sub-text="props.subText"
    :preserve-sub-text-space="props.preserveSubTextSpace"
  />
</template>
