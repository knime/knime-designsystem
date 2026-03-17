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
    usernameField: {
      control: "object",
      table: { category: "props" },
    },
    passwordField: {
      control: "object",
      table: { category: "props" },
    },
    keyField: {
      control: "object",
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
    usernameField: {
      placeholder: "Username",
      autocomplete: "username",
      subText: "",
      error: false,
      validating: false,
      ariaDescribedby: "",
    },
    passwordField: {
      placeholder: "Password",
      autocomplete: "current-password",
      showVisibilityToggle: true,
      subText: "",
      error: false,
      validating: false,
      ariaDescribedby: "",
    },
    keyField: {
      name: "Key",
      placeholder: "",
      autocomplete: "off",
      showVisibilityToggle: true,
      subText: "",
      error: false,
      validating: false,
      ariaDescribedby: "",
    },
    showUsername: true,
    showPassword: true,
    showKey: true,
    disabled: false,
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
        name: /show password/i,
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
      canvas.getByRole("button", { name: /show password/i }),
    ).toHaveFocus();
  },
};

export const PasswordAndKey: Story = {
  args: {
    showUsername: false,
  },
};

export const SplitVisibilityToggle: Story = {
  args: {
    showUsername: false,
    passwordField: {
      placeholder: "Password",
      autocomplete: "current-password",
      showVisibilityToggle: true,
    },
    keyField: {
      name: "Key",
      autocomplete: "off",
      showVisibilityToggle: false,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByLabelText("Password"));
    await expect(
      canvas.getByRole("button", { name: /show password/i }),
    ).toBeInTheDocument();
    await expect(
      canvas.queryByRole("button", { name: /show key/i }),
    ).not.toBeInTheDocument();
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
    await expect(canvas.getByLabelText("Token entry")).toBeInTheDocument();
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
    usernameField: { error: true, subText: "{Error message}" },
    passwordField: { error: true, subText: "{Error message}" },
    keyField: { name: "Key", error: true, subText: "{Error message}" },
  },
};

export const Validating: Story = {
  args: {
    modelValue: {
      username: "{Username}",
      password: "•••••••••••••",
      key: "•••••••••••••",
    },
    usernameField: { validating: true, subText: "{Validation message}" },
    passwordField: { validating: true, subText: "{Validation message}" },
    keyField: {
      name: "Key",
      validating: true,
      subText: "{Validation message}",
    },
  },
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsCredentialsInput,
    width: 260,
  }),
  args: {
    label: "Very long credentials group label that should truncate gracefully",
    modelValue: {
      username:
        "very.long.enterprise.username.with.multiple.segments.for.testing.truncation.behavior",
      password: "BondJamesBond_007_WithALicenceToTypeAndOverflow1234567890",
      key: "MI6_AstonMartin_DB5_Goldeneye_Skyfall_NoTimeToDie_LongKey_007_ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    },
    usernameField: {
      placeholder:
        "Enter the unique enterprise account username used for cross-system authentication and provisioning",
      subText:
        "This helper text is intentionally verbose to verify that long guidance content wraps and truncates consistently beneath the username field.",
    },
    passwordField: {
      placeholder:
        "Enter the primary credentials password that is required for secure sign-in and policy-compliant verification",
      subText:
        "This helper text is intentionally verbose to verify that long security-related instructions render correctly beneath the password field.",
    },
    keyField: {
      name: "Key",
      placeholder:
        "Paste the long-lived machine access key value generated by your identity provider for service-to-service authorization",
      subText:
        "This helper text is intentionally verbose to verify that long token-management instructions remain readable beneath the key field.",
    },
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
            usernameField: { error: true, subText: "{Error message}" },
            passwordField: { error: true, subText: "{Error message}" },
            keyField: { name: "Key", error: true, subText: "{Error message}" },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5351-35950":
          {
            modelValue: {
              username: "{Username}",
              password: "•••••••••••••",
              key: "•••••••••••••",
            },
            usernameField: {
              validating: true,
              subText: "{Validation message}",
            },
            passwordField: {
              validating: true,
              subText: "{Validation message}",
            },
            keyField: {
              name: "Key",
              validating: true,
              subText: "{Validation message}",
            },
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
      disabled: [false],
      preserveSubTextSpace: [false],
      usernameField: [{ placeholder: "Username", autocomplete: "username" }],
      passwordField: [
        {
          placeholder: "Password",
          autocomplete: "current-password",
          showVisibilityToggle: true,
        },
      ],
      keyField: [
        { name: "Key", autocomplete: "off", showVisibilityToggle: true },
      ],
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
        modelValue: [
          {
            username: "{Username}",
            password: "•••••••••••••",
            key: "•••••••••••••",
          },
        ],
        passwordField: [
          {
            placeholder: "Password",
            autocomplete: "current-password",
            showVisibilityToggle: true,
          },
        ],
        keyField: [
          {
            name: "Key",
            autocomplete: "off",
            showVisibilityToggle: true,
          },
        ],
      },
      {
        modelValue: [
          {
            username: "{Username}",
            password: "•••••••••••••",
            key: "•••••••••••••",
          },
        ],
        passwordField: [
          {
            placeholder: "Password",
            autocomplete: "current-password",
            showVisibilityToggle: false,
          },
        ],
        keyField: [
          {
            name: "Key",
            autocomplete: "off",
            showVisibilityToggle: false,
          },
        ],
      },
      {
        usernameField: [{ error: true, subText: "{Error message}" }],
        passwordField: [{ error: true, subText: "{Error message}" }],
        keyField: [{ name: "Key", error: true, subText: "{Error message}" }],
      },
      {
        usernameField: [
          {
            validating: true,
            subText: "{Validation message}",
          },
        ],
        passwordField: [
          {
            validating: true,
            subText: "{Validation message}",
          },
        ],
        keyField: [
          { name: "Key", validating: true, subText: "{Validation message}" },
        ],
      },
      { showUsername: [false] },
      { showPassword: [false], showKey: [false] },
    ],
  },
  pseudoStates: ["hover", "focus"],
});
