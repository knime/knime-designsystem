import type { FunctionalComponent } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../../test-utils/storybook";

import KdsLink from "./KdsLink.vue";
import { kdsLinkVariants } from "./enums";

const meta: Meta<typeof KdsLink> = {
  title: "Buttons/Link",
  component: KdsLink as unknown as FunctionalComponent,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Inline link component for text-like actions. If `variant` is omitted, the component auto-infers internal/external from `to` (document is never auto-inferred because that would require fetching the resource).",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2805-87047",
    },
  },
  argTypes: {
    label: {
      control: "text",
      description: "Link text.",
      table: { category: "props" },
    },
    to: {
      control: "text",
      description: "URL or path string to navigate to.",
      table: { category: "props" },
    },
    variant: {
      control: { type: "select" },
      options: kdsLinkVariants,
      description:
        "Visual link variant. If omitted, internal/external is inferred from `to`; document is never inferred automatically.",
      table: { category: "props" },
    },
    fileSize: {
      control: "text",
      description: "Optional file size suffix for document links.",
      table: { category: "props" },
    },
    disabled: {
      control: "boolean",
      description: "If true, renders disabled and blocks interaction.",
      table: { category: "props" },
    },
    title: {
      control: "text",
      description:
        "Optional base title text; rendered tooltip is variant-aware (`Open ...`, `Download ...`, and external adds ` (opens in a new tab)` only when target resolves to `_blank`).",
      table: { category: "props" },
    },
    target: {
      control: "text",
      description: "Target browsing context for anchor-based links.",
      table: { category: "props" },
    },
    rel: {
      control: "text",
      description: "Relationship of the linked URL.",
      table: { category: "props" },
    },
    download: {
      control: "boolean",
      description: "If true, downloads the linked URL.",
      table: { category: "props" },
    },
    onClick: {
      table: { disable: true },
    },
  },
  args: {
    label: "Link",
    to: "https://www.knime.com",
    variant: "external",
    disabled: false,
    target: null,
    rel: null,
    download: undefined,
    onClick: fn(),
  },
};
export default meta;

type Story = StoryObj<typeof KdsLink>;

function getRenderedLink(
  canvasElement: HTMLElement,
  label = "Link",
): HTMLElement {
  // We assert against the `.kds-link` root in several stories.
  // Disabled links render as non-link elements, so role-based queries alone
  // are not sufficient for all test scenarios.
  const canvas = within(canvasElement);
  const text = canvas.getByText(label);
  const link = text.closest(".kds-link");

  if (!link) {
    throw new Error("Expected .kds-link root element to be rendered.");
  }

  return link as HTMLElement;
}

export const Default: Story = {
  args: {
    variant: "external",
    to: "https://www.knime.com",
  },
  play: async ({ canvasElement, args }) => {
    args.onClick.mockClear?.();

    const canvas = within(canvasElement);
    const link = canvas.getByRole("link", { name: "Link" });
    await expect(link.tagName).toBe("A");

    link.addEventListener("click", (event) => {
      event.preventDefault();
    });

    await userEvent.click(link);
    await expect(args.onClick).toHaveBeenCalledTimes(1);

    link.blur();
    await userEvent.tab();
    await expect(link).toHaveFocus();

    await userEvent.keyboard("{Enter}");
    await expect(args.onClick).toHaveBeenCalledTimes(2);
  },
};

export const Internal: Story = {
  args: {
    variant: "internal",
    to: "/workflows",
  },
};

export const External: Story = {
  args: {
    variant: "external",
    to: "https://www.knime.com",
  },
};

export const Document: Story = {
  args: {
    variant: "document",
    label: "Link.pdf",
    to: "https://www.knime.com/whitepaper.pdf",
    fileSize: "156 KB",
  },
};

