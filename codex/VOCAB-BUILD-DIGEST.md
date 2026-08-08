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

Running scope: **883 rows at start · 846 remaining** (88 A1 · 313 A2 · 445 B1).

---

## 2026-08-08 · batch 1 — cloud routine

Built **3 packs**, `a2_jobs2`, `a2_places2` and `a2_food3` (37 gap rows
consumed: 36 authored, 1 dropped as already taught). Audit 0 errors after each,
7 warns —
all seven pre-existing and none of them these packs' (`teaches_empty_grammar` on
the five which-case units, which carry empty teaches by design, plus the two
long-standing review nodes `a2_prep_review` and `b1_two_futures`).

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

### `a2_places2` — „W mieście" / Buildings & places · path index 102

**Grouping rationale.** Twelve Oxford-A2 building/place nouns as one theme —
kościół, fabryka, pałac, więzienie, dach, schody, wieża, brama, galeria,
parking, hala, pub — plus six locative phrases built from them. Same sequencing
logic as `a2_jobs2`: `prep_w_loc` and `prep_place` have been live since A1, so
placing a thing somewhere needs nothing new. Rides `to_jest`, `byc_present`,
`byc_adj`, `zgoda`, `existential_jest`, `prep_w_loc`, `prep_place`, `past_byc`,
`ten_ta_to`, `present_uje`, `plural_nom`, `question`. A1/A2 already own dom,
sklep, szkoła, szpital, bank, poczta, apteka, hotel, restauracja, kawiarnia,
kino, park, rynek, plac, most, dworzec, przystanek, lotnisko — anchors, never
re-taught.

**Placement.** Path index 102, directly after `a2_jobs2` and still before
`a2_station_4`. It recycles `złodziej` from `a2_jobs2` in *Złodziej był w
więzieniu.* — the first time vocab-gap material anchors later vocab-gap
material, which is the mechanism AGENTS.md prefers over gyms.

**No word was skipped this pack** — nothing needed a new structure, and
`check_new.py` found none of the twelve already taught.

**Judgment calls.**

