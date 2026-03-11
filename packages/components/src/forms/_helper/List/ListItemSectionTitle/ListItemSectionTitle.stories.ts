import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, waitFor, within } from "storybook/test";

import { kdsIconNames } from "../../../../accessories/Icon/enums";
import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../../../test-utils/storybook";

import ListItemSectionTitle from "./ListItemSectionTitle.vue";

const figmaBaseUrl =
  "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components";

const meta: Meta<typeof ListItemSectionTitle> = {
  title: "Form Fields/_Helper/ListItem/SectionTitle",
  component: ListItemSectionTitle,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Internal helper that renders a muted section title row for grouped list content.",
      },
    },
    design: {
      type: "figma",
      url: `${figmaBaseUrl}?node-id=15752-6652`,
    },
  },
  argTypes: {
    label: {
      control: "text",
      description: "Text shown in the section title row.",
      table: { category: "props" },
    },
    leadingIcon: {
      control: { type: "select" },
      options: kdsIconNames,
      description: "Optional leading icon shown before the section title.",
      table: { category: "props" },
    },
  },
  args: {
    label: "Sectiontitle",
    leadingIcon: undefined,
  },
};

export default meta;

type Story = StoryObj<typeof ListItemSectionTitle>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Sectiontitle")).toBeInTheDocument();
    await expect(
      canvasElement.querySelector(".kds-icon"),
    ).not.toBeInTheDocument();
  },
};

export const WithIcon: Story = {
  args: {
    leadingIcon: "placeholder",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Sectiontitle")).toBeInTheDocument();
    await expect(canvasElement.querySelector(".icon")).toBeInTheDocument();
  },
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: ListItemSectionTitle,
    width: 160,
  }),
  args: {
    label:
      "This is a very long section title that should overflow with an ellipsis when there is not enough space",
    leadingIcon: "placeholder",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const unrestricted = within(canvas.getByTestId("unrestricted"));
    const restricted = within(canvas.getByTestId("restricted"));

    // Title is shown when text overflows
    await waitFor(async () => {
      const restrictedText = await restricted.findByText(/This is a very long/);
      expect(restrictedText).toHaveAttribute(
        "title",
        "This is a very long section title that should overflow with an ellipsis when there is not enough space",
      );
    });

    // Title is not shown when text does not overflow
    const unrestrictedText =
      await unrestricted.findByText(/This is a very long/);
    expect(unrestrictedText).not.toHaveAttribute("title");
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: ListItemSectionTitle,
  wrapperStyle: { width: "316px" },
  designsToCompare: {
    WithIcon: {
      props: {
        label: "Sectiontitle",
        leadingIcon: "placeholder",
      },
      variants: {
        [`${figmaBaseUrl}?node-id=15752-6652`]: {},
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: ListItemSectionTitle,
  combinationsProps: [
    {
      label: ["Sectiontitle"],
      leadingIcon: [undefined, "placeholder"],
    },
  ],
});
