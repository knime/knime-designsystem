<script setup lang="ts">
import { computed } from "vue";

import { resolveNuxtLinkComponent } from "../../util/nuxtComponentResolver";
import BaseButton from "../BaseButton.vue";

import type { KdsLinkButtonProps } from "./types";

const { disabled } = defineProps<KdsLinkButtonProps>();

const component = computed(() => {
  if (disabled) {
    return "button";
  }
  return resolveNuxtLinkComponent();
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<template>
  <BaseButton
    v-bind="$props"
    :component="component"
    @click="emit('click', $event)"
  />
</template>
