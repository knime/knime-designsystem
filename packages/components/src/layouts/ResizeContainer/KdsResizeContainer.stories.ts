import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import type { KdsListOption } from "../../forms/_helper/List/ListContainer";
import KdsListContainer from "../../forms/_helper/List/ListContainer/KdsListContainer.vue";
import { buildAllCombinationsStory } from "../../test-utils/storybook";

import KdsResizeContainer from "./KdsResizeContainer.vue";

const meta: Meta<typeof KdsResizeContainer> = {
  title: "Layouts/ResizeContainer",
  component: KdsResizeContainer,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A container whose size can be changed by dragging a resize handle. " +
          "It renders one or more horizontal handles at the bottom that let users resize the container vertically with mouse, keyboard, or touch interaction. " +
          "The height is managed internally, starting from `height`. Double-clicking a handle switches the content height to `fit-content`, while `maxHeight` is applied through CSS.",
      },
    },
  },
  argTypes: {
    height: {
      control: { type: "number" },
      description: "Initial height of the container in pixels.",
      table: { category: "props" },
    },
    minHeight: {
      control: { type: "number" },
      description:
        "Minimum height in pixels. The container cannot be resized below this value.",
      table: { category: "props" },
    },
    maxHeight: {
      control: { type: "number" },
      description:
        "Maximum height in pixels. When not set, there is no upper limit.",
      table: { category: "props" },
    },
    numberOfHandles: {
      control: { type: "number", min: 1 },
      description: "Number of resize handles to display.",
      table: { category: "props" },
    },
    handleGap: {
      control: { type: "text" },
      description:
        "Gap between multiple handles (CSS value). Only applies when numberOfHandles > 1.",
      table: { category: "props" },
    },
    default: {
      control: false,
      description:
        "Content rendered inside the resizable area. " +
        "Exposes `contentStyle` (CSSProperties with blockSize, minBlockSize, maxBlockSize) via scoped slot so the slotted content can manage its own overflow.",
      table: { category: "slots" },
    },
  },
  args: {
    height: 200,
    minHeight: 0,
    maxHeight: undefined,
    numberOfHandles: 1,
    handleGap: "0px",
  },
  render: (args) => ({
    components: { KdsResizeContainer },
    setup() {
      return { args };
    },
    template: `
      <KdsResizeContainer v-bind="args">
        <template #default="{ contentStyle }">
          <div
            :style="{
              ...contentStyle,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
              overflow: 'auto',
              color: 'var(--kds-color-text-and-icon-neutral)',
              background: 'var(--kds-color-surface-subtle)',
            }"
          >
            default slot
          </div>
        </template>
      </KdsResizeContainer>
    `,
  }),
};

export default meta;

type Story = StoryObj<typeof KdsResizeContainer>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const handle = canvas.getByRole("button", {
      name: "Resize vertically",
    });

    // Mouse: click to focus
    await userEvent.click(handle);
    await expect(handle).toHaveFocus();

    // Keyboard: tab to focus
    handle.blur();
    await userEvent.tab();
    await expect(handle).toHaveFocus();

    // Keyboard: ArrowDown / ArrowUp resize the container
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowUp}");
  },
};

export const WithMinAndMaxHeight: Story = {
  args: {
    height: 200,
    minHeight: 100,
    maxHeight: 400,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const handle = canvas.getByRole("button", {
      name: "Resize vertically",
    });
    const slotContent = canvasElement.querySelector(
      ".kds-resize-container-content > *",
    ) as HTMLElement;

    await userEvent.dblClick(handle);
    await expect(slotContent).toHaveStyle({
      blockSize: "fit-content",
      maxBlockSize: "400px",
    });
  },
};

export const MultipleHandles: Story = {
  args: {
    height: 200,
    numberOfHandles: 3,
    handleGap: "16px",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const handles = canvas.getAllByRole("button", {
      name: "Resize vertically",
    });

    await expect(handles).toHaveLength(3);

    // Mouse: click first handle to focus
    await userEvent.click(handles[0]);
    await expect(handles[0]).toHaveFocus();

    // Keyboard: tab between handles
    await userEvent.tab();
    await expect(handles[1]).toHaveFocus();
  },
};

const listOptions: KdsListOption[] = Array.from({ length: 15 }, (_, i) => ({
  id: `option-${i + 1}`,
  text: `Option ${i + 1}`,
  selected: i === 2,
  accessory: { type: "icon" as const, name: "placeholder" as const },
}));

export const TwoLists: Story = {
  args: {
    height: 200,
    minHeight: 80,
    maxHeight: 500,
    numberOfHandles: 2,
    handleGap: "50px",
  },
  render: (args) => {
    const onItemClick = fn();
    return {
      components: { KdsResizeContainer, KdsListContainer },
      setup() {
        return { args, listOptions, onItemClick };
      },
      template: `
        <KdsResizeContainer v-bind="args">
          <template #default="{ contentStyle }">
            <div style="display: flex; width: 100%">
              <KdsListContainer
                aria-label="Resizable list 1"
                :possible-values="listOptions"
                empty-text="No entries"
                :style="{ ...contentStyle, flex: '1' }"
                @item-click="onItemClick"
              />
              <div style="width: 50px; display: flex; align-items: center; justify-content: center">
                GAP
              </div>
              <KdsListContainer
                aria-label="Resizable list 2"
                :possible-values="listOptions"
                empty-text="No entries"
                :style="{ ...contentStyle, flex: '1' }"
                @item-click="onItemClick"
              />
            </div>
          </template>
        </KdsResizeContainer>
      `,
    };
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Lists are rendered inside the container
    const listboxes = canvas.getAllByRole("listbox");
    await expect(listboxes).toHaveLength(2);

    // Resize handle is present and focusable
    const handles = canvas.getAllByRole("button", {
      name: "Resize vertically",
    });
    await userEvent.click(handles[0]);
    await expect(handles[0]).toHaveFocus();

    // List items are visible and navigable
    handles[0].blur();
    const firstList = within(listboxes[0]);
    await userEvent.click(listboxes[0]);
    const firstOption = firstList.getByRole("option", { name: "Option 1" });
    await expect(firstOption).toHaveClass("active");

    await userEvent.keyboard("{ArrowDown}");
    const secondOption = firstList.getByRole("option", { name: "Option 2" });
    await expect(secondOption).toHaveClass("active");
  },
};

// TextOverflow story does not apply here

// DesignComparator story does not apply here — no Figma design yet

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsResizeContainer,
  combinationsProps: [
    {
      height: [100],
      numberOfHandles: [1, 3],
    },
  ],
  pseudoStates: ["hover", "active", "focus-visible"],
});
