import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { expect, userEvent, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook.ts";

import KdsValueSwitch from "./KdsValueSwitch.vue";

type Story = StoryObj<typeof KdsValueSwitch>;

const meta: Meta<typeof KdsValueSwitch> = {
  title: "Components/forms/KdsValueSwitch",
  component: KdsValueSwitch as Meta<typeof KdsValueSwitch>["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A value switch component implemented as a radio group that renders a list of possible values from a data array and manages selection via v-model.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2007-6814&m=dev",
    },
  },
  argTypes: {
    id: {
      control: { type: "text" },
      description: "Optional id for the root element.",
      table: { category: "Props" },
    },
    label: {
      control: { type: "text" },
      description: "Group label.",
      table: { category: "Props" },
    },
    possibleValues: {
      control: { type: "object" },
      description:
        "Required possibleValues array (at least 2 entries). Each entry may be a plain string or an object with text, id, and optional disabled/helperText/error.",
      table: { category: "Props" },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disables the whole group and prevents interaction.",
      table: { category: "Props" },
    },
    subText: {
      control: { type: "text" },
      description:
        "Optional helper or error text shown below the options and referenced via aria-describedby.",
      table: { category: "Props" },
    },
    preserveSubTextSpace: {
      control: { type: "boolean" },
      description:
        "Reserve space for subtext to prevent layout shifts when helper text or errors appear",
      table: { category: "Props" },
    },
    size: {
      control: { type: "select" },
      options: ["medium", "small"],
      description:
        "Size of the value switch (affects height/padding/typography).",
      table: { category: "Props" },
    },
    error: {
      control: { type: "boolean" },
      description:
        "Marks the whole value switch as invalid (group-level validation).",
      table: { category: "Props" },
    },
    variant: {
      control: { type: "select" },
      options: ["default", "muted"],
      description:
        "Visual variant of the value switch. 'muted' renders the items on a muted background.",
      table: { category: "Props" },
    },
  },
  args: {
    id: "value-switch",
    label: "Label",
    possibleValues: ["Option A", "Option B", "Option C", "Option D"],
    size: "medium",
    variant: "default",
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
        template: `
          <story
            v-bind="args"
            :model-value="args.modelValue"
            @update:model-value="(value) => updateArgs({ modelValue: value })"
          />
        `,
      };
    },
  ],
};

export default meta;

export const Default: Story = {
  args: {
    modelValue: "Option A",
  },
};

export const Small: Story = {
  args: {
    modelValue: "Option A",
    size: "small",
  },
};

export const Muted: Story = {
  args: {
    modelValue: "Option A",
    variant: "muted",
  },
};

export const Error: Story = {
  args: {
    modelValue: "Option A",
    error: true,
    subText: "Error message",
  },
};

export const Disabled: Story = {
  args: {
    modelValue: "Option A",
    disabled: true,
  },
};

export const WithSubText: Story = {
  args: {
    modelValue: "Option A",
    subText: "Additional information about this selection",
  },
};

export const PreserveSubTextSpace: Story = {
  args: {
    modelValue: "Option A",
    subText: undefined,
    preserveSubTextSpace: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    label: undefined,
    id: "custom-value-switch-id",
    possibleValues: ["Option A", "Option B", "Option C", "Option D"],
    modelValue: "Option A",
  },
};

export const WithIcons: Story = {
  args: {
    modelValue: "a",
    possibleValues: [
      { text: "Option A", id: "a", leadingIcon: "placeholder" },
      {
        text: "Option B",
        id: "b",
        trailingIcon: "placeholder",
      },
      {
        text: "Option C",
        id: "c",
        leadingIcon: "placeholder",
        trailingIcon: "placeholder",
      },
    ],
  },
};

