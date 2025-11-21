import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/internal/preview-api";
import { fn } from "storybook/test";

import { iconNames } from "@knime/kds-styles/img/icons/def";

import KdsButton from "../Button/KdsButton.vue";
import { veryLongText } from "../test-utils/veryLongText";

import KdsModal from "./KdsModal.vue";
import {
  closedByOptions,
  heightSizes,
  modalVariants,
  widthSizes,
} from "./constants";

const meta: Meta<typeof KdsModal> = {
  title: "Components/Modal/KdsModal",
  component: KdsModal,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A modal dialog component that uses the HTML native &lt;dialog&gt; tag.",
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
      options: closedByOptions,
    },
    variant: {
      options: modalVariants,
    },
    width: {
      options: widthSizes,
    },
    height: {
      options: heightSizes,
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
      <template #default>
        ${params.content ?? "A question?"}
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
      content: "Do you really want to delete everything?",
      confirmButton: { label: "Yes" },
      cancelButton: { label: "No" },
    },
  },
  args: {
    icon: "trash",
    title: "Delete all",
  },
};

export const FullSizeInnerScrollable: Story = {
  parameters: {
    modalOptions: {
      buttonLabel: "Show full size",
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
    title: "Please read carefully",
    closedby: "any",
  },
};
