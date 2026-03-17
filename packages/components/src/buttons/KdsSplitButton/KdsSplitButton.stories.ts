import type { FunctionalComponent } from "vue";
import { ref, watchEffect } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { expect, fn, userEvent, within } from "storybook/test";

import { iconNames } from "@knime/kds-styles/img/icons/def";

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
      options: [undefined, ...iconNames],
      table: { category: "props" },
    },
    title: {
      control: "text",
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
    selectedActionId: {
      control: "text",
      description:
        "The ID of the currently selected action. When set, the primary button displays this action's label and icon.",
      table: { category: "model" },
    },
  },
  args: {
    "onClick:primary": fn(),
    "onClick:alternative": fn(),
    "onUpdate:selectedActionId": fn(),
    alternativeActions: [
      { id: "duplicate", label: "Duplicate" },
      { id: "rename", label: "Rename" },
      { id: "delete", label: "Delete", leadingIcon: "trash" },
    ],
    selectedActionId: undefined,
  },
};
export default meta;

type Story = StoryObj<typeof KdsSplitButton>;

export const Filled: Story = {
  args: {
    variant: "filled",
    size: "medium",
    label: "{Label}",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    size: "medium",
    label: "{Label}",
  },
};

export const Transparent: Story = {
  args: {
    variant: "transparent",
    size: "medium",
    label: "{Label}",
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
    selectedActionId: undefined,
    alternativeActions: [
      { id: "run-all", label: "Run all" },
      { id: "run-selected", label: "Run selected" },
      { id: "schedule", label: "Schedule", leadingIcon: "circle-success" },
    ],
  },
  render: (args) => {
    const [, updateArgs] = useArgs();
    return {
      components: { KdsSplitButton },
      setup() {
        const selectedActionId = ref(args.selectedActionId);
        watchEffect(() => (selectedActionId.value = args.selectedActionId));
        watchEffect(() =>
          updateArgs({ selectedActionId: selectedActionId.value }),
        );
        return { args, selectedActionId };
      },
      template:
        '<KdsSplitButton v-bind="args" v-model:selected-action-id="selectedActionId" />',
    };
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Initially, primary button shows default label
    const primaryButton = canvas.getByRole("button", { name: "Run" });
    await userEvent.click(primaryButton);
    await expect(args["onClick:primary"]).toHaveBeenCalledOnce();

    // Open the menu
    const secondaryButton = canvas.getByRole("button", {
      name: "Change option",
    });
    await userEvent.click(secondaryButton);

    const contextMenu = await canvas.findByRole("menu", {
      name: "Actions",
    });
    await expect(contextMenu).toBeVisible();

    // Click on "Run selected" action
    const runSelectedAction = await canvas.findByRole("menuitem", {
      name: "Run selected",
    });
    await userEvent.click(runSelectedAction);

    await expect(args["onClick:alternative"]).toHaveBeenCalledOnce();
    await expect(args["onUpdate:selectedActionId"]).toHaveBeenCalledWith(
      "run-selected",
    );

    // After selection, the primary button should now show "Run selected"
    const updatedPrimaryButton = await canvas.findByRole("button", {
      name: "Run selected",
    });
    await expect(updatedPrimaryButton).toBeInTheDocument();
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
