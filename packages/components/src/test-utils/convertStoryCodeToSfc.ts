/* eslint-disable complexity */
import prettierPluginBabel from "prettier/plugins/babel";
import prettierPluginEstree from "prettier/plugins/estree";
import prettierPluginHtml from "prettier/plugins/html";
import prettier from "prettier/standalone";
// @ts-expect-error no types for this plugin
import prettierVue from "prettier-plugin-vue";
import {
  MethodDeclaration,
  Project,
  PropertyAssignment,
  SyntaxKind,
} from "ts-morph";

import { IMPORT_PACKAGE } from "./constants";

/**
 * Convert a Storybook-style render arrow function (as a string)
 * into a Vue SFC string. Robustly handles:
 *  - (args) => ({ ... })
 *  - (args) => { return { ... } }
 *  - setup defined as a MethodDeclaration or as a property with a FunctionExpression
 */
export async function convertStoryCodeToSfc(
  inputCode: string,
): Promise<string> {
  const project = new Project({ useInMemoryFileSystem: true });

  // Wrap so ts-morph can parse a raw arrow function or object literal reliably
  const wrapped = `const render = ${inputCode};`;
  const sourceFile = project.createSourceFile("temp.ts", wrapped, {
    overwrite: true,
  });

  // Get the "render" variable and its initializer
  const varDecl = sourceFile.getVariableDeclaration("render");
  if (!varDecl) {
    // fallback: try to find first arrow function but prefer to return the input unchanged
    return inputCode;
  }

  const init = varDecl.getInitializer();
  if (!init || init.getKind() !== SyntaxKind.ArrowFunction) {
    return inputCode;
  }

  const arrowFn = init; // ArrowFunction
  // Determine the returned object expression (supports parenthesized, direct object, or block+return)
  let returnedObj: any = null;
  const body = arrowFn.asKindOrThrow(SyntaxKind.ArrowFunction).getBody();

  if (body.getKind() === SyntaxKind.ParenthesizedExpression) {
    returnedObj = body
      .asKindOrThrow(SyntaxKind.ParenthesizedExpression)
      .getExpression();
  } else if (body.getKind() === SyntaxKind.ObjectLiteralExpression) {
    returnedObj = body;
  } else if (body.getKind() === SyntaxKind.Block) {
    // look for `return { ... }`
    const returnStmt = body
      .asKindOrThrow(SyntaxKind.Block)
      .getFirstDescendantByKind(SyntaxKind.ReturnStatement);
    if (returnStmt) {
      returnedObj = returnStmt.getExpression();
    }
  }

  if (
    !returnedObj ||
    returnedObj.getKind() !== SyntaxKind.ObjectLiteralExpression
  ) {
    // nothing we can do — return inputCode
    return inputCode;
  }

  // Now returnedObj is an ObjectLiteralExpression representing the object inside render(...)
  const objLiteral = returnedObj;

  // --- Extract template ---
  let templateContent = "";
  const templatePropNode = objLiteral.getProperty("template");
  if (
    templatePropNode &&
    templatePropNode.getKind() === SyntaxKind.PropertyAssignment
  ) {
    const templateAssign = templatePropNode as PropertyAssignment;
    const templateInit = templateAssign.getInitializer();
    if (templateInit) {
      // Handle NoSubstitutionTemplateLiteral, TemplateExpression, or normal string literal
      const k = templateInit.getKind();
      if (
        k === SyntaxKind.NoSubstitutionTemplateLiteral ||
        k === SyntaxKind.TemplateExpression
      ) {
        // getText() includes backticks, remove them
        const raw = templateInit.getText();
        templateContent = raw.replace(/^`/, "").replace(/`$/, "");
      } else {
        // possibly a regular string literal, remove quotes
        const raw = templateInit.getText();
        templateContent = raw.replace(/^["']/, "").replace(/["']$/, "");
      }
    }
  }

  // --- Extract setup() body ---
  let setupBody = "";

  const setupPropNode = objLiteral.getProperty("setup");
  if (setupPropNode) {
    const kind = setupPropNode.getKind();

    // Case 1: setup() { ... }  -> MethodDeclaration
    if (kind === SyntaxKind.MethodDeclaration) {
      const method = setupPropNode as MethodDeclaration;
      const bodyText = method.getBodyText(); // returns inner text (without outer braces)
      if (bodyText) {
        setupBody = bodyText.trim();
      }
    } else if (kind === SyntaxKind.PropertyAssignment) {
      // Case 2: setup: function() { ... }  OR setup: () => { ... } OR setup: function setup() { ... }
      const propAssign = setupPropNode as PropertyAssignment;
      const initializer = propAssign.getInitializer();
      if (initializer) {
        const initKind = initializer.getKind();
        if (
          initKind === SyntaxKind.FunctionExpression ||
          initKind === SyntaxKind.ArrowFunction
        ) {
          // get the body of the function
          const fnBodyNode = initializer.asKindOrThrow(initKind).getBody();
          if (fnBodyNode.getKind() === SyntaxKind.Block) {
            // getText() returns body with braces; getBodyText() is not available on every node, so strip braces
            let bodyText = fnBodyNode.getText();
            // remove surrounding braces
            if (bodyText.startsWith("{") && bodyText.endsWith("}")) {
              bodyText = bodyText.slice(1, -1);
            }
            setupBody = bodyText.trim();
          } else if (
            fnBodyNode.getKind() === SyntaxKind.ParenthesizedExpression ||
            fnBodyNode.getKind() === SyntaxKind.ObjectLiteralExpression
          ) {
            // arrow function directly returning an object (unlikely for setup, but handle)
            setupBody = fnBodyNode.getText().trim();
          }
        }
      }
    } else {
      // other kinds (shorthand etc.) — ignore
    }
  }

  // If still empty, try to search within returnedObj for any MethodDeclaration named "setup" (fallback)
  if (!setupBody) {
    const method = objLiteral.getFirstDescendantByKind(
      SyntaxKind.MethodDeclaration,
    );
    if (method && method.getName && method.getName() === "setup") {
      const bodyText = method.getBodyText();
      if (bodyText) {
        setupBody = bodyText.trim();
      }
    }
  }

  // --- Extract components (optional) ---
  let componentsText = "";
  const componentsPropNode = objLiteral.getProperty("components");
  if (
    componentsPropNode &&
    componentsPropNode.getKind() === SyntaxKind.PropertyAssignment
  ) {
    const compAssign = componentsPropNode as PropertyAssignment;
    const compInit = compAssign.getInitializer();
    if (compInit && compInit.getKind() === SyntaxKind.ObjectLiteralExpression) {
      componentsText = compInit.getText();
    }
  }

  // Build SFC
  const scriptParts: string[] = [];

  if (componentsText) {
    scriptParts.push(`import ${componentsText} from "${IMPORT_PACKAGE}";`);
  }

  if (setupBody) {
    // The extracted setupBody may contain `return { ... }` — strip a trailing "return { ... };" if present,
    // because in <script setup> you want local variables, not a returned object. We'll extract returned names.
    const returnMatch = setupBody.match(/return\s*{([\s\S]*?)}\s*;?$/);
    if (returnMatch) {
      // remove the return statement from setupBody
      setupBody = setupBody.replace(/return\s*{[\s\S]*?}\s*;?$/, "").trim();

      // ensure the returned identifiers remain as variables in the <script setup> scope
      // (they already are declared above in setupBody, so nothing more to do)
      // but if some projects want to export props from args, that's a separate enhancement
    }
    scriptParts.push(setupBody);
  }

  const script = scriptParts.join("\n\n").trim();

  const sfcTemplate = `<template>
${templateContent}
</template>
`;

  const formattedScript = await prettier.format(script, {
    parser: "babel",
    plugins: [prettierPluginBabel, prettierPluginEstree],
  });

  const sfcScript = `<script lang="ts" setup>
${formattedScript}
</script>`;

  const sfc =
    formattedScript.trim().length > 0
      ? `${sfcScript}\n\n${sfcTemplate}`
      : sfcTemplate;

  const formatted = await prettier.format(sfc, {
    parser: "vue",
    plugins: [
      prettierVue,
      prettierPluginHtml,
      prettierPluginBabel,
      prettierPluginEstree,
    ],
    embeddedLanguageFormatting: "auto",
    vueIndentScriptAndStyle: false,
  });

  return formatted;
}
