import type { FunctionalComponent } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../../test-utils/storybook";
import { buildWrappingComponentDocs } from "../docs";

import KdsLink from "./KdsLink.vue";

const meta: Meta<typeof KdsLink> = {
  title: "Buttons/Link",
  component: KdsLink as unknown as FunctionalComponent,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `Inline link component for text-like links. The component auto-infers internal/external from \`to\`.${buildWrappingComponentDocs(
          "KdsLink",
        )}`,
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
      description:
        "URL or path string to navigate to. To support typed routes and route-location objects, please create an app-level wrapper (e.g. with `RouterLink`/`NuxtLink`) as described above.",
      table: { category: "props" },
    },
    fileSize: {
      control: { type: "number", min: 0, step: 1 },
      description: "Optional file size in bytes.",
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
      description:
        "If true, the link will be downloaded instead of navigating to it.",
      table: { category: "props" },
    },
    onClick: {
      table: { disable: true },
    },
  },
  args: {
    label: "Link",
    to: "https://www.knime.com",
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
  play: async ({ canvasElement, args }) => {
    const onClick = args.onClick as ReturnType<typeof fn>;
    onClick.mockClear();

    const canvas = within(canvasElement);
    const link = canvas.getByRole("link", { name: "Link" });
    await expect(link.tagName).toBe("A");

    link.addEventListener("click", (event) => {
      event.preventDefault();
    });

    await userEvent.click(link);
    await expect(onClick).toHaveBeenCalledTimes(1);

    link.blur();
    await userEvent.tab();
    await expect(link).toHaveFocus();

    await userEvent.keyboard("{Enter}");
    await expect(onClick).toHaveBeenCalledTimes(2);
  },
};

export const Internal: Story = {
  args: {
    to: "/workflows",
  },
};

export const External: Story = {
  args: {
    to: "https://www.knime.com",
  },
};

export const Download: Story = {
  args: {
    label: "Link.pdf",
    to: "https://www.knime.com/whitepaper.pdf",
    download: true,
    fileSize: 159744,
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
        <KdsLink label="Document via fileSize" :to="'/foo.pdf'" :file-size="159744" />
        <KdsLink label="Document via download" :to="'/foo.pdf'" :download="true" />
        <KdsLink label="Document via download + fileSize" :to="'/foo.pdf'" :download="true" :file-size="159744" />
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
    const documentBySize = getRenderedLink(
      canvasElement,
      "Document via fileSize",
    );
    const documentByDownload = getRenderedLink(
      canvasElement,
      "Document via download",
    );
    const documentByDownloadAndSize = getRenderedLink(
      canvasElement,
      "Document via download + fileSize",
    );

    await expect(relative).toHaveClass("variant-internal");
    await expect(hash).toHaveClass("variant-internal");
    await expect(query).toHaveClass("variant-internal");
    await expect(https).toHaveClass("variant-external");
    await expect(protocolRelative).toHaveClass("variant-external");
    await expect(mailto).toHaveClass("variant-external");
    await expect(documentBySize).toHaveClass("variant-document");
    await expect(documentByDownload).toHaveClass("variant-document");
    await expect(documentByDownloadAndSize).toHaveClass("variant-document");

    await expect(relative.querySelector(".kds-icon")).toBeNull();
    await expect(hash.querySelector(".kds-icon")).toBeNull();
    await expect(query.querySelector(".kds-icon")).toBeNull();
    await expect(https.querySelector(".kds-icon")).not.toBeNull();
    await expect(protocolRelative.querySelector(".kds-icon")).not.toBeNull();
    await expect(mailto.querySelector(".kds-icon")).not.toBeNull();
    await expect(documentBySize.querySelector(".kds-icon")).toBeNull();
    await expect(documentByDownload.querySelector(".kds-icon")).toBeNull();
    await expect(
      documentByDownloadAndSize.querySelector(".kds-icon"),
    ).toBeNull();
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvasElement, args }) => {
    const onClick = args.onClick as ReturnType<typeof fn>;
    onClick.mockClear();

    const canvas = within(canvasElement);
    const root = getRenderedLink(canvasElement);

    await expect(canvas.queryByRole("link", { name: "Link" })).toBeNull();
    await expect(root.tagName).toBe("SPAN");
    await expect(root).toHaveAttribute("aria-disabled", "true");
    await expect(onClick).not.toHaveBeenCalled();
  },
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsLink,
    width: 220,
  }),
  args: {
    label: "Link-to-a-very-long-document-name-that-should-overflow.pdf",
    download: true,
    fileSize: 159744,
    to: "https://www.knime.com/very-long-document-name.pdf",
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsLink,
  designsToCompare: {
    internal: {
      props: {
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
        label: "Link.pdf",
        download: true,
        fileSize: 159744,
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
      label: ["Link"],
      to: ["/workflows"],
      disabled: [false, true],
    },
    {
      label: ["Link"],
      to: ["https://www.knime.com"],
      disabled: [false, true],
    },
    {
      label: ["Link.pdf"],
      to: ["https://www.knime.com/whitepaper.pdf"],
      download: [true],
      fileSize: [159744, 24117248],
      disabled: [false, true],
    },
  ],
  pseudoStates: ["hover", "active", "focus-visible"],
  columns: 3,
});
