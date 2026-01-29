import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { h, markRaw, nextTick } from "vue";
import { flushPromises, mount } from "@vue/test-utils";

import DemoCustomComponent from "../DemoCustomComponent.vue";
import KdsDynamicModalProvider from "../KdsDynamicModalProvider.vue";
import {
  type KdsDynamicDialogConfirmConfig,
  internal,
  useKdsDynamicModal,
} from "../useKdsDynamicModal";

describe("KdsDynamicModalProvider.vue", () => {
  const { askConfirmation, showByTemplate, isActive } = useKdsDynamicModal();

  afterEach(() => {
    internal.close();
  });

  // see: https://github.com/jsdom/jsdom/issues/3294
  beforeAll(() => {
    if (!HTMLDialogElement.prototype.showModal) {
      HTMLDialogElement.prototype.showModal = function () {
        this.open = true;
      };
    }
    if (!HTMLDialogElement.prototype.close) {
      HTMLDialogElement.prototype.close = function (returnValue) {
        this.open = false;
        this.returnValue = returnValue ?? "";
      };
    }
    if (!HTMLElement.prototype.getAnimations) {
      HTMLElement.prototype.getAnimations = function (
        _options?: GetAnimationsOptions,
      ): Animation[] {
        return [];
      };
    }
  });

  const doMount = () => {
    const wrapper = mount(KdsDynamicModalProvider);

    return { wrapper };
  };

  describe("confirmation", () => {
    it("should render with basic configuration", async () => {
      const { wrapper } = doMount();

      askConfirmation({
        title: "This is the title",
        message: "This is the message",
      });

      await nextTick();

      expect(wrapper.find("header").text()).toMatch("This is the title");
      expect(wrapper.find(".message").text()).toMatch("This is the message");
    });

    it("should render custom template component", async () => {
      const { wrapper } = doMount();

      const customTemplate = h("div", {
        id: "custom-template",
        innerHTML: "Hello world",
      });

      const done = vi.fn();
      expect(isActive.value).toBe(false);
      const promise = askConfirmation({
        title: "This is the title",
        component: customTemplate,
      });
      promise.then(done);

      await nextTick();

      expect(wrapper.find("#custom-template").exists()).toBe(true);
      expect(wrapper.find("#custom-template").text()).toMatch("Hello world");
    });

    // we can use the KdsDynamicModalProvider component to also indirectly test the composable
    describe("composable", () => {
      it("should have the right state", async () => {
        doMount();

        const done = vi.fn();
        expect(isActive.value).toBe(false);

        const promise = askConfirmation({
          title: "This is the title",
          message: "This is the message",
        });
        promise.then(done);

        await nextTick();

        expect(isActive.value).toBe(true);
        expect(done).not.toHaveBeenCalled();

        const doNotAskAgain = true;
        internal.confirm(doNotAskAgain);

        await flushPromises();
        expect(done).toHaveBeenCalledWith({ confirmed: true, doNotAskAgain });
      });
    });

    it.each([
      [
        "confirming",
        "[data-test-id='confirm-button']",
        { confirmed: true, doNotAskAgain: false },
      ],
      ["cancelling", "[data-test-id='cancel-button']", { confirmed: false }],
    ])(
      "should resolve correct value when %s",
      async (_, selector, expectedValue) => {
        const { wrapper } = doMount();

        const done = vi.fn();
        askConfirmation({
          title: "This is the title",
          message: "This is the message",
        }).then(done);

        await nextTick();
        expect(done).not.toHaveBeenCalled();

        await wrapper.find(selector).trigger("click");

        await flushPromises();
        expect(done).toHaveBeenCalledWith(expectedValue);
      },
    );

    it("should handle 'do not ask again' option", async () => {
      const { wrapper } = doMount();

      const done = vi.fn();
      askConfirmation({
        title: "This is the title",
        message: "This is the message",
        doNotAskAgain: {
          label: "Do not ask me again",
          subText: "please please",
        },
      }).then(done);
      await nextTick();

      const checkbox = wrapper.find(".checkbox");
      expect(checkbox.text()).toMatch("Do not ask me again");
      await checkbox.trigger("click");

      await wrapper.find("[data-test-id='confirm-button']").trigger("click");
      await flushPromises();
      expect(done).toHaveBeenCalledWith({
        confirmed: true,
        doNotAskAgain: true,
      });
    });

    it("should render custom buttons", async () => {
      const { wrapper } = doMount();

      askConfirmation({
        title: "This is the title",
        message: "This is the message",
        buttons: [
          { label: "Cancel", type: "cancel", flushLeft: true },
          { label: "Another action", type: "cancel" },
          { label: "Accept", type: "confirm" },
        ],
      });

      await nextTick();

      const buttons = wrapper.findAll("footer button");
      expect(buttons.length).toBe(3);

      expect(buttons.at(0)?.text()).toBe("Cancel");
      expect(buttons.at(0)?.classes()).toContain("flush-left");
      expect(buttons.at(1)?.text()).toBe("Another action");
      expect(buttons.at(1)?.classes()).not.toContain("flush-left");
      expect(buttons.at(2)?.text()).toBe("Accept");
      expect(buttons.at(2)?.classes()).not.toContain("flush-left");
    });

    it("can have buttons with custom handlers", async () => {
      const { wrapper } = doMount();

      const spy = vi.fn();

      const config: KdsDynamicDialogConfirmConfig = {
        title: "This is the title",
        message: "This is the message",
        buttons: [
          {
            label: "Cancel",
            type: "cancel",
            customHandler: () => {
              spy("cancel button");
            },
          },
          {
            label: "Apply",
            type: "confirm",
            customHandler: () => {
              spy("apply button");
            },
          },
        ],
      };

      const done = vi.fn();

      // show first time
      askConfirmation(config).then(done);
      await nextTick();

      await wrapper.find("[data-test-id='confirm-button']").trigger("click");

      expect(spy).toHaveBeenCalledOnce();
      expect(spy).toHaveBeenCalledWith("apply button");

      // show second time
      askConfirmation(config).then(done);
      await nextTick();

      await wrapper.find("[data-test-id='cancel-button']").trigger("click");
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenCalledWith("cancel button");
    });
  });

  describe("show by template", () => {
    it("should render custom template SFC component", async () => {
      const { wrapper } = doMount();

      const done = vi.fn();
      expect(isActive.value).toBe(false);

      const promise = showByTemplate({
        title: "This is the title",
        component: markRaw(DemoCustomComponent),
      });
      promise.then(done);

      await nextTick();

      expect(done).not.toHaveBeenCalled();

      expect(wrapper.text()).toMatch(
        "THIS IS THE BODY INSIDE THE CUSTOM TEMPLATE",
      );

      await wrapper.find("[data-test-id='checkbox']").trigger("click");
      await wrapper.find("[data-test-id='close-button']").trigger("click");

      await flushPromises();
      expect(done).toHaveBeenCalledOnce();
    });

    it("should render custom template Functional component", async () => {
      const { wrapper } = doMount();

      const done = vi.fn();
      expect(isActive.value).toBe(false);

      const promise = showByTemplate({
        title: "This is the title",
        component: (props) =>
          h("div", [
            h("div", "A functional component"),
            h(
              "button",
              { onClick: props.onClose, "data-test-id": "close-button" },
              "click me",
            ),
          ]),
      });
      promise.then(done);

      await nextTick();

      expect(done).not.toHaveBeenCalled();

      expect(wrapper.text()).toMatch("A functional component");

      await wrapper.find("[data-test-id='close-button']").trigger("click");

      await flushPromises();
      expect(done).toHaveBeenCalledOnce();
    });
  });
});
