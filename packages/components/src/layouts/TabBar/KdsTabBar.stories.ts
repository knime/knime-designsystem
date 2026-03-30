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
          "Use `KdsTabBar` to provide a horizontal navigation for switching between different views or content sections. It follows the [WAI-ARIA Tab Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/).\n\n" +
          "**How it works**\n" +
          "- Provide an array of `tabs`, where each tab has an `id`, `value`, `label`, `panelId`, optional `accessory` (icon or live status), and optional `disabled` state.\n" +
          "- Control the currently selected tab via the `modelValue` prop, which should match the `value` of one of the tabs.\n" +
          "- The `size` prop controls the overall size of the tab bar, while the `fullWidth` prop determines whether tabs should stretch to fill the container.",
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
        "Array of tab objects, where each tab has an `id`, `value`, `label`, `panelId`, optional `accessory` (icon or live status), and optional `disabled` state",
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
    accessory: { type: "icon", name: "local-filesystem" },
  },
  {
    id: "tab-myknimehub",
    value: "myknimehub",
    label: "My KNIME Hub",
    panelId: "panel-myknimehub",
    accessory: { type: "icon", name: "cloud-knime" },
  },
  {
    id: "tab-oracledatabase",
    value: "oracledatabase",
    label: "Oracle Database",
    panelId: "panel-oracledatabase",
    accessory: { type: "icon", name: "db-database" },
  },
  {
    id: "tab-box",
    value: "box",
    label: "Box",
    panelId: "panel-box",
    accessory: { type: "icon", name: "cloud-download" },
  },
  {
    id: "tab-disabled",
    value: "disabled",
    label: "Disabled",
    panelId: "panel-disabled",
    accessory: { type: "icon", name: "cloud-download" },
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
    accessory: { type: "icon", name: "folder" },
  },
  { id: "short-tab", value: "1", label: "1", panelId: "panel-1" },
  {
    id: "tab-settings",
    value: "settings",
    label: "Settings",
    panelId: "panel-settings",
    accessory: { type: "icon", name: "settings" },
  },
  {
    id: "tab-component",
    value: "component",
    label: "Component",
    panelId: "panel-component",
    accessory: { type: "icon", name: "component" },
  },
  {
    id: "tab-workflow",
    value: "workflow",
    label: "Workflow",
    panelId: "panel-workflow",
    accessory: { type: "icon", name: "workflow" },
  },
  {
    id: "tab-data-table",
    value: "data-table",
    label: "Data Table",
    panelId: "panel-data-table",
    accessory: { type: "icon", name: "db-table" },
  },
  {
    id: "tab-chart",
    value: "chart",
    label: "Chart",
    panelId: "panel-chart",
    accessory: { type: "icon", name: "data-value-view" },
  },
  {
    id: "tab-api",
    value: "api",
    label: "API",
    panelId: "panel-api",
    accessory: { type: "icon", name: "service" },
  },
  {
    id: "tab-analytics",
    value: "analytics",
    label: "Analytics",
    panelId: "panel-analytics",
    accessory: { type: "icon", name: "function-catalog" },
  },
  {
    id: "tab-automation",
    value: "automation",
    label: "Automation",
    panelId: "panel-automation",
    accessory: { type: "icon", name: "execute-all" },
  },
  {
    id: "tab-collaboration",
    value: "collaboration",
    label: "Collaboration",
    panelId: "panel-collaboration",
    accessory: { type: "icon", name: "team" },
  },
  {
    id: "tab-security",
    value: "security",
    label: "Security",
    panelId: "panel-security",
    accessory: { type: "icon", name: "lock" },
  },
  {
    id: "tab-support",
    value: "support",
    label: "Support",
    panelId: "panel-support",
    accessory: { type: "icon", name: "forum" },
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

    const user = userEvent.setup();
    // Mouse interaction: click a different tab to select it
    const hubTab = canvas.getByRole("tab", { name: "My KNIME Hub" });
    await user.click(hubTab);
    await expect(hubTab).toHaveAttribute("aria-selected", "true");

    const localTab = canvas.getByRole("tab", { name: "Local Filesystem" });
    await expect(localTab).toHaveAttribute("aria-selected", "false");

    // Verify disabled tab cannot be clicked
    const disabledTab = canvas.getByRole("tab", { name: "Disabled" });
    await expect(disabledTab).toBeDisabled();

    // Reset to initial state for keyboard tests
    await user.click(localTab);
    await expect(localTab).toHaveAttribute("aria-selected", "true");

    // Keyboard interaction: focus the selected tab
    localTab.focus();
    await expect(localTab).toHaveFocus();

    // ArrowRight navigates to next tab (skipping disabled)
    await user.keyboard("{ArrowRight}");
    await expect(hubTab).toHaveFocus();
    await expect(hubTab).toHaveAttribute("aria-selected", "true");

    // ArrowRight again
    await user.keyboard("{ArrowRight}");
    const oracleTab = canvas.getByRole("tab", { name: "Oracle Database" });
    await expect(oracleTab).toHaveFocus();
    await expect(oracleTab).toHaveAttribute("aria-selected", "true");

    // Home key goes to first enabled tab
    await user.keyboard("{Home}");
    await expect(localTab).toHaveFocus();
    await expect(localTab).toHaveAttribute("aria-selected", "true");

    // End key goes to last enabled tab
    await user.keyboard("{End}");
    const boxTab = canvas.getByRole("tab", { name: "Box" });
    await expect(boxTab).toHaveFocus();
    await expect(boxTab).toHaveAttribute("aria-selected", "true");

    // ArrowLeft wraps around to last enabled tab
    await user.keyboard("{ArrowLeft}");
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

export const WithLiveStatus: Story = {
  args: {
    tabs: [
      {
        id: "tab-server1",
        value: "server1",
        label: "Production",
        panelId: "panel-server1",
        accessory: { type: "liveStatus", status: "green" },
      },
      {
        id: "tab-server2",
        value: "server2",
        label: "Staging",
        panelId: "panel-server2",
        accessory: { type: "liveStatus", status: "orange" },
      },
      {
        id: "tab-server3",
        value: "server3",
        label: "Development",
        panelId: "panel-server3",
        accessory: { type: "liveStatus", status: "red" },
      },
      {
        id: "tab-server4",
        value: "server4",
        label: "Offline",
        panelId: "panel-server4",
        accessory: { type: "liveStatus", status: "disabled" },
        disabled: true,
      },
    ],
    size: "small",
    fullWidth: false,
    disabled: false,
    modelValue: "server1",
  },
};

export const MixedAccessories: Story = {
  args: {
    tabs: [
      {
        id: "tab-local",
        value: "local",
        label: "Local Filesystem",
        panelId: "panel-local",
        accessory: { type: "icon", name: "local-filesystem" },
      },
      {
        id: "tab-hub",
        value: "hub",
        label: "My KNIME Hub",
        panelId: "panel-hub",
        accessory: { type: "liveStatus", status: "green" },
      },
      {
        id: "tab-db",
        value: "db",
        label: "Oracle Database",
        panelId: "panel-db",
        accessory: { type: "icon", name: "db-database" },
      },
      {
        id: "tab-cloud",
        value: "cloud",
        label: "Cloud Service",
        panelId: "panel-cloud",
        accessory: { type: "liveStatus", status: "orange" },
      },
    ],
    size: "small",
    fullWidth: false,
    disabled: false,
    modelValue: "local",
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
        accessory: { type: "icon", name: "workflow" },
      },
      {
        id: "tab-long2",
        value: "long2",
        label: "Another extremely long tab label for testing",
        panelId: "panel-long2",
        accessory: { type: "icon", name: "component" },
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

const designComparatorTabs: KdsTabBarItem[] = Array.from(
  { length: 6 },
  (_, i) => ({
    id: `tab-${i + 1}`,
    value: `tab${i + 1}`,
    label: "{label}",
    panelId: `panel-${i + 1}`,
    accessory: { type: "icon" as const, name: "placeholder" },
  }),
);

export const DesignComparator: Story = {
  ...buildDesignComparatorStory({
    component: KdsTabBar,
    wrapperStyle: "width: 978px",
    designsToCompare: {
      "Large / Left Aligned": {
        props: {
          tabs: designComparatorTabs,
          size: "large",
          fullWidth: false,
          modelValue: "tab2",
        },
        variants: {
          "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=431-16858":
            {},
        },
      },
      "Small / Left Aligned": {
        props: {
          tabs: designComparatorTabs,
          size: "small",
          fullWidth: false,
          modelValue: "tab2",
        },
        variants: {
          "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=431-16865":
            {},
        },
      },
      "Large / Full Width": {
        props: {
          tabs: designComparatorTabs,
          size: "large",
          fullWidth: true,
          modelValue: "tab2",
        },
        variants: {
          "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3445-47639":
            {},
        },
      },
      "Small / Full Width": {
        props: {
          tabs: designComparatorTabs,
          size: "small",
          fullWidth: true,
          modelValue: "tab2",
        },
        variants: {
          "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3445-46920":
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
