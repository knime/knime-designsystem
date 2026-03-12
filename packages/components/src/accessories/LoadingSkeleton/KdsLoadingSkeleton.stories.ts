import type { FunctionalComponent } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook";

import KdsLoadingSkeleton from "./KdsLoadingSkeleton.vue";
import { kdsLoadingSkeletonVariants } from "./types";

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
    variant: {
      control: { type: "select" },
      options: kdsLoadingSkeletonVariants,
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
    repeatGap: "var(--kds-spacing-container-1-25x)",
  },
};

export default meta;

type Story = StoryObj<typeof KdsLoadingSkeleton>;

type VariantValue = (typeof kdsLoadingSkeletonVariants)[number];

type VariantListItem = {
  label: string;
  value: VariantValue;
  repeat?: number;
};

const buildVariantStory = (variant: VariantValue): Story => ({
  args: { variant },
});

const buildVariantListStory = ({
  items,
  containerGap,
  maxWidth,
}: {
  items: VariantListItem[];
  containerGap: string;
  maxWidth?: string;
}): Story => ({
  render: () => ({
    components: { KdsLoadingSkeleton },
    setup() {
      return {
        items,
        containerStyle: {
          display: "grid",
          gap: containerGap,
          ...(maxWidth ? { maxWidth } : {}),
        },
      };
    },
    template: `
      <div :style="containerStyle">
        <div
          v-for="item in items"
          :key="item.label"
          style="display: grid; gap: var(--kds-spacing-container-0-25x);"
        >
          <div style="font: var(--kds-font-base-label-small-regular);">{{ item.label }}</div>
          <KdsLoadingSkeleton :variant="item.value" :repeat="item.repeat ?? 1" />
        </div>
      </div>
    `,
  }),
});

export const Default: Story = {};

export const TextPresets: Story = buildVariantListStory({
  items: [
    {
      label: "Headline with Paragraph",
      value: "text-headline-with-paragraph",
      repeat: 1,
    },
  ],
  containerGap: "var(--kds-spacing-container-0-75x)",
  maxWidth: "28rem",
});

export const IconPresets: Story = buildVariantListStory({
  items: [
    { label: "Large", value: "icon-large" },
    { label: "Medium", value: "icon-medium" },
    { label: "Small", value: "icon-small" },
  ],
  containerGap: "var(--kds-spacing-container-0-5x)",
});

export const ButtonPresets: Story = buildVariantListStory({
  items: [
    { label: "Large", value: "button-large" },
    { label: "Medium", value: "button-medium" },
    { label: "Small", value: "button-small" },
    { label: "XSmall", value: "button-xsmall" },
  ],
  containerGap: "var(--kds-spacing-container-0-5x)",
});

export const InputFieldPresets: Story = buildVariantStory("input-field");

export const ListItemLargePreset: Story = buildVariantStory("list-item-large");

export const ListItemLargeWithSubtextPreset: Story = buildVariantStory(
  "list-item-large-with-subtext",
);

export const ListItemSmallPreset: Story = buildVariantStory("list-item-small");

export const ListItemSmallWithSubtextPreset: Story = buildVariantStory(
  "list-item-small-with-subtext",
);

export const CardPresets: Story = buildVariantStory("card-default");

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

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsLoadingSkeleton,
    width: 240,
  }),
  args: {
    variant: "text-headline-with-paragraph",
    repeat: 1,
    loading: true,
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsLoadingSkeleton,
  wrapperStyle: { width: "var(--kds-dimension-component-width-8x)" },
  designsToCompare: {
    HeadlineWithParagraphLayout: {
      props: {
        variant: "text-headline-with-paragraph",
        width: "100%",
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
