import type { Meta, StoryObj } from "@storybook/vue3-vite";

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
  },
  args: {
    placement: "top",
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
    components: { KdsPopover, KdsToggleButton },
    template: `
      <div style="display: flex">
        <KdsPopover v-model="open" v-bind="args">
          <template #activator>
            <KdsToggleButton v-model="open" label="Toggle popover" />
          </template>
          <div style="display: flex; flex-direction: column; gap: var(--kds-spacing-container-0-5x);">
            <label>
              First input
              <input type="text" placeholder="Should be focused on open" />
            </label>

            <button type="button">Second focusable</button>
            <a href="#">Third focusable</a>

            <div style="font: var(--kds-font-base-body-small); color: var(--kds-color-text-and-icon-subtle);">
              Use Tab / Shift+Tab to verify focus is trapped. Press ESC to close.
            </div>
          </div>
        </KdsPopover>
      </div>
    `,
    data() {
      return { open: false, args };
    },
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
          <template #activator>
            <KdsInfoToggleButton v-model="open" visible />
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
          <template #activator>
            <KdsVariableToggleButton
              :pressed="open"
              :inSet="!!inValue"
              :outSet="!!outValue"
              @click="open = !open"
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
                v-model="inValue"
                aria-labelledby="variable-popover-select-label"
                style="
                  width: 100%;
                  height: var(--kds-dimension-component-height-1-5x);
                  padding: var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-5x);
                  font: var(--kds-font-base-body-small);
                  color: var(--kds-color-text-and-icon-subtle);
                  background: var(--kds-color-background-input-initial);
                  border: var(--kds-border-action-input);
                  border-radius: var(--kds-border-radius-container-0-25x);
                "
              >
                <option value="">None</option>
                <option value="selected">Selected</option>
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
      <BasePopover style="margin: 20px">
        Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large.
      </BasePopover>
    `,
    data() {
      return {};
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
