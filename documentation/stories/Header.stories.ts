import type { Meta, StoryFn } from "@storybook/vue3-vite";
import { action } from "storybook/actions";

import MyHeader from "./Header.vue";

export default {
  title: "Composite Components/Header",
  component: MyHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof MyHeader>;

const Template: StoryFn<typeof MyHeader> = (args) => ({
  components: { MyHeader },
  setup() {
    return { args };
  },
  template: '<my-header v-bind="args" />',
});

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {
    name: "Jane Doe",
  },
  onLogin: action("onLogin"),
  onLogout: action("onLogout"),
  onCreateAccount: action("onCreateAccount"),
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  user: null,
  onLogin: action("onLogin"),
  onLogout: action("onLogout"),
  onCreateAccount: action("onCreateAccount"),
};
