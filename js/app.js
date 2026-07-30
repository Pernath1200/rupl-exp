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
  PASS_RATIO,
  MASTERY_REPS,
  FRUIT_SOFT,
} from "./progress.js";
import {
  mountSmokeFlagsUI,
  getSmokeApi,
  setSmokeContext,
  updateFlagsBadge,
} from "./smoke-flags.js";
import { renderTreePortrait } from "./tree-portrait.js";

const STATE = {
  level: "A1",
  tree: null,
  spine: null,
  selectedId: null,
  view: "map",
  showFull: false,
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
  pr.innerHTML = "";
  STATE.view = "map";
  document.getElementById("view-map").hidden = false;
  document.getElementById("view-practice").hidden = true;
  document.body.classList.remove("domain-grammar", "domain-vocab");
  renderAll();
}

function showPractice(domain) {
  STATE.view = "practice";
  document.getElementById("view-map").hidden = true;
  document.getElementById("view-practice").hidden = false;
  document.body.classList.remove("domain-grammar", "domain-vocab");
  document.body.classList.add(
    domain === "grammar" ? "domain-grammar" : "domain-vocab",
  );
}

/** Spine next: grammar teach first, then vocab use, per step. */
function spineNext() {
  const steps = STATE.spine?.steps || [];
  for (const step of steps) {
    const g = step.rupl2;
    const v = step.rupl3;
    if (g?.node_id && g.status === "live") {
      const gn = nodeById(g.node_id);
      if (gn && gn.status === "live" && !isFruit(gn)) {
        return { step, node: gn, side: "grammar", pair: v };
      }
    }
    if (v?.node_id && v.status === "live") {
      const vn = nodeById(v.node_id);
      if (vn && vn.status === "live" && !isFruit(vn)) {
        return { step, node: vn, side: "vocab", pair: g };
      }
    }
  }
  return null;
}

function focusNodeOnMap(node) {
  if (!node) return;
  STATE.selectedId = node.id;
  renderPath();
  renderDetail();
  requestAnimationFrame(() => {
    document
      .getElementById("node-detail-card")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
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
  if (!isLevelUnlocked(STATE.level)) STATE.level = "A1";
  rail.innerHTML = "";
  for (const lv of levels) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "level-btn";
    const locked = !isLevelUnlocked(lv);
    if (locked) {
      btn.classList.add("is-locked");
      btn.disabled = true;
      btn.innerHTML = `${lv}<span class="tag">zablokowane</span>`;
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
  const el = document.getElementById("up-next");
  const hit = spineNext();
  if (!hit) {
    el.innerHTML = `
      <p class="tree-legend">Ścieżka spine: wszystkie żywe pary z owocem — albo otwórz węzeł poniżej.</p>
      <p class="spine-pair"><span class="today-muted">Stabilne: localhost:8095 (gramatyka) · :8094 (słówka)</span></p>`;
    return;
  }
  const { step, node, side, pair } = hit;
  const unitId = step.id || "";
  const caseTags = (step.case_tags || []).join(" · ");
  const partnerLabel = pair?.label || pair?.node_id || "—";
  const partnerNode = pair?.node_id ? nodeById(pair.node_id) : null;

  el.innerHTML = `
    <p class="tree-legend">Zigzag w jednej aplikacji: <strong>ucz system</strong> → <strong>użyj w temacie</strong>.</p>
    <button type="button" class="btn primary" id="btn-continue-next">Pokaż na ścieżce · ${escapeHtml(node.label)}</button>
    <p class="tree-legend" style="margin-top:0.5rem">${escapeHtml(node.note || "")}</p>
    <p class="spine-pair">
      <span class="spine-badge">ścieżka</span>
      ${unitId ? `<code>${escapeHtml(unitId)}</code>` : ""}
      ${caseTags ? ` · <span class="today-muted">${escapeHtml(caseTags)}</span>` : ""}
      <br />
      <strong>Teraz (${side === "grammar" ? "gramatyka" : "słówka"}):</strong> ${escapeHtml(node.label)}
      <br />
      <strong>Para:</strong>
      ${
        partnerNode
          ? `<button type="button" class="today-link" id="btn-partner">${escapeHtml(partnerLabel)}</button>`
          : `<span class="today-muted">${escapeHtml(partnerLabel)}</span>`
      }
      ${
        unitId && partnerNode && isFruit(node) && isFruit(partnerNode)
          ? ` <span class="badge-unit">jednostka ✓</span>`
          : ""
      }
    </p>
  `;
  el.querySelector("#btn-continue-next")?.addEventListener("click", () =>
    focusNodeOnMap(node),
  );
  el.querySelector("#btn-partner")?.addEventListener("click", () => {
    if (partnerNode) focusNodeOnMap(partnerNode);
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
        ${node.unit_id ? `<span class="note">${escapeHtml(node.unit_id)}</span>` : ""}
        ${node.note ? `<span class="note">${escapeHtml(node.note)}</span>` : ""}
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
    <p class="tree-legend">${escapeHtml(node.note || "")}</p>
    ${
      partner
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

async function openNode(node) {
  if (node.status !== "live" || !node.content) return;
  try {
    const pack = await loadJson(`./data/${node.content}`);
    showPractice(node.domain);
    const root = document.getElementById("practice-root");
    root.innerHTML = "";

    if (node.domain === "grammar") {
      startGrammarPractice(pack, root, {
        onExit: () => {
          if (node.unit_id) {
            refreshUnit(node.unit_id, node.id, node.partner_id);
          }
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

      touchVocabBlock(practiceBlock.id || pack.id || node.id, node.id);
      startVocabPractice(root, practiceBlock, {
        practice,
        packId: pack.id || node.id,
        packTitle: pack.title || node.label,
        onTouch: () =>
          touchVocabBlock(practiceBlock.id || pack.id || node.id, node.id),
        onModeComplete: (mode, meta) => {
          completeVocabMode(
            practiceBlock.id || pack.id || node.id,
            mode,
            meta || {},
          );
        },
        onExit: () => {
          if (node.unit_id) {
            refreshUnit(node.unit_id, node.partner_id, node.id);
          }
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
      <strong>Learned</strong> = finished once (ladder + ≥${scoreBar}% when scored).
      <strong>Remembered</strong> = came back via review.
      <strong>Mastered</strong> = held across several reviews (${MASTERY_REPS}+).
      Not “opened the topic”.
      ${reviewLive ? "" : " · Review not live yet — last two meters stay at 0 until then."}
    </p>`;
}

function renderAll() {
  loadProgress();
  renderAuthor();
  renderRail();
  renderLevelMeters();
  renderUpNext();
  renderRoots();
  renderPath();
  if (!STATE.selectedId) {
    const hit = spineNext();
    STATE.selectedId =
      hit?.node?.id || STATE.tree.path_order?.[0] || null;
  }
  renderDetail();
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

    document.getElementById("btn-author-unlock")?.addEventListener("click", () => {
      setAuthorUnlock(!isAuthorUnlock());
      renderAll();
    });
    document.getElementById("btn-practice-back")?.addEventListener("click", () => {
      showMap();
    });

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

    if (new URLSearchParams(location.search).get("unlock") === "all") {
      setAuthorUnlock(true);
    }
    renderAll();
  } catch (e) {
    err.hidden = false;
    err.textContent = String(e.message || e);
  }
}

boot();
