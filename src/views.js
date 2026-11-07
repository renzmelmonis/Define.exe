// This file contains page markup. Each HTML element is written on its own line.
// app.js supplies the data and handles the buttons and forms.
import {
  escapeHTML,
  icon,
  pixelMark,
  searchForm,
  windowBar,
} from "./components.js";

export function titleCase(text) {
  const firstLetter = text.charAt(0).toUpperCase();
  const remainingLetters = text.slice(1);
  return firstLetter + remainingLetters;
}

export function headerHTML(page, hasProfile) {
  let dictionaryCurrent = "";
  let quizCurrent = "";
  let profileURL = "welcome.html";
  let profileLabel = "Create a local profile";
  let profileText = "Get started";

  if (page === "dictionary") {
    dictionaryCurrent = 'aria-current="page"';
  }
  if (page === "quiz") {
    quizCurrent = 'aria-current="page"';
  }
  if (hasProfile) {
    profileURL = "profile.html";
    profileLabel = "Your profile";
    profileText = "My space";
  }

  return `
    <header class="site-header">
      <a class="brand" href="index.html" aria-label="Define.exe home">
        ${pixelMark()}
        <span>Define.exe</span>
      </a>
      <nav aria-label="Main navigation">
        <a href="dictionary.html" ${dictionaryCurrent}>Dictionary</a>
        <a href="quiz.html" ${quizCurrent}>Mini quiz</a>
      </nav>
      <a class="profile-link" href="${profileURL}" aria-label="${profileLabel}">
        ${icon("user")}
        <span>${profileText}</span>
      </a>
    </header>
  `;
}

export function footerHTML() {
  return `
    <footer class="site-footer">
      <div>
        <a class="brand footer-brand" href="index.html">
          ${pixelMark()}
          <span>Define.exe</span>
        </a>
        <p>A little clarity goes a long way.</p>
      </div>
      <p class="footer-note">Explore. Understand. Remember.</p>
      <a href="profile.html">
        Your local data
        ${icon("arrow")}
      </a>
    </footer>
  `;
}

export function homeHTML(termCount, featuredHTML) {
  const suggestions = ["CPU", "HTML", "Firewall", "JSON"];
  let suggestionLinks = "";

  for (const word of suggestions) {
    suggestionLinks =
      suggestionLinks +
      `
      <a href="dictionary.html?q=${encodeURIComponent(word)}">
        ${escapeHTML(word)}
        ${icon("arrow")}
      </a>
    `;
  }

  return `
    <section class="hero">
      <div class="hero-copy">
        <h1>Define.exe<span class="pixel-cursor" aria-hidden="true"></span></h1>
        <p class="hero-lead">Goodbye, jargon.<br>Hello, understanding.</p>
        <p>
          Your pocket dictionary for IT terms. Find a word, save a discovery,
          and make a little more sense of the digital world.
        </p>
        <span class="hero-note">A small tool for curious minds.</span>
      </div>
      <div class="hero-shortcuts">
        <a class="shortcut" href="dictionary.html">
          <span class="shortcut-icon">${icon("monitor")}</span>
          <span>
            <strong>Open the dictionary</strong>
            <span>Big ideas, simply explained.</span>
          </span>
          ${icon("arrow")}
        </a>
        <a class="shortcut" href="quiz.html">
          <span class="shortcut-icon">${icon("game")}</span>
          <span>
            <strong>Take a mini quiz</strong>
            <span>Give your brain a little playtime.</span>
          </span>
          ${icon("arrow")}
        </a>
        <div class="shortcut-footnote">
          <span class="status-dot"></span>
          ${termCount} terms. Plenty of aha! moments.
        </div>
      </div>
    </section>
    <section class="home-search" aria-label="Find an IT term">
      ${searchForm()}
      <div class="search-suggestions">
        <span>Try a little curiosity:</span>
        ${suggestionLinks}
      </div>
    </section>
    <section class="discovery-section" aria-labelledby="discovery-title">
      <div class="section-heading">
        <h2 id="discovery-title">One word at a time.</h2>
        <span>Something new to know.</span>
      </div>
      <div id="featured">${featuredHTML}</div>
    </section>
  `;
}

