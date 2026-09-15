# Learning science that informs IF2 Conduct

This document records the evidence used to design the session engine.
It is **not** a claim that the product diagnoses ADHD, nor that every
interface choice is independently proven. External research informs
*how* IF2 material is practised. It does not replace CII study text,
key facts, syllabus or exam guide content.

Evidence is tagged:

- **Strong general**: systematic reviews, meta-analyses, or multi-experiment
  programmes in educational psychology that replicate.
- **ADHD-specific**: reviews or trials in ADHD populations; usually smaller
  and more heterogeneous than the general literature.
- **Weaker / design inference**: plausible application of the above, not
  a direct trial of this product.

Pop-neuroscience (learning styles as fixed modalities, “left-brain/right-brain”,
dopamine-hack streaks, 10,000-hour slogans) is excluded.

---

## 1. Retrieval practice (testing effect)

**Sources**

- Roediger, H. L., & Karpicke, J. D. (2006). Test-enhanced learning.
  *Psychological Science*, 17(3), 249–255.
- Adesope, O. O., Trevisan, D. A., & Sundararajan, N. (2017). Rethinking
  the use of tests: A meta-analysis of practice testing. *Review of
  Educational Research*, 87(3), 659–701.
- Rowland, C. A. (2014). The effect of testing versus restudy on retention.
  *Psychological Bulletin*, 140(6), 1432–1463.
- Dunlosky, J., Rawson, K. A., Marsh, E. J., Nathan, M. J., & Willingham, D. T.
  (2013). Improving students’ learning with effective learning techniques.
  *Psychological Science in the Public Interest*, 14(1), 4–58.

**Finding.** Practising retrieval of recently studied material produces
better long-term retention than restudying the same material for a similar
time. Effects are larger when tests require production rather than mere
recognition, and when feedback is given after an attempt.

**Strength / limits.** Among the most robust findings in applied memory
research. Laboratory and classroom studies. Effects depend on successful
(or corrected) retrieval; repeated unsuccessful guessing without feedback
is not the mechanism.

**Product behaviour.** After a concept is exposed, the engine prefers
recall, teach-back, cloze reconstruction, error-correction and
compare/contrast over rereading. Multiple-choice is used for
classification and exam-shape practice, not as the default evidence of
mastery. Recognition success is stored separately from retrieval success.

---

## 2. Spaced practice and successive relearning

**Sources**

- Cepeda, N. J., Pashler, H., Vul, E., Wixted, J. T., & Rohrer, D. (2006).
  Distributed practice in verbal recall tasks: A review and quantitative
  synthesis. *Psychological Bulletin*, 132(3), 354–380.
- Cepeda, N. J., Vul, E., Rohrer, D., Wixted, J. T., & Pashler, H. (2008).
  Spacing effects in learning: A temporal ridgeline of optimal retention.
  *Psychological Science*, 19(11), 1095–1102.
- Rawson, K. A., & Dunlosky, J. (2011). Optimizing schedules of retrieval
  practice for durable and efficient learning. *Psychological Science*,
  22(8? successive relearning programme — see also Rawson & Dunlosky 2012
  *Psychonomic Bulletin & Review* on successive relearning).
- Rawson, K. A., Dunlosky, J., & Sciartelli, S. M. (2013). The power of
  successive relearning. *Journal of Experimental Psychology: Applied*.

**Finding.** Spreading practice over time beats massing. Successive
relearning (retrieve to criterion, then return after a gap and retrieve
to criterion again) produces more durable knowledge than a single
successful recall. A recall that is still in working memory (minutes)
is a weak signal of durable learning. Optimal gap scales with desired
retention interval; very long first gaps can fail if initial encoding
was weak.

**Strength / limits.** Strong for verbal/conceptual material. Exact
“optimal” intervals are not uniquely determined; they interact with
item difficulty and prior knowledge. Commercial SRS algorithms are
engineering approximations, not laws of memory.

**Product behaviour.** Scheduler requires **session criterion** (more than
one successful retrieval, including at least one production item) before
expanding the interval. Recency within 10 minutes inflates “accessibility”
not “mastery”. Next-due is persisted across sessions. Highly examinable
syllabus 1.1 product facts are not dropped after one easy recognition hit.

