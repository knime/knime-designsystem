import type { Meta, StoryObj } from "@storybook/vue3-vite";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook";

import KdsLiveStatus from "./KdsLiveStatus.vue";
import { kdsLiveStatusSizes, kdsLiveStatusStatuses } from "./types";

type Story = StoryObj<typeof KdsLiveStatus>;

const figmaBaseUrl =
  "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components";

const meta: Meta<typeof KdsLiveStatus> = {
  component: KdsLiveStatus,
  title: "Accessories/KdsLiveStatus",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Visual traffic light status indicator. " +
          "Use `status` to set the current state. " +
          "`title` is shown as a tooltip and used as an aria label. " +
          "Use `size` to control dimensions and `label` to add an optional text label.",
      },
    },
    design: {
      type: "figma",
      url: `${figmaBaseUrl}?node-id=16542-98003`,
    },
  },
  argTypes: {
    status: {
      control: "select",
      options: kdsLiveStatusStatuses,
      description:
        "Traffic light status. Use 'disabled' for a greyed-out indicator.",
      table: { category: "Props" },
    },
    size: {
      control: "select",
      options: kdsLiveStatusSizes,
      description:
        "Size of the indicator. Large: 20px, Medium: 16px, Small: 12px.",
      table: {
        category: "Props",
        defaultValue: { summary: "medium" },
        type: { summary: "'large' | 'medium' | 'small'" },
      },
    },
    label: {
      control: "text",
      description: "Optional label displayed next to the indicator dot.",
      table: {
        category: "Props",
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    title: {
      control: "text",
      description: "Tooltip text shown on hover. Also used as aria label.",
      table: { category: "Props" },
    },
  },
  args: {
    status: "red",
    size: "medium",
    label: "",
    title: "Red",
  },
};

export default meta;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    status: "green",
    label: "state",
    title: "Green state",
  },
};

export const Sizes: Story = {
  parameters: {
    docs: false,
  },
  args: {
    status: "green",
    label: "state",
    title: "Green",
  },
  render: (args) => ({
    components: { KdsLiveStatus },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <div style="display: flex; flex-direction: column; gap: 8px; align-items: center;">
          <KdsLiveStatus v-bind="args" size="small" />
          <span>Small</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px; align-items: center;">
          <KdsLiveStatus v-bind="args" size="medium" />
          <span>Medium</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px; align-items: center;">
          <KdsLiveStatus v-bind="args" size="large" />
          <span>Large (default)</span>
        </div>
      </div>
    `,
  }),
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsLiveStatus,
    width: 120,
  }),
  args: {
    status: "green",
    title: "A veeery loooong status label that should not break rendering",
    label: "A veeery loooong status label that should not break rendering",
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsLiveStatus,
  designsToCompare: {
    "Large size": {
      props: { title: "", size: "large", label: "state" },
      variants: {
        [`${figmaBaseUrl}?node-id=16664-78343`]: { status: "green" },
        [`${figmaBaseUrl}?node-id=16542-98009`]: { status: "yellow" },
        [`${figmaBaseUrl}?node-id=16542-98004`]: { status: "red" },
        [`${figmaBaseUrl}?node-id=16664-78400`]: { status: "disabled" },
      },
    },
    "Medium size": {
      props: { title: "", size: "medium", label: "state" },
      variants: {
        [`${figmaBaseUrl}?node-id=16664-78409`]: { status: "green" },
        [`${figmaBaseUrl}?node-id=16664-78406`]: { status: "yellow" },
        [`${figmaBaseUrl}?node-id=16664-78415`]: { status: "red" },
        [`${figmaBaseUrl}?node-id=16664-78412`]: { status: "disabled" },
      },
    },
    "Small size": {
      props: { title: "", size: "small", label: "state" },
      variants: {
        [`${figmaBaseUrl}?node-id=16664-79197`]: { status: "green" },
        [`${figmaBaseUrl}?node-id=16664-79194`]: { status: "yellow" },
        [`${figmaBaseUrl}?node-id=16664-79203`]: { status: "red" },
        [`${figmaBaseUrl}?node-id=16664-79200`]: { status: "disabled" },
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsLiveStatus,
  combinationsProps: [
    {
      status: kdsLiveStatusStatuses,
      size: kdsLiveStatusSizes,
      title: ["Traffic light status"],
      label: ["state"],
    },
  ],
});
