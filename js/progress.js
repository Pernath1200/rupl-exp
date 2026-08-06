/**
 * RUPL-exp dual progress — never writes rupl2/rupl3 keys.
 *
 * First-learn fruit (2026-08-06, aligned with RUE2):
 * - Grammar: Check clear + Type clear + USE CLEAR (James 2026-08-06: a2_smalltalk
 *   fruited at Use 67% — 'finished' was not enough; intro optional for jumpers).
 * - Vocab: Match done + Quiz clear + Type clear + Sentence CLEAR (same ruling).
 * Clear = best ratio ≥ 1 (score ≥ total) or sticky cleanPass after Retry wrong.
 * Soft PASS_RATIO / FRUIT_SOFT = reviews only — not first-learn celebration.
 * Use/Sentence entry blocked until prior stages clear (RUE2-style).
 */

const KEY = "rupl-exp-v0.1-progress";
export const PASS_RATIO = 0.8;
export const FRUIT_SOFT = 0.75;
/** Successful spaced reviews needed for “Mastered” (RUE2 sibling). */
export const MASTERY_REPS = 4;

/** Stage fully clear for first-learn (sticky best-ever OK). */
export function stageIsClear(ratio, cleanPass) {
  if (cleanPass) return true;
  if (typeof ratio !== "number") return false;
  return ratio >= 1;
}

function empty() {
  return {
    version: 1,
    authorUnlock: false,
    unlocked: ["A1"],
    grammar: { blocks: {} },
    vocab: { blocks: {} },
    units: {},
    /** Per tree-node review state (unit SRS). Honest zeros until review writes. */
    nodes: {},
  };
}

export function loadProgress() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty();
    const d = JSON.parse(raw);
    if (!d || typeof d !== "object") return empty();
    if (!d.grammar) d.grammar = { blocks: {} };
    if (!d.grammar.blocks) d.grammar.blocks = {};
    if (!d.vocab) d.vocab = { blocks: {} };
    if (!d.vocab.blocks) d.vocab.blocks = {};
    if (!d.units) d.units = {};
    if (!d.nodes) d.nodes = {};
    if (!Array.isArray(d.unlocked)) d.unlocked = ["A1"];
    migrateFruitGates(d);
    migrateUseClear(d);
    return d;
  } catch {
    return empty();
  }
}

/**
 * One-time grandfather pass (2026-08-06). The RUE2-aligned gates demand
 * quiz/type fully clear, but records from before the port carry soft
 * bests and no cleanPass flags — fruit those units earned under the
 * rule in force at the time ("first completion fruits", James
 * 2026-08-04) must not be revoked retroactively. Any block with its
 * full mode ladder walked before this migration is stamped clear.
 */
function migrateFruitGates(d) {
  if (d.fruitGatesMigrated) return;
  for (const b of Object.values(d.grammar.blocks || {})) {
    const m = (b && b.modes) || {};
    if (m.check && m.type && m.use) {
      b.checkCleanPass = true;
      b.typeCleanPass = true;
    }
  }
  for (const b of Object.values(d.vocab.blocks || {})) {
    const m = (b && b.modes) || {};
    if (m.match && m.quiz && m.type && m.sentence) {
      b.quizCleanPass = true;
      b.typeCleanPass = true;
    }
  }
  d.fruitGatesMigrated = true;
}

/**
 * Second grandfather pass (2026-08-06, Use-clear ruling): blocks whose Use/
 * Sentence stage was walked before the rule existed keep their fruit — the
 * stricter bar applies to new play only. Same never-revoke-retroactively
 * principle as pass one.
 */
function migrateUseClear(d) {
  if (d.useClearMigrated) return;
  for (const b of Object.values(d.grammar.blocks || {})) {
    if (b && b.modes && b.modes.use && b.useCleanPass === undefined) {
      b.useCleanPass = true;
    }
  }
  for (const b of Object.values(d.vocab.blocks || {})) {
    if (b && b.modes && b.modes.sentence && b.sentenceCleanPass === undefined) {
      b.sentenceCleanPass = true;
    }
  }
  d.useClearMigrated = true;
  try {
    localStorage.setItem(KEY, JSON.stringify(d));
  } catch {
    /* quota — harmless, migration reruns next load */
  }
}

function save(p) {
  localStorage.setItem(KEY, JSON.stringify(p));
}

export function isAuthorUnlock() {
  return !!loadProgress().authorUnlock;
}