---

## 3. Interleaving

**Sources**

- Rohrer, D., Dedrick, R. F., & Stershic, S. (2015). Interleaved practice
  improves mathematics learning. *Journal of Educational Psychology*.
- Brunmair, M., & Richter, T. (2019). Similarity matters: A meta-analysis
  of interleaved learning. *Psychological Bulletin*, 145(4), 409–463.

**Finding.** Mixing related categories during practice improves
discrimination versus blocking, especially when categories are easily
confused. Blocking can still help *initial* encoding of a new structure.

**Strength / limits.** Strongest in category-learning and problem-type
discrimination. Weaker or mixed for unrelated facts. Learners often
prefer blocking and misjudge learning.

**Product behaviour.** After a first successful encoding of a cover type
(e.g. RTA vs TPO vs TPFT vs comprehensive), later practice interleaves
those types and also interleaves motor vs household vs liability
*distinctions* that the curriculum marks as confusion pairs. Brand-new
units start blocked (one concept boundary) to limit load.

---

## 4. Generation, prediction, and self-explanation

**Sources**

- Bertsch, S., Pesta, B. J., Wiscott, R., & McDaniel, M. A. (2007). The
  generation effect: A meta-analytic review. *Memory & Cognition*, 35.
- Chi, M. T. H., de Leeuw, N., Chiu, M., & LaVancher, C. (1994). Eliciting
  self-explanations improves understanding. *Cognitive Science*, 18.
- Bisra, K., Liu, Q., Nesbit, J. C., Salimi, F., & Winne, P. H. (2018).
  Inducing self-explanation: A meta-analysis. *Educational Psychology Review*.
- Kornell, N., Hays, M. J., & Bjork, R. A. (2009). Unsuccessful retrieval
  attempts enhance subsequent learning. *Journal of Experimental Psychology:
  Learning, Memory, and Cognition*.

**Finding.** Generating an answer or explanation before seeing the
canonical one, and explaining “why” rather than restating, improves
retention and transfer. Even unsuccessful prediction can potentiate
encoding if feedback follows.

**Strength / limits.** Generation helps when the learner has enough
cues to attempt; pure guessing on arbitrary numbers without a scaffold
is weaker. Self-explanation meta-analysis shows reliable but
moderate effects; quality of prompt matters.

**Product behaviour.** New units often open with a prediction prompt
(“Before you read: what do you think RTA-only actually covers?”).
After reading, teach-back and one-sentence summary are used for
*understand*-level syllabus language. Numerical limits (e.g. £1.2m)
use cloze/retrieval after exposure, not blind generation of figures.

---

## 5. Desirable difficulties and cognitive load

**Sources**

- Bjork, R. A., & Bjork, E. L. (1992/2011). A new theory of disuse and
  desirable difficulties.
- Sweller, J., Ayres, P., & Kalyuga, S. (2011). *Cognitive Load Theory*.
- van Gog, T., & Sweller, J. (2015). Not new, but nearly forgotten: the
  testing effect considered in terms of cognitive load.

**Finding.** Conditions that slow performance *during* practice (spacing,
retrieval, variation) often improve later performance. That is not a
licence for clutter, split attention, or simultaneous new definitions.
Intrinsic load should match the concept boundary; extraneous load
(nav, dashboards, unrelated animation) should be stripped during
focus.

**Strength / limits.** Strong as a design heuristic. “Make it harder”
without feedback or without prior encoding harms novices.

**Product behaviour.** Focus sessions hide atlas statistics. Units are
split on meaning (a cover level, an exclusion family, a settlement
basis), not word count. If attention or error signals rise, the engine
**shortens the next exposition** and increases interaction, rather than
adding visual stimulation.

---

## 6. Metacognition and confidence calibration

**Sources**

- Dunlosky, J., & Rawson, K. A. (2012). Overconfidence produces
  underachievement. *Learning and Instruction*.
- Koriat, A., & Bjork, R. A. (2005). Illusions of competence in monitoring
  one’s knowledge. *Journal of Experimental Psychology: Learning, Memory,
  and Cognition*.
