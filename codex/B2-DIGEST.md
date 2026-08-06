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

---

## Batch 3 — Block 2, units 3–5 of 6 (the adjective block's oblique cases close)

Built `b2_adj_loc`, `b2_adj_inst`, `b2_adj_dat` — the Locative, Instrumental and
Dative of the attributive adjective. Each audit-clean (0 errors; the same 2
pre-existing, unrelated warns from `a2_prep_review` / `b1_two_futures` that every
B1 and B2 batch has carried), pushed to `origin/b1-build` one at a time, not
batched. Three new structures registered in `SEQUENCING.md` **and** `audit.py`'s
`STRUCTURE_CATALOGUE` before each audit ran: `adj_loc`, `adj_inst`, `adj_dat`.

Path is now live through `b2_adj_dat` (path index 139, 134 live nodes). Next
unbuilt B2 node: `b2_adj_gym`, which teaches nothing and closes the block.

**Total new material across all three units: seven forms.** `dobrym, nowym,
małym, zimnym` (Locative), nothing at all (Instrumental), `dobremu, nowemu,
małemu` (Dative). That is the whole of three cases, and it is small because the
block was sequenced so that each unit could borrow from the one before it.

**Mid-run rebase.** James pushed his O7 overrule and the JAMES-LOCKED "Block 6a —
Prefix strand" while `b2_adj_inst` was being committed, so the push was rejected
and the commit was rebased onto the new tip; the only conflict was in the
generated audit artifact, which was regenerated rather than hand-merged, and the
audit was re-run clean afterwards. Block 6a sits after `b2_aspect_prefixes`
(path ~166) and touches nothing in this batch.

### The spine gave two examples that are not legal Polish *for this learner*

This is the finding of the batch and it is worth stating first, because it would
have shipped silently. B2-SPINE.md's own illustrative sentences for two of these
three units use forms the course has never taught:

| Spine's example | The problem |
|---|---|
| `b2_adj_loc`: *Myślę o dobrym filmie.* | `filmie` is **NEW**. The course owns `film`, `filmy`, `filmów` and has never inflected the word. |
| `b2_adj_inst`: *Jadę z miłą siostrą.* | `miłą` is **NEW**. The course owns `miła` and `miły` and has never inflected either. |

Neither was caught by reading the spine — both were caught by running
`check_new.py` on the spine's own words before writing a line. `wodzie`, `mleku`,
`samochodzie`, `restauracji`, `dziecku`, `studenta` and `nauczycielce` all came
back NEW in the same sweep, which between them rule out most of the obvious
Locative and Dative phrases in the language. **The standing lesson for whoever
authors the rest of B2: the spine is a design document, not a pool. Its example
sentences have not been checked and two of the three in this batch were wrong.**

### `b2_adj_loc` (Block 2, unit 4 — the one new ending in the batch)

`-ym` for masculine and neuter; four new forms and no more. The feminine `-ej`
is `b2_adj_gen`'s form recycled unchanged one unit later, so half the unit is
free. Same four adjectives as `b2_adj_gen` on purpose — the block should read as
one paradigm widening, not a growing word list.

**The unit's central contrast, and the reason it can be this small.** The
Genitive and the Locative disagree about *which word moves*, and they disagree in
opposite directions depending on gender:

- Feminine — the adjective is the same in both cases and the noun is not:
  *do dobrej szkoły* → *w dobrej szkole*.
- Masculine like `dom` — the noun is the same in both (`domu` is Genitive and
  Locative alike) and **only the adjective marks the difference**:
  *do nowego domu* → *w nowym domu*.

Slide 4 is that pair and the Kontrola stage is built on it. It is also the whole
argument for this unit sitting immediately after `b2_adj_gen` rather than
anywhere else in the block.

No new governors: `w`, `na` and `o` were all re-checked as whole chunks against
the pool rather than assumed — `o domu`, `o sklepie`, `o pracy`, `o banku` come
wholesale from `a2_o_loc`.

### `b2_adj_inst` (Block 2, unit 5 — zero new endings, zero new lemmas)

All six forms in the unit report TAUGHT: `dobrym`, `nowym`, `małym` from
`b2_adj_loc` one unit earlier, `dobrą`, `nową` from `a1_miec` (path 9), `małą`
from `b2_adj_acc`. `teaches_lemmas` is **empty**, which is legitimate and
precedented — `b2_copular_future` is the same shape, and the auditor only warns
when *both* `teaches_*` fields are empty, which was checked in the source before
relying on it.

This is the **fourth turn of the course's signature "same endings, another job"
idiom**: `inst_identity` → `inst_z` → `inst_transport` → here. The adjective
joins all three existing Instrumental jobs at once rather than a fourth being
invented.

**What earns it a slot rather than folding into `b2_adj_loc`** — and this is the
judgment call I would most want James's eye on in this batch. The discrimination
it adds is invisible from either unit standing alone: for masculine and neuter
the Locative and Instrumental adjective are the **same** form (*w dobrym hotelu*
/ *z dobrym kolegą*), but for feminine they **differ** (*w dobrej firmie* /
*z dobrą siostrą*). So gender decides whether the two cases can be told apart at
all. Slide 4 is that table and quiz item 8 tests it. The spine's rejected
alternative was merging Loc and Inst into one unit; having written both, I think
the split is right, but the *reason* is this contrast rather than the "different
governors" argument the spine gave.

**One line that had to be said out loud:** `kolega` is a masculine noun whose
Instrumental ends in `-ą`, so *z dobrym kolegą* pairs a masculine adjective with
an `-ą` noun. Dad has owned `kolegą` since `a2_inst_z` and `kolega`'s masculinity
since A1, but this is the first moment that masculinity is visible on the page. A
Match board showing *z dobrym kolegą* next to *z małą siostrą* would otherwise
look self-contradictory, so it gets one slide row and one `explain`. Treated as a
gift, not a new load.

### `b2_adj_dat` (Block 2, unit 6 — closes the block)

`-emu` for masculine and neuter; three new forms. The feminine `-ej` is recycled
for the **third** time — Genitive, Locative, Dative — and slide 2 says so
plainly, because at this point `dobrej` is the hardest-working adjective form
Dad owns and noticing that is worth more than another drill.

`dawać` was re-checked rather than assumed: `b1_dative_sg` deferred it with a
loud note ("do not assume `dawać` is already covered") and `b1_giving` paid that
deferral at path 119. It is owned, so all three of the spine's governors are used.

**The unit's one real judgment call, and the second thing worth James's eye:
neuter is stated but not drilled.** `dziecku` reports NEW, and it is the only
plausible neuter Dative noun anywhere in reach — so the course owns **no** neuter
noun in this case at all. Teaching one would mean bolting a new noun form onto a
unit that is already adding a new adjective ending. Instead the neuter is named
in one English line and given its column in the recap table. That is true, it is
consistent with every other oblique case in the block (m and n have shared an
ending in all of them), and it demands no form Dad has not met. **If James wants
it drilled, `dziecku` is the single form to add and *małemu dziecku* is the
phrase** — it is a one-line change, not a restructure.

**Slide 4 is a six-row recap of the whole singular adjective** across four cases
and three genders. It sits here because `b2_adj_gym` is next and teaches nothing,
so this is the last teaching moment in the block. Every cell was checked
individually against the pool — that discipline exists because batch 2 shipped a
draft table with two wrong "plain form" cells, and a recap table is exactly the
shape that invites the same mistake.

**Kontrola items 6 and 7 are the block's payoff:** *Nie mam ___ brata* and
*Jestem ___ studentem*, both answered with forms this unit does not teach. It is
the first time Dad has had to choose among four oblique adjective forms rather
than two.

### Verification performed on all three packs

The batch-1/2 scanner was rebuilt and extended, and run on every pack before it
was wired:

- Every Polish string in every stage — intro tables, `title_pl`, `body_pl`, quiz
  prompts, **quiz distractors**, `accepts` arrays — extracted and scanned token
  by token against the position-aware pool plus the pack's own
  `teaches_lemmas`. Everything it flagged was either English table text or
  `body_pl` metalanguage; each metalanguage word was then checked for precedent
  in an existing pack rather than waved through (`bez zmian` from `a1_miec`,
  `końcówka` from `a2_inst_transport`, `rodzaj` from `a1_gender`, and the case
  names, which sibling unit *titles* already carry).
- **One string was changed as a result.** `b2_adj_inst`'s slide 3 `body_pl` was
  drafted as *"kolega, tata — męskie, choć na -a"*. `choć` is untaught and is
  prose rather than metalanguage, so it was rewritten as *"kolega (m) · tata (m)
  — rodzaj męski, końcówka -a"*, which uses only vocabulary the house style
  already established.
- Mechanical stage checks per pack: Match exactly 12 rows with no duplicate `pl`
  or `en`, **no duplicate answers within any stage**, every quiz answer present
  among its own four choices, no duplicated choices inside an item, no Użycie
  item repeating a Pisanie item verbatim, every `teaches_lemma` both demanded in
  a drill stage *and* shown in intro/match/type, and a meta-question sniff over
  every Kontrola prompt.
- Fence scan re-run per pack, inverting each time as the block moved: `-emu`
  kept out of `b2_adj_loc` and `b2_adj_inst` entirely including distractors, and
  `-ych`/`-ymi` kept out of all three. Clean in all three.
- Homograph check on every recycled noun. The Dative nouns are the ones that
  mattered: `siostrze` and `mamie` are Locatives as well as Datives, but
  `b1_dative_sg` taught them as Datives and `b2_fem_soft`'s whole point was that
  the two are the same form for feminine nouns — so nothing is shown as a
  different word than it was learned as. `pracy` is used in `b2_adj_loc` as a
  Locative, which is what `a1_prep_review_2` and `b2_fem_soft` taught it as;
  `b2_adj_gen` deliberately avoided it one unit earlier because *there* it would
  have been a Genitive.
- `nowe` and `duże` are still used nowhere at all, in any of the three packs,
  including as distractors — `a2_plural_nom` taught them as **plurals** and the
  neuter singular slots take `dobre` and `małe`. That is `b2_adj_acc`'s standing
  line, now held for five units running.
- Distractor discipline: every wrong choice in all three packs is real taught
  Polish in the wrong slot. As the block progressed the distractors got better
  rather than harder — by `b2_adj_dat` the wrong choices are the Genitive,
  Locative/Instrumental and Accusative of the *same* adjective, so each one is a
  genuine near-miss the `explain` can name. `zimne` and `stare` are NEW and
  appear nowhere.

### For James's next smoke pass

- **`b2_adj_inst` is the unit I would most want a second opinion on.** It teaches
  no form at all. The case for it is the Loc/Inst discrimination described above,
  which is real — but if it plays as filler standing between two units that do
  add endings, the honest fix is to merge it into `b2_adj_loc` (the spine's own
  rejected alternative) and let `b2_adj_gym` carry the discrimination. That would
  be a clean reversal; nothing else depends on it.
- **`b2_adj_dat`'s undrilled neuter** is the second call. One-line fix if wrong,
  as described above.
- **`zimny` quietly dropped out of the block after `b2_adj_loc`.** It has no
  natural home in the Instrumental's three jobs or as a Dative recipient, and
  `zimnemu`/`wodą` are both NEW. So Dad will finish the block having met `zimny`
  in four cases but `dobry` in six. `b2_adj_gym` is the place to even that up if
  it matters — it teaches nothing and can drill any taught form.
- **`b2_adj_dat`'s slide 4 recap table is the densest single surface in the
  block** — six rows, four columns. It is the one I would watch Dad read. If it
  overwhelms, it can be cut to the three oblique rows without losing the unit;
  the subject and `mam` rows are there for completeness, not because they are
  new.
- Titles re-checked word by word at wiring, per the standing B1 batch 10
  reminder. All three show the ending doing a job rather than bare forms, per the
  correction batch 2 made to `b2_adj_gen`: *W nowej pracy · miejscownik*,
  *Dobrym nauczycielem · narzędnik*, *Dobremu bratu · celownik*. Every Polish
  word in all three titles was confirmed taught — `dobremu bratu` is attested as
  a `b2_adj_dat` type item, and `dobrym nauczycielem` as a `b2_adj_inst` one.
- All three units are **audit-clean, not tested** — nobody has clicked through
  them.

---

## Batch 4 — Block 2 closes, Block 3 opens (units 1–3)

Built `b2_adj_gym`, `b2_pron_acc`, `b2_pron_prep`. Each audit-clean (0 errors; the
same 2 pre-existing, unrelated warns from `a2_prep_review` / `b1_two_futures` that
every B1 and B2 batch has carried), pushed to `origin/b1-build` one at a time, not
batched. Two new structures registered in `SEQUENCING.md` **and** `audit.py`'s
`STRUCTURE_CATALOGUE` before each audit ran: `pron_acc`, `pron_prep`. `b2_adj_gym`
registered nothing, correctly — it teaches nothing.

Path is now live through `b2_pron_prep` (path index 142, 137 live nodes). Next
unbuilt B2 node: `b2_kim_czym`.

**Environment note for whoever runs next, because it cost time:** the routine
brief and `AGENTS.md` both say `py -X utf8`. That is the Windows launcher and it
does not exist in the cloud container — the interpreter there is `python3`, and
every tool (`make_pool.py`, `check_new.py`, `audit.py`) runs fine under
`python3 -X utf8`. Also: `tree.json` is written with **indent=2**. Re-serialising
it with any other indent rewrites all 3,700 lines and buries the real change; the
first attempt this batch did exactly that and was reverted before committing.

### `b2_adj_gym` (Block 2, unit 6 of 6 — the adjective block closes)

Zero new material, both `teaches_*` empty. Confirmed in the source before relying
on it that `audit.py` exempts gyms from the `teaches_empty_grammar` warn — it
skips the check when `"gym"` is in the node or pack id, which is why this unit
adds no third warn.

**What the gym adds that no single unit could.** The block taught the adjective
one case at a time, so the learner has never once seen the collisions. Slide 2 is
the whole unit: `dobrej` does **three** jobs (Genitive, Locative, Dative,
feminine), `dobrym` does two (Locative and Instrumental, m/n), `dobrą` does two
(Accusative and Instrumental, feminine), `dobrego` does two (Genitive, and the
object form of a masculine animate). The line it lands: the ending does not name
the job — the verb or preposition in front of it does.

**Kontrola items 6 and 7 carry the same four choices** (`nowego` / `nowym` /
`nowemu` / `nowy`) under two different sentences — *Idę do ___ sklepu* versus
*Mieszkam w ___ domu*. That is deliberate, and it is the cleanest demonstration
available that the sentence decides, because nothing else about the two items
differs. Same idiom as `b1_case_gym`'s paired `ci`/`te` items. Item 7's `explain`
also points out that `domu` itself is identical in both sentences, so the
adjective is the only thing carrying the case — which is `b2_adj_loc`'s central
contrast, re-met as a drill instead of a slide.

**All 12 quiz answers are distinct**, which is a genuine constraint for a gym
whose subject is one form doing several jobs. Solved by varying the *adjective*
rather than the job.

**`zimny` evened up, partially and honestly.** Batch 3 flagged that `zimny`
quietly dropped out of the block after `b2_adj_loc`, leaving Dad with `dobry` in
six forms and `zimny` in four. This gym puts `zimną` (Accusative), `zimnej`
(Genitive and Locative) and `zimnym` (Locative) back into real slots. It does
**not** reach `zimnemu` — that form is taught nowhere in the course, `b2_adj_dat`
fenced it deliberately, and the Dative of `zimny` therefore stays out, distractors
included.

**`nowe` and `duże` still appear nowhere at all** — `a2_plural_nom` taught both as
**plurals**. That is `b2_adj_acc`'s standing line, now held for six units running.

### `b2_pron_acc` (Block 3, unit 1 — an IOU three levels old is paid)

Six new forms (`cię`, `go`, `ją`, `nas`, `was`, `ich`) plus `mnie`, which reports
TAUGHT but only inside a frozen block and is re-taught here explicitly.

**This is the batch's real payoff and it was owed twice over.** `a2_dat_chunks`
taught *boli mnie* and its own note says: *"mnie in boli mnie is accusative, not
dative — deliberately NOT explained; Dad is told only that boli keeps mnie and
podoba/smakuje keep mi."* Then `b1_dative_pron` refused to generalise `boleć` onto
the new dative pronouns and said exactly why: *"it takes the accusative in every
person, a different pronoun set the course has not taught, and generalising the
new dative pronouns onto it would be a genuine grammar error, not a
simplification. This unit does not touch that fence."* The course now has that
set, so the fence comes down here and nowhere earlier — and `boli` is finally run
across persons (*boli mnie / boli cię / boli go*). Chunk-to-paradigm reveal, the
`dziękuję` / `której` / `nowego` precedent.

