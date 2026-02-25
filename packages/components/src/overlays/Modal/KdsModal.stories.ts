import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/internal/preview-api";
import { fn } from "storybook/test";

import { iconNames } from "@knime/kds-styles/img/icons/def";

import KdsButton from "../../buttons/KdsButton/KdsButton.vue";
import { veryLongText } from "../../test-utils/veryLongText";

import KdsModal from "./KdsModal.vue";
import {
  kdsModalClosedByOptions,
  kdsModalHeightSizes,
  kdsModalVariants,
  kdsModalWidthSizes,
} from "./enums";

const meta: Meta<typeof KdsModal> = {
  title: "Overlays/Modal",
  component: KdsModal,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A modal dialog component that uses the HTML native &lt;dialog&gt; tag. " +
          "Uses `KdsModalLayout` in the `default` slot and provides a `body` and `footer` slot.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6220-89388",
    },
  },
  argTypes: {
    icon: {
      options: [undefined, ...iconNames],
    },
    closedby: {
      options: kdsModalClosedByOptions,
    },
    variant: {
      options: kdsModalVariants,
    },
    width: {
      options: kdsModalWidthSizes,
    },
    height: {
      options: kdsModalHeightSizes,
    },
  },
  args: {
    onClose: fn(),
  },
  render: (args, context) => {
    const params = context.parameters?.modalOptions ?? {};
    return {
      components: { KdsModal, KdsButton },
      setup() {
        return {
          args,
          cancelButton: {
            show: true,
            label: "Cancel",
            ...params.cancelButton,
          },
          confirmButton: {
            show: true,
            label: "Confirm",
            ...params.confirmButton,
          },
        };
      },
      template: `
    <KdsModal>
      <template #body>
        ${params.content ?? "Modal content text."}
      </template>

      <template #footer>
        <KdsButton
          v-if="cancelButton.show"
          :label="cancelButton.label"
          variant="transparent"
          @click="$emit('close')"
        />
        <KdsButton
          v-if="confirmButton.show"
          :label="confirmButton.label"
          variant="filled"
          @click="$emit('close')"
        />
      </template>
    </KdsModal>
  `,
    };
  },
  decorators: [
    (story, context) => {
      const storyObj = story();
      const params = context.parameters?.modalOptions ?? {};
      const [currentArgs, updateArgs] = useArgs();
      return {
        components: { Story: storyObj, KdsButton },
        setup() {
          return {
            // params,
            args: currentArgs,
            updateArgs,
          };
        },
        template: `
        <KdsButton
          v-if="${!params.hideButton}"
          label="${params.buttonLabel ?? "Show modal"}"
          variant="filled"
          @click="updateArgs({ active: true })"
        />
        <Story v-bind="args" @close="updateArgs({ active: false })" />
        `.trim(),
      };
    },
  ],
};
export default meta;

type Story = StoryObj<typeof KdsModal>;

export const Default: Story = {
  parameters: {
    modalOptions: {
      buttonLabel: "Show modal",
      content:
        "Modal content text. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
      confirmButton: { label: "Confirm" },
      cancelButton: { label: "Cancel" },
    },
  },
  args: {
    title: "Title",
  },
};

export const ShowOnLoad: Story = {
  parameters: {
    modalOptions: {
      hideButton: true,
      content: "This should be visible on load.",
      confirmButton: { label: "Confirm" },
      cancelButton: { label: "Cancel" },
    },
    docs: { disable: true },
  },
  args: {
    active: true,
    title: "Show on load…",
  },
};

export const VariantPlain: Story = {
  parameters: {
    modalOptions: {
      buttonLabel: "Variant plain",
      content: `<div>${veryLongText} ${veryLongText}</div>`,
    },
  },
  args: {
    title: "Variant Plain",
    variant: "plain",
  },
};

export const FullSizeInnerScrollable: Story = {
  parameters: {
    modalOptions: {
      buttonLabel: "Full size modal",
      content: `
      <div style="padding: var(--modal-padding-top) var(--modal-padding-right) var(--modal-gap) var(--modal-padding-left);">This is some message that will not scroll.</div>
      <div style="padding: 0 var(--modal-padding-right) 0 var(--modal-padding-left); overflow: auto;">${veryLongText} ${veryLongText}</div>
      <div style="padding: var(--modal-gap) var(--modal-padding-right) var(--modal-padding-bottom) var(--modal-padding-left);">Also here no scrolling.</div>
        `.trim(),
    },
  },
  args: {
    icon: "info",
    title: "Scrollable inner content",
    width: "full",
    height: "full",
    variant: "plain",
  },
};

export const LightDismissible: Story = {
  parameters: {
    modalOptions: {
      buttonLabel: "Show info",
      content: veryLongText,
      cancelButton: { show: false },
      confirmButton: { label: "Ok" },
    },
  },
  args: {
    title: "Please read carefully. A click outside should close the modal.",
    closedby: "any",
  },
};
