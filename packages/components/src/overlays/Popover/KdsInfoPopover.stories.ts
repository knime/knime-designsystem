import type { Meta, StoryObj } from "@storybook/vue3-vite";

import {
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook";

import KdsInfoPopover from "./KdsInfoPopover.vue";

type StoryArgs = {
  default: string;
};

const meta = {
  title: "Components/overlays/KdsInfoPopover",
  component: KdsInfoPopover,
  tags: ["autodocs"],
  argTypes: {
    default: {
      description: "Default slot that is rendered in the popover content area.",
      control: { type: "text" },
      table: {
        category: "Slots",
      },
    },
  },
  args: {
    default: "Description of the control element.",
  },
  parameters: {
    docs: {
      description: {
        component:
          "Preset popover content styling for info/help text. This is the content wrapper only (no toggle/positioning behavior).",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8511-297811",
    },
  },
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { KdsInfoPopover },
    setup() {
      return { args };
    },
    template: `
        <KdsInfoPopover>
            {{ args.default }}
        </KdsInfoPopover>
    `,
  }),
};

export const WithLongText: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Shows wrapping behavior (the info popover has a built-in max width).",
      },
    },
  },
  render: () => ({
    components: { KdsInfoPopover },
    template: `
        <KdsInfoPopover>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </KdsInfoPopover>
    `,
  }),
};

export const DesignComparator: Story = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  ...buildDesignComparatorStory({
    component: {
      components: { KdsInfoPopover },
      template: `
        <KdsInfoPopover>
          Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large.
        </KdsInfoPopover>
      `,
    },
    designsToCompare: {
      Default: {
        props: {},
        variants: {
          "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8522-305454":
            { parameters: { figmaOffset: { x: -20, y: -20 } } },
        },
      },
    },
  }),
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: {
      components: { KdsInfoPopover },
      template: `
          <KdsInfoPopover>
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
            there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the
            Semantics, a large language ocean.
          </KdsInfoPopover>
      `,
    },
    width: 240,
  }),
};
