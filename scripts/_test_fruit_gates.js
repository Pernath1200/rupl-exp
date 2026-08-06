/**
 * RUPL first-learn fruit gates (must match progress.js).
 * Run: node scripts/_test_fruit_gates.js
 */
const store = new Map();
globalThis.localStorage = {
  getItem: (k) => (store.has(k) ? store.get(k) : null),
  setItem: (k, v) => store.set(k, String(v)),
  removeItem: (k) => store.delete(k),
};

const {
  hasFruit,
  blockHasFruit,
  canEnterGrammarUse,
  canEnterVocabSentence,
  completeMode,
  completeVocabMode,
  stageIsClear,
} = await import("../js/progress.js");

let failed = 0;
function assert(cond, msg) {
  if (!cond) {
    failed++;
    console.error("FAIL:", msg);
  } else console.log("ok:", msg);
}

assert(stageIsClear(1, false) === true, "ratio 1 clear");
assert(stageIsClear(0.75, false) === false, "0.75 not clear for first fruit");
assert(stageIsClear(0.5, true) === true, "sticky cleanPass clear");

// --- Grammar: modes only without clear scores → no fruit ---
store.clear();
completeMode("g1", "intro");
completeMode("g1", "check", { score: 9, total: 12 });
completeMode("g1", "type", { score: 10, total: 12 });
completeMode("g1", "use", { score: 8, total: 12 });
assert(hasFruit("g1") === false, "grammar partial scores → not fruit");
assert(canEnterGrammarUse("g1") === false, "Use blocked with partial Check/Type");

// Clear check+type via perfect retry stamps
completeMode("g1", "check", { score: 1, total: 1 });
completeMode("g1", "type", { score: 1, total: 1 });
assert(canEnterGrammarUse("g1") === true, "Use allowed after clear Check+Type");
assert(hasFruit("g1") === false, "use still 8/12 → not fruit (James 2026-08-06)");
completeMode("g1", "use", { score: 1, total: 1 });
assert(hasFruit("g1") === true, "grammar all three clear → fruit");

// --- Grammar: cannot fruit without use ---
store.clear();
completeMode("g2", "check", { score: 12, total: 12 });
completeMode("g2", "type", { score: 12, total: 12 });
assert(hasFruit("g2") === false, "no use → not fruit");
assert(canEnterGrammarUse("g2") === true, "can enter use when check+type clear");
completeMode("g2", "use", { score: 5, total: 12 });
assert(hasFruit("g2") === false, "use 5/12 does NOT fruit — a2_smalltalk regression (James 2026-08-06)");
completeMode("g2", "use", { score: 1, total: 1 });
assert(hasFruit("g2") === true, "use poprawka-cleared → fruit");

// --- Vocab ---
store.clear();
const r1 = completeVocabMode("v1", "match");
const r2 = completeVocabMode("v1", "quiz", { score: 9, total: 12 });
const r3 = completeVocabMode("v1", "type", { score: 12, total: 12 });
const r4 = completeVocabMode("v1", "sentence", { score: 10, total: 12 });
assert(r4.justFruited === false, "vocab partial quiz → not justFruited");
assert(blockHasFruit({
  modes: { match: true, quiz: true, type: true, sentence: true },
  bestQuiz: 1,
  bestType: 1,
  quizCleanPass: true,
  typeCleanPass: true,
  bestSentence: 10 / 12,
  sentenceCleanPass: false,
}) === false, "vocab sentence 10/12 blocks fruit (James 2026-08-06)");
assert(blockHasFruit({
  modes: { match: true, quiz: true, type: true, sentence: true },
  bestQuiz: 9 / 12,
  bestType: 1,
  quizCleanPass: false,
  typeCleanPass: true,
}) === false, "vocab quiz 9/12 blocks fruit");

completeVocabMode("v1", "quiz", { score: 1, total: 1 });
const r5 = completeVocabMode("v1", "sentence", { score: 12, total: 12 });
// sentence already done; fruit check after quiz clear
const { loadProgress } = await import("../js/progress.js");
const b = loadProgress().vocab.blocks.v1;
assert(blockHasFruit(b) === true, "vocab clear quiz+type + all modes → fruit");
assert(canEnterVocabSentence("v1") === true, "sentence allowed when quiz+type clear");

// Fresh vocab cannot enter sentence
store.clear();
completeVocabMode("v2", "match");
completeVocabMode("v2", "quiz", { score: 8, total: 12 });
completeVocabMode("v2", "type", { score: 12, total: 12 });
assert(canEnterVocabSentence("v2") === false, "sentence blocked with quiz open");

if (failed) {
  console.error("\n" + failed + " failed");
  process.exit(1);
}
console.log("\nALL PASS (rupl fruit gates)");
process.exit(0);
