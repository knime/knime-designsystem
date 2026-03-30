import type { FunctionalComponent } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { iconNames } from "@knime/kds-styles/img/icons/def";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../../test-utils/storybook";
import { kdsButtonSizes, kdsButtonVariants } from "../../enums";
import { buildWrappingComponentDocs } from "../docs";

import KdsLinkButton from "./KdsLinkButton.vue";

const meta: Meta<typeof KdsLinkButton> = {
  title: "Buttons/LinkButton",
  component: KdsLinkButton as unknown as FunctionalComponent,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `Same styles as \`KdsButton\`, but rendered as an \`<a>\` element.${buildWrappingComponentDocs(
          "KdsLinkButton",
        )}`,
      },
    },
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
    to: {
      control: "text",
      description:
        "URL or path string to navigate to. To support typed routes and route-location objects, please create an app-level wrapper (e.g. with `RouterLink`/`NuxtLink`) as described above.",
      table: { category: "props" },
    },
    target: {
      control: "text",
      description: "Target browsing context for anchor-based links.",
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
    size: "medium",
    destructive: false,
    disabled: false,
    leadingIcon: undefined,
    trailingIcon: undefined,
    to: "#",
    ariaLabel: undefined,
    title: "",
    onClick: fn(),
  },
};
export default meta;

type Story = StoryObj<typeof KdsLinkButton>;

export const Filled: Story = {
  parameters: {
    docs: false,
  },
  args: {
    variant: "filled",
    label: "Button",
    to: "#filled",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    const link = canvas.getByRole("link", { name: "Button" });
    await expect(link).toBeInTheDocument();

    // Mouse interaction
    await user.click(link);

    // Keyboard interaction
    link.blur();
    await user.tab();
    await expect(link).toHaveFocus();
  },
};

export const Disabled: Story = {
  parameters: {
    docs: false,
  },
  args: {
    variant: "filled",
    label: "Button",
    to: "https://www.knime.com",
    disabled: true,
  },
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsLinkButton,
  }),
  args: {
    label: "Link button with veeery loooong label",
    variant: "outlined",
    to: "https://www.knime.com",
    leadingIcon: "placeholder",
    trailingIcon: "placeholder",
  },
};

// DesignComparator reuses the same Figma designs as KdsButton since visuals are identical
export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsLinkButton,
  designsToCompare: {
    label: {
      props: {
        label: "{Label}",
        variant: "outlined",
        to: "https://www.knime.com",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-89976":
          {
            size: "medium",
          },
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsLinkButton,
  combinationsProps: [
    {
      variant: kdsButtonVariants,
      disabled: [false, true],
      destructive: [false, true],
      label: ["Button"],
      to: ["https://www.knime.com"],
      leadingIcon: [undefined, "placeholder"],
    },
  ],
  pseudoStates: ["hover", "focus-visible"],
});
