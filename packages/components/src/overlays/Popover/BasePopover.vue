<template>
  <div class="content">
    <div class="header">
      <div class="spacer" />
      <KdsButton
        leading-icon="x-close"
        variant="transparent"
        size="small"
        :title="CLOSE_TITLE"
        :aria-label="CLOSE_TITLE"
        @click="emit('close')"
      />
    </div>

    <div class="body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import KdsButton from "../../buttons/KdsButton.vue";

const emit = defineEmits<{
  close: [];
}>();

const CLOSE_TITLE = "Close popover";
</script>

<style scoped>
.content {
  max-width: 354px;
  padding: var(--kds-spacing-container-0-5x) var(--kds-spacing-container-0-75x);
  font: var(--kds-font-base-body-small);
  color: var(--kds-color-text-and-icon-neutral);
  background: var(--kds-color-surface-default);
  border-radius: var(--kds-border-radius-container-0-37x);
  box-shadow: var(--kds-elevation-level-3);

  & .header {
    display: flex;
    align-items: center;
    justify-content: right;
    margin-bottom: var(--kds-spacing-container-0-25x);

    & .spacer {
      flex: 1 1 auto;
    }
  }

  & .body {
    display: block;
  }
}
</style>
