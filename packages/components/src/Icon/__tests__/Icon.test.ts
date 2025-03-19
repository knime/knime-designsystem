import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";

import Icon, { type IconSize } from "../Icon.vue";

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

  it("reactively updates the icon on name prop changes", async () => {
    const wrapper = mount(Icon, {
      props: { name: "plus" },
    });
    await vi.dynamicImportSettled();
    expect(wrapper.props().name).toBe("plus");
    expect(wrapper.classes()).toContain("kds-icon");
    const firstPath = wrapper.find("path").attributes("d");
    expect(firstPath).toBeDefined();

    await wrapper.setProps({ name: "minus" });
    await vi.dynamicImportSettled();
    expect(wrapper.props().name).toBe("minus");
    expect(wrapper.classes()).toContain("kds-icon");
    const secondPath = wrapper.find("path").attributes("d");
    expect(secondPath).toBeDefined();
    expect(secondPath).not.toBe(firstPath);
  });

  it("caches icons after loading", async () => {
    const wrapper = mount(Icon, {
      props: { name: "plus" },
    });
    await vi.dynamicImportSettled();
    const iconCache = (wrapper.vm as any).iconCache;
    expect(iconCache.has("plus")).toBe(true);
    const cachedIcon = iconCache.get("plus");
    expect(cachedIcon).toBeDefined();
    let cachedIconMinus = iconCache.get("minus");
    expect(cachedIconMinus).toBeUndefined();
    const firstPath = wrapper.find("path").attributes("d");

    await wrapper.setProps({ name: "minus" });
    await vi.dynamicImportSettled();
    expect(iconCache.has("minus")).toBe(true);
    cachedIconMinus = iconCache.get("minus");
    expect(cachedIconMinus).toBeDefined();

    expect(iconCache.has("plus")).toBe(true);
    expect(iconCache.get("plus")).toBe(cachedIcon);

    await wrapper.setProps({ name: "plus" });
    // don't wait for dynamic import settled to check that cache is used
    expect(wrapper.find("path").attributes("d")).toBe(firstPath);

    await wrapper.setProps({ name: "placeholder" });
    // item not in cache, so path won't be updated before dynamic import is settled
    expect(wrapper.find("path").attributes("d")).toBe(firstPath);
  });

  it("handles icon loading error gracefully", async () => {
    const wrapper = mount(Icon, {
      // @ts-expect-error - this will cause a ts error, test anyway in case JS or older versions are used
      props: { name: "non-existent-icon" },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".kds-icon").exists()).toBe(false);
    // The comment is rendered by vue when the icon component fails to load
    expect(wrapper.html()).toBe("<!--v-if-->");
  });
});
