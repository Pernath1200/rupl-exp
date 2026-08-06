# B1 build digest

Running log of what shipped, batch by batch. Each entry: what was built, judgment
calls made, anything James should sanity-check on his next smoke pass. Prior
batches (1–3) shipped before this file existed — backfilled briefly from commit
history below so the log is continuous; batch 4 onward gets full entries.

## Batches 1–3 (backfilled, no author notes available beyond commit messages)

- **Batch 1** (`26a887e`): `b1_perf_future`, `b1_conditional_sg`, `b1_past_isc`.
- **Batch 2** (`51d6630`): `b1_two_futures`, `b1_plans`, `b1_aspect_gym`, `b1_polite`.
- **Batch 3** (`25b98eb`): `b1_arrive_leave`, `b1_journeys`. Path index at end of
  batch 3: `b1_journeys` (path-106).

Detailed authoring reasoning for these lives in each pack's own `note` field in
`data/grammar/blocks/` / `data/vocab/blocks/` — read those directly if auditing
this range; nothing else was preserved from those sessions.

## Batch 4 — Virile block, units 1–2 of 3

Built `b1_virile_reco` and `b1_virile_nom` — the first two of the three virile
units James's spine locked in decision #1 (recognition → Nominative production →
past agreement). Both audit-clean (0 errors), pushed to `origin/b1-build`.

### `b1_virile_reco` (recognition only)

Teaches that a plural group containing at least one man takes special marking
(`ci` instead of `te`) and gets special noun/adjective endings — with **no
formation rule**. Six virile plural nouns (studenci, Polacy, lekarze,
nauczyciele, pracownicy, kelnerzy) and one adjective (dobrzy) handed over as
whole forms to recognize. New structure `virile_reco`, registered in
`SEQUENCING.md` + `audit.py` before the audit ran.

**Judgment call, flagged for James:** the spine text says "learner never
produces a virile form." The engine's Pisanie/Użycie stages are both
typed-answer stages, so the only literal way to honor that is to ship this
pack with **empty `type_items`/`use_items`** — no live pack in the course has
done this before. I traced the engine path in `js/practice-grammar.js`
(`beginType`/`beginUse`/`hasFruit`) before committing to it: an empty
`type_items` array auto-chains straight to `beginUse()` with no dead render,
and if `use_items` is also empty it chains straight to the `done` screen —
`hasFruit()` still fires because `completeMode()` gets called for both modes
along the way. So the ladder is a clean 3-step Wstęp → Kontrola → Done and the
fruit reward still works. **This is verified by code trace, not by having
watched it run in a browser** — I don't have a way to click through the live
app in this session. If it looks or feels off when you smoke-test it (e.g. an
odd flash between Kontrola finishing and the Done screen), that's the one
thing about this pack I'd want you to check first.

**Homograph flag, loud, for whoever builds `b1_dative_pron` later:** this pack
teaches bare `ci` as the virile demonstrative ("these people"). B1-SPINE.md's
block 5 plans to teach `ci` *again* as the 2nd-person-singular dative clitic
("[to/for] you" — podoba ci się). Same spelling, two unrelated words.
`check_new.py ci` will report it as TAUGHT (citing this pack) — whoever
authors `b1_dative_pron` must not read that as "already available, just
recycle it." It needs its own explicit re-teach and its own homograph note,
same as the mamy/kawy pairs already in AGENTS.md's table. I could not fix
this in advance since `b1_dative_pron` doesn't exist yet; flagging is the best
I can do now.

### `b1_virile_nom` (production, regular consonant sets)

Teaches the actual rule as one system with three surface endings: stem -t →
-ci (student→studenci), stem -k → -cy (Polak→Polacy), stem already soft → +e
(lekarz→lekarze). New structure `virile_nom`, registered before the audit ran.

Eight new plurals produced via the rule: pacjenci, klienci, artyści (t-family,
artysta showing the rule survives an -a-final stem), rolnicy, anglicy
(k-family), goście, kibice, przyjaciele (soft-family).

**Judgment call, logged per spine instruction:** -r stems (kelner→kelnerzy,
r→rz) are explicitly **not** taught for production here, even though
`b1_virile_reco` already showed `kelnerzy` for recognition — the spine's own
three worked examples name only the t/k/soft-e family, and adding a fourth
alternation would make this a two-new-things unit. `kelnerzy` stays
recognition-only until a later pass (virile_gym or a dedicated unit) opens it.
All true irregulars (brat→bracia, kolega→koledzy, mężczyzna→mężczyźni, the
whole -owie family) are fenced out completely — not taught, not shown, not
even used as a quiz distractor string. `przyjaciel→przyjaciele` was checked
individually and confirmed *not* irregular (soft -l, regular +e) before being
let into the regular set.

