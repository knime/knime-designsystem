import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { expect, userEvent, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook";

import KdsCredentialsApiKey from "./KdsCredentialsApiKey.vue";

type Story = StoryObj<typeof KdsCredentialsApiKey>;

const meta: Meta<typeof KdsCredentialsApiKey> = {
  title: "Components/forms/KdsCredentialsApiKey",
  component: KdsCredentialsApiKey as Meta<
    typeof KdsCredentialsApiKey
  >["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A single input for entering an API key, with a leading key icon and shared state handling (error/validating/disabled).",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4935-115862",
    },
  },
  argTypes: {
    apiKey: {
      control: "text",
      description: "v-model binding for the API key value",
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
    apiKey: "",

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
          '@update:apiKey="(value) => updateArgs({ apiKey: value })" ' +
          "/>",
      };
    },
  ],
};

export default meta;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    apiKey: "abcd",
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
    apiKey: "abcd",
  },
};

export const Validating: Story = {
  args: {
    validating: true,
    subText: "Validating…",
    apiKey: "abcd",
  },
};

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsCredentialsApiKey,
  combinationsProps: [
    {
      apiKey: ["", "{Key}"] as const,
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
  component: KdsCredentialsApiKey,
  componentStyle: "width: 218px",
  designsToCompare: {
    "API key": {
      props: {},
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=11202-135662":
          {
            apiKey: "",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=11202-135665":
          {
            apiKey: "",
            parameters: { pseudo: { hover: true } },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=11202-135668":
          {
            apiKey: "|",
            parameters: {
              pseudo: { focus: true },
              figmaOffset: { x: -3, y: -3 },
            },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=11202-135674":
          {
            apiKey: "{Key}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=11202-135677":
          {
            apiKey: "",
            disabled: true,
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=11202-135680":
          {
            apiKey: "{Key}",
            error: true,
            subText: "{Error message}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=11202-135683":
          {
            apiKey: "{Key}",
            validating: true,
            subText: "{Validation message}",
          },
      },
    },
  },
});

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsCredentialsApiKey,
    width: 340,
  }),
  args: {
    apiKey:
      "Very long api key value that should be truncated when the container is too small",
    subText:
      "Very long helper/error text that should wrap to multiple lines when needed",
    error: true,
  },
};

export const Interaction: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const apiKey = canvas.getByRole("textbox", { name: "API key" });

    await step("Focus via click", async () => {
      await userEvent.click(apiKey);
      await expect(apiKey).toHaveFocus();
    });

    await step("Type", async () => {
      await userEvent.type(apiKey, "abcd");
      await expect(apiKey).toHaveValue("abcd");
    });
  },
};
