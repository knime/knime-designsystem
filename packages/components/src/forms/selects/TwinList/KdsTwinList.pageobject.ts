import type { UserEventObject } from "storybook/test";
import { expect, userEvent, within } from "storybook/test";

/**
 * Page object encapsulating element queries and assertions for the TwinList.
 */
export class TwinListPage {
  private readonly canvas: ReturnType<typeof within>;

  readonly user: UserEventObject = userEvent.setup();

  constructor(canvasElement: HTMLElement) {
    this.canvas = within(canvasElement);
  }

  get excludeList() {
    return this.canvas.getByRole("listbox", { name: "Exclude" });
  }

  get includeList() {
    return this.canvas.getByRole("listbox", { name: "Include" });
  }

  get modeSwitch() {
    return this.canvas.getByRole("radiogroup", { name: "Selection mode" });
  }

  get moveRightBtn() {
    return this.canvas.getByRole("button", {
      name: "Move selected values right",
    });
  }

  get moveAllRightBtn() {
    return this.canvas.getByRole("button", {
      name: "Move all values right",
    });
  }

  get moveLeftBtn() {
    return this.canvas.getByRole("button", {
      name: "Move selected values left",
    });
  }

  get moveAllLeftBtn() {
    return this.canvas.getByRole("button", {
      name: "Move all values left",
    });
  }

  modeRadio(name: string) {
    return within(this.modeSwitch).getByRole("radio", { name });
  }

  // eslint-disable-next-line class-methods-use-this
  optionIn(listbox: HTMLElement, name: string) {
    return within(listbox).getByRole("option", { name });
  }

  // eslint-disable-next-line class-methods-use-this
  async expectOptionIn(listbox: HTMLElement, name: string, selected = false) {
    const option = within(listbox).getByRole("option", { name });
    await expect(option).toBeInTheDocument();
    if (selected) {
      await expect(option).toHaveAttribute("aria-selected", "true");
    }
    return option;
  }

  /**
   * Like expectOptionIn but uses findByRole (auto-waits) for elements that
   * appear after an async state change (e.g. mode switch).
   */
  // eslint-disable-next-line class-methods-use-this
  async findOptionIn(listbox: HTMLElement, name: string) {
    const option = await within(listbox).findByRole("option", { name });
    await expect(option).toBeInTheDocument();
    return option;
  }

  // eslint-disable-next-line class-methods-use-this
  async expectOptionNotIn(listbox: HTMLElement, name: string) {
    await expect(
      within(listbox).queryByRole("option", { name }),
    ).not.toBeInTheDocument();
  }
}