Adjective virile agreement beyond `dobrzy` (already taught whole in the
`_reco` unit, only ever recalled here, never derived) is out of scope —
`mały→mali`, `duży→duzi` etc. each have their own alternation and aren't on
the B1-SPINE as their own item. Worth a decision from James at some point
whether they need a dedicated slot or get folded into a later gym.

### Verification performed on both packs

- Every Polish string in match/quiz/type/use scanned programmatically against
  the running taught-pool + each pack's own `teaches_lemmas` — caught and
  fixed four real leaks before shipping: an untaught fem. plural (`kelnerki`),
  an untaught adjective form (`młodzi`), two untaught oblique-case nouns
  (`pracownika`, `lekarza`) used as quiz distractors, and an untaught
  conjunction (`a`) in a prompt sentence.
- One quiz item was originally written as a meta-question ("which noun does
  NOT belong to this lesson") — caught against the Kontrola stage contract
  ("real forms, not meta-questions") and rewritten as a real-forms cloze item.
- One `explain` string originally named an internal unit id (`a2_countries`)
  — caught against the "no builder jargon visible to the learner" rule and
  rewritten.
- Confirmed `dobre` (taught as neuter-singular predicate adjective in
  `a1_gender_check`) could **not** be reused as a "non-virile plural"
  contrast example — homograph trap, same shape as the `mamy`/`kawy` cases in
  AGENTS.md. Used `nowe` instead (genuinely plural-only in this course, from
  `a2_plural_nom`, no prior singular claim on that string).

### Path position after this batch

Live through `b1_virile_nom`. Next unbuilt B1 node on `path_order`:
`b1_virile_past` (block 4, unit 3/3 — teaches oni/one at last, full past
agreement). Not started this run; `b1_virile_reco`/`b1_virile_nom` were the
full batch.

### For James's next smoke pass

- Click through `b1_virile_reco` specifically to confirm the empty-stage
  ladder behaves as traced above (no dead screen, fruit still earns).
- Both units lean on `dobrzy`/`kobiety` as adjective/contrast anchors — worth
  a read to see if the "at least one man" framing lands for an absolute
  beginner, or needs a gentler restatement.

## Batch 5 — Virile block closed (unit 3 of 3) + its payoff vocab + its gym

Built `b1_virile_past`, `b1_people`, `b1_virile_gym` — the rest of block 4 on
the spine. All three audit-clean (0 errors; the same 2 pre-existing warns from
`a2_prep_review`/`b1_two_futures` persist, unrelated to this batch), pushed to
`origin/b1-build` one at a time, not batched. Path is now live through
`b1_virile_gym`; next unbuilt B1 node is `b1_conditional_pl`.

### `b1_virile_past` (block 4, unit 3/3 — closes the block)

Teaches `oni`/`one` at last (fenced by name since the block opened — verified
NEW via `check_new.py` right before writing) and applies the already-taught
`past_plural` -li/-ły rule to real virile-noun subjects (`ci studenci
pracowali`) instead of `a2_past_plural`'s "name i name" workaround. New
structure `virile_past`, registered in `SEQUENCING.md` + `audit.py` before the
audit ran. One new verb spread to the plural past, matching the spine's own
worked example: `pracowali`/`pracowały` — `pracować` was already known in
present and singular past, never in plural, so this is the owned rule applied
to a new verb, not new grammar. Kept deliberately light (only 4 new lemmas:
`oni`, `one`, `pracowali`, `pracowały`) since the real payload is wiring, not
vocabulary — the fourteen virile nouns from the two prior units carry the
sentence-level content.

**One thing I want flagged, not just logged:** I found `oni`/`one` already
sitting in `audit.py`'s `GLUE_LEMMAS` set — meaning the auditor would **not**
have caught it if an earlier B1 pack had used them before this unit taught
them. I did not touch that (it's long-standing, from A1's "person pronouns in
grids are glue" design decision in `SEQUENCING.md` §6.2, not something this
session introduced), and I confirmed by hand that no live pack before
`b1_virile_past` actually uses them — but the fence is currently
author-discipline only, not machine-enforced. Worth knowing if a future batch
gets rushed.

### `b1_people` (vocab — "the vocab that makes the virile units worth having")

Five new profession pairs — `policjant/-ka`, `informatyk/-czka`,
`kucharz/-ka`, `dziennikarz/-ka`, `turysta/-tka` — picked so every masculine
noun falls inside the regular `virile_nom` production rule already taught
(-t, -k, already-soft classes; no r-stems, no `-ca` nouns like `kierowca`
which turned out to take a *fourth*, untaught plural pattern and were dropped
for that reason) and every feminine plural rides the already-taught
`a2_plural_nom` hard-stem rule. Plus `ludzie` (people), handed over whole as
the one closed irregular, since leaving the single highest-frequency virile
noun out of the unit literally named "Ludzie" felt like the wrong kind of
conservative. **Judgment call, logged in the pack note:** `dzieci` (children)
was considered as a second whole-form irregular for contrast — it's
famously *not* virile despite meaning people — and dropped, since it's
already fenced elsewhere and stacking two suppletives in one pack for an
absolute beginner seemed like the wrong trade for a payoff the spine never
asked for.

### `b1_virile_gym` (zero-new discrimination gym, closes the block)

Same idiom as `a1_case_gym`/`b1_aspect_gym`: `teaches_structures` and
`teaches_lemmas` both empty. Drills `ci`/`te`, `byli`/`pracowali` vs
`były`/`pracowały`, and `oni`/`one` together as the same repeated question,
recycling every virile noun from the three grammar units plus `b1_people`'s
profession pairs.

**Caught during self-verification, before it shipped:** my first draft of
this gym's intro slide used `zmęczeni`/`zmęczone` ("tired", virile/non-virile
plural) as example sentences. `check_new.py` came back NEW on both — I'd
pattern-matched off `dobrzy` without checking that *every* adjective's
virile plural is a separate, mostly-untaught alternation (`zmęczony` only
has its singular forms taught; `b1_virile_nom`'s own note already flagged
this exact trap for adjectives like `mały`/`duży`, and I nearly repeated it
for a *different* adjective). Replaced both examples with already-taught
material (`dobrzy`, plain `były w parku`) before wiring the unit live —
this is exactly the kind of leak the audit's string-matching can't see
because I hadn't yet run `check_new.py` on my own draft text; it only
matters if you actually run the check on every string before shipping,
which is what caught it here.

