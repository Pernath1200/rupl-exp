# Vocabulary build digest — closing the Oxford A1–B1 gap

Design decision this implements: `codex/VOCAB-REORIENTATION-2026-08-07.md`
(decisions #9 cap at B1, #11 no reading lane, #12 Oxford wordlists).
Scope for this routine, as set by James 2026-08-08: **A2 rows first, then B1** —
his own level, ahead of the smaller A1 remainder and ahead of C1, which is out
of scope entirely.

**The invariant, every pack, no exceptions:** `teaches_structures: []`. That is
what makes bulk vocabulary safe without an engine change — the sequencing
audit's guarantee survives this work by construction rather than by care. A word
that cannot be taught without a new structure is skipped and logged, never
accommodated.

Running scope: **883 rows at start · 870 remaining** (88 A1 · 337 A2 · 445 B1).

---

## 2026-08-08 · batch 1 — cloud routine

Built **1 pack**, `a2_jobs2` (13 gap rows consumed: 12 authored, 1 dropped as
already taught). Audit 0 errors, 7 warns — all seven pre-existing and none of
them this pack's (`teaches_empty_grammar` on the five which-case units, which
carry empty teaches by design, plus the two long-standing review nodes
`a2_prep_review` and `b1_two_futures`).

### `a2_jobs2` — „Zawód 2" / Jobs & roles 2 · path index 101

**Grouping rationale.** Twelve Oxford-A2 job/role nouns taken as one theme —
architekt, prawnik, dyrektor, muzyk, malarz, pilot, żołnierz, złodziej,
sekretarka, sportowiec, profesor, biznesmen. The theme was chosen first for a
sequencing reason rather than a thematic one: `a1_inst_job` already owns
`inst_identity`, so every one of these words lands in a frame the learner has
had since A1 (*Jestem nauczycielem* → *Jestem architektem*) and the pack needs
no structure of its own. It rides `byc_present`, `inst_identity`, `poss_nom`,
`present_uje`, `prep_w_loc`, `past_byc`, `miec_acc`, `ten_ta_to`,
`existential_jest`, `question` — all live long before this slot.

A1/A2 already own nauczyciel, lekarz, kelner, kierowca, inżynier, rolnik,
sprzedawca, menedżer, szef, naukowiec, pielęgniarka, artysta, aktor, piosenkarz,
pisarz, tancerz, trener, dentysta. Those are anchors here and are never
re-taught; `szef` in particular is recycled as the anchor for *dyrektorem*.

**Placement.** Path index 101 — immediately after `a2_wrapup_func` (the A2
phrasebook capstone, index 100) and immediately before `a2_station_4` (index
101 before the insert). Chosen over placing it *before* the wrapup because
nothing then moves relative to anything else: the capstone keeps its position at
the end of the taught A2 material, and the new pack sits after all A2 grammar
and all existing A2 vocab, inside A2, ahead of the permanent station
placeholder that closes the level. Zero new structures means the exact slot is
not load-bearing; this is the choice that disturbs least.

**Words skipped, and why.**

- **`chef` — dropped without authoring.** `b1_people` already teaches `kucharz`,
  glossed *cook (m)*, with `kucharka` / `kucharze` / `kucharki` beside it. The
  Oxford row survived the gap-list generation only because the generator matched
  English glosses and RUPL's gloss says "cook", not "chef". Row deleted from
  `oxford-b1-gap.tsv`, nothing authored. **This is a class, not a one-off** — the
  gap file is an English-gloss diff, so any Oxford word whose Polish realisation
  is already taught under a different English label will look available. Every
  candidate goes through `check_new.py` first; this one is the first catch.

No word was skipped for needing a new structure this batch.

**Judgment calls.**

1. **The title. „Zawody 2" was rejected outright** — `a2_sport` already teaches
   `zawody` glossed *competition (sports event)*, so a plural title would have
   read to the learner as "Competitions 2". This is the homograph trap operating
   on learner-visible chrome rather than on an item. The singular `zawód`
   (`a2_work2`, *profession / trade*) is unambiguous, hence **„Zawód 2"**.
2. **One sentence was drafted and cut for the same reason.** *Muzyk gra w
   parku.* is pool-legal — `gra` is taught as the verb by `a1_present` — but
   `gra` is **also** taught as the noun *game* by `a1_freetime`, so the sentence
   is readable as "A musician, a game in the park". Replaced with *Ten muzyk
   jest popularny.*
3. **Instrumental forms are taught explicitly, not derived.** Nine whole
   *Jestem…* / *On jest…* phrases sit in block 2, so every instrumental any
   sentence demands appears in a block and in `teaches_lemmas` — the
   every-form-taught rule, handled the way `a2_countries` handles *Jestem
   Anglikiem*. The three nouns with no instrumental slot (złodziej, profesor,
   biznesmen) are used in the nominative only, and no sentence demands an
   instrumental for them.
4. **`sportowiec` → `sportowcem` was kept rather than dodged.** The -ec ending
   drops its e before any case ending. That is a lexical fact about one word,
   taught with an `explain` that says so plainly and calls it a quirk rather
   than a rule — the same treatment `a2_countries` gives *Anglik → Angielka →
   Angielką*. It is not a new system and does not need a structure ID.
5. **`pilot` is genuinely ambiguous in Polish itself** (it also means a TV
   remote control). That ambiguity is Polish's, not the course's; the ✈️ icon
   and the English gloss disambiguate the item, and no sentence leans on the
   other sense.

**Verification beyond the auditor.** The auditor matches declared tags, so a
token-level check was run on top of it: every Polish token in every `pl` field —
block items, sentences and every `accepts` variant — resolves to the pack's own
`teaches_lemmas`, the pool at path index 101, or `GLUE_LEMMAS`. Also checked
mechanically: no `uses_lemmas` entry that is absent from the pool, no
`teaches_lemmas` entry that the pool already contains (which would be silent
re-teaching), no duplicate answer inside a block or across the sentences, every
`teaches_lemma` surfacing in a block item, and a gender badge on every citation
noun with none on any phrase. Zero findings.

**For James to smoke-check.** The instrumental block asks for the whole phrase
(*Jestem architektem*) in the word stages. That is the `a2_countries` precedent
and it reads correctly, but it is the shape most worth a look in the hand.

---

## Open for James to overrule

- **Placement convention.** Batch 1 put its pack *after* the level's capstone
  (`a2_wrapup_func`). If new vocab should instead sit *before* the capstone so
  the capstone stays genuinely last, say so once and every later batch follows
  — it is a one-line move per pack, with no content consequences.
- **Carried in from the repair queue, still unresolved and untouched here:** the
  161 `accepts` fold variants across 18 packs that suppress the „z ogonkami"
  correction. Unrelated to vocab work, recorded so it is not lost.
