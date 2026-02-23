import { ref } from "vue";
import type { DefineComponent } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { expect, userEvent, within } from "storybook/test";

import KdsButton from "../../../buttons/KdsButton.vue";
import KdsModal from "../../../overlays/Modal/KdsModal.vue";
import KdsModalLayout from "../../../overlays/Modal/KdsModalLayout.vue";
import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../../test-utils/storybook";

import KdsDropdown from "./KdsDropdown.vue";
import type { KdsDropdownOption, KdsDropdownProps } from "./types";

type Story = StoryObj;

type KdsDropdownStoryArgs = KdsDropdownProps & {
  modelValue?: string | null;
};

const baseOptions = [
  {
    id: "a",
    text: "Option A",
    accessory: { type: "icon", name: "placeholder" },
  },
  {
    id: "b",
    text: "Option B",
    accessory: { type: "dataType", name: "string-datatype" },
  },
  {
    id: "c",
    text: "Option C",
    accessory: { type: "colorSwatch", color: "#C7DA3E" },
  },
  {
    id: "d",
    text: "Option D",
    accessory: { type: "avatar", initials: "AB" },
  },
  {
    id: "e",
    text: "Option E",
  },
] satisfies KdsDropdownOption[];

const meta: Meta = {
  title: "Form fields/KdsDropdown",
  component: KdsDropdown as unknown as Meta["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Single selection dropdown with a popover list and optional search field. " +
          "Supports keyboard navigation, missing values, and an empty-state message.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4516-7427",
    },
  },
  argTypes: {
    modelValue: {
      control: "text",
      description: "v-model binding for the selected option value",
      table: { category: "Model" },
    },
    label: {
      control: "text",
      table: { category: "Props" },
    },
    ariaLabel: {
      control: "text",
      table: { category: "Props" },
    },
    placeholder: {
      control: "text",
      table: { category: "Props" },
    },
    possibleValues: {
      control: "object",
      table: { category: "Props" },
    },
    noEntriesText: {
      control: "text",
      table: { category: "Props" },
    },
    subText: {
      control: "text",
      table: { category: "Props" },
    },
    disabled: {
      control: "boolean",
      table: { category: "Props" },
    },
    readonly: {
      control: "boolean",
      table: { category: "Props" },
    },
    required: {
      control: "boolean",
      table: { category: "Props" },
    },
    error: {
      control: "boolean",
      table: { category: "Props" },
    },
    validating: {
      control: "boolean",
      table: { category: "Props" },
    },
    preserveSubTextSpace: {
      control: "boolean",
      table: { category: "Props" },
    },
    id: {
      control: "text",
      table: { category: "Props" },
    },
    name: {
      control: "text",
      table: { category: "Props" },
    },
    autocomplete: {
      control: "text",
      table: { category: "Props" },
    },
  },
  args: {
    modelValue: null,
    label: "Label",
    ariaLabel: "",
    placeholder: "Select an option",
    possibleValues: baseOptions,
    noEntriesText: "No entries found",
    subText: "",
    disabled: false,
    readonly: false,
    required: false,
    error: false,
    validating: false,
    preserveSubTextSpace: false,
    id: "",
    name: "",
    autocomplete: "",
  },
  decorators: [
    (story) => {
      const [currentArgs, updateArgs] = useArgs();
      return {
        components: { story },
        setup() {
          return { args: currentArgs, updateArgs };
        },
        template:
          '<story v-bind="args" @update:modelValue="(value) => updateArgs({ modelValue: value })" />',
      };
    },
  ],
};

export default meta;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    modelValue: "a",
  },
};

