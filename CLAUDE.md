# Krizza's Board Exam 2027 Reviewer Website: complete handoff

Read this whole file first in every new chat. It is the single source of truth for how the site is built
and how to work. Last updated: Nov 10 2026, after the First Force pages (Part 1, Ch 5A, 5B, 6) were built in pink.

## 1. Who and what
- Owner: Krizza Mae L. Tapawan. Goal: Philippines Psychologist Board Exam 2027.
- The site turns her finished Word reviewers into an interactive, visual study website (Mac and iPhone).
- LIVE: https://krizzareviewer.github.io/
  - GitHub organization `krizzareviewer` (free, owned by her personal account `kurizamei`).
  - Repo `krizzareviewer/krizzareviewer.github.io`, public, GitHub Pages from `main`, root folder.
  - Her personal account `kurizamei` must stay free for other things. Never put reviewer work there.
- Local working folder (open Claude Code here): iCloud Drive > Reviewer > Website
  (`~/Library/Mobile Documents/com~apple~CloudDocs/Reviewer/Website`).
- 4 subjects (her exact names, in this order): Psychotherapy and Counseling, Psychological Assessment,
  Abnormal Psychology, Theories of Personality. Only Psychotherapy has reviewer content so far (Chapters 1 to 23).

## 2. How to work with her (must follow)
- She does not code. You do everything; she only approves, gives feedback, and does sign-ins.
- Simple, short messages. No em dashes. No technical words unless explained in one line.
- One short question at a time. If the request is clear, just do it.
- Always show a preview (browser panel) before calling anything done. Verify on computer AND phone sizes.
- Be honest; evaluate, do not just agree. Recommend the better option.
- ACCURACY FIRST: content comes ONLY from her Word reviewer. Never invent facts, quotes, names, or page numbers.
- Before deleting anything (repos, files), ask and get a clear yes.
- She signs in herself. Never type passwords. GitHub CLI sign-in is a device code she enters on github.com.

## 3. Folder layout
```
index.html                 home page (full-width room cover, 4 subject cards, how-to, legend, references, ownership)
subject.html?s=<id>        one page for every subject menu (data from content/subjects.js)
content/subjects.js        subject names, chapter lists, chapter status/page links, APA references per subject
chapters/psychotherapy/ch01.html   Chapter 1 page (the TEMPLATE for every new chapter)
assets/style.css           shared design tokens, top bar, home, subject pages
assets/chapter.css         chapter page design (sections, panels, cards, matrix, scenes, bubbles, force colors)
assets/chapter.js          section bar (active chip + progress), Recall mode
assets/scenes.js           draws the room scenes with her characters; places speech bubbles above heads
assets/site.js             home + subject page builder, icons, service worker registration
assets/figures/*.svg       her characters (from her "Chapter 1 Figures (SVG).zip")
manifest.webmanifest, sw.js, assets/icon-*.png   Add to Home Screen + offline. Raise VERSION in sw.js on every update.
README.md                  short public summary
.tools/                    NOT published: gh binary, scripts, reviewer text files, expert prompt
.claude/launch.json        preview server config ("reviewer", port 8765)
```

## 4. Tools and commands (her Mac has NO git and no Xcode tools; python3 is a stub; Ruby 2.6 works)
- Preview: `sh .tools/sync.sh` then start the preview server "reviewer" (launch.json) and open
  http://localhost:8765/ . Re-run sync.sh after every edit (the server reads a copy in
  ~/Library/Caches/krizzareviewer-site because tools cannot read the iCloud folder directly).
  If a page looks stale, unregister the service worker in the browser and reload with a `?v=N` query.
- Publish: `sh .tools/publish.sh "message"` uploads everything as one commit through the GitHub API
  (`.tools/bin/gh`, signed in as kurizamei, token in the macOS keychain) and waits for the Pages build.
  Then check https://krizzareviewer.github.io/ pages return 200 and open the page in the browser panel.
  Files deleted locally are not deleted online.
