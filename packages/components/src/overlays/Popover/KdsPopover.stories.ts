import { ref, watch } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, userEvent, within } from "storybook/test";

import { KdsButton, KdsToggleButton } from "../../buttons";
import {
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook";

import KdsPopover from "./KdsPopover.vue";
import { kdsPopoverPlacements } from "./constants";

type StoryArgs = {
  modelValue: boolean;
  activatorEl: HTMLElement | null;
  anchorEl: HTMLElement | null;
  placement: (typeof kdsPopoverPlacements)[number];
  showArrow: boolean;
  ignoredClickOutsideTarget: HTMLElement | HTMLElement[] | null;
  default: string;
};

const meta = {
  title: "Components/overlays/KdsPopover",
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
    showArrow: {
      control: { type: "boolean" },
      table: { category: "Props" },
    },
    ignoredClickOutsideTarget: {
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
    showArrow: false,
    ignoredClickOutsideTarget: null,
    default: "This is a basic popover example.",
  },
  parameters: {
    docs: {
      description: {
        component:
          "Positioned popover container based on the native Popover API and CSS anchor positioning.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8522-305454",
    },
  },
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const Default: Story = {
  args: {
    modelValue: false,
    placement: "bottom-right",
    showArrow: false,
    default: "This is a basic popover example.",
  },
  render: (args) => ({
    components: { KdsToggleButton, KdsPopover },
    setup() {
      const open = ref(Boolean(args.modelValue));
      const activatorEl = ref<HTMLButtonElement | null>(null);

      watch(
        () => args.modelValue,
        (next) => {
          open.value = Boolean(next);
        },
      );

      return { args, open, activatorEl };
    },
    template: `
      <div style="padding: 24px; display: flex; flex-direction: column; gap: var(--kds-spacing-container-1x); align-items: flex-start;">
        <KdsToggleButton
          ref="activatorEl"
          label="Toggle popover"
          variant="outlined"
          v-model="open"
        />

        <KdsPopover
          v-model="open"
          :activator-el="activatorEl"
          :placement="args.placement"
          :show-arrow="args.showArrow"
        >
          {{ args.default }}
        </KdsPopover>
      </div>
    `,
  }),
};

export const DifferentPopoverPosition: Story = {
  args: {
    modelValue: false,
    placement: "top-left",
    showArrow: false,
    default: "This is a basic popover example.",
  },
  render: (args) => ({
    components: { KdsToggleButton, KdsPopover },
    setup() {
      const open = ref(Boolean(args.modelValue));
      const activatorEl = ref<HTMLButtonElement | null>(null);

      watch(
        () => args.modelValue,
        (next) => {
          open.value = Boolean(next);
        },
      );

      return { args, open, activatorEl };
    },
    template: `
      <div style="padding: 24px; display: flex; flex-direction: column; gap: var(--kds-spacing-container-1x); align-items: flex-start;">
        <KdsToggleButton
          ref="activatorEl"
          label="Toggle popover"
          variant="outlined"
          v-model="open"
        />

        <KdsPopover
          v-model="open"
          :activator-el="activatorEl"
          :placement="args.placement"
          :show-arrow="args.showArrow"
        >
          {{ args.default }}
        </KdsPopover>
      </div>
    `,
  }),
};

export const WithArrow: Story = {
  args: {
    modelValue: false,
    placement: "bottom-right",
    showArrow: true,
    default:
      "This popover renders with an arrow that stays centered on the anchor.",
  },
  render: (args) => ({
    components: { KdsToggleButton, KdsPopover },
    setup() {
      const open = ref(Boolean(args.modelValue));
      const activatorEl = ref<HTMLButtonElement | null>(null);

      watch(
        () => args.modelValue,
        (next) => {
          open.value = Boolean(next);
        },
      );

      return { args, open, activatorEl };
    },
    template: `
      <div style="padding: 24px; display: flex; flex-direction: column; gap: var(--kds-spacing-container-1x); align-items: flex-start;">
        <KdsToggleButton
          ref="activatorEl"
          label="Toggle popover"
          variant="outlined"
          v-model="open"
        />

        <KdsPopover
          v-model="open"
          :activator-el="activatorEl"
          :placement="args.placement"
          :show-arrow="args.showArrow"
        >
          {{ args.default }}
        </KdsPopover>
      </div>
    `,
  }),
};

export const SeparateAnchorEl: Story = {
  render: (args) => ({
    components: { KdsToggleButton, KdsPopover },
    setup() {
      const open = ref(false);
      const activatorEl = ref<HTMLButtonElement | null>(null);
      const anchorEl = ref<HTMLElement | null>(null);

      return { args, open, activatorEl, anchorEl };
    },
    template: `
      <div
        style="display: flex; flex-direction: column; align-items: flex-start; gap: var(--kds-spacing-container-1x); padding: 24px;"
      >
        <KdsToggleButton
          ref="activatorEl"
          label="Toggle popover"
          variant="outlined"
          v-model="open"
        />

        <div
          ref="anchorEl"
          style="
            padding: var(--kds-spacing-container-1x);
            border: 1px solid var(--kds-color-border-subtle);
            border-radius: var(--kds-border-radius-container-0-37x);
            font: var(--kds-font-base-body-small);
            color: var(--kds-color-text-and-icon-neutral);
            background: var(--kds-color-surface-default);
          "
        >
          Separate anchor element
        </div>

        <KdsPopover
          v-model="open"
          :activator-el="activatorEl"
          :anchor-el="anchorEl"
          placement="bottom-right"
        >
          This popover is anchored to a separate element.
        </KdsPopover>
      </div>
    `,
  }),
};

export const IgnoredClickOutsideTarget: Story = {
  render: (args) => ({
    components: { KdsToggleButton, KdsPopover },
    setup() {
      const open = ref(false);
      const activatorEl = ref<HTMLButtonElement | null>(null);
      const ignoredEl = ref<HTMLElement | null>(null);

      return { args, open, activatorEl, ignoredEl };
    },
    template: `
      <div
        style="display: flex; flex-direction: column; align-items: flex-start; gap: var(--kds-spacing-container-1x); padding: 24px;"
      >
        <KdsToggleButton
          ref="activatorEl"
          label="Toggle popover"
          variant="outlined"
          v-model="open"
        />

        <KdsPopover
          v-model="open"
          :activator-el="activatorEl"
          placement="top-right"
          :ignored-click-outside-target="ignoredEl"
        >
          Clicking the ignored element will not close this popover.
        </KdsPopover>

        <div
          ref="ignoredEl"
          style="
            padding: var(--kds-spacing-container-1x);
            border: 1px solid var(--kds-color-border-subtle);
            border-radius: var(--kds-border-radius-container-0-37x);
            font: var(--kds-font-base-body-small);
            color: var(--kds-color-text-and-icon-neutral);
            background: var(--kds-color-surface-default);
            cursor: pointer;
          "
        >
          Click me - I'm ignored (popover stays open)
        </div>
      </div>
    `,
  }),
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
      const open = ref(true);
      return { open };
    },
    template: `
      <KdsPopover
        :activator-el="null"
        placement="bottom-right"
      >
        This popover is rendered inline because the activator ref is null.
      </KdsPopover>
    `,
  }),
};

