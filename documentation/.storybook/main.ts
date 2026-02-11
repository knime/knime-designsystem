import type { StorybookConfig } from "@storybook/vue3-vite";

const resolveStorybookBasePath = () => {
  const proc = (
    globalThis as unknown as {
      process?: { env?: Record<string, string | undefined> };
    }
  ).process;

  return proc?.env?.STORYBOOK_BASE_PATH ?? "/";
};

const storybookBasePath = resolveStorybookBasePath();

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../../packages/components/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-a11y",
    "@storybook/addon-designs",
    "@storybook/addon-links",
    "@storybook/addon-themes",
    "@storybook/addon-docs",
    "@storybook-community/storybook-dark-mode",
    "storybook-addon-pseudo-states",
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  managerHead: (head) =>
    head.replaceAll("%STORYBOOK_BASE_PATH%", storybookBasePath),
  previewHead: (head) =>
    head.replaceAll("%STORYBOOK_BASE_PATH%", storybookBasePath),
};

export default config;
