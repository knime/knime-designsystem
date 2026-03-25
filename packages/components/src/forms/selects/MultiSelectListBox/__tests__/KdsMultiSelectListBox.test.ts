import { describe, expect, it, vi } from "vitest";
import { computed, ref } from "vue";
import { mount } from "@vue/test-utils";

import KdsMultiSelectListBox from "../KdsMultiSelectListBox.vue";
import type { KdsMultiSelectListBoxOption } from "../types";

vi.mock("@vueuse/core", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@vueuse/core")>();
  return {
    ...actual,
    useVirtualList: (source: ReturnType<typeof computed>) => {
      const containerRef = ref<HTMLElement | null>(null);
      return {
        list: computed(() =>
          (source.value as KdsMultiSelectListBoxOption[]).map(
            (data, index) => ({
              data,
              index,
            }),
          ),
        ),
        containerProps: {
          ref: containerRef,
          onScroll: () => {},
        },
        wrapperProps: {},
        scrollTo: () => {},
      };
    },
  };
});

const baseOptions: KdsMultiSelectListBoxOption[] = [
  { id: "apple", text: "Apple" },
  { id: "banana", text: "Banana" },
  { id: "cherry", text: "Cherry" },
];

const mountComponent = (overrides: {
  possibleValues?: KdsMultiSelectListBoxOption[];
  modelValue?: string[];
  ariaLabel?: string;
  size?: number;
  disabled?: boolean;
  bottomValue?: KdsMultiSelectListBoxOption;
}) => {
  const w = mount(KdsMultiSelectListBox, {
    props: {
      possibleValues: baseOptions,
      ariaLabel: "Test list",
      size: 5,
      modelValue: [],
      "onUpdate:modelValue": (val: string[]) => w.setProps({ modelValue: val }),
      ...overrides,
    },
  });
  return w;
};

const getOption = (
  wrapper: ReturnType<typeof mountComponent>,
  index: number,
) => {
  const option = wrapper.findAll("[role=option]").at(index);
  if (!option) {
    throw new Error(`Option at index ${index} not found`);
  }
  return option;
};

describe("KdsMultiSelectListBox meta-click debounce", () => {
  it("debounces meta-click so selection applies only after timeout", async () => {
    vi.useFakeTimers();
    const wrapper = mountComponent({});
    const option = getOption(wrapper, 0);

    await option.trigger("click", { metaKey: true });

    // Before the timeout, selection should be unchanged
    expect(wrapper.props("modelValue")).toEqual([]);

    vi.advanceTimersByTime(250);
    await wrapper.vm.$nextTick();

    // After timeout, Apple should be toggled in
    expect(wrapper.props("modelValue")).toEqual(["apple"]);
    vi.useRealTimers();
  });

  it("cancels pending meta-click when a new meta-click arrives", async () => {
    vi.useFakeTimers();
    const wrapper = mountComponent({});

    // First meta-click on Apple
    await getOption(wrapper, 0).trigger("click", { metaKey: true });

    // Before timeout fires, meta-click on Banana
    vi.advanceTimersByTime(100);
    await getOption(wrapper, 1).trigger("click", { metaKey: true });

    // Advance past original timeout — first click should have been cancelled
    vi.advanceTimersByTime(250);
    await wrapper.vm.$nextTick();

    // Only Banana should be selected (Apple click was cancelled)
    expect(wrapper.props("modelValue")).toEqual(["banana"]);
    vi.useRealTimers();
  });

  it("cancels pending meta-click when a plain click arrives", async () => {
    vi.useFakeTimers();
    const wrapper = mountComponent({});

    // Meta-click on Apple (debounced)
    await getOption(wrapper, 0).trigger("click", { metaKey: true });

    // Plain click on Banana before timeout
    vi.advanceTimersByTime(100);
    await getOption(wrapper, 1).trigger("click");
    await wrapper.vm.$nextTick();

    // Plain click selects Banana immediately, cancels the meta-click on Apple
    expect(wrapper.props("modelValue")).toEqual(["banana"]);

    vi.advanceTimersByTime(250);
    await wrapper.vm.$nextTick();

    // No change: Apple was never toggled
    expect(wrapper.props("modelValue")).toEqual(["banana"]);
    vi.useRealTimers();
  });

  it("applies ctrl-click immediately without debounce", async () => {
    vi.useFakeTimers();
    const wrapper = mountComponent({});

    await getOption(wrapper, 0).trigger("click", { ctrlKey: true });
    await wrapper.vm.$nextTick();

    // Ctrl-click applies immediately
    expect(wrapper.props("modelValue")).toEqual(["apple"]);
    vi.useRealTimers();
  });

  it("cleans up pending meta-click timer on unmount", async () => {
    vi.useFakeTimers();
    const wrapper = mountComponent({});

    await getOption(wrapper, 0).trigger("click", { metaKey: true });

    // Unmount while timer is pending
    wrapper.unmount();

    // Advancing timers should not throw or cause side effects
    vi.advanceTimersByTime(250);

    // Selection was never applied because the component was unmounted
    expect(wrapper.emitted("update:modelValue")).toBeUndefined();
    vi.useRealTimers();
  });
});

