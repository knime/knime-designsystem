import type { FunctionalComponent } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { iconNames } from "@knime/kds-styles/img/icons/def";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook";
import { kdsButtonSize, kdsButtonSizes, kdsButtonVariants } from "../enums";

import KdsButton from "./KdsButton.vue";

const meta: Meta<typeof KdsButton> = {
  title: "Buttons/Button",
  component: KdsButton as unknown as FunctionalComponent,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=345-19622",
    },
  },
  argTypes: {
    label: {
      control: "text",
      table: { category: "props" },
    },
    variant: {
      control: { type: "select" },
      options: kdsButtonVariants,
      table: { category: "props" },
    },
    size: {
      control: { type: "select" },
      options: kdsButtonSizes,
      table: { category: "props" },
    },
    destructive: {
      control: "boolean",
      table: { category: "props" },
    },
    disabled: {
      control: "boolean",
      table: { category: "props" },
    },
    leadingIcon: {
      control: { type: "select" },
      options: [undefined, ...iconNames],
      table: { category: "props" },
    },
    trailingIcon: {
      control: { type: "select" },
      options: [undefined, ...iconNames],
      table: { category: "props" },
    },
    ariaLabel: {
      control: "text",
      table: { category: "props" },
    },
    title: {
      control: "text",
      table: { category: "props" },
    },
  },
  args: {
    label: "Button",
    variant: "filled",
    size: kdsButtonSize.MEDIUM,
    destructive: false,
    disabled: false,
    leadingIcon: undefined,
    trailingIcon: undefined,
    ariaLabel: undefined,
    title: "",
    onClick: fn(),
  },
};
export default meta;

type Story = StoryObj<typeof KdsButton>;

export const Filled: Story = {
  args: {
    variant: "filled",
    label: "Button",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    const button = canvas.getByRole("button", { name: "Button" });
    await expect(button).toBeInTheDocument();

    // Mouse interaction
    await user.click(button);
    await expect(button).toBeInTheDocument();

    // Keyboard interaction
    button.blur();
    await user.tab();
    await expect(button).toHaveFocus();
    await user.keyboard("{Enter}");
    await user.keyboard(" ");
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    label: "Button",
  },
};

export const Transparent: Story = {
  args: {
    variant: "transparent",
    label: "Button",
  },
};

export const Disabled: Story = {
  args: {
    label: "Button",
    disabled: true,
  },
  render: (args) => ({
    components: { KdsButton },
    setup() {
      return { args, kdsButtonVariants };
    },
    template: `
      <KdsButton v-bind="args" :variant="variant" v-for="variant in kdsButtonVariants" :key="variant" style="margin-bottom: 10px;" />`,
  }),
};

export const Destructive: Story = {
  args: {
    label: "Button",
    destructive: true,
  },
  render: (args) => ({
    components: { KdsButton },
    setup() {
      return { args, kdsButtonVariants };
    },
    template: `
      <KdsButton v-bind="args" :variant="variant" v-for="variant in kdsButtonVariants" :key="variant" style="margin-bottom: 10px;"/>`,
  }),
};

export const LeadingAndTrailingIcon: Story = {
  args: {
    label: "Button",
    variant: "outlined",
    leadingIcon: "ai-general",
    trailingIcon: "ai-general",
  },
};