export const DesignComparator: Story = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  ...buildDesignComparatorStory({
    component: {
      components: { KdsPopover, KdsButton },
      setup() {
        const open = ref(true);
        const activatorEl = ref<HTMLButtonElement | null>(null);
        return { open, activatorEl };
      },
      template: `
        <KdsPopover v-model="open" :activator-el="null" placement="bottom-right" style="max-width: 353px">
          Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large.
        </KdsPopover>
      `,
    },
    designsToCompare: {
      Default: {
        props: {},
        variants: {
          "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8522-305454":
            { parameters: { figmaOffset: { x: -20, y: -16 } } },
        },
      },
    },
  }),
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: {
      components: { KdsPopover },
      setup() {
        const open = ref(true);
        const activatorEl = ref<HTMLButtonElement | null>(null);
        return { open, activatorEl };
      },
      template: `
        <KdsPopover v-model="open" :activator-el="null" :show-arrow="false">
          Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
          there live the blind texts. Separated they live in Bookmarksgrove right at the coast of
          the Semantics, a large.
        </KdsPopover>
      `,
    },
    width: 240,
  }),
};

// AllCombinations story does not make sense here

export const Interaction: Story = {
  render: () => ({
    components: { KdsToggleButton, KdsPopover },
    setup() {
      const open = ref(false);
      const activatorEl = ref<HTMLButtonElement | null>(null);
      return { open, activatorEl };
    },
    template: `
      <div style="padding: 24px; display: flex; flex-direction: column; gap: var(--kds-spacing-container-1x); align-items: flex-start;">
        <KdsToggleButton
          ref="activatorEl"
          label="Toggle popover"
          variant="outlined"
          data-testid="toggle-button"
          v-model="open"
        />

        <KdsPopover
          v-model="open"
          :activator-el="activatorEl"
          placement="bottom-right"
          data-testid="popover"
        >
          Popover content for interaction test
        </KdsPopover>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByTestId("toggle-button");

    // Initially popover should not be visible
    expect(canvas.queryByTestId("popover")).not.toBeVisible();

    // Click to open
    await userEvent.click(toggleButton);
    expect(canvas.getByTestId("popover")).toBeVisible();

    // Click to close
    await userEvent.click(toggleButton);
    expect(canvas.queryByTestId("popover")).not.toBeVisible();
  },
};
