import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
} from "../../../../test-utils/storybook";

import ListItemDivider from "./ListItemDivider.vue";

const figmaBaseUrl =
  "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components";

const meta: Meta<typeof ListItemDivider> = {
  title: "Form Fields/_Helper/ListItem/Divider",
  component: ListItemDivider,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Internal helper that renders the faint divider used between grouped list items.",
      },
    },
    design: {
      type: "figma",
      url: `${figmaBaseUrl}?node-id=15752-51930`,
    },
  },
};

export default meta;

type Story = StoryObj<typeof ListItemDivider>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("separator")).toBeInTheDocument();
  },
};

// TextOverflow story does not apply here

export const DesignComparator: Story = buildDesignComparatorStory({
  component: ListItemDivider,
  wrapperStyle: { width: "316px" },
  designsToCompare: {
    Default: {
      props: {},
      variants: {
        [`${figmaBaseUrl}?node-id=15752-51930`]: {},
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: ListItemDivider,
  combinationsProps: [{}],
});
