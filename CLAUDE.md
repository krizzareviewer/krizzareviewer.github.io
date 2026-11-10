# Krizza's Reviewer Website: Handoff for Claude Code

Read this first in every session. Owner: Krizza Mae L. Tapawan. Goal: one study website for her Philippines Psychologist Board Exam 2027 reviewers. Repo: kurizamei/krizzareviewer (public). Live site: https://kurizamei.github.io/krizzareviewer/ (GitHub Pages, branch main, root folder).

## How to work with her
- Short, simple messages. No em dashes. No technical words (no "H1", "div", "CSS" in chat).
- One short question at a time. If the request is clear, just do it.
- She is a visual learner. Always show a preview of what you built before she approves it.
- Accuracy first. Never invent facts, quotes, numbers, or page numbers. Content comes only from her reviewers and the 5 books (Corey 2024, Jones-Smith 2021, Capuzzi & Stauffer 2022, Prochaska & Norcross 2010, Gehart 2016).
- Never touch her iCloud files. She uploads and downloads files herself.
- Be honest. If an idea will not work well, say so and recommend the better option.
- Keep usage and time low. Reuse shared parts instead of rebuilding them.

## What the site is
- One website, not tied to Claude. Opens by link on her Mac and phone, fits the screen.
- Home page with 4 menus, one for each of her 4 board exam subjects. Each menu has submenus to pick the topic or chapter to review.
- The 4 subjects are: Psychotherapy and Counseling, Psychological Assessment, Abnormal Psychology, Theories of Personality.
- She must be able to rearrange or update chapters next year while studying, so keep content in plain files separate from the page design.

## Planned folder layout
```
krizzareviewer/
  CLAUDE.md
  README.md
  index.html                     home page with the 4 subject menus
  shared/                        shared styles, characters, scripts (build once, reuse)
  psychotherapy-counseling/
    index.html                   chapter menu for this subject
    content/                     one plain text file per chapter (source of truth)
    chapter-01/index.html
  psychological-assessment/
  abnormal-psychology/
  theories-of-personality/
```
Keep one index file listing chapter, page link, and text file.

## Hosting
Decided Nov 10 2026: the repo is PUBLIC and GitHub Pages is ON (deploys from main, root folder). Every push to main updates the site in 1 to 2 minutes. Because it is public, do NOT put the Word reviewers, book PDFs, or long book passages in this repo. Keep only website files here. Keep `<meta name="robots" content="noindex">` on every page so search engines skip it. Her source files go in a local folder she does not upload, or ask her where to keep them.

