import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook";
import { kdsIconNames } from "../Icon";

import KdsBadge from "./KdsBadge.vue";
import { kdsBadgeSize, kdsBadgeSizes, kdsBadgeVariants } from "./enums";

type Story = StoryObj<typeof KdsBadge>;

const figmaBaseUrl =
  "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components";

const meta: Meta<typeof KdsBadge> = {
  component: KdsBadge,
  title: "Accessories/Badge",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A compact, pill-shaped label used to highlight status, category, or metadata. " +
          "Supports semantic variants (neutral, info, warning, success, error, ghost), " +
          "two sizes, and an optional leading icon.",
      },
    },
    design: {
      type: "figma",
      url: `${figmaBaseUrl}?node-id=941-1677`,
    },
  },
  argTypes: {
    label: {
      control: "text",
      description: "Text content of the badge.",
      table: { category: "props" },
    },
    variant: {
      control: "select",
      options: kdsBadgeVariants,
      description: "Visual variant of the badge.",
      table: { category: "props" },
    },
    size: {
      control: "select",
      options: kdsBadgeSizes,
      description: "Size of the badge.",
      table: { category: "props" },
    },
    icon: {
      control: "select",
      options: kdsIconNames,
      description: "Icon next to the text.",
      table: { category: "props" },
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    label: "Badge",
    variant: "neutral",
    size: kdsBadgeSize.XSMALL,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const label = canvas.getByText("Badge");
    await expect(label).toBeInTheDocument();
  },
};

export const WithIcon: Story = {
  args: {
    label: "Badge",
    variant: "neutral",
    icon: "placeholder",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const label = canvas.getByText("Badge");
    await expect(label).toBeInTheDocument();

    const badge = canvas.getByText("Badge").closest(".kds-badge");
    const icon = badge?.querySelector(".kds-icon");
    await expect(icon).toBeInTheDocument();
  },
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsBadge,
    width: 120,
  }),
  args: {
    label:
      "A very long text that gives comprehensive information about an item",
    variant: "neutral",
    icon: "placeholder",
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsBadge,
  designsToCompare: {
    Types: {
      props: { label: "{Label}", icon: "placeholder" },
      variants: {
        [`${figmaBaseUrl}?node-id=972-2164`]: { variant: "neutral" },
        [`${figmaBaseUrl}?node-id=973-2651`]: { variant: "info" },
        [`${figmaBaseUrl}?node-id=973-2759`]: { variant: "warning" },
        [`${figmaBaseUrl}?node-id=973-2687`]: { variant: "success" },
        [`${figmaBaseUrl}?node-id=973-2723`]: { variant: "error" },
        [`${figmaBaseUrl}?node-id=10970-249681`]: { variant: "ghost" },
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsBadge,
  combinationsProps: [
    {
      label: ["Badge"],
      variant: kdsBadgeVariants,
      size: kdsBadgeSizes,
      icon: [undefined, "placeholder"],
    },
  ],
});
