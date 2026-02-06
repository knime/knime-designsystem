import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { fn } from "storybook/test";

import KdsButton from "../buttons/KdsButton.vue";
import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../test-utils/storybook";

import KdsCard from "./KdsCard.vue";
import type { KdsCardVariant } from "./types";

const meta: Meta<typeof KdsCard> = {
  title: "Components/KdsCard",
  component: KdsCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A clickable card component that provides a container with different visual styles (filled, outlined, transparent) to hold content. " +
          "The card can be selectable, allowing users to toggle between selected and unselected states, or it can emit click events when not selectable. " +
          "The card supports hover, active, and focus-visible states to provide visual feedback to users. " +
          "The component includes proper ARIA attributes (aria-pressed, aria-disabled) for accessibility.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=14669-30811",
    },
  },
  argTypes: {
    variant: {
      description:
        "The visual style of the card container. Filled provides a surface background, Outlined has a border with transparent background, and Transparent has no visible container styling.",
      control: { type: "select" },
      options: ["filled", "outlined", "transparent"] as KdsCardVariant[],
      table: {
        category: "Props",
      },
    },
    selectable: {
      description:
        "Whether the card can be selected. When true, the card can be toggled between selected and unselected states. When false, the card will emit click events instead of toggling selected states.",
      control: { type: "boolean" },
      table: {
        category: "Props",
      },
    },
    disabled: {
      description:
        "Whether the card is disabled. When disabled, the card cannot be clicked or focused, and aria-disabled is set to true.",
      control: { type: "boolean" },
      table: {
        category: "Props",
      },
    },
    ariaLabel: {
      description:
        "Accessible label for the card. Either ariaLabel or ariaLabelledby must be provided. Use ariaLabel for simple text labels.",
      control: { type: "text" },
      table: {
        category: "Props",
      },
    },
    ariaLabelledby: {
      description:
        "ID of an element that labels the card. Either ariaLabel or ariaLabelledby must be provided. Use ariaLabelledby when the label already exists elsewhere in the DOM.",
      control: { type: "text" },
      table: {
        category: "Props",
      },
    },
    modelValue: {
      control: { type: "select" },
      options: [false, true],
      table: {
        category: "Model",
      },
    },
  },
  args: {
    variant: "filled",
    selectable: true,
    disabled: false,
    ariaLabel: "Demo card for Storybook",
    modelValue: false,
    onClick: fn(),
  },
  render: (args) => ({
    components: { KdsCard, KdsButton },
    setup() {
      const onButtonClick = fn();
      const handleButtonClick = (e: MouseEvent) => {
        onButtonClick(e);
      };
      return { args, handleButtonClick };
    },
    template: `
      <KdsCard v-bind="args">
        <div style="display: flex; flex-direction: column; gap: 6px; padding: 16px;">
          <div style="font: var(--kds-font-base-title-large-strong); color: var(--kds-color-text-and-icon-default);">Demo for Storybook</div>
          <div style="font: var(--kds-font-base-body-small); color: var(--kds-color-text-and-icon-default);">Once upon a time in a land of dreams, there lived a whimsical tale waiting to be told.</div>
          <div @mousedown.stop.prevent>
            <KdsButton label="Generate a new version" size="xsmall" variant="filled" @click.stop="handleButtonClick"></KdsButton>
          </div>
        </div>
      </KdsCard>
    `,
  }),
};
export default meta;

type Story = StoryObj<typeof KdsCard>;

export const Filled: Story = {
  args: {
    variant: "filled",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
  },
};

export const Transparent: Story = {
  args: {
    variant: "transparent",
  },
};

export const Selected: Story = {
  args: {
    variant: "filled",
    modelValue: true,
  },
};

