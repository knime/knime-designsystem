<script setup lang="ts">
import { type FunctionalComponent, shallowRef, watch } from "vue";

import type { IconName } from "@knime/kds-styles/icons/def";

export type { IconName };
export type IconSize = "x-small" | "small" | "medium" | "large";

const props = withDefaults(defineProps<{ name: IconName; size?: IconSize }>(), {
  name: "placeholder",
  size: "medium",
});

const iconCache = new Map<string, FunctionalComponent>();

const iconComponent = shallowRef<FunctionalComponent | null>(null);

watch(
  () => props.name,
  async (newName) => {
    if (iconCache.has(newName)) {
      iconComponent.value = iconCache.get(newName)!;
      return;
    }

    try {
      const module = await import(
        `../../node_modules/@knime/kds-styles/dist/icons/${newName}.svg`
      );
      iconCache.set(newName, module.default);
      iconComponent.value = module.default;
    } catch (error) {
      iconComponent.value = null;
    }
  },
  { immediate: true },
);
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

<style scoped>
.kds-icon {
  --icon-width: var(--kds-dimension-icon-1x);
  --icon-height: var(--kds-dimension-icon-1x);
  --icon-stroke-width: var(--kds-border-width-icon-stroke-m);

  display: inline-block;
  vertical-align: middle;
  shape-rendering: geometricprecision;
  width: var(--icon-width);
  height: var(--icon-height);
  stroke-width: var(--icon-stroke-width);

  &.x-small {
    --icon-width: var(--kds-dimension-icon-0-56x);
    --icon-height: var(--kds-dimension-icon-0-56x);
    --icon-stroke-width: var(--kds-border-width-icon-stroke-s);
  }

  &.small {
    --icon-width: var(--kds-dimension-icon-0-75x);
    --icon-height: var(--kds-dimension-icon-0-75x);
    --icon-stroke-width: var(--kds-border-width-icon-stroke-s);
  }

  &.large {
    --icon-width: var(--kds-dimension-icon-1-25x);
    --icon-height: var(--kds-dimension-icon-1-25x);
    --icon-stroke-width: var(--kds-border-width-icon-stroke-l);
  }
}
</style>
