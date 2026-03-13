import { describe, expect, it, vi } from "vitest";
import { VueWrapper, flushPromises, mount } from "@vue/test-utils";

import KdsDateInput from "../KdsDateInput.vue";
import {
  formatDateToString,
  parseDateString,
  tryParseAnyDate,
} from "../dateUtils.ts";

// jsdom doesn't implement ResizeObserver, which v-calendar uses internally
vi.stubGlobal(
  "ResizeObserver",
  class {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  },
);

const getInput = (wrapper: VueWrapper) =>
  wrapper.find<HTMLInputElement>("input[type='text']");

const getCalendarButton = (wrapper: VueWrapper) =>
  wrapper.find("button[aria-label='Open date picker']");

describe("KdsDateInput", () => {
  describe("rendering", () => {
    it("displays empty string for empty model value", async () => {
      const wrapper = mount(KdsDateInput, {
        props: { modelValue: "", ariaLabel: "Test" },
      });
      await flushPromises();
      expect(getInput(wrapper).element.value).toBe("");
    });

    it("displays the model value in the text input", async () => {
      const wrapper = mount(KdsDateInput, {
        props: { modelValue: "2026-03-11", ariaLabel: "Test" },
      });
      await flushPromises();
      expect(getInput(wrapper).element.value).toBe("2026-03-11");
    });

    it("renders the calendar toggle button", () => {
      const wrapper = mount(KdsDateInput, { props: { ariaLabel: "Test" } });
      expect(getCalendarButton(wrapper).exists()).toBe(true);
    });

    it("uses yyyy-MM-dd as default placeholder", () => {
      const wrapper = mount(KdsDateInput, { props: { ariaLabel: "Test" } });
      expect(getInput(wrapper).attributes("placeholder")).toBe("yyyy-MM-dd");
    });
  });

  describe("reactivity", () => {
    it("updates display value when model changes", async () => {
      const wrapper = mount(KdsDateInput, {
        props: { modelValue: "2026-01-01", ariaLabel: "Test" },
      });
      await wrapper.setProps({ modelValue: "2026-06-15" });
      expect(getInput(wrapper).element.value).toBe("2026-06-15");
    });
  });

  describe("blur normalization", () => {
    it("normalizes a non-legacy valid date string to yyyy-MM-dd on blur", async () => {
      const wrapper = mount(KdsDateInput, { props: { ariaLabel: "Test" } });
      const input = getInput(wrapper);
      await input.setValue("March 11, 2026");
      await input.trigger("blur");
      expect(wrapper.emitted("update:modelValue")!.pop()).toEqual([
        "2026-03-11",
      ]);
    });

    it("shows error and invalid subtext when value is not a valid date on blur", async () => {
      const wrapper = mount(KdsDateInput, { props: { ariaLabel: "Test" } });
      const input = getInput(wrapper);
      await input.setValue("not-a-date");
      await input.trigger("blur");
      expect(getInput(wrapper).attributes("aria-invalid")).toBe("true");
      expect(wrapper.text()).toContain("Invalid date format");
    });

    it("clears error when input is cleared on blur", async () => {
      const wrapper = mount(KdsDateInput, { props: { ariaLabel: "Test" } });
      const input = getInput(wrapper);
      await input.setValue("not-a-date");
      await input.trigger("blur");
      await input.setValue("");
      await input.trigger("blur");
      expect(getInput(wrapper).attributes("aria-invalid")).not.toBe("true");
    });
  });

  describe("text input handling", () => {
    it("emits update:modelValue when user types a date string", async () => {
      const wrapper = mount(KdsDateInput, { props: { ariaLabel: "Test" } });
      await getInput(wrapper).setValue("2026-03-11");
      expect(wrapper.emitted("update:modelValue")!.pop()).toEqual([
        "2026-03-11",
      ]);
    });

    it("emits empty string when input is cleared", async () => {
      const wrapper = mount(KdsDateInput, {
        props: { modelValue: "2026-03-11", ariaLabel: "Test" },
      });
      await getInput(wrapper).setValue("");
      expect(wrapper.emitted("update:modelValue")!.pop()).toEqual([""]);
    });
  });

  describe("calendar picker", () => {
    it("calendar button has aria-pressed=false initially", () => {
      const wrapper = mount(KdsDateInput, { props: { ariaLabel: "Test" } });
      expect(getCalendarButton(wrapper).attributes("aria-pressed")).toBe(
        "false",
      );
    });

    it("calendar button has aria-pressed=true after click", async () => {
      const wrapper = mount(KdsDateInput, { props: { ariaLabel: "Test" } });
      await getCalendarButton(wrapper).trigger("click");
      expect(getCalendarButton(wrapper).attributes("aria-pressed")).toBe(
        "true",
      );
    });
  });

  describe("date formatting utilities", () => {
    describe("formatDateToString", () => {
      it("formats a Date to yyyy-MM-dd string", () => {
        expect(formatDateToString(new Date(2026, 2, 11))).toBe("2026-03-11");
      });

      it("pads single-digit month and day with leading zeros", () => {
        expect(formatDateToString(new Date(2026, 0, 5))).toBe("2026-01-05");
      });

      it("returns empty string for null", () => {
        expect(formatDateToString(null)).toBe("");
      });

      it("accepts a date string and re-formats it", () => {
        expect(formatDateToString("2026-03-11")).toBe("2026-03-11");
      });
    });

    describe("tryParseAnyDate", () => {
      it("parses yyyy-MM-dd format", () => {
        const d = tryParseAnyDate("2026-03-11");
        expect(d?.getFullYear()).toBe(2026);
        expect(d?.getMonth()).toBe(2);
        expect(d?.getDate()).toBe(11);
      });

      it("parses a natural language date string", () => {
        const d = tryParseAnyDate("March 11, 2026");
        expect(d).not.toBeNull();
      });

      it("returns null for an invalid string", () => {
        expect(tryParseAnyDate("not-a-date")).toBeNull();
      });

      it("returns null for an empty string", () => {
        expect(tryParseAnyDate("")).toBeNull();
      });
    });

    describe("parseDateString", () => {
      it("converts yyyy-MM-dd string to a local Date", () => {
        const d = parseDateString("2026-03-11");
        expect(d?.getFullYear()).toBe(2026);
        expect(d?.getMonth()).toBe(2); // 0-indexed
        expect(d?.getDate()).toBe(11);
      });

      it("returns null for an empty string", () => {
        expect(parseDateString("")).toBeNull();
      });
    });
  });

  describe("disabled state", () => {
    it("disables the text input when disabled", () => {
      const wrapper = mount(KdsDateInput, {
        props: { disabled: true, ariaLabel: "Test" },
      });
      expect(getInput(wrapper).attributes("disabled")).toBeDefined();
    });
  });
});
