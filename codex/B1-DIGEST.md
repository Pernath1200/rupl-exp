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
