// Stop — corre lint + typecheck + test si existen los scripts. exit 2 si falla. No-op pre-bootstrap.
import { readFileSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";

const root = process.cwd();
const pkgPath = join(root, "package.json");
if (!existsSync(pkgPath)) process.exit(0);

let pkg = {};
try {
  pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
} catch {
  process.exit(0);
}
const scripts = pkg.scripts || {};

const run = (name) =>
  spawnSync("pnpm", [name], { cwd: root, encoding: "utf8", shell: true });

const fails = [];
if (scripts.lint) {
  const r = run("lint");
  if (r.status !== 0) fails.push(`lint:\n${r.stdout || ""}${r.stderr || ""}`);
}
if (scripts.typecheck) {
  const r = run("typecheck");
  if (r.status !== 0) fails.push(`typecheck:\n${r.stdout || ""}${r.stderr || ""}`);
}
if (scripts.test) {
  const r = run("test");
  if (r.status !== 0) fails.push(`test:\n${r.stdout || ""}${r.stderr || ""}`);
}

if (fails.length) {
  console.error(`[stop] Calidad falló:\n${fails.join("\n")}`);
  process.exit(2);
}
process.exit(0);
