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