### For James's next smoke pass

- `b1_virile_past` is the first unit to say `oni`/`one` out loud — worth
  clicking through to see whether introducing two pronouns for a concept
  he's had wordlessly since `a2_past_plural` lands naturally or feels like
  a rug-pull ("wait, I could have been saying this the whole time?").
- `b1_people`'s profession list is deliberately narrow (5 pairs) to stay
  inside the taught production rule — if it feels thin standing alone,
  that's the intended trade-off (breadth was sacrificed for zero new
  grammar risk), not an oversight.

## Batch 6 — Conditional plural (closes block 4) + Dative opens (block 5, 2 of 3)

Built `b1_conditional_pl`, `b1_dative_sg`, `b1_dative_pron` — three units, each
audit-clean (0 errors; same 2 pre-existing warns from `a2_prep_review` /
`b1_two_futures`, unrelated), pushed to `origin/b1-build` one at a time, not
batched. `b1_station_1` was deliberately skipped and left `planned` — every
station on the whole path (A2's four, B1's two) is a permanent placeholder,
"engine future work," never authored; confirmed this by checking every
`*_station_*` node in `tree.json` before treating it as in-scope. Path is now
live through `b1_dative_pron`; next unbuilt B1 node is `b1_giving` (VOCAB).

### `b1_conditional_pl` (closes block 4 — plural conditional)

my/wy/oni/one + by, riding the plural L-forms and byśmy/byście endings
already owned. New structure `conditional_pl`. chcieć gets the full 6-slot
paradigm (the payoff — chcielibyśmy, "we would like"); kupić and zrobić get
partial spreads (4 forms each). 20 teaches_lemmas: the 14 -by- forms plus 6
bare plural-past stems (chcieli/chciały, kupili/kupiły, zrobili/zrobiły)
that turned out to be genuinely new too — caught only because I ran
check_new.py on every string the intro *displays*, not just the ones I'd
already decided were "the point" of the unit.

