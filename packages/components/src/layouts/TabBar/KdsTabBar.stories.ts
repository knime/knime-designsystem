import { ref, watchEffect } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook";

import KdsTabBar from "./KdsTabBar.vue";
import type { KdsTab } from "./types";

const meta: Meta<typeof KdsTabBar> = {
  title: "Components/KdsTabBar",
  component: KdsTabBar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Use `KdsTabBar` to provide a horizontal navigation for switching between different views or content sections. Each tab can have an optional icon and can be disabled individually or as a whole.\n\n" +
          "**How it works**\n" +
          "- Provide an array of `tabs`, where each tab has a `value`, `label`, optional `icon`, and optional `disabled` state.\n" +
          "- Control the currently selected tab via the `modelValue` prop, which should match the `value` of one of the tabs.\n" +
          "- The `size` prop controls the overall size of the tab bar, while the `fullWidth` prop determines whether tabs should stretch to fill the container.\n\n" +
          "**Example**\n" +
          "```vue\n" +
          "<KdsTabBar\n" +
          '  :tabs="[\n' +
          "    { value: 'localfilesystem', label: 'Local Filesystem', icon: 'local-filesystem' },\n" +
          "    { value: 'myknimehub', label: 'My KNIME Hub', icon: 'cloud-knime' },\n" +
          "    { value: 'oracledatabase', label: 'Oracle Database', icon: 'db-database' },\n" +
          "    { value: 'box', label: 'Box', icon: 'cloud-download' },\n" +
          "    { value: 'disabled', label: 'Disabled', icon: 'cloud-download', disabled: true },\n" +
          '  ]"\n' +
          '  size="large"\n' +
          '  :full-width="false"\n' +
          '  modelValue="localfilesystem"\n' +
          "/>\n" +
          "```\n",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=431-16858&m",
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["small", "large"],
      description: "Size of the tab bar, affecting padding and font size",
      table: { category: "props" },
    },
    fullWidth: {
      control: "boolean",
      description:
        "If true, tabs will stretch to fill the full width of the container; otherwise they will be left-aligned and sized based on their content",
      table: { category: "props" },
    },
    disabled: {
      control: "boolean",
      description:
        "If true, the entire tab bar is disabled and all tabs are non-interactive",
      table: { category: "props" },
    },
    tabs: {
      control: "object",
      description:
        "Array of tab objects, where each tab has a `value`, `label`, optional `icon`, and optional `disabled` state",
      table: { category: "props" },
    },
    modelValue: {
      control: "select",
      options: [
        "localfilesystem",
        "myknimehub",
        "oracledatabase",
        "box",
        "disabled",
      ],
      description:
        "The `value` of the currently selected tab. Should match the `value` of one of the tabs in the `tabs` array.",
      table: { category: "model" },
    },
  },
  render: (args) => {
    const [, updateArgs] = useArgs();
    return {
      components: { KdsTabBar },
      setup() {
        const modelValue = ref(args.modelValue);
        watchEffect(() => (modelValue.value = args.modelValue));
        watchEffect(() => updateArgs({ modelValue: modelValue.value }));
        return { args, modelValue };
      },
      template: '<KdsTabBar v-bind="args" v-model="modelValue" />',
    };
  },
};

export default meta;
type Story = StoryObj<typeof KdsTabBar>;

const sampleTabs: KdsTab[] = [
  {
    value: "localfilesystem",
    label: "Local Filesystem",
    icon: "local-filesystem",
  },
  { value: "myknimehub", label: "My KNIME Hub", icon: "cloud-knime" },
  { value: "oracledatabase", label: "Oracle Database", icon: "db-database" },
  { value: "box", label: "Box", icon: "cloud-download" },
  {
    value: "disabled",
    label: "Disabled",
    icon: "cloud-download",
    disabled: true,
  },
];

const extraTabs: KdsTab[] = [
  ...sampleTabs,
  { value: "folder", label: "Folder", icon: "folder" },
  { value: "settings", label: "Settings", icon: "settings" },
  { value: "component", label: "Component", icon: "component" },
  { value: "workflow", label: "Workflow", icon: "workflow" },
  { value: "data-table", label: "Data Table", icon: "db-table" },
];

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "This story shows the default configuration of the `KdsTabBar` component with a sample set of tabs. The first tab is selected by default, and one tab is disabled to demonstrate that state.",
      },
    },
  },
  args: {
    tabs: sampleTabs,
    size: "small",
    fullWidth: false,
    disabled: false,
    modelValue: "localfilesystem",
  },
};

export const LargeLeftAligned: Story = {
  args: {
    tabs: sampleTabs,
    size: "large",
    fullWidth: false,
    disabled: false,
    modelValue: "localfilesystem",
  },
};

export const LargeFullWidth: Story = {
  args: {
    tabs: sampleTabs,
    size: "large",
    fullWidth: true,
    disabled: false,
    modelValue: "localfilesystem",
  },
};

export const SmallLeftAligned: Story = {
  args: {
    tabs: sampleTabs,
    size: "small",
    fullWidth: false,
    disabled: false,
    modelValue: "localfilesystem",
  },
};

export const SmallFullWidth: Story = {
  args: {
    tabs: sampleTabs,
    size: "small",
    fullWidth: true,
    disabled: false,
    modelValue: "localfilesystem",
  },
};

export const WithManyTabs: Story = {
  args: {
    tabs: extraTabs,
    size: "small",
    fullWidth: false,
    disabled: false,
    modelValue: "localfilesystem",
  },
};

export const DisabledEntireTabBar: Story = {
  args: {
    tabs: sampleTabs,
    size: "small",
    fullWidth: false,
    disabled: true,
    modelValue: "localfilesystem",
  },
};

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsTabBar,
  combinationsProps: [
    {
      tabs: [sampleTabs],
      size: ["small", "large"],
      fullWidth: [false, true],
      modelValue: ["localfilesystem", "myknimehub"],
    },
  ],
  columns: 1,
});

export const DesignComparator: Story = {
  ...buildDesignComparatorStory({
    component: KdsTabBar,
    designsToCompare: {
      "Small / Left Aligned": {
        props: {
          tabs: sampleTabs,
          size: "small",
          fullWidth: false,
          modelValue: "localfilesystem",
        },
        variants: {
          "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=431-16858":
            {},
        },
      },
      "Small / Full Width": {
        props: {
          tabs: sampleTabs,
          size: "small",
          fullWidth: true,
          modelValue: "localfilesystem",
        },
        variants: {
          "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=431-17006":
            {},
        },
      },
      "Large / Left Aligned": {
        props: {
          tabs: sampleTabs,
          size: "large",
          fullWidth: false,
          modelValue: "localfilesystem",
        },
        variants: {
          "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=431-16857":
            {},
        },
      },
      "Large / Full Width": {
        props: {
          tabs: sampleTabs,
          size: "large",
          fullWidth: true,
          modelValue: "localfilesystem",
        },
        variants: {
          "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=431-17005":
            {},
        },
      },
    },
  }),
  parameters: { chromatic: { disableSnapshot: true } },
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsTabBar,
  }),
  args: {
    tabs: [
      {
        value: "long1",
        label: "This is a very long tab label that should overflow",
        icon: "workflow",
      },
      {
        value: "long2",
        label: "Another extremely long tab label for testing",
        icon: "component",
      },
      { value: "short", label: "Short" },
    ],
    size: "small",
    fullWidth: false,
    modelValue: "long1",
  },
};
