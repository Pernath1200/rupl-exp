# C1 build digest

Running log of what shipped, batch by batch. Each entry: what was built,
judgment calls made, anything James should sanity-check on his next smoke pass.
Same format and purpose as `B1-DIGEST.md` and `B2-DIGEST.md`.

The level's design lives in `C1-SPINE.md`. That document was written by the
cloud routine with James not present, so **every one of its "Open for James to
overrule" items (O1–O13) is still open**. Build agents follow it as the default;
nothing in it has been ratified. **C1 is the last level**, so its spine's
§"What C1 refuses, and why" (O12) is not a deferral list — it is the list of
things RUPL will never teach unless James reopens them.

## Batch 1 — Block 1 complete, Block 2 opened (3 units)

Built `c1_existential`, `c1_wiedziec`, `c1_adj_pl_gen` — the whole of C1-SPINE's
Block 1 plus the first unit of Block 2. Each audit-clean (0 errors; the same 2
pre-existing, unrelated warns from `a2_prep_review` / `b1_two_futures` that B1
and B2 both carried throughout), pushed to `origin/b1-build` one at a time, not
batched. Three new structures registered in `SEQUENCING.md` **and** `audit.py`'s
`STRUCTURE_CATALOGUE` before each audit ran: `existential_tense`, `wiedziec`,
`adj_pl_gen`.

Path is now live through `c1_adj_pl_gen` (path index 182, **175 live nodes**).
Next unbuilt C1 node: `c1_adj_pl_loc` — Block 2, unit 2, the `-ych`-does-a-
second-job unit.

**This is the first C1 batch**, so the setup notes carry forward unchanged from
B2 batch 1 and were re-confirmed by reading rather than assumed:

- All 53 C1 nodes were already in `tree.json` as `planned` with drafted labels
  and `[C1 SPINE]` notes. Wiring a unit live means: flip `status`, add
  `content`, and **replace** the note with a real one (drop the `[C1 SPINE]`
  prefix — it marks a node as unbuilt).
- `c1_station_1` and `c1_station_2` stay `planned` forever. Untouched.
- `codex/REPAIR-QUEUE.md` was read first and is **fully ticked** — all 19 packs,
  all 104 items. No step-0 repair work existed this run.
- `tree.json` is written with `indent=2` and pack JSON with `indent=1`. The
  first wiring attempt this run reformatted the whole tree to `indent=1` and
  produced a 9281-line diff; it was reverted and redone. Whoever writes the
  tree programmatically must match the existing indent or the diff becomes
  unreviewable.

### `c1_existential` (Block 1, unit 1 — the level opens)

Zero new lemmas, `teaches_lemmas` deliberately empty on the
`b2_copular_future` / `b2_passive` convention. The whole payload is one
asymmetry: the **positive** existential has an ordinary Nominative subject and
*być* agrees with it in all four past shapes (*Był chleb / Była kawa / Było
mleko / Były gazety*) and both future ones; the **negative** existential has no
subject at all, so it is one frozen form per tense (*nie ma / nie było / nie
będzie*) whatever the gender and however many there are, with the thing behind
it in the Genitive. Going negative therefore does two things at once — freezes
the verb and moves the noun — and slide 4 is the two columns side by side
because the contrast is the content.

**It pays two fences at once, which is why it is one unit and not two.**
`b2_copular_future` fenced the plain existential future with the words *"it is
the twin of the negative above and they are not worth separating"*, and
deferred the negated future to `b2_neg_gen` — which then taught the Genitive of
negation off a transitive verb and never moved *nie ma* out of the present at
all. Both twins land here together.

**The homograph catch that changed the unit, and it is a good example of the
rule earning its keep.** The natural English "there were books" wants *Były
książki* — and `check_new.py` reports *książki* TAUGHT, twice. But it is taught
**only as a genitive singular** (`a1_gen_ki` [39], `a1_negation` [40]) and is
not owned as a nominative plural anywhere in the course. The auditor would have
passed *Były książki* without a murmur and shown Dad a form he reads as "of a
book". *gazety* (`a2_plural_nom` [55]) carries every plural in the unit
instead, in exactly the job that pack taught it in, with *gazet* (`a2_gen_pl`
[58]) as its Genitive.

**Anchors verified rather than trusted.** The fronted place phrase is amply
precedented — *W szkole były dzieci* (`a2_family2`), *W parku były grzyby*
(`a2_nature2`), *W lodówce jest mleko* (`a2_house`), *W sklepie nie ma gazet*
(`a2_gen_pl`), *W sklepie nie ma mleka i nie ma chleba* (`b2_neg_gen`). So
neither the inversion nor the Genitive **plural** after *nie ma* is new here;
`a2_gen_pl` already shipped the plural negative, which is why the plural rows
read as recognition rather than as a second system.

