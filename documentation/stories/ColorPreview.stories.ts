import { capitalize } from "vue";
import type { Meta } from "@storybook/vue3";

import colors from "../../packages/styles/src/tokens/core/color.json";

import ColorPreview from "./ColorPreview.vue";

export default {
  title: "Core Concepts/Color Scales",
  component: ColorPreview,
  tags: ["!autodocs"],
} as Meta<typeof ColorPreview>;

export const ColorScales = () => {
  const colorGroups = colors.kds.core.color;
  const introText =
    "Explore the various color scales used in our design system. Each color group contains different " +
    "shades that can be used for various UI elements.";

  return {
    components: { ColorPreview },
    setup() {
      return { capitalize, colorGroups, introText };
    },
    template: `
      <div>
        <h1>Color Scales</h1>
        <p style="margin-bottom: var(--kds-spacing-container-1x);">
          {{ introText }}
        </p>
        <div v-for="(shades, groupName) in colorGroups" :key="groupName">
          <h2>{{ capitalize(groupName) }}</h2>
          <div style="display: flex; flex-wrap: wrap; margin-bottom: var(--kds-spacing-container-1x);">
            <ColorPreview
              v-if="shades.$value"
              color="var(--kds-core-color-transparent)"
            />
            <ColorPreview
              v-else
              v-for="(shade, shadeName) in shades"
              :key="shadeName"
              :color="shade.$value"
              :shade="shadeName"
            />
          </div>
        </div>
      </div>
    `,
  };
};
