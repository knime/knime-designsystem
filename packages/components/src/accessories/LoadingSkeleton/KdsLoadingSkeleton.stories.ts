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
    width: {
      control: "text",
      table: { category: "props" },
    },
    height: {
      control: "text",
      table: { category: "props" },
    },
  },
  args: {
    width: undefined,
    height: undefined,
    variant: "text",
    loading: true,
    repeat: 1,
    repeatGap: "var(--kds-spacing-container-1-25x)",
    default: "Default slot content",
  },
};

export default meta;

type Story = StoryObj<typeof KdsLoadingSkeleton>;

/* TODO add stories for each basic shape */
export const Text: Story = {
  args: {
    variant: "text",
  },
};

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
        variant: "card",
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
      variant: ["text"],
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
      variant: ["text", "text-headline-with-paragraph"],
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
        "card",
      ],
      loading: [true],
    },
  ],
});
