import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { expect, userEvent, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook.ts";

import KdsValueSwitch from "./KdsValueSwitch.vue";
import { kdsValueSwitchSizes, kdsValueSwitchVariants } from "./enums";

type Story = StoryObj<typeof KdsValueSwitch>;

const meta: Meta<typeof KdsValueSwitch> = {
  title: "Form Fields/ValueSwitch",
  component: KdsValueSwitch as Meta<typeof KdsValueSwitch>["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "`KdsValueSwitch` is a radio-group based value selector. It renders a list of options from `possibleValues` and manages the selection via `v-model` (roving tabIndex + arrow-key navigation). Use it for mutually exclusive choices.\n\nAccessibility notes:\n- If you omit `label`, you should provide an accessible name via `aria-label`/`aria-labelledby` on the component (depending on what the component supports) or by wrapping it with an external label.\n- For icon-only options, provide a `title` for each option so each radio has an accessible name.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2007-6814",
    },
  },
  argTypes: {
    modelValue: {
      control: { type: "text" },
      description:
        "Currently selected option id (from `possibleValues`). Can be `undefined` if no option is selected.",
      table: { category: "model" },
    },
    // @ts-expect-error – Storybook doesn't type emit handlers in argTypes for DefineComponent
    "update:modelValue": {
      description: "Emitted when the selection changes",
      table: { category: "model" },
    },
    id: {
      control: { type: "text" },
      description:
        "Optional id for the root element. Useful for external labeling and testing.",
      table: { category: "props" },
    },
    label: {
      control: { type: "text" },
      description:
        "Optional group label. Recommended for accessibility; if omitted ensure the group still has an accessible name.",
      table: { category: "props" },
    },
    possibleValues: {
      control: { type: "object" },
      description:
        "Options to render. Use `string[]` for simple cases or an array of objects for richer options: `{ id, text?, title?, leadingIcon?, trailingIcon? }`.\n\n- `id` is the value used for v-model.\n- `text` is the visible label.\n- For icon-only options omit `text` and provide `title` (used as accessible label).",
      table: { category: "props" },
    },
    variant: {
      control: { type: "select" },
      options: kdsValueSwitchVariants,
      description:
        "Visual variant of the value switch. Use `muted` for less prominent use cases (e.g. node dialogs).",
      table: { category: "props" },
    },
    size: {
      control: { type: "select" },
      options: kdsValueSwitchSizes,
      description:
        "Size of the value switch (affects height, padding and typography).",
      table: { category: "props" },
    },
    disabled: {
      control: { type: "boolean" },
      description:
        "Disables the entire group and prevents mouse/keyboard interaction.",
      table: { category: "props" },
    },
    error: {
      control: { type: "boolean" },
      description:
        "Marks the value switch as invalid (group-level validation) and exposes `aria-invalid`.",
      table: { category: "props" },
    },
    subText: {
      control: { type: "text" },
      description:
        "Optional helper or error text shown below the options. It is referenced via `aria-describedby`.",
      table: { category: "props" },
    },
    preserveSubTextSpace: {
      control: { type: "boolean" },
      description:
        "Reserve space for `subText` to prevent layout shifts when helper/error text appears.",
      table: { category: "props" },
    },
  },
  args: {
    modelValue: "Option A",
    // @ts-expect-error – Storybook reactive-arg workaround; not in ComponentPropsAndSlots
    "update:modelValue": (value: string) => {
      const [_, updateArgs] = useArgs();
      updateArgs({ modelValue: value });
    },
    id: "value-switch",
    label: "Label",
    possibleValues: ["Option A", "Option B", "Option C", "Option D"],
    variant: "default",
    size: "medium",
    disabled: false,
    error: false,
    subText: "",
    preserveSubTextSpace: false,
  },
};

export default meta;

