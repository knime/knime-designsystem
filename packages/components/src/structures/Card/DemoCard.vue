<script setup lang="ts">
import KdsCard from "./KdsCard.vue";
import type { KdsCardProps } from "./types";

const { content = "", ...props } = defineProps<
  KdsCardProps & { content?: string }
>();

const modelValue = defineModel<boolean>({ default: false });
</script>

<template>
  <KdsCard v-model="modelValue" v-bind="props">
    <div class="wrapper">
      <div class="title">Demo for Storybook</div>
      <div class="text">
        Once upon a time in a land of dreams, there lived a whimsical tale
        waiting to be told.
        {{ content }}
      </div>
    </div>
  </KdsCard>
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
