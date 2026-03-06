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
  title: "Accessories/KdsInlineMessage",
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
      url: `${figmaBaseUrl}?node-id=9555-79423`,
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: kdsInlineMessageVariants,
      description: "Visual style / status of the inline message.",
      table: {
        category: "Props",
        type: { summary: kdsInlineMessageVariants.join(" | ") },
        defaultValue: { summary: "info" },
      },
    },

    title: {
      control: "text",
      description:
        "Title text displayed before the message content inside the inline message.",

      table: { category: "Props" },
    },
    message: {
      control: "text",
      description: "The message content displayed inside the inline message.",
      table: { category: "Props" },
    },
  },
  args: {
    variant: "info",
    title: "Title",
    message: undefined,
  },
};
export default meta;

export const Info: Story = {
  args: {
    variant: "info",
    title: "Title",
    message: "Here is a message that informs the user about something",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    title: "Title",
    message: "Here is a message that informs the user about something",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    title: "Title",
    message: "Here is a message that informs the user about something",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Title",
    message: "Here is a message that informs the user about something",
  },
};

export const OnlyTitle: Story = {
  args: {
    variant: "info",
    title: "Title",
  },
};

// Example story showcasing formatted text in the message content (italic/bold)

export const WithFormattedText: Story = {
  render: () => ({
    components: { KdsInlineMessage },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; width: 100%;">
        <KdsInlineMessage variant="info" title="Formatted Text Example">
          This message has <strong>bold text</strong> and <em>italic text</em> for emphasis.
        </KdsInlineMessage>
        <KdsInlineMessage variant="success" title="Multiple Formatting">
          You can combine <strong>bold</strong>, <em>italic</em>, and even <strong><em>both</em></strong> together.
        </KdsInlineMessage>
      </div>
    `,
  }),
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsInlineMessage,
  }),
  args: {
    title:
      "This is a very long title that should overflow, This is a very long title that should overflow ",
    message:
      "This is a very long message that should overflow, This is a very long message that should overflow ",
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsInlineMessage,
  designsToCompare: {
    Variants: {
      props: {
        title: "Title",
        message: "Here is a message that informs the user about something",
      },
      variants: {
        [`${figmaBaseUrl}?node-id=3870-16219`]: {},
        [`${figmaBaseUrl}?node-id=11984-102908`]: {
          title: "Title",
          message: undefined,
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
      title: ["Title", "A longer inline message title"],
      message: [
        undefined,
        "Here is a message that informs the user about something",
      ],
    },
  ],
  pseudoStates: [], // no interactive states for this presentational component
});
