// Worst AI Advice — one tight line of deliberately terrible AI advice.
// Writes the line to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

// Candidate lines considered (judge brief: worst advice, funny on first
// read, tight, sounds like an AI assistant, concrete):
// 1. "To save battery, delete System32 — your laptop will run lighter without it."
//    — rejected: well-worn meme, not fresh.
// 2. "If your phone overheats, put it in the freezer for 20 minutes to cool the battery."
//    — rejected: funny but reads like a prank, not an assistant's advice.
// 3. "For a faster computer, download more RAM from any website that offers it free."
//    — rejected: same meme family as #1.
// 4. "Your password is weak. Fix it by changing it to your full name and birthdate."
//    — CHOSEN: opens in the assistant's own warning voice, advice is terrible
//    and specific enough to follow and regret, one concrete action, 80 chars.
const LINE = "Your password is weak. Fix it by changing it to your full name and birthdate.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE + "\n", "utf8");

// Read back and verify: single line, 1-140 UTF-8 chars, not whitespace-only.
const back = readFileSync(outPath, "utf8");
const text = back.replace(/\n$/, "");
const chars = [...text].length;
if (chars < 1 || chars > 140) throw new Error(`entry length ${chars} out of gate 1-140`);
if (!/\S/.test(text)) throw new Error("entry is whitespace-only");
if (text.includes("\n")) throw new Error("entry must be a single line");
console.log(`wrote ${chars} chars (${Buffer.byteLength(text, "utf8")} bytes) to ${outPath}`);
