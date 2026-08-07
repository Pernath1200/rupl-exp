# Sequencing triage · Phase 3

**Date:** 2026-07-30  
**Input:** [SEQUENCING-AUDIT.md](./SEQUENCING-AUDIT.md) (7 errors · 0 warns)  
**Spec:** [SEQUENCING.md](../SEQUENCING.md)  
**Scope:** Live spine path only · report triage, **no content edits in this phase**

---

## Summary

| Bucket | Count | Meaning |
|--------|------:|---------|
| **Tag bookkeeping** | 4 | Lemma is *used* and taught in-unit, but missing from `teaches_lemmas` |
| **Content leak (extra nouns)** | 3 | Nouns only appear in grammar pack, never on an earlier vocab/gender list |
| **Structure errors** | 0 | Path structures are clean |

**Verdict:** No path reorder needed. Phase 4 is a **small tag + light content** pass — not a curriculum redesign.

---

## Decision key

| Decision | Action in Phase 4 |
|----------|-------------------|
| **TEACH_HERE** | Add lemma to this pack’s `teaches_lemmas` (unlock rule already allows same-node teach) |
| **TEACH_EARLIER** | Add lemma to an earlier pack’s `teaches_lemmas` (and content if missing) |
| **REWRITE** | Change prompts/answers to only use already-taught lemmas |
| **DROP** | Remove items that need the lemma |
| **DEFER** | Accept temporarily with note (prefer not for these 7) |

---

## Errors (all 7)

### A. `a1_gender_check` — `ser`, `woda`, `auto`

| | |
|--|--|
| **Code** | `lemma_not_unlocked` |
| **Where** | Intro table “Words for this unit” + type items (*dobry ser*, etc.) |
| **Prior unlock** | Gender taught *dom, kot, sklep, kawa, herbata, książka, miasto, piwo, morze* — **not** ser / woda / auto |
| **Diagnosis** | Pack **introduces** three extra nouns for agreement drills but only tags *dobry/a/e* as teaches. Auditor correctly treats them as uses without teach. |
| **Decision** | **TEACH_HERE** — add `ser`, `woda`, `auto` to `a1_gender_check.teaches_lemmas` |
| **Why not earlier?** | They are scaffolding for *zgoda*, not core gender seed. Same-node teach is honest: learner meets them in this unit’s intro. |
| **Alt (optional later)** | TEACH_EARLIER on `a1_gender` if you want them on the first noun list — not required for green audit. |
| **Priority** | P1 · do first (pure tags / apply_tags update) |

---

### B. `a1_miec` — `książkę`

| | |
|--|--|
| **Code** | `lemma_not_unlocked` |
| **Where** | Intro Acc table, match/quiz/use (*Ona ma książkę*) |
| **Prior unlock** | Nom `książka` from `a1_gender` · Acc forms taught in tags: `kawę`, `herbatę`, `wodę` only |
| **Diagnosis** | Acc surface **książkę** is taught *in content* of this pack but omitted from `teaches_lemmas`. Spec: citation/surface forms used as learn targets belong in teaches when this unit is the first place they appear. |
| **Decision** | **TEACH_HERE** — add `książkę` (and keep nom `książka` only as use/prior) to `a1_miec.teaches_lemmas` |
| **Also** | Align `uses_lemmas` after re-run `apply_tags.py` so uses ⊆ teaches ∪ prior |
| **Priority** | P1 |

---

### C. `a1_acc_gym` — `książkę`

| | |
|--|--|
| **Code** | `lemma_not_unlocked` |
| **Where** | Gym drills (*Czytam książkę*, Acc form of książka) |
| **Depends on** | Finding B |
| **Decision** | **No separate content change** if B is done — after `a1_miec` teaches `książkę`, gym is later on path and unlocks it. |
| **Priority** | P1 · resolves with B |

---

### D. `a1_acc_gym` — `limonadę`, `sodę`

| | |
|--|--|
| **Code** | `lemma_not_unlocked` |
| **Where** | Gym Acc endings / uses (tagged in Phase 1 `uses_lemmas`) |
| **Prior unlock** | Food leaf has many drinks; **limonada / soda** not verified as taught; Acc surfaces never in `a1_miec` teaches |
| **Diagnosis** | Gym invents extra -ę nouns beyond the mieć teach set. Violates “gyms drill, don’t expand inventory.” |
| **Decision** | **REWRITE** (preferred) — replace limonada/soda items with the core set: *kawa→kawę, herbata→herbatę, woda→wodę, książka→książkę* only |
| **Alt** | TEACH_EARLIER: add *limonada, soda* to `a1_food` + Acc forms to `a1_miec` teaches — more scope, only if you want those words in the product |
| **Priority** | P1 · content rewrite in gym pack |

---

## What we are **not** changing (this triage)

| Topic | Note |
|-------|------|
| Path order | Keep gender → … → gender_check → food → mieć → acc_gym |
| Structure tags | No `structure_not_unlocked` findings |
| `trunk_want_like` | Structures OK (`present` + `miec_acc` after present/mieć). Lemma quality not in this 7-set — optional later audit |
| Off-path canopy | Still out of scope |
| Auditor logic | No change required for these fixes; re-run after Phase 4 |

---

## Phase 4 work order (approved plan)

1. **Tags / apply script**  
   - `a1_gender_check`: `teaches_lemmas` += `ser`, `woda`, `auto`  
   - `a1_miec`: `teaches_lemmas` += `książkę` (and any other Acc surfaces the pack actually drills: confirm `wodę` already listed)  
   - Re-run `apply_tags.py` so pack JSON + sidecar stay consistent  

2. **Content**  
   - `a1_acc_gym`: strip or rewrite **limonada / soda** → only core Acc set above  

3. **Verify**  
   ```powershell
   py rupl-codex\sequencing\apply_tags.py
   py rupl-exp\scripts\sync_from_stable.py
   py rupl-codex\sequencing\audit.py
   ```  
   **Success:** `errors: 0`  

4. **Optional follow-ups (not blocking green audit)**  
   - Item-level findings for want_like / places if we deepen auditor  
   - Teach *limonada/soda* properly on food if product wants them later  
   - Consider nom→acc pairing note in SEQUENCING.md (“teaching *książkę* does not require listing every case as separate structure”)  

---

## Owner checklist

| # | Item | Decision | Phase 4 |
|---|------|----------|---------|
| 1 | gender_check `ser` | TEACH_HERE | tags |
| 2 | gender_check `woda` | TEACH_HERE | tags |
| 3 | gender_check `auto` | TEACH_HERE | tags |
| 4 | miec `książkę` | TEACH_HERE | tags |
| 5 | acc_gym `książkę` | follows #4 | — |
| 6 | acc_gym `limonadę` | REWRITE | content |
| 7 | acc_gym `sodę` | REWRITE | content |

---

## Sign-off

Phase 3 triage **complete**. Phase 4 **implemented 2026-07-30**:

- Tags: `ser`/`woda`/`auto` on gender_check; `książkę` on miec; gyms no longer auto-merge all surfaces into uses  
- Content: `a1_acc_gym` rewritten to core four nouns + *mieć* only  
- Re-audit: **errors 0 · warns 0**