export function setAuthorUnlock(on) {
  const p = loadProgress();
  p.authorUnlock = !!on;
  if (on) {
    for (const lv of ["A1", "A2", "B1", "B2"]) {
      if (!p.unlocked.includes(lv)) p.unlocked.push(lv);
    }
  }
  save(p);
}

export function isLevelUnlocked(level) {
  const p = loadProgress();
  if (p.authorUnlock) return true;
  return (p.unlocked || []).includes(level);
}

/**
 * Auto-unlock (James 2026-08-06): a level unlocks the moment the previous
 * level is 100% learned. Call at boot and after fruit changes. Persists
 * into p.unlocked so meters/rail stay consistent everywhere.
 */
export function autoUnlockLevels(nodes) {
  const p = loadProgress();
  const seen = [];
  for (const n of nodes || []) {
    const lv = Array.isArray(n.levels) ? n.levels[0] : null;
    if (lv && !seen.includes(lv)) seen.push(lv);
  }
  let changed = false;
  for (let i = 1; i < seen.length; i++) {
    const prev = seen[i - 1];
    const lv = seen[i];
    if (p.unlocked.includes(lv)) continue;
    const s = levelUnitStats(prev, nodes);
    if (s && s.total > 0 && s.learned >= s.total) {
      p.unlocked.push(lv);
      changed = true;
    }
  }
  if (changed) save(p);
  return changed;
}

// ---- Grammar API (compatible with practice-grammar.js) ----

export function touchBlock(blockId) {
  const p = loadProgress();
  if (!p.grammar.blocks[blockId]) {
    p.grammar.blocks[blockId] = { modes: {}, best: {}, touchedAt: Date.now() };
  } else {
    p.grammar.blocks[blockId].touchedAt = Date.now();
  }
  save(p);
}

/**
 * @returns {{ wasFruit: boolean, nowFruit: boolean, justFruited: boolean }}
 */
export function completeMode(blockId, mode, result = null) {
  const wasFruit = hasFruit(blockId);
  const p = loadProgress();
  if (!p.grammar.blocks[blockId]) {
    p.grammar.blocks[blockId] = {
      modes: {},
      best: {},
      checkCleanPass: false,
      typeCleanPass: false,
      touchedAt: Date.now(),
    };
  }
  const b = p.grammar.blocks[blockId];
  if (b.checkCleanPass === undefined) b.checkCleanPass = false;
  if (b.typeCleanPass === undefined) b.typeCleanPass = false;
  if (b.useCleanPass === undefined) b.useCleanPass = false;
  b.modes = b.modes || {};
  b.best = b.best || {};
  b.modes[mode] = true;
  b.touchedAt = Date.now();
  let ratio = null;
  if (result && typeof result.score === "number" && result.total > 0) {
    ratio = result.score / result.total;
    const prev = b.best[mode];
    if (prev == null || ratio > prev) b.best[mode] = ratio;
    // Clear round (full marks or retry-until-clear as 1/1)
    if (ratio >= 1) {
      if (mode === "check") b.checkCleanPass = true;
      if (mode === "type") b.typeCleanPass = true;
      if (mode === "use") b.useCleanPass = true;
    }
  }
  save(p);
  const nowFruit = hasFruit(blockId);
  // Grammar pack id == tree node id
  const review = reviewTick(blockId, ratio, nowFruit);
  return {
    wasFruit,
    nowFruit,
    justFruited: !wasFruit && nowFruit,
    review,
  };
}

function gBlock(id) {
  return loadProgress().grammar.blocks[id] || null;
}

function modeDone(b, mode) {
  return !!(b && b.modes && b.modes[mode]);
}

export function grammarCheckClear(b) {
  if (!b) return false;
  return stageIsClear(b.best && b.best.check, b.checkCleanPass);
}

export function grammarTypeClear(b) {
  if (!b) return false;
  return stageIsClear(b.best && b.best.type, b.typeCleanPass);
}

export function grammarUseClear(b) {
  if (!b) return false;
  return stageIsClear(b.best && b.best.use, b.useCleanPass);
}

/** Check + Type fully clear — required before Use (RUE2-style). */
export function canEnterGrammarUse(blockId) {
  const b = gBlock(blockId);
  return grammarCheckClear(b) && grammarTypeClear(b);
}

/**
 * First-learn fruit: Check clear + Type clear + Use finished.
 * Soft % does not grant fruit. Modes-only no longer enough.
 */
