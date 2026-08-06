# B2 build digest

Running log of what shipped, batch by batch. Each entry: what was built, judgment
calls made, anything James should sanity-check on his next smoke pass. Same
format and purpose as `B1-DIGEST.md`, which stays the reference for everything
before path index 131.

The level's design lives in `B2-SPINE.md`. That document was written by the
cloud routine with James not present, so **every one of its "Open for James to
overrule" items (O1–O16) is still open**. Build agents follow it as the default;
nothing in it has been ratified.

## Batch 1 — Block 1 complete (units 1–3 of 3)

Built `b2_conjunctions`, `b2_copular_future`, `b2_fem_soft` — the whole of
B2-SPINE's Block 1. Each audit-clean (0 errors; the same 2 pre-existing,
unrelated warns from `a2_prep_review` / `b1_two_futures` that B1 carried
throughout), pushed to `origin/b1-build` one at a time, not batched. Three new
structures registered in `SEQUENCING.md` **and** `audit.py`'s
`STRUCTURE_CATALOGUE` before each audit ran: `conjunctions`, `copular_future`,
`fem_dat_loc`.

Path is now live through `b2_fem_soft` (path index 133, 128 live nodes). Next
unbuilt B2 node: `b2_adj_acc` — the first unit of Block 2, the five-unit
adjective-case block that is B2's largest system.

**This is the first B2 batch**, so two setup notes for whoever runs next:

- All 45 B2 nodes were already sitting in `tree.json` as `planned` with drafted
  labels and `[B2 SPINE]` notes, written by the scoping run. Wiring a unit live
  means: flip `status`, add `content`, and **replace** the note with a real one
  (drop the `[B2 SPINE]` prefix — it marks a node as unbuilt).
- The two `b2_station_*` nodes stay `planned` forever, same as A2's four and
  B1's two. Re-confirmed by reading them rather than assumed.

### `b2_conjunctions` (Block 1, unit 1 — the level opens)

Seven invariable words, all verified NEW: four joiners (`ale`, `a`, `więc`,
`albo`) and three in-sentence particles (`też`, `już`, `jeszcze`). Zero
morphology anywhere in the unit — none of them ever changes shape.

The one teaching point, given its own slide and its own table, is **i / a /
ale**. English collapses all three into "and" or "but"; Polish splits them by
how the two halves relate. `i` (a2_past_plural) and `bo` (a2_questions2) are
already-owned anchors, recycled as distractors and never re-taught.

Placed first on the spine's O14 reasoning, which held up: three separate B1
packs record catching `ale`, `a` or `też` leaking into a draft and having to
rewrite around a word the course had simply never taught. Both later units in
this batch used the new joiners in their own Użycie stages, which is exactly
the payoff O14 predicted.

**Two scope cuts, both logged in the pack note:**

