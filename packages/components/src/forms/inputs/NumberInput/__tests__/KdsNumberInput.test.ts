import { describe, expect, it, vi } from "vitest";
import { VueWrapper, flushPromises, mount } from "@vue/test-utils";

import KdsNumberInput from "../KdsNumberInput.vue";

const getInput = (wrapper: VueWrapper) =>
  wrapper.find<HTMLInputElement>("input[type='text']");

const getDecreaseButton = (wrapper: VueWrapper) =>
  wrapper.find("button[aria-label*='Decrease']");

const getIncreaseButton = (wrapper: VueWrapper) =>
  wrapper.find("button[aria-label*='Increase']");

const stopPointerRepeating = async (wrapper: VueWrapper) => {
  await getIncreaseButton(wrapper).trigger("pointerup");
  await getDecreaseButton(wrapper).trigger("pointerup");
};

describe("KdsNumberInput", () => {
  describe("rendering", () => {
    it("displays empty string for NaN model value", async () => {
      const wrapper = mount(KdsNumberInput, {
        props: { modelValue: NaN, ariaLabel: "Test" },
      });
      await flushPromises();
      expect(getInput(wrapper).element.value).toBe("");
    });
  });

  describe("reactivity", () => {
    it("updates display value when model changes while not focused", async () => {
      const wrapper = mount(KdsNumberInput, {
        props: { modelValue: 10, ariaLabel: "Test" },
      });
      await flushPromises();
      await wrapper.setProps({ modelValue: 20 });
      expect(getInput(wrapper).element.value).toBe("20");
    });

    it("does not override local value while focused", async () => {
      const wrapper = mount(KdsNumberInput, {
        props: { modelValue: 10, ariaLabel: "Test" },
      });
      const input = getInput(wrapper);
      await input.trigger("focus");
      await input.setValue("abc");

      // Simulate external model update while typing
      await wrapper.setProps({ modelValue: 20 });

      // Local value should NOT be overwritten while focused
      expect(getInput(wrapper).element.value).toBe("abc");
    });
  });

  describe("input handling", () => {
    it("emits update:modelValue when user types", async () => {
      const wrapper = mount(KdsNumberInput, {
        props: { ariaLabel: "Test" },
      });
      const input = getInput(wrapper);
      await input.trigger("focus");
      await input.setValue("123");

      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
      expect(wrapper.emitted("update:modelValue")!.pop()).toEqual([123]);
    });

    it("emits NaN for empty input", async () => {
      const wrapper = mount(KdsNumberInput, {
        props: { modelValue: 5, ariaLabel: "Test" },
      });
      const input = getInput(wrapper);
      await input.trigger("focus");
      await input.setValue("");

      expect(wrapper.emitted("update:modelValue")!.pop()).toEqual([NaN]);
    });

    it("emits NaN for invalid input", async () => {
      const wrapper = mount(KdsNumberInput, {
        props: { modelValue: 5, ariaLabel: "Test" },
      });
      const input = getInput(wrapper);
      await input.trigger("focus");
      await input.setValue("10");
      await flushPromises();
      await input.setValue("abc");
      await flushPromises();

      const emitted = wrapper.emitted("update:modelValue");
      expect(emitted).toBeTruthy();
      expect(emitted!.pop()).toEqual([NaN]);
    });

    it("parses scientific-notation input while typing", async () => {
      const wrapper = mount(KdsNumberInput, {
        props: { modelValue: NaN, ariaLabel: "Test" },
      });

      const input = getInput(wrapper);
      await input.trigger("focus");
      await input.setValue("1e-3");

      expect(wrapper.emitted("update:modelValue")!.pop()).toEqual([0.001]);
    });
  });

  describe("clamping on blur", () => {
    it("clamps value to min on blur", async () => {
      const wrapper = mount(KdsNumberInput, {
        props: { min: 0, ariaLabel: "Test" },
      });
      const input = getInput(wrapper);
      await input.trigger("focus");
      await input.setValue("-5");
      await input.trigger("blur");

      expect(wrapper.emitted("update:modelValue")!.pop()).toEqual([0]);
      expect(getInput(wrapper).element.value).toBe("0");
    });

    it("clamps value to max on blur", async () => {
      const wrapper = mount(KdsNumberInput, {
        props: { max: 100, ariaLabel: "Test" },
      });
      const input = getInput(wrapper);
      await input.trigger("focus");
      await input.setValue("150");
      await input.trigger("blur");

      expect(wrapper.emitted("update:modelValue")!.pop()).toEqual([100]);
      expect(getInput(wrapper).element.value).toBe("100");
    });

    it("does not clamp while focused to allow external validation", async () => {
      const wrapper = mount(KdsNumberInput, {
        props: { min: 0, max: 100, ariaLabel: "Test" },
      });
      const input = getInput(wrapper);
      await input.trigger("focus");
      await input.setValue("150");

      // Before blur, emitted value should be unclamped
      expect(wrapper.emitted("update:modelValue")!.pop()).toEqual([150]);
    });

    it("normalizes scientific-notation input to a formatted number on blur", async () => {
      const wrapper = mount(KdsNumberInput, {
        props: { modelValue: NaN, ariaLabel: "Test" },
      });

      const input = getInput(wrapper);
      await input.trigger("focus");
      await input.setValue("1e3");

      await input.trigger("blur");

      expect(wrapper.emitted("update:modelValue")!.pop()).toEqual([1000]);
      expect(getInput(wrapper).element.value).toBe("1000");
    });
  });

  describe("step buttons", () => {
    it("increases value when pressing increase button", async () => {
      const wrapper = mount(KdsNumberInput, {
        props: { modelValue: 5, label: "Amount" },
      });
      await getIncreaseButton(wrapper).trigger("pointerdown");
      expect(wrapper.emitted("update:modelValue")!.pop()).toEqual([6]);
      await stopPointerRepeating(wrapper);
    });

    it("decreases value when pressing decrease button", async () => {
      const wrapper = mount(KdsNumberInput, {
        props: { modelValue: 5, label: "Amount" },
      });
      await getDecreaseButton(wrapper).trigger("pointerdown");
      expect(wrapper.emitted("update:modelValue")!.pop()).toEqual([4]);
      await stopPointerRepeating(wrapper);
    });

    it("uses custom step value", async () => {
      const wrapper = mount(KdsNumberInput, {
        props: { modelValue: 0, step: 0.5, label: "Amount" },
      });
      await getIncreaseButton(wrapper).trigger("pointerdown");
      expect(wrapper.emitted("update:modelValue")!.pop()).toEqual([0.5]);
      await stopPointerRepeating(wrapper);
    });

    it("starts from 0 when current value is NaN", async () => {
      const wrapper = mount(KdsNumberInput, {
        props: { modelValue: NaN, label: "Amount" },
      });
      await getIncreaseButton(wrapper).trigger("pointerdown");
      expect(wrapper.emitted("update:modelValue")!.pop()).toEqual([0]);
      await stopPointerRepeating(wrapper);
    });

    it("respects min boundary for decrease button", () => {
      const wrapper = mount(KdsNumberInput, {
        props: { modelValue: 0, min: 0, label: "Amount" },
      });
      expect(getDecreaseButton(wrapper).attributes("disabled")).toBeDefined();
    });

    it("respects max boundary for increase button", () => {
      const wrapper = mount(KdsNumberInput, {
        props: { modelValue: 100, max: 100, label: "Amount" },
      });
      expect(getIncreaseButton(wrapper).attributes("disabled")).toBeDefined();
    });

    it("clamps stepped value to min/max", async () => {
      const wrapper = mount(KdsNumberInput, {
        props: { modelValue: 99, step: 5, max: 100, label: "Amount" },
      });
      await getIncreaseButton(wrapper).trigger("pointerdown");
      expect(wrapper.emitted("update:modelValue")!.pop()).toEqual([100]);
      await stopPointerRepeating(wrapper);
    });

    it("continuously increases value when holding increase button", async () => {
      vi.useFakeTimers();
      const wrapper = mount(KdsNumberInput, {
        props: { modelValue: 0, step: 1, label: "Amount" },
      });
      try {
        await getIncreaseButton(wrapper).trigger("pointerdown");
        // First step fires immediately
        expect(wrapper.emitted("update:modelValue")!.length).toBe(1);

        // After initial delay (400ms), repeated steps fire
        vi.advanceTimersByTime(400);
        expect(wrapper.emitted("update:modelValue")!.length).toBe(2);

        vi.advanceTimersByTime(100);
        expect(wrapper.emitted("update:modelValue")!.length).toBe(3);

        // Releasing stops repeating
        await getIncreaseButton(wrapper).trigger("pointerup");
        vi.advanceTimersByTime(500);
        expect(wrapper.emitted("update:modelValue")!.length).toBe(3);
      } finally {
        await stopPointerRepeating(wrapper);
        wrapper.unmount();
        vi.clearAllTimers();
        vi.useRealTimers();
      }
    });

    it("stops repeating when pointer leaves button", async () => {
      vi.useFakeTimers();
      const wrapper = mount(KdsNumberInput, {
        props: { modelValue: 0, step: 1, label: "Amount" },
      });
      try {
        await getIncreaseButton(wrapper).trigger("pointerdown");
        expect(wrapper.emitted("update:modelValue")!.length).toBe(1);

        await getIncreaseButton(wrapper).trigger("pointerleave");
        vi.advanceTimersByTime(600);
        expect(wrapper.emitted("update:modelValue")!.length).toBe(1);
      } finally {
        await stopPointerRepeating(wrapper);
        wrapper.unmount();
        vi.clearAllTimers();
        vi.useRealTimers();
      }
    });

    it("does not normalize value on blur while stepping", async () => {
      const wrapper = mount(KdsNumberInput, {
        props: { modelValue: NaN, min: 0, max: 10, label: "Amount" },
      });

      const input = getInput(wrapper);
      await input.trigger("focus");
      await input.setValue("abc");

      // Start stepping (sets isStepping = true)
      await getIncreaseButton(wrapper).trigger("pointerdown");

      // Simulate the blur that happens when the button steals focus
      await input.trigger("blur");

      // localValue should NOT have been normalized by the blur handler
      // (blur was suppressed because isStepping was true)
      expect(getInput(wrapper).element.value).not.toBe("");
      await stopPointerRepeating(wrapper);
    });

    it("adjusts value via keyboard-initiated click (Enter/Space)", async () => {
      const wrapper = mount(KdsNumberInput, {
        props: { modelValue: 5, label: "Amount" },
      });

      // Keyboard clicks have detail === 0
      getIncreaseButton(wrapper).element.dispatchEvent(
        new MouseEvent("click", { detail: 0, bubbles: true }),
      );
      await flushPromises();
      expect(wrapper.emitted("update:modelValue")!.pop()).toEqual([6]);

      getDecreaseButton(wrapper).element.dispatchEvent(
        new MouseEvent("click", { detail: 0, bubbles: true }),
      );
      await flushPromises();
      expect(wrapper.emitted("update:modelValue")!.pop()).toEqual([5]);
    });
  });

  describe("keyboard navigation", () => {
    it("increases value with ArrowUp", async () => {
      const wrapper = mount(KdsNumberInput, {
        props: { modelValue: 5, ariaLabel: "Test" },
      });
      const input = getInput(wrapper);
      await input.trigger("keydown", { key: "ArrowUp" });
      expect(wrapper.emitted("update:modelValue")!.pop()).toEqual([6]);
    });

    it("decreases value with ArrowDown", async () => {
      const wrapper = mount(KdsNumberInput, {
        props: { modelValue: 5, ariaLabel: "Test" },
      });
      const input = getInput(wrapper);
      await input.trigger("keydown", { key: "ArrowDown" });
      expect(wrapper.emitted("update:modelValue")!.pop()).toEqual([4]);
    });

    it("does not respond to arrow keys when disabled", async () => {
      const wrapper = mount(KdsNumberInput, {
        props: { modelValue: 5, disabled: true, ariaLabel: "Test" },
      });
      const input = getInput(wrapper);
      await input.trigger("keydown", { key: "ArrowUp" });
      expect(wrapper.emitted("update:modelValue")).toBeFalsy();
    });
  });

  describe("disabled states", () => {
    it("disables buttons when disabled", () => {
      const wrapper = mount(KdsNumberInput, {
        props: { modelValue: 5, disabled: true, label: "Amount" },
      });
      expect(getDecreaseButton(wrapper).attributes("disabled")).toBeDefined();
      expect(getIncreaseButton(wrapper).attributes("disabled")).toBeDefined();
    });
  });

  describe("decimal precision handling", () => {
    it("preserves decimal precision based on step", async () => {
      const wrapper = mount(KdsNumberInput, {
        props: { modelValue: 0, step: 0.01, label: "Amount" },
      });
      await getIncreaseButton(wrapper).trigger("pointerdown");
      await getIncreaseButton(wrapper).trigger("pointerdown");
      await getIncreaseButton(wrapper).trigger("pointerdown");

      // Should avoid floating point issues like 0.030000000000000002
      expect(wrapper.emitted("update:modelValue")!.pop()).toEqual([0.03]);
      await stopPointerRepeating(wrapper);
    });

    it("handles floating point precision correctly", async () => {
      const wrapper = mount(KdsNumberInput, {
        props: { modelValue: 0.1, step: 0.1, label: "Amount" },
      });
      await getIncreaseButton(wrapper).trigger("pointerdown");
      await getIncreaseButton(wrapper).trigger("pointerdown");

      // 0.1 + 0.1 + 0.1 should be 0.3, not 0.30000000000000004
      expect(wrapper.emitted("update:modelValue")!.pop()).toEqual([0.3]);
      await stopPointerRepeating(wrapper);
    });

    it("supports scientific-notation steps", async () => {
      const wrapper = mount(KdsNumberInput, {
        props: { modelValue: 1.234, step: 1e-3, label: "Amount" },
      });

      await getIncreaseButton(wrapper).trigger("pointerdown");
      expect(wrapper.emitted("update:modelValue")!.pop()).toEqual([1.235]);
      await stopPointerRepeating(wrapper);

      const input = getInput(wrapper);
      await input.trigger("keydown", { key: "ArrowDown" });
      await input.trigger("keydown", { key: "ArrowDown" });
      expect(wrapper.emitted("update:modelValue")!.pop()).toEqual([1.233]);
    });
  });

  describe("inputmode attribute", () => {
    it("sets inputmode to numeric for integer step", () => {
      const wrapper = mount(KdsNumberInput, {
        props: { step: 1, ariaLabel: "Test" },
      });
      expect(getInput(wrapper).attributes("inputmode")).toBe("numeric");
    });

    it("sets inputmode to decimal for step < 1", () => {
      const wrapper = mount(KdsNumberInput, {
        props: { step: 0.5, ariaLabel: "Test" },
      });
      expect(getInput(wrapper).attributes("inputmode")).toBe("decimal");
    });

    it("sets inputmode to decimal for non-integer step >= 1", () => {
      const wrapper = mount(KdsNumberInput, {
        props: { step: 1.5, ariaLabel: "Test" },
      });
      expect(getInput(wrapper).attributes("inputmode")).toBe("decimal");
    });
  });
});
