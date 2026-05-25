// PostToolUse Edit|Write — typecheck tras editar .ts/.tsx. exit 2 si falla (feedback a Claude).
import { readFileSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";

const root = process.cwd();
let input = {};
try {
  input = JSON.parse(readFileSync(0, "utf8") || "{}");
} catch {}
const file = input.tool_input?.file_path || "";

if (!/\.(ts|tsx)$/.test(file)) process.exit(0);
if (!existsSync(join(root, "package.json")) || !existsSync(join(root, "tsconfig.json"))) {
  process.exit(0);
}

const res = spawnSync("pnpm", ["exec", "tsc", "--noEmit"], {
  cwd: root,
  encoding: "utf8",
  shell: true,
});

if (res.status !== 0) {
  console.error(
    `[typecheck] tsc --noEmit falló tras editar ${file}:\n${res.stdout || ""}${res.stderr || ""}`,
  );
  process.exit(2);
}
process.exit(0);
