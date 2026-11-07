import test from "node:test";
import assert from "node:assert/strict";
import { terms, quizzes } from "../src/data.js";
import { createStore } from "../src/storage.js";
import {
  createQuiz,
  answerQuiz,
  nextQuestion,
  quizScore,
  shuffle,
} from "../src/quiz.js";
import { escapeHTML } from "../src/components.js";

function memoryStorage(initial = {}) {
  const values = new Map();
  const keys = Object.keys(initial);
  for (const key of keys) {
    values.set(key, initial[key]);
  }

  function getItem(key) {
    if (!values.has(key)) {
      return null;
    }
    return values.get(key);
  }
  function setItem(key, value) {
    values.set(key, String(value));
  }
  function removeItem(key) {
    values.delete(key);
  }
  return { getItem: getItem, setItem: setItem, removeItem: removeItem };
}

function failingStorage() {
  return {
    getItem: function () {
      return null;
    },
    setItem: function () {
      throw new Error("Test write failure");
    },
    removeItem: function () {
      throw new Error("Test removal failure");
    },
  };
}

test("flat catalog preserves every unique term without COC grouping", function () {
  assert.equal(terms.length, 129);
  const seenIDs = [];
  for (const term of terms) {
    assert.ok(!seenIDs.includes(term.id));
    seenIDs.push(term.id);
    assert.ok(term.term);
    assert.ok(term.full);
    assert.ok(term.meaning);
    assert.equal(Object.hasOwn(term, "categories"), false);
    if (term.notes !== undefined) {
      for (const note of term.notes) {
        assert.equal(typeof note.text, "string");
      }
    }
  }
});

test("all 35 original quiz questions have a valid answer", function () {
  assert.equal(quizzes.easy.length, 15);
  assert.equal(quizzes.medium.length, 10);
  assert.equal(quizzes.hard.length, 10);
  const levels = Object.keys(quizzes);
  for (const level of levels) {
    for (const question of quizzes[level]) {
      assert.ok(question.question);
      assert.ok(question.choices.length >= 3);
      assert.ok(Number.isInteger(question.answer));
      assert.ok(question.answer >= 0);
      assert.ok(question.answer < question.choices.length);
    }
  }
});

test("quiz prevents duplicate scoring, invalid choices, and skipping unanswered questions", function () {
  const state = createQuiz(quizzes.easy);
  assert.equal(nextQuestion(state), false);
  assert.equal(answerQuiz(state, null), false);
  assert.equal(answerQuiz(state, -1), false);
  assert.equal(answerQuiz(state, 99), false);
  const answer = state.questions[0].answer;
  assert.equal(answerQuiz(state, answer), true);
  assert.equal(answerQuiz(state, answer), false);
  assert.equal(quizScore(state), 1);
  assert.equal(nextQuestion(state), true);
  assert.equal(state.index, 1);
  assert.equal(state.checked, false);
});

test("each difficulty supports a complete perfect run and reproducible review", function () {
  const levels = Object.keys(quizzes);
  for (const level of levels) {
    const bank = quizzes[level];
    const state = createQuiz(bank);
    while (state.index < state.questions.length) {
      const question = state.questions[state.index];
      assert.equal(answerQuiz(state, question.answer), true);
      assert.equal(nextQuestion(state), true);
    }
    assert.equal(quizScore(state), bank.length);
    assert.equal(state.answers.length, bank.length);
    for (let index = 0; index < bank.length; index = index + 1) {
      assert.equal(state.answers[index], state.questions[index].answer);
    }
  }
});

test("mixed answer scoring agrees with the review data", function () {
  const state = createQuiz(quizzes.medium);
  for (let index = 0; index < state.questions.length; index = index + 1) {
    const question = state.questions[index];
    let answer = question.answer;
    if (index % 2 !== 0) {
      answer = (answer + 1) % question.choices.length;
    }
    answerQuiz(state, answer);
    nextQuestion(state);
  }
  assert.equal(quizScore(state), 5);
});

test("shuffle leaves source unchanged and preserves each question", function () {
  const source = [1, 2, 3, 4];
  function fixedRandom() {
    return 0;
  }
  const result = shuffle(source, fixedRandom);
  const sortedResult = result.slice();
  sortedResult.sort();
  assert.deepEqual(source, [1, 2, 3, 4]);
  assert.deepEqual(sortedResult, source);
  assert.notDeepEqual(result, source);
});

test("malformed local data recovers without crashing", function () {
  const storage = memoryStorage({
    define_favorites: "invalid JSON",
    define_scores: "broken",
  });
  const store = createStore(storage);
  assert.deepEqual(store.read("define_favorites", []), []);
  assert.deepEqual(store.read("define_scores", {}), {});
});

test("unavailable storage reports failure while reads remain safe", function () {
  let errors = 0;
  function countError() {
    errors = errors + 1;
  }
  const blockedStorage = failingStorage();
  blockedStorage.getItem = function () {
    throw new Error("Test read failure");
  };
  const store = createStore(blockedStorage, countError);
  assert.deepEqual(store.read("x", []), []);
  assert.equal(store.write("x", 1), false);
  assert.equal(store.remove("x"), false);
  assert.equal(errors, 2);
});

test("custom text is escaped before HTML rendering", function () {
  const text = '<img src=x onerror="alert(1)">';
  const escaped = escapeHTML(text);
  assert.equal(escaped, "&lt;img src=x onerror=&quot;alert(1)&quot;&gt;");
});

test("failed writes and removals remain consistent in page memory", function () {
  const store = createStore(failingStorage());
  const scores = { easy: { best: 2, last: 2, total: 15 } };
  assert.equal(store.write("define_scores", scores), false);
  assert.deepEqual(store.read("define_scores", {}), scores);
  assert.equal(store.write("favorite", "CPU"), false);
  assert.equal(store.raw("favorite"), '"CPU"');
  assert.equal(store.remove("favorite"), false);
  assert.equal(store.raw("favorite"), "");
  assert.equal(store.read("favorite", "missing"), "missing");
});

test("successful storage does not hide updates from other tabs", function () {
  const storage = memoryStorage();
  const store = createStore(storage);
  store.write("define_favorites", ["cpu"]);
  storage.setItem("define_favorites", '["html"]');
  assert.deepEqual(store.read("define_favorites", []), ["html"]);
});
