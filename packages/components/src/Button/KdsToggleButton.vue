<script setup lang="ts">
import BaseButton from "./BaseButton.vue";
import type { KdsToggleButtonProps } from "./types";

const props = withDefaults(defineProps<KdsToggleButtonProps>(), {
  variant: "outlined",
});

const selected = defineModel<boolean>("selected", { default: false });
</script>

<template>
  <BaseButton
    v-bind="props"
    :selected="selected"
    @click="selected = !selected"
  />
</template>
