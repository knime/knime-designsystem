<script setup lang="ts">
import { KdsIcon, type KdsIconSize } from "../Icon";

import { kdsBadgeSize, kdsBadgeVariant } from "./enums";
import type { KdsBadgeProps, KdsBadgeSize } from "./types";

const { variant = kdsBadgeVariant.NEUTRAL, size = kdsBadgeSize.XSMALL, icon } =
  defineProps<KdsBadgeProps>();

const sizeToIconSize: Record<KdsBadgeSize, KdsIconSize> = {
  xxsmall: "xsmall",
  xsmall: "small",
};
</script>

<template>
  <span :class="['kds-badge', size, variant]">
    <KdsIcon v-if="icon" :name="icon" :size="sizeToIconSize[size]" />
    <span class="label-wrapper">{{ label }}</span>
  </span>
</template>

<style scoped>
.kds-badge {
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  border-radius: var(--kds-border-radius-container-pill);

  & .label-wrapper {
    min-width: 0;
    max-width: var(--kds-dimension-component-width-16x);
    padding: 0 var(--kds-spacing-container-0-12x);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &.xxsmall {
    height: var(--kds-dimension-component-height-1x);
    padding: 0 var(--kds-spacing-container-0-25x);
    font: var(--kds-font-base-title-xsmall);
  }

  &.xsmall {
    gap: var(--kds-spacing-container-0-12x);
    height: var(--kds-dimension-component-height-1-25x);
    padding: 0 var(--kds-spacing-container-0-37x);
    font: var(--kds-font-base-title-small);
  }

  &.neutral {
    color: var(--kds-color-text-and-icon-neutral);
    background-color: var(--kds-color-background-neutral-bold-initial);
    border: var(--kds-border-base-subtle);
  }

  &.info {
    color: var(--kds-color-text-and-icon-info);
    background-color: var(--kds-color-background-static-info);
    border: var(--kds-border-base-info);
  }

  &.warning {
    color: var(--kds-color-text-and-icon-warning);
    background-color: var(--kds-color-background-static-warning);
    border: var(--kds-border-base-warning);
  }

  &.success {
    color: var(--kds-color-text-and-icon-success);
    background-color: var(--kds-color-background-static-success);
    border: var(--kds-border-base-success);
  }

  &.error {
    color: var(--kds-color-text-and-icon-danger);
    background-color: var(--kds-color-background-static-danger);
    border: var(--kds-border-base-danger);
  }

  &.ghost {
    color: var(--kds-color-text-and-icon-neutral);
    background-color: transparent;
    border: var(--kds-border-base-subtle);
  }
}
</style>
