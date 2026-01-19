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
        "Required possibleValues array (at least 2 entries). Each entry may be a plain string or an object with text and id.",
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
        "Visual variant of the value switch. ‘muted’ is used for less prominent usecases (e.g. in node dialogs)",
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

export const WithoutLabel: Story = {
  args: {
    label: undefined,
    id: "custom-value-switch-id",
    possibleValues: ["Option A", "Option B", "Option C", "Option D"],
    modelValue: "Option A",
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
          { text: "Option A", id: "Option A", leadingIcon: "search" },
          { text: "Option B", id: "Option B", trailingIcon: "chevron-right" },
        ],
        [
          { id: "Option A", leadingIcon: "view-cards", title: "Cards" },
          { id: "Option B", leadingIcon: "list", title: "List" },
        ],
      ],
      modelValue: ["Option A"],
      size: ["medium", "small"],
      variant: ["default", "muted"],
      label: ["Label", undefined],
      disabled: [false, true],
      subText: [undefined, "Additional information"],
      error: [false, true],
      preserveSubTextSpace: [false, true],
    },
  ],
});

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsValueSwitch,
  designsToCompare: {
    Default: {
      props: {
        possibleValues: [
          { text: "{Value}", id: "a" },
          { text: "{Value}", id: "b" },
          { text: "{Value}", id: "c" },
          { text: "{Value}", id: "d" },
          { text: "{Value}", id: "e" },
        ],
        modelValue: "a",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2408-14147&m=dev":
          {},
      },
    },
    Muted: {
      props: {
        possibleValues: [
          { text: "{Value}", id: "a" },
          { text: "{Value}", id: "b" },
          { text: "{Value}", id: "c" },
          { text: "{Value}", id: "d" },
          { text: "{Value}", id: "e" },
        ],
        modelValue: "a",
        variant: "muted",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7684-91713&m=dev":
          {},
      },
    },
    Small: {
      props: {
        possibleValues: [
          { text: "{Value}", id: "a" },
          { text: "{Value}", id: "b" },
          { text: "{Value}", id: "c" },
          { text: "{Value}", id: "d" },
          { text: "{Value}", id: "e" },
        ],
        modelValue: "a",
        size: "small",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2408-14191&m=dev":
          {},
      },
    },
    SmallMuted: {
      props: {
        possibleValues: [
          { text: "{Value}", id: "a" },
          { text: "{Value}", id: "b" },
          { text: "{Value}", id: "c" },
          { text: "{Value}", id: "d" },
          { text: "{Value}", id: "e" },
        ],
        modelValue: "a",
        size: "small",
        variant: "muted",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7684-91743&m=dev":
          {},
      },
    },
    Error: {
      props: {
        possibleValues: [
          { text: "{Value}", id: "a" },
          { text: "{Value}", id: "b" },
          { text: "{Value}", id: "c" },
          { text: "{Value}", id: "d" },
          { text: "{Value}", id: "e" },
        ],
        modelValue: "a",
        error: true,
        subText: "{SubText content}",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2082-20723&m=dev":
          {},
      },
    },
    ErrorMuted: {
      props: {
        possibleValues: [
          { text: "{Value}", id: "a" },
          { text: "{Value}", id: "b" },
          { text: "{Value}", id: "c" },
          { text: "{Value}", id: "d" },
          { text: "{Value}", id: "e" },
        ],
        modelValue: "a",
        error: true,
        subText: "{SubText content}",
        variant: "muted",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7691-106492&m=dev":
          {},
      },
    },
    SmallError: {
      props: {
        possibleValues: [
          { text: "{Value}", id: "a" },
          { text: "{Value}", id: "b" },
          { text: "{Value}", id: "c" },
          { text: "{Value}", id: "d" },
          { text: "{Value}", id: "e" },
        ],
        modelValue: "a",
        size: "small",
        error: true,
        subText: "{SubText content}",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2408-13594&m=dev":
          {},
      },
    },
    SmallErrorMuted: {
      props: {
        possibleValues: [
          { text: "{Value}", id: "a" },
          { text: "{Value}", id: "b" },
          { text: "{Value}", id: "c" },
          { text: "{Value}", id: "d" },
          { text: "{Value}", id: "e" },
        ],
        modelValue: "a",
        size: "small",
        error: true,
        subText: "{SubText content}",
        variant: "muted",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7691-106458&m=dev":
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
        leadingIcon: "search",
      },
      {
        id: "b",
        leadingIcon: "view-cards",
        title:
          "This is a very long icon-only option title that should be used as the tooltip and overflow reference",
      },
      {
        text: "This is a very long option label that should overflow and wrap properly",
        id: "c",
        trailingIcon: "chevron-right",
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
              { text: 'Option C', id: 'c' },
              { text: 'Option D', id: 'd' },
            ]"
            sub-text="Group sub text"
            v-model="interactive"
          />
        </div>

        <div>
          <KdsValueSwitch
            label="Error group"
            :possible-values="[
              { text: 'Option A', id: 'a' },
              { text: 'Option B', id: 'b' },
            ]"
            sub-text="Error message"
            error
            v-model="errorGroup"
          />
        </div>

        <div>
          <KdsValueSwitch
            label="Icon-only group"
            :possible-values="[
              { id: 'cards', leadingIcon: 'view-cards', title: 'Cards' },
              { id: 'list', leadingIcon: 'list', title: 'List' },
            ]"
            v-model="iconOnly"
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
        errorGroup: "a",
        iconOnly: "cards",
        disabledGroup: "a",
      };
    },
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // -------- Interactive group --------
    const interactiveGroup = canvas.getByRole("radiogroup", {
      name: "Interactive group",
    });
    const interactiveScope = within(interactiveGroup);

    const optionA = interactiveScope.getByRole("radio", { name: "Option A" });
    const optionB = interactiveScope.getByRole("radio", { name: "Option B" });
    const optionC = interactiveScope.getByRole("radio", { name: "Option C" });
    const optionD = interactiveScope.getByRole("radio", { name: "Option D" });

    // Initial state from v-model
    await expect(optionA).toHaveAttribute("aria-checked", "true");
    await expect(optionA).toHaveAttribute("tabindex", "0");
    await expect(optionB).toHaveAttribute("tabindex", "-1");

    // Group sub text should be wired via aria-describedby
    await expect(interactiveGroup).toHaveAttribute("aria-describedby");

    // Mouse: selection changes
    await userEvent.click(optionB);
    await expect(optionB).toHaveAttribute("aria-checked", "true");
    await expect(optionB).toHaveAttribute("tabindex", "0");
    await expect(optionA).toHaveAttribute("tabindex", "-1");

    // Keyboard: ArrowRight moves selection
    optionB.focus();
    await userEvent.keyboard("{ArrowRight}");
    await expect(optionC).toHaveAttribute("aria-checked", "true");
    await expect(optionC).toHaveFocus();

    // ArrowLeft goes back
    await userEvent.keyboard("{ArrowLeft}");
    await expect(optionB).toHaveAttribute("aria-checked", "true");
    await expect(optionB).toHaveFocus();

    // Home -> first
    await userEvent.keyboard("{Home}");
    await expect(optionA).toHaveAttribute("aria-checked", "true");
    await expect(optionA).toHaveFocus();

    // End -> last
    await userEvent.keyboard("{End}");
    await expect(optionD).toHaveAttribute("aria-checked", "true");
    await expect(optionD).toHaveFocus();

    // Space on focused option selects it (common for radios)
    await userEvent.keyboard(" ");
    await expect(optionD).toHaveAttribute("aria-checked", "true");

    // -------- Error group --------
    const errorGroup = canvas.getByRole("radiogroup", { name: "Error group" });
    const errorScope = within(errorGroup);

    const errorA = errorScope.getByRole("radio", { name: "Option A" });
    const errorB = errorScope.getByRole("radio", { name: "Option B" });

    // Group-level validation should be exposed via aria-invalid
    await expect(errorGroup).toHaveAttribute("aria-invalid", "true");
    await expect(errorGroup).toHaveAttribute("aria-describedby");

    await userEvent.click(errorB);
    await expect(errorB).toHaveAttribute("aria-checked", "true");
    await expect(errorA).toHaveAttribute("aria-checked", "false");

    // -------- Icon-only group --------
    const iconOnlyGroup = canvas.getByRole("radiogroup", {
      name: "Icon-only group",
    });
    const iconOnlyScope = within(iconOnlyGroup);

    const cards = iconOnlyScope.getByRole("radio", { name: "Cards" });
    const list = iconOnlyScope.getByRole("radio", { name: "List" });

    await expect(cards).toHaveAttribute("aria-checked", "true");

    await userEvent.click(list);
    await expect(list).toHaveAttribute("aria-checked", "true");
    await expect(cards).toHaveAttribute("aria-checked", "false");

    // -------- Disabled group --------
    const disabledGroup = canvas.getByRole("radiogroup", {
      name: "Disabled group",
    });
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

    // Reset state so the interaction test can be re-run deterministically
    await userEvent.click(optionA);
    await expect(optionA).toHaveAttribute("aria-checked", "true");
  },
};
