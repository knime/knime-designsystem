import { type Preview, setup } from "@storybook/vue3-vite";
import { useDarkMode } from "@storybook-community/storybook-dark-mode";

import "@knime/kds-styles/index.css";
import "@knime/kds-styles/kds-legacy-theme.css";
import {
  useKdsDarkMode,
  useKdsLegacyMode,
} from "../../packages/components/src";

let storybookAppInstanceCounter = 0;

setup((app) => {
  storybookAppInstanceCounter += 1;
  app.config.idPrefix = `sb-${storybookAppInstanceCounter}`;
});

const globalStyles = `
  h1 {
    font: var(--kds-font-dataapps-h1);
  }
  h2 {
    font: var(--kds-font-dataapps-h2);
  }
  h3 {
    font: var(--kds-font-dataapps-h3);
  }
  h4 {
    font: var(--kds-font-dataapps-h4);
  }
  h5 {
    font: var(--kds-font-dataapps-h5);
  }
  h6 {
    font: var(--kds-font-dataapps-h6);
  }
`;

const style = document.createElement("style");
style.innerHTML = globalStyles;
document.head.appendChild(style);

const preview: Preview = {
  globalTypes: {
    legacy: {
      description: "Legacy mode to view components with legacy styles",
      defaultValue: "false",
      toolbar: {
        title: "Legacy Mode",
        items: [
          { value: "false", title: "Legacy off" },
          { value: "true", title: "Legacy on" },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
    docs: {
      codePanel: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          "KNIME Design System",
          "Core Concepts",
          ["Introduction", "*"],
          "Components",
          ["Introduction", "*"],
          "Composite Components",
          ["Introduction", "*"],
          "Full Layouts and Pages",
          ["Introduction", "*"],
          "Styling and Theming",
          ["Introduction", "*"],
        ],
        method: "alphabetical",
      },
    },
  },
  decorators: [
    (story, context) => {
      const isDark = useDarkMode();
      useKdsDarkMode().currentMode.value = isDark ? "dark" : "light";

      const isLegacy = context.globals.legacy === "true";
      useKdsLegacyMode(isLegacy);
      return story();
    },
  ],
  tags: ["autodocs"],
};

export default preview;
