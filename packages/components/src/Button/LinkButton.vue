<script setup lang="ts" generic="UNUSED">
import { computed } from "vue";

import { resolveNuxtLinkComponent } from "../util/nuxtComponentResolver";

import BaseButton from "./BaseButton.vue";
import type { LinkButtonProps } from "./types";

const props = withDefaults(defineProps<LinkButtonProps>(), {
  download: undefined,
  rel: null,
  target: null,
});

const component = computed(() => {
  if (props.disabled) {
    return "button";
  }
  return resolveNuxtLinkComponent();
});

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();
</script>

<template>
  <BaseButton
    v-bind="props"
    :component="component"
    @click="emit('click', $event)"
  />
</template>
