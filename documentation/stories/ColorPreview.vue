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
  margin: var(--kds-spacing-container-0-75x);
  text-align: center;
}

.shade {
  margin-bottom: var(--kds-spacing-container-0-25x);
}

.color-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--kds-dimension-component-width-2-25x);
  height: var(--kds-dimension-component-height-2-25x);
  margin: var(--kds-spacing-container-0-75x) auto;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgb(0 0 0 / 20%);
}

.color-value {
  font-weight: var(--kds-core-font-weight-strong);
  color: var(--kds-color-text-and-icon-neutral);
}
</style>
