<script setup lang="ts">
import { useLocalStorage } from "@vueuse/core";
import { computed, onMounted, ref, watch, type FunctionalComponent } from "vue";

type Props = {
  designVariants: any;
  component: FunctionalComponent | null;
};

const props = withDefaults(defineProps<Props>(), {
  designVariants: {},
  component: null,
});

const opacity = ref(0.5);
const enableOverlay = ref(false);
const figmaOpacity = computed(() =>
  enableOverlay.value ? "unset" : 1 - opacity.value,
);
const figmaImageUrlsById = ref<Record<string, string | null>>({});
const figmaImageScale = 4;

const figmaToken = useLocalStorage("storybook-figma-token", "");
function askFigmaToken() {
  const token = prompt("Please provide your Figma Personal Access Token:");
  if (token) {
    figmaToken.value = token;
  }
}

async function fetchFigmaImages() {
  if (!figmaToken.value) {
    console.error("No Figma token provided.");
    return;
  }

  const figmaUrls = Object.values(props.designVariants).flatMap((variant) =>
    Object.keys(variant.variants),
  );

  // Extract the key from first Figma URL
  const match = figmaUrls[0].match(
    /figma\.com\/design\/([^\/]+)\/[^?]+\?node-id=([\d\-]+)/,
  );

  if (!match) {
    console.error("Invalid Figma design URL:", figmaUrls[0]);
    return;
  }

  const key = match[1];
  const ids = figmaUrls
    .map((url) => {
      const match = url.match(/node-id=([\d\-]+)/);
      return match ? match[1] : null;
    })
    .filter((id): id is string => id !== null);

  await fetch(
    "https://api.figma.com/v1/images/" +
      key +
      "?ids=" +
      ids.join(",") +
      "&format=png&scale=" +
      figmaImageScale,
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
          value,
        ]),
      );
    });
}

function getFigmaImageByUrl(url: string) {
  const match = url.match(/node-id=([\d\-]+)/);
  if (!match) {
    return null;
  }
  const id = match[1];
  return figmaImageUrlsById.value[id];
}

watch(
  () => figmaToken.value,
  () => {
    fetchFigmaImages();
  },
  { immediate: true },
);
</script>

<template>
  <div class="design-comparator">
    <div v-if="!figmaToken" class="no-token-warning">
      To be able to fetch images from Figma, please
      <a
        href="https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens"
        target="_blank"
        >get a Personal Access Token</a
      >
      and provide it here:
      <button @click="askFigmaToken">set Figma token</button>
    </div>

    <div class="controls">
      Design&nbsp;
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        v-model="opacity"
        class="opacity-slider"
      />&nbsp;Implementation &nbsp;&nbsp;<label
        ><input type="checkbox" v-model="enableOverlay" /> Overlay</label
      >
    </div>

    <div class="groups">
      <div
        class="group"
        v-for="(set, groupName) in props.designVariants"
        :key="groupName"
      >
        <h3>{{ groupName }}</h3>
        <div
          v-for="(variantProps, figmaUrl) in set.variants"
          :key="figmaUrl"
          class="variant"
        >
          <img
            v-if="
              Object.keys(figmaImageUrlsById).length &&
              getFigmaImageByUrl(figmaUrl)
            "
            class="design"
            :src="getFigmaImageByUrl(figmaUrl)"
          />
          <div class="implementation" :style="{ opacity: opacity }">
            <component
              v-if="props.component"
              :is="props.component"
              v-bind="{ ...set.props, ...variantProps }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.design-comparator {
  & .no-token-warning {
    background: #ffdddd;
    border: 1px solid #ffaaaa;
    padding: 10px;
    margin-bottom: 10px;
  }

  & .controls {
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    font-size: 12px;

    & .opacity-slider {
      width: 50px;
    }
  }

  & .groups {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
  }

  & .variant {
    position: relative;
    margin-bottom: 10px;

    & .design {
      --scale: calc(1 / v-bind(figmaImageScale));

      position: absolute;
      top: 0;
      left: 0;
      opacity: v-bind(figmaOpacity);
      transform: scale(var(--scale));
      transform-origin: top left;
    }

    & .implementation {
      opacity: v-bind(opacity);
    }
  }
}
</style>
