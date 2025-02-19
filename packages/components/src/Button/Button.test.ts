import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";

import Button from "./Button.vue";

describe("Button", () => {
  it("renders properly", () => {
    const wrapper = mount(Button, { props: { label: "Test Button" } });
    expect(wrapper.text()).toContain("Test Button");
  });

  it("emits click event when clicked", async () => {
    const wrapper = mount(Button, { props: { label: "Click me" } });
    await wrapper.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("click");
  });

  it("applies correct size class", () => {
    const wrapper = mount(Button, {
      props: { label: "Size Test", size: "large" },
    });
    expect(wrapper.classes()).toContain("button--large");
  });

  it("applies correct variant class", () => {
    const wrapper = mount(Button, {
      props: { label: "Variant Test", variant: "secondary" },
    });
    expect(wrapper.classes()).toContain("button--secondary");
  });

  it("renders leading icon when provided", () => {
    const wrapper = mount(Button, {
      props: { label: "Icon Test", leadingIcon: "→" },
    });
    expect(wrapper.find(".button__icon--leading").exists()).toBe(true);
    expect(wrapper.find(".button__icon--leading").text()).toBe("→");
  });

  it("renders trailing icon when provided", () => {
    const wrapper = mount(Button, {
      props: { label: "Icon Test", trailingIcon: "←" },
    });
    expect(wrapper.find(".button__icon--trailing").exists()).toBe(true);
    expect(wrapper.find(".button__icon--trailing").text()).toBe("←");
  });

  it("disables the button when disabled prop is true", () => {
    const wrapper = mount(Button, {
      props: { label: "Disabled Test", disabled: true },
    });
    expect(wrapper.attributes("disabled")).toBeDefined();
    expect(wrapper.classes()).toContain("button--disabled");
  });
});
