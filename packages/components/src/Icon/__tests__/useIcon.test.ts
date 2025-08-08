import { describe, expect, it, vi } from "vitest";
import { h, nextTick, ref } from "vue";
import { mount } from "@vue/test-utils";

import useIcon from "../useIcon";

describe("useIcon.vue", () => {
  it("loads the correct icon component based on name prop", async () => {
    const iconName = ref("plus");
    const iconComponent = useIcon({
      name: iconName,
      folder: "icons",
    });
    await vi.dynamicImportSettled();
    expect(iconComponent.value?.render).toBeTypeOf("function");

    const wrapper = mount({
      render: () => h(iconComponent.value!),
    });
    expect(wrapper.find("path").attributes("d")).toBeDefined();
  });

  it("reactively updates the icon on name prop changes", async () => {
    const iconName = ref("plus");
    const iconComponent = useIcon({
      name: iconName,
      folder: "icons",
    });

    await vi.dynamicImportSettled();
    expect(iconComponent.value?.render).toBeTypeOf("function");
    const firstIcon = mount({
      render: () => h(iconComponent.value!),
    });
    const firstPath = firstIcon.find("path").attributes("d");
    expect(firstPath).toBeDefined();

    iconName.value = "minus";
    await vi.dynamicImportSettled();
    expect(iconComponent.value?.render).toBeTypeOf("function");
    const secondIcon = mount({
      render: () => h(iconComponent.value!),
    });
    const secondPath = secondIcon.find("path").attributes("d");
    expect(secondPath).toBeDefined();
    expect(secondPath).not.toBe(firstPath);
  });

  it("caches icons after loading", async () => {
    const iconName = ref("plus");
    const iconComponent = useIcon({
      name: iconName,
      folder: "icons",
    });
    await vi.dynamicImportSettled();

    expect(iconComponent.value?.render).toBeTypeOf("function");
    const firstIcon = mount({
      render: () => h(iconComponent.value!),
    });
    const firstPath = firstIcon.find("path").attributes("d");

    iconName.value = "minus";
    const secondIcon = mount({
      render: () => h(iconComponent.value!),
    });
    const secondPath = secondIcon.find("path").attributes("d");
    // item is not in the cache, so the path won't be updated before dynamic import is settled
    expect(secondPath).toStrictEqual(firstPath);

    await vi.dynamicImportSettled();
    const thirdIcon = mount({
      render: () => h(iconComponent.value!),
    });
    const thirdPath = thirdIcon.find("path").attributes("d");
    expect(thirdPath).not.toStrictEqual(secondPath);

    iconName.value = "plus";
    // don't wait for dynamic import settled to check that cache is used, but next tick to ensure update of
    // iconComponent
    await nextTick();
    const fourthIcon = mount({
      render: () => h(iconComponent.value!),
    });
    const fourthPath = fourthIcon.find("path").attributes("d");
    expect(fourthPath).toStrictEqual(firstPath);
  });

  it("handles icon loading error gracefully", async () => {
    const iconName = ref("non-existent-icon");
    const iconComponent = useIcon({
      name: iconName,
      folder: "icons",
    });
    await vi.dynamicImportSettled();
    expect(iconComponent.value).toBeNull();
  });
});
