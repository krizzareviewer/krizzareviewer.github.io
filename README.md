# Board Exam 2027 Reviewer

Private study website for the Philippines Psychologist Board Exam 2027.
Owner: Krizza Mae L. Tapawan. All reviewer content comes only from her finished Word reviewers.

## How the site is built
- `index.html`: home. Full-width cover panorama (crops, never stretches; thin frame line and arched alcove line),
  psychologist in a white coat with a Ψ logo over a pink dress, title and 4 subject cards below, "How to study" and "What the boxes mean" sections.
- `subject.html?s=<id>`: one page for every subject menu. Side menu on Mac, Menu button on phone.
- `content/subjects.js`: ALL subject names and chapter lists. Edit text here, not in the design files.
- `assets/style.css`, `assets/site.js`: design and page code.
- `chapters/<subject>/chNN.html`: topic pages (scroll story). `ch01.html` is the Stops 1 to 3 prototype.
- `manifest.webmanifest`, `sw.js`, `assets/icon-*.png`: Add to Home Screen and offline use.
  When pages change, raise `VERSION` in `sw.js`.
- Every page has robots meta tags (noindex, nofollow, noarchive, nosnippet, noimageindex) so search engines do not list it.
  The site is still public: anyone with the link can open it.

## References
APA entries live in `content/subjects.js` under each subject's `references`. Titles, editions, and publishers were
confirmed by Krizza on 2026-11-10.

## Style
Font sizes: every body text 16px (`--fs`), small notes 13px (`--fs-sm`), ALL-CAPS labels 12px (`--fs-label`).
Thin outer rings on icon circles. Her name sits under the title in the header.
Arial body, Georgia serif headings (chosen 2026-11-10 for a more mature look). Espresso and cream palette,
yellow memory hooks (#FBF0CF / #E2932A). Footer on every page: ALL RIGHTS RESERVED – KRIZZA MAE L. TAPAWAN – 2027.

## Status
- Done: home page (landscape therapy-room cover with an arched alcove line, APA references per subject,
  ownership section), 4 subject menus (Psychotherapy and Counseling chapters 1 to 23 listed; other 3 "coming soon").
- Live since 2026-11-10: https://krizzareviewer.github.io/ (organization krizzareviewer, owned by her account kurizamei;
  repo krizzareviewer/krizzareviewer.github.io, GitHub Pages from main, root). Her personal account stays free for other things.
  Every section shares one content width (`--wrap` 1120px, `--gutter` 24px / 16px on phone).
- Next: work inside Psychotherapy and Counseling: ask what to improve on Chapter 1 Stops 1 to 3; build Stops 4 to 10.

## Publishing
The Mac has no git. Updates are uploaded as one commit through the GitHub API with the official `gh` tool
(signed in as kurizamei). Raise `VERSION` in `sw.js` on each update so phones get the new copy.