export function hasFruit(blockId) {
  const b = gBlock(blockId);
  if (!b) return false;
  if (!modeDone(b, "check") || !modeDone(b, "type") || !modeDone(b, "use")) {
    return false;
  }
  return grammarCheckClear(b) && grammarTypeClear(b) && grammarUseClear(b);
}

export function grammarBest(blockId) {
  const b = gBlock(blockId);
  return {
    check: b && b.best && b.best.check != null ? b.best.check : null,
    type: b && b.best && b.best.type != null ? b.best.type : null,
  };
}

export function progressLabelGrammar(node) {
  if (node.status === "planned") return "planowane";
  if (hasFruit(node.id)) return "owoc";
  const b = gBlock(node.id);
  if (!b || !b.modes) return "żywe";
  const done = ["intro", "check", "type", "use"].filter((m) => b.modes[m]);
  if (!done.length) return "żywe";
  return `${done.length}/4`;
}

export function nodeProgressStateGrammar(node) {
  if (node.status !== "live") return "planned";
  if (hasFruit(node.id)) return "fruit";
  const b = gBlock(node.id);
  if (b && b.modes && Object.keys(b.modes).length) return "started";
  return "live";
}

// ---- Vocab API (compatible with rupl3 opts callbacks) ----

export function touchVocabBlock(blockId, nodeId) {
  const p = loadProgress();
  if (!p.vocab.blocks[blockId]) {
    p.vocab.blocks[blockId] = {
      nodeId: nodeId || null,
      modes: {},
      bestQuiz: null,
      bestType: null,
      sentenceDone: false,
      touchedAt: Date.now(),
    };
  } else {
    p.vocab.blocks[blockId].touchedAt = Date.now();
    if (nodeId) p.vocab.blocks[blockId].nodeId = nodeId;
  }
  save(p);
}

/**
 * @returns {{ wasFruit: boolean, nowFruit: boolean, justFruited: boolean }}
 */
export function completeVocabMode(blockId, mode, meta = {}) {
  const p = loadProgress();
  if (!p.vocab.blocks[blockId]) {
    p.vocab.blocks[blockId] = {
      modes: {},
      bestQuiz: null,
      bestType: null,
      quizCleanPass: false,
      typeCleanPass: false,
      sentenceDone: false,
      touchedAt: Date.now(),
    };
  }
  const b = p.vocab.blocks[blockId];
  if (b.quizCleanPass === undefined) b.quizCleanPass = false;
  if (b.typeCleanPass === undefined) b.typeCleanPass = false;
  const wasFruit = blockHasFruit(b);
  b.modes = b.modes || {};
  b.modes[mode] = true;
  b.touchedAt = Date.now();
  let ratio = null;
  if (meta.score != null && meta.total > 0) {
    ratio = meta.score / meta.total;
  }
  if (mode === "quiz" && ratio != null) {
    if (b.bestQuiz == null || ratio > b.bestQuiz) b.bestQuiz = ratio;
    if (ratio >= 1) b.quizCleanPass = true;
  }
  if (mode === "type" && ratio != null) {
    if (b.bestType == null || ratio > b.bestType) b.bestType = ratio;
    if (ratio >= 1) b.typeCleanPass = true;
  }
  if (mode === "sentence") {
    b.sentenceDone = true;
    if (ratio != null) {
      if (b.bestSentence == null || ratio > b.bestSentence) b.bestSentence = ratio;
      if (ratio >= 1) b.sentenceCleanPass = true;
    }
  }
  save(p);
  const nowFruit = blockHasFruit(b);
  const review = reviewTick(b.nodeId || blockId, ratio, nowFruit);
  return {
    wasFruit,
    nowFruit,
    justFruited: !wasFruit && nowFruit,
    review,
  };
}

export function vocabQuizClear(b) {
  if (!b) return false;
  return stageIsClear(b.bestQuiz, b.quizCleanPass);
}

export function vocabTypeClear(b) {
  if (!b) return false;
  return stageIsClear(b.bestType, b.typeCleanPass);
}

/** Quiz + Type clear — required before Sentence/Use (RUE2-style). */
export function canEnterVocabSentence(blockId) {
  const b = loadProgress().vocab.blocks[blockId] || null;
  // Match should be done first when present; still require clear quiz+type
  if (!b) return false;
  if (!b.modes || !b.modes.match || !b.modes.quiz || !b.modes.type) {
    // Allow if quiz+type clear even if match flag missing (edge packs)
    return vocabQuizClear(b) && vocabTypeClear(b);
  }
  return vocabQuizClear(b) && vocabTypeClear(b);
}

