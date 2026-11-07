---
name: Define.exe
description: A friendly blue learning desktop for ICT vocabulary.
colors:
  sky: "#dff2ff"
  sky-deep: "#bddff5"
  blue: "#a9d5f1"
  paper: "#fff"
  ink: "#152c3b"
  secondary: "#405d71"
  line: "#95b7cc"
  soft-line: "#c9deeb"
  accent: "#245f8a"
  green: "#21634a"
  green-bg: "#e5f3e8"
  amber: "#805511"
  amber-bg: "#fff1d7"
  red: "#a43838"
  red-bg: "#fff0ed"
typography:
  display:
    fontFamily: "Silkscreen, monospace"
    fontSize: "clamp(48px, 6.5vw, 84px)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Silkscreen, monospace"
    fontSize: "clamp(22px, 2.4vw, 30px)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.035em"
  body:
    fontFamily: "\"Arial\", \"Helvetica Neue\", sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "\"Arial\", \"Helvetica Neue\", sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.4
  category:
    fontFamily: "\"Arial\", \"Helvetica Neue\", sans-serif"
    fontSize: "10px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.04em"
  dictionary-term:
    fontFamily: "Silkscreen, monospace"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  badge: "5px"
  chip: "7px"
  search-button: "8px"
  control: "9px"
  answer: "10px"
  shortcut: "12px"
  window: "14px"
spacing:
  tight: "8px"
  control-gap: "10px"
  group-gap: "12px"
  section-gap: "20px"
  panel-gap: "24px"
  panel: "28px"
  wide-gap: "32px"
components:
  button:
    backgroundColor: "{colors.sky-deep}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "11px 19px"
    typography: "{typography.label}"
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "11px 19px"
    typography: "{typography.label}"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "11px 19px"
    typography: "{typography.label}"
  button-saved:
    backgroundColor: "{colors.green-bg}"
    textColor: "{colors.green}"
    rounded: "{rounded.control}"
    padding: "10px 14px"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "13px 15px"
    typography: "{typography.body}"
  navigation:
    textColor: "{colors.ink}"
    height: "44px"
  window:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.window}"
  answer:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.answer}"
    padding: "12px 17px"
    height: "66px"
  search:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.shortcut}"
    padding: "9px 10px 9px 21px"
    height: "72px"
---
# Design System: Define.exe

## Overview

**Creative North Star: "The Friendly Learning Desktop"**

Define.exe makes technical vocabulary feel approachable through a pale blue desktop, readable white windows, and crisp pixel headings. The owner’s Define.exe PDF is the pinned visual authority; this system records the implemented code-first interpretation, not a generated composition.

The computer and game vocabulary lives in the display type, small interface icons, window bars, and deliberate opening gesture. Definitions and quiz questions use plain body type and clear controls. Content remains the focus: compact wayfinding surrounds generous reading areas, and visible state changes explain what was saved or answered.

**Key Characteristics:**
- Pale blue ground with white reading windows and blue controls.
- Silkscreen display headings paired with Arial reading text.
- Fine blue borders, restrained rounding, and mostly flat surfaces.
- One focal opening gesture; immediate keyboard interaction and reduced-motion support.

## Colors

The palette is a cool classroom desktop: pale blue surroundings, white paper, and a dark blue ink that keeps reading and actions clear. The frontmatter values are normative and come from `src/styles.css`.

### Primary

- **Desktop Blue** (`sky-deep`) fills secondary buttons and shortcut controls; **Hover Blue** (`blue`) reinforces pointer feedback.
- **Action Blue** (`accent`) carries focus, the current navigation underline, progress, and selected quiz controls.

### Secondary

- **Learning Green** and its light ground (`green`, `green-bg`) mark saved terms, easy difficulty, and correct answers.
- **Practice Amber** and its light ground (`amber`, `amber-bg`) mark medium difficulty.
- **Correction Red** and its light ground (`red`, `red-bg`) mark hard difficulty, invalid fields, and incorrect answers. These are semantic states, not alternative page themes.

### Neutral

