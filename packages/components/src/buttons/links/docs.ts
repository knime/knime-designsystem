const vueExampleCode = `html
// RouterLink{{componentName}}.vue
<script setup lang="ts">
import type { RouterLinkProps } from "vue-router";

import { {{componentName}}, type {{componentName}}Props } from "@knime/kds-components";

export type RouterLink{{componentName}}Props = Omit<{{componentName}}Props, "to"> & RouterLinkProps;

const props = defineProps<RouterLink{{componentName}}Props>();
</script>

<template>
  <{{componentName}} v-bind="props" />
</template>
`.trim();

const nuxtExampleCode = `html
// NuxtLink{{componentName}}.vue
<script setup lang="ts">
import type { NuxtLinkProps } from "#app";

import { {{componentName}}, type {{componentName}}Props } from "@knime/kds-components";

export type NuxtLink{{componentName}}Props = Omit<{{componentName}}Props, "to"> & NuxtLinkProps;

const props = defineProps<NuxtLink{{componentName}}Props>();
</script>

<template>
  <{{componentName}} v-bind="props" />
</template>
`.trim();

export function buildWrappingComponentDocs(componentName: string) {
  return (
    "\nDoes use `RouterLink`/`NuxtLink` if they are globally registered." +
    "\n\nTo support **typed routes and route-location objects**, please wrap it in the consuming app like this:" +
    "\n#### Vue\n" +
    `\`\`\`${vueExampleCode.replaceAll("{{componentName}}", componentName)}\`\`\`\n` +
    "#### Nuxt\n" +
    `\`\`\`${nuxtExampleCode.replaceAll("{{componentName}}", componentName)}\`\`\``
  );
}
