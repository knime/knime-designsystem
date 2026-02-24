import type { Meta, StoryObj } from "@storybook/vue3-vite";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../../test-utils/storybook.ts";

import VariablePopover from "./VariablePopover.vue";

const SAMPLE_CONTENT =
  "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large.";

const meta = {
  title: "Form Fields/_Helper/KdsVariableToggleButton/VariablePopover",
  component: VariablePopover,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6733-59367",
    },
    docs: {
      description: {
        component:
          "Popover used to display and configure flow variable information within the variable toggle button.",
      },
    },
  },
  argTypes: {
    content: {
      control: { type: "text" },
      description:
        "Content to display inside the variable popover. Used when no default slot is provided.",
      table: { category: "Props" },
    },
    default: {
      control: false,
      description:
        "Custom content for the popover. When provided, overrides the `content` prop.",
      table: { category: "Slots" },
    },
  },
  args: {
    content: SAMPLE_CONTENT,
  },
} satisfies Meta<typeof VariablePopover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: VariablePopover,
    width: 240,
  }),
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: VariablePopover,
  designsToCompare: {
    Default: {
      props: {
        content: SAMPLE_CONTENT,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6679-12281":
          {},
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: VariablePopover,
  combinationsProps: [
    {
      content: [SAMPLE_CONTENT],
    },
  ],
});
