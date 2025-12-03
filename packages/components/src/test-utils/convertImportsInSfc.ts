import { Project } from "ts-morph";

import { IMPORT_PACKAGE } from "./constants";

export function convertImportsInSfc(vueCode: string) {
  const scriptMatch = vueCode.match(/<script\b([^>]*)>([\s\S]*?)<\/script>/i);

  if (!scriptMatch) {
    return vueCode;
  } // no <script> found

  const fullTag = scriptMatch[0];
  const attrs = scriptMatch[1] || "";
  const scriptContent = scriptMatch[2] || "";

  const project = new Project({
    useInMemoryFileSystem: true,
    compilerOptions: { allowJs: true, checkJs: false },
  });

  const sourceFile = project.createSourceFile("temp.ts", scriptContent, {
    overwrite: true,
  });

  const importDecls = sourceFile.getImportDeclarations();

  // Collect all named imports from the package
  const mergedNamedImports = new Map(); // name -> isType

  for (const imp of importDecls) {
    const moduleSpecifier = imp.getModuleSpecifierValue();

    // Skip non-relative imports (like "vue")
    if (
      !moduleSpecifier.startsWith("./") &&
      !moduleSpecifier.startsWith("../")
    ) {
      continue;
    }

    const isTypeOnly = imp.isTypeOnly();

    // Default import
    const defaultImport = imp.getDefaultImport();
    if (defaultImport) {
      mergedNamedImports.set(defaultImport.getText(), false);
      imp.remove();
      continue;
    }

    // Named imports
    for (const named of imp.getNamedImports()) {
      const name = named.getName();
      mergedNamedImports.set(name, isTypeOnly);
    }

    imp.remove();
  }

  // Create merged import declarations
  const typeImports = [];
  const valueImports = [];

  for (const [name, isType] of mergedNamedImports.entries()) {
    if (isType) {
      typeImports.push(name);
    } else {
      valueImports.push(name);
    }
  }

  if (valueImports.length > 0) {
    sourceFile.addImportDeclaration({
      namedImports: valueImports,
      moduleSpecifier: IMPORT_PACKAGE,
    });
  }

  if (typeImports.length > 0) {
    sourceFile.addImportDeclaration({
      namedImports: typeImports,
      moduleSpecifier: IMPORT_PACKAGE,
      isTypeOnly: true,
    });
  }

  const transformedScript = sourceFile.getFullText();

  const newScriptTag = `<script${attrs}>${transformedScript}</script>`;

  return vueCode.replace(fullTag, newScriptTag);
}
