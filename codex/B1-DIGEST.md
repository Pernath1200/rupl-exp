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
