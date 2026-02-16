<script setup lang="ts">
import { ref } from "vue";

import { KdsPopover } from "../../../overlays";

import ColorPicker from "./ColorPicker.vue";

const activatorEl = ref<HTMLButtonElement | null>(null);

const modelValue = defineModel<string>();
</script>

<template>
  <KdsPopover :activator-el="activatorEl">
    <ColorPicker v-model="modelValue" />
  </KdsPopover>
</template>