**One real flag for James:** chcieć's virile plural stem is chcie- (chcieli)
against its non-virile/singular chcia- (chciały/chciał/chciała) — a genuine
vowel alternation, not a typo. I did not explain it as a rule; I handed the
plural forms over as memorized whole forms, the same conservative treatment
`b1_conditional_sg` already gave chciał/chciała itself (the catalogue's own
note already flagged that shift as "deliberately unexplained until B1" — I
read that as license to keep deferring, not an instruction that this unit
specifically had to be the one to explain it). If that reasoning is wrong,
it's an easy fix — nothing downstream depends on the vowel shift itself.

**Self-verification caught two real leaks before shipping**, both the kind
the audit's string-matching can't see:
- An early draft of the grounding example used `zmęczeni`/`zmęczone`
  ("tired," virile/non-virile) — the *exact* trap `b1_virile_gym`'s own
  digest entry flagged one batch ago, and I nearly repeated it verbatim.
  `check_new.py` caught both as NEW; replaced with taught material
  (`byliśmy w pracy` / `byłyśmy w domu`).
- Two quiz distractors (`zrobilibyśmy`, `zrobiliście`) were invented rather
  than pool-legal — AGENTS.md's "distractors all pool-legal" convention
  from `b1_conditional_sg` — replaced with taught forms.

### `b1_dative_sg` (opens block 5 — noun datives, singular)

The case behind the A2 `dat_chunks` pronouns. New structure `dative_sg`.
`pomagać` (present_am, full 6-form — genuinely regular, so the only new
thing is its object's case) and `dziękować` (present_uje, partial spread —
`dziękuję` was a fixed social chunk since `trunk_social_a1` and is analysed
as a real verb for the first time here) govern dative objects.

**Two design forks logged loudly, both in the pack note and `SEQUENCING.md`:**
1. Spine names three verbs (pomagać/dawać/dziękować); I shipped two. `dawać`
   conjugates as an irregular `-awać` class (daję/dajesz…) not covered by
   any present class already taught — stacking a new verb-conjugation
   class on top of a brand-new case in one unit would be two systems at
   once. Deferred to `b1_giving`, flagged loudly for whoever builds it —
   **do not assume dawać is already covered.**
2. The dative-*noun* side does not teach one general rule. Regular
   masculine `-owi` (studentowi, nauczycielowi) is real and generalisable.
   The spine's own headline examples — mamie/tacie/bratu/siostrze — are
   NOT that rule: three different feminine consonant-softening classes
   (m→mi, t→ci, r→rz) plus brat's own irregular -u would be the do/z cliff
   again if derived honestly in one unit. Handed over as four memorized
   whole forms instead, same treatment as `kelnerzy`/`mógłby`. **The
   general feminine dative/locative rule stays untaught — it is not on
   the current B1-SPINE as its own slot. James should decide whether it
   needs one**; I did not invent a slot for it.

**Self-verification caught one real leak:** the bare infinitives
`pomagać`/`dziękować` were being used in intro exposition without being
tagged. `check_new.py` confirmed both genuinely new (never taught before in
this course, despite `pomagać`/`dziękować` "feeling" like they should
already be common vocabulary) — moved from `uses_lemmas` into
`teaches_lemmas`.

### `b1_dative_pron` (closes block 5's pronoun side)

Completes the dative pronoun grid A2 fenced to mi/mnie only: ci, mu, jej,
nam, wam, im. New structure `dative_pron`. Generalises onto `podobać się`
(full paradigm — the real payoff) and `smakować` (partial). **Deliberately
excluded `boleć`** even though it sits in the same A2 chunk family: `boleć`
governs the accusative in every person (boli mnie/cię/go), a pronoun set
this course has never taught, and generalising today's new dative pronouns
onto it would have been a real grammar error, not a simplification —
caught before a single `boleć` example got written, by re-reading
`a2_dat_chunks`'s own note, which had already flagged `boli mnie` as
accusative and left it unexplained on purpose.

**Homograph, predicted in advance and confirmed on schedule:**
`b1_virile_reco`'s own digest entry (batch 4) warned that whoever built
this unit would find `check_new.py ci` reporting TAUGHT (citing the virile
demonstrative) and must not read that as "already available, recycle it."
Confirmed exactly that. Re-taught `ci` explicitly as the unrelated 2sg
dative clitic, with a dedicated intro slide naming both meanings side by
side and a real contrastive sentence (`Ci nauczyciele pomagają
studentowi.`) placed in quiz *and* use — deliberately not a meta
"which meaning" question, since the Kontrola stage contract forbids
meta-questions about the language.

