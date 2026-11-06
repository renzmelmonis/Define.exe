# Define.exe

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
npm run verify:migration
npm run format:check
npm run build
```

Deploy the **contents of `dist/`** to a static host. Serve over HTTP rather than opening HTML through `file://`, because the app uses JavaScript modules. Build output contains six clean pages, content-hashed CSS/JS, local assets, and redirects for all 19 original HTML URLs. No deployment or remote push was performed.

## Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Welcome, featured terms, search, COC categories, quiz shortcuts |
| `dictionary.html` | Live search, category filtering, sorting, expandable definitions, pronunciation, saving |
| `saved.html` | Saved definitions, custom terms, removal, clear and undo |
| `quiz.html` | Level selection; `?level=easy`, `medium`, or `hard` starts a quiz |
| `welcome.html` | School-email local profile |
| `profile.html` | Local profile, quiz history, legacy saved information |

Dictionary links accept `?q=CPU` and `?category=coc1` (also `coc2`, `coc3`, `others`).

## Structure

```text
src/
  app.js           Page rendering and event coordination
  components.js    Shared icons, search form, window chrome, HTML escaping
  data.js          Original vocabulary, category membership, reference notes, quizzes
  quiz.js          Shuffle, answer locking, progress, scoring
  storage.js       Safe persistence and legacy favorites migration
  styles.css       Shared design tokens, responsive layouts, motion, accessibility
public/
  assets/          School seal, favicon, self-hosted fonts and license
  manifest.json    App metadata
scripts/
  build.mjs        Static pages, legacy redirects, content-hashed modules
  dev.mjs          Local preview and source watcher
  verify-migration.mjs  Compare learning content with the original Git revision
tests/            Node tests for data, quiz rules, storage, escaping, and output
```

Edit source files rather than generated files in `dist/`. The old per-page copies of CSS, dictionaries, and scripts have been replaced by shared modules. The original files remain recoverable from Git revision `8a8fcd2013c5775ee819d026cc9b006e0d1140b1`.

## Preserved learning content and behavior

129 unique terms retain 423 original definition occurrences through primary definitions and expandable reference notes. All 35 original questions remain unchanged: 15 easy, 10 medium, 10 hard. COC memberships are merged where a term appeared in more than one original dictionary.

Favorites migrate once from both `favorites` and `favoritesAll` into `define_favorites`. Custom terms are retained and rendered as text. Scores use `define_scores`; the original `terminotech_user`, `userEmail`, and `userScore` values remain supported. Storage belongs to the browser origin, so data from a different hosted origin cannot automatically move to this local preview.

The original email screen never validated passwords. The new screen accurately describes its school-email entry as a **local profile**. It creates no online account or secure authenticated session. Removing the profile keeps terms and quiz history; quiz history can be reset separately. Pronunciation uses the browser's speech engine and depends on available device voices.

## Interaction and accessibility

Semantic links, forms, native disclosures and radio groups support keyboard use. Search and answer feedback announce changes, focus follows quiz progression, and saved controls expose their state. Pointer hover effects are gated to suitable devices. A single window-opening sequence introduces the home view; routine feedback stays brief. Keyboard-triggered actions update immediately, and reduced motion removes spatial movement.

See `VALIDATION.md` for actual checks and limits, `DESIGN.md` for visual tokens, and `WORKLOG.md` for scope and completion records.
