import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { fn } from "storybook/test";

import { iconNames } from "@knime/kds-styles/img/icons/def";

import { kdsButtonVariants } from "../Button/constants";
import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../test-utils/storybook";

import KdsEmptyState from "./KdsEmptyState.vue";

type Story = StoryObj<typeof KdsEmptyState>;

const meta: Meta<typeof KdsEmptyState> = {
  component: KdsEmptyState,
  title: "Components/KdsEmptyState",
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6088-32811&m=dev",
    },
  },
  argTypes: {
    headline: {
      control: "text",
      description: "Main headline text displayed in the empty state",
    },
    description: {
      control: "text",
      description: "Optional description text displayed below the headline",
    },
    buttonAction: {
      control: "boolean",
      description: "Show button with action callback",
    },
    buttonLink: {
      control: "text",
      description:
        "Optional link URL. When provided, a link button will be rendered instead of an action button.",
    },
    label: {
      control: "text",
      description: "Button label text",
      table: { category: "Button Props" },
    },
    variant: {
      control: "select",
      options: kdsButtonVariants,
      description: "Button variant style",
      table: { category: "Button Props" },
    },
    destructive: {
      control: "boolean",
      table: { category: "Button Props" },
    },
    disabled: {
      control: "boolean",
      table: { category: "Button Props" },
    },
    leadingIcon: {
      control: { type: "select" },
      options: [undefined, ...iconNames],
      table: { category: "Button Props" },
    },
    trailingIcon: {
      control: { type: "select" },
      options: [undefined, ...iconNames],
      table: { category: "Button Props" },
    },
    ariaLabel: {
      control: "text",
      table: { category: "Button Props" },
    },
    title: {
      control: "text",
      table: { category: "Button Props" },
    },
  },
  args: {
    headline: "No entries in this list.",
  },
};

export default meta;

export const Default: Story = {
  args: {
    headline: "No entries in this list.",
  },
};

export const WithDescription: Story = {
  args: {
    headline: "No entries in this list.",
    description: "Here is a smaller description of the state.",
  },
};

export const WithButtonAction: Story = {
  args: {
    headline: "No entries in this list.",
    description: "Here is a smaller description of the state.",
    label: "Create Item",
    variant: "outlined",
    buttonAction: fn(),
  },
};

export const WithButtonLink: Story = {
  args: {
    headline: "No entries in this list.",
    description: "Here is a smaller description of the state.",
    label: "Learn More",
    variant: "outlined",
    buttonLink: "https://example.com",
  },
};

export const ButtonActionOnly: Story = {
  args: {
    headline: "No entries in this list.",
    label: "Create Item",
    variant: "outlined",
    buttonAction: fn(),
  },
};

export const ButtonLinkOnly: Story = {
  args: {
    headline: "No entries in this list.",
    label: "Learn More",
    variant: "outlined",
    buttonLink: "https://example.com",
  },
};

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsEmptyState,
  combinationsProps: [
    {
      headline: ["No entries in this list."],
      description: [undefined, "Here is a smaller description of the state."],
    },
    {
      headline: ["No entries in this list."],
      description: [undefined, "Here is a smaller description of the state."],
      label: ["Create Item"],
      variant: kdsButtonVariants,
      buttonAction: [fn()],
    },
    {
      headline: ["No entries in this list."],
      description: [undefined, "Here is a smaller description of the state."],
      label: ["Learn More"],
      variant: kdsButtonVariants,
      buttonLink: ["https://example.com"],
    },
  ],
});

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsEmptyState,
    width: 280,
  }),
  args: {
    headline:
      "This is a very long headline text that should overflow and wrap properly when the container is too narrow for all the text to fit",
    description:
      "This is a very long helper text that should also overflow and wrap properly when there is not enough space available for the content",
    label: "Create Item",
    variant: "outlined",
    buttonAction: fn(),
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsEmptyState,
  designsToCompare: {
    Default: {
      props: {
        headline: "No entries in this list.",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7118-357843&m=dev":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7118-357664&m=dev":
          {
            description: "Here is a smaller description of the state.",
          },
      },
    },
    WithAction: {
      props: {
        headline: "No entries in this list.",
        label: "Create Item",
        variant: "outlined",
        buttonAction: fn(),
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7118-357942&m=dev":
          {
            description: "Here is a smaller description of the state.",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7118-358000&m=dev":
          {},
      },
    },
  },
});
