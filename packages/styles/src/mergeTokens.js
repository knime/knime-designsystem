/* eslint-disable no-console */
import fs from "node:fs";
import path from "node:path";
import { styleText } from "node:util";

const parseCSSVariables = (cssContent) => {
  const regex = /--([\w-]+):\s*([^;]+);/g;
  const variables = {};
  let match;
  while ((match = regex.exec(cssContent)) !== null) {
    variables[`--${match[1]}`] = match[2].trim();
  }
  return variables;
};

const parseCSSProperties = (cssContent) => {
  const regex = /@property\s+--([\w-]+)\s*{([^}]*)}/g;
  const properties = {};
  let match;
  while ((match = regex.exec(cssContent)) !== null) {
    properties[`--${match[1]}`] = match[2].trim();
  }
  return properties;
};

const filterLegacyVariables = (variables) => {
  const filtered = {};

  Object.entries(variables).forEach(([key, value]) => {
    // Only keep color related overrides for legacy theme
    if (!key.startsWith("--kds-core") && value.includes("hsl(")) {
      filtered[key] = value;
    }
  });

  return filtered;
};

const lightModeLog = (text) => styleText(["bgYellow"], text);
const darkModeLog = (text) => styleText(["bgBlue"], text);

const hslRegex = /hsl\([^)]+\)/g;
const initialValueRegex = /initial-value:\s*([^;]+);/;

const mergeValues = (lightValue, darkValue) => {
  if (lightValue === darkValue) {
    return lightValue;
  } else if (lightValue && darkValue) {
    const lightHSLMatches = lightValue.match(hslRegex);
    const darkHSLMatches = darkValue.match(hslRegex);
    if (
      lightHSLMatches &&
      darkHSLMatches &&
      lightHSLMatches.length === darkHSLMatches.length
    ) {
      let mergedValue = lightValue;
      lightHSLMatches.forEach((lightHSL, index) => {
        const darkHSL = darkHSLMatches[index];
        mergedValue = mergedValue.replace(
          lightHSL,
          `light-dark(${lightHSL}, ${darkHSL})`,
        );
      });
      return mergedValue;
    } else {
      return `light-dark(${lightValue}, ${darkValue})`;
    }
  } else {
    return lightValue || darkValue;
  }
};

const mergeInitialValues = (lightValue, darkValue) => {
  const lightInitialValueMatch = lightValue.match(initialValueRegex);
  const darkInitialValueMatch = darkValue.match(initialValueRegex);

  if (lightInitialValueMatch && darkInitialValueMatch) {
    const lightInitialValue = lightInitialValueMatch[1].trim();
    const darkInitialValue = darkInitialValueMatch[1].trim();
    const mergedInitialValue = mergeValues(lightInitialValue, darkInitialValue);
    return lightValue.replace(
      initialValueRegex,
      `initial-value: ${mergedInitialValue};`,
    );
  } else {
    return `${lightValue}\n/* Dark mode value: ${darkValue} */`;
  }
};

const isValidValue = (value) => {
  return value && value !== "#";
};

