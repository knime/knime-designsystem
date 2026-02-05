import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { fn } from "storybook/test";

import KdsButton from "../buttons/KdsButton.vue";
import {
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
          "A card component that provides a container with different visual styles (filled, outlined, transparent) to hold content.",
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
    modelValue: {
      description:
        "Whether the card is in a selected/value state. When true, the card uses selected styling (teal background/borders).",
      control: "boolean",
      table: {
        category: "Props",
      },
    },
  },
  args: {
    variant: "filled",
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
            <KdsButton label="Generate a new version" size="xsmall" variant="filled" @click="handleButtonClick"></KdsButton>
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
        <KdsCard v-for="variant in variants" :key="variant" :variant="variant">
          <div style="display: flex; flex-direction: column; gap: 6px; padding: 16px; width: 413px;">
            <div style="font: var(--kds-font-base-title-large-strong); color: var(--kds-color-text-and-icon-default);">Demo for Storybook</div>
            <div style="font: var(--kds-font-base-body-small); color: var(--kds-color-text-and-icon-default);">Once upon a time in a land of dreams, there lived a whimsical tale waiting to be told.</div>
            <div @mousedown.stop.prevent>
              <KdsButton label="Generate a new version" size="xsmall" variant="filled" @click="onButtonClick"></KdsButton>
            </div>
          </div>
        </KdsCard>
      </div>`,
  }),
};

export const AllCombinations: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    components: { KdsCard, KdsButton },
    setup() {
      const allCombinations: Array<{
        variant: KdsCardVariant;
        modelValue: boolean;
      }> = [];
      const variants: KdsCardVariant[] = ["filled", "outlined", "transparent"];
      const values = [false, true];
      variants.forEach((variant) => {
        values.forEach((modelValue) => {
          allCombinations.push({ variant, modelValue });
        });
      });
      const pseudoStates = ["", "hover", "active"];
      const onButtonClick = fn();
      return {
        allCombinations,
        pseudoStates,
        onButtonClick,
      };
    },
    template: `
      Hover to see the props of each instance:
      <div style="display: grid; grid-template-columns: repeat(4, auto); gap: 1rem;">
        <template v-for="(state, stateIndex) in pseudoStates" :key="state">
          <div v-if="state" style="grid-column: span 4; font-weight: bold; margin-top: 1rem; text-transform: capitalize;">
            {{ state }}
          </div>
          <template v-for="(props, index) in allCombinations" :key="index">
            <div 
              :title="state ? JSON.stringify({ ...props, _pseudo: state }, null, 2) : JSON.stringify(props, null, 2)" 
              style="display: grid; gap: 0.5rem;"
              :class="state ? \`pseudo-\${state}-all\` : undefined"
            >
              <div>
                <div style="font-size: 10px; color: var(--kds-color-text-and-icon-subtle);">
                  {{ index + stateIndex * allCombinations.length }}
                </div>
                <KdsCard v-bind="props">
                  <div style="display: flex; flex-direction: column; gap: 6px; padding: 16px; width: 413px;">
                    <div style="font: var(--kds-font-base-title-large-strong); color: var(--kds-color-text-and-icon-default);">Demo for Storybook</div>
                    <div style="font: var(--kds-font-base-body-small); color: var(--kds-color-text-and-icon-default);">Once upon a time in a land of dreams, there lived a whimsical tale waiting to be told.</div>
                    <div @mousedown.stop.prevent>
                      <KdsButton label="Generate a new version" size="xsmall" variant="filled" @click="onButtonClick"></KdsButton>
                    </div>
                  </div>
                </KdsCard>
              </div>
            </div>
          </template>
        </template>
      </div>
    `,
  }),
};

// Create a wrapper component for DesignComparator that includes demo content
const CardWithContent = {
  name: "CardWithContent",
  props: ["variant", "value"],
  components: { KdsCard, KdsButton },
  setup() {
    const onButtonClick = fn();
    return { onButtonClick };
  },
  template: `
    <KdsCard v-bind="$props">
      <div style="display: flex; flex-direction: column; gap: 6px; padding: 16px; width: 413px">
        <div style="font: var(--kds-font-base-title-large-strong); color: var(--kds-color-text-and-icon-default);">Demo for Storybook</div>
        <div style="font: var(--kds-font-base-body-small); color: var(--kds-color-text-and-icon-default);">Once upon a time in a land of dreams, there lived a whimsical tale waiting to be told.</div>
        <div @mousedown.stop.prevent>
          <KdsButton label="Generate a new version" size="xsmall" variant="filled" @click="onButtonClick"></KdsButton>
        </div>
      </div>
    </KdsCard>
  `,
};

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
              <KdsButton label="Generate a new version" size="xsmall" variant="filled" @click="onButtonClick"></KdsButton>
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
                <KdsButton label="Generate a new version" size="xsmall" variant="filled" @click="onButtonClick"></KdsButton>
              </div>
            </div>
          </KdsCard>
        </div>
      </div>`,
  }),
};