**Self-verification caught one leak:** an intro gloss used `tobie`
(emphatic "to you") to explain `ci`'s meaning parenthetically —
`check_new.py` showed it was never taught. Replaced with `ci = ty,
celownik`, using only the glue pronoun `ty` and the case-name metalanguage
AGENTS.md already permits in `body_pl`.

Deliberately light — only 6 teaches_lemmas, matching `b1_virile_past`'s
"payload is wiring, not vocabulary" precedent.

### For James's next smoke pass

- `b1_conditional_pl`'s `chcieli`/`chciały` vowel-shift call (memorized,
  unexplained) is the one judgment call in this batch most worth a second
  opinion — everything else is either a straight rule extension or an
  explicitly logged, conservative scope cut.
- `b1_dative_sg`'s family datives (mamie/tacie/bratu/siostrze) are taught
  as pure memorization, not a rule — worth clicking through to see whether
  that reads as arbitrary to an absolute beginner or lands fine as "just
  four words to learn," the same way `dobrzy`/`mógłby` already do.
- `b1_dative_pron`'s ci/ci homograph slide is the one I'd most want
  watched live — the disambiguation is designed to work through context
  rather than a drilled contrast, and that's a real bet about how this
  particular learner reads two identically-spelled words apart.
- Two verbs are now on record as deferred to `b1_giving`: `dawać` (from
  `b1_dative_sg`) and whatever `b1_giving`'s own vocab brief already
  planned (pożyczać, oddawać, prosić o). Whoever builds it next should
  treat `dawać` as required, not optional.

## Batch 7 — Block 5 closes, Block 6 opens (2 of 4 units) + żeby

Built `b1_giving`, `b1_ktory_cases`, `b1_zeby` — three units, each audit-clean
(0 errors; same 2 pre-existing unrelated warns from `a2_prep_review` /
`b1_two_futures`), pushed to `origin/b1-build` one at a time, not batched.
Two new structures registered before their audits ran: `ktory_cases`, `zeby`.
Path is now live through `b1_zeby`; next unbuilt B1 node is `b1_stories`
(VOCAB, opens the narrative-connectives register).

### `b1_giving` (closes Block 5 — dative)

Delivers the `dawać` the digest for `b1_dative_sg` (batch 6) flagged as
required, not optional. Zero new structures: `dawać` (full 6-form) and
`oddawać` (partial, same conjugation family — literally `dawać` + `od-`)
both ride the already-taught `present_e_esz` class (same ending shape as
`piję/pijesz`, already generalised onto `wstaję/wstajesz` back in
`a2_routine`); `pożyczać` (partial) rides `present_am`. Every recipient
(mamie/tacie/bratu/etc., ci/mu/jej/nam/wam/mi) and every object
(prezent/książkę/pieniądze/klucze/zeszyt/parasol/długopis) is recycled
whole from `b1_dative_sg`/`b1_dative_pron`/A1-A2 — confirmed via
`check_new.py`, no surprises.

**Two scope cuts, both logged loudly in the pack note:**
1. `pożyczać` is bidirectional in Polish (lend-to vs borrow-from); this
   pack teaches ONLY lend-to, with a dative recipient, matching
   `dawać`/`oddawać`'s frame. Borrow-from would need `od` + Genitive as a
   new job for a preposition already teaching a different case elsewhere
   (comparison) — flagged with an explain string rather than silently
   picking one sense.
2. `prosić o` — named as a spine candidate — is **not** in this pack.
   `prosić o` + Accusative would be a brand-new case-government job for
   `o`, distinct from the already-taught `o_loc` (`o` + Locative, for
   topics: `mówię o pracy`). Teaching it inside an otherwise
   zero-new-structure vocab leaf risked exactly the kind of silent
   case-confusion AGENTS.md's homograph table warns about for content
   words, just on a function word instead. Deferred entirely; James
   should decide whether it gets its own small chunk-lane slot later —
   it is not on the current B1-SPINE as its own node.

### `b1_ktory_cases` (opens Block 6 — complex sentences)

`który` stops being the `a2_questions2` interrogative (Nominative,
subject-position only) and becomes a real relative pronoun: Accusative
(`książka, którą czytałem` — case set by the already-known transitive
verb inside the clause) and Genitive (`film, którego nie ma` — case set
by the already-known `nie ma` + Genitive pattern from `a1_negation`).
New structure `ktory_cases`.

