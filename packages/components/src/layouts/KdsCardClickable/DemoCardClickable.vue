<script setup lang="ts">
import KdsCardClickable from "./KdsCardClickable.vue";
import type { KdsCardProps } from "./types";

const props = defineProps<KdsCardProps>();

const modelValue = defineModel<boolean>({ default: false });
</script>

<template>
  <KdsCardClickable v-model="modelValue" v-bind="props">
    <div class="wrapper">
      <div class="title">Demo for Storybook</div>
      <div class="text">
        Once upon a time in a land of dreams, there lived a whimsical tale
        waiting to be told.
      </div>
    </div>
  </KdsCardClickable>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px;

  & .title {
    font: var(--kds-font-base-title-large-strong);
  }

  & .text {
    font: var(--kds-font-base-body-small);
  }
}
</style>