Pisanie: eleven items, every one a two- or three-word minimal pattern unit with
no bolted-on part, all typed whole under the cap and its composition
refinement. Nothing added to the repair queue.

### `c1_wiedziec` (Block 1, unit 2 — the wiem quarantine is lifted)

Six new forms, zero new endings: *wiesz, wie, wiemy, wiecie, wiedzą* and the
infinitive *wiedzieć*. *wiem* has been owned since `a2_directions_func` [68],
whose own note set the fence — *"this unit NEVER mentions znam, never
conjugates wiem, and never shows the infinitive"* — and it was re-held by
`b2_ze_clauses`, `b2_indirect_q` and `b2_double_neg`, the last of which could
not use its own headline phrase *Nikt nie wie*. Spine **O10** promotes the fix
to unit 2 of the level rather than a Block 7 tidy-up, and that placement is now
paying immediately: `c1_adj_pl_gen` two nodes later is already recycling
`c1_existential`, and question-asking is open for the rest of the level.

The endings are the `-m`/`-sz` set owned since A1 on *mieć*, run down the page
as a parallel (*mam/masz/ma/mamy/macie* against *wiem/wiesz/wie/wiemy/wiecie*)
with **`wiedzą` named as the one place the parallel breaks** — *mają* would
predict a form that does not exist, and slide 2 is that one fact. *mamy*
appears only in the job AGENTS' own homograph table assigns it, the verb "we
have", never as a Genitive of *mama*.

**The split costs one paradigm, not two, and that was verified rather than
assumed:** *znać / znam / znasz / zna / znamy / znacie / znają* are ALL TAUGHT
since `a1_present` [15]. So the *wiedzieć*-vs-*znać* contrast is a selection
fact laid over a paradigm the learner has had for 150 nodes.

**Judgment call worth James's eye — this is the one unit in the batch that
carries two things.** AGENTS' load-splitting rule says an assembly unit should
introduce only one new thing, and this unit teaches a paradigm *and* a
selection rule. It was kept as one unit because the spine designed it that way
(O10) and because the second thing is not new material: nothing about *znać*
is taught here, only when to reach for it. The test given is **syntactic, not
semantic**, deliberately, because a syntactic test is one the learner can
actually apply: if what follows could stand alone as a sentence it is
*wiedzieć*; if it is a person, place or thing you could point at it is *znać*.
If it feels like two units in the hand, the clean split is paradigm here,
selection in a small unit of its own.

**Accusative objects are pool-limited and that shaped the unit.** *tę* is
verified NEW, so no feminine demonstrative object exists at this position, and
*kobietę*, *kolegę* and *lekarza* are NEW too. Every *znać* object is therefore
a masculine inanimate (*adres*, *ten sklep*, *ten hotel*), a neuter (*to
miasto*), or the honest Acc≡Gen animate AGENTS names. No new noun form rides
in.