**The gift is that half the table was already owned.** The Dative column (`mi`,
`ci`, `mu`, `jej`, `nam`, `wam`, `im`) has been complete since path 118, so slide 2
is one new column beside one Dad already has, not fourteen new words. Slide 3 is
the verb list that decides which column, and every verb on it is already owned on
both sides.

**Word order — a real fence, and the reason the sentences look the way they do.**
Every item puts the object pronoun immediately after its verb, and where the
pronoun is a short clitic (`cię`, `go`, `ją`, `mi`, `ci`, `mu`, `jej`) the verb is
also clause-initial: *Kocham cię. Lubię go. Pomagam mu. Boli mnie głowa.* That
placement is always natural. Noun-subject sentences use **only** the full forms
(*Mama zna nas. Tata lubi was. Znam ich.*), because *Mama kocha cię* is marked
where *Mama cię kocha* is neutral — and choosing between those is a word-order
fact, not a pronoun fact. Stated to the learner as the same rule `się` has had
since `a2_sie`, with the fuller story left where B2-SPINE's C1 list already puts
it (item 19).

**`je` is fenced, and the consequence is stated openly.** The neuter and
non-virile-plural accusative is kept out for two reasons: the virile split
arriving in a new place is a second fact, and `je` collides head-on with *je*
"he/she eats". The spine's own list of this unit's forms stops at `ich`, so this
follows the spine rather than extending it. **Consequence: after this unit "them"
is expressible only for people.** Handed to C1.

Also fenced: `jego` and `ciebie` (long emphatic forms — sentence-initial emphasis
is a second fact); `siebie`/`sobie` (C1, spine O15); and **negated objects
anywhere**, since *nie znam jej* would put the object in the Genitive, which is
`b2_neg_gen`'s job later in this level.

**Two warnings logged for later units,** both in the `b1_virile_reco` tradition of
predicting a collision a batch before it bites:

1. `ich` is also the possessive "their". No collision today, since only `mój` and
   `twój` are taught — but whichever unit extends the possessives will be
   re-teaching this exact string as an unrelated word, and should expect the
   `ci`/`ci` treatment.
2. **A cross-language homograph the AGENTS.md table does not cover:** `was` is an
   English word. A learner reading an English prompt can read the Polish `was` as
   the English verb. Named in the `explain` on its own quiz item rather than left
   to sting.

`ci` appears in this pack **only** in its Dative sense. Its virile-demonstrative
sense appears nowhere, deliberately: `cię` and `ci` are already a one-letter
minimal pair carrying the unit's central contrast, and forcing a third reading of
`ci` onto the same board is exactly the collision `b1_case_gym` declined to re-run.

### `b2_pron_prep` (Block 3, unit 2 — pays `a2_o_loc`'s named fence)

Six new forms: `niego`, `niej`, `nim`, `nią`, `nich`, `nimi`. `a2_o_loc`'s note
said *"pronoun objects — o tobie, o mnie, o nim, o niej are new pronoun forms,
absent from POOL, and are never shown, glossed or demanded… They need their own
small unit."* This is that unit, for the third person.

**The whole rule is one line** — after a preposition, the him/her/them pronouns
all start with `n-` — and the three governors are the three already owned, each
keeping the case it has always had: `o` + Locative, `z` + Instrumental, `do` +
Genitive. A clean 3×3 grid with only six distinct shapes in it.

**The gift, and the reason this unit lands where it does on the path:** the
pronoun collapses its cases in *exactly* the pattern the adjective block just
taught. `nim` covers Locative and Instrumental for masculine, precisely as
`dobrym` does (*w dobrym hotelu* / *z dobrym kolegą*). `niej` covers Genitive and
Locative for feminine, precisely as `dobrej` does (*do dobrej szkoły* / *w dobrej
firmie*). Naming that parallel costs nothing and turns six forms into three plus a
pattern owned two units ago. Slide 2 is that table, with a column that literally
names the matching adjective.

**The unit's one real judgment call, and the conservative branch was taken:
THIRD PERSON ONLY.** `o mnie`, `o tobie`, `ze mną`, `z tobą`, `do ciebie`,
`z nami`, `z wami` appear nowhere. `tobie`, `tobą`, `mną`, `ciebie`, `nami` and
`wami` are all verified NEW — six more forms — and `ze mną` additionally requires
the `ze`-shape of `z` before m + consonant, which is a fact about the
**preposition**, not the pronoun. That is the do/z cliff in miniature.

The tempting middle option was considered and rejected on purpose: `o mnie`,
`o nas` and `o was` would cost **zero** new strings, since `mnie`, `nas` and `was`
were all taught one unit earlier. But shipping them without `o tobie` leaves the
most frequent cell of the row missing, and a half-row whose hole is the useful
cell is worse than a clean fence. **If James disagrees, the fix is a small
follow-up unit with those six forms plus the `ze`-rule** — nothing here depends on
the decision.

**`dla` was dropped, and it is batch 3's finding repeating.** B2-SPINE's own
illustrative example for this unit is *"do niego, dla niej"*, but `dla` reports
**NEW**: a preposition the course has never taught, so using it would smuggle a
new governor into a pronoun unit. Third batch running in which a spine example
turned out not to be pool-legal. **The spine is a design document, not a pool.**

`niemu` is not taught either, for a cleaner reason: no preposition in this course
governs the Dative, so the form would have no legal sentence to sit in. `w`/`na` +
pronoun is fenced too — `w nim` would put `nim` into a third job inside the very
unit that introduces it.

**The risk the unit is built around.** Dad has owned `go`, `ją` and `ich` for
exactly one unit, and the wrong sentence is **do go** rather than *do niego*. So
every bare-form / `n`-form pair is drilled against itself (quiz 1 vs 7, 2 vs 8,
5 vs 9, with `mu`/`jej`/`im` from the Dative column as third options), and Match
rows 10–12 deliberately put the three bare object forms on the same board as their
`n-` partners. Slide 3 is the same contrast stated once, plainly: look for the
little word first.

### Verification performed on all three packs

The batch-1/2/3 scanner was rebuilt from scratch for this run and used on every
pack before it was wired:

- Every authored string in every stage — intro tables (**every cell**, not just
  columns headed "Polish"), `title_pl`, `body_pl`, examples, match, quiz prompts,
  **quiz distractors**, `accepts` arrays — extracted and scanned token by token
  against the position-aware pool plus the pack's own `teaches_lemmas`. Roughly
  1,400 Polish tokens across the batch.
- **One string was changed as a result, the same class of error batch 3 caught.**
  `b2_pron_acc`'s slide 3 `body_pl` was drafted as *"czasownik wybiera formę"*.
  All four words came back NEW, and it is prose rather than established
  metalanguage — the exact objection that rewrote `choć` out of `b2_adj_inst` last
  batch. Replaced with *"biernik: kocham · lubię · znam · boli · celownik: podoba
  się · smakuje · pomagam · dziękuję"*, which uses only taught words plus two case
  names. The case names were then themselves verified rather than assumed: all six
  (`mianownik`, `biernik`, `dopełniacz`, `miejscownik`, `narzędnik`, `celownik`)
  occur between 8 and 46 times across existing packs, so they are house
  metalanguage, not an invention of this batch.
- **A learner-visible title was corrected before wiring**, per the standing B1
  batch 10 reminder. `b2_pron_acc`'s drafted `title_en` was *"Object pronouns · and
  why it is boli mnie, not boli mi"*. That puts a deliberately **ungrammatical**
  Polish string (*boli mi*) on the map, where a distractible learner meets it with
  no context. Rewritten to *"Object pronouns · the other half of mi, ci, mu"*,
  which states the same gift using only correct, taught forms; the *boli mnie /
  boli mi* contrast survives inside slide 1, where there is a sentence around it.
- **Pronoun fence scanned by hand over both pronoun packs**, because the auditor
  cannot see it at all: person pronouns sit in `audit.py`'s `GLUE_LEMMAS`, so a
  pronoun leak audits perfectly clean. Every fenced form (`niego`, `niej`, `nim`,
  `nich`, `nimi`, `jego`, `ciebie`, `siebie`, `sobie`, `je`, `tobie`, `tobą`,
  `mną`, `nami`, `wami`, `dla`, `niemu`) was grepped for across each pack with the
  `note` field stripped out first — since the note legitimately *names* what it
  fences, and leaving it in produces a false positive that looks like a leak.
  `b2_adj_gym` and `b2_pron_acc` came back clean of every `n-` form.
- Adjective fence scan re-run on `b2_adj_gym`: no `-ych`/`-ymi` plural obliques,
  no `nowe`/`duże`, no `zimne`. Clean.
- Mechanical stage checks per pack: Match exactly 12 rows with no duplicate `pl`
  or `en`, **no duplicate answers within any stage**, every quiz answer present
  among its own four choices, no duplicated choices inside an item, no Użycie item
  repeating a Pisanie item, every `teaches_lemma` both demanded in a drill stage
  *and* shown in intro/match/type, and a meta-question sniff over every Kontrola
  prompt.
- Distractor discipline held throughout: every wrong choice in all three packs is
  real taught Polish in the wrong slot. In the two pronoun packs the wrong choices
  are always the same person out of a different column or a different shape, so
  every `explain` can name the specific mistake rather than just asserting the
  answer. Nothing fabricated anywhere.

### For James's next smoke pass

- **`b2_pron_prep`'s third-person-only scope is the call I would most want a
  second opinion on.** After this batch Dad can say *about him / with her / to
  them* but not *about you* or *with me*. That is a real hole in an everyday
  register, and it was accepted deliberately — see the reasoning above. It is
  cheap to reverse with one small follow-up unit.
- **`b2_pron_acc`'s `je` fence has the same shape**: "them" now works for people
  and not for things. Also deliberate, also easy to add later, and it is what the
  spine itself specified.
- **`b2_pron_acc` slide 1 is the framing I would watch live.** It has to land as
  "here is finally the reason for a thing you have been saying since A2", not as
  "you have been saying something you did not understand". Batches 1 and 2 flagged
  the same hazard on `b2_copular_future`'s gender slide and `b2_adj_gen`'s *nic
  nowego* reveal; this is the third turn of that idiom and the highest-stakes one,
  because *boli mnie* is a phrase Dad genuinely uses.
- **`cię` and `ci` are one letter apart** and now sit in adjacent columns of the
  same table. If that pair turns out to be a real stumbling block in practice, the
  honest fix is a small discrimination gym after `b2_kim_czym`, not a rewrite of
  either unit.
- **`b2_adj_gym` is dense**: three intro surfaces, 12 match rows, 12 quiz items,
  10 type items, 10 use items, and it teaches nothing. If it plays as long rather
  than as consolidation, the quiz is the stage to trim — items 10 and 11 (`małym`
  / `małego`) repeat discriminations already made on `dobry` and `nowy`.
- All three units are **audit-clean, not tested** — nobody has clicked through
  them.
