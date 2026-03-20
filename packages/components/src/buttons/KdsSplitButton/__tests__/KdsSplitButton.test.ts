import { describe, expect, it, vi } from "vitest";
import { defineComponent } from "vue";
import { flushPromises, mount } from "@vue/test-utils";

import type { KdsMenuItem } from "../../KdsMenuButton/types";
import KdsSplitButton from "../KdsSplitButton.vue";

const defaultActions: KdsMenuItem[] = [
  { id: "save-as", text: "Save as" },
  {
    id: "export",
    text: "Export",
    accessory: { type: "icon", name: "file-export" },
  },
  { id: "disabled-action", text: "Disabled", disabled: true },
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
    props: ["id", "items", "menuMaxHeight", "ariaLabel"],
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

  it("emits click:alternativeAction when menu item is clicked", async () => {
    const wrapper = mountSplitButton();
    await wrapper.find(".kds-split-button-secondary").trigger("click");
    await flushPromises();

    const menuContainer = wrapper.findComponent({ name: "KdsMenuContainer" });
    menuContainer.vm.$emit("item-click", "save-as");
    await flushPromises();

    expect(wrapper.emitted("click:alternativeAction")).toEqual([["save-as"]]);
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

  it("passes alternativeActions directly as items to menu container", () => {
    const wrapper = mountSplitButton();
    const menuContainer = wrapper.findComponent({ name: "KdsMenuContainer" });
    const items = menuContainer.props("items");

    expect(items).toEqual(defaultActions);
  });

  it("focuses menu container when menu opens", async () => {
    const focusFn = vi.fn();
    const wrapper = mountSplitButton({}, { menuFocusFn: focusFn });

    await wrapper.find(".kds-split-button-secondary").trigger("click");
    await flushPromises();

    expect(focusFn).toHaveBeenCalled();
  });
});
