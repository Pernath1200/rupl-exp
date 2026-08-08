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

Running scope: **883 rows at start · 811 remaining** (88 A1 · 278 A2 · 445 B1).

---

## 2026-08-08 · batch 2 — cloud routine

Built **3 packs**, `a2_people3`, `a2_world` and `a2_subjects` (35 gap rows
consumed: 34 authored, 1 dropped as already taught), teaching **36 words** — the
extra three over the row count are cross-check folds that no Oxford row asked
for. Audit 0 errors after each pack, 7 warns, all seven pre-existing and none of
them these packs' (`teaches_empty_grammar` on the five which-case units, which
carry empty teaches by design, plus the two long-standing review nodes
`a2_prep_review` and `b1_two_futures`). Committed and pushed one pack at a time.

Placement follows batch 1 unchanged — indices 104, 105, 106, after
`a2_wrapup_func` and batch 1's three packs, still before the permanent
placeholder `a2_station_4`. The open question about whether new vocab should sit
*before* the level's capstone instead is still open and still James's; nothing
was moved.

### `a2_people3` — „Kto to jest?" / People around us · path index 104

**Grouping rationale.** Twelve nouns for *kinds of person* — facet, dziewczyna,
chłopak, chłopiec, dzieciak, król, królowa, bohater, prezydent, przywódca, tłum,
publiczność. The theme was carved to avoid two packs that already exist:
`a2_jobs2` owns what someone does for a living and `a2_people2` owns what someone
looks like and is like, so this one takes who somebody *is*. Nine are Oxford A2
rows; three are cross-check folds (below). It rides the **nominative and nothing
else** — every noun appears in its citation form in every sentence — so no case
form had to be taught at all. `to_jest`, `byc_present`, `byc_adj`, `zgoda`,
`ten_ta_to`, `poss_nom`, `past_byc`, `prep_w_loc`, `present_am`, `present_uje`,
`present_e_isz` and `miec_acc` are all long live.

**Three words folded in from the cross-check, and this is the batch's clearest
finding.** `dziewczyna` (175), `chłopak` (275) and `chłopiec` (315) are not
Oxford gap rows and never will be: the Oxford route asks for English concepts,
and *girl* and *boy* are A1 concepts that RUPL looks like it covers. It does not
— `check_new.py` reports all three genuinely untaught. **The gap file cannot see
this class of hole at all**, because it diffs English glosses; only the Polish
cross-check can. `dzieciak` (434) was chosen independently on thematic grounds
and then turned out to be in the cross-check too.

**Judgment calls.**

1. **The second block is a gender board, not a case board.** With no case to
   show, the block drills what actually is load-bearing for these words — which
   of *ten* / *ta* each takes — and deliberately carries the two an English
   speaker gets wrong: `przywódca`, which ends in -a and is masculine, and
   `publiczność`, which ends in a consonant and is feminine.
2. **No icons anywhere in the pack.** 👑 was drafted for `król` and cut because
   `królowa` sits four rows below it and the emoji points at both; 👥 was drafted
   for `tłum` and cut because it reads as *two people* and `para` is already
   taught as *pair*. a2_places2's rule (a visual anchor pointing at an
   already-taught different word is worse than none) removes the whole set here.
3. **`popularna` was wanted and refused by the pool** — only the masculine
   `popularny` is taught. The sentence moved from `królowa` to `król`, where the
   taught form fits. Third batch running that this trap has fired.
4. **`nowego` is taught and was deliberately not used.** It sits in the pool only
   inside `nic nowego`, where it is a genitive after *nic*. Reusing it as the
   masculine-animate accusative (*mam nowego chłopaka*) is the AGENTS.md
   homograph trap exactly; keeping every noun nominative means the question never
   arises.
5. **`chłopak` and `chłopiec` are glossed apart and explained.** Both are 'boy'
   in a dictionary; in use `chłopiec` is a child and `chłopak` is a young man or
   a boyfriend. Unfenced, the learner produces *mój chłopiec* for a partner.
6. **No plurals.** Masculine-personal plurals (chłopcy, królowie, bohaterowie)
   are a virile paradigm this pack has no business opening. `tłum` and
   `publiczność` are exactly the two words that let a learner talk about many
   people with a singular verb, and their explains say so.

**Words skipped, and why.**

