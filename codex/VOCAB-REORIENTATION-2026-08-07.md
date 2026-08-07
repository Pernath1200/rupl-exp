# Vocabulary reorientation — 2026-08-07

Follows `LEVEL-AUDIT-2026-08-07.md`. That audit counted **deck items**. This one
counts **lemmas**, then re-measures both apps against a CEFR-banded inventory.
Twelve decisions taken with James across three question rounds. Build not started.

**Covers both RUPL and RUE.** RUCZ is parked.

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

## 2. Measured position

### By lemma, against corpus frequency

Tool: `codex/scripts/lex_coverage.py` (language-neutral; runs against rue-exp
unchanged with `python lex_coverage.py en`).

| | vocab lemmas | +grammar | top-500 | top-5,000 |
|---|---|---|---|---|
| RUPL | 1,113 | 1,388 | **62%** | 22% |
| RUE | 1,982 | 1,982 | **83%** | 36% |

**RUPL's gap starts at the base, not the top.** 192 of the 500 commonest Polish
words are untaught, including `dla`, `swój`, `taki`, `sam`, `każdy`, `żaden`,
`inny`, `ktoś`, `wiele`, and the verbs `zostać`, `znaleźć`, `wrócić`, `wziąć`,
`rozumieć`, `pamiętać`, `zacząć`, `przestać`, `potrzebować`. These are A1/A2
words. **The earlier audit's "A1 and A2 are genuinely at level" does not survive
lemma measurement.** `swój` is not optional Polish.

### By CEFR band, against the Oxford 5000

The better measure, and the one the build now runs on. Coverage counts a word as
present if it appears in any English-bearing field of any pack — so these are
**floors**: the true gaps are larger.

| Oxford band | size | RUPL covered | RUE covered |
|---|---|---|---|
| A1 | 898 | 810 (90%) | 878 (98%) |
| A2 | 792 | 442 (56%) | 780 (98%) |
| B1 | 690 | 245 (36%) | 386 (56%) |
| **A1–B1 gap** | **2,380** | **883** | **336** |

**The two apps fail differently.** RUE's A1 and A2 are genuinely finished; its
whole deficit is one band wide, at B1. RUPL leaks across all three bands, worst
at A2 — which is exactly where Dad is heading next.

**Cross-check that matters:** two independent routes agree on RUPL's size —
Polish corpus frequency to a 2,250-lemma total gives **+862**; completing Oxford
A1–B1 gives **+883**. Different data, different method, same answer.

## 3. Decisions

Round 1 — framing:

| # | question | decision |
|---|---|---|
| 1 | target | Read real Polish unaided — **later superseded by #9** |
| 2 | timing | Parallel night-shift branch, while A2/B1 smoke by day |
| 3 | authoring shape | Frequency-driven bulk decks — **superseded by #12** |
| 4 | labels | Split the claim in-app |
| 5 | drill mode | Two-speed — **superseded by #11** |
| 6 | word source | Corpus-derived list — **superseded by #12** |
| 7 | architecture | Reading lane — **superseded by #11** |
| 8 | scope | Build for PL, design portable |

Rounds 2 and 3 — the build as it now stands:

| # | question | decision |
|---|---|---|
| 9 | **RUPL scope** | **Cap at B1** — +862/+883 to ~2,250 lemmas. The read-unaided target is retired. |
| 10 | **RUE scope** | **Clean to B1 now** (336 words); B2/C1 is a separate decision, deliberately not taken |
| 11 | **Architecture** | **No reading lane.** Ordinary thematic vocab packs, full five modes, existing quality bar |
| 12 | **Word source** | **Published CEFR wordlists** (Oxford 5000) rather than raw frequency |
| 13 | **RUE audit debt** | **Backfill `teaches_lemmas`** across RUE's 93 grammar packs |
| 14 | **RUE shape** | ~28 new thematic B1 packs of 12, matching current convention |
| 15 | **Build owner** | **One session drives both**, on a separate branch per repo |

