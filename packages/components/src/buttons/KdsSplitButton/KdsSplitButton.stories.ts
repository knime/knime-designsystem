import type { FunctionalComponent } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { kdsIconNames } from "../../accessories";
import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook";
import { kdsButtonSizes, kdsButtonVariants } from "../enums";

import KdsSplitButton from "./KdsSplitButton.vue";

const meta: Meta<typeof KdsSplitButton> = {
  title: "Buttons/SplitButton",
  component: KdsSplitButton as unknown as FunctionalComponent,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1329-5891",
    },
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: kdsButtonSizes,
      table: { category: "props" },
    },
    variant: {
      control: { type: "select" },
      options: kdsButtonVariants,
      table: { category: "props" },
    },
    disabled: {
      control: "boolean",
      table: { category: "props" },
    },
    label: {
      control: "text",
      table: { category: "props" },
    },
    leadingIcon: {
      control: { type: "select" },
      options: kdsIconNames,
      table: { category: "props" },
    },
    primaryAriaLabel: {
      control: "text",
      table: { category: "props" },
    },
    contextMenuAriaLabel: {
      control: "text",
      table: { category: "props" },
    },
    alternativeActions: {
      control: "object",
      table: { category: "props" },
    },
    menuMaxHeight: {
      control: "text",
      table: { category: "props" },
    },
  },
  args: {
    size: "medium",
    variant: "filled",
    disabled: false,
    label: "{Label}",
    leadingIcon: undefined,
    primaryAriaLabel: undefined,
    contextMenuAriaLabel: undefined,
    menuMaxHeight: undefined,
    "onClick:primary": fn(),
    "onClick:alternativeAction": fn(),
    alternativeActions: [
      { id: "duplicate", label: "Duplicate" },
      { id: "rename", label: "Rename" },
      { id: "delete", label: "Delete", leadingIcon: "trash" },
    ],
  },
};
export default meta;

type Story = StoryObj<typeof KdsSplitButton>;

export const Default: Story = {
  args: {
    variant: "filled",
    size: "medium",
    label: "Save",
    alternativeActions: [
      { id: "save-as", label: "Save as" },
      { id: "save-all", label: "Save all" },
      { id: "export", label: "Export", leadingIcon: "file-export" },
    ],
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // --- Mouse interaction ---

    // Click primary button
    const primaryButton = canvas.getByRole("button", { name: "Save" });
    await userEvent.click(primaryButton);
    await expect(args["onClick:primary"]).toHaveBeenCalledOnce();

    // Open menu via mouse click on secondary button
    const secondaryButton = canvas.getByRole("button", {
      name: "Change option",
    });
    await userEvent.click(secondaryButton);
    const menu = await canvas.findByRole("menu");
    await expect(menu).toBeVisible();

    // Select an item via mouse
    const saveAsItem = await canvas.findByRole("menuitem", {
      name: "Save as",
    });
    await userEvent.click(saveAsItem);
    await expect(args["onClick:alternativeAction"]).toHaveBeenCalledWith(
      "save-as",
    );
    // Menu should close after selection
    await expect(canvas.queryByRole("menu")).not.toBeInTheDocument();

    // --- Keyboard interaction ---

    // After menu close, focus returns to secondary button
    await expect(secondaryButton).toHaveFocus();
    await userEvent.keyboard("[Enter]");
    const keyboardMenu = await canvas.findByRole("menu");
    await expect(keyboardMenu).toBeVisible();

    // Navigate and select with keyboard
    await userEvent.keyboard("[ArrowDown]");
    await userEvent.keyboard("[Enter]");
    await expect(canvas.queryByRole("menu")).not.toBeInTheDocument();
  },
};

export const WithIcon: Story = {
  args: {
    variant: "filled",
    size: "medium",
    label: "{Label}",
    leadingIcon: "placeholder",
  },
};

export const Disabled: Story = {
  args: {
    variant: "filled",
    size: "medium",
    label: "{Label}",
    disabled: true,
  },
};

export const PrimaryAndAlternativeActions: Story = {
  args: {
    variant: "filled",
    size: "medium",
    label: "Run",
    alternativeActions: [
      { id: "run-all", label: "Run all" },
      { id: "run-selected", label: "Run selected" },
      { id: "schedule", label: "Schedule", leadingIcon: "circle-success" },
    ],
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Primary button always shows original label
    const primaryButton = canvas.getByRole("button", { name: "Run" });
    await userEvent.click(primaryButton);
    await expect(args["onClick:primary"]).toHaveBeenCalledOnce();

    // Open the menu
    const secondaryButton = canvas.getByRole("button", {
      name: "Change option",
    });
    await userEvent.click(secondaryButton);

    const contextMenu = await canvas.findByRole("menu");
    await expect(contextMenu).toBeVisible();

    // Click on "Run selected" action
    const runSelectedAction = await canvas.findByRole("menuitem", {
      name: "Run selected",
    });
    await userEvent.click(runSelectedAction);

    await expect(args["onClick:alternativeAction"]).toHaveBeenCalledWith(
      "run-selected",
    );

    // Primary button label should NOT change
    await expect(primaryButton).toHaveTextContent("Run");
  },
};

