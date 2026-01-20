import type { FunctionalComponent } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";

import KdsPopover from "./KdsPopover.vue";

const meta: Meta<typeof KdsPopover> = {
  title: "Components/Overlay/KdsPopover",
  component: KdsPopover as unknown as FunctionalComponent,
  tags: ["autodocs"],
  parameters: {
    // No Figma design linked yet
    design: {
      type: "figma",
      url: "",
    },
  },
};

export default meta;

type Story = StoryObj<typeof KdsPopover>;

export const Default: Story = {
  render: () => ({
    components: { KdsPopover },
    template: `
      <div style="display: flex">
        <KdsPopover v-model="open">
          <template #activator>
            <button type="button" @click="open = !open">
              Toggle popover
            </button>
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
      return { open: false };
    },
  }),
};

export const NoFocusableElements: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Popover content without any focusable elements. Pressing Tab should not move focus into the popover; focus stays on (or returns to) the activator. ESC closes the popover.",
      },
    },
    chromatic: { disableSnapshot: true },
    a11y: { disable: true },
  },
  render: () => ({
    components: { KdsPopover },
    template: `
      <div style="display: flex">
        <KdsPopover v-model="open">
          <template #activator>
            <button type="button" @click="open = !open">
              Toggle popover
            </button>
          </template>

          <div>
            No focusable elements here (no links, no inputs, no buttons).
          </div>
        </KdsPopover>
      </div>
    `,
    data() {
      return { open: false };
    },
  }),
};