export function dictionaryHTML(query, termCount, savedCount) {
  return `
    <section class="page-heading">
      <div>
        <h1>The dictionary.</h1>
        <p>Big ideas are easier when the words make sense.</p>
      </div>
      <span class="page-stamp">
        ${icon("book")}
        ${termCount} terms to discover
      </span>
    </section>
    <section class="dictionary" aria-label="ICT dictionary">
      ${searchForm(query, true)}
      <div class="dictionary-actions">
        <a class="text-link" href="saved.html">
          ${icon("bookmark")}
          Saved terms
          <span class="saved-count">${savedCount}</span>
        </a>
        <button class="text-button" data-action="reset-search">Clear search</button>
      </div>
      <div class="results-header">
        <p id="result-count" role="status" aria-live="polite" tabindex="-1"></p>
        <label class="sort-control">
          Sort
          <select id="sort">
            <option value="az">A to Z</option>
            <option value="za">Z to A</option>
          </select>
        </label>
      </div>
      <div class="window dictionary-window">
        ${windowBar("dictionary.exe")}
        <div id="term-results"></div>
      </div>
      <p class="helper-note">
        Open a term to see its definition, hear it, or save it for later.
      </p>
    </section>
  `;
}

export function noResultsHTML() {
  return `
    <div class="empty-state">
      ${icon("search")}
      <h2>No words here. Yet.</h2>
      <p>We couldn't find that term. Try a shorter word or another spelling.</p>
      <button class="button" data-action="reset-search">
        Show all terms
        ${icon("arrow")}
      </button>
    </div>
  `;
}

export function customTermHTML(name) {
  return `
    <article class="custom-term">
      <div>
        <span class="category-tag">Your custom term</span>
        <h2>${escapeHTML(name)}</h2>
        <p>A personal discovery from your collection.</p>
      </div>
      <button
        class="button small quiet"
        data-action="remove-custom"
        data-id="${escapeHTML(name)}"
      >
        ${icon("close")}
        Remove
      </button>
    </article>
  `;
}

export function savedHTML(savedCount, rows) {
  let savedDescription = "saved discoveries";
  let clearButton = "";

  if (savedCount === 1) {
    savedDescription = "saved discovery";
  }
  if (savedCount > 0) {
    clearButton = `
      <button class="text-button" data-action="clear-saved">Clear collection</button>
    `;
  } else {
    rows = `
      <div class="empty-state">
        ${icon("bookmark")}
        <h2>Make room for an aha!</h2>
        <p>
          Save a term from the dictionary and it will be right here
          when you need it.
        </p>
        <a class="button primary" href="dictionary.html">
          Explore the dictionary
          ${icon("arrow")}
        </a>
      </div>
    `;
  }

  return `
    <section class="page-heading">
      <div>
        <h1>Your little collection.</h1>
        <p>Good discoveries deserve a place to stay.</p>
      </div>
      <a class="button" href="dictionary.html">
        ${icon("plus")}
        Find more terms
      </a>
    </section>
    <div class="saved-toolbar">
      <span><strong>${savedCount}</strong> ${savedDescription}</span>
      ${clearButton}
    </div>
    <section class="window saved-window" aria-label="Saved terms">
      ${windowBar("saved-for-later.exe")}
      <div id="saved-list">${rows}</div>
    </section>
    <section class="custom-section">
      <div>
        <h2>A word of your own?</h2>
        <p>Add a term you want to look into later.</p>
      </div>
      <form id="custom-form">
        <label class="sr-only" for="custom-term">Custom term</label>
        <input
          id="custom-term"
          name="term"
          placeholder="Your next discovery…"
          required
          maxlength="100"
        >
        <button class="button" type="submit">
          ${icon("plus")}
          Add term
        </button>
      </form>
    </section>
    <p class="helper-note">
      ${icon("bookmark")}
      Saved on this browser. Your collection stays here between visits.
    </p>
  `;
}

export function difficultyRowsHTML(questionBanks, records) {
  const levels = ["easy", "medium", "hard"];
  let rows = "";

  for (const level of levels) {
    let title = "Start with the essentials";
    let description = "Build confidence with the basics.";
    let iconName = "monitor";
    let bestScore = "";

    if (level === "medium") {
      title = "Connect the dots";
      description = "A little more depth. A fresh challenge.";
      iconName = "folder";
    } else if (level === "hard") {
      title = "Go beyond the basics";
      description = "Put your technical knowledge to work.";
      iconName = "game";
    }

    const record = records[level];
    const total = questionBanks[level].length;

    if (record !== undefined) {
      bestScore = " · Best " + record.best + "/" + record.total;
    }

    rows =
      rows +
      `
      <a class="difficulty-row ${level}" href="quiz.html?level=${level}">
        <span class="level-icon">${icon(iconName)}</span>
        <span class="difficulty-copy">
          <strong>${title}</strong>
          <span>${description}</span>
        </span>
        <span class="difficulty-meta">
          <span class="difficulty-label">${titleCase(level)}</span>
          <small>${total} questions${bestScore}</small>
        </span>
        ${icon("arrow")}
      </a>
    `;
  }

  return `<div class="difficulty-list">${rows}</div>`;
}

