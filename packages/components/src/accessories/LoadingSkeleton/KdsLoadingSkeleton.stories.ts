import type { FunctionalComponent } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook";

import KdsLoadingSkeleton from "./KdsLoadingSkeleton.vue";

const variants = [
  "generic",
  "button",
  "icon-button",
  "combined",
  "rounded-sm",
  "rounded-md",
] as const;

const meta: Meta<typeof KdsLoadingSkeleton> = {
  title: "Accessories/LoadingSkeleton",
  component: KdsLoadingSkeleton as unknown as FunctionalComponent,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A loading skeleton placeholder component for generic blocks, buttons and rounded shapes.",
      },
    },
  },
  argTypes: {
    width: {
      control: "text",
      table: { category: "props" },
    },
    height: {
      control: "text",
      table: { category: "props" },
    },
    borderRadius: {
      control: "text",
      table: { category: "props" },
    },
    variant: {
      control: { type: "select" },
      options: variants,
      table: { category: "props" },
    },
    loading: {
      control: "boolean",
      table: { category: "props" },
    },
    repeat: {
      control: "number",
      table: { category: "props" },
    },
    repeatGap: {
      control: "text",
      table: { category: "props" },
    },
  },
  args: {
    width: "100%",
    height: "var(--kds-spacing-container-1-25x)",
    variant: "generic",
    loading: true,
    repeat: 1,
    repeatGap: "var(--kds-spacing-container-0-12x)",
  },
};

export default meta;

type Story = StoryObj<typeof KdsLoadingSkeleton>;

export const Default: Story = {};

export const Repeated: Story = {
  args: {
    repeat: 3,
    repeatGap: "var(--kds-spacing-container-0-5x)",
  },
};

export const IconButton: Story = {
  args: {
    width: "var(--kds-spacing-container-2x)",
    height: "var(--kds-spacing-container-2x)",
    variant: "icon-button",
  },
};

export const Rectangle: Story = {
  args: {
    borderRadius: "var(--kds-border-radius-container-none)",
  },
};

export const CombinedLayout: Story = {
  args: {
    variant: "combined",
    width: "100%",
  },
};

export const Backgrounds: Story = {
  render: (args) => ({
    components: { KdsLoadingSkeleton },
    setup() {
      const backgrounds = [
        {
          label: "Background Page Default",
          value: "var(--kds-color-background-page-default)",
        },
        {
          label: "Surface Default",
          value: "var(--kds-color-surface-default)",
        },
        {
          label: "Surface Muted",
          value: "var(--kds-color-surface-muted)",
        },
        {
          label: "Surface Subtle",
          value: "var(--kds-color-surface-subtle)",
        },
      ];

      return { args, backgrounds };
    },
    template: `
      <div style="display: grid; gap: var(--kds-spacing-container-0-75x);">
        <div
          v-for="background in backgrounds"
          :key="background.label"
          :style="{ background: background.value, padding: 'var(--kds-spacing-container-0-75x)' }"
        >
          <div style="font: var(--kds-font-base-body-small-strong); margin-bottom: var(--kds-spacing-container-0-5x);">
            {{ background.label }}
          </div>
          <KdsLoadingSkeleton v-bind="args" />
        </div>
      </div>
    `,
  }),
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsLoadingSkeleton,
  }),
  args: {
    width: "100%",
    height: "var(--kds-spacing-container-1-25x)",
    variant: "rounded-md",
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsLoadingSkeleton,
  designsToCompare: {
    CombinedLayout: {
      props: {
        variant: "combined",
        width: "100%",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3651-44106":
          {},
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsLoadingSkeleton,
  combinationsProps: [
    {
      variant: variants,
      width: ["75%", "100%"],
      height: [
        "var(--kds-spacing-container-1x)",
        "var(--kds-spacing-container-2x)",
      ],
      repeat: [1, 3],
      repeatGap: [
        "var(--kds-spacing-container-0-12x)",
        "var(--kds-spacing-container-0-5x)",
      ],
      borderRadius: [
        undefined,
        "var(--kds-border-radius-container-none)",
        "var(--kds-border-radius-container-0-25x)",
      ],
      loading: [true],
    },
  ],
  pseudoStates: ["hover"],
});
