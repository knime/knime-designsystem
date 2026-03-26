<script setup lang="ts">
import { computed } from "vue";

import { resolveNuxtLinkComponent } from "../../util/nuxtComponentResolver";
import BaseButton from "../BaseButton.vue";

import type { KdsLinkButtonProps } from "./types";

const {
  variant = "filled",
  download,
  rel = null,
  target = null,
  ...props
} = defineProps<KdsLinkButtonProps>();

const component = computed(() => {
  if (props.disabled) {
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
    v-bind="props"
    :variant="variant"
    :download="download"
    :rel="rel"
    :target="target"
    :component="component"
    @click="emit('click', $event)"
  />
</template>