- If gh says not logged in: run `.tools/bin/gh auth login --web --hostname github.com --git-protocol https --skip-ssh-key --scopes "repo,workflow"`
  in the background, read the one-time code from its output, open https://github.com/login/device in the browser
  panel, and ask her to sign in and enter the code.
- Accuracy check (must pass before publishing):
  `/usr/bin/ruby -Eutf-8:utf-8 .tools/check_quotes.rb .tools/reviewer-text/psychotherapy-chNN.txt chapters/psychotherapy/chNN.html`
  Every `<q>` and big quote must be found word for word. Fix the page, never the reviewer.
- Chapter cover: `/usr/bin/ruby -Eutf-8:utf-8 .tools/make_cover.rb "#DRESS" "#SHADE"` prints the home room scene
  with the psychologist's dress recolored. Chapter 1 used warm brown #A86F48 / #7E5235.
- Reviewer text: `.tools/reviewer-text/psychotherapy-full.txt` (whole Psychotherapy reviewer, made with
  `textutil -convert txt` from "Psychotherapy and Counseling Reviewer.docx" in ~/Downloads),
  `psychotherapy-ch01.txt`, `psychotherapy-ch02.txt` (ready). To cut another chapter, take the lines from the
  SECOND occurrence of "Chapter N: ..." (the first is the table of contents) to the second "Chapter N+1: ...".
- Expert agent prompt: `.tools/expert-prompt.md`.

