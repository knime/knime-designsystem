<script setup lang="ts">
import BasePopover from "./BasePopover.vue";
</script>

<template>
  <BasePopover style="width: fit-content; max-width: 353px">
    <slot />
  </BasePopover>
</template>
