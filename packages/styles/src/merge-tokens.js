/* eslint-disable no-console */
import fs from "node:fs";
import path from "node:path";

import chalk from "chalk";

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

const lightModeLog = chalk.hex("#FFD700").bgYellow;
const darkModeLog = chalk.hex("#ADD8E6").bgHex("#00008B");

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
      const warn = chalk.yellow.bold("WARNING");
      const wrongToken = chalk.yellow.bgGray.dim.italic(
        `${key}: ${lightValue || darkValue}`,
      );
      const message = chalk.yellow(` - Invalid value for ${wrongToken} - `);
      const action = chalk.yellow.bold(
        "The token will be omitted from the output file!",
      );
      console.warn(`🧐 ${warn}${message}${action}`);
      return;
    }

    if (isProperty) {
      const lightInitialValueMatch =
        lightValue && lightValue.match(initialValueRegex);
      const darkInitialValueMatch =
        darkValue && darkValue.match(initialValueRegex);

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
      chalk.blue.bold("\n🔄 Merging light and dark mode tokens...\n"),
    );
    const lightVarsFilePath = path.resolve(basePath, `${varPattern}-light.css`);
    const darkVarsFilePath = path.resolve(basePath, `${varPattern}-dark.css`);
    const outputVarsFilePath = path.resolve(basePath, `${varPattern}.css`);

    const lightPropsFilePath = path.resolve(
      basePath,
      `${propsPattern}-light.css`,
    );
    const darkPropsFilePath = path.resolve(
      basePath,
      `${propsPattern}-dark.css`,
    );
    const outputPropsFilePath = path.resolve(basePath, `${propsPattern}.css`);

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

    const outputCSSVars = `${comment}:root {\n${outputVars.join("\n")}\n}`;
    const outputCSSProps = `${comment}${outputProps.join("\n\n")}`;

    fs.writeFileSync(outputVarsFilePath, outputCSSVars);
    fs.writeFileSync(outputPropsFilePath, outputCSSProps);

    // Remove the original light and dark files
    fs.unlinkSync(lightVarsFilePath);
    fs.unlinkSync(darkVarsFilePath);
    fs.unlinkSync(lightPropsFilePath);
    fs.unlinkSync(darkPropsFilePath);

    console.log(
      chalk.green.bold(
        `\n✅ Successfully merged tokens and created ${varPattern}.css and ${propsPattern}.css files.\n`,
      ),
    );
  } catch (error) {
    console.error(`\n❌ ${chalk.white.bold.bgRed("Error merging tokens:")}\n`); // error will be logged by process
    throw error; // Rethrow the error to make pipeline fail at this point
  }
};

export default mergeTokens;
