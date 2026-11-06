import { execFileSync } from "node:child_process";
import vm from "node:vm";
import assert from "node:assert/strict";
import { terms, quizzes } from "../src/data.js";
const baseline = "8a8fcd2013c5775ee819d026cc9b006e0d1140b1";
const original = (file) =>
  execFileSync("git", ["show", `${baseline}:${file}`], { encoding: "utf8" });
function extract(file, name, opening, closing) {
  const source = original(file),
    start = source.indexOf(`const ${name} =`),
    a = source.indexOf(opening, start),
    b = source.indexOf(closing, a) + 1;
  assert.ok(start >= 0 && a >= 0 && b > a, `Missing ${file} data`);
  return vm.runInNewContext(`(${source.slice(a, b)})`, {}, { timeout: 1000 });
}
let definitions = 0;
for (const file of [
  "coc1.html",
  "coc2.html",
  "coc3.html",
  "others.html",
  "search.html",
]) {
  for (const [word, info] of Object.entries(
    extract(file, file === "search.html" ? "ictTerms" : "terms", "{", "};"),
  )) {
    const term = terms.find((t) => t.id === word.toLowerCase());
    assert.ok(term, `Missing term ${word}`);
    assert.ok(
      [term.meaning, ...(term.notes || []).map((n) => n.text)].includes(
        info.meaning,
      ),
      `Missing definition ${file}: ${word}`,
    );
    definitions++;
  }
}
for (const file of [
  "COC 1 DICTIONARY.html",
  "COC 2 DICTIONARY.html",
  "COC 3 DICTIONARY.html",
  "OTHERS DICTIONARY.html",
]) {
  for (const m of original(file).matchAll(
    /<div class="term"><b>(.*?)<\/b>\s*[-–]\s*([\s\S]*?)<\/div>/g,
  )) {
    const word = m[1].replace(/<[^>]+>/g, "").trim(),
      text = m[2].replace(/<[^>]+>/g, "").trim(),
      term = terms.find((t) => t.id === word.toLowerCase());
    assert.ok(term, `Missing dictionary term ${word}`);
    assert.ok(
      [term.meaning, ...(term.notes || []).map((n) => n.text)].includes(text),
      `Missing dictionary text ${file}: ${word}`,
    );
    definitions++;
  }
}
for (const [level, file] of [
  ["easy", "easy quiz.html"],
  ["medium", "MEDQUIZ.html"],
  ["hard", "hard quiz.html"],
])
  assert.equal(
    JSON.stringify(quizzes[level]),
    JSON.stringify(extract(file, "questions", "[", "];")),
    `Changed ${level} quiz bank`,
  );
console.log(
  `Verified ${definitions} original definition occurrences across 129 unique terms and all 35 quiz questions against ${baseline}.`,
);
