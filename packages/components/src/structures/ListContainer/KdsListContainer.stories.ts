import type { Meta, StoryObj } from "@storybook/vue3-vite";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook";
import type { KdsListItemSinglelineProps } from "../ListItemSingleline/types";

import KdsListContainer from "./KdsListContainer.vue";

function items(options?: { count?: number; dataType?: boolean }) {
  return Array.from(
    // eslint-disable-next-line no-magic-numbers
    { length: options?.count ?? 3 },
    (_, index) =>
      ({
        id: `item-${index}`,
        label: "Label",
        accessory: options?.dataType
          ? { type: "dataType", name: "string-datatype" }
          : undefined,
      }) satisfies KdsListItemSinglelineProps,
  );
}

const meta: Meta<typeof KdsListContainer> = {
  component: KdsListContainer,
  title: "Structures/KdsListContainer",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Use `KdsListContainer` as a lightweight wrapper for lists. It can render provided items with `KdsListItemSingleline` or accept custom slot content.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=608-29916&p=f&m=dev",
    },
  },
  argTypes: {
    items: {
      control: "object",
      description: "Items to render inside the list container.",
      table: { category: "Props" },
    },
    showLeadingAccessory: {
      control: "boolean",
      description: "Shows the default leading datatype icon for each item.",
      table: { category: "Props" },
    },
    emptyText: {
      control: "text",
      description: "Text shown when the list is empty.",
      table: { category: "Props" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof KdsListContainer>;

export const Default: Story = {
  args: {
    items: items(),
    showLeadingAccessory: true,
    emptyText: "No entries in this list",
  },
};

export const Empty: Story = {
  args: {
    items: [],
    showLeadingAccessory: true,
    emptyText: "No entries in this list",
  },
};

export const WithLeadingAccessory: Story = {
  args: {
    items: items({ dataType: true }),
    showLeadingAccessory: false,
    emptyText: "No entries in this list",
  },
};

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsListContainer,
  combinationsProps: [
    {
      items: [items(), items({ dataType: true }), []],
      emptyText: ["No entries in this list"],
    },
  ],
  pseudoStates: ["hover", "active"],
});

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsListContainer,
  wrapperStyle: { width: "224px", height: "332px" },
  designsToCompare: {
    "Content=Default": {
      props: {
        items: items({ count: 13, dataType: true }),
        showLeadingAccessory: true,
        emptyText: "No entries in this list",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3433-24499":
          {},
      },
    },
    "Content=Empty": {
      props: {
        items: [],
        showLeadingAccessory: true,
        emptyText: "No entries in this list",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4711-38479":
          {},
      },
    },
  },
});

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsListContainer,
    width: 200,
  }),
  args: {
    items: [
      {
        id: "long-item",
        label:
          "This is a very long list item label that should overflow with an ellipsis when there is not enough space",
      },
      { id: "short-item", label: "Label" },
    ],
    showLeadingAccessory: true,
    emptyText: "No entries in this list",
  },
};
