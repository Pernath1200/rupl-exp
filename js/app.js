/**
 * RUPL-exp — combined map: grammar + vocab, spine conductor.
 * Stable siblings: rupl2 :8095 · rupl3 :8094. This app: :8096.
 */

import { startGrammarPractice } from "./practice-grammar.js";
import { startPractice as startVocabPractice } from "./practice-vocab.js";
import {
  loadProgress,
  isAuthorUnlock,
  setAuthorUnlock,
  isLevelUnlocked,
  hasFruit,
  progressLabelGrammar,
  nodeProgressStateGrammar,
  hasVocabFruit,
  progressLabelVocab,
  nodeProgressStateVocab,
  touchBlock,
  completeMode,
  touchVocabBlock,
  completeVocabMode,
  rootFill,
  tapFill,
  refreshUnit,
  levelUnitStats,
  reviewDueList,
  backfillReview,
  autoUnlockLevels,
  PASS_RATIO,
  MASTERY_REPS,
  FRUIT_SOFT,
  downloadProgressFile,
  importProgressPayload,
} from "./progress.js";
import {
  mountSmokeFlagsUI,
  getSmokeApi,
  setSmokeContext,
  updateFlagsBadge,
} from "./smoke-flags.js";
import { renderTreePortrait } from "./tree-portrait.js";
import { initLemmaOrigin, wireWordTap, originsSummary } from "./lemma-origin.js";

const STATE = {
  level: "A1",
  tree: null,
  spine: null,
  selectedId: null,
  view: "map",
  showFull: false,
  /** First-fruit meter beat: { before, after, kind?, nodeId } or null */
  pendingFruitPayoff: null,
};

