import type { FunctionalComponent } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { fn } from "storybook/test";

import { iconNames } from "@knime/kds-styles/img/icons/def";

import { kdsButtonVariants } from "../Button/constants";
import { kdsSizes } from "../constants";
import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../test-utils/storybook";

import KdsProgressButton from "./KdsProgressButton.vue";
import type { KdsProgressButtonState } from "./types";

const kdsProgressButtonStates: KdsProgressButtonState[] = [
  "default",
  "progress",
  "success",
  "error",
];

const meta: Meta<typeof KdsProgressButton> = {
  title: "Components/Buttons/KdsProgressButton",
  component: KdsProgressButton as unknown as FunctionalComponent,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=278-4918&p=f&m=dev",
    },
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: kdsSizes,
    },
    variant: {
      control: { type: "select" },
      options: kdsButtonVariants,
    },
    leadingIcon: {
      control: { type: "select" },
      options: iconNames,
    },
    label: { control: "text" },
    ariaLabel: { control: "text" },
    title: { control: "text" },
    disabled: { control: "boolean" },
    state: {
      control: { type: "select" },
      options: kdsProgressButtonStates,
    },
    progressDelayMs: { control: "number" },
    successDurationMs: { control: "number" },
    errorDurationMs: { control: "number" },
    action: { control: false },
  },
  args: {
    onClick: fn(),
    leadingIcon: "placeholder",
    label: "{Label}",
    state: "default",
    variant: "filled",
  },
};

export default meta;

type Story = StoryObj<typeof KdsProgressButton>;

const actionDelayMs = 900;

export const Filled: Story = {
  args: {
    variant: "filled",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
  },
};

export const Transparent: Story = {
  args: {
    variant: "transparent",
  },
};

export const IconOnly: Story = {
  args: {
    label: undefined,
    ariaLabel: "Progress button",
  },
};

export const WithSuccessAction: Story = {
  args: {
    label: "Click me",
    action: async () => {
      await new Promise((resolve) => {
        window.setTimeout(resolve, actionDelayMs);
      });
    },
  },
};

export const WithErrorAction: Story = {
  args: {
    label: "Click me",
    action: async () => {
      await new Promise((_, reject) => {
        window.setTimeout(reject, actionDelayMs);
      });
    },
  },
};

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsProgressButton,
  combinationsProps: [
    {
      size: kdsSizes,
      variant: kdsButtonVariants,
      disabled: [false, true],
      state: ["default"],
      leadingIcon: ["placeholder"],
      label: ["{Label}"],
    },
    {
      size: kdsSizes,
      variant: kdsButtonVariants,
      disabled: [false, true],
      state: ["default"],
      leadingIcon: ["placeholder"],
      ariaLabel: ["Icon only progress button"],
    },
  ],
});

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsProgressButton,
  }),
  args: {
    label: "Progress button with veeery loooong label",
    leadingIcon: "placeholder",
    variant: "filled",
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsProgressButton,
  designsToCompare: {
    iconWithLabelFilledLarge: {
      props: {
        variant: "filled",
        leadingIcon: "placeholder",
        label: "{Label}",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=278-5127":
          {
            size: "large",
            state: "default",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=278-5461":
          {
            size: "large",
            state: "progress",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=278-5477":
          {
            size: "large",
            state: "success",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=278-5485":
          {
            size: "large",
            state: "error",
          },
      },
    },
    iconOnlyFilledLarge: {
      props: {
        variant: "filled",
        leadingIcon: "placeholder",
        ariaLabel: "Progress button",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=292-36533":
          {
            size: "large",
            state: "default",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=292-36538":
          {
            size: "large",
            state: "progress",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=292-36543":
          {
            size: "large",
            state: "success",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=292-36553":
          {
            size: "large",
            state: "error",
          },
      },
    },
  },
});
