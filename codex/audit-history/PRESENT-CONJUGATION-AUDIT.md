# Present tense · conjugation organisation audit

**Date:** 2026-07-30  
**Ask:** Full 6 persons without overwhelming the unit; organise by conjugation classes.  
**Scope:** Live path through present + gym + free time / want·like (downstream).

---

## 1. Do I see what you mean? **Yes.**

You are choosing a **load budget**:

| Expand | Must shrink |
|--------|-------------|
| Persons: **6** (ja ty on my wy oni) | Verbs per unit, conjugation classes per unit, extra sentence complexity |

If you keep **4 verbs × 3 patterns × 6 persons** in one pack, that is roughly:

- **4 × 6 = 24 forms** to introduce  
- plus **3 different ending systems** competing  
- plus objects (*kawę*) and full sentences  

That is why the current unit only did ja/ty/on: it was an (unspoken) load cut. The right cut is different: **keep 6 persons, cut verbs and cut mixed classes.**

---

## 2. Current `a1_present` (what is wrong)

| Dimension | Now | Problem |
|-----------|-----|---------|
| **Title** | *Teraźniejszy (ja/ty/on)* | Explicitly 3 persons |
| **Intro** | 4 verbs, 3-person tables only | my/wy/oni never taught, but quiz distractors already show *mówimy, mieszkamy* |
| **Verbs** | mówić + mieszkać + lubić + chcieć | **3 conjugation patterns in one unit** |
| **Match** | 12 pairs, only 3 persons × 4 verbs | No my/wy/oni |
| **Quiz** | 12 items, mostly ja/ty/on | Same |
| **Type** | ending_gap; **4× duplicate** *ja · mówić* | Broken padding; incomplete person coverage |
| **Use** | Full sentences with Acc objects | Fine for use stage, but multiplies load if intro already heavy |
| **Structure tag** | single `present` | Too coarse for class unlocking |

### Conjugation mix inside one unit (sticking point)

| Verb | Rough pattern | Class role |
|------|----------------|------------|
| **mieszkać** | -am / -asz / -a / -amy / -acie / -ają | Regular *-am* set |
| **mówić** | -ię / -isz / -i / … | *-ę/-isz* set |
| **lubić** | -ię / -isz / -i / … | same family as mówić (similar) |
| **chcieć** | -ę / -esz / -e / … | **different** (*-esz* not *-isz*) |

So the student is asked to learn “present” while juggling **at least two (really three) systems** plus only **half a person grid**.

---

## 3. Current `a1_present_gym`

| Issue | Detail |
|-------|--------|
| Still **3 persons** in intro tables | Pattern A/B show ja/ty/on only |
| Mentions **czytać** in gym table | Not taught in `a1_present` |
| Mixes patterns A + B + chcę in one gym | Cross-class discrimination **before** classes were cleanly taught |
| Type = ending only | OK for gym; main pack type should be full forms if you want consistency with mieć |

---

## 4. Downstream (already assumes “present”)

| Pack | Relies on |
|------|-----------|
| **Czas wolny** Zdanie | *Lubię / Chcę / Mówię* + Acc objects |
| **Chcę · lubię** frames | *chcieć / lubić* heavily |

These are fine **after** a clean teach — but they currently sit after a **confused** teach. If you split present into class units, want·like should unlock only after the **chcieć/lubić class** (or after both -am and -ę sets if those verbs are assigned there).

---

## 5. Whole path so far — health check (present-related)

| Area | Status | Change needed? |
|------|--------|----------------|
| **być** separate | Good special | Keep out of regular present sets |
| **mieć** separate + Acc | Good special | Keep out of regular present sets |
| **Food Zdanie** | *Mam…* not present verbs | OK |
| **a1_present** | Overloaded + 3 persons | **Redesign** (below) |
| **a1_present_gym** | Mixed patterns early | **After** first class solid, or per-class gyms |
| **Free time / want·like** | Use present | **Retarget** to unlocked class only |
| **Sequencing tag `present`** | One blob | **Split** into class IDs |
| **Type padding** | Duplicate items | **Delete** |

Earlier path (gender, poss, Dom, być, mieć, food) is **not** the problem for this question — the **present block** is.

---

## 6. Recommended redesign (load-balanced)

### Principle
**Budget = 6 persons × 1 class × 2 verbs (optional 3rd)** per teach unit.  
Not 3 persons × 4 verbs × 3 classes.

### Proposed path slice

