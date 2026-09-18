# royalstar-fy25-visual

This repository holds three separate apps. They do not share a runtime, types, or stylesheet.

| App | Path | What it is |
| --- | --- | --- |
| **IF2 Conduct** | `apps/if2` | CII IF2 2026 Chapters 1–6 (syllabus 1.1): read a section, hear it, then MCQs |
| **Soundings** | `apps/soundings` | Private personal financial control room |
| **Plate Room** | `apps/plate-room` | Cinematic FY2025 reading of RoyalStar Assurance’s audited statements |

## Study IF2 in a browser (no install)

IF2 Conduct is a static web app. Progress is stored in **this browser’s localStorage** (nothing to install, no admin rights).

- **Live:** https://harukome.github.io/royalstar-fy25-visual/
- If that 404s, GitHub → this repo → **Settings → Pages** → Source **GitHub Actions**, then wait a minute and refresh.

Work computer: open that URL in Chrome/Edge. You can bookmark it. Leave the tab open if you like.

## Run locally

```bash
npm install
npm test                 # all apps
npm run dev              # IF2 Conduct on :5173
npm run dev:soundings    # Soundings on :5174
npm run dev:plate-room   # Plate Room on :5175
```

### IF2 Conduct

Open the printed URL (or the GitHub Pages study URL). **Study** starts on a book section: chapter → heading → sourced prose, one section at a time. **Listen to this section** reads that same text (play / pause / resume). After reading, **Question on this section** is a four-option MCQ — lock, then feedback. Typing is optional (“Answer in your own words next time”). Exam practice stays MCQ with feedback withheld until the set ends.

The **Map** is optional: coverage, mix-ups, and Export/Import if you switch machines. Course content is taken from the supplied IF2 syllabus, examination guide, 2026 key facts (chs 1–6) and the chapter 1 study-text extract. Pedagogy is in `apps/if2/docs/learning-science.md`.

CII materials remain copyright of the Chartered Insurance Institute and are used here only to drive personal study software.

### Soundings

Statements stay off public routes. The committed ledger is sanitized: legal names, ATM terminal IDs, and street-level locations are replaced with tokens. Account numbers and card numbers are stripped.

Planning date defaults to 15 September 2026. The last actual snapshot is 31 August 2026 (B$26.91). Forward paycheck used is B$1,379.10 after the B$369 deduction. Protected savings floor is B$100.

Mom / rent / groceries remaining balances are unresolved until you type them. The October-flight toggle is a scenario, not an untyped debt. Log 1–15 September activity on the Command screen so assumed cash is not stuck on 31 August.

If this repository is public, make it private: git history still contains older unredacted extracts.

### Plate Room

An independent cinematic reading of RoyalStar Assurance Ltd. audited consolidated financial statements for the year ended 31 December 2025.
