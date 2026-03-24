import { describe, expect, it, vi } from "vitest";
import { computed, ref } from "vue";
import { mount } from "@vue/test-utils";

import KdsMultiselectListBox from "../KdsMultiselectListBox.vue";
import type { KdsMultiselectListBoxOption } from "../types";

vi.mock("@vueuse/core", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@vueuse/core")>();
  return {
    ...actual,
    useVirtualList: (source: ReturnType<typeof computed>) => {
      const containerRef = ref<HTMLElement | null>(null);
      return {
        list: computed(() =>
          (source.value as KdsMultiselectListBoxOption[]).map(
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

const baseOptions: KdsMultiselectListBoxOption[] = [
  { id: "apple", text: "Apple" },
  { id: "banana", text: "Banana" },
  { id: "cherry", text: "Cherry" },
];

const mountComponent = (overrides: {
  possibleValues?: KdsMultiselectListBoxOption[];
  modelValue?: string[];
  ariaLabel?: string;
  size?: number;
}) => {
  const w = mount(KdsMultiselectListBox, {
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

describe("KdsMultiselectListBox meta-click debounce", () => {
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
