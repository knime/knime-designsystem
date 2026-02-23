import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/internal/preview-api";
import { expect, fn, userEvent, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook";

import DemoCard from "./DemoCard.vue";
import KdsCard from "./KdsCard.vue";
import { kdsCardVariants } from "./enums";

const meta: Meta<typeof KdsCard> = {
  title: "Structures/KdsCard",
  component: KdsCard,
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
      description:
        "Controls the selected state of the card when `selectable` is true. When `selectable` is false, this model is ignored.",
      control: { type: "boolean" },
      table: {
        category: "Model",
      },
    },
    onClick: {
      table: { disable: true },
    },
  },
  args: {
    modelValue: false,
    variant: "filled",
    selectable: false,
    disabled: false,
    ariaLabel: "Demo card for Storybook",
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
export default meta;

type Story = StoryObj<typeof KdsCard>;
type DemoStory = StoryObj<typeof DemoCard>;

export const Default: Story = {
  args: {
    onClick: fn(),
  },
  decorators: [
    (story) => {
      const [currentArgs, updateArgs] = useArgs();
      return {
        components: { story },
        setup() {
          return {
            args: currentArgs,
            updateArgs,
          };
        },
        template:
          '<story v-bind="args" @update:modelValue="(value) => updateArgs({ modelValue: value })" />',
      };
    },
  ],
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByRole("button", {
      name: args.ariaLabel ?? "Demo card for Storybook",
    });

    if (args.selectable) {
      await expect(card).toHaveAttribute("aria-pressed", "false");

      await userEvent.click(card);
      await expect(card).toHaveAttribute("aria-pressed", "true");

      await userEvent.click(card);
      await expect(card).toHaveAttribute("aria-pressed", "false");

      // Test keyboard interaction
      card.focus();
      await userEvent.keyboard("{Enter}");
      await expect(card).toHaveAttribute("aria-pressed", "true");

      await userEvent.keyboard(" ");
      await expect(card).toHaveAttribute("aria-pressed", "false");
    } else {
      let clicks = 0;
      await userEvent.click(card);
      await expect(args.onClick).toHaveBeenCalledTimes(++clicks);

      // Test keyboard interaction
      card.focus();
      await userEvent.keyboard("{Enter}");
      await expect(args.onClick).toHaveBeenCalledTimes(++clicks);

      await userEvent.keyboard(" ");
      await expect(args.onClick).toHaveBeenCalledTimes(++clicks);
    }
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
    selectable: true,
    modelValue: true,
  },
};

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

export const TextOverflow: DemoStory = {
  ...buildTextOverflowStory({
    component: DemoCard,
    width: 300,
  }),
  args: {
    variant: "filled",
    ariaLabel: "Demo card for Storybook",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
};