Stage division of labour, deliberate and worth keeping: **Pisanie drills the
paradigm** (six single forms plus the infinitive — the AGENTS "a single form
for conjugation" contract, the `b2_powinien` idiom); **Kontrola drills the
selection**, since choosing between two verbs is a discrimination and that is
what a quiz is for; **Użycie is where they meet** (*Znam adres, ale nie wiem,
gdzie jest hotel.*). Item 10 of Pisanie is the batch's only cloze — *Czy ___
ten hotel?* → *znasz* — blanking the selection rather than the paradigm,
precisely so no answer repeats under the engine's own `norm()`.

Fenced: *wiedza* the noun, so *wiedzą* is only ever the verb here; the past
*wiedziałem* (verified NEW, and a second system in a unit that already carries
two things); *umieć*, the third English "know how to"; and **`je`**, the 3sg of
*jeść*, which would have completed the *mieć* parallel prettily and is verified
NEW and fenced to `c1_pron_je` under spine O13.

### `c1_adj_pl_gen` (Block 2, unit 1 — the largest remaining system opens)

Four new forms, one ending. B2-SPINE **O3** sent the plural adjective to C1 and
**nine consecutive B2 units shipped bare-noun because of it** — `b2_loc_pl`
through `b2_sie_impersonal` each logged the same line. This node starts paying
that back, and the Genitive goes first for a concrete reason rather than an
arbitrary one: it is the one oblique case where the learner **already** puts
plurals (*dużo* + Genitive plural since `a1_gen_endings`, *nie ma* + Genitive
plural since `a2_gen_pl`, noun families closed by `b2_gen_pl_full`). Exactly one
thing changes about sentences he already builds: the adjective comes along.

The ending is the headline. The singular made him choose between `-ego` and
`-ej`; the plural has nothing to choose — **`-ych` covers masculine, feminine
and neuter alike**. *dobrych, nowych, małych, dużych* all verified NEW.

**Four adjectives rather than six, for two reasons and the second one is not
the obvious one.** The first is `b2_adj_gen`'s form-count discipline. The
second: *stare* and *zimne* are BOTH verified NEW **as nominative plurals**, so
neither could anchor slide 4's Nominative→Genitive table, while *dobre / nowe /
małe / duże* are all owned. The adjective set was chosen by what could be
anchored, not by what sounded useful.

**Zero new governors, and one of them is two nodes old.** *nie było* and *nie
będzie* come from `c1_existential` at the top of this same level, and three of
the nine Użycie items use them. That is the AGENTS gyms rule's default
recycling mechanism working as intended — new grammar used actively in later
units' sentences rather than drilled in a gym — and it is worth noting because
Block 2 is the one place in C1 where a gym IS scheduled (`c1_adj_pl_gym`, spine
O11).

**Two catches at the wire, both worth recording.**

1. **`dużego` is verified NEW.** It was drafted three times as a quiz
   distractor before being checked — `b2_adj_gen` dropped *duży* from its set,
   so the singular Genitive of *duży* has never been taught. All three were
   replaced with taught forms (*duże*, *duża*, and plain-plural-left-untouched
   strings). AGENTS bans fabricated non-words as distractors; an untaught real
   form is the same failure one step further along.
2. **The planned label carried untaught metalanguage into learner-visible
   chrome.** `tree.json` had *"Dużo dobrych książek · dopełniacz"*, and AGENTS
   allows case names in `body_pl` only. It also used *książki*/*książek* in the
   title where the batch's own homograph finding argues against leading with
   that noun. Corrected at the wire to **"Dużo dobrych filmów"** /
   *"Plural adjectives · the Genitive"*. This is exactly the drafted-label
   check C1-SPINE's build protocol demands and B1 batch 10 earned — the other
   two labels in this batch were checked the same way and passed unchanged.

**The `dużo` / `dużych` collision is named rather than hidden** — slide 4's body
says outright that they are different words that start the same way, that
*dużo* never changes and *dużych* is the plural Genitive of *duży*, and that
they can legally stand next to each other (*dużo dużych domów*). Quiz item 12
offers *dużo* as a distractor against *dużych* for that reason.

Fenced, and this is the single easiest fence in C1 to break by accident because
the three strings are so close: **no `-ymi` and no `-ym` anywhere**, slides or
distractors (`c1_adj_pl_inst` and `c1_adj_pl_dat` own those; `c1_adj_pl_loc`
gets `-ych`'s second job). **Virile forms of every kind are out**, so no person
noun takes an adjective in this unit — and the honest note is that the fence
costs nothing morphologically, since the Genitive plural has **no** virile
split and *dużo dobrych lekarzy* would have been perfectly correct. It is held
out anyway so the unit says nothing at all about people-plurals before
`c1_adj_pl_virile` owns them. `-ich` (*wysokich*, *drogich*) is out too: every
adjective here is a hard stem, so the rule as stated is trustworthy for exactly
the words shown, on the `b2_gen_pl_full` fleeting-e precedent.

### For James to smoke

1. **`c1_wiedziec` carries two things** (a paradigm and a selection rule)
   against AGENTS' load-splitting rule. Kept as one unit because spine O10
   designed it so and because *znać* is not new material. Named split if it
   feels heavy in the hand: paradigm here, selection in its own small unit.
2. **`c1_existential`'s Pisanie is typed whole throughout** — eleven items of
   two or three words, e.g. *Nie było mleka.* They are minimal pattern units
   with no bolted-on part, held under the repair queue's own precedent
   (*Planuję spotkanie.*, `b1_wrapup` #0). If a three-word negative existential
   reads as a composed sentence in the hand, all three *Nie …* items become
   clozes and the rule should be restated for the rest of C1.
3. **`c1_adj_pl_gen`'s title changed at the wire** from the planned draft. Worth
   a glance that *Dużo dobrych filmów* reads right on the map, given *dobrych*
   is a form the unit itself teaches.

### Still open, carried forward untouched

- **The 161 fold variants across 18 packs** whose `accepts` contains the
  deaccented form of their own answer, suppressing the „z ogonkami" correction
  on precisely the words where the ogonki matter. Unresolved since the fifth
  repair run; still James's call, still a one-line script in either direction.
  **None of this batch's three packs adds to it** — every `accepts` here holds
  the exact answer (plus, on whole-sentence items, the no-final-stop variant,
  which is the standing convention and is not a fold).
- Every C1-SPINE O-item, **O3 above all** (productive semantic prefixation is
  the one inbox item where a hand-over list and a James-locked decision
  directly contradict each other, and the spine took the locked decision).
- The **MÓGŁBY QUARANTINE**, which `c1_past_gaps` in Block 7 must check against
  James's current ruling before building rather than assume (spine O13).
- **`wydaje mi się`**, still James's call, still colliding with *wydaje* =
  "spends" (`b2_verb_family2`).
