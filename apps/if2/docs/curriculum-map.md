# IF2 Conduct — curriculum map (Chapters 1–6)

Authoritative sources for this build:

- IF2 syllabus 2026 (examined 1 Jan 2026–31 Dec 2026)
- IF2 Examination Guide 2026
- IF2 2026 Key Facts, chapters 1–6 only
- IF2 2026 Study Text extract: **Chapter 1 Motor insurance** (pages 1/1–1/15). Later study-text chapters were not supplied.

## Examination constraints used by the engine

| Rule | Source |
| --- | --- |
| 100 MCQs, 2 hours | Syllabus / exam guide |
| English law and practice | Syllabus |
| Know vs Understand skill verbs | Exam guide skill specification |
| LO weights ±2 | Syllabus footnote |
| LO1 products + associated services: **36** questions | Syllabus |
| LO1.1 product features: motor, health, packaged, property, pecuniary, liability | Syllabus 1.1 |
| LO1.2 non-insurance services | **Chapter 7 — out of scope this run** |
| Specimen Q1–27, 34–36 mostly LO 1.1; Q28–33 mostly 1.2 | Exam guide answer key |

Chapters 1–6 implement **syllabus 1.1** only. Exam-readiness overlay is weighted to LO1.1, not to a fake overall IF2 pass probability.

## Chapter map

| Ch | Title | Key concept families | Study text | Key facts printed pages |
| --- | --- | --- | --- | --- |
| 1 | Motor insurance | Compulsory motor; RTA / TPO / TPFT / comprehensive; NCD; exclusions; motorcycle; commercial motor | Full chapter 1 extract | 5–16 |
| 2 | Health insurance | PA & sickness benefits; death 12 months; medical expenses; travel PA | Not supplied — Key Facts | 17–24 |
| 3 | Package policies | Why packages; household buildings/contents; indemnity vs new for old; subsidence excess; all risks away from risk address | Not supplied — Key Facts | 25–46 |
| 4 | Property insurance | Fire & special perils; unoccupied; theft/hold-up; money vs theft (employee fraud); glass | Not supplied — Key Facts | 47–62 |
| 5 | Pecuniary insurance | Legal expenses (not PL disputes); BI indemnity period; material damage proviso | Not supplied — Key Facts | 63–72 |
| 6 | Liability insurance | EL compulsory & injury-only; PL; products; D&O claims-made; PI; trustees; extended warranty; cyber | Not supplied — Key Facts | 73–92 |

Where study text and key facts both exist (chapter 1), claims are reconciled: numbers such as £1.2 million RTA TPPD, £20 million private TPO TPPD, commercial ~£5 million / haulage £1.2 million, NCD two-year step-back, motorcycle accessories only with the machine, and RTA pay-then-recover appear in both. Green card / GCFA dates are taken from the study text and key facts, not from later news.

## Out of scope (deliberate)

Chapters 7–13: non-insurance services, material circumstances, underwriting, policy wordings, claims, ICT/data protection, customer service.

Those map to syllabus 1.2 and LOs 2–7. The architecture stores chapter as a field so later ingestion does not require a rewrite.

## Provenance layers

1. **Source-derived facts** — `src/curriculum/facts.ts` + ingested page text in `src/curriculum/generated/sources.json`
2. **Generated instructional content** — cloze/recall/why-wrong compiled from facts; tutor paraphrases that quote reading units
3. **Calculated learner metrics** — mastery, accessibility, exam overlay
4. **Pedagogical decisions** — session log `layer: pedagogical-decision`
5. **Learner-state inference** — attention signals; never a diagnosis
