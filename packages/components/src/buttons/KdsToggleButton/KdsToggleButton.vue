<script setup lang="ts">
import BaseButton from "../BaseButton.vue";

import type { KdsToggleButtonProps } from "./types";

const props = withDefaults(defineProps<KdsToggleButtonProps>(), {
  variant: "outlined",
});

const modelValue = defineModel<boolean>({ default: false });
</script>

<template>
  <BaseButton
    v-bind="props"
    :toggled="modelValue"
    :aria-pressed="modelValue"
    @click="modelValue = !modelValue"
  />
</template>
