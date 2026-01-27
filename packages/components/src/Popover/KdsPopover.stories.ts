import type { FunctionalComponent } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";

import KdsToggleButton from "../Button/KdsToggleButton.vue";
import { KdsInfoToggleButton } from "../index.ts";
import { buildDesignComparatorStory } from "../test-utils/storybook";

import BasePopover from "./BasePopover.vue";
import KdsPopover from "./KdsPopover.vue";

const meta: Meta<typeof KdsPopover> = {
  title: "Components/Overlay/KdsPopover",
  component: KdsPopover as unknown as FunctionalComponent,
  tags: ["autodocs"],
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
  render: () => ({
    components: { KdsPopover, KdsToggleButton },
    template: `
      <div style="display: flex">
        <KdsPopover v-model="open">
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
      return { open: false };
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
            <KdsInfoToggleButton v-model="open" visible/>
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

export const DesignComparator: Story = buildDesignComparatorStory({
  component: {
    components: { BasePopover },
    template: `
      <BasePopover v-model="open" style="margin: 20px">
        Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large.
      </BasePopover>
    `,
    data() {
      return { open: true };
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
