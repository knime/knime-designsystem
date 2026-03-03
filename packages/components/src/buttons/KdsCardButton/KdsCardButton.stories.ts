import { ref, watchEffect } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { expect, fn, userEvent, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook";

import DemoCard from "./DemoCard.vue";
import KdsCardButton from "./KdsCardButton.vue";
import { kdsCardVariants } from "./enums";

const meta = {
  title: "Buttons/CardButton",
  component: KdsCardButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A clickable card component that provides a container with different visual styles (filled, outlined, transparent) to hold non-interactive content. The card can …" +
          " <ul><li> be selectable, allowing users to toggle between selected and unselected states, or </li>" +
          " <li> emit click events when it is not selectable. </li></ul>" +
          "**Prop Usage in Wrapper Components**: Due to TypeScript limitations with discriminated unions in Vue templates, " +
          'you must use `v-bind` with a properly typed object. Direct prop binding (`:aria-label="..."`) will cause type errors. ' +
          "See the type documentation for examples.\n\n" +
          "**Avoid nesting interactive elements inside the card, as this creates accessibility issues and conflicts with the card's own click behavior.**",
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
      options: kdsCardVariants,
      table: {
        category: "props",
      },
    },
    selectable: {
      description:
        "Whether the card can be selected. When true, the card can be toggled between selected and unselected states. When false, the card will emit click events instead of toggling selected states.",
      control: { type: "boolean" },
      table: {
        category: "props",
      },
    },
    disabled: {
      description:
        "Whether the card is disabled. When disabled, the card cannot be clicked or focused.",
      control: { type: "boolean" },
      table: {
        category: "props",
      },
    },
    ariaLabel: {
      description:
        "Accessible label for the card. Either ariaLabel or ariaLabelledby must be provided. Use ariaLabel for simple text labels.",
      control: { type: "text" },
      table: {
        category: "props",
      },
    },
    ariaLabelledby: {
      description:
        "ID of an element that labels the card. Either ariaLabel or ariaLabelledby must be provided. Use ariaLabelledby when the label already exists elsewhere in the DOM.",
      control: { type: "text" },
      table: {
        category: "props",
      },
    },
    modelValue: {
      description:
        "Controls the selected state of the card when `selectable` is true. When `selectable` is false, this model is ignored.",
      control: { type: "boolean" },
      table: {
        category: "model",
      },
    },
    onClick: {
      table: { disable: true },
    },
    default: {
      control: false,
      description: "Default slot content rendered inside the card.",
      table: { category: "slots" },
    },
  },
  args: {
    modelValue: false,
    variant: "filled",
    selectable: false,
    disabled: false,
    ariaLabel: "Demo card for Storybook",
    ariaLabelledby: undefined,
  },
  render: (args) => {
    const [, updateArgs] = useArgs();
    return {
      components: { KdsCard: KdsCardButton },
      setup() {
        const modelValue = ref(args.modelValue);
        watchEffect(() => (modelValue.value = args.modelValue));
        watchEffect(() => updateArgs({ modelValue: modelValue.value }));
        return { args, modelValue };
      },
      template: `
        <KdsCard v-bind="args" v-model="modelValue">
          <div style="display: flex; flex-direction: column; gap: 6px; padding: 16px;">
            <div style="font: var(--kds-font-base-title-large-strong); color: var(--kds-color-text-and-icon-neutral);">Demo for Storybook</div>
            <div style="font: var(--kds-font-base-body-small); color: var(--kds-color-text-and-icon-neutral);">Once upon a time in a land of dreams, there lived a whimsical tale waiting to be told.</div>
          </div>
        </KdsCard>
      `,
    };
  },
} satisfies Meta<typeof KdsCardButton>;
export default meta;

type Story = StoryObj<typeof KdsCardButton>;
type DemoStory = StoryObj<typeof DemoCard>;

export const Default: Story = {
  args: {
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByRole("button", {
      name: "Demo card for Storybook",
    });
    let clicks = 0;

    // Test mouse interaction
    await userEvent.click(card);
    await expect(args.onClick).toHaveBeenCalledTimes(++clicks);

    // Test keyboard interaction
    card.focus();
    await userEvent.keyboard("{Enter}");
    await expect(args.onClick).toHaveBeenCalledTimes(++clicks);

    await userEvent.keyboard(" ");
    await expect(args.onClick).toHaveBeenCalledTimes(++clicks);
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
    selectable: true,
    modelValue: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByRole("button", {
      name: "Demo card for Storybook",
    });

    await expect(card).toHaveAttribute("aria-pressed", "true");

    // Test mouse interaction
    await userEvent.click(card);
    await expect(card).toHaveAttribute("aria-pressed", "false");

    await userEvent.click(card);
    await expect(card).toHaveAttribute("aria-pressed", "true");

    // Test keyboard interaction
    card.focus();
    await userEvent.keyboard("{Enter}");
    await expect(card).toHaveAttribute("aria-pressed", "false");

    await userEvent.keyboard(" ");
    await expect(card).toHaveAttribute("aria-pressed", "true");
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByRole("button", {
      name: "Demo card for Storybook",
    });

    await expect(card).toBeDisabled();
    await userEvent.click(card);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const TextOverflow: DemoStory = {
  ...buildTextOverflowStory({
    component: DemoCard,
    width: 300,
  }),
  args: {
    variant: "filled",
    ariaLabel: "Demo card for Storybook",
  },
};

export const DesignComparator: DemoStory = buildDesignComparatorStory({
  component: DemoCard,
  designsToCompare: {
    filled: {
      props: {
        variant: "filled",
        ariaLabel: "Demo card for Storybook",
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
            selectable: true,
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=14767-33737":
          {
            modelValue: true,
            selectable: true,
            parameters: {
              pseudo: { hover: true },
              figmaOffset: { x: -20, y: -20 },
            },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=14931-96400":
          {
            modelValue: true,
            selectable: true,
            parameters: {
              pseudo: { active: true },
              figmaOffset: { x: -8, y: -8 },
            },
          },
      },
    },
    outlined: {
      props: {
        variant: "outlined",
        ariaLabel: "Demo card for Storybook",
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
            selectable: true,
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15529-79544":
          {
            modelValue: true,
            selectable: true,
            parameters: {
              pseudo: { hover: true },
              figmaOffset: { x: -20, y: -20 },
            },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15529-79545":
          {
            modelValue: true,
            selectable: true,
            parameters: {
              pseudo: { active: true },
              figmaOffset: { x: -8, y: -8 },
            },
          },
      },
    },
    transparent: {
      props: {
        variant: "transparent",
        ariaLabel: "Demo card for Storybook",
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
            selectable: true,
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=14767-37015":
          {
            modelValue: true,
            selectable: true,
            parameters: {
              pseudo: { hover: true },
              figmaOffset: { x: -20, y: -20 },
            },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=14931-96328":
          {
            modelValue: true,
            selectable: true,
            parameters: {
              pseudo: { active: true },
              figmaOffset: { x: -8, y: -8 },
            },
          },
      },
    },
  },
  wrapperStyle: {
    width: "413px",
  },
});

export const AllCombinations: DemoStory = buildAllCombinationsStory({
  component: DemoCard,
  combinationsProps: [
    {
      variant: kdsCardVariants,
      modelValue: [false],
      selectable: [false],
      ariaLabel: ["Demo card for Storybook"],
    },
    {
      variant: kdsCardVariants,
      modelValue: [false, true],
      selectable: [true],
      ariaLabel: ["Demo card for Storybook"],
    },
  ],
  pseudoStates: ["hover", "active", "focus-visible"],
  columns: 3,
});
