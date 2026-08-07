# "Który przypadek?" — the case-selection units

**James-locked, 2026-08-07 (dropdown session). Build these BEFORE further C1
units** — they serve the level he is actually studying, and his own report is
the reason they exist: *"I am not totally clear when to use each case."*

If the person building the course cannot always pick the case, the course is
teaching **forms** without teaching **selection**. The gyms drill endings; they
were never a lesson in choosing.

## The four locked decisions

| # | Decision |
|---|----------|
| 1 | **Organised by TRIGGER, not by case.** The governor is what the learner meets first in a real sentence, so the unit is a trigger map: *after `nie ma` / `do` / `z` / `dużo` / `blisko` → Genitive*. Never "the Genitive has six jobs" — that is a reference shape, not a decision shape. |
| 2 | **A new unit, placed immediately BEFORE that level's case gym.** One unit explains the choice, the gym then drills it at speed. The gyms keep their zero-new idiom untouched; their cramped intro tables become a real lesson upstream. |
| 3 | **All five levels get one** — A1, A2, B1, B2, C1. The case inventory grows at every level, so the map is restated each time with the new arrivals folded in. Every level stays under James's 60-unit ceiling. |
| 4 | **`data/case-map.json` is the single source of truth.** The units author from it; the in-app **Przypadki** panel renders from it. Add a row there whenever a new governor ships — never let the two drift. |

## Unit contract

- **Teaches nothing new.** `teaches_lemmas: []`, `teaches_structures: []`. Every
  trigger, noun and ending is already owned at that path position. This is the
  `b1_two_futures` / `b2_case_gym` genre: pure discrimination.
- **Intro = the trigger table for that level**, cumulative. Take the rows from
  `case-map.json` whose `taught_by` sits at or before this unit on
  `path_order` — that set IS the lesson, and it is verifiable, not authored
  from memory. Group by case for readability, but lead each row with the
  trigger.
- **The honest line every one of these units must carry:** the case is chosen
  by the word in front of it, not by the meaning in English. `w` + Locative and
  `do` + Genitive are both "place"; `z` takes Genitive for *from* and
  Instrumental for *with*. Say this plainly — it is the actual difficulty.
- **Kontrola** = situation → which case (name the case, or pick the right form).
  **Pisanie** = short frames obeying the ≤3-word rule; anything composed is a
  `mode:"cloze"` item blanking the governed noun.
- **Użycie** = real sentences where the trigger decides the ending.
- Cases the level has not taught **do not appear** — not as distractors, not in
  the table, not in an aside.

## Per level

| unit | sits before | folds in (new since the previous map) |
|---|---|---|
| `a1_which_case` | `a1_case_gym` | Nom (naming, subject) · Acc (`mam`/`piję`/`chcę`) · Gen (`nie ma`, `do`, `z/ze`, `dużo`/`blisko`) · Loc (`w`/`na` = where) · Inst (`jestem` + job). **The four-vs-five point:** `z` already does two jobs by A1's end. |
| `a2_which_case` | `a2_case_gym2` | Gen plural + `pięć`+ counting · `z` + Instrumental (with a person) · transport Instrumental with no preposition at all · `o` + Locative (about) · the `mi`/`mnie` Dative chunks, named as a case doing a job for the first time. |
| `b1_which_case` | `b1_case_gym` | the Dative as a real case (`pomagam`/`dziękuję`/`daję` + noun recipients) · the Dative pronoun set · `który` carrying a case from inside its own clause. |
| `b2_which_case` | `b2_case_gym` | the adjective agreeing in all five cases · negation taking Genitive on **any** verb, not just `nie mam` · `prosić o` + Accusative as `o`'s second job · the three plural obliques (`-ach`/`-ami`/`-om`). |
| `c1_which_case` | `c1_case_gym` | plural adjectives across the same five jobs · `na`/`przez`/`od` as governors · Genitive-taking verbs · everything C1 closed. This one is the **whole system on one page** and is the last teaching unit of the course before the capstone. |

## Build log

`codex/WHICH-CASE-DIGEST.md` — what shipped, the judgment calls, the
`case-map.json` corrections found while deriving the tables, and what James
should smoke-check. Read it before building the remaining units.

## Placement note for the builder

Insert each unit at `path_order.index(<its gym>)`. The A1–B2 units are being
added to already-complete levels: that is intended, and it is why they teach
nothing new — a learner who has finished the level loses nothing by meeting a
map of what he already owns, and James (mid-A2) meets them in sequence.
