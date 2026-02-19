import type { FunctionalComponent } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { kdsSizes } from "../../constants";
import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
} from "../../test-utils/storybook";

import KdsLoadingSpinner from "./KdsLoadingSpinner.vue";

const kdsLoadingSpinnerVariants = ["onSurface", "onPrimary"] as const;

const meta: Meta<typeof KdsLoadingSpinner> = {
  title: "Accessories/KdsLoadingSpinner",
  component: KdsLoadingSpinner as unknown as FunctionalComponent,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A loading spinner component that displays an animated circular progress indicator. It supports different sizes and color variants for use on different backgrounds.",
      },
    },
  },
  argTypes: {
    // Props
    size: {
      control: { type: "select" },
      options: kdsSizes,
      description: "The size of the loading spinner",
      table: {
        category: "Props",
        type: { summary: "xsmall | small | medium | large" },
        defaultValue: { summary: "medium" },
      },
    },
    variant: {
      control: { type: "select" },
      options: kdsLoadingSpinnerVariants,
      description: "The color variant of the spinner",
      table: {
        category: "Props",
        type: { summary: "onSurface | onPrimary" },
        defaultValue: { summary: "onSurface" },
      },
    },
  },
  args: {
    size: "medium",
    variant: "onSurface",
  },
};
export default meta;

type Story = StoryObj<typeof KdsLoadingSpinner>;

export const Default: Story = {
  args: {
    size: "medium",
    variant: "onSurface",
  },
};

export const OnPrimary: Story = {
  args: {
    variant: "onPrimary",
  },
  render: (args) => ({
    components: { KdsLoadingSpinner },
    setup() {
      return { args };
    },
    template: `
      <div style="background: var(--kds-color-background-primary-bold-initial); padding: 20px; display: inline-block;">
        <KdsLoadingSpinner v-bind="args" />
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: (args) => ({
    components: { KdsLoadingSpinner },
    setup() {
      return { args, kdsSizes };
    },
    template: `
      <div style="display: flex; gap: 20px; align-items: center;">
        <div v-for="size in kdsSizes" :key="size" style="display: flex; flex-direction: column; gap: 8px; align-items: center;">
          <KdsLoadingSpinner v-bind="args" :size="size" />
          <span style="font-size: 12px; color: var(--kds-color-text-and-icon-subtle);">{{ size }}</span>
        </div>
      </div>
    `,
  }),
};

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsLoadingSpinner,
  combinationsProps: [
    {
      size: kdsSizes,
      variant: kdsLoadingSpinnerVariants,
    },
  ],
  pseudoStates: [], // no hover/focus/active states for this component
});

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsLoadingSpinner,
  designsToCompare: {
    onSurface: {
      props: {
        variant: "onSurface",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1148-4371":
          {
            size: "large",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=11804-180241":
          {
            size: "medium",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=11804-180289":
          {
            size: "small",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=11810-180337":
          {
            size: "xsmall",
          },
      },
    },
    onPrimary: {
      props: {
        variant: "onPrimary",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=278-8786":
          {
            size: "large",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=11804-180238":
          {
            size: "medium",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=11804-180286":
          {
            size: "small",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=11810-180334":
          {
            size: "xsmall",
          },
      },
    },
  },
});

// There is no text to overflow -> No TextOverflow story for this component
