import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";

import KdsValueSwitch from "../KdsValueSwitch.vue";

describe("KdsValueSwitch", () => {
  it("renders a radiogroup and forwards label/subText via aria attributes", () => {
    const wrapper = mount(KdsValueSwitch, {
      props: {
        label: "My label",
        subText: "My sub text",
        possibleValues: ["Option A", "Option B"],
        modelValue: "Option A",
        "onUpdate:modelValue": () => undefined,
      },
    });

    const group = wrapper.get("[role='radiogroup']");
    expect(group.attributes("aria-labelledby")).toBeTruthy();
    expect(group.attributes("aria-describedby")).toBeTruthy();

    expect(wrapper.get(".label").text()).toBe("My label");
    expect(wrapper.get(".subtext").text()).toBe("My sub text");
  });

  it("selects by click and emits v-model updates", async () => {
    const wrapper = mount(KdsValueSwitch, {
      props: {
        possibleValues: [
          { text: "Option A", id: "a" },
          { text: "Option B", id: "b" },
        ],
        modelValue: "a",
        "onUpdate:modelValue": () => undefined,
      },
    });

    const radios = wrapper.findAll("[role='radio']");
    expect(radios).toHaveLength(2);

    await radios[1].trigger("click");
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["b"]);
  });

  it("adds the size modifier class when size is provided", () => {
    const wrapper = mount(KdsValueSwitch, {
      props: {
        possibleValues: ["Option A", "Option B"],
        modelValue: "Option A",
        size: "small",
        "onUpdate:modelValue": () => undefined,
      },
    });

    expect(wrapper.get("[role='radiogroup']").classes()).toContain(
      "size-small",
    );
  });

  it("supports group-level error state (aria-invalid + subText)", () => {
    const wrapper = mount(KdsValueSwitch, {
      props: {
        possibleValues: ["Option A", "Option B"],
        modelValue: "Option A",
        error: true,
        subText: "Error message",
        "onUpdate:modelValue": () => undefined,
      },
    });

    const group = wrapper.get("[role='radiogroup']");
    expect(group.attributes("aria-invalid")).toBe("true");
    expect(wrapper.get(".subtext").text()).toContain("Error message");
  });
});
