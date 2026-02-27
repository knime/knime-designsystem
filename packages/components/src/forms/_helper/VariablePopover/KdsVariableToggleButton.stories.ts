import type { FunctionalComponent } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, userEvent, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
} from "../../../test-utils/storybook.ts";

import KdsVariableToggleButton from "./KdsVariableToggleButton.vue";

const SAMPLE_CONTENT =
  "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.";

const meta: Meta<typeof KdsVariableToggleButton> = {
  title: "Form Fields/_Helper/VariableToggleButton",
  component: KdsVariableToggleButton as unknown as FunctionalComponent,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Opens a flow variable popover for output settings. " +
          "Indicates if no variable, an input variable, an output variable, or both are set. " +
          "Supports an optional error state.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6708-29786",
    },
  },
  argTypes: {
    modelValue: { control: { type: "boolean" }, table: { category: "model" } },
    content: { control: { type: "text" }, table: { category: "props" } },
    inSet: { control: "boolean", table: { category: "props" } },
    outSet: { control: "boolean", table: { category: "props" } },
    error: { control: "boolean", table: { category: "props" } },
    hidden: { control: "boolean", table: { category: "props" } },
    default: {
      control: false,
      description:
        "Custom content for the popover. When provided, overrides the `content` prop.",
      table: { category: "slots" },
    },
  },
  args: {
    modelValue: false,
    content: SAMPLE_CONTENT,
    inSet: false,
    outSet: false,
    error: false,
    hidden: false,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const getButton = () =>
      canvas.getByRole("button", {
        name: /flow variable/i,
      });

    await expect(getButton()).toHaveAttribute("aria-pressed", "false");

    await userEvent.click(getButton());
    await expect(getButton()).toHaveAttribute("aria-pressed", "true");

    // Popover should have the accessible label
    const popover = canvas.getByRole("dialog");
    await expect(popover).toHaveAttribute(
      "aria-label",
      "Flow Variable settings",
    );

    await userEvent.click(getButton());
    await expect(getButton()).toHaveAttribute("aria-pressed", "false");
  },
};

export const OnlyVisibleOnHover: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "When `hidden` is true, the button is invisible until hovered or focused. " +
          "Once toggled open, it remains visible.",
      },
    },
  },
  args: {
    hidden: true,
  },
  render: (args) => ({
    components: { KdsVariableToggleButton },
    setup() {
      return { args };
    },
    template: `
      <div
        style="padding: 16px; border: 1px dashed var(--kds-color-border-neutral);"
        @mouseenter="args.hidden = false"
        @mouseleave="args.hidden = true"
      >
        <span>Hover this area to show the button</span>
        <KdsVariableToggleButton v-bind="args" />
      </div>
    `,
  }),
};

export const IconStateLogic: Story = {
  parameters: {
    docs: false,
  },
  render: () => ({
    components: { KdsVariableToggleButton },
    template: `
      <div>
        <KdsVariableToggleButton data-testid="none" :in-set="false" :out-set="false" />
        <KdsVariableToggleButton data-testid="in" :in-set="true" :out-set="false" />
        <KdsVariableToggleButton data-testid="out" :in-set="false" :out-set="true" />
        <KdsVariableToggleButton data-testid="in-out" :in-set="true" :out-set="true" />
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const cases = [
      {
        testId: "none",
        expectedTitle: "No Flow Variable set",
      },
      {
        testId: "in",
        expectedTitle: "Input Flow Variable",
      },
      {
        testId: "out",
        expectedTitle: "Output Flow Variable",
      },
      {
        testId: "in-out",
        expectedTitle: "Input and Output Flow Variable",
      },
    ];

    for (const { testId, expectedTitle } of cases) {
      const button = canvas.getByTestId(testId).closest("button");
      expect(button).toBeTruthy();
      await expect(button!).toHaveAttribute("title", expectedTitle);
      await expect(button!).toHaveAttribute("aria-label", expectedTitle);
    }
  },
};

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsVariableToggleButton,
  combinationsProps: [
    {
      inSet: [false, true],
      outSet: [false, true],
      error: [false, true],
      modelValue: [false, true],
    },
  ],
  pseudoStates: ["hover", "active", "focus-visible"],
});

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsVariableToggleButton,
  designsToCompare: {
    "No Variable": {
      props: { inSet: false, outSet: false },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2635-14399":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-260751":
          { parameters: { pseudo: { hover: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261536":
          { parameters: { pseudo: { active: true } } },
      },
    },
    "In Variable": {
      props: { inSet: true, outSet: false },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2648-14565":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-260749":
          { parameters: { pseudo: { hover: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261538":
          { parameters: { pseudo: { active: true } } },
      },
    },
    "Out Variable": {
      props: { inSet: false, outSet: true },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2990-23734":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-260747":
          { parameters: { pseudo: { hover: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261540":
          { parameters: { pseudo: { active: true } } },
      },
    },
    "In + Out Variable": {
      props: { inSet: true, outSet: true },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2990-23830":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-260745":
          { parameters: { pseudo: { hover: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261542":
          { parameters: { pseudo: { active: true } } },
      },
    },
    "Error (In)": {
      props: { inSet: true, outSet: false, error: true },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-260717":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-260836":
          { parameters: { pseudo: { hover: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261678":
          { parameters: { pseudo: { active: true } } },
      },
    },
    "Error (Out)": {
      props: { inSet: false, outSet: true, error: true },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-260719":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-260841":
          { parameters: { pseudo: { hover: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261673":
          { parameters: { pseudo: { active: true } } },
      },
    },
  },
});
