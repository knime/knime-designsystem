import { type Preview } from "@storybook/vue3-vite";

import "@knime/kds-styles/index.css";
import "@knime/kds-styles/kds-legacy-theme.css";
import {
  useKdsDarkMode,
  useKdsLegacyMode,
} from "../../packages/components/src/util";

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
    docs: {
      codePanel: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      options: {
        light: {
          name: "Light",
          value: "hsl(0 0% 98%)",
        } /* would use the design token but it also needed as SVG property and there it doesn't work */,
        dark: { name: "Dark", value: "hsl(0 0% 16%)" },
      },
    },
    options: {
      storySort: {
        order: [
          "KNIME Design System",
          "Introduction",
          "Core Concepts",
          "Components",
          "Composite Components",
          "Full Layouts and Pages",
          "Styling and Theming",
        ],
      },
    },
  },
  decorators: [
    (story, context) => {
      const isDark = context.globals.backgrounds?.value === "dark";
      useKdsDarkMode().currentMode.value = isDark ? "dark" : "light";

      const isLegacy = context.globals.legacy === "true";
      useKdsLegacyMode(isLegacy);
      return story();
    },
  ],
  tags: ["autodocs"],
};

export default preview;
