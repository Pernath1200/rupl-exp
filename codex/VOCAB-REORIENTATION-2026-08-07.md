# Vocabulary reorientation — 2026-08-07

Follows `LEVEL-AUDIT-2026-08-07.md`. That audit counted **deck items**. This one
counts **lemmas**, measured against a frequency-ranked list of the target
language. Decisions taken with James in session; build not started.

---

## 1. Correction to the audit's own numbers

The audit warned that "2,600 taught forms" was inflected forms, not words — then
counted deck items, which has the same defect one level down. Inspecting the
upper-level packs:

- `b1_giving` — 15 items = **3 verbs** (`dawać/daję/dajesz/daje/dajemy/dajecie/dają`)
- `b1_journeys` — 18 items = **4 lemmas** (`zgubiłem/zgubiłam/zgubił/zgubiła`)
- `b1_people` — 21 items = **5 nouns** (`policjant/policjantka/policjanci/policjantki`)

So B1's "84 new words" is ~35 real words, and the B1 vocab packs are not
vocabulary units at all — they are paradigm drills delivering the dative,
past-tense gender and plural-personal payoffs. **That is why the shortfall went
unseen: the vocab slots at B1 were full, just not of lexis.**

B2 and C1 packs, by contrast, are clean lemmas.

## 2. Measured position

Method: OpenSubtitles-2018 frequency list → collapsed to lemmas via a
morphological dictionary (ambiguous forms split their count fractionally across
candidate lemmas, proper nouns dropped). Taught strings are lemmatised by the
same function, so both sides are counted identically. Tool: `codex/scripts/lex_coverage.py`.

### RUPL (Polish)

| level | deck items | lemmas | cumulative |
|---|---|---|---|
| A1 | 666 | 740 | 740 |
| A2 | 341 | 329 | 992 |
| B1 | 84 | 71 | 1,041 |
| B2 | 36 | 51 | 1,090 |
| C1 | 24 | 27 | 1,113 |

Grammar packs add 275 lemmas the vocab packs never teach → **1,388 total**.

| band | taught | % | missing |
|---|---|---|---|
| top 500 | 311 | **62%** | 189 |
| top 1,000 | 497 | 50% | 503 |
| top 2,000 | 763 | 38% | 1,237 |
| top 3,000 | 915 | 30% | 2,085 |
| top 5,000 | 1,116 | **22%** | 3,884 |

**The gap is not only at the top — it starts at the bottom.** 189 of the 500
commonest words in Polish are untaught, including `dla`, `przy`, `swój`, `taki`,
`sam`, `każdy`, `żaden`, `inny`, `jakiś`, `ktoś`, `wiele`, `prawda`, `sprawa`,
`chwila`, and the verbs `zostać`, `znaleźć`, `wrócić`, `wziąć`, `dostać`,
`rozumieć`, `pamiętać`, `zacząć`, `przestać`, `pozwolić`, `potrzebować`.

These are A1/A2 words. The audit's finding that "A1 and A2 are genuinely at
level" **does not survive this measurement** — they are at level for their own
chosen topics, but leave holes in the highest-frequency core. `swój` in
particular is not optional Polish.

### RUE (English) — a different shape

| level | deck items | lemmas | cumulative |
|---|---|---|---|
| A1 | 894 | 842 | 842 |
| A2 | 1,198 | 1,198 | 1,762 |
| B1 | 288 | 354 | 1,982 |
| B2 | — | 0 | — |
| C1 | — | 0 | — |

| band | taught | % |
|---|---|---|
| top 500 | 414 | **83%** |
| top 1,000 | 763 | 76% |
| top 2,000 | 1,243 | 62% |
| top 3,000 | 1,511 | 50% |
| top 5,000 | 1,787 | **36%** |

**RUE's problem is the opposite of RUPL's.** Its core is healthy — 83% of the
commonest 500, and an A2 that carries 1,198 lemmas against RUPL's 329. What RUE
has is a **cliff**: vocabulary stops dead after B1, with no B2 or C1 packs at
all. RUPL leaks at the base; RUE runs out at the top.

Consequence for sequencing: RUE needs *extension*, RUPL needs *extension plus
back-fill*. The back-fill is the more urgent of the two, because a missing `dla`
breaks sentences a learner meets on day one.

## 3. Decisions taken

