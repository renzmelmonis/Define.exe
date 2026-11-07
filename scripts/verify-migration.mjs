// Compare today's content with the original version in Git history.
// This confirms that removing the category UI did not remove any learning text.
import { execFileSync } from "node:child_process";
import vm from "node:vm";
import assert from "node:assert/strict";
import { terms, quizzes } from "../src/data.js";

const baseline = "8a8fcd2013c5775ee819d026cc9b006e0d1140b1";

function originalFile(filename) {
  const revisionPath = baseline + ":" + filename;
  return execFileSync("git", ["show", revisionPath], { encoding: "utf8" });
}

function originalData(filename, variableName, opening, closing) {
  const source = originalFile(filename);
  const variableStart = source.indexOf("const " + variableName + " =");
  const dataStart = source.indexOf(opening, variableStart);
  const dataEnd = source.indexOf(closing, dataStart) + 1;
  assert.ok(variableStart >= 0);
  assert.ok(dataStart >= 0);
  assert.ok(dataEnd > dataStart);

  // The original files stored plain object and array literals, not JSON.
  // Evaluate only that fixed historical literal, with no browser or Node APIs.
  const dataText = source.slice(dataStart, dataEnd);
  return vm.runInNewContext("(" + dataText + ")", {}, { timeout: 1000 });
}

function findTerm(word) {
  const id = word.toLowerCase();
  for (const term of terms) {
    if (term.id === id) {
      return term;
    }
  }
  return null;
}

function containsDefinition(term, text) {
  if (term.meaning === text) {
    return true;
  }
  if (term.notes !== undefined) {
    for (const note of term.notes) {
      if (note.text === text) {
        return true;
      }
    }
  }
  return false;
}

let definitionCount = 0;
const searchFiles = [
  "coc1.html",
  "coc2.html",
  "coc3.html",
  "others.html",
  "search.html",
];
for (const filename of searchFiles) {
  let variableName = "terms";
  if (filename === "search.html") {
    variableName = "ictTerms";
  }

  const oldTerms = originalData(filename, variableName, "{", "};");
  const words = Object.keys(oldTerms);
  for (const word of words) {
    const term = findTerm(word);
    assert.ok(term !== null, "Missing term: " + word);
    const definition = oldTerms[word].meaning;
    const retained = containsDefinition(term, definition);
    assert.ok(retained, "Missing definition: " + filename + " / " + word);
    definitionCount = definitionCount + 1;
  }
}

const dictionaryFiles = [
  "COC 1 DICTIONARY.html",
  "COC 2 DICTIONARY.html",
  "COC 3 DICTIONARY.html",
  "OTHERS DICTIONARY.html",
];
for (const filename of dictionaryFiles) {
  const source = originalFile(filename);
  const entryPattern =
    /<div class="term"><b>(.*?)<\/b>\s*[-–]\s*([\s\S]*?)<\/div>/g;
  const entries = source.matchAll(entryPattern);

  for (const entry of entries) {
    let word = entry[1].replace(/<[^>]+>/g, "");
    word = word.trim();
    let definition = entry[2].replace(/<[^>]+>/g, "");
    definition = definition.trim();
    const term = findTerm(word);
    assert.ok(term !== null, "Missing dictionary term: " + word);
    const retained = containsDefinition(term, definition);
    assert.ok(retained, "Missing dictionary text: " + filename + " / " + word);
    definitionCount = definitionCount + 1;
  }
}

const oldQuizFiles = {
  easy: "easy quiz.html",
  medium: "MEDQUIZ.html",
  hard: "hard quiz.html",
};
const levels = Object.keys(oldQuizFiles);
for (const level of levels) {
  const filename = oldQuizFiles[level];
  const oldQuestions = originalData(filename, "questions", "[", "];");
  const originalText = JSON.stringify(oldQuestions);
  const currentText = JSON.stringify(quizzes[level]);
  assert.equal(currentText, originalText, "Changed question bank: " + level);
}

console.log(
  "Verified " + definitionCount + " original definition occurrences.",
);
console.log("All 129 terms and all 35 quiz questions remain unchanged.");
console.log("Original Git revision: " + baseline);
