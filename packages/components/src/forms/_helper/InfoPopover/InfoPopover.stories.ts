import type { Meta, StoryObj } from "@storybook/vue3-vite";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../../test-utils/storybook.ts";

import InfoPopover from "./InfoPopover.vue";

const SAMPLE_CONTENT =
  "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large.";

const meta = {
  title: "Form Fields/_Helper/InfoToggleButton/InfoPopover",
  component: InfoPopover,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8522-305454",
    },
  },
  argTypes: {
    content: {
      control: { type: "text" },
      description:
        "Content to display inside the info popover. Used when no default slot is provided.",
      table: { category: "props" },
    },
    default: {
      control: false,
      description:
        "Custom content for the popover. When provided, overrides the `content` prop.",
      table: { category: "slots" },
    },
  },
  args: {
    content: SAMPLE_CONTENT,
  },
} satisfies Meta<typeof InfoPopover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: SAMPLE_CONTENT,
  },
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: InfoPopover,
    width: 240,
  }),
  args: {
    content: SAMPLE_CONTENT,
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: InfoPopover,
  designsToCompare: {
    Default: {
      props: {
        content: SAMPLE_CONTENT,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8522-305454":
          { parameters: { figmaOffset: { x: -20, y: -16 } } },
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: InfoPopover,
  combinationsProps: [
    {
      content: [SAMPLE_CONTENT],
    },
  ],
});
