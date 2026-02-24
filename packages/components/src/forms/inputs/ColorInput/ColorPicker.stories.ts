import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { buildDesignComparatorStory } from "../../../test-utils/storybook.ts";

import DemoColorPicker from "./DemoColorPicker.vue";

type Story = StoryObj<typeof DemoColorPicker>;

const meta: Meta<typeof DemoColorPicker> = {
  title: "Form Fields/KdsColorInput/ColorPicker",
  component: DemoColorPicker,
  tags: ["autodocs"],
};

export default meta;

export const DesignComparator: Story = buildDesignComparatorStory({
  component: DemoColorPicker,
  wrapperStyle: "width: 234px",
  designsToCompare: {
    ".ColorPicker": {
      props: {},
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15831-421352":
          {
            modelValue: "#5148E5",
            parameters: {
              figmaOffset: { x: -20, y: -16 },
            },
          },
      },
    },
  },
});