export const Focused: Story = {
  args: {
    variant: "filled",
  },
  parameters: {
    pseudo: {
      focusVisible: true,
    },
  },
  render: (args) => ({
    components: { KdsCard },
    setup() {
      return { args };
    },
    template: `
      <KdsCard v-bind="args">
        <div style="display: flex; flex-direction: column; gap: 6px; padding: 16px;">
          <div style="font: var(--kds-font-base-title-large-strong); color: var(--kds-color-text-and-icon-default);">Demo for Storybook</div>
          <div style="font: var(--kds-font-base-body-small); color: var(--kds-color-text-and-icon-default);">Once upon a time in a land of dreams, there lived a whimsical tale waiting to be told.</div>
        </div>
      </KdsCard>
    `,
  }),
};

export const AllVariants: Story = {
  render: () => ({
    components: { KdsCard, KdsButton },
    setup() {
      const variants: KdsCardVariant[] = ["filled", "outlined", "transparent"];
      const onButtonClick = fn();
      return { variants, onButtonClick };
    },
    template: `
      <div style="display: grid; gap: 16px;">
        <KdsCard v-for="variant in variants" :key="variant" :variant="variant" aria-label="Demo card for Storybook">
          <div style="display: flex; flex-direction: column; gap: 6px; padding: 16px; width: 413px;">
            <div style="font: var(--kds-font-base-title-large-strong); color: var(--kds-color-text-and-icon-default);">Demo for Storybook</div>
            <div style="font: var(--kds-font-base-body-small); color: var(--kds-color-text-and-icon-default);">Once upon a time in a land of dreams, there lived a whimsical tale waiting to be told.</div>
            <div @mousedown.stop.prevent>
              <KdsButton label="Generate a new version" size="xsmall" variant="filled" @click.stop="onButtonClick"></KdsButton>
            </div>
          </div>
        </KdsCard>
      </div>`,
  }),
};

// Create a wrapper component for AllCombinations and DesignComparator that includes demo content
const CardWithContent = {
  name: "CardWithContent",
  props: ["variant", "modelValue", "selectable", "disabled"],
  components: { KdsCard, KdsButton },
  setup() {
    const onButtonClick = fn();
    return { onButtonClick };
  },
  template: `
    <KdsCard v-bind="$props" aria-label="Demo card for Storybook">
      <div style="display: flex; flex-direction: column; gap: 6px; padding: 16px; width: 413px">
        <div style="font: var(--kds-font-base-title-large-strong); color: var(--kds-color-text-and-icon-default);">Demo for Storybook</div>
        <div style="font: var(--kds-font-base-body-small); color: var(--kds-color-text-and-icon-default);">Once upon a time in a land of dreams, there lived a whimsical tale waiting to be told.</div>
        <div @mousedown.stop.prevent>
          <KdsButton label="Generate a new version" size="xsmall" variant="filled" @click.stop="onButtonClick"></KdsButton>
        </div>
      </div>
    </KdsCard>
  `,
};

export const AllCombinations: Story = buildAllCombinationsStory({
  component: CardWithContent,
  combinationsProps: [
    {
      variant: ["filled", "outlined", "transparent"] as KdsCardVariant[],
      modelValue: [false, true],
      selectable: [false, true],
      disabled: [false, true],
    },
  ],
  pseudoStates: ["hover", "active", "focus-visible"],
  columns: 3,
});

