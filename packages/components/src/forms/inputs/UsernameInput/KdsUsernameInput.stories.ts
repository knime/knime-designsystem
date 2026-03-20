import { ref, watchEffect } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { expect, userEvent, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../../test-utils/storybook.ts";

import KdsUsernameInput from "./KdsUsernameInput.vue";

type Story = StoryObj<typeof KdsUsernameInput>;

const meta: Meta<typeof KdsUsernameInput> = {
  title: "Form Fields/UsernameInput",
  component: KdsUsernameInput as Meta<typeof KdsUsernameInput>["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A text input with a leading user icon, label, and helper/error text support. " +
          "Intended for username or account name entry within credentials forms.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4935-116302",
    },
  },
  argTypes: {
    modelValue: {
      control: "text",
      description: "v-model binding for the input value",
      table: { category: "model" },
    },
    label: {
      control: "text",
      description: "Label shown above the input",
      table: { category: "props" },
    },
    ariaLabel: {
      control: "text",
      description: "Accessible label used when no visible label is rendered",
      table: { category: "props" },
    },
    description: {
      control: "text",
      description:
        "Optional description displayed in an info popover next to the label. " +
        "The info toggle button is only visible when hovering the input field.",
      table: { category: "props" },
    },
    placeholder: {
      control: "text",
      description: "Placeholder shown when the input is empty",
      table: { category: "props" },
    },
    autocomplete: {
      control: "text",
      table: { category: "props" },
    },
    subText: {
      control: "text",
      description: "Helper text or error message shown below the input",
      table: { category: "props" },
    },
    disabled: {
      control: "boolean",
      table: { category: "props" },
    },
    error: {
      control: "boolean",
      table: { category: "props" },
    },
    validating: {
      control: "boolean",
      description: "Shows a spinner next to the subtext when true",
      table: { category: "props" },
    },
    preserveSubTextSpace: {
      control: "boolean",
      table: { category: "props" },
    },
  },
  args: {
    modelValue: "",
    label: "Label",
    ariaLabel: undefined,
    description: "",
    placeholder: "Username",
    autocomplete: "username",
    subText: "",
    disabled: false,
    error: false,
    validating: false,
    preserveSubTextSpace: false,
  },
  render: (args) => {
    const [, updateArgs] = useArgs();
    return {
      components: { KdsUsernameInput },
      setup() {
        const modelValue = ref(args.modelValue);
        watchEffect(() => (modelValue.value = args.modelValue));
        watchEffect(() => updateArgs({ modelValue: modelValue.value }));
        return { args, modelValue };
      },
      template: '<KdsUsernameInput v-bind="args" v-model="modelValue" />',
    };
  },
};

export default meta;

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "Label" });

    await step("Type into the input", async () => {
      await userEvent.click(input);
      await userEvent.type(input, "demo-user");
      await expect(input).toHaveValue("demo-user");

      await userEvent.clear(input);
      await expect(input).toHaveValue("");
    });

    await step("Tab focus", async () => {
      input.blur();
      await userEvent.tab();
      await expect(input).toHaveFocus();
    });
  },
};

export const WithValue: Story = {
  args: {
    modelValue: "demo-user",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "Label" });
    await expect(input).toHaveValue("demo-user");
  },
};

export const CustomLabel: Story = {
  args: {
    ariaLabel: "Username",
    label: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("textbox", { name: "Username" }),
    ).toBeInTheDocument();
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "Label" });
    await expect(input).toBeDisabled();
  },
};

export const WithSubText: Story = {
  args: {
    subText: "Enter your account username",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText("Enter your account username"),
    ).toBeInTheDocument();
  },
};

export const Validating: Story = {
  args: {
    modelValue: "checking-user",
    validating: true,
    subText: "Checking availability...",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText("Checking availability..."),
    ).toBeInTheDocument();
  },
};

export const WithError: Story = {
  args: {
    modelValue: "invalid user",
    error: true,
    subText: "Username contains invalid characters",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText("Username contains invalid characters"),
    ).toBeInTheDocument();
  },
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsUsernameInput,
    width: 260,
  }),
  args: {
    label:
      "Very long label that should be truncated when the container is too small",
    modelValue:
      "very.long.enterprise.username.with.multiple.segments.for.testing.truncation.behavior",
    placeholder:
      "Enter the unique enterprise account username used for cross-system authentication",
    subText:
      "This helper text is intentionally verbose to verify that long guidance content wraps and truncates consistently beneath the username field.",
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsUsernameInput,
  wrapperStyle: "width: 218px",
  designsToCompare: {
    "1. Default": {
      props: {
        ariaLabel: "Username",
        placeholder: "Username",
        autocomplete: "username",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4935-116283":
          {},
      },
    },
    "2. Hover": {
      props: {
        ariaLabel: "Username",
        placeholder: "Username",
        autocomplete: "username",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4935-116436":
          {
            parameters: { pseudo: { hover: true } },
          },
      },
    },
    "3. Focused": {
      props: {
        ariaLabel: "Username",
        placeholder: "Username",
        autocomplete: "username",
        modelValue: "|",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4935-116499":
          {
            parameters: {
              pseudo: { focus: true },
              figmaOffset: { x: -3, y: -3 },
            },
          },
      },
    },
    "4. Filled": {
      props: {
        ariaLabel: "Username",
        placeholder: "Username",
        autocomplete: "username",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4935-116566":
          {
            modelValue: "{Username}",
          },
      },
    },
    "5. Disabled": {
      props: {
        ariaLabel: "Username",
        placeholder: "Username",
        autocomplete: "username",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4935-116732":
          {
            disabled: true,
          },
      },
    },
    "6. Error": {
      props: {
        ariaLabel: "Username",
        placeholder: "Username",
        autocomplete: "username",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4935-116649":
          {
            modelValue: "{Username}",
            error: true,
            subText: "{Error message}",
          },
      },
    },
    "7. Validating": {
      props: {
        ariaLabel: "Username",
        placeholder: "Username",
        autocomplete: "username",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5351-35950":
          {
            modelValue: "{Username}",
            validating: true,
            subText: "{Validation message}",
          },
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsUsernameInput,
  combinationsProps: {
    default: {
      label: ["Label"],
      ariaLabel: [undefined],
      modelValue: ["", "{Username}"],
      placeholder: ["Username"],
      disabled: [false],
      error: [false],
      validating: [false],
      subText: [undefined, "Message"],
    },
    combinations: [
      { validating: [true], subText: ["Validation message"] },
      { error: [true], subText: ["Error message"] },
      { disabled: [true] },
    ],
  },
  pseudoStates: ["hover", "focus"],
});
