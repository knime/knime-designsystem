import { ref, watchEffect } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { expect, userEvent, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook";

import KdsTabBar from "./KdsTabBar.vue";
import { kdsTabBarSizes } from "./enums";
import type { KdsTabBarItem } from "./types";

const meta: Meta<typeof KdsTabBar> = {
  title: "Layouts/TabBar",
  component: KdsTabBar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Use `KdsTabBar` to provide a horizontal navigation for switching between different views or content sections. Each tab can have an optional icon and can be disabled individually or as a whole.\n\n" +
          "**How it works**\n" +
          "- Provide an array of `tabs`, where each tab has an `id`, `value`, `label`, `panelId`, optional `trailingIcon`, and optional `disabled` state.\n" +
          "- Control the currently selected tab via the `modelValue` prop, which should match the `value` of one of the tabs.\n" +
          "- The `size` prop controls the overall size of the tab bar, while the `fullWidth` prop determines whether tabs should stretch to fill the container.\n\n" +
          "**Example**\n\n" +
          "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/\n" +
          "```vue\n" +
          "<KdsTabBar\n" +
          '  :tabs="[\n' +
          "    { id: 'tab-localfilesystem', value: 'localfilesystem', label: 'Local Filesystem', panelId: 'panel-localfilesystem', trailingIcon: 'local-filesystem' },\n" +
          "    { id: 'tab-myknimehub', value: 'myknimehub', label: 'My KNIME Hub', panelId: 'panel-myknimehub', trailingIcon: 'cloud-knime' },\n" +
          "    { id: 'tab-oracledatabase', value: 'oracledatabase', label: 'Oracle Database', panelId: 'panel-oracledatabase', trailingIcon: 'db-database' },\n" +
          "    { id: 'tab-box', value: 'box', label: 'Box', panelId: 'panel-box', trailingIcon: 'cloud-download' },\n" +
          "    { id: 'tab-disabled', value: 'disabled', label: 'Disabled', panelId: 'panel-disabled', trailingIcon: 'cloud-download', disabled: true },\n" +
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
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=431-16858",
    },
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: kdsTabBarSizes,
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
        "Array of tab objects, where each tab has an `id`, `value`, `label`, `panelId`, optional `trailingIcon`, and optional `disabled` state",
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
  decorators: [
    (story, context) => ({
      components: { story },
      setup() {
        return { tabs: context.args.tabs ?? [] };
      },
      template: `
        <div>
          <story />
          <div v-for="tab in tabs" :key="tab.panelId" :id="tab.panelId" role="tabpanel" :aria-labelledby="tab.id" hidden />
        </div>
      `,
    }),
  ],
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

const sampleTabs: KdsTabBarItem[] = [
  {
    id: "tab-localfilesystem",
    value: "localfilesystem",
    label: "Local Filesystem",
    panelId: "panel-localfilesystem",
    trailingIcon: "local-filesystem",
  },
  {
    id: "tab-myknimehub",
    value: "myknimehub",
    label: "My KNIME Hub",
    panelId: "panel-myknimehub",
    trailingIcon: "cloud-knime",
  },
  {
    id: "tab-oracledatabase",
    value: "oracledatabase",
    label: "Oracle Database",
    panelId: "panel-oracledatabase",
    trailingIcon: "db-database",
  },
  {
    id: "tab-box",
    value: "box",
    label: "Box",
    panelId: "panel-box",
    trailingIcon: "cloud-download",
  },
  {
    id: "tab-disabled",
    value: "disabled",
    label: "Disabled",
    panelId: "panel-disabled",
    trailingIcon: "cloud-download",
    disabled: true,
  },
];

const extraTabs: KdsTabBarItem[] = [
  ...sampleTabs,
  {
    id: "tab-folder",
    value: "folder",
    label: "Folder",
    panelId: "panel-folder",
    trailingIcon: "folder",
  },
  {
    id: "tab-settings",
    value: "settings",
    label: "Settings",
    panelId: "panel-settings",
    trailingIcon: "settings",
  },
  {
    id: "tab-component",
    value: "component",
    label: "Component",
    panelId: "panel-component",
    trailingIcon: "component",
  },
  {
    id: "tab-workflow",
    value: "workflow",
    label: "Workflow",
    panelId: "panel-workflow",
    trailingIcon: "workflow",
  },
  {
    id: "tab-data-table",
    value: "data-table",
    label: "Data Table",
    panelId: "panel-data-table",
    trailingIcon: "db-table",
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Mouse interaction: click a different tab to select it
    const hubTab = canvas.getByRole("tab", { name: "My KNIME Hub" });
    await userEvent.click(hubTab);
    await expect(hubTab).toHaveAttribute("aria-selected", "true");

    const localTab = canvas.getByRole("tab", { name: "Local Filesystem" });
    await expect(localTab).toHaveAttribute("aria-selected", "false");

    // Verify disabled tab cannot be clicked
    const disabledTab = canvas.getByRole("tab", { name: "Disabled" });
    await expect(disabledTab).toBeDisabled();
  },
};

export const KeyboardNavigation: Story = {
  args: {
    tabs: sampleTabs,
    size: "small",
    fullWidth: false,
    disabled: false,
    modelValue: "localfilesystem",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Focus the selected tab
    const localTab = canvas.getByRole("tab", { name: "Local Filesystem" });
    localTab.focus();
    await expect(localTab).toHaveFocus();

    // ArrowRight navigates to next tab (skipping disabled)
    await userEvent.keyboard("{ArrowRight}");
    const hubTab = canvas.getByRole("tab", { name: "My KNIME Hub" });
    await expect(hubTab).toHaveFocus();
    await expect(hubTab).toHaveAttribute("aria-selected", "true");

    // ArrowRight again
    await userEvent.keyboard("{ArrowRight}");
    const oracleTab = canvas.getByRole("tab", { name: "Oracle Database" });
    await expect(oracleTab).toHaveFocus();
    await expect(oracleTab).toHaveAttribute("aria-selected", "true");

    // Home key goes to first enabled tab
    await userEvent.keyboard("{Home}");
    await expect(localTab).toHaveFocus();
    await expect(localTab).toHaveAttribute("aria-selected", "true");

    // End key goes to last enabled tab
    await userEvent.keyboard("{End}");
    const boxTab = canvas.getByRole("tab", { name: "Box" });
    await expect(boxTab).toHaveFocus();
    await expect(boxTab).toHaveAttribute("aria-selected", "true");

    // ArrowLeft wraps around to last enabled tab
    await userEvent.keyboard("{ArrowLeft}");
    await expect(oracleTab).toHaveFocus();
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
  },
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsTabBar,
  }),
  args: {
    tabs: [
      {
        id: "tab-long1",
        value: "long1",
        label: "This is a very long tab label that should overflow",
        panelId: "panel-long1",
        trailingIcon: "workflow",
      },
      {
        id: "tab-long2",
        value: "long2",
        label: "Another extremely long tab label for testing",
        panelId: "panel-long2",
        trailingIcon: "component",
      },
      {
        id: "tab-short",
        value: "short",
        label: "Short",
        panelId: "panel-short",
      },
    ],
    size: "small",
    fullWidth: false,
    modelValue: "long1",
  },
};

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
};

export const AllCombinations: Story = {
  ...buildAllCombinationsStory({
    component: KdsTabBar,
    combinationsProps: [
      {
        tabs: [sampleTabs],
        size: ["small", "large"],
        fullWidth: [false, true],
        modelValue: ["localfilesystem", "myknimehub"],
      },
    ],
    pseudoStates: ["hover", "focus-visible"],
    columns: 1,
  }),
  parameters: {
    a11y: { disable: true },
  },
};