export const IconOnly: Story = {
  args: {
    modelValue: "a",
    possibleValues: [
      { id: "a", leadingIcon: "view-cards", title: "Cards" },
      { id: "b", leadingIcon: "list", title: "List" },
      { id: "c", leadingIcon: "mini-map", title: "Mini map" },
    ],
  },
};

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsValueSwitch,
  combinationsProps: [
    {
      id: ["value-switch-id"],
      possibleValues: [
        ["Option A", "Option B"],
        [
          { text: "Option A", id: "a", leadingIcon: "search" },
          { text: "Option B", id: "b", trailingIcon: "chevron-right" },
        ],
        [
          { id: "a", leadingIcon: "view-cards", title: "Cards" },
          { id: "b", leadingIcon: "list", title: "List" },
        ],
      ],
      modelValue: ["Option A", "a"],
      size: ["small", "medium"],
      variant: ["default", "muted"],
      label: ["Label", undefined],
      subText: [undefined, "Additional information"],
      error: [false, true],
      disabled: [false, true],
      preserveSubTextSpace: [false, true],
    },
  ],
});

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsValueSwitch,
  designsToCompare: {
    Default: {
      props: {
        label: "{Label}",
        possibleValues: [
          { text: "Label", id: "a" },
          { text: "Label", id: "b" },
          { text: "Label", id: "c" },
          { text: "Label", id: "d" },
        ],
        modelValue: "a",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2007-6814&m=dev":
          {},
      },
    },
    Small: {
      props: {
        label: "{Label}",
        possibleValues: [
          { text: "Label", id: "a" },
          { text: "Label", id: "b" },
          { text: "Label", id: "c" },
        ],
        modelValue: "a",
        size: "small",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2007-6814&m=dev":
          {
            size: "small",
          },
      },
    },
    Error: {
      props: {
        label: "{Label}",
        possibleValues: [
          { text: "Label", id: "a", error: true },
          { text: "Label", id: "b" },
          { text: "Label", id: "c" },
          { text: "Label", id: "d" },
        ],
        modelValue: "a",
        subText: "{Error message}",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2007-6814&m=dev":
          {},
      },
    },
    WithIcons: {
      props: {
        label: "{Label}",
        possibleValues: [
          {
            text: "Label",
            id: "a",
            leadingIcon: "search",
          },
          {
            text: "Label",
            id: "b",
            leadingIcon: "search",
          },
          {
            text: "Label",
            id: "c",
            leadingIcon: "search",
          },
        ],
        modelValue: "a",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2007-6814&m=dev":
          {},
      },
    },
  },
});

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsValueSwitch,
    width: 200,
  }),
  args: {
    label:
      "This is a very long group label that should overflow and wrap properly when the container is too narrow",
    possibleValues: [
      {
        text: "Short label",
        id: "a",
        helperText: "Short helper",
        leadingIcon: "search",
      },
      {
        text: "This is a very long option label that should overflow and wrap properly",
        id: "b",
        helperText: "Helper text that is also quite long and may wrap",
        trailingIcon: "chevron-right",
      },
      {
        id: "c",
        leadingIcon: "view-cards",
        title:
          "This is a very long icon-only option title that should be used as the tooltip and overflow reference",
      },
    ],
    modelValue: "a",
    subText: "General sub text for the entire value switch",
  },
};

export const Interaction: Story = {
  args: {
    label: "Label",
  },
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => ({
    components: { KdsValueSwitch },
    template: `
      <div style="display: grid; gap: 24px; align-items: start;">
        <div>
          <KdsValueSwitch
            label="Interactive group"
            :possible-values="[
              { text: 'Option A', id: 'a' },
              { text: 'Option B', id: 'b' },
              { text: 'Option C (disabled)', id: 'c', disabled: true },
              { text: 'Option D', id: 'd' },
            ]"
            v-model="interactive"
          />
        </div>

        <div>
          <KdsValueSwitch
            label="Disabled group"
            :possible-values="[
              { text: 'Option A', id: 'a' },
              { text: 'Option B', id: 'b' },
            ]"
            v-model="disabledGroup"
            disabled
          />
        </div>
      </div>
    `,
    data() {
      return {
        interactive: "a",
        disabledGroup: "a",
      };
    },
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const groups = canvas.getAllByRole("radiogroup");

    // -------- Interactive group --------
    const interactiveGroup = groups[0];
    const interactiveScope = within(interactiveGroup);

    const optionA = interactiveScope.getByRole("radio", { name: "Option A" });
    const optionB = interactiveScope.getByRole("radio", { name: "Option B" });
    const optionC = interactiveScope.getByRole("radio", {
      name: "Option C (disabled)",
    });
    const optionD = interactiveScope.getByRole("radio", { name: "Option D" });

    await expect(optionA).toHaveAttribute("aria-checked", "true");
    await expect(optionA).toHaveAttribute("tabindex", "0");
    await expect(optionB).toHaveAttribute("tabindex", "-1");
    await expect(optionC).toBeDisabled();

    // Mouse: selection changes
    await userEvent.click(optionB);
    await expect(optionB).toHaveAttribute("aria-checked", "true");
    await expect(optionB).toHaveAttribute("tabindex", "0");
    await expect(optionA).toHaveAttribute("tabindex", "-1");

    // Keyboard: ArrowRight moves selection and skips disabled option
    optionB.focus();
    await userEvent.keyboard("{ArrowRight}");
    await expect(optionD).toHaveAttribute("aria-checked", "true");
    await expect(optionD).toHaveFocus();

    // Home -> first enabled
    await userEvent.keyboard("{Home}");
    await expect(optionA).toHaveAttribute("aria-checked", "true");
    await expect(optionA).toHaveFocus();

    // End -> last enabled
    await userEvent.keyboard("{End}");
    await expect(optionD).toHaveAttribute("aria-checked", "true");
    await expect(optionD).toHaveFocus();

    // Enter on disabled should not change selection
    optionC.focus();
    await userEvent.keyboard("{Enter}");
    await expect(optionD).toHaveAttribute("aria-checked", "true");

    // Reset state so the interaction test can be re-run deterministically
    await userEvent.click(optionA);
    await expect(optionA).toHaveAttribute("aria-checked", "true");
    await expect(optionA).toHaveAttribute("tabindex", "0");

    // -------- Disabled group --------
    const disabledGroup = groups[1];
    const disabledScope = within(disabledGroup);

    const disabledA = disabledScope.getByRole("radio", { name: "Option A" });
    const disabledB = disabledScope.getByRole("radio", { name: "Option B" });

    await expect(disabledA).toBeDisabled();
    await expect(disabledB).toBeDisabled();

    // Neither click nor keyboard should change selection
    await userEvent.click(disabledB);
    await expect(disabledA).toHaveAttribute("aria-checked", "true");

    disabledA.focus();
    await userEvent.keyboard("{ArrowRight}");
    await expect(disabledA).toHaveAttribute("aria-checked", "true");
  },
};
