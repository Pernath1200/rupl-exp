/**
 * RUPL-exp dual progress — never writes rupl2/rupl3 keys.
 * Grammar fruit: 4 modes + best check/type ≥ 0.8 (rupl2)
 * Vocab fruit: 4 modes + best quiz/type ≥ 0.75 (rupl3 soft)
 */

const KEY = "rupl-exp-v0.1-progress";
export const PASS_RATIO = 0.8;
export const FRUIT_SOFT = 0.75;

function empty() {
  return {
    version: 1,
    authorUnlock: false,
    unlocked: ["A1"],
    grammar: { blocks: {} },
    vocab: { blocks: {} },
    units: {},
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
    if (!Array.isArray(d.unlocked)) d.unlocked = ["A1"];
    return d;
  } catch {
    return empty();
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

export function completeMode(blockId, mode, result = null) {
  const p = loadProgress();
  if (!p.grammar.blocks[blockId]) {
    p.grammar.blocks[blockId] = { modes: {}, best: {}, touchedAt: Date.now() };
  }
  const b = p.grammar.blocks[blockId];
  b.modes[mode] = true;
  b.touchedAt = Date.now();
  if (result && typeof result.score === "number" && result.total > 0) {
    const ratio = result.score / result.total;
    const prev = b.best[mode];
    if (prev == null || ratio > prev) b.best[mode] = ratio;
  }
  save(p);
}

function gBlock(id) {
  return loadProgress().grammar.blocks[id] || null;
}

function modeDone(b, mode) {
  return !!(b && b.modes && b.modes[mode]);
}

function bestOk(b, mode, ratio) {
  if (!b || !b.best || b.best[mode] == null) return modeDone(b, mode);
  return b.best[mode] >= ratio;
}

export function hasFruit(blockId) {
  const b = gBlock(blockId);
  if (!b) return false;
  const ladder =
    modeDone(b, "intro") &&
    modeDone(b, "check") &&
    modeDone(b, "type") &&
    modeDone(b, "use");
  if (!ladder) return false;
  return bestOk(b, "check", PASS_RATIO) && bestOk(b, "type", PASS_RATIO);
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

export function completeVocabMode(blockId, mode, meta = {}) {
  const p = loadProgress();
  if (!p.vocab.blocks[blockId]) {
    p.vocab.blocks[blockId] = {
      modes: {},
      bestQuiz: null,
      bestType: null,
      sentenceDone: false,
      touchedAt: Date.now(),
    };
  }
  const b = p.vocab.blocks[blockId];
  b.modes = b.modes || {};
  b.modes[mode] = true;
  b.touchedAt = Date.now();
  if (mode === "quiz" && meta.score != null && meta.total > 0) {
    const r = meta.score / meta.total;
    if (b.bestQuiz == null || r > b.bestQuiz) b.bestQuiz = r;
  }
  if (mode === "type" && meta.score != null && meta.total > 0) {
    const r = meta.score / meta.total;
    if (b.bestType == null || r > b.bestType) b.bestType = r;
  }
  if (mode === "sentence") b.sentenceDone = true;
  save(p);
}

export function blockHasFruit(b) {
  if (!b || !b.modes) return false;
  const m = b.modes;
  if (!m.match || !m.quiz || !m.type || !m.sentence) return false;
  const q = b.bestQuiz == null ? 1 : b.bestQuiz;
  const t = b.bestType == null ? 1 : b.bestType;
  return q >= FRUIT_SOFT && t >= FRUIT_SOFT;
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

export function resetAllProgress() {
  localStorage.removeItem(KEY);
}
