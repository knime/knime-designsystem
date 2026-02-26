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
    activatorEl: {
      control: false,
    },
    anchorEl: {
      control: false,
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
    default: {
      control: false,
      description:
        "Default slot content rendered inside the popover. When provided, overrides the `content` prop.",
      table: { category: "slots" },
    },
  },
  args: {
    modelValue: false,
    activatorEl: null,
    anchorEl: null,
    content: "This is a basic popover example.",
    placement: "bottom-left",
    role: "dialog",
    fullWidth: false,
  },
  parameters: {
    docs: {
      description: {
        component: `Positioned popover container based on the native Popover API and CSS anchor positioning.

KdsPopover provides default KDS surface styling when using the \`content\` prop.
For custom content, use the default slot.

Automatically sets the following a11y attributes on the activatorEl:
- \`aria-expanded\` – synced with the open state
- \`aria-controls\` – points to the popover's ID
- \`aria-haspopup\` – indicates the element controls a popup

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
  />

  <KdsPopover
    v-model="isOpen"
    :activator-el="activatorEl"
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
        :content="args.content"
        :role="args.role"
        :full-width="args.fullWidth"
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
    await expect(popover).toBeVisible();
    await expect(popover).toHaveAttribute("role", "dialog");
    await expect(toggleButton).toHaveAttribute("aria-haspopup", "dialog");
    await expect(toggleButton).toHaveAttribute("aria-controls", popover.id);
    await expect(toggleButton).toHaveAttribute("aria-expanded", "true");

    // Click to close
    await userEvent.click(toggleButton);
    await expect(popover).not.toBeVisible();
    await expect(toggleButton).toHaveAttribute("aria-haspopup", "dialog");
    await expect(toggleButton).toHaveAttribute("aria-controls", popover.id);
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
        :content="args.content"
        :role="args.role"
        :full-width="args.fullWidth"
      />
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
        placement="bottom-left"
        content="This popover is anchored to a separate element."
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

export const Inline: Story = {
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
          content="This popover is rendered inline because the activator ref is null."
        />
      </div>
    `,
  }),
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
      const activatorEl = ref<HTMLButtonElement | null>(null);
      return { args, activatorEl };
    },
    template: `
      <KdsToggleButton
        ref="activatorEl"
        v-model="args.modelValue"
        label="Wide toggle button as anchor"
        variant="outlined"
        style="min-width: 400px;"
        data-testid="toggle-button"
      />

      <KdsPopover
        v-model="args.modelValue"
        :activator-el="activatorEl"
        :placement="args.placement"
        :content="args.content"
        :full-width="args.fullWidth"
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

    // The popover should have the same width as the anchor
    const anchorWidth = toggleButton.getBoundingClientRect().width;
    const popoverWidth = popover.getBoundingClientRect().width;
    expect(popoverWidth).toBeGreaterThanOrEqual(anchorWidth);
  },
};

// TextOverflow story is not applicable for KdsPopover as it has no text content or visual prop variants

// DesignComparator story is not applicable for KdsPopover as it has no visual prop variants and requires an activator element

// AllCombinations story is not applicable for KdsPopover as it has no visual prop variants and requires an activator element
