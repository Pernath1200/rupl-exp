# RUPL-exp — Smoke-test handoff (2026-07-30)

**Goal:** get the unified Polish app (grammar + vocab in one shell) shippable to demo to James's Dad — Polish, retired, into computers, will test and help fix. **Target: Saturday.** Bar = *functional & breakable*, NOT perfect (Dad is the tester).

**Run:** `cd Documents/projects/rupl-exp` → `py scripts/sync_from_stable.py` → `py -m http.server 8096` → http://localhost:8096 · **Ctrl+F5** after any code/sync/data change. (Server may still be up from a prior session — check with a curl before relaunching.) NB: run the server in a **normal/foreground terminal** — launching `py -m http.server` as a *background* task failed with exit 127 (PATH) in the Claude task shell.

**Workflow (standing):** James does the speed run in-browser and flags duds with the in-app ⚑ flag button; Claude fixes; interleaved, one bounded pass. **James tests, Claude fixes.**

## CRITICAL — where fixes must go
- **Content / data** (grammar `use_items`, blocks): **canonical in `rupl2/data/blocks/`** (vocab: `rupl3`). `sync_from_stable.py` copies these into `rupl-exp/data/grammar/blocks/`, and **the deploy runs sync first** — so **data fixes MUST be made in rupl2** (and rupl-exp to see them now), or they revert on deploy.
- **CSS / JS** (`rupl-exp/css`, `rupl-exp/js`): rupl-exp-only; sync does **not** touch them. Edit directly.
- Codex-first for content/ids: `rue-codex/CODEX-FIRST.md`.

## Engines & theme
- Grammar = `js/practice-grammar.js` — ladder **Wstęp → Kontrola → Pisanie → Użycie**.
- Vocab = `js/practice-vocab.js` — tabs **Dopasuj / Quiz / Słowo / Zdanie**.
- Theme vars in `css/app.css` (amber `--accent: #c87840`).

## Fixed this session (don't redo)
1. `css/app.css` — added missing `.opts` / `.opt` styling (quiz options were unstyled → white, no hover). Now amber + hover + correct/wrong highlight. Covers both engines' quizzes.
2. `scripts/sync_from_stable.py` — fixed `→` print crash (cp1252) → `->`.
3. `js/app.js` — node-list click now routes through `focusNodeOnMap()` → scrolls to the Węzeł panel + focuses the **Ćwicz →** button (was: no scroll).
4. `js/practice-grammar.js` — ladder stages now clickable (buttons + `jumpToStage()` routing to `beginCheck/beginType/beginUse`); `.ladder-step` given cursor/font. Jump to any stage without restarting.
5. Data — `Say:` → `Type:` in all grammar use-item prompts (rupl2 + rupl-exp, 14 files).

## Open / next
- Vocab tabs (Dopasuj/Quiz/Słowo/Zdanie) may have the same "can't jump between stages" limitation as the grammar ladder — make clickable if James hits it.
- Audio "say it" component for the use stage — **PARKED**, later.
- Changes are **UNCOMMITTED**. To deploy to Pages: `git add -A && git commit -m "..." && git push origin main` (Pages rebuilds ~1 min; deploy path runs sync first).

**Continue:** James speed-runs → flags → Claude fixes. Keep it solar — bounded pass, ride the wave, don't flog to depletion.
