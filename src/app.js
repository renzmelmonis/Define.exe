import { terms, categories, quizzes } from "./data.js";
import {
  icon,
  pixelMark,
  escapeHTML as esc,
  searchForm,
  windowBar,
} from "./components.js";
import { createStore, migrateFavorites } from "./storage.js";
import { createQuiz, answerQuiz, nextQuestion, quizScore } from "./quiz.js";

const app = document.querySelector("#app");
const page = document.body.dataset.page;
const params = new URLSearchParams(location.search);
let storageUnavailable = false;
let nativeStorage;
try {
  nativeStorage = window.localStorage;
} catch {
  nativeStorage = {
    getItem() {
      return null;
    },
    setItem() {
      throw new Error("unavailable");
    },
    removeItem() {
      throw new Error("unavailable");
    },
  };
  storageUnavailable = true;
}
const store = createStore(nativeStorage, () => {
  storageUnavailable = true;
  showStorageWarning();
});
let favorites = migrateFavorites(store, terms);
let profile = store.raw("terminotech_user");
let featuredIndex = 0;
const featured = ["cpu", "html", "ram", "firewall", "json", "router"]
  .map((id) => terms.find((t) => t.id === id))
  .filter(Boolean);
let category = categories.some((c) => c.id === params.get("category"))
  ? params.get("category")
  : "";
let query = params.get("q") || "";
let quiz = null;
let selectedAnswer = null;
let level = Object.hasOwn(quizzes, params.get("level"))
  ? params.get("level")
  : null;
let undoAction = null;
const labelFor = (id) => categories.find((c) => c.id === id)?.label || "Custom";
const titleCase = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const findTerm = (id) => terms.find((t) => t.id === id);
const isSaved = (id) => favorites.includes(id);
const termLink = (t) => `dictionary.html?q=${encodeURIComponent(t.term)}`;

