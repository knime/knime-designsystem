import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { fn } from "storybook/test";

import type { KdsListOption } from "../../forms/_helper/List/ListContainer";
import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook";

import KdsMenuContainer from "./KdsMenuContainer.vue";

type Story = StoryObj<typeof KdsMenuContainer>;

function options(
  length: number,
  generator: (idx: number) => Partial<KdsListOption>,
): KdsListOption[] {
  return Array.from({ length }, (_, idx) => ({
    id: `option-${idx + 1}`,
    text: `Label ${idx + 1}`,
    selected: false,
    ...generator(idx),
  }));
}

const baseOptions = options(5, () => ({}));

const meta = {
  title: "Overlays/MenuContainer",
  component: KdsMenuContainer,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A styled card to display MenuItems in context menus (e.g. right click or on Buttons, Split Buttons)",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4962-87031",
    },
  },
  argTypes: {
    possibleValues: {
      control: "object",
      table: { category: "props" },
    },
    onItemClick: {
      table: { disable: true },
    },
  },
  args: {
    possibleValues: baseOptions,
    onItemClick: fn(),
  },
} satisfies Meta<typeof KdsMenuContainer>;

export default meta;

export const Default: Story = {};

export const WithDisabledOptions: Story = {
  args: {
    possibleValues: [
      { id: "1", text: "Disabled first", selected: false, disabled: true },
      { id: "2", text: "Enabled option", selected: false },
      { id: "3", text: "Disabled middle", selected: false, disabled: true },
      { id: "4", text: "Another enabled option", selected: false },
      { id: "5", text: "Disabled last", selected: false, disabled: true },
    ],
  },
};

export const NoEntries: Story = {
  args: {
    possibleValues: [],
  },
};

export const WithAccessories: Story = {
  args: {
    possibleValues: [
      {
        id: "1",
        text: "Icon option",
        accessory: { type: "icon", name: "placeholder" },
      },
      {
        id: "2",
        text: "Data type option",
        accessory: { type: "dataType", name: "string-datatype" },
      },
      {
        id: "3",
        text: "Color swatch option",
        accessory: { type: "colorSwatch", color: "#C7DA3E" },
      },
      {
        id: "4",
        text: "Avatar option",
        accessory: { type: "avatar", initials: "FV" },
        subText: "user@mail.com",
      },
      {
        id: "5",
        text: "Live status",
        accessory: { type: "liveStatus", status: "red" },
        subText: "stopped",
      },
    ],
  },
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsMenuContainer,
    width: 200,
  }),
  args: {
    possibleValues: [
      {
        id: "long",
        text: "A very very very very very long option label that should overflow",
        accessory: { type: "dataType", name: "string-datatype" },
      },
      {
        id: "short",
        text: "Short",
      },
    ],
  },
};

export const DesignComparator: Story = {
  ...buildDesignComparatorStory({
    component: KdsMenuContainer,
    wrapperStyle: { width: "213px" },
    designsToCompare: {
      Default: {
        props: {
          possibleValues: options(13, () => ({
            accessory: { type: "icon", name: "placeholder" },
            text: "Label",
          })),
        },
        variants: {
          "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3433-24499":
            {},
        },
      },
      Empty: {
        props: {
          possibleValues: [],
        },
        variants: {
          "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4711-38479":
            {},
        },
      },
    },
  }),
};

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsMenuContainer,
  combinationsProps: [
    {
      possibleValues: [options(3, () => ({})), []],
    },
  ],
  pseudoStates: ["hover", "focus-visible"],
});
