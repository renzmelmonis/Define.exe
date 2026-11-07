// Escape user text before putting it inside an HTML string.
export function escapeHTML(value) {
  let text = String(value);
  text = text.replaceAll("&", "&amp;");
  text = text.replaceAll("<", "&lt;");
  text = text.replaceAll(">", "&gt;");
  text = text.replaceAll('"', "&quot;");
  text = text.replaceAll("'", "&#39;");
  return text;
}

const paths = {
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/>',
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  back: '<path d="M19 12H5m6-6-6 6 6 6"/>',
  bookmark: '<path d="M6 4h12v17l-6-4-6 4z"/>',
  book: '<path d="M12 5C8 2 4 3 2 4v15c4-2 7-1 10 1 3-2 6-3 10-1V4c-2-1-6-2-10 1zm0 0v15"/>',
  volume:
    '<path d="m11 4-5 5H2v6h4l5 5zm4 4a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  monitor:
    '<rect x="2" y="3" width="20" height="14" rx="1"/><path d="M12 17v4m-5 0h10M7 8l3 2-3 2m6 0h4"/>',
  game: '<path d="M6 7h12l4 11c.7 3-3 4-5 1l-2-3H9l-2 3c-2 3-6 2-5-1zM7 9v6m-3-3h6m6-1h.01m3 3h.01"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 22v-2a8 8 0 0 1 16 0v2"/>',
  folder: '<path d="M3 6h7l2 3h9v12H3zM3 6V3h7l2 3h9v3"/>',
  repeat:
    '<path d="M20 7H7a4 4 0 0 0-4 4m17-4-4-4m4 4-4 4M4 17h13a4 4 0 0 0 4-4M4 17l4 4m-4-4 4-4"/>',
  trophy:
    '<path d="M7 3h10v6a5 5 0 0 1-10 0zm5 11v6m-5 1h10M7 5H3v3c0 3 2 4 5 4m9-7h4v3c0 3-2 4-5 4"/>',
};

export function icon(name, extraClass = "") {
  let drawing = paths[name];

  if (drawing === undefined) {
    drawing = paths.book;
  }

  return `
    <svg
      class="icon ${extraClass}"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.7"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      ${drawing}
    </svg>
  `;
}

export function pixelMark() {
  return `
    <svg
      class="pixel-mark"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M2 3h28v20H18v4h7v3H7v-3h7v-4H2z"
      />
      <path fill="#dff2ff" d="M5 6h22v14H5z" />
      <path
        fill="currentColor"
        d="M9 10h3v3H9zm11 0h3v3h-3zm-8 6h8v2h-8z"
      />
    </svg>
  `;
}

export function searchForm(value = "", compact = false) {
  let formClass = "search-form";

  if (compact) {
    formClass = formClass + " compact";
  }

  return `
    <form class="${formClass}" action="dictionary.html" role="search">
      <label class="sr-only" for="dictionary-search">Search IT terms</label>
      ${icon("search")}
      <input
        id="dictionary-search"
        name="q"
        type="search"
        value="${escapeHTML(value)}"
        placeholder="Search a term, find your aha!"
        autocomplete="off"
        spellcheck="false"
      >
      <button class="search-submit" type="submit">
        Find a term
        ${icon("arrow")}
      </button>
    </form>
  `;
}

export function windowBar(title) {
  return `
    <div class="window-bar">
      <span class="window-dots" aria-hidden="true">
        <i></i>
        <i></i>
        <i></i>
      </span>
      <span>${escapeHTML(title)}</span>
      <span class="window-symbol" aria-hidden="true">×</span>
    </div>
  `;
}

export function saveButton(term, saved) {
  let buttonClass = "button small";
  let buttonIcon = "bookmark";
  let buttonText = "Save term";

  if (saved) {
    buttonClass = buttonClass + " is-saved";
    buttonIcon = "check";
    buttonText = "Saved";
  }

  return `
    <button
      class="${buttonClass}"
      data-action="save"
      data-id="${escapeHTML(term.id)}"
      aria-pressed="${saved}"
    >
      ${icon(buttonIcon)}
      ${buttonText}
    </button>
  `;
}

export function speakButton(term) {
  return `
    <button
      class="button small quiet"
      data-action="speak"
      data-id="${escapeHTML(term.id)}"
    >
      ${icon("volume")}
      Listen
      <span class="sr-only">to ${escapeHTML(term.term)}</span>
    </button>
  `;
}

export function termRow(term, saved, open) {
  let openAttribute = "";
  let notesHTML = "";

  if (open) {
    openAttribute = "open";
  }

  if (term.notes !== undefined) {
    if (term.notes.length > 0) {
      let paragraphs = "";

      for (const note of term.notes) {
        paragraphs = paragraphs + `<p>${escapeHTML(note.text)}</p>\n`;
      }

      notesHTML = `
        <details class="reference-note">
          <summary>More about this term</summary>
          ${paragraphs}
        </details>
      `;
    }
  }

  return `
    <details class="term-row" ${openAttribute}>
      <summary>
        <span class="term-name">${escapeHTML(term.term)}</span>
        <span class="term-full">${escapeHTML(term.full)}</span>
        <span class="expand-symbol" aria-hidden="true">+</span>
      </summary>
      <div class="term-body">
        <p>${escapeHTML(term.meaning)}</p>
        ${notesHTML}
        <div class="button-group">
          ${saveButton(term, saved)}
          ${speakButton(term)}
        </div>
      </div>
    </details>
  `;
}
