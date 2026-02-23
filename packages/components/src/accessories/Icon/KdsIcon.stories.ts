import type { Meta, StoryObj } from "@storybook/vue3-vite";

import KdsIcon from "./KdsIcon.vue";
import { kdsIconNames, kdsIconSizes } from "./enums";

const meta: Meta<typeof KdsIcon> = {
  title: "Accessories/KdsIcon",
  component: KdsIcon,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Displays an icon from the KDS icon set. The icon color inherits the text color of the parent element.",
      },
    },
  },
  argTypes: {
    name: {
      control: { type: "select" },
      options: kdsIconNames,
    },
    size: {
      control: { type: "select" },
      options: kdsIconSizes,
    },
  },
};
export default meta;

type Story = StoryObj<typeof KdsIcon>;

export const IconStory: Story = {
  args: {
    name: "placeholder",
    size: "medium",
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
