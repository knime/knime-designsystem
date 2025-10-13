import { create } from "storybook/theming/create";

// @ts-expect-error - ignore missing types
import KNIMELogo from "@knime/styles/img/KNIME_Logo_gray.svg";

function getCssVariable(variable: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();
}

function getColorForTheme(color: string, theme: "light" | "dark"): string {
  const lightDarkRegex = /light-dark\(([^,]+),\s*([^)]+)\)/;
  const match = color.match(lightDarkRegex);

  if (match) {
    const lightColor = match[1].trim();
    const darkColor = `${match[2].trim()})`;
    return theme === "light" ? lightColor : darkColor;
  }
  return color;
}

export default function knimeTheme(theme: "light" | "dark") {
  return create({
    base: theme,
    // Typography
    fontBase: `${getCssVariable("--kds-core-font-family-roboto")}, sans-serif`,
    fontCode: `${getCssVariable("--kds-core-font-family-roboto-condensed")}, monospace`,

    brandTitle: "KNIME Design System",
    brandUrl: "https://knime.com",
    brandImage: KNIMELogo,
    brandTarget: "_self",

    // Colors
    colorPrimary: getColorForTheme(
      getCssVariable("--kds-color-background-primary-bold-initial"),
      theme,
    ),
    colorSecondary: getColorForTheme(
      getCssVariable("--kds-color-background-neutral-bold-initial"),
      theme,
    ),

    // UI
    appBg: getColorForTheme(
      getCssVariable("--kds-color-background-page-default"),
      theme,
    ),
    appContentBg: getColorForTheme(
      getCssVariable("--kds-color-background-page-default"),
      theme,
    ),
    appPreviewBg: getColorForTheme(
      getCssVariable("--kds-color-background-page-default"),
      theme,
    ),
    appBorderColor: getColorForTheme(
      getCssVariable("--kds-color-border-neutral"),
      theme,
    ),
    appBorderRadius: parseInt(
      getCssVariable("--kds-border-radius-container-0-25x"),
      10,
    ),

    // Text colors
    textColor: getColorForTheme(
      getCssVariable("--kds-color-text-and-icon-neutral"),
      theme,
    ),
    textInverseColor: getColorForTheme(
      getCssVariable("--kds-color-text-and-icon-neutral-inverted"),
      theme,
    ),

    // Toolbar default and active colors
    barTextColor: getColorForTheme(
      getCssVariable("--kds-color-text-and-icon-muted"),
      theme,
    ),
    barSelectedColor: getColorForTheme(
      getCssVariable("--kds-color-text-and-icon-selected"),
      theme,
    ),
    barHoverColor: getColorForTheme(
      getCssVariable("--kds-color-text-and-icon-selected"),
      theme,
    ),
    barBg: getColorForTheme(
      getCssVariable("--kds-color-background-page-default"),
      theme,
    ),

    // Form colors
    inputBg: getColorForTheme(
      getCssVariable("--kds-color-background-page-default"),
      theme,
    ),
    inputBorder: getColorForTheme(
      getCssVariable("--kds-color-border-input"),
      theme,
    ),
    inputTextColor: getColorForTheme(
      getCssVariable("--kds-color-text-and-icon-neutral"),
      theme,
    ),
    inputBorderRadius: parseInt(
      getCssVariable("--kds-border-radius-container-0-12x"),
      10,
    ),

    // Additional options
    textMutedColor: getColorForTheme(
      getCssVariable("--kds-color-text-and-icon-muted"),
      theme,
    ),
    booleanBg: getColorForTheme(
      getCssVariable("--kds-color-background-neutral-initial"),
      theme,
    ),
    booleanSelectedBg: getColorForTheme(
      getCssVariable("--kds-color-background-selected-initial"),
      theme,
    ),
    buttonBg: getColorForTheme(
      getCssVariable("--kds-color-background-primary-bold-initial"),
      theme,
    ),
    buttonBorder: getColorForTheme(
      getCssVariable("--kds-color-border-primary"),
      theme,
    ),
    gridCellSize: parseInt(getCssVariable("--kds-spacing-container-0-25x"), 10),
  });
}