export function vocabSentenceClear(b) {
  if (!b) return false;
  // Old records carry only the boolean; the migration stamps them clear.
  return stageIsClear(b.bestSentence, b.sentenceCleanPass);
}

export function blockHasFruit(b) {
  if (!b || !b.modes) return false;
  const m = b.modes;
  // Modes walked + Quiz/Type/Sentence fully clear (not soft 75%)
  if (!(m.match && m.quiz && m.type && m.sentence)) return false;
  return vocabQuizClear(b) && vocabTypeClear(b) && vocabSentenceClear(b);
}

export function vocabBlockFruit(blockId) {
  return blockHasFruit(loadProgress().vocab.blocks[blockId]);
}

/** Vocab node fruit = any practice block under that node fruited, or node id as pack. */
export function hasVocabFruit(node) {
  if (!node || node.status !== "live") return false;
  const p = loadProgress();
  // Prefer blocks that record nodeId
  for (const [id, b] of Object.entries(p.vocab.blocks || {})) {
    if (b.nodeId === node.id && blockHasFruit(b)) return true;
    if (id === node.id && blockHasFruit(b)) return true;
  }
  // Pack id often equals tree content basename without path
  const content = node.content || "";
  const base = content.split("/").pop()?.replace(/\.json$/, "");
  if (base && p.vocab.blocks[base] && blockHasFruit(p.vocab.blocks[base]))
    return true;
  return false;
}

export function progressLabelVocab(node) {
  if (node.status === "planned") return "planowane";
  if (hasVocabFruit(node)) return "owoc";
  const p = loadProgress();
  let b = null;
  for (const x of Object.values(p.vocab.blocks || {})) {
    if (x.nodeId === node.id) {
      b = x;
      break;
    }
  }
  if (!b) return "żywe";
  const modes = ["match", "quiz", "type", "sentence"];
  const done = modes.filter((m) => b.modes && b.modes[m]);
  if (!done.length) return "żywe";
  return `${done.length}/4`;
}

export function nodeProgressStateVocab(node) {
  if (node.status !== "live") return "planned";
  if (hasVocabFruit(node)) return "fruit";
  const p = loadProgress();
  for (const x of Object.values(p.vocab.blocks || {})) {
    if (x.nodeId === node.id && x.modes && Object.keys(x.modes).length)
      return "started";
  }
  return "live";
}

export function unitStatus(unitId) {
  const p = loadProgress();
  return p.units[unitId] || { grammarFruit: false, vocabFruit: false };
}

export function refreshUnit(unitId, grammarNodeId, vocabNodeId) {
  if (!unitId) return;
  const p = loadProgress();
  p.units[unitId] = {
    grammarFruit: grammarNodeId ? hasFruit(grammarNodeId) : false,
    vocabFruit: vocabNodeId
      ? hasVocabFruit({ id: vocabNodeId, status: "live" })
      : false,
  };
  save(p);
}

export function rootFill(tree, rootId) {
  const live = (tree.nodes || []).filter(
    (n) =>
      n.domain === "grammar" &&
      n.root === rootId &&
      n.status === "live" &&
      n.levels?.includes("A1"),
  );
  if (!live.length) return 0;
  let sum = 0;
  for (const n of live) {
    if (hasFruit(n.id)) sum += 1;
    else {
      const b = gBlock(n.id);
      if (b?.modes) {
        const parts = ["intro", "check", "type", "use"];
        sum += parts.filter((m) => b.modes[m]).length / 4;
      }
    }
  }
  return sum / live.length;
}

export function tapFill(tree) {
  const live = (tree.nodes || []).filter(
    (n) =>
      n.domain === "grammar" &&
      n.foundation &&
      n.status === "live" &&
      n.levels?.includes("A1"),
  );
  if (!live.length) return 0;
  let sum = 0;
  for (const n of live) {
    if (hasFruit(n.id)) sum += 1;
    else {
      const b = gBlock(n.id);
      if (b?.modes) {
        const parts = ["intro", "check", "type", "use"];
        sum += parts.filter((m) => b.modes[m]).length / 4;
      }
    }
  }
  return sum / live.length;
}

// ---- Unit SRS ----
// A unit becomes reviewable when it first fruits (learnedAt, due next day).
// A review succeeds when, while due, any scored pass reaches FRUIT_SOFT:
// reps++ and the interval widens. A weak pass while due re-queues tomorrow.
const REVIEW_INTERVALS_DAYS = [1, 3, 7, 14, 30];
const DAY_MS = 24 * 60 * 60 * 1000;