export function quizMenuHTML(questionBanks, records) {
  return `
    <section class="quiz-heading">
      <div class="quiz-emblem">${icon("game")}</div>
      <h1>Small quiz.<br>Big brain energy.</h1>
      <p>
        A little practice makes it stick. Choose your level.<br>
        No countdown, no pressure. Just keep discovering.
      </p>
    </section>
    <section class="quiz-selection" aria-label="Choose quiz difficulty">
      ${difficultyRowsHTML(questionBanks, records)}
    </section>
    <div class="quiz-tips">
      <span>${icon("check")} One question at a time</span>
      <span>${icon("book")} Review every answer</span>
      <span>${icon("repeat")} Try again anytime</span>
    </div>
    <div class="quiz-study-link">
      <p>A little warm-up first?</p>
      <a href="dictionary.html">
        Spend a minute in the dictionary
        ${icon("arrow")}
      </a>
    </div>
  `;
}

export function questionHTML(level, state) {
  const question = state.questions[state.index];
  const number = state.index + 1;
  const total = state.questions.length;
  const progress = state.index / total;
  let numberText = String(number);
  let choicesHTML = "";

  if (number < 10) {
    numberText = "0" + numberText;
  }

  for (let index = 0; index < question.choices.length; index = index + 1) {
    const letter = String.fromCharCode(65 + index);
    const choice = question.choices[index];

    choicesHTML =
      choicesHTML +
      `
      <label class="answer-option">
        <input type="radio" name="answer" value="${index}" required>
        <span class="answer-letter">${letter}</span>
        <span>${escapeHTML(choice)}</span>
        <span class="answer-indicator" aria-hidden="true"></span>
      </label>
    `;
  }

  return `
    <section class="quiz-play">
      <h1 class="sr-only">${titleCase(level)} mini quiz</h1>
      <div class="quiz-top">
        <a href="quiz.html" class="text-link">${icon("back")} All levels</a>
        <span class="difficulty-label ${level}">${titleCase(level)} quiz</span>
        <span>Question ${number} of ${total}</span>
      </div>
      <div
        class="question-progress"
        role="progressbar"
        aria-label="Quiz progress"
        aria-valuemin="0"
        aria-valuemax="${total}"
        aria-valuenow="${state.index}"
      >
        <span style="transform: scaleX(${progress})"></span>
      </div>
      <div class="window question-window">
        ${windowBar("a-little-brain-training.exe")}
        <form id="answer-form">
          <fieldset>
            <legend>
              <span class="question-number">${numberText}.</span>
              <span id="question-heading" tabindex="-1">
                ${escapeHTML(question.question)}
              </span>
            </legend>
            <div class="answers">${choicesHTML}</div>
          </fieldset>
          <div
            id="answer-feedback"
            class="answer-feedback"
            role="status"
            aria-live="polite"
          ></div>
          <div class="question-bottom">
            <span>Take your time. You've got this.</span>
            <button class="button primary" type="submit" id="check-answer" disabled>
              Check answer
              ${icon("arrow")}
            </button>
          </div>
        </form>
      </div>
    </section>
  `;
}