**Homograph, confirmed exactly as `b1_virile_reco`-style advance flagging
would predict, caught by running `check_new.py` before writing a single
line:** `której` was already sitting in POOL — taught by
`a2_ordinals_time`, frozen inside the chunk `o której?` ("at what time"),
never explained as a case, never contrasted with anything. Rather than
treat this as a `ci`/`ci`-style unrelated-word collision, I read it as the
same shape as `b1_dative_sg`'s treatment of `dziękuję` (frozen chunk →
real paradigm slot for the first time) — same underlying grammatical
fact, generalised — and wrote the intro to say so explicitly: "you
already said this word, just never like this." `które` are also
re-listed in `teaches_lemmas` for the same reason `ci` was in
`b1_dative_pron`: same string, genuinely new function (relative pronoun,
not interrogative), logged rather than assumed identical for free.

**Two scope cuts, both logged:**
1. Locative/Instrumental relatives (`o którym myślę`, `z którym mieszkam`)
   are completely fenced — not shown, not a distractor, not hinted at.
   Spine explicitly left this to author's conservative call; deferred to
   a later pass or a dedicated gym, not on the current B1-SPINE.
2. Antecedents are restricted to inanimate/abstract nouns only (książka,
   film, wino, kawa, list). Masculine-**animate** antecedents (pies,
   brat) would merge Accusative with Genitive on the noun itself (the
   already-known "honest exception" from AGENTS.md) — but that would put
   `którego` in the Accusative table for a *different* reason than the
   Genitive table's `którego`, stacking two unrelated justifications for
   the same surface form in one unit. Judged the wrong trade for the
   first relative-clause unit; animate relatives deferred, flagged for
   James.

### `b1_zeby` (Block 6, unit 2 — purpose and want-that)

Two uses of `żeby` taught in one unit because both ride fully-owned
material — checked the load honestly rather than just trusting the
spine's single-unit framing. New structure `zeby`. Purpose (`żeby` + bare
infinitive: `Idę do sklepu, żeby kupić chleb`) adds zero morphology — just
a new conjunction in front of infinitives already known. Want-that
(`Chcę, żebyś zrobił zakupy`) reuses two systems wholesale: the person
marker on `żeby` itself (`żebym/żebyś/żeby`) is the identical `-m/-ś/zero`
family already owned from `conditional_sg`/`conditional_pl`'s
`bym/byś/by`, and the verb that follows is the bare L-form already owned
from `a2_aspect`'s perfective past twins (`zrobił`, not `zrobiłby`). The
one genuinely new fact — the person marker moves onto the conjunction
instead of the verb — is stated as a pattern, per the spine's own
instruction, not explained historically.

**Scope cut, logged, matching the `conditional_sg`→`conditional_pl`
precedent exactly:** singular person markers only (`żebym`/`żebyś`/bare
`żeby` for 3rd). Plural (`żebyśmy`/`żebyście`) is not in this unit even
though `byśmy`/`byście` are already owned — deferred, not on the current
B1-SPINE as its own slot.

**Design note, not a cut but worth flagging:** every want-that example is
built so the wanter and the doer are different people (`Chcę,
żebyś...`/`Mama chce, żebym...`) — "chcę, żebym..." (wanting yourself to
do something) is not idiomatic Polish and doesn't appear anywhere in the
pack. This constrained which example sentences were possible but wasn't
a difficulty compromise — it's just how the construction actually works.

### For James's next smoke pass

- `b1_giving`'s `pożyczać` = lend-only decision is worth a click-through:
  if it reads as incomplete without the borrow-from sense, that's the
  intended trade (see scope cut above), not an oversight.
- `b1_ktory_cases`'s `której` homograph slide is the one I'd most want
  watched live — like `b1_dative_pron`'s `ci`/`ci` slide, it's a bet that
  explaining the connection in prose lands better than a drilled
  contrast would for this learner.
- `b1_zeby`'s "wanter ≠ doer" constraint is worth checking against
  real use — if Dad ever wants to say "I want to do X myself" using
  żeby, the course should make clear (via the intro, already written)
  that plain `chcę + infinitive` is the right tool, not żeby.
- Two open scope questions now on record for whoever plans past this
  batch: whether `prosić o` deserves its own chunk-lane slot, and
  whether Loc/Inst `który` relatives + animate `który` relatives get a
  dedicated follow-up unit or fold into `b1_case_gym`.
