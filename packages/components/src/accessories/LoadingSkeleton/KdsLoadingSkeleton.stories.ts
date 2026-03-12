import type { FunctionalComponent } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
} from "../../test-utils/storybook";

import KdsLoadingSkeleton from "./KdsLoadingSkeleton.vue";

const variants = [
  "default",
  "text-default",
  "text-headline-with-paragraph",
  "icon-large",
  "icon-medium",
  "icon-small",
  "button-large",
  "button-medium",
  "button-small",
  "button-xsmall",
  "input-field",
  "list-item-large",
  "list-item-large-with-subtext",
  "list-item-small",
  "list-item-small-with-subtext",
  "card-default",
  "combined",
] as const;

const meta: Meta<typeof KdsLoadingSkeleton> = {
  title: "Accessories/LoadingSkeleton",
  component: KdsLoadingSkeleton as unknown as FunctionalComponent,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A loading skeleton placeholder component with variant-based presets for text, icons, buttons, list items, cards, and combined layouts.",
      },
    },
  },
  argTypes: {
    width: {
      control: "text",
      table: { category: "props" },
    },
    height: {
      control: "text",
      table: { category: "props" },
    },
    size: {
      control: { type: "number", min: 0.1, step: 0.1 },
      description: "Multiplies width and height values.",
      table: { category: "props" },
    },
    borderRadius: {
      control: "text",
      table: { category: "props" },
    },
    iconPreset: {
      control: false,
      description: 'Legacy fallback prop (used only with variant="default").',
      table: { disable: true },
    },
    buttonPreset: {
      control: false,
      description: 'Legacy fallback prop (used only with variant="default").',
      table: { disable: true },
    },
    textPreset: {
      control: false,
      description: 'Legacy fallback prop (used only with variant="default").',
      table: { disable: true },
    },
    cardPreset: {
      control: false,
      description: 'Legacy fallback prop (used only with variant="default").',
      table: { disable: true },
    },
    variant: {
      control: { type: "select" },
      options: variants,
      description: "Primary API for selecting skeleton preset/layout.",
      table: { category: "props" },
    },
    loading: {
      control: "boolean",
      table: { category: "props" },
    },
    repeat: {
      control: "number",
      description: "Repeats the currently selected variant layout.",
      table: { category: "props" },
    },
    repeatGap: {
      control: "text",
      table: { category: "props" },
    },
  },
  args: {
    width: "100%",
    height: undefined,
    size: 1,
    borderRadius: undefined,
    variant: "default",
    loading: true,
    repeat: 1,
    repeatGap: "var(--kds-spacing-container-1x)",
  },
};

export default meta;

type Story = StoryObj<typeof KdsLoadingSkeleton>;

export const Default: Story = {};

export const TextPresets: Story = {
  render: () => ({
    components: { KdsLoadingSkeleton },
    setup() {
      const textPresets = [
        {
          label: "Headline with Paragraph",
          value: "text-headline-with-paragraph",
          repeat: 1,
        },
      ];

      return { textPresets };
    },
    template: `
      <div style="display: grid; gap: var(--kds-spacing-container-0-75x); max-width: 28rem;">
        <div
          v-for="preset in textPresets"
          :key="preset.label"
          style="display: grid; gap: var(--kds-spacing-container-0-25x);"
        >
          <div style="font: var(--kds-font-base-label-small-regular);">
            {{ preset.label }}
          </div>
          <KdsLoadingSkeleton :variant="preset.value" :repeat="preset.repeat" />
        </div>
      </div>
    `,
  }),
};

export const IconPresets: Story = {
  render: () => ({
    components: { KdsLoadingSkeleton },
    setup() {
      const iconPresets = [
        { label: "Large", value: "icon-large" },
        { label: "Medium", value: "icon-medium" },
        { label: "Small", value: "icon-small" },
      ];

      return { iconPresets };
    },
    template: `
      <div style="display: grid; gap: var(--kds-spacing-container-0-5x);">
        <div
          v-for="preset in iconPresets"
          :key="preset.label"
          style="display: grid; gap: var(--kds-spacing-container-0-25x);"
        >
          <div style="font: var(--kds-font-base-label-small-regular);">{{ preset.label }}</div>
          <KdsLoadingSkeleton :variant="preset.value" />
        </div>
      </div>
    `,
  }),
};