1. `dlatego` is **not** taught, though O14's prose lists it among the
   verified-NEW candidates. The spine's own Block 1 table omits it and this
   pack follows the table. Reason: `dlatego`'s everyday partner is `dlatego
   że`, which is on B2-SPINE's C1 hand-over list (item 23, complex
   subordination). Teaching the bare adverb here would leave a half-taught
   pair pointing at a fenced construction.
2. The **negative-polarity** readings of `już` and `jeszcze` are fenced
   completely — `już nie` ("not any more") and `jeszcze nie` ("not yet")
   appear nowhere, not in a slide, not as a distractor. Each flips its word's
   meaning rather than extending it, which is a second fact per word. `już` is
   taught as "already" only, `jeszcze` as "still" only.

### `b2_copular_future` (Block 1, unit 2 — cheapest high-value unit in B2)

Pays a fork `a2_bedzie` took openly and logged in its own note: *"the COPULAR
future is NOT taught… consequence, accepted: 'I will be at home' is not yet
expressible, and no item implies it is."* It is expressible from this unit on.

**Zero new forms and zero new lemmas** — `teaches_lemmas` is deliberately empty
(the `b1_wrapup` precedent). The entire payload is one syntactic fact: `być` is
the only verb that never appears as an infinitive after `będę`, so `będę`
stands alone and the complement follows it directly, in the slot it already
occupies after `jestem`. Four complement types, every one already owned in the
present: place, predicate adjective, Instrumental identity, and the impersonal
adverb predicate.

That last one turned out to have an unusually exact anchor. `a2_smalltalk`
already teaches `Było dobrze` **and** already ran the `dobrze`/`dobra`
adverb-vs-adjective contrast — so `Będzie dobrze` is the straight future twin
of a frame Dad has said before, and the unit's final quiz item re-uses that
same contrast rather than inventing one.

**Gender, handled carefully so it does not contradict the unit it pays off:**
`a2_bedzie`'s slide 2 was entirely the relief that "the future has NO gender."
That still holds and slide 3 says so — `będę` is one form for everyone. What
changes for gender is the *adjective* after it, exactly as it already does
after `jestem`. The verb is not handing gender back; the adjective never gave
it up. Worth reading that slide specifically to check the framing lands.

**Four fences, all logged:**

1. **No negation anywhere in the unit.** `nie będzie kawy` governs the
   Genitive — that is the existential-negation pattern arriving in a new
   tense, a second fact. Deferred; `b2_neg_gen` later in B2 is its natural
   home.
2. **No plain existential future** (`Będzie kawa`), the twin of the above.
3. **Plural predicate adjectives fenced absolutely.** `zmęczeni`/`zmęczone`
   are NEW, and `b1_virile_gym` and `b1_conditional_pl` each record nearly
   shipping them by mistake, one batch apart. Every plural sentence in this
   pack takes a place phrase instead.
4. `w weekend` rejected as the time anchor despite being taught: `a2_time_past`
   owns it under `time_past_chunk`, i.e. as a **past** adverbial. Used `jutro`
   (`leaf_time_cal_a1`) instead — unambiguously future and owned outside any
   tense-specific pack.

### `b2_fem_soft` (Block 1, unit 3 — pays B1-DIGEST deferred item 1)

`b1_dative_sg` handed `mamie`/`tacie`/`siostrze` over as four memorised whole
forms and logged: *"three different feminine consonant-softening classes plus
brat's own irregular -u would be the do/z cliff again if derived honestly in
one unit… The general feminine dative/locative rule stays untaught. James
should decide whether it needs a slot."* B2-SPINE gave it this slot.

**The gift, and the reason the unit earns its place:** for feminine nouns the
Dative and the Locative are *the same form*. Exceptionless across every noun
used here, so one rule pays for two cases. Slide 1 is entirely this — `mama`,
`siostra` and `kobieta` each shown doing both jobs side by side (`Mówię o
mamie` / `Pomagam mamie`).

**Much lighter than it looks:** four of the nine forms drilled were already in
the pool, each having been taught as *one* of the two cases — `mamie` and
`siostrze` as Datives (`b1_dative_sg`), `szkole` and `pracy` as Locatives
(`a1_prep_place` / `a1_prep_review_2`). Only `kobiecie`, `łazience`, `ulicy`,
`kuchni`, `sypialni` are genuinely new. The unit is mostly revelation, not
acquisition — the same shape `b2_verbal_nouns` will have later in the level.

Both classes are taught as **visible closed families**, with the slide saying
outright that Dad is not expected to work out the right consonant for a word he
has not seen — the treatment O10 prescribes and that `kelnerzy` / `mógłby` /
the family datives already established.

**The one real judgment call in this batch, flagged for James:** the more
conservative option was to teach Class A only (hard stem, `-a` → `-e`) and
defer the `-y`/`-i` group to a later unit. I rejected it. `pracy` is one of the
most frequent forms in the whole course — `w pracy` has been owned since A1 —
and it would then sit in plain sight as a counterexample to the rule just
taught. Teaching half the split would actively mislead, and the second half
costs one slide and no new alternation to memorise. **If that reasoning is
wrong, this is the easiest thing in the batch to change** — slide 3 and four
type items lift out cleanly.

`tata` is named in **one line** on slide 2 — masculine, ends in `-a`, follows
the same pattern, which is why Dad already says `tacie` — and is drilled
nowhere. Verified by walking the whole pack: it occurs in that one intro body
and in `uses_lemmas`, in no match row, quiz item, type item or use item. It
adds no form and no rule; it exists only so the "feminine" framing does not
un-teach a word he owns.

Fenced: masculine datives (`bratu`, `-owi` — `dative_sg` owns those
separately), feminine accusatives (`mamę`/`siostrę` appear only as wrong-slot
distractors, never as part of this pattern), and all plurals.

### Verification performed on all three packs

Every Polish string in every stage — intro tables and body_pl included, not
just the drill stages — was extracted and scanned token by token against the
position-aware taught pool plus each pack's own `teaches_lemmas`. Roughly 1,250
Polish tokens across the batch. Notes on what that caught:

- **The scanner's own blind spot, found and fixed mid-batch.** The first
  version only scanned table columns whose header was "Polish" or "Example".
  `b2_copular_future`'s tables use headers like "You already say" / "Future",
  so most of its cells were being skipped silently. Widened to scan every
  cell, then **re-scanned `b2_conjunctions`, which had already shipped under
  the narrower check** — it came back clean, but it was clean by luck of
  header naming, not by having been checked. Worth knowing: a verification
  tool that reports CLEAN because it looked at nothing is the most dangerous
  possible result.
- **`ci`/`mi` arriving from an unexpected direction.** `b2_fem_soft`'s slide 2
  originally presented the alternations as bare consonant maps: `m → mi`,
  `t → ci`. Both `mi` and `ci` are already taught as **dative pronouns**, and
  `ci` is this course's most documented two-meaning collision (`b1_virile_reco`
  predicted it; `b1_dative_pron` confirmed it). Printing `ci` as a bare token
  inside a dative unit was inviting exactly the wrong reading. Rewritten as
  whole ending-shapes (`-ma → -mie`, `-ta → -cie`), which is clearer for the
  learner anyway since it shows the shape of the word's end rather than an
  abstract letter map. **The homograph table in AGENTS.md is about content
  words; this one arrived through typography.**
- `mamy` was kept out of `b2_fem_soft`'s distractor pool for the same class of
  reason — AGENTS.md's own table records it as the verb "we have"
  (`a1_miec`), not a form of `mama`.
- Distractor discipline held throughout: every wrong choice in all three packs
  is real taught Polish in the wrong slot (the `b1_imperative_rule`
  convention), never a fabricated non-word. `b2_conjunctions`' whole distractor
  set is the closed real-word group i/bo/ale/a/więc/albo/też/już/jeszcze.
  `b2_copular_future` uses `Będę być w domu` (ungrammatical by design, and
  slide 1 says outright that `będę być` is not Polish) and `Będę mieszkać w
  domu` (perfectly good Polish, a different sentence) — each explained rather
  than left to sting.
- Stage contracts checked mechanically per pack: Match exactly 12 rows, no
  duplicate answers within any stage, every quiz answer present among its own
  choices, no duplicated choices, no Użycie item that merely repeats a Pisanie
  item, and every form the pack teaches actually demanded somewhere.
- No meta-questions about the language in any Kontrola stage.

### For James's next smoke pass

- **`b2_fem_soft`'s two-class split is the one judgment call worth a second
  opinion** — see above. Everything else in the batch is either a straight
  payoff of a previously-logged IOU or an explicitly conservative scope cut.
- `b2_copular_future`'s slide 3 is the one framing I'd most want watched live:
  it has to reassure that the future still has no gender while showing
  `Będę zmęczony` / `Będę zmęczona` on the same slide. If that reads as
  "actually it does have gender after all", it needs rewording — the
  distinction is real but fine.
- `b2_conjunctions` is deliberately the easiest unit in the level and is the
  first thing Dad will meet at B2. If it feels *too* slight standing alone,
  that is the intended trade (O14: it costs no grammar and makes every later
  B2 sentence better), not an oversight.
- All three units are **audit-clean, not tested** — no one has clicked through
  them. `b2_fem_soft` has nine type items and nine use items, the densest of
  the three.
- Standing reminder from B1 batch 10, applied here and worth keeping: the
  `label`/`label_en` text sitting on a `planned` node in `tree.json` is a
  **draft**, not a fact. All three titles were re-checked word by word at the
  moment of wiring; `b2_fem_soft`'s `label_en` was rewritten (from "Feminine
  Dative & Locative · one rule" to "Feminine nouns · one form for Dative and
  Locative") so the learner-visible title states the gift rather than just
  naming the cases.
