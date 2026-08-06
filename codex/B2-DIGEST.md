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

## Batch 2 — Block 2, units 1–3 of 7

Built `b2_adj_acc`, `b2_adj_gen`, `b2_work` — the first three units of B2's
adjective-case block, which is the largest untaught system left in the course.
Each audit-clean (0 errors; the same 2 pre-existing, unrelated warns from
`a2_prep_review` / `b1_two_futures` that B1 and B2 batch 1 both carried),
pushed to `origin/b1-build` one at a time, not batched. Two new structures
registered in `SEQUENCING.md` **and** `audit.py`'s `STRUCTURE_CATALOGUE` before
each audit ran: `adj_acc`, `adj_gen`.

Path is now live through `b2_work` (path index 136, 131 live nodes). Next
unbuilt B2 node: `b2_adj_loc` — where `-ym` is finally taught.

### `b2_adj_acc` (Block 2, unit 1 — the block opens with no new ending at all)

The spine put this first on the reasoning that it is the cheapest of the six,
and reading `a1_miec` confirmed the claim is stronger than the spine knew.
`a1_miec` does not merely *use* `dobrą kawę` — it teaches the swap explicitly
(*dobra kawa → Mam dobrą kawę. nowa książka → Mam nową książkę.*) and its own
`body_pl` already states the relief in Polish: *Męskie rzeczy i nijakie bez
zmian.* So both halves of this unit's rule have been in Dad's hands since path
index 9.

What is genuinely new is therefore small and was kept small: **six more
feminine object forms** (`małą`, `dużą`, `zimną`, `gorącą`, `starą`, `ładną` —
all verified NEW, and every one of their Nominative base forms already taught
from a *Jest*-predicate sentence in an A1/A2 vocab leaf), plus **the
generalisation off `mieć`**. That second half is the real content: `a1_miec`
ran the pattern with exactly one verb, and this unit runs it after `mam`,
`piję`, `czytam`, `kupuję`, `kupię`, `robi` and `poproszę`, which is what turns
a fact about having things into a rule.

**The fence that mattered most,** and the one this whole block will keep
threatening: no oblique adjective ending appears anywhere — not `-ego`, not
`-ej`, not `-ym`, not `-emu`, and not as a distractor. `b2_adj_gen` was the
very next unit written in this same run, so the temptation to preview was
immediate and concrete; it was refused. Masculine-**animate** accusative is
fenced with it and named in one English line on slide 2 with no form shown.
Masculine animates appear in the pack only as grammatical *subjects*
(*Mój brat ma stary samochód*).

