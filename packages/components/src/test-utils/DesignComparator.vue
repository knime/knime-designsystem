<script setup lang="ts">
import { type Component, computed, ref, watch } from "vue";
import { useLocalStorage } from "@vueuse/core";

const figmaImageScale = 4;

type FigmaDesignURL =
  `https://www.figma.com/design/${string}/${string}?node-id=${string}`;

export type DesignsToCompare = Record<
  string,
  {
    props: Record<string, unknown>;
    variants: Record<
      FigmaDesignURL,
      Record<string, unknown> & {
        parameters?: {
          pseudo?: {
            hover?: boolean;
            active?: boolean;
            focus?: boolean;
            focusVisible?: boolean;
          };
        };
      }
    >;
  }
>;

type Props = {
  designsToCompare: DesignsToCompare;
  component: Component;
};

const props = defineProps<Props>();

const defaultOpacity = 0.5;
const opacity = ref(defaultOpacity);
const enableOverlay = ref(false);
const figmaOpacity = computed(() =>
  enableOverlay.value ? "unset" : 1 - opacity.value,
);
const figmaImageUrlsById = ref<Record<string, string | null>>({});
const loading = ref(false);

const figmaToken = import.meta.env.STORYBOOK_FIGMA_TOKEN
  ? ref(import.meta.env.STORYBOOK_FIGMA_TOKEN)
  : useLocalStorage("storybook-figma-token", "");

function getIdFromFigmaUrl(url: string): string | null {
  const match = url.match(/node-id=([\d-]+)/);
  return match ? match[1] : null;
}

async function fetchFigmaImages() {
  if (!figmaToken.value) {
    console.error("No Figma token provided."); // eslint-disable-line no-console
    return;
  }

  if (!props.designsToCompare) {
    console.error("No designs to compare provided."); // eslint-disable-line no-console
    return;
  }

  const figmaUrls = Object.values(props.designsToCompare).flatMap((design) =>
    Object.keys(design.variants),
  );

  // Extract the key from first Figma URL, assuming all designs are from the same Figma file
  const match = figmaUrls[0].match(/figma\.com\/design\/([^/]+)\//);
  if (!match) {
    console.error("Invalid Figma design URL:", figmaUrls[0]); // eslint-disable-line no-console
    return;
  }
  const key = match[1];

  const ids = figmaUrls
    .map((url) => getIdFromFigmaUrl(url))
    .filter((id): id is string => id !== null);
  loading.value = true;
  await fetch(
    `https://api.figma.com/v1/images/${key}?ids=${ids.join(
      ",",
    )}&format=png&scale=${figmaImageScale}`,
    {
      headers: {
        "X-Figma-Token": figmaToken.value,
      },
    },
  )
    .then((response) => response.json())
    .then((data) => {
      figmaImageUrlsById.value = Object.fromEntries(
        Object.entries(data.images).map(([key, value]) => [
          key.replace(":", "-"),
          value as string,
        ]),
      );
      loading.value = false;
    });
}

const figmaImageByUrl = computed(() => {
  return (url: string) => {
    const id = getIdFromFigmaUrl(url);
    if (!id) {
      return undefined;
    }
    return figmaImageUrlsById.value[id] || undefined;
  };
});

watch(
  () => figmaToken.value,
  () => {
    fetchFigmaImages();
  },
  { immediate: true },
);

function onPaste(event: ClipboardEvent) {
  const token = event.clipboardData?.getData("text");
  if (token) {
    figmaToken.value = token;
  }
}
</script>

<template>
  <div class="design-comparator">
    This view overlays the design in Figma with the component implementation.
    It's especially useful for checking sizes and positioning of elements.
    <div v-if="!figmaToken" class="no-token-warning">
      To be able to fetch images from Figma, please
      <a
        href="https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens"
        target="_blank"
        >get a Personal Access Token</a
      >
      with <code>file_content:read</code> permission and paste it here:
      <input type="text" placeholder="Figma Token" @paste="onPaste" />
    </div>

    <div class="controls">
      Design&nbsp;
      <input
        v-model="opacity"
        type="range"
        min="0"
        max="1"
        step="0.01"
        class="opacity-slider"
      />&nbsp;Implementation &nbsp;&nbsp;<label
        ><input v-model="enableOverlay" type="checkbox" /> Overlay</label
      >
      <span v-if="loading" class="loading">Loading images from Figma…</span>
    </div>

    <div class="groups">
      <div
        v-for="(set, groupName) in props.designsToCompare"
        :key="groupName"
        class="group"
      >
        <h5>{{ groupName }}</h5>
        <div
          v-for="(variantProps, figmaUrl) in set.variants"
          :key="figmaUrl"
          class="variant"
        >
          <img
            v-if="figmaImageByUrl(figmaUrl)"
            class="design"
            :src="figmaImageByUrl(figmaUrl)"
            alt="Figma snapshot"
          />
          <div class="implementation" :style="{ opacity: opacity }">
            <div
              :class="{
                'pseudo-hover-all': Boolean(
                  variantProps.parameters?.pseudo?.hover,
                ),
                'pseudo-active-all': Boolean(
                  variantProps.parameters?.pseudo?.active,
                ),
                'pseudo-focus-all': Boolean(
                  variantProps.parameters?.pseudo?.focus,
                ),
                'pseudo-focus-visible-all': Boolean(
                  variantProps.parameters?.pseudo?.focusVisible,
                ),
              }"
            >
              <component
                :is="props.component"
                v-if="props.component"
                v-bind="{ ...set.props, ...variantProps }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@keyframes fade {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

.design-comparator {
  & .no-token-warning {
    padding: 10px;
    margin-bottom: 10px;
    color: var(--kds-color-text-and-icon-info);
    background: var(--kds-color-background-static-info);
  }

  & .controls {
    position: sticky;
    top: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    padding-top: 5px;
    margin-bottom: 10px;
    font-size: 12px;
    background-color: white;

    & .opacity-slider {
      width: 50px;
    }

    & .loading {
      margin-left: 20px;
      font-style: italic;
      animation: fade 1s ease-in-out infinite;
    }
  }

  & .groups {
    display: flex;
    flex-wrap: wrap;
    gap: 15px 30px;
  }

  & h5 {
    margin: 0;
  }

  & .variant {
    --padding: 10px;

    position: relative;
    padding: var(--padding);

    & .design {
      --scale: calc(1 / v-bind(figmaImageScale));

      position: absolute;
      top: var(--padding);
      left: var(--padding);
      pointer-events: none;
      opacity: v-bind(figmaOpacity);
      transform: scale(var(--scale));
      transform-origin: top left;
    }

    & .implementation {
      display: flex;
      align-items: flex-start;
      opacity: v-bind(opacity);
    }
  }
}
</style>
