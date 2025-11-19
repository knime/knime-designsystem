import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { fn } from "storybook/test";

import { iconNames } from "@knime/kds-styles/img/icons/def";

import KdsButton from "../Button/KdsButton.vue";
import { veryLongText } from "../test-utils/veryLongText";

import BaseModal from "./BaseModal.vue";
import {
  closedByOptions,
  heightSizes,
  modalVariants,
  widthSizes,
} from "./constants";

const meta: Meta<typeof BaseModal> = {
  title: "Components/Modal/BaseModal",
  component: BaseModal,
  tags: ["autodocs"],
  parameters: {
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
};
export default meta;

type Story = StoryObj<typeof BaseModal>;

export const BaseModalStory: Story = {
  render: (args) => ({
    components: { BaseModal, KdsButton },
    setup() {
      return {
        args,
      };
    },
    template: `
    <KdsButton
      label="Show modal"
      variant="filled"
      @click="args.active = true"
    />
    <BaseModal v-bind="args" @close="args.active = false">
      <template #default>
        Do you really want to delete everything?
      </template>
      <template #footer>
        <KdsButton
          label="Cancel"
          variant="transparent"
          @click="args.active = false"
        />
        <KdsButton
          label="Confirm"
          variant="filled"
          @click="args.active = false"
        />
      </template>
    </BaseModal>
  `,
  }),
  args: {
    icon: "trash",
    title: "Delete all",
  },
};

export const BaseModalFullSizeInnerScrollableStory: Story = {
  render: (args) => ({
    components: { BaseModal, KdsButton },
    setup() {
      return {
        args,
      };
    },
    template: `
    <KdsButton
      label="Show modal"
      variant="filled"
      @click="args.active = true"
    />
    <BaseModal v-bind="args" @close="args.active = false">
      <template #default>
        <div style="padding: var(--modal-padding-top) var(--modal-padding-right) var(--modal-gap) var(--modal-padding-left);">This is some message that will not scroll.</div>
        <div style="padding: 0 var(--modal-padding-right) 0 var(--modal-padding-left); overflow: auto;">${veryLongText} ${veryLongText}</div>
        <div style="padding: var(--modal-gap) var(--modal-padding-right) var(--modal-padding-bottom) var(--modal-padding-left);">Also here no scrolling.</div>
      </template>
      <template #footer>
        <KdsButton
          label="Cancel"
          variant="transparent"
          @click="args.active = false"
        />
        <KdsButton
          label="Confirm"
          variant="filled"
          @click="args.active = false"
        />
      </template>
    </BaseModal>
  `,
  }),
  args: {
    icon: "info",
    title: "Scrollable inner content",
    width: "full",
    height: "full",
    variant: "plain",
  },
};

export const VeryLongTextModalLightDismissible: Story = {
  render: (args) => ({
    components: { BaseModal, KdsButton },
    setup() {
      return {
        args,
      };
    },
    template: `
    <KdsButton
      label="Show Info"
      variant="filled"
      @click="args.active = true"
    />
    <BaseModal v-bind="args" @close="args.active = false">
      <template #default>
        ${veryLongText}
      </template>
      <template #footer>
      <KdsButton
          label="Ok"
          variant="filled"
          @click="args.active = false"
        />
      </template>
    </BaseModal>
  `,
  }),
  args: {
    title: "Please read carefully",
    closedby: "any",
  },
};
