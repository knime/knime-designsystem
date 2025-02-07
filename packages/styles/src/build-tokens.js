/* eslint-disable no-console */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { register } from "@tokens-studio/sd-transforms";
import chalk from "chalk";
import { rimraf } from "rimraf";
import StyleDictionary from "style-dictionary";
import {
  commentStyles,
  logBrokenReferenceLevels,
  logVerbosityLevels,
  logWarningLevels,
} from "style-dictionary/enums";
import { fileHeader } from "style-dictionary/utils";

import mergeTokens from "./merge-tokens.js"; // eslint-disable-line import/extensions

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to indent style-dictionary logs
const originalConsole = { ...console }; // Store the original console object
const indentConsole = {
  ...originalConsole,
  log: (message) => originalConsole.log(`    ${message}`),
  warn: (message) => originalConsole.warn(`    ${message}`),
  debug: (message) => originalConsole.debug(`    ${message}`),
  error: (message) => originalConsole.error(`    ${message}`),
  info: (message) => originalConsole.info(`    ${message}`),
};

// Function to remove all contents of the dist folder
const cleanDistFolder = () => {
  const distPath = path.resolve(__dirname, "../dist");
  console.log(chalk.yellow.bgBlack.bold("🧹 Clearing the dist folder...\n"));
  rimraf.sync(distPath);
};

// Register tokens studio transforms
register(StyleDictionary, {
  platform: "css",
  name: "tokens-studio",
  "ts/color/modifiers": {
    format: "hsl", // make sure output format of colors after applying modifiers is hsl
  },
});

/* By default tokens studio includes the 'colors/css' transform, 
in order to keep the original hsl values, we replace the transform in the group */
StyleDictionary.hooks.transformGroups["tokens-studio"] =
  StyleDictionary.hooks.transformGroups["tokens-studio"].map((transform) =>
    transform === "color/css" ? "color/hsl-4" : transform,
  );

// Helpers for @property blocks type and inherits mapping
const defaultLength = { syntax: "<length>", inherits: false };
const typeToCSSPropertyMap = new Map([
  ["border", { syntax: "<string>", inherits: false }], // shorthand border declarations (<border-width> <border-style> <color>)
  ["borderRadius", defaultLength],
  ["borderWidth", defaultLength],
  ["color", { syntax: "<color>", inherits: true }],
  ["dimension", defaultLength],
  ["fontFamily", { syntax: "<string>#", inherits: true }], // covers single or comma-separated font-family names
  ["fontSize", { syntax: "<length>", inherits: true }],
  ["fontWeight", { syntax: "<number>", inherits: true }],
  ["lineHeight", { syntax: "<number> | <percentage>", inherits: true }],
  ["paragraphSpacing", { syntax: "<number>", inherits: false }],
  ["sizing", defaultLength],
  ["spacing", defaultLength],
  ["typography", { syntax: "<string>", inherits: true }], // shorthand font declarations (<font-weight> <font-size>/<line-height> <font-family>)
]);

// Custom CSS format for @property blocks
StyleDictionary.registerFormat({
  name: "css/property-blocks",
  format: async ({ dictionary, file }) => {
    const header = await fileHeader({
      file,
      commentStyle: commentStyles.long,
    });
    const cssProperties = dictionary.allTokens
      .map((token) => {
        let syntax = "*";
        let inherits = false;
        if (token.$type && typeToCSSPropertyMap.has(token.$type)) {
          syntax = typeToCSSPropertyMap.get(token.$type)?.syntax ?? "*";
          inherits = typeToCSSPropertyMap.get(token.$type)?.inherits ?? false;
        } else {
          console.error(`Unknown type for token ${token.name}: ${token.$type}`);
        }
        const initialValue = token.$value;

        return `@property --${token.name} {
  syntax: "${syntax}";
  inherits: ${inherits};
  initial-value: ${initialValue};
}`;
      })
      .join("\n\n");

    return `${header}${cssProperties}`;
  },
});

// Load metadata and themes from external JSON files
const $metadata = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "tokens/$metadata.json"), "utf-8"),
);
const $themes = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "tokens/$themes.json"), "utf-8"),
);

const varPattern = "_variables";
const propsPattern = "_properties";

const run = async () => {
  console.log(chalk.blue.bold("🚀 Starting the generation of tokens..."));
  const configs = $themes.map((theme) => {
    const themeName = theme.name.toLowerCase();
    return {
      metadata: {
        tokenSetOrder: $metadata.tokenSetOrder,
        themes: $themes,
      },
      source: Object.entries(theme.selectedTokenSets)
        .filter(([, val]) => val !== "disabled")
        .map(([tokenset]) => `src/tokens/${tokenset}.json`),
      preprocessors: ["tokens-studio"],
      platforms: {
        css: {
          buildPath: "dist/tokens/css/",
          transformGroup: "tokens-studio",
          transforms: ["name/kebab"],
          files: [
            {
              format: "css/variables", // Standard CSS variables
              destination: `${varPattern}-${themeName}.css`,
            },
            {
              format: "css/property-blocks", // Custom @property blocks
              destination: `${propsPattern}-${themeName}.css`,
            },
          ],
        },
      },
      log: {
        warnings: logWarningLevels.error, // make sure broken references and token collisions are thrown as errors
        verbosity: logVerbosityLevels.verbose,
        errors: {
          brokenReferences: logBrokenReferenceLevels.throw,
        },
      },
    };
  });

  const cleanAndBuild = async (cfg) => {
    const sd = new StyleDictionary(cfg);
    await sd.buildAllPlatforms();
  };
  /* eslint-disable no-global-assign */
  console = indentConsole; // Override console object to indent messages
  try {
    await Promise.all(configs.map(cleanAndBuild));
    console = originalConsole; // Restore original console object
    console.log(chalk.green.bold("✅ Token generation successful!"));
    mergeTokens({
      basePath: path.resolve(__dirname, "../dist/tokens/css"),
      varPattern,
      propsPattern,
    });
  } catch (error) {
    console = originalConsole; // Restore original console object
    /* eslint-enable no-global-assign */
    console.error(
      `\n❌ ${chalk.white.bold.bgRed("Token generation failed:")}\n`,
    ); // error will be logged by process
    throw error; // Rethrow the error to make pipeline fail at this point
  }
};

cleanDistFolder();
run();