export const Default: Story = {
  args: {
    modelValue: "Option A",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const group = canvas.getByRole("radiogroup");
    const scope = within(group);

    const optionA = scope.getByRole("radio", { name: "Option A" });
    const optionB = scope.getByRole("radio", { name: "Option B" });

    await expect(optionA).toHaveAttribute("aria-checked", "true");
    await expect(optionA).toHaveAttribute("tabindex", "0");
    await expect(optionB).toHaveAttribute("tabindex", "-1");

    // Mouse: selection changes
    await userEvent.click(optionB);
    await expect(optionB).toHaveAttribute("aria-checked", "true");
    await expect(optionA).toHaveAttribute("tabindex", "-1");

    // Keyboard: ArrowRight moves selection
    optionB.focus();
    await userEvent.keyboard("{ArrowRight}");
    const optionC = scope.getByRole("radio", { name: "Option C" });
    await expect(optionC).toHaveAttribute("aria-checked", "true");
    await expect(optionC).toHaveFocus();

    // ArrowLeft goes back
    await userEvent.keyboard("{ArrowLeft}");
    await expect(optionB).toHaveAttribute("aria-checked", "true");
    await expect(optionB).toHaveFocus();

    // Home -> first option
    await userEvent.keyboard("{Home}");
    await expect(optionA).toHaveAttribute("aria-checked", "true");
    await expect(optionA).toHaveFocus();

    // End -> last option
    await userEvent.keyboard("{End}");
    const optionD = scope.getByRole("radio", { name: "Option D" });
    await expect(optionD).toHaveAttribute("aria-checked", "true");
    await expect(optionD).toHaveFocus();

    // Space on focused option keeps it selected
    await userEvent.keyboard(" ");
    await expect(optionD).toHaveAttribute("aria-checked", "true");

    // Reset state
    await userEvent.click(optionA);
    await expect(optionA).toHaveAttribute("aria-checked", "true");
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const group = canvas.getByRole("radiogroup");
    const scope = within(group);

    const cards = scope.getByRole("radio", { name: "Cards" });
    const list = scope.getByRole("radio", { name: "List" });

    await expect(cards).toHaveAttribute("aria-checked", "true");

    // Mouse: selection changes
    await userEvent.click(list);
    await expect(list).toHaveAttribute("aria-checked", "true");
    await expect(cards).toHaveAttribute("aria-checked", "false");

    // Reset state
    await userEvent.click(cards);
    await expect(cards).toHaveAttribute("aria-checked", "true");
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

export const Disabled: Story = {
  args: {
    modelValue: "Option A",
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const group = canvas.getByRole("radiogroup");
    const scope = within(group);

    const optionA = scope.getByRole("radio", { name: "Option A" });
    const optionB = scope.getByRole("radio", { name: "Option B" });

    await expect(optionA).toBeDisabled();
    await expect(optionB).toBeDisabled();

    // Click should not change selection
    await userEvent.click(optionB);
    await expect(optionA).toHaveAttribute("aria-checked", "true");

    // Keyboard should not change selection
    optionA.focus();
    await userEvent.keyboard("{ArrowRight}");
    await expect(optionA).toHaveAttribute("aria-checked", "true");
  },
};

export const WithSubText: Story = {
  render: () => ({
    components: { KdsValueSwitch },
    template: `
      <div style="display: grid; gap: 24px; align-items: start;">
        <KdsValueSwitch
          label="Preserve sub text space (no text)"
          :possible-values="['Option A', 'Option B', 'Option C', 'Option D']"
          model-value="Option A"
          :preserve-sub-text-space="true"
        />

        <KdsValueSwitch
          label="With sub text"
          :possible-values="['Option A', 'Option B', 'Option C', 'Option D']"
          model-value="Option A"
          sub-text="Additional information about this selection"
        />
      </div>
    `,
  }),
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
};

export const Error: Story = {
  args: {
    modelValue: "Option A",
    error: true,
    subText: "Error message",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const group = canvas.getByRole("radiogroup");
    const scope = within(group);

    await expect(group).toHaveAttribute("aria-invalid", "true");
    await expect(group).toHaveAttribute("aria-describedby");

    const optionA = scope.getByRole("radio", { name: "Option A" });
    const optionB = scope.getByRole("radio", { name: "Option B" });

    // Mouse: selection changes even in error state
    await userEvent.click(optionB);
    await expect(optionB).toHaveAttribute("aria-checked", "true");
    await expect(optionA).toHaveAttribute("aria-checked", "false");

    // Keyboard: ArrowRight moves selection
    optionB.focus();
    await userEvent.keyboard("{ArrowRight}");
    const optionC = scope.getByRole("radio", { name: "Option C" });
    await expect(optionC).toHaveAttribute("aria-checked", "true");
    await expect(optionC).toHaveFocus();

    // Reset state
    await userEvent.click(optionA);
    await expect(optionA).toHaveAttribute("aria-checked", "true");
  },
};

export const ExternalLabel: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Example with an external `<label>` element. The external label is connected via `for`/`id`, so the radiogroup still has an accessible name even though the component `label` prop is omitted.",
      },
    },
  },
  render: () => ({
    components: { KdsValueSwitch },
    template: `
      <div style="display: grid; gap: 8px; align-items: start;">
        <label for="custom-value-switch">External label</label>

        <KdsValueSwitch
          id="custom-value-switch"
          :possible-values="['Option A', 'Option B', 'Option C', 'Option D']"
          model-value="Option A"
          :label="undefined"
        />
      </div>
    `,
  }),
};

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
        text: "Option A",
        id: "a",
        leadingIcon: "placeholder",
        trailingIcon: "placeholder",
      },
      {
        text: "Option B",
        id: "b",
        trailingIcon: "placeholder",
      },
      {
        text: "Option C",
        id: "c",
        leadingIcon: "placeholder",
      },
      {
        text: "Option D",
        id: "d",
      },
      {
        id: "f",
        leadingIcon: "placeholder",
        title: "Option E",
      },
    ],
    modelValue: "a",
    subText: "General sub text for the entire value switch",
  },
};

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
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2408-14147":
          {},
        // Focus (Figma bounding box includes outline)
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2416-31010":
          {
            parameters: {
              pseudo: { focusVisible: true },
              figmaOffset: { x: -3, y: -3 },
            },
          },
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
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7684-91713":
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
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2408-14191":
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
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7684-91743":
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
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2082-20723":
          {},
        // Error + :focus-visible (Accessibility example)
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2416-31011":
          {
            parameters: {
              pseudo: { focusVisible: true },
              figmaOffset: { x: -3, y: -3 },
            },
          },
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
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7691-106492":
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
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2408-13594":
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
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7691-106458":
          {},
      },
    },
    DisabledDefault: {
      props: {
        possibleValues: [
          { text: "{Value}", id: "a" },
          { text: "{Value}", id: "b" },
          { text: "{Value}", id: "c" },
          { text: "{Value}", id: "d" },
          { text: "{Value}", id: "e" },
        ],
        modelValue: "a",
        disabled: true,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7588-143386":
          {},
      },
    },
    DisabledMuted: {
      props: {
        possibleValues: [
          { text: "{Value}", id: "a" },
          { text: "{Value}", id: "b" },
        ],
        modelValue: "a",
        variant: "muted",
        disabled: true,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7691-97819":
          {},
      },
    },
    SmallDisabledDefault: {
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
        disabled: true,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7588-143387":
          {},
      },
    },
    SmallDisabledMuted: {
      props: {
        possibleValues: [
          { text: "{Value}", id: "a" },
          { text: "{Value}", id: "b" },
        ],
        modelValue: "a",
        size: "small",
        variant: "muted",
        disabled: true,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7691-97820":
          {},
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsValueSwitch,
  combinationsProps: {
    default: {
      id: ["value-switch-id"],
      label: ["Label"],
      modelValue: ["Option A"],
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
      size: kdsValueSwitchSizes,
      variant: kdsValueSwitchVariants,
      disabled: [false],
      error: [false],
      subText: [undefined, "Message"],
    },
    combinations: [
      { error: [true], subText: ["Error message"] },
      { disabled: [true] },
    ],
  },
  pseudoStates: ["hover", "active", "focus-visible"],
});