export const IconOnly: Story = {
  args: {
    variant: "outlined",
    leadingIcon: "ai-general",
    ariaLabel: "Icon only button",
    title: "Icon only button",
  },
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsButton,
  }),
  args: {
    label: "Button with veeery loooong label",
    variant: "outlined",
    leadingIcon: "ai-general",
    trailingIcon: "ai-general",
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsButton,
  designsToCompare: {
    label: {
      props: {
        label: "{Label}",
        variant: "outlined",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-89691":
          {
            size: "large",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-89976":
          {
            size: "medium",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90261":
          {
            size: "small",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90546":
          {
            size: "xsmall",
          },
      },
    },
    leadingIcon: {
      props: {
        variant: "outlined",
        leadingIcon: "placeholder",
        ariaLabel: "Icon only button",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-89762":
          {
            size: "large",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90047":
          {
            size: "medium",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90332":
          {
            size: "small",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90617":
          {
            size: "xsmall",
          },
      },
    },
    leadingIconWithLabel: {
      props: {
        label: "{Label}",
        variant: "outlined",
        leadingIcon: "placeholder",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-89833":
          {
            size: "large",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90118":
          {
            size: "medium",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90403":
          {
            size: "small",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90688":
          {
            size: "xsmall",
          },
      },
    },
    trailingIconWithLabel: {
      props: {
        label: "{Label}",
        variant: "outlined",
        trailingIcon: "placeholder",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-89904":
          {
            size: "large",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90189":
          {
            size: "medium",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90474":
          {
            size: "small",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90759":
          {
            size: "xsmall",
          },
      },
    },
    leadingAndTrailingIcon: {
      props: {
        label: "{Label}",
        variant: "outlined",
        leadingIcon: "placeholder",
        trailingIcon: "placeholder",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197821":
          {
            size: "large",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197877":
          {
            size: "medium",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197933":
          {
            size: "small",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197989":
          {
            size: "xsmall",
          },
      },
    },
    filled: {
      props: {
        label: "{Label}",
        variant: "filled",
        leadingIcon: "placeholder",
        trailingIcon: "placeholder",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197804":
          {
            size: "large",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197860":
          {
            size: "medium",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197916":
          {
            size: "small",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197972":
          {
            size: "xsmall",
          },
      },
    },
    transparent: {
      props: {
        label: "{Label}",
        variant: "transparent",
        leadingIcon: "placeholder",
        trailingIcon: "placeholder",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197838":
          {
            size: "large",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197894":
          {
            size: "medium",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197950":
          {
            size: "small",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-198006":
          {
            size: "xsmall",
          },
      },
    },
  },
});

export const AllCombinationsXsmall: Story = buildAllCombinationsStory({
  component: KdsButton,
  combinationsProps: [
    {
      size: [kdsButtonSize.XSMALL],
      variant: kdsButtonVariants,
      disabled: [false, true],
      destructive: [false, true],
      label: ["Button"],
      leadingIcon: [undefined, "ai-general"],
      trailingIcon: [undefined, "ai-general"],
    },
    {
      size: [kdsButtonSize.XSMALL],
      variant: kdsButtonVariants,
      disabled: [false, true],
      destructive: [false, true],
      leadingIcon: ["ai-general"],
      ariaLabel: ["Icon only button"],
    },
  ],
  pseudoStates: ["hover", "active", "focus-visible"],
});

export const AllCombinationsSmall: Story = buildAllCombinationsStory({
  component: KdsButton,
  combinationsProps: [
    {
      size: [kdsButtonSize.SMALL],
      variant: kdsButtonVariants,
      disabled: [false, true],
      destructive: [false, true],
      label: ["Button"],
      leadingIcon: [undefined, "ai-general"],
      trailingIcon: [undefined, "ai-general"],
    },
    {
      size: [kdsButtonSize.SMALL],
      variant: kdsButtonVariants,
      disabled: [false, true],
      destructive: [false, true],
      leadingIcon: ["ai-general"],
      ariaLabel: ["Icon only button"],
    },
  ],
  pseudoStates: ["hover", "active", "focus-visible"],
});

export const AllCombinationsMedium: Story = buildAllCombinationsStory({
  component: KdsButton,
  combinationsProps: [
    {
      size: [kdsButtonSize.MEDIUM],
      variant: kdsButtonVariants,
      disabled: [false, true],
      destructive: [false, true],
      label: ["Button"],
      leadingIcon: [undefined, "ai-general"],
      trailingIcon: [undefined, "ai-general"],
    },
    {
      size: [kdsButtonSize.MEDIUM],
      variant: kdsButtonVariants,
      disabled: [false, true],
      destructive: [false, true],
      leadingIcon: ["ai-general"],
      ariaLabel: ["Icon only button"],
    },
  ],
  pseudoStates: ["hover", "active", "focus-visible"],
});

export const AllCombinationsLarge: Story = buildAllCombinationsStory({
  component: KdsButton,
  combinationsProps: [
    {
      size: [kdsButtonSize.LARGE],
      variant: kdsButtonVariants,
      disabled: [false, true],
      destructive: [false, true],
      label: ["Button"],
      leadingIcon: [undefined, "ai-general"],
      trailingIcon: [undefined, "ai-general"],
    },
    {
      size: [kdsButtonSize.LARGE],
      variant: kdsButtonVariants,
      disabled: [false, true],
      destructive: [false, true],
      leadingIcon: ["ai-general"],
      ariaLabel: ["Icon only button"],
    },
  ],
  pseudoStates: ["hover", "active", "focus-visible"],
});
