// SubagentStop — loguea término de subagente en .claude/logs/subagents.log. exit 0 siempre.
import { readFileSync, appendFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
let input = {};
try {
  input = JSON.parse(readFileSync(0, "utf8") || "{}");
} catch {}

const dir = join(root, ".claude", "logs");
try {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const line = `${new Date().toISOString()} subagent_stop session=${input.session_id || "?"}\n`;
  appendFileSync(join(dir, "subagents.log"), line);
} catch {}
process.exit(0);
