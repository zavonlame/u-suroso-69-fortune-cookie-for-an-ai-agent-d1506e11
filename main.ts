// Fortune Cookie for an AI Agent — one line, written to /output/entry.txt.
// The fortune itself is embedded here as a literal: the grader runs this
// program against the GitHub repo only, so it must not read any other file.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const FORTUNE =
  "You will meet your maker. They will ask for a refund.";

// Gate from the kit: entry.txt must be UTF-8 text of 1 to 140 characters,
// not only whitespace.
const GATE_MIN = 1;
const GATE_MAX = 140;

function fortuneIsValid(text) {
  // Count Unicode code points, not UTF-16 units, so the gate matches the
  // scorer's character count.
  const chars = [...text].length;
  if (chars < GATE_MIN || chars > GATE_MAX) return false;
  return text.trim().length > 0;
}

function outputDir() {
  return process.env.MAKEFUN_OUTPUT_DIR || "/output";
}

function main() {
  if (!fortuneIsValid(FORTUNE)) {
    throw new Error("fortune fails the 1-140 character gate");
  }
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), FORTUNE, "utf8");
}

main();
