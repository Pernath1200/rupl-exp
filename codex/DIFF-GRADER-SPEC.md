# Diff grader — spec (James-locked 2026-08-08)

Trigger: first day of real A2 use produced a 7th false-wrong of the same class
("Mam wykład jutro" rejected because only Jutro-first variants were listed),
plus the realisation that authored explains are structurally blind — each one
targets the item's single most-likely error and renders regardless of what the
learner actually typed. James: *"redoing explanations is a big job, but
necessary at some point if the product is going to be decent quality."*

Four dropdown decisions, all LOCKED:

1. **Build the diff engine** — reverses the 2026-08-07 "patch accepts as they
   surface" call, on the evidence of day one.
2. **Word order flexible by default** — reordered answers auto-accept
   course-wide; items where position IS the lesson opt out via
   `strict_order: true`.
3. **Explain audit A1→B1 AFTER the engine lands** — routine job, added to the
   routine prompt only once the engine is live. Not a course-wide rewrite.
4. **Local lane, next session** — engine code stays out of the routine's
   hands (the standing rule). Build with tests, James smokes against real play.

## What to build

A classification layer in BOTH engines (`js/practice-grammar.js`,
`js/practice-vocab.js`) that runs when the exact/accepts check fails, before
the answer is marked wrong. Compare the normalised typed answer against each
accepts entry (reuse the existing `norm()`; the diacritics near-miss layer
already exists and stays — this sits beside it):

| classification | condition | behaviour |
|---|---|---|
| **reorder** | same tokens as an accepts entry, different order | **ACCEPT.** Show model order as a note ("Naturalna kolejność: …"), never as an error. Skip when item/pack has `strict_order: true`. |
| **form miss** | one token differs from an accepts entry (all others match in multiset terms) | Wrong. Highlight the differing pair ("You wrote **biurko** — the answer needs **biurku**") and THEN show the authored explain, which usually targets exactly this. |
| **missing word** | typed is a strict sub-multiset of an accepts entry | Wrong. Name the missing word(s) ("Missing: czy"). Authored explain only if it mentions the missing word (cheap check: substring match), else suppress it. |
| **extra word** | accepts entry is a strict sub-multiset of typed | Wrong. Name the extra word(s). Same explain-suppression rule. |
| **other** | none of the above | Wrong. Current behaviour (show answer + explain). |

Classify against the CLOSEST accepts entry (fewest token differences), not
just the primary answer — an answer one word off a listed variant should be
judged against that variant.

## Design constraints

- **`strict_order` flag** — item-level, pack-level allowed as a default the
  item can override. Initial candidates to flag when wiring (verify each
  against its own teaching point before flagging): czy-fronting drills where
  the fronting IS the lesson, `a2_sie` (verb+się placement is taught as the
  default), question frames in `a1_questions`, any Pisanie item whose explain
  talks about position. Do NOT flag broadly — flexible is the default and the
  point.
- **Reorder-accept counts as a full pass** for fruit/SRS purposes — same as
  the diacritics near-miss precedent (scores correct, shows the model form).
- **No new answer keys.** The layer never widens what's accepted beyond
  token-reorderings of already-listed variants. A reordering of a WRONG
  variant is still wrong.
- **Vocab engine parity** — practice-vocab.js has its own accepts/grading path
  (and the gap_accepts distinction); the reorder rule applies to its sentence
  mode. Word modes (single-token answers) are untouched by definition.
- **Tests** — extend the `scripts/_test_fruit_gates.js` precedent: a small
  test file exercising each classification with real pack data shapes
  (reorder accept, strict_order refusal, form-miss highlight, sub/super-set,
  diacritics interplay). All green before James smokes.
- **Cut the "Miałem rację → policz to" button** (practice-vocab.js, two
  sites: word-mode and sentence-mode fail paths; grammar engine never had
  it). James has never used it and the flag button's "my answer was correct"
  option already covers the reporting job — it is how every false-wrong to
  date actually arrived. With reorder-accept live, the button's remaining
  use-case shrinks to near zero, and cutting it is one less chrome element in
  front of Dad (learner-clean rule). An earlier draft of this spec proposed
  auto-logging its presses as smoke flags — dead with the button; the flag
  flow IS the regression list.

## Open questions (decide while building, log the call)

- Whether `czy` should be treated as globally optional in questions (it
  genuinely is in Polish) or stay handled via accepts lists + missing-word
  naming. Conservative default: missing-word naming only; revisit if flags
  keep coming.
- Punctuation: `norm()` already strips it, so "?"-less answers pass today;
  nothing to do unless tests say otherwise.

## After the engine lands (NOT before)

Add to the routine prompt: **explain audit, A1→B1 only** — sweep authored
explains at the levels James is actually playing; upgrade ones that are thin,
add ones missing on genuinely hard items (the w mieście class); C1 explains
are not in scope. This is decision 3 and it waits for the engine because the
engine changes which explains ever render.
