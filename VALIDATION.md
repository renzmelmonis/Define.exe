# Validation record

Validated November 7, 2026 (Asia/Manila). Local implementation; no GitHub push or hosted deployment.

## Automated verification

- `npm run check`: syntax checks pass.
- `npm test`: 14 tests pass. They cover the full catalog, original question-bank sizes and valid answers, duplicate-answer rejection, invalid answers, complete perfect runs on all three levels, mixed scoring/review agreement, unbiased-shuffle integrity, both favorites migrations, malformed storage, unavailable storage, temporary write/removal recovery, updates from other tabs, safe custom text, static output, asset links, app metadata, and all legacy redirects.
- `npm run verify:migration`: 423 original definition occurrences across 129 unique terms and all 35 original quiz questions match Git revision `8a8fcd2013c5775ee819d026cc9b006e0d1140b1`. Repeated definitions are merged into primary entries and expandable notes.
- `npm run format:check`: formatted source and scripts pass.
- `npm run build`: static output generated successfully.
- `git diff --check`: no whitespace errors.
- Impeccable detector ran once on application, shared components, and stylesheet; returned `[]`.
- Raster provenance scan: one original school-seal raster, zero missing provenance records.
- HTTP checks: all six canonical pages, 19 original URL redirects, manifest, favicon, and school seal return 200. Product records, source files, and Git metadata return 404 because the server serves only `dist/`.

## Browser verification

Used the real in-app browser through CUA, with screenshots and DOM/computed-style observations. The recorded desktop viewport is 1440×1000, touch-mode mobile is 390×844, and the actual narrow preview width is 319px. All final captured pages have document width equal to viewport width. All canonical views have one H1. Self-hosted fonts loaded successfully. No warnings/errors appeared in the final browser log check.

Exercised:

- Featured-term previous/next navigation, saving, unsaving, saved-count updates, and saved definitions across navigation.
- Custom favorites, clear collection, and undo.
- Live search, exact-term expansion, no-results recovery, category filters, reverse sorting, and Enter-to-search.
- Invalid school-email feedback, valid synthetic school-email local profile, profile removal, local information clearing, and history reset.
- A complete 10-question medium quiz through answer locking, feedback, results, review data, score history, and retry. Pure domain tests also exercise full completion and scoring for all difficulty banks.
- Browser pronunciation request and its visible status. Physical speaker output and voice quality were not verified.
- Reduced-motion emulation reports no focal window animation; emulation was restored afterward.
- Touch emulation reports `pointer: coarse` and 16px computed font sizes for search, custom-term, school-email, and legacy profile inputs. Browser zoom is unrestricted.
- An initially saved button, unsaved after page navigation, reports `aria-pressed=false`, no `is-saved` class, and the blue unsaved background.
- Temporary QA-only pages simulated storage write/removal failure. The dictionary warning remained visible; a second complete 10-question quiz retained its score and persistent warning after results re-rendering. Memory fallback is limited to the current page and the UI explicitly states that navigation/reload loses changes. The final clean build removes these QA pages.

Synthetic browser profile, favorites, score history, and legacy-score fixtures were cleared after testing. Browser cache/touch/media/viewport overrides were restored.

Screenshots and raw observation records are under `.impeccable/review/` (local, Git-ignored). They are browser captures, not rendered mockups.

## Independent review

The finish reviewer inspected 21 captures and confirmed the PDF's blue/pixel/white-window direction. Its bounded correction list addressed mobile focus zoom, stale saved-state styling, persistence-failure feedback, and final design-system documentation. The same reviewer scored all four findings resolved, with `disposition: ship` for that bounded correction list. The scored verdict is recorded in `.impeccable/review/finish-verdict.md`.

## Limits

Responsive and touch emulation were checked; no physical iPhone/Android test or Safari engine run was performed. Voice output depends on the user's browser/device voices. The site remains a static browser-local learning tool; it has no online account service, cross-device sync, or secure authentication backend. Existing learning content was preserved and was not independently fact-checked as a new curriculum.
