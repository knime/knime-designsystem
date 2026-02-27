import type { Meta, StoryObj } from "@storybook/vue3-vite";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook";

import KdsColorSwatch from "./KdsColorSwatch.vue";
import { kdsColorSwatchSizes, kdsColorSwatchTypes } from "./enums";

type Story = StoryObj<typeof KdsColorSwatch>;

const figmaBaseUrl =
  "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components";

const meta: Meta<typeof KdsColorSwatch> = {
  component: KdsColorSwatch,
  title: "Accessories/ColorSwatch",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A small semantic color swatch for node and variable categories. " +
          "Use `color` to select a predefined semantic token (mapped to `kds.color.nodes-and-variables.*`) " +
          "or pass a custom hex color string.",
      },
    },
    design: {
      type: "figma",
      url: `${figmaBaseUrl}?node-id=11832-185916`,
    },
  },
  argTypes: {
    color: {
      control: "select",
      options: [...kdsColorSwatchTypes, "#000000", "#f00"],
      description:
        "Semantic swatch type (maps to `kds.color.nodes-and-variables.*` tokens) or a hex color.",
      table: { category: "props" },
    },
    size: {
      control: "select",
      options: kdsColorSwatchSizes,
      description: "Size of the color swatch.",
      table: { category: "props" },
    },
    title: {
      control: "text",
      description: "Tooltip text shown on hover. Also used as aria label.",
      table: { category: "props" },
    },
  },
  args: {
    color: "learner",
    size: "small",
    title: "Learner color",
  },
};

export default meta;

export const Default: Story = {};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsColorSwatch,
    width: 120,
  }),
  args: {
    title:
      "Very long swatch tooltip text that should be preserved and not break rendering",
    color: "learner",
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsColorSwatch,
  designsToCompare: {
    Types: {
      props: { title: undefined },
      variants: {
        [`${figmaBaseUrl}?node-id=11832-185915`]: { color: "#fff" },
        [`${figmaBaseUrl}?node-id=11832-185917`]: { color: "learner" },
        [`${figmaBaseUrl}?node-id=11832-185918`]: { color: "manipulator" },
        [`${figmaBaseUrl}?node-id=11832-185919`]: { color: "predictor" },
        [`${figmaBaseUrl}?node-id=11832-185920`]: { color: "sink" },
        [`${figmaBaseUrl}?node-id=11832-185921`]: { color: "source" },
        [`${figmaBaseUrl}?node-id=11832-185922`]: { color: "visualizer" },
        [`${figmaBaseUrl}?node-id=11832-185923`]: { color: "other" },
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsColorSwatch,
  combinationsProps: [
    {
      color: kdsColorSwatchTypes,
      title: ["Color token"],
    },
    {
      color: ["#000", "#fff", "#f00", "#0f0", "#00f", "#ff0", "#0ff", "#f0f"],
      title: ["Example custom color"],
    },
  ],
});
