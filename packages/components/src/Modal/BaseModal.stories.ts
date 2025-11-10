import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { fn } from "storybook/test";

import { iconNames } from "@knime/kds-styles/img/icons/def";

import Button from "../Button/Button.vue";

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
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
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
          size="large"
          variant="transparent"
          @click="args.active = false"
        />
        <Button
          label="Confirm"
          size="large"
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
      size="large"
      variant="filled"
      @click="args.active = true"
    />
    <BaseModal v-bind="args" @close="args.active = false">
      <template #default>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex
        ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu
        fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia
        deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat
        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi
        consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid
        ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id
        est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid
        ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim
        id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu
        fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor
        incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </template>
      <template #footerEnd>
      <Button
          label="Ok"
          size="large"
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
