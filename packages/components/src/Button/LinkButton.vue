<script setup lang="ts" generic="UNUSED">
import { computed } from "vue";

import { resolveNuxtLinkComponent } from "../util/nuxtComponentResolver";

import BaseButton, { type BaseButtonProps } from "./BaseButton.vue";

export type LinkButtonProps = BaseButtonProps & {
  // RouterLink props

  /**
   * Route Location the link should navigate to when clicked on; passed to RouterLink/NuxtLink component if globally available
   */
  to: string | Record<string, unknown>; // not the exact type, but don't want to add the dependency on vue-router
} & {
  // Anchor element attributes

  /**
   * If set to true, the link will be downloaded instead of navigating to it.
   */
  download?: boolean;
  /**
   * Where to display the linked URL, as the name for a browsing context.
   */
  target?: "_blank" | "_parent" | "_self" | "_top" | string | null;
  /**
   * A rel attribute value to apply on the link. In Nuxt, defaults to "noopener noreferrer" for external links.
   */
  rel?:
    | "noopener"
    | "noreferrer"
    | "nofollow"
    | "sponsored"
    | "ugc"
    | string
    | null;
};

const props = withDefaults(defineProps<LinkButtonProps>(), {
  download: undefined, // eslint-disable-line no-undefined
});

const component = computed(() => {
  if (props.disabled) {
    return "button";
  }
  return resolveNuxtLinkComponent();
});

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();
</script>

<template>
  <BaseButton
    v-bind="props"
    :component="component"
    @click="emit('click', $event)"
  />
</template>