- **Sky Field** (`sky`) is the page ground; **Paper** (`paper`) is the reading surface.
- **Deep Ink** (`ink`) carries primary text and primary actions. **Slate Text** (`secondary`) carries supporting text.
- **Blue Frame** (`line`) outlines controls and windows; **Soft Divider** (`soft-line`) separates content within them.
- The title bar uses the implemented near-white blue (`#f3f9fd`); opened dictionary rows use (`#f5fafe`). These are surface treatments, not competing accents.

**The Reading Window Rule.** Use white windows for definitions, questions, and profile forms; keep the surrounding page in pale blue.

## Typography

**Display Font:** locally bundled Silkscreen, with monospace fallback; regular and bold weights are available.
**Body Font:** Arial, Helvetica Neue, sans-serif.

**Character:** pixel display type carries a friendly computer identity; plain body type supports fast comprehension. Fonts are bundled rather than requested from a remote font service.

### Hierarchy

- **Display:** the home wordmark uses the frontmatter display role. It has its own dark ink (`#0b1c26`) and a static accent cursor; it never blinks.
- **Headline:** section titles use the headline role. General page titles use (`clamp(32px, 4.2vw, 54px)`), bold, with the same heading rhythm.
- **Term:** featured words use bold Silkscreen (`clamp(30px, 4vw, 50px)`, line height `1.15`); dictionary terms use the regular dictionary-term role.
- **Body:** the base role is supplemented by definition text (`17px`, line height `1.7`) and dictionary explanation text (`15px`, line height `1.75`). Paragraphs generally cap at `70ch`; expanded definitions at `72ch`.
- **Label:** controls use the label role, with smaller metadata where appropriate. Custom-term metadata is uppercase and lightly tracked; prose remains sentence case.

**The Two Voices Rule.** Use Silkscreen for identity, section headings, and term names; use the body stack for definitions, instructions, and controls.

## Layout

The shared desktop container is centered at `min(1160px, calc(100% - 96px))`. The header is a single row (`112px`) with brand, text navigation, and profile access. Wider content is arranged through purposeful two-column groups; reading windows keep their content aligned with the shared container. Dictionary results are divided rows, not a grid of detached cards.

At `1050px` and below the container leaves `32px` side gutters and column gaps contract. At `760px` and below gutters become `20px`: navigation moves to its own second row, reading groups stack, shortcut controls retain two equal columns, and the two main navigation links remain visible. The mobile search button shows the arrow while retaining its accessible text. Quiz question interiors reduce from `38px 42px 30px` to `26px 20px 21px`. At `359px` and below gutters become `14px` and dense labels reduce further. At `1500px` and above only the home hero top spacing increases (`95px`). These are observed layout queries, not a new device taxonomy.

Touch behavior is capability-based: hover effects require both fine pointer and hover support. A later coarse-pointer query sets all text inputs, selects, and textareas to `16px`, overriding smaller mobile labels without disabling user zoom. Preserve that order and protection.

## Elevation & Depth

This is predominantly a flat, bordered system. White surfaces, pale bars, blue outlines, and internal dividers establish hierarchy. Do not add shadows to every window or card. The floating notification alone uses the current shadow (`0 7px 24px #17374c24`); ordinary focus uses an outline, not a glow.

**The Flat Window Rule.** Separate content through fine borders and pale title bars. Reserve the implemented shadow for the floating notification.

## Shapes

Use the frontmatter radius vocabulary: the main window is the softest recurring content frame, controls are more compact, and small tags are tighter still. Borders are fine (`1px`) and blue. Icons are inline SVG outlines, with a filled pixel monitor for the brand. Native disclosure rows use a plus/minus mark, and quiz options combine a letter tile with a circular selection indicator. Status dots retain their established circular shape.

The owner removed the former-school seal and affiliation on November 7, 2026. The shipping UI uses local fonts and SVG icons; no school raster remains. Review screenshots are evidence, not product imagery.

## Components

### Buttons

Compact and explicit. The default button has a blue fill, blue frame, a `47px` minimum height, and the frontmatter control padding. Primary actions use deep ink and white; quiet actions remain transparent. Small actions use a `42px` minimum height and `10px 14px` padding. A saved term switches to the green state, check icon, “Saved” wording, and `aria-pressed="true"`; its class and semantics stay synchronized. Disabled buttons reduce opacity (`0.46`) and use the disabled cursor.

