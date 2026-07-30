/**
 * Practice ladder (RUPL3 — Polish vocab for EN speakers):
 * Match → Quiz → Type word → Type sentence (Use it)
 * Default for word modes: EN → PL
 * Sentence mode: produce Polish (EN gloss under words / EN prompt for frames)
 */

import { getSmokeApi, countFlags, updateFlagsBadge } from "./smoke-flags.js";

function shuffle(a) {
  const arr = a.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Expand common contractions so I'm / I am grade the same. */
function expandContractions(s) {
  let t = String(s).toLowerCase();
  const pairs = [
    [/\bwon't\b/g, "will not"],
    [/\bcan't\b/g, "cannot"],
    [/\bcannot\b/g, "cannot"],
    [/\bdon't\b/g, "do not"],
    [/\bdoesn't\b/g, "does not"],
    [/\bdidn't\b/g, "did not"],
    [/\bisn't\b/g, "is not"],
    [/\baren't\b/g, "are not"],
    [/\bwasn't\b/g, "was not"],
    [/\bweren't\b/g, "were not"],
    [/\bhaven't\b/g, "have not"],
    [/\bhasn't\b/g, "has not"],
    [/\bi'm\b/g, "i am"],
    [/\byou're\b/g, "you are"],
    [/\bhe's\b/g, "he is"],
    [/\bshe's\b/g, "she is"],
    [/\bit's\b/g, "it is"],
    [/\bwe're\b/g, "we are"],
    [/\bthey're\b/g, "they are"],
    [/\bi've\b/g, "i have"],
    [/\byou've\b/g, "you have"],
    [/\bwe've\b/g, "we have"],
    [/\bthey've\b/g, "they have"],
    [/\bi'll\b/g, "i will"],
    [/\byou'll\b/g, "you will"],
    [/\bhe'll\b/g, "he will"],
    [/\bshe'll\b/g, "she will"],
    [/\bwe'll\b/g, "we will"],
    [/\bthey'll\b/g, "they will"],
    [/\bi'd\b/g, "i would"],
    [/\byou'd\b/g, "you would"],
    [/\bhe'd\b/g, "he would"],
    [/\bshe'd\b/g, "she would"],
    [/\bwe'd\b/g, "we would"],
    [/\bthey'd\b/g, "they would"],
    [/\bthere's\b/g, "there is"],
    [/\bthat's\b/g, "that is"],
    [/\bwhat's\b/g, "what is"],
    [/\bwhere's\b/g, "where is"],
    [/\bwho's\b/g, "who is"],
  ];
  for (const [re, rep] of pairs) t = t.replace(re, rep);
  return t;
}

/** Polish production: keep diacritics (ą ≠ a). Soft punctuation only. */
function norm(s) {
  return String(s)
    .toLowerCase()
    .replace(/[''`´]/g, "")
    .replace(/[.,!?;:"()\-–—]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Expand one answer string into normalised acceptable forms (slashes, notes). */
function accepts(answer) {
  if (answer == null || answer === "") return [];
  const forms = [answer, String(answer).replace(/\([^)]*\)/g, " ")];
  return [
    ...new Set(
      forms
        .flatMap((f) => String(f).split(/[/;]/))
        .map(norm)
        .filter(Boolean),
    ),
  ];
}

/**
 * Soft full-sentence match for Polish — listed accepts only via itemAccepts;
 * here: exact after norm, or strip optional "ja/ty" subject if rest matches.
 */
function softSentenceMatch(userNorm, primaryNorm) {
  if (!userNorm || !primaryNorm) return false;
  if (userNorm === primaryNorm) return true;

  const dropSubj = (t) =>
    t.replace(/^(ja|ty|on|ona|ono|my|wy|oni|one)\s+/i, "").trim();
  const u = dropSubj(userNorm);
  const p = dropSubj(primaryNorm);
  if (u && p && u === p) return true;
  return false;
}

/**
 * Preferred model + optional item.accepts / item.gap_accepts.
 * Show answer stays the preferred model; grading allows listed variants.
 * gap_accepts only apply when forGap (Word mode) — bare synonyms must not pass Sentence.
 */
function itemAccepts(item, primary, { forGap = false } = {}) {
  const extras = [];
  if (item && Array.isArray(item.accepts)) extras.push(...item.accepts);
  if (forGap && item && Array.isArray(item.gap_accepts)) {
    extras.push(...item.gap_accepts);
  }
  const out = new Set(accepts(primary));
  for (const a of extras) {
    for (const n of accepts(a)) out.add(n);
  }
  // Auto contraction-style twins already via expandContractions in norm
  return [...out];
}

function isCorrectAnswer(userInput, item, primary, opts = {}) {
  const { forGap = false } = opts;
  const userN = norm(userInput);
  if (!userN) return false;
  if (itemAccepts(item, primary, opts).includes(userN)) return true;
  // Soft match only for full sentences / non-gap (gate Sentence, frame Sentence)
  if (!forGap && primary && String(primary).trim().includes(" ")) {
    const primaryN = norm(primary);
    if (softSentenceMatch(userN, primaryN)) return true;
    // also soft-match against listed accepts
    if (item && Array.isArray(item.accepts)) {
      for (const a of item.accepts) {
        if (softSentenceMatch(userN, norm(a))) return true;
      }
    }
  }
  return false;
}

/** Drop Polish diacritics. Near-miss detection ONLY — never used to grade a pass. */
function deacc(s) {
  return String(s)
    .replace(/ą/g, "a")
    .replace(/ć/g, "c")
    .replace(/ę/g, "e")
    .replace(/ł/g, "l")
    .replace(/ń/g, "n")
    .replace(/ó/g, "o")
    .replace(/ś/g, "s")
    .replace(/ź/g, "z")
    .replace(/ż/g, "z");
}

/** Levenshtein distance, bailing out once past `cap`. */
function editDistance(a, b, cap) {
  if (Math.abs(a.length - b.length) > cap) return cap + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const row = [i];
    let best = i;
    for (let j = 1; j <= b.length; j++) {
      row[j] = Math.min(
        prev[j] + 1,
        row[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
      if (row[j] < best) best = row[j];
    }
    if (best > cap) return cap + 1;
    prev = row;
  }
  return prev[b.length];
}

/**
 * Verdict for an answer that failed isCorrectAnswer().
 *   "accent" — right word, only diacritics off (English keyboard problem,
 *              not a knowledge problem) → count it, but show the ogonki.
 *   "close"  — within a couple of edits (dropped ending, typo) → offer one
 *              retry instead of a hard wrong + reveal.
 *   null     — genuinely a different word. Stays wrong.
 * Never widens the answer key: the model answer shown is unchanged.
 */
function nearMiss(userInput, item, primary, opts = {}) {
  const userN = norm(userInput);
  if (!userN) return null;
  const forms = itemAccepts(item, primary, opts);
  if (!forms.length) return null;

  const userFlat = deacc(userN);
  if (forms.some((f) => deacc(f) === userFlat)) return "accent";

  // Budget scales with length; short words get none (syn vs sen is a real miss).
  for (const f of forms) {
    const cap = f.length >= 7 ? 2 : f.length >= 5 ? 1 : 0;
    if (cap === 0) continue;
    if (editDistance(userFlat, deacc(f), cap) <= cap) return "close";
  }
  return null;
}

export {
  norm,
  isCorrectAnswer,
  itemAccepts,
  softSentenceMatch,
  expandContractions,
  nearMiss,
};

/** Ball-and-box SVG diagrams (from Teaching Material basic-prepositions.html), RUE3 dark tokens. */
function diagramSvg(key) {
  const box = (x, y, w, h) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#2a2218" stroke="#e0a050" stroke-width="3"/>`;
  const obox = (x, y, w, h) =>
    `<path d="M${x} ${y} L${x} ${y + h} L${x + w} ${y + h} L${x + w} ${y}" fill="#221c14" stroke="#e0a050" stroke-width="3" stroke-linejoin="round"/>`;
  const ball = (cx, cy) =>
    `<circle cx="${cx}" cy="${cy}" r="16" fill="#e88a3c" stroke="#c56f27" stroke-width="2"/>`;
  const dash = (x1, y1, x2, y2) =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#e0a050" stroke-width="2" stroke-dasharray="5 5"/>`;
  const svg = (inner) =>
    `<svg viewBox="0 0 220 150" class="scene" aria-hidden="true">${inner}</svg>`;
  const scenes = {
    in: () => svg(obox(70, 70, 80, 45) + ball(110, 96)),
    on: () => svg(box(70, 80, 80, 40) + ball(110, 64)),
    under: () => svg(box(70, 55, 80, 40) + ball(110, 116)),
    above: () => svg(box(70, 94, 80, 32) + ball(110, 44)),
    "next to": () => svg(box(58, 70, 70, 45) + ball(162, 92)),
    between: () => svg(box(22, 70, 46, 45) + box(152, 70, 46, 45) + ball(110, 92)),
    "in front of": () => svg(box(80, 56, 78, 40) + ball(102, 104)),
    behind: () => svg(ball(112, 64) + box(72, 74, 80, 44)),
    opposite: () => svg(box(22, 70, 46, 45) + box(152, 70, 46, 45) + dash(72, 92, 148, 92)),
    near: () => svg(box(40, 70, 54, 45) + ball(170, 92) + dash(98, 92, 150, 92)),
  };
  const fn = scenes[key];
  return fn ? fn() : "";
}

function diagramBlock(item) {
  if (!item || !item.diagram) return "";
  const svg = diagramSvg(item.diagram);
  if (!svg) return "";
  return `<div class="picwrap">${svg}</div>`;
}

function promptOf(item, plToEn) {
  return plToEn ? item.pl : item.en;
}

function answerOf(item, plToEn) {
  return plToEn ? item.en : item.pl;
}

/** Lemma used in free Sentence mode (Polish target for RUPL3). */
function keyWord(item) {
  const raw = item.pl || item.en || "";
  return String(raw).replace(/\([^)]*\)/g, "").split("/")[0].trim();
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const SENTENCE_FRAMES = [
  "Napisz jedno prawdziwe polskie zdanie o sobie z tymi słowami.",
  "Napisz jedno polskie zdanie o domu lub rodzinie z tymi słowami.",
  "Napisz krótkie polskie pytanie z jednym (lub oboma) z tych słów.",
  "Napisz krótkie polskie zdanie do sklepu lub kawiarni z tymi słowami.",
  "Napisz jedno polskie zdanie o życiu w mieście z tymi słowami.",
];

function isFrameItem(item) {
  return Boolean(item && item.gap && item.gap_answer);
}

/**
 * @param {HTMLElement} root
 * @param {{ id?: string, title: string, items: object[], practice?: string }} block
 * @param {{ onExit: () => void, practice?: string, packId?: string, packTitle?: string }} opts
 */
export function startPractice(root, block, opts) {
  const isFrames = opts.practice === "frames" || block.practice === "frames";
  const packId = opts.packId || block.id || "";
  const packTitle = opts.packTitle || block.title || "";
  const state = {
    mode: "match",
    plToEn: false, // EN → PL production (default for Polish learners)
    match: null,
    quiz: null,
    typ: null,
    use: null,
    keyHandler: null,
    advanceTimer: null,
    /** Current item context for smoke Flag (always-visible toolbar). */
    flagContext: {
      packId,
      packTitle,
      blockId: block.id || "",
      stage: "match",
      itemIndex: null,
      en: "",
      pl: "",
      gap: "",
      gap_answer: "",
      typed: "",
    },
  };
  /** Track first completion for optional UI; scores always update bests. */
  const reported = { match: false, quiz: false, type: false, sentence: false };

  function setFlagContext(partial) {
    state.flagContext = { ...state.flagContext, ...partial };
  }

  function captureTyped() {
    const el =
      root.querySelector("#ti") ||
      root.querySelector("#ui") ||
      root.querySelector("input.type-in") ||
      root.querySelector("textarea.type-in");
    if (el) setFlagContext({ typed: String(el.value || "") });
  }

  function openSmokeFlag() {
    captureTyped();
    getSmokeApi()?.openForm({ ...state.flagContext });
  }

  function openSmokeList() {
    getSmokeApi()?.openList();
  }

  /**
   * Always push mode complete (so retries raise best Quiz/Word).
   * reported[] only tracks first finish this session.
   */
  function reportMode(mode, meta) {
    if (!mode) return;
    reported[mode] = true;
    if (typeof opts.onModeComplete === "function") {
      opts.onModeComplete(mode, meta || {});
    }
  }

  if (typeof opts.onTouch === "function") opts.onTouch();

  function clearKey() {
    if (state.keyHandler) {
      document.removeEventListener("keydown", state.keyHandler, true);
      document.removeEventListener("keydown", state.keyHandler, false);
      state.keyHandler = null;
    }
    if (state.advanceTimer) {
      clearTimeout(state.advanceTimer);
      state.advanceTimer = null;
    }
  }

  /** Map digit / numpad key to 0-based option index, or null. */
  function quizKeyToIndex(e, optCount) {
    const codeMap = {
      Digit1: 0,
      Digit2: 1,
      Digit3: 2,
      Digit4: 3,
      Digit5: 4,
      Digit6: 5,
      Numpad1: 0,
      Numpad2: 1,
      Numpad3: 2,
      Numpad4: 3,
      Numpad5: 4,
      Numpad6: 5,
    };
    if (Object.prototype.hasOwnProperty.call(codeMap, e.code)) {
      const i = codeMap[e.code];
      return i < optCount ? i : null;
    }
    const n = parseInt(e.key, 10);
    if (n >= 1 && n <= optCount) return n - 1;
    return null;
  }

  /**
   * Enter = primary action (check / next / continue).
   * Callers skip textarea when free multi-line write owns Enter.
   * Single-line type-in (#ti, input.type-in) must receive Enter.
   */
  function bindEnter(handler) {
    clearKey();
    state.keyHandler = (e) => {
      if (e.key !== "Enter" || e.shiftKey) return;
      if (e.target.closest("select")) return;
      if (e.target.closest("#smoke-flags-host")) return;
      handler(e);
    };
    document.addEventListener("keydown", state.keyHandler, true);
  }

  function bindEnterPrimary(stage) {
    bindEnter((e) => {
      // Don't steal Enter from multi-line free write
      if (e.target.closest("textarea") && !e.target.closest("#ti")) return;
      e.preventDefault();
      const btn =
        stage.querySelector(".btn.primary") ||
        stage.querySelector("#chk") ||
        stage.querySelector(".btn");
      if (btn && !btn.disabled) btn.click();
    });
  }

  function setMode(m) {
    clearKey();
    state.mode = m;
    state.match = null;
    state.quiz = null;
    state.typ = null;
    // Keep saved sentences when re-entering sentence mode from the mode bar
    if (m !== "sentence") state.use = null;
    else if (!state.use) newUse();
    render();
  }

  function renderChrome(statusText) {
    const modes = [
      ["match", "1 · Dopasuj"],
      ["quiz", "2 · Quiz"],
      ["type", "3 · Słowo"],
      ["sentence", "4 · Zdanie"],
    ];
    const showDir = state.mode !== "sentence";
    const nFlags = countFlags();
    return `
      <div class="practice-head">
        <div class="practice-title">${escapeHtml(block.title)}</div>
        <div class="practice-meta">${block.items.length} ${isFrames ? "ram" : "słów"} · A1${isFrames ? " · rdzeń pnia" : ""}</div>
      </div>
      <div class="smoke-toolbar" role="toolbar" aria-label="Smoke flags">
        <button type="button" class="btn smoke-flag-btn" id="p-flag" title="Flag this item for smoke review">⚑ Flag item</button>
        <button type="button" class="btn smoke-flag-list" id="p-flag-list" data-smoke-badge title="View flagged items · copy for agent">${nFlags > 0 ? `Flagged (${nFlags})` : "Flagged list"}</button>
        <span class="smoke-toolbar-hint">Smoke · local notes for the agent</span>
      </div>
      <div class="modes">
        ${modes
          .map(
            ([id, label]) =>
              `<button type="button" class="mode ${state.mode === id ? "active" : ""}" data-mode="${id}">${label}</button>`,
          )
          .join("")}
      </div>
      <div class="p-bar">
        <span id="p-status">${escapeHtml(statusText || "")}</span>
        ${
          showDir
            ? `<button type="button" class="dir" id="p-dir">${state.plToEn ? "PL → EN" : "EN → PL"}</button>`
            : `<span class="dir-static">Pisz po polsku</span>`
        }
      </div>
      <div id="p-stage" class="stage"></div>
      <div class="practice-exit">
        <button type="button" class="btn-ghost" id="p-exit">← Wróć do drzewa</button>
      </div>
    `;
  }

  function wireChrome() {
    root.querySelectorAll(".mode").forEach((btn) => {
      btn.addEventListener("click", () => setMode(btn.dataset.mode));
    });
    const dir = root.querySelector("#p-dir");
    if (dir) {
      dir.addEventListener("click", () => {
        state.plToEn = !state.plToEn;
        state.match = null;
        state.quiz = null;
        state.typ = null;
        clearKey();
        render();
      });
    }
    root.querySelector("#p-flag")?.addEventListener("click", () => {
      openSmokeFlag();
    });
    root.querySelector("#p-flag-list")?.addEventListener("click", () => {
      openSmokeList();
    });
    root.querySelector("#p-exit").addEventListener("click", () => {
      clearKey();
      opts.onExit();
    });
    updateFlagsBadge();
  }

  function flagItem(it, itemIndex, stage) {
    if (!it) {
      setFlagContext({
        stage: stage || state.mode,
        itemIndex: itemIndex ?? null,
        en: "",
        pl: "",
        gap: "",
        gap_answer: "",
      });
      return;
    }
    setFlagContext({
      stage: stage || state.mode,
      itemIndex: typeof itemIndex === "number" ? itemIndex : null,
      en: it.en || "",
      pl: it.pl || "",
      gap: it.gap || "",
      gap_answer: it.gap_answer || "",
    });
  }

  function newMatch() {
    const pool = shuffle(block.items).slice(0, Math.min(6, block.items.length));
    const left = pool.map((it, i) => ({ t: promptOf(it, state.plToEn), id: i }));
    const right = shuffle(
      pool.map((it, i) => ({ t: answerOf(it, state.plToEn), id: i })),
    );
    state.match = {
      left,
      right,
      sel: null,
      doneIds: new Set(),
      total: pool.length,
    };
  }

  function renderMatch(stage) {
    if (!state.match) newMatch();
    const m = state.match;
    const doneCount = m.doneIds.size;
    setFlagContext({
      stage: "match",
      itemIndex: null,
      en: "",
      pl: "",
      gap: "",
      gap_answer: "",
      typed: "",
    });

    if (doneCount === m.total) {
      reportMode("match");
      stage.innerHTML = `
        <div class="q">
          <div class="prompt">Wszystko dopasowane</div>
          <div class="sub">Dalej: Quiz → Słowo → Zdanie · Enter kontynuuje</div>
          <div class="nav">
            <button type="button" class="btn" id="m-again">Nowa talia</button>
            <button type="button" class="btn primary" id="m-quiz">2 · Quiz →</button>
          </div>
        </div>`;
      stage.querySelector("#m-again").onclick = () => {
        newMatch();
        render();
      };
      stage.querySelector("#m-quiz").onclick = () => setMode("quiz");
      bindEnterPrimary(stage);
      return `Dopasowano ${doneCount} z ${m.total}`;
    }

    const col = (arr, side) =>
      arr
        .map((x) => {
          const done = m.doneIds.has(x.id);
          const cls = done ? "m done" : "m";
          const label = done ? `✓ ${x.t}` : x.t;
          return `<button type="button" class="${cls}" data-side="${side}" data-id="${x.id}" ${done ? "disabled" : ""}>${escapeHtml(label)}</button>`;
        })
        .join("");

    stage.innerHTML = `<div class="match"><div>${col(m.left, "L")}</div><div>${col(m.right, "R")}</div></div>`;
    stage.querySelectorAll(".m:not(.done)").forEach((el) => {
      el.addEventListener("click", () => {
        const id = +el.dataset.id;
        const side = el.dataset.side;
        if (!m.sel) {
          m.sel = { id, side, el };
          el.classList.add("sel");
          return;
        }
        if (m.sel.side === side) {
          m.sel.el.classList.remove("sel");
          m.sel = { id, side, el };
          el.classList.add("sel");
          return;
        }
        if (m.sel.id === id) {
          // Pair found — persist in state so re-render keeps them eliminated
          m.doneIds.add(id);
          m.sel.el.classList.remove("sel");
          m.sel.el.classList.add("done");
          m.sel.el.disabled = true;
          m.sel.el.textContent = "✓ " + m.sel.el.textContent.replace(/^✓\s*/, "");
          el.classList.add("done");
          el.disabled = true;
          el.textContent = "✓ " + el.textContent.replace(/^✓\s*/, "");
          m.sel = null;
          // Refresh status line + full board when complete
          setTimeout(() => render(), doneCount + 1 >= m.total ? 280 : 0);
          if (doneCount + 1 < m.total) {
            const st = root.querySelector("#p-status");
            if (st) st.textContent = `Dopasowano ${m.doneIds.size} z ${m.total}`;
          }
        } else {
          const a = m.sel.el;
          a.classList.add("wrong");
          el.classList.add("wrong");
          setTimeout(() => {
            a.classList.remove("wrong", "sel");
            el.classList.remove("wrong");
          }, 450);
          m.sel = null;
        }
      });
    });
    return `Dopasowano ${doneCount} z ${m.total}`;
  }

  /** @param {number[] | null} onlyIndices item indices to practice (retry wrong) */
  function newQuiz(onlyIndices) {
    const list = block.items;
    const order =
      onlyIndices && onlyIndices.length
        ? shuffle(onlyIndices.slice())
        : shuffle(list.map((_, i) => i));
    state.quiz = {
      order,
      pos: 0,
      score: 0,
      answered: false,
      wrong: [], // item indices missed this pass
      retryPass: Boolean(onlyIndices && onlyIndices.length),
    };
  }

  function renderQuiz(stage) {
    const list = block.items;
    if (!state.quiz) newQuiz();
    const q = state.quiz;
    const passLen = q.order.length;

    if (q.pos >= q.order.length) {
      const wrongN = q.wrong.length;
      // Retry-wrong passes don't feed best-score (fruit stays honest —
      // only full-set runs raise bestQuiz).
      if (!q.retryPass) reportMode("quiz", { score: q.score, total: passLen });
      stage.innerHTML = `
        <div class="q">
          <div class="prompt">Quiz skończony</div>
          <div class="scoreline">${q.score} / ${passLen}</div>
          <div class="sub">${
            wrongN > 0
              ? `${wrongN} do powtórki · lub idź do Słowa`
              : "Wszystko dobrze · dalej: Słowo"
          }${q.retryPass ? " (runda poprawkowa)" : ""} · Enter pokračuje</div>
          <div class="nav">
            ${
              wrongN > 0
                ? `<button type="button" class="btn primary" id="q-retry">Powtórz błędy (${wrongN})</button>
                   <button type="button" class="btn" id="q-type">3 · Słowo →</button>`
                : `<button type="button" class="btn" id="q-again">Cała talia od nowa</button>
                   <button type="button" class="btn primary" id="q-type">3 · Słowo →</button>`
            }
          </div>
          ${
            wrongN > 0
              ? `<button type="button" class="link" id="q-again">Cała talia od nowa</button>`
              : ""
          }
        </div>`;
      const retryBtn = stage.querySelector("#q-retry");
      if (retryBtn) {
        retryBtn.onclick = () => {
          newQuiz(q.wrong.slice());
          render();
        };
      }
      stage.querySelector("#q-type").onclick = () => setMode("type");
      const again = stage.querySelector("#q-again");
      if (again) {
        again.onclick = () => {
          newQuiz();
          render();
        };
      }
      bindEnterPrimary(stage);
      return wrongN > 0 ? `Gotowe · błędy: ${wrongN}` : `Gotowe · ${q.score}/${passLen}`;
    }

    const itemIndex = q.order[q.pos];
    const it = list[itemIndex];
    flagItem(it, itemIndex, "quiz");
    const correct = answerOf(it, state.plToEn);
    const others = shuffle(
      list.filter((x) => answerOf(x, state.plToEn) !== correct),
    )
      .slice(0, 3)
      .map((x) => answerOf(x, state.plToEn));
    const opts = shuffle([correct, ...others]);

    stage.innerHTML = `
      <div class="q">
        ${diagramBlock(it)}
        <div class="prompt">${escapeHtml(promptOf(it, state.plToEn))}</div>
        <div class="sub">Wybierz wersję ${state.plToEn ? "angielską" : "polską"} — odpowiedz 1–4 · Enter = dalej</div>
        <div class="opts">
          ${opts
            .map(
              (o, i) =>
                `<button type="button" class="opt" data-i="${i}"><span class="knum">${i + 1}</span>${escapeHtml(o)}</button>`,
            )
            .join("")}
        </div>
      </div>`;

    const goNextQuestion = () => {
      if (state.advanceTimer) {
        clearTimeout(state.advanceTimer);
        state.advanceTimer = null;
      }
      q.pos++;
      q.answered = false;
      render();
    };

    const pick = (i) => {
      if (q.answered) return;
      q.answered = true;
      const buttons = [...stage.querySelectorAll(".opt")];
      if (opts[i] === correct) {
        buttons[i].classList.add("correct");
        q.score++;
      } else {
        buttons[i].classList.add("wrong");
        const ci = opts.indexOf(correct);
        if (ci >= 0) buttons[ci].classList.add("correct");
        if (!q.wrong.includes(itemIndex)) q.wrong.push(itemIndex);
      }
      // Auto-advance; Enter skips the wait
      state.advanceTimer = setTimeout(goNextQuestion, 750);
    };

    stage.querySelectorAll(".opt").forEach((el) => {
      el.addEventListener("click", () => pick(+el.dataset.i));
    });

    // Don't leave focus on mode/dir chrome — that blocked 1–4 keys
    // (handler used to ignore keydown when target was .mode / .dir).
    if (document.activeElement && root.contains(document.activeElement)) {
      const ae = document.activeElement;
      if (ae.matches && ae.matches("button.mode, button.dir, #p-exit, .util-btn")) {
        ae.blur();
      }
    }
    if (!stage.hasAttribute("tabindex")) stage.setAttribute("tabindex", "-1");
    try {
      stage.focus({ preventScroll: true });
    } catch {
      /* ignore */
    }

    clearKey();
    state.keyHandler = (e) => {
      // Only skip when typing in a real field (not chrome buttons)
      if (e.target.closest("input, textarea, select")) return;
      if (e.target.closest("#smoke-flags-host")) return;
      if (e.key === "Enter") {
        if (q.answered) {
          e.preventDefault();
          goNextQuestion();
        }
        return;
      }
      if (q.answered) {
        // Digit during the feedback pause: skip the wait instead of
        // swallowing the press — fast keying stays responsive.
        if (quizKeyToIndex(e, opts.length) != null) {
          e.preventDefault();
          goNextQuestion();
        }
        return;
      }
      const n = quizKeyToIndex(e, opts.length);
      if (n != null) {
        e.preventDefault();
        e.stopPropagation();
        pick(n);
      }
    };
    // Capture so numbers win even if a button has focus
    document.addEventListener("keydown", state.keyHandler, true);

    return `${q.retryPass ? "Poprawka" : "Pytanie"} ${q.pos + 1} z ${passLen} · wynik ${q.score}`;
  }

  /** @param {number[] | null} onlyIndices item indices to practice (retry wrong) */
  function newType(onlyIndices) {
    const list = block.items;
    const order =
      onlyIndices && onlyIndices.length
        ? shuffle(onlyIndices.slice())
        : shuffle(list.map((_, i) => i));
    state.typ = {
      order,
      pos: 0,
      score: 0,
      answered: false,
      missedThis: false,
      wrong: [], // item indices missed this pass
      retryPass: Boolean(onlyIndices && onlyIndices.length),
    };
  }

  function renderType(stage) {
    const list = block.items;
    if (!state.typ) newType();
    const t = state.typ;
    const passLen = t.order.length;

    if (t.pos >= t.order.length) {
      const wrongN = t.wrong.length;
      reportMode("type", { score: t.score, total: passLen });
      const sub =
        wrongN > 0
          ? `${wrongN} do powtórki · lub idź do Zdania`
          : "Wszystko dobrze · dalej: Zdanie";
      stage.innerHTML = `
        <div class="q">
          <div class="prompt">Pisanie skończone</div>
          <div class="scoreline">${t.score} / ${passLen}</div>
          <div class="sub">${sub}${t.retryPass ? " (runda poprawkowa)" : ""}</div>
          <div class="nav">
            ${
              wrongN > 0
                ? `<button type="button" class="btn primary" id="t-retry">Powtórz błędy (${wrongN})</button>
                   <button type="button" class="btn" id="t-sent">4 · Zdanie →</button>`
                : `<button type="button" class="btn" id="t-again">Cała talia od nowa</button>
                   <button type="button" class="btn primary" id="t-sent">4 · Zdanie →</button>`
            }
          </div>
          ${
            wrongN > 0
              ? `<button type="button" class="link" id="t-again">Cała talia od nowa</button>`
              : ""
          }
        </div>`;
      const retryBtn = stage.querySelector("#t-retry");
      if (retryBtn) {
        retryBtn.onclick = () => {
          newType(t.wrong.slice());
          render();
        };
      }
      stage.querySelector("#t-sent").onclick = () => setMode("sentence");
      const again = stage.querySelector("#t-again");
      if (again) {
        again.onclick = () => {
          newType();
          render();
        };
      }
      bindEnterPrimary(stage);
      return wrongN > 0
        ? `Gotowe · błędy: ${wrongN}`
        : `Gotowe · ${t.score}/${passLen}`;
    }

    const itemIndex = t.order[t.pos];
    const it = list[itemIndex];
    flagItem(it, itemIndex, "type");
    const frame = isFrameItem(it);
    // Frames: gap-fill in Polish (seed production EN→PL). Leaves: EN↔PL word.
    const prompt = frame
      ? it.gap
      : promptOf(it, state.plToEn);
    const answer = frame ? it.gap_answer : answerOf(it, state.plToEn);
    const sub = frame
      ? "Uzupełnij brakujące polskie słowo · Enter = sprawdź / dalej"
      : `Napisz ${state.plToEn ? "po angielsku" : "po polsku"} · Enter = sprawdź / dalej`;
    const passLabel = t.retryPass ? "poprawka" : "talia";
    stage.innerHTML = `
      <div class="q">
        ${diagramBlock(it)}
        ${frame ? `<div class="sub" style="margin-bottom:0.35rem">${escapeHtml(it.en)}</div>` : ""}
        <div class="prompt prompt-gap">${escapeHtml(prompt)}</div>
        <div class="sub">${sub}</div>
        <input class="type-in" id="ti" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="pisz tutaj…" />
        <div class="fb" id="tfb"></div>
        <div class="nav"><button type="button" class="btn primary" id="chk">Sprawdź</button></div>
        <button type="button" class="link" id="skip">Pokaż odpowiedź</button>
      </div>`;

    const inp = stage.querySelector("#ti");
    const chk = stage.querySelector("#chk");
    const fb = stage.querySelector("#tfb");
    const skip = stage.querySelector("#skip");
    inp.addEventListener("input", () => setFlagContext({ typed: inp.value }));
    inp.focus();

    function goNext() {
      if (t.missedThis) {
        const idx = t.order[t.pos];
        if (!t.wrong.includes(idx)) t.wrong.push(idx);
      }
      t.pos++;
      t.answered = false;
      t.missedThis = false;
      t.nearUsed = false;
      render();
    }

    function afterGrade() {
      inp.disabled = true;
      skip.style.visibility = "hidden";
      chk.textContent = t.pos === passLen - 1 ? "Ukázat wynik" : "Dalej";
      chk.onclick = goNext;
      chk.focus();
    }

    function grade(opts = {}) {
      if (t.answered) return;
      const { allowNear = true } = opts;
      if (isCorrectAnswer(inp.value, it, answer, { forGap: frame })) {
        t.answered = true;
        t.missedThis = false;
        t.score++;
        fb.textContent = "✓ Dobrze";
        fb.className = "fb good";
        afterGrade();
        return;
      }

      // Near-miss layer: diacritics count as right, a dropped ending gets one retry.
      const near = allowNear
        ? nearMiss(inp.value, it, answer, { forGap: frame })
        : null;
      if (near === "accent") {
        t.answered = true;
        t.missedThis = false;
        t.score++;
        fb.innerHTML = `✓ Dobrze — z ogonkami: <span class="reveal">${escapeHtml(answer)}</span>`;
        fb.className = "fb good";
        afterGrade();
        return;
      }
      if (near === "close" && !t.nearUsed) {
        t.nearUsed = true;
        fb.textContent = "Prawie — sprawdź końcówkę i spróbuj jeszcze raz.";
        fb.className = "fb near";
        inp.select();
        inp.focus();
        return;
      }

      t.answered = true;
      t.missedThis = true;
      fb.innerHTML = `✗ Odpowiedź: <span class="reveal">${escapeHtml(answer)}</span>`;
      fb.className = "fb bad";
      const s = document.createElement("button");
      s.type = "button";
      s.className = "link";
      s.textContent = "Miałem rację → policz to";
      s.onclick = () => {
        t.score++;
        t.missedThis = false;
        s.textContent = "zaliczone ✓";
        s.disabled = true;
      };
      fb.appendChild(document.createElement("br"));
      fb.appendChild(s);
      afterGrade();
    }

    chk.onclick = () => {
      if (t.answered) goNext();
      else grade();
    };
    skip.onclick = () => {
      if (t.answered) return;
      inp.value = "";
      grade({ allowNear: false });
    };

    // Enter handled ONLY by the document-level bindEnter handler.
    // A second listener on the input double-fires: capture handler grades,
    // then the input handler sees answered=true and advances instantly,
    // so feedback never stays on screen.
    bindEnter((e) => {
      // Allow Enter from input, Check button, or anywhere on stage
      if (e.target.closest("textarea") && e.target.id !== "ti") return;
      e.preventDefault();
      e.stopPropagation();
      if (t.answered) goNext();
      else grade();
    });

    return `${passLabel} ${t.pos + 1} / ${passLen} · wynik ${t.score}`;
  }

  // ---- 4 · Type sentence (Use it) ----
  function deal() {
    const words = shuffle(block.items);
    const n = words.length >= 2 && Math.random() > 0.35 ? 2 : 1;
    return {
      words: words.slice(0, n),
      frame: SENTENCE_FRAMES[Math.floor(Math.random() * SENTENCE_FRAMES.length)],
    };
  }

  function sentenceTarget() {
    return block.items.length;
  }

  function newUse() {
    state.use = {
      n: 1,
      sentences: [],
      cur: deal(),
      answered: false,
      review: false,
      complete: false,
    };
  }

  function copySentences(sentences, msgEl) {
    const text = sentences.map((s) => "• " + s).join("\n");
    const ok = () => {
      if (msgEl) msgEl.textContent = "Skopiowano — wklej do notatek / nauczycielowi.";
    };
    const fail = () => {
      if (msgEl) msgEl.textContent = "Kopiowanie zablokowane — zaznacz listę i skopiuj ręcznie.";
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(ok).catch(fail);
    } else fail();
  }

  function renderSentenceComplete(stage) {
    const u = state.use;
    const target = sentenceTarget();
    reportMode("sentence", { score: u.sentences.length, total: target });
    stage.innerHTML = `
      <div class="q sent-review">
        <div class="prompt">Część gotowa</div>
        <div class="scoreline">${u.sentences.length} / ${target}</div>
        <div class="sub">Napisałeś ${target} zdań. Owoc = cała drabina + Quiz/Słowo ≥ 75 % (nie tylko Zdanie).</div>
        <div class="sent-list-mini">
          ${u.sentences.map((s) => `<div class="sent">${escapeHtml(s)}</div>`).join("")}
        </div>
        <div class="nav">
          <button type="button" class="btn" id="u-again">Spróbuj ponownie</button>
          <button type="button" class="btn primary" id="u-copy-done">Skopiuj wszystko</button>
        </div>
        <div class="sub" id="cmsg" style="margin-top:0.5rem"></div>
        <button type="button" class="link" id="u-more">Pisz dalej (opcjonalnie)</button>
      </div>`;

    stage.querySelector("#u-again").onclick = () => {
      newUse();
      render();
    };
    stage.querySelector("#u-copy-done").onclick = () => {
      copySentences(u.sentences, stage.querySelector("#cmsg"));
    };
    stage.querySelector("#u-more").onclick = () => {
      // Optional extra practice beyond target
      u.complete = false;
      u.answered = false;
      u.cur = deal();
      u.n = u.sentences.length + 1;
      render();
    };
    bindEnterPrimary(stage);
    return `Gotowe · ${u.sentences.length} / ${target}`;
  }

  function renderSentenceReview(stage) {
    const u = state.use;
    const target = sentenceTarget();
    stage.innerHTML = `
      <div class="q sent-review">
        <div class="prompt" style="font-size:1.15rem">Moje zdania</div>
        <div class="sub">${u.sentences.length} / ${target} do zaliczenia · Enter = wstecz</div>
        ${
          u.sentences.length
            ? u.sentences
                .map((s) => `<div class="sent">${escapeHtml(s)}</div>`)
                .join("")
            : `<div class="sub">Na razie nic nie zapisano.</div>`
        }
        <div class="nav">
          <button type="button" class="btn primary" id="u-back">◀ Wstecz</button>
          ${
            u.sentences.length
              ? `<button type="button" class="btn" id="u-copy">Skopiuj wszystko</button>`
              : ""
          }
        </div>
        <div class="sub" id="cmsg" style="margin-top:0.5rem"></div>
      </div>`;

    stage.querySelector("#u-back").onclick = () => {
      u.review = false;
      if (!u.answered) u.cur = deal();
      u.answered = false;
      render();
    };
    const cp = stage.querySelector("#u-copy");
    if (cp) {
      cp.onclick = () =>
        copySentences(u.sentences, stage.querySelector("#cmsg"));
    }
    bindEnterPrimary(stage);
    return `${u.sentences.length} / ${target} zdań`;
  }

  /** Trunk frames: reproduce full Polish from English (supports retry wrong) */
  function newFrameSentence(onlyIndices) {
    const list = block.items;
    const order =
      onlyIndices && onlyIndices.length
        ? shuffle(onlyIndices.slice())
        : shuffle(list.map((_, i) => i));
    state.typ = {
      order,
      pos: 0,
      score: 0,
      answered: false,
      missedThis: false,
      wrong: [],
      retryPass: Boolean(onlyIndices && onlyIndices.length),
    };
  }

  function renderFrameSentence(stage) {
    const list = block.items;
    if (!state.typ) newFrameSentence();
    const t = state.typ;
    const passLen = t.order.length;

    if (t.pos >= t.order.length) {
      const wrongN = t.wrong.length;
      reportMode("sentence", { score: t.score, total: passLen });
      stage.innerHTML = `
        <div class="q">
          <div class="prompt">Część gotowa</div>
          <div class="scoreline">${t.score} / ${passLen}</div>
          <div class="sub">${
            wrongN > 0
              ? `${wrongN} do powtórki · podstawowe ramy`
              : "Pełne polskie zdania z angielskiego — podstawowe ramy działają."
          }${t.retryPass ? " (runda poprawkowa)" : ""}</div>
          <div class="nav">
            ${
              wrongN > 0
                ? `<button type="button" class="btn primary" id="fs-retry">Powtórz błędy (${wrongN})</button>
                   <button type="button" class="btn" id="fs-match">1 · Dopasuj</button>`
                : `<button type="button" class="btn" id="fs-again">Cała talia od nowa</button>
                   <button type="button" class="btn primary" id="fs-match">1 · Dopasuj znovu</button>`
            }
          </div>
          ${
            wrongN > 0
              ? `<button type="button" class="link" id="fs-again">Cała talia od nowa</button>`
              : ""
          }
        </div>`;
      const retryBtn = stage.querySelector("#fs-retry");
      if (retryBtn) {
        retryBtn.onclick = () => {
          newFrameSentence(t.wrong.slice());
          render();
        };
      }
      stage.querySelector("#fs-match").onclick = () => setMode("match");
      const again = stage.querySelector("#fs-again");
      if (again) {
        again.onclick = () => {
          newFrameSentence();
          render();
        };
      }
      bindEnterPrimary(stage);
      return wrongN > 0
        ? `Gotowe · błędy: ${wrongN}`
        : `Gotowe · ${t.score}/${passLen}`;
    }

    const itemIndex = t.order[t.pos];
    const it = list[itemIndex];
    flagItem(it, itemIndex, "sentence");
    stage.innerHTML = `
      <div class="q">
        <div class="sub">Zdanie <strong>${t.pos + 1}</strong> z <strong>${passLen}</strong>${t.retryPass ? " (poprawka)" : ""} · napisz po polsku</div>
        ${diagramBlock(it)}
        <div class="prompt" style="font-size:1.2rem">${escapeHtml(it.en)}</div>
        <div class="sub">Powtórz polski wzór · Enter = sprawdź / dalej</div>
        <textarea class="type-in type-area" id="ti" rows="2" autocomplete="off" spellcheck="false" placeholder="napisz polskie zdanie…"></textarea>
        <div class="fb" id="tfb"></div>
        <div class="nav"><button type="button" class="btn primary" id="chk">Sprawdź</button></div>
        <button type="button" class="link" id="skip">Pokaż odpowiedź</button>
      </div>`;

    const inp = stage.querySelector("#ti");
    const chk = stage.querySelector("#chk");
    const fb = stage.querySelector("#tfb");
    const skip = stage.querySelector("#skip");
    inp.addEventListener("input", () => setFlagContext({ typed: inp.value }));
    inp.focus();

    function goNext() {
      if (t.missedThis) {
        const idx = t.order[t.pos];
        if (!t.wrong.includes(idx)) t.wrong.push(idx);
      }
      t.pos++;
      t.answered = false;
      t.missedThis = false;
      render();
    }

    function afterGrade() {
      inp.disabled = true;
      skip.style.visibility = "hidden";
      chk.textContent = t.pos === passLen - 1 ? "Zakończ ✓" : "Dalej";
      chk.onclick = goNext;
      chk.focus();
    }

    function grade() {
      if (t.answered) return;
      t.answered = true;
      t.missedThis = false;
      if (isCorrectAnswer(inp.value, it, it.pl)) {
        t.score++;
        fb.textContent = "✓ Dobrze";
        fb.className = "fb good";
      } else {
        t.missedThis = true;
        fb.innerHTML = `✗ Odpowiedź: <span class="reveal">${escapeHtml(it.pl)}</span>`;
        fb.className = "fb bad";
        const s = document.createElement("button");
        s.type = "button";
        s.className = "link";
        s.textContent = "Miałem rację → policz to";
        s.onclick = () => {
          t.score++;
          t.missedThis = false;
          s.textContent = "zaliczone ✓";
          s.disabled = true;
        };
        fb.appendChild(document.createElement("br"));
        fb.appendChild(s);
      }
      afterGrade();
    }

    chk.onclick = () => {
      if (t.answered) goNext();
      else grade();
    };
    skip.onclick = () => {
      if (t.answered) return;
      inp.value = "";
      grade();
    };
    inp.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      if (e.shiftKey) return;
      e.preventDefault();
      e.stopPropagation();
      if (t.answered) goNext();
      else grade();
    });
    bindEnter((e) => {
      if (e.target.closest("textarea")) return;
      e.preventDefault();
      if (t.answered) goNext();
      else grade();
    });

    return `Zdanie ${t.pos + 1} z ${passLen} · wynik ${t.score}`;
  }

  function renderSentence(stage) {
    // Trunk seed frames: reproduce model Polish sentences (not free leaf production)
    if (isFrames) return renderFrameSentence(stage);

    if (!state.use) newUse();
    const u = state.use;
    const target = sentenceTarget();

    if (u.complete) return renderSentenceComplete(stage);
    if (u.review) return renderSentenceReview(stage);

    // Progress index: next sentence to write is sentences.length + 1 (unless mid-feedback)
    const progressNum = Math.min(u.sentences.length + (u.answered ? 0 : 1), target);
    const c = u.cur;
    setFlagContext({
      stage: "sentence",
      itemIndex: null,
      en: c.words.map((w) => w.en).join(" · "),
      pl: c.words.map((w) => w.pl).join(" · "),
      gap: c.frame,
      gap_answer: "",
      typed: "",
    });
    stage.innerHTML = `
      <div class="q">
        <div class="words">
          ${c.words
            .map(
              (w) =>
                `<span class="pill">${escapeHtml(w.en)}<small>${escapeHtml(w.pl)}</small></span>`,
            )
            .join("")}
        </div>
        <div class="frame-prompt">${escapeHtml(c.frame)}</div>
        <div class="sub" style="margin-bottom:0.5rem">
          Zdanie <strong>${progressNum}</strong> z <strong>${target}</strong>
          · Enter = zapisz / dalej · Shift+Enter = nowa linia
        </div>
        <textarea class="type-in type-area" id="ui" rows="3" autocomplete="off" spellcheck="false" placeholder="napisz swoje zdanie po polsku…"></textarea>
        <div class="fb" id="ufb"></div>
        <div class="nav"><button type="button" class="btn primary" id="udone">Gotowe</button></div>
        <button type="button" class="link" id="usaved">Moje zdania (${u.sentences.length} / ${target})</button>
      </div>`;

    const ta = stage.querySelector("#ui");
    const fb = stage.querySelector("#ufb");
    const btn = stage.querySelector("#udone");
        ta.addEventListener("input", () => setFlagContext({ typed: ta.value }));
    ta.focus();

    function advanceOrSave() {
      if (!u.answered) {
        const text = ta.value.trim();
        if (!text) {
          fb.textContent = "Najpierw napisz zdanie.";
          fb.className = "fb";
          fb.style.color = "var(--muted)";
          return;
        }
        u.answered = true;
        ta.disabled = true;
        u.sentences.push(text);
        const lower = norm(text);
        const used = c.words.filter((w) => {
          const k = norm(keyWord(w));
          return k && lower.includes(k);
        });
        if (used.length === c.words.length) {
          fb.textContent =
            "✓ Zapisano — użyłeś: " + used.map(keyWord).join(", ");
          fb.className = "fb good";
        } else {
          const missing = c.words
            .filter((w) => !used.includes(w))
            .map(keyWord)
            .join(", ");
          fb.textContent = "Zapisano. Tip: zdanie nie zawierało: " + missing;
          fb.className = "fb";
          fb.style.color = "var(--muted)";
        }
        const hitTarget = u.sentences.length >= target;
        btn.textContent = hitTarget ? "Zakończ ✓" : "Dalej";
        btn.focus();
      } else {
        if (u.sentences.length >= target) {
          u.complete = true;
          render();
          return;
        }
        u.n++;
        u.cur = deal();
        u.answered = false;
        render();
      }
    }

    btn.onclick = advanceOrSave;

    ta.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      if (e.shiftKey) return;
      e.preventDefault();
      e.stopPropagation();
      advanceOrSave();
    });

    btn.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      e.stopPropagation();
      advanceOrSave();
    });

    bindEnter((e) => {
      if (e.target.closest("textarea")) return;
      e.preventDefault();
      advanceOrSave();
    });

    stage.querySelector("#usaved").onclick = () => {
      u.review = true;
      render();
    };

    return `Zdanie ${progressNum} z ${target} · zapisano ${u.sentences.length}`;
  }

  function render() {
    clearKey();
    root.innerHTML = renderChrome("…");
    wireChrome();
    const stage = root.querySelector("#p-stage");
    let status = "";
    if (state.mode === "match") status = renderMatch(stage);
    else if (state.mode === "quiz") status = renderQuiz(stage);
    else if (state.mode === "type") status = renderType(stage);
    else status = renderSentence(stage);
    const st = root.querySelector("#p-status");
    if (st) st.textContent = status || "";
  }

  render();
}