1. **The title. „Miejsca 2" was the obvious match to `a1_places` („Miejsca")
   and was rejected** — the plural `miejsca` is in no pack's `teaches_lemmas`,
   only the singular `miejsce`, and a title may not carry an untaught form.
   **„W mieście"** uses the taught locative phrase whole, on the `a2_work2`
   („W pracy") pattern.
2. **Two sentences were written, then failed the pool check, then rewritten.**
   *To jest stare więzienie.* and *Te schody są stare.* both leaned on `stare` —
   the neuter singular and non-virile plural of `stary` — which is **taught
   nowhere**. The pool has stara / stary / starsza / starsze / starszy and stops
   there. Rewritten to *To jest duże więzienie.* and *Te schody są nowe.*, both
   using forms that are taught. Recording this as a class: **assuming a
   paradigm is complete because its citation form is taught is precisely the
   failure the pool exists to catch**, and it survived my own drafting until the
   token check.
3. **`kościół` → `w kościele` keeps the ó → o alternation**, taught with an
   explain that calls it a small closed set and tells the learner to take the
   pair whole rather than look for a rule. A sound change inside one word, not a
   system — no structure ID, same treatment as `sportowcem` in `a2_jobs2`.
4. **`schody` is plural-only**, handled exactly as `a2_house` handles `meble`:
   gender `pl`, always `są`, no singular anywhere, and an explain that names the
   English parallel (*stairs*).
5. **`galeria` is glossed "gallery (for art)" deliberately.** In everyday Polish
   it far more often means a shopping mall; the gloss has to fence the sense the
   pack teaches, or the learner meets the other one in Poland and concludes the
   course was wrong.
6. **Two emoji were rejected as visual anchors:** 🚪 for `brama` (it reads as
   `drzwi`, already taught) and 🏠 for `dach` (it reads as `dom`). A visual
   anchor that points at an already-taught different word is worse than no
   anchor; those two items carry the English gloss alone.

**Verification beyond the auditor.** Same token-level check as `a2_jobs2`, and
it is what caught the `stare` problem. Zero findings on the shipped file.

**For James to smoke-check.** `pub` earns its slot least of the twelve — it is
a real Polish word and a real Oxford A2 row, but it is transparent to an English
speaker and teaches almost nothing. If transparent loanwords should simply be
struck from the gap list rather than authored, say so and the rule will apply
from batch 2 (there are perhaps a dozen more of them in the A2 remainder).

### `a2_food3` — „Jedzenie 3" / Food & cooking 3 · path index 103

**Grouping rationale.** Twelve Oxford-A2 food and kitchen nouns — fasola,
wołowina, ciastko, miska, cytryna, orzech, sos, przepis, piekarnik, kuchenka,
olej, frytki. The three packs of this batch were deliberately built on three
*different* already-taught frames so the batch does not drill one slot to death:
`a2_jobs2` rides `inst_identity`, `a2_places2` rides the locative, and this one
rides the **accusative**. `miec_acc` has been live since A1 and `a1_shopping` /
`a1_freetime` already demand kawę, herbatę, zupę, muzykę, grę, so nothing here
is new machinery. a1_food and a2_food2 own the whole staple list (chleb, mleko,
ser, ryż, mięso, jajko, masło, cukier, talerz, widelec, nóż, łyżka…) — anchors,
never re-taught.

**Placement.** Path index 103, after `a2_places2`, still before `a2_station_4`.

**Nothing was skipped for needing a structure**, and `check_new.py` found all
sixteen forms (twelve nouns plus four accusatives) genuinely new.

**Judgment calls.**

1. **Block 2 mixes what changes with what does not, on purpose.** Four feminine
   accusatives (fasolę, wołowinę, cytrynę, miskę) sit beside a masculine
   inanimate and a plural that are identical to their citation forms (*Kupuję
   olej*, *Lubię frytki*). Both halves are behaviour the learner already has;
   putting them on one board makes the -ę ending informative rather than
   something to apply everywhere.
2. **Three adjectives were wanted and refused by the pool** — `żółta` for
   cytryna (only `żółty` is taught), `słodkie` for ciastko (only `słodka` /
   `słodki`), `gorące` for frytki (only `gorąca` / `gorący` / `gorąco`). Each is
   a gender form of an adjective whose citation form *is* taught: **the same
   trap as `stare` in `a2_places2`, three more times in one pack.** The
   sentences were rewritten around taught forms. Two packs in a row have hit
   this, so it is now the single most likely way a vocab pack leaks — flagged
   here as the thing to check first in batch 2.
3. **`przepis` is glossed "recipe (for cooking)"** and carries an explain that
   names `recepta` (*prescription*, `a2_health2`) and tells the learner they are
   two different words. An English speaker will otherwise map "recipe" onto
   recepta on sight.
4. **`orzech` gets one sentence, not two.** Every natural second frame needed a
   plural (`orzechy`) or a locative (`w torcie`, `w misce`) that is taught
   nowhere. Padding the pack would have cost an untaught form; a word with one
   good sentence is the better trade.
5. **`fasola` is singular in Polish** where English says *beans are* — given its
   own explain, since the mismatch is invisible otherwise. `frytki` is the
   mirror image, plural-only like `meble` and `schody`, and its explain points
   back at both.
6. **`Mamy nowy piekarnik.` uses `mamy` as the verb**, which is how `a1_miec`
   teaches it. AGENTS.md's homograph example is `mamy` read as the genitive of
   `mama` — that is the reading this pack does *not* use, and no sentence here
   goes near it.

**Verification beyond the auditor.** Same token-level check. Zero findings on
the shipped file.

---

## Open for James to overrule

- **Placement convention.** Batch 1 put its pack *after* the level's capstone
  (`a2_wrapup_func`). If new vocab should instead sit *before* the capstone so
  the capstone stays genuinely last, say so once and every later batch follows
  — it is a one-line move per pack, with no content consequences.
- **Carried in from the repair queue, still unresolved and untouched here:** the
  161 `accepts` fold variants across 18 packs that suppress the „z ogonkami"
  correction. Unrelated to vocab work, recorded so it is not lost.
