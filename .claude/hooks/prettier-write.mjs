// PostToolUse Edit|Write — formatea el archivo editado (best-effort). exit 0 siempre.
import { readFileSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";

const root = process.cwd();
let input = {};
try {
  input = JSON.parse(readFileSync(0, "utf8") || "{}");
} catch {}
const file = input.tool_input?.file_path || "";

if (!file) process.exit(0);
if (!/\.(ts|tsx|js|jsx|mjs|cjs|json|css|scss|md|mdx|html)$/.test(file)) process.exit(0);
if (!existsSync(join(root, "package.json"))) process.exit(0);

spawnSync("pnpm", ["exec", "prettier", "--write", file], {
  cwd: root,
  encoding: "utf8",
  shell: true,
});
process.exit(0);
