import type { FunctionalComponent } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook";

import KdsLoadingSkeleton from "./KdsLoadingSkeleton.vue";
import { kdsLoadingSkeletonVariants } from "./enums";

const meta: Meta<typeof KdsLoadingSkeleton> = {
  title: "Accessories/LoadingSkeleton",
  component: KdsLoadingSkeleton as unknown as FunctionalComponent,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A loading skeleton placeholder component with variant-based presets for text, icons, buttons, list items, cards, and combined layouts.",
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
    variant: {
      control: { type: "select" },
      options: kdsLoadingSkeletonVariants,
      description: "Primary API for selecting skeleton preset/layout.",
      table: { category: "props" },
    },
    loading: {
      control: "boolean",
      table: { category: "props" },
    },
    repeat: {
      control: "number",
      description: "Repeats the currently selected variant layout.",
      table: { category: "props" },
    },
    repeatGap: {
      control: "text",
      table: { category: "props" },
    },
  },
  args: {
    width: "100%",
    height: undefined,
    variant: "default",
    loading: true,
    repeat: 1,
    repeatGap: "var(--kds-spacing-container-1-25x)",
  },
};

export default meta;

type Story = StoryObj<typeof KdsLoadingSkeleton>;

export const Default: Story = {};

export const HeadlineWithPararaphs: Story = {
  args: {
    variant: "text-headline-with-paragraph",
  },
};

export const InputWithLabel: Story = {
  args: {
    variant: "input-field",
  },
};

export const ListItemLarge: Story = {
  args: {
    variant: "list-item-large",
  },
};

export const ListItemLargeWithSubtext: Story = {
  args: {
    variant: "list-item-large-with-subtext",
  },
};

export const ListItemSmall: Story = {
  args: {
    variant: "list-item-small",
  },
};

export const ListItemSmallWithSubtext: Story = {
  args: {
    variant: "list-item-small-with-subtext",
  },
};

/*
export const TextPresets: Story = buildVariantListStory({
  items: [
    {
      label: "Headline with Paragraph",
      value: "text-headline-with-paragraph",
      repeat: 1,
    },
  ],
  containerGap: "var(--kds-spacing-container-0-75x)",
  maxWidth: "28rem",
});

export const IconPresets: Story = buildVariantListStory({
  items: [
    { label: "Large", value: "icon-large" },
    { label: "Medium", value: "icon-medium" },
    { label: "Small", value: "icon-small" },
  ],
  containerGap: "var(--kds-spacing-container-0-5x)",
});

export const ButtonPresets: Story = buildVariantListStory({
  items: [
    { label: "Large", value: "button-large" },
    { label: "Medium", value: "button-medium" },
    { label: "Small", value: "button-small" },
    { label: "XSmall", value: "button-xsmall" },
  ],
  containerGap: "var(--kds-spacing-container-0-5x)",
});

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
          <KdsLoadingSkeleton
            v-bind="args"
            variant="text-headline-with-paragraph"
            :repeat="1"
          />
        </div>
      </div>
    `,
  }),
};
*/

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsLoadingSkeleton,
    width: 240,
  }),
  args: {
    variant: "text-headline-with-paragraph",
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsLoadingSkeleton,
  wrapperStyle: {
    width: "calc(var(--kds-dimension-component-width-4x) * 5)",
  },
  designsToCompare: {
    CardDefault: {
      props: {
        variant: "card-default",
        width: "100%",
        repeat: 1,
        loading: true,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18996-118279":
          {
            parameters: {
              figmaOffset: {
                x: 0,
                y: 0,
              },
            },
          },
      },
    },
    InputFieldPreset: {
      props: {
        variant: "input-field",
        width: "100%",
        repeat: 1,
        loading: true,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18994-118243":
          {},
      },
    },
    HeadlineWithParagraph: {
      props: {
        variant: "text-headline-with-paragraph",
        width: "100%",
        repeat: 1,
        loading: true,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18994-118241":
          {},
      },
    },
    ListItemLarge: {
      props: {
        variant: "list-item-large",
        width: "100%",
        repeat: 1,
        loading: true,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18994-118251":
          {
            parameters: {
              figmaOffset: {
                x: 0,
                y: 0,
              },
            },
          },
      },
    },
    ListItemLargeWithSubtext: {
      props: {
        variant: "list-item-large-with-subtext",
        width: "100%",
        repeat: 1,
        loading: true,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18996-118257":
          {
            parameters: {
              figmaOffset: {
                x: 0,
                y: 0,
              },
            },
          },
      },
    },
    ListItemSmall: {
      props: {
        variant: "list-item-small",
        width: "100%",
        repeat: 1,
        loading: true,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18996-118264":
          {},
      },
    },
    ListItemSmallWithSubtext: {
      props: {
        variant: "list-item-small-with-subtext",
        width: "100%",
        repeat: 1,
        loading: true,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18996-118270":
          {},
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsLoadingSkeleton,
  combinationsProps: [
    {
      variant: ["default"],
      width: ["75%", "100%"],
      height: [
        "var(--kds-spacing-container-1x)",
        "var(--kds-spacing-container-2x)",
      ],
      repeat: [1, 3],
      repeatGap: ["var(--kds-spacing-container-0-12x)"],
      loading: [true],
    },
    {
      variant: ["text-default", "text-headline-with-paragraph"],
      loading: [true],
    },
    {
      variant: ["icon-large", "icon-medium", "icon-small"],
      loading: [true],
    },
    {
      variant: [
        "button-large",
        "button-medium",
        "button-small",
        "button-xsmall",
      ],
      loading: [true],
    },
    {
      variant: [
        "input-field",
        "list-item-large",
        "list-item-large-with-subtext",
        "list-item-small",
        "list-item-small-with-subtext",
        "card-default",
      ],
      loading: [true],
    },
  ],
});