export const WithLinkActions: Story = {
  args: {
    variant: "outlined",
    size: "medium",
    label: "Open",
    alternativeActions: [
      { id: "docs", label: "Documentation", href: "https://example.com/docs" },
      { id: "settings", label: "Settings", to: "/settings" },
      { id: "export", label: "Export" },
    ],
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Open the menu
    const secondaryButton = canvas.getByRole("button", {
      name: "Change option",
    });
    await userEvent.click(secondaryButton);

    const contextMenu = await canvas.findByRole("menu");
    await expect(contextMenu).toBeVisible();

    // Click on a non-link action and verify the event is emitted
    const exportAction = await canvas.findByRole("menuitem", {
      name: "Export",
    });
    await userEvent.click(exportAction);

    await expect(args["onClick:alternativeAction"]).toHaveBeenCalledWith(
      "export",
    );
  },
};

export const MenuWithManyActions: Story = {
  args: {
    variant: "transparent",
    size: "medium",
    label: "Open Menu",
    menuMaxHeight: "150px",
    alternativeActions: [
      { id: "option-1", label: "Option 1" },
      { id: "option-2", label: "Option 2" },
      { id: "option-3", label: "Option 3" },
      { id: "option-4", label: "Option 4" },
      { id: "option-5", label: "Option 5" },
      { id: "option-6", label: "Option 6" },
      { id: "option-7", label: "Option 7" },
      { id: "option-8", label: "Option 8" },
      { id: "option-9", label: "Option 9" },
      { id: "option-10", label: "Option 10" },
    ],
  },
};

export const Sizes: Story = {
  render: (args) => ({
    components: { KdsSplitButton },
    setup() {
      return { args, sizes: kdsButtonSizes };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <KdsSplitButton
          v-for="size in sizes"
          :key="size"
          v-bind="args"
          :size="size"
        />
      </div>
    `,
  }),
  args: {
    variant: "filled",
    label: "{Label}",
  },
};

export const Variants: Story = {
  render: (args) => ({
    components: { KdsSplitButton },
    setup() {
      return { args, variants: kdsButtonVariants };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <KdsSplitButton
          v-for="variant in variants"
          :key="variant"
          v-bind="args"
          :variant="variant"
        />
      </div>
    `,
  }),
  args: {
    size: "medium",
    label: "{Label}",
  },
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsSplitButton,
  }),
  args: {
    variant: "filled",
    size: "medium",
    label:
      "Split button with veeery loooong label text to test overflow behavior",
    leadingIcon: "placeholder",
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsSplitButton,
  designsToCompare: {
    filled: {
      props: {
        variant: "filled",
        label: "{Label}",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=602:20866":
          {
            size: "large",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2344:9030":
          {
            size: "medium",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2271:52937":
          {
            size: "small",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=14441:56046":
          {
            size: "xsmall",
          },
      },
    },
    filledWithIcon: {
      props: {
        variant: "filled",
        label: "{Label}",
        leadingIcon: "placeholder",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=602:20866":
          {
            size: "large",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2344:9030":
          {
            size: "medium",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2271:52937":
          {
            size: "small",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=14441:56046":
          {
            size: "xsmall",
          },
      },
    },
    outlined: {
      props: {
        variant: "outlined",
        label: "{Label}",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=640:3564":
          {
            size: "large",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2344:9060":
          {
            size: "medium",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2271:53033":
          {
            size: "small",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=14441:56138":
          {
            size: "xsmall",
          },
      },
    },
    transparent: {
      props: {
        variant: "transparent",
        label: "{Label}",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=12719:33967":
          {
            size: "large",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=12719:47473":
          {
            size: "medium",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=12719:47801":
          {
            size: "small",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=14441:56147":
          {
            size: "xsmall",
          },
      },
    },
    disabled: {
      props: {
        variant: "filled",
        label: "{Label}",
        disabled: true,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2271:52722":
          {
            size: "large",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2344:8994":
          {
            size: "medium",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2271:52953":
          {
            size: "small",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=14441:56062":
          {
            size: "xsmall",
          },
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsSplitButton,
  combinationsProps: [
    {
      size: kdsButtonSizes,
      variant: kdsButtonVariants,
      disabled: [false, true],
      label: ["Button"],
      leadingIcon: [undefined],
    },
    {
      size: kdsButtonSizes,
      variant: kdsButtonVariants,
      disabled: [false, true],
      label: ["Button"],
      leadingIcon: ["placeholder"],
    },
  ],
  pseudoStates: ["hover", "active", "focus-visible"],
});
