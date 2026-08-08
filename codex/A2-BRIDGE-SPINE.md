# A2 Bridge — spine (2026-08-08)

James's request, mid-session: `dla`, `swój`, `każdy`, `żaden`, `zostać`,
`wrócić`, `rozumieć` and their neighbours are the highest-frequency words the
vocab-gap route structurally cannot teach (they need a preposition, a
declining determiner, or a conjugation — the zero-new-structures rule that
makes bulk vocab safe also forbids all of them). **"These definitely need
something before B1."** He is mid-A2 himself, finishing this weekend, B1 next
week — so this is time-critical, not a someday item.

Word lists below are verified against `codex/vocab/pl-frequency-crosscheck.tsv`
(Polish corpus rank) and `data/case-map.json` (nothing here duplicates an
existing governor row).

## Placement

Same bridge zone the vocab-gap packs already used: **after `a2_wrapup_func`
[100], in the run of new material at path index 101+, before `b1_perf_future`
[107].** Append after whatever the vocab batches have added by the time this
builds — don't renumber anything earlier. This is deliberate: James is
actively playing through in path order right now, over halfway through A2. New
units land ahead of him, not behind him.

## Unit 1 — `dla` / `bez` (Genitive prepositions)

Both govern Genitive; clean pairing, no case-mixing risk. `dla` = *for*
(benefactive: *prezent dla mamy*), `bez` = *without*. Both rank in the Polish
top 250 and are currently taught nowhere. Ride the Genitive endings already
owned since `a1_gen_endings`/`a2_gen_pl` — no new case mechanics, only two new
governors. Add both rows to `data/case-map.json` in the same commit (`gen |
dla… (for someone) | a2_bridge_dla_bez` and the `bez` row alongside it).

**Deferred, logged, not built here:** `dzięki` (Dative — different case,
lower urgency), `poza` (mixed Inst/Gen usage, genuinely harder). Not part of
James's explicit ask; leave for a later pass.

## Unit 2 — `każdy` / `żaden` (declining quantifier-adjectives)

Both decline like adjectives (każdy/każda/każde, żaden/żadna/żadne) — this is
a new declension CLASS, not a vocabulary item, closer in kind to how
`a1_gender_gym` introduced ten/ta/to than to an ordinary vocab pack. Nominative
+ Accusative singular only; fence out Genitive/Locative/Instrumental forms and
the virile plural (`każdzi` doesn't exist as a form worth teaching; `żadni`
can wait). Natural teaching pair — "every" against "no/none" is the same
discrimination shape as `to/nie to`.

## Unit 3 — `ktoś` / `coś` / `jakiś` (indefinite pronouns)

Simpler than Unit 2 — `ktoś`/`coś` barely decline in everyday use (Nominative
and Accusative cover almost all real sentences), `jakiś` declines like an
adjective but can be taught Nominative-only here (m/f/n: jakiś/jakaś/jakieś).
Natural semantic set: *someone / something / some [noun]*.

**Open fork, author's call:** whether `nikt`/`nic` (their negative
counterparts) belong in the same unit or a follow-on. Not in James's list or
the frequency top-400 check run so far — build the positive set first, log the
negative pair as a candidate addition rather than assuming it in scope.

## Unit 4 — `potrzebować` / `pamiętać` / `rozumieć` (imperfective, owned classes)

All three are stative/imperfective with no everyday perfective partner —
same class as `znać`/`chcieć`/`kochać`, already taught freely at A2 per the
AGENTS gloss rules. `potrzebować` rides the `-uję` class (already owned via
`kupować`/`pracować`), `pamiętać` rides `-am` (already owned via `mieszkam`),
`rozumieć` rides the `umieć` pattern (`rozumiem`/`rozumiesz`, already owned).
**Zero new conjugation mechanics — three new lemmas on three owned shapes.**
Cheapest unit in this whole bridge; build first if sequencing them by cost.

## Units 5–6 — `zostać` / `wrócić` / `wziąć` / `zacząć` / `przestać` / `znaleźć`

**All six are perfective.** This is the finding that shapes these two units:
teaching their present-tense-shaped forms would mean teaching them as future
(a perfective verb's present-shaped conjugation *means* future — that's
`b1_perf_future`'s entire subject, one level up), and the course has an
existing, deliberate rule against that at A2. `a2_aspect`'s own note states it
explicitly: *"the PERFECTIVE FUTURE ... B1, a different formation ... the
fence is made in English."*

**The precedent that makes this safe: teach PAST TENSE ONLY, future fenced out
entirely — exactly what `a2_aspect` already does for its four verb pairs, and
exactly what `c1_past_gaps` later does for five more (read that pack's note
before building this one; same technique, different verbs).** Nothing about
teaching *wróciłem/wróciłam* implies or requires *wrócę*. Keep every future
form — `zostanę`, `wrócę`, `wezmę`, `zacznę`, `przestanę`, `znajdę` — out of
every stage including distractors, and say so on an intro slide in English,
matching `a2_aspect`'s slide 6 technique.

Split into two units by stem regularity, not by meaning:

- **Unit 5 — regular past stems:** `zostać` → zostałem/zostałam, `wrócić` →
  wróciłem/wróciłam. Both drop-the-infinitive-ending-add-ł, same operation
  `past_ac`/`past_rest` already own. Cheap.
- **Unit 6 — irregular past stems:** `wziąć` → wziąłem/wzięłam (ą→ę split by
  gender, a genuinely new alternation — name it, don't hide it), `zacząć` →
  zacząłem/zaczęłam (same alternation, so the two verbs teach each other),
  `przestać` → przestałem/przestałam (regular despite looking irregular),
  `znaleźć` → znalazłem/znalazłam (stem shift źć→az, whole-form memorisation,
  same treatment `c1_past_gaps` gives `mógł`).

Singular only, both genders in production — matches every past-tense unit
this course has ever shipped. `wziąć`/`zacząć`'s ą→ę alternation is worth its
own intro slide since it's a real pattern, not just two isolated exceptions.

## Hard rules, all units

- **Zero new case governors beyond the two named rows** (dla, bez) — everything
  else recycles endings already owned.
- **No future-tense form of any Unit 5/6 verb, anywhere, including
  distractors.** This is the constraint that makes the whole bridge legal
  before B1; treat it as absolute as `a2_aspect` itself did.
- Standard protocol otherwise: `check_new.py` before every string, 0 audit
  errors before commit, per-unit commit and push, digest entry per unit in
  `codex/A2-BRIDGE-DIGEST.md` (new file).
- If a word in this spec turns out already taught somewhere (verify, don't
  assume), drop it from that unit and log why — same discipline as vocab-gap
  work.

## Priority

**This spine outranks continued vocab-gap batches.** James's own words: these
words matter more than more A2 nouns right now. Build all six units before
resuming `codex/vocab/oxford-b1-gap.tsv` work.