**A homograph avoided that the machine would never have caught:** `nowe` and
`duże` are not used in this pack at all, despite both reporting TAUGHT. They
were taught by `a2_plural_nom` as **plural** adjectives (*nowe książki*), and
using them here as neuter *singulars* would have sprung that collision
unannounced. The neuter slots take `dobre` and `małe` instead, both of which
were taught as neuter singulars (`a1_gender_check`'s *dobre piwo*,
`trunk_adjectives_a1`'s *Mieszkanie jest małe*). The same line is held in
`b2_work` two units later.

### `b2_adj_gen` (Block 2, unit 2 — the first real endings, and the O16 trap pays)

`-ego` for masculine and neuter, `-ej` for feminine. **Form count deliberately
held down:** only four adjectives — `dobry`, `nowy`, `mały`, `zimny` — each in
*both* forms, so the learner meets a symmetrical paradigm rather than a word
list. `duży` and `stary` were dropped for that reason alone and cost nothing to
add later inside `b2_adj_gym`. Seven forms verified NEW.

**The spine predicted this trap one batch in advance and it landed exactly as
described.** `nowego` reports TAUGHT — `a2_smalltalk`, path 54 — but only
frozen inside the chunk *Nic nowego*. Slide 3 is entirely that reveal and is
played as a gift rather than a correction: a lump Dad already says turns out to
contain the ending he has just learned. Same treatment `b1_dative_sg` gave
`dziękuję` and `b1_ktory_cases` gave `której`.

**No new governors.** All three triggers are already owned and are the ones the
spine named: `nie mam`/`nie ma` + Gen, `do` + Gen, and `dużo` + Gen — the last
of which `a1_gen_endings` literally teaches as *dużo kawy / dużo wody / dużo
mleka*. The only change is that the adjective now comes along.

**Masculine-animate Accusative folds in here** and closes the gap `b2_adj_acc`
left open by design an hour earlier. For masculine people and animals the
object form *is* this form (*Mam małego psa*), and the nouns have been
Acc≡Gen since `a1_miec`, which says so in its own note. That pairing is the
entire reason these two units sit in this order, and it worked.

**One fence nobody in this project has had to state before, and it is the
judgment call worth James's eye in this batch:** `z` / `ze` + Genitive is kept
out of the unit completely, even though it is a perfectly good owned Genitive
governor and would have widened the practice. Reason: Dad owns `ze sklepu` and
`ze szkoły` as whole forms, and inserting an adjective flips the preposition
back to `z` — *z nowego sklepu* — because `ze`/`z` looks at the word
immediately after it, not at the noun. That is a second fact about the
*preposition*, not about the adjective, and teaching it alongside two new
endings is the do/z cliff in miniature. `do` and `nie ma` carry the unit
instead. **If that call is wrong it is cheap to reverse** — it adds match rows,
it does not restructure anything.

Also fenced: `-ym`/`-emu` including as distractors; plural genitive adjectives
(C1, spine O3); and `pracy`, which is a perfectly good feminine Genitive but
which `b2_fem_soft` taught *one unit earlier* as the Dative/Locative form —
re-showing it here as a Genitive in the same breath as a new ending would have
been a self-inflicted homograph.

### `b2_work` (Block 2 vocab interleave)

Twelve new words. Every one re-checked with `check_new.py` at build time rather
than trusted from the spine, and every one of the spine's thirteen claimed
anchors re-checked too — all thirteen came back TAUGHT and are recycled in the
sentence bank, never re-taught.

**The unexpected gift, and why the pack is far lighter than "twelve new words"
sounds:** eleven of the twelve need no second form. Six are neuter
(`wynagrodzenie`, `zwolnienie`, `stanowisko`, `podanie`, `zatrudnienie`,
`wykształcenie`), three are masculine things (`obowiązek`, `etat`, `raport`)
and two are plural non-virile (`nadgodziny`, `kwalifikacje`) — and for all
three of those groups the object form is identical to the plain form. Only
`rozmowa` takes a second form, `rozmowę`, which is the `-a → -ę` swap owned
since A1. **Twelve words, one extra form.**

**`rozmowa` is a chunk-to-word reveal, flagged because the tool cannot see
it:** `check_new.py` reports the bare word NEW, and it is — but `a2_work2`
taught `rozmowa kwalifikacyjna` ("job interview") as one frozen lump a level
ago, so Dad has been saying the string for months. The gloss names the plain
word ("conversation, talk") and the sentence bank uses it only in that plain
sense.

**A sense was deliberately cut, and this is the second judgment call worth
James's eye:** `zwolnienie` is glossed *only* as "dismissal, being let go". Its
other everyday sense — `zwolnienie lekarskie`, a doctor's sick note — appears
nowhere in the pack, not even as a parenthetical. It belongs to
`b2_health_system` later in this same block-list, which is exactly the register
for it. Teaching both senses at once would be two words wearing one spelling.

**Feeds `b2_verbal_nouns` and deliberately does not spend it:** five of these
words (`wynagrodzenie`, `zwolnienie`, `zatrudnienie`, `wykształcenie`,
`podanie`) are `-enie`/`-anie` verbal nouns, which is precisely the material
that later unit is built on — words already owned as ordinary nouns turning out
to share a pattern. Nothing in this pack names the verb behind any of them or
mentions the pattern at all.

### Verification performed on all three packs

Same discipline as batch 1, with the scanner from that batch reused and
extended: every Polish string in every stage — intro tables, `body_pl`, quiz
distractors, `accepts` arrays and vocab block items included — extracted and
scanned token by token against the position-aware pool plus each pack's own
`teaches_lemmas`. Notes on what that caught:

- **A real error in my own slide, caught by the scanner and not by the audit.**
  `b2_adj_gen`'s slide 1 table originally listed the neuter row as
  `zimny → zimnego` and the feminine row as `dobry → dobrej`. Both "plain
  form" cells were simply wrong — the neuter of `zimny` is `zimne` and the
  feminine of `dobry` is `dobra` — and worse, `zimne` came back **NEW**, so
  the corrected version could not be shown either. The table was rebuilt with
  six rows using only plain forms that are actually taught (`nowy`, `mały`,
  `dobre`, `dobra`, `nowa`, `zimna`), and slide 2's example column was
  re-pointed so that all seven taught forms appear somewhere in the intro.
  **The auditor would never have flagged this**: `zimny` and `dobry` are both
  taught, so every string was legal. It was wrong pedagogy wearing legal tags.
- **Fence scan added for this block specifically.** A regex pass over every
  Polish string in all three packs looking for `-ym`/`-emu`/`-ych`/`-ymi` on
  any of the eight adjective stems in play. Clean in all three. This is worth
  re-running on `b2_adj_loc` and `b2_adj_inst`, where the fence inverts.
- Mechanical stage checks per grammar pack: Match exactly 12 rows, no duplicate
  answers within any stage, every quiz answer present among its own choices, no
  duplicated choices, no Użycie item repeating a Pisanie item, and every form in
  `teaches_lemmas` actually demanded in a drill stage.
- For `b2_work`: no duplicate block items, no duplicate sentences, gender badge
  present on every one of the twelve nouns, every item-level `structures`/
  `lemmas` tag a subset of the pack declaration, and every taught lemma demanded.
- Distractor discipline held throughout: every wrong choice in both grammar
  packs is real taught Polish in the wrong slot. `b2_adj_gen`'s two
  full-sentence items use wrong *combinations* of real forms (*Nie mam zimną
  wody.*, *Mam małego pies.*) so that each explain can name which half failed
  to move. `zimne` and `stare` were kept out of every distractor pool — both
  came back NEW and neither is taught anywhere.
- No meta-questions about the language in any Kontrola stage.

### For James's next smoke pass

- **The `z`/`ze` fence in `b2_adj_gen` is the call I would most want a second
  opinion on** — see above. It narrows the unit's practice to `do`, `nie ma`
  and `dużo`, which is three governors and plenty, but it does mean Dad will
  meet *z nowego sklepu* in the wild before the course explains why it is not
  *ze nowego sklepu*.
- **`b2_adj_gen`'s slide 3** (the *Nic nowego* reveal) is the framing I would
  watch live. It has to land as "you already own this" and not as "you have
  been saying something you did not understand". Batch 1 flagged the same risk
  on `b2_copular_future`'s gender slide; it is the same idiom and the same
  hazard.
- **`b2_adj_acc` is deliberately slight**, like `b2_conjunctions` before it. It
  adds no ending. If it feels thin standing alone that is the intended trade —
  it exists so that `b2_adj_gen` can be one clean paradigm row instead of two.
- `b2_work`'s `zwolnienie` gloss is a one-word decision that is easy to revisit
  when `b2_health_system` is built; if the sick-note sense turns out to matter
  more in Dad's life than the dismissal sense, swap them and let the health
  unit take the other.
- All three units are **audit-clean, not tested** — nobody has clicked through
  them. `b2_adj_gen` is the densest of the three: four intro slides, 12 match
  rows, 10 quiz items, 10 type items, 10 use items.
- Titles re-checked word by word at the moment of wiring, per the B1 batch 10
  standing reminder. `b2_adj_gen`'s drafted label was corrected from
  *"Dobrego, dobrej · dopełniacz"* to *"Dobrej kawy · dopełniacz"* so the
  learner-visible title shows the ending doing a job rather than two bare
  forms, and `b2_adj_acc`'s `label_en` was extended to state the gift
  ("only the feminine changes") rather than just naming the case.
