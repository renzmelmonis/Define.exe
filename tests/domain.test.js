import test from "node:test";
import assert from "node:assert/strict";
import { terms, quizzes, categories } from "../src/data.js";
import { createStore, migrateFavorites } from "../src/storage.js";
import {
  createQuiz,
  answerQuiz,
  nextQuestion,
  quizScore,
  shuffle,
} from "../src/quiz.js";
import { escapeHTML } from "../src/components.js";
function memoryStorage(initial = {}) {
  const map = new Map(Object.entries(initial));
  return {
    getItem: (key) => map.get(key) ?? null,
    setItem: (key, value) => map.set(key, String(value)),
    removeItem: (key) => map.delete(key),
  };
}
test("catalog preserves unique valid terms and category references", () => {
  assert.equal(terms.length, 129);
  assert.equal(new Set(terms.map((t) => t.id)).size, 129);
  for (const t of terms) {
    assert.ok(t.term && t.full && t.meaning);
    assert.ok(t.categories.length);
    assert.ok(t.categories.every((id) => categories.some((c) => c.id === id)));
  }
});
test("all 35 original quiz questions have a valid answer", () => {
  assert.deepEqual(
    Object.fromEntries(Object.entries(quizzes).map(([k, v]) => [k, v.length])),
    { easy: 15, medium: 10, hard: 10 },
  );
  for (const bank of Object.values(quizzes))
    for (const q of bank) {
      assert.ok(q.question);
      assert.ok(q.choices.length >= 3);
      assert.ok(
        Number.isInteger(q.answer) &&
          q.answer >= 0 &&
          q.answer < q.choices.length,
      );
    }
});
test("quiz prevents duplicate scoring, invalid choices, and skipping unanswered questions", () => {
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
test("each difficulty supports a complete perfect run and reproducible review", () => {
  for (const bank of Object.values(quizzes)) {
    const state = createQuiz(bank);
    while (state.index < state.questions.length) {
      assert.equal(
        answerQuiz(state, state.questions[state.index].answer),
        true,
      );
      assert.equal(nextQuestion(state), true);
    }
    assert.equal(quizScore(state), bank.length);
    assert.equal(state.answers.length, bank.length);
    assert.deepEqual(
      state.answers,
      state.questions.map((q) => q.answer),
    );
  }
});
test("mixed answer scoring agrees with the review data", () => {
  const state = createQuiz(quizzes.medium);
  state.questions.forEach((q, i) => {
    answerQuiz(
      state,
      i % 2 === 0 ? q.answer : (q.answer + 1) % q.choices.length,
    );
    nextQuestion(state);
  });
  assert.equal(quizScore(state), 5);
});
test("shuffle leaves source unchanged and preserves each question", () => {
  const source = [1, 2, 3, 4];
  const result = shuffle(source, () => 0);
  assert.deepEqual(source, [1, 2, 3, 4]);
  assert.deepEqual([...result].sort(), source);
  assert.notDeepEqual(result, source);
});
test("both legacy favorites formats migrate with case normalization and custom terms", () => {
  const storage = memoryStorage({
    favorites: JSON.stringify(["CPU", "JavaScript", "My custom term"]),
    favoritesAll:
      "\nCPU - Central Processing Unit | Definition\nHTML - HyperText Markup Language | Definition",
  });
  const store = createStore(storage);
  assert.deepEqual(migrateFavorites(store, terms), [
    "cpu",
    "javascript",
    "My custom term",
    "html",
  ]);
  assert.deepEqual(store.read("define_favorites", []), [
    "cpu",
    "javascript",
    "My custom term",
    "html",
  ]);
});
test("existing new collection takes precedence over stale legacy data", () => {
  const store = createStore(
    memoryStorage({ define_favorites: "[]", favorites: '["CPU"]' }),
  );
  assert.deepEqual(migrateFavorites(store, terms), []);
});
test("malformed local data recovers without crashing", () => {
  const store = createStore(
    memoryStorage({
      favorites: '{"unexpected":true}',
      define_scores: "broken",
    }),
  );
  assert.deepEqual(migrateFavorites(store, terms), []);
  assert.deepEqual(store.read("define_scores", {}), {});
});
test("unavailable storage reports failure while reads remain safe", () => {
  let errors = 0;
  const store = createStore(
    {
      getItem() {
        throw Error();
      },
      setItem() {
        throw Error();
      },
      removeItem() {
        throw Error();
      },
    },
    () => errors++,
  );
  assert.deepEqual(store.read("x", []), []);
  assert.equal(store.write("x", 1), false);
  assert.equal(store.remove("x"), false);
  assert.equal(errors, 2);
});
test("custom text is escaped before HTML rendering", () => {
  assert.equal(
    escapeHTML('<img src=x onerror="alert(1)">'),
    "&lt;img src=x onerror=&quot;alert(1)&quot;&gt;",
  );
});

test("failed writes and removals remain consistent in page memory", () => {
  const store = createStore({
    getItem: () => null,
    setItem() {
      throw Error();
    },
    removeItem() {
      throw Error();
    },
  });
  assert.equal(
    store.write("define_scores", { easy: { best: 2, last: 2, total: 15 } }),
    false,
  );
  assert.deepEqual(store.read("define_scores", {}), {
    easy: { best: 2, last: 2, total: 15 },
  });
  assert.equal(store.write("favorite", "CPU"), false);
  assert.equal(store.raw("favorite"), '"CPU"');
  assert.equal(store.remove("favorite"), false);
  assert.equal(store.raw("favorite"), "");
  assert.equal(store.read("favorite", "missing"), "missing");
});
test("successful storage does not hide updates from other tabs", () => {
  const underlying = memoryStorage();
  const store = createStore(underlying);
  store.write("favorites", ["cpu"]);
  underlying.setItem("favorites", '["html"]');
  assert.deepEqual(store.read("favorites", []), ["html"]);
});
