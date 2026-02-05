import { type PropType, defineComponent, h } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { iconNames } from "@knime/kds-styles/img/icons/def";

import { kdsButtonVariants } from "../buttons/constants";
import { kdsSizes } from "../constants";
import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../test-utils/storybook";

import KdsEmptyState from "./KdsEmptyState.vue";
import type { KdsEmptyStateProps } from "./types";

type Story = StoryObj<typeof KdsEmptyState>;

// Wrapper component to constrain width for Figma comparison
const KdsEmptyStateWrapper = defineComponent({
  name: "KdsEmptyStateWrapper",
  props: {
    headline: {
      type: String as PropType<KdsEmptyStateProps["headline"]>,
      required: true,
    },
    description: {
      type: String as PropType<KdsEmptyStateProps["description"]>,
      default: undefined,
    },
    buttonLabel: {
      type: String as PropType<
        Extract<KdsEmptyStateProps, { buttonLabel?: string }>["buttonLabel"]
      >,
      default: undefined,
    },
    buttonVariant: {
      type: String as PropType<
        Extract<KdsEmptyStateProps, { buttonVariant?: string }>["buttonVariant"]
      >,
      default: undefined,
    },
    buttonSize: {
      type: String as PropType<
        Extract<KdsEmptyStateProps, { buttonSize?: string }>["buttonSize"]
      >,
      default: undefined,
    },
  },
  setup(props) {
    return () =>
      h(
        "div",
        {
          style: { width: "205px", display: "flex", justifyContent: "center" },
        },
        [
          h(KdsEmptyState, {
            headline: props.headline,
            description: props.description,
            buttonLabel: props.buttonLabel,
            buttonVariant: props.buttonVariant,
            buttonSize: props.buttonSize,
          } as KdsEmptyStateProps),
        ],
      );
  },
});

const meta: Meta<typeof KdsEmptyState> = {
  component: KdsEmptyState,
  title: "Components/KdsEmptyState",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Use `KdsEmptyState` to communicate that a view has *no content to show yet* (e.g. an empty list, nothing selected yet).\n\n" +
          "**How it works**\n" +
          "- Provide a `headline` (required) and optionally a `description`.\n" +
          "- Optionally provide a primary next step via the button props. For details about variants/icons/behavior, see the `KdsButton` and `KdsLinkButton` stories.\n" +
          "- If you set `buttonTo`, the component renders a link button; otherwise it renders an action button. In both cases it emits `buttonClick` when the button is clicked.\n\n" +
          "**Example**\n" +
          "```vue\n" +
          "<KdsEmptyState\n" +
          '  headline="No entries in this list."\n' +
          '  description="Create your first item to get started."\n' +
          '  button-label="Create item"\n' +
          '  button-variant="outlined"\n' +
          '  @button-click="onCreate"\n' +
          "/>\n" +
          "```\n",
      },
    },
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
    buttonTo: {
      control: "text",
      description:
        "Optional link URL. When provided, a link button will be rendered instead of an action button.",
      table: { category: "Link Button Props" },
    },
    buttonLabel: {
      control: "text",
      description: "Button label text",
      table: { category: "Button Props" },
    },
    buttonVariant: {
      control: "select",
      options: kdsButtonVariants,
      description: "Button variant style",
      table: { category: "Button Props" },
    },
    buttonSize: {
      control: "select",
      options: kdsSizes,
      description: "Button size",
      table: { category: "Button Props" },
    },
    buttonDestructive: {
      description:
        "Marks the button as destructive (use for dangerous/irreversible actions).",
      control: "boolean",
      table: { category: "Button Props" },
    },
    buttonDisabled: {
      description: "Disables the button.",
      control: "boolean",
      table: { category: "Button Props" },
    },
    buttonLeadingIcon: {
      control: { type: "select" },
      description:
        "Optional leading icon. For icon-only buttons, set `buttonAriaLabel`.",
      options: [undefined, ...iconNames],
      table: { category: "Button Props" },
    },
    buttonTrailingIcon: {
      control: { type: "select" },
      description:
        "Optional trailing icon (requires `buttonLabel`, no trailing-icon-only button).",
      options: [undefined, ...iconNames],
      table: { category: "Button Props" },
    },
    buttonAriaLabel: {
      description:
        "Accessible label for icon-only buttons (and to override the accessible name).",
      control: "text",
      table: { category: "Button Props" },
    },
    buttonTitle: {
      description: "Optional tooltip text (HTML `title` attribute).",
      control: "text",
      table: { category: "Button Props" },
    },
  },
};

export default meta;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use when the empty state is self-explanatory and requires no user action (e.g. list that is often empty).",
      },
    },
  },
  args: {
    headline: "No entries in this list.",
  },
};

export const WithDescription: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use when users may need context to understand why the list is empty or what kind of content will appear here.",
      },
    },
  },
  args: {
    headline: "No entries in this list.",
    description: "Here is a smaller description of the state.",
  },
};

export const WithActionButton: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use when the empty state should guide the user toward a next step, such as creating, adding, or configuring something.",
      },
    },
  },
  args: {
    headline: "No entries in this list.",
    description: "Here is a smaller description of the state.",
    buttonLabel: "Create Item",
    buttonVariant: "outlined",
  },
};

export const WithLinkButton: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use a link button for navigation by setting `buttonTo` (e.g. to a documentation page or another view).",
      },
    },
  },
  args: {
    headline: "No entries in this list.",
    description: "Here is a smaller description of the state.",
    buttonLabel: "Learn More",
    buttonVariant: "outlined",
    buttonTo: "https://example.com",
  },
};

export const LinkButtonOnly: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Render a link button without description to keep the focus on the primary next step.",
      },
    },
  },
  args: {
    headline: "No entries in this list.",
    buttonLabel: "Learn More",
    buttonVariant: "outlined",
    buttonTo: "https://example.com",
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
      buttonLabel: ["Create Item"],
      buttonVariant: kdsButtonVariants,
    },
    {
      headline: ["No entries in this list."],
      description: [undefined, "Here is a smaller description of the state."],
      buttonLabel: ["Learn More"],
      buttonVariant: kdsButtonVariants,
      buttonTo: ["https://example.com"],
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
    buttonLabel: "Create Item",
    buttonVariant: "outlined",
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsEmptyStateWrapper,
  designsToCompare: {
    Variants: {
      props: {
        headline: "No {entries in this list}.",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7118-357843&m=dev":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7118-357848&m=dev":
          {
            description: "Here is a smaller description of the state.",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7118-357853&m=dev":
          {
            description: "Here is a smaller description of the state.",
            buttonLabel: "[Label]",
            buttonVariant: "outlined",
            buttonSize: "small",
          },
      },
    },
  },
});
