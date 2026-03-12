import type { Meta, StoryObj } from "@storybook/vue3-vite";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook";

import KdsInlineMessage from "./KdsInlineMessage.vue";
import { kdsInlineMessageVariants } from "./enums";

type Story = StoryObj<typeof KdsInlineMessage>;

const figmaBaseUrl =
  "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components";

const meta: Meta<typeof KdsInlineMessage> = {
  component: KdsInlineMessage,
  title: "Messaging/InlineMessage",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "An inline message component to display contextual information, warnings, errors, or success messages to users.",
      },
    },
    design: {
      type: "figma",
      url: `${figmaBaseUrl}?node-id=3690-14792`,
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: kdsInlineMessageVariants,
      description: "Visual style / status of the inline message.",
      table: {
        category: "props",
        type: { summary: kdsInlineMessageVariants.join(" | ") },
        defaultValue: { summary: "info" },
      },
    },

    headline: {
      control: "text",
      description:
        "Headline text displayed before the message content inside the inline message.",

      table: { category: "props" },
    },
    description: {
      control: "text",
      description: "The description text displayed inside the inline message.",
      table: { category: "props" },
    },
  },
  args: {
    variant: "info",
    headline: "Headline",
    description: undefined,
  },
};
export default meta;

export const Info: Story = {
  args: {
    variant: "info",
    headline: "Headline",
    description: "Here is a message that informs the user about something",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    headline: "Headline",
    description: "Here is a message that informs the user about something",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    headline: "Headline",
    description: "Here is a message that informs the user about something",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    headline: "Headline",
    description: "Here is a message that informs the user about something",
  },
};

export const OnlyHeadline: Story = {
  args: {
    variant: "info",
    headline: "Headline",
  },
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsInlineMessage,
  }),
  args: {
    headline:
      "This is a very long headline that should overflow, This is a very long headline that should overflow ",
    description:
      "This is a very long description that should overflow, This is a very long description that should overflow ",
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsInlineMessage,
  designsToCompare: {
    Variants: {
      props: {
        headline: "Headline",
        description: "Here is a message that informs the user about something",
      },
      variants: {
        [`${figmaBaseUrl}?node-id=3870-16219`]: {
          variant: "info",
        },
        [`${figmaBaseUrl}?node-id=11984-102908`]: {
          variant: "info",
          headline: "Headline",
          description: undefined,
        },
      },
    },
  },
  wrapperStyle: "width: 100%;",
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsInlineMessage,
  combinationsProps: [
    {
      variant: kdsInlineMessageVariants,
      headline: ["Headline", "A longer inline message headline"],
      description: [
        undefined,
        "Here is a message that informs the user about something",
      ],
    },
  ],
  pseudoStates: [], // no interactive states for this presentational component
});
