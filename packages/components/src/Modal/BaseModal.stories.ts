import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { fn } from "storybook/test";

import { iconNames } from "@knime/kds-styles/img/icons/def";

import Button from "../Button/Button.vue";
import { veryLongText } from "../test-utils/veryLongText";

import BaseModal from "./BaseModal.vue";
import { closedByOptions } from "./types";

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
      control: { type: "select" },
      options: [undefined, ...iconNames],
    },
    closedby: {
      control: { type: "select" },
      options: closedByOptions,
    },
    width: {
      control: { type: "select" },
      options: ["small", "medium", "large", "full"],
      defaultValue: "medium",
    },
    height: {
      control: { type: "select" },
      options: ["full", "auto"],
      defaultValue: "auto",
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
    components: { BaseModal, Button },
    setup() {
      return {
        args,
      };
    },
    template: `
    <Button
      label="Show modal"
      variant="filled"
      @click="args.active = true"
    />
    <BaseModal v-bind="args" @close="args.active = false">
      <template #default>
        Do you really want to delete everything?
      </template>
      <template #footerEnd>
        <Button
          label="Cancel"
          variant="transparent"
          @click="args.active = false"
        />
        <Button
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
    components: { BaseModal, Button },
    setup() {
      return {
        args,
      };
    },
    template: `
    <Button
      label="Show modal"
      variant="filled"
      @click="args.active = true"
    />
    <BaseModal v-bind="args" @close="args.active = false">
      <template #default>
        <div style="padding: 0 var(--modal-side-padding);">This is some message that will not scroll.</div>
        <div style="padding: 0 var(--modal-side-padding); overflow: auto;">${veryLongText} ${veryLongText}</div>
        <div style="padding: 0 var(--modal-side-padding);">Also here no scrolling.</div>
      </template>
      <template #footerEnd>
        <Button
          label="Cancel"
          variant="transparent"
          @click="args.active = false"
        />
        <Button
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
    withPadding: false,
    scrollContent: false,
  },
};

export const VeryLongTextModalLightDismissible: Story = {
  render: (args) => ({
    components: { BaseModal, Button },
    setup() {
      return {
        args,
      };
    },
    template: `
    <Button
      label="Show Info"
      variant="filled"
      @click="args.active = true"
    />
    <BaseModal v-bind="args" @close="args.active = false">
      <template #default>
        ${veryLongText}
      </template>
      <template #footerEnd>
      <Button
          label="Ok"
          variant="filled"
          @click="args.active = false"
        />
      </template>
    </BaseModal>
  `,
  }),
  args: {
    icon: "info",
    title: "Please read carefully",
    closedby: "any",
  },
};