| # | question | decision |
|---|---|---|
| 1 | target | **Read real Polish unaided** — ~4,000–5,000 receptive lemmas |
| 2 | timing | **Parallel night-shift branch**, while A2/B1 smoke by day |
| 3 | authoring shape | **Frequency-list driven bulk decks** |
| 4 | labels | **Split the claim in-app** — grammar to C1, vocabulary stated honestly |
| 5 | drill mode | **Two-speed** — core productive, outer receptive-only |
| 6 | word source | **Corpus-derived frequency list** |
| 7 | architecture | **Separate reading lane, level-gated** |
| 8 | scope | **Build for PL, design portable** |

## 4. Architecture — the reading lane

A parallel lane outside the node graph.

- **Teaches lemmas only. Introduces zero structures.** This is what protects the
  sequencing guarantee: the lane cannot violate "nothing used before it is
  taught" by construction, so the 0-errors-across-199-nodes result stands
  untouched. No lane deck may carry a `teaches_structures` entry.
- **Level-gated.** A level's lane band unlocks when that level's grammar is done.
- **Recognition-only modes** — `Dopasuj` + `Quiz`, direction PL→EN. No `Słowo`
  type-in, no `Zdanie` bank. This is the change that makes the volume possible:
  authoring drops to roughly one line per word.
- **Two-speed boundary.** The existing ~1,113 vocab-pack lemmas plus the back-fill
  of high-frequency core words stay on the full five modes (productive — he must
  be able to *say* these). Everything above sits in the lane (receptive).

Portability: the lane format is language-neutral — a frequency source, a lemma
table, banded decks, a gating rule. RUE and RUCZ adopt it by swapping the two
data sources and the item field, exactly as `lex_coverage.py` already does.

## 5. Open problem — the corpus is the wrong register

Flagging this rather than quietly proceeding, because it affects what gets built.

The frequency list is **OpenSubtitles — film dialogue**. Against a target of
*reading real Polish*, it is the wrong register. Its artefacts are visible in the
raw output: for Polish it surfaces `hej`, `zabić`, `oh`, `och`; for English the
untaught list is topped by contraction fragments (`'t`, `don`, `isn`, `wouldn`)
and subtitle noise (`uh`, `huh`, `gonna`, and a run of profanity).

**The raw missing-word lists are not a curriculum and must not be authored from
directly.** Two fixes, and this is a decision still to take:

1. **Blend with a written-register corpus** — Wikipedia dump frequency skews
   formal/encyclopaedic; subtitles skew spoken. A blend of the two is defensible
   for "reads newspapers *and* follows conversation".
2. **Filter and hand-check each band** before it becomes a deck — cheap for the
   first 2,000, expensive after.

Recommendation: do both — blend for ordering, hand-check each band before it
ships. The tokeniser also needs a contractions fix before the EN list is usable.

## 6. Build order

1. **Back-fill the core first.** The ~190 untaught words inside Polish's top 500,
   then the top 1,000. These go into the *productive* tier, not the lane — they
   are too common to be recognition-only. Highest value per unit of work in the
   whole plan, and it repairs A1/A2 rather than extending C1.
2. Blend the corpus, fix tokenisation, re-run coverage.
3. Build the lane machinery (recognition-only modes, gating).
4. Band and author the lane upward toward top-5,000.
5. Write the honest claim into the app.

Step 1 is worth doing even if everything after it is abandoned.

## 7. For the RUE tab

RUE work should be driven from the RUE session, not this one — `rue-exp` is on
branch `build` with the hourly cloud routine live, and a second writer risks
collision. The **measurement is read-only and already done** (numbers in §2).

Paste-able brief:

> Read `Documents/projects/rupl-exp/codex/VOCAB-REORIENTATION-2026-08-07.md`
> §2 and §4. The lexical-coverage tool is at `codex/scripts/lex_coverage.py` in
> rupl-exp and runs against rue-exp unchanged: `python lex_coverage.py en`.
> RUE's measured position: 1,982 taught lemmas, 83% of the commonest 500, 36% of
> the top 5,000, and **no B2 or C1 vocabulary packs at all**. RUE's fix is
> extension at B2/C1, not back-fill — its core is sound, unlike RUPL's. Apply the
> same reading-lane architecture: lemmas only, zero structures, level-gated,
> recognition-only modes. Note the corpus caveat in §5 — the English frequency
> list needs a contractions fix before use.

---

*Sources: [FrequencyWords, OpenSubtitles 2018](https://github.com/hermitdave/FrequencyWords) ·
[polimorfologik 2.1](https://github.com/morfologik/polimorfologik) ·
[lemmatization-lists](https://github.com/michmech/lemmatization-lists)*
