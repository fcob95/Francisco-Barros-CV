// PostToolUse Edit|Write — detecta texto JSX hardcodeado en components/sections/**. exit 2 advisory.
import { readFileSync, existsSync } from "node:fs";

let input = {};
try {
  input = JSON.parse(readFileSync(0, "utf8") || "{}");
} catch {}
const raw = input.tool_input?.file_path || "";
const file = raw.replace(/\\/g, "/");

if (!/\/components\/sections\/.*\.(tsx|jsx)$/.test(file)) process.exit(0);
if (!existsSync(raw)) process.exit(0);

const src = readFileSync(raw, "utf8");
const lines = src.split(/\r?\n/);
// Texto entre tags con letras (incluye acentos/ñ), excluyendo líneas con {expresiones} o t( ).
const re = />\s*([A-Za-zÁÉÍÓÚÑáéíóúñ][A-Za-zÁÉÍÓÚÑáéíóúñ ,.;:!?'’\-]{2,})\s*</;
const hits = [];
lines.forEach((l, i) => {
  if (re.test(l) && !/[{}]/.test(l) && !/\bt\(/.test(l)) {
    hits.push(`${file}:${i + 1}: ${l.trim()}`);
  }
});

if (hits.length) {
  console.error(
    `[sections] Posibles strings hardcodeados (mover a messages/*.json vía t("key")):\n${hits.join("\n")}`,
  );
  process.exit(2);
}
process.exit(0);
