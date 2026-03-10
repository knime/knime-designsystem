import type { Meta, StoryObj } from "@storybook/vue3-vite";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
} from "../../test-utils/storybook";

import KdsIcon from "./KdsIcon.vue";
import { kdsIconNames, kdsIconSizes } from "./enums";

const figmaBaseUrl =
  "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components";

const meta: Meta<typeof KdsIcon> = {
  title: "Accessories/Icon",
  component: KdsIcon,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Displays an icon from the KDS icon set. By default, the icon color inherits the text color of the parent element, but when `disabled` is set the icon uses the disabled icon styling instead.",
      },
    },
    design: {
      type: "figma",
      url: `${figmaBaseUrl}?node-id=2650-23996`,
    },
  },
  argTypes: {
    name: {
      control: { type: "select" },
      options: kdsIconNames,
      table: { category: "props" },
    },
    size: {
      control: { type: "select" },
      options: kdsIconSizes,
      table: { category: "props" },
    },
    disabled: {
      control: "boolean",
      table: { category: "props" },
    },
  },
};
export default meta;

type Story = StoryObj<typeof KdsIcon>;

export const IconStory: Story = {
  args: {
    name: "placeholder",
    size: "medium",
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    name: "placeholder",
    size: "medium",
    disabled: true,
  },
};

export const SizeComparison: Story = {
  render: (args) => ({
    components: { KdsIcon },
    setup: () => ({ args }),
    template: `
      <div style="display:flex; gap: 16px; align-items: center;">
        <div style="display:flex; flex-direction:column; gap: 8px; align-items:center;">
          <div style="font-size: 12px;">xsmall</div>
          <KdsIcon v-bind="args" size="xsmall" />
        </div>
        <div style="display:flex; flex-direction:column; gap: 8px; align-items:center;">
          <div style="font-size: 12px;">small</div>
          <KdsIcon v-bind="args" size="small" />
        </div>
        <div style="display:flex; flex-direction:column; gap: 8px; align-items:center;">
          <div style="font-size: 12px;">medium</div>
          <KdsIcon v-bind="args" size="medium" />
        </div>
        <div style="display:flex; flex-direction:column; gap: 8px; align-items:center;">
          <div style="font-size: 12px;">large</div>
          <KdsIcon v-bind="args" size="large" />
        </div>
      </div>
    `,
  }),
  args: {
    name: "placeholder",
  },
};

// TextOverflow story does not apply here

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsIcon,
  designsToCompare: {
    Sizes: {
      props: { name: "placeholder" },
      variants: {
        [`${figmaBaseUrl}?node-id=2650-23997`]: { size: "large" },
        [`${figmaBaseUrl}?node-id=2650-23999`]: { size: "medium" },
        [`${figmaBaseUrl}?node-id=2650-24001`]: { size: "small" },
        [`${figmaBaseUrl}?node-id=2650-24003`]: { size: "xsmall" },
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsIcon,
  combinationsProps: [
    {
      name: ["placeholder"],
      size: kdsIconSizes,
      disabled: [false, true],
    },
  ],
});
