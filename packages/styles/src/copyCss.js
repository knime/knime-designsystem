import { cpSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const srcDir = resolve(__dirname, "css");
const destDir = resolve(__dirname, "../dist/css");

rmSync(destDir, { recursive: true, force: true });
cpSync(srcDir, destDir, { recursive: true });
