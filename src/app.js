// Application flow: prepare data, draw the current page, then handle events.
import { terms, quizzes } from "./data.js";
import {
  icon,
  escapeHTML,
  saveButton,
  speakButton,
  termRow,
  windowBar,
} from "./components.js";
import { createStore } from "./storage.js";
import { createQuiz, answerQuiz, nextQuestion, quizScore } from "./quiz.js";
import {
  headerHTML,
  footerHTML,
  homeHTML,
  dictionaryHTML,
  noResultsHTML,
  customTermHTML,
  savedHTML,
  quizMenuHTML,
  questionHTML,
  resultsHTML,
  welcomeHTML,
  profileHTML,
} from "./views.js";

// Read the page name and any search or quiz settings from the URL.
const app = document.querySelector("#app");
const pageName = document.body.dataset.page;
const urlParameters = new URLSearchParams(location.search);
const allowedLevels = ["easy", "medium", "hard"];
let searchQuery = urlParameters.get("q");
let level = urlParameters.get("level");

if (searchQuery === null) {
  searchQuery = "";
}
if (!allowedLevels.includes(level)) {
  level = null;
}

// Browser privacy settings can block localStorage. The app still opens.
let storageUnavailable = false;
let browserStorage;

try {
  browserStorage = window.localStorage;
} catch {
  storageUnavailable = true;
  browserStorage = {
    getItem: function () {
      return null;
    },
    setItem: function () {
      throw new Error("Browser storage is unavailable.");
    },
    removeItem: function () {
      throw new Error("Browser storage is unavailable.");
    },
  };
}

function handleStorageFailure() {
  storageUnavailable = true;
  showStorageWarning();
}

const store = createStore(browserStorage, handleStorageFailure);
let favorites = readFavorites();
let profileEmail = store.raw("define_profile_email");
let featuredIndex = 0;
let quizState = null;
let selectedAnswer = null;
let undoAction = null;
let notificationTimer = null;

const featuredIDs = ["cpu", "html", "ram", "firewall", "json", "router"];
const featuredTerms = [];

for (const id of featuredIDs) {
  const term = findTerm(id);
  if (term !== null) {
    featuredTerms.push(term);
  }
}

function readFavorites() {
  const savedValues = store.read("define_favorites", []);
  const validFavorites = [];

  if (!Array.isArray(savedValues)) {
    return validFavorites;
  }
  for (const value of savedValues) {
    if (typeof value === "string") {
      validFavorites.push(value);
    }
  }
  return validFavorites;
}

function findTerm(id) {
  for (const term of terms) {
    if (term.id === id) {
      return term;
    }
  }
  return null;
}

function findTermByName(name) {
  const lowercaseName = name.toLowerCase();
  for (const term of terms) {
    if (term.term.toLowerCase() === lowercaseName) {
      return term;
    }
  }
  return null;
}

function isSaved(id) {
  return favorites.includes(id);
}

// Ignore damaged score records instead of displaying invalid values.
function readScores() {
  const storedScores = store.read("define_scores", {});
  const validScores = {};

  if (storedScores === null) {
    return validScores;
  }
  if (typeof storedScores !== "object") {
    return validScores;
  }
  if (Array.isArray(storedScores)) {
    return validScores;
  }

  for (const difficulty of allowedLevels) {
    const record = storedScores[difficulty];
    if (record === null || record === undefined) {
      continue;
    }
    if (!Number.isInteger(record.best) || !Number.isInteger(record.last)) {
      continue;
    }
    if (record.total !== quizzes[difficulty].length) {
      continue;
    }
    if (record.best < 0 || record.best > record.total) {
      continue;
    }
    if (record.last < 0 || record.last > record.total) {
      continue;
    }
    validScores[difficulty] = record;
  }
  return validScores;
}

function showPage(content) {
  const hasProfile = profileEmail !== "";
  const header = headerHTML(pageName, hasProfile);
  const footer = footerHTML();

  app.innerHTML = `
    ${header}
    <main id="main" tabindex="-1">
      ${content}
    </main>
    ${footer}
    <div
      class="notification"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    ></div>
  `;

  showStorageWarning();
}

