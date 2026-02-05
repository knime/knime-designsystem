import { beforeAll, describe, expect, it, vi } from "vitest";
import { nextTick, ref } from "vue";
import type { Ref } from "vue";
import { mount } from "@vue/test-utils";

import { useKdsPopover } from "../useKdsPopover";

const createNativePopoverStubs = () => {
  // jsdom doesn't implement the Popover API yet
  if (!HTMLElement.prototype.showPopover) {
    HTMLElement.prototype.showPopover = function () {
      // no-op; tests will spy on this method instance via vi.spyOn
    };
  }
  if (!HTMLElement.prototype.hidePopover) {
    HTMLElement.prototype.hidePopover = function () {
      // no-op
    };
  }
};

describe("useKdsPopover", () => {
  beforeAll(() => {
    createNativePopoverStubs();
  });

  const mountHarness = (
    params: {
      placement?: Ref<
        "bottom-right" | "top-left" | "top-right" | "bottom-left"
      >;
    } = {},
  ) => {
    const open = ref(false);

    const wrapper = mount(
      {
        setup() {
          const activatorEl = ref<HTMLElement | null>(null);
          const popoverEl = ref<HTMLElement | null>(null);

          useKdsPopover({
            open,
            activatorEl,
            popoverEl,
            placement: params.placement ?? "bottom-right",
            type: "grid",
          });

          return { open, activatorEl, popoverEl };
        },
        template: `
          <div>
            <button ref="activatorEl">Activator</button>
            <div ref="popoverEl">Content</div>
          </div>
        `,
      },
      { attachTo: document.body },
    );

    const activator = wrapper.find("button").element as HTMLElement;
    const popover = wrapper.findAll("div")[1]!.element as HTMLElement;

    return { wrapper, open, activator, popover };
  };

  it("syncs open -> native popover state and sets expected attributes", async () => {
    const { wrapper, open, activator, popover } = mountHarness();

    const showSpy = vi.spyOn(popover, "showPopover");
    const hideSpy = vi.spyOn(popover, "hidePopover");

    // initial
    await nextTick();
    expect(activator.getAttribute("aria-expanded")).toBeNull();
    expect(activator.getAttribute("aria-haspopup")).toBe("grid");
    expect(activator.getAttribute("aria-controls")).toBeTruthy();
    expect(popover.getAttribute("id")).toBeTruthy();
    expect(popover.getAttribute("popover")).toBe("auto");

    // open
    open.value = true;
    await nextTick();
    await nextTick(); // composable awaits nextTick before calling showPopover
    expect(showSpy).toHaveBeenCalledTimes(1);

    expect(activator.getAttribute("aria-expanded")).toBeDefined();

    // close
    open.value = false;
    await nextTick();
    await nextTick();
    expect(hideSpy).toHaveBeenCalledTimes(1);

    expect(activator.getAttribute("aria-expanded")).toBeNull();

    wrapper.unmount();
  });

  it("syncs native toggle -> open and only reacts to its own popover element", async () => {
    const { wrapper, open, popover } = mountHarness();

    await nextTick();
    expect(open.value).toBe(false);

    // native reports open
    popover.matches = vi
      .fn()
      .mockImplementation((sel: string) => sel === ":popover-open");
    popover.dispatchEvent(new Event("toggle"));
    await nextTick();
    expect(open.value).toBe(true);

    // unrelated toggle should be ignored
    const other = document.createElement("div");
    (other as unknown as { matches?: () => boolean }).matches = vi
      .fn()
      .mockReturnValue(false);
    other.dispatchEvent(new Event("toggle"));
    await nextTick();
    expect(open.value).toBe(true);

    wrapper.unmount();
  });

  it("updates placement styles when placement ref changes", async () => {
    const placement = ref<
      "bottom-right" | "top-left" | "top-right" | "bottom-left"
    >("bottom-right");
    const { wrapper, popover } = mountHarness({ placement });

    await nextTick();
    expect(popover.style.getPropertyValue("inset")).toContain("anchor(");

    const before = popover.style.getPropertyValue("inset");
    placement.value = "top-left";
    await nextTick();

    const after = popover.style.getPropertyValue("inset");
    expect(after).not.toBe(before);

    wrapper.unmount();
  });

  it("supports an anchor element different from the activator", async () => {
    const open = ref(false);

    const wrapper = mount(
      {
        setup() {
          const activatorEl = ref<HTMLElement | null>(null);
          const anchorEl = ref<HTMLElement | null>(null);
          const popoverEl = ref<HTMLElement | null>(null);

          useKdsPopover({
            open,
            activatorEl,
            anchorEl,
            popoverEl,
            placement: "bottom-right",
            type: "dialog",
          });

          return { activatorEl, anchorEl, popoverEl };
        },
        template: `
          <div>
            <div ref="anchorEl">Anchor</div>
            <button ref="activatorEl">Activator</button>
            <div ref="popoverEl">Content</div>
          </div>
        `,
      },
      { attachTo: document.body },
    );

    const anchor = wrapper.findAll("div")[1]!.element as HTMLElement;
    const activator = wrapper.find("button").element as HTMLElement;
    const popover = wrapper.findAll("div")[2]!.element as HTMLElement;

    await nextTick();

    // anchor-name should be on the anchor element, not the activator
    expect(anchor.style.getPropertyValue("anchor-name")).toMatch(/^--/);
    expect(activator.style.getPropertyValue("anchor-name")).toBe("");

    // popover should reference that anchor
    expect(popover.style.getPropertyValue("position-anchor")).toBe(
      anchor.style.getPropertyValue("anchor-name"),
    );

    wrapper.unmount();
  });

  it("sets composable-specific position-try-fallbacks", async () => {
    const { wrapper, popover } = mountHarness();

    await nextTick();

    expect(popover.style.getPropertyValue("position-try-fallbacks")).toContain(
      "--kds-popover-composable-try-",
    );

    wrapper.unmount();
  });

  it("defaults aria-haspopup to dialog and supports configuring it", async () => {
    const { wrapper, activator } = mountHarness();

    await nextTick();
    expect(activator.getAttribute("aria-haspopup")).toBe("dialog");

    wrapper.unmount();

    const open = ref(false);
    const wrapper2 = mount(
      {
        setup() {
          const activatorEl = ref<HTMLElement | null>(null);
          const popoverEl = ref<HTMLElement | null>(null);

          useKdsPopover({
            open,
            activatorEl,
            popoverEl,
            placement: "bottom-right",
            type: "menu",
          });

          return { activatorEl, popoverEl };
        },
        template: `
          <div>
            <button ref="activatorEl">Activator</button>
            <div ref="popoverEl">Content</div>
          </div>
        `,
      },
      { attachTo: document.body },
    );

    await nextTick();
    expect(wrapper2.find("button").attributes("aria-haspopup")).toBe("menu");

    wrapper2.unmount();
  });
});
