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
 * Convert a Storybook-style docs source with custom render function
 *  into a Vue SFC string.
 */
export async function convertStoryCodeToSfc(
  inputCode: string,
): Promise<string> {
  const project = new Project({ useInMemoryFileSystem: true });

  const wrapped = `const story = ${inputCode};`;
  const sourceFile = project.createSourceFile("temp.ts", wrapped, {
    overwrite: true,
  });

  const varDecl = sourceFile.getVariableDeclaration("story");
  if (!varDecl) {
    return inputCode;
  }

  const init = varDecl.getInitializer();
  if (!init || init.getKind() !== SyntaxKind.ObjectLiteralExpression) {
    return inputCode;
  }

  const obj = init.asKindOrThrow(SyntaxKind.ObjectLiteralExpression);
  const renderProp = obj.getProperty("render");
  if (!renderProp) {
    return inputCode;
  }

  let renderInit: any = null;

  // render: args => ({ ... })
  if (renderProp.getKind() === SyntaxKind.PropertyAssignment) {
    renderInit = (renderProp as PropertyAssignment).getInitializer();
  }

  // render() { ... }
  if (renderProp.getKind() === SyntaxKind.MethodDeclaration) {
    renderInit = renderProp;
  }

  if (!renderInit) {
    return inputCode;
  }

  // Ensure the initializer is an arrow fn: args => ({...})
  if (
    renderInit.getKind() !== SyntaxKind.ArrowFunction &&
    renderInit.getKind() !== SyntaxKind.MethodDeclaration
  ) {
    return inputCode;
  }

  let returnedObj: any = null;

  // Normalize method -> arrow body for reuse
  const body =
    renderInit.getKind() === SyntaxKind.MethodDeclaration
      ? renderInit.getBodyOrThrow()
      : renderInit.asKindOrThrow(SyntaxKind.ArrowFunction).getBody();

  if (body.getKind() === SyntaxKind.ParenthesizedExpression) {
    returnedObj = body
      .asKindOrThrow(SyntaxKind.ParenthesizedExpression)
      .getExpression();
  } else if (body.getKind() === SyntaxKind.ObjectLiteralExpression) {
    returnedObj = body;
  } else if (body.getKind() === SyntaxKind.Block) {
    const returnStmt = body.getFirstDescendantByKind(
      SyntaxKind.ReturnStatement,
    );
    if (returnStmt) {
      returnedObj = returnStmt.getExpression();
    }
  }

  if (
    !returnedObj ||
    returnedObj.getKind() !== SyntaxKind.ObjectLiteralExpression
  ) {
    return inputCode;
  }

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
      const k = templateInit.getKind();
      if (
        k === SyntaxKind.NoSubstitutionTemplateLiteral ||
        k === SyntaxKind.TemplateExpression
      ) {
        const raw = templateInit.getText();
        templateContent = raw.replace(/^`/, "").replace(/`$/, "");
      } else {
        const raw = templateInit.getText();
        templateContent = raw.replace(/^["']/, "").replace(/["']$/, "");
      }
    }
  }

  // --- Extract setup() ---
  let setupBody = "";
  const setupPropNode = objLiteral.getProperty("setup");
  if (setupPropNode) {
    const kind = setupPropNode.getKind();

    if (kind === SyntaxKind.MethodDeclaration) {
      const method = setupPropNode as MethodDeclaration;
      const bodyText = method.getBodyText();
      if (bodyText) {
        setupBody = bodyText.trim();
      }
    } else if (kind === SyntaxKind.PropertyAssignment) {
      const propAssign = setupPropNode as PropertyAssignment;
      const initializer = propAssign.getInitializer();
      if (initializer) {
        const initKind = initializer.getKind();
        if (
          initKind === SyntaxKind.FunctionExpression ||
          initKind === SyntaxKind.ArrowFunction
        ) {
          const fnBodyNode = initializer.asKindOrThrow(initKind).getBody();
          if (fnBodyNode.getKind() === SyntaxKind.Block) {
            let bodyText = fnBodyNode.getText();
            if (bodyText.startsWith("{") && bodyText.endsWith("}")) {
              bodyText = bodyText.slice(1, -1);
            }
            setupBody = bodyText.trim();
          } else if (
            fnBodyNode.getKind() === SyntaxKind.ParenthesizedExpression ||
            fnBodyNode.getKind() === SyntaxKind.ObjectLiteralExpression
          ) {
            setupBody = fnBodyNode.getText().trim();
          }
        }
      }
    }
  }

  if (!setupBody) {
    const method = objLiteral.getFirstDescendantByKind(
      SyntaxKind.MethodDeclaration,
    );
    if (method && method.getName() === "setup") {
      const bodyText = method.getBodyText();
      if (bodyText) {
        setupBody = bodyText.trim();
      }
    }
  }

  // components
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

  const scriptParts: string[] = [];

  if (componentsText) {
    scriptParts.push(`import ${componentsText} from "${IMPORT_PACKAGE}";`);
  }

  if (setupBody) {
    const returnMatch = setupBody.match(/return\s*{([\s\S]*?)}\s*;?$/);
    if (returnMatch) {
      setupBody = setupBody.replace(/return\s*{[\s\S]*?}\s*;?$/, "").trim();
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
