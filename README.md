# Define.exe

[Live site](https://renzmelmonis.github.io/Define.exe/) · [GitHub source](https://github.com/renzmelmonis/Define.exe)

An ICT dictionary and quiz companion, redesigned from the supplied Define.exe PDF. Pale blue surfaces, self-hosted pixel typography, white reading windows, and short, purposeful interactions carry one visual system across every page.

## Run locally

Requires Node.js 20 or newer.

```sh
npm install
npm run dev
```

Open http://127.0.0.1:4173. The development server watches `src/` and `public/`; refresh the browser after a change. Set `PORT` to use another port. The server binds to this computer only.

```sh
npm run check
npm test
npm run format:check
npm run build
```

Deploy the **contents of `dist/`** to a static host. Serve over HTTP rather than opening HTML through `file://`, because the app uses JavaScript modules. Build output contains six clean pages, content-hashed CSS/JS, local assets, and only the six current HTML pages. GitHub Pages builds and deploys `dist/` automatically when `main` is updated.

## GitHub Pages

The `.github/workflows/pages.yml` workflow installs dependencies, checks syntax, runs tests, builds the site, and uploads only `dist/`. Pages must use **GitHub Actions** as its publishing source, rather than deploying the repository root from a branch. Manual redeployment is available through the workflow’s **Run workflow** action.

## Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Welcome, featured terms, search, Dictionary and Mini Quiz shortcuts |
| `dictionary.html` | One searchable dictionary, sorting, expandable definitions, pronunciation, saving |
| `saved.html` | Saved definitions, custom terms, removal, clear and undo |
| `quiz.html` | Level selection; `?level=easy`, `medium`, or `hard` starts a quiz |
| `welcome.html` | Optional email-based local profile |
| `profile.html` | Local profile and quiz history |

Dictionary links accept `?q=CPU`. Saved terms are available from inside the dictionary.

## Structure

```text
src/
  app.js           Step-by-step page behavior and named event handlers
  views.js         Multiline HTML for each page
  components.js    Shared icons, search form, window chrome, HTML escaping
  data.js          Unified vocabulary, reference notes, quizzes
  quiz.js          Shuffle, answer locking, progress, scoring
  storage.js       Current browser storage and temporary failure recovery
  styles.css       Shared design tokens, responsive layouts, motion, accessibility
public/
  assets/          Favicon, self-hosted fonts and license
  manifest.json    App metadata
scripts/
  build.mjs        Current multiline pages and content-hashed modules
  check.mjs        Syntax-check each JavaScript file in a simple loop
  dev.mjs          Local preview and source watcher
tests/            Node tests for data, quiz rules, storage, escaping, and output
```

Edit source files rather than generated files in `dist/`. Page styles, dictionary data, and behavior live in shared readable modules. The original files remain recoverable from Git revision `8a8fcd2013c5775ee819d026cc9b006e0d1140b1`.

## Preserved learning content and behavior

129 unique terms retain 423 original definition occurrences through primary definitions and expandable reference notes. All 35 original questions remain unchanged: 15 easy, 10 medium, 10 hard. The owner deferred term removals. Every term remains available in one dictionary without COC sections.

Saved terms use `define_favorites`, quiz history uses `define_scores`, and the optional local profile uses `define_profile_email`. The app reads and writes only these current keys. There are no old-format importers, old-page aliases, redirect pages, or compatibility forms. Custom terms are still supported and rendered safely as text. Browser data is specific to the site's origin.

The original email screen never validated passwords. The new screen accurately describes its optional email entry as a **local profile**. It creates no online account or secure authenticated session. Removing the profile keeps terms and quiz history; quiz history can be reset separately. Pronunciation uses the browser's speech engine and depends on available device voices.

## Interaction and accessibility

Semantic links, forms, native disclosures and radio groups support keyboard use. Search and answer feedback announce changes, focus follows quiz progression, and saved controls expose their state. Pointer hover effects are gated to suitable devices. A single window-opening sequence introduces the home view; routine feedback stays brief. Keyboard-triggered actions update immediately, and reduced motion removes spatial movement.

See `VALIDATION.md` for actual checks and limits, `DESIGN.md` for visual tokens, and `WORKLOG.md` for scope and completion records.

The repository was renamed from `Terminotech-website` to `Define.exe`. Share the new Pages link above; GitHub repository redirects do not redirect old project-site URLs.

## Reading the code

The handwritten JavaScript uses named functions, ordinary loops, explicit variables, and `if` statements. HTML templates have one element or attribute per line where practical. Source files and built JavaScript are not minified.

1. Start with `src/data.js`: a term has a name, full form, meaning, and optional notes.
2. Read `src/views.js` for page HTML, and `src/components.js` for shared markup. These functions return HTML; they do not save data or change quiz scores.
3. Read `src/app.js` from top to bottom. It reads the URL, loads browser data, draws the selected page, and connects named event handlers to forms and buttons.
4. Follow `handlePageClick` to see what each button does. For a quiz, follow `selectQuizAnswer`, `submitQuizAnswer`, and `renderResults`.
5. Read `src/quiz.js` for the scoring rules and `src/storage.js` for current browser storage. Both use normal loops with intermediate variables.
6. `scripts/build.mjs` writes the HTML files and versioned assets. `scripts/dev.mjs` serves that output for local practice. The GitHub Actions workflow runs the same checks and build before publishing.
