import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { kdsIconNames } from "../../../../accessories/Icon/enums";
import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../../../test-utils/storybook";

import KdsListItemButton from "./KdsListItemButton.vue";

const figmaBaseUrl =
  "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components";

const meta: Meta<typeof KdsListItemButton> = {
  title: "Form Fields/_Helper/ListItem/Button",
  component: KdsListItemButton,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: `${figmaBaseUrl}?node-id=15406-54749`,
    },
    docs: {
      description: {
        component:
          "Internal helper button rendered inside a list. It displays a leading icon and a label, and emits a click event when activated.",
      },
    },
  },
  argTypes: {
    label: {
      control: "text",
      description: "Text shown in the button item.",
      table: { category: "props" },
    },
    leadingIcon: {
      control: { type: "select" },
      options: kdsIconNames,
      description: "Leading icon displayed before the label.",
      table: { category: "props" },
    },
    disabled: {
      control: "boolean",
      description: "Disables interaction and dims the content.",
      table: { category: "props" },
    },
    onClick: {
      table: { disable: true },
    },
  },
  args: {
    label: "Action",
    leadingIcon: "plus",
    disabled: false,
    onClick: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof KdsListItemButton>;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    const button = canvas.getByRole("button", { name: "Action" });

    await expect(button).toBeEnabled();
    await expect(canvas.getByText("Action")).toBeInTheDocument();

    // Mouse interaction
    await user.click(button);
    await expect(args.onClick).toHaveBeenCalledOnce();

    // Keyboard interaction
    button.blur();
    button.focus();
    await user.keyboard("{Enter}");
    await expect(args.onClick).toHaveBeenCalledTimes(2);
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const button = canvas.getByRole("button", { name: "Action" });

    await expect(button).toBeDisabled();

    await user.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsListItemButton,
    width: 260,
  }),
  args: {
    label:
      "This is a very long label that should overflow with an ellipsis when there is not enough space",
    leadingIcon: "plus",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const restricted = within(canvas.getByTestId("restricted"));

    // findByTitle auto-retries until the truncation observer sets the title
    await restricted.findByTitle(
      "This is a very long label that should overflow with an ellipsis when there is not enough space",
    );

    const unrestricted = within(canvas.getByTestId("unrestricted"));
    const unrestrictedLabel =
      await unrestricted.findByText(/This is a very long/);
    await expect(unrestrictedLabel).not.toHaveAttribute("title");
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsListItemButton,
  wrapperStyle: { width: "200px" },
  designsToCompare: {
    Default: {
      props: {
        label: "Label",
        leadingIcon: "placeholder",
      },
      variants: {
        [`${figmaBaseUrl}?node-id=15406-54749`]: {},
        [`${figmaBaseUrl}?node-id=18026-139150`]: {
          parameters: { pseudo: { hover: true } },
        },
        [`${figmaBaseUrl}?node-id=18026-139171`]: {
          parameters: { pseudo: { active: true } },
        },
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsListItemButton,
  combinationsProps: [
    {
      label: ["Action"],
      leadingIcon: ["plus"],
      disabled: [false, true],
    },
  ],
  pseudoStates: ["hover", "active", "focus-visible"],
});
