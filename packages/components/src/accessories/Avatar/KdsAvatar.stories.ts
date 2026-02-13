import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook";

import KdsAvatar from "./KdsAvatar.vue";
import { demoKnimeLogo } from "./demo-logo";
import { demoUserImage } from "./demo-user";

type Story = StoryObj<typeof KdsAvatar>;

const figmaBaseUrl =
  "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components";

const meta: Meta<typeof KdsAvatar> = {
  component: KdsAvatar,
  title: "Components/accessories/KdsAvatar",
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
    initials: {
      control: "text",
      description: "Initials shown as fallback and as base avatar content.",
      table: { category: "Props" },
    },
    src: {
      control: "select",
      options: ["Demo User", "Demo KNIME", "Broken image URL"],
      mapping: {
        "Demo User": demoUserImage,
        "Demo KNIME": demoKnimeLogo,
        "Broken image URL": "/broken",
      },
      description:
        "Optional image. If provided and successfully loaded, it is shown instead of the initials.",
      table: { category: "Props" },
    },
    title: {
      control: "text",
      description: "Tooltip text shown on hover and aria label (if provided).",
      table: { category: "Props" },
    },
  },
  args: {
    initials: "fv",
    src: undefined,
    title: "",
  },
};

export default meta;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const initials = await canvas.findByText("FV");
    await expect(initials).toBeInTheDocument();
  },
};

export const WithImage: Story = {
  args: {
    src: demoUserImage,
    title: "Demo User",
    initials: "DU",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const img = canvas.getByRole("img", { name: "Demo User" });
    await expect(img).toHaveAttribute("alt", "Demo User");
    await expect(img.getAttribute("src")).toBeDefined();
  },
};

export const Scaled: Story = {
  args: {
    title: "Demo User",
    initials: "MM",
  },
  render: (args) => ({
    components: { KdsAvatar },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <div style="display: flex; flex-direction: column; gap: 8px; align-items: center;">
          <KdsAvatar v-bind="args" style="width: 16px; height: 16px" />
          <span>16px</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px; align-items: center;">
          <KdsAvatar v-bind="args" style="width: 24px; height: 24px" />
          <span>24px</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px; align-items: center;">
          <KdsAvatar v-bind="args" style="width: 32px; height: 32px" />
          <span>32px</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px; align-items: center;">
          <KdsAvatar v-bind="args" style="width: 64px; height: 64px" />
          <span>64px</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px; align-items: center;">
          <KdsAvatar v-bind="args" style="width: 128px; height: 128px" />
          <span>128px</span>
        </div>
      </div>
    `,
  }),
};

export const FallbackAfterImageError: Story = {
  args: {
    src: "/broken",
    title: "Broken User",
    initials: "BU",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const img = canvas.getByRole("img", { name: "Broken User" });
    await expect(img).toHaveAttribute("alt", "Broken User");
    await expect(img).toHaveAttribute("src", "/broken");

    // Trigger an error event manually. This should flip the component to the SVG fallback.
    img.dispatchEvent(new Event("error"));

    const imgFallback = await canvas.findByText("BU");
    await expect(imgFallback).toBeInTheDocument();
    await expect(img).not.toBeInTheDocument();
  },
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsAvatar,
    width: 120,
  }),
  args: {
    initials: "MM",
    title:
      "Very long avatar tooltip text that should be preserved and not break rendering",
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsAvatar,
  designsToCompare: {
    Variants: {
      props: {
        title: undefined,
        initials: "FV",
        src: undefined,
      },
      variants: {
        [`${figmaBaseUrl}?node-id=9555-79394`]: {},
        [`${figmaBaseUrl}?node-id=9555-79424`]: { src: demoUserImage },
        [`${figmaBaseUrl}?node-id=9555-81576`]: { src: demoKnimeLogo },
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsAvatar,
  combinationsProps: [
    {
      initials: ["FV"],
      src: [undefined, demoUserImage, demoKnimeLogo, "/broken"],
      title: [undefined],
    },
  ],
  pseudoStates: [], // no interactive states for this presentational component
});
