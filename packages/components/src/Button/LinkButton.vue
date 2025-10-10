<script setup lang="ts" generic="UNUSED">
import { computed } from "vue";

import { resolveNuxtLinkComponent } from "../util/nuxtComponentResolver";

import type { ButtonProps } from "./BaseButton.vue";
import BaseButton from "./BaseButton.vue";

/**
 * just some props, not the exact type as we don't want to add the dependency on vue-router
 * @see https://github.com/vuejs/router/blob/v4.5.1/packages/router/src/RouterLink.ts
 */
type RouterLinkProps = {
  /**
   * Route Location the link should navigate to when clicked on; passed to RouterLink/NuxtLink component if globally available
   */
  to: string | Record<string, unknown>; // not the exact type, but don't want to add the dependency on vue-router
  /**
   * Calls `router.replace` instead of `router.push`.
   */
  replace?: boolean;
};

/**
 * just some props, not the exact type as we don't want to add the dependency on nuxt
 * @see https://github.com/nuxt/nuxt/blob/v4.1.3/packages/nuxt/src/app/components/nuxt-link.ts
 */
type NuxtLinkProps = {
  /**
   * Nuxt: Forces the link to be rendered as an `a` tag, bypassing `RouterLink`.
   */
  external?: boolean;
  /**
   * Nuxt: If set to true, no rel attribute will be added to the link
   */
  noRel?: boolean;
  /**
   * Nuxt: When enabled will prefetch middleware, layouts and payloads of links in the viewport.
   */
  prefetch?: boolean;
  /**
   * Nuxt: Allows controlling when to prefetch links. By default, prefetch is triggered only on visibility.
   */
  prefetchOn?:
    | "visibility"
    | "interaction"
    | Partial<{
        visibility: boolean;
        interaction: boolean;
      }>;
  /**
   * Nuxt: Escape hatch to disable `prefetch` attribute.
   */
  noPrefetch?: boolean;
};

type AnchorElementProps = {
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

type LinkButtonProps = ButtonProps &
  RouterLinkProps &
  NuxtLinkProps &
  AnchorElementProps;

const props = defineProps<LinkButtonProps>();

const component = computed(() => {
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
