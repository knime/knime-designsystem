import { ref, watchEffect } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { expect, userEvent, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../../test-utils/storybook.ts";

import KdsCredentialsInput from "./KdsCredentialsInput.vue";
import type { KdsCredentialsInputValue } from "./types";

type Story = StoryObj<typeof KdsCredentialsInput>;

const meta: Meta<typeof KdsCredentialsInput> = {
  title: "Form Fields/CredentialsInput",
  component: KdsCredentialsInput as Meta<
    typeof KdsCredentialsInput
  >["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A grouped credentials input for username, password, and key. " +
          "Each field can be shown independently and supports helper/error/validating states.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4935-116302",
    },
  },
  argTypes: {
    modelValue: {
      control: "object",
      description: "v-model binding for the credentials object",
      table: { category: "model" },
    },
    id: {
      control: "text",
      table: { category: "props" },
    },
    label: {
      control: "text",
      table: { category: "props" },
    },
    ariaLabel: {
      control: "text",
      table: { category: "props" },
    },
    ariaLabelledby: {
      control: "text",
      table: { category: "props" },
    },
    ariaDescribedby: {
      control: "text",
      table: { category: "props" },
    },
    usernameAriaDescribedby: {
      control: "text",
      table: { category: "props" },
    },
    passwordAriaDescribedby: {
      control: "text",
      table: { category: "props" },
    },
    keyAriaDescribedby: {
      control: "text",
      table: { category: "props" },
    },
    keyName: {
      control: "text",
      table: { category: "props" },
    },
    showUsername: {
      control: "boolean",
      table: { category: "props" },
    },
    showPassword: {
      control: "boolean",
      table: { category: "props" },
    },
    showKey: {
      control: "boolean",
      table: { category: "props" },
    },
    disabled: {
      control: "boolean",
      table: { category: "props" },
    },
    showVisibilityToggle: {
      control: "boolean",
      table: { category: "props" },
    },
    usernameSubText: {
      control: "text",
      table: { category: "props" },
    },
    passwordSubText: {
      control: "text",
      table: { category: "props" },
    },
    keySubText: {
      control: "text",
      table: { category: "props" },
    },
    usernameError: {
      control: "boolean",
      table: { category: "props" },
    },
    passwordError: {
      control: "boolean",
      table: { category: "props" },
    },
    keyError: {
      control: "boolean",
      table: { category: "props" },
    },
    usernameValidating: {
      control: "boolean",
      table: { category: "props" },
    },
    passwordValidating: {
      control: "boolean",
      table: { category: "props" },
    },
    keyValidating: {
      control: "boolean",
      table: { category: "props" },
    },
    preserveSubTextSpace: {
      control: "boolean",
      table: { category: "props" },
    },
  },
  args: {
    modelValue: {
      username: "",
      password: "",
      key: "",
    } satisfies KdsCredentialsInputValue,
    id: "",
    label: "",
    ariaLabel: "Credentials",
    ariaLabelledby: "",
    ariaDescribedby: "",
    usernameAriaDescribedby: "",
    passwordAriaDescribedby: "",
    keyAriaDescribedby: "",
    keyName: "Key",
    showUsername: true,
    showPassword: true,
    showKey: true,
    disabled: false,
    showVisibilityToggle: true,
    usernameSubText: "",
    passwordSubText: "",
    keySubText: "",
    usernameError: false,
    passwordError: false,
    keyError: false,
    usernameValidating: false,
    passwordValidating: false,
    keyValidating: false,
    preserveSubTextSpace: false,
  },
  render: (args) => {
    const [, updateArgs] = useArgs();
    return {
      components: { KdsCredentialsInput },
      setup() {
        const modelValue = ref(args.modelValue);
        watchEffect(() => (modelValue.value = args.modelValue));
        watchEffect(() => updateArgs({ modelValue: modelValue.value }));
        return { args, modelValue };
      },
      template: '<KdsCredentialsInput v-bind="args" v-model="modelValue" />',
    };
  },
};

export default meta;

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Type in username and password", async () => {
      const username = canvas.getByRole("textbox", { name: "Username" });
      const password = canvas.getByLabelText("Password");

      await userEvent.click(username);
      await userEvent.type(username, "demo-user");
      await expect(username).toHaveValue("demo-user");

      await userEvent.click(password);
      await userEvent.type(password, "secret");
      await expect(password).toHaveValue("secret");
    });

    await step("Show password via toggle", async () => {
      const showPassword = canvas.getByRole("button", {
        name: "Show password",
      });
      await userEvent.click(showPassword);
      await expect(canvas.getByLabelText("Password")).toHaveAttribute(
        "type",
        "text",
      );
    });
  },
};

