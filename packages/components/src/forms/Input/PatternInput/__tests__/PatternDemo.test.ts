import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";

import PatternDemo from "../PatternDemo.vue";

describe("PatternDemo", () => {
  it("renders a match table", () => {
    const wrapper = mount(PatternDemo, {
      props: { pattern: "(?:a)" },
    });

    expect(wrapper.get("table[aria-label='Pattern demo table']")).toBeTruthy();
    expect(wrapper.text()).toContain("Matches");
  });

  it("renders an error message for invalid patterns", () => {
    const wrapper = mount(PatternDemo, {
      props: { pattern: "(" },
    });

    expect(wrapper.text()).toContain("Error:");
  });

  it("updates the custom input match result", async () => {
    const wrapper = mount(PatternDemo, {
      props: { pattern: "(?:a)" },
    });

    const input = wrapper.get("input[aria-label='Custom test value']");

    await input.setValue("a");
    expect(wrapper.text()).toContain("Yes");

    await input.setValue("b");
    expect(wrapper.text()).toContain("No");
  });
});
