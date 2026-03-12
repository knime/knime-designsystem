import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { kdsIconNames } from "../../../../accessories/Icon/enums.ts";
import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../../../test-utils/storybook.ts";

import KdsListItem from "./KdsListItem.vue";
import { dataTypeAccessory, demoAccessories } from "./demo-accessories.ts";

const meta: Meta<typeof KdsListItem> = {
  component: KdsListItem,
  title: "Form Fields/_Helper/ListItem/Small",
  tags: ["autodocs"],
  decorators: [
    () => ({
      template: '<div role="listbox" aria-label="Listbox"><story /></div>',
    }),
  ],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18026-139128",
    },
  },
  argTypes: {
    variant: {
      table: { disable: true },
    },
    onClick: {
      table: { disable: true },
    },
    id: {
      control: "text",
      description: "Unique identifier for the list item.",
      table: { category: "props" },
    },
    role: {
      control: "text",
      description: "Role for the list item.",
      table: { category: "props" },
    },
    accessory: {
      control: "select",
      options: Object.keys(demoAccessories),
      mapping: demoAccessories,
      description:
        "Optional leading accessory (icon, data type, color swatch, avatar, or live status).",
      table: { category: "props" },
    },
    label: {
      control: "text",
      description: "Text shown in the list item.",
      table: { category: "props" },
    },
    subText: {
      control: "text",
      description:
        "Two-line subtext. When provided, the item renders in multiline mode.",
      table: { category: "props" },
    },
    special: {
      control: "boolean",
      description:
        "Applies 'special content' styling (used when the content is not a standard data field).",
      table: { category: "props" },
    },
    shortcut: {
      control: "text",
      description: "Optional shortcut text (e.g. 'Ctrl + 1').",
      table: { category: "props" },
    },
    trailingIcon: {
      control: "select",
      options: kdsIconNames,
      description: "Optional trailing icon displayed at the end of the row.",
      table: { category: "props" },
    },
    active: {
      control: "boolean",
      description: "Highlights as current keyboard-active option.",
      table: { category: "props" },
    },
    selected: {
      control: "boolean",
      description: "Applies selected styling.",
      table: { category: "props" },
    },
    missing: {
      control: "boolean",
      description: "Applies missing/error styling and prepends '(Missing)'.",
      table: { category: "props" },
    },
    disabled: {
      control: "boolean",
      description: "Disables interaction and dims the content.",
      table: { category: "props" },
    },
  },
  args: {
    id: "list-item-1",
    label: "Label",
    subText: "",
    variant: "small",
    shortcut: "",
    trailingIcon: undefined,
    accessory: undefined,
    special: false,
    active: false,
    selected: false,
    missing: false,
    disabled: false,
    onClick: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof KdsListItem>;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const option = canvas.getByRole("option");

    await expect(option).toHaveAttribute("aria-selected", "false");
    await expect(option).not.toHaveAttribute("aria-disabled", "true");
    await expect(canvas.getByText("Label")).toBeInTheDocument();

    await userEvent.click(option);
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const WithAccessory: Story = {
  args: {
    accessory: dataTypeAccessory,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Label")).toBeInTheDocument();
    await expect(
      canvasElement.querySelector(".kds-data-type-icon-container"),
    ).toBeInTheDocument();
  },
};

export const Multiline: Story = {
  args: {
    subText: "Subtext",
    accessory: dataTypeAccessory,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Label")).toBeInTheDocument();
    await expect(canvas.getByText("Subtext")).toBeInTheDocument();
    await expect(
      canvasElement.querySelector(".kds-data-type-icon-container"),
    ).toBeInTheDocument();
  },
};

export const Active: Story = {
  args: {
    active: true,
    subText: "Subtext",
    accessory: dataTypeAccessory,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const option = canvas.getByRole("option");

    await expect(option).toHaveClass("active");
  },
};
export const Selected: Story = {
  args: {
    accessory: dataTypeAccessory,
    subText: "Subtext",
    selected: true,
    trailingIcon: "checkmark",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const option = canvas.getByRole("option");

    await expect(option).toHaveAttribute("aria-selected", "true");

    const icons = option.querySelectorAll(".kds-icon");
    await expect(icons.length).toBe(1);
  },
};

export const Missing: Story = {
  args: {
    accessory: dataTypeAccessory,
    subText: "Subtext",
    missing: true,
    trailingIcon: "trash",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("(Missing)")).toBeInTheDocument();

    const option = canvas.getByRole("option");
    const icons = option.querySelectorAll(".kds-icon");
    await expect(icons.length).toBe(1);
  },
};

