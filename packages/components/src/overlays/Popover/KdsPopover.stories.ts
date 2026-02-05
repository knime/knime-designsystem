import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { KdsButton } from "../../buttons";
import {
  KdsInfoToggleButton,
  KdsLabel,
  KdsPopover,
  KdsToggleButton,
  KdsVariableToggleButton,
} from "../../index";
import { buildDesignComparatorStory } from "../../test-utils/storybook";

import BasePopover from "./BasePopover.vue";
import { kdsPopoverPlacements } from "./constants";

const meta: Meta<typeof KdsPopover> = {
  title: "Components/overlays/KdsPopover",
  component: KdsPopover,
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "select",
      options: kdsPopoverPlacements,
      table: {
        category: "Props",
      },
    },
    mainContainer: {
      description:
        "Container the popover is teleported to. Useful when your app renders inside a dedicated root element or when you need the popover to stay within a specific stacking/scrolling context. Defaults to document.body.",
      table: {
        category: "Props",
      },
    },
    ignoredClickOutsideTarget: {
      description:
        'Optional additional element(s) that should be treated as "inside" for click-outside handling. Use this if you have a separate DOM element (e.g. a panel or nested menu) that should not close the popover when clicked.',
      table: {
        category: "Props",
        type: {
          summary: "HTMLElement | HTMLElement[] | null",
        },
      },
    },
  },
  args: {
    placement: "bottom-right",
    mainContainer: document.body,
    ignoredClickOutsideTarget: null,
  },
  parameters: {
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
    components: { KdsPopover, KdsToggleButton, KdsButton },
    template: `
      <div style="display: flex">
        <KdsPopover v-model="open" v-bind="args">
          <template #activator="{ props }">
            <KdsToggleButton v-model="open" v-bind="props" label="Toggle popover" />
          </template>
          <div style="display: flex; flex-direction: column; gap: var(--kds-spacing-container-0-5x);">
            <div style="font: var(--kds-font-base-body-small); color: var(--kds-color-text-and-icon-subtle);">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </div>
            <KdsButton label="A button" />
            <label>
              An input
              <input type="text" placeholder="that can be focused" />
            </label>

            <a href="#">A link</a>
          </div>
        </KdsPopover>
      </div>
    `,
    data() {
      return { open: false, args };
    },
  }),
};

export const IgnoredClickOutsideTarget: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates `ignoredClickOutsideTarget`: clicking the side panel does not close the popover. Clicking anywhere else outside still closes it.",
      },
    },
    chromatic: { disableSnapshot: true },
  },
  render: (args) => ({
    components: { KdsPopover, KdsToggleButton },
    setup() {
      const open = ref(false);
      const ignoredPanel = ref<HTMLElement | null>(null);

      return {
        args,
        open,
        ignoredPanel,
      };
    },
    template: `
      <div style="display: flex; gap: var(--kds-spacing-container-2x); align-items: flex-start;">
        <div>
          <KdsPopover v-model="open" v-bind="args" :ignoredClickOutsideTarget="ignoredPanel">
            <template #activator="{ props }">
              <KdsToggleButton v-model="open" v-bind="props" label="Toggle popover" />
            </template>

            <div style="display: flex; flex-direction: column; gap: var(--kds-spacing-container-0-5x);">
              <div style="font: var(--kds-font-base-body-small); color: var(--kds-color-text-and-icon-subtle);">
                Clicks inside the side panel are ignored (popover stays open).
              </div>
              <button type="button">Focusable element inside popover</button>
            </div>
          </KdsPopover>
        </div>

        <div
          ref="ignoredPanel"
          style="
            width: 240px;
            padding: var(--kds-spacing-container-1x);
            border: var(--kds-border-action-input);
            border-radius: var(--kds-border-radius-container-0-25x);
            background: var(--kds-color-background-input-initial);
          "
        >
          <div style="font: var(--kds-font-base-body-small); color: var(--kds-color-text-and-icon-subtle);">
            Ignored click-outside panel
          </div>
          <button type="button" style="margin-top: var(--kds-spacing-container-0-5x);">
            Clicking me should not close the popover
          </button>
        </div>
      </div>
    `,
  }),
};

export const InfoPopover: Story = {
  parameters: {
    docs: {
      description: {
        story: "Info button with description for input elements",
      },
    },
    chromatic: { disableSnapshot: true },
  },
  render: () => ({
    components: { KdsPopover, KdsInfoToggleButton },
    template: `
      <div style="display: flex">
        <KdsPopover v-model="open">
          <template #activator="{ props }">
            <KdsInfoToggleButton v-model="open" v-bind="props" visible />
          </template>

          <div>
            Description of the control element
          </div>
        </KdsPopover>
      </div>
    `,
    data() {
      return { open: false };
    },
  }),
};