export function resultsHTML(level, state, score) {
  const total = state.questions.length;
  const toReview = total - score;
  let message = "Curiosity counts. Review, explore, and try again.";
  let rows = "";

  if (score === total) {
    message = "Every answer, on point. A perfect little run!";
  } else if (score >= total / 2) {
    message = "Good discoveries. Keep the momentum going.";
  }

  for (let index = 0; index < total; index = index + 1) {
    const question = state.questions[index];
    const selected = state.answers[index];
    let statusClass = "incorrect";
    let statusIcon = "close";
    let statusText = "Incorrect";
    let correction = "";

    if (selected === question.answer) {
      statusClass = "correct";
      statusIcon = "check";
      statusText = "Correct";
    } else {
      correction = `
        <p>
          <strong>Correct answer:</strong>
          ${escapeHTML(question.choices[question.answer])}
        </p>
      `;
    }

    rows =
      rows +
      `
      <details class="review-row">
        <summary>
          <span class="review-status ${statusClass}">
            ${icon(statusIcon)}
            <span class="sr-only">${statusText}</span>
          </span>
          <span>${escapeHTML(question.question)}</span>
          <span class="expand-symbol" aria-hidden="true">+</span>
        </summary>
        <div class="review-answer">
          <p>
            <span class="muted">Your answer:</span>
            ${escapeHTML(question.choices[selected])}
          </p>
          ${correction}
        </div>
      </details>
    `;
  }

  return `
    <section class="results-heading">
      <span class="result-trophy">${icon("trophy")}</span>
      <h1>A little wiser.</h1>
      <p>You completed the ${level} quiz. Every question is a step forward.</p>
      <div class="score-display">
        <strong>${score}</strong>
        <span>/ ${total}</span>
      </div>
      <p>${message}</p>
      <div class="button-group centered">
        <button class="button primary" data-action="retry">
          ${icon("repeat")}
          Try this level again
        </button>
        <a class="button" href="quiz.html">
          Choose another level
          ${icon("arrow")}
        </a>
      </div>
    </section>
    <section class="review-section">
      <div class="section-heading">
        <h2>Your answer rewind.</h2>
        <span>${score} correct · ${toReview} to revisit</span>
      </div>
      <div class="window review-window">
        ${windowBar("a-little-reflection.exe")}
        ${rows}
      </div>
    </section>
  `;
}

export function welcomeHTML() {
  return `
    <section class="welcome-layout">
      <div class="welcome-copy">
        ${pixelMark()}
        <h1>Your next aha!<br>starts here.</h1>
        <p>
          Keep a little space for what you learn.
          Add an email to personalize this browser.
        </p>
        <a class="text-link" href="index.html">
          Explore without a profile
          ${icon("arrow")}
        </a>
      </div>
      <div class="window welcome-window">
        ${windowBar("hello-there.exe")}
        <div class="welcome-form-content">
          <h2>Welcome, curious mind.</h2>
          <p>Set up your local learning profile.</p>
          <form id="profile-form">
            <label for="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autocomplete="email"
              placeholder="you@example.com"
              aria-describedby="email-help profile-error"
            >
            <p id="email-help" class="field-help">
              Any valid email works. It stays in this browser.
            </p>
            <p class="form-error" id="profile-error" role="alert"></p>
            <button class="button primary" type="submit">
              Let's get curious
              ${icon("arrow")}
            </button>
          </form>
          <p class="local-note">
            This is a local profile, saved on this browser.
            No password or online account is created.
          </p>
        </div>
      </div>
    </section>
  `;
}

export function profileHTML(profile, savedCount, records) {
  let heading = "Make yourself at home.";
  let description = "You’re exploring without a local profile.";
  let profileAction = `
    <a class="button primary" href="welcome.html">Add an email</a>
  `;
  let historyRows = "";
  const levels = ["easy", "medium", "hard"];

  if (profile !== "") {
    heading = "Hello again, curious mind.";
    description = profile;
    profileAction = `
      <button class="button" data-action="logout">Remove local profile</button>
    `;
  }

  for (const level of levels) {
    const record = records[level];
    let scoreDescription = "A fresh challenge awaits.";

    if (record !== undefined) {
      scoreDescription = "Best " + record.best + "/" + record.total;
      scoreDescription = scoreDescription + " · Last " + record.last;
      scoreDescription = scoreDescription + "/" + record.total;
    }

    historyRows =
      historyRows +
      `
      <div>
        <strong>${titleCase(level)}</strong>
        <span>${scoreDescription}</span>
        <a href="quiz.html?level=${level}">Play ${icon("arrow")}</a>
      </div>
    `;
  }

  return `
    <section class="page-heading">
      <div>
        <h1>Your learning space.</h1>
        <p>A few discoveries, all on this browser.</p>
      </div>
      <a class="button" href="index.html">Back to exploring ${icon("arrow")}</a>
    </section>
    <section class="window profile-window">
      ${windowBar("a-space-for-you.exe")}
      <div class="profile-content">
        <h2>${heading}</h2>
        <p>${escapeHTML(description)}</p>
        <div class="profile-actions">
          ${profileAction}
          <a class="button quiet" href="saved.html">
            ${icon("bookmark")}
            Your saved terms
            <span class="saved-count">${savedCount}</span>
          </a>
        </div>
        <h3>Your quiz history</h3>
        <div class="score-history">${historyRows}</div>
        <button class="text-button" data-action="reset-scores">Reset quiz history</button>
        <h3>About your local data</h3>
        <p>
          Your email, saved terms, and quiz scores are stored in this browser.
          They don’t sync to another device. Removing the profile keeps your
          saved terms and quiz results.
        </p>
      </div>
    </section>
  `;
}
