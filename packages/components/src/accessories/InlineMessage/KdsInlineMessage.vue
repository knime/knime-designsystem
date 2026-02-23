<script setup lang="ts">
import type { KdsInlineMessageProps } from "./types";

const props = withDefaults(defineProps<KdsInlineMessageProps>(), {
  title: "",
  variant: "info",
  message: undefined,
});
</script>

<template>
  <div class="kds-inline-message">
    {{ props.title }}
  </div>
</template>

<style scoped></style>