function readScores() {
  const value = store.read("define_scores", {});
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(
    Object.entries(value).filter(
      ([key, score]) =>
        Object.hasOwn(quizzes, key) &&
        score &&
        Number.isInteger(score.best) &&
        Number.isInteger(score.last) &&
        score.total === quizzes[key].length &&
        score.best >= 0 &&
        score.last >= 0 &&
        score.best <= score.total &&
        score.last <= score.total,
    ),
  );
}
function navigation() {
  return `<header class="site-header"><a class="brand" href="index.html" aria-label="Define.exe home">${pixelMark()}<span>Define.exe</span></a><nav aria-label="Main navigation"><a href="dictionary.html" ${page === "dictionary" ? 'aria-current="page"' : ""}>Dictionary</a><a href="saved.html" ${page === "saved" ? 'aria-current="page"' : ""}>Saved <span class="saved-count">${favorites.length}</span></a><a href="quiz.html" ${page === "quiz" ? 'aria-current="page"' : ""}>Mini quiz</a></nav><a class="profile-link" href="${profile ? "profile.html" : "welcome.html"}" aria-label="${profile ? "Your profile" : "Create a local profile"}">${icon("user")}<span>${profile ? "My space" : "Get started"}</span></a></header>`;
}
function footer() {
  return `<footer class="site-footer"><div><a class="brand footer-brand" href="index.html">${pixelMark()}<span>Define.exe</span></a><p>A little clarity goes a long way.</p></div><div class="school-credit"><img src="assets/school-logo.png" width="38" height="38" alt="Olivarez College Tagaytay seal"><span>An ICT learning companion<br><span class="muted">Explore. Understand. Remember.</span></span></div><a href="profile.html">Your local data ${icon("arrow")}</a></footer>`;
}
function shell(content) {
  app.innerHTML = `${navigation()}<main id="main" tabindex="-1">${content}</main>${footer()}<div class="notification" role="status" aria-live="polite" aria-atomic="true"></div>`;
  showStorageWarning();
}
function showStorageWarning() {
  const main = document.querySelector("#main");
  if (!storageUnavailable || !main || main.querySelector(".storage-warning"))
    return;
  const warning = document.createElement("p");
  warning.className = "storage-warning";
  warning.setAttribute("role", "status");
  warning.textContent =
    "Browser storage is unavailable. Changes are kept on this page only and will be lost on navigation or reload.";
  main.prepend(warning);
}
function notify(message, undo) {
  const el = document.querySelector(".notification");
  if (!el) return;
  el.replaceChildren();
  const span = document.createElement("span");
  span.textContent = storageUnavailable
    ? `${message} Changes are temporary on this page.`
    : message;
  el.append(span);
  if (undo) {
    const button = document.createElement("button");
    button.textContent = "Undo";
    button.dataset.action = "undo";
    el.append(button);
    undoAction = undo;
  } else undoAction = null;
  el.classList.add("visible");
  clearTimeout(notify.timer);
  notify.timer = setTimeout(
    () => el.classList.remove("visible"),
    undo ? 10000 : 4500,
  );
}
function saveFavorites() {
  store.write("define_favorites", favorites);
  document
    .querySelectorAll(".saved-count")
    .forEach((el) => (el.textContent = favorites.length));
  document.querySelectorAll('[data-action="save"]').forEach((button) => {
    const saved = isSaved(button.dataset.id);
    button.setAttribute("aria-pressed", saved);
    button.classList.toggle("is-saved", saved);
    button.innerHTML = `${icon(saved ? "check" : "bookmark")} ${saved ? "Saved" : "Save term"}`;
  });
}
function saveButton(t) {
  return `<button class="button small ${isSaved(t.id) ? "is-saved" : ""}" data-action="save" data-id="${esc(t.id)}" aria-pressed="${isSaved(t.id)}">${icon(isSaved(t.id) ? "check" : "bookmark")} ${isSaved(t.id) ? "Saved" : "Save term"}</button>`;
}
function speakButton(t) {
  return `<button class="button small quiet" data-action="speak" data-id="${esc(t.id)}">${icon("volume")} Listen<span class="sr-only"> to ${esc(t.term)}</span></button>`;
}
function categoryLinks() {
  return `<div class="category-directory">${categories.map((c) => `<a href="dictionary.html?category=${c.id}">${icon("folder")}<span><strong>${c.label}</strong><span>${c.description}</span></span>${icon("arrow")}</a>`).join("")}</div>`;
}
function featuredCard() {
  const t = featured[featuredIndex];
  return `<div class="window featured-window">${windowBar("a-little-discovery.exe")}<div class="featured-content" id="featured-content"><div class="featured-term"><span class="category-tag">${labelFor(t.categories[0])}</span><h3>${esc(t.term)}</h3><p>${esc(t.full)}</p></div><div class="featured-definition"><p>${esc(t.meaning)}</p><div class="button-group">${saveButton(t)}${speakButton(t)}</div></div></div><div class="window-bottom"><a href="${termLink(t)}">Explore this term ${icon("arrow")}</a><div class="carousel-controls"><span aria-live="polite">${String(featuredIndex + 1).padStart(2, "0")} <span class="muted">/ ${String(featured.length).padStart(2, "0")}</span></span><button class="icon-button" data-action="previous-word" aria-label="Previous featured term">${icon("back")}</button><button class="icon-button" data-action="next-word" aria-label="Next featured term">${icon("arrow")}</button></div></div></div>`;
}
function difficultyRows() {
  return `<div class="difficulty-list">${[
    ["easy", "Start with the essentials", "Build confidence with the basics."],
    ["medium", "Connect the dots", "A little more depth. A fresh challenge."],
    ["hard", "Go beyond the basics", "Put your technical knowledge to work."],
  ]
    .map(([key, title, description]) => {
      const best = readScores()[key];
      return `<a class="difficulty-row ${key}" href="quiz.html?level=${key}"><span class="level-icon">${icon(key === "easy" ? "monitor" : key === "medium" ? "folder" : "game")}</span><span class="difficulty-copy"><strong>${title}</strong><span>${description}</span></span><span class="difficulty-meta"><span class="difficulty-label">${titleCase(key)}</span><small>${quizzes[key].length} questions${best ? ` · Best ${best.best}/${best.total}` : ""}</small></span>${icon("arrow")}</a>`;
    })
    .join("")}</div>`;
}
function renderHome() {
  shell(
    `<section class="hero"><div class="hero-copy"><h1>Define.exe<span class="pixel-cursor" aria-hidden="true"></span></h1><p class="hero-lead">Goodbye, jargon.<br>Hello, understanding.</p><p>Your pocket dictionary for IT terms. Find a word, save a discovery, and make a little more sense of the digital world.</p><span class="hero-note">A small tool for curious minds.</span></div><div class="hero-shortcuts"><a class="shortcut" href="dictionary.html"><span class="shortcut-icon">${icon("monitor")}</span><span><strong>Open the dictionary</strong><span>Big ideas, simply explained.</span></span>${icon("arrow")}</a><a class="shortcut" href="quiz.html"><span class="shortcut-icon">${icon("game")}</span><span><strong>Take a mini quiz</strong><span>Give your brain a little playtime.</span></span>${icon("arrow")}</a><div class="shortcut-footnote"><span class="status-dot"></span>${terms.length} terms. Plenty of aha! moments.</div></div></section><section class="home-search" aria-label="Find an IT term">${searchForm()}<div class="search-suggestions"><span>Try a little curiosity:</span>${["CPU", "HTML", "Firewall", "JSON"].map((t) => `<a href="dictionary.html?q=${t}">${t} ${icon("arrow")}</a>`).join("")}</div></section><section class="discovery-section" aria-labelledby="discovery-title"><div class="section-heading"><h2 id="discovery-title">One word at a time.</h2><span>Something new to know.</span></div><div id="featured">${featuredCard()}</div></section><section class="browse-section"><div class="section-heading"><h2>Find your corner.</h2><a href="dictionary.html">All terms ${icon("arrow")}</a></div>${categoryLinks()}</section><section class="quiz-intro"><div class="quiz-intro-copy">${icon("game", "section-icon")}<h2>A little play.<br>A lot of learning.</h2><p>Think you know your tech? Pick a level and put those discoveries to the test. No timer. Just you and your next aha!</p><a class="text-link" href="quiz.html">Meet the mini quiz ${icon("arrow")}</a></div>${difficultyRows()}</section>`,
  );
  try {
    if (
      !sessionStorage.getItem("define_booted") &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      document.querySelector(".featured-window").classList.add("first-open");
      sessionStorage.setItem("define_booted", "1");
    }
  } catch {}
}
function termRow(t, open = false) {
  return `<details class="term-row" ${open ? "open" : ""}><summary><span class="term-name">${esc(t.term)}</span><span class="term-full">${esc(t.full)}</span><span class="category-tag">${t.categories.map(labelFor).join(" / ")}</span><span class="expand-symbol" aria-hidden="true">+</span></summary><div class="term-body"><p>${esc(t.meaning)}</p>${t.notes?.length ? `<details class="reference-note"><summary>More about this term</summary>${t.notes.map((note) => `<p><strong>${esc(note.source)}:</strong> ${esc(note.text)}</p>`).join("")}</details>` : ""}<div class="button-group">${saveButton(t)}${speakButton(t)}</div></div></details>`;
}
function renderDictionary() {
  shell(
    `<section class="page-heading"><div><h1>The dictionary.</h1><p>Big ideas are easier when the words make sense.</p></div><span class="page-stamp">${icon("book")} ${terms.length} terms to discover</span></section><section class="dictionary" aria-label="ICT dictionary">${searchForm(query, true)}<div class="filter-row" role="group" aria-label="Filter by category"><button class="filter-chip ${!category ? "selected" : ""}" aria-pressed="${!category}" data-action="filter" data-category="">All terms</button>${categories.map((c) => `<button class="filter-chip ${category === c.id ? "selected" : ""}" aria-pressed="${category === c.id}" data-action="filter" data-category="${c.id}">${c.label}</button>`).join("")}<button class="reset-filter" data-action="reset-filter">Reset</button></div><div class="results-header"><p id="result-count" role="status" aria-live="polite"></p><label class="sort-control">Sort <select id="sort"><option value="az">A to Z</option><option value="za">Z to A</option></select></label></div><div class="window dictionary-window">${windowBar("dictionary.exe")}<div id="term-results"></div></div><p class="helper-note">Open a term to see its definition, hear it, or save it for later.</p></section>`,
  );
  updateResults();
  document
    .querySelector("#dictionary-search")
    .addEventListener("input", (e) => {
      query = e.target.value;
      updateResults();
      updateDictionaryURL();
    });
  document.querySelector("#sort").addEventListener("change", updateResults);
  document.querySelector(".search-form").addEventListener("submit", (e) => {
    e.preventDefault();
    query = document.querySelector("#dictionary-search").value;
    updateResults();
    updateDictionaryURL();
    document.querySelector("#result-count").focus();
  });
  document.querySelector("#result-count").tabIndex = -1;
}
function updateDictionaryURL() {
  const p = new URLSearchParams();
  if (query) p.set("q", query);
  if (category) p.set("category", category);
  history.replaceState(null, "", `dictionary.html${p.size ? "?" + p : ""}`);
}
function updateResults() {
  const q = query.trim().toLowerCase();
  let filtered = terms.filter(
    (t) =>
      (!category || t.categories.includes(category)) &&
      (!q ||
        `${t.term} ${t.full} ${t.meaning} ${(t.notes || []).map((n) => n.text).join(" ")}`
          .toLowerCase()
          .includes(q)),
  );
  if (document.querySelector("#sort")?.value === "za") filtered.reverse();
  document.querySelector("#result-count").textContent =
    `${filtered.length} ${filtered.length === 1 ? "term" : "terms"}${category ? " in " + labelFor(category) : ""}${q ? " matching “" + query.trim() + "”" : ""}`;
  document.querySelector("#term-results").innerHTML = filtered.length
    ? filtered
        .map((t) =>
          termRow(t, filtered.length === 1 || t.term.toLowerCase() === q),
        )
        .join("")
    : `<div class="empty-state">${icon("search")}<h2>No words here. Yet.</h2><p>We couldn't find that term. Try a shorter word or a different category.</p><button class="button" data-action="reset-filter">Show all terms ${icon("arrow")}</button></div>`;
}
function renderSaved() {
  shell(
    `<section class="page-heading"><div><h1>Your little collection.</h1><p>Good discoveries deserve a place to stay.</p></div><a class="button" href="dictionary.html">${icon("plus")} Find more terms</a></section><div class="saved-toolbar"><span><strong>${favorites.length}</strong> saved ${favorites.length === 1 ? "discovery" : "discoveries"}</span>${favorites.length ? '<button class="text-button" data-action="clear-saved">Clear collection</button>' : ""}</div><section class="window saved-window" aria-label="Saved terms">${windowBar("saved-for-later.exe")}<div id="saved-list">${
      favorites.length
        ? favorites
            .map((id) => {
              const t = findTerm(id);
              return t
                ? termRow(t, true)
                : `<article class="custom-term"><div><span class="category-tag">Your custom term</span><h2>${esc(id)}</h2><p>A personal discovery from your collection.</p></div><button class="button small quiet" data-action="remove-custom" data-id="${esc(id)}">${icon("close")} Remove</button></article>`;
            })
            .join("")
        : `<div class="empty-state">${icon("bookmark")}<h2>Make room for an aha!</h2><p>Save a term from the dictionary and it will be right here when you need it.</p><a class="button primary" href="dictionary.html">Explore the dictionary ${icon("arrow")}</a></div>`
    }</div></section><section class="custom-section"><div><h2>A word of your own?</h2><p>Add a term you want to look into later.</p></div><form id="custom-form"><label class="sr-only" for="custom-term">Custom term</label><input id="custom-term" name="term" placeholder="Your next discovery…" required maxlength="100"><button class="button" type="submit">${icon("plus")} Add term</button></form></section><p class="helper-note">${icon("bookmark")} Saved on this browser. Your collection stays here between visits.</p>`,
  );
  document.querySelector("#custom-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const raw = document.querySelector("#custom-term").value.trim();
    if (!raw) return;
    const id =
      terms.find((t) => t.term.toLowerCase() === raw.toLowerCase())?.id || raw;
    if (favorites.some((x) => x.toLowerCase() === id.toLowerCase())) {
      notify("That discovery is already in your collection.");
      return;
    }
    favorites.push(id);
    saveFavorites();
    renderSaved();
    document.querySelector("#custom-term").focus();
    notify("Your term is in the collection.");
  });
}
function renderQuiz() {
  if (level) {
    quiz = createQuiz(quizzes[level]);
    renderQuestion();
    return;
  }
  shell(
    `<section class="quiz-heading"><div class="quiz-emblem">${icon("game")}</div><h1>Small quiz.<br>Big brain energy.</h1><p>A little practice makes it stick. Choose your level.<br>No countdown, no pressure. Just keep discovering.</p></section><section class="quiz-selection" aria-label="Choose quiz difficulty">${difficultyRows()}</section><div class="quiz-tips"><span>${icon("check")} One question at a time</span><span>${icon("book")} Review every answer</span><span>${icon("repeat")} Try again anytime</span></div><div class="quiz-study-link"><p>A little warm-up first?</p><a href="dictionary.html">Spend a minute in the dictionary ${icon("arrow")}</a></div>`,
  );
}
function quizHeading() {
  return `<div class="quiz-top"><a href="quiz.html" class="text-link">${icon("back")} All levels</a><span class="difficulty-label ${level}">${titleCase(level)} quiz</span><span>Question ${quiz.index + 1} of ${quiz.questions.length}</span></div>`;
}
function renderQuestion(focus = false) {
  selectedAnswer = null;
  const q = quiz.questions[quiz.index];
  shell(
    `<section class="quiz-play"><h1 class="sr-only">${titleCase(level)} mini quiz</h1>${quizHeading()}<div class="question-progress" role="progressbar" aria-label="Quiz progress" aria-valuemin="0" aria-valuemax="${quiz.questions.length}" aria-valuenow="${quiz.index}"><span style="transform:scaleX(${quiz.index / quiz.questions.length})"></span></div><div class="window question-window">${windowBar("a-little-brain-training.exe")}<form id="answer-form"><fieldset><legend><span class="question-number">${String(quiz.index + 1).padStart(2, "0")}.</span><span id="question-heading" tabindex="-1">${esc(q.question)}</span></legend><div class="answers">${q.choices.map((choice, i) => `<label class="answer-option"><input type="radio" name="answer" value="${i}" required><span class="answer-letter">${String.fromCharCode(65 + i)}</span><span>${esc(choice)}</span><span class="answer-indicator" aria-hidden="true"></span></label>`).join("")}</div></fieldset><div id="answer-feedback" class="answer-feedback" role="status" aria-live="polite"></div><div class="question-bottom"><span>Take your time. You've got this.</span><button class="button primary" type="submit" id="check-answer" disabled>Check answer ${icon("arrow")}</button></div></form></div></section>`,
  );
  const form = document.querySelector("#answer-form");
  form.addEventListener("change", () => {
    selectedAnswer = Number(new FormData(form).get("answer"));
    document.querySelector("#check-answer").disabled = false;
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (quiz.checked) {
      nextQuestion(quiz);
      if (quiz.index >= quiz.questions.length) renderResults();
      else renderQuestion(true);
      return;
    }
    if (!answerQuiz(quiz, selectedAnswer)) return;
    const correct = selectedAnswer === q.answer;
    document.querySelectorAll(".answer-option").forEach((el, i) => {
      el.querySelector("input").disabled = true;
      if (i === q.answer) el.classList.add("correct");
      if (i === selectedAnswer && !correct) el.classList.add("incorrect");
    });
    const feedback = document.querySelector("#answer-feedback");
    feedback.classList.add(correct ? "correct" : "incorrect");
    feedback.textContent = correct
      ? "That’s it. Nicely done!"
      : `A little learning moment. The answer is ${q.choices[q.answer]}.`;
    document.querySelector("#check-answer").innerHTML =
      `${quiz.index === quiz.questions.length - 1 ? "See my results" : "Next question"} ${icon("arrow")}`;
  });
  if (focus) document.querySelector("#question-heading").focus();
}
function renderResults() {
  const score = quizScore(quiz);
  const records = readScores();
  records[level] = {
    best: Math.max(score, Number(records[level]?.best) || 0),
    last: score,
    total: quiz.questions.length,
  };
  store.write("define_scores", records);
  store.write("userScore", score);
  shell(
    `<section class="results-heading"><span class="result-trophy">${icon("trophy")}</span><h1>A little wiser.</h1><p>You completed the ${level} quiz. Every question is a step forward.</p><div class="score-display"><strong>${score}</strong><span>/ ${quiz.questions.length}</span></div><p>${score === quiz.questions.length ? "Every answer, on point. A perfect little run!" : score >= quiz.questions.length / 2 ? "Good discoveries. Keep the momentum going." : "Curiosity counts. Review, explore, and try again."}</p><div class="button-group centered"><button class="button primary" data-action="retry">${icon("repeat")} Try this level again</button><a class="button" href="quiz.html">Choose another level ${icon("arrow")}</a></div></section><section class="review-section"><div class="section-heading"><h2>Your answer rewind.</h2><span>${score} correct · ${quiz.questions.length - score} to revisit</span></div><div class="window review-window">${windowBar("a-little-reflection.exe")}${quiz.questions.map((q, i) => `<details class="review-row"><summary><span class="review-status ${quiz.answers[i] === q.answer ? "correct" : "incorrect"}">${icon(quiz.answers[i] === q.answer ? "check" : "close")}<span class="sr-only">${quiz.answers[i] === q.answer ? "Correct" : "Incorrect"}</span></span><span>${esc(q.question)}</span><span class="expand-symbol" aria-hidden="true">+</span></summary><div class="review-answer"><p><span class="muted">Your answer:</span> ${esc(q.choices[quiz.answers[i]])}</p>${quiz.answers[i] !== q.answer ? `<p><strong>Correct answer:</strong> ${esc(q.choices[q.answer])}</p>` : ""}</div></details>`).join("")}</div></section>`,
  );
  document.querySelector("h1").tabIndex = -1;
  document.querySelector("h1").focus();
}
function renderWelcome() {
  shell(
    `<section class="welcome-layout"><div class="welcome-copy">${pixelMark()}<h1>Your next aha!<br>starts here.</h1><p>Keep a little space for what you learn. Add your school email to personalize this browser.</p><a class="text-link" href="index.html">Explore without a profile ${icon("arrow")}</a></div><div class="window welcome-window">${windowBar("hello-there.exe")}<div class="welcome-form-content"><img class="school-seal" src="assets/school-logo.png" alt="Olivarez College Tagaytay seal" width="64" height="64"><h2>Welcome, curious mind.</h2><p>Set up your local learning profile.</p><form id="profile-form"><label for="email">School email</label><input id="email" name="email" type="email" required autocomplete="email" placeholder="you@olivarezcollegetagaytay.edu.ph" aria-describedby="email-help profile-error"><p id="email-help" class="field-help">Use your @olivarezcollegetagaytay.edu.ph email.</p><p class="form-error" id="profile-error" role="alert"></p><button class="button primary" type="submit">Let's get curious ${icon("arrow")}</button></form><p class="local-note">This is a local profile, saved on this browser. No password or online account is created.</p><details class="profile-help"><summary>Looking for sign-up or a password reset?</summary><p>The original site has no online account service. You can start with your school email here. For school account help, contact your administrator.</p></details></div></div></section>`,
  );
  document.querySelector("#profile-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.querySelector("#email").value.trim().toLowerCase();
    if (!/^[^\s@]+@olivarezcollegetagaytay\.edu\.ph$/.test(email)) {
      document.querySelector("#profile-error").textContent =
        "Please enter your Olivarez College Tagaytay school email.";
      document.querySelector("#email").setAttribute("aria-invalid", "true");
      return;
    }
    try {
      nativeStorage.setItem("terminotech_user", email);
    } catch {
      storageUnavailable = true;
    }
    profile = email;
    if (storageUnavailable) {
      notify(
        "Storage is unavailable. You can still explore without a saved profile.",
      );
      return;
    }
    location.href = "index.html";
  });
}
function renderProfile() {
  const records = readScores();
  shell(
    `<section class="page-heading"><div><h1>Your learning space.</h1><p>A few discoveries, all on this browser.</p></div><a class="button" href="index.html">Back to exploring ${icon("arrow")}</a></section><section class="window profile-window">${windowBar("a-space-for-you.exe")}<div class="profile-content"><h2>${profile ? "Hello again, curious mind." : "Make yourself at home."}</h2><p>${profile ? esc(profile) : "You’re exploring without a local profile."}</p><div class="profile-actions">${profile ? '<button class="button" data-action="logout">Remove local profile</button>' : '<a class="button primary" href="welcome.html">Add school email</a>'}<a class="button quiet" href="saved.html">${icon("bookmark")} Your saved terms <span class="saved-count">${favorites.length}</span></a></div><h3>Your quiz history</h3><div class="score-history">${["easy", "medium", "hard"].map((key) => `<div><strong>${titleCase(key)}</strong><span>${records[key] ? `Best ${records[key].best}/${records[key].total} · Last ${records[key].last}/${records[key].total}` : "A fresh challenge awaits."}</span><a href="quiz.html?level=${key}">Play ${icon("arrow")}</a></div>`).join("")}</div><button class="text-button" data-action="reset-scores">Reset quiz history</button><h3>About your local data</h3><p>Your email, saved terms, and quiz scores are stored in this browser. They don’t sync to another device. Removing the profile keeps your saved terms and quiz results.</p><details class="profile-help"><summary>Legacy saved information</summary><form id="legacy-form"><label for="legacy-email">Saved email</label><input id="legacy-email" type="email" value="${esc(store.raw("userEmail"))}" placeholder="Your email"><label for="legacy-score">Saved score</label><input id="legacy-score" type="number" min="0" value="${esc(store.read("userScore", ""))}"><div class="button-group"><button class="button" type="submit">Save information</button><button class="button quiet" type="button" data-action="clear-info">Clear this information</button></div></form></details></div></section>`,
  );
  document.querySelector("#legacy-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.querySelector("#legacy-email").value;
    const score = document.querySelector("#legacy-score").value;
    try {
      nativeStorage.setItem("userEmail", email);
      nativeStorage.setItem("userScore", score);
      notify("Your information is saved on this browser.");
    } catch {
      notify("Browser storage is unavailable. Information could not be saved.");
    }
  });
}