export const AutoInference: Story = {
  parameters: {
    docs: false,
  },
  render: () => ({
    components: { KdsLink },
    template: `
      <div style="display: grid; gap: 12px;">
        <KdsLink label="Relative path" :to="'/workflows'" />
        <KdsLink label="Hash target" :to="'#target'" />
        <KdsLink label="Query string" :to="'?tab=2'" />
        <KdsLink label="HTTPS URL" :to="'https://www.knime.com'" />
        <KdsLink label="Protocol-relative URL" :to="'//www.knime.com'" />
        <KdsLink label="Mailto URL" :to="'mailto:support@knime.com'" />
        <KdsLink
          label="Explicit internal override"
          variant="internal"
          :to="'https://www.knime.com'"
        />
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const relative = getRenderedLink(canvasElement, "Relative path");
    const hash = getRenderedLink(canvasElement, "Hash target");
    const query = getRenderedLink(canvasElement, "Query string");
    const https = getRenderedLink(canvasElement, "HTTPS URL");
    const protocolRelative = getRenderedLink(
      canvasElement,
      "Protocol-relative URL",
    );
    const mailto = getRenderedLink(canvasElement, "Mailto URL");
    const explicit = getRenderedLink(
      canvasElement,
      "Explicit internal override",
    );

    await expect(relative).toHaveClass("type-internal");
    await expect(hash).toHaveClass("type-internal");
    await expect(query).toHaveClass("type-internal");
    await expect(https).toHaveClass("type-external");
    await expect(protocolRelative).toHaveClass("type-external");
    await expect(mailto).toHaveClass("type-external");
    await expect(explicit).toHaveClass("type-internal");

    await expect(relative.querySelector(".kds-icon")).toBeNull();
    await expect(hash.querySelector(".kds-icon")).toBeNull();
    await expect(query.querySelector(".kds-icon")).toBeNull();
    await expect(https.querySelector(".kds-icon")).not.toBeNull();
    await expect(protocolRelative.querySelector(".kds-icon")).not.toBeNull();
    await expect(mailto.querySelector(".kds-icon")).not.toBeNull();
    await expect(explicit.querySelector(".kds-icon")).toBeNull();
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvasElement, args }) => {
    args.onClick.mockClear?.();

    const canvas = within(canvasElement);
    const root = getRenderedLink(canvasElement);

    await expect(canvas.queryByRole("link", { name: "Link" })).toBeNull();
    await expect(root.tagName).toBe("SPAN");
    await expect(root).toHaveAttribute("aria-disabled", "true");
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsLink,
    width: 220,
  }),
  args: {
    variant: "document",
    label: "Link-to-a-very-long-document-name-that-should-overflow.pdf",
    fileSize: "156 KB",
    to: "https://www.knime.com/very-long-document-name.pdf",
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsLink,
  designsToCompare: {
    internal: {
      props: {
        variant: "internal",
        label: "Link",
        to: "/workflows",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2805-87048":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3737-158071":
          {
            parameters: { pseudo: { hover: true } },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3737-158073":
          {
            parameters: { pseudo: { active: true } },
          },
      },
    },
    external: {
      props: {
        variant: "external",
        label: "Link",
        to: "https://www.knime.com",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3737-158087":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3886-136223":
          {
            parameters: { pseudo: { hover: true } },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3886-136230":
          {
            parameters: { pseudo: { active: true } },
          },
      },
    },
    document: {
      props: {
        variant: "document",
        label: "Link.pdf",
        fileSize: "156 KB",
        to: "https://www.knime.com/whitepaper.pdf",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3737-158095":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3737-158093":
          {
            parameters: { pseudo: { hover: true } },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3737-158091":
          {
            parameters: { pseudo: { active: true } },
          },
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsLink,
  combinationsProps: [
    {
      variant: ["internal"],
      label: ["Link"],
      to: ["/workflows"],
      disabled: [false, true],
    },
    {
      variant: ["external"],
      label: ["Link"],
      to: ["https://www.knime.com"],
      disabled: [false, true],
    },
    {
      variant: ["document"],
      label: ["Link.pdf"],
      to: ["https://www.knime.com/whitepaper.pdf"],
      fileSize: ["156 KB", "23 MB"],
      disabled: [false, true],
    },
  ],
  pseudoStates: ["hover", "active", "focus-visible"],
  columns: 3,
});
