export type ChapterId = 1 | 2 | 3 | 4 | 5 | 6;

export type SkillLevel = "know" | "understand" | "apply";

export type SourceKind = "study-text" | "key-facts" | "syllabus" | "exam-guide";

export type Provenance = {
  kind: SourceKind;
  chapter?: ChapterId;
  section: string;
  page?: string;
  locator: string;
  note?: string;
};

export type FactKind =
  | "definition"
  | "rule"
  | "limit"
  | "exclusion"
  | "cover"
  | "example"
  | "procedure"
  | "distinction";

export type AuthoredFact = {
  id: string;
  chapter: ChapterId;
  section: string;
  conceptId: string;
  title: string;
  kind: FactKind;
  /** Canonical claim. Wrap the examinable kernel in [[double brackets]]. */
  claim: string;
  extra?: string;
  importance: "core" | "supporting" | "detail";
  skill: SkillLevel;
  sources: Provenance[];
  confusedWith?: string[];
  prerequisites?: string[];
  prediction?: string;
  teachBackCue?: string;
  scenario?: { setup: string; question: string; answer: string };
  mcq?: {
    stem: string;
    options: [string, string, string, string];
    correct: 0 | 1 | 2 | 3;
    whyWrong: [string, string, string, string];
  };
};

export type Concept = {
  id: string;
  title: string;
  chapter: ChapterId;
  section: string;
  syllabusOutcomes: string[];
  summary: string;
  importance: "core" | "supporting" | "detail";
  prerequisites: string[];
  confusedWith: string[];
  factIds: string[];
  sources: Provenance[];
};

export type LearningUnit = {
  id: string;
  chapter: ChapterId;
  title: string;
  conceptIds: string[];
  factIds: string[];
  load: 1 | 2 | 3 | 4 | 5;
  prerequisites: string[];
  reading: { heading: string; body: string; sources: Provenance[] }[];
  prediction?: string;
  comparisonTable?: { caption: string; headers: string[]; rows: string[][] };
};

export type ReadingRole = "open" | "fact" | "why" | "trap";

export type BookTrap = {
  title: string;
  body: string;
  sources: Provenance[];
};

/** One textbook section (chapter + Key Facts heading), not a single concept unit. */
export type BookSection = {
  id: string;
  chapter: ChapterId;
  chapterTitle: string;
  title: string;
  indexInChapter: number;
  sectionCountInChapter: number;
  conceptIds: string[];
  factIds: string[];
  lede?: string;
  traps: BookTrap[];
  reading: { heading?: string; body: string; sources: Provenance[]; role?: ReadingRole }[];
  comparisonTable?: { caption: string; headers: string[]; rows: string[][] };
};

export type ItemType =
  | "free-recall"
  | "mcq"
  | "cloze"
  | "scenario"
  | "compare"
  | "classify"
  | "error-correction"
  | "summary"
  | "teach-back"
  | "why-wrong"
  | "distinction"
  | "prediction";

export type PracticeItem = {
  id: string;
  type: ItemType;
  conceptIds: string[];
  factIds: string[];
  skill: SkillLevel;
  recognition: boolean;
  prompt: string;
  options?: string[];
  correctIndex?: number;
  expected: string[];
  rubric: string;
  whyWrong?: string[];
  whyCorrect?: string;
  sources: Provenance[];
  examStyle?: boolean;
  difficulty?: 1 | 2 | 3 | 4 | 5;
  questionKind?: "knowledge" | "definition" | "distinction" | "scenario" | "which-correct" | "cumulative" | "cloze" | "production";
  cognitive?: "recognition" | "understanding" | "distinction" | "application";
  misconception?: string;
  chapter?: ChapterId;
  lo?: string;
  shuffle?: boolean;
};

export type CoverageFlags = {
  encountered: boolean;
  introduced: boolean;
  explained: boolean;
  retrieved: boolean;
  applied: boolean;
  revisitedAfterDelay: boolean;
  recognized: boolean;
  explainedInOwnWords: boolean;
  mcqReady: boolean;
};

export type ConceptState = {
  conceptId: string;
  exposures: number;
  successfulRetrievals: number;
  failedRetrievals: number;
  productionSuccesses: number;
  recognitionSuccesses: number;
  mcqAttempts: number;
  mcqCorrect: number;
  recallAttempts: number;
  recallCorrect: number;
  applicationAttempts: number;
  applicationCorrect: number;
  itemsAttempted: string[];
  firstSeenAt: number | null;
  firstSuccessAt: number | null;
  explainedAt: number | null;
  partialFlags: number;
  confidentErrors: number;
  lastConfidence: number | null;
  lastOutcome: "success" | "fail" | "partial" | null;
  lastSeenAt: number | null;
  lastSuccessAt: number | null;
  lastFailAt: number | null;
  latenciesMs: number[];
  confusedWithHits: Record<string, number>;
  estimatedMastery: number;
  accessibility: number;
  nextDueAt: number | null;
  intervalDays: number;
  successiveCriterionHits: number;
  delayedSuccesses: number;
};

export type ActivityKind =
  | "predict"
  | "read"
  | "retrieve"
  | "explain"
  | "distinguish"
  | "apply"
  | "calibrate"
  | "audio-segment";

export type AttentionSignal =
  | "inactivity"
  | "rapid-answer"
  | "rapid-click"
  | "repeated-error"
  | "reread-loop"
  | "confidence-mismatch"
  | "accuracy-drop"
  | "slow-latency"
  | "reveal-repeat"
  | "guessing";

export type ErrorClass = "slip" | "gap" | "misconception" | "confident-error" | "low-confidence-error";

export type RetrievalKind = "recognition" | "production";

export type QuestionStat = {
  seen: number;
  correct: number;
  lastAt: number;
  lastCorrect: boolean;
};

export type ExamAttempt = {
  id: string;
  at: number;
  mode: "drill" | "chapter" | "mixed" | "full";
  n: number;
  correct: number;
  chapter?: ChapterId;
  byConcept: Record<string, { n: number; correct: number }>;
};

export type LearnerModel = {
  version: 2;
  createdAt: number;
  concepts: Record<string, ConceptState>;
  sessionCount: number;
  recentAccuracy: number[];
  revealCountByFact: Record<string, number>;
  examReadiness: Record<string, number>;
  questionStats: Record<string, QuestionStat>;
  examAttempts: ExamAttempt[];
};

export type PedagogicalDecision = {
  at: number;
  reason: string;
  evidence: string[];
  choice: string;
  layer: "pedagogical-decision";
};

export type SessionEvent = {
  at: number;
  type: string;
  conceptIds?: string[];
  factIds?: string[];
  itemId?: string;
  activity?: ActivityKind;
  payload?: Record<string, unknown>;
};

export type SessionLog = {
  id: string;
  startedAt: number;
  endedAt?: number;
  events: SessionEvent[];
  decisions: PedagogicalDecision[];
  adaptations: { at: number; signal: AttentionSignal; action: string }[];
};

export type SpeechAct = {
  kind: "narrate" | "ask" | "wait" | "feedback" | "dialogue-a" | "dialogue-b";
  text: string;
  interruptible: boolean;
};

