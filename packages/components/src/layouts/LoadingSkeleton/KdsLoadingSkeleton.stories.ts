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
  title: "Layouts/LoadingSkeleton",
  component: KdsLoadingSkeleton as unknown as FunctionalComponent,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A loading skeleton placeholder with basic shapes (text, icons, buttons and card) and combined layouts like list items or input field with label. Can be used as a wrapper around content to conditionally show skeletons or the actual content based on `loading` state. The number of shown skeletons can be modified by setting the `repeat` prop.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: kdsLoadingSkeletonVariants,

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
    variant: "text",
    loading: true,
    repeat: 1,
    repeatGap: "var(--kds-spacing-container-1-25x)",
    width: undefined,
    height: undefined,
    default: "Default slot content",
  },
};

export default meta;

type Story = StoryObj<typeof KdsLoadingSkeleton>;

export const Text: Story = {
  args: {
    variant: "text",
  },
};

export const Label: Story = {
  args: {
    variant: "label",
  },
};

export const IconLarge: Story = {
  args: {
    variant: "icon-large",
  },
};

export const IconMedium: Story = {
  args: {
    variant: "icon-medium",
  },
};

export const IconSmall: Story = {
  args: {
    variant: "icon-small",
  },
};

export const ButtonLarge: Story = {
  args: {
    variant: "button-large",
  },
};

export const ButtonMedium: Story = {
  args: {
    variant: "button-medium",
  },
};

export const ButtonSmall: Story = {
  args: {
    variant: "button-small",
  },
};

export const ButtonXsmall: Story = {
  args: {
    variant: "button-xsmall",
  },
};

export const Card: Story = {
  args: {
    variant: "card",
  },
};

export const InputField: Story = {
  args: {
    variant: "input-field",
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
    width: "calc(var(--kds-dimension-component-width-4x) * 5.3333333333)",
  },
  designsToCompare: {
    InputFieldPreset: {
      props: {
        variant: "input-field",
        width: "100%",
        repeat: 1,
        loading: true,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18994-118243&t=7l5I9Kk2j0H6XR1I-0":
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
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18994-118241&t=7l5I9Kk2j0H6XR1I-0":
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
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18994-118251&t=7l5I9Kk2j0H6XR1I-0":
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
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18996-118257&t=7l5I9Kk2j0H6XR1I-0":
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
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18996-118264&t=7l5I9Kk2j0H6XR1I-0":
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
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18996-118270&t=7l5I9Kk2j0H6XR1I-0":
          {},
      },
    },
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
