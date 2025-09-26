<script setup lang="ts">
import { computed, onMounted, ref, type FunctionalComponent } from "vue";

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

function getFigmaImageByUrl(url: string) {
  const match = url.match(/node-id=([\d\-]+)/);
  if (!match) {
    return null;
  }
  const id = match[1];
  return figmaImageUrlsById.value[id];
}

onMounted(async () => {
  if (!import.meta.env.STORYBOOK_FIGMA_TOKEN) {
    console.error("No Figma token provided in env file");
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

  // TODO this call should happen on the server-side and the resulting images stored locally
  await fetch(
    "https://api.figma.com/v1/images/" +
      key +
      "?ids=" +
      ids.join(",") +
      "&format=png&scale=" +
      figmaImageScale,
    {
      headers: {
        "X-Figma-Token": import.meta.env.STORYBOOK_FIGMA_TOKEN,
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
});
</script>

<template>
  <div class="design-comparator">
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
