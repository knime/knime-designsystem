import fs, { rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { styleText } from "node:util";

import consola from "consola";
import { JSDOM } from "jsdom";
import { optimize } from "svgo";

import { svgoConfig } from "./config/svgo.config.js";
import { removeMiterlimit } from "./svgoRemoveMiterlimit.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const processedDirs = [
  { input: "./img/icons", output: "../dist/img/icons", typeName: "IconName" },
  {
    input: "./img/type-icons",
    output: "../dist/img/type-icons",
    typeName: "TypeIconName",
  },
];
let processedCount = 0;

processedDirs.forEach(({ input, output, typeName }) => {
  const inputDir = path.join(__dirname, input);
  const outputDir = path.join(__dirname, output);

  // Remove icons from dist folder
  consola.log(
    styleText(
      ["yellow", "bgBlack", "bold"],
      "🧹 Clearing icons from dist folder...\n",
    ),
  );
  rmSync(outputDir, { recursive: true, force: true });

  consola.log(
    styleText(["blue", "bold"], "🚀 Starting to process SVG icons..."),
  );

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const processSvg = (filePath) => {
    const svgContent = fs.readFileSync(filePath, "utf-8");
    const dom = new JSDOM(svgContent);
    const svg = dom.window.document.querySelector("svg");

    if (!svg) {
      throw new Error(
        `❌ ${styleText(["white", "bold", "bgRed"], `SVG ${filePath} does not contain an SVG element.`)}`,
      );
    }

    // Check width, height, and viewBox
    if (
      svg.getAttribute("width") !== "12" ||
      svg.getAttribute("height") !== "12" ||
      svg.getAttribute("viewBox") !== "0 0 12 12"
    ) {
      throw new Error(
        `❌ ${styleText(["white", "bold", "bgRed"], `SVG ${filePath} does not have the correct dimensions or viewBox.`)}`,
      );
    }

    // Find the first element to use for stroke and fill attribute checks
    const firstElement = svg.querySelector(
      "path, line, circle, rect, ellipse, polygon, polyline",
    );
    if (!firstElement) {
      throw new Error(
        `❌ ${styleText(["white", "bold", "bgRed"], `SVG ${filePath} does not contain a valid element for stroke and fill attributes.`)}`,
      );
    }

    // Copy stroke-related attributes from the first element to the svg element
    const strokeAttributes = [
      "stroke",
      "stroke-width",
      "stroke-linecap",
      "stroke-linejoin",
      "stroke-miterlimit",
      "stroke-dasharray",
      "stroke-dashoffset",
      "stroke-opacity",
    ];

    const fillAttributes = ["fill", "fill-rule", "fill-opacity"];

    strokeAttributes.forEach((attr) => {
      const attrValue = firstElement.getAttribute(attr);
      if (attrValue) {
        svg.setAttribute(attr, attrValue);
      }
    });

    // Ensure fill is set to none and stroke is set to currentColor
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");

    // Remove stroke and fill-related attributes from child elements and set vector-effect
    const elements = svg.querySelectorAll("*");
    elements.forEach((el) => {
      strokeAttributes.forEach((attr) => {
        if (el.hasAttribute(attr)) {
          el.removeAttribute(attr);
        }
      });
      fillAttributes.forEach((attr) => {
        if (el.hasAttribute(attr)) {
          el.setAttribute("stroke-width", "0");
        }
      });
      // This ensures that the stroke is not scaled with an item, so that we can apply distinct values
      el.setAttribute("vector-effect", "non-scaling-stroke");
    });

    // width and height attributes can be removed, as the viewBox defines the aspect ratio and size is set via CSS later
    svg.removeAttribute("width");
    svg.removeAttribute("height");

    const serializedSvg = svg.outerHTML;

    // Optimize SVG with SVGO
    const optimizedSvg = optimize(serializedSvg, {
      ...svgoConfig,
      plugins: [...svgoConfig.plugins, removeMiterlimit],
    });

    const outputFilePath = path.join(outputDir, path.basename(filePath));
    fs.writeFileSync(outputFilePath, optimizedSvg.data, "utf-8");
  };

  const iconNames = [];

  fs.readdirSync(inputDir).forEach((file) => {
    if (path.extname(file) === ".svg") {
      try {
        processSvg(path.join(inputDir, file));
        processedCount++;
        iconNames.push(path.basename(file, ".svg"));
      } catch (error) {
        // @ts-expect-error - ignore missing message property
        consola.error(error.message);
        throw error; // Rethrow the error to make pipeline fail at this point
      }
    }
  });

  const iconListName = `${typeName[0].toLowerCase()}${typeName.slice(1)}s`;
  // Generate def.ts file containing all file names and a union type to use e.g. in the Icon component
  const iconsTsContent = `
export const ${iconListName} = [
  ${iconNames.map((name) => `'${name}'`).join(",\n  ")}
] as const;

export type ${typeName} = typeof ${iconListName}[number];
`;

  fs.writeFileSync(path.join(outputDir, "def.ts"), iconsTsContent, "utf-8");
});

consola.log(
  `✅ ${styleText(["green", "bold"], `Successfully processed ${processedCount} SVG icons!`)}`,
);
