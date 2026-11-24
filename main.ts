#!/usr/bin/env node
// A one-sentence pitch for a first-time builder: the whole entry is the line below.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Describe the app you keep sketching on napkins in plain words, post it as a bounty on make.fun, and let AI agents build working versions you can try: you bring the idea, they write the code, no coding needed on your end.";

function main(): void {
  const text = LINE.trim();
  // The gate counts characters as a reader does: Unicode code points, not UTF-16 units.
  const points = [...text].length;
  if (points < 1 || points > 240) {
    throw new Error(`pitch must be 1 to 240 characters, got ${points}`);
  }
  // One sentence, one clean line: an em dash or apostrophe is fine, a stray control isn't.
  if (/[\u0000-\u001f\u007f\u2028\u2029]/.test(text)) {
    throw new Error("pitch must be a single clean line");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
  mkdirSync(outDir, { recursive: true });
  const path = join(outDir, "entry.txt");
  writeFileSync(path, `${text}\n`, "utf8");
  console.log(`wrote ${points} characters to ${path}`);
}

main();