- **`couple` — dropped without authoring.** `a1_ideas` already teaches `para`,
  glossed *pair*. Same class as batch 1's `chef`: the gap file is an
  English-gloss diff, so a Polish word already taught under a different English
  label looks available. Row deleted, nothing authored.
- **`lady` — row KEPT, deliberately, against the obvious call.** `pani` is
  taught, and deleting the row on that basis was the tempting move. It was not
  taken: `pani` is an address form (*Pani Anno*, *czy mogłaby pani…*), not the
  noun *a lady walked in*, and the batch-1 `chef` precedent covers words whose
  Polish realisation is genuinely the same, not words that merely overlap. A kept
  row costs nothing; a wrongly deleted one loses coverage silently.

### `a2_world` — „Świat" / The world: land, sky and what it holds · path index 105

**Grouping rationale.** Twelve Oxford-A2 nouns for the physical world — księżyc,
planeta, ocean, wybrzeże, dolina, pustynia, kontynent, skała, region, złoto,
srebro, prąd. `a1_nature` already owns niebo, słońce, gwiazda, morze, jezioro,
wyspa, las, góra, rzeka, ziemia, kamień, drzewo and świat; those are anchors and
the pack leans on them hard (*Ocean jest większy niż morze.*). The second block is
a locative board copied from `a2_places2`, so the pack rides `prep_w_loc` /
`prep_place`. The four rows Oxford lists as adjective/noun or noun/verb (gold,
silver, rock, desert) are **authored in the noun sense only** — recorded so a
later batch does not assume the adjective is covered.

**The adjective pool, not the nouns, decided the word list — and this is now the
build's binding constraint.** Batch 1 flagged untaught gender forms of taught
adjectives as the likeliest way a vocab pack leaks. Measured properly this run,
it is worse than a stray trap. Of `zimny`, `suchy`, `mokry`, `szary`, `zielony`,
`ciekawy`, `niebezpieczny`, `ciemny`, `jasny` and `wysoki`, **not one has a
taught neuter form**, and in the feminine only `wysoka`, `spokojna`, `zimna` and
`gorąca` survive. `drewno`, `metal`, `gaz` and `zanieczyszczenie` were dropped
from the draft list for exactly this reason — three neuters were already at the
limit of what can truthfully be said about them — and the three that stayed are
described with `duże` / `małe` / `nowe` / `droższe` / `tańsze`, the neuter forms
the pool actually has. **This is not a nuisance, it is a shape: the vocab build
can add nouns freely and can barely describe them.** Recorded under "Open for
James" below, because the fix is a grammar decision, not a vocab one.

**Judgment calls.**

1. **`na Księżycu` is capitalised** and its explain says why: as the name of our
   moon it is a proper noun, the same rule that gives `Polska` a capital and
   `polska książka` none — a rule `a2_countries` already teaches as content, so
   this is recycled rather than new. The lowercase spelling is in `accepts`.
2. **The preposition is part of the lexical item, not derivable.** `na Księżycu`,
   `na wybrzeżu` and `na pustyni` take *na*; `w oceanie`, `w dolinie` and
   `w regionie` take *w*. Nothing in the meaning predicts the split, so the block
   teaches whole phrases and the explain tells the learner to take each one whole
   — the treatment `a2_places2` gives `na dachu` against `w kościele`.
3. **`dużo` + genitive plural was checked before use rather than assumed.** The
   course already ships 56 instances (`dużo wody`, `dużo książek`, `dużo gazet`),
   so *dużo ryb* and *dużo parków* are recycled, not introduced.
4. **No icons except 🌙.** 🌊 was drafted for `ocean` and cut because it reads as
   `morze` or `woda`, both taught; the desert and mountain emoji carry variation
   selectors of the kind `a2_countries` found not to render on Win10.
5. **No plurals.** `planety`, `oceany`, `doliny`, `skały` would all be new forms,
   and `skały` and `doliny` are the AGENTS.md homograph shape exactly — identical
   to the genitive singular. A pack with no need of them does not open it.

### `a2_subjects` — „W szkole 2" / School subjects & study · path index 106