function showStorageWarning() {
  const main = document.querySelector("#main");
  if (!storageUnavailable || main === null) {
    return;
  }
  if (main.querySelector(".storage-warning") !== null) {
    return;
  }

  const warning = document.createElement("p");
  warning.className = "storage-warning";
  warning.setAttribute("role", "status");
  warning.textContent =
    "Browser storage is unavailable. Changes are kept on this page only and will be lost on navigation or reload.";
  main.prepend(warning);
}

function hideNotification() {
  const notification = document.querySelector(".notification");
  if (notification !== null) {
    notification.classList.remove("visible");
  }
}

function notify(message, undo) {
  const notification = document.querySelector(".notification");
  if (notification === null) {
    return;
  }

  if (storageUnavailable) {
    message = message + " Changes are temporary on this page.";
  }

  notification.replaceChildren();
  const text = document.createElement("span");
  text.textContent = message;
  notification.append(text);
  undoAction = null;
  let duration = 4500;

  if (undo !== undefined) {
    const undoButton = document.createElement("button");
    undoButton.textContent = "Undo";
    undoButton.dataset.action = "undo";
    notification.append(undoButton);
    undoAction = undo;
    duration = 10000;
  }

  notification.classList.add("visible");
  clearTimeout(notificationTimer);
  notificationTimer = setTimeout(hideNotification, duration);
}

function updateFavoriteControls() {
  const counters = document.querySelectorAll(".saved-count");
  for (const counter of counters) {
    counter.textContent = favorites.length;
  }

  const buttons = document.querySelectorAll('[data-action="save"]');
  for (const button of buttons) {
    const saved = isSaved(button.dataset.id);
    let iconName = "bookmark";
    let label = "Save term";

    if (saved) {
      iconName = "check";
      label = "Saved";
    }

    button.setAttribute("aria-pressed", saved);
    button.classList.toggle("is-saved", saved);
    button.innerHTML = icon(iconName) + "\n" + label;
  }
}

function saveFavorites() {
  store.write("define_favorites", favorites);
  updateFavoriteControls();
}