function animateFeatured() {
  if (
    document.documentElement.dataset.input === "keyboard" ||
    matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;
  document.querySelector("#featured-content")?.animate(
    [
      { opacity: 0.5, transform: "translateY(5px)" },
      { opacity: 1, transform: "translateY(0)" },
    ],
    { duration: 220, easing: "cubic-bezier(0.23, 1, 0.32, 1)" },
  );
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab" || e.key === "Enter" || e.key === " ")
    document.documentElement.dataset.input = "keyboard";
});
document.addEventListener(
  "pointerdown",
  () => (document.documentElement.dataset.input = "pointer"),
);
document.addEventListener("click", (e) => {
  const button = e.target.closest("[data-action]");
  if (!button) return;
  const action = button.dataset.action;
  if (action === "save") {
    const id = button.dataset.id;
    if (isSaved(id)) {
      favorites = favorites.filter((x) => x !== id);
      saveFavorites();
      if (page === "saved") {
        renderSaved();
        document
          .querySelector(".saved-toolbar")
          ?.setAttribute("tabindex", "-1");
        document.querySelector(".saved-toolbar")?.focus();
      }
      notify("Removed from your collection.", () => {
        favorites.push(id);
        saveFavorites();
        if (page === "saved") renderSaved();
        notify("Discovery restored.");
      });
    } else {
      favorites.push(id);
      saveFavorites();
      notify("A good discovery. Saved for later.");
    }
  }
  if (action === "speak") {
    const t = findTerm(button.dataset.id);
    if (!("speechSynthesis" in window)) {
      notify(
        "Pronunciation is not supported in this browser. Try a browser with speech support.",
      );
      return;
    }
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(`${t.term}. ${t.full}`);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    utterance.onerror = () =>
      notify(
        "Pronunciation could not play. Check your device’s speech and audio settings.",
      );
    speechSynthesis.speak(utterance);
    notify(`Playing pronunciation for ${t.term}.`);
  }
  if (action === "previous-word" || action === "next-word") {
    featuredIndex =
      (featuredIndex + (action === "next-word" ? 1 : -1) + featured.length) %
      featured.length;
    document.querySelector("#featured").innerHTML = featuredCard();
    document
      .querySelector(`[data-action="${action}"]`)
      .focus({ preventScroll: true });
    animateFeatured();
  }
  if (action === "filter") {
    category = button.dataset.category;
    document.querySelectorAll('[data-action="filter"]').forEach((el) => {
      el.classList.toggle("selected", el.dataset.category === category);
      el.setAttribute("aria-pressed", el.dataset.category === category);
    });
    updateResults();
    updateDictionaryURL();
  }
  if (action === "reset-filter") {
    category = "";
    query = "";
    document.querySelector("#dictionary-search").value = "";
    document.querySelectorAll('[data-action="filter"]').forEach((el) => {
      el.classList.toggle("selected", !el.dataset.category);
      el.setAttribute("aria-pressed", !el.dataset.category);
    });
    updateResults();
    updateDictionaryURL();
    document.querySelector("#dictionary-search").focus();
  }
  if (action === "clear-saved") {
    const previous = [...favorites];
    favorites = [];
    saveFavorites();
    renderSaved();
    notify("Collection cleared.", () => {
      favorites = previous;
      saveFavorites();
      renderSaved();
      notify("Collection restored.");
    });
  }
  if (action === "remove-custom") {
    const id = button.dataset.id;
    favorites = favorites.filter((x) => x !== id);
    saveFavorites();
    renderSaved();
    notify("Custom term removed.", () => {
      favorites.push(id);
      saveFavorites();
      renderSaved();
      notify("Custom term restored.");
    });
  }
  if (action === "undo" && undoAction) {
    const undo = undoAction;
    undoAction = null;
    undo();
  }
  if (action === "retry") {
    quiz = createQuiz(quizzes[level]);
    renderQuestion(true);
  }
  if (action === "logout") {
    store.remove("terminotech_user");
    profile = "";
    renderProfile();
    notify("Local profile removed. Your discoveries are still here.");
  }
  if (action === "reset-scores") {
    const previous = readScores();
    store.write("define_scores", {});
    renderProfile();
    notify("Quiz history reset.", () => {
      store.write("define_scores", previous);
      renderProfile();
      notify("Quiz history restored.");
    });
  }
  if (action === "clear-info") {
    store.remove("userEmail");
    store.remove("userScore");
    renderProfile();
    notify("Legacy saved information cleared.");
  }
});
window.addEventListener("storage", (e) => {
  if (e.key === "define_favorites") {
    favorites = store.read("define_favorites", []);
    if (!Array.isArray(favorites)) favorites = [];
    saveFavorites();
    if (page === "saved") renderSaved();
  }
  if (e.key === "terminotech_user") {
    profile = store.raw("terminotech_user");
    if (page === "profile") renderProfile();
  }
});
(
  ({
    home: renderHome,
    dictionary: renderDictionary,
    saved: renderSaved,
    quiz: renderQuiz,
    welcome: renderWelcome,
    profile: renderProfile,
  })[page] || renderHome
)();
if (storageUnavailable)
  notify(
    "Browser storage is unavailable. You can explore, but changes may not persist.",
  );
