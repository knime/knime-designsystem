<script setup lang="ts">
/**
 * Displays an icon from the KDS icon set. The icon color inherits the text color of the parent element.
 */
import { toRef } from "vue";

import type { IconName, IconSize } from "./types";
import useIcon from "./useIcon";

const props = withDefaults(defineProps<{ name: IconName; size?: IconSize }>(), {
  size: "medium",
});

const iconComponent = useIcon({ name: toRef(props, "name"), folder: "icons" });
</script>

<template>
  <component
    :is="iconComponent"
    v-if="iconComponent"
    :class="['kds-icon', props.size]"
    aria-hidden="true"
    focusable="false"
  />
  <span
    v-else
    :class="['kds-icon', props.size]"
    aria-hidden="true"
    focusable="false"
  />
</template>

<style scoped>
@import url("./styles.css");
</style>