function featuredWindowHTML() {
  const term = featuredTerms[featuredIndex];
  const termURL = "dictionary.html?q=" + encodeURIComponent(term.term);
  let currentNumber = String(featuredIndex + 1);
  let totalNumber = String(featuredTerms.length);

  if (featuredIndex + 1 < 10) {
    currentNumber = "0" + currentNumber;
  }
  if (featuredTerms.length < 10) {
    totalNumber = "0" + totalNumber;
  }

  return `
    <div class="window featured-window">
      ${windowBar("a-little-discovery.exe")}
      <div class="featured-content" id="featured-content">
        <div class="featured-term">
          <h3>${escapeHTML(term.term)}</h3>
          <p>${escapeHTML(term.full)}</p>
        </div>
        <div class="featured-definition">
          <p>${escapeHTML(term.meaning)}</p>
          <div class="button-group">
            ${saveButton(term, isSaved(term.id))}
            ${speakButton(term)}
          </div>
        </div>
      </div>
      <div class="window-bottom">
        <a href="${termURL}">Explore this term ${icon("arrow")}</a>
        <div class="carousel-controls">
          <span aria-live="polite">
            ${currentNumber} <span class="muted">/ ${totalNumber}</span>
          </span>
          <button class="icon-button" data-action="previous-word" aria-label="Previous featured term">
            ${icon("back")}
          </button>
          <button class="icon-button" data-action="next-word" aria-label="Next featured term">
            ${icon("arrow")}
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderHome() {
  const featured = featuredWindowHTML();
  showPage(homeHTML(terms.length, featured));

  try {
    const openedBefore = sessionStorage.getItem("define_booted");
    const reducedMotion = matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (openedBefore === null && !reducedMotion) {
      const featuredWindow = document.querySelector(".featured-window");
      featuredWindow.classList.add("first-open");
      sessionStorage.setItem("define_booted", "1");
    }
  } catch {
    // The dictionary remains usable when session storage is blocked.
  }
}

function renderDictionary() {
  showPage(dictionaryHTML(searchQuery, terms.length, favorites.length));
  updateResults();

  const searchInput = document.querySelector("#dictionary-search");
  const sortInput = document.querySelector("#sort");
  const search = document.querySelector(".search-form");
  searchInput.addEventListener("input", handleSearchInput);
  sortInput.addEventListener("change", updateResults);
  search.addEventListener("submit", handleSearchSubmit);
}

function handleSearchInput(event) {
  searchQuery = event.target.value;
  updateResults();
  updateDictionaryURL();
}

function handleSearchSubmit(event) {
  event.preventDefault();
  const searchInput = document.querySelector("#dictionary-search");
  searchQuery = searchInput.value;
  updateResults();
  updateDictionaryURL();
  document.querySelector("#result-count").focus();
}

function updateDictionaryURL() {
  const parameters = new URLSearchParams();
  let nextURL = "dictionary.html";

  if (searchQuery !== "") {
    parameters.set("q", searchQuery);
    nextURL = nextURL + "?" + parameters.toString();
  }

  history.replaceState(null, "", nextURL);
}

function updateResults() {
  let query = searchQuery.trim();
  query = query.toLowerCase();
  const results = [];

  for (const term of terms) {
    let searchableText = term.term + " " + term.full + " " + term.meaning;
    if (term.notes !== undefined) {
      for (const note of term.notes) {
        searchableText = searchableText + " " + note.text;
      }
    }
    searchableText = searchableText.toLowerCase();

    if (query === "" || searchableText.includes(query)) {
      results.push(term);
    }
  }

  const sortInput = document.querySelector("#sort");
  if (sortInput.value === "za") {
    results.reverse();
  }

  let description = results.length + " terms";
  if (results.length === 1) {
    description = "1 term";
  }
  if (query !== "") {
    description = description + " matching “" + searchQuery.trim() + "”";
  }
  document.querySelector("#result-count").textContent = description;

  let rows = "";
  for (const term of results) {
    let open = false;
    if (results.length === 1 || term.term.toLowerCase() === query) {
      open = true;
    }
    rows = rows + termRow(term, isSaved(term.id), open);
  }
  if (results.length === 0) {
    rows = noResultsHTML();
  }
  document.querySelector("#term-results").innerHTML = rows;
}

function clearSearch() {
  searchQuery = "";
  document.querySelector("#dictionary-search").value = "";
  updateResults();
  updateDictionaryURL();
  document.querySelector("#dictionary-search").focus();
}

function renderSaved() {
  let rows = "";
  for (const id of favorites) {
    const term = findTerm(id);
    if (term === null) {
      rows = rows + customTermHTML(id);
    } else {
      rows = rows + termRow(term, true, true);
    }
  }
  showPage(savedHTML(favorites.length, rows));
  document
    .querySelector("#custom-form")
    .addEventListener("submit", addCustomTerm);
}

function addCustomTerm(event) {
  event.preventDefault();
  const input = document.querySelector("#custom-term");
  const name = input.value.trim();
  if (name === "") {
    return;
  }

  const knownTerm = findTermByName(name);
  let savedName = name;
  if (knownTerm !== null) {
    savedName = knownTerm.id;
  }

  for (const id of favorites) {
    if (id.toLowerCase() === savedName.toLowerCase()) {
      notify("That discovery is already in your collection.");
      return;
    }
  }

  favorites.push(savedName);
  saveFavorites();
  renderSaved();
  document.querySelector("#custom-term").focus();
  notify("Your term is in the collection.");
}

function removeFavorite(id) {
  const remaining = [];
  for (const savedID of favorites) {
    if (savedID !== id) {
      remaining.push(savedID);
    }
  }
  favorites = remaining;
  saveFavorites();

  if (pageName === "saved") {
    renderSaved();
    const toolbar = document.querySelector(".saved-toolbar");
    toolbar.setAttribute("tabindex", "-1");
    toolbar.focus();
  }

  notify("Removed from your collection.", function () {
    favorites.push(id);
    saveFavorites();
    if (pageName === "saved") {
      renderSaved();
    }
    notify("Discovery restored.");
  });
}

function toggleFavorite(id) {
  if (isSaved(id)) {
    removeFavorite(id);
  } else {
    favorites.push(id);
    saveFavorites();
    notify("A good discovery. Saved for later.");
  }
}

function clearFavorites() {
  const previousFavorites = favorites.slice();
  favorites = [];
  saveFavorites();
  renderSaved();

  notify("Collection cleared.", function () {
    favorites = previousFavorites;
    saveFavorites();
    renderSaved();
    notify("Collection restored.");
  });
}

function speakTerm(id) {
  const term = findTerm(id);
  if (term === null) {
    return;
  }
  if (!("speechSynthesis" in window)) {
    notify(
      "Pronunciation is not supported in this browser. Try a browser with speech support.",
    );
    return;
  }

  speechSynthesis.cancel();
  const pronunciation = new SpeechSynthesisUtterance(
    term.term + ". " + term.full,
  );
  pronunciation.lang = "en-US";
  pronunciation.rate = 0.9;
  pronunciation.onerror = function () {
    notify(
      "Pronunciation could not play. Check your device’s speech and audio settings.",
    );
  };
  speechSynthesis.speak(pronunciation);
  notify("Playing pronunciation for " + term.term + ".");
}

function changeFeaturedWord(direction, action) {
  featuredIndex = featuredIndex + direction;
  if (featuredIndex < 0) {
    featuredIndex = featuredTerms.length - 1;
  }
  if (featuredIndex >= featuredTerms.length) {
    featuredIndex = 0;
  }

  document.querySelector("#featured").innerHTML = featuredWindowHTML();
  const selector = '[data-action="' + action + '"]';
  document.querySelector(selector).focus({ preventScroll: true });

  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (document.documentElement.dataset.input === "keyboard" || reducedMotion) {
    return;
  }

  const content = document.querySelector("#featured-content");
  const frames = [
    { opacity: 0.5, transform: "translateY(5px)" },
    { opacity: 1, transform: "translateY(0)" },
  ];
  const settings = {
    duration: 220,
    easing: "cubic-bezier(0.23, 1, 0.32, 1)",
  };
  content.animate(frames, settings);
}

function renderQuiz() {
  if (level === null) {
    showPage(quizMenuHTML(quizzes, readScores()));
  } else {
    quizState = createQuiz(quizzes[level]);
    renderQuestion(false);
  }
}

function renderQuestion(moveFocus) {
  selectedAnswer = null;
  showPage(questionHTML(level, quizState));
  const form = document.querySelector("#answer-form");
  form.addEventListener("change", selectQuizAnswer);
  form.addEventListener("submit", submitQuizAnswer);

  if (moveFocus) {
    document.querySelector("#question-heading").focus();
  }
}

function selectQuizAnswer() {
  const selectedInput = document.querySelector('input[name="answer"]:checked');
  if (selectedInput !== null) {
    selectedAnswer = Number(selectedInput.value);
    document.querySelector("#check-answer").disabled = false;
  }
}

function submitQuizAnswer(event) {
  event.preventDefault();

  if (quizState.checked) {
    nextQuestion(quizState);
    if (quizState.index === quizState.questions.length) {
      renderResults();
    } else {
      renderQuestion(true);
    }
    return;
  }

  const accepted = answerQuiz(quizState, selectedAnswer);
  if (!accepted) {
    return;
  }

  const question = quizState.questions[quizState.index];
  const options = document.querySelectorAll(".answer-option");
  for (let index = 0; index < options.length; index = index + 1) {
    const option = options[index];
    const input = option.querySelector("input");
    input.disabled = true;
    if (index === question.answer) {
      option.classList.add("correct");
    }
    if (index === selectedAnswer && selectedAnswer !== question.answer) {
      option.classList.add("incorrect");
    }
  }

  const feedback = document.querySelector("#answer-feedback");
  if (selectedAnswer === question.answer) {
    feedback.classList.add("correct");
    feedback.textContent = "That’s it. Nicely done!";
  } else {
    feedback.classList.add("incorrect");
    feedback.textContent =
      "A little learning moment. The answer is " +
      question.choices[question.answer] +
      ".";
  }

  let nextLabel = "Next question";
  if (quizState.index === quizState.questions.length - 1) {
    nextLabel = "See my results";
  }
  const nextButton = document.querySelector("#check-answer");
  nextButton.innerHTML = nextLabel + "\n" + icon("arrow");
}

function renderResults() {
  const score = quizScore(quizState);
  const records = readScores();
  let bestScore = score;
  const previous = records[level];

  if (previous !== undefined) {
    if (previous.best > score) {
      bestScore = previous.best;
    }
  }

  records[level] = {
    best: bestScore,
    last: score,
    total: quizState.questions.length,
  };
  store.write("define_scores", records);
  showPage(resultsHTML(level, quizState, score));
  const heading = document.querySelector("h1");
  heading.tabIndex = -1;
  heading.focus();
}

function renderWelcome() {
  showPage(welcomeHTML());
  document
    .querySelector("#profile-form")
    .addEventListener("submit", saveProfile);
}

function saveProfile(event) {
  event.preventDefault();
  const input = document.querySelector("#email");
  let email = input.value.trim();
  email = email.toLowerCase();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    const error = document.querySelector("#profile-error");
    error.textContent =
      "Please enter a valid email address, such as you@example.com.";
    input.setAttribute("aria-invalid", "true");
    return;
  }

  try {
    browserStorage.setItem("define_profile_email", email);
    location.href = "index.html";
  } catch {
    handleStorageFailure();
    notify(
      "Storage is unavailable. You can still explore without a saved profile.",
    );
  }
}

function renderProfile() {
  const scores = readScores();
  showPage(profileHTML(profileEmail, favorites.length, scores));
}

function removeProfile() {
  store.remove("define_profile_email");
  profileEmail = "";
  renderProfile();
  notify("Local profile removed. Your discoveries are still here.");
}

function resetScores() {
  const previousScores = readScores();
  store.write("define_scores", {});
  renderProfile();
  notify("Quiz history reset.", function () {
    store.write("define_scores", previousScores);
    renderProfile();
    notify("Quiz history restored.");
  });
}

// One click listener routes each named button to a small function above.
function handlePageClick(event) {
  const button = event.target.closest("[data-action]");
  if (button === null) {
    return;
  }
  const action = button.dataset.action;

  if (action === "save") {
    toggleFavorite(button.dataset.id);
  } else if (action === "speak") {
    speakTerm(button.dataset.id);
  } else if (action === "previous-word") {
    changeFeaturedWord(-1, action);
  } else if (action === "next-word") {
    changeFeaturedWord(1, action);
  } else if (action === "reset-search") {
    clearSearch();
  } else if (action === "clear-saved") {
    clearFavorites();
  } else if (action === "remove-custom") {
    removeFavorite(button.dataset.id);
  } else if (action === "undo") {
    if (undoAction !== null) {
      const restore = undoAction;
      undoAction = null;
      restore();
    }
  } else if (action === "retry") {
    quizState = createQuiz(quizzes[level]);
    renderQuestion(true);
  } else if (action === "logout") {
    removeProfile();
  } else if (action === "reset-scores") {
    resetScores();
  }
}

function handleKeyboardInput(event) {
  if (event.key === "Tab" || event.key === "Enter" || event.key === " ") {
    document.documentElement.dataset.input = "keyboard";
  }
}

function handlePointerInput() {
  document.documentElement.dataset.input = "pointer";
}

function handleOtherTabChange(event) {
  if (event.key === "define_favorites") {
    favorites = readFavorites();
    updateFavoriteControls();
    if (pageName === "saved") {
      renderSaved();
    }
  }
  if (event.key === "define_profile_email") {
    profileEmail = store.raw("define_profile_email");
    if (pageName === "profile") {
      renderProfile();
    }
  }
}

document.addEventListener("click", handlePageClick);
document.addEventListener("keydown", handleKeyboardInput);
document.addEventListener("pointerdown", handlePointerInput);
window.addEventListener("storage", handleOtherTabChange);

// Start the page named by its HTML file.
if (pageName === "dictionary") {
  renderDictionary();
} else if (pageName === "saved") {
  renderSaved();
} else if (pageName === "quiz") {
  renderQuiz();
} else if (pageName === "welcome") {
  renderWelcome();
} else if (pageName === "profile") {
  renderProfile();
} else {
  renderHome();
}

if (storageUnavailable) {
  notify(
    "Browser storage is unavailable. You can explore, but changes may not persist.",
  );
}