async function loadJson(path) {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error(`Could not load ${path}`);
  return res.json();
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function nodeById(id) {
  return (STATE.tree?.nodes || []).find((n) => n.id === id) || null;
}

function isFruit(node) {
  if (!node || node.status !== "live") return false;
  return node.domain === "grammar" ? hasFruit(node.id) : hasVocabFruit(node);
}

function progressLabel(node) {
  return node.domain === "grammar"
    ? progressLabelGrammar(node)
    : progressLabelVocab(node);
}

function progressState(node) {
  return node.domain === "grammar"
    ? nodeProgressStateGrammar(node)
    : nodeProgressStateVocab(node);
}

function showMap() {
  const pr = document.getElementById("practice-root");
  if (pr && typeof pr._rupl2UnbindKeys === "function") {
    pr._rupl2UnbindKeys();
    pr._rupl2UnbindKeys = null;
  }
  if (pr && typeof pr._ruplVocabUnbind === "function") {
    pr._ruplVocabUnbind();
    pr._ruplVocabUnbind = null;
  }
  clearFruitPayoffKeys();
  if (pr) pr.innerHTML = "";
  STATE.view = "map";
  document.getElementById("view-map").hidden = false;
  document.getElementById("view-practice").hidden = true;
  document.body.classList.remove("domain-grammar", "domain-vocab");
  // Rail mirrors the action (James 2026-08-06): returning from practice
  // lands on the played unit's level; manual picks are temporary browsing.
  autoUnlockLevels(STATE.tree?.nodes || []);
  if (STATE.lastPlayedLevel) STATE.level = STATE.lastPlayedLevel;
  renderAll();
  // Land on "what's next" — after a review launch, that means the review
  // card (finish the day's queue), falling through to up-next once empty.
  requestAnimationFrame(() => {
    const rc = document.getElementById("review-card");
    const target =
      STATE.cameFromReview && rc && !rc.hidden
        ? rc
        : document.getElementById("up-next-card");
    STATE.cameFromReview = false;
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
    target?.classList.add("is-focus-target");
    setTimeout(() => target?.classList.remove("is-focus-target"), 1600);
  });
}

function showPractice(domain) {
  STATE.view = "practice";
  clearFruitPayoffKeys();
  document.getElementById("view-map").hidden = true;
  document.getElementById("view-practice").hidden = false;
  document.body.classList.remove("domain-grammar", "domain-vocab");
  document.body.classList.add(
    domain === "grammar" ? "domain-grammar" : "domain-vocab",
  );
}

function clearFruitPayoffKeys() {
  const root = document.getElementById("practice-root");
  if (root && root.__ruePayoffKey) {
    document.removeEventListener("keydown", root.__ruePayoffKey, true);
    root.__ruePayoffKey = null;
  }
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * First fruit only: tick + level chip + Learned bar (from RUE2).
 * Fires only when progress helpers say justFruited — not after a partial Use.
 */
function showFruitPayoff({ before, after, kind = "learned", level: lvlIn, nodeId }) {
  const root = document.getElementById("practice-root");
  if (!root) return;
  if (typeof root._rupl2UnbindKeys === "function") {
    try {
      root._rupl2UnbindKeys();
    } catch {
      /* ignore */
    }
    root._rupl2UnbindKeys = null;
  }
  if (typeof root._ruplVocabUnbind === "function") {
    try {
      root._ruplVocabUnbind();
    } catch {
      /* ignore */
    }
    root._ruplVocabUnbind = null;
  }
  clearFruitPayoffKeys();
  STATE.view = "payoff";
  STATE.pendingFruitPayoff = null;
  document.getElementById("view-map").hidden = true;
  document.getElementById("view-practice").hidden = false;
  document.body.classList.remove("domain-grammar", "domain-vocab");

  const isRemember = kind === "remembered";
  const meterKey = isRemember ? "remembered" : "learned";
  const meterLabel = isRemember ? "Zapamiętane" : "Nauczone";
  const meterClass = isRemember ? "meter-remembered" : "meter-learned";
  const level = lvlIn || levelOfNode(nodeById(nodeId)) || STATE.level || "A1";
  const total = after?.total > 0 ? after.total : 1;
  const pctOf = (n) => Math.round((100 * (n || 0)) / total);
  const fromN = before?.[meterKey] ?? 0;
  const toN = after?.[meterKey] ?? 0;
  const fromP = pctOf(fromN);
  const toP = pctOf(toN);
  const reduce =
    typeof matchMedia === "function" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches;
  const DURATION_MS = 1250;
  const primaryId = isRemember ? "payoff-review" : "payoff-next";
  const primaryLabel = isRemember ? "Powtórka" : "Dalej";

  const paintStats = (n, p) => {
    const fracEl = root.querySelector("#payoff-frac");
    const pctEl = root.querySelector("#payoff-pct");
    const track = root.querySelector(".meter-track");
    if (fracEl) fracEl.textContent = `${n}/${total}`;
    if (pctEl) pctEl.textContent = `${p}%`;
    if (track) track.setAttribute("aria-valuenow", String(p));
  };

  // Author mode: WHY did fruit fire — gate snapshot for the played block.
  // (James 2026-08-06: a fresh unit fruited before everything was right;
  // this line makes the next occurrence self-diagnosing.)
  let gateDiag = "";
  if (isAuthorUnlock() && nodeId) {
    try {
      const prog = loadProgress();
      const gb = prog.grammar.blocks[nodeId] || null;
      const vb =
        prog.vocab.blocks[nodeId] ||
        Object.values(prog.vocab.blocks).find((b) => b && b.nodeId === nodeId) ||
        null;
      const b = gb || vb;
      if (b) {
        const bits = [];
        bits.push(`modes: ${Object.keys(b.modes || {}).join(",") || "-"}`);
        if (gb) {
          bits.push(`best check=${b.best?.check ?? "-"} type=${b.best?.type ?? "-"}`);
          bits.push(`cleanPass check=${!!b.checkCleanPass} type=${!!b.typeCleanPass}`);
        } else {
          bits.push(`best quiz=${b.bestQuiz ?? "-"} type=${b.bestType ?? "-"}`);
          bits.push(`cleanPass quiz=${!!b.quizCleanPass} type=${!!b.typeCleanPass}`);
          bits.push(`sentenceDone=${!!b.sentenceDone}`);
        }
        gateDiag = `<div class="fruit-payoff-diag">${escapeXml(nodeId)} · ${escapeXml(bits.join(" · "))}</div>`;
      }
    } catch {
      gateDiag = "";
    }
  }

  root.innerHTML = `
    <div class="fruit-payoff" role="status" aria-live="polite"
      aria-label="${escapeXml(level)} ${escapeXml(meterLabel)} ${toN} z ${total}, ${toP} procent">
      <div class="fruit-payoff-tick${reduce ? " is-drawn" : ""}" aria-hidden="true">
        <svg viewBox="0 0 48 48" width="56" height="56" focusable="false">
          <circle cx="24" cy="24" r="20" />
          <path d="M14 24.5 L21 31.5 L34 16.5" />
        </svg>
      </div>
      <div class="fruit-payoff-kind" aria-hidden="true">${escapeXml(meterLabel)} · ${isRemember ? "Remembered" : "Learned"}</div>
      <div class="fruit-payoff-head">
        <span class="fruit-payoff-level" aria-hidden="true">${escapeXml(level)}</span>
        <span class="fruit-payoff-stats">
          <span id="payoff-frac">${reduce ? toN : fromN}/${total}</span>
          <span class="fruit-payoff-dot" aria-hidden="true">·</span>
          <span id="payoff-pct">${reduce ? toP : fromP}%</span>
        </span>
      </div>
      <div class="meter-row ${meterClass} fruit-payoff-meter">
        <div class="meter-track" role="progressbar" aria-valuemin="0" aria-valuemax="100"
          aria-valuenow="${reduce ? toP : fromP}"
          aria-label="${escapeXml(level)} ${escapeXml(meterLabel)} ${toN} z ${total}">
          <div class="meter-fill" id="payoff-fill" style="width:${reduce ? toP : fromP}%"></div>
        </div>
      </div>
      ${gateDiag}
      <div class="home-actions fruit-payoff-nav" role="group" aria-label="Główne akcje">
        <button type="button" class="home-btn home-btn-primary" id="${primaryId}">${primaryLabel}</button>
        <button type="button" class="home-btn" id="payoff-home">Start</button>
        ${
          isRemember
            ? `<button type="button" class="home-btn" id="payoff-next">Dalej</button>`
            : `<button type="button" class="home-btn" id="payoff-review">Powtórka</button>`
        }
        <button type="button" class="home-btn" id="payoff-topics">Tematy</button>
        <button type="button" class="home-btn" id="payoff-howto">Jak używać</button>
      </div>
    </div>`;

  const fill = root.querySelector("#payoff-fill");
  const tick = root.querySelector(".fruit-payoff-tick");

  if (reduce) {
    paintStats(toN, toP);
  } else {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (tick) tick.classList.add("is-drawn");
        if (fill) fill.style.width = `${toP}%`;
        const t0 = performance.now();
        const step = (now) => {
          const t = Math.min(1, (now - t0) / DURATION_MS);
          const e = 1 - (1 - t) ** 3;
          const n = Math.round(fromN + (toN - fromN) * e);
          const p = Math.round(fromP + (toP - fromP) * e);
          paintStats(n, p);
          if (t < 1) requestAnimationFrame(step);
          else paintStats(toN, toP);
        };
        requestAnimationFrame(step);
      });
    });
  }

  const leaveToMap = () => {
    clearFruitPayoffKeys();
    showMap();
  };

  root.querySelector("#payoff-next")?.addEventListener("click", () => {
    leaveToMap();
    void startDoNext();
  });
  root.querySelector("#payoff-home")?.addEventListener("click", () => {
    leaveToMap();
    STATE.homePanel = null;
    renderHomeChrome();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  root.querySelector("#payoff-review")?.addEventListener("click", () => {
    leaveToMap();
    STATE.homePanel = "review";
    renderHomeChrome();
    document.getElementById("review-card")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
  root.querySelector("#payoff-topics")?.addEventListener("click", () => {
    leaveToMap();
    STATE.homePanel = "more";
    STATE.homePanelSource = "topics";
    renderHomeChrome();
    document.getElementById("panel-more")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
  root.querySelector("#payoff-howto")?.addEventListener("click", () => {
    leaveToMap();
    showHowto();
  });

  const onKey = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    e.stopPropagation();
    clearFruitPayoffKeys();
    leaveToMap();
    if (isRemember) {
      STATE.homePanel = "review";
      renderHomeChrome();
    } else {
      void startDoNext();
    }
  };
  root.__ruePayoffKey = onKey;
  document.addEventListener("keydown", onKey, true);
  root.querySelector(`#${primaryId}`)?.focus();
}

/**
 * Przypadki panel (James 2026-08-07): a live trigger→case reference, built
 * from data/case-map.json. Shows a row only once the node that teaches it is
 * at or behind the learner's furthest fruited position — so it can never
 * spoil a case he has not met. The five "Który przypadek?" units teach this
 * same map; this panel is the lookup he can reach mid-sentence, forever.
 */
async function renderCaseMap() {
  const body = document.getElementById("case-map-body");
  if (!body) return;
  if (!STATE.caseMap) {
    try {
      STATE.caseMap = await loadJson("./data/case-map.json");
    } catch {
      body.innerHTML = `<p class="home-hint">Could not load the case map.</p>`;
      return;
    }
  }
  const map = STATE.caseMap;
  const order = STATE.tree?.path_order || [];
  const posOf = new Map(order.map((id, i) => [id, i]));
  // Furthest position the learner has actually fruited (0 = nothing yet).
  let reach = -1;
  for (const node of STATE.tree?.nodes || []) {
    if (node.status !== "live" || !node.content) continue;
    if (!isFruit(node)) continue;
    const i = posOf.get(node.id);
    if (i != null && i > reach) reach = i;
  }
  const known = map.triggers.filter((t) => {
    const i = posOf.get(t.taught_by);
    return i != null && i <= reach;
  });
  if (!known.length) {
    body.innerHTML = `<p class="home-hint">Nothing yet — finish a unit or two and the cases will appear here as you meet them.</p>`;
    return;
  }
  const byCase = new Map();
  for (const t of known) {
    if (!byCase.has(t.case)) byCase.set(t.case, []);
    byCase.get(t.case).push(t);
  }
  const parts = [];
  for (const c of map.cases) {
    const rows = byCase.get(c.id);
    if (!rows || !rows.length) continue;
    parts.push(`
      <div class="case-block">
        <h3 class="case-head">
          <span class="case-pl">${escapeHtml(c.pl)}</span>
          <span class="case-en">${escapeHtml(c.en)}</span>
        </h3>
        <p class="case-job">${escapeHtml(c.job)}</p>
        <ul class="case-triggers">
          ${rows
            .map(
              (t) => `<li>
                <span class="case-trigger">${escapeHtml(t.trigger)}</span>
                <span class="case-gloss">${escapeHtml(t.gloss)}</span>
                <span class="case-example">${escapeHtml(t.example)}</span>
              </li>`,
            )
            .join("")}
        </ul>
      </div>`);
  }
  body.innerHTML = parts.join("");
}

/** Level the payoff meter should show — the PLAYED node's level, not the
 * level-rail selection (an A2 unit finished while the rail sat on A1 used
 * to animate the A1 meter). */
function levelOfNode(node) {
  return (Array.isArray(node?.levels) && node.levels[0]) || STATE.level || "A1";
}

/** Returns true if payoff was shown. */
function maybeShowFruitPayoff() {
  if (!STATE.pendingFruitPayoff) return false;
  const payload = STATE.pendingFruitPayoff;
  STATE.pendingFruitPayoff = null;
  showFruitPayoff(payload);
  return true;
}

/** Review payoff — the Remembered meter beat (James 2026-08-06: a passed
 * review completed silently; the tick belongs here too). */
function queueReviewPayoff(nodeId, statsBefore) {
  const nodes = STATE.tree?.nodes || [];
  const lvl = levelOfNode(nodeById(nodeId));
  STATE.pendingFruitPayoff = {
    before: statsBefore,
    after: levelUnitStats(lvl, nodes),
    nodeId,
    level: lvl,
    kind: "remembered",
  };
}

function queueFruitPayoff(nodeId, statsBefore) {
  const nodes = STATE.tree?.nodes || [];
  const lvl = levelOfNode(nodeById(nodeId));
  const statsAfter = levelUnitStats(lvl, nodes);
  STATE.pendingFruitPayoff = {
    before: statsBefore,
    after: statsAfter,
    nodeId,
    level: lvl,
    kind: "learned",
  };
  queueMicrotask(() => {
    maybeShowFruitPayoff();
  });
}

/**
 * Next = first unfruited live node in tree.path_order — the single source
 * of truth for sequence. (Spine steps kept only for unit meta; walking them
 * directly showed a step's vocab side before later-path units.)
 */
function spineNext() {
  const order = STATE.tree?.path_order || [];
  const steps = STATE.spine?.steps || [];
  for (const nid of order) {
    const node = nodeById(nid);
    if (!node || node.status !== "live" || !node.content) continue;
    if (isFruit(node)) continue;
    const step =
      steps.find(
        (s) => s.rupl2?.node_id === nid || s.rupl3?.node_id === nid,
      ) || { id: node.unit_id || "", case_tags: node.case_tags || [] };
    const side = node.domain === "grammar" ? "grammar" : "vocab";
    const pairId = node.partner_id;
    const pair = pairId
      ? { node_id: pairId, label: nodeById(pairId)?.label || pairId }
      : null;
    return { step, node, side, pair };
  }
  return null;
}

function focusNodeOnMap(node) {
  if (!node) return;
  STATE._userPickedUnit = true;
  STATE.homePanel = null;
  STATE.selectedId = node.id;
  renderPath();
  renderDetail();
  renderHomeChrome();
  syncUnitDetailVisibility();
  requestAnimationFrame(() => {
    document
      .getElementById("node-detail-card")
      ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    const go = document.querySelector("#node-actions .btn:not(:disabled)");
    go?.classList.add("is-focus-target");
    try {
      go?.focus({ preventScroll: true });
    } catch {
      go?.focus();
    }
    setTimeout(() => go?.classList.remove("is-focus-target"), 1600);
  });
}

function renderRail() {
  const rail = document.getElementById("level-rail");
  const levels = STATE.tree?.levels || ["A1", "A2", "B1", "B2"];
  rail.innerHTML = "";
  for (const lv of levels) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "level-btn";
    const locked = !isLevelUnlocked(lv);
    if (locked) {
      // Preview: a locked level can be browsed — unit list and detail
      // cards render; practice stays closed (planned nodes have no content).
      btn.classList.add("is-preview");
      btn.setAttribute("aria-pressed", lv === STATE.level ? "true" : "false");
      btn.innerHTML = `${lv}<span class="tag">podgląd</span>`;
      btn.addEventListener("click", () => {
        STATE.level = lv;
        renderAll();
        STATE.setMapMore?.(true);
        document
          .getElementById("path-card")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } else {
      btn.setAttribute("aria-pressed", lv === STATE.level ? "true" : "false");
      btn.textContent = lv;
      btn.addEventListener("click", () => {
        STATE.level = lv;
        renderAll();
      });
    }
    rail.appendChild(btn);
  }
}

function renderUpNext() {
  // Home chrome drives next line + Dalej
  renderHomeChrome();
  const el = document.getElementById("up-next");
  if (el) el.innerHTML = "";
}

const HOWTO_KEY = "rupl-exp-howto-seen";

function renderHomeChrome() {
  const line = document.getElementById("home-next-line");
  const hit = spineNext();
  const due = typeof reviewDueList === "function" ? reviewDueList(STATE.tree?.nodes || []) : [];
  if (line) {
    if (!hit) {
      line.textContent = "Ścieżka na teraz skończona · Path complete for now.";
    } else {
      line.innerHTML = `Dalej: <strong>${escapeHtml(hit.node.label)}</strong>`;
    }
  }
  const revHint = document.getElementById("home-review-hint");
  if (revHint) {
    if (due.length) {
      revHint.hidden = false;
      revHint.textContent = `${due.length} na powtórkę · due for review`;
    } else {
      revHint.hidden = true;
      revHint.textContent = "";
    }
  }
  const progMeta = document.getElementById("progress-summary-meta");
  if (progMeta) {
    const s = levelUnitStats(STATE.level, STATE.tree?.nodes || []);
    if (s?.total) {
      const pct = Math.round((100 * (s.learned || 0)) / s.total);
      progMeta.textContent = `· ${pct}%`;
    }
  }
  const review = document.getElementById("review-card");
  const more = document.getElementById("panel-more");
  const cases = document.getElementById("panel-cases");
  if (review) review.hidden = STATE.homePanel !== "review";
  if (more) more.hidden = STATE.homePanel !== "more";
  if (cases) cases.hidden = STATE.homePanel !== "cases";
  const moreBtn = document.getElementById("btn-home-more");
  if (moreBtn) {
    moreBtn.setAttribute(
      "aria-expanded",
      STATE.homePanel === "more" ? "true" : "false",
    );
  }
  const activeBtn =
    STATE.homePanel === "cases"
      ? "btn-home-cases"
    : STATE.homePanel === "review"
      ? "btn-home-review"
      : STATE.homePanel === "more"
        ? STATE.homePanelSource === "topics"
          ? "btn-home-topics"
          : "btn-home-more"
        : null;
  for (const id of ["btn-home-review", "btn-home-topics", "btn-home-more", "btn-home-cases"]) {
    document.getElementById(id)?.classList.toggle("is-active", id === activeBtn);
  }
  document
    .getElementById("btn-do-next")
    ?.classList.toggle("home-btn-primary", activeBtn == null);
  syncUnitDetailVisibility();
}

/** Unit card only after a pick — not on first paint, not under Review/More. */
function syncUnitDetailVisibility() {
  const card = document.getElementById("node-detail-card");
  if (!card) return;
  const show =
    Boolean(STATE.selectedId) &&
    STATE.homePanel == null &&
    STATE.view !== "practice";
  card.hidden = !show;
}

function showHowto() {
  const overlay = document.getElementById("howto-overlay");
  if (!overlay) return;
  overlay.hidden = false;
  const finish = (runNext) => {
    try {
      localStorage.setItem(HOWTO_KEY, "1");
    } catch {
      /* ignore */
    }
    overlay.hidden = true;
    if (runNext) void startDoNext();
  };
  const startBtn = document.getElementById("howto-start");
  const dismissBtn = document.getElementById("howto-dismiss");
  if (startBtn) startBtn.onclick = () => finish(true);
  if (dismissBtn) dismissBtn.onclick = () => finish(false);
}

async function startDoNext() {
  const hit = spineNext();
  if (!hit?.node) return;
  // Open practice for that node (grammar or vocab)
  try {
    await openNode(hit.node);
  } catch (e) {
    console.warn(e);
    focusNodeOnMap(hit.node);
  }
}

function wireMapHelp() {
  const btn = document.getElementById("btn-map-help");
  const tip = document.getElementById("map-help-tip");
  if (!btn || !tip || btn.dataset.wired) return;
  btn.dataset.wired = "1";
  const setOpen = (open) => {
    tip.hidden = !open;
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  };
  btn.addEventListener("mouseenter", () => setOpen(true));
  btn.addEventListener("mouseleave", () => {
    if (document.activeElement !== btn) setOpen(false);
  });
  btn.addEventListener("focus", () => setOpen(true));
  btn.addEventListener("blur", () => setOpen(false));
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(tip.hidden);
  });
  btn.addEventListener("pointerdown", (e) => e.stopPropagation());
}

function wireHomeActions() {
  if (document.body.dataset.homeWired === "1") return;
  document.body.dataset.homeWired = "1";
  STATE.homePanel = null;
  wireMapHelp();
  document.getElementById("btn-do-next")?.addEventListener("click", () => {
    void startDoNext();
  });
  document.getElementById("btn-how-to-use")?.addEventListener("click", () => {
    showHowto();
  });
  document.getElementById("btn-home-more")?.addEventListener("click", () => {
    const reopen = STATE.homePanel === "more" && STATE.homePanelSource !== "more";
    STATE.homePanel = STATE.homePanel === "more" && !reopen ? null : "more";
    STATE.homePanelSource = "more";
    renderHomeChrome();
    if (STATE.homePanel === "more") {
      const det = document.getElementById("map-details");
      if (det) det.open = true;
      STATE.setMapMore?.(true);
      renderRoots();
      renderPath();
      renderLevelMeters();
      document.getElementById("panel-more")?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  });
  document.getElementById("btn-home-cases")?.addEventListener("click", () => {
    STATE.homePanel = STATE.homePanel === "cases" ? null : "cases";
    STATE.homePanelSource = "cases";
    renderHomeChrome();
    if (STATE.homePanel === "cases") {
      void renderCaseMap();
      document.getElementById("panel-cases")?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  });

  document.getElementById("btn-home-review")?.addEventListener("click", () => {
    STATE.homePanel = STATE.homePanel === "review" ? null : "review";
    renderHomeChrome();
    if (STATE.homePanel === "review") {
      renderReview();
      document.getElementById("review-card")?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  });
  document.getElementById("btn-home-topics")?.addEventListener("click", () => {
    const reopen = STATE.homePanel === "more" && STATE.homePanelSource !== "topics";
    STATE.homePanel = STATE.homePanel === "more" && !reopen ? null : "more";
    STATE.homePanelSource = "topics";
    renderHomeChrome();
    if (STATE.homePanel === "more") {
      const det = document.getElementById("map-details");
      if (det) det.open = true;
      STATE.setMapMore?.(true);
      renderRoots();
      renderPath();
      document.getElementById("panel-more")?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  });
}

function renderRoots() {
  const strip = document.getElementById("roots-strip");
  if (strip) {
    strip.innerHTML = "";
    const roots = STATE.tree?.roots || [];
    const tap = rootChip("Kół", tapFill(STATE.tree));
    strip.appendChild(tap);
    for (const r of roots) {
      strip.appendChild(rootChip(r.label, rootFill(STATE.tree, r.id)));
    }
  }

  const vfill = document.getElementById("vocab-fill");
  if (vfill) {
    vfill.innerHTML = "";
    const vnodes = (STATE.tree?.nodes || []).filter(
      (n) => n.domain === "vocab" && n.status === "live",
    );
    let vf = 0;
    if (vnodes.length) {
      vf = vnodes.filter((n) => isFruit(n)).length / vnodes.length;
    }
    vfill.appendChild(rootChip("Słówka na ścieżce", vf));
    const leg = document.getElementById("vocab-fill-legend");
    if (leg) {
      leg.textContent = `${vnodes.filter((n) => isFruit(n)).length}/${vnodes.length} owoc · bursztyn = vocab`;
    }
  }

  // Combined status portrait (spine remains primary nav)
  const portrait = document.getElementById("tree-portrait");
  if (portrait && STATE.tree) {
    renderTreePortrait(portrait, {
      level: STATE.level || "A1",
      nodes: STATE.tree.nodes || [],
      isFruit: (id) => {
        const n = nodeById(id);
        return n ? isFruit(n) : false;
      },
      progressState: (id) => {
        const n = nodeById(id);
        return n ? progressState(n) : "planned";
      },
      onSelect: (node) => focusNodeOnMap(node),
    });
  }
}

function rootChip(name, fill) {
  const pct = Math.round((fill || 0) * 100);
  const div = document.createElement("div");
  div.className = "root-chip";
  div.innerHTML = `
    <div class="name">${escapeHtml(name)}</div>
    <div class="bar"><i style="width:${pct}%"></i></div>
    <div class="pct">${pct}%</div>
  `;
  return div;
}

function renderPath() {
  const list = document.getElementById("path-list");
  list.innerHTML = "";
  const order = STATE.tree?.path_order || [];
  let n = 0;
  for (const id of order) {
    const node = nodeById(id);
    if (!node || !node.levels?.includes(STATE.level)) continue;
    n += 1;
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "path-item";
    btn.setAttribute(
      "aria-pressed",
      STATE.selectedId === node.id ? "true" : "false",
    );
    const st = progressState(node);
    const label = progressLabel(node);
    let statusCls = "status";
    if (st === "fruit") statusCls += " is-fruit";
    else if (st === "planned") statusCls += " is-planned";
    else statusCls += " is-live";
    const dtag =
      node.domain === "grammar"
        ? `<span class="domain-tag g">gram</span>`
        : `<span class="domain-tag v">vocab</span>`;

    btn.innerHTML = `
      <span class="n">${n}</span>
      <span class="meta">
        <span class="title">${dtag} ${escapeHtml(node.label)}</span>
        ${isAuthorUnlock() && node.unit_id ? `<span class="note">${escapeHtml(node.unit_id)}</span>` : ""}
        ${isAuthorUnlock() && node.note ? `<span class="note">${escapeHtml(node.note)}</span>` : ""}
      </span>
      <span class="${statusCls}">${escapeHtml(label)}</span>
    `;
    btn.addEventListener("click", () => {
      focusNodeOnMap(node);
    });
    li.appendChild(btn);
    list.appendChild(li);
  }
}

function renderDetail() {
  const box = document.getElementById("node-detail");
  const node = nodeById(STATE.selectedId);
  if (!node) {
    box.innerHTML = `<p class="tree-legend">Wybierz węzeł na ścieżce.</p>`;
    return;
  }
  const st = progressState(node);
  const pills = [];
  pills.push(
    `<span class="pill live">${node.domain === "grammar" ? "gramatyka" : "słówka"}</span>`,
  );
  if (node.status === "live") pills.push('<span class="pill live">żywe</span>');
  else pills.push('<span class="pill">planowane</span>');
  if (st === "fruit") pills.push('<span class="pill fruit">owoc</span>');
  if (node.unit_id) {
    const partner = node.partner_id ? nodeById(node.partner_id) : null;
    if (partner && isFruit(node) && isFruit(partner)) {
      pills.push('<span class="pill fruit">jednostka ✓</span>');
    }
  }

  const partner = node.partner_id ? nodeById(node.partner_id) : null;

  box.innerHTML = `
    <div>${pills.join("")}</div>
    <p class="practice-prompt" style="margin-top:0.5rem">${escapeHtml(node.label)}</p>
    ${isAuthorUnlock() && node.note ? `<p class="tree-legend">${escapeHtml(node.note)}</p>` : ""}
    ${
      isAuthorUnlock() && partner
        ? `<p class="tree-legend">Para: <button type="button" class="today-link" id="btn-detail-partner">${escapeHtml(partner.label)}</button>
           ${isFruit(partner) ? " · owoc" : " · bez owocu"}</p>`
        : ""
    }
    <div class="node-actions" id="node-actions"></div>
  `;
  box.querySelector("#btn-detail-partner")?.addEventListener("click", () => {
    if (partner) focusNodeOnMap(partner);
  });
  const actions = box.querySelector("#node-actions");
  if (node.status === "live" && node.content) {
    const go = document.createElement("button");
    go.type = "button";
    go.className = "btn";
    go.textContent = "Ćwicz →";
    go.addEventListener("click", () => openNode(node));
    actions.appendChild(go);
  } else {
    const wait = document.createElement("button");
    wait.type = "button";
    wait.className = "btn";
    wait.disabled = true;
    wait.textContent =
      node.status === "planned" ? "Treść wkrótce / poza spine" : "Brak treści";
    actions.appendChild(wait);
  }
}

async function openNode(node, launch = {}) {
  if (node.status !== "live" || !node.content) return;
  STATE.cameFromReview = !!launch.review;
  STATE.lastPlayedLevel = levelOfNode(node);
  try {
    const pack = await loadJson(`./data/${node.content}`);
    showPractice(node.domain);
    const root = document.getElementById("practice-root");
    root.innerHTML = "";

    if (node.domain === "grammar") {
      let statsBefore = null;
      startGrammarPractice(pack, root, {
        startStage: launch.review ? "type" : undefined,
        onBeforeProgress: () => {
          statsBefore = levelUnitStats(levelOfNode(node), STATE.tree?.nodes || []);
        },
        onFruit: () => {
          queueFruitPayoff(
            node.id,
            statsBefore || levelUnitStats(levelOfNode(node), STATE.tree?.nodes || []),
          );
        },
        onReview: (outcome) => {
          if (!outcome || !outcome.reviewPassed) return;
          if (STATE.pendingFruitPayoff) return; // a fruit beat wins
          queueReviewPayoff(
            node.id,
            statsBefore || levelUnitStats(levelOfNode(node), STATE.tree?.nodes || []),
          );
        },
        onExit: () => {
          if (node.unit_id) {
            refreshUnit(node.unit_id, node.id, node.partner_id);
          }
          if (maybeShowFruitPayoff()) return;
          showMap();
        },
      });
    } else {
      // Vocab: pack may be multi-block; use first block or whole pack as rupl3 does
      const practice =
        pack.practice === "frames" || pack.practice === "frames"
          ? "frames"
          : undefined;
      // Pack-level authored EN→PL sentences (leaf Zdanie bank); frames use items.
      const packSentences = Array.isArray(pack.sentences) ? pack.sentences : [];
      const focusStructures = Array.isArray(pack.focus_structures)
        ? pack.focus_structures
        : pack.teaches_structures || [];
      // RUPL3 opens a block from pack — for simplicity open pack as single block list
      const block =
        Array.isArray(pack.blocks) && pack.blocks.length
          ? pack.blocks[0]
          : pack;
      // If multi-block, merge items for a thin vertical slice (exp)
      let practiceBlock = block;
      if (Array.isArray(pack.blocks) && pack.blocks.length > 1) {
        practiceBlock = {
          id: pack.id || node.id,
          title: pack.title || node.label,
          items: pack.blocks.flatMap((b) => b.items || []),
          sentences: packSentences,
          intro: pack.intro || null,
          focus_structures: focusStructures,
          teaches_structures: pack.teaches_structures || [],
          uses_structures: pack.uses_structures || [],
        };
      } else if (pack.blocks?.[0]) {
        practiceBlock = {
          ...pack.blocks[0],
          title: pack.blocks[0].title || pack.title,
          sentences: packSentences.length
            ? packSentences
            : pack.blocks[0].sentences || [],
          intro: pack.intro || null,
          focus_structures: focusStructures,
          teaches_structures: pack.teaches_structures || [],
          uses_structures: pack.uses_structures || [],
        };
      } else {
        practiceBlock = {
          ...practiceBlock,
          sentences: packSentences,
          focus_structures: focusStructures,
        };
      }
      if (practice === "frames") {
        practiceBlock.practice = "frames";
      }
      if (!practiceBlock.sentences) practiceBlock.sentences = packSentences;
      if (!practiceBlock.focus_structures) {
        practiceBlock.focus_structures = focusStructures;
      }

      const blockId = practiceBlock.id || pack.id || node.id;
      touchVocabBlock(blockId, node.id);
      startVocabPractice(root, practiceBlock, {
        startMode: launch.review ? "type" : undefined,
        practice,
        packId: pack.id || node.id,
        packTitle: pack.title || node.label,
        onTouch: () => touchVocabBlock(blockId, node.id),
        onModeComplete: (mode, meta) => {
          const nodes = STATE.tree?.nodes || [];
          const statsBefore = levelUnitStats(levelOfNode(node), nodes);
          const wasFruit = hasVocabFruit(node);
          const r = completeVocabMode(blockId, mode, meta || {});
          const nowFruit = hasVocabFruit(node);
          if (
            (r && r.justFruited) ||
            (!wasFruit && nowFruit)
          ) {
            queueFruitPayoff(node.id, statsBefore);
          } else if (r && r.review && r.review.reviewPassed) {
            queueReviewPayoff(node.id, statsBefore);
          }
        },
        onExit: () => {
          if (node.unit_id) {
            refreshUnit(node.unit_id, node.partner_id, node.id);
          }
          if (maybeShowFruitPayoff()) return;
          showMap();
        },
      });
    }
  } catch (e) {
    const err = document.getElementById("boot-error");
    err.hidden = false;
    err.textContent = String(e.message || e);
  }
}

function renderAuthor() {
  const btn = document.getElementById("btn-author-unlock");
  const on = isAuthorUnlock();
  // Smoke/flag toolbar is builder kit — invisible to learners
  const tb = document.querySelector(".smoke-toolbar");
  if (tb) tb.hidden = !on;
  // Roots/leaves meters are the teacher-facing tree model (James, 2026-08-05):
  // near-meaningless to a learner, and they were misleading too — the grammar
  // roots were hard-filtered to A1 so they never moved on A2, while the vocab
  // bar counted every level at once. Learners get the level meters instead,
  // which are correctly scoped. Nothing is lost: these are derived views,
  // recomputed from tree.json + progress on every render.
  const rootsPanel = document.getElementById("roots-panel-grid");
  if (rootsPanel) rootsPanel.hidden = !on;
  btn.setAttribute("aria-pressed", on ? "true" : "false");
  btn.textContent = on ? "Tryb autorski WŁ" : "Tryb autorski";
  const hint = document.getElementById("author-hint");
  if (on) {
    hint.hidden = false;
    hint.textContent =
      "Autorski: A2+ otwarte (bez treści). Pełna korona słówek = sync show_full (później).";
  } else {
    hint.hidden = true;
  }
}

/**
 * Three honest meters: learned (fruit) · remembered (≥1 review) · mastered (≥4).
 * Same model as RUE2. Review meters stay at 0 until unit SRS writes successfulReps.
 */
function renderLevelMeters() {
  const el = document.getElementById("level-meters");
  if (!el || !STATE.tree) return;
  const level = STATE.level || "A1";
  const nodes = STATE.tree.nodes || [];
  const s = levelUnitStats(level, nodes);
  const t = s.total || 0;
  const pct = (n) => (t ? Math.round((100 * n) / t) : 0);
  const bar = (n, kind) => {
    const p = pct(n);
    const label =
      kind === "learned"
        ? "Learned"
        : kind === "remembered"
          ? "Remembered"
          : "Mastered";
    return `
      <div class="meter-row meter-${kind}">
        <div class="meter-label">${label}</div>
        <div class="meter-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${p}" aria-label="${label} ${p}% · ${n} of ${t}">
          <div class="meter-fill" style="width:${p}%"></div>
        </div>
        <div class="meter-count"><span class="meter-pct">${p}%</span> <span class="meter-frac">${n}/${t}</span></div>
      </div>`;
  };
  const reviewLive = s.remembered > 0 || s.mastered > 0;
  const learnedPct = pct(s.learned);
  const scoreBar = Math.round(
    (level === "A1" ? Math.min(PASS_RATIO, FRUIT_SOFT) : PASS_RATIO) * 100,
  );
  el.innerHTML = `
    <div class="meters-head">
      <span class="meters-title">${escapeHtml(level)} progress</span>
      <span class="meters-sub">${s.partial ? `+${s.partial} started · ` : ""}${t} units · <strong>${learnedPct}%</strong> learned</span>
    </div>
    ${bar(s.learned, "learned")}
    ${bar(s.remembered, "remembered")}
    ${bar(s.mastered, "mastered")}
    <p class="meters-hint">
      Learned = finished once · Remembered / Mastered = kept fresh over spaced reviews.
    </p>`;
}

/** Due reviews, path order, capped display. Hidden when nothing is due. */
function renderReview() {
  const card = document.getElementById("review-card");
  const list = document.getElementById("review-list");
  if (!card || !list || !STATE.tree) return;
  const live = (STATE.tree.nodes || []).filter(
    (n) => n.status === "live" && n.content,
  );
  const due = reviewDueList(live);
  if (!due.length) {
    card.hidden = true;
    return;
  }
  const order = STATE.tree.path_order || [];
  due.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
  // Only show when Review panel is open (minimal home)
  card.hidden = STATE.homePanel !== "review";
  const MAX = 6;
  list.innerHTML = `
    <p class="tree-legend">Quick review — just the typing. Open a unit, it starts at the typing stage; score 75%+ and it counts. Gaps grow: 1 · 3 · 7 · 14 · 30 days.</p>
    <div class="nav">
      ${due
        .slice(0, MAX)
        .map(
          (n) =>
            `<button type="button" class="btn" data-rev="${n.id}">${n.domain === "grammar" ? "⚙ " : ""}${escapeHtml(n.label)}</button>`,
        )
        .join(" ")}
      ${due.length > MAX ? `<span class="today-muted">+${due.length - MAX}</span>` : ""}
    </div>`;
  list.querySelectorAll("[data-rev]").forEach((btn) =>
    btn.addEventListener("click", () => {
      const n = nodeById(btn.dataset.rev);
      if (n) openNode(n, { review: true });
    }),
  );
}

function renderAll() {
  loadProgress();
  renderAuthor();
  renderRail();
  renderLevelMeters();
  renderReview();
  renderUpNext();
  renderRoots();
  renderPath();
  // Minimal home: never auto-select on paint (user picks via Tematy/map or Dalej)
  if (!STATE._userPickedUnit) {
    STATE.selectedId = null;
  }
  renderDetail();
  wireHomeActions();
  syncUnitDetailVisibility();
}

// Chrome stamps translated-ltr/rtl on <html> when it machine-translates the
// page — which replaces the Polish content itself. If that ever happens
// (despite the notranslate meta), warn loudly in English.
function watchAutoTranslate() {
  const el = document.documentElement;
  const check = () => {
    if (!/\btranslated-(ltr|rtl)\b/.test(el.className)) return;
    if (document.getElementById("translate-warning")) return;
    const b = document.createElement("div");
    b.id = "translate-warning";
    b.className = "card notranslate";
    b.setAttribute("translate", "no");
    b.style.cssText = "border-color:#dc2626";
    b.innerHTML =
      "<strong>⚠ Turn off translation!</strong> Your browser has translated " +
      "this page into English — the Polish you are here to learn has been " +
      "replaced. Tap the translate icon in the address bar and choose " +
      "<em>Show original</em>, then <em>Never translate this site</em>.";
    document.querySelector(".container")?.prepend(b);
  };
  new MutationObserver(check).observe(el, {
    attributes: true,
    attributeFilter: ["class"],
  });
  check();
}

async function boot() {
  const err = document.getElementById("boot-error");
  try {
    STATE.tree = await loadJson("./data/tree.json");
    try {
      STATE.spine = await loadJson("./data/spine.json");
    } catch {
      STATE.spine = null;
    }
    // Adopt units fruited before the SRS existed (learnedAt <- touchedAt),
    // so earlier days' units come due immediately, not never.
    backfillReview(STATE.tree.nodes || []);
    // Boot rail = the level Dalej will actually go to (James 2026-08-06).
    autoUnlockLevels(STATE.tree.nodes || []);
    {
      const hit = spineNext();
      if (hit?.node) STATE.level = levelOfNode(hit.node);
    }

    // Word-origin index + tap-to-check ("skąd to słowo?") — body-wide,
    // interactive elements excluded inside the handler.
    initLemmaOrigin();
    wireWordTap(document.body, { isAuthor: () => isAuthorUnlock() });
    // Bridge for smoke-flags (avoids an import cycle): flags call this to
    // stamp each word's owning unit onto the record at save time.
    window.__ruplOriginsSummary = originsSummary;

    watchAutoTranslate();

    document.getElementById("btn-author-unlock")?.addEventListener("click", () => {
      setAuthorUnlock(!isAuthorUnlock());
      renderAll();
    });
    document.getElementById("btn-practice-back")?.addEventListener("click", () => {
      showMap();
    });

    const MORE_KEY = "rupl-exp-v0.1-map-more";
    const moreBtn = document.getElementById("btn-map-more");
    const moreWrap = document.getElementById("map-more");
    function setMapMore(open) {
      if (!moreBtn || !moreWrap) return;
      moreWrap.hidden = !open;
      moreBtn.setAttribute("aria-expanded", open ? "true" : "false");
      moreBtn.textContent = open
        ? "Hide · Ukryj drzewo i jednostki ▴"
        : "Show all units · Pokaż drzewo i jednostki ▾";
      try {
        localStorage.setItem(MORE_KEY, open ? "open" : "closed");
      } catch {
        /* ignore */
      }
    }
    moreBtn?.addEventListener("click", () => setMapMore(moreWrap.hidden));
    STATE.setMapMore = setMapMore;
    let moreStored = null;
    try {
      moreStored = localStorage.getItem(MORE_KEY);
    } catch {
      /* ignore */
    }
    setMapMore(moreStored === "open");

    const smokeHost = document.getElementById("smoke-flags-host");
    if (smokeHost) mountSmokeFlagsUI(smokeHost);
    updateFlagsBadge();
    document.getElementById("p-flag")?.addEventListener("click", () => {
      const ti =
        document.querySelector("#practice-root #ans") ||
        document.querySelector("#practice-root #ti") ||
        document.querySelector("#practice-root input");
      if (ti && "value" in ti) setSmokeContext({ typed: String(ti.value || "") });
      getSmokeApi()?.openForm();
    });
    document.getElementById("p-flag-list")?.addEventListener("click", () => {
      getSmokeApi()?.openList();
    });

    bindProgressTransfer();

    if (new URLSearchParams(location.search).get("unlock") === "all") {
      setAuthorUnlock(true);
    }
    renderAll();
  } catch (e) {
    err.hidden = false;
    err.textContent = String(e.message || e);
  }
}

/** Download / Import RUPL progress (backup before updates; localhost ↔ Pages). */
function bindProgressTransfer() {
  const dl = document.getElementById("btn-progress-download");
  const imp = document.getElementById("btn-progress-import");
  const file = document.getElementById("input-progress-import");
  const msg = document.getElementById("progress-transfer-msg");
  const show = (text, isErr) => {
    if (!msg) return;
    msg.hidden = false;
    msg.textContent = text;
    msg.style.color = isErr ? "var(--wrong, #c4a574)" : "var(--muted, #a0a0a0)";
  };
  if (dl) {
    dl.addEventListener("click", () => {
      try {
        downloadProgressFile();
        const p = loadProgress();
        const g = Object.keys(p.grammar?.blocks || {}).length;
        const v = Object.keys(p.vocab?.blocks || {}).length;
        show(`Downloaded (grammar ${g} · vocab ${v}). Keep the file as backup.`);
      } catch (e) {
        show(String(e.message || e), true);
      }
    });
  }
  if (imp && file) {
    imp.addEventListener("click", () => file.click());
    file.addEventListener("change", async () => {
      const f = file.files && file.files[0];
      file.value = "";
      if (!f) return;
      let text;
      try {
        text = await f.text();
      } catch {
        show("Could not read file.", true);
        return;
      }
      try {
        downloadProgressFile();
      } catch {
        /* ignore */
      }
      const ok = window.confirm(
        "Import this RUPL progress file?\n\n" +
          "• Current progress on THIS site will be replaced.\n" +
          "• A backup download of current progress was just attempted.\n" +
          "• Page will reload after a successful import.",
      );
      if (!ok) {
        show("Import cancelled.");
        return;
      }
      const result = importProgressPayload(text);
      if (!result.ok) {
        show(result.message || "Import failed.", true);
        return;
      }
      show(result.message + " Reloading…");
      setTimeout(() => location.reload(), 400);
    });
  }
}

boot();
