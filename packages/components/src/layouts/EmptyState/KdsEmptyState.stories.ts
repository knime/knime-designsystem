import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { kdsButtonVariants } from "../../buttons";
import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook";

import KdsEmptyState from "./KdsEmptyState.vue";

type Story = StoryObj<typeof KdsEmptyState>;

const meta: Meta<typeof KdsEmptyState> = {
  component: KdsEmptyState,
  title: "Layouts/EmptyState",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Use `KdsEmptyState` to communicate that a view has *no content to show yet* (e.g. an empty list, nothing selected yet).\n\n" +
          "**How it works**\n" +
          "- Provide a `headline` (required) and optionally a `description`.\n" +
          "- Enable `loadingSpinner` to show a large loading spinner above the headline while content is being prepared.\n" +
          "- Optionally provide a primary next step via the `button` prop, which accepts either `KdsButtonProps` or `KdsLinkButtonProps`.\n" +
          "- If the `button` object contains a `to` property, the component renders a link button; otherwise it renders an action button. In both cases it emits `buttonClick` when the button is clicked.\n\n" +
          "**Example**\n" +
          "```vue\n" +
          "<KdsEmptyState\n" +
          '  headline="No entries in this list."\n' +
          '  description="Create your first item to get started."\n' +
          '  :loading-spinner="true"\n' +
          "  :button=\"{ label: 'Create item', variant: 'outlined' }\"\n" +
          '  @button-click="onCreate"\n' +
          "/>\n" +
          "```\n",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6088-32811",
    },
  },
  argTypes: {
    headline: {
      control: "text",
      description: "Main headline text displayed in the empty state",
      table: { category: "props" },
    },
    description: {
      control: "text",
      description: "Optional description text displayed below the headline",
      table: { category: "props" },
    },
    button: {
      control: "object",
      description:
        "Optional button configuration. Pass `KdsButtonProps` for an action button or `KdsLinkButtonProps` (with `to`) for a link button.",
      table: { category: "props" },
    },
    loadingSpinner: {
      control: "boolean",
      description:
        "Shows a loading spinner above the headline to indicate loading state.",
      table: { category: "props" },
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
    description: "",
    button: undefined,
    loadingSpinner: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByText("No entries in this list."),
    ).toBeInTheDocument();

    // description should not be rendered
    await expect(
      canvas.queryByText("Here is a smaller description of the state."),
    ).not.toBeInTheDocument();

    // button should not be rendered
    await expect(canvas.queryByRole("button")).not.toBeInTheDocument();
    await expect(canvas.queryByRole("link")).not.toBeInTheDocument();
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
    button: { label: "Create Item", variant: "outlined" },
    onButtonClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // description should be rendered
    await expect(
      canvas.getByText("Here is a smaller description of the state."),
    ).toBeInTheDocument();

    // renders a button (not a link)
    const button = canvas.getByRole("button", { name: "Create Item" });
    await expect(button).toBeInTheDocument();

    // mouse click emits buttonClick
    await userEvent.click(button);
    await expect(args.onButtonClick).toHaveBeenCalledTimes(1);

    // keyboard interaction
    button.focus();
    await userEvent.keyboard("{Enter}");
    await expect(args.onButtonClick).toHaveBeenCalledTimes(2);
  },
};

export const WithLoadingSpinner: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use when data is still loading and no empty-state content can be shown yet.",
      },
    },
  },
  args: {
    headline: "No entries in this list.",
    description: "Here is a smaller description of the state.",
    button: { label: "{Label}", variant: "outlined", size: "small" },
    loadingSpinner: true,
    onButtonClick: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const spinner = await canvas.findByTestId("loading-spinner");
    await expect(spinner).toBeInTheDocument();
  },
};

export const WithLinkButton: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use a link button for navigation by setting `to` in the button prop (e.g. to a documentation page or another view).",
      },
    },
  },
  args: {
    headline: "No entries in this list.",
    description: "Here is a smaller description of the state.",
    button: {
      label: "Learn More",
      variant: "outlined",
      to: "https://example.com",
    },
    onButtonClick: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // renders a link (not a plain button)
    const link = canvas.getByRole("link", { name: "Learn More" });
    await expect(link).toBeInTheDocument();
    await expect(link).toHaveAttribute("href", "https://example.com");
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
    button: {
      label: "Learn More",
      variant: "outlined",
      to: "https://example.com",
    },
  },
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsEmptyState,
    width: 180,
  }),
  args: {
    headline:
      "This is a very long headline text that should overflow and wrap properly when the container is too narrow for all the text to fit",
    description:
      "This is a very long helper text that should also overflow and wrap properly when there is not enough space available for the content",
    button: { label: "Create Item", variant: "outlined" },
    loadingSpinner: true,
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsEmptyState,
  wrapperStyle: { width: "205px", display: "flex", justifyContent: "center" },
  designsToCompare: {
    Variants: {
      props: {
        headline: "No {entries in this list}.",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7118-357843":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7118-357848":
          {
            description: "Here is a smaller description of the state.",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7118-357853":
          {
            description: "Here is a smaller description of the state.",
            button: {
              label: "{Label}",
              variant: "outlined",
              size: "small",
            },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=19417-80603":
          {
            description: "Here is a smaller description of the state.",
            button: {
              label: "{Label}",
              variant: "outlined",
              size: "small",
            },
            loadingSpinner: true,
          },
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsEmptyState,
  combinationsProps: [
    {
      headline: ["No entries in this list."],
      description: [undefined, "Here is a smaller description of the state."],
      loadingSpinner: [false, true],
    },
    ...kdsButtonVariants.map((variant) => ({
      headline: ["No entries in this list."],
      description: [undefined, "Here is a smaller description of the state."],
      loadingSpinner: [false, true],
      button: [{ label: "Create Item", variant }],
    })),
    ...kdsButtonVariants.map((variant) => ({
      headline: ["No entries in this list."],
      description: [undefined, "Here is a smaller description of the state."],
      loadingSpinner: [false, true],
      button: [
        {
          label: "Learn More",
          variant,
          to: "https://example.com",
        },
      ],
    })),
  ],
});