## Page style she wants (Chapter 1 pilot, decided Nov 10 2026)
- A scrolling website that starts at the first topic and goes down topic by topic, with interactions. She did NOT like the map with tap stops. This is her last try at the infographic website idea, so make it good.
- Features in priority order: tap to open details, hide and reveal a definition to test yourself, memory aids that glow, light motion only where it shows order.
- Original illustrations only. Never copy pictures, text, or characters from the books or from DK.
- Characters: the approved chubby, faceless DK-style set. Flat single colors, no two-tone shading, limbs connected, props held naturally. Do not use the slim style.
- Each section is a numbered stop with the section name in ALL CAPS, in the same order as the reviewer.
- Key definitions are verbatim, in quotes, with the citation in the book color. Everything else short.
- Memory aids: yellow highlight (#FBF0CF, orange underline #E2932A), built into the content, not separate boxes.
- Fonts: body Arial Narrow, headings Arial Bold. Footer: ALL RIGHTS RESERVED – KRIZZA MAE L. TAPAWAN – 2027.

## Colors
- Book citation colors: Corey #8A7268, Jones-Smith #9C8A5A, Capuzzi & Stauffer #6E8496, Prochaska & Norcross #7A8F7E, Gehart #A07A86.
- Force colors (dark / mid / light): General (Ch 1 to 4) #5E4B45 / #A08983 / #EDE6DF; 1st rose #9E3D62 / #D9809F / #F6DCE5; 2nd olive #5F6328 / #A1A657 / #E7E9CC; 3rd sky #2F6E8E / #7FB8D6 / #DDEFF7; 4th plum #6E4A73 / #B58BB8 / #EEDFEE; 5th amber #85600F / #E2B04A / #F8EBC8; Integration teal #1F6B66 / #5FB3AA / #D7EFEC.

## Plan, in order
1. A placeholder home page with 4 subject buttons is already live. Next, create the 4 subject folders and link the buttons. Empty topics show as "coming soon".
2. Rebuild Chapter 1 as a scrolling page. Show a preview. Wait for her OK.
3. Then Chapter 2 with a different theme. After these two she decides whether to continue, simplify, or switch tools.
4. Add the remaining chapters one at a time.

## Chapter 1 content outline (approved earlier as "The Counseling Road Trip")
1 Introduction. 2 Counseling and Psychotherapy. 3 The Role of Theory. 4 Overview of the five forces. 5 Common Factors. 6 The Helping Relationship. 7 Mechanisms of Change. 8 Integration. 9 Where I Stand. 10 Culture and Theory.
The full text for each stop must come from her reviewer content files. These are not in this repo yet. Ask her to add them, or ask her for the Reviewer_Build_Kit.zip (content/ folder).

A second handoff written by Claude in her Project is `claude/website-handoff.md` (site structure, scroll story page, offline and Add to Home Screen ideas). Its repo name idea is outdated: the real repo is `krizzareviewer`.

## Source files that live in her Claude Project, not in this repo
Her Claude Project "Psychotherapy and Counseling" holds these docs: claude/infographic-carry-forward.md (full style notes and the approved Chapter 1 layout), claude/infographic-plan-2026-11-10.md, claude/website-handoff.md, claude/ch1-scroll-prototype.html (the Chapter 1 scroll page she already tested; use it as the starting design), claude/characters-front.py, claude/characters-side.py (the approved character drawings), claude/chapter1-final-builder.py, claude/reference-map-5-books.md. Claude Code cannot read the Project. Ask her to download these and give them to you. Code files (characters, builder, prototype) can go in the repo. The Word reviewers should not.

## Open items
- Chapter 1 text files need to be added to the repo.
- Possible reviewer fix to ask her about: Chapter 7 cites Gehart's BASIC-ID questions as pp. 308 to 309, but they appear to be on pp. 295 to 296.

## Update: state as of Nov 10 2026 (Claude Code session)
- MOVED: the site now lives in the free organization krizzareviewer (owned by her account kurizamei), repo krizzareviewer/krizzareviewer.github.io, LIVE at https://krizzareviewer.github.io/. She wants her personal account kept free for other things. Older notes above that name kurizamei/krizzareviewer are outdated. Her local working copy is the iCloud folder Reviewer/Website (she opened Claude Code there). README.md describes the files.
- Actual layout used (replaces "Planned folder layout"): `index.html` home, `subject.html?s=<id>` for all 4 subject menus, `content/subjects.js` holds subject names, chapter lists and APA references, `chapters/psychotherapy/ch01.html` is the Stops 1 to 3 prototype, `assets/` holds style, script and icons, `sw.js` + `manifest.webmanifest` give Add to Home Screen and offline use.
- Her approved home design: dark espresso, full-width panorama cover (crops, never stretches) with a thin frame line and a double arch line, the psychologist in a WHITE COAT with a Ψ logo over a PINK DRESS, Georgia serif headings, Arial body, every body text 16px, one shared content width for all sections, thin rings on icon circles, her name in the header, APA references per subject (5 books confirmed by her), ownership section, robots noindex tags on every page.
- She rejected: playful chalkboard/bookshelf home; an arch-shaped picture outline.
- Her Mac has no git. Updates are uploaded with GitHub's `gh` tool through the GitHub API (signed in as kurizamei). Raise VERSION in sw.js on each update.
- Next: work inside Psychotherapy and Counseling (improve Chapter 1 Stops 1 to 3, then Stops 4 to 10).
