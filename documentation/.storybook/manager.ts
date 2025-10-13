import { addons } from "storybook/manager-api";

import knimeTheme from "./knimeTheme";
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

const lightTheme = knimeTheme("light");

addons.setConfig({
  theme: lightTheme,
});
