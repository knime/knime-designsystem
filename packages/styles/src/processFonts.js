import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { styleText } from "node:util";

import consola from "consola";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VARIABLES_CSS_PATH = path.join(
  __dirname,
  "../dist/tokens/css/_variables.css",
);
const OUTPUT_CSS_PATH = path.join(__dirname, "../dist/css/fonts.css");

consola.log(
  styleText(["blue", "bold"], "🔍 Analyzing font tokens in _variables.css..."),
);

// Read the _variables.css file
const variablesContent = fs.readFileSync(VARIABLES_CSS_PATH, "utf-8");

// Extract all font shorthand values
const fontShorthandRegex = /--kds-font-[^:]+:\s*([^;]+);/g;
const fontValues = new Set();

let match;
while ((match = fontShorthandRegex.exec(variablesContent)) !== null) {
  fontValues.add(match[1].trim());
}

// Parse font shorthand to extract font families and weights
const fontRequirements = new Map();

fontValues.forEach((fontValue) => {
  // Font shorthand format: [font-style] [font-weight] font-size/line-height font-family
  // Example: "normal 400 14px/20px Roboto, sans-serif"
  const parts = fontValue.split(/\s+/);

  let fontWeight = "400";
  let fontStyle = "normal";
  let fontFamily = "";

  // Parse the shorthand
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    // Check for font-style (italic, oblique, normal)
    if (["italic", "oblique"].includes(part)) {
      fontStyle = part;
    }
    // Check for font-weight (numeric or keyword)
    else if (/^\d{3}$/.test(part) || ["bold", "normal"].includes(part)) {
      if (part === "bold") {
        fontWeight = "700";
      } else if (part === "normal") {
        fontWeight = "400";
      } else {
        fontWeight = part;
      }
    }
    // Check for font-family (comes after size/line-height)
    else if (part.includes("/")) {
      // Next parts are font-family
      fontFamily = parts
        .slice(i + 1)
        .join(" ")
        .replace(/,.*$/, "")
        .trim()
        .replace(/['"]/g, "");
      break;
    }
  }

  if (fontFamily) {
    // Normalize font family name to package name
    const packageName = fontFamily.toLowerCase().replace(/\s+/g, "-");

    if (!fontRequirements.has(packageName)) {
      fontRequirements.set(packageName, new Set());
    }

    const variant =
      fontStyle === "italic" ? `${fontWeight}-italic` : fontWeight;
    fontRequirements.get(packageName).add(variant);
  }
});

// Sort font requirements for consistent output
const sortedFonts = Array.from(fontRequirements.entries()).sort(([a], [b]) =>
  a.localeCompare(b),
);

// Generate CSS imports
const imports = [];
imports.push("/**");
imports.push(
  " * Auto-generated font imports based on design tokens in _variables.css",
);
imports.push(
  " * DO NOT EDIT MANUALLY - Run `pnpm build:fonts` to regenerate this file",
);
imports.push(" */");
imports.push("");

sortedFonts.forEach(([fontFamily, variants]) => {
  const sortedVariants = Array.from(variants).sort((a, b) => {
    // Extract weight number for sorting
    const weightA = parseInt(a.split("-")[0], 10);
    const weightB = parseInt(b.split("-")[0], 10);
    if (weightA !== weightB) {
      return weightA - weightB;
    }
    // If same weight, non-italic comes first
    return a.includes("italic") ? 1 : -1;
  });

  imports.push(`/* ${fontFamily} */`);
  sortedVariants.forEach((variant) => {
    imports.push(`@import "@fontsource/${fontFamily}/${variant}.css";`);
  });
  imports.push("");
});

// Ensure output directory exists
const outputDir = path.dirname(OUTPUT_CSS_PATH);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write the fonts.css file to dist
const outputContent = imports.join("\n");
fs.writeFileSync(OUTPUT_CSS_PATH, outputContent, "utf-8");

consola.log(
  `✅ ${styleText(["green", "bold"], "Successfully generated fonts.css with imports for:")}`,
);
sortedFonts.forEach(([fontFamily, variants]) => {
  consola.log(
    `   ${styleText(["cyan"], fontFamily)}: ${Array.from(variants).sort().join(", ")}`,
  );
});
