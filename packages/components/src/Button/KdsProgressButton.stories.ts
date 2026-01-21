import type { FunctionalComponent } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { iconNames } from "@knime/kds-styles/img/icons/def";

import { kdsSizes } from "../constants.ts";
import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../test-utils/storybook.ts";

import KdsProgressButton from "./KdsProgressButton.vue";
import { kdsButtonVariants } from "./constants.ts";

const ACTION_TIMEOUT = 900;
const successAction = async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, ACTION_TIMEOUT);
  });
};
const errorAction = async () => {
  await new Promise((_, reject) => {
    setTimeout(reject, ACTION_TIMEOUT);
  });
};

const meta: Meta<typeof KdsProgressButton> = {
  title: "Components/Buttons/KdsProgressButton",
  component: KdsProgressButton as unknown as FunctionalComponent,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'State model:\n\n- `default`: normal button, clickable.\n- `progress`: shows progress indicator and becomes non-interactive while the action promise is pending.\n- `success`: shows success feedback briefly after the action resolves.\n- `error`: shows error feedback briefly after the action rejects.\n\nFor icon-only variants, make sure the accessible name reflects the current state (e.g. "Save" → "Saving…" → "Saved" / "Save failed").',
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=278-4918&p=f&m=dev",
    },
  },
  argTypes: {
    size: {
      description: "Controls the overall button size (including icon size).",
      control: { type: "select" },
      options: kdsSizes,
      table: {
        category: "Props",
        type: { summary: "KdsSize" },
        defaultValue: { summary: "medium" },
      },
    },
    variant: {
      description: "Visual style variant of the button.",
      control: { type: "select" },
      options: kdsButtonVariants,
      table: {
        category: "Props",
        type: { summary: "KdsButtonVariant" },
        defaultValue: { summary: "filled" },
      },
    },
    state: {
      description:
        "Visual state of the progress button (see state model in the component docs).",
      control: { type: "select" },
      options: ["default", "progress", "success", "error"],
      table: {
        category: "Model",
        type: { summary: "KdsProgressButtonState" },
        defaultValue: { summary: "default" },
      },
    },
    label: {
      description:
        "Button label text. Required for the icon+label variant; must be omitted for icon-only buttons.",
      control: "text",
      table: { category: "Props", type: { summary: "string" } },
    },
    leadingIcon: {
      description:
        "Icon shown on the left. This component always requires a leading icon.",
      control: { type: "select" },
      options: iconNames,
      table: {
        category: "Props",
        type: { summary: "IconName" },
      },
    },
    ariaLabel: {
      description:
        'Accessible label for icon-only buttons. Required when `label` is not provided. Should be set according to the current state (e.g. "Save", "Saving…", "Saved", "Save failed").',
      control: "text",
      table: { category: "Props", type: { summary: "string" } },
    },
    disabled: {
      description: "Disables the button.",
      control: "boolean",
      table: {
        category: "Props",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    action: {
      description:
        "Required async click handler. While the promise is pending, the button switches to the progress state; on resolve it shows success briefly; on reject it shows error briefly.",
      name: "action",
      control: { type: "select" },
      options: ["successful dummy function", "failing dummy function"],
      mapping: {
        "successful dummy function": successAction,
        "failing dummy function": errorAction,
      },
      table: {
        category: "Props",
        type: { summary: "() => Promise<unknown>" },
      },
    },
  },
  args: {
    state: "default",
    action: "successful dummy function",
    label: "{Label}",
    leadingIcon: "placeholder",
    ariaLabel: "",
    variant: "filled",
    size: "medium",
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof KdsProgressButton>;

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
    action: successAction,
  },
};

export const WithErrorAction: Story = {
  args: {
    label: "Click me",
    action: errorAction,
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

type KdsSize = (typeof kdsSizes)[number];

type FigmaProgressButtonVisualState =
  | "enabled"
  | "hover"
  | "active"
  | "progress"
  | "success"
  | "error"
  | "disabled";

type FigmaProgressButtonVariantMatrix = Record<
  KdsSize,
  Record<FigmaProgressButtonVisualState, string>
>;

type FigmaDesignURL =
  `https://www.figma.com/design/${string}/${string}?node-id=${string}`;

const figmaUrl = (nodeId: string): FigmaDesignURL =>
  `https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=${nodeId}`;

const comparatorSizes: KdsSize[] = ["large", "medium", "small", "xsmall"];

const buildVariants = (matrix: FigmaProgressButtonVariantMatrix) => {
  const variants: Record<
    FigmaDesignURL,
    Record<string, unknown>
  > = {} as Record<FigmaDesignURL, Record<string, unknown>>;

  for (const size of comparatorSizes) {
    const ids = matrix[size];

    variants[figmaUrl(ids.enabled)] = { size, state: "default" };
    variants[figmaUrl(ids.hover)] = {
      size,
      state: "default",
      parameters: { pseudo: { hover: true } },
    };
    variants[figmaUrl(ids.active)] = {
      size,
      state: "default",
      parameters: { pseudo: { active: true } },
    };
    variants[figmaUrl(ids.progress)] = { size, state: "progress" };
    variants[figmaUrl(ids.success)] = { size, state: "success" };
    variants[figmaUrl(ids.error)] = { size, state: "error" };
    variants[figmaUrl(ids.disabled)] = {
      size,
      disabled: true,
      state: "default",
    };
  }

  return variants;
};

const figmaVariants = {
  filled: {
    iconWithLabel: {
      large: {
        enabled: "278-5127",
        hover: "278-5280",
        active: "1148-4291",
        progress: "278-5461",
        success: "278-5477",
        error: "278-5485",
        disabled: "278-5325",
      },
      medium: {
        enabled: "329-59262",
        hover: "329-59326",
        active: "1673-4282",
        progress: "329-59270",
        success: "329-59278",
        error: "329-59294",
        disabled: "329-59338",
      },
      small: {
        enabled: "600-4575",
        hover: "600-4639",
        active: "1780-8914",
        progress: "600-4583",
        success: "600-4591",
        error: "600-4607",
        disabled: "600-4651",
      },
      xsmall: {
        enabled: "2271-37039",
        hover: "2271-37061",
        active: "2271-37044",
        progress: "2271-37049",
        success: "2271-37053",
        error: "2271-37057",
        disabled: "2271-37066",
      },
    } satisfies FigmaProgressButtonVariantMatrix,
    iconOnly: {
      large: {
        enabled: "292-36533",
        hover: "292-36573",
        active: "1148-4295",
        progress: "292-36538",
        success: "292-36543",
        error: "292-36553",
        disabled: "292-36581",
      },
      medium: {
        enabled: "329-59267",
        hover: "329-59330",
        active: "1673-4286",
        progress: "329-59275",
        success: "329-59283",
        error: "329-59299",
        disabled: "329-59342",
      },
      small: {
        enabled: "600-4580",
        hover: "600-4643",
        active: "1780-8918",
        progress: "600-4588",
        success: "600-4596",
        error: "600-4612",
        disabled: "600-4655",
      },
      xsmall: {
        enabled: "2271-37021",
        hover: "2271-37033",
        active: "2271-37024",
        progress: "2271-37027",
        success: "2271-37029",
        error: "2271-37031",
        disabled: "2271-37036",
      },
    } satisfies FigmaProgressButtonVariantMatrix,
  },
  outlined: {
    iconWithLabel: {
      large: {
        enabled: "278-5178",
        hover: "278-5295",
        active: "1148-4297",
        progress: "278-8763",
        success: "278-8588",
        error: "278-8593",
        disabled: "278-5340",
      },
      medium: {
        enabled: "329-59310",
        hover: "329-59332",
        active: "1673-4288",
        progress: "329-59318",
        success: "329-59286",
        error: "329-59302",
        disabled: "329-59344",
      },
      small: {
        enabled: "600-4623",
        hover: "600-4645",
        active: "1780-8920",
        progress: "600-4631",
        success: "600-4599",
        error: "600-4615",
        disabled: "600-4657",
      },
      xsmall: {
        enabled: "2271-36998",
        hover: "2271-37012",
        active: "2271-37003",
        progress: "2271-37008",
        success: "2271-36990",
        error: "2271-36994",
        disabled: "2271-37017",
      },
    } satisfies FigmaProgressButtonVariantMatrix,
    iconOnly: {
      large: {
        enabled: "292-36563",
        hover: "292-36577",
        active: "1148-4301",
        progress: "292-36568",
        success: "292-36548",
        error: "292-36558",
        disabled: "292-36585",
      },
      medium: {
        enabled: "329-59315",
        hover: "329-59336",
        active: "1673-4292",
        progress: "329-59323",
        success: "329-59291",
        error: "329-59307",
        disabled: "329-59348",
      },
      small: {
        enabled: "600-4628",
        hover: "600-4649",
        active: "1780-8924",
        progress: "600-4636",
        success: "600-4604",
        error: "600-4620",
        disabled: "600-4661",
      },
      xsmall: {
        enabled: "2271-36977",
        hover: "2271-36985",
        active: "2271-36980",
        progress: "2271-36983",
        success: "2271-36973",
        error: "2271-36975",
        disabled: "2271-36988",
      },
    } satisfies FigmaProgressButtonVariantMatrix,
  },
  transparent: {
    iconWithLabel: {
      large: {
        enabled: "12517-47736",
        hover: "12517-47750",
        active: "12517-47741",
        progress: "12517-47746",
        success: "12517-47728",
        error: "12517-47732",
        disabled: "12517-47755",
      },
      medium: {
        enabled: "12517-47688",
        hover: "12517-47697",
        active: "12517-47702",
        progress: "12517-47693",
        success: "12517-47680",
        error: "12517-47684",
        disabled: "12517-47707",
      },
      small: {
        enabled: "12517-47617",
        hover: "12517-47645",
        active: "12517-47627",
        progress: "12517-47637",
        success: "12517-47601",
        error: "12517-47609",
        disabled: "12517-47655",
      },
      xsmall: {
        enabled: "12517-47622",
        hover: "12517-47650",
        active: "12517-47632",
        progress: "12517-47641",
        success: "12517-47605",
        error: "12517-47613",
        disabled: "12517-47659",
      },
    } satisfies FigmaProgressButtonVariantMatrix,
    iconOnly: {
      large: {
        enabled: "12517-47715",
        hover: "12517-47723",
        active: "12517-47718",
        progress: "12517-47721",
        success: "12517-47711",
        error: "12517-47713",
        disabled: "12517-47726",
      },
      medium: {
        enabled: "12517-47667",
        hover: "12517-47672",
        active: "12517-47675",
        progress: "12517-47670",
        success: "12517-47663",
        error: "12517-47665",
        disabled: "12517-47678",
      },
      small: {
        enabled: "12517-47575",
        hover: "12517-47591",
        active: "12517-47581",
        progress: "12517-47587",
        success: "12517-47567",
        error: "12517-47571",
        disabled: "12517-47597",
      },
      xsmall: {
        enabled: "12517-47578",
        hover: "12517-47594",
        active: "12517-47584",
        progress: "12517-47589",
        success: "12517-47569",
        error: "12517-47573",
        disabled: "12517-47599",
      },
    } satisfies FigmaProgressButtonVariantMatrix,
  },
} as const;

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsProgressButton,
  designsToCompare: {
    iconWithLabelFilled: {
      props: {
        variant: "filled",
        leadingIcon: "placeholder",
        label: "{Label}",
      },
      variants: buildVariants(figmaVariants.filled.iconWithLabel),
    },
    iconOnlyFilled: {
      props: {
        variant: "filled",
        leadingIcon: "placeholder",
        ariaLabel: "Progress button",
      },
      variants: buildVariants(figmaVariants.filled.iconOnly),
    },
    iconWithLabelOutlined: {
      props: {
        variant: "outlined",
        leadingIcon: "placeholder",
        label: "{Label}",
      },
      variants: buildVariants(figmaVariants.outlined.iconWithLabel),
    },
    iconOnlyOutlined: {
      props: {
        variant: "outlined",
        leadingIcon: "placeholder",
        ariaLabel: "Progress button",
      },
      variants: buildVariants(figmaVariants.outlined.iconOnly),
    },
    iconWithLabelTransparent: {
      props: {
        variant: "transparent",
        leadingIcon: "placeholder",
        label: "{Label}",
      },
      variants: buildVariants(figmaVariants.transparent.iconWithLabel),
    },
    iconOnlyTransparent: {
      props: {
        variant: "transparent",
        leadingIcon: "placeholder",
        ariaLabel: "Progress button",
      },
      variants: buildVariants(figmaVariants.transparent.iconOnly),
    },
  },
});
