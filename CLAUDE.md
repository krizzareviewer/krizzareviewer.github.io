# Krizza's Board Exam 2027 Reviewer Website: complete handoff

Read this whole file first in every new chat. It is the single source of truth for how the site is built
and how to work. Last updated: Nov 10 2026, after Chapter 1 (Psychotherapy and Counseling) was finished.

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
- Done: home, 4 subject menus, Psychotherapy Chapter 1 (10 sections, 9 room scenes, 23 quotes verified).
- NEXT: Psychotherapy Chapter 2 "The Counselor as Person and Professional" (text ready in
  .tools/reviewer-text/psychotherapy-ch02.txt; sources Corey 2024 Ch. 2, Gehart 2016 Ch. 15, Jones-Smith 2021 Ch. 1).
  Its 7 sections (reviewer "Section flow"): The Counselor as a Therapeutic Person · Personal Therapy for the Counselor ·
  The Counselor's Values and the Therapeutic Process · Becoming an Effective Multicultural Counselor ·
  Issues Faced by Beginning Therapists · The Competent Supervisee · Maintaining Your Vitality as a Person and as a Professional.
  Ask her one question first: outfit color for Chapter 2 (brown again, like Chapter 1, is the default for general topics).

## 10. Open items to raise with her (one at a time, when relevant)
- Chapter 1 expert accuracy flags (her reviewer unchanged): (1) "Eclecticism = mixing without a rationale": in
  Norcross & Beutler technical eclecticism is a recognized type; "no rationale" fits syncretism; the type is usually
  named "technical eclecticism". (2) MI as "postmodern" in Corey: check the 2024 book. (3) Many reviewers call
  multiculturalism the 4th force. (4) Lambert (1992) percentages may appear on exams. (5) Egan's own stage names.
  (6) "Primary" vs "basic" empathy wording. She has not decided on these yet.
- Counseling topics not from the 5 books (guidance, types of counseling, SOLER, YAVIS/HOUND/DUD, etc.): on hold.
- Possible reviewer fix: Chapter 7 cites Gehart's BASIC-ID questions as pp. 308 to 309; they appear to be on pp. 295 to 296.
- The other 3 subjects need her Word reviewers before they can be built.
