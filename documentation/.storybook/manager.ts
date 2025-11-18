import { addons } from "storybook/manager-api";

import knimeTheme from "./knimeTheme";
import "@knime/kds-styles/fonts.css";
import "@knime/kds-styles/kds-variables.css";

const lightTheme = knimeTheme("light");

addons.setConfig({
  theme: lightTheme,
});
