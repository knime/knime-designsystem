import { ref, watchEffect } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { expect, userEvent, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../../test-utils/storybook.ts";

import KdsPasswordInput from "./KdsPasswordInput.vue";
import {
  kdsPasswordInputAutocompletes,
  kdsPasswordInputVariants,
} from "./enums";

type Story = StoryObj<typeof KdsPasswordInput>;

const meta: Meta<typeof KdsPasswordInput> = {
  title: "Form Fields/PasswordInput",
  component: KdsPasswordInput as Meta<typeof KdsPasswordInput>["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A password input with a leading icon, optional visibility toggle, label, and helper/error text support. " +
          'The `"password"` variant shows a lock icon, `"key"` shows a key icon.',
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
    variant: {
      control: "select",
      options: kdsPasswordInputVariants,
      description:
        'Visual variant controlling the leading icon. "password" shows a lock icon, "key" shows a key icon.',
      table: { category: "props" },
    },
    showVisibilityToggle: {
      control: "boolean",
      description: "Whether to show the visibility toggle button",
      table: { category: "props" },
    },
    toggleLabel: {
      control: "text",
      description:
        "Label used for the visibility toggle button's aria-label. " +
        'Defaults to "Password" for the password variant and "Key" for key.',
      table: { category: "props" },
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
      control: "select",
      options: kdsPasswordInputAutocompletes,
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
    variant: "password",
    description: "",
    placeholder: "Password",
    autocomplete: "current-password",
    showVisibilityToggle: true,
    toggleLabel: undefined,
    subText: "",
    disabled: false,
    error: false,
    validating: false,
    preserveSubTextSpace: false,
  },
  render: (args) => {
    const [, updateArgs] = useArgs();
    return {
      components: { KdsPasswordInput },
      setup() {
        const modelValue = ref(args.modelValue);
        watchEffect(() => (modelValue.value = args.modelValue));
        watchEffect(() => updateArgs({ modelValue: modelValue.value }));
        return { args, modelValue };
      },
      template: '<KdsPasswordInput v-bind="args" v-model="modelValue" />',
    };
  },
};

export default meta;

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    const input = canvas.getByLabelText("Label");

    await step("Type and show password via mouse", async () => {
      await user.click(input);
      await user.type(input, "secret");
      await expect(input).toHaveValue("secret");
      await expect(input).toHaveAttribute("type", "password");

      const showButton = canvas.getByRole("button", {
        name: /show password/i,
      });
      await user.click(showButton);
      await expect(input).toHaveAttribute("type", "text");

      const hideButton = canvas.getByRole("button", {
        name: /hide password/i,
      });
      await user.click(hideButton);
      await expect(input).toHaveAttribute("type", "password");
    });

    await step("Keyboard navigation", async () => {
      input.blur();
      await user.tab();
      await expect(input).toHaveFocus();

      await user.tab();
      await expect(
        canvas.getByRole("button", { name: /show password/i }),
      ).toHaveFocus();
    });
  },
};

export const KeyVariant: Story = {
  args: {
    variant: "key",
    placeholder: "Key",
    autocomplete: "off",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    const input = canvas.getByLabelText("Label");

    await step("Type and toggle visibility", async () => {
      await user.click(input);
      await user.type(input, "123456");
      await expect(input).toHaveValue("123456");

      const showButton = canvas.getByRole("button", {
        name: /show key/i,
      });
      await user.click(showButton);
      await expect(input).toHaveAttribute("type", "text");
    });
  },
};

export const WithValue: Story = {
  args: {
    modelValue: "•••••••••••••",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Label");
    await expect(input).toHaveValue("•••••••••••••");
    await expect(
      canvas.getByRole("button", { name: /show password/i }),
    ).toBeInTheDocument();
  },
};

export const WithoutVisibilityToggle: Story = {
  args: {
    showVisibilityToggle: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    const input = canvas.getByLabelText("Label");

    await user.click(input);
    await user.type(input, "secret");
    await expect(
      canvas.queryByRole("button", { name: /show password/i }),
    ).not.toBeInTheDocument();
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Label");
    await expect(input).toBeDisabled();
  },
};

