import { ref, useTemplateRef, watchEffect } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { expect, userEvent, within } from "storybook/test";

import KdsButton from "../../../buttons/KdsButton/KdsButton.vue";
import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../../test-utils/storybook.ts";

import KdsTextarea from "./KdsTextarea.vue";

type Story = StoryObj<typeof KdsTextarea>;

const defaultRows = 3;

const fourRows = 4;

const meta: Meta<typeof KdsTextarea> = {
  title: "Form Fields/Textarea",
  component: KdsTextarea as Meta<typeof KdsTextarea>["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A textarea component for multi-line text input. " +
          "Grows automatically with content (no internal scrolling).",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4961-8426",
    },
  },
  argTypes: {
    modelValue: {
      control: "text",
      description: "v-model binding for the textarea value",
      table: { category: "model" },
    },
    label: {
      control: "text",
      description: "Visible label text",
      table: { category: "props" },
    },
    ariaLabel: {
      control: "text",
      description: "Accessible label used when no visible label is rendered",
      table: { category: "props" },
    },
    id: {
      control: "text",
      description: "Id for associating labels and hint/error text",
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
      table: { category: "props" },
    },
    rows: {
      control: { type: "number", min: 1 },
      table: { category: "props" },
    },
    autocomplete: {
      control: "text",
      table: { category: "props" },
    },
    subText: {
      control: "text",
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
    id: "",
    description: "",
    placeholder: "",
    rows: defaultRows,
    autocomplete: "",
    disabled: false,
    validating: false,
    error: false,
    subText: "",
    preserveSubTextSpace: false,
  },
  render: (args) => {
    const [, updateArgs] = useArgs();
    return {
      components: { KdsTextarea },
      setup() {
        const modelValue = ref(args.modelValue);
        watchEffect(() => (modelValue.value = args.modelValue));
        watchEffect(() => updateArgs({ modelValue: modelValue.value }));
        return { args, modelValue };
      },
      template: '<KdsTextarea v-bind="args" v-model="modelValue" />',
    };
  },
};

export default meta;

export const Default: Story = {
  args: {
    placeholder: "Enter text",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole("textbox", { name: "Label" });

    await step("Type multiple lines", async () => {
      await userEvent.click(textarea);
      await userEvent.clear(textarea);
      await userEvent.type(textarea, "Hello{enter}World");
      await expect(textarea).toHaveValue("Hello\nWorld");
    });
  },
};

export const WithValue: Story = {
  args: {
    modelValue: "First line\nSecond line",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole("textbox", { name: "Label" });
    await expect(textarea).toHaveValue("First line\nSecond line");
  },
};

export const FourRows: Story = {
  args: {
    rows: fourRows,
    placeholder: "Enter text",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole("textbox", { name: "Label" });
    await expect(textarea).toHaveAttribute("rows", "4");
  },
};

export const WithDescription: Story = {
  args: {
    placeholder: "Enter text",
    description:
      "This is a helpful description that explains what this field is for. " +
      "It appears in a popover when clicking the info button.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const textarea = canvas.getByRole("textbox", { name: /label/i });
    await userEvent.hover(textarea);

    const infoButton = await canvas.findByRole("button", {
      name: "Click for more information",
    });
    await expect(infoButton).toBeInTheDocument();

    await userEvent.click(infoButton);

    const description = await canvas.findByText(
      /This is a helpful description that explains what this field is for\./i,
    );
    await expect(description).toBeInTheDocument();
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Enter text",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole("textbox", { name: "Label" });

    await step("Is disabled", async () => {
      await expect(textarea).toBeDisabled();
    });
  },
};

export const WithSubText: Story = {
  args: {
    placeholder: "Enter text",
    subText: "Helper text goes here",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Helper text goes here")).toBeInTheDocument();
  },
};

export const Validating: Story = {
  args: {
    modelValue: "Checking...",
    validating: true,
    subText: "Validation message",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Validation message")).toBeInTheDocument();
  },
};

export const WithError: Story = {
  args: {
    modelValue: "Invalid value",
    error: true,
    subText: "Error message",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Error message")).toBeInTheDocument();
  },
};

export const WithAriaLabel: Story = {
  args: {
    label: undefined,
    ariaLabel: "Textarea",
    placeholder: "Enter text",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole("textbox", { name: "Textarea" });
    await expect(textarea).toBeInTheDocument();
  },
};

export const ExternalLabel: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Example with an external `<label>` element. The external label is connected via `for`/`id`, so the textarea still has an accessible name even though the component `label` prop is omitted.",
      },
    },
  },
  render: () => ({
    components: { KdsTextarea },
    template: `
      <div style="display: grid; gap: 8px; align-items: start;">
        <label for="custom-textarea">External label</label>

        <KdsTextarea
          id="custom-textarea"
          aria-label="External label"
          placeholder="Enter text"
        />
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole("textbox", { name: "External label" });
    await expect(textarea).toBeInTheDocument();
  },
};

export const ProgrammaticFocus: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates how to programmatically focus the textarea using the exposed `focus()` method via a template ref.",
      },
    },
  },
  render: () => ({
    components: { KdsTextarea, KdsButton },
    setup() {
      const textareaRef =
        useTemplateRef<InstanceType<typeof KdsTextarea>>("textareaRef");
      const handleFocusClick = () => {
        textareaRef.value?.focus();
      };
      return { handleFocusClick };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px;">
        <KdsTextarea ref="textareaRef" label="Textarea" />
        <KdsButton @click="handleFocusClick" label="Focus Textarea" />
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Focus Textarea" });
    const input = canvas.getByRole("textbox", { name: "Textarea" });

    await expect(input).not.toHaveFocus();
    await userEvent.click(button);
    await expect(input).toHaveFocus();
  },
};

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsTextarea,
  combinationsProps: {
    default: {
      label: ["Label"],
      ariaLabel: [undefined],
      modelValue: ["", "Value", "Value\nSecond line"],
      rows: [defaultRows, fourRows],
      placeholder: ["", "Placeholder"],
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

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsTextarea,
  wrapperStyle: "width: 456px",
  designsToCompare: {
    ".Textarea": {
      props: {
        label: undefined,
        ariaLabel: "Textarea",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4961-8429":
          {
            placeholder: "{text}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4961-8438":
          {
            placeholder: "{text}",
            parameters: { pseudo: { hover: true } },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4961-8447":
          {
            modelValue: "|",
            parameters: {
              pseudo: { focus: true },
              figmaOffset: { x: -3, y: -3 },
            },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4961-8458":
          {
            modelValue: "{text}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4961-8467":
          {
            modelValue: "{text}",
            error: true,
            subText: "{Error message}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5351-35740":
          {
            modelValue: "{text}",
            validating: true,
            subText: "{Validation message}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4961-8476":
          {
            placeholder: "{text}",
            disabled: true,
          },
      },
    },
  },
});

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsTextarea,
    width: 300,
    height: 220,
  }),
  args: {
    label:
      "Very long label that should be truncated when the container is too small",
    modelValue:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    subText:
      "Very long helper text that should wrap to multiple lines when needed",
  },
};
