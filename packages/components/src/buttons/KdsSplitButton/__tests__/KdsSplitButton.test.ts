import { describe, expect, it, vi } from "vitest";
import { defineComponent } from "vue";
import { flushPromises, mount } from "@vue/test-utils";

import KdsSplitButton from "../KdsSplitButton.vue";
import type { KdsSplitButtonAlternativeAction } from "../types";

const defaultActions: KdsSplitButtonAlternativeAction[] = [
  { id: "save-as", label: "Save as" },
  { id: "export", label: "Export", leadingIcon: "file-export" },
  { id: "disabled-action", label: "Disabled", disabled: true },
];

const KdsPopoverStub = defineComponent({
  name: "KdsPopover",
  props: ["modelValue", "placement", "popoverAriaLabel"],
  emits: ["update:modelValue"],
  template: "<div><slot /></div>",
});

const createMenuContainerStub = (focusFn = vi.fn()) =>
  defineComponent({
    name: "KdsMenuContainer",
    props: ["id", "items", "menuMaxHeight"],
    emits: ["item-click"],
    methods: { focus: focusFn },
    template: "<div />",
  });

const mountSplitButton = (props = {}, { menuFocusFn = vi.fn() } = {}) => {
  const MenuContainerStub = createMenuContainerStub(menuFocusFn);
  return mount(KdsSplitButton, {
    props: {
      label: "Save",
      alternativeActions: defaultActions,
      ...props,
    },
    global: {
      stubs: {
        KdsPopover: KdsPopoverStub,
        KdsMenuContainer: MenuContainerStub,
      },
    },
  });
};

describe("KdsSplitButton", () => {
  it("emits click:primary when primary button is clicked", async () => {
    const wrapper = mountSplitButton();
    const primaryButton = wrapper.find(".kds-split-button-primary");
    await primaryButton.trigger("click");
    expect(wrapper.emitted("click:primary")).toHaveLength(1);
  });

  it("toggles isMenuOpen when secondary button is clicked", async () => {
    const wrapper = mountSplitButton();
    const secondaryButton = wrapper.find(".kds-split-button-secondary");

    await secondaryButton.trigger("click");
    expect(secondaryButton.attributes("aria-expanded")).toBe("true");

    await secondaryButton.trigger("click");
    expect(secondaryButton.attributes("aria-expanded")).toBe("false");
  });

  it("emits click:alternativeAction for a regular action", async () => {
    const wrapper = mountSplitButton();
    await wrapper.find(".kds-split-button-secondary").trigger("click");
    await flushPromises();

    const menuContainer = wrapper.findComponent({ name: "KdsMenuContainer" });
    menuContainer.vm.$emit("item-click", "save-as");
    await flushPromises();

    expect(wrapper.emitted("click:alternativeAction")).toEqual([["save-as"]]);
    expect(wrapper.emitted("navigate:alternativeAction")).toBeUndefined();
  });

  it("does not emit when action id is unknown", async () => {
    const wrapper = mountSplitButton();
    await wrapper.find(".kds-split-button-secondary").trigger("click");
    await flushPromises();

    const menuContainer = wrapper.findComponent({ name: "KdsMenuContainer" });
    menuContainer.vm.$emit("item-click", "nonexistent");
    await flushPromises();

    expect(wrapper.emitted("click:alternativeAction")).toBeUndefined();
  });

  it("does not emit when component is disabled", async () => {
    const wrapper = mountSplitButton({ disabled: true });
    await wrapper.find(".kds-split-button-secondary").trigger("click");
    await flushPromises();

    const menuContainer = wrapper.findComponent({ name: "KdsMenuContainer" });
    menuContainer.vm.$emit("item-click", "save-as");
    await flushPromises();

    expect(wrapper.emitted("click:alternativeAction")).toBeUndefined();
  });

  it("emits navigate:alternativeAction for action with href", async () => {
    const actions: KdsSplitButtonAlternativeAction[] = [
      { id: "docs", label: "Docs", href: "https://example.com" },
    ];
    const wrapper = mountSplitButton({ alternativeActions: actions });
    await wrapper.find(".kds-split-button-secondary").trigger("click");
    await flushPromises();

    const menuContainer = wrapper.findComponent({ name: "KdsMenuContainer" });
    menuContainer.vm.$emit("item-click", "docs");
    await flushPromises();

    expect(wrapper.emitted("navigate:alternativeAction")).toEqual([
      [{ id: "docs", href: "https://example.com" }],
    ]);
    expect(wrapper.emitted("click:alternativeAction")).toEqual([["docs"]]);
  });

  it("emits navigate:alternativeAction for action with to", async () => {
    const actions: KdsSplitButtonAlternativeAction[] = [
      { id: "settings", label: "Settings", to: "/settings" },
    ];
    const wrapper = mountSplitButton({ alternativeActions: actions });
    await wrapper.find(".kds-split-button-secondary").trigger("click");
    await flushPromises();

    const menuContainer = wrapper.findComponent({ name: "KdsMenuContainer" });
    menuContainer.vm.$emit("item-click", "settings");
    await flushPromises();

    expect(wrapper.emitted("navigate:alternativeAction")).toEqual([
      [{ id: "settings", to: "/settings" }],
    ]);
    expect(wrapper.emitted("click:alternativeAction")).toEqual([["settings"]]);
  });

  it("applies correct CSS classes based on props", () => {
    const wrapper = mountSplitButton({
      variant: "outlined",
      size: "large",
    });
    const root = wrapper.find(".kds-split-button");
    expect(root.classes()).toContain("outlined");
    expect(root.classes()).toContain("large");
  });

  it("applies disabled class when disabled", () => {
    const wrapper = mountSplitButton({ disabled: true });
    expect(wrapper.find(".kds-split-button").classes()).toContain("disabled");
  });

  it("maps alternativeActions to menu items with icons", () => {
    const wrapper = mountSplitButton();
    const menuContainer = wrapper.findComponent({ name: "KdsMenuContainer" });
    const items = menuContainer.props("items") as Array<{
      id: string;
      text: string;
      accessory?: { type: string; name: string };
      disabled?: boolean;
    }>;

    expect(items[0]).toEqual({
      id: "save-as",
      text: "Save as",
      accessory: undefined,
      disabled: undefined,
    });
    expect(items[1]).toEqual({
      id: "export",
      text: "Export",
      accessory: { type: "icon", name: "file-export" },
      disabled: undefined,
    });
    expect(items[2]).toEqual({
      id: "disabled-action",
      text: "Disabled",
      accessory: undefined,
      disabled: true,
    });
  });

  it("focuses menu container when menu opens", async () => {
    const focusFn = vi.fn();
    const wrapper = mountSplitButton({}, { menuFocusFn: focusFn });

    await wrapper.find(".kds-split-button-secondary").trigger("click");
    await flushPromises();

    expect(focusFn).toHaveBeenCalled();
  });
});
