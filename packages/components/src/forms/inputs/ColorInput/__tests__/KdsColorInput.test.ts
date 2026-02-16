import { describe, expect, it } from "vitest";
import { defineComponent, ref } from "vue";
import { flushPromises, mount } from "@vue/test-utils";

import KdsColorInput from "../KdsColorInput.vue";

const TestHarness = defineComponent({
  components: { KdsColorInput },
  setup() {
    const modelValue = ref("");
    return { modelValue };
  },
  template: '<KdsColorInput v-model="modelValue" label="Color" />',
});

const setupInput = () => {
  const wrapper = mount(TestHarness);
  const input = wrapper.find<HTMLInputElement>("input[type='text']");

  const setValueAndBlur = async (value: string) => {
    await input.setValue(value);
    await input.trigger("focusout", { relatedTarget: null });
    await flushPromises();
  };

  return { setValueAndBlur, input };
};

describe("KdsColorInput", () => {
  describe("normalization on blur", () => {
    it("normalizes 1-digit hex value", async () => {
      const { input, setValueAndBlur } = setupInput();

      await setValueAndBlur("#a");
      expect(input.element.value).toBe("#AAAAAA");
    });

    it("normalizes 2-digit hex value", async () => {
      const { input, setValueAndBlur } = setupInput();

      await setValueAndBlur("#ab");
      expect(input.element.value).toBe("#ABABAB");
    });

    it("normalizes 3-digit hex value", async () => {
      const { input, setValueAndBlur } = setupInput();

      await setValueAndBlur("#abc");
      expect(input.element.value).toBe("#AABBCC");
    });

    it("normalizes 4-digit hex value by ignoring alpha digit", async () => {
      const { input, setValueAndBlur } = setupInput();

      await setValueAndBlur("#abcd");
      expect(input.element.value).toBe("#AABBCC");
    });

    it("restores last valid color for 5-digit hex value", async () => {
      const { input, setValueAndBlur } = setupInput();

      await setValueAndBlur("#abc");

      await setValueAndBlur("#abcde");
      expect(input.element.value).toBe("#AABBCC");
    });
  });
});
