export function shuffleInPlace<T>(arr: T[], rng = Math.random): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function shuffleMcq(options: string[], correctIndex: number, rng = Math.random) {
  const tagged = options.map((text, i) => ({ text, correct: i === correctIndex }));
  const shuffled = shuffleInPlace(tagged, rng);
  return {
    options: shuffled.map((t) => t.text),
    correctIndex: shuffled.findIndex((t) => t.correct),
  };
}
