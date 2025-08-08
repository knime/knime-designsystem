import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";

import Icon from "../Icon.vue";
import { type IconSize } from "../types";

describe("Icon.vue", () => {
  it("renders correctly with default props", async () => {
    const wrapper = mount(Icon, {
      props: { name: "placeholder" },
    });
    await vi.dynamicImportSettled();
    expect(wrapper.classes()).toContain("kds-icon");
    expect(wrapper.classes()).toContain("medium");
  });

  it("applies the correct class based on size prop", async () => {
    const sizes: IconSize[] = ["x-small", "small", "medium", "large"];
    for (const size of sizes) {
      const wrapper = mount(Icon, {
        props: { name: "placeholder", size },
      });
      await vi.dynamicImportSettled();
      expect(wrapper.classes()).toContain(size);
    }
  });

  it("loads the correct icon component based on name prop", async () => {
    const wrapper = mount(Icon, {
      props: { name: "plus" },
    });
    await vi.dynamicImportSettled();
    expect(wrapper).not.toBeNull();
  });
});
