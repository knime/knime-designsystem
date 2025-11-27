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

export async function convertStoryCodeToSfc(storyString: string) {
  const project = new Project({ useInMemoryFileSystem: true });

  // Wrap the string so ts-morph can parse it
  const wrapped = `const story = ${storyString};`;

  const sourceFile = project.createSourceFile("story.ts", wrapped);

  const varDecl = sourceFile.getVariableDeclarationOrThrow("story");
  const initializer = varDecl.getInitializerIfKindOrThrow(
    SyntaxKind.ObjectLiteralExpression,
  );

  const renderProp = initializer.getProperty("render") as PropertyAssignment;
  if (!renderProp) {
    throw new Error("No render property found");
  }

  const arrowFn = renderProp.getInitializerIfKindOrThrow(
    SyntaxKind.ArrowFunction,
  );
  let returnedObj: any = null;

  const body = arrowFn.getBody();
  if (body.getKind() === SyntaxKind.ParenthesizedExpression) {
    returnedObj = body
      .asKindOrThrow(SyntaxKind.ParenthesizedExpression)
      .getExpression();
  } else if (body.getKind() === SyntaxKind.Block) {
    const returnStmt = body
      .asKindOrThrow(SyntaxKind.Block)
      .getFirstDescendantByKind(SyntaxKind.ReturnStatement);
    returnedObj = returnStmt?.getExpression();
  }

  if (
    !returnedObj ||
    returnedObj.getKind() !== SyntaxKind.ObjectLiteralExpression
  ) {
    throw new Error("Render does not return an object literal");
  }

  // Extract setup function body
  const setupProp = returnedObj.getProperty("setup") as MethodDeclaration;
  const setupBody = setupProp?.getBodyText() ?? "";

  // Extract template
  const templateProp = returnedObj.getProperty(
    "template",
  ) as PropertyAssignment;
  let templateContent = "";
  if (templateProp) {
    const templateInit = templateProp.getInitializer();
    if (templateInit) {
      templateContent = templateInit.getText().replace(/^`|`$/g, "");
    }
  }

  const sfc = `
<script lang="ts" setup>
${setupBody}
</script>

<template>
${templateContent}
</template>
`;

  const formatted = await prettier.format(sfc, {
    parser: "vue",
    plugins: [
      prettierVue,
      prettierPluginHtml,
      prettierPluginBabel,
      prettierPluginEstree,
    ],
    vueIndentScriptAndStyle: false,
  });

  return formatted;
}
