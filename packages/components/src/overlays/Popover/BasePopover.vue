<template>
  <div class="content">
    <slot />
  </div>
</template>

<style scoped>
.content {
  max-width: 354px;
  padding: var(--kds-spacing-container-0-5x) var(--kds-spacing-container-0-75x);
  font: var(--kds-font-base-body-small);
  color: var(--kds-color-text-and-icon-neutral);
  background: var(--kds-color-surface-default);
  border-radius: var(--kds-border-radius-container-0-37x);
  box-shadow: var(--kds-elevation-level-3);
}
</style>
