import { ref, watchEffect } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { expect, userEvent, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../../test-utils/storybook.ts";

import ColorPicker from "./ColorPicker.vue";

type Story = StoryObj<typeof ColorPicker>;

const meta: Meta<typeof ColorPicker> = {
  title: "Form Fields/ColorInput/ColorPicker",
  component: ColorPicker,
  tags: ["autodocs"],
  argTypes: {
    modelValue: {
      control: { type: "text" },
      description: "The selected color as a hex string (e.g. #5148E5)",
      table: { category: "model" },
    },
  },
  args: {
    modelValue: "#5148E5",
  },
};

export default meta;

export const Default: Story = {
  render: (args) => {
    const [, updateArgs] = useArgs();
    return {
      components: { ColorPicker },
      setup() {
        const modelValue = ref(args.modelValue);
        watchEffect(() => (modelValue.value = args.modelValue));
        watchEffect(() => updateArgs({ modelValue: modelValue.value }));
        return { args, modelValue };
      },
      template: '<ColorPicker v-bind="args" v-model="modelValue" />',
    };
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    const user = userEvent.setup();
    const colorspaceSlider = canvas.getByRole("slider", {
      name: "Color selection",
    });
    const hueSlider = canvas.getByRole("slider", { name: "Hue" });
    const textInput = canvas.getByRole("textbox", {
      name: "Color hex value",
    });

    await step(
      "Keyboard: adjust colorspace saturation and brightness",
      async () => {
        colorspaceSlider.focus();
        await expect(colorspaceSlider).toHaveFocus();

        const initialValueText =
          colorspaceSlider.getAttribute("aria-valuetext")!;

        await user.keyboard("{ArrowRight}");
        await expect(colorspaceSlider.getAttribute("aria-valuetext")).not.toBe(
          initialValueText,
        );

        await user.keyboard("{ArrowDown}");
        await expect(colorspaceSlider.getAttribute("aria-valuetext")).not.toBe(
          initialValueText,
        );
      },
    );

    await step("Keyboard: adjust hue", async () => {
      hueSlider.focus();
      await expect(hueSlider).toHaveFocus();

      const initialHue = Number(hueSlider.getAttribute("aria-valuenow"));

      await user.keyboard("{ArrowRight}");
      const updatedHue = Number(hueSlider.getAttribute("aria-valuenow"));
      expect(updatedHue).toBe(initialHue + 1);

      await user.keyboard("{ArrowLeft}");
      const restoredHue = Number(hueSlider.getAttribute("aria-valuenow"));
      expect(restoredHue).toBe(initialHue);
    });

    await step("Mouse: click on colorspace slider", async () => {
      const valueBefore = colorspaceSlider.getAttribute("aria-valuetext")!;

      await user.click(colorspaceSlider);

      await expect(colorspaceSlider.getAttribute("aria-valuetext")).not.toBe(
        valueBefore,
      );
    });

    await step("Mouse: click on hue slider", async () => {
      const hueBefore = Number(hueSlider.getAttribute("aria-valuenow"));

      await user.click(hueSlider);

      const hueAfter = Number(hueSlider.getAttribute("aria-valuenow"));
      expect(hueAfter).not.toBe(hueBefore);
    });

    await step("Mouse: type a hex value into the text input", async () => {
      await user.click(textInput);
      await user.clear(textInput);
      await user.type(textInput, "#FF6600");
      await expect(textInput).toHaveValue("#FF6600");
    });
  },
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: ColorPicker,
    width: 150,
  }),
  args: {
    modelValue: "#5148E5",
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: ColorPicker,
  wrapperStyle: "width: 230px",
  designsToCompare: {
    ".ColorPicker": {
      props: {},
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15831-421352":
          {
            modelValue: "#5148E5",
            parameters: {
              figmaOffset: { x: -20, y: -20 },
            },
          },
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: ColorPicker,
  combinationsProps: [
    {
      modelValue: ["#FF0000", "#00FF00", "#0000FF", ""],
    },
  ],
  pseudoStates: ["hover", "focus"],
});