describe("KdsMultiSelectListBox dynamic prop updates", () => {
  it("clamps keyboard nav index when possibleValues shrinks", async () => {
    const wrapper = mountComponent({});
    const listbox = wrapper.find("[role=listbox]");

    // Navigate to Cherry (index 2)
    await listbox.trigger("keydown", { key: "End" });
    expect(wrapper.props("modelValue")).toEqual(["cherry"]);

    // Shrink list to only Apple — index 2 is now out of range
    await wrapper.setProps({
      possibleValues: [{ id: "apple", text: "Apple" }],
    });

    // ArrowDown from clamped position should still work without error
    await listbox.trigger("keydown", { key: "End" });
    expect(wrapper.props("modelValue")).toEqual(["apple"]);
  });

  it("resets keyboard nav index when possibleValues becomes empty", async () => {
    const wrapper = mountComponent({});
    const listbox = wrapper.find("[role=listbox]");

    // Navigate to Banana (index 1)
    await listbox.trigger("keydown", { key: "ArrowDown" });
    await listbox.trigger("keydown", { key: "ArrowDown" });

    // Empty the list
    await wrapper.setProps({ possibleValues: [] });

    // ArrowDown on empty list should not throw or select anything
    await listbox.trigger("keydown", { key: "ArrowDown" });

    // No options should be rendered
    expect(wrapper.findAll("[role=option]")).toHaveLength(0);
  });

  it("blocks interactions after disabled changes to true", async () => {
    const wrapper = mountComponent({ modelValue: ["apple"] });

    // Initially can click
    await getOption(wrapper, 1).trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.props("modelValue")).toEqual(["banana"]);

    // Disable the component
    await wrapper.setProps({ disabled: true });

    // Clicking should no longer change selection
    await getOption(wrapper, 0).trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.props("modelValue")).toEqual(["banana"]);
  });

  it("re-enables interactions after disabled changes from true to false", async () => {
    const wrapper = mountComponent({ disabled: true });

    // Click should be blocked
    await getOption(wrapper, 0).trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.props("modelValue")).toEqual([]);

    // Re-enable
    await wrapper.setProps({ disabled: false });

    // Click should now work
    await getOption(wrapper, 0).trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.props("modelValue")).toEqual(["apple"]);
  });

  it("renders new options when possibleValues changes", async () => {
    const wrapper = mountComponent({});
    expect(wrapper.findAll("[role=option]")).toHaveLength(3);

    const newOptions: KdsMultiSelectListBoxOption[] = [
      { id: "x", text: "X" },
      { id: "y", text: "Y" },
    ];
    await wrapper.setProps({ possibleValues: newOptions });

    const options = wrapper.findAll("[role=option]");
    expect(options).toHaveLength(2);
    expect(options.at(0)?.text()).toContain("X");
    expect(options.at(1)?.text()).toContain("Y");
  });

  it("initializes keyboard nav index from modelValue on mount", async () => {
    const wrapper = mountComponent({ modelValue: ["cherry"] });
    const listbox = wrapper.find("[role=listbox]");

    // ArrowDown from Cherry (index 2) should go to nothing (end of list)
    // But ArrowUp should go to Banana
    await listbox.trigger("keydown", { key: "ArrowUp" });
    expect(wrapper.props("modelValue")).toEqual(["banana"]);
  });

  it("shows empty state when possibleValues becomes empty without bottomValue", async () => {
    const wrapper = mountComponent({});
    expect(wrapper.text()).not.toContain("No entries in this list");

    await wrapper.setProps({ possibleValues: [] });
    expect(wrapper.text()).toContain("No entries in this list");
  });

  it("hides empty state when possibleValues becomes empty with bottomValue", async () => {
    const wrapper = mountComponent({});
    await wrapper.setProps({
      possibleValues: [],
      bottomValue: { id: "row-id", text: "Row ID" },
    });

    expect(wrapper.text()).not.toContain("No entries in this list");
    // Bottom value should still render
    const options = wrapper.findAll("[role=option]");
    expect(options).toHaveLength(1);
    expect(options.at(0)?.text()).toContain("Row ID");
  });
});
