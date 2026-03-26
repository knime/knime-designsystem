<script setup lang="ts">
/**
 * Displays an icon from the KDS icon set. The icon color inherits the text
 * color of the parent element by default. When the `disabled` prop is set,
 * the color is overridden with the `kds.color.text-and-icon.disabled` token.
 */
import { toRef } from "vue";

import type { KdsIconProps } from "./types";
import useIcon from "./useIcon";

const {
  size = "medium",
  disabled = false,
  ...props
} = defineProps<KdsIconProps>();

const iconComponent = useIcon({
  name: toRef(() => props.name),
  folder: "icons",
});
</script>

<template>
  <component
    :is="iconComponent"
    v-if="iconComponent"
    :class="['kds-icon', size, { disabled }]"
    aria-hidden="true"
    focusable="false"
  />
  <span
    v-else
    :class="['kds-icon', size, { disabled }]"
    aria-hidden="true"
    focusable="false"
  />
</template>

<style scoped>
@import url("./styles.css");

.kds-icon.disabled {
  color: var(--kds-color-text-and-icon-disabled);
}
</style>
