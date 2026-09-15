# royalstar-fy25-visual

This repository holds two separate apps. They do not share a runtime, types, or stylesheet.

| App | Path | What it is |
| --- | --- | --- |
| **IF2 Conduct** | `apps/if2` | Evidence-informed study conductor for CII IF2 2026, Chapters 1–6 (syllabus 1.1) |
| **Soundings** | `apps/soundings` | Private personal financial control room |

## Run

```bash
npm install
npm test                 # both apps
npm run dev              # IF2 Conduct on :5173
npm run dev:soundings    # Soundings on :5174
```

### IF2 Conduct

Open the printed URL. Use **Focus** to study. The atlas outside the session shows gaps, mix-ups, due retrievals and a separate exam-readiness overlay — not a single percentage of “done”.

Course content is taken from the supplied IF2 syllabus, examination guide, 2026 key facts (chs 1–6) and the chapter 1 study-text extract. Pedagogy is in `apps/if2/docs/learning-science.md`.

CII materials remain copyright of the Chartered Insurance Institute and are used here only to drive personal study software.

### Soundings

Statements stay off public routes. The app ships a sanitized ledger reconstructed from March–August 2026 Scotiabank Electronic Access statements. Account numbers and card numbers are stripped.

Planning date defaults to 15 September 2026. The last actual snapshot is 31 August 2026 (B$26.91). Forward paycheck used is B$1,379.10 after the B$369 deduction. Protected savings floor is B$100.

Mom / rent / groceries remaining balances are unresolved until you type them. The system will not invent those amounts.