function reviewTick(nodeId, ratio, fruited) {
  if (!nodeId) return null;
  const p = loadProgress();
  const n = (p.nodes[nodeId] = p.nodes[nodeId] || {});
  const now = Date.now();
  if (fruited && !n.learnedAt) {
    n.learnedAt = new Date(now).toISOString();
    n.nextDueAt = new Date(now + REVIEW_INTERVALS_DAYS[0] * DAY_MS).toISOString();
    save(p);
    return null;
  }
  if (!n.learnedAt || !n.nextDueAt || ratio == null) return null;
  if (now < Date.parse(n.nextDueAt)) return null;
  n.lastReviewAt = new Date(now).toISOString();
  const before = n.successfulReps || 0;
  let outcome = null;
  if (ratio >= FRUIT_SOFT) {
    n.successfulReps = before + 1;
    const idx = Math.min(n.successfulReps, REVIEW_INTERVALS_DAYS.length - 1);
    n.nextDueAt = new Date(now + REVIEW_INTERVALS_DAYS[idx] * DAY_MS).toISOString();
    // First successful rep = this unit just became "remembered".
    outcome = {
      reviewPassed: true,
      justRemembered: before === 0,
      justMastered: before + 1 === MASTERY_REPS,
      reps: n.successfulReps,
    };
  } else {
    n.nextDueAt = new Date(now + DAY_MS).toISOString();
    outcome = { reviewPassed: false, justRemembered: false, reps: before };
  }
  save(p);
  return outcome;
}

/** Live nodes whose review is due now (pass the tree's live practice nodes). */
export function reviewDueList(nodes) {
  const p = loadProgress();
  const now = Date.now();
  return (nodes || []).filter((node) => {
    // Retired units (taken off the path — a2_past_gym) must not keep
    // demanding reviews: James 2026-08-06, "no point drilling material
    // judged not worth teaching".
    if (node.status !== "live" || !node.content) return false;
    const n = p.nodes?.[node.id];
    return n && n.learnedAt && n.nextDueAt && now >= Date.parse(n.nextDueAt);
  });
}

/**
 * One-time adoption for units fruited before the SRS existed: learnedAt is
 * taken from the block's touchedAt, so yesterday's units come due today.
 */
export function backfillReview(nodes) {
  const p = loadProgress();
  let changed = 0;
  for (const node of nodes || []) {
    if (!node || node.status !== "live" || !node.content) continue;
    if (p.nodes[node.id]?.learnedAt) continue;
    const fruited =
      node.domain === "vocab" ? hasVocabFruit(node) : hasFruit(node.id);
    if (!fruited) continue;
    let touched = null;
    if (node.domain === "grammar") {
      touched = p.grammar.blocks[node.id]?.touchedAt || null;
    } else {
      for (const [id, b] of Object.entries(p.vocab.blocks || {})) {
        if (b.nodeId === node.id || id === node.id) {
          touched = b.touchedAt || touched;
        }
      }
      const base = (node.content || "").split("/").pop()?.replace(/\.json$/, "");
      if (!touched && base) touched = p.vocab.blocks[base]?.touchedAt || null;
    }
    const learned = touched || Date.now() - DAY_MS;
    p.nodes[node.id] = {
      learnedAt: new Date(learned).toISOString(),
      nextDueAt: new Date(learned + REVIEW_INTERVALS_DAYS[0] * DAY_MS).toISOString(),
    };
    changed++;
  }
  if (changed) save(p);
  return changed;
}

/**
 * Review / SRS fields for a tree node. Empty until unit review writes them.
 * @returns {{ successfulReps: number, learnedAt: string|null, lastReviewAt: string|null, nextDueAt: string|null }}
 */
export function getNodeReview(nodeId) {
  const data = loadProgress();
  const n = (data.nodes && data.nodes[nodeId]) || null;
  return {
    successfulReps:
      n && typeof n.successfulReps === "number" ? n.successfulReps : 0,
    learnedAt: n && n.learnedAt ? n.learnedAt : null,
    lastReviewAt: n && n.lastReviewAt ? n.lastReviewAt : null,
    nextDueAt: n && n.nextDueAt ? n.nextDueAt : null,
  };
}