## 5. Design system (she approved this after many rounds; keep it)
- Look: mature, calm, "psychologist website". Dark espresso (#2A201C) top areas, cream page (#FBF8F4),
  thin caramel lines (#C69C6D), rounded panels, little empty space, little text.
- Fonts: Arial everywhere in chapter pages (body.chapter forces it; she said serif confuses her).
  Body text 16px (--fs), small notes 13px (--fs-sm), ALL-CAPS labels 12px (--fs-label). The home page title
  and brand still use Georgia; do not add serif to chapter content.
- One content width for every section on every page: --wrap 1120px, --gutter 24px (16px on phone).
- Memory hook (yellow): fill #FBF0CF, underline/border #E2932A, text #5E4B45.
- Book citation colors: Corey #8A7268, Jones-Smith #9C8A5A, Capuzzi & Stauffer #6E8496,
  Prochaska & Norcross #7A8F7E, Gehart #A07A86. Citations in full author-year form, e.g. (Corey, 2024, p. 2).
- FORCE COLOR CODING (use wherever a force or a therapy appears; dark / mid / light), CSS vars --f1..--f5, --fi:
  1st rose #9E3D62/#D9809F/#F6DCE5 · 2nd olive #5F6328/#A1A657/#E7E9CC · 3rd sky #2F6E8E/#7FB8D6/#DDEFF7 ·
  4th plum #6E4A73/#B58BB8/#EEDFEE · 5th amber #85600F/#E2B04A/#F8EBC8 · Integration teal #1F6B66/#5FB3AA/#D7EFEC.
  General topics (Ch 1 to 4) are taupe/brown: #5E4B45 / #A08983 / #EDE6DF.
- Footer on every page: ALL RIGHTS RESERVED – KRIZZA MAE L. TAPAWAN – 2027.
- Every page keeps the robots meta tags (noindex, nofollow, noarchive, nosnippet, noimageindex).

## 6. Chapter page recipe (copy chapters/psychotherapy/ch01.html and replace its content)
Top to bottom:
1. Top bar (brand with her name, back to subject, home).
2. `ch-top`: room cover (make_cover.rb) + kicker "PSYCHOTHERAPY AND COUNSELING · CHAPTER N" + title + short note + source chips.
3. Sticky `secbar`: one chip per reviewer section (short labels) + Recall button.
4. `chmap`: CHAPTER MAP tiles, one per section, clickable (title + 3 to 5 word purpose from the reviewer's "Section flow").
5. One `<section class="sec" id="sN">` per reviewer section, SAME ORDER as the reviewer:
   - `sec-head`: number ring, "SECTION N OF M", title (exact reviewer heading), source chips, dark BIG IDEA bar (reviewer's Big idea).
   - At least one room scene in most sections: `<div class="vg" data-scene="NAME"><div class="say">bubble text</div></div>`.
     Bubble text: max about 10 words from the reviewer (big idea or memory aid) or a simple question.
     `class="say think"` = thought bubble (questions). `data-who="1"` = second character speaks.
     scenes.js places the bubble above that character's head (or beside it when there is no room). Never position bubbles by hand.
   - Visual blocks from chapter.css: `.def` verbatim definition cards (term + `<q>` + `.ci` citation; blurred in Recall),
     `.cmp` compare table, `.track` step track, `.ladder` ranks, `.lanes` stage models, `.matrix`, `.cond` lettered cards
     (memory-aid letters), `.kw` keyword chips (main tool to cut words), `.verdict` yes/no, `.confuse` "Don't confuse" pairs
     with `.trap` tag, `.stack`, `.triad`, `.forces` force map, `details.more` "tap for more" for second-level detail,
     `.rc` = anything else Recall should blur (founder names, stage lists).
   - `.hook` yellow MEMORY HOOK with the reviewer's memory aid in `<mark>`.
   - `.secnext` previous/next links.
6. `ch-end` + footer, scripts: ../../assets/scenes.js then ../../assets/chapter.js.
Rules: keep verbatim definitions and named lists; turn every other sentence into chips, arrows, tables, or short labels.
No practice questions, no case vignettes (her rule). No paragraphs. Fill the width (2 or 3 column grids).

### Room scenes (assets/scenes.js)
Presets: welcome (therapist man waving, bookshelf, arch), session (therapist woman + client woman seated facing,
window, table), map (therapist woman pointing at a wall map), thinking (client woman, hand on chin, window, armchair),
board (therapist man pointing at a board), merge (therapist woman, two paths merging on a board), chest (therapist man,
hand on chest, certificates), culture (therapist woman with binoculars, window, globe).
To add a scene: write a new function in `S` using room(), windowArch(), alcove(), shelf(), plant(), lamp(), cert(),
table(), armchair(), wallMap(), board(), globe(), rug() and person(name, x[, h, flip]) or sitter(name, x, flip).
Characters (assets/figures/): therapist-man-*, therapist-woman-*, client-man-*, client-woman-* with poses
wave, point, chin, chest, hold-out, up, bino, down, drive; plus *-side-sitting and *-side-standing.
Use the standard 200x345 front figures (NOT the tightly cropped "person - ..." files).
Her older road-trip icons (force vehicles, tires, gas station, signposts, START/FINISH) looked cartoonish next to the
home page: do NOT use them on pages.

## 7. Workflow for each new chapter
1. Make the chapter text file in .tools/reviewer-text/ (see section 4) and read it fully.
2. Spawn the board-exam expert agent (general-purpose, background) with .tools/expert-prompt.md. She asked for this expert.
3. Build `chapters/psychotherapy/chNN.html` from the ch01 recipe, guided by the expert plan, reviewer order, and her style.
   Outfit color: General topics chapters (1 to 4) use brown; therapy chapters use their force color (ask her first).
4. Run check_quotes.rb (must be 0 missing). Check phone width: document.documentElement.scrollWidth must equal 375 at
   the mobile preset (long citations need white-space normal; tables need table-layout fixed on phone).
5. Check every scene bubble on computer and phone (above the right head, not covering faces).
6. Update content/subjects.js (chapter `status: "ready"`, `note: "Study"`, `page: "chapters/psychotherapy/chNN.html"`),
   sw.js (raise VERSION; add new page to CORE), README.md status, and this file (section 9).
7. Show her in the browser panel; after her OK, publish.sh and verify live.
8. Give her the expert's accuracy flags as a short numbered list. Never change her reviewer text yourself.

## 8. Decisions and things she rejected
- Liked: the home page (mature, full-width cover with thin frame line and arch line); the Chapter 1 page in its final form.
- Rejected: chalkboard/bookshelf playful home; arch-shaped picture outline; cartoon icons; serif in content;
  wordy pages; Chapter 1 "scroll story" prototype (replaced); Canva and PowerPoint versions (earlier history).
- Psychologist character on the home page wears a white coat with a Ψ logo over a pink dress; in Chapter 1 the dress is brown.
- References section on home: APA 7th, one tab per subject. Her 5 Psychotherapy books are confirmed:
  Capuzzi & Stauffer (2022, 7th ed., ACA), Corey (2024, 11th ed., Cengage), Gehart (2016, 2nd ed., Cengage),
  Jones-Smith (2021, 3rd ed., SAGE), Prochaska & Norcross (2010, 7th ed., Brooks/Cole Cengage).

## 9. Status and next
- Done: home, 4 subject menus, Psychotherapy Chapters 1 to 4 (all General Topics, brown outfit #A86F48 / #7E5235).
  Ch 1: 10 sections, 9 scenes, 23 quotes. Ch 2: 7 sections, 7 scenes, 13 quotes. Ch 3: 11 sections, 11 scenes, 21 quotes.
  Ch 4: 6 sections, 6 scenes, 6 quotes. All quotes verified; phone width 375 checked.
- Chapters 2 to 4 built Nov 10 2026 (text files psychotherapy-ch03.txt and -ch04.txt cut from psychotherapy-full.txt).
  New room scenes added to scenes.js: mirror, twosit, scale, doubt, supervise, selfcare, boundary, plan, notes, chart.
  Scene test page (not published): copy is in ~/Library/Caches/krizzareviewer-site/_t/scenes.html?ch=02&c=1&only=0,3
  shows every scene of a chapter at once (useful because the hidden Browser pane lags on scroll screenshots).
- Expert accuracy flags for Ch 2 to 4: `.tools/plans/ch02-04-expert-flags.md` (she has not decided on them yet).
- PUBLISHED Nov 10 2026 (commit 3f44465): Chapters 2 to 4, new scenes, and the Chapter 1 Section 5 note. All live pages return 200.
  Delete ~/Library/Caches/krizzareviewer-site/_t before every publish (publish.sh uploads everything in that folder).
- FIRST FORCE (pink) PUBLISHED Nov 11 2026 (commit c60cc73), with Ch 1-4 restored to their earlier arrangement. At her request it is 4 pages:
  chapters/psychotherapy/part1.html (Part 1 intro, 3 sections), ch05a.html (Psychoanalytic, 10 sections, 12 quotes),
  ch05b.html (Psychodynamic, 10 sections, 3 quotes), ch06.html (Adlerian, 11 sections, 7 quotes). All quotes verified,
  phone width checked (no sideways scroll), every bubble inside its scene and above the heads on phones.
  Table of contents (subjects.js): entries P1, 5A, 5B, 6. `count: false` = extra page not counted as a chapter (site.js).
  The old single ch05.html was replaced (never published).
- Expert accuracy flags for these: `.tools/plans/ch05-06-expert-flags.md` (she has not decided yet).
- HANDOFF (Nov 11 2026): she moved work to Codex. AGENTS.md (site repo root) is the entry point. Private repo
  krizzareviewer/reviewer-workspace holds reviewer-text, plans, tools and HANDOFF-PROMPT.md. NEXT: apply the Ch 5-6
  design rules to Ch 1-4 (see AGENTS.md), then Chapters 7 to 9 (Second Force, olive).

## 9a. Force themes (her choices, Nov 10 2026, First Force)
- Whole page in the force color, no dark brown: pink top bar and cover band, very light pink page, darker pink headings and
  labels, dark wine big-idea bars. Yellow memory hooks and book citation colors stay.
- How: `.tools/make_theme.rb force1 css` writes `assets/force1.css` = style.css + chapter.css with the browns swapped (map in
  the script) + small extras. Force pages link ONLY force1.css and use `<body class="chapter force1">`. Re-run the script after
  ANY edit to style.css or chapter.css. A new force = copy the force1 block with new colors.
- Office (cover + room scenes): ivory and pink wall, white, beige rug and floor, green plants, brown shelves and tables, pink
  furniture. Cover: `make_theme.rb force1 cover`. Scenes: ROOM_THEMES in scenes.js (keep it the same as make_theme.rb "room").
- The therapist woman wears a pink dress in every scene (scenes.js recolors only her figure files at load, incl. her chair). NO pink on the male therapist or the clients (her rule): their figures keep their own colors.
- Clients in scenes: she wants clients shown. New scenes: couch (client lying on the analytic couch, drawn from her
  client-woman figure turned to lie flat, legs straight; data-who="1" = the client), couchtalk, explain (therapist at a board,
  client seated listening). She rejected two earlier lying figures as distorted and too tall.
- Phone: on force pages the scene box is taller and the whole room shows, so bubbles fit above heads (scenes.js "meet").
- These 4 pages were made with a small builder script (head, section bar, chapter map from a list + one file per section).
  To build a new force chapter, copy part1.html for the head and structure.

## 9c. Her rules from Nov 11 2026 (apply to EVERY chapter)
- Navigation (assets/chapter.js, automatic): a LEFT number menu (one number per section, tap to jump) and TOP tabs with
  the pages of the current part (from content/subjects.js: part `page`/`tab`, chapter `tab`). Chapter pages must load
  `../../content/subjects.js` before chapter.js. The Part 1 intro is NOT a chapter: the part title links to it in the TOC.
- Citations: ONLY in the page top (source chips) and on verbatim definitions/quotes (.def .ci, big quotes). No source chips
  in section heads, none in tables, labels or item cards. Theorist names that are content (Dreikurs, Mitchell, Kohut) stay.
  `strip.rb`-style cleanup was done on Ch 1 to 4 (backups were in the session scratchpad).
- Box system (same information = same box): .def verbatim definition · .flow workflow (steps, phases, processes) ·
  .cmp table (comparisons, lists of techniques/approaches; she likes tables) · .kw key words · .verdict or two-column table
  for strengths/limits · .confuse "Don't confuse" · YELLOW (.hook, .ma, .ltr-s) = memory aid ONLY, never the force color ·
  details.more = tap for more.
- Section skeleton, in this order: head (no chips) → [scene | KEY POINTS panel, often a .flow] → definitions →
  workflows → tables → Don't confuse → memory hook. Keep almost all reviewer info, few words, no citations.
- Light text on dark/pink areas is WHITE (not cream).
- Scenes: the room shows extra wall on top; bubbles are placed by scenes.js on EMPTY wall (it measures every object and
  never covers a face) with a drawn tail to the speaker. Most scenes now include a client. Never position bubbles by hand.
- Outfits on force1 pages (scenes.js figs): psychologist woman = pink dress + white coat (pink chair); male therapist =
  white coat, light pink inner, dark pink tie and pants; client woman = white with dark pink accents; client man = white
  top, dark pink pants. All chair legs dark. No other pink on men and clients.
- Chapters 1 to 4: she preferred their EARLIER arrangement, so they were RESTORED to it (Nov 11 2026), keeping the new name,
  nav, white text and the citation cleanup (book tags removed except page top and verbatim quotes).
- Design team plan (UI/UX + infographic designers): `.tools/plans/design-plan-merged.md` (+ the two full reviews). Built on
  5A, Part 1, 5B, 6 (v5 CSS block): tinted section-head bands with a dark one-line bar in EVERY section ("IN ONE LINE" when
  the reviewer has no Big idea; paraphrase only), tinted panels holding white cards, .split (strengths + / limits −),
  short tables → pair cards (chapter.js), .cycle (non-linear phases), .stairs, .tree (lineage), .dir (who → whom arrows),
  .ice (iceberg), .range (bars on one scale), .sets (three lists), .ribbon (memory aid: word → letter → term, yellow).
  Scene column 5fr/7fr; chapter.js fits the scene to the column (crop up to 16%, else pull boxes up, or sticky).
- Name: "Psychologist Board Exam Reviewer" in the header and titles (no "2027"; the footer ownership line stays).
- Compact rule (her "less scrolling, no wasted space"): chapter body text 13px (= workflow description size), tighter
  paddings. Workflows (.flow) are CSS grids so titles and descriptions line up across boxes; memory-aid letters sit
  beside their word. chapter.js re-lays two-column tables (.cmp with term + description) as .tgrid: the term column is as
  wide as the longest term, short tables fold into two columns; and it pulls the next boxes up beside a scene when the
  right column is shorter than the picture (computer only). The scene room has no extra top line.
- Unclear dark "label chips" (dark chip followed by light chips) are replaced by a small heading (.sub) + chips.

## 9b. Paused experiment: "Talking Room" (Nov 10 2026). SHE PREFERS THE PREVIOUS DESIGN.
- She asked to save it and not act on it; she "will probably get back to this later". Keep building chapters
  with the current recipe (section 6). Do not bring the talking room back unless she asks.
- What it was: the therapy room fills the whole screen (sticky), a psychologist (therapist-woman) teaches a trainee
  (therapist-man) in speech bubbles, and info boxes pop up inside the room one at a time as you scroll or tap
  Next/Back (lines inside a box appear as they are said). Phone: people at the top, boxes over the floor.
  Inspired by zarcerog.com/theatre and layernative.com/tinkeroll (layout idea only). No sound, no 3D, no Recall.
- Built only Sections 1 and 2 of Psychotherapy Chapter 1. Never published. Files are parked (not published) in
  `.tools/experiments/talking-room/` (chapters/psychotherapy/ch01-talk.html, assets/talk.css, assets/talk.js,
  ch01-story-script.md). To preview again: copy them back to the same paths, run sync.sh, open
  /chapters/psychotherapy/ch01-talk.html. Testing tip: a hidden Browser pane throttles animation; use
  `TalkRoom.show(n)` in the console to step beats.
- Team plan (psychology expert, seasoned therapist, graphic designer, learning designer) for all 10 sections is in
  `.tools/plans/ch01-story-script.md`. She approved short demonstration lines that are not verbatim but add no facts.
- From that review: she approved adding "Corey covers the common factors approach to integration in Ch. 15"
  to Chapter 1 Section 5 (done locally Nov 10 2026 as a chip under the Don't confuse panel; NOT YET PUBLISHED,
  goes live with the next publish). The Section 6 pointer "Rogers' 3 core conditions are covered in the
  Person-Centered section (Corey Ch. 7)" is ON HOLD by her choice (it will be covered in that later chapter).

## 10. Open items to raise with her (one at a time, when relevant)
- First Force expert flags: `.tools/plans/ch05-06-expert-flags.md`.
- Chapter 1 expert accuracy flags (her reviewer unchanged): (1) "Eclecticism = mixing without a rationale": in
  Norcross & Beutler technical eclecticism is a recognized type; "no rationale" fits syncretism; the type is usually
  named "technical eclecticism". (2) MI as "postmodern" in Corey: check the 2024 book. (3) Many reviewers call
  multiculturalism the 4th force. (4) Lambert (1992) percentages may appear on exams. (5) Egan's own stage names.
  (6) "Primary" vs "basic" empathy wording. She has not decided on these yet.
- Counseling topics not from the 5 books (guidance, types of counseling, SOLER, YAVIS/HOUND/DUD, etc.): on hold.
- Possible reviewer fix: Chapter 7 cites Gehart's BASIC-ID questions as pp. 308 to 309; they appear to be on pp. 295 to 296.
- The other 3 subjects need her Word reviewers before they can be built.
