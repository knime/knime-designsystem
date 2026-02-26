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
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2007-6814&m=dev",
    },
  },
  argTypes: {
    modelValue: {
      control: { type: "text" },
      description:
        "Currently selected option id (from `possibleValues`). Can be `undefined` if no option is selected.",
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
          '<story v-bind="args" @update:modelValue="(value) => updateArgs({ modelValue: value })" />',
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
        // Focus (Figma bounding box includes outline)
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2416-31010&p=f&m=dev":
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
        // Error + :focus-visible (Accessibility example)
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2416-31011&m=dev":
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
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7588-143386&m=dev":
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
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7691-97819&m=dev":
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
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7588-143387&m=dev":
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
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7691-97820&m=dev":
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

    // Reset state so the interaction test can be re-run deterministically.
    // We reset every group that we modified above.

    // Interactive group back to initial: "a".
    await userEvent.click(optionA);
    await expect(optionA).toHaveAttribute("aria-checked", "true");
    await expect(optionA).toHaveAttribute("tabindex", "0");

    // Error group back to initial: "a".
    await userEvent.click(errorA);
    await expect(errorA).toHaveAttribute("aria-checked", "true");
    await expect(errorB).toHaveAttribute("aria-checked", "false");

    // Icon-only group back to initial: "cards".
    await userEvent.click(cards);
    await expect(cards).toHaveAttribute("aria-checked", "true");
    await expect(list).toHaveAttribute("aria-checked", "false");

    // Disabled group should never have changed, but assert initial selection again.
    await expect(disabledA).toHaveAttribute("aria-checked", "true");
    await expect(disabledB).toHaveAttribute("aria-checked", "false");
  },
};
