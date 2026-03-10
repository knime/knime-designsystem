import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";

import KdsIcon from "../KdsIcon.vue";
import { kdsIconSizes } from "../enums";

describe("Icon.vue", () => {
  it("renders correctly with default props", async () => {
    const wrapper = mount(KdsIcon, {
      props: { name: "placeholder" },
    });
    await vi.dynamicImportSettled();
    expect(wrapper.classes()).toContain("kds-icon");
    expect(wrapper.classes()).toContain("medium");
  });

  it("applies the correct class based on size prop", async () => {
    for (const size of kdsIconSizes) {
      const wrapper = mount(KdsIcon, {
        props: { name: "placeholder", size },
      });
      await vi.dynamicImportSettled();
      expect(wrapper.classes()).toContain(size);
    }
  });

  it("loads the correct icon component based on name prop", async () => {
    const wrapper = mount(KdsIcon, {
      props: { name: "plus" },
    });
    await vi.dynamicImportSettled();
    expect(wrapper).not.toBeNull();
  });

  it("renders placeholder while the image is loading", () => {
    const wrapper = mount(KdsIcon, {
      props: { name: "plus" },
    });
    // not waiting for the dynamic import to settle
    expect(wrapper.element.tagName).toBe("SPAN");
    expect(wrapper.classes()).toContain("kds-icon");
    expect(wrapper.classes()).toContain("medium");
  });

  it("applies disabled class when disabled prop is true", async () => {
    const wrapper = mount(KdsIcon, {
      props: { name: "placeholder", disabled: true },
    });
    await vi.dynamicImportSettled();
    expect(wrapper.classes()).toContain("disabled");
  });

  it("does not apply disabled class when disabled prop is false", async () => {
    const wrapper = mount(KdsIcon, {
      props: { name: "placeholder", disabled: false },
    });
    await vi.dynamicImportSettled();
    expect(wrapper.classes()).not.toContain("disabled");
  });

  it("applies disabled class to placeholder span while loading", () => {
    const wrapper = mount(KdsIcon, {
      props: { name: "plus", disabled: true },
    });
    // not waiting for the dynamic import to settle
    expect(wrapper.element.tagName).toBe("SPAN");
    expect(wrapper.classes()).toContain("disabled");
  });
});
