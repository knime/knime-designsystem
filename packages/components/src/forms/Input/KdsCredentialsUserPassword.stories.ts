import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { expect, userEvent, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook";

import KdsCredentialsUserPassword from "./KdsCredentialsUserPassword.vue";

type Story = StoryObj<typeof KdsCredentialsUserPassword>;

const meta: Meta<typeof KdsCredentialsUserPassword> = {
  title: "Components/forms/KdsCredentialsUserPassword",
  component: KdsCredentialsUserPassword as Meta<
    typeof KdsCredentialsUserPassword
  >["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Two stacked inputs for username and password, with leading icons and shared state handling (error/validating/disabled).",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4935-115862",
    },
  },
  argTypes: {
    username: {
      control: "text",
      description: "v-model binding for the username value",
      table: { category: "Model" },
    },
    password: {
      control: "text",
      description: "v-model binding for the password value",
      table: { category: "Model" },
    },

    label: { control: "text", table: { category: "Props" } },
    subText: { control: "text", table: { category: "Props" } },
    preserveSubTextSpace: { control: "boolean", table: { category: "Props" } },

    required: { control: "boolean", table: { category: "Props" } },
    disabled: { control: "boolean", table: { category: "Props" } },
    readonly: { control: "boolean", table: { category: "Props" } },
    validating: { control: "boolean", table: { category: "Props" } },
    error: { control: "boolean", table: { category: "Props" } },
  },
  args: {
    username: "",
    password: "",

    label: "Label",
    subText: "",
    preserveSubTextSpace: false,

    required: false,
    disabled: false,
    readonly: false,
    validating: false,
    error: false,
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
          '<story v-bind="args" ' +
          '@update:username="(value) => updateArgs({ username: value })" ' +
          '@update:password="(value) => updateArgs({ password: value })" ' +
          "/>",
      };
    },
  ],
};

export default meta;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    username: "knime-user",
    password: "super-secret",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    error: true,
    subText: "Error message",
    username: "knime-user",
    password: "super-secret",
  },
};

export const Validating: Story = {
  args: {
    validating: true,
    subText: "Validating…",
    username: "knime-user",
    password: "super-secret",
  },
};

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsCredentialsUserPassword,
  combinationsProps: [
    {
      username: ["", "{Username}"] as const,
      password: ["", "{Password}"] as const,
      disabled: [false, true],
      error: [false, true],
      validating: [false, true],
      subText: [undefined, "Message"],
      preserveSubTextSpace: [false],
      readonly: [false],
      required: [false],
    },
  ],
  pseudoStates: ["hover", "active", "focus", "focus-visible"],
});

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsCredentialsUserPassword,
  componentStyle: "width: 218px",
  designsToCompare: {
    "Username + Password": {
      props: {},
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4935-116283":
          {
            username: "",
            password: "",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4935-116436":
          {
            username: "",
            password: "",
            parameters: { pseudo: { hover: true } },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4935-116499":
          {
            username: "|",
            password: "",
            parameters: {
              pseudo: { focus: true },
              figmaOffset: { x: -3, y: -3 },
            },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4961-8631":
          {
            username: "",
            password: "|",
            parameters: {
              pseudo: { focus: true },
              figmaOffset: { x: -3, y: -3 },
            },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4935-116566":
          {
            username: "{Username}",
            password: "{Password}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4935-116732":
          {
            username: "",
            password: "",
            disabled: true,
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4935-116649":
          {
            username: "{Username}",
            password: "{Password}",
            error: true,
            subText: "{Error message}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5351-35950":
          {
            username: "{Username}",
            password: "{Password}",
            validating: true,
            subText: "{Validation message}",
          },
      },
    },
  },
});

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsCredentialsUserPassword,
    width: 340,
  }),
  args: {
    username:
      "Very long username value that should be truncated when the container is too small",
    password: "very-long-password-value-that-should-not-break-the-layout",
    subText:
      "Very long helper/error text that should wrap to multiple lines when needed",
    error: true,
  },
};

export const Interaction: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const username = canvas.getByRole("textbox", { name: "Username" });
    const password = canvas.getByRole("textbox", { name: "Password" });

    await step("Tab navigation", async () => {
      await userEvent.tab();
      await expect(username).toHaveFocus();

      await userEvent.tab();
      await expect(password).toHaveFocus();
    });

    await step("Type into fields", async () => {
      await userEvent.click(username);
      await userEvent.type(username, "knime-user");
      await expect(username).toHaveValue("knime-user");

      await userEvent.click(password);
      await userEvent.type(password, "secret");
      await expect(password).toHaveValue("secret");
    });
  },
};
