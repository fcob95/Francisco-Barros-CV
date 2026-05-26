// Wirea core.hooksPath -> .githooks tras `pnpm install` (script `prepare`).
// Cross-platform y fail-safe: si no hay repo git (instalación desde tarball,
// build Docker que copia package.json sin .git, etc.), no rompe el install.
// Se usa Node en vez de un one-liner de shell porque pnpm ejecuta los scripts
// en cmd.exe en Windows, donde `>/dev/null`/`true` no existen.

import { execSync } from "node:child_process";

try {
  execSync("git rev-parse --is-inside-work-tree", { stdio: "ignore" });
} catch {
  // No estamos dentro de un repo git: nada que wirear, salir limpio.
  process.exit(0);
}

try {
  execSync("git config core.hooksPath .githooks", { stdio: "ignore" });
} catch (err) {
  // No abortar el install por esto; avisar y seguir.
  console.warn("[setup-hooks] no se pudo configurar core.hooksPath:", err.message);
}