export const WithSubText: Story = {
  args: {
    subText: "Must be at least 8 characters",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText("Must be at least 8 characters"),
    ).toBeInTheDocument();
  },
};

export const Validating: Story = {
  args: {
    modelValue: "•••••••••••••",
    validating: true,
    subText: "Verifying credentials...",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText("Verifying credentials..."),
    ).toBeInTheDocument();
  },
};

export const WithError: Story = {
  args: {
    modelValue: "•••••••••••••",
    error: true,
    subText: "Incorrect password",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Incorrect password")).toBeInTheDocument();
  },
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsPasswordInput,
    width: 260,
  }),
  args: {
    label:
      "Very long label that should be truncated when the container is too small",
    modelValue: "BondJamesBond_007_WithALicenceToTypeAndOverflow1234567890",
    placeholder:
      "Enter the primary credentials password that is required for secure sign-in and policy-compliant verification",
    subText:
      "This helper text is intentionally verbose to verify that long security-related instructions render correctly beneath the password field.",
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsPasswordInput,
  wrapperStyle: "width: 218px",
  designsToCompare: {
    "1. Default (password)": {
      props: {
        ariaLabel: "Password",
        variant: "password",
        placeholder: "Password",
        autocomplete: "current-password",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4935-116283":
          {},
      },
    },
    "2. Default (key)": {
      props: {
        ariaLabel: "Key",
        variant: "key",
        placeholder: "Key",
        autocomplete: "off",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4935-116283":
          {},
      },
    },
    "3. Hover": {
      props: {
        ariaLabel: "Password",
        variant: "password",
        placeholder: "Password",
        autocomplete: "current-password",
        showVisibilityToggle: false,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4935-116436":
          {
            parameters: { pseudo: { hover: true } },
          },
      },
    },
    "4. Focused": {
      props: {
        ariaLabel: "Password",
        variant: "password",
        placeholder: "Password",
        autocomplete: "current-password",
        showVisibilityToggle: false,
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
    "5. Filled with toggle": {
      props: {
        ariaLabel: "Password",
        variant: "password",
        placeholder: "Password",
        autocomplete: "current-password",
        showVisibilityToggle: true,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4935-116566":
          {
            modelValue: "•••••••••••••",
          },
      },
    },
    "6. Disabled": {
      props: {
        ariaLabel: "Password",
        variant: "password",
        placeholder: "Password",
        autocomplete: "current-password",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4935-116732":
          {
            disabled: true,
          },
      },
    },
    "7. Error": {
      props: {
        ariaLabel: "Password",
        variant: "password",
        placeholder: "Password",
        autocomplete: "current-password",
        showVisibilityToggle: true,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4935-116649":
          {
            modelValue: "•••••••••••••",
            error: true,
            subText: "{Error message}",
          },
      },
    },
    "8. Validating": {
      props: {
        ariaLabel: "Password",
        variant: "password",
        placeholder: "Password",
        autocomplete: "current-password",
        showVisibilityToggle: true,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5351-35950":
          {
            modelValue: "•••••••••••••",
            validating: true,
            subText: "{Validation message}",
          },
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsPasswordInput,
  combinationsProps: {
    default: {
      label: ["Label"],
      ariaLabel: [undefined],
      variant: ["password"],
      modelValue: ["", "•••••••••••••"],
      placeholder: ["Password"],
      showVisibilityToggle: [true],
      disabled: [false],
      error: [false],
      validating: [false],
      subText: [undefined, "Message"],
    },
    combinations: [
      { variant: ["key"], placeholder: ["Key"] },
      { showVisibilityToggle: [false] },
      { validating: [true], subText: ["Validation message"] },
      { error: [true], subText: ["Error message"] },
      { disabled: [true] },
    ],
  },
  pseudoStates: ["hover", "focus"],
});
