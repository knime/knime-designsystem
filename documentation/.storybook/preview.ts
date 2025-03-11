import { type Preview } from "@storybook/vue3";
import "@knime/kds-styles/kds-variables.css";

// TODO: use roboto provided by the design system? like @knime/kds-styles
const link = document.createElement("link");
link.href =
  "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);

const robotoMonoLink = document.createElement("link");
robotoMonoLink.href =
  "https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;700&display=swap";
robotoMonoLink.rel = "stylesheet";
document.head.appendChild(robotoMonoLink);

const globalStyles = `
  body {
    font-family: var(--kds-core-font-family-roboto);
    font-size: var(--kds-font-base-body-medium);
    color: var(--kds-color-text-and-icon-neutral);
  }
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
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
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
  tags: ["autodocs"],
};

export default preview;
