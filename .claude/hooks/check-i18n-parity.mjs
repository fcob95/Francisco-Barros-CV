// PostToolUse Edit|Write — paridad ES/EN en messages/*.json. exit 2 si rota.
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
let input = {};
try {
  input = JSON.parse(readFileSync(0, "utf8") || "{}");
} catch {}
const file = (input.tool_input?.file_path || "").replace(/\\/g, "/");

if (!/messages\/(es|en)\.json$/.test(file)) process.exit(0);

const esP = join(root, "messages", "es.json");
const enP = join(root, "messages", "en.json");
if (!existsSync(esP) || !existsSync(enP)) process.exit(0);

const flat = (o, p = "") =>
  Object.entries(o).flatMap(([k, v]) =>
    v && typeof v === "object" && !Array.isArray(v) ? flat(v, `${p}${k}.`) : [[`${p}${k}`, v]],
  );

let es, en;
try {
  es = JSON.parse(readFileSync(esP, "utf8"));
  en = JSON.parse(readFileSync(enP, "utf8"));
} catch (e) {
  console.error(`[i18n] JSON inválido: ${e.message}`);
  process.exit(2);
}

const esKeys = new Map(flat(es));
const enKeys = new Map(flat(en));
const missingInEn = [...esKeys.keys()].filter((k) => !enKeys.has(k));
const missingInEs = [...enKeys.keys()].filter((k) => !esKeys.has(k));
const emptyEs = [...esKeys].filter(([, v]) => v === "").map(([k]) => k);
const emptyEn = [...enKeys].filter(([, v]) => v === "").map(([k]) => k);

const problems = [];
if (missingInEn.length) problems.push(`Faltan en en.json: ${missingInEn.join(", ")}`);
if (missingInEs.length) problems.push(`Faltan en es.json: ${missingInEs.join(", ")}`);
if (emptyEs.length) problems.push(`Vacías en es.json: ${emptyEs.join(", ")}`);
if (emptyEn.length) problems.push(`Vacías en en.json: ${emptyEn.join(", ")}`);

if (problems.length) {
  console.error(`[i18n] Paridad ES/EN rota:\n- ${problems.join("\n- ")}`);
  process.exit(2);
}
process.exit(0);
