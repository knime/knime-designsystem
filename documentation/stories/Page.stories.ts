import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, userEvent, within } from "storybook/test";

import MyPage from "./Page.vue";

export default {
  title: "Full Layouts and Pages/Page",
  component: MyPage,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
} as Meta<typeof MyPage>;

export const LoggedOut: StoryObj<typeof MyPage> = {};

// More on component testing: https://storybook.js.org/docs/writing-tests/component-testing
export const LoggedIn: StoryObj<typeof MyPage> = {
  render: () => ({
    components: { MyPage },
    template: "<my-page />",
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loginButton = canvas.getByRole("button", { name: /Log in/i });
    await expect(loginButton).toBeInTheDocument();
    await userEvent.click(loginButton);
    await expect(loginButton).not.toBeInTheDocument();

    const logoutButton = canvas.getByRole("button", { name: /Log out/i });
    await expect(logoutButton).toBeInTheDocument();
  },
};
