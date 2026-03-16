import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, userEvent, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../../test-utils/storybook.ts";

import ResizeHandle from "./ResizeHandle.vue";

const figmaBaseUrl =
  "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components";

const meta: Meta<typeof ResizeHandle> = {
  title: "Layouts/ResizeContainer/ResizeHandle",
  component: ResizeHandle,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Internal helper that renders one or more horizontal resize handle lines. " +
          "It manages hover propagation between sibling handles. " +
          "Pointer and keyboard resize behavior is handled by the parent container.",
      },
    },
    design: {
      type: "figma",
      url: `${figmaBaseUrl}?node-id=3996-26820`,
    },
  },
  argTypes: {
    numberOfHandles: {
      control: { type: "number", min: 1 },
      description: "Number of handle lines to display.",
      table: { category: "props" },
    },
    handleGap: {
      control: "text",
      description:
        "Gap between multiple handle lines (CSS value). Only applies when numberOfHandles > 1.",
      table: { category: "props" },
    },
  },
  args: {
    numberOfHandles: 1,
    handleGap: "0px",
  },
};

export default meta;

type Story = StoryObj<typeof ResizeHandle>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", {
      name: "Resize vertically",
    });

    // Mouse: click to focus
    await userEvent.click(button);
    await expect(button).toHaveFocus();

    // Keyboard: tab to focus
    button.blur();
    await userEvent.tab();
    await expect(button).toHaveFocus();
  },
};

export const MultipleHandles: Story = {
  args: {
    numberOfHandles: 3,
    handleGap: "16px",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const handles = canvas.getAllByRole("button", {
      name: "Resize vertically",
    });

    await expect(handles).toHaveLength(3);

    // Mouse: click first handle to focus
    await userEvent.click(handles[0]);
    await expect(handles[0]).toHaveFocus();

    // Keyboard: tab between handles
    await userEvent.tab();
    await expect(handles[1]).toHaveFocus();
  },
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: ResizeHandle,
    width: 200,
  }),
  args: {
    numberOfHandles: 3,
    handleGap: "16px",
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: ResizeHandle,
  wrapperStyle: "width: 108px",
  designsToCompare: {
    Horizontal: {
      props: {},
      variants: {
        [`${figmaBaseUrl}?node-id=3996-26816`]: {
          parameters: { figmaOffset: { x: 27 } },
        },
        [`${figmaBaseUrl}?node-id=4353-8108`]: {
          parameters: { pseudo: { hover: true }, figmaOffset: { x: 27 } },
        },
        [`${figmaBaseUrl}?node-id=4353-8112`]: {
          parameters: { pseudo: { active: true }, figmaOffset: { x: 27 } },
        },
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: ResizeHandle,
  combinationsProps: [
    {
      numberOfHandles: [1, 3],
    },
  ],
  pseudoStates: ["hover", "active", "focus-visible"],
});