**Grouping rationale.** Twelve school and study nouns — matematyka, fizyka,
chemia, biologia, architektura, ankieta, odkrycie, wynalazek, rysunek, esej,
wstęp, pamiętnik. Thirteen gap rows, because Oxford lists *mathematics* and
*maths* separately and both are `matematyka`. `leaf_school_a1` and `a2_school2`
own szkoła, uczeń, student, klasa, lekcja, wykład, uniwersytet, egzamin,
sprawdzian, zadanie, zdanie, ocena, błąd, zeszyt, tablica, przedmiot, powtarzać,
zdać, oblać — anchors, never re-taught.

**The node id is `a2_subjects`, not `a2_school2` — and that was a caught
mistake, not a preference.** The pack was drafted under `a2_school2`, which is a
**live node at path index 80** („W szkole" / Learning & school). The draft
overwrote its content file; the audit caught it immediately (8 errors, all
`lemma_not_unlocked` on words the old pack teaches — powtarzam, powtarzać,
zeszyt, zadanie), the file was restored from HEAD and verified byte-identical to
the pre-run tip, and the new pack was re-issued under a free id. Nothing was
committed in the broken state. **The lesson generalises: `check_new.py` checks
words, not node ids, and the vocab build will keep reaching for obvious ids that
A1/A2 already hold.** Check `tree.json` for the id before writing the file.

**This pack is built on verbs because the adjectives do not exist.** The natural
things to say about a school subject are that it is hard, easy, important or
interesting. The pool has **none** of `trudny`, `łatwy`, `ważny` or
`interesujący` in any gender, and `ciekawy` only in the masculine, which is no
use to six feminine nouns. Rather than bend the grammar or invent a form, the
pack says what you *do* with a subject — *Studiuję fizykę*, *Lubię biologię*,
*Moja siostra lubi chemię* — which is the more useful Polish in any case. It is
the same finding as `a2_world`'s, arriving from the opposite direction.

**Judgment calls.**

1. **The second block is an accusative board and so was `a2_food3`'s**, one batch
   earlier. The repeat is deliberate and named rather than hidden: the accusative
   is what these nouns need, -a → -ę is the most productive ending an A2 learner
   meets, and inventing a different block to avoid looking repetitive would have
   cost the pack its point. It earns its place by carrying the **-ia → -ię** pair
   (chemia → chemię, biologia → biologię) that food3 had no example of, and by
   closing with *Lubię rysunek* to show a masculine that does not move.
2. **Two explains were rewritten after a pool check.** The first drafts cited
   `odkryć` and `pamiętać` as roots; neither verb is taught anywhere. **An
   explain may not introduce Polish the learner has not met, even in passing** —
   the auditor does not read explains, so this fence is authoring discipline
   only. A third draft named `kalendarz` to fence *diary* and was rewritten in
   English for the same reason.
3. **`ankieta` is glossed 'survey (a set of questions)'** — an English speaker
   reading *survey* may reach for a land survey or a general look-round, and the
   Polish word is only the questionnaire sense.
4. **`wstęp`'s explain names the 'entry' sense** as well as the book sense, so a
   learner meeting *Wstęp wolny* on a door does not read it as 'free
   introduction'.

**Word skipped, and why.**

- **`wiedza` ('knowledge') — drafted and cut, row KEPT in the gap file.** It is
  abstract, and with no taught word for hard, easy, important or useful there was
  nothing true to say about it at this level. `pamiętnik` took its slot —
  concrete, a real Oxford A2 row (*diary*), and easy to talk about. Nothing was
  authored and nothing deleted; a later pack with a wider adjective pool should
  take it.

**No word in this batch was skipped for needing a new structure.** All three
packs ship `teaches_structures: []`.

### Verification beyond the auditor

The same token-level check batch 1 describes was run on all three packs, plus
the phrase-aware refinement it needed: every Polish token in every `pl` field —
block items, sentences and every `accepts` variant — resolves to the pack's own
`teaches_lemmas`, the position-aware pool at that pack's own index, or
`GLUE_LEMMAS`, with multi-word pool lemmas (`w domu`, `po polsku`) stripped whole
first so that a bare preposition counts as known only when its whole taught
phrase is present. Also checked mechanically on every pack: no `uses_lemmas`
entry absent from the pool, no `teaches_lemmas` entry the pool already contains,
every `teaches_lemma` surfacing in a block item, every taught form used in a
sentence declared in that sentence's `lemmas`, no `teaches`/`uses` overlap, no
duplicate answer inside a block or across the sentences under a normaliser that
lowercases and strips punctuation, and a gender badge on every citation noun with
none on any phrase. **Zero findings on all three shipped files.** The pool was
regenerated with `--before a2_station_4` before each pack, so each was written
against a pool that includes the packs shipped earlier in the same run.

### The cross-check, second reading — folding it in deliberately works

All 36 words were run against `pl-frequency-crosscheck.tsv`. **Seven are in the
Polish corpus top 1,000** — dziewczyna (175), facet (214), chłopak (275),
chłopiec (315), dzieciak (434), król (625), prezydent (738) — against **two of
thirty-seven in batch 1**. The whole of the improvement is `a2_people3`, and
almost all of it is the three words that were folded in *from* the cross-check
rather than found in Oxford. That is the reorientation doc's prediction holding
in both directions: the Oxford route imports English concept-frequency and will
not close the Polish gap on its own, and the cross-check does close part of it
when it is used as a source rather than as an audit.

**The structural finding from batch 1 is unchanged and unaddressed:** the
cross-check's own top is almost entirely prepositions governing cases, pronouns
with paradigms, and verbs needing conjugations — `dla` (46), `taki` (63), `sam`
(68), `zostać` (73), `swój` (81), `ktoś` (82), `inny` (102), `znaleźć` (104),
`potrzebować` (117), `każdy` (135), `wrócić` (140), `rozumieć` (146), `wziąć`
(153) — which is precisely what the zero-new-structures rule forbids. Nothing was
done about it here either. James's two options are unchanged: accept it, or
commission a short grammar series for the highest-value governors, which is a
spine decision and not vocab-batch work.

**Foldable plain nouns noticed in the cross-check top 450 and not yet used**,
now that people are done: `prawda` (92), `sprawa` (129), `chwila` (169), `pomoc`
(246), `śmierć` (249). All need no structure. They are the spine of an
abstract-nouns pack, and `śmierć` also sits in the A2 gap list as *death*, so
that one closes a row as well as a hole.

### An unrelated finding, recorded rather than fixed

`pan` and `pani` are listed in `a1_home_family`'s `teaches_lemmas` but **appear
in no block item and no sentence of that pack**. They are met later — in
`a2_ordering_func`, `b1_polite`, `b1_vocative_chunks` — as the polite address
form, so the learner does meet them, but the declaration at path 3 is a genuine
every-form-taught gap: the auditor is satisfied by a tag that teaches nothing.
Found while adjudicating the `lady` row. **Not fixed** — it is an A1 pack outside
this run's scope and changing it would move an anchor the whole course rests on.

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

**One word folded in from the cross-check.** `policja` (rank 303 in
`pl-frequency-crosscheck.tsv`) is not an Oxford gap row, but it is thematically
adjacent to `złodziej` / `żołnierz`, is a plain noun needing no structure, and
sits high in Polish corpus frequency — so the cross-check's own instruction
applied and it was added, with a sentence (*Policja była w sklepie.*) that pairs
directly with the thief sentence before it. It is the institution; `b1_people`
teaches `policjant`, the person, at index 117, and the two do not collide. Its
explain names the singular/plural mismatch — English *the police were*, Polish
`policja była`.

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

## The cross-check has a finding, and it is a design question, not a bug

`codex/vocab/pl-frequency-crosscheck.tsv` was run against all 37 words this
batch teaches. **Two of them appear in the Polish corpus top 1,000:** `żołnierz`
(881) and `prawnik` (954). One more, `policja` (303), was pulled *from* the
cross-check rather than found in it. The other 34 do not appear at all.

That is the known weakness of the Oxford route behaving exactly as
`VOCAB-REORIENTATION-2026-08-07.md` predicted — English concept-frequency is
being imported, and it does not line up with Polish. It is not an argument
against the batch: these are real, useful, level-appropriate words, and the
Oxford banding is why they are junk-free. But it means **the Oxford list alone
will not close the Polish-specific gap**, and the cross-check file is not a
garnish.

**The problem is that the cross-check's own top is almost entirely off-limits
under the zero-new-structures rule.** Its highest-ranking untaught items are
`dla` (46), `taki` (63), `sam` (68), `by` (70), `zostać` (73), `swój` (81),
`ktoś` (82), `jakiś` (95), `inny` (102), `znaleźć` (104), `potrzebować` (117),
`każdy` (135), `wrócić` (140), `rozumieć` (146), `wziąć` (153), `żaden` (157),
`wiele` (171), `zacząć` (173), `pamiętać` (179), `przestać` (183). Every one is
a preposition governing a case, a pronoun/determiner with a paradigm, or a verb
needing a conjugation — that is, **precisely the material the constraint that
makes this work safe also forbids.** `wiele` is the exception that proves it:
`c1_quantifiers` already teaches it, at C1, because it needed a structure.

So the batches can keep producing good A2/B1 nouns and adjectives indefinitely,
and the 62%-of-top-500 number will barely move, because what is missing from the
top 500 is function words. **This is James's call and nothing was done about it
here.** The two honest options look like: (a) accept it — vocabulary breadth is
the goal, corpus coverage is not, and the function words arrive as small
grammar units later; or (b) commission a short series of *grammar* units for the
highest-value governors (`dla` + genitive, `swój`, `każdy` / `żaden` / `inny`,
and a perfective-verb set), which is a spine decision, not vocab-batch work.
Nothing in the routine authorises starting (b), and it was not started.

Foldable nouns noticed in the cross-check top 400 and **not** used, because they
belong to people/abstract themes rather than to this batch's three:
`dziewczyna` (175), `facet` (214), `pomoc` (246), `śmierć` (249), `chłopak`
(275), `imię` (307), `chłopiec` (315), `szansa` (328), `miłość` (352). They are
plain nouns, need no structure, and are the obvious spine of a
people-and-feelings pack in batch 2.

## Open for James to overrule

- **Placement convention.** Batch 1 put its pack *after* the level's capstone
  (`a2_wrapup_func`). If new vocab should instead sit *before* the capstone so
  the capstone stays genuinely last, say so once and every later batch follows
  — it is a one-line move per pack, with no content consequences.
- **Carried in from the repair queue, still unresolved and untouched here:** the
  161 `accepts` fold variants across 18 packs that suppress the „z ogonkami"
  correction. Unrelated to vocab work, recorded so it is not lost.

Added by batch 2:

- **THE ADJECTIVE GAP, and it is the biggest thing this build has found.** The
  course teaches adjectives overwhelmingly in the masculine. Measured against the
  pool at path 106: of `zimny`, `suchy`, `mokry`, `szary`, `zielony`, `ciekawy`,
  `niebezpieczny`, `ciemny`, `jasny`, `wysoki`, **not one has a taught neuter
  form**, and only four survive in the feminine. `trudny`, `łatwy`, `ważny` and
  `interesujący` are taught in **no** gender at all. The consequence is concrete
  and it shaped two of this batch's three packs: a vocab pack can add nouns
  freely and then cannot say the true, obvious thing about them — *Matematyka
  jest trudna* is not writable, and four planned words were dropped because
  nothing could be said about them. Batches will keep steering around this and
  the packs will keep getting slightly thinner than they should be. Two honest
  options, and the choice is yours: (a) a small **adjective-forms** unit or vocab
  pack that fills in the feminine and neuter of the adjectives already taught —
  cheap, teaches no new lexis, and `zgoda` is live so it needs no structure; or
  (b) let each vocab pack teach the gender forms it needs as it goes, which is
  legal today but scatters the same paradigm across a dozen packs. **Nothing was
  started**; (a) looks like a spine decision and this routine does not authorise
  one.
- **Transparent loanwords, carried forward from batch 1 unanswered.** Batch 1
  asked whether words like `pub` should simply be struck from the gap list rather
  than authored. Batch 2 hit it again — `ocean`, `region`, `metal` and `esej` are
  wholly or nearly identical to their English source. `metal` and `gaz` were
  dropped from `a2_world` for a different reason (the adjective gap), so no ruling
  was forced, but the question is now live in every batch. A one-line answer sets
  the rule for the rest of the build.
- **Check the node id, not just the word.** `a2_subjects` was drafted as
  `a2_school2`, which is a live node; the draft overwrote its content file and the
  audit caught it. Restored and verified byte-identical before anything was
  committed. Recorded here because it is a build-process gap rather than a
  judgment call — `check_new.py` triages words and nothing triages ids.
