import type { Meta, StoryObj } from "@storybook/vue3-vite";

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

export const Info: Story = {
  args: {
    variant: "info",
    title: "This is an info message.",
  },
  // play: async ({ canvasElement }) => {
  //   const canvas = within(canvasElement);

  //   const avatar = canvas.getByRole("img", { name: "Demo User" });
  //   await expect(avatar).toHaveAttribute("aria-label", "Demo User");
  //   await expect(avatar).toHaveAttribute("title", "Demo User");

  //   const img = canvasElement.querySelector("img.kds-avatar-image");
  //   await expect(img).toBeInTheDocument();
  //   await expect(img).toHaveAttribute("alt", "");
  //   await expect(img?.getAttribute("src")).toBeTruthy();
  // },
};

// export const TextOverflow: Story = {
//   ...buildTextOverflowStory({
//     component: KdsAvatar,
//     width: 120,
//   }),
//   args: {
//     initials: "MM",
//     title:
//       "Very long avatar tooltip text that should be preserved and not break rendering",
//   },
// };

// export const DesignComparator: Story = buildDesignComparatorStory({
//   component: KdsAvatar,
//   designsToCompare: {
//     Variants: {
//       props: {
//         title: undefined,
//         initials: "FV",
//         src: undefined,
//       },
//       variants: {
//         [`${figmaBaseUrl}?node-id=9555-79394`]: {},
//         [`${figmaBaseUrl}?node-id=9555-79424`]: { src: demoUserImage },
//         [`${figmaBaseUrl}?node-id=9555-81576`]: { src: demoKnimeLogo },
//       },
//     },
//   },
// });

// export const AllCombinations: Story = buildAllCombinationsStory({
//   component: KdsAvatar,
//   combinationsProps: [
//     {
//       initials: ["FV"],
//       src: [undefined, demoUserImage, demoKnimeLogo, "/broken"],
//       title: [undefined],
//     },
//   ],
//   pseudoStates: [], // no interactive states for this presentational component
// });