/**
 * Three-meter stats for a CEFR level (RUE2 model).
 * Unit grain = live practice nodes (grammar topics + vocab trunk/leaf) on that level.
 * Learned = fruit (ladder + score bar). Remembered = ≥1 successful review.
 * Mastered = ≥ MASTERY_REPS. Review meters stay honest zeros until SRS writes.
 *
 * @param {string} level
 * @param {Array<{ id: string, status?: string, levels?: string[], content?: string|null, domain?: string }>} nodes
 * @returns {{ total: number, learned: number, remembered: number, mastered: number, partial: number }}
 */
export function levelUnitStats(level, nodes) {
  const list = (nodes || []).filter(
    (n) =>
      n &&
      n.id &&
      n.status === "live" &&
      n.content &&
      Array.isArray(n.levels) &&
      n.levels.includes(level),
  );
  let learned = 0;
  let remembered = 0;
  let mastered = 0;
  let partial = 0;
  for (const n of list) {
    const fruited =
      n.domain === "vocab" ? hasVocabFruit(n) : hasFruit(n.id);
    const started =
      n.domain === "vocab"
        ? nodeProgressStateVocab(n) === "started"
        : nodeProgressStateGrammar(n) === "started";
    if (fruited) learned++;
    else if (started) partial++;
    const reps = getNodeReview(n.id).successfulReps;
    // Remembered/mastered only with real review evidence — no decorative glow
    if (fruited || reps > 0) {
      if (reps >= 1) remembered++;
      if (reps >= MASTERY_REPS) mastered++;
    }
  }
  return {
    total: list.length,
    learned,
    remembered,
    mastered,
    partial,
  };
}

export function resetAllProgress() {
  localStorage.removeItem(KEY);
}

/** Storage key (stable — never rename; renaming wipes browsers). */
export function progressStorageKey() {
  return KEY;
}

/**
 * Portable progress file for Download / Import.
 * Move between localhost and GitHub Pages, or backup before updates.
 */
export function buildProgressExport() {
  return {
    app: "rupl-exp",
    key: KEY,
    exportedAt: new Date().toISOString(),
    progress: loadProgress(),
  };
}

/**
 * Validate and apply an exported file (or raw progress object).
 * Returns { ok, message, unitish }.
 */
export function importProgressPayload(raw) {
  let obj = raw;
  if (typeof raw === "string") {
    try {
      obj = JSON.parse(raw);
    } catch {
      return { ok: false, message: "Not valid JSON." };
    }
  }
  if (!obj || typeof obj !== "object") {
    return { ok: false, message: "Empty or invalid file." };
  }
  if (obj.key && obj.key !== KEY) {
    return {
      ok: false,
      message: `Wrong file (key ${obj.key}). Need ${KEY}.`,
    };
  }
  if (obj.app && obj.app !== "rupl-exp") {
    return { ok: false, message: "This file is not RUPL progress (wrong app)." };
  }
  const body = obj.progress != null ? obj.progress : obj;
  if (!body || typeof body !== "object") {
    return { ok: false, message: "No progress data in file." };
  }
  // Normalize via load-style checks
  const normalized = {
    version: 1,
    authorUnlock: !!body.authorUnlock,
    unlocked: Array.isArray(body.unlocked) ? body.unlocked.slice() : ["A1"],
    grammar: {
      blocks:
        body.grammar && body.grammar.blocks && typeof body.grammar.blocks === "object"
          ? body.grammar.blocks
          : {},
    },
    vocab: {
      blocks:
        body.vocab && body.vocab.blocks && typeof body.vocab.blocks === "object"
          ? body.vocab.blocks
          : {},
    },
    units: body.units && typeof body.units === "object" ? body.units : {},
    nodes: body.nodes && typeof body.nodes === "object" ? body.nodes : {},
  };
  if (!normalized.unlocked.includes("A1")) {
    normalized.unlocked = ["A1", ...normalized.unlocked];
  }
  const gN = Object.keys(normalized.grammar.blocks).length;
  const vN = Object.keys(normalized.vocab.blocks).length;
  try {
    localStorage.setItem(KEY, JSON.stringify(normalized));
  } catch {
    return { ok: false, message: "Could not save (private mode / full storage)." };
  }
  return {
    ok: true,
    message: `Imported (grammar units: ${gN}, vocab banks: ${vN}).`,
    unitish: gN + vN,
  };
}

/** Download current progress as a .json file. */
export function downloadProgressFile() {
  const blob = new Blob([JSON.stringify(buildProgressExport(), null, 2)], {
    type: "application/json",
  });
  const a = document.createElement("a");
  const day = new Date().toISOString().slice(0, 10);
  a.href = URL.createObjectURL(blob);
  a.download = `rupl-progress-${day}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