export const DesignComparator: Story = buildDesignComparatorStory({
  component: CardWithContent,
  designsToCompare: {
    filled: {
      props: {
        variant: "filled" as KdsCardVariant,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=14767-33734":
          {
            modelValue: false,
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=14767-33735":
          {
            modelValue: false,
            parameters: {
              pseudo: { hover: true },
              figmaOffset: { x: -20, y: -20 },
            },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=14931-95900":
          {
            modelValue: false,
            parameters: {
              pseudo: { active: true },
              figmaOffset: { x: -8, y: -8 },
            },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=14767-33736":
          {
            modelValue: true,
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=14767-33737":
          {
            modelValue: true,
            parameters: {
              pseudo: { hover: true },
              figmaOffset: { x: -20, y: -20 },
            },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=14931-96400":
          {
            modelValue: true,
            parameters: {
              pseudo: { active: true },
              figmaOffset: { x: -8, y: -8 },
            },
          },
      },
    },
    outlined: {
      props: {
        variant: "outlined" as KdsCardVariant,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15529-79540":
          {
            modelValue: false,
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15529-79541":
          {
            modelValue: false,
            parameters: {
              pseudo: { hover: true },
              figmaOffset: { x: -20, y: -20 },
            },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15529-79542":
          {
            modelValue: false,
            parameters: {
              pseudo: { active: true },
              figmaOffset: { x: -8, y: -8 },
            },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15529-79543":
          {
            modelValue: true,
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15529-79544":
          {
            modelValue: true,
            parameters: {
              pseudo: { hover: true },
              figmaOffset: { x: -20, y: -20 },
            },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15529-79545":
          {
            modelValue: true,
            parameters: {
              pseudo: { active: true },
              figmaOffset: { x: -8, y: -8 },
            },
          },
      },
    },
    transparent: {
      props: {
        variant: "transparent" as KdsCardVariant,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=14767-37012":
          {
            modelValue: false,
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=14767-37013":
          {
            modelValue: false,
            parameters: {
              pseudo: { hover: true },
              figmaOffset: { x: -20, y: -20 },
            },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=14931-96193":
          {
            modelValue: false,
            parameters: {
              pseudo: { active: true },
              figmaOffset: { x: -8, y: -8 },
            },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=14767-37014":
          {
            modelValue: true,
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=14767-37015":
          {
            modelValue: true,
            parameters: {
              pseudo: { hover: true },
              figmaOffset: { x: -20, y: -20 },
            },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=14931-96328":
          {
            modelValue: true,
            parameters: {
              pseudo: { active: true },
              figmaOffset: { x: -8, y: -8 },
            },
          },
      },
    },
  },
});

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsCard,
    width: 300,
  }),
  args: {
    variant: "filled",
    ariaLabel: "Demo card for Storybook",
  },
  render: (args) => ({
    components: { KdsCard, KdsButton },
    setup() {
      const onButtonClick = fn();
      return { args, onButtonClick };
    },
    template: `
      <div>
        <div>Component without size restrictions to check if it has a max size itself<br></div>
        <KdsCard v-bind="args">
          <div style="display: flex; flex-direction: column; gap: 6px; padding: 16px;">
            <div style="font: var(--kds-font-base-title-large-strong); color: var(--kds-color-text-and-icon-default);">Demo for Storybook</div>
            <div style="font: var(--kds-font-base-body-small); color: var(--kds-color-text-and-icon-default);">Once upon a time in a land of dreams, there lived a whimsical tale waiting to be told.</div>
            <div @mousedown.stop.prevent>
              <KdsButton label="Generate a new version" size="xsmall" variant="filled" @click.stop="onButtonClick"></KdsButton>
            </div>
          </div>
        </KdsCard>
        <br>
        <div>Component with size restrictions. Try by resizing the box!</div>
        <div style="padding: 10px; background: lightgray; resize: both; overflow: auto;">
          <KdsCard v-bind="args">
            <div style="display: flex; flex-direction: column; gap: 6px; padding: 16px;">
              <div style="font: var(--kds-font-base-title-large-strong); color: var(--kds-color-text-and-icon-default);">Demo for Storybook</div>
              <div style="font: var(--kds-font-base-body-small); color: var(--kds-color-text-and-icon-default);">Once upon a time in a land of dreams, there lived a whimsical tale waiting to be told.</div>
              <div @mousedown.stop.prevent>
                <KdsButton label="Generate a new version" size="xsmall" variant="filled" @click.stop="onButtonClick"></KdsButton>
              </div>
            </div>
          </KdsCard>
        </div>
      </div>`,
  }),
};
