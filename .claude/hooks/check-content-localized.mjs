// PostToolUse Edit|Write — heurística de balance {es,en} en content/**. exit 2 si desbalance claro.
import { readFileSync, existsSync } from "node:fs";

let input = {};
try {
  input = JSON.parse(readFileSync(0, "utf8") || "{}");
} catch {}
const raw = input.tool_input?.file_path || "";
const file = raw.replace(/\\/g, "/");

if (!/\/content\/.*\.(ts|tsx)$/.test(file)) process.exit(0);
if (!existsSync(raw)) process.exit(0);

const src = readFileSync(raw, "utf8");
const es = (src.match(/\bes\s*:/g) || []).length;
const en = (src.match(/\ben\s*:/g) || []).length;

if (es > 0 && es !== en) {
  console.error(
    `[content] Posible campo localizable desbalanceado en ${file}: ${es} 'es:' vs ${en} 'en:'. ` +
      `Cada campo localizable debe tener ambos { es, en }.`,
  );
  process.exit(2);
}
process.exit(0);
