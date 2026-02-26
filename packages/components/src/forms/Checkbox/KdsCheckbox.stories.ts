import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { expect, userEvent, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook";

import KdsCheckbox from "./KdsCheckbox.vue";
import { kdsCheckboxValues } from "./enums";

type Story = StoryObj<typeof KdsCheckbox>;

const meta: Meta<typeof KdsCheckbox> = {
  title: "Form Fields/Checkbox",
  component: KdsCheckbox as Meta<typeof KdsCheckbox>["component"],
  tags: ["autodocs"],
  argTypes: {
    modelValue: {
      control: { type: "select" },
      options: kdsCheckboxValues,
      description: "v-model binding for the checkbox state",
      table: { category: "model" },
    },
    label: {
      control: { type: "text" },
      description: "Required label of the checkbox",
      table: {
        category: "props",
        required: true,
      },
    },
    disabled: {
      control: { type: "boolean" },
      table: { category: "props" },
    },
    subText: {
      control: { type: "text" },
      table: { category: "props" },
    },
    error: {
      control: { type: "boolean" },
      table: { category: "props" },
    },
    preserveSubTextSpace: {
      control: { type: "boolean" },
      table: { category: "props" },
    },
  },
  args: {
    modelValue: false,
    label: "Label",
    disabled: false,
    subText: "",
    error: false,
    preserveSubTextSpace: false,
  },
  decorators: [
    (story) => {
      const [currentArgs, updateArgs] = useArgs();
      return {
        components: { story },
        setup() {
          return {
            args: currentArgs,
            updateArgs,
          };
        },
        template:
          '<story v-bind="args" @update:modelValue="(value) => updateArgs({ modelValue: value })" />',
      };
    },
  ],
  parameters: {
    docs: {
      description: {
        component:
          "A checkbox component that follows the WAI-ARIA tri-state checkbox design pattern. Supports checked, unchecked, and indeterminate states.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=278-4921&p=f",
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    label: "Label",
    modelValue: false,
  },
};

export const Checked: Story = {
  args: {
    label: "Label",
    modelValue: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: "Label",
    modelValue: "indeterminate",
  },
};

export const SubText: Story = {
  args: {
    label: "Label",
    subText: "Sub text",
    modelValue: false,
  },
};

export const Disabled: Story = {
  args: {
    label: "Label",
    modelValue: true,
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    label: "Label",
    subText: "Error message",
    modelValue: false,
    error: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    label: undefined,
    title: "Checkbox title",
    modelValue: false,
  },
};

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsCheckbox,
  combinationsProps: [
    {
      modelValue: kdsCheckboxValues,
      label: ["Label"],
      disabled: [false, true],
      error: [false, true],
      subText: [undefined, "SubText"],
    },
  ],
  pseudoStates: ["hover", "active", "focus-visible"],
});

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsCheckbox,
  designsToCompare: {
    Default: {
      props: {
        label: "Label",
        modelValue: false,
      },
      variants: {
        // Default state
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51009":
          {},
        // Default with subtext
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51573":
          { subText: "{SubText content}" },
        // Enabled :hover
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=615-30434":
          { parameters: { pseudo: { hover: true } } },
        // :hover with subtext
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51582":
          {
            parameters: { pseudo: { hover: true } },
            subText: "{SubText content}",
          },
        // Enabled :active
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1801-30585":
          { parameters: { pseudo: { active: true } } },
        // :active with subtext
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51579":
          {
            parameters: { pseudo: { active: true } },
            subText: "{SubText content}",
          },
        // Enabled :focus-visible (Accessibility example)
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51117":
          {
            parameters: {
              pseudo: { focusVisible: true },
              figmaOffset: { x: -3, y: -3 },
            },
          },
        // :focus-visible with subtext
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51576":
          {
            subText: "{SubText content}",
            parameters: {
              pseudo: { focusVisible: true },
              figmaOffset: { x: -3, y: -3 },
            },
          },
        // disabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51255":
          {
            disabled: true,
          },
        // disabled with subtext
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51588":
          {
            disabled: true,
            subText: "{SubText content}",
          },
        // Error
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51627":
          {
            error: true,
            subText: "{Error message}",
          },
        // Error :hover
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9171-169136":
          {
            error: true,
            subText: "{Error message}",
            parameters: { pseudo: { hover: true } },
          },
        // Error :active
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9223-233133":
          {
            error: true,
            subText: "{Error message}",
            parameters: { pseudo: { active: true } },
          },
      },
    },
    Checked: {
      props: {
        label: "Label",
        modelValue: true,
      },
      variants: {
        // Default
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51100":
          {},
        // Default with subtext
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9186-197571":
          { subText: "{SubText content}" },
        // Enabled :hover
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1801-30499":
          { parameters: { pseudo: { hover: true } } },
        // :hover with subtext
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9186-198316":
          {
            parameters: { pseudo: { hover: true } },
            subText: "{SubText content}",
          },
        // Enabled :active
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1801-30590":
          { parameters: { pseudo: { active: true } } },
        // :active with subtext
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9186-198689":
          {
            parameters: { pseudo: { active: true } },
            subText: "{SubText content}",
          },
        // Enabled :focus-visible (Accessibility example)
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51125":
          {
            parameters: {
              pseudo: { focusVisible: true },
              figmaOffset: { x: -3, y: -3 },
            },
          },
        // :focus-visible with subtext
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9186-197988":
          {
            subText: "{SubText content}",
            parameters: {
              pseudo: { focusVisible: true },
              figmaOffset: { x: -3, y: -3 },
            },
          },
        // disabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51273":
          {
            disabled: true,
          },
        // disabled with subtext
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9186-199107":
          {
            subText: "{SubText content}",
            disabled: true,
          },
        // Error
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51641":
          {
            error: true,
            subText: "{Error message}",
          },
        // Error :hover
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9171-169146":
          {
            error: true,
            subText: "{Error message}",
            parameters: { pseudo: { hover: true } },
          },
        // Error :active
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9171-169204":
          {
            error: true,
            subText: "{Error message}",
            parameters: { pseudo: { active: true } },
          },
      },
    },
    Indeterminate: {
      props: {
        label: "Label",
        modelValue: "indeterminate",
      },
      variants: {
        // Default
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9175-170318":
          {},
        // Default with subtext
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9186-200078":
          { subText: "{SubText content}" },
        // Enabled :hover
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9175-173832":
          { parameters: { pseudo: { hover: true } } },
        // :hover with subtext
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9186-200084":
          {
            parameters: { pseudo: { hover: true } },
            subText: "{SubText content}",
          },
        // Enabled :active
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9175-173842":
          { parameters: { pseudo: { active: true } } },
        // :active with subtext
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9186-200087":
          {
            parameters: { pseudo: { active: true } },
            subText: "{SubText content}",
          },
        // Enabled :focus-visible (Accessibility example)
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9175-181398":
          {
            parameters: {
              pseudo: { focusVisible: true },
              figmaOffset: { x: -3, y: -3 },
            },
          },
        // :focus-visible with subtext
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9186-200081":
          {
            subText: "{SubText content}",
            parameters: {
              pseudo: { focusVisible: true },
              figmaOffset: { x: -3, y: -3 },
            },
          },
        // disabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9175-170321":
          {
            disabled: true,
          },
        // disabled with subtext
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9186-200090":
          {
            subText: "{SubText content}",
            disabled: true,
          },
        // Error
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9175-181407":
          {
            error: true,
            subText: "{Error message}",
          },
        // Error :hover
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9175-173473":
          {
            error: true,
            subText: "{Error message}",
            parameters: { pseudo: { hover: true } },
          },
        // Error :active
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9175-173463":
          {
            error: true,
            subText: "{Error message}",
            parameters: { pseudo: { active: true } },
          },
      },
    },
  },
});

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsCheckbox,
    width: 200,
  }),
  args: {
    label:
      "This is a very long checkbox label that should overflow and wrap properly when the container is too narrow",
    subText:
      "This is a very long sub text that should also overflow and wrap properly when there is not enough space",
    modelValue: false,
  },
};

export const Interaction: Story = {
  args: {
    label: "Label",
    modelValue: false,
    disabled: false,
    subText: "",
    error: false,
    preserveSubTextSpace: false,
  },
  render: (args) => ({
    components: { KdsCheckbox },
    setup() {
      const { modelValue: _modelValue, ...rest } = args;
      const modelValue = ref(_modelValue ?? false);

      return {
        modelValue,
        rest,
      };
    },
    template: '<KdsCheckbox v-bind="rest" v-model="modelValue" />',
  }),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox", { name: "Label" });

    await expect(checkbox).not.toBeChecked();

    await step("Toggle with mouse click", async () => {
      await userEvent.click(checkbox);
      await expect(checkbox).toBeChecked();

      await userEvent.click(checkbox);
      await expect(checkbox).not.toBeChecked();
    });

    await step("Toggle with keyboard (Space) while focused", async () => {
      // Checkbox should have focus from previous step
      await expect(checkbox).toHaveFocus();

      await userEvent.keyboard(" ");
      await expect(checkbox).toBeChecked();

      await userEvent.keyboard(" ");
      await expect(checkbox).not.toBeChecked();
    });
  },
};
