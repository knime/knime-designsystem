import { ref, useTemplateRef } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, userEvent, within } from "storybook/test";

import { KdsToggleButton } from "../../buttons";
import {
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook";

import KdsPopover from "./KdsPopover.vue";
import PopoverDemo from "./PopoverDemo.vue";
import { kdsPopoverPlacements } from "./enums";

const meta: Meta<typeof KdsPopover> = {
  title: "Overlays/KdsPopover",
  component: KdsPopover,
  tags: ["autodocs"],
  argTypes: {
    modelValue: {
      control: { type: "boolean" },
      table: { category: "Model" },
    },
    activatorEl: {
      table: { category: "Props" },
    },
    anchorEl: {
      table: { category: "Props" },
    },
    placement: {
      control: { type: "select" },
      options: kdsPopoverPlacements,
      table: { category: "Props" },
    },
    default: {
      control: { type: "text" },
      description: "Default slot content rendered inside the popover.",
      table: { category: "Slots" },
    },
  },
  args: {
    modelValue: false,
    activatorEl: null,
    anchorEl: null,
    placement: "bottom-right",
    default: "This is a basic popover example.",
  },
  parameters: {
    docs: {
      description: {
        component: `Positioned popover container based on the native Popover API and CSS anchor positioning.

**Note:** The popover does not include any padding. Padding must be set by the embedded container.

Automatically sets the following a11y attributes on the activatorEl:
- \`aria-expanded\` – synced with the open state
- \`aria-controls\` – points to the popover's ID
- \`aria-haspopup="dialog"\` – indicates the element controls a dialog

Sample usage:
\`\`\`vue
<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import { KdsPopover, KdsToggleButton } from "@knime/kds-components";

const isOpen = ref(false);
const activatorEl = useTemplateRef("activatorEl");
</script>

<template>
  <KdsToggleButton
    ref="activatorEl"
    v-model="isOpen"
    label="Toggle popover"
    variant="outlined"
  />

  <KdsPopover
    v-model="isOpen"
    :activator-el="activatorEl"
    placement="bottom-right"
  >
    <div style="padding: var(--kds-spacing-container-0-75x)">
      Popover content goes here.
    </div>
  </KdsPopover>
</template>
\`\`\`
`,
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8522-305454",
    },
  },
};

export default meta;

type Story = StoryObj<typeof KdsPopover>;
type DemoStory = StoryObj<typeof PopoverDemo>;

export const Default: Story = {
  render: (args) => ({
    components: { KdsToggleButton, KdsPopover },
    setup() {
      const activatorEl = useTemplateRef("activatorEl");
      return { args, activatorEl };
    },
    template: `
      <KdsToggleButton
        ref="activatorEl"
        v-model="args.modelValue"
        label="Toggle popover"
        variant="outlined"
        data-testid="toggle-button"
      />

      <KdsPopover
        v-model="args.modelValue"
        :activator-el="activatorEl"
        :placement="args.placement"
        data-testid="popover"
      >
        <div style="padding: var(--kds-spacing-container-0-75x)">
          {{ args.default }}
        </div>
      </KdsPopover>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByTestId("toggle-button");
    const popover = canvas.getByTestId("popover");

    // Initially popover should not be visible
    expect(popover).not.toBeVisible();

    // Activator (which is also the anchor) should have correct a11y attributes
    expect(toggleButton).toHaveAttribute("aria-haspopup", "dialog");
    expect(toggleButton).toHaveAttribute("aria-controls", popover.id);
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");

    // Activator (which is also the anchor) should have CSS anchor-name set
    expect(toggleButton.style.getPropertyValue("anchor-name")).toBe(
      `--anchor-${popover.id}`,
    );

    // Click to open
    await userEvent.click(toggleButton);
    expect(popover).toBeVisible();
    expect(toggleButton).toHaveAttribute("aria-haspopup", "dialog");
    expect(toggleButton).toHaveAttribute("aria-controls", popover.id);
    expect(toggleButton).toHaveAttribute("aria-expanded", "true");

    // Click to close
    await userEvent.click(toggleButton);
    expect(popover).not.toBeVisible();
    expect(toggleButton).toHaveAttribute("aria-haspopup", "dialog");
    expect(toggleButton).toHaveAttribute("aria-controls", popover.id);
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
  },
};

export const DifferentPopoverPosition: Story = {
  args: {
    placement: "top-left",
  },
  render: (args) => ({
    components: { KdsToggleButton, KdsPopover },
    setup() {
      const activatorEl = useTemplateRef("activatorEl");
      return { args, activatorEl };
    },
    template: `
      <KdsToggleButton
        ref="activatorEl"
        label="Toggle popover"
        variant="outlined"
        v-model="args.modelValue"
      />

      <KdsPopover
        v-model="args.modelValue"
        :activator-el="activatorEl"
        :placement="args.placement"
      >
        <div style="padding: var(--kds-spacing-container-0-75x)">
          {{ args.default }}
        </div>
      </KdsPopover>
    `,
  }),
};

export const SeparateAnchorEl: Story = {
  render: (args) => ({
    components: { KdsToggleButton, KdsPopover },
    setup() {
      const open = ref(false);
      const activatorEl = useTemplateRef("activatorEl");
      const anchorEl = useTemplateRef("anchorEl");

      return { args, open, activatorEl, anchorEl };
    },
    template: `
      <KdsToggleButton
        ref="activatorEl"
        label="Toggle popover"
        variant="outlined"
        v-model="open"
        data-testid="toggle-button"
      />

      <div
        ref="anchorEl"
        data-testid="anchor-element"
        style="
          margin-top: var(--kds-spacing-container-1x);
          padding: var(--kds-spacing-container-0-5x);
          border: 1px solid var(--kds-color-border-subtle);
        "
      >
        Separate anchor element
      </div>

      <KdsPopover
        v-model="open"
        :activator-el="activatorEl"
        :anchor-el="anchorEl"
        placement="bottom-right"
        data-testid="popover"
      >
        <div style="padding: var(--kds-spacing-container-0-75x)">
          This popover is anchored to a separate element.
        </div>
      </KdsPopover>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByTestId("toggle-button");
    const anchorElement = canvas.getByTestId("anchor-element");
    const popover = canvas.getByTestId("popover");

    // Initially popover should not be visible
    expect(popover).not.toBeVisible();

    // A11y attributes should be on the activator, NOT the anchor
    expect(toggleButton).toHaveAttribute("aria-haspopup", "dialog");
    expect(toggleButton).toHaveAttribute("aria-controls", popover.id);
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");

    // CSS anchor-name should be on the anchor element, NOT the activator
    expect(anchorElement.style.getPropertyValue("anchor-name")).toBe(
      `--anchor-${popover.id}`,
    );
    expect(toggleButton.style.getPropertyValue("anchor-name")).toBe("");

    // Anchor element should NOT have a11y attributes
    expect(anchorElement).not.toHaveAttribute("aria-haspopup");
    expect(anchorElement).not.toHaveAttribute("aria-controls");
    expect(anchorElement).not.toHaveAttribute("aria-expanded");

    // Click to open
    await userEvent.click(toggleButton);
    expect(popover).toBeVisible();
    expect(toggleButton).toHaveAttribute("aria-expanded", "true");

    // Anchor should still not have a11y attributes after open
    expect(anchorElement).not.toHaveAttribute("aria-expanded");

    // Click to close
    await userEvent.click(toggleButton);
    expect(popover).not.toBeVisible();
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
  },
};

export const Inline: DemoStory = {
  parameters: {
    docs: {
      description: {
        story:
          "When the activator ref is invalid (null), the popover renders inline without positioning or the native popover behavior.",
      },
    },
  },
  render: () => ({
    components: { KdsPopover },
    setup() {
      const activatorEl = useTemplateRef("activatorEl");
      return { activatorEl };
    },
    template: `
      <div style="display: flex">
        <KdsPopover
          :activator-el="activatorEl"
          placement="bottom-right"
        >
          <div style="padding: var(--kds-spacing-container-0-75x)">
            This popover is rendered inline because the activator ref is null.
          </div>
        </KdsPopover>
      </div>
    `,
  }),
};

// AllCombinations story is not applicable for KdsPopover as it has no visual prop variants and requires an activator element

export const DesignComparator: DemoStory = {
  ...buildDesignComparatorStory({
    component: PopoverDemo,
    designsToCompare: {
      Default: {
        props: {
          content:
            "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large.",
          style: "max-width: 353px",
        },
        variants: {
          "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8522-305454":
            { parameters: { figmaOffset: { x: -20, y: -16 } } },
        },
      },
    },
  }),
};

export const TextOverflow: DemoStory = {
  ...buildTextOverflowStory({
    component: PopoverDemo,
    width: 240,
  }),
  args: {
    content:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large.",
  },
};