- Nelson, T. O., & Narens, L. (1990). Metamemory: A theoretical framework.

**Finding.** Fluency of rereading and high confidence after recognition
are poor predictors of later recall. Judgements of learning are more
accurate after a delay and after retrieval. Confident errors are
especially sticky if uncorrected.

**Strength / limits.** Robust laboratory finding. Confidence scales are
noisy in the wild; they are signals, not diagnoses.

**Product behaviour.** After retrieval, the learner rates certainty.
The model stores **confident error**, **low-confidence success**, and
**slip** (fast, immediately self-corrected, previously strong item)
separately. Confident errors trigger contrast items and delayed
re-retrieval, not a simple “wrong, here is the answer” and move on.

---

## 7. Adaptive difficulty

**Sources**

- Pashler, H., et al. (2007). *Organizing Instruction and Study to
  Improve Student Learning* (IES practice guide).
- Corbett, A. T., & Anderson, J. R. (1995). Knowledge tracing
  (historical ITS).
- Metcalfe, J. (2017). Learning from errors. *Annual Review of Psychology*.

**Finding.** Practice is more efficient near the edge of competence:
items that are too easy yield little new learning; items that are
impossible yield frustration and guessing. Feedback should be specific.

**Strength / limits.** Tutoring-system literature is mixed on exact
mastery thresholds. We avoid claiming a proprietary “AI difficulty IQ”.

**Product behaviour.** Estimated mastery combines retrieval history,
format (production vs recognition), recency, and confusion-pair errors.
The next activity is chosen from that state. Exam-readiness is a
**separate** overlay (syllabus weight × mixed-topic recognition under
time pressure), not identical to durable mastery.

---

## 8. Forgetting and review scheduling

**Sources**

- Ebbinghaus, H. (1885/1913). *Memory*.
- Wixted, J. T. (2004). The psychology and neuroscience of forgetting.
  *Annual Review of Psychology*.
- Murre, J. M. J., & Dros, J. (2015). Replication of Ebbinghaus.
  *PLOS ONE*.

**Finding.** Accessibility declines with time and interference. Decline
is typically steepest soon after learning, then slower. Importance and
number of successful spaced retrievals flatten the curve.

**Strength / limits.** The classic “forgetting curve” is not a single
universal function. Scheduling here is a transparent heuristic, logged
as a **pedagogical decision**, not as a measured neural state.

**Product behaviour.** `nextDueAt` is computed from last criterion
success, item importance (exam weight of LO 1.1 is high for product
classes), error type, and elapsed time. The debrief shows *why* an
item returns tomorrow vs next week.

---

## 9. Active learning (classroom literature, used cautiously)

**Sources**

- Freeman, S., et al. (2014). Active learning increases student
  performance in science, engineering, and mathematics. *PNAS*.
- Theobald, E. J., et al. (2020). Active learning narrows achievement
  gaps. *PNAS*.

**Finding.** Replacing uninterrupted exposition with structured
activity raises average exam performance in STEM courses.

**Strength / limits.** These are classroom RCTs/meta-analyses, not
insurance MCQ apps. The transferable idea is “do not let the default
be long passive reading”.

**Product behaviour.** Reading units are short and followed by action.
There is no mode that is “just the PDF”.

---

## 10. Multimedia and spoken learning

**Sources**

- Mayer, R. E. (2020). *Multimedia Learning* (3rd ed.).
- Moreno, R., & Mayer, R. (1999–2007). Modality and redundancy
  principles.
- Singh, A., Marcus, N., & Ayres, P. (2012). The transient information
  effect. *Applied Cognitive Psychology*.

**Finding.** Combining words and relevant visuals can help when they
are integrated. Presenting the *same* lengthy text and speech at once
can hurt (redundancy). Audio is transient: long spoken explanations
without a chance to pause or retrieve overload working memory.

**Strength / limits.** Strong for well-controlled multimedia studies.
Podcast-style tutoring is under-tested relative to text.

**Product behaviour.** Audio mode is the **same engine** emitting
speech acts (read unit, ask retrieval, collect spoken/typed answer,
confidence). It does not play a separate chapter podcast. During visual
focus, read-aloud is optional and pauseable; retrieval interrupts
speech. Two-host “explanatory segment” is a planned speech-act type
(distinction dialogue), not entertainment.