const processKeys = ({
  allKeys,
  lightValues,
  darkValues,
  output,
  isProperty = false,
}) => {
  allKeys.forEach((key) => {
    const lightValue = lightValues[key];
    const darkValue = darkValues[key];

    if (!isValidValue(lightValue) && !isValidValue(darkValue)) {
      const warn = styleText(["yellow", "bold"], "WARNING");

      const wrongToken = styleText(
        ["yellow", "bgGray", "dim", "italic"],
        `${key}: ${lightValue || darkValue}`,
      );
      const message = styleText(
        ["yellow"],
        ` - Invalid value for ${wrongToken} - `,
      );
      const action = styleText(
        ["yellow", "bold"],
        "The token will be omitted from the output file!",
      );
      console.warn(`🧐 ${warn}${message}${action}`);
      return;
    }

    if (isProperty) {
      const lightInitialValueMatch = lightValue?.match(initialValueRegex);
      const darkInitialValueMatch = darkValue?.match(initialValueRegex);

      if (
        (lightInitialValueMatch && !isValidValue(lightInitialValueMatch[1])) ||
        (darkInitialValueMatch && !isValidValue(darkInitialValueMatch[1]))
      ) {
        // Should be already logged for variables, just omit
        return;
      }

      if (lightValue === darkValue) {
        output.push(`@property ${key} {\n${lightValue}\n}`);
      } else if (lightValue && darkValue) {
        const mergedValue = mergeInitialValues(lightValue, darkValue);
        output.push(`@property ${key} {\n${mergedValue}\n}`);
      } else {
        output.push(`@property ${key} {\n${lightValue || darkValue}\n}`);
      }
    } else {
      const mergedValue = mergeValues(lightValue, darkValue);
      output.push(`  ${key}: ${mergedValue};`);
    }
  });
};

