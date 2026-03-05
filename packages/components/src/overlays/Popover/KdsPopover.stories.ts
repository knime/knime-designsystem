import { ref, useTemplateRef } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, userEvent, within } from "storybook/test";

import { KdsToggleButton } from "../../buttons";

import KdsPopover from "./KdsPopover.vue";
import { kdsPopoverPlacements, kdsPopoverRoles } from "./enums";

const meta: Meta<typeof KdsPopover> = {
  title: "Overlays/Popover",
  component: KdsPopover,
  tags: ["autodocs"],
  argTypes: {
    modelValue: {
      control: { type: "boolean" },
      table: { category: "model" },
    },
    placement: {
      control: { type: "select" },
      options: kdsPopoverPlacements,
    },
    role: {
      control: { type: "select" },
      options: kdsPopoverRoles,
      description: "ARIA role of the popover element.",
    },
    content: {
      control: { type: "text" },
      description:
        "Optional text content rendered inside the popover. Overridden by the default slot.",
    },
    fullWidth: {
      control: { type: "boolean" },
      description:
        "When true, the popover's minimum width matches the anchor element's width.",
    },
    popoverAriaLabel: {
      control: { type: "text" },
      description:
        "Accessible label for the popover element. Rendered as `aria-label` on the popover. Recommended for all roles (dialog, menu, listbox) when the popover does not have a visible label or accessible name.",
    },
    default: {
      control: false,
      description:
        "Default slot content rendered inside the popover. When provided, overrides the `content` prop.",
      table: { category: "slots" },
    },
  },
  args: {
    modelValue: false,
    content: "This is a basic popover example.",
    placement: "bottom-left",
    role: "dialog",
    fullWidth: false,
    popoverAriaLabel: "Popover",
  },
  parameters: {
    docs: {
      description: {
        component: `Positioned popover container based on the native Popover API and CSS anchor positioning.

KdsPopover provides default KDS surface styling when using the \`content\` prop.
For custom content, use the default slot.

Exposes \`anchorStyle\` and \`popoverId\` so the consumer can declaratively set
anchor positioning and a11y attributes on the activator element:

- \`:style="popoverRef?.anchorStyle"\` – sets the CSS \`anchor-name\`
- \`:aria-controls="popoverRef?.popoverId"\` – links activator to popover
- \`:aria-expanded="open"\` – synced with the open state
- \`aria-haspopup="dialog"\` – indicates the element controls a popup

Sample usage:
\`\`\`vue
<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import { KdsPopover, KdsToggleButton } from "@knime/kds-components";

const isOpen = ref(false);
const popoverRef = useTemplateRef("popoverRef");
</script>

<template>
  <KdsToggleButton
    v-model="isOpen"
    label="Toggle popover"
    :style="popoverRef?.anchorStyle"
    :aria-controls="popoverRef?.popoverId"
    :aria-expanded="isOpen"
    aria-haspopup="dialog"
  />

  <KdsPopover
    ref="popoverRef"
    v-model="isOpen"
    popover-aria-label="My popover"
  >
    ...custom popover content here...
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

export const Default: Story = {
  render: (args) => ({
    components: { KdsToggleButton, KdsPopover },
    setup() {
      const popoverRef = useTemplateRef("popoverRef");
      return { args, popoverRef };
    },
    template: `
      <KdsToggleButton
        v-model="args.modelValue"
        label="Toggle popover"
        variant="outlined"
        :style="popoverRef?.anchorStyle"
        :aria-controls="popoverRef?.popoverId"
        :aria-expanded="args.modelValue"
        aria-haspopup="dialog"
        data-testid="toggle-button"
      />

      <KdsPopover
        ref="popoverRef"
        v-model="args.modelValue"
        :placement="args.placement"
        :content="args.content"
        :role="args.role"
        :full-width="args.fullWidth"
        :popover-aria-label="args.popoverAriaLabel"
        data-testid="popover"
      />
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByTestId("toggle-button");
    const popover = canvas.getByTestId("popover");

    // Initially popover should not be visible
    await expect(popover).not.toBeVisible();

    // Popover should have the accessible label from the popoverAriaLabel prop
    await expect(popover).toHaveAttribute("aria-label", "Popover");

    // Activator should have correct a11y attributes
    expect(toggleButton).toHaveAttribute("aria-haspopup", "dialog");
    expect(toggleButton).toHaveAttribute("aria-controls", popover.id);
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");

    // Activator should have CSS anchor-name set via anchorStyle
    expect(toggleButton.style.getPropertyValue("anchor-name")).toBe(
      `--anchor-${popover.id}`,
    );

    // Click to open
    await userEvent.click(toggleButton);
    await expect(popover).toBeVisible();
    await expect(popover).toHaveAttribute("role", "dialog");
    await expect(toggleButton).toHaveAttribute("aria-expanded", "true");

    // Click to close
    await userEvent.click(toggleButton);
    await expect(popover).not.toBeVisible();
    await expect(toggleButton).toHaveAttribute("aria-expanded", "false");
  },
};

export const DifferentPlacement: Story = {
  args: {
    placement: "top-right",
  },
  render: (args) => ({
    components: { KdsToggleButton, KdsPopover },
    setup() {
      const popoverRef = useTemplateRef("popoverRef");
      return { args, popoverRef };
    },
    template: `
      <KdsToggleButton
        label="Toggle popover"
        variant="outlined"
        v-model="args.modelValue"
        :style="popoverRef?.anchorStyle"
        :aria-controls="popoverRef?.popoverId"
        :aria-expanded="args.modelValue"
        aria-haspopup="dialog"
      />

      <KdsPopover
        ref="popoverRef"
        v-model="args.modelValue"
        :placement="args.placement"
        :content="args.content"
        :role="args.role"
        :full-width="args.fullWidth"
        :popover-aria-label="args.popoverAriaLabel"
      />
    `,
  }),
};

export const SeparateAnchorElement: Story = {
  render: (args) => ({
    components: { KdsToggleButton, KdsPopover },
    setup() {
      const open = ref(false);
      const popoverRef = useTemplateRef("popoverRef");

      return { args, open, popoverRef };
    },
    template: `
      <KdsToggleButton
        label="Toggle popover"
        variant="outlined"
        v-model="open"
        :aria-controls="popoverRef?.popoverId"
        :aria-expanded="open"
        aria-haspopup="dialog"
        data-testid="toggle-button"
      />

      <div
        :style="popoverRef?.anchorStyle"
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
        ref="popoverRef"
        v-model="open"
        placement="bottom-left"
        content="This popover is anchored to a separate element."
        popover-aria-label="Separate anchor popover"
        data-testid="popover"
      />
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByTestId("toggle-button");
    const anchorElement = canvas.getByTestId("anchor-element");
    const popover = canvas.getByTestId("popover");

    // Initially popover should not be visible
    await expect(popover).not.toBeVisible();

    // Popover should have the accessible label
    await expect(popover).toHaveAttribute(
      "aria-label",
      "Separate anchor popover",
    );

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
    await expect(popover).toBeVisible();
    await expect(toggleButton).toHaveAttribute("aria-expanded", "true");

    // Anchor should still not have a11y attributes after open
    expect(anchorElement).not.toHaveAttribute("aria-expanded");

    // Click to close
    await userEvent.click(toggleButton);
    await expect(popover).not.toBeVisible();
    await expect(toggleButton).toHaveAttribute("aria-expanded", "false");
  },
};

export const FullWidth: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "When `fullWidth` is true, the popover's minimum width matches the anchor element's width. This is useful for dropdown menus or autocomplete popovers.",
      },
    },
  },
  args: {
    fullWidth: true,
    content: "This popover matches the anchor width.",
  },
  render: (args) => ({
    components: { KdsToggleButton, KdsPopover },
    setup() {
      const popoverRef = useTemplateRef("popoverRef");
      return { args, popoverRef };
    },
    template: `
      <KdsToggleButton
        v-model="args.modelValue"
        label="Wide toggle button as anchor"
        variant="outlined"
        style="min-width: 400px;"
        :style="popoverRef?.anchorStyle"
        :aria-controls="popoverRef?.popoverId"
        :aria-expanded="args.modelValue"
        aria-haspopup="dialog"
        data-testid="toggle-button"
      />

      <KdsPopover
        ref="popoverRef"
        v-model="args.modelValue"
        :placement="args.placement"
        :content="args.content"
        :full-width="args.fullWidth"
        :popover-aria-label="args.popoverAriaLabel"
        data-testid="popover"
      />
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByTestId("toggle-button");
    const popover = canvas.getByTestId("popover");

    // Click to open
    await userEvent.click(toggleButton);
    await expect(popover).toBeVisible();

    // Popover should have the accessible label
    await expect(popover).toHaveAttribute("aria-label", "Popover");

    // The popover should have the same width as the anchor
    const anchorWidth = toggleButton.getBoundingClientRect().width;
    const popoverWidth = popover.getBoundingClientRect().width;
    expect(popoverWidth).toBeGreaterThanOrEqual(anchorWidth);
  },
};

// TextOverflow story is not applicable for KdsPopover as it has no text content or visual prop variants

// DesignComparator story is not applicable for KdsPopover as it has no visual prop variants and requires an activator element

// AllCombinations story is not applicable for KdsPopover as it has no visual prop variants and requires an activator element
