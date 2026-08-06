/**
 * RUPL — word-origin index ("skąd to słowo?").
 * Builds lemma → first-teaching-unit map from tree.json path_order +
 * each live pack's teaches_lemmas. No build step: derived from the same
 * files the app already serves, so it can never go stale.
 *
 * Surfaces:
 *  - tap any Polish word in practice/intro text → small origin popup
 *    (learners see it only when the word is found; author mode also
 *    shows a loud NOT-TAUGHT state — the audit blind-spot probe)
 *  - smoke flags auto-attach origin data for the item's words
 */

let indexPromise = null;
let INDEX = null; // Map normalized → {nodeId, order, label, labelEn, level}

const WORD_CHARS = /[a-ząćęłńóśźżA-ZĄĆĘŁŃÓŚŹŻ-]/;

function normalize(w) {
  return String(w || "")
    .toLowerCase()
    .replace(/^[^a-ząćęłńóśźż]+|[^a-ząćęłńóśźż]+$/g, "");
}

async function fetchJson(path) {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error(`origin-index: ${path}`);
  return res.json();
}

/** Kick this off at boot; safe to call repeatedly. */
export function initLemmaOrigin() {
  if (indexPromise) return indexPromise;
  indexPromise = (async () => {
    const tree = await fetchJson("./data/tree.json");
    const byId = new Map((tree.nodes || []).map((n) => [n.id, n]));
    const map = new Map();
    let order = 0;
    const jobs = [];
    for (const id of tree.path_order || []) {
      const node = byId.get(id);
      if (!node || node.status !== "live" || !node.content) continue;
      order += 1;
      const pos = order;
      jobs.push(
        fetchJson(`./${node.content.replace(/^\.\//, "")}`)
          .then((pack) => ({ node, pos, lemmas: pack.teaches_lemmas || [] }))
          .catch(() => null),
      );
    }
    const packs = (await Promise.all(jobs)).filter(Boolean);
    // path order, first teaching wins
    packs.sort((a, b) => a.pos - b.pos);
    for (const { node, pos, lemmas } of packs) {
      for (const raw of lemmas) {
        const key = normalize(raw);
        if (!key || map.has(key)) continue;
        map.set(key, {
          nodeId: node.id,
          order: pos,
          label: node.label || node.id,
          labelEn: node.label_en || "",
          level: Array.isArray(node.levels) ? node.levels[0] : "",
        });
      }
    }
    INDEX = map;
    return map;
  })();
  return indexPromise;
}

/** Sync lookup — null until the index has finished building. */
export function lookupWordSync(word) {
  if (!INDEX) return undefined; // undefined = index not ready
  return INDEX.get(normalize(word)) || null; // null = genuinely not found
}

/** Origins for every distinct word in a text. Sync; [] if index not ready. */
export function originsForText(text) {
  if (!INDEX || !text) return [];
  const seen = new Set();
  const out = [];
  for (const tok of String(text).split(/[^a-ząćęłńóśźżA-ZĄĆĘŁŃÓŚŹŻ-]+/)) {
    const key = normalize(tok);
    if (!key || key.length < 2 || seen.has(key)) continue;
    seen.add(key);
    out.push({ word: key, origin: INDEX.get(key) || null });
  }
  return out;
}

/** One-line summary for flag records / copy-for-agent. */
export function originsSummary(text) {
  const rows = originsForText(text);
  if (!rows.length) return "";
  return rows
    .map((r) =>
      r.origin
        ? `${r.word}→${r.origin.nodeId}#${r.origin.order}`
        : `${r.word}→NOT-TAUGHT?`,
    )
    .join(" · ");
}

// ---- tap-to-check popup -------------------------------------------------

let popupEl = null;

function dismissPopup() {
  if (popupEl) {
    popupEl.remove();
    popupEl = null;
    document.removeEventListener("click", onDocClick, true);
    document.removeEventListener("keydown", onKey, true);
  }
}
function onDocClick(e) {
  if (popupEl && !popupEl.contains(e.target)) dismissPopup();
}
function onKey(e) {
  if (e.key === "Escape") dismissPopup();
}

function showPopup(x, y, html) {
  dismissPopup();
  popupEl = document.createElement("div");
  popupEl.className = "origin-pop";
  popupEl.setAttribute("role", "status");
  popupEl.innerHTML = html;
  document.body.appendChild(popupEl);
  const pad = 8;
  const r = popupEl.getBoundingClientRect();
  let left = Math.min(x, window.innerWidth - r.width - pad);
  let top = y + 14;
  if (top + r.height > window.innerHeight - pad) top = y - r.height - 10;
  popupEl.style.left = `${Math.max(pad, left)}px`;
  popupEl.style.top = `${Math.max(pad, top)}px`;
  setTimeout(() => {
    document.addEventListener("click", onDocClick, true);
    document.addEventListener("keydown", onKey, true);
  }, 0);
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function wordAtPoint(x, y) {
  let node = null;
  let offset = 0;
  if (document.caretPositionFromPoint) {
    const p = document.caretPositionFromPoint(x, y);
    if (!p) return null;
    node = p.offsetNode;
    offset = p.offset;
  } else if (document.caretRangeFromPoint) {
    const r = document.caretRangeFromPoint(x, y);
    if (!r) return null;
    node = r.startContainer;
    offset = r.startOffset;
  }
  if (!node || node.nodeType !== Node.TEXT_NODE) return null;
  const text = node.textContent || "";
  if (!text.trim()) return null;
  let a = offset;
  let b = offset;
  while (a > 0 && WORD_CHARS.test(text[a - 1])) a -= 1;
  while (b < text.length && WORD_CHARS.test(text[b])) b += 1;
  const word = text.slice(a, b);
  return word && WORD_CHARS.test(word) ? word : null;
}

/**
 * Delegated tap-to-check. Skips interactive elements so the match game,
 * buttons and typing are untouched. Learners only get a popup on a hit;
 * author mode also reports not-found (the leak probe).
 */
export function wireWordTap(container, { isAuthor } = {}) {
  if (!container || container.dataset.originWired) return;
  container.dataset.originWired = "1";
  container.addEventListener("click", (e) => {
    if (e.target.closest("button, a, input, textarea, select, [contenteditable], .origin-pop, .type-in")) {
      return;
    }
    const sel = window.getSelection?.();
    if (sel && !sel.isCollapsed) return; // user is selecting text
    const word = wordAtPoint(e.clientX, e.clientY);
    if (!word || normalize(word).length < 2) return;
    const entry = lookupWordSync(word);
    const author = typeof isAuthor === "function" ? isAuthor() : false;
    if (entry === undefined) return; // index still building — stay silent
    if (entry) {
      const lvl = entry.level ? `${escapeHtml(entry.level)} · ` : "";
      const detail = author
        ? `<div class="origin-pop-meta">${escapeHtml(entry.nodeId)} · #${entry.order}</div>`
        : "";
      showPopup(
        e.clientX,
        e.clientY,
        `<div class="origin-pop-word">${escapeHtml(normalize(word))}</div>
         <div class="origin-pop-src">z: <strong>${escapeHtml(entry.label)}</strong></div>
         <div class="origin-pop-meta">${lvl}${escapeHtml(entry.labelEn)}</div>${detail}`,
      );
    } else if (author) {
      showPopup(
        e.clientX,
        e.clientY,
        `<div class="origin-pop-word">${escapeHtml(normalize(word))}</div>
         <div class="origin-pop-warn">⚠ not in any teaches_lemmas</div>
         <div class="origin-pop-meta">taught form missing — possible leak (or an EN/glue word)</div>`,
      );
    }
  });
}