const mergeTokens = ({ basePath, varPattern, propsPattern }) => {
  try {
    console.log(
      styleText(
        ["blue", "bold"],
        "\n🔄 Merging light and dark mode tokens...\n",
      ),
    );
    const lightVarsFilePath = path.resolve(basePath, `${varPattern}-light.css`);
    const darkVarsFilePath = path.resolve(basePath, `${varPattern}-dark.css`);
    const legacyVarsFilePath = path.resolve(
      basePath,
      `${varPattern}-knime-legacy.css`,
    );
    const outputVarsFilePath = path.resolve(basePath, `${varPattern}.css`);
    const outputLegacyVarsFilePath = path.resolve(
      basePath,
      `${varPattern}-legacy.css`,
    );

    const lightPropsFilePath = path.resolve(
      basePath,
      `${propsPattern}-light.css`,
    );
    const darkPropsFilePath = path.resolve(
      basePath,
      `${propsPattern}-dark.css`,
    );
    const legacyPropsFilePath = path.resolve(
      basePath,
      `${propsPattern}-knime-legacy.css`,
    );
    const outputPropsFilePath = path.resolve(basePath, `${propsPattern}.css`);
    const outputLegacyPropsFilePath = path.resolve(
      basePath,
      `${propsPattern}-legacy.css`,
    );

    console.log(`🌞 ${lightModeLog("Processing light mode tokens...")}`);
    const lightVars = parseCSSVariables(
      fs.readFileSync(lightVarsFilePath, "utf-8"),
    );
    const lightProps = parseCSSProperties(
      fs.readFileSync(lightPropsFilePath, "utf-8"),
    );

    console.log(`🌜 ${darkModeLog("Processing dark mode tokens...")}`);
    const darkVars = parseCSSVariables(
      fs.readFileSync(darkVarsFilePath, "utf-8"),
    );
    const darkProps = parseCSSProperties(
      fs.readFileSync(darkPropsFilePath, "utf-8"),
    );

    // Process legacy tokens
    console.log(`🏛️ ${styleText(["yellow"], "Processing legacy tokens...")}`);
    const legacyVarsRaw = parseCSSVariables(
      fs.readFileSync(legacyVarsFilePath, "utf-8"),
    );
    const legacyPropsRaw = parseCSSProperties(
      fs.readFileSync(legacyPropsFilePath, "utf-8"),
    );

    // Filter legacy variables (only color tokens, exclude --kds-core)
    const legacyVars = filterLegacyVariables(legacyVarsRaw);
    const legacyProps = filterLegacyVariables(legacyPropsRaw);

    console.log(
      `🏛️ ${styleText(["yellow"], `Filtered ${Object.keys(legacyVars).length} legacy color variables from ${Object.keys(legacyVarsRaw).length} total variables`)}`,
    );

    const uniqueToLightVars = Object.keys(lightVars).filter(
      (key) => !(key in darkVars),
    );
    const uniqueToDarkVars = Object.keys(darkVars).filter(
      (key) => !(key in lightVars),
    );

    const warnMessage =
      "They will be written with a single value into merged file. Check output file if this is the intended behavior.\n";
    if (uniqueToLightVars.length > 0) {
      console.warn(
        `\n🌞 ${lightModeLog(
          "WARNING - The following tokens were only present in light mode:",
        )}`,
      );
      uniqueToLightVars.forEach((token) => {
        console.warn(`   ${lightModeLog(token)}`);
      });
      console.warn(`🧐 ${lightModeLog(warnMessage)}`);
    }

    if (uniqueToDarkVars.length > 0) {
      console.warn(
        `\n🌜 ${darkModeLog(
          "WARNING - The following tokens were only present in dark mode:",
        )}`,
      );
      uniqueToDarkVars.forEach((token) => {
        console.warn(`   ${darkModeLog(token)}`);
      });
      console.warn(`🧐 ${darkModeLog(warnMessage)}`);
    }

    const allVarKeys = new Set([
      ...Object.keys(lightVars),
      ...Object.keys(darkVars),
    ]);
    const allPropKeys = new Set([
      ...Object.keys(lightProps),
      ...Object.keys(darkProps),
    ]);
    const outputVars = [];
    const outputProps = [];

    processKeys({
      allKeys: allVarKeys,
      lightValues: lightVars,
      darkValues: darkVars,
      output: outputVars,
    });
    processKeys({
      allKeys: allPropKeys,
      lightValues: lightProps,
      darkValues: darkProps,
      output: outputProps,
      isProperty: true,
    });

    const comment = `/**
 * Do not edit directly, this file was auto-generated.
 */\n\n`;

    /* The selector for the variables needs to also include :host if it is supposed to be imported in shadow dom.
       This can be removed again, once variables are imported on top level only. Also the use of shadow dom can be re-evaluated once the design system is rolled out everywhere */
    const outputCSSVars = `${comment}:root, :host {\n${outputVars.join("\n")}\n}`;
    const outputCSSProps = `${comment}${outputProps.join("\n\n")}`;

    const legacyVarsOutput = Object.entries(legacyVars)
      .map(([key, value]) => `  ${key}: ${value};`)
      .join("\n");
    const legacyPropsOutput = Object.entries(legacyProps)
      .map(([key, value]) => `@property ${key} {\n${value}\n}`)
      .join("\n\n");

    const outputLegacyCSSVars = `${comment}:root.kds-legacy, :host.kds-legacy {\n${legacyVarsOutput}\n}`;
    const outputLegacyCSSProps = `${comment}${legacyPropsOutput}`;

    fs.writeFileSync(outputVarsFilePath, outputCSSVars);
    fs.writeFileSync(outputPropsFilePath, outputCSSProps);
    fs.writeFileSync(outputLegacyVarsFilePath, outputLegacyCSSVars);
    fs.writeFileSync(outputLegacyPropsFilePath, outputLegacyCSSProps);

    // Remove the original light and dark files
    fs.unlinkSync(lightVarsFilePath);
    fs.unlinkSync(darkVarsFilePath);
    fs.unlinkSync(legacyVarsFilePath);
    fs.unlinkSync(lightPropsFilePath);
    fs.unlinkSync(darkPropsFilePath);
    fs.unlinkSync(legacyPropsFilePath);

    console.log(
      styleText(
        ["green", "bold"],
        "\n✅ Successfully merged light/dark tokens and created separate legacy files:\n" +
          `   - ${varPattern}.css and ${propsPattern}.css (light/dark merged)\n` +
          `   - ${varPattern}-legacy.css and ${propsPattern}-legacy.css (filtered legacy)\n`,
      ),
    );
  } catch (error) {
    console.error(
      `\n❌ ${styleText(["white", "bold", "bgRed"], "Error merging tokens:")}\n`,
    ); // error will be logged by process
    throw error; // Rethrow the error to make pipeline fail at this point
  }
};

export default mergeTokens;
