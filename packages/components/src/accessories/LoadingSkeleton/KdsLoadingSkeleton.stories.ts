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
    height: "20px",
    variant: "generic",
    loading: true,
    repeat: 1,
    repeatGap: "2px",
  },
};

export default meta;

type Story = StoryObj<typeof KdsLoadingSkeleton>;

export const Default: Story = {};

export const Repeated: Story = {
  args: {
    repeat: 3,
    repeatGap: "8px",
  },
};

export const IconButton: Story = {
  args: {
    width: "32px",
    height: "32px",
    variant: "icon-button",
  },
};

export const Rectangle: Story = {
  args: {
    borderRadius: "var(--kds-border-radius-container-none)",
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
      <div style="display: grid; gap: 12px;">
        <div
          v-for="background in backgrounds"
          :key="background.label"
          :style="{ background: background.value, padding: '12px' }"
        >
          <div style="font: var(--kds-font-base-body-small-strong); margin-bottom: 8px;">
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
    width: "1000px",
    height: "20px",
    variant: "rounded-md",
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsLoadingSkeleton,
  designsToCompare: {
    Variants: {
      props: {
        width: "200px",
        height: "20px",
        variant: "generic",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3535-331":
          {
            variant: "generic",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3535-328":
          {
            variant: "button",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3651-44106":
          {
            variant: "icon-button",
          },
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsLoadingSkeleton,
  combinationsProps: [
    {
      variant: variants,
      width: ["120px", "220px"],
      height: ["16px", "32px"],
      repeat: [1, 3],
      repeatGap: ["2px", "8px"],
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