### Why the lane was dropped

Everything inside a B1 cap is high-frequency core vocabulary, and core words
should be **produced**, not merely recognised. The receptive lane existed to make
4,000 words affordable; at 883 it is unnecessary machinery. This removes the
gating engine, the recognition-only modes, and the two-speed split in one stroke
— and it means **no app-code changes at all**, only content.

### Why Oxford rather than frequency

The OpenSubtitles list is film dialogue. Its artefacts were visible and
disqualifying: the English missing-list was roughly a quarter contraction
fragments (`don`, `isn`, `wasn`, `wouldn`), subtitle-speak (`wanna`, `gonna`,
`um`) and profanity. Oxford's banding is pedagogically curated, already
CEFR-aligned, and junk-free.

**Known weakness, carried deliberately:** there is no machine-readable Polish
CEFR wordlist — the state certification standards describe skills, not
inventories. So RUPL authors the **Polish realisation of the Oxford concepts**,
which imports English concept-frequency. `codex/vocab/pl-frequency-crosscheck.tsv`
holds the 502 untaught Polish lemmas inside the corpus top-1,000 as the guard
against that: anything there which the translated inventory does not produce is a
Polish-specific gap and must be added by hand.

## 4. Target lists — generated, ready to author

| file | rows | what it is |
|---|---|---|
| `rupl-exp/codex/vocab/oxford-b1-gap.tsv` | 883 | Oxford A1–B1 concepts with no Polish gloss (88 A1 · 350 A2 · 445 B1) |
| `rupl-exp/codex/vocab/pl-frequency-crosscheck.tsv` | 502 | high-frequency Polish lemmas the Oxford route may miss |
| `rue-exp/codex/vocab/oxford-b1-gap.tsv` | 336 | Oxford A1–B1 words absent from RUE (20 A1 · 12 A2 · 304 B1) |

Both gap files carry `band · word · part-of-speech` and a header stating the
floor caveat.

## 5. Build order

**RUPL** — bands in order, because A2 is where Dad arrives next:
1. The 88 A1 gaps, plus the top-500 Polish holes from the cross-check
   (`dla`, `swój`, `każdy`, `zostać`, `wrócić`…). Cheapest work in the plan and
   it repairs the level Dad is actually on.
2. The 350 A2 gaps — the widest band, and the one that most changes what he can read.
3. The 445 B1 gaps.

**RUE** — the reverse shape, because A1/A2 are done:
1. Backfill `teaches_lemmas` across 93 grammar packs. **Prerequisite** — without
   it RUE cannot be audited and every count stays a range rather than a number.
2. The 304 B1 words as ~26 thematic packs.
3. The 32 A1/A2 stragglers, mostly multi-word items (`have to`, `ice cream`,
   `next to`, `t-shirt`) and a compass/measurement cluster.

Sequencing discipline is unchanged: no pack may introduce a structure, every new
form must be declared, `check_new.py` before any string ships.

## 6. Open items

- **RUE's hourly cloud routine is live on branch `build`.** One writer per branch
  is the rule that has held all through the RUPL build — the routine must be
  paused or fenced before RUE vocab work starts.
- **B2/C1 for RUE is not decided.** Jan is C1–C2, Václav C1, Martina B1–B2, and
  RUE covers 27% of Oxford B2 and 9% of C1. A B1-capped RUE does not serve them.
  Deliberately left as its own decision rather than folded in here.
- **The in-app claim** still needs writing: grammar to C1, vocabulary to B1.

---

*Sources: [Oxford 5000 CEFR-banded](https://github.com/nalgeon/words) ·
[FrequencyWords, OpenSubtitles 2018](https://github.com/hermitdave/FrequencyWords) ·
[polimorfologik 2.1](https://github.com/morfologik/polimorfologik) ·
[lemmatization-lists](https://github.com/michmech/lemmatization-lists)*