export const MissingValue: Story = {
  args: {
    modelValue: "missing",
    possibleValues: baseOptions,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const combobox = canvas.getByRole("combobox");

    await userEvent.click(combobox);

    const missingOption = canvas.getByRole("option", {
      name: /\(Missing\)\s*missing/i,
    });
    await expect(missingOption).toHaveAttribute("aria-disabled", "true");

    await userEvent.click(canvas.getByRole("option", { name: "Option A" }));

    await expect(combobox).toHaveTextContent("Option A");

    await userEvent.click(combobox);

    await expect(
      canvas.queryByRole("option", { name: /\(Missing\)\s*missing/i }),
    ).not.toBeInTheDocument();
  },
};

export const Error: Story = {
  args: {
    error: true,
    subText: "Error message",
  },
};

export const Validating: Story = {
  args: {
    validating: true,
    subText: "Validation message",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const InModal: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Example usage of `KdsDropdown` inside `KdsModal`. This is a common scenario that can reveal focus and overlay issues.",
      },
    },
  },
  render: (args) => ({
    components: { KdsButton, KdsModal, KdsModalLayout, KdsDropdown },
    setup() {
      const isActive = ref(false);
      const typedArgs = args as KdsDropdownStoryArgs;
      const modelValue = ref<string | null>(typedArgs.modelValue ?? null);

      const open = () => {
        isActive.value = true;
      };

      const close = () => {
        isActive.value = false;
      };

      return {
        args,
        typedArgs,
        isActive,
        modelValue,
        open,
        close,
      };
    },
    template: `
      <div style="display: flex; align-items: start; gap: var(--kds-spacing-container-1x);">
        <KdsButton label="Open modal" variant="filled" @click="open" />

        <KdsModal :active="isActive" @close="close">
          <KdsModalLayout title="Modal title" :on-close="close">
            <template #body>
              <KdsDropdown
                v-bind="args"
                label="Dropdown"
                placeholder="Select an option"
                :model-value="modelValue"
                :possible-values="args.possibleValues"
                @update:modelValue="(value) => (modelValue = value)"
              />
            </template>

            <template #footer>
              <KdsButton label="Close" variant="transparent" @click="close" />
              <KdsButton label="Confirm" variant="filled" @click="close" />
            </template>
          </KdsModalLayout>
        </KdsModal>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: "Open modal" }));

    const combobox = await canvas.findByRole("combobox");
    await userEvent.click(combobox);

    await expect(canvas.getByText("Option A")).toBeTruthy();
  },
};

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsDropdown as unknown as DefineComponent<KdsDropdownStoryArgs>,
  combinationsProps: [
    {
      label: ["Label"],
      modelValue: [null, "a", "c"],
      placeholder: ["{text}"],
      disabled: [false, true],
      error: [false, true],
      validating: [false, true],
      subText: [undefined, "Helper text"],
      possibleValues: [
        [
          { id: "a", text: "Option A" },
          { id: "b", text: "Option B" },
        ],
      ],
    },
  ],
  pseudoStates: ["hover", "active", "focus"],
});

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsDropdown,
  wrapperStyle: { width: "213px" },
  designsToCompare: {
    ".Dropdown": {
      props: {
        label: undefined,
        ariaLabel: "Dropdown",
        possibleValues: baseOptions,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3594-15392":
          {
            placeholder: "{text}",
            modelValue: null,
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3594-15391":
          {
            placeholder: "{text}",
            modelValue: null,
            parameters: { pseudo: { hover: true } },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3594-15389":
          {
            modelValue: "a",
            possibleValues: [{ id: "a", text: "Label" }],
            parameters: {
              pseudo: { focusVisible: true },
              figmaOffset: { x: -3, y: -3 },
            },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3594-15388":
          {
            modelValue: "a",
            possibleValues: [{ id: "a", text: "{text}" }],
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3594-15417":
          {
            modelValue: "a",
            possibleValues: [{ id: "a", text: "{text}" }],
            error: true,
            subText: "{Error message}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5351-35693":
          {
            modelValue: "a",
            possibleValues: [{ id: "a", text: "{text}" }],
            validating: true,
            subText: "{Validation message}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3594-15390":
          {
            modelValue: "a",
            possibleValues: [{ id: "a", text: "{text}" }],
            disabled: true,
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7410-161699":
          {
            initiallyOpen: true,
            modelValue: "missing",
            possibleValues: baseOptions,
          },
      },
    },
    ".WithAccessory": {
      props: {
        label: undefined,
        ariaLabel: "Dropdown",
        possibleValues: baseOptions,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15821-140111":
          {
            modelValue: "a",
            possibleValues: [
              {
                id: "a",
                text: "{text}",
                accessory: { type: "icon", name: "placeholder" },
              },
            ],
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15821-141479":
          {
            modelValue: "a",
            possibleValues: [
              {
                id: "a",
                text: "{text}",
                accessory: { type: "dataType", name: "string-datatype" },
              },
            ],
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15821-140610":
          {
            modelValue: "a",
            possibleValues: [
              {
                id: "a",
                text: "{text}",
                accessory: { type: "colorSwatch", color: "#C7DA3E" },
              },
            ],
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15821-140752":
          {
            modelValue: "a",
            possibleValues: [
              {
                id: "a",
                text: "{text}",
                accessory: { type: "avatar", initials: "fv" },
              },
            ],
          },
      },
    },
  },
});

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsDropdown,
    width: 250,
  }),
  args: {
    label: "Label",
    placeholder: "{text}",
    possibleValues: [
      {
        id: "long",
        text: "A very very very very very long option label that should overflow",
        accessory: { type: "dataType", name: "string-datatype" },
      },
      ...baseOptions,
    ],
    modelValue: "long",
  },
};

export const Interaction: Story = {
  args: {
    label: "Label",
    placeholder: "{text}",
    possibleValues: baseOptions,
    modelValue: null,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const combobox = canvas.getByRole("combobox");

    // Keyboard-only: ArrowDown opens and moves focus into the filter input
    combobox.focus();
    await expect(combobox).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");

    const filterInputFromKeyboard = await canvas.findByRole("textbox", {
      name: "Filter options",
    });
    await expect(filterInputFromKeyboard).toHaveFocus();
    await userEvent.keyboard("{Enter}");

    await expect(canvas.getByRole("combobox")).toHaveTextContent("Option A");

    await userEvent.click(combobox);

    const filterInput = await canvas.findByRole("textbox", {
      name: "Filter options",
    });
    filterInput.focus();
    await expect(filterInput).toHaveFocus();
    await expect(filterInput).toHaveAttribute("aria-activedescendant");
    await expect(
      canvas.getByRole("option", { name: "Option A" }),
    ).toBeVisible();
    await userEvent.keyboard("{ArrowDown}{Enter}");

    await expect(canvas.getByRole("combobox")).toHaveTextContent("Option A");
    await expect(
      canvasElement.querySelector(".kds-data-type-icon-container"),
    ).not.toBeNull();
    await expect(canvas.getByText("Selected Option A")).toBeInTheDocument();

    await userEvent.click(canvas.getByRole("combobox"));

    const filterInputAfterReopen = await canvas.findByRole("textbox", {
      name: "Filter options",
    });
    filterInputAfterReopen.focus();
    await expect(filterInputAfterReopen).toHaveFocus();
    await expect(filterInputAfterReopen).toHaveAttribute(
      "aria-activedescendant",
    );
    await expect(
      canvas.getByRole("option", { name: "Option A" }),
    ).toBeVisible();
    await userEvent.keyboard("{ArrowDown}{ArrowDown}{Escape}");

    await expect(canvas.getByRole("combobox")).toHaveTextContent("Option A");

    // Selecting the same option again toggles the selection off (shadcn-vue behavior)
    await userEvent.click(canvas.getByRole("combobox"));
    await userEvent.click(await canvas.findByText("Option A"));
    await expect(canvas.getByRole("combobox")).toHaveTextContent("{text}");
    await expect(canvas.getByText("Selection cleared")).toBeInTheDocument();
  },
};