export const Disabled: Story = {
  args: {
    accessory: dataTypeAccessory,
    subText: "Subtext",
    trailingIcon: "checkmark",
    disabled: true,
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const option = canvas.getByRole("option");

    await expect(option).toHaveAttribute("aria-disabled", "true");

    await userEvent.click(option);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsListItem,
    width: 240,
  }),
  args: {
    label:
      "This is a very long label that should overflow with an ellipsis when there is not enough space",
    subText:
      "This is a longer subtext that should be clamped to two lines. Additional content beyond two lines must be cut off to keep the row height stable.",
    accessory: dataTypeAccessory,
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsListItem,
  wrapperStyle: { width: "200px" },
  designsToCompare: {
    Singleline: {
      props: {
        id: "design-comparator-item",
        variant: "small",
        label: "Label",
        accessory: { type: "icon", name: "placeholder" },
        shortcut: "Ctrl + 1",
        trailingIcon: "chevron-right",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18026-139129":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18026-139150":
          { parameters: { pseudo: { hover: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18026-139171":
          { parameters: { pseudo: { active: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18026-139192":
          { disabled: true },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18201-16214":
          { label: "Label that is very long label" },
      },
    },
    Special: {
      props: {
        id: "design-comparator-item",
        variant: "small",
        label: "Label",
        accessory: { type: "icon", name: "placeholder" },
        shortcut: "Ctrl + 1",
        trailingIcon: "chevron-right",
        special: true,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18047-187794":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18047-187815&m=dev":
          { parameters: { pseudo: { hover: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18047-187836&m=dev":
          { parameters: { pseudo: { active: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18047-187857&m=dev":
          { disabled: true },
      },
    },
    Selected: {
      props: {
        id: "design-comparator-item",
        variant: "small",
        label: "Label",
        accessory: { type: "icon", name: "placeholder" },
        trailingIcon: "checkmark",
        selected: true,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18026-139211":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18026-139228":
          { parameters: { pseudo: { hover: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18026-139245":
          { parameters: { pseudo: { active: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18026-139262":
          { disabled: true },
      },
    },
    Missing: {
      props: {
        id: "design-comparator-item",
        variant: "small",
        label: "Label",
        accessory: { type: "icon", name: "placeholder" },
        trailingIcon: "trash",
        missing: true,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18047-187599":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18047-187616":
          { parameters: { pseudo: { hover: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18047-187633":
          { parameters: { pseudo: { active: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18047-187650":
          { disabled: true, trailingIcon: undefined },
      },
    },
    Multiline: {
      props: {
        id: "design-comparator-item",
        variant: "small",
        label: "Label",
        subText: "{Subtext}",
        accessory: { type: "icon", name: "placeholder" },
        shortcut: "Ctrl + 1",
        trailingIcon: "chevron-right",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18026-139139":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18026-139160":
          { parameters: { pseudo: { hover: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18026-139181":
          { parameters: { pseudo: { active: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18026-139201":
          { disabled: true },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18201-16658":
          {
            label: "Label that is very long",
            subText:
              "Here is a description that can be maximum 2 lines long and if its longer than it gets truncated to not break the layout, so keep it short",
          },
      },
    },
    "Multiline, Special": {
      props: {
        id: "design-comparator-item",
        variant: "small",
        label: "Label",
        subText: "{Subtext}",
        accessory: { type: "icon", name: "placeholder" },
        shortcut: "Ctrl + 1",
        trailingIcon: "chevron-right",
        special: true,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18047-187804":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18047-187825":
          { parameters: { pseudo: { hover: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18047-187846":
          { parameters: { pseudo: { active: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18047-187866":
          { disabled: true },
      },
    },
    "Multiline, Selected": {
      props: {
        id: "design-comparator-item",
        variant: "small",
        label: "Label",
        subText: "{Subtext}",
        accessory: { type: "icon", name: "placeholder" },
        trailingIcon: "checkmark",
        selected: true,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18026-139219":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18026-139236":
          { parameters: { pseudo: { hover: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18026-139253":
          { parameters: { pseudo: { active: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18026-139270":
          { disabled: true },
      },
    },
    "Multiline, Missing": {
      props: {
        id: "design-comparator-item",
        variant: "small",
        label: "Label",
        subText: "{Subtext}",
        accessory: { type: "icon", name: "placeholder" },
        trailingIcon: "trash",
        missing: true,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18047-187607":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18047-187624":
          { parameters: { pseudo: { hover: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18047-187641":
          { parameters: { pseudo: { active: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18047-187658":
          { disabled: true, trailingIcon: undefined },
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsListItem,
  combinationsProps: [
    {
      id: ["item"],
      variant: ["small"],
      selected: [false, true],
      label: ["Label"],
      subText: [undefined, "Subtext"],
      accessory: [undefined, dataTypeAccessory],
      special: [false, true],
      missing: [false],
      disabled: [false, true],
      active: [false, true],
    },
    {
      id: ["item"],
      variant: ["small"],
      selected: [false],
      label: ["Label"],
      subText: [undefined, "Subtext"],
      accessory: [undefined, dataTypeAccessory],
      special: [false],
      missing: [true],
      disabled: [false, true],
      active: [false, true],
    },
  ],
  pseudoStates: ["hover", "active"],
});
