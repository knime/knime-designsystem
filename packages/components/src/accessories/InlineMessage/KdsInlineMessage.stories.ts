import type { Meta, StoryObj } from "@storybook/vue3-vite";

import {
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
          "A small circular avatar that shows initials and can optionally show an image instead (falls back to initials if the image fails to load).",
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
    },

    title: {
      control: "text",
      description: "Tooltip text shown on hover and aria label (if provided).",
      table: { category: "Props" },
    },
    message: {
      control: "text",
      description: "The message content displayed inside the inline message.",
      table: { category: "Props" },
    },
  },
  // args: {
  //   initials: "fv",
  //   src: undefined,
  //   title: "",
  // },
};
export default meta;

export const AllVariants: Story = {
  render: () => ({
    components: { KdsInlineMessage },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; width: 100%;">
        <KdsInlineMessage 
          variant="info" 
          title="Info" 
          message="Here is a message that informs the user about something"
        />
        <KdsInlineMessage 
          variant="success" 
          title="Success" 
          message="Here is a message that informs the user about something"
        />
        <KdsInlineMessage 
          variant="error" 
          title="Error" 
          message="Here is a message that informs the user about something"
        />
        <KdsInlineMessage 
          variant="warning" 
          title="Warning" 
          message="Here is a message that informs the user about something"
        />
      </div>
    `,
  }),
};

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
      "This is a very long title that should overflow and be truncated with an ellipsis",
    message:
      "This is a very long message that should overflow and be truncated with an ellipsis at the end",
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
});

// export const AllCombinations: Story = buildAllCombinationsStory({
//   component: KdsInlineMessage,
//   combinationsProps: [
//     {
//       initials: ["FV"],
//       src: [undefined, demoUserImage, demoKnimeLogo, "/broken"],
//       title: [undefined],
//     },
//   ],
//   pseudoStates: [], // no interactive states for this presentational component
// });