```text
… food
→ a1_present_am     Class: mieszkać-type (-am…) · 6 persons · 2 verbs (mieszkać, czytać?)
→ [optional light use: daily/home recycle]
→ a1_present_e_isz  Class: mówić/lubić-type · 6 persons · 2 verbs (mówić, lubić)
→ a1_present_e_esz  Class: chcieć-type · 6 persons · 1–2 verbs (chcieć)
→ a1_present_gym    Mixed discrimination (only after ≥2 classes)
→ leaf_freetime     Use unlocked classes + noun pool
→ trunk_want_like   Use lubić/chcieć after their class is unlocked
```

**Minimum viable split (if you want fewer nodes):**

1. **Unit A:** *-am* only · 6 persons · mieszkać (+ optional second -am verb)  
2. **Unit B:** *-ę/-isz* · 6 persons · mówić + lubić  
3. **Unit C:** *chcieć* alone · 6 persons (irregular-ish endings)  
4. Gym mixed  

### What each unit contains (to stay under load)

| Stage | Content |
|-------|---------|
| Intro | Class name · **full 6-row grid** × 2 verbs · “not być/mieć” |
| Match/Quiz | Person ↔ form **within class only** · 12 items |
| Pisanie | **One word** forms only · all 6 persons represented · full word not only ending |
| Użycie | Short sentences · known nouns · **this class only** |

**Cut from the current mega-unit:** mixing classes; Acc-heavy use until forms are solid; ending-only if you prefer whole-word; duplicate type items; my/wy forms as quiz distractors before they are taught.

### Structure tags (sequencing)

Replace bare `present` with e.g.:

| ID | Meaning |
|----|---------|
| `present_am` | -am / -asz / -a / -amy / -acie / -ają |
| `present_e_isz` | -ę/-ię / -isz / -i / … |
| `present_e_esz` | -ę / -esz / -e / … (chcieć family) |
| `present_special` | reserved / map card for być·mieć |

Downstream packs `uses_structures` list only classes already taught.

---

## 7. Concrete change list (priority)

### P0 — must fix soon
1. **Stop teaching 3 classes in one pack** — split path or hard sequential parts.  
2. **Add my / wy / oni** grids once class is single.  
3. **Remove type-item duplicates** (*ja · mówić* ×4).  
4. **Don’t show my/wy forms as quiz choices** until those persons are in the intro.

### P1 — redesign content
5. Rewrite **a1_present** → first class only (recommend **mieszkać -am** first: regular, clean).  
6. New packs (or spine steps) for **mówić/lubić** and **chcieć**.  
7. Retarget **want·like** to after chcieć/lubić unit.  
8. **Gym:** one pattern per gym, or mixed only after two classes.

### P2 — system
9. Codex + SEQUENCING: class structure IDs.  
10. Verb inventory table: lemma → class → first teach node.  
11. Auditor: flag `uses` of `present_e_isz` before that node is live.  
12. UI titles: *Teraźniejszy · wzór mieszkać* not *ja/ty/on*.

---

## 8. Suggested first class (opinion)

**Start with *-am* (mieszkać)**  
- Very regular 6-person grid  
- Easy to contrast with być/mieć  
- Free-time “I live / I read” later  

Then **mówić + lubić** as second class (same-ish -isz family).  
Then **chcieć** alone (different -esz).

---

## 9. What not to change (yet)

- Być / mieć as specials  
- Food *Mam…* bank  
- Dom / poss / gender  
- Default 12-per-stage rule  
- Full-word Pisanie for case; for present, prefer full form of verb, not only ending, once redesign lands  

---

## 10. P0 shipped (2026-07-30)

| Done | Detail |
|------|--------|
| One class per pack | `a1_present` (-am), `a1_present_e_isz`, `a1_present_e_esz` |
| Full 6 persons | Intro grids + match/quiz/type/use for each class |
| No type duplicates | Clean 12 one-word forms per pack |
| Quiz only taught persons | my/wy/oni included **after** intro grids |
| Path | mieszkać → mówić/lubić → chcieć → gym → free time |
| Tags | `present_am` / `present_e_isz` / `present_e_esz` (+ legacy `present`) |

## 11. Effort sketch

| Task | Size |
|------|------|
| Split present into 2–3 teach units + path | Medium |
| Rewrite gym | Small–medium |
| Retarget free time / want·like tags + sentences | Medium |
| Sequencing IDs + auditor | Small |
| Full traditional class list in codex | Small doc |

---

## Bottom line

You are right: **all six persons** forces a thinner unit — and that is correct pedagogy.  
The current pack is the opposite trade: **many patterns, few persons**.  

**Change:** one conjugation class per unit · 6 persons · 1–2 verbs · then use · then next class.  
That is the organisation that will save pain later.