- Titles re-checked word by word at the moment of wiring, per the standing B1
  batch 10 reminder. `b2_adj_gym` → *Siłownia · dobry* (both words taught,
  matching `b1_case_gym`'s *Siłownia · wszystko*); `b2_pron_acc` → *Kocham cię ·
  biernik*; `b2_pron_prep` → *Znam go · do niego*, which shows the unit's actual
  contrast rather than the spine's drafted *O nim, z nią*. Every Polish word in
  all three titles is taught at or before its own node.

---

## Batch 5 — Block 3 closes, Block 4 opens (units 1–3)

Built: `b2_kim_czym` (path 143), `b2_health_system` (144), `b2_ze_clauses` (146).
`b2_station_1` (145) skipped and left `planned`, as all stations are forever.
Audit after each unit: **140 nodes, errors 0, warns 2** — both warns
(`a2_prep_review`, `b1_two_futures`) pre-date this batch and are the
teaches-nothing gym idiom.

Two new structure IDs registered in `SEQUENCING.md` and `audit.py` **before**
either audit ran: `question_cases`, `ze_clauses`.

### `b2_kim_czym` (Block 3, unit 3 — two named fences paid at once)

Five new forms: `kogo`, `czego`, `komu`, `kim`, `czym`. `kto` and `co` report
TAUGHT (`a1_questions`) and are anchors, recycled and never re-taught.

**The two fences, both named years of path-index ago and neither ever built.**
`a2_inst_z`: *"kim is a new pronoun form and is not in POOL… if James wants
Z kim? as a live question it needs its own small unit"* — the same fence behind
one of AGENTS.md's three named title-rule violations. `a2_o_loc`: *o czym* kept
out of every slide **and** out of `body_pl` there. Both paid, in the same five
forms.

**No new governors anywhere.** Every case in the unit is assigned by a verb or
preposition already owned: object verbs, `do` + Gen, `nie ma` + Gen,
`pomagać`/`dziękować` + Dat, `o` + Loc, `z` + Inst, bare Inst of transport, and
`być` + Inst identity. That is what let a unit introducing five forms stay small.

**The gift, and slide 2 is built on it: five forms carry eight jobs, and all
three mergers are re-sightings rather than new facts.** `kogo` merges object
with Genitive — exactly what `b2_adj_gen` taught for masculine animates
(*Mam małego psa* / *do małego psa*), and `kto` is a person. `kim` and `czym`
each merge Locative with Instrumental — exactly as `nim` does (`b2_pron_prep`,
one unit earlier) and `dobrym` does (`b2_adj_loc` → `b2_adj_inst`). Slide 2's
table has a column that literally names where the learner saw each merger
before, the same device `b2_pron_prep` used one unit back.

**The honest counter-case, one line and one quiz pair:** for a THING the object
form is just `co` (*Co masz?*). Only people and animals merge object with
Genitive. Without this, the predictable over-generalisation is *czego masz*.

**`czemu` is fenced absolutely** — not in a table, not as a distractor — on two
independent grounds, either sufficient: the Dative of a thing earns this learner
nothing, and `czemu` is also colloquial Polish for *why*, so shipping it would
plant a homograph inside the very unit introducing the form. The Dative row
carries an em dash in the thing column instead, and the slide says plainly that
things almost never take that one.

**Two real bugs were caught by the scanner in my own draft**, both of the class
this project keeps re-finding:

1. Slide 3's answer column had *Mówię o **bracie***. `bracie` is a Locative of
   `brat` that the course has never taught — the pool has `brata`, `bratem`,
   `bratu` and nothing else. Replaced with *Mówię o siostrze*, `siostrze` being
   taught as a Dative **and** Locative by `b2_fem_soft`, which makes it a small
   bonus callback to that unit's gift.
2. Quiz item 5 carried **`Czemu`** as a distractor — in a pack whose own note
   says `czemu` appears nowhere. A fence broken by the author who wrote it, three
   paragraphs after writing it. Replaced with `Czego`.

**Quiz answer repeats are deliberate and this is now a standing pattern.** The
unit has exactly seven legal answer strings, so twelve distinct answers is
arithmetically impossible without padding or fabrication. The quiz is instead
built on five minimal pairs (items 1/2, 4/5, 6/7, 8/9, 1/10), each pair being the
same answer under two structurally different sentences — which is the cleanest
available demonstration that the sentence decides the form. Same call
`b2_adj_gym` made, for the same reason.

### `b2_health_system` (Block 3 vocab — the system, not the body)

Twelve new words, all verified NEW. Anchors recycled and never re-taught:
`lekarz`, `pacjent`, `wizyta`, `karetka`, `pielęgniarka` (`leaf_health_a1`),
`ubezpieczenie`, `recepta`, `badanie`, `przychodnia`, `szczepienie`
(`a2_health2`), `kolejka` (`leaf_shopping_a1`), `szpital` (`leaf_places`),
`termin` (`b1_plans`). 28 sentences across 24 already-owned structures,
including `question_cases` from the unit immediately before it on the path.

**`izba przyjęć` replaces the spine's bare `izba`, and this is the pack's main
judgment call.** `izba` alone is a near-archaic word for a room and would be a
misleading thing to hand this learner; `izba przyjęć` is the sign actually on
the hospital door. Taught as **one frozen chunk** — the genitive plural inside
it is never decomposed, explained or drilled, and the gloss says to learn it
whole. Multiword-citation precedent is well established and live: *piłka nożna*,
*w porządku* (`a1_freetime`), *dom handlowy*, *rozmowa kwalifikacyjna*, *praca
domowa*, *zwrot pieniędzy*, *nauki ścisłe*. `zastrzyk` and `dyżur` were both
checked as alternatives and are NEW and available if James would rather have a
simple single word here.

**`specjalista` is the `-a` masculine trap AGENTS.md names.** Gender badge says
`m`; its `explain` points at `tata` and `kolega`, two `-a` masculines owned since
A1, rather than asserting the gender flatly. Its accusative `specjalistę` is not
taught — irregular enough to need its own moment, and it earns nothing here.

**`skierowania` is the one form in the batch that extends a rule, and it is the
thing I would most want James to look at.** `gen_endings` states the neuter
genitive as *-o → -a* (*okno → okna*); `skierowanie` is a neuter in *-e*, and
*-e* neuters land on *-a* as well. Same destination by the same logic, but the
course has never shown an *-e* neuter in the genitive. Handed over as a
memorised whole form with an `explain` that names what it is doing — the
`kelnerzy` / `mógłby` / family-datives treatment — because *Nie mam skierowania*
is the single most useful sentence in the pack. **If James would rather the
course stayed silent on *-e* neuter genitives until a rule unit, sentence 3 is
the only place to remove and nothing else depends on it.**

**`na` + Accusative is fenced, and it cost two obvious sentences** — *dzwonię na
pogotowie* and *czekam na wyniki*, both of which a real patient says. `na` has
only ever been a Locative preposition in this course (`prep_w_loc`), so `na` +
Acc would be a new governor smuggled in through a vocab leaf. Left for whichever
B2/C1 unit takes the preposition properly.

### `b2_ze_clauses` (Block 4, unit 1 — zero new lemmas, one joint)

**Chunk-to-paradigm reveal, and B2-SPINE O16 called it a block in advance.**
`że` reports TAUGHT (`b1_polite`) but only frozen inside *Przepraszam, że
przeszkadzam*, whose own note records *"że and przeszkadzam both verified
untaught… never built"*. Re-taught explicitly here, and the slide says so out
loud. Fifth turn of the `dziękuję` / `której` / `nowego` / `mnie` idiom. Per the
`b2_adj_gen` convention the already-owned string stays in `uses_lemmas`, so
`teaches_lemmas` is legitimately empty (`copular_future` / `adj_inst` precedent).

**`wiem` is a second chunk-to-slot reveal in the same unit, and it carries a hard
fence.** `a2_directions_func` quarantined it explicitly: *"this unit NEVER
mentions znam, never conjugates wiem, and never shows the infinitive."* That
quarantine is held — `wiem` appears in the first person only, and `wiesz`, `wie`
and `wiedzieć` appear nowhere, all three being NEW and the *wiedzieć*-vs-*znać*
split still live untaught ground.

**THE DELIBERATE DEVIATION FROM THE SPINE, conservative branch, flagged for
James.** B2-SPINE says this unit rides *mówił*/*mówiła*. It does not — **every
matrix verb here is present tense.** The moment a past-tense verb of saying takes
a `że`-clause, the learner meets the fact that Polish does not back-shift the
tense (*Powiedział, że jest zmęczony*), and that is `b2_reported`'s **one** new
idea, on the very next node of the path. Handing it over early and unnamed inside
a unit about a conjunction would spend the next unit's whole payoff to buy
nothing. It also removes the `mówił` glossing problem, since AGENTS.md's
dynamic-verb rule would force *"was saying"*, which reads oddly in a reporting
frame. **Nothing in `b2_reported` depends on this being reversed** — it simply
inherits a clean slate.

**The comma is the unit's second fact, and it is one line.** English drops both
the comma and the word itself (*"I know she is at home"*); Polish drops neither.
Naming that asymmetry is the point, because it is precisely what an English
speaker under-produces.

**Two discriminations, both zero new material.** `że` vs `żeby` (`b1_zeby` owns
the latter) — now in the same syntactic slot, so confusing them is the
predictable error; the line landed is *że reports what is so, żeby gives a
purpose or a wish*. And `że` vs `który` (`b1_ktory_cases`), which is arguably the
more valuable of the two **because the difficulty is caused by English rather
than by Polish**: English "that" is both the conjunction and the relative
pronoun, so *I know that…* and *the book that I read* look identical to this
learner while Polish keeps them wholly apart. Quiz items 3 and 9 reuse
`b1_ktory_cases`' own example sentences rather than inventing new ones.

### Verification performed on all three packs

The scanner was rebuilt for this batch and run on every pack before it was wired.

- Every authored string on every learner-facing surface — intro tables (**every
  cell**), `title`, `title_pl`, `body_pl`, examples, match, quiz prompts,
  **quiz distractors**, `accepts` arrays, type and use items, and every vocab
  `sentences[]` entry — extracted and scanned token by token against the
  position-aware pool plus the pack's own `teaches_lemmas`. Surfaces were split
  into STRICT (pure Polish: `pl`, `answer`, `title_pl`, `body_pl`, `accepts`,
  `choices`), which must come back completely clean, and MIXED (titles, table
  cells, quiz prompts carrying English glosses), whose residue was read by eye.
  All three packs: STRICT clean.
- **Two strings were changed as a result**, both in `b2_kim_czym` and both
  documented above (`bracie`, `Czemu`). This is the third consecutive batch in
  which the scanner caught a leak the author had not seen.
- **Pool regenerated three times**, once before each unit
  (`--before b2_kim_czym`, `--before b2_health_system`, `--before b2_ze_clauses`),
  so each pack was written against what is taught strictly before *it* rather
  than against the batch's starting state. This mattered: `b2_ze_clauses` legally
  recycles `skierowanie`, `wyniki`, `diagnozę`, `leczenie` and `specjalista` from
  `b2_health_system` two nodes earlier, and `b2_health_system` legally recycles
  `czym` from `b2_kim_czym`.
- **Homograph "taught AS" check re-run on every recycled form**, per AGENTS.md.
  The two that mattered: `siostrze` and `mamie` are used in the Locative and the
  Dative respectively, both licensed because `b2_fem_soft` teaches them as the
  same form doing both jobs; `zamknięty` is used as the plain adjective
  `leaf_shopping_a1` taught it as, **not** as the participle `b2_participle_pass`
  will later reveal it to be.
- **Fence greps with `note` stripped first**, since a note legitimately names what
  it fences and leaving it in produces false positives. `b2_kim_czym`: `czemu`,
  `czyj`, `dla`, `bracie`, and every fenced pronoun form — clean. `b2_ze_clauses`:
  `wiesz`, `wie`, `wiedzieć`, `nadzieję`, `cieszę`, `uważam`, `wydaje`, `słyszę`,
  `mówił`, `mówiła`, `powiedział`, `nie wiem` — clean. `b2_health_system`:
  `oddziale`, `rejestracji`, `leczeniu`, `wyników`, `zabiegu`, `specjalistę`,
  `na wyniki`, `na pogotowie` — clean.
- **A dedicated indirect-question sniff** was written for this batch and run over
  both grammar packs — a regex for any matrix verb followed by a comma and a
  question word. Zero hits. This fence matters more than usual right now because
  `b2_kim_czym` hands the learner five question words and `b2_ze_clauses` hands
  him the subordinating comma, which is exactly the pair that makes *Nie wiem,
  gdzie…* constructible two units before `b2_indirect_q` is meant to teach it.
- Mechanical stage checks per grammar pack: Match exactly 12 rows with no
  duplicate `pl` or `en`, every quiz answer present among its own choices, no
  duplicated choices inside an item, no duplicate quiz prompts, no duplicate type
  or use answers, no Użycie item repeating a Pisanie item, every `teaches_lemma`
  demanded in a drill stage, and a meta-question sniff over every Kontrola prompt.
  For the vocab pack: roll-up check that every item-level `structures` and
  `lemmas` tag is a subset of the pack's declared `uses_*` — **this caught two
  real gaps** (`o_loc` and `present_e_isz` used in sentences but missing from
  `uses_structures`), both fixed before wiring. Also: 12 block items, every one
  carrying a gender badge, no duplicates.
- **`kind: "syntax"` on `b2_ze_clauses` was checked against the engine before
  shipping**, since the value was otherwise unused in the course. `js/practice-
  grammar.js:97` consults `kind` only as a *fallback* for the type mode, after
  `item.mode` and `pack.type.mode`; the pack sets both explicitly, so the value
  is inert. `a1_motion` already ships live with a non-morphology `kind`.
- All eight station placeholders re-checked as `planned` after every wiring.

### For James's next smoke pass

- **`skierowania` is the call I would most want a second opinion on** — the one
  place this batch extends a stated rule rather than staying inside it. Removing
  it costs exactly one sentence (see above).
- **`b2_ze_clauses`' present-tense-only matrix is the other deliberate fork.**
  After this unit Dad can say *I know that…* and *Dad says that…* but not *Dad
  said that…*. That is one node's wait, not a permanent hole — `b2_reported` is
  next and it is where the fact belongs.
- **`izba przyjęć` is the item most likely to feel hard in practice**, being the
  only two-word entry on the board. If it plays badly it is a one-line swap to
  `zastrzyk`, which is verified NEW and needs no other change.
- **`b2_kim_czym` slide 2 is the framing I would watch live.** It has to land as
  *"you have met all three of these mergers already"*, not as *"here are three
  more things"*. Fourth turn of an idiom the last three batches have each flagged
  — and the cheapest one so far, since every merger it names was taught inside
  the last six units.
- **`czym` and `czy` are one letter apart**, and `czy` is among the most frequent
  words Dad owns. The quiz guards it with `czego`/`co` distractors rather than
  with `czy`, which would have made the item about spelling rather than about
  case. If the pair turns out to be a real stumbling block, the honest fix is a
  distractor swap, not a rewrite.
- All three units are **audit-clean, not tested** — nobody has clicked through
  them.
- Titles re-checked word by word at the moment of wiring, per the standing B1
  batch 10 reminder. `b2_kim_czym` → *Kto? Kogo? Z kim?* (the drafted tree label
  was *Z kim? O czym?*; both are legal, the shipped one shows the Nominative
  anchor beside two of the new forms). `b2_health_system` → *Przychodnia i
  szpital* (both nouns taught, `przychodnia` from `a2_health2`, `szpital` from
  `leaf_places`). `b2_ze_clauses` → *Wiem, że…*, whose two Polish words are the
  two chunk-to-slot reveals the unit is built on. Every Polish word in all three
  titles is taught at or before its own node.

## Batch 6 — Block 4, units 2–4 of 7 (`b2_reported`, `b2_indirect_q`, `b2_ktory_full`)

Built the next three unbuilt nodes in path order, one at a time, each wired and
audited before the next was started. Each audit-clean (**0 errors**; the same two
pre-existing, unrelated warns from `a2_prep_review` / `b1_two_futures` that B1 and
every B2 batch have carried), pushed to `origin/b1-build` per unit, not batched.
Three new structures registered in `SEQUENCING.md` **and** `audit.py`'s
`STRUCTURE_CATALOGUE` before each audit ran: `reported`, `indirect_q`, `ktory_full`.

Path is now live through `b2_ktory_full` (path index 149, **143 live nodes**, 18 of
B2's 48 non-station nodes done). Next unbuilt B2 node: **`b2_abstract`** — the
Block 4 vocab leaf, and the first vocab pack since `b2_health_system`.

**Environment note for whoever runs next, because it cost time.** This repo's
`main` is still the old v0.2 shell and has **no `codex/` directory at all** — the
whole course world lives on `b1-build`. A cloud session starts detached at `main`,
so the first act must be `git fetch origin && git checkout -B b1-build
origin/b1-build`. Also `py -X utf8` is a Windows launcher and does not exist on
the Linux runner; use `python3 -X utf8`. Everything in AGENTS.md otherwise holds.

### `b2_reported` (Block 4, unit 2)

One new word and one new fact. The fact: **Polish does not back-shift the tense** —
whatever tense the speaker used is the tense you keep, so English "Dad said the shop
WAS closed" is *Tata powiedział, że sklep JEST zamknięty*. Framed as a gift (the
`a2_bedzie` "the future has no gender" idiom), which makes it the third unit in a
row that removes work rather than adding it.

This **cashes in `b2_ze_clauses`' logged deferral exactly as that pack predicted** —
it kept every matrix verb in the present precisely so this fact would land here, and
it recorded that nothing downstream depended on the choice being reversed. It did
not: the joint arrived entirely owned, and this pack added only the past-tense
matrix verb on top of it.

*powiedzieć* is handed over **whole in five forms** as the perfective twin of the
owned *mówić*, per O7.2's closed-list treatment. Worth noting it honours
`a2_aspect`'s "prefixes are unpredictable" line cleanly rather than straining it,
being **suppletive rather than prefixed**. The gender split is not a new fact, just
`past_ac` on a new verb, and is presented that way.

**THE JUDGMENT CALL, conservative branch, and the one I would most want James to
look at.** The **person shift is fenced**: no item asks the learner to turn a quoted
*Jestem zmęczony* into a reported *jest zmęczony*. Intro transformations use
noun-subject quotes so literally nothing inside the clause moves, and third-person
reports are only ever driven from English prompts that already say "he" — so the
learner translates, never transforms. **The counter-argument is real and is recorded
in the pack note rather than buried:** the person shift is *not a Polish-specific
fact*, since English shifts identically, so including it would arguably cost no new
learning. It was still left out because it is extra production work inside the unit
that introduces the tense fact, and load-splitting decides ties in this course.
**If James wants it, it is one slide and three items — not a rewrite.**

### `b2_indirect_q` (Block 4, unit 3)

Zero new lemmas. Pays `a2_questions2`'s fence by name ("no indirect questions:
*Nie wiem, kiedy…* is B1"), which was never built at B1.

The headline is again a **gift**: English *reorders* a question when it goes inside a
sentence ("Where IS the chemist's?" → "I don't know where the chemist's IS"), and
Polish never inverted in the first place, so there is nothing to undo. Stated as the
slide-1 headline deliberately — an English speaker will otherwise expect to have to
do something and go hunting for it. The one new job is *czy* = "whether"/"if",
framed honestly as the same word doing the same job, just embedded; the asymmetry is
on the English side, which switches words where Polish does not.

The **że / czy minimal pair** is the sharpest thing in the unit and costs nothing:
*Wiem, że mama jest w domu* vs *Nie wiem, czy mama jest w domu* — same clause, and
the opener alone decides settled versus open. Quiz items 3 and 4 are that pair back
to back. It also guards the predictable error of over-reaching for *że*, which had
been taught two nodes earlier.

The **Match board is twelve question words, one per row** — the first place the five
oblique forms from `b2_kim_czym` do real work, that pack having fenced embedded
questions absolutely.

**A REAL SCOPE LIMIT, logged rather than worked around.** The standing *wiem*
quarantine (`a2_directions_func`: "never conjugates wiem", held by `b2_ze_clauses`)
means the only available openers are *Wiem*, *Nie wiem* and *powiedział*/
*powiedziała* from the previous node. **Consequence, stated plainly: Dad can say "I
don't know where…" but not "Do you know where…?"** — which is the more useful
sentence in a street. Lifting the quarantine means teaching *wiedzieć* properly with
the *wiedzieć*/*znać* split; that is a real unit and belongs on the **C1 inbox**. It
was not smuggled in here.

**AN IOU DELIBERATELY CREATED FOR `b2_jesli`, recorded because it will not be
obvious later.** The classic English-speaker error with *czy* is confusing it with
*jeśli*. That error is **impossible today** — *jeśli* is verified NEW and untaught
until `b2_jesli`, two nodes on — so this pack cannot usefully drill the contrast.
**`b2_jesli` arrives holding the other half and should carry the *czy*/*jeśli*
discrimination**, since by then Dad will own both and English collapses them onto
one word.

### `b2_ktory_full` (Block 4, unit 5)

Pays **B1-DIGEST deferred item #2, both halves.** (a) Locative and Instrumental
relatives, which `b1_ktory_cases` fenced and logged as "deferred to a later pass or
a dedicated unit". (b) Masculine-animate antecedents, fenced at B1 because *którego*
would then sit in the Accusative table for a *different* reason than in the Genitive
table — **an objection that has since dissolved**, because `b2_adj_gen` taught
Acc≡Gen for masculine animates as a general fact. The spine's placement reasoning
held up exactly.

**One new string in the entire unit: *którym*.** *której*, *którą* and *którego* are
all owned and are extended to new jobs. Slide 4 exists to say so: every merger here
has already been met three or four times — *którym* covers Loc+Inst exactly as
*dobrym*, *nim* and *kim* do; *której* covers Gen+Loc as *dobrej* and *niej* do;
*którą* covers Acc+Inst as *dobrą* and *nią* do; *którego* covers Gen+Acc-animate as
*dobrego* and *kogo* do. Fifth turn of the "same endings, another job" idiom.

**The homograph trap here is the sharpest the level has hit, and it is named out
loud on slide 2.** *o której* has been a **frozen chunk since `a2_ordinals_time`
meaning "at what time"** (*O której jest spotkanie?*); the relative *o której* is the
same two strings doing an unrelated job. Quiz item 12 puts the frozen chunk directly
beside the relative — the *ci*/*ci*, *może*/*może* treatment. Note this is the
**second** re-opening of that string: `b1_ktory_cases` already re-taught it as a
Genitive.

Fenced and **handed to the C1 inbox**: all **plural relatives** (*którzy*, *których*,
*którymi*, plural *którym*) — the relative declines like an adjective, so shipping
them would breach B2-SPINE **O3**'s plural-oblique-adjective hand-over *by the back
door*, which is worth flagging because it is not obvious; and **`któremu`**, the
dative relative, a fifth case and fifth new string in a unit already landing four
jobs, mirroring `b2_pron_prep`'s fencing of *niemu*. Both are scope cuts, not
oversights.

### Verification performed on all three packs

The scanner was rebuilt for this batch and, before being trusted, **calibrated
against all thirteen already-shipped B2 packs** — it had to reproduce "clean" on
every one of them before it was allowed to judge new work. That calibration changed
the tool three times and is worth recording, because two of the changes encode house
conventions a naive scanner gets wrong:

- Bare governor prepositions (*do, z, w, na, o, od, po, za*) appear in the pool only
  inside multiword phrases but are genuinely taught as governors. Allowed. **`dla`
  is deliberately excluded** — it is verified NEW.
- `title_pl` / `body_pl` are the one surface AGENTS.md permits untaught metalanguage
  on, and shipped packs also put bare ending fragments there (*-ego*, *-ym*, *-ą*).
  Reclassified from strict to eyeball.
- **Bare subject pronouns are course-wide glue.** A first pass flagged `on` in
  `b2_adj_gen`'s live Użycie as an untaught-pronoun leak. Before touching a shipped
  unit I swept every live pack: *on*/*ona* are used in **16–17 packs since
  `a1_miec`**, so this is an established convention, not a defect. **Nothing was
  "fixed".** This does *not* license the oblique pronouns, which are genuinely
  fenced.

With that calibration in place, on all three new packs: every authored learner-facing
string — intro tables (every cell), titles, `body_pl`, examples, match, quiz prompts,
**quiz distractors**, `accepts`, type and use items — extracted and scanned token by
token against the position-aware pool plus the pack's own `teaches_lemmas`. Strict
surfaces (`pl`, `answer`, `accepts`, `choices`, and the pure-Polish head of each
gap-fill prompt) came back **completely clean on all three**.

- **One real leak caught and fixed before wiring:** `filmie` (verified NEW, and
  fenced by this very pack) had got into a `b2_ktory_full` quiz explanation, inside
  the phrase *o dobrym filmie*. Rewritten to *o nim*. **This is the fourth
  consecutive batch in which the scanner caught a leak the author had not seen** —
  and note it had no diacritics, so it hid in the English-looking residue rather
  than the obvious pile.
- **One real audit error caught and fixed honestly.** `b2_indirect_q` first audited
  with `errors 1`: I had declared the bare phrase `to jest` in `uses_lemmas`, but
  that is a **structure** (`to_jest`, already declared), never a taught lemma. The
  sentence *Nie wiem, kto to jest* is legal by every route — *kto to jest* is itself
  a taught chunk and every word is independently owned. **The bogus tag was removed
  rather than the error silenced.**
- **Pool regenerated three times**, once before each unit (`--before b2_reported`,
  `--before b2_indirect_q`, `--before b2_ktory_full`), so each pack was written
  against what is taught strictly before *it*. This mattered: `b2_indirect_q` legally
  recycles *powiedziała* from `b2_reported` one node earlier, in three items.
- **Two candidate sentences were killed by `check_new.py` during drafting** rather
  than smuggled in: *Znam kolegę, z którym pracujesz* and *Mama mówi o filmie…* —
  `kolegę` and `filmie` both verified NEW. Replaced, and the fences logged.
- **Homograph "taught AS" check re-run on every recycled form.** The ones that
  mattered: *o której* (the whole point of `b2_ktory_full` slide 2); *otwarty* and
  *zamknięty*, used as the **plain adjectives** `leaf_shopping_a1` taught, not as the
  participles `b2_participle_pass` will later reveal — the same care `b2_ze_clauses`
  took; *kupił* as `a2_aspect`'s perfective past; *którą* used as a distractor in its
  real B1 job.
- **Fence greps with `note` stripped first**, since a note legitimately names what it
  fences. All clean. One instructive false positive: grepping bare `wiedzieć` "hit"
  ten times in `b2_reported` — because **`po·wiedzieć` contains it**. Re-run with
  word boundaries: zero. Worth remembering, as the same trap will fire on any future
  pack teaching a prefixed verb.
- **A dedicated indirect-question sniff** (matrix verb + comma + question word) run
  over `b2_reported`: **zero hits**, which is the fence that mattered most, the unit
  sitting one node before `b2_indirect_q`.
- **A relative-*który* sniff** run over `b2_indirect_q` (noun antecedent + comma +
  *który*): the raw regex hit seven times, all preceded by *wiem* — i.e. the
  **interrogative** use inside an embedded question, not a relative. **No noun
  antecedent anywhere**, so `b2_ktory_full`'s material did not leak backwards.
- Mechanical stage checks per pack: Match exactly 12 rows with no duplicate `pl` or
  `en`, every quiz answer present among its own choices, no duplicated choices, no
  duplicate prompts, no duplicate type or use answers, no Użycie item repeating a
  Pisanie item, every `teaches_lemma` demanded in a drill stage, and a meta-question
  sniff over every Kontrola prompt. All three clean.
- **All eight station placeholders re-checked as `planned` after every wiring** — by
  assertion, not by eye.

### For James's next smoke pass

- **`b2_reported`'s fenced person shift is the call I would most want a second
  opinion on.** After this unit Dad can say *Tata powiedział, że sklep jest
  zamknięty* fluently, but he has never been asked to produce *jest* from a quoted
  *jestem*. One slide and three items if you want it.
- **`b2_indirect_q` cannot express "Do you know where…?"**, which is the sentence a
  real traveller actually needs. That is the *wiem* quarantine, inherited and held
  for the third unit running. It may be the single highest-value item on the C1
  inbox.
- **`b2_ktory_full` is the densest of the three** — four jobs and four slides. Slide
  4 is the one to watch live: it has to land as *"you have met all of these
  already"*, not as *"here are four more things"*. That framing is now on its fifth
  outing and every batch has flagged it; this is the cheapest instance yet, since
  three of the four mergers were taught inside the last ten nodes.
- **The *o której* item (`b2_ktory_full` quiz 12) is the one most likely to feel
  unfair in practice.** It is deliberately the frozen A2 time question sitting in a
  unit about relatives. If it plays badly the honest fix is to move it into the intro
  as a shown contrast rather than a scored item — not to remove the trap, which is
  real and will bite in the wild.
- All three units are **audit-clean, not tested** — nobody has clicked through them.
- Titles re-checked word by word at the moment of wiring, per the standing B1 batch
  10 reminder, and **two drafted `tree.json` labels were corrected**: `b2_reported`
  → *Powiedział, że…* (drafted *Mówił, że…*; the shipped title names the verb the
  unit actually teaches, and *powiedział* is legal in its own node's title),
  and `b2_ktory_full` → *Film, o którym…* (drafted *Z którym? O którym?*, which read
  as a pair of questions when the unit is about relatives, not questions). Every
  Polish word in all three titles is taught at or before its own node.

---

## Batch 7 — Block 4 closes (`b2_abstract`, `b2_jesli`, `b2_gdyby`)

Built the next three unbuilt nodes in path order, one at a time, each wired and
audited before the next was started. Each audit-clean (**0 errors**; the same two
pre-existing, unrelated warns from `a2_prep_review` / `b1_two_futures` that every
batch since B1 has carried), pushed to `origin/b1-build` per unit, not batched.
Two new structures registered in `SEQUENCING.md` **and** `audit.py`'s
`STRUCTURE_CATALOGUE` before each audit ran: `jesli`, `gdyby`. `b2_abstract` is a
vocab leaf and registers none, per the standing convention.

**Block 4 is now complete.** Path is live through `b2_gdyby` (path index 152,
**146 live nodes**, 21 of B2's 48 non-station nodes done). Next unbuilt B2 node:
**`b2_loc_pl`** — the opener of Block 5, plural cases, and per the spine the
easiest unit in the level.

The batch-6 environment note still holds and still matters: `main` has no
`codex/` directory, so a cloud session must start with `git fetch origin && git
checkout -B b1-build origin/b1-build`, and `py -X utf8` does not exist on the
Linux runner — use `python3 -X utf8`.

### `b2_abstract` (Block 4 vocab — the nouns an opinion needs)

Twelve new words, all verified NEW: przyczyna, skutek, wpływ, zmiana,
rozwiązanie, wada, zaleta, cel, sposób, możliwość, wybór, decyzja.

**The spine offered sixteen and said trim to twelve; here is which four went and
why.** Dropped **korzyść** — its English gloss ("benefit") is barely
distinguishable from *zaleta*'s, and keeping it would have put a *third* soft
feminine in one pack; **wartość**, the most abstract of the set and the one that
earns this learner least; **społeczeństwo** and **środowisko**, which are words
for essays about society and ecology rather than words for saying what you think
about an ordinary thing. All four are verified NEW, cost nothing to teach later,
and go to the **C1 inbox**.

Taught as pairs where they are used as pairs — przyczyna/skutek, wada/zaleta —
and the glosses are deliberately held apart, with *wpływ* glossed "an influence"
and never "an effect" so it does not collide with *skutek*.

Three inflected forms taught alongside the citations: **przyczynę**, and
**wady / zalety**. Those two carry the `-y` homograph AGENTS.md names — plural
versus genitive singular, the *córki / wina / gazety / okna* collision — and
since both words are new here nothing earlier can be misread, but the pack still
teaches them explicitly as plurals, says so in an explain, and uses them in no
other job anywhere. *Wady i zalety* is the single most useful phrase in the set
and was worth the care.

**sposób and wybór carry the ó/o alternation and skutek a fleeting e**
(sposobu, wyboru, skutku). None of those forms appears. All three are used in the
Nominative and Accusative only, where a masculine thing does not move at all, so
the alternations are never met and never have to be explained — which is what
decided them over the four words dropped.

**Two fences worth knowing about, both of which cost real sentences.** No
genitive of any new noun, which killed *Nie ma rozwiązania*: `b2_health_system`
already spent one flagged exception on the `-e` neuter genitive (*skierowania*)
and asked James to rule on it, and doubling down before he answers would turn a
single flagged instance into a half-taught rule. And `na` + Accusative stays
fenced per that same pack, which cost **mieć wpływ na** — the real collocation
for *wpływ*, and the reason that word appears in plainer frames than it deserves.
It is now the strongest single argument for a `na` + Accusative unit at C1.

*ważny* is verified NEW and was kept out of every sentence, gloss and explain
because B2-SPINE hands it to `b2_travel_func`.

### `b2_jesli` (Block 4, unit 6 — Polish puts in the tense it means)

One new word in the entire unit, *jeśli*, and zero new morphology.

The one teaching point beyond the word is the tense inside the *jeśli*-clause,
and it is framed as **English being the odd one out** rather than Polish
demanding something extra — the `a2_bedzie` / `b2_indirect_q` gift idiom, now on
its fourth outing. English says a present after "if" even when it plainly means
the future; Polish just puts in the tense it means. Present-tense conditions stay
present, so both are drilled and the choice is always "what do you actually
mean". Five Pisanie items demand *będzie* / *będziesz* from an English present
and **each carries an explain**, since the prompt deliberately does not show it.

**Pays `b2_indirect_q`'s explicit IOU.** That pack created it, flagged it as one
that would not be obvious later, and named this unit as the place: the classic
error is confusing *czy* with *jeśli*, and it was undrillable there because
*jeśli* was still untaught. It lands as a minimal pair on **one clause** — quiz
11 *Nie wiem, **czy** to jest dobra decyzja* against quiz 12 ***Jeśli** to jest
dobra decyzja, będzie dobrze* — plus a test the learner can apply in English
without knowing any Polish: swap "if" for "whether" → *czy*; swap it for "in the
case that" → *jeśli*. Both *czy* sentences are **produced**, not merely
recognised, in Użycie.

**Word order fenced to *jeśli*-first, conservative branch, logged.** The reversed
order (*Będę w parku, jeśli…*) is grammatical and common but is a second fact,
and every subordinate clause the learner owns so far — *że*, *żeby*, *który*,
embedded questions — comes second, so *jeśli*-first is already the new shape. All
twelve match rows share one skeleton on purpose. **C1 inbox.**

**The spine's own example sentence was rebuilt.** B2-SPINE gives *Jeśli będzie
ładna pogoda, będę w parku*, but *będzie ładna pogoda* is the existential
*będzie* that `b2_copular_future` explicitly fenced. Every weather condition in
the pack is therefore built subject-first: *Jeśli pogoda będzie ładna*.

### `b2_gdyby` (Block 4, unit 7 — the marker moves onto the opener)

Pays `b1_conditional_sg`'s named fence ("simple wishes and soft requests only, no
*gdybym* / *jeśli…by* clauses"), and sits one node after `b2_jesli` so real and
unreal conditions arrive back to back and are taught against each other.

Three new strings and nothing else: *gdybym*, *gdybyś*, *gdyby*. The person
marker is the **third turn of one pattern**, said out loud on slide 2: `-m` / `-ś`
/ nothing is the identical family already owned as *bym/byś/by* and as
*żebym/żebyś*. The **żeby parallel is the unit's best anchor and is drilled, not
merely mentioned** — quiz 10 and Użycie 9 both make the learner produce a *żeby*
sentence inside this unit, because the skeleton is identical: marker welded to
the function word, plain L-form on the verb.

**The one thing to check first if this unit reads narrow.** The result half is
sharply limited by what `b1_conditional_sg` actually taught, and this shaped the
whole pack rather than one sentence. **`zrobiłbym` is verified NEW**, so *"I would
make dinner"* — the most natural sentence in the unit — is **not expressible** and
appears nowhere. The only owned first-person conditionals are
*chciałbym/chciałabym* and *kupiłbym/kupiłabym*, so every 1sg result clause is
built from those two verbs; third person is much freer (*zrobiłby, zrobiłaby,
kupiłby, kupiłaby, mógłby, mogłaby*), which is why most of the board runs on
*mama* and *tata* as subjects rather than on *ja*. This is a real scope limit,
not a stylistic preference, and the honest fix if James wants it is a handful of
extra first-person conditionals, not a rewrite of this unit.

**`byłbym` is NEW too**, so *"I would be…"* is unavailable and every result clause
that wanted it was rebuilt around *chciałbym być*.

**`poszedłbym` is the spine's own drafted example for this unit and is untaught.**
It is also the third prefix on *iść*'s suppletive past stem that `b1_wrapup`'s
digest records being caught and rejected once already. It was not used here
either — which makes this the second time that exact form has been stopped at the
door, and a good argument for `b2_motion_prefixes2` landing before anything else
reaches for it.

Plural *gdyby* forms (*gdybyśmy*, *gdybyście*) held, mirroring
`b1_conditional_sg`'s and `b1_zeby`'s own singular-first splits — **C1 inbox**.
The conditional past (*byłbym miał*) is B2-SPINE **O6**'s deferral, so the L-form
after *gdyby* is glossed **only** as a present unreal ("if I had time", never "if
I had had time"), and the fact that Polish uses one shape for both readings is
not mentioned at all rather than half-taught.

### Verification performed on all three packs

The batch-6 scanner was rebuilt for this batch and, before being trusted,
**re-calibrated against five already-shipped packs** (`b2_health_system`,
`b2_work`, `b2_ze_clauses`, `b2_ktory_full`, `b2_indirect_q`, `b2_reported`) — it
had to reproduce "clean" on every one of them before it was allowed to judge new
work. Calibration changed the tool twice, and both changes are worth recording:

- The intro/table pass drowned in English. Table cells legitimately mix English
  and Polish, so it now flags only **diacritic-bearing** tokens there and the
  diacritic-free Polish in tables is eyeballed by hand. This is a known
  false-negative and is the weakest part of the scanner.
- **A real bug in my own tool, caught by calibration rather than by luck.** The
  `teaches_lemmas` / `uses_lemmas` coverage check built its haystack from the
  whole pack — *including the tag lists themselves* — so every tag matched itself
  and the check could never fail. Fixed to search only content keys. It
  immediately found two dead tags in `b2_jesli` (`był`, `problemu`, both declared
  and never used), which were removed rather than left as decoration.

With that in place, on all three new packs: every authored learner-facing string
— intro tables (every cell), titles, `body_pl`, examples, match, quiz prompts,
**quiz distractors**, `accepts`, type and use items — extracted and scanned token
by token against the position-aware pool plus the pack's own `teaches_lemmas`.
Strict surfaces came back **completely clean on all three**.

- **One real leak caught and fixed before wiring**, and it is an instructive one
  because I wrote it deliberately. `b2_gdyby`'s slide 3 said *"Never miałby"* as a
  worked negative example — but **`miałby` is real untaught Polish**, and the
  pack's own note claimed the form appeared nowhere. So the note and the slide
  contradicted each other. Rewritten to "never a *by* form", keeping the
  illustration on *żebyś zrobiłby*, which **is** owned. This is the fifth
  consecutive batch in which the scanner caught something the author had not
  seen, and the first where the leak was a stated fence contradicting itself.
- **Pool regenerated three times**, once before each unit (`--before b2_abstract`,
  `--before b2_jesli`, `--before b2_gdyby`), so each pack was written against what
  is taught strictly before *it*. This mattered twice: `b2_jesli` legally recycles
  *sposób*, *decyzja* and *rozwiązanie* from `b2_abstract` one node earlier, and
  `b2_gdyby` recycles *jeśli* from `b2_jesli` one node earlier for its own
  real/unreal contrast.
- **Dedicated fence greps per pack, with `note` stripped first** since a note
  legitimately names what it fences. `b2_jesli`: zero *by*-forms anywhere — the
  two `\bby\b` hits were both the English word "by" in explain prose, checked
  individually. `b2_gdyby`: zero occurrences of *byłbym, byłby, byłaby,
  zrobiłbym, zrobiłabyś, kupiłbyś, miałbym, mógłbym, poszedłbym, gdybyśmy,
  gdybyście*, and a regex confirming no *by*-form ever follows a *gdyby* opener
  directly. Zero *jeżeli*, *gdy*, *wtedy* in either.
- **A reversed-word-order sniff** on `b2_jesli` (any word followed by comma then
  *jeśli*): zero hits, which is the fence the unit's whole match board rests on.
- **Homograph "taught AS" check re-run on every recycled form**, all 34 of
  `b2_abstract`'s and all 25 of `b2_gdyby`'s content words. The ones that
  mattered: *kawy* used in an explain in exactly the genitive job
  `a1_gen_endings` taught it in; *nową* in the accusative job `a1_miec` taught;
  *noc* and *mysz* as the soft-feminine anchors for *możliwość*; *otwarty* and
  *zamknięty* as the **plain adjectives** `leaf_shopping_a1` taught, not the
  participles `b2_participle_pass` will later reveal; and *mógłby* / *mogłaby*,
  which `b1_polite` taught inside the *czy mógłby pan* request formula and which
  this pack uses as plain third-person "could" — the same grammatical job in a
  new frame, named in an explain rather than let slip.
- **Distractor discipline, stated because it shaped a whole stage.** *miałby* and
  *miałaby* would be the sharpest possible distractors for `b2_gdyby`'s
  plain-L-form fact, and both are real Polish — but neither is taught, and a
  button teaches a string as surely as a table does. They are on no choice list.
  The same fact is drilled from the other side instead, in quiz 5, 6 and 7.
- **Pronoun labels checked against precedent, not assumed.** `b2_gdyby`'s slide 2
  uses *ja / ty / on / ona* as paradigm labels; `b1_zeby`'s intro table does
  exactly the same thing in the same shape (*kupiłbym | żebym kupił | ja*), so
  this is established convention. Noted because AGENTS.md and the run brief both
  warn that pronouns sit in `audit.py`'s `GLUE_LEMMAS` and are invisible to the
  auditor — this one was verified by hand.
- Mechanical stage checks per pack: Match exactly 12 rows with no duplicate `pl`
  or `en`, every quiz answer present among its own choices, no duplicated
  choices, no duplicate prompts, no duplicate type or use answers, no Użycie item
  repeating a Pisanie item, every `teaches_lemma` actually demanded in a drill
  stage, and a meta-question sniff over every Kontrola prompt. All three clean.
- **All eight station placeholders re-asserted as `planned` after every wiring**,
  by assertion rather than by eye.

### For James's next smoke pass

- **`b2_gdyby`'s missing first person is the call I would most want you to look
  at.** Dad finishes this unit able to say *"If Mum had time, she would make
  dinner"* fluently but **not** *"If I had time, I would make dinner"* — because
  `zrobiłbym` was never taught and this unit would not smuggle it in. He can say
  *I would buy* and *I would like*, and nothing else in the first person. If that
  feels too thin live, the cheap fix is a short first-person conditional top-up
  (`zrobiłbym`, `byłbym`, `miałbym`), not a change to this unit.
- **`b2_jesli`'s five Pisanie items that demand *będzie* from an English present
  are the ones to watch.** They are the unit's real content, and each has an
  explain, but they are also the only place in the pack where the English prompt
  does not show the learner what to type. If they play badly, the honest fix is
  to reword those prompts ("If the weather is nice **tomorrow**…"), not to drop
  the fact.
- **The three-way "if" is now live for the first time** — *czy*, *jeśli* and
  *gdyby* all collapse onto one English word, and `b2_gdyby` quiz 9 is the only
  item that puts all three on one button row. Worth watching whether that item
  lands as a summary or as a pile-up.
- **`b2_abstract` is a twelve-word leaf with no genitive and no locative**, which
  makes it noticeably flatter than `b2_work` or `b2_health_system`. That is
  deliberate (the `-e` neuter genitive question is still open with you), but if
  you would rather it earned its keep, ruling on *skierowania* unblocks
  *rozwiązania* and about four more sentences here.
- All three units are **audit-clean, not tested** — nobody has clicked through
  them.
- Titles re-checked word by word at the moment of wiring, per the standing B1
  batch 10 reminder. All three pass: *Powód i cel* (*powód* `leaf_ideas_a1`, *cel*
  taught by its own node), *Jeśli…* (taught by its own node), *Gdybym miał czas…*
  (*gdybym* its own node, *miał* `a2_past_rest`, *czas* owned). No `title_en`
  carries builder jargon.

---

## Batch 8 — Block 5 opens: the plural obliques (`b2_loc_pl`, `b2_inst_pl`, `b2_dat_pl`)

Built the next three unbuilt nodes in path order, one at a time, each authored,
scanned, wired and audited before the next was started. Each audit-clean
(**0 errors**; the same two pre-existing, unrelated warns from `a2_prep_review` /
`b1_two_futures` that every batch since B1 has carried), pushed to
`origin/b1-build` per unit, not batched. Three new structures registered in
`SEQUENCING.md` **and** `audit.py`'s `STRUCTURE_CATALOGUE` before each audit ran:
`loc_pl`, `inst_pl`, `dat_pl`.

Path is live through `b2_dat_pl` (path index 155, **149 live nodes**, 24 of B2's
48 non-station nodes done). Next unbuilt B2 node: **`b2_gen_pl_full`**.

**The batch has one shape, and it is the thing to look at first.** All three
units run on the same fixed cast of nouns, in the same order, taking three
different endings on three consecutive nodes — `w domach` / `z rodzicami` /
`pomagam rodzicom`. That was not the spine's instruction; it is this batch's
design decision, and it pays off twice: the plural obliques read as one table
with three columns rather than three unrelated word lists, and by unit 3 the
Kontrola choice lists are four real forms of the *same* noun in four different
cases (`siostrom / siostrami / siostrze / siostrą`), with nothing imported and
nothing fabricated.

**Environment note, still true and still worth stating:** `main` has no `codex/`
directory, so a cloud session must start with `git fetch origin && git checkout
-B b1-build origin/b1-build`, and `py -X utf8` does not exist on the Linux
runner — use `python3 -X utf8`. The remote moved twice mid-run (James's
word-origin index, then the fruit-payoff port); both times the fix was fetch,
rebase, re-run `audit.py`, push. The only rebase conflict was
`audit/sequencing-audit.json`, a generated artifact — resolved by regenerating
it, never by hand-merging.

### `b2_loc_pl` (Block 5, unit 1 — the easiest unit in B2, and built to feel it)

Locative plural `-ach`: one ending for every gender, no exception among the words
this course owns. Eleven new forms, all verified NEW: *domach, sklepach,
hotelach, bankach, szkołach, firmach, gazetach, miastach, biurach, mieszkaniach,
biurkach* — four masculine, four feminine, four neuter counting the recycled
*górach*.

**The anchor is a whole phrase he has owned since A2.** `a2_travel` taught
*w górach* as a frozen holiday chunk and `check_new.py` confirms it. Slide 1
opens by pointing at it rather than by announcing a new case: the ending is not
something special about mountains.

**The homograph decision shaped the entire pack, and it is the judgment call I
would most want checked.** The obvious intro table pairs the nominative plural
with the new form — *szkoły → szkołach*. It is wrong. `check_new.py` reports
*szkoły* TAUGHT, but the owners are `a1_gen_endings` (*szkoła → szkoły*, the
GENITIVE singular) and `a1_prep_do_z` / `a1_case_gym` (*ze szkoły*). The
identical trap holds for *miasta* (`a1_gen_endings`, *do miasta*), *książki*
(`a1_gen_ki`, *nie mam książki*), *biura* and *firmy* (`a1_prep_review_2`,
*do biura* / *do firmy*) — **every one of them owned as a genitive singular, none
of them as a nominative plural.** A table pairing *szkoły → szkołach* would have
shown Dad a form he reads as "of the school". So the left-hand column is the
LOCATIVE SINGULAR he genuinely owns (*w szkole, w mieście, w biurze, w firmie*),
and the nominative plurals that *are* honestly owned as plurals (*sklepy, banki,
hotele, domy, okna, telefony, klucze*, `a2_plural_nom`) appear only as sentence
subjects — the job that pack taught them in.

**The rule is stated in the form it is actually true in.** Neither "add `-ach` to
the plural" nor "add `-ach` to the Locative singular" is true of these words
(*w mieście → w miastach* kills both). Slide 2 says: take the plain dictionary
word, drop a final vowel if there is one, add `-ach`.

**Slide 4 guards the predictable error, which is not the singular but the
genitive plural.** `a2_gen_pl` taught *domów, sklepów, banków, gazet, miast,
biur* alongside *dużo*, *blisko* and *nie ma*; those forms are also plural and
also not the subject form, so a learner fresh from `-ach` reaches for it after
*dużo*. Four quiz items put the genitive plural on the button row for exactly
that reason. Both halves of every negative illustration are owned strings.

Quiz item 1's answer is deliberately **not** this lesson's form (*domu*, with
*domach* on the button row) — a unit whose every answer is the new ending
teaches button-picking, not reading.

Fenced: all plural adjectives (spine **O3** → C1), which makes this an entirely
bare-noun unit and is why "in the big cities" is nowhere in it; *gór, szkół,
firm* (verified NEW), so only `a2_gen_pl`'s own word list appears in the *dużo*
contrast; *oknie, mieszkania, biurka, restauracje, komputery, tych, moi, wiele*;
and *dzieciach* / *ludziach*, regular and legal but held back so `b2_inst_pl`'s
irregular-instrumental call stayed clean.

### `b2_inst_pl` (Block 5, unit 2 — `a2_inst_z`'s fence paid in full, not in half)

Instrumental plural `-ami`, drilled in ONE owned job: companionship after *z*.
`a2_inst_z`'s fence reads *"plural instrumental (z rodzicami, z dziećmi) — B1,
different ending set"*. **It named both phrases, so both are paid.** Twelve new
forms, all verified NEW.

**One job only, deliberately.** The Instrumental has three owned duties —
identity (`a1_inst_job`), companionship (`a2_inst_z`) and transport
(`a2_inst_transport`) — and only companionship gets a plural, mirroring
`a2_inst_z`'s own "deliberately ONE new thing" framing. *Jesteśmy studentami* is
a logged, cost-free top-up if the unit plays thin.

**`braćmi` is a deliberate extension beyond the spine's list, and it is the
decision in this batch most worth overruling if you disagree.** B2-SPINE **O9**
left *dziećmi*/*ludźmi* to the author as "taught whole or fenced"; both are
taught whole, and I added a third. The reason: `a2_inst_z` made *z bratem* the
**first item on its board**, so *brat* is the noun Dad has produced most often in
exactly this construction, and a unit that teaches `-ami` while leaving *brat*
alone hands him a wrong form he has every reason to build. Three memorised
strings in one marked box is the standing closed-set idiom (`a2_gen_pl`'s lists,
`b2_reported`'s five forms of *powiedzieć*), and the framing is already owned:
`a2_family2` taught *dziecko → dzieci* with the words "one of a handful of words
you learn whole rather than build", which slide 4 quotes back at him.
**The conservative alternative** was two exceptions instead of three, leaving
*brat* silently unpayable.

**No non-word is ever printed.** The natural way to mark an exception is to show
the form it is *not*, and both candidates here are fabrications. Slide 4
therefore says *brat* "does not simply add `-ami`" rather than spelling one out,
and no choice list contains an invented string. (This is the b2_gdyby *miałby*
lesson generalised: a button teaches a string as surely as a table does.)

**`ze` is verified NEW and shaped the word list.** *z* becomes *ze* before an
s-cluster, so *ze studentami* was the natural "with students" row — but
`a1_prep_do_z` taught only the whole chunks *ze szkoły* and *ze sklepu*, never
the bare preposition. *studentami* was dropped for that reason alone and
*klientami*/*pacjentami* took its place; all twelve rows take plain *z*.

Fenced: *przyjaciółmi* and *gośćmi* (a fourth and fifth exception would turn a
marked box into a paradigm; `a2_inst_z` had already fenced *z przyjacielem*);
*lekarzami*, *nauczycielami*; *bracia, synowie, siostry, ciocie, kolegi, syna,
cioci, klienta, pacjenta, kotem, człowiek* — so *ludzie* is handed over with no
singular anchor at all and slide 4 says so rather than working around it;
*rozmawiam*/*rozmawia* (`a2_phone_func` owns only the infinitive), which cost the
unit's most natural sentence; *razem, spotykam, w piłkę, na wakacje*. **The whole
dative plural** — *rodzicom, dzieciom, ludziom* — appears nowhere, not as a
distractor, because it was the very next node.

### `b2_dat_pl` (Block 5, unit 3 — the strand closes)

Dative plural `-om`. Twelve new forms, all verified NEW, on the same cast.

**The headline is that the hard part is behind him.** `b1_dative_sg` had to teach
its singular endings one word at a time (*mamie, tacie, siostrze, studentowi,
nauczycielowi*) because the dative singular genuinely is unpredictable. The
plural is a single `-om`.

**The build rule changes, and it had to.** Nine of the twelve are last lesson's
`-ami` with `-om` in its place, so that is what slide 2 teaches. The "drop a
final vowel" rule that served units 1 and 2 **breaks on *dzieci***, whose final
`-i` belongs to the stem (*dzieci* + *om*); applying it would produce a
fabrication. So *dzieci* and *ludzie* get their own slide rather than being
forced into the general rule — and that slide is the payoff for unit 2's
exception box: the two words that refused `-ami` are perfectly ordinary here,
with the useful part said out loud, that they must be built from *dzieci*/*ludzie*
and **not** from *dziećmi*/*ludźmi*, which is precisely the mistake unit 2 sets up.

***brat* is absent by design and is this unit's one real gap.** *braciom* is
verified NEW and cannot be reached from *brat* by any rule this course has stated
— it needs the *braci-* plural stem. Unit 2 taught *braćmi* on the argument above;
the same argument would justify *braciom*, but this unit's whole claim is "one
ending, nothing to learn whole", and re-opening an exception box for a single
word costs more than the word is worth. **A first draft quoted the owned dative
SINGULAR *bratu* on slide 1 among the singular endings, and it was cut** — naming
the word is exactly what invites a learner to reach for its plural.

Governors are the two already owned, *pomagać* and *dziękować*. *dziękuję* (1sg)
is owned back at `trunk_social_a1` as the bare social chunk, and `b1_dative_sg`'s
own shorthand line says "*dziękuję* (już twoje)" before conjugating the rest, so
governing the dative with it is that pack's move, not a new one. **The
`a2_dat_chunks` frame is fenced**: *podoba mi się* / *smakuje mi* take dative
PRONOUNS, and a plural dative NOUN in that frame (*podoba się dzieciom*) is a
different construction shape, not a new ending. Held, logged, C1 inbox.

Quiz item 9's answer is LAST lesson's ending (*córkami* after *z*), the same
guard unit 1 used. Item 10 puts both endings on ONE noun in ONE sentence
(*Mieszkam z rodzicami i pomagam rodzicom*) — the sharpest discrimination the
block can make, and only possible because the three units share a cast.

Also fenced: *nauczycielom* and *lekarzom* — those nouns appear as SUBJECTS only,
which holds the count at twelve, and a draft use item wanting *nauczycielom* was
rewritten rather than allowed to add a thirteenth form; *czemu*; **and *mamom* /
*tatom* deliberately**, since *mamy* is AGENTS.md's own headline homograph
(the VERB "we have" at `a1_miec`) and this pack will not go near that string.

### Verification performed on all three packs

The batch-7 scanner was not committed, so it was rebuilt from scratch this run.
Before being trusted it was **calibrated against already-shipped packs** —
`b2_adj_loc`, `b2_gdyby`, `b2_jesli` and `a2_gen_pl` — and had to reproduce
"clean" on each before it was allowed to judge new work.

- Every authored learner-facing string — intro bodies and **every table cell**,
  titles, `body_pl`, match rows, quiz prompts, **quiz distractors**, `explain`
  text, `accepts`, type and use items — extracted and scanned token by token
  against the position-aware pool plus the pack's own `teaches_lemmas`. `note` is
  excluded, since a note legitimately names what it fences.
- **Pool regenerated three times**, once before each unit (`--before b2_loc_pl`,
  `--before b2_inst_pl`, `--before b2_dat_pl`), so each pack was written against
  what is taught strictly before *it*. This mattered every time: unit 2 recycles
  *górach*/*domach*/*szkołach* from unit 1 one node earlier, and unit 3 recycles
  unit 2's entire `-ami` board as its own distractor set.
- **Five real problems caught before wiring**, listed because the pattern is
  instructive — three of the five are the author's stated fence contradicting the
  author's own content:
  1. **A builder unit code in learner-facing text.** `b2_inst_pl`'s quiz-7
     `explain` read "the phrase a2_inst_z promised you". AGENTS.md forbids unit
     codes on learner surfaces outside *Tryb autorski*; rewritten to name the
     phrases instead. This one the token scanner could not see — it took a
     separate regex for `(a1|a2|b1|b2)_[a-z_]+` over every non-`note` string, now
     part of the check.
  2. **`bratu` on `b2_dat_pl` slide 1**, directly contradicting that pack's own
     note claiming *brat* appeared nowhere. Cut.
  3. **`nauczycielom` in a `b2_dat_pl` use item** — a thirteenth new form, in a
     pack whose note fenced that exact string. The item was rewritten, not the
     fence.
  4. **`w mieszkaniu` tagged as a chunk lemma in `b2_loc_pl`** — the only audit
     error of the batch. `a1_prep_place` drills the phrase on its board but
     declares only *mieszkaniu* in `teaches_lemmas`, so the chunk string is not a
     declared lemma anywhere. Dropped the over-specific tag and kept
     *mieszkaniu*; the material is genuinely taught, so this was a tagging
     artifact rather than a sequencing bug. Unit 2 and unit 3 were then written
     tagging only chunks that are genuinely declared somewhere.
  5. **Word-fragment stems (`szkoł-`, `mieszkani-`) in a `b2_loc_pl` intro
     table.** Standard morphology apparatus, but this learner reads no Polish and
     would meet them as words. The column now shows the letter dropped (`-a`,
     `-o`, `-e`) instead of the bare stem.
- **Nine dead tags removed across the three packs** (*góry, sklep, biuro, biurko,
  córka, nauczycielowi, bratu*, plus two chunk forms) — declared and never used.
  Left in, they are decoration that makes the tag lists lie.
- **Homograph "taught AS" check re-run on every recycled form**, not just the
  suspicious ones. The ones that mattered are in the unit notes above; the
  headline is `b2_loc_pl`'s five genitive-singulars-masquerading-as-plurals.
- **Dedicated fence greps per pack, with `note` stripped first.** `b2_dat_pl`:
  zero *brat/braci/brać*, zero *mamom/tatom*, zero *czemu*, zero
  *lekarzom/nauczycielom*, zero *podoba/smakuje*. `b2_inst_pl`: zero dative
  plurals of any kind. `b2_loc_pl`: zero plural adjectives.
- **Mechanical stage checks per pack**: match exactly 12 rows with no duplicate
  `pl` or `en`; every quiz answer present among its own choices; no duplicated
  choices; no duplicate prompts; no duplicate type or use answers; no Użycie item
  repeating a Pisanie item; every `teaches_lemma` actually demanded in a drill
  stage; and a meta-question sniff over every Kontrola prompt. All three clean.
- **`b2_loc_pl`'s Użycie stage was rebuilt after the first draft**, because four
  of its ten items were verbatim the completed sentence from a Kontrola item. Not
  a rule violation — the sanctioned overlap is Dopasuj↔Pisanie — but Użycie has to
  earn its place, so those four are now different sentences.
- **All eight station placeholders re-asserted as `planned` after every wiring**,
  by assertion rather than by eye. Confirmed after the final rebase too.
- Known blind spot, unchanged and stated again: person pronouns sit in `audit.py`'s
  `GLUE_LEMMAS`, so the machine cannot see a pronoun leak. These three units are
  bare-noun throughout and use no oblique pronoun anywhere, checked by hand.

### For James's next smoke pass

- **`braćmi` is the call I would most want you to look at.** It is a deliberate
  extension beyond what B2-SPINE O9 authorised, on the argument that `a2_inst_z`
  made *z bratem* its very first board item so *brat* is the word Dad will reach
  for. If you would rather Block 5 stayed strictly to the spine, cutting it is
  one match row, one type item and one quiz item, and the unit still works.
- **And then `braciom` is the mirror-image gap.** Having taught *braćmi* in unit
  2, unit 3 does **not** teach *braciom* — so after this batch Dad can say "with
  my brothers" but not "to my brothers", which is a slightly odd shape. The fix
  is one string on `b2_dat_pl` slide 3, beside *dzieciom* and *ludziom*. I left
  it out because that unit's whole claim is "one ending, nothing to learn whole",
  but this is the batch's clearest single top-up and I would not argue with you
  adding it.
- **Watch whether the shared cast reads as elegant or as repetitive.** Twelve
  people take three endings across three consecutive units. My judgment is that
  it turns the plural obliques into one learnable table; the risk is that unit 3
  feels like unit 2 again. If it drags, the cheap fix is to swap three or four
  nouns in `b2_dat_pl` (*lekarzom*, *nauczycielom*, *turystom* are all one clean
  string each), **not** to cut the unit — but that would cost the four-forms-of-
  one-noun distractor lists, which are the best thing in it.
- **`b2_loc_pl`'s slide 4 shows two ungrammatical strings on purpose** — "*dużo
  sklepów* never becomes *dużo sklepach*, and *w sklepach* never becomes *w
  sklepów*". Both halves of both are owned words, so nothing untaught is smuggled
  in, but they are still wrong Polish printed on a slide. If negative examples
  bother you live, that line can go and the four quiz items carry the same fact.
- **Unit 1 is bare-noun throughout and may feel thinner than the adjective
  block.** That is spine O3 doing its job — plural oblique adjectives go to C1 —
  and it is why "in the big cities" is not expressible. Worth a look at whether
  the absence is felt.
- All three units are **audit-clean, not tested** — nobody has clicked through
  them.
- Titles re-checked word by word at the moment of wiring, per the standing B1
  batch 10 reminder. All three pass: *W domach, w sklepach · miejscownik* and
  *Z rodzicami, z dziećmi · narzędnik* and *Pomagam rodzicom · celownik* — every
  Polish form either taught by its own node or long owned (*pomagam*,
  `b1_dative_sg`), and the case names are the sanctioned metalanguage AGENTS.md
  names as the house pattern (*Z + narzędnik*). No `title_en` carries builder
  jargon.

---

## Batch 9 — Block 5 closes the count (`b2_gen_pl_full`, `b2_num_subject`, `b2_num_virile`)

Built the next three unbuilt nodes in path order, one at a time, each authored,
scanned, wired and audited before the next was started. Each audit-clean
(**0 errors**; the same two pre-existing, unrelated warns from `a2_prep_review` /
`b1_two_futures` that every batch since B1 has carried), pushed to
`origin/b1-build` per unit, not batched. Three new structures registered in
`SEQUENCING.md` **and** `audit.py`'s `STRUCTURE_CATALOGUE` before each audit ran:
`gen_pl_full`, `num_subject`, `num_virile`.

Path is live through `b2_num_virile` (path index 158, **152 live nodes**, 27 of
B2's 48 non-station nodes done). Next unbuilt B2 node: **`b2_plural_gym`** — the
zero-new gym that closes Block 5, and it now has all seven plural jobs to drill.

**The batch has one shape and it runs the other way from batch 8's.** Batch 8
held the cast fixed and changed the ending. This batch holds nothing fixed and
instead builds a three-node chain where each unit exists to make the next one
cheap: `gen_pl_full` teaches *lekarzy* and *nauczycieli* among its soft-stem
masculines, which is why `num_virile` two nodes later has six nouns on its board
for the price of four; `num_subject` teaches the neuter-singular verb for
five-and-up, which is what lets `num_virile` say the thing that makes it
teachable at all — that **for men there is no 2–4 exception**, so two of its
three apparent new facts are last lesson's fact re-sighted. Taught in any other
order, `num_virile` is a three-fact cliff.

**`a2_numbers_gen`'s two fences are both paid and the ledger on that pack is now
closed.** Its note deferred exactly two things, both labelled "B1" there and
neither ever built: 5+ phrases as the subject of a verb, and people-counting.
Spine **O8**'s correction stands and is worth repeating because the routine
brief still carries the wrong version — *pięć piw* + Gen-pl was **never**
deferred; that pack teaches it and *pięć piw* is one of its own frames.

**A tool that the digest has asked for three times now exists and is committed:
`codex/scripts/verify_pack.py`.** Batch 7's scanner was not committed and batch 8
had to rebuild it from scratch; this one is in the repo. It reads a pack plus the
position-aware pool and reports token leaks in every learner-facing string,
builder unit codes outside `note`, dead tags, `uses_lemmas` not in the pool, and
the mechanical stage checks. **It was calibrated first** against seven shipped
packs (`b2_dat_pl`, `b2_inst_pl`, `b2_loc_pl`, `a2_gen_pl`, `b2_ze_clauses`,
`b2_jesli`, `b1_dative_sg`) and had to reproduce clean on all seven before it was
allowed to judge new work — which caught **three false positives in the tool
itself**: it was scanning `id` / `tree_node` / `sequencing.node_id` for unit codes
(they legitimately contain them), it was refusing a node the right to *use* the
structure it *teaches* (the auditor's own unlock rule allows it), and it was
failing duplicate quiz answers, which **18 shipped packs have** and which a
discrimination unit over a six-form paradigm cannot avoid.

### `b2_gen_pl_full` (Block 5, unit 4 — the stems `a2_gen_pl` fenced)

Twelve new forms in three families of four: *szkół, gór, dróg, słów* (o → ó);
*książek, kurtek, córek, okien* (an *e* appears); *hoteli, nauczycieli, kluczy,
lekarzy* (soft masculines refusing `-ów`). Closed sets of whole forms, never a
rule — spine **O10**. `a2_gen_pl`'s own note names its three exclusions and they
are exactly these three families, so this unit is that pack's other half.

**The left-hand column is the dictionary singular, not the nominative plural,
and that is a deliberate departure from the spine brief.** The brief says "every
noun used must already be owned in the Nominative plural". Held to literally, it
kills the spine's own first two named targets: `check_new.py` reports *szkoły*
TAUGHT by `a1_gen_endings` as a **genitive singular** (*do szkoły*), *książki*
TAUGHT by `a1_gen_ki` as a **genitive singular** (*nie mam książki*), *kurtki*
likewise — none of the three is owned as a plural anywhere. The choice was
between dropping *szkół* and *książek*, or printing a genitive singular as if it
were a plural, which is the homograph trap itself. `a2_gen_pl` built from the
dictionary form too (*kawa* → *kaw*), so the singular column is this unit type's
established anchor and the brief's line is stricter than the precedent it was
written from. The nouns that **are** honestly owned as nominative plurals
(*hotele, klucze, lekarze, nauczyciele, okna, córki, góry*) are used as plurals
freely; the ones that are not appear only in their owned singular job, and every
quiz explain that names one names it correctly.

***drogi* is fenced from the pack entirely and is the sharpest homograph catch of
the batch.** It reports TAUGHT by `leaf_shopping_a1` — where it is the
**adjective "expensive"**, not a form of *droga* at all. It was the obvious lead
distractor for *dróg*. *droga* and *drodze* are used instead.

**No fabricated string is printed anywhere, and this unit is where that rule
costs the most.** The natural distractor for every single item is the regular
ending the word refuses — *szkołów, książkow, kluczów, okn* — and all four are
non-words. `a2_gen_pl`, the direct predecessor, **does print such strings**:
*doma*, *kawów*, *piwów* are in its own choice lists. This pack does not follow
it there, on the standing `b2_gdyby` rule that a button teaches a string as
surely as a table does. Where four owned forms of a noun exist the choice list is
that noun's own paradigm (*córek/córki/córkami/córkom*); otherwise the fourth
button is another real word's real form and the explain names which word.

Quiz item 10's answer is *gazet* — deliberately not this lesson's family, the
standing `loc_pl`/`dat_pl` guard against a unit that teaches button-picking.
Fenced: *wiele*, *słowa*, *oknie*, *koszulek*, *matek*, all virile numerals, and
all plural adjectives (**O3** → C1), so this is a bare-noun unit like the three
before it.

### `b2_num_subject` (Block 5, unit 5 — one fact, and only two new words)

A counted phrase as the **subject** of a verb takes a neuter-singular verb from
five upwards (*Pięć osób było*) and an ordinary plural at 2–4 (*Dwie osoby
były*). `a2_numbers_gen`'s own deferral in its own words, never built.

**Only two new lemmas, *osoby* and *osób*, and that is the point.** The content
is a structure: every verb form it drills (*było, były, jest, są, będzie, będą*)
has been owned since A2 and every counted noun is recycled. *osób* is a
vowel-shift genitive plural — the family taught one node earlier — and slide 2
points at that on purpose, so the new form arrives as a fifth member of a family
just met rather than as an isolated oddity.

**Adjectives are fenced absolutely and it is load-bearing, not tidiness.** *Pięć
okien było nowych* needs a **genitive plural adjective**, which spine **O3**
hands to C1. One adjective anywhere in this pack would have either taught an
untaught form or printed a wrong one. Every subject is a bare counted noun.

**The board is six minimal pairs in the past** — twelve rows, six plural verbs
and six neuter singulars — because *było*/*były* is where the contrast is
loudest. Present and future carry the same rule on slide 2 and in four quiz
items, so it never reads as a past-tense quirk. Putting all three tenses on the
board would have meant thirty-six rows or a thinner contrast; logged as the
judgment call it is.

**Word order is subject-first throughout.** *W domu było pięć okien* is more
natural Polish and would have shown the rule surviving inversion, but inversion
is a second fact and this unit has one. Held, C1 inbox.

### `b2_num_virile` (Block 5, unit 6 — the one that had to be framed as a gift)

Ten new forms: six numerals (*dwóch, trzech, czterech, pięciu, sześciu,
dziesięciu*) and four genitive plurals (*studentów, kolegów, synów, klientów*).

**Counting men is three new facts and taught as three facts it is a cliff** — the
numerals change, the noun takes the many-form even at two, and the verb goes
singular even at two. The second and third are not new at all: they are exactly
what `num_subject` taught one node earlier for five-and-up. So the unit's whole
claim, and slide 2's headline, is that **with these numbers there is no 2–4
exception** — everything behaves the way five already does, at every number. Only
the six numeral forms are genuinely new, and the awkward split the learner met
last lesson simply does not exist here. This is the single design decision the
unit rests on.

***dwaj* is fenced.** *Dwaj studenci są* is real and common, but it is a second
system — nominative numeral, nominative noun, plural verb — and would undo slide
2's entire claim in one line. Verified NEW, C1 inbox.

**The feminine guard is the most important thing in the pack.** *osoba* means
"person" and is grammatically **feminine**, so it takes *pięć osób* and never
*pięciu* — and a learner who has just met "the numbers for people" will reach for
the wrong one. Quiz 9 and use item 8 are that guard, and slide 3 states the test
in the form that is actually true: not "does the word mean a human", but "is the
word masculine-personal", which is the category `b1_virile_nom` / `b1_virile_past`
/ `b1_virile_reco` already spent three units on. Quiz 10 is the second guard,
answering the plain plural *były* on *trzy koty*.

***byli* is the sharpest distractor in the block** and appears in two items. It
is owned (`a2_past_plural`) and it is exactly what an English speaker reaches for
on "four teachers **were**". The explain names the honest split: *byli* is right
when the men are the plain subject (*Nauczyciele byli w szkole*), and the moment
a number stands in front of them the number takes over the agreement.

***studentami* is fenced and is not an oversight.** It is the obvious fourth
button for item 1 and it is verified NEW — `b2_inst_pl` dropped it deliberately
because *z* becomes *ze* before an s-cluster and `a1_prep_do_z` taught only the
frozen chunks *ze szkoły* / *ze sklepu*, never the bare preposition. *studentem*
is used instead. *koledzy* is fenced on the same grounds.

### Verification performed on all three packs

- **Pool regenerated three times**, once before each unit (`--before
  b2_gen_pl_full`, `--before b2_num_subject`, `--before b2_num_virile`), so each
  pack was written against what is taught strictly before *it*. This mattered
  every time: unit 2 recycles *okien* and *córek* from unit 1 one node earlier,
  and unit 3 recycles *lekarzy* and *nauczycieli* from unit 1 two nodes earlier.
- **Every authored learner-facing string** — intro bodies and every table cell,
  titles, `body_pl`, match rows, quiz prompts, **quiz distractors**, `explain`
  text, `accepts`, type and use items — extracted and scanned token by token
  against the position-aware pool plus the pack's own `teaches_lemmas`, and every
  unknown token read by eye rather than filtered. `note` excluded, as always.
- **Four real problems caught before wiring**, all four by the scanner rather
  than by eye:
  1. **An untaught Polish form in a title — twice in one string.**
     `b2_num_virile`'s first draft was titled *Pięciu studentów · liczenie
     mężczyzn*, and both *liczenie* and *mężczyzn* are verified NEW. This is
     AGENTS.md's most-repeated title violation, caught three times in one night
     during B1 and once more here. Retitled *Pięciu studentów · dwóch lekarzy*.
  2. **A factual error on a slide.** `b2_gen_pl_full`'s quiz-2 explain read "an e
     appears between the k and the k". *książka*'s stem is *książk-*, so the *e*
     lands between the **ż** and the *k*. Fixed.
  3. **Ordinary untaught vocabulary in `body_pl`.** *normalnie* (`num_subject`)
     and *przy* / *każdej* (`num_virile`). `body_pl`'s licence is for
     metalanguage — case names, *liczba mnoga* — not for plain Polish words the
     learner has never met. Both rewritten to pure metalanguage.
  4. **A chunk tag that is not a declared lemma anywhere.** *w gazetach* was
     added to `b2_gen_pl_full`'s `uses_lemmas` and reports NEW as a chunk, though
     *w* and *gazetach* are both owned separately. Exactly batch 8's `w
     mieszkaniu` bug — the fix is the same, keep the text and drop the
     over-specific tag.
- **Dead tags removed**: *ze szkoły* (`gen_pl_full`, never printed as a chunk),
  and *synami* / *synom* / *synem* (`num_virile`, whose *syn* has no quiz item).
  The pack note that had claimed a *syn* distractor paradigm was corrected rather
  than left to lie.
- **Homograph "taught AS" check re-run on every recycled form**, not only the
  suspicious ones. The ones that mattered are in the unit notes above; beyond
  *drogi*, the significant finds were *szkoły* / *książki* / *kurtki* as genitive
  singulars, which reshaped `gen_pl_full`'s entire intro, and *piwa* as the
  genitive singular of *dużo piwa*, which kept beer off `num_subject`'s board.
  *klucze* is a softer case worth recording: `a1_home_family` declares it in
  `teaches_lemmas` but glosses the entry "key" and carries *klucze* only in
  `accepts`, so its owned **number** is genuinely ambiguous — it is used as a
  distractor with no case claimed about it, and no slide calls it a plural.
- **Mechanical stage checks per pack**: match exactly 12 rows with no duplicate
  `pl` or `en`; every quiz answer present among its own choices; no duplicated
  choices; no duplicate prompts; no duplicate type or use answers; no Użycie item
  repeating a Pisanie item. All three clean. One real bug fixed here:
  `gen_pl_full`'s quiz 10 shipped its first draft with *gazet* listed **twice**
  in its own choice list.
- **All eight station placeholders re-asserted as `planned` after every wiring**,
  by assertion rather than by eye.
- Known blind spot, unchanged and stated again: person pronouns sit in `audit.py`'s
  `GLUE_LEMMAS`, so the machine cannot see a pronoun leak. All three units are
  bare-noun throughout and use no oblique pronoun anywhere, checked by hand.

### For James's next smoke pass

- **The one I would most want you to look at is `b2_gen_pl_full`'s intro
  column.** The spine said to anchor on nominative plurals and I anchored on
  dictionary singulars instead, because the three headline nouns are not owned as
  plurals at all. I think it is the only honest option and it matches
  `a2_gen_pl`, but it is a departure from a written instruction and you should
  see it before it hardens.
- **Three families in one unit is the load question of the batch.** `gen_pl_full`
  teaches twelve forms across three patterns, where `loc_pl` / `inst_pl` /
  `dat_pl` each taught twelve forms of **one** pattern. The spine assigns all
  three families to one node and they are genuinely closed lists rather than
  rules, but if it plays as a cliff the clean split is by family — four forms
  each, three small nodes — and nothing else in the block depends on them
  arriving together.
- **`num_subject` is two new words long.** It will feel very short next to the
  units around it. That is the unit being honest about its content — the fact is
  a structure, not vocabulary — but if it feels thin, the cost-free top-up is
  more counted nouns on the board, not more facts.
- **Watch the *osoba* trap live.** It is the one thing in `num_virile` I expect
  Dad to get wrong, and it is worth watching whether slide 3's framing
  ("masculine-personal", not "means a person") actually lands or whether he needs
  the rule stated as a flat list of the six man-words.
- **`b2_plural_gym` is next and it now has everything.** Seven plural jobs are
  live — Nom, Acc, Gen (regular and stem-changing), Loc, Inst, Dat, plus virile
  Nom and the two numeral patterns. The spine's gym brief predates
  `gen_pl_full`, `num_subject` and `num_virile`; whoever builds it should
  re-read that brief against what is actually taught rather than trusting it.
- **Still open from this batch, all logged in the packs**: *dwaj*; inverted word
  order with a counted subject (*W domu było pięć okien*); *wiele*/*wielu*, now
  held for the third unit running; collective numerals (*pięcioro*); and plural
  oblique adjectives, which have now been fenced by five consecutive units and
  are the largest single thing C1 inherits from Block 5.
- All three units are **audit-clean, not tested** — nobody has clicked through
  them.


## Batch 10 — Block 5 closes, Block 6 opens (`b2_plural_gym`, `b2_neg_gen`, `b2_double_neg`)

Built the next three unbuilt nodes in path order, one at a time, each authored,
scanned, wired and audited before the next was started. Each audit-clean
(**0 errors**; the same two pre-existing, unrelated warns from `a2_prep_review` /
`b1_two_futures`), pushed to `origin/b1-build` per unit, not batched. Two new
structures registered in `SEQUENCING.md` **and** `audit.py`'s `STRUCTURE_CATALOGUE`
before each audit ran: `neg_gen`, `double_neg` (the gym registers nothing — it
teaches nothing).

Path is live through `b2_double_neg` (path index 160, **154 live nodes**, 30 of
B2's 48 non-station nodes done). Next unbuilt B2 node: **`b2_sie_impersonal`**.

**The run started by rebasing onto two commits James pushed while it was
working, and the second of them changed the authoring contract mid-run.**
`2921d7c` added a James-locked **Pisanie hard cap: a typed-whole answer is at
most 3 words**, anything longer becomes a `mode:"cloze"` item with one `___` on
the unit's teaching point, plus `codex/REPAIR-QUEUE.md` — 19 packs, 104 items,
with the standing instruction that the routine processes **up to 3 packs per run,
before building**. So this batch is four pieces of work, not three: the queue
first, then the units. `b2_plural_gym` was already written when the rule landed
and needed no change — all ten of its Pisanie answers were two words or fewer.

### Repair queue: `a1_hello`, `a2_dat_chunks`, `a2_directions_func` (12 items)

Taken in queue order rather than by size, so the next run can simply take the
next three. **Ten of the twelve blanks land on the unit's teaching point.** The
two that do not are `a1_hello` #9 and #10, and the reason is the no-duplicates
rule colliding with the queue's own instruction: the teaching point there is
`jest`, but items 2 and 6 of that same stage already type `jest` whole, so
blanking it twice more would have put **three identical answers in one stage**.
Those two blank the possessive instead — `To jest ___ dom.` / `To jest ___
książka.` — which is also the only thing that distinguishes the two items from
each other. Logged per-item in an item `note`, per the queue's fallback clause,
and again in the queue's new conversion log.

Everywhere else the blank is the point: `a2_dat_chunks` blanks the **plain-form
noun** (`Smakuje mi ta ___.` → *kawa*), which is the subject-flip that pack
exists to teach and is named in its own explain — *kawa, not kawę* — plus the
front `Nie` on the negation item; `a2_directions_func` blanks the place name
that does not change after *gdzie jest*, and the direction word that item 5's
explain already calls the only moving part.

**`a2_dat_chunks` items 7 and 8 ship with identical frames** (`Smakuje mi ta
___.`) and different answers (*kawa*, *zupa*). That is deliberate — the
`prompt_en` disambiguates and the pair drills the same fact on two nouns — but
it is the one thing in the conversion worth a look on screen.

### `b2_plural_gym` (Block 5, unit 7 of 7 — the block closes)

Zero new material, `teaches_structures` and `teaches_lemmas` both empty, the
`a1_case_gym` → `b2_adj_gym` idiom.

**Why it earns its slot, stated against James's own post-`a2_past_gym` rule.**
That gym was retired for drilling material that was not hard. This one drills
seven plural jobs that arrived **one per node across six consecutive units** and
were never once mixed. The endings are individually easy; choosing between them
with all seven live is the part nothing on the path has ever asked for. If it
plays comfortable, the verdict is James's and the bank becomes stations feed.

**The spine brief was re-read against what is actually taught**, as batch 9's
digest instructed. It predates `gen_pl_full`, `num_subject` and `num_virile` and
names seven jobs; the honest count is seven jobs **plus two numeral agreement
patterns**, so slide 3 covers those rather than leaving the block's two newest
units undrilled.

**Slide 2 runs opposite to `b2_adj_gym`'s, and that reversal is the whole value
the gym adds.** The adjective gym's message was *one form does several jobs*.
Here it is the reverse and it is good news: `-ach`, `-ami` and `-om` each do
exactly one job and never ask about gender, so six of the seven jobs are
unambiguous and **all the difficulty in the plural is concentrated in the
Genitive** — which is why that case needed two whole units. Naming where the
work actually is, is something no single unit could say.

**Kontrola items 6 and 7 carry the same four choices in the same order**
(*rodzicami / rodzicom / rodzice / rodzina*) under *Idę do parku z ___* and
*Dziękuję ___*. Direct echo of `b2_adj_gym`'s paired *nowego*/*nowym* items.
All 12 answers distinct.

**No adjectives anywhere, and it is a scope call rather than tidiness.** *nowe*
and *duże* are legitimately owned as Nominative/Accusative plural adjectives, so
they could have appeared in two of the seven rows — but plural **oblique**
adjectives are C1 (**O3**), and a board that allows an adjective in two jobs and
forbids it in five teaches the wrong lesson by silence. Bare nouns throughout,
matching the six units before it.

**Homograph work, re-run rather than assumed.** *szkoły, kawy, piwa, miasta,
biura, książki, herbaty, zupy, kurtki* are owned as **genitive singulars** and
appear in no plural job here; *szkołach* and *szkół* do appear, because those
forms are unambiguous. *klucze* is left out over `gen_pl_full`'s
ambiguous-number finding. *drogi* appears nowhere, as in every pack since —
`leaf_shopping_a1` owns that string as the **adjective** "expensive".

**Fenced:** *siostry* and *koledzy* are both verified NEW, which is worth
recording — `inst_pl` and `dat_pl` taught *siostrami/siostrom* and
*kolegami/kolegom* without ever teaching those nouns' nominative plurals, so two
of the block's twelve cast members exist only in oblique forms. Also *bracia,
mężczyźni, ryby, wiele, kilka, dwaj, pięcioro, widzę,* and *pracowało* — the
last of which is why use item 8 reads *Pięciu studentów **było** w biurze* and
not *pracowało*.

### `b2_neg_gen` (Block 6, unit 1 — the rule was never about mieć)

The genitive of negation, generalised. `a1_negation` taught *nie mam kawy* at A1
as a fact about one verb; it is a fact about every negated transitive verb, and
this unit says so: *Piję kawę* → *Nie piję kawy*, *Czytam książkę* → *Nie czytam
książki*, *Kupuję mleko* → *Nie kupuję mleka*.

**One new lemma in the whole unit — *chleba* — and including it was the batch's
sharpest judgment call.** The tree node's own spine note flagged it: *chleba* is
verified NEW and *chleb* is a real-world exception to this course's simplified
masculine-genitive rule. The conservative reading is to fence it and keep the
unit at zero new lemmas. The unit teaches it anyway, and the reason is that the
alternative is worse: the unit **states** "masculine takes `-u`" (*telefon →
telefonu*, *pokój → pokoju*, *dom → domu*), and *chleb* has been owned since
`leaf_food_a1`, sits inside *poproszę chleb*, and is the object of `b2_jesli`'s
own *kupię chleb*. Teaching the rule while leaving *chleba* out would hand Dad a
rule that manufactures a wrong form on one of the highest-frequency nouns he
owns. It is one boxed exception in the `dziećmi`/`ludźmi`/`kelnerzy` closed-set
idiom, never a sub-rule, and **the non-word *chlebu* is printed nowhere,
distractors included** — the `gen_pl_full` no-fabrications rule.

**Everything else is recycled**, which is why a rule this broad is nearly free:
both halves of every pair are owned (*kawę/kawy, wodę/wody, herbatę/herbaty,
zupę/zupy, książkę/książki, mleko/mleka, piwo/piwa, telefon/telefonu, psa/psa*).

**The match board is six minimal pairs, positive row above negative row.** A
board of negatives alone would show the new forms and hide the fact that makes
them new. The masculine-animate pair is last on purpose: *Mam psa* → *Nie mam
psa*, nothing changes at all, because AGENTS.md's named Acc≡Gen exception means
the object form of a man or an animal already **is** the genitive.

**Slide 3 is a guard against over-application, and it is deliberate rather than
a second fact.** Only a direct object moves: *Nie mieszkam w domu*, *Nie jestem
lekarzem*, *Nie idę do sklepu*, *Nie pomagam mamie* are all unchanged. Quiz
items 11 and 12 are that guard, in the idiom of `num_virile`'s *osoba* guard — a
learner told "nie moves the word after it" will move the wrong ones.

**Plural objects are held and logged, and this is the scope call James might
want to overturn.** *Nie mam gazet* is fully legal by this point (`gen_pl_full`
is three nodes back). The unit has one fact and number is orthogonal to it, so
the recombination belongs to `b2_case_gym` and `b2_wrapup`.

### `b2_double_neg` (Block 6, unit 2 — Polish says no twice)

Obligatory double negation: a negative word **and** a second `nie` on the verb,
both, always. Spine **O13**, an addition beyond the routine brief's list and
logged there rather than guessed silently.

**Two new lemmas only, *nikt* and *nigdzie*,** because *nic* (`a2_smalltalk`,
frozen inside *nic nowego*) and *nigdy* (`leaf_time_cal_a1`) are already owned.
Dad arrives holding half the set and none of the syntax, which is exactly the
gap the unit exists for — English speakers get this permanently wrong unless it
is named.

***żaden* is dropped, a deliberate departure from the spine's own list.** The
spine names *nikt, nigdzie, żaden*. *żaden* is adjective-shaped with a full
declension, and its natural home — *Nie mam żadnej książki* — stacks a new
declining word directly on top of `neg_gen`, taught **one node earlier**. The
four invariable negative words do the unit's one job without it. Fenced
entirely, C1 inbox.

**The unit is not titled *Nikt nie wie*, despite that being the spine's headline
phrase.** `check_new.py` reports *wie* NEW: *wiem* is owned only inside the
frozen chunk *nie wiem* (`a2_directions_func`), so *wie* would be a new form of
an irregular verb whose paradigm nobody owns. It appears nowhere in the pack,
title included. That is AGENTS.md's most-repeated violation, caught by checking
rather than by luck, and it is the fourth time the title rule has bitten a spine
phrase.

**Slide 3 is consolidation, not a second fact.** The verb still carries `nie`,
so the object is still in the of-form: *Nigdy nie piję kawy*, not *kawę*; *Nikt
nie kupuje chleba*. The unit re-drills `neg_gen` at zero cost, which is why the
two nodes are adjacent.

Word order is negative-word-first throughout, matching the English being
translated from. *Nie ma nikogo* and every other order is held, along with
*nikogo/nikomu/niczego* and the past with *nikt* as subject (masculine-singular
agreement — a second fact).

### Verification performed on all three packs

- **Pool regenerated three times**, once before each unit (`--before
  b2_plural_gym`, `--before b2_neg_gen`, `--before b2_double_neg`), so each pack
  was written against what is taught strictly before *it*. It mattered twice:
  `double_neg` recycles *chleba* from `neg_gen` one node earlier, in four
  separate items.
- **`codex/scripts/verify_pack.py` run on every pack** against its own
  position-aware pool. **0 FAIL on all three.** Every flagged token was read by
  eye rather than filtered; the only Polish-looking survivors were bare ending
  fragments in slide text (`-ach`, `-ami`, `-om`, `-ów`, `-ka`, `-u`, `-y`, the
  `ó` in *pokój → pokoju*), all legitimate.
- **Mechanical stage checks per pack**, run independently of the tool: match
  exactly 12 rows with no duplicate `pl` or `en`; every quiz answer present among
  its own four choices; no duplicated choices inside an item; no duplicate quiz
  prompts; **all 12 quiz answers distinct in every pack**; no duplicate type or
  use answers; no Użycie item verbatim a Pisanie item; every `uses_lemmas` entry
  present in that node's pool. All three clean.
- **New Pisanie cap checked mechanically** on every pack and every converted
  pack: no typed-whole answer over 3 words, every `frame` containing exactly one
  `___`.
- **One dead tag removed** before wiring: *kupuj* in `double_neg`'s
  `uses_lemmas`, caught by the tool.
- **Homograph "taught AS" check re-run on every recycled form.** The finds that
  shaped packs are in the unit notes above; the two that recur are *gazety*
  (owned as a NOMINATIVE PLURAL, so it is kept out of every genitive-singular
  object slot in both Block 6 units) and *drogi* (the adjective "expensive").
- **All eight station placeholders re-asserted as `planned` after every wiring**,
  by assertion rather than by eye.
- **`scripts/smoke.py` run after each wiring** — SMOKE PASSED each time. Note
  this is the repo's file-integrity smoke, not a click-through; nobody has played
  these units.
- Known blind spot, stated again: person pronouns sit in `audit.py`'s
  `GLUE_LEMMAS`, so the machine cannot see a pronoun leak. All three units are
  bare-noun throughout and use no oblique pronoun anywhere, checked by hand.

### For James's next smoke pass

- **The one I would most want you to rule on is *chleba* in `b2_neg_gen`.** The
  conservative path was to fence it and ship a zero-new-lemma unit. I taught it,
  because the unit states a rule that would otherwise manufacture *chlebu* on a
  word Dad orders in a shop. If you disagree, the fix is small: drop the *chleb*
  row from slide 2, quiz 9 and type 7, and drop the two use items that carry it.
- **Second is dropping *żaden* from `b2_double_neg`.** It leaves the unit at two
  new words, which will feel very short. That is the unit being honest — the
  content is syntax, not vocabulary — but if it plays thin, *żaden* is the
  natural top-up and it now needs a small unit of its own rather than a line.
- **Watch whether `b2_plural_gym` is too easy.** It is the first gym since you
  retired `a2_past_gym`, and the case it makes for itself is that seven plural
  jobs have never been mixed. If it still feels like repetition of things that
  were not difficult, that is the same verdict again and the bank goes to
  stations.
- **The two `a2_dat_chunks` cloze items with identical frames** (`Smakuje mi ta
  ___.`, answers *kawa* and *zupa*) are worth seeing on screen — the prompt
  disambiguates them, but only if the prompt reads clearly above the frame.
- **Also worth a look: the cloze rendering on `a1_hello` #9/#10**, since those
  are the earliest units in the course and the first place Dad will ever meet an
  inline blank.
- **Still open from this batch, all logged in the packs**: plural objects under
  negation (*Nie mam gazet*); *żaden* and its declension; *nikogo/nikomu/
  niczego*; the past with *nikt* as subject; *wie* and the rest of *wiedzieć*;
  inverted word order with a counted subject; and plural oblique adjectives, now
  fenced by eight consecutive units.
- All three units are **audit-clean, not tested** — nobody has clicked through
  them.

## Batch 11 — Block 6 continues (`b2_sie_impersonal`, `b2_prosic_o`, `b2_jezdzic`)

Built the next three unbuilt nodes in path order, one at a time, each authored,
scanned, wired and audited before the next was started. Each audit-clean
(**0 errors**; the same two pre-existing, unrelated warns from `a2_prep_review` /
`b1_two_futures`), pushed to `origin/b1-build` per unit, not batched. Three new
structures registered in `SEQUENCING.md` **and** `audit.py`'s `STRUCTURE_CATALOGUE`
before each audit ran: `sie_impersonal`, `prosic_o`, `jezdzic`.

Path is live through `b2_jezdzic` (path index 163, **157 live nodes**, 33 of B2's
48 non-station nodes done). Next unbuilt B2 node: **`b2_motion_prefixes2`**, which
opens the run-up to the James-locked Block 6a prefix strand.

Repair queue first, per the standing routine: three more packs converted before
any new unit was written (below). Remaining after this run: **12 packs, 82 items**.

### Repair queue: `a2_imperative`, `a2_ordering_func`, `a2_phone_func` (8 items)

Taken in queue order. Six of the eight blanks land on the unit's teaching point.
The two that do not are `a2_phone_func` #2–#4 and the reason is the same
collision batch 10 hit: those three items share one frame,
`Czy mogę rozmawiać z ___?`, and blanking the teaching-point word `rozmawiać`
in all three would have put **three identical answers in one Pisanie stage**.
The person is blanked instead (*mamą / tatą / siostrą*) — it is the only part
that moves across the three, and it is what those items' own `explain`s are
about. Item #5 then carries the infinitive blank on its own, so the unit's new
word is still produced once. `a2_ordering_func` #8 blanks the place phrase for
the same reason and is logged in an item `note`.

**Two judgment calls in `a2_ordering_func` that James should smoke**, both about
the composition test rather than the word count:

- ***Co pan poleca? / Co pani poleca?*** are conjugated questions in FORM, which
  is the shape James's refinement names as composed. They were kept typed whole
  anyway, because the pack teaches `polecać` as an opaque chunk that is never
  conjugated, declined or taken apart anywhere — so under the refinement they
  read as frozen chunks, not as real conjugated questions. If they feel like
  sentences in the hand, the fix is one line each: `Co ___ poleca?` (pan/pani),
  which would also turn two near-identical typed items into a real discrimination.
- ***Było bardzo smaczne.*** was held as a pattern phrase on the explicit
  *Było super.* precedent. Three words, no bolted-on phrase, no conjugated
  question — but it is the closest call in the three packs.

Everything else in the sweep was left whole on the "minimal pattern unit"
ground: `Poproszę` + accusative (four items), `Proszę czekać / słuchać /
powtarzać`, and `Dzwonię do biura.` / `Wysyłam wiadomość.` / `Ładuję telefon.`
— verb plus its own case, which AGENTS.md keeps in Pisanie by name.

### `b2_sie_impersonal` (Block 6, unit 3 — sentences with nobody in them)

**One new verb in the entire unit**: `palić`/`pali`. Every other verb on screen
is a 3sg the learner already owns (*mówi, robi, kupuje, pracuje, pije, czeka*),
which is the whole reason a construction this useful is cheap — he has been
saying *się* since A2 and owns six of the seven verbs.

`się` is re-taught explicitly in its new job on slide 1 — the *dziękuję* /
*której* / *że* / *nic* treatment, and the slide says so in those words: the
same word, a job you have never seen it do.

**Word order is a table fact, never a rule**, and this was the batch's main
design decision. `a2_sie` fenced clitic placement by name ("NO clitic-placement
rules") and the spine hands *się*-placement beyond "after the verb" to C1
(inbox item 19) — but the construction is unusable without saying where the
word goes. The conservative path taken is `a2_jechac`'s: show exactly **two**
shapes as a picture of the table and state in plain English that there is
nothing to work out. (a) a question word or place word at the front, then *się*,
then the verb — which is literally the *Jak + się + verb* order `a2_sie` already
taught and Dad already produces in *Jak się masz?*; (b) verb first, *się*
straight after it (*Mówi się, że…*). No third shape appears anywhere, and the
pack never claims *się* goes "second in the clause", because that is the clitic
rule and it belongs to C1.

**A homograph trap inside the unit's own new word**, and it is a real one: bare
*Pali się.* means THERE IS A FIRE, not "someone is smoking". The pack never
prints *pali się* unfronted — every occurrence is *Tu się nie pali* or
*W szpitalu się nie pali*, which forces the smoking reading — and slide 4 warns
the learner in as many words to keep the phrase whole. The bare phrase appears
nowhere, distractors included.

*pisze*, *płaci*, *sprzedaje* and *otwiera* would each have written a more
natural sign sentence (*Jak się pisze…?*, *Gdzie się płaci?*) and all four are
verified NEW 3sg forms of paradigms nobody owns, so all four were dropped
rather than smuggled in. *je* is absent on two grounds at once: NEW, and a
collision with the pronoun *je*.

### `b2_prosic_o` (Block 6, unit 4 — the same little word pulling two ways)

Pays **B1-DIGEST deferred item 3** (spine O11). Three new forms — *prosić,
prosisz, prosi* — in the `-ę/-isz` class owned from *mówić*/*robić*/*lubić*, so
the endings cost nothing.

**The best slide in the unit is `proszę` itself.** `check_new.py` reports it
TAUGHT from `trunk_social_a1`, and the learner has now met that one string doing
three unrelated jobs: *please / here you are* since A1; *Proszę* + dictionary
verb = a polite instruction (`a2_imperative`, *Proszę czekać*); and from here,
the 1sg of the verb *prosić*. Slide 3 sets all three side by side and names what
disambiguates them — a verb after it means an instruction, an *o* after it means
somebody is asking. Sixth turn of that treatment, and the most overloaded string
the course has re-opened.

*Poproszę rachunek* (taught, A2) and *Poproszę o rachunek* are **both** stated
to be correct rather than one quietly replacing the other. With the verb
*prosić*, by contrast, the *o* is obligatory, and that is the unit's one hard
fact.

**The unit's own weakness, flagged rather than hidden.** The ideal contrast slide
would be *mówię o kawie* / *proszę o kawę* — one noun, two cases. It cannot be
built: *kawie*, *wodzie*, *pracę* and *szkołę* are **all verified NEW**, so no
noun in this course owns both its Locative and its Accusative. The contrast is
carried across nouns in two columns instead (*o pracy, o szkole, o domu* against
*o kawę, o wodę, o rachunek*), with *o* constant and the ending doing the work.
**This is the slide to smoke first.**

*pomoc* was dropped even though *Proszę o pomoc* is the most useful sentence
this construction makes: it is a soft feminine whose Accusative is identical to
its Nominative, so as the unit's flagship example it would show an *o* +
Accusative phrase in which nothing visibly moves — the worst possible first
example of the pattern. Logged as a scope cut and the obvious top-up if the unit
plays thin.

### `b2_jezdzic` (Block 6, unit 5 — the motion grid closed)

The payment of the hardest fence in A2. `a2_chodzic`'s note says *jeździć* is
"not named, glossed, hinted at or used as a distractor anywhere in this file,
note included", which is why that pack borrowed *jechać* only for its endings
and said nothing about *jechać* having a routine partner.

Seven new strings, one verb. Nothing else in the pack is new — the other three
corners are owned in full, so three quarters of what is on screen is recall.
**The grid is the payoff, not the paradigm**: two independent questions (on foot
or by vehicle; now or regularly) give four Polish verbs where English has one
word, and the owned adverbs *teraz / codziennie / często / zawsze* carry the
meaning in every item after the intro.

The ż/źdź split (*jeżdżę*, *jeżdżą* at the outside against the middle four) is a
**table fact and nothing more** — and it is explicitly the same shape as
*jadę*/*jedziesz*, which `a2_jechac` already handed over that way, so slide 2
says so out loud: both by-vehicle verbs behave alike, one habit and not two.

The match board is all six new present forms **plus** six anchor rows building
the four-way grid at *ja* and *ty*, so every new form of the unit appears on the
board and the board itself is the contrast. The infinitive rides the intro plus
a Pisanie item — the `a2_chodzic` precedent for a unit with more forms than a
twelve-row board can hold.

*przyjeżdżam* / *wyjeżdżam* and the whole prefixed imperfective family are
fenced hard: they belong to `b2_motion_imperf` in the **James-locked Block 6a**,
and teaching them here would open the secondary-imperfective strand four nodes
early and break that plan. All past forms stay fenced exactly as `a2_chodzic`
left them.

### Verification performed on all three packs

- **`codex/scripts/verify_pack.py` run on every pack** against its own
  position-aware pool, regenerated with `--before` at each node in turn.
  **0 FAIL on all three.** Every flagged token was read by eye rather than
  filtered; the surviving non-English ones were unaccented `accepts` variants,
  bare ending fragments in slide text (`-ić`), the sanctioned Polish metalanguage
  in `body_pl`, and the glue name *Piotr*.
- **Three real defects were caught by that reading, not by the auditor:**
  - *wie* in a `b2_sie_impersonal` use item (*Mama wie.*) — NEW for exactly the
    reason `b2_double_neg` logged one node earlier, since *wiem* is owned only
    inside the frozen *nie wiem*. **Third consecutive pack to trip on that
    string.** Item rewritten.
  - **a non-word printed in `b2_prosic_o`'s slide 2 prose** — the draft named
    the form the I-form is *not*. `b2_neg_gen`'s standing rule is that the
    non-word an exception exists to prevent is never printed, distractors
    included. Sentence rewritten.
  - *pojazdem* in a `b2_jezdzic` `body_pl` line. Permitted there by convention,
    but AGENTS.md names that exact word as one of its three caught title
    violations, so it was replaced with owned material rather than re-introduced.
- **Mechanical stage checks per pack**: match exactly 12 rows with no duplicate
  `pl` or `en`; every quiz answer present among its own four choices; no
  duplicated choices inside an item; **all 12 quiz answers distinct in every
  pack**; no duplicate type or use answers; no Użycie item verbatim a Pisanie
  item. One real find — `b2_sie_impersonal` had *Tu się nie pali.* as the answer
  to two different quiz items; the word-order item was rebuilt on
  *W szpitalu się nie pali.* with distractors that are genuinely impossible
  orders rather than merely marked ones.
- **Two dead tags removed** before wiring, both caught by the tool: *mama* and
  *piotr* in `b2_sie_impersonal` (left behind by the rewritten use item), *iść*
  in `b2_jezdzic`.
- **Pisanie cap checked mechanically** on all three new packs and all three
  converted packs: no typed-whole answer over 3 words, every `frame` containing
  exactly one `___`, and no answer visible inside its own frame.
- **Homograph "taught AS" check re-run on every recycled form.** The find that
  shaped a pack is *pali się* (above). *góry* stayed out of `b2_jezdzic`
  entirely, since `a2_travel` owns that string as a plural noun; *chleb* appears
  only in positive sentences in `b2_prosic_o`, with *chleba* named in an
  `explain` so the two do not blur.
- **All station placeholders re-asserted `planned` after every wiring**, by
  assertion rather than by eye, and `a2_past_gym` re-checked as absent from
  `path_order`.
- **`scripts/smoke.py` run after each wiring** — SMOKE PASSED each time. This is
  the repo's file-integrity smoke, not a click-through; nobody has played these
  units.
- Known blind spot, stated again: person pronouns sit in `audit.py`'s
  `GLUE_LEMMAS`, so the machine cannot see a pronoun leak. All three units are
  bare-noun throughout and use no oblique pronoun anywhere, checked by hand.

### For James's next smoke pass

- **The one I would most want you to rule on is the cross-noun contrast in
  `b2_prosic_o`.** No same-noun minimal pair exists in the course, and the pack
  says so rather than faking one. If the two-column slide does not land, the fix
  is a decision you have to make, not one I can take: teach one extra Locative
  (*o kawie*) purely so the pair can be shown.
- **Second is the two `a2_ordering_func` judgment calls** above — *Co pan
  poleca?* and *Było bardzo smaczne.* Both are exactly on the line the
  composition refinement draws, and both went the conservative way (kept whole).
- **Watch whether `b2_sie_impersonal`'s word-order slide is enough.** It gives
  two shapes and refuses to state the rule behind them. That is the honest
  choice under the C1 fence, but it is the first unit in the course where a
  construction's usability depends on a placement fact we have decided not to
  explain.
- **The fire warning on slide 4 of `b2_sie_impersonal`** is worth reading as Dad
  would read it. It deliberately does not print what *Pali się.* means, which
  keeps the non-word rule but may read as coy.
- **`b2_jezdzic` may feel long on forms** — six new endings in a course that has
  just had three light units. Everything about them is recall except the middle
  of the word, but it is the densest paradigm since B1.
- **Still open from this batch, all logged in the packs**: *pomoc* and
  *Proszę o pomoc*; *prosić* with a person as well as a thing; the past
  impersonal and the *-no*/*-to* forms; *dużo* hung on a verb; plural objects,
  now held for four consecutive units; and plural oblique adjectives, now fenced
  by eleven.
- All three units are **audit-clean, not tested** — nobody has clicked through
  them.
