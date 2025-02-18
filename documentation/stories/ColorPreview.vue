<script setup lang="ts">
defineProps<{
  color: string;
  shade?: string;
}>();
</script>

<template>
  <div class="color-preview">
    <div v-if="shade" class="shade">{{ shade }}</div>
    <div
      class="color-circle"
      :style="{ backgroundColor: color }"
      :title="color"
    />
  </div>
</template>

<style scoped>
.color-preview {
  text-align: center;
  margin: var(--kds-spacing-container-0-75x);
}

.shade {
  margin-bottom: var(--kds-spacing-container-0-25x);
}

.color-circle {
  width: var(--kds-dimension-component-width-2-25x);
  height: var(--kds-dimension-component-height-2-25x);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: var(--kds-spacing-container-0-75x) auto;
  box-shadow: 0 2px 5px rgb(0 0 0 / 20%);
}

.color-value {
  color: var(--kds-color-text-and-icon-neutral);
  font-weight: var(--kds-core-font-weight-strong);
}
</style>
