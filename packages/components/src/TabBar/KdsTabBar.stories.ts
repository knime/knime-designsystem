import type { Meta, StoryObj } from "@storybook/vue3-vite";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../test-utils/storybook";

import KdsTabBar from "./KdsTabBar.vue";
import type { KdsTab } from "./types";

const meta: Meta<typeof KdsTabBar> = {
  title: "Components/KdsTabBar",
  component: KdsTabBar,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=431-16858&m=dev",
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["small", "large"],
      description: "Size variant of the tab bar",
    },
    fullWidth: {
      control: "boolean",
      description: "Whether tabs should fill the full width",
    },
    disabled: {
      control: "boolean",
      description: "Make the entire tab bar disabled",
    },
    name: {
      control: "text",
      description:
        "Name attribute for form elements (auto-generated if not provided)",
    },
    tabs: {
      control: "object",
      description: "Array of tab items",
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
      description: "Currently selected tab value",
    },
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
  gridColumns: "auto",
});

export const DesignComparator: Story = buildDesignComparatorStory({
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
});

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