export const KeyboardNavigation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.tab();
    await expect(
      canvas.getByRole("textbox", { name: "Username" }),
    ).toHaveFocus();

    await userEvent.tab();
    await expect(canvas.getByLabelText("Password")).toHaveFocus();

    await userEvent.type(canvas.getByLabelText("Password"), "abc");
    await userEvent.tab();
    await expect(
      canvas.getByRole("button", { name: "Show password" }),
    ).toHaveFocus();
  },
};

export const PasswordAndKey: Story = {
  args: {
    showUsername: false,
  },
};

export const UsernameOnly: Story = {
  args: {
    showPassword: false,
    showKey: false,
  },
};

export const KeyOnlyAutoGroup: Story = {
  args: {
    ariaLabel: "Token entry",
    showUsername: false,
    showPassword: false,
    showKey: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvasElement.querySelector("fieldset"),
    ).not.toBeInTheDocument();
    await expect(
      canvas.getByRole("textbox", { name: "Token entry" }),
    ).toBeInTheDocument();
    await expect(canvas.getByPlaceholderText("Key")).toBeInTheDocument();
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    modelValue: {
      username: "{Username}",
      password: "•••••••••••••",
      key: "•••••••••••••",
    },
    usernameError: true,
    passwordError: true,
    keyError: true,
    usernameSubText: "{Error message}",
    passwordSubText: "{Error message}",
    keySubText: "{Error message}",
  },
};

export const Validating: Story = {
  args: {
    modelValue: {
      username: "{Username}",
      password: "•••••••••••••",
      key: "•••••••••••••",
    },
    usernameValidating: true,
    passwordValidating: true,
    keyValidating: true,
    usernameSubText: "{Validation message}",
    passwordSubText: "{Validation message}",
    keySubText: "{Validation message}",
  },
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsCredentialsInput,
    width: 260,
  }),
  args: {
    label: "Very long credentials group label that should truncate gracefully",
    usernamePlaceholder: "Very long username placeholder text",
    passwordPlaceholder: "Very long password placeholder text",
    keyPlaceholder: "Very long key placeholder text",
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsCredentialsInput,
  wrapperStyle: "width: 218px",
  designsToCompare: {
    ".Credentials": {
      props: {},
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4935-116283":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4935-116436":
          {
            parameters: { pseudo: { hover: true } },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4935-116499":
          {
            modelValue: { username: "|", password: "", key: "" },
            parameters: {
              pseudo: { focus: true },
              figmaOffset: { x: -3, y: -3 },
            },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4935-116566":
          {
            modelValue: {
              username: "{Username}",
              password: "•••••••••••••",
              key: "•••••••••••••",
            },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4935-116732":
          {
            disabled: true,
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4935-116649":
          {
            modelValue: {
              username: "{Username}",
              password: "•••••••••••••",
              key: "•••••••••••••",
            },
            usernameError: true,
            passwordError: true,
            keyError: true,
            usernameSubText: "{Error message}",
            passwordSubText: "{Error message}",
            keySubText: "{Error message}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5351-35950":
          {
            modelValue: {
              username: "{Username}",
              password: "•••••••••••••",
              key: "•••••••••••••",
            },
            usernameValidating: true,
            passwordValidating: true,
            keyValidating: true,
            usernameSubText: "{Validation message}",
            passwordSubText: "{Validation message}",
            keySubText: "{Validation message}",
          },
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsCredentialsInput,
  combinationsProps: {
    default: {
      label: [""],
      ariaLabel: ["Credentials"],
      showUsername: [true],
      showPassword: [true],
      showKey: [true],
      showVisibilityToggle: [true],
      disabled: [false],
      preserveSubTextSpace: [false],
      modelValue: [{ username: "", password: "", key: "" }],
    },
    combinations: [
      { disabled: [true] },
      {
        modelValue: [
          {
            username: "{Username}",
            password: "•••••••••••••",
            key: "•••••••••••••",
          },
        ],
      },
      {
        usernameError: [true],
        passwordError: [true],
        keyError: [true],
        usernameSubText: ["{Error message}"],
        passwordSubText: ["{Error message}"],
        keySubText: ["{Error message}"],
      },
      {
        usernameValidating: [true],
        passwordValidating: [true],
        keyValidating: [true],
        usernameSubText: ["{Validation message}"],
        passwordSubText: ["{Validation message}"],
        keySubText: ["{Validation message}"],
      },
      { showUsername: [false] },
      { showPassword: [false], showKey: [false] },
    ],
  },
  pseudoStates: ["hover", "focus"],
});
