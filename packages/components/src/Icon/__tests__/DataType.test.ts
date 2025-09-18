import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";

import DataType, { type DataTypeSize } from "../DataType.vue";
import type { IconSize } from "../types";

describe("DataType.vue", () => {
  it("renders correctly with default props", async () => {
    const iconTitle = "String Data Type";
    const wrapper = mount(DataType, {
      props: { iconName: "string-datatype", iconTitle },
    });

    await vi.dynamicImportSettled();
    expect(wrapper.attributes("title")).toBe(iconTitle);
    expect(wrapper.classes()).toStrictEqual([
      "kds-data-type-icon-container",
      "medium",
    ]);
    expect(wrapper.find("svg").classes()).toStrictEqual([
      "kds-icon",
      "kds-data-type-icon",
      "small",
    ]);
  });

  it("applies the correct class based on size prop", () => {
    const iconSizes: IconSize[] = ["xsmall", "small", "medium"];
    const dataTypeSizes: DataTypeSize[] = ["small", "medium", "large"];
    dataTypeSizes.forEach(async (size, index) => {
      const wrapper = mount(DataType, {
        props: { iconName: "string-datatype", size },
      });
      await vi.dynamicImportSettled();
      expect(wrapper.classes()).toContain(size);
      expect(wrapper.find("svg").classes()).toContain(iconSizes[index]);
    });
  });

  it("loads the correct datatype component based on name prop", async () => {
    const wrapper = mount(DataType, {
      props: { iconName: "string-datatype" },
    });
    await vi.dynamicImportSettled();
    expect(wrapper).not.toBeNull();
  });
});