export const ButtonPresets: Story = {
  render: () => ({
    components: { KdsLoadingSkeleton },
    setup() {
      const buttonPresets = [
        { label: "Large", value: "button-large" },
        { label: "Medium", value: "button-medium" },
        { label: "Small", value: "button-small" },
        { label: "XSmall", value: "button-xsmall" },
      ];

      return { buttonPresets };
    },
    template: `
      <div style="display: grid; gap: var(--kds-spacing-container-0-5x);">
        <div
          v-for="preset in buttonPresets"
          :key="preset.label"
          style="display: grid; gap: var(--kds-spacing-container-0-25x);"
        >
          <div style="font: var(--kds-font-base-label-small-regular);">{{ preset.label }}</div>
          <KdsLoadingSkeleton :variant="preset.value" />
        </div>
      </div>
    `,
  }),
};

export const InputFieldPresets: Story = {
  args: {
    variant: "input-field",
  },
};

export const ListItemLargePreset: Story = {
  args: {
    variant: "list-item-large",
  },
};

export const ListItemLargeWithSubtextPreset: Story = {
  args: {
    variant: "list-item-large-with-subtext",
  },
};

export const ListItemSmallPreset: Story = {
  args: {
    variant: "list-item-small",
  },
};

export const ListItemSmallWithSubtextPreset: Story = {
  args: {
    variant: "list-item-small-with-subtext",
  },
};

export const CardPresets: Story = {
  args: {
    variant: "card-default",
  },
};

export const Backgrounds: Story = {
  render: (args) => ({
    components: { KdsLoadingSkeleton },
    setup() {
      const backgrounds = [
        {
          label: "Background Page Default",
          value: "var(--kds-color-background-page-default)",
        },
        {
          label: "Surface Default",
          value: "var(--kds-color-surface-default)",
        },
        {
          label: "Surface Muted",
          value: "var(--kds-color-surface-muted)",
        },
        {
          label: "Surface Subtle",
          value: "var(--kds-color-surface-subtle)",
        },
      ];

      return { args, backgrounds };
    },
    template: `
      <div style="display: grid; gap: var(--kds-spacing-container-0-75x);">
        <div
          v-for="background in backgrounds"
          :key="background.label"
          :style="{ background: background.value, padding: 'var(--kds-spacing-container-0-75x)' }"
        >
          <div style="font: var(--kds-font-base-body-small-strong); margin-bottom: var(--kds-spacing-container-0-5x);">
            {{ background.label }}
          </div>
          <KdsLoadingSkeleton
            v-bind="args"
            variant="text-headline-with-paragraph"
            :repeat="1"
          />
        </div>
      </div>
    `,
  }),
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsLoadingSkeleton,
  designsToCompare: {
    CombinedLayout: {
      props: {
        variant: "text-headline-with-paragraph",
        width: "var(--kds-dimension-component-width-8x)",
        loading: true,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18999-432":
          {},
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsLoadingSkeleton,
  combinationsProps: [
    {
      variant: ["default", "combined"],
      width: ["75%", "100%"],
      height: [
        "var(--kds-spacing-container-1x)",
        "var(--kds-spacing-container-2x)",
      ],
      repeat: [1, 3],
      repeatGap: ["var(--kds-spacing-container-0-12x)"],
      borderRadius: [
        undefined,
        "var(--kds-border-radius-container-none)",
        "var(--kds-border-radius-container-0-25x)",
      ],
      loading: [true],
    },
    {
      variant: ["text-default", "text-headline-with-paragraph"],
      loading: [true],
    },
    {
      variant: ["icon-large", "icon-medium", "icon-small"],
      loading: [true],
    },
    {
      variant: [
        "button-large",
        "button-medium",
        "button-small",
        "button-xsmall",
      ],
      loading: [true],
    },
    {
      variant: [
        "input-field",
        "list-item-large",
        "list-item-large-with-subtext",
        "list-item-small",
        "list-item-small-with-subtext",
        "card-default",
      ],
      loading: [true],
    },
  ],
  pseudoStates: ["hover"],
});
