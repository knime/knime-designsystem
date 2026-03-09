import { ref, watchEffect } from "vue";
import type { DefineComponent } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { expect, userEvent, within } from "storybook/test";

import KdsButton from "../../../buttons/KdsButton/KdsButton.vue";
import KdsModal from "../../../overlays/Modal/KdsModal.vue";
import KdsModalLayout from "../../../overlays/Modal/KdsModalLayout.vue";
import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../../test-utils/storybook.ts";

import KdsDropdown from "./KdsDropdown.vue";
import type { KdsDropdownOption, KdsDropdownProps } from "./types.ts";

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
      table: { category: "model" },
    },
    label: {
      control: "text",
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
      table: { category: "props" },
    },
    possibleValues: {
      control: "object",
      table: { category: "props" },
    },
    noEntriesText: {
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
    readonly: {
      control: "boolean",
      table: { category: "props" },
    },
    required: {
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
    id: {
      control: "text",
      table: { category: "props" },
    },
  },
  args: {
    modelValue: null,
    label: "Label",
    description: "",
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
  },
  render: (args) => {
    const [, updateArgs] = useArgs();
    return {
      components: { KdsDropdown },
      setup() {
        const modelValue = ref(args.modelValue);
        watchEffect(() => (modelValue.value = args.modelValue));
        watchEffect(() => updateArgs({ modelValue: modelValue.value }));
        return { args, modelValue };
      },
      template: '<KdsDropdown v-bind="args" v-model="modelValue" />',
    };
  },
};

export default meta;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /Label/ });

    // --- Keyboard: ArrowDown opens dropdown and focuses the search field ---
    trigger.focus();
    await expect(trigger).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");

    const filterInput = await canvas.findByRole("searchbox", {
      name: "Filter options",
    });
    await expect(filterInput).toHaveFocus();
    await expect(filterInput).toHaveAttribute("aria-activedescendant");

    // Enter selects the first active option (Option A)
    await userEvent.keyboard("{Enter}");
    await expect(trigger).toHaveTextContent("Option A");

    // --- Mouse: click reopens dropdown, search gets focus ---
    await userEvent.click(trigger);

    const filterInputAfterClick = await canvas.findByRole("searchbox", {
      name: "Filter options",
    });
    await expect(filterInputAfterClick).toHaveFocus();
    await expect(
      canvas.getByRole("option", { name: "Option A" }),
    ).toBeVisible();

    // ArrowDown from Option A (active) → Option B, then select
    await userEvent.keyboard("{ArrowDown}{Enter}");
    await expect(trigger).toHaveTextContent("Option B");

    // --- Reopen and test Escape (selection stays unchanged) ---
    await userEvent.click(trigger);
    await canvas.findByRole("searchbox", { name: "Filter options" });
    await userEvent.keyboard("{ArrowDown}{ArrowDown}{Escape}");
    await expect(trigger).toHaveTextContent("Option B");

    // --- Clicking the same option keeps it selected ---
    await userEvent.click(trigger);
    await userEvent.click(await canvas.findByText("Option B"));
    await expect(trigger).toHaveTextContent("Option B");
  },
};

export const WithValue: Story = {
  args: {
    modelValue: "a",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /Label/ });

    // Selected value is shown on the trigger
    await expect(trigger).toHaveTextContent("Option A");

    // Option A has an icon accessory shown on the trigger
    await expect(canvasElement.querySelector(".kds-icon")).not.toBeNull();
  },
};

export const MissingValue: Story = {
  args: {
    modelValue: "missing",
    possibleValues: baseOptions,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /Label/ });

    await userEvent.click(trigger);

    const missingOption = canvas.getByRole("option", {
      name: /\(Missing\)\s*missing/i,
    });
    await expect(missingOption).toHaveAttribute("aria-disabled", "true");

    await userEvent.click(canvas.getByRole("option", { name: "Option A" }));

    await expect(trigger).toHaveTextContent("Option A");

    await userEvent.click(trigger);

    await expect(
      canvas.queryByRole("option", { name: /\(Missing\)\s*missing/i }),
    ).not.toBeInTheDocument();
  },
};

export const WithError: Story = {
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

export const Readonly: Story = {
  args: {
    readonly: true,
    modelValue: "a",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /Label/ });

    await expect(trigger).toHaveAttribute("aria-disabled", "true");
    await userEvent.click(trigger);
    await expect(canvas.queryByRole("searchbox")).not.toBeInTheDocument();
  },
};

export const WithSubText: Story = {
  args: {
    subText: "Helper text goes here",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /Label/ });

    await expect(trigger).toBeDisabled();
    await userEvent.click(trigger);
    await expect(canvas.queryByRole("searchbox")).not.toBeInTheDocument();
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
                v-model="modelValue"
                label="Dropdown"
                placeholder="Select an option"
                :possible-values="args.possibleValues"
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

    const trigger = await canvas.findByRole("button", { name: /Dropdown/ });
    await userEvent.click(trigger);

    await expect(canvas.getByText("Option A")).toBeTruthy();
  },
};

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

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsDropdown,
  wrapperStyle: { width: "213px" },
  designsToCompare: {
    ".Dropdown": {
      props: {
        ariaLabel: "Dropdown",
        possibleValues: baseOptions,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3594-15392":
          {
            placeholder: "Label",
            modelValue: null,
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3594-15391":
          {
            placeholder: "Label",
            modelValue: null,
            parameters: { pseudo: { hover: true } },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=16518-76137":
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
            possibleValues: [{ id: "a", text: "Label" }],
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3594-15417":
          {
            modelValue: "a",
            possibleValues: [{ id: "a", text: "Label" }],
            error: true,
            subText: "{Error message}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5351-35693":
          {
            modelValue: "a",
            possibleValues: [{ id: "a", text: "Label" }],
            validating: true,
            subText: "{Validation message}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3594-15390":
          {
            modelValue: "a",
            possibleValues: [{ id: "a", text: "Label" }],
            disabled: true,
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=16518-77523":
          {
            modelValue: "Label",
            possibleValues: baseOptions,
          },
      },
    },
    ".WithAccessory": {
      props: {
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
                text: "Label",
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
                text: "Label",
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
                text: "Label",
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
                text: "Label",
                accessory: { type: "avatar", initials: "fv" },
              },
            ],
          },
      },
    },
  },
});

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