On a fine hover pointer, default controls turn Hover Blue, primary controls turn (`#284f68`), and quiet controls take the Sky Field. All interactive elements preserve a visible Action Blue focus outline (`3px`, offset `4px`). Active press scale is (`0.97`), with the motion and input-mode safeguards below.

### Search and fields

Search is one white outlined container with a borderless text field and inset dark submit button. Its focus-within outline surrounds the whole group (`2px`, offset `3px`). Standard fields use the control radius, a fine frame, `13px 15px` padding, a darker focus border, and a red invalid border. Use actual labels and helper/error associations. Coarse-pointer editable controls keep the native-safe `16px` font size.

### Navigation and saved terms

Navigation is text-first with exactly two primary links: Dictionary and Mini Quiz. The active route has a bottom Action Blue rule (3px) and aria-current="page". On mobile both links remain visible below the brand. Saved terms and their count live inside the dictionary, rather than becoming a third primary path. COC filters and directory sections are removed; dictionary disclosures retain all terms and definitions.

### Reading windows

A white window uses the window radius and fine frame. The pale title bar has a `43px` minimum height on desktop and `39px` on mobile; small dots and a decorative × express the desktop metaphor. Featured content separates the term from its definition on desktop and stacks them on mobile. Footer controls carry explicit previous/next, pronunciation, and save actions. Dictionary disclosures use the same reading surface and expose expanded content through native details/summary behavior.

### Quiz choices and feedback

Choice rows have a `66px` minimum height, an answer letter tile, radio input, and selection indicator. Selection uses the blue ground and accent border; results use green or red surfaces plus written feedback. Focus wraps the entire option. Locked answers remain readable, and the review is a native disclosure list. Difficulty badges combine words with semantic colors.

### Notifications and storage status

A dark floating status message uses the sole shadow and a restrained entrance. Undo is an explicit underlined button when available. A separate persistent, white framed warning appears at the top of main content when browser storage is unavailable. That warning explains the page-memory fallback and loss on navigation/reload; transient messages also identify temporary changes.

### Motion and input mode

There is one focal window-opening gesture (`560ms`, ease-out): it runs for the home featured window once per browser session, when session storage and motion preferences allow. The window begins slightly below and smaller, with a partial bottom clip, then opens into place. Other surfaces do not repeat this introduction.

Press feedback uses the `140ms` token. Pointer-triggered featured-word continuity uses `220ms`, fading from half opacity while moving upward from `5px`; state changes remain explicit. Background transitions use `160ms ease`, and notifications use `180ms` ease-out. The code also declares the `ease-in-out` curve, but currently applies ease-out to the shipping motion.

Keyboard Tab, Enter, or Space switches the document to immediate state changes: transition and animation duration become `0ms`, and featured continuity is skipped. Pointer input restores pointer behavior. Reduced motion removes animation and spatial transforms on animated controls; short color and notification-opacity feedback remains (`120ms`). There is no perpetual animation.

## Do's and Don'ts

### Do:

- **Do** keep the confirmed Define.exe identity and the supplied PDF’s pale blue, pixel-type world.
- **Do** expose saved, selected, correct, and incorrect states through words and semantics as well as color.
- **Do** keep keyboard changes immediate and preserve visible focus outlines.
- **Do** keep coarse-pointer text inputs, selects, and textareas at 16px to protect native input behavior.
- **Do** describe storage truthfully: a local profile and browser storage, with a persistent warning when changes only survive on the current page.
- **Do** preserve every term, definition, quiz question, and legacy link; keep the school logo and COC grouping removed.

### Don't:

- **Don’t** restore the replaced green visual world or introduce a foreign palette.
- **Don’t** set definitions or long instructions in pixel display type.
- **Don’t** add looping animation, animated cursors, or decorative motion to reading tasks.
- **Don’t** present the optional local email profile as an online account or secure authentication.
- **Don’t** turn decorative window dots or the title-bar × into misleading interactive controls.

Local review evidence: [initial finish review](.impeccable/review/finish-review.md) and [final correction verdict](.impeccable/review/finish-verdict.md). The final `ship` verdict resolves the four listed findings; screenshots and these local reports are Git-ignored QA records.