export const VariablePopover: Story = {
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6733-59368&m=dev",
    },
    docs: {
      description: {
        story: "Flow variables popover with variable selection/typing",
      },
    },
    chromatic: { disableSnapshot: true },
  },
  render: () => ({
    components: { KdsLabel, KdsPopover, KdsVariableToggleButton },
    template: `
      <div style="display: flex">
        <KdsPopover v-model="open">
          <template #activator="{ props }">
            <KdsVariableToggleButton
              v-model="open"
              v-bind="props"
              :inSet="!!inValue"
              :outSet="!!outValue"
            />
          </template>

          <div
            style="display: flex; flex-direction: column; gap: var(--kds-spacing-container-0-5x); width: 240px;"
          >
            <div style="font: var(--kds-font-base-body-small);">
              Flow variables
            </div>

            <div style="display: flex; flex-direction: column;">
              <KdsLabel id="variable-popover-select-label" label="{Label}" />
              <select
                aria-labelledby="variable-popover-select-label"
              >
                <option value="">Select value</option>
                <option value="flow-var-1">flowVar 1</option>
              </select>
            </div>

            <div style="display: flex; flex-direction: column;">
              <KdsLabel id="variable-popover-text-label" label="{Label}" />
              <input
                v-model="outValue"
                aria-labelledby="variable-popover-text-label"
                type="text"
                placeholder="{text}"
                style="
                  width: 100%;
                  height: var(--kds-dimension-component-height-1-5x);
                  padding: var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-5x);
                  font: var(--kds-font-base-body-small);
                  color: var(--kds-color-text-and-icon-neutral);
                  background: var(--kds-color-background-input-initial);
                  border: var(--kds-border-action-input);
                  border-radius: var(--kds-border-radius-container-0-25x);
                "
              />
            </div>
          </div>
        </KdsPopover>
      </div>
    `,
    data() {
      return { open: false, inValue: "", outValue: "" };
    },
  }),
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: {
    components: { BasePopover },
    template: `
      <div style="position: relative; padding: 20px;">
        <div
          ref="anchor"
          style="
            position: absolute;
            left: 50%;
            top: 50%;
            width: 1px;
            height: 1px;
          "
        />

        <BasePopover :anchor="anchor" placement="top-left">
          Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large.
        </BasePopover>
      </div>
    `,
    data() {
      return { anchor: null as HTMLElement | null };
    },
  },
  designsToCompare: {
    infoPopover: {
      props: {},
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8522-305454&m=dev":
          {},
      },
    },
  },
});

export const Interaction: Story = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  render: (args) => ({
    components: { KdsPopover, KdsToggleButton },
    template: `
      <div style="display: flex">
        <KdsPopover v-model="open" v-bind="args">
          <template #activator="{ props }">
            <KdsToggleButton v-model="open" v-bind="props" label="Toggle popover" />
          </template>

          <div style="display: flex; flex-direction: column; gap: var(--kds-spacing-container-0-5x);">
            <div style="font: var(--kds-font-base-body-small);">Popover content</div>
            <button type="button">Focusable element inside popover</button>
          </div>
        </KdsPopover>
      </div>
    `,
    setup() {
      const open = ref(false);
      return { open, args };
    },
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // The popover content is rendered in-place (native popover API), so we can query within the canvas.
    const dialogQuery = () =>
      within(canvasElement.ownerDocument.body).queryByRole("dialog");

    const toggle = canvas.getByRole("button", { name: "Toggle popover" });

    await userEvent.click(toggle);
    await waitFor(() => {
      expect(dialogQuery()).not.toBeNull();
    });

    await userEvent.keyboard("{Escape}");
    await waitFor(() => {
      expect(dialogQuery()).toBeNull();
    });

    // Reset state to allow rerunning the interaction test.
    await userEvent.click(toggle);
    await waitFor(() => {
      expect(dialogQuery()).not.toBeNull();
    });

    await userEvent.keyboard("{Escape}");
    await waitFor(() => {
      expect(dialogQuery()).toBeNull();
    });
  },
};

export const RestrictedMainContainer: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates `mainContainer`: the popover is teleported into a dedicated container instead of `document.body`. The container is also used as the positioning boundary, so the popover will be shifted/flipped to stay within it.",
      },
    },
    chromatic: { disableSnapshot: true },
  },
  render: (args) => ({
    components: { KdsPopover, KdsToggleButton },
    setup() {
      const open = ref(false);
      const container = ref<HTMLElement | null>(null);

      return {
        args,
        open,
        container,
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: var(--kds-spacing-container-1x);">
        <div
          ref="container"
          style="
            width: 100%;
            height: 360px;
            padding: var(--kds-spacing-container-1x);
            border: var(--kds-border-action-input);
            border-radius: var(--kds-border-radius-container-0-25x);
            background: var(--kds-color-background-input-initial);
            resize: both;
            overflow: auto;
          "
        >
          <div
            style="
              display: flex;
              flex-direction: column;
              gap: var(--kds-spacing-container-1x);
              min-height: 600px;
            "
          >
            <div style="font: var(--kds-font-base-body-small); color: var(--kds-color-text-and-icon-subtle);">
              <p>This panel is the teleport target (mainContainer) and also the positioning boundary.</p>
              <p>Resize and scroll to see how the popover stays within its container.</p>
              <p>The popover has default position "top" but may be moved to fit inside.</p>
              <p>When scrolled, the position is flipped to the bottom.</p>
            </div>

            <KdsPopover
              v-model="open"
              v-bind="args"
              :mainContainer="container"
              placement="top-left"
            >
              <template #activator="{ props }">
                <KdsToggleButton v-model="open" v-bind="props" label="Toggle popover" />
              </template>

              <div style="display: flex; flex-direction: column; gap: var(--kds-spacing-container-0-5x); width: 280px;">
                <div style="font: var(--kds-font-base-body-small);">
                  Teleported into the restricted container.
                </div>
                <div style="font: var(--kds-font-base-body-small); color: var(--kds-color-text-and-icon-subtle);">
                  This content is intentionally wider to force boundary shifting.
                </div>
                <button type="button">Focusable element inside popover</button>
              </div>
            </KdsPopover>

            <div style="font: var(--kds-font-base-body-small); color: var(--kds-color-text-and-icon-subtle);">
              Some extra content to force scrolling.
            </div>
          </div>
        </div>

        <div style="font: var(--kds-font-base-body-small); color: var(--kds-color-text-and-icon-subtle);">
          Note: mainContainer expects an HTMLElement. When it is not an HTMLElement (e.g. null), the popover falls back to document.body.
        </div>
      </div>
    `,
  }),
};