---

## 11. Dual coding

**Sources**

- Paivio, A. Dual coding theory (classic).
- Ainsworth, S. (2006). DeFT framework for learning with multiple
  representations.

**Finding.** A second *meaningful* representation (table of cover
levels, contrast matrix) can help. Decorative icons do not.

**Strength / limits.** Often oversold in consumer edtech.

**Product behaviour.** Used only for genuine discriminations (cover
comparison tables, peril vs exclusion). No ornament.

---

## 12. Attention, task switching, and adult ADHD

**Sources (ADHD / EF)**

- Barkley, R. A. (1997/2015). Behavioural inhibition and executive
  function model of ADHD.
- Kofler, M. J., et al. reviews on working memory in ADHD.
- Rapport, M. D., Orban, S. A., Kofler, M. J., & Friedman, L. M. (2013).
  Do programs designed to train working memory, other executive
  functions, and attention benefit children with ADHD? *Clinical
  Psychology Review* — working-memory *training games* do not reliably
  transfer to academic achievement.
- Bikic, A., et al. (2015+). Digital interventions; mixed academic
  outcomes.
- DuPaul, G. J., & Langberg, J. — academic interventions that
  *externalise* planning and reduce unstructured choice tend to help
  more than motivation slogans.
- Sonuga-Barke, E. J. S., et al. delay aversion / choice impulsivity.

**ADHD-specific finding, stated carefully.** Adult ADHD is associated
with difficulties in sustaining attention, working memory, timing, and
organising self-directed study. Evidence that generic brain-training
or gamified points improve qualification pass rates is **weak**.
Evidence that reducing executive burden (what to do next, when to
stop, what to review) and using brief, structured tasks is **stronger
as clinical/educational practice**, though RCTs of “study OS for
professional exams” are scarce.

**Product behaviour (design inference, labelled as such).**

- The session engine, not the learner, sequences activities.
- Inactivity, extremely fast responding, repeated reveal-answer, and
  collapsing accuracy are treated as **engagement signals**, never as
  a diagnosis.
- Adaptation is educational: switch to retrieval, shorten the next
  unit, use a concrete insurance scenario, retrieve something from
  ten minutes earlier, change format, raise interaction frequency.
- No streak anxiety, XP, or badge for opening the app.
- After a lapse, restore a *complete small cycle* (one question that
  can be finished), not a “take a break” toast that dumps planning
  back on the learner.

---

## 13. Productive vs distracting gamification

**Sources**

- Sailer, M., & Homner, L. (2020). The gamification of learning: a
  meta-analysis. *Educational Psychology Review*.
- Bai, S., Hew, K. F., & Huang, B. (2020). Does gamification improve
  student learning outcome? *Educational Research Review*.

**Finding.** Points, badges and leaderboards produce mixed, often
short-lived effects; they can undermine interest and encourage
guessing to “clear” items. Meaningful challenge and feedback are the
active ingredients when gamification helps.

**Strength / limits.** Meta-analyses are heterogeneous.

**Product behaviour.** No XP, confetti, or trivial badges. The only
“reward” is a debrief that states what was demonstrated, what is
still uncertain, and what will return.

---

## 14. Exam alignment without MCQ overfitting

**Sources**

- CII IF2 syllabus 2026 and examination guide 2026 (authoritative for
  *what* is tested).
- Butler, A. C. (2010). Repeated testing produces superior transfer.
  *Journal of Experimental Psychology: Learning, Memory, and Cognition*.

**Finding.** Transfer is better when practice varies format.
IF2 assessment is 100 MCQs in 2 hours, *know* vs *understand* skill
verbs, English law, ±2 questions around published weights. LO 1
(products) is 36/100 — dominant for chapters 1–6.

**Product behaviour.** Mixed-format learning for durable
understanding; a separate exam-readiness layer later uses MCQ timing
and syllabus weights. Chapters 1–6 map to syllabus 1.1 only in this
build (1.2 non-insurance services is chapter 7 and is out of scope).
