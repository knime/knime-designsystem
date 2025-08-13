<script setup lang="ts">
import { toRef } from "vue";

import type { IconName } from "@knime/kds-styles/img/icons/def";

import { type IconSize } from "./types";
import useIcon from "./useIcon";

export type { IconName, IconSize };

const props = withDefaults(defineProps<{ name: IconName; size?: IconSize }>(), {
  name: "placeholder",
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
</template>

<style lang="css" scoped>
@import url("./styles.css");
</style>
