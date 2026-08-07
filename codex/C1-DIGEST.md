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

## Batch 2 — Block 2's oblique cases close (3 units)

Built `c1_adj_pl_loc`, `c1_adj_pl_inst`, `c1_adj_pl_dat` — the Locative,
Instrumental and Dative of the plural adjective. Each audit-clean (0 errors; the
same 2 pre-existing, unrelated warns from `a2_prep_review` / `b1_two_futures`),
pushed to `origin/b1-build` one at a time, not batched. Three new structures
registered in `SEQUENCING.md` **and** `audit.py`'s `STRUCTURE_CATALOGUE` before
each audit ran: `adj_pl_loc`, `adj_pl_inst`, `adj_pl_dat`.

Path is now live through `c1_adj_pl_dat` (path index 185, **178 live nodes**).
Next unbuilt C1 node: `c1_adj_pl_virile` — Block 2, unit 5, the men-group forms
and the plural predicate adjectives `b2_copular_future` fenced absolutely.

**With this batch the four OBLIQUE plural adjective endings are complete.**
B2-SPINE **O3** sent the plural adjective to C1 and nine consecutive B2 units
shipped bare-noun because of it; four of the five teaching units have now paid
that back. Three strings across four cases — `-ych` (Genitive, Locative), `-ymi`
(Instrumental), `-ym` (Dative) — and `c1_adj_pl_dat`'s slide 4 is the summary
board, explicit that the Nominative and Accusative plural adjective is taught
nowhere yet, virile or otherwise.

`codex/REPAIR-QUEUE.md` was read first and is **fully ticked** — all 19 packs,
all 104 items. No step-0 repair work existed this run. None of these three packs
adds to it: every Pisanie item is a two- or three-word pattern phrase.

### `c1_adj_pl_loc` (Block 2, unit 2 — `-ych` does its second job)

Zero new forms in the whole unit, so `teaches_lemmas` is legitimately empty on
the `copular_future` / `adj_inst` / `existential_tense` convention. Everything is
one node old (`dobrych, nowych, małych, dużych` ← `c1_adj_pl_gen` [182]) or much
older (the nouns ← `b2_loc_pl` [152], the governors since A1/A2). The unit's
entire content is that a string produced last unit is now correct in a second
place — the course's "same ending, another job" idiom on its fifth turn.

Unblocks *w dużych miastach*, the sentence `b2_loc_pl`'s digest flagged as
unsayable.

**The spine's own illustration is unbuildable, and was replaced rather than
smuggled in.** C1-SPINE's Block 2 table offers *"W dużych sklepach. Myślę o
starych filmach."* The second half is dead on **both** words: `starych` is NEW
(`c1_adj_pl_gen` deliberately dropped *stary* from its four-adjective set) and
`filmach` is NEW (not among `b2_loc_pl`'s eleven nouns). The `o`-governor row is
carried by *o dużych miastach* instead. This is the same class of catch B2 hit
repeatedly with its own spine illustrations (*Myślę o dobrym filmie*, *Jadę z
miłą siostrą*), and it is worth restating that a spine example is a sketch, not a
licence.

**The noun list is hard-limited to eleven** and that shaped every sentence:
`domach, sklepach, hotelach, bankach, szkołach, firmach, gazetach, miastach,
biurach, mieszkaniach, biurkach`. `filmach`, `parkach`, `kotach`, `książkach`,
`oknach` and `telefonach` are all verified NEW and appear nowhere. **`na` appears
exactly once**, and for a lexical reason rather than a scope choice: `biurkach`
is the only one of the eleven that takes it. Named here so a later reader does
not read it as under-coverage.

**`-ym` appears here, legally, and that is worth understanding rather than
flagging.** It is the SINGULAR masculine/neuter Locative `b2_adj_loc` [136]
taught, used in exactly that job, and the unit needs it for the singular→plural
collapse. The homograph with the plural Dative was two nodes away, and this
pack's note said so in advance — which `c1_adj_pl_dat` then paid, below.

### `c1_adj_pl_inst` (Block 2, unit 3 — the plural undoes a merger)

Three new forms, one ending: `dobrymi, nowymi, małymi`. **The one discrimination
it adds, and the reason it does not fold into the node before it:**
`b2_adj_inst`'s headline was that masculine and neuter share ONE form across the
Locative and the Instrumental (*w dobrym hotelu* / *z dobrym kolegą*) — that was
its gift. The plural takes it back: `-ych` after *w*/*na*/*o*, `-ymi` after *z*.
So this is not "another case, another ending", it is the case that breaks the
pattern the previous two established. Recycling `c1_adj_pl_loc` one node back is
what makes the contrast legible.

**A genuine design fork, taken deliberately — this unit uses person nouns with
adjectives and its two siblings did not.** `c1_adj_pl_gen` fenced person nouns
out entirely ("no person noun takes an adjective in this unit") and
`c1_adj_pl_loc` held the same line. That fence **cannot** be held here, for a
lexical reason rather than a pedagogical one: `b2_inst_pl` [153] taught exactly
twelve Instrumental plurals and **eleven of them are people** (*rodzicami,
dziećmi, kolegami, siostrami, córkami, synami, braćmi, ludźmi, klientami,
pacjentami, ciociami*). The only non-person is *kotami*, and every alternative
was checked and is NEW: *studentami, nauczycielami, lekarzami, autobusami,
samochodami, kluczami, telefonami, książkami, gazetami, plecakami, przyjaciółmi,
gośćmi*. Holding the sibling fence would have produced a twelve-row match board
about cats.

**Why that is safe, checked rather than assumed: the Instrumental plural has no
virile split.** `-ymi` is the form for virile and non-virile alike, and `-ami` /
`-mi` is likewise uniform on the noun, so **no virile form appears anywhere in
the unit** — *dobrymi* is simply not a virile shape and there is nothing for
`c1_adj_pl_virile` to have to correct. C1-SPINE's standing fence ("virile forms
appear nowhere before `c1_adj_pl_virile`") is intact. What is deliberately NOT
done: no virile NOMINATIVE plural is shown, so no person noun takes an adjective
in the Nominative — *lekarze* and *dzieci* appear as bare subjects only, which is
`b2_inst_pl`'s own sentence shape.

**`dużymi` is dropped, and the consequence is logged rather than left to be
discovered.** `c1_adj_pl_gen` chose its adjectives "by what could be anchored,
not by what sounded useful", dropping *stary* and *zimny*; the same test drops
*duży* here, because with eleven person nouns and one animal it has no natural
collocation and *kotami* alone cannot carry a quarter of the board. So the unit
teaches THREE adjectives. **`duży` now has `dużych` (Genitive and Locative
plural) and no Instrumental plural** — an incomplete corner of the block's
paradigm that `c1_adj_pl_dat` and `c1_adj_pl_gym` both inherit.

**Two jobs, not three**, and the unit says so rather than leaving a hole:
accompaniment after *z*, and identity after *być* (*Jesteśmy dobrymi kolegami*).
The third Instrumental job — the bare form for transport — has no plural in this
course at all (*autobusami*, *samochodami* both NEW), so nothing asks for one.

Scope checks run this batch: `dużą` is TAUGHT but only as an ACCUSATIVE
(`b2_adj_acc` [133]), and `b2_adj_inst`'s `uses_lemmas` carry *dobrą/nową/małą*
but **not** *dużą* — so it never appears in an Instrumental slot here.
`kolegach`, `klientach`, `pacjentach` are NEW, which is why every Locative
contrast uses `hotelach` / `sklepach`. `kotem`, `klientem`, `pacjentem` and
`koledzy` are NEW and appear nowhere including as distractors, which is why the
singular distractors are built on *kolegą* and *dzieckiem*.

### `c1_adj_pl_dat` (Block 2, unit 4 — the same string, a third job)

Zero new forms again, `teaches_lemmas` empty for the second time in the block.
`dobrym`, `nowym`, `małym` have been owned since `b2_adj_loc` [136].

**The trap is the unit, and C1-SPINE named it in advance** — *"-ym is also the
singular m/n Locative and Instrumental ending — same string, third job. Name
it."* `c1_adj_pl_loc`'s own note predicted the collision two nodes back and told
this unit to name it rather than assume it. What makes it sharper than the
block's earlier re-sightings is that those changed CASE while holding NUMBER;
this one changes **NUMBER**. *w dobrym hotelu* and *z dobrym kolegą* are
singular; *dobrym studentom* is plural; nothing in `-ym` says which. **The
resolution given is the honest one: the noun settles it** — `-om` is the Dative
plural and nothing else in the course ends that way, so the learner is told to
read the noun, not the adjective. Quiz item 4 puts *w dobrym hotelu* directly
beside the Dative plural for that reason.

The person-noun fork carries forward unchanged from the previous node and for
the identical lexical reason: `b2_dat_pl` [154] taught twelve Dative plurals and
**eleven are people**, the only non-person being *kotom*, and *nauczycielom* is
NEW. Safe on the same ground — the Dative plural has no virile split either.

**`duży` is absent again, and this time not by this unit's choice.**
`b2_adj_dat` [138] taught only *dobremu, nowemu, małemu*, exactly as
`b2_adj_gen` dropped *duży* and `b2_adj_loc` used *dobry/nowy/mały/zimny*. *duży*
has **no singular oblique anywhere in the course** — *dużym*, *dużego*, *dużej*
all verified NEW — so there is no singular Dative to contrast a plural against.
The gap logged at `c1_adj_pl_inst` is therefore now a **block-wide fact** rather
than one unit's decision.

**The singular→plural table has only two rows, and that is a lexical limit, not
an editorial one.** A row needs a Dative singular AND its Dative plural, and only
two nouns have both: *studentowi/studentom* and *siostrze/siostrom*. *bratu,
mamie, tacie, kobiecie, nauczycielowi* have no taught Dative plural; *dziecku*
and *koledze* are NEW, so *dzieciom* and *kolegom* have no taught singular. The
neuter row on slide 3 therefore carries an **em dash** in the singular column
with one line of explanation — the `b2_kim_czym` / `b2_case_gym` treatment —
rather than a fabricated form.

**One logged inbox item paid, exactly as directed.** C1-SPINE's reconciliation
table sends *"Dative plural noun in the podoba się frame"* here **"as a use
item — the ending is owned, only the frame shape is new; logged, not a unit."**
Use item 7 (*Ten film podoba się małym dzieciom.*) is that item and only that
item: `a2_dat_chunks` taught the frame with a PRONOUN in the Dative slot, and
`b1_dative_sg` already gave the learner noun Datives after *pomagać* and
*dziękować*, so the substitution is the frame shape the inbox names.

### Pisanie shapes across the batch, and why they differ

Worth recording because the three units came out differently and each is
deliberate. `c1_adj_pl_loc` and `c1_adj_pl_inst` type **three-word prepositional
phrases** (*w dobrych hotelach*, *z dobrymi kolegami*) because neither case
exists without its governor — a bare *dobrych hotelach* is not something anyone
says — which is exactly the shape AGENTS names when it lists *w domu* as a
Pisanie pattern phrase. `c1_adj_pl_dat` types **two-word phrases** (*nowym
studentom*), the `c1_adj_pl_gen` shape, because the Dative here is governed by a
VERB rather than a preposition, so adjective + noun is the whole minimal pattern
unit and no governor belongs inside it. All 24 items are pattern phrases, none is
composed, and all sit under the ≤3-word cap.

### For James to smoke — batch 2

1. **`c1_adj_pl_inst` and `c1_adj_pl_dat` put adjectives on person nouns; their
   two siblings did not.** This is the batch's one real fork. It is forced —
   `b2_inst_pl` and `b2_dat_pl` each taught twelve plurals of which eleven are
   people, so the stricter sibling fence would have made both units unbuildable
   from taught material. It is safe because neither case has a virile split and
   no virile form appears anywhere. If you want the stricter fence held
   course-wide, these are the two units that have to change, and the honest
   answer is that they cannot then be built at all.
2. **`duży` now has a hole in its paradigm.** It has `dużych` (Genitive and
   Locative plural) and nothing else oblique, singular or plural, anywhere in the
   course. `c1_adj_pl_gym` inherits it. The fix, if you want the full four
   adjectives, is the gym or a later unit beside a non-person Instrumental
   plural — not a forced cat sentence in unit 3.
3. **The `-ym` collision in `c1_adj_pl_dat` is the sharpest thing in the block**
   and everything rests on the learner reading the noun rather than the
   adjective. Slides 1 and 2 and quiz item 4 all carry it. Worth a look in the
   hand that it lands, because if it does not, the block's other three units are
   all quietly harder than they read.
4. **Three labels changed at the wire**, dropping the case name the drafts
   carried (*· miejscownik*, *· narzędnik*, *· celownik*) to match
   `c1_adj_pl_gen`'s own correction in batch 1 — AGENTS allows case names in
   `body_pl` only. Note this makes C1 inconsistent with B2, whose `b2_loc_pl` and
   `b2_adj_loc` titles still carry *· miejscownik*. Consistency within Block 2
   was preferred; if you would rather the case names stayed in titles, it is four
   labels to put back and the B2 ones are already the precedent.

### Still open after batch 2

- The **161 fold variants across 18 packs**, unresolved since the fifth repair
  run and untouched here. **None of this batch's three packs adds to it** —
  every `accepts` holds the exact answer, plus the no-final-stop variant on
  whole-sentence use items, which is the standing convention and is not a fold.
- Every C1-SPINE O-item, **O3 above all**.
- The **MÓGŁBY QUARANTINE**, for `c1_past_gaps` in Block 7 to check against
  James's current ruling rather than assume (spine O13).
- **`wydaje mi się`**, still James's call (`b2_verb_family2`).
- **`duży`'s incomplete oblique paradigm**, new this batch — see smoke item 2.


## Batch 3 — Block 2 closes completely (3 units)

Built `c1_adj_pl_virile`, `c1_adj_pl_gym`, `c1_evaluation` — the virile plural
adjective, the block's gym, and the Block 2 vocab pack. Each audit-clean (0
errors; the same 2 pre-existing, unrelated warns from `a2_prep_review` /
`b1_two_futures`), pushed to `origin/b1-build` one at a time, not batched. **One**
new structure registered in `SEQUENCING.md` **and** `audit.py`'s
`STRUCTURE_CATALOGUE` before its audit ran: `adj_pl_virile`. The gym and the vocab
pack have empty `teaches_structures` by their genres' conventions, so neither
needed an ID.

Path is now live through `c1_evaluation` (path index 188, **181 live nodes**).
Next unbuilt C1 node: `c1_ktory_plural` — Block 3, unit 1, the plural relatives
`b2_ktory_full` fenced.

**With this batch Block 2 is complete and B2-SPINE O3 is fully paid.** The plural
adjective was the largest untaught system left in the course; nine consecutive B2
units shipped bare-noun waiting for it. Five teaching units and a gym have now
closed it: `-ych` (Genitive, Locative, virile Accusative), `-ymi` (Instrumental),
`-ym` (Dative), `-e` (non-virile Nominative, from A2), and the virile Nominative.

`codex/REPAIR-QUEUE.md` was read first and is **fully ticked** — all 19 packs, all
104 items. No step-0 repair work existed this run. **None of these three packs adds
to it:** every Pisanie item in both grammar units is a two- or three-word pattern
phrase, and the vocab pack has no Pisanie stage.

### `c1_adj_pl_virile` (Block 2, unit 5 — the men-group form)

Four new forms: `nowi`, `młodzi`, `zmęczeni` (virile Nominative plural) and
`zmęczone` (the non-virile plural of the same adjective, so the split has both
sides on one word). `dobrzy` is **recycled, not taught** — `b1_virile_reco` [109]
handed it over as a whole ready-made form with no rule at all, so the unit's shape
is the `b2_verbal_nouns` / `b2_participle_pass` anchor shape: a form the learner
has read since B1 turns out to be built by a pattern.

**It stays one new thing because the learner already makes this move on the
nouns.** `b1_virile_nom` taught "look at the last consonant of the stem"
(*student→studenci*, *Polak→Polacy*); slide 2 says outright that the adjective in
front does the same, so this is one familiar operation reaching a second word
class rather than a new system. The four alternations shown are r→rz, w→wi, d→dz,
n→ni, stated as a pattern over four owned words and never as a productive test —
the `b2_gen_pl_full` fleeting-e precedent C1-SPINE **O12** restates for exactly
this genre.

**The batch's one real fork: the spine's own `mali` and `duzi` are dropped.**
C1-SPINE names *mali*, *duzi*, *zmęczeni*. `zmęczeni` is built; the other two are
not, because **no virile noun this course owns collocates with a size adjective**.
Every taught virile plural is an adult occupational or relational noun —
*studenci, lekarze, nauczyciele, pracownicy, kelnerzy, Polacy, pacjenci, klienci,
artyści, rolnicy, Anglicy, goście, kibice, przyjaciele, turyści, ludzie, kucharze,
dziennikarze, policjanci, informatycy, rodzice* — and *mali studenci* is not
something anyone says. The natural home for *mali* is *chłopcy* or *synowie*, both
verified NEW. Rather than ship a table row that never appears in a sentence, the
unit substitutes **`nowi`**, which the spine did not name and which turns out to be
the strongest virile adjective in the pool: *nowi studenci / klienci / pracownicy*
are all ordinary Polish, and it is the only adjective besides *dobry* whose
masculine, feminine **and** non-virile plural are all taught, which is what
supplies a clean four-way distractor set. `młodzi` is the second substitution on
the same test. This is the `c1_adj_pl_loc` precedent applied a second time in one
block — a spine example is a sketch, not a licence.

**Distractor availability drove the adjective set, exactly as in `c1_adj_pl_gen`.**
Only four adjectives in the whole course have masculine, feminine and non-virile
plural all taught (*dobry, nowy, mały, duży*), and of those only *dobry* and *nowy*
have a usable virile. `zmęczony` gets a full four-way set because this unit teaches
the two missing members itself, which is why it carries the sharpest items.
`młody` has *młody/młoda/młodszy* owned but *młode* is verified NEW, so its item
distracts with the comparative rather than with a form the course does not own.

**Pays `b2_copular_future`'s absolute fence**, which is why `zmęczone` is taught
alongside `zmęczeni`. That pack's note reads: *"PLURAL predicate adjectives are
fenced absolutely — zmęczeni / zmęczone are NEW (b1_virile_gym and
b1_conditional_pl each record nearly shipping them by mistake, one batch apart)."*
The plural predicate itself is **not** new — `a2_plural_nom` already shipped *Koty
są małe* — so slide 3 adds only that in the plural the choice stops being
man/woman and becomes men-group / everything else.

**The Accusative is built on owned strings only.** Virile Accusative plural =
Genitive plural on noun and adjective alike, using *dobrych/nowych* ←
`c1_adj_pl_gen` [182] and *studentów/kolegów/klientów* ← `b2_num_virile` [157].
Every one of those noun forms was taught **as a Genitive plural** and is used here
in the **Accusative** — the honest masculine-animate exception AGENTS names
(*brata*), one number up, stated in one line on slide 4 and anchored on *Znam
brata*. *młodych* and *zmęczonych* are verified NEW, so those two adjectives have
no Accusative here; logged rather than hidden.

**Second homograph, checked rather than assumed.** `check_new.py` reports *dobre*
first at `a1_gender_check` [6] and *małe* at `trunk_adjectives_a1` [8] — i.e. as
**neuter singulars**. The plural job was therefore verified directly against
`a2_plural_nom`'s own items (*Czy hotele są dobre?*, *Koty są małe.*, *Mam nowe
książki.*), which use all four squarely as non-virile plurals. **`głodne` is the
counter-example and is fenced:** it is TAUGHT [8] but only ever as a neuter
singular and no later pack puts it in a plural, so it appears nowhere.

### `c1_adj_pl_gym` (Block 2, unit 6 — the gym earns its slot)

Zero new material, `teaches_structures` and `teaches_lemmas` both empty, on the
`a1_case_gym` → `b2_case_gym` line.

**Why the slot is earned, tested against AGENTS' rule rather than taken from the
spine.** The rule retired `a2_past_gym` for being "a repetition of things that were
not difficult". This board is not that: three strings (`-ych`, `-ymi`, `-ym`) are
spread across **six jobs**, and `-ych` alone does **three** of them — Genitive,
Locative, and the virile Accusative that landed one node earlier — with nothing
inside the adjective to say which. A same-string-many-jobs collision is what massed
discrimination is for. This is the only new gym in C1 besides the `c1_case_gym`
closer.

**Slide 3 is the gym's one genuinely new thought, and it reduces load rather than
adding it:** of the six jobs, the men/not-men split shows in exactly **two** — the
subject form and the object form. In all four oblique jobs the plural adjective is
one form for everyone. Each oblique unit could only say this about itself
(`c1_adj_pl_inst`: "the Instrumental plural has no virile split";
`c1_adj_pl_dat`: "the Dative plural has no virile split either"); no node could say
it about the whole block until `c1_adj_pl_virile` landed. Saying it once, here, is
worth more than the four separate reassurances were.

**All twelve quiz answers are distinct**, which took real work in a gym whose whole
point is one string answering to three triggers — the naive board would have had
*dobrych* as the answer three times. The collision is preserved where it matters by
keeping the **choice set identical** across items 1, 3 and 10 (*dobrych / dobrymi /
dobrym / dobre*, reordered) while the answers differ, so the learner meets the same
four buttons under three different trigger words.

**`duży`'s paradigm hole is inherited, not fixed**, exactly as `c1_adj_pl_inst` and
`c1_adj_pl_dat` predicted. *duży* has *dużych* and nothing else oblique anywhere in
the course, so it appears here only in Genitive and Locative slots and quiz item 9's
distractors are built from *duże / dużo / duża*. Closing it would mean teaching new
forms in a zero-new gym, so it is deliberately left open — see smoke item 3.

**No virile Locative anywhere**, and that is lexical rather than editorial:
*lekarzach* and *studentach* are both verified NEW (`b2_loc_pl`'s eleven nouns are
all things), so every Locative slot takes a non-person noun and the virile split is
demonstrated where it actually shows.

### `c1_evaluation` (Block 2 vocab — the oldest IOU in the course)

Twelve new words, every one re-verified NEW at this node's own path position rather
than inherited from the spine: **łatwy, trudny, gotowy, pusty, pełny, dziwny,
zwykły, oczywisty, konieczny, możliwy, niemożliwy, skuteczny.** The spine listed
exactly twelve and said "trim to 12", so nothing needed dropping — the first C1
vocab brief that came out of scoping already the right size.

**The anchor rule decided the entire sentence bank, and AGENTS names this pack's
trap in its own text:** *"Never write lookalike frames where both halves are new
(To jest łatwe / trudne)."* That is literally the two headline words. So neither is
ever introduced in a bare *To jest* frame — `łatwy` arrives on *Angielski jest
łatwy* and `trudny` on *Polski jest trudny*, each with a taught language name doing
the anchoring and exactly one unknown in the sentence. Verified mechanically at the
wire: no sentence in the bank contains more than one word this pack teaches.

**Four words take a lexical anchor already in the course instead of an icon**,
because a derivation the learner can see beats a picture: *oczywisty* ←
*oczywiście* (`b1_polite` [105]); *możliwy* ← *możliwość* (`b2_abstract` [149]) and
*można* (`a2_musiec` [77]); *niemożliwy* ← *możliwy* plus the *nie-* owned since
A1; *skuteczny* ← *skutek* (`b2_abstract` [149]). The other eight carry an icon.

**The homograph is `gotowy` and it is the sharpest thing in the pack.** *gotować*
has been taught since `a1_present_uje` [18] and *ugotowany* by
`b2_participle_pass` [173]. *gotowy* looks like it belongs to that family and does
not — it means **ready**, and *Obiad jest gotowy* is about the dinner being
finished rather than about anyone having cooked it. Named out loud on the item.
*konieczny* / *koniec* is the milder second case, flagged in one line and not built
into a rule.

**Twenty taught forms for twelve words** is the `b2_abstract` shape (fifteen for
twelve) and is not twenty things to learn: eight are the feminine, neuter or plural
of a word whose masculine is taught in the same pack, built by agreement rules the
learner has just spent five units drilling. They are tagged so the auditor can
police them, per the every-form-taught rule.

**The Block 2 placement is used, not merely honoured.** C1-SPINE puts this pack
here "so the block's new endings get a wider adjective set to run on than
dobry/duży". Sentence 25 — *W pustych sklepach nie ma chleba* — is that payoff, and
`pustych` is the one plural oblique taught here; teaching `-ych` on all twelve
would be a morphology unit wearing a vocab pack's clothes. Structure recycling is
deliberately wide across the 28 sentences (`ze_clauses`, `reported`, `indirect_q`,
`jesli` + perfective future, `question_cases`, `neg_gen`), including
`adj_pl_virile` one node back — *Nauczyciele są zmęczeni, ale egzamin jest łatwy* —
which is the AGENTS gyms rule's named default recycling mechanism working one node
after the gym.

### Labels at the wire

Two of the three planned labels needed correcting, which keeps the batch-1 and
batch-2 pattern intact.

- `c1_adj_pl_virile` read **"Mali, duzi, zmęczeni"** — two of those three forms are
  no longer taught by the unit, so the label would have carried Polish the course
  never teaches into learner-visible chrome. Retitled to the house contrast pattern
  on `b1_virile_reco`'s own *Ci czy te?* model: **"Dobrzy czy dobre?"**, both words
  owned.
- `c1_adj_pl_gym` read **"Siłownia · dobre i dobrych"** — every word taught, so it
  needed no rescue. Sharpened to **"Siłownia · dobrych, dobrymi, dobrym"**, which
  names the three-string collision the gym exists for.
- `c1_evaluation`'s **"Łatwy czy trudny?"** stands unchanged. Both adjectives are
  taught by the pack itself, which is the `c1_adj_pl_gen` precedent (*Dużo dobrych
  filmów* uses a form it teaches).

### For James to smoke — batch 3

1. **`mali` and `duzi` are not in the course and this was the batch's one real
   fork.** The spine named them; no owned virile noun collocates with a size
   adjective, so they were replaced with `nowi` and `młodzi`. If you want them, the
   cost is one new virile noun (*chłopcy*) and they slot into `c1_adj_pl_gym`
   without disturbing anything already built. The honest alternative was a table row
   that never appears in a sentence.
2. **The virile Accusative asks Dad to read *dobrych studentów* as an object** when
   both words were taught to him as Genitives. Slide 4 names the borrowing and
   anchors it on *Znam brata*, which AGENTS calls the honest masculine-animate
   exception. Worth a look that it lands, because the whole object half of the
   plural adjective rests on it.
3. **`duży` still has a hole and the gym did not close it.** It has *dużych*
   (Genitive and Locative plural) and nothing else oblique, singular or plural,
   anywhere in the course. Closing it in a zero-new gym would have broken the gym
   idiom, so it is left for you: either a later unit beside a non-person
   Instrumental plural, or an explicit decision that four adjectives was always one
   too many.
4. **`gotowy` sits one letter from a family it does not belong to.** *gotować*,
   *gotowanie* and *ugotowany* are all owned. The item explain says so directly. If
   it still reads as "cooked" in the hand, the fix is a second sentence putting
   *gotowy* and *ugotowany* side by side, which was held out here to keep one new
   word per sentence.
5. **Slide 3 of the gym makes a claim about the whole block** — that the men/not-men
   split shows only in the subject and object forms. It is true and it is the
   biggest simplification available at this point in the course, but it is the first
   time any node has summarised across five units, so it is worth checking it reads
   as relief rather than as a sixth fact.

### Still open after batch 3

- The **161 fold variants across 18 packs**, unresolved since the fifth repair run
  and untouched here. **None of this batch's packs adds to it** — every `accepts`
  holds the exact answer, plus the no-final-stop variant on whole-sentence items,
  which is the standing convention and is not a fold.
- Every C1-SPINE O-item, **O3 above all** (productive semantic prefixation, where a
  hand-over list and a James-locked decision contradict each other).
- The **MÓGŁBY QUARANTINE**, for `c1_past_gaps` in Block 7 to check against James's
  current ruling rather than assume (spine O13).
- **`wydaje mi się`**, still James's call (`b2_verb_family2`).
- **`duży`'s incomplete oblique paradigm**, carried from batch 2 and now formally
  inherited by the gym without being fixed — see smoke item 3.

---

## Batch 4 — Block 3 opens: the relative and the pronoun completed (3 units)

Built by the cloud routine, 2026-08-07. `c1_ktory_plural`, `c1_pron_12_prep`,
`c1_pron_je` — the first three nodes of Block 3, in `path_order`. Audit clean
at every commit (182, 183, 184 nodes; **0 errors**, warns 2, both the standing
empty-teaches review nodes `a2_prep_review` and `b1_two_futures`). Three new
structure IDs registered in `SEQUENCING.md` **and** `audit.py` before any audit
ran: `ktory_plural`, `pron_prep_12`, `pron_je`.

**Step 0 was checked first and there was nothing to do:** `REPAIR-QUEUE.md` is
fully ticked — all 19 packs, all 104 items, closed by the sixth repair run. No
pack in this batch adds to it; every Pisanie item in all three units is a cloze
and there is not one typed-whole answer anywhere in the batch.

### `c1_ktory_plural` (Block 3, unit 1 — the plural relative)

Pays `b2_ktory_full`'s own logged fence, in that pack's words: *"the relative
declines like an adjective, so shipping plural relatives here would breach O3 by
the back door."* Block 2 closed the plural adjective four nodes back, so the
objection died and the debt falls due immediately rather than at the end of the
level — which is why the spine placed this node here and not in Block 7.

**Four new strings** (`którzy`, `których`, `którymi`, `któremu`) and **two new
JOBS on owned strings**, deliberately not re-taught on the `adj_pl_loc` /
`adj_pl_dat` convention: `którym` (owned as the singular m/n Locative and
Instrumental) doing the **Dative plural**, and `które` (owned as the neuter
singular relative) doing the **non-virile Nominative and Accusative plural**.
Both named out loud on their slides rather than left to be noticed.

**The unit is one idea, not six forms.** `b2_ktory_full`'s closing slide — *"You
have met every one of these before"* — is promoted here to the *opening* claim,
because at this path position it is true of the whole paradigm rather than of
four cells: dobrzy→którzy, dobre→które, dobrych→których, dobrym→którym,
dobrymi→którymi, dobremu→któremu. Not one new ending in the unit.

**`któremu` lands here rather than being deferred a third time** because the two
Datives teach each other — *student, któremu pomagam* against *dzieci, którym
pomagam* — and the collision that produces is named on slide 5: `którym` now
covers singular Locative, singular Instrumental **and** plural Dative. The
resolution given is deliberately **different from `adj_pl_dat`'s**: there the
noun settled it (`-om` is a Dative plural and nothing else); here **the
antecedent** settles it, because the relative sits right beside the noun it
points back at.

**Lexical limit that shaped three stages, logged rather than hidden:**
`pomagać` is the only Dative-governing verb whose needed form is owned —
`podobają` is verified NEW and `dziękować` only ever takes `za` + Accusative —
so `pomagam` carries both Dative items in Match, Kontrola *and* Pisanie,
distinguished by the antecedent's number. Which happens to be exactly the
discrimination the slide asks for, so the constraint cost nothing.

**Two homograph catches that changed the unit.** `książki` is TAUGHT ONLY as a
Genitive singular (`a1_gen_ki`) and appears nowhere as a plural — the second row
of the AGENTS homograph table, and the same catch `c1_existential` made at the
top of this level. `miasta` is TAUGHT ONLY as a Genitive singular (inside *do
miasta* / *od miasta*), which cost the natural sentence *"the cities I was
talking about"*. A third catch came from the other direction: a drafted slide row
read *To są sklepy, które są zamknięte* — but `zamknięte` as a **non-virile
plural** participle is `c1_part_attrib`'s property (that pack owns the plural of
the passive participle, fenced by `b2_participle_pass` as *"a homograph inside
the paradigm rather than a scope choice"*). Replaced with *To są telefony, które
są nowe* before the unit was wired.

### `c1_pron_12_prep` (Block 3, unit 2 — the row about you and me)

`b2_pron_prep` did not merely defer this; it **specified** it, and the note is
worth quoting because the build followed it to the letter: *"THIRD PERSON ONLY.
o mnie, o tobie, ze mną, z tobą, do ciebie, z nami, z wami appear nowhere… THE
ALTERNATIVE, if James wants it: a small b2_pron_prep2 with those six forms and
the ze-rule."* It also closes the older fence `a2_o_loc` wrote — *"the unit says
about work / about home, never about you"* — the half `b2_pron_prep` left
standing. **Six new strings, the same count `b2_pron_prep` carried**, plus `ze`.

**The one idea is an asymmetry, and stating it is what holds six forms to one
new thing.** After *o* and after *do*, `ja`, `my` and `wy` reuse the very strings
already owned as objects — `mnie`, `nas`, `was` — so the entire Locative and
Genitive of three persons out of four is already in Dad's mouth. **Only `ty` is
genuinely different, and it is different twice** (`tobie` after *o*, `ciebie`
after *do*). The Instrumental is where the new words actually are: four for four.
Slide 2 says this outright rather than leaving him to wonder whether he has
missed a form.

**The anchor was verified, not assumed:** `według mnie` is TAUGHT ←
`b2_discussion_func` as a whole phrase, so a first-person pronoun has been
sitting after a preposition for a level — it simply happened to be the only cell
he had. The `b2_adj_acc` / `b2_verbal_nouns` "you already say this" opener.

**The `ze` rule is stated as a closed fact, never as a phonological rule.** What
is claimed: Polish says *ze mną* and never *z mną*, and he already does this in
*ze szkoły* / *ze sklepu* / *ze szpitala*. What is also claimed, because it is
true and it is what makes the fact safe: **`mną` is the only pronoun it happens
to** — *z tobą*, *z nami*, *z wami* and every third-person form keep the plain
*z*. No attempt at the condition behind it; `b2_gen_pl_full`'s fleeting-e
precedent.

**The short forms are fenced positionally, not by emphasis, and that was the
sharpest scope call in the batch.** `cię`/`ci` sit beside the verb; `ciebie`/
`tobie` follow a preposition. That is *all* slide 4 claims, because the
**stressed** use of the long forms (*Ciebie znam*) is C1-SPINE's explicit
property of `c1_word_order`, three nodes on. Kontrola item 10 runs the
discrimination in the other direction (*Znam ___* → `cię`) so the positional rule
is drilled both ways rather than only as "the long one is the new one". The
Dative is not opened at all, on `b2_pron_prep`'s own reason verbatim: no
preposition in this course governs it.

**Pisanie is the first stage in C1 where the count of distinct new forms matches
the stage exactly** — eight cloze, one per new string plus the `ze` item, **all
eight on the teaching point, no fallback anywhere.**

### `c1_pron_je` (Block 3, unit 3 — two homographs in one small unit)

Two new strings only, `je` and `czemu`, and the unit's idea is not a paradigm: it
is that a string can look like a word you already own and be a different word,
which is why the two traps share a slot instead of being scattered.

`je` pays `b2_pron_acc`'s stated consequence in that pack's own words — *"after
this unit them is expressible only for people"*. **The verb is in the unit
because the spine required it:** `je` is also the 3sg of `jeść`, and O13 named the
risk — *"teach the pronoun and the verb form together, or the first Ona je the
learner meets reads as she them"*. `c1_wiedziec` had already fenced it forward by
name, dropping `je` from its own `mieć`-parallel table. **One cell, not a
paradigm:** `jem`/`jesz` are owned and `zje` is owned, so `je` is the single
missing box; `jemy`/`jecie`/`jedzą` are verified NEW and stay out, because the
homograph only needs the third person to be defused. The test given is
**positional** — count the verbs — because a positional test is one this learner
can actually apply, and it is exhaustively true for every sentence in the course.

### For James to smoke — batch 4

1. **`czemu` was the batch's one real design fork and it was taken against the
   spine's first reading.** C1-SPINE sends `czemu` here as *the Dative of co*, and
   also explicitly permits the other treatment (*"one line naming both, or leave
   the second sense out and say so"*). The pack teaches it as the **everyday
   colloquial "why"** — a plain synonym of `dlaczego` — and names its Dative
   origin in one line. The reason is not squeamishness: **the Dative of a thing
   has no legal sentence in this course.** `pomagać` is the only
   Dative-governing verb owned, and *"What are you helping?"* is not a sentence
   anyone says; the natural hosts (`dziwić się`, `przyglądać się`) are each a new
   verb *plus* a new construction. That is `b2_pron_prep`'s own reason for
   refusing `niemu` — *"teaching a form with no legal sentence to sit in would be
   padding"* — applied one unit on. If you want the Dative job taught properly,
   the cost is one new reflexive verb and it belongs beside `c1_siebie` or in
   `c1_case_gym`, not here. `b2_case_gym`'s em dash now has a truthful label
   rather than a fabricated example.
2. **`prosić o` + a pronoun is HELD, and I recommend holding it permanently.**
   The tree note assigned it to this unit (`b2_prosic_o`'s judgment call 8). The
   non-virile plural Accusative *after a preposition* is **`nie`** — *o nie*, *na
   nie* — and `nie` is TAUGHT ← `trunk_social_a1` **[path 0]** as the negator, the
   first Polish word Dad ever met. That is the sharpest homograph available
   anywhere in RUPL. The singular half is in any case half-owned
   (`b2_pron_prep` gave `niego`/`nią`/`nim`), so what is genuinely missing is
   precisely the dangerous cell. *Proszę o to* was not shipped either, since it
   opens the same slot.
3. **`od` + a pronoun was taken as an extra governor in `c1_pron_12_prep` and is
   worth a look.** It costs zero new pronoun forms — `od` takes the Genitive, so
   it takes `do`'s forms — and buys *Brat jest starszy od ciebie*, a sentence Dad
   will use. Exposure was held to **one slide row, one match item and one use
   item**; `od` appears in no Pisanie item and no Kontrola distractor, and the
   **source** job of `od` (`c1_od_source`) is not hinted at. If it reads as
   scope-creep in the hand, deleting those three items removes it cleanly.
4. **The `którym` three-jobs slide.** `c1_adj_pl_dat` already asked Dad to hold
   `-ym` across three jobs and resolved it by reading the *noun ending*. This unit
   asks the same of `którym` and resolves it by reading the *antecedent*. Two
   different resolutions for the same shape of problem, four nodes apart — both
   true, but worth checking that the second does not read as a contradiction of
   the first.
5. **Six `je` answers out of twelve in `c1_pron_je`'s Kontrola.** Five distinct
   answer strings across twelve items is the honest maximum for a unit whose
   content is two words (the `b2_ktory_full` / `b2_kim_czym` precedent), and the
   `je` items sit under three different jobs. If the board feels repetitive in the
   hand the fix is fewer items, not invented answers.

### Two corrections to the record, both verified rather than inherited

- **C1-SPINE's standing fence about `GLUE_LEMMAS` is half wrong, and Block 3 is
  exactly where it mattered.** The spine says: *"Person pronouns sit in
  `audit.py`'s `GLUE_LEMMAS`, so the auditor cannot see a single pronoun fence in
  Block 3. Every B2 pronoun pack said this in its own note; C1's three pronoun
  units must be scanned by hand."* Checked directly: `GLUE_LEMMAS` holds the bare
  **subject** pronouns only — *ja, ty, on, ona, ono, my, wy, oni, one* (plus
  *tak*, *nie*, *to* and six given names). **Every oblique form in this batch —
  `mnie`, `cię`, `ci`, `nas`, `was`, `tobie`, `ciebie`, `mną`, `tobą`, `nami`,
  `wami`, `go`, `ją`, `ich`, `je` — IS visible to the auditor and IS policed.**
  The hand-scan discipline is still right, but the thing it actually protects is
  the *subject* pronouns, which appear nowhere in any of the three packs.
- **A second tooling artifact of the kind the spine documents for `na`.** The bare
  preposition **`do`** is not a lemma anywhere in the course — it lives only inside
  multi-word lemmas (*do sklepu*, *do domu*, *do pracy*, *do matki*) and its
  Genitive job rides the `prep_do_gen` **structure**. Declaring it in
  `uses_lemmas` produced a genuine `lemma_not_unlocked` **error** on
  `c1_pron_12_prep`'s first audit run; the fix is to drop it, not to "teach" it.
  This is the house rule `b2_prosic_o` already wrote down (*"Bare governed
  prepositions are not listed in uses_lemmas per SEQUENCING.md 6.3"*). `o` and
  `od` are **not** affected — both exist as bare lemmas in the pool.

### One leak caught by verification, recorded for the class of error

A draft explain in `c1_pron_je` read *"If it were lekarki the pronoun would be
je."* — and `lekarki` is **verified NEW** (the course owns `lekarka`, `lekarką`,
`lekarz`, `lekarze`, `lekarzem`, `lekarzy`, never the feminine plural). It
carries **no Polish diacritic**, so the automated sweep of the English prose
fields — which keys on diacritics to tell Polish from English — did not find it;
it was caught by reading every Polish word in every learner-facing `explain`
against the pool by hand. Replaced with `kobiety`. **`explain` strings are
learner-facing and are subject to the pool exactly as items are**, and any future
batch should assume its own prose fields leak until it has read them.

### Still open after batch 4

- The **161 fold variants across 18 packs**, unresolved since the fifth repair
  run and untouched here. **No pack in this batch adds to it** — every `accepts`
  holds the exact answer, plus the no-final-stop variant on whole-sentence use
  items, which is the standing convention and is not a fold. The one apparent
  exception is `c1_pron_je` Pisanie item 1, whose `accepts` carries `Czemu` and
  `czemu`: that is a **capitalisation** variant on a sentence-initial blank, not a
  diacritic fold, and the engine's `norm()` lowercases anyway, so it is redundant
  rather than suppressive.
- **The `MÓGŁBY QUARANTINE`**, for `c1_past_gaps` in Block 7 — and note R6 has
  since ruled: the plain past is fine, the conditional paradigm stays whole.
- **`wydaje mi się`** — settled by R7 (chunk + homograph line in `c1_nuance`), not
  yet built.
- **`duży`'s incomplete oblique paradigm**, carried from batch 2 and inherited
  unfixed by `c1_adj_pl_gym`.
- **`mali` / `duzi`**, dropped in batch 3; still costed at one new virile noun.
- Next up in Block 3: `c1_siebie`, then `c1_word_order`, then `c1_station_1`
  (placeholder, stays `planned` forever).

---

## Batch 5 — Block 3 closes (2 units)

`c1_siebie` [196] and `c1_word_order` [197], in `path_order` order, one
commit each, pushed individually. `c1_station_1` [198] is the placeholder that
follows and stays `planned` forever, so **Block 3 is now complete** and the next
build run opens Block 4 at `c1_virile_alt` [199].

This run's third unit was not a C1 unit: `codex/REPAIR-QUEUE.md` was checked
first and is still empty, and the run's priority was the which-case family, so
it opened with `b2_which_case` [180] and a `case-map.json` repair. Both are
written up in `codex/WHICH-CASE-DIGEST.md` rather than here.

| unit | path | new strings | structure ID | commit |
|---|---|---|---|---|
| `c1_siebie` | 196 | 3 — `siebie`, `sobie`, `sobą` | `siebie_sobie` | `1e15d0a` |
| `c1_word_order` | 197 | 1 — `jego` | `word_order` | `2bade07` |

Audit after each: **0 errors**, warns unchanged at 6 (the five long-standing
`teaches_empty_grammar` nodes plus `b2_which_case`, which the zero-teach genre
necessarily produces). Both new structure IDs were registered in
`codex/SEQUENCING.md` **and** `audit.py`'s `STRUCTURE_CATALOGUE` before either
audit ran.

### How the two units were verified

The same token-level checker batch 1 of the which-case family used, rewritten
for this run and extended to teaching packs: every Polish string on every
learner-facing surface — slide `title_pl` and `body_pl`, every table cell,
`examples`, match rows, quiz choices AND `explain` prose, cloze frames, answers,
`accepts`, Użycie answers — is split into tokens and checked against the
position-aware pool for that node. It also asserts twelve match rows, one `___`
per cloze frame, no duplicate answers or prompts within a stage under a mirror of
the engine's own `norm()`, that no Pisanie frame reconstructs a Użycie sentence,
that every declared `uses_lemma` is in the pool and is not also a `teaches_lemma`,
and that the answer is present in `accepts`.

**It earned its keep twice, on things `audit.py` structurally cannot see.**

1. `c1_siebie` — three untaught ordinary words were sitting on Polish shorthand
   lines: `decyduje`, `istnieje`, `własne`. AGENTS' convention admits
   *metalanguage* on `body_pl` (case names, `przyimek`, `zaimek`, `podmiot`);
   it does not admit new lexis, and these were ordinary vocabulary. All three
   replaced — `mianownik — nie ma` now uses a phrase owned since A1.
2. `c1_word_order` — `początku` was in a slide `title_pl`. The course owns
   `początek` and not that inflected form, and **an untaught Polish form in a
   title is the rule `b1_wrapup` had to write down after it was broken three
   times in one night.** Replaced with taught material. This is the second run
   in a row where the pack's own verification caught a leak in a *prose* field
   rather than in an item, which is now a pattern worth naming: item fields get
   read carefully because they are obviously learner-facing; titles and shorthand
   lines get typed quickly and are just as visible.

Bare `do` was also dropped from `c1_siebie`'s `uses_lemmas`, per the house rule
`c1_pron_12_prep` established last batch: `do` is not a lemma anywhere in the
course, only ever inside multi-word lemmas, and declaring it produces a real
`lemma_not_unlocked` error.

### `c1_siebie` (Block 3, unit 4 — a second word, not a correction)

The spine's constraint *is* the unit's shape, and it is the most important thing
about this pack: *"`a2_sie`'s framing must survive intact — this unit adds a
second thing, it does not correct the first."* So **nothing in the pack says
`się` means "self"**, and nothing walks anything back. `się` still belongs to the
verb. The pack says `siebie` is a *different word* that English happens to
translate the same way, and that it is a real pronoun — it stands in a noun's
slot, takes a case from whatever governs it, and can follow a preposition, three
things `się` can never do. The minimal pair `Uczę się.` / `Znam siebie.` opens
slide 1 and does the whole job.

**The pronoun is shown only in case slots the course already owns a governor
for** — `do` + Genitive, `o` + Locative, `z`/`ze` + Instrumental, `pomagać` +
Dative. That is deliberately the `c1_pron_12_prep` shape and it holds the unit
to one new thing. `ze sobą` rides the ze-shape that pack taught with `ze mną`:
recycled, not re-taught.

**Person-neutrality is the unit's real content**, and it is what the item design
is built on. One set of forms covers myself/yourself/himself/ourselves and the
*subject* alone disambiguates — so half of Kontrola, half of Pisanie and four of
the ten Użycie items are **minimal pairs against the ordinary pronoun**:
`o sobie` against `o nim` / `o tobie` / `o mnie`, `do siebie` against `do niej`,
`pomaga sobie` against `pomaga mu`. Every one of those distractors is a real
taught form, never a coined one, and the substitution they police is the actual
error an English speaker makes. **No Nominative row is left as a gap** — it is an
em dash with its reason, that the reflexive can never be the subject because it
exists to point back at one.

### `c1_word_order` (Block 3, unit 5 — the small words all lean the same way)

Recognition-leaning and shape-based, exactly as spine **O6** specifies: two
shapes shown as a picture, no rule claimed. The rejected alternative — a full
clitic-position and topic-comment treatment — was killed by the same AGENTS line
that killed the fleeting-e rule in `b2_gen_pl_full`.

**The unifying insight is the unit.** The short object pronouns and `się` behave
*identically*: both lean backwards on the word in front of them, both follow the
verb when the verb opens the clause (`Znam go.` / `Nazywam się Anna.`), both
stand in front of it when anything else does (`Mama go zna.` /
`Jak się nazywasz?`), and **neither can open a clause**.
`b2_sie_impersonal` had already shown `się`'s two shapes as a table fact and
refused to claim it goes second; this unit refuses the same third shape and adds
that `go`/`ją`/`mu` do the same thing — which turns two memorised habits into one
picture at no cost in new material.

**The defining discipline of this pack is negative, and it is worth recording as
a genre rule.** A word-order unit can very easily mark natural Polish *wrong*.
`b2_pron_acc`'s own note is explicit about it: it avoided short pronouns with
noun subjects entirely because *"Mama kocha cię would be marked where Mama cię
kocha is neutral, and choosing between them is a word-order fact, not a pronoun
fact."* **Marked is not ungrammatical.** So no merely-marked string is offered as
a wrong answer anywhere in the pack — `Mama zna go.` appears in no distractor at
all. Every wrong choice is one of exactly three kinds: genuinely illegal (a short
form opening a clause — `Go znam.`), a real form in the wrong case (`Znam ci.`,
`Mama go pomaga.`, `Tata jej lubi.`), or a different sentence with a different
meaning (`Tu nie pali.` = *he is not smoking here*). The neutral order is taught
on a slide and produced in Pisanie and Użycie; the learner is never asked to
condemn its alternative.

The inverted counted subject (`W domu było pięć okien`) was held by **both**
`b2_num_subject` and `b2_plural_gym` and lands here. It adds no agreement fact:
neuter singular for 5-and-up and ordinary plural for 2–4 are `b2_num_subject`'s
and are recycled unchanged, and the only new thing is that the place phrase can
stand in front. **Adjectives are absent from every counted phrase** for that
pack's own reason — a genitive plural adjective is C1 Block 2 material and this
node sits *before* it on the path.

### For James to smoke — batch 5

1. **`c1_siebie` refuses the benefactive Dative, and this is the batch's biggest
   judgment call — it needs your eye, because C1 is the last level and the
   omission is therefore permanent.** *Kupiłem sobie kawę*, *Robię sobie kawę* is
   the commonest everyday use of `sobie` by a distance, and it is not taught. The
   reason is the load-splitting rule: it requires extending the Dative to verbs
   that do not govern it, which is a second new system inside a unit whose brief
   is a contrast. Every `sobie` in the pack therefore sits after `pomagać`, an
   owned Dative governor. **If you want it, it is cheap to add** — one slide and
   three or four items on `kupować`/`robić`, no new morphology at all, since
   `sobie` now exists. It is the single most useful thing this run left out.
2. **The reciprocal reading is named once and produced nowhere.** *Pomagamy
   sobie* usually means *we help each other*, not *we each help ourselves*. It
   gets one line on `c1_siebie`'s closing slide, the recognition-only treatment,
   so a third reading does not compete for attention on a first pass. If it
   should be drilled, it costs no new forms either.
3. **`siebie` as a direct Accusative object is shown but never drilled, and the
   reason is `c1_pron_je`'s reason one node earlier.** There is no clean
   discrimination item for it at this position, because the obvious distractor
   `Znam się.` is itself real Polish with a different sense (*I know my way
   around*). `Znam siebie.` therefore appears on slide 1, in Dopasuj and in
   Użycie, and never as a quiz choice pitted against `Znam się.` If that reads as
   a hole in the hand, the fix is a new verb, not a new item.
4. **`c1_word_order` slide 1 carries one emphatic noun-order pair —
   `Mama pomaga tacie.` / `Tacie pomaga mama.`** — labelled *same endings, same
   meaning, different emphasis*. It is true and it is the clearest possible
   demonstration that the endings, not the order, carry who-did-what. But it is
   the only place in the pack that shows a *noun* being moved, and it is not
   drilled anywhere. If it reads as opening a door the unit then declines to walk
   through, deleting that one row costs nothing.
5. **`jego` is taught for exactly one job** — it is the form that can open a
   clause, which is what makes emphasis possible. The rest of the long-form
   paradigm is not opened and `jemu` is verified NEW and stays out. Worth a
   glance to confirm that `Jego znam.` reads as emphasis rather than as an
   alternative neutral order.

### Still open after batch 5

- The **161 fold variants across 18 packs**, unresolved since the fifth repair
  run. **Neither pack in this batch adds to it** — every `accepts` holds the exact
  answer, plus the no-final-stop variant on whole-sentence Użycie items, which is
  the standing convention and is not a fold. `c1_word_order`'s sentence-initial
  `Jego` carries no capitalisation variant either, since the engine's `norm()`
  lowercases anyway; batch 4 recorded that `c1_pron_je`'s equivalent was
  redundant rather than harmful, and this batch simply did not add one.
- **`wydaje mi się`** — settled by R7 (chunk + homograph line in `c1_nuance`),
  not yet built.
- **`duży`'s incomplete oblique paradigm**, carried from batch 2, still unfixed.
- **`mali` / `duzi`**, dropped in batch 3; still costed at one new virile noun.
- The **benefactive Dative** and the **reciprocal `sobie`** — new to this list,
  both above, both James's call and both cheap now that the forms exist.
- Next up: **Block 4** — `c1_virile_alt` [199], `c1_owie` [200],
  `c1_irreg_virile` [201], `c1_suppl_pl` [202], `c1_society` [203].
  `c1_station_1` [198] is a permanent placeholder and is skipped.

---

## Batch 6 — Block 4 opens: the plural families closed, three of four (3 units)

`c1_virile_alt` [199], `c1_owie` [200] and `c1_irreg_virile` [201], in
`path_order` order, one commit each, pushed individually. `codex/REPAIR-QUEUE.md`
was checked first and is still empty; `c1_which_case` [235] is still the only
which-case unit outstanding and is still blocked until the C1 build track
reaches Block 5, so this run was a straight C1 build run.

| unit | path | new strings | structure ID | commit |
|---|---|---|---|---|
| `c1_virile_alt` | 199 | 3 — `aktorzy`, `trenerzy`, `partnerzy` | `virile_alt` | `2cbe655` |
| `c1_owie` | 200 | 6 — `dziadkowie`, `wujkowie`, `synowie`, `szefowie`, `panowie`, `inżynierowie` | `virile_owie` | `52094bc` |
| `c1_irreg_virile` | 201 | 7 — `człowiek`, `ludzi`, `bracia`, `braci`, `braciom`, `koledzy`, `mężczyźni` | `virile_irreg` | `faead10` |

Audit after each: **0 errors**, warns unchanged at 6 throughout (the five
long-standing `teaches_empty_grammar` review nodes plus `b2_which_case`). All
three structure IDs were registered in `codex/SEQUENCING.md` **and** `audit.py`'s
`STRUCTURE_CATALOGUE` before their audit ran. **No `data/case-map.json` change
was owed** — checked rather than assumed: that file's rows are *governors*, and
none of these three units introduces one.

### The block reads as one argument, and that was the design

Taken together the three units answer one question — *how does a masculine
person-noun make its plural?* — with three answers, and each unit's opening
slide starts from the previous one's:

1. **`c1_virile_alt`: it softens.** And the three moves `b1_virile_nom` taught
   separately (`-t→-ci`, `-k→-cy`, already-soft`+e`) are **one event** — the
   last stem consonant pulled into the soft family by the virile ending. `-r→-rzy`
   is the fourth member, not a fourth thing to memorise. That reframing costs no
   new material and is the whole reason the unit is small enough to hold three
   new strings.
2. **`c1_owie`: or it takes `-owie`,** on a group held together by *meaning* —
   kinship and rank — rather than by shape.
3. **`c1_irreg_virile`: or the plural is not built from the singular at all,**
   because it runs on a stem of its own.

`c1_irreg_virile`'s last Kontrola item is the only place all three families are
pitted against each other in one choice list (`dziadkowie` correct, with `bracia`
and `koledzy` as distractors). If the block is going to be tested as a block,
that is the item to look at.

### Every unit's anchor was verified with `check_new.py`, and one of them is unusually strong

- `c1_virile_alt`: **`kelnerzy` is TAUGHT ← `b1_virile_reco` [111]** as a whole
  form the learner was asked to recognise and *explicitly not to make*. So the
  unit is the `b2_verbal_nouns` / `b2_participle_pass` opener the spine names:
  a form read since B1 turns out to be built by a rule.
- `c1_owie`: **`dziadkiem` and `wujkiem` are TAUGHT ← `a2_inst_z` [64]**, so the
  two stem changes in the family ride a stem he has produced since A2 and
  **no fleeting-e rule is stated anywhere** (`b2_gen_pl_full`'s precedent).
- `c1_irreg_virile`: the strongest of the three. **He has been producing the
  irregular plural stems for a whole level without being told they were
  irregular** — `braćmi`/`ludźmi` ← `b2_inst_pl` [156], `ludziom`/`kolegom` ←
  `b2_dat_pl` [157], `kolegów` ← `b2_num_virile` [160]. The Nominative was the
  only cell missing, and slide 2 says so with his own owned forms in the table.

### `b1_virile_nom`'s fence was read, not remembered

The spine describes `c1_virile_alt`'s brief as *"kelner→kelnerzy (r→rz), and the
rest of the set that pack fenced."* Rather than guess what "the rest" meant, the
pack note was opened: `b1_virile_nom` names its fenced set as **the `-r` stems**
(*"kelner → kelnerzy, aktor → aktorzy are NOT taught here… r→rz is a fourth
alternation and adding it would make this a two-new-things unit"*), and it fences
the true irregulars separately. So `-r` is the whole of unit 1's brief, and
`brat`/`kolega`/`mężczyzna`/the `-owie` family appear **nowhere** in it — not in
a table, not in a sentence, not as a distractor.

### The `-r` pool is six nouns and two of them go the other way

This is the batch's sharpest honesty problem and it was handled the same way in
both packs. The learner owns exactly six `-r` person nouns: *aktor, kelner,
partner, trener* take `-rzy`; **`inżynier` and `menedżer` take `-owie`.** A rule
stated flatly would therefore be false one time in three.

So `c1_virile_alt` slide 4 states it as a **tendency with a named
counterexample** — R2's discipline, applied a block before the unit R2 is
actually about — names `inżynier` as going the other way, and points at
`c1_owie` one node on. `c1_owie` slide 3 then pays that hand-off rather than
leaving it dangling, and puts `kelner`/`inżynier` side by side as the
demonstration that nothing in the words themselves tells you which family they
are in. **`menedżer` is deliberately unmentioned in both packs**: its plural is
contested between *menedżerowie* and *menedżerzy* and that is not the course's
to adjudicate.

### One false claim was caught in drafting, and it is worth recording

`c1_virile_alt` slide 3 originally said the `-r` survives *everywhere except the
virile plural*. **That is false** — the Locative singular *kelnerze* softens too.
The slide now claims only what is true of the forms he owns (`kelner`,
`kelnerem`) and says the softening *arrives with the plural ending* rather than
replacing the stem. Alternation units invite exactly this kind of over-general
sentence, and this is the third consecutive run where the pack's own verification
caught a leak in a **prose** field rather than in an item.

### `bratom` is shown once, marked, and is in no choice list

C1-SPINE asks `c1_irreg_virile` to carry *"braciom vs the wrong bratom"*, and
AGENTS bans fabricated non-words. Both hold: `bratom` appears in **one slide
row with a ✗ and one line of prose explaining it**, which is the `c1_word_order`
precedent (*Go znam.* ✗) — an explicit statement, not a silent trap — and it
appears in **no `choices` array anywhere**. This was checked mechanically, not by
eye: the token-level checker treats every `choices` entry as a Polish-only field,
so an untaught string there is a hard error.

`b2_dat_pl` had logged this gap in its own note (*brat "appears NOWHERE in the
pack in any form"*, its dative plural *"cannot be reached from brat by any rule
this course has stated"*). It is now paid.

### How the packs were verified

The token-level checker from batches 4 and 5 was rebuilt for this run and
extended: every Polish string on every learner-facing surface — slide `title_pl`
and `body_pl`, every table cell, `examples`, match rows, quiz `choices`, `answer`
and `explain`, cloze frames, answers, `accepts`, Użycie answers — is tokenised
and checked against the position-aware pool for that node, with `body_pl`
metalanguage and bare ending fragments (`-t`, `-cy`, `-owie`) whitelisted
explicitly rather than by accident. It also asserts twelve match rows, one `___`
per cloze frame, the ≤3-word Pisanie cap, no duplicate answers or prompts within
a stage under a mirror of the engine's `norm()`, that no Pisanie frame
reconstructs a Użycie sentence, that every `uses_lemma` is in the pool and is not
also a `teaches_lemma`, and that each answer is present in its own `accepts`.

**It was calibrated against three shipped packs before being trusted** —
`c1_word_order`, `c1_siebie` and `c1_pron_je` all pass it clean, which is what
turned up two false positives worth recording for the next run: duplicate quiz
*answers* are normal in this course (`c1_pron_je` has five) and only duplicate
quiz *prompts* are a defect, and case names in **table cells** are as
conventional as they are on `body_pl`.

One thing it caught in this batch: `tytuł` on a `c1_owie` `body_pl` line, meaning
*title/rank*. It is TAUGHT ← `leaf_school_a1` [29] but in the **title of a book**
sense, so it was replaced with a plain list of the six nouns. The homograph trap
reaches shorthand lines too.

### Judgment calls, all logged, all cheap to reverse

1. **`c1_virile_alt`'s Pisanie has four blanks off its teaching point.** Items
   0–3 produce all three new strings plus the `kelnerzy` anchor as whole words;
   items 4–7 are cloze whose blanks fall on **recycled** virile plurals
   (`lekarze`, `rolnicy`, `Polacy`, `studenci`), because four `-r` forms exist in
   the entire course and a fifth item would duplicate an answer within the stage.
   The blanked form is still the unit's subject every time. Logged under the
   repair-queue fallback clause.
2. **`c1_owie` drops `ojcowie` and `mężowie`.** Both are real members and both
   are kinship — the two most conspicuous absences from a family the pack itself
   describes as *the family words*. They were dropped because `ojciec → ojc-` and
   `mąż → męż-` are stem changes with **no owned anchor** (`ojcem` and `mężem`
   both verified NEW), so each would have cost a second unanchored fact in a unit
   whose whole discipline is that the two existing stem changes are anchored.
3. **`c1_irreg_virile` keeps `przyjaciółmi`/`gośćmi` out** — the author's call
   C1-SPINE explicitly asks to be logged. `b2_inst_pl` refused them *"to avoid
   turning a marked box into a paradigm"*, and the reasoning still applies: they
   are further `-mi` Instrumentals, a different topic from the virile Nominative
   plural, and folding them in would make the class read as a list of every
   irregular in Polish rather than the four that carry it. `mężczyzna`'s plural
   obliques are out for a plainer reason: they are regular and buy nothing.
4. **`człowiek` is taught in the last level of the course.** An A1-frequency word
   arriving at path 201 is startling, and it was verified rather than assumed —
   `ludzie` has been owned since `b1_people` [114] and its singular never was.
   Without it the suppletion cannot be stated at all, so it is taught here.

### For James to smoke — batch 6

1. **The tendency-with-a-counterexample shape, twice in two nodes.**
   `c1_virile_alt` slide 4 tells Dad that `inżynier` breaks the rule he has just
   been given and that the answer is next lesson. It is honest and it is R2's own
   idiom, but it is the first time the course has deliberately left a learner
   holding an unresolved exception across a node boundary. If it reads as a tease
   rather than as a hand-off, the fix is to move `inżynierowie` into
   `c1_virile_alt` and let `c1_owie` open on it.
2. **`bratom ✗` on `c1_irreg_virile` slide 3.** The one non-word in the batch,
   shown deliberately. Worth a look in the hand — if seeing a wrong form printed
   is more sticky than the correction beside it, deleting that row costs the
   slide nothing, since the prose beneath already makes the point.
3. **`menedżer` is now a hole you can fall into.** Both packs teach the `-r`
   families and neither mentions it, so a learner who reaches for *managers* has
   no answer and no warning. That was the conservative call on a contested form;
   the alternative is one row in `c1_owie` picking *menedżerowie*. Your call.
4. **The kinship set in `c1_owie` is deliberately incomplete** (no `ojcowie`, no
   `mężowie`) while the slide calls it *the family words*. If that reads as a
   promise the table does not keep, both are cheap to add — one anchor-free stem
   change each, which is precisely what was avoided.
5. **Three families in three consecutive nodes is the densest stretch of Block 4.**
   `c1_suppl_pl` [202] adds a fourth shape (`oczy`/`uszy`/`ręce`) immediately
   after. If the block feels heavy at this point, that unit is the natural place
   to slow down, and it is small.

### Still open after batch 6

- The **161 fold variants across 18 packs**, unresolved since the fifth repair
  run. **None of the three packs in this batch adds to it** — every `accepts`
  holds the exact answer, plus the no-final-stop variant on whole-sentence Użycie
  items, which is the standing convention and is not a fold.
- **`wydaje mi się`** — settled by R7 (chunk + homograph line in `c1_nuance`), not
  yet built.
- **`duży`'s incomplete oblique paradigm**, carried from batch 2, still unfixed.
- **`mali` / `duzi`**, dropped in batch 3; still costed at one new virile noun.
- The **benefactive Dative** and the **reciprocal `sobie`**, both from batch 5,
  both James's call and both cheap now that the forms exist.
- **New this batch:** `menedżer`'s contested plural; `ojcowie`/`mężowie`;
  `przyjaciółmi`/`gośćmi`; `mężczyzna`'s plural obliques.
- Next up: **Block 4 closes** — `c1_suppl_pl` [202] and `c1_society` [203]
  (VOCAB, trim to 12, top up from `b2_abstract`'s note before inventing
  candidates) — then **Block 5** at `c1_na_acc` [204], which is the first unit
  of the run that **must add a row to `data/case-map.json` in its own commit**,
  as must `c1_przez` [205], `c1_od_source` [206] and `c1_gen_verbs` [207].
  `c1_which_case` [235] cannot be built until all four have shipped.

---

## Batch 7 — Block 4 closes, Block 5 opens (3 units)

`c1_suppl_pl` [202], `c1_society` [203] and `c1_na_acc` [204], in
`path_order` order, one commit each, pushed individually.
`codex/REPAIR-QUEUE.md` was checked first and is still empty.
`c1_which_case` [235] is still the only which-case unit outstanding and is
still blocked — but this run moved it: `c1_na_acc` is the **first of the four
governor units its table needs**, and its rows are now in `data/case-map.json`.

| unit | path | new strings | structure ID | commit |
|---|---|---|---|---|
| `c1_suppl_pl` | 202 | 3 — `oczy`, `uszy`, `ręce` | `suppl_pl` | `1f8d2cf` |
| `c1_society` | 203 | 12 words + 3 riding forms | — (vocab) | `ecdb904` |
| `c1_na_acc` | 204 | 3 — `czekam`, `pieszo`, `na piechotę` | `na_acc` | `c75ad54` |

Audit after each: **0 errors**, warns unchanged at 6 throughout (the five
long-standing `teaches_empty_grammar` review nodes plus `b2_which_case`).
Both new structure IDs were registered in `codex/SEQUENCING.md` **and**
`audit.py`'s `STRUCTURE_CATALOGUE` before their audit ran.

### The case-map debt is now being paid on schedule

Batch 2 of the which-case family left a standing instruction that batch 6
repeated as urgent: **every C1 unit that ships a new governor must add its row
to `data/case-map.json` in the same commit.** `c1_na_acc` is the first such
unit and it did — two rows, not one, because the governor has two distinct
triggers: `na` before an activity or event (*Idę na spacer*) and the
verb-selected `czekać na` (*Czekam na autobus*). That file had had no row after
`b2_prosic_o` [165]; it now has one after it.

**One candidate row was refused and is logged rather than decided silently:**
`mieć wpływ na`. It is a fixed collocation, not a general trigger, and the
precedent is which-case batch 2's treatment of `za` (`dziękuję za`) and
`według` — single frozen phrases do not earn a row. `c1_przez` [205],
`c1_od_source` [206] and `c1_gen_verbs` [207] each still owe theirs.

**The edit was made textually, not by re-serialising the file.** A first
attempt round-tripped `case-map.json` through `json.dump` and produced a
190-line diff for a two-row addition, because the file stores one trigger per
line. It was reverted and the rows inserted by hand. Worth knowing for the
next three units: that file's formatting is deliberate and a re-dump destroys
the reviewability of the diff.

### `c1_suppl_pl` — the fork was the obliques, and it was taken conservatively

The spine's brief is four words long (*`oczy`, `uszy`, `ręce`, small*), so the
real decision was what NOT to include. **The plural obliques are out**: `oczu`,
`uszu`, `rąk`, `rękach`, `rękami`/`rękoma`, `oczami`/`oczyma`. They are a second
system — the Genitive plural of *oko* and *ucho* takes an `-u` found nowhere
else in the course, and `rąk` carries a nasal shift nothing has explained — and
batch 6's own digest named this unit as the place Block 4 should slow down after
three dense nodes. Nothing in the unit needs them: **every frame is Nominative
or Accusative, and the non-virile Acc ≡ Nom fact makes those the same form.**

**No false form is printed, and that is a step more careful than
`c1_irreg_virile` had to be.** That pack could show `bratom ✗` because *bratom*
is not a Polish word. Here the forms the learner's own rules predict — `oka`,
`ucha` — **are real Polish Genitive singulars**, so marking them wrong would
plant a mis-learning. The slide therefore names the *ending* the rule points at
("the neuter plural ending", "the k/g ending `-i`") and never writes the string.

**The sharpest fact in the unit was found by `check_new.py`, not by reasoning.**
The shape the k/g rule predicts for the plural of *ręka* is `ręki` — and `ręki`
is **TAUGHT ← `a1_gen_ki` [39]** as the Genitive singular. So the prediction is
not merely wrong; that shape is already spoken for by another job. It is named
on the slide and used as a quiz distractor for exactly that reason.

**The dual is taught as history, and the slide says so.** These three are the
surviving dual forms of the three things that come in pairs. For a learner
AGENTS describes as linguistically inclined that is the best possible hook for
three otherwise arbitrary words — but the slide states plainly that nothing can
be derived from it, which keeps it on the right side of R2's discipline.

**`nogi` appears nowhere.** It is the obvious regular counterexample (*noga →
nogi* follows the k/g rule) and it is **TAUGHT ← `a1_gen_ki` [39] as a Genitive
singular**. Using it as a plural would have been the homograph trap inside the
unit that warns about the homograph trap. The counterexample stays in English.
`myję ręce` was refused for a plainer reason: `myć` is owned only as the
reflexive `myję się`, so a direct object would have been a new fact.

**One Pisanie blank falls off the teaching point**, logged under the repair
queue's fallback clause: item 8 blanks `zmęczone`, because the unit has exactly
three new strings and three singulars, and a fourth noun blank would have
duplicated an answer within the stage. It still drills the agreement the new
plural takes.

### `c1_society` — the first C1 vocab pack that had to ADD words

Every other trim instruction in the course has been "the spine listed sixteen,
keep twelve". This one listed **nine** and said trim to 12, so the pack had to
find three. The spine's own instruction was *"top up from `b2_abstract`'s note
before inventing candidates"*; that note was read, and **it had nothing left to
give** — all four of its logged drops (`korzyść`, `wartość`, `społeczeństwo`,
`środowisko`) were already among the nine.

So the three additions are the author's and are logged as such: **`rząd`** (the
government — the one word without which none of the other eleven can be
discussed), **`prawo`** (the law) and **`klimat`** (the climate; the environment
half of the register was carrying only `środowisko`). Examined and rejected, all
verified NEW and now **permanently untaught, since C1 is last**: `państwo`,
`polityka`, `władza`, `wojna`, `równość`, `bezpieczeństwo`, `natura`, `rozwój`.

**`prawo` is the homograph C1-SPINE O13 predicted, and it was opened rather than
dodged.** It is TAUGHT ← `leaf_places` [31] but *only* inside `na prawo` /
`w prawo`, "to the right". The legal sense is a different word wearing the same
spelling, and it is named out loud on its own item with both senses side by
side — the `że` / `której` / `dziękuję` treatment. It is listed in
`teaches_lemmas` even though the string is already in the pool: the one place
this pack knowingly re-teaches a taught string, because what is taught is a new
word rather than a new form.

**Four `-ość` feminines give the class away for free.** `wartość`, `korzyść`,
`wolność` and `sprawiedliwość` join `możliwość`, `wiadomość`, `umiejętność`,
`przyszłość` and `część`, all owned. Two facts are stated on the items and
neither is a rule the learner has to apply: **every Polish noun in `-ość` is
feminine** — the `mysz`/`noc` soft-feminine trap AGENTS names, but with a visible
ending that gives it away every time — **and none of them changes in the
Accusative**, so *Ma dużą wartość* moves the adjective and leaves the noun alone.

**The sharpest fence in the pack is one node wide.** `mieć wpływ na
środowisko`, `wpływ na społeczeństwo` and `Technologia ma wpływ na ludzi` are
the natural collocations for half these words, and `na` + Accusative was
**still one unit away** while this pack was being written. It appears nowhere
here. `c1_na_acc` then shipped in the same run and its Użycie stage says
*Nauka ma wpływ na społeczeństwo* — so the fence lasted exactly one node and
the payoff is visible immediately, which is the pool doing its job.

Also fenced: no Genitive, Locative or Dative of any new noun (`b2_abstract`'s
own fence, held for its own reason — it costs the natural *Nie ma
sprawiedliwości*, and the `-ości` Genitive belongs to `c1_gen_verbs`); no plural
of any new noun except `obowiązki`; `rządu` and `rozwoju` are never used, so
neither the fleeting vowel in `rząd` nor the `ó`/`o` alternation is met.
`możliwa` was wanted for *Czy sprawiedliwość jest możliwa?* and refused, because
`c1_evaluation` fenced that form by name one block earlier and one sentence is
not worth breaking a neighbouring pack's stated scope.

**`obowiązki` is taught whole and no rule is stated.** `obowiązek` is TAUGHT ←
`b2_work` [138]; its plural drops the fleeting e. `b2_gen_pl_full` refused to
state a fleeting-e rule and that refusal stands — the item says the e disappears
when an ending arrives and to learn the plural whole, which is a fact about one
word rather than a rule to apply.

**`ważne` is the pack's one borrowed form.** `ważny`/`ważna` are TAUGHT ←
`b2_travel_func`; the neuter and non-virile plural `ważne` was not, and three
sentences needed it. Teaching another pack's word in a new *form* is not
re-teaching, and AGENTS' every-form-taught rule wants it tagged — so it is.

### `c1_na_acc` — the anchors all hide the case, which the scoping note missed

C1-SPINE calls this unit *exceptionally well anchored*, and it is right: `na
spacer` ← `a2_sport` [94], `na czas` ← `b1_journeys` [110] and `na szczęście` ←
`b1_stories` [123] are three frozen chunks that were already `na` + Accusative.
But **all three hide the case completely** — `spacer` and `czas` are masculine
inanimate and `szczęście` is neuter, so not one of them shows an ending. An
opener built only on those would have asserted a case the learner cannot see.

Slide 2 exists because of that. The visible demonstration runs on a feminine —
**Idę na kawę, not na kawa** — which is the same `-ę` he has been putting on
*kawa* since path 9, and it is the only proof available that the case is really
there.

**The unit's lesson is a decision, not a form**, and that is why the governor
earns a whole unit rather than a slide: `do` + Genitive points at a **place**,
`na` + Accusative at an **activity or event**, and English says *to* for both,
so the English gives nothing. *Idę do sklepu na zakupy* says both in one breath
and is the pack's best sentence. This is precisely the shape the
"Który przypadek?" family exists to teach, one unit before that family's own
C1 member becomes buildable.

**The `na`-places are named rather than hidden.** A handful of plain places take
`na` anyway, and the conservative move would have been silence. Instead slide 4
gives two the learner already owns — `na dworzec`, `na rynek` — and says plainly
that they are learned one at a time and cannot be worked out. That is R2's
tendency-with-a-named-counterexample discipline applied to a preposition rather
than to a prefix, and it is the second time in two batches the course has chosen
to hand the learner an unresolved exception rather than a clean falsehood.

**`na` itself is not taught.** `check_new.py` reports the bare preposition as
NEW; C1-SPINE documents this as an artifact (it is never a bare lemma, only ever
inside `na stole` / `na spacer`) and says explicitly not to teach it. It is not
in `teaches_lemmas`.

**`czekasz` was not added.** `czekam` was, because the first person is what Dad
needs at a counter and `czekać` had been an infinitive since A2. The second
person would have been a fourth new string for one frame, so every second-person
frame in the pack uses a noun subject with the already-taught `czeka`.

### How the packs were verified

The token-level checker from batches 4–6 was rebuilt for this run and calibrated
against `c1_suppl_pl` before being trusted on the other two, plus a deliberate
negative test (an `oka` distractor and an untaught word in a Użycie sentence
were both injected and both caught). Every Polish string on every learner-facing
surface — slide `title_pl`, `body_pl`, every table cell, `examples`, match rows,
quiz `choices`/`answer`/`explain`, cloze frames, answers, `accepts`, Użycie
answers — is tokenised and checked against the position-aware pool for that
node. It also asserts twelve match rows, one `___` per cloze frame, the ≤3-word
Pisanie cap, no duplicate answers, prompts or frames within a stage under a
mirror of the engine's `norm()`, that no Pisanie frame reconstructs a Użycie
sentence, and that every `uses_lemma` is in the pool and is not also a
`teaches_lemma`. A parallel checker was written for the vocab pack (gender badge
present on every item, every sentence `pl` in its own `accepts`, every
item-level `structure` rolled into `uses_structures`).

Two things it does not see, and which were done by hand: **English prose in
`body` and `explain` fields** was scanned separately for diacritic-bearing
tokens, and **the English whitelist for table cells was reviewed word by word**
rather than accepted — 40 tokens were added this run and every one was checked
to be English rather than an undiacriticked Polish word.

### For James to smoke — batch 7

1. **The dual on `c1_suppl_pl` slide 3.** It tells Dad *why* `oczy`, `uszy` and
   `ręce` are odd — they are leftovers of a form Polish used for things that
   come in twos — and then says the fact cannot be used to build anything. It is
   the most etymological thing in the course. If it reads as trivia rather than
   as a hook, the slide deletes cleanly and the unit still works.
2. **`prawo` taught as "the law" while `na prawo` still means "to the right".**
   Both senses are on one item card. This is the biggest deliberate homograph
   the course has opened, and it is opened in a vocab pack rather than a grammar
   unit, so it gets less airtime than `ze` or `której` did. Worth a look in the
   hand — if it lands badly, dropping the word costs one of twelve.
3. **The `na`-places (`na dworzec`, `na rynek`).** The unit gives Dad a clean
   rule on slide 3 and then tells him on slide 4 that some words break it and
   there is no way to know which. Batch 6 flagged the same shape in
   `c1_virile_alt` and it is now a house habit; this is the second instance and
   the first on a preposition. If two in three nodes is one too many, this is
   the one to soften.
4. **`Idę do sklepu na zakupy.`** The whole unit in one sentence. If it lands,
   that pattern is the model for `c1_which_case`'s C1 table.
5. **The `-ość` claim in `c1_society`.** *Every Polish noun in `-ość` is
   feminine, and none of them changes in the Accusative.* Both are true and both
   are given rather than derived. It is the closest a vocab pack has come to
   teaching grammar, and it is worth confirming it reads as a convenience rather
   than as a rule to revise.

### Still open after batch 7

- The **161 fold variants across 18 packs**, unresolved since the fifth repair
  run. **None of the three packs in this batch adds to it** — every `accepts`
  holds the exact answer, plus the no-final-stop variant on whole-sentence
  Użycie items, which is the standing convention and is not a fold.
- **`wydaje mi się`** — settled by R7, not yet built (`c1_nuance`).
- **`duży`'s incomplete oblique paradigm**, carried from batch 2, still unfixed.
- **`mali` / `duzi`**, dropped in batch 3.
- The **benefactive Dative** and the **reciprocal `sobie`**, both from batch 5.
- From batch 6: `menedżer`'s contested plural; `ojcowie`/`mężowie`;
  `przyjaciółmi`/`gośćmi`; `mężczyzna`'s plural obliques.
- **New this batch:** the plural obliques of `oczy`/`uszy`/`ręce`, refused above
  and now permanently untaught unless James says otherwise; the eight society
  words rejected for want of slots (`państwo`, `polityka`, `władza`, `wojna`,
  `równość`, `bezpieczeństwo`, `natura`, `rozwój`); `czekasz`; whether
  `mieć wpływ na` deserves a `case-map.json` row after all.
- Next up: **Block 5 continues** — `c1_przez` [205], `c1_od_source` [206] and
  `c1_gen_verbs` [207]. **Each of the three still owes a `data/case-map.json`
  row in its own commit**, and once all three have shipped `c1_which_case` [235]
  becomes buildable for the first time — though it sits at path 235, so the
  build track still has to walk Blocks 6 to 9 to reach it in order.

## Batch 8 — Block 5 closes, and `c1_which_case` unblocks (3 units)

`c1_przez` [205], `c1_od_source` [206] and `c1_gen_verbs` [207], in
`path_order` order, one commit each, pushed individually.
`codex/REPAIR-QUEUE.md` was checked first: **19 packs, all ticked, nothing
outstanding.**

| unit | path | new strings | structure ID | commit |
|---|---|---|---|---|
| `c1_przez` | 205 | 18 — `przez` + two verb paradigms + `ulicę`, `rzekę`, `cały` | `przez_acc` | `d667a0e` |
| `c1_od_source` | 206 | 6 — `mamy`, `taty`, `siostry`, `babci`, `dziadka`, `lekarza` | `od_source` | `6c923ed` |
| `c1_gen_verbs` | 207 | 5 — `muzyki`, `polskiego`, `obiadu`, `racji`, `pracę` | `gen_verbs` | `3a8c2b6` |

Audit after each: **0 errors**, warns unchanged at 6 throughout — verified
against the committed 196-node artefact rather than assumed, and they are the
same six `teaches_empty_grammar` review nodes as ever. All three structure IDs
were registered in `codex/SEQUENCING.md` **and** `audit.py`'s
`STRUCTURE_CATALOGUE` before their audit ran.

### The headline: Block 5's governors are complete

`c1_which_case` [235] has been the last outstanding member of the which-case
family since batch 2, blocked on a `data/case-map.json` that had no row after
`b2_prosic_o` [165]. Batch 7 paid the first instalment. **This run paid the
other three, seven rows in total, each in its own unit's commit** — and with
them the file now describes every governor C1 teaches. The spec's brief for
that unit (*"`na`/`przez`/`od` as governors · Genitive-taking verbs · everything
C1 closed"*) is satisfiable for the first time.

It is still **not buildable in path order**: it sits at 235 and the build track
must walk Blocks 6 to 9 to reach it. But the blocker is gone, and it is now a
sequencing question rather than a dependency one.

`data/case-map.json` went from 22 rows to 29. Its compact one-object-per-line
formatting was preserved by text-level insertion — a first attempt that
round-tripped it through `json.dump` reformatted all 22 existing rows and was
reverted before it reached a commit.

### `c1_przez` — the governor is the unit, and the prefix it unblocks

`b2_motion_prefixes2` [167] dropped the `prze-` prefix **entirely**, and said
why in its own note: *"przejść's everyday use is przejść PRZEZ ulicę, and przez
is untaught: it is a preposition governing the Accusative, i.e. a whole new
governor. Teaching it here would put a second new system in one unit… Deferred:
it needs either its own small slot after a przez unit, or C1."* This is that
slot, and the fence is paid exactly as that pack would have wanted: `przejść`
and `przejechać` weld onto the `poszedłem` / `pojechałem` mirror tables it
already built, so each verb is one new word read off a table, never derived.

**`przez` really is new, and this is not the `na` situation.** One unit earlier
`c1_na_acc` correctly refused to teach `na` because `check_new.py` reports it
NEW as a tooling artifact — it lives only inside multiword lemmas. `przez` was
checked against the same tooling and appears in **no** lemma anywhere in the
course. It is genuinely untaught and it is in `teaches_lemmas`.

**The anchor nouns all hide the case — the same trap, one unit later.** Batch 7
recorded that all three of `c1_na_acc`'s anchor chunks concealed the Accusative
because they were masculine inanimate or neuter. `przez park`, `przez most`,
`przez las` and `przez miasto` do exactly the same thing. Slide 2 exists for the
same reason its predecessor's did, and runs the visible demonstration on two
feminines: **`ulicę` and `rzekę` are the pack's only new noun forms.**

**Persons are deliberately lighter than the pack it inherits from.**
`b2_motion_prefixes2` taught eleven forms per verb because the verbs *were* its
new system. Here the governor is, so only 1sg and 3sg are taught, both genders
in the past, and **no 2sg is taught or used anywhere** — every second-person
frame uses a noun subject instead.

**A fourth job was added beyond the spine brief, and the reason is arithmetic
rather than ambition.** Duration (*przez rok, przez dwa lata, przez dwie
godziny*) costs **zero new endings**: `dwa lata` is `a2_numbers_gen` [61]'s own
2–4 counted form, re-verified as that rather than assumed, and `rok`, `tydzień`
and `dzień` are masculine so the Accusative is invisible on them. `cały` is the
single new word it needs and is used only on those masculine time nouns — no
feminine or neuter form of `cały` is taught, shown or demanded anywhere.

**`zostać` and the dynamic passive appear nowhere.** That fence is the entire
reason C1-SPINE puts this unit three nodes ahead of `c1_zostac`. The by-agent
slide rides `b2_passive`'s own `X jest <participle>` construction unchanged, so
*List jest napisany przez tatę* introduces the governor without borrowing a
single thing from the unit that will use it properly.

### `wjechać` was NOT built, and C1 is the last level

C1-SPINE names `wjechać` for this unit. It is not here, and this is a genuine
fork taken on the conservative path rather than a silent omission:

1. **It is not a `przez` verb.** Its frame is `wjechać do garażu` — `do` +
   Genitive, owned since A1. Nothing about it needs this unit.
2. **`b2_motion_prefixes2` dropped it for a reason this unit does not remove:**
   *"the front piece changes shape between the two stems (we-/w-), which would
   be a THIRD irregularity in a unit that already carries two, and 'to drive
   into' is not everyday language for this learner."* Both halves still hold.
3. Putting it here would import an unrelated prefix irregularity into a
   governor unit — the load-split AGENTS forbids.

**`przejechać` was built in its place**, because it *is* `przejść`'s partner,
it takes `przez`, and it completes the `prze-` row that pack dropped.

**James: C1 is the last level, so this is a permanent deferral unless you
overrule it.** Say the word and `wjechać` gets a slide in a later C1 unit.

### `c1_od_source` — the spine's own example walked into a named homograph

C1-SPINE writes the brief as *"Pożyczam od mamy. List od siostry."* Both nouns
were run through `check_new.py` rather than taken on trust, and both are traps
**AGENTS names by name**:

- **`mamy`** is TAUGHT ← `a1_miec` [9] as the VERB *we have*. AGENTS lists it as
  its first homograph example.
- **`siostry`** is the `córki` trap in mirror image: a feminine `-a` noun's
  Genitive singular and Nominative plural are one string, so it reads as
  *sisters*.

The conservative move would have been to avoid both words. **That was rejected,
and the reasoning is worth recording**, because it is the first time this
project has chosen to open a homograph rather than route around one: avoiding
`mamy` would have cost Dad *"from mum"* — the most natural source phrase there
is — permanently, C1 being the last level. AGENTS explicitly sanctions the
alternative (*"either pick a different word or teach the form yourself and say
so"*), and `c1_society`'s `prawo` and `c1_pron_je`'s `je`/`czemu` are the
precedent for doing it in a small unit with the collision named on its own
slide.

So both forms are taught, and **`Mamy list od mamy.` is on screen deliberately**
— one sentence holding both `mamy`, where the preposition alone separates them.
It is either the best item in the unit or the worst; it is item 2 of Użycie and
easy to find.

**The unit's real content turned out to be `z` versus `od`**, which the brief
does not name. A place takes `z`/`ze`, a person takes `od`, **the case never
changes** — both are the Genitive — and English says *from* for both. That is
precisely the shape `c1_na_acc` found one unit earlier with `do` versus `na`,
and it is the shape the whole which-case family exists to teach.

**The payoff slide closes a fence `b1_giving` [120] wrote in its own explain
string:** *"pożyczać can mean either lend or borrow in Polish, depending on the
frame. This unit teaches only… borrowing-from is a different pattern, for a
later unit."* This is that unit, and the contrast is as clean as the course
gets — **same verb, two cases, opposite directions**: `Pożyczam bratu` (Dative,
lend TO) against `Pożyczam od brata` (Genitive, borrow FROM), at **zero new
forms**. That is inbox item 13's actual content, and confirms the spine's own
correction: what was missing was a **sense**, not a verb and not a governor.

### `c1_gen_verbs` — every verb was already owned

The unit teaches no paradigm at all. `szukam`/`szuka`, `słucham`/`słucha` and
`uczę`/`uczy` have all been live since A2, so the verbs are old and **the case
they take is the entire lesson**. Five new strings, four of them one noun's
Genitive.

**The anchor is the best in C1 and it was verified rather than inherited:**
`szukam pracy` is TAUGHT ← `a2_work2` [79] **as a whole chunk** and is already
this construction. Dad has been producing a Genitive-governing verb for 120
nodes without being told that is what he was doing.

**The demonstration runs on `muzyka` because it is the only noun that can carry
it.** `muzykę` is TAUGHT ← `trunk_want_like_a1` [23] in *Lubię muzykę*, so
*Lubię muzykę* against *Słucham muzyki* is one noun, two verbs, two cases, with
the Accusative side already in his mouth. Nothing else in the pool does this.

**A pool surprise, logged rather than quietly patched: `pracę` was untaught
after 200 nodes.** `praca` has been live since `leaf_places` [31] and its
Accusative — an ordinary `-a` → `-ę` on an ending owned since A1 — had simply
never been tagged by anyone. It is taught here as the fifth new string so that
*Mam pracę* / *Szukam pracy* is sayable at all. **James may want to know this
class of gap exists**; the pool found it, no brief predicted it, and there may
be others.

Two IOUs closed by name: `a2_sie` [74]'s *uczę się polskiego* (slide 4 contrasts
the frozen `po polsku` with the declined `polskiego`, riding `b2_adj_gen`
[137]'s `-ego`), and `b2_verbal_nouns` [175]'s **"significant scope cut"** —
Genitive objects after a verbal noun — paid with *gotowanie obiadu*, *kupowanie
chleba* and *robienie kawy*, of which only `obiadu` is new. Inbox item 12 closed
with `racji`: `b2_neg_gen` [162]'s rule meeting `b1_opinions` [128]'s owned
chunk, so *mam rację* becomes *nie mam racji* and the only new thing is a form.

**`gazety` appears nowhere in this pack** despite being the most obvious
"listening to / looking for" object available. AGENTS names it as one of the
four nominative plurals that would be read as Genitive singulars, and this is a
Genitive unit — it was the single easiest homograph in the batch to walk into.

### How the packs were verified

The token-level checker was rebuilt for this run and every Polish string on
every learner-facing surface — `title_pl`, `body_pl`, every table cell,
`examples`, match rows, quiz `choices`/`answer`/`explain`, cloze frames,
answers, `accepts`, Użycie answers — was tokenised against the position-aware
pool for that node. It also asserts twelve match rows, one `___` per cloze
frame, the ≤3-word Pisanie cap, no duplicate answers/prompts/frames within a
stage under a mirror of the engine's `norm()`, that no Pisanie cloze
reconstructs a Użycie sentence, and that every `uses_lemma` is in the pool and
not also a `teaches_lemma`.

**It caught five things `audit.py` structurally cannot**, all of them in drafts
and none of them shipped:

1. **`zadania` and `biorę` on `body_pl` lines** in `c1_od_source`. The AGENTS
   convention admits *metalanguage* there — `dopełniacz`, `czasownik` — not new
   lexis. This is the same finding batch 7 made with `czasem` and `bez`; it is
   now clearly a recurring authoring reflex worth watching.
2. **A Pisanie cloze that rebuilt a Użycie sentence** — `Mam list od ___.` +
   `brata` reconstructed Użycie item 1 exactly. Reframed to `Mam parasol od ___.`
3. **`radia`** in a Użycie sentence in `c1_gen_verbs`. `radio` is taught;
   its Genitive is not, and the draft used the Genitive.
4. **`uczą`** in another — the 3pl of `uczyć się`, never taught. Rewritten
   around a singular subject.
5. **`prawdy`, in a table cell**, in the row *mówienie prawdy · telling the
   truth*. This one is the important one: **it is undiacriticked, so no
   structural check saw it**, and it is untaught anywhere in the entire course.
   It was caught only by the hand review of the checker's "treated as English
   prose" list, which batch 7 introduced for exactly this reason. That review is
   not optional and this run is the second consecutive proof of it.

### For James to smoke — batch 8

1. **`Mamy list od mamy.`** — the deliberate homograph sentence in
   `c1_od_source`. This is the batch's one real gamble. If it reads as a clever
   trick rather than as the thing that makes the collision harmless, the
   sentence deletes cleanly and the slide still works without it.
2. **`Pożyczam bratu` against `Pożyczam od brata`.** Same verb, opposite
   directions, decided entirely by the case. It is the sharpest single contrast
   in Block 5 and it costs nothing. If it lands, it is the model for how the
   remaining sense-gaps should be closed.
3. **The duration job in `c1_przez`.** It was added beyond the spine brief on a
   zero-cost argument. Four jobs of one preposition on six slides is the most
   any governor unit has carried — if it is one job too many, duration is the
   one to cut and *przez cały dzień* is the phrase to keep.
4. **`Lubię muzykę` / `Słucham muzyki`.** The whole of `c1_gen_verbs` in two
   sentences, both already yours. If this lands, the unit could arguably have
   been three slides rather than six.
5. **`wjechać`'s absence** — see the argument above. It is a permanent
   deferral and needs your yes or no.

### Still open after batch 8

- The **161 fold variants across 18 packs**, unresolved since the fifth repair
  run. **None of the three packs in this batch adds to it** — every `accepts`
  holds the exact answer, plus the no-final-stop variant on whole-sentence
  Użycie items, which is the standing convention and is not a fold.
- **`wydaje mi się`** — settled by R7, not yet built (`c1_nuance`).
- **`duży`'s incomplete oblique paradigm**, carried from batch 2, still unfixed.
- **`mali` / `duzi`**, dropped in batch 3.
- The **benefactive Dative** and the **reciprocal `sobie`**, both from batch 5.
- From batch 6: `menedżer`'s contested plural; `ojcowie`/`mężowie`;
  `przyjaciółmi`/`gośćmi`; `mężczyzna`'s plural obliques.
- From batch 7: the plural obliques of `oczy`/`uszy`/`ręce`; the eight rejected
  society words; `czekasz`; whether `mieć wpływ na` deserves a `case-map.json`
  row.
- **New this batch, and all of it permanent unless James overrules:**
  **`wjechać`** (argued above); **`przejdziesz`/`przejedziesz`** and every other
  2sg of the two `prze-` verbs; **Genitive time nouns after `od`** (*od rana*,
  *od poniedziałku*) — refused as new lexis, though *od piątej do siódmej* ships
  at zero cost; **`dostać`/`dostaję`** as a source verb, refused for the same
  reason; **`potrzebować`, `używać` and `bać się`**, the three other everyday
  Genitive-governing verbs — each a whole new paradigm, named nowhere in
  C1-SPINE, and therefore out of the level's scope; **`słuchanie`**, a seventh
  verbal noun, the fence being paid by the six that exist; and **`prawdy`**,
  which this run discovered is untaught anywhere in the course.
- **A gap class worth a look:** `pracę` was untaught after 200 nodes with no
  brief noticing. There may be other citation-form nouns whose everyday
  Accusative was never tagged.
- Next up: **Block 6 opens** — `c1_part_attrib` [208], `c1_part_active` [209]
  and `c1_part_adv` [210], the participles and the passive (B2-SPINE O4/O5).
  `c1_zostac` [211] follows and **its agent phrase is now available**, three
  nodes back, exactly as C1-SPINE planned. No unit in Block 6 ships a governor,
  so `data/case-map.json` is owed nothing until Block 8's quantifiers.

---

## Batch 9 — Block 6's three participles (3 units)

`c1_part_attrib` [208], `c1_part_active` [209] and `c1_part_adv` [210], in
`path_order` order, one commit each, pushed individually.
`codex/REPAIR-QUEUE.md` was checked first: **19 packs, all ticked, nothing
outstanding.**

| unit | path | new strings | structure ID | commit |
|---|---|---|---|---|
| `c1_part_attrib` | 208 | 10 — and **not one new ending** | `part_attrib` | `42af0d6` |
| `c1_part_active` | 209 | 10 — one operation off the they-form | `part_active` | `3536328` |
| `c1_part_adv` | 210 | 7, of which one is recognition-only | `part_adv` | `958a7dd` |

Audit after each: **0 errors**, warns unchanged at **6** throughout — the same
six `teaches_empty_grammar` review nodes as ever, verified against the written
artefact rather than assumed. All three structure IDs were registered in
`codex/SEQUENCING.md` **and** `audit.py`'s `STRUCTURE_CATALOGUE` before their
audit ran. **No unit in this block ships a case governor, so
`data/case-map.json` is untouched and owes nothing** — the next debt falls at
Block 8's quantifiers, as batch 8 predicted.

`c1_which_case` [235] was **not** built and still cannot be built in path order.
Batch 8 removed its dependency (`case-map.json` now describes every governor C1
teaches) but not its position: it sits at 235 and the build track has reached
210. This is now the third consecutive digest to record that, and it is a
sequencing fact rather than a blocker.

### How the three units were verified

Beyond `audit.py` — which checks only *declared* tags and so structurally
cannot see a stray Polish word — each pack was run through the token-level
checker the which-case batches established: every Polish surface the learner is
shown or asked to produce (match rows, quiz prompts, choices and answers, cloze
frames and answers, Użycie answers and accepts, slide `title_pl` / `body_pl` /
`examples`) split into words and checked against that node's own position-aware
pool. Slide bodies and table cells, which are mixed English and Polish, were
printed as an unknown-token list and read by eye; in all three packs that list
came back pure English, which is the check that a table cell has not smuggled in
an untaught form. It also asserts twelve match rows, no duplicate answers or
prompts within Pisanie or Użycie, one `___` per cloze frame, the ≤3-word cap on
typed-whole answers, that no Pisanie frame reconstructs a Użycie sentence, that
every `teaches_lemma` is genuinely absent from the pool, and that every
`uses_lemma` and `uses_structure` is in it.

Two `uses_lemmas` entries were caught by that last assertion and removed from
`c1_part_attrib`: `to jest` and `w kuchni` are structures and phrases the pool
does not carry as lemmas (`b2_fem_soft` taught the bare `kuchni`).

**Three `body_pl` lines were rewritten after the checker flagged ordinary lexis
on them.** The AGENTS convention admits *metalanguage* in the Polish shorthand
line, not new vocabulary — the finding `b2_which_case` made and this batch
repeated three times. `bez` (twice), `stoi`, `główny`, `decyduje`, `czytania`
and **`pojazdem`** were all removed; `pojazdem` is the word AGENTS names by
example as a title-rule breach, and it had walked back in through a shorthand
line.

### `c1_part_attrib` — the plural costs nothing, and that is the whole point

`b2_participle_pass` [176] fenced two things by name. Both are paid here.

**The declension is free.** Every ending in the pack is one the learner has
produced — `dobrego`/`dobrym`/`dobrej`/`dobrą` from B2 Block 2, `dobrych` from
`c1_adj_pl_gen` [186] and `c1_adj_pl_loc` [187]. The ten new strings are those
owned endings sitting on owned participles. Not one new ending is taught, and
the unit says so on slide 2 with `dobry` and `zamknięty` in adjacent columns.

**The plural costs zero new strings.** `zamknięte`, `otwarte`, `zrobione`,
`napisane`, `ugotowane` and `zapłacone` were taught at B2 as NEUTER SINGULARS
and are also the non-virile plural — the homograph that pack fenced as *"a
homograph inside the paradigm rather than a scope choice"*. Slide 3 therefore
names a second job on six strings the learner already types, on the
`adj_pl_loc` / `adj_pl_dat` / `c1_ktory_plural` convention, and `teaches_lemmas`
stays clean.

**The virile plural is named and not demanded, and the spine's three examples
are not the ones built.** C1-SPINE names `zamknięci`, `otwarci` and `zrobieni`.
Only `zrobieni` ships, on one slide, in no stage, and the slide says out loud
why: these participles describe THINGS, and things are never a group of men.
`zamknięci` and `otwarci` are not built at all — neither has a sentence this
learner would ever say, and no taught virile noun collocates with either. This
is `c1_adj_pl_virile`'s own precedent one block later, where *mali* and *duzi*
were dropped for exactly this reason: **a spine example is a sketch, not a
licence.** The `-ni` move itself is not new (`zmęczeni` ← `c1_adj_pl_virile`).

**`zapisani` was drafted and cut, and it is the live alternative if James wants
a virile participle that does work.** `zapisać` is TAUGHT, `zapisany` would
follow the `-ać → -any` rule the learner may apply, and *Studenci są zapisani na
kurs* is ordinary Polish with a taught virile noun and a taught governor. It was
cut because it costs a NEW LEXEME in a unit whose entire claim is that it costs
no new endings. One word from James and it goes in.

**The case gaps are lexical, not chosen**, and this is worth knowing because it
will recur: the masculine `-ym` covers Locative, Instrumental and Dative in one
string, but no attributive participle appears in the Instrumental or the Dative
anywhere in the pack because **no taught noun supports one** — `kawą` is
untaught (the finding `b2_which_case` made), and *dziękuję zamkniętemu sklepowi*
is not a sentence. `zamkniętą`/`otwartą` are absent for the same reason:
*aptekę*, *kuchnię* and Accusative *szkołę* are all untaught, so `ugotowaną` on
`zupę` carries the feminine Accusative by itself.

### `c1_part_active` — `check_new.py` found an anchor the spine did not know about

C1-SPINE says only that `pracujący` is NEW and formed off the 3pl. Running the
inventory rather than inheriting it turned up something better: **`śpiący` is
TAUGHT ← `a2_feelings` [55], as a plain adjective glossed *sleepy*.** It is an
active participle and it literally says *sleeping*. So the unit opens on the
house pattern for the third time in two blocks — a word read since A2 turns out
to be built by a rule — after `b2_participle_pass`'s *otwarty*/*zamknięty* and
`c1_virile_alt`'s *kelnerzy*.

**It is not derived, and the reason was checked rather than assumed.** *śpią* is
verified NEW and `spać` has no owned present paradigm at all — `trunk_can_a1`
[24] taught only the infinitive after *mogę*. So `śpiący` is handed over whole,
exactly as `b2_participle_pass` refused to derive *zamknięty* from a NEW
*zamknąć*, and the rule is stated over four verbs whose they-form the learner
does own.

**The predictable error got its own slide**, and it is the reason the unit needs
a limit slide at all: an English speaker reads `-ący` as English *-ing* and
reaches for *jestem pracujący* for *I am working*. Polish says *Pracuję*. The
slide says so plainly, puts the correct form beside it, adds that the participle
is far rarer in speech than English *-ing*, and points at `który` as the usual
way to say who does what. One quiz item drills it.

**`kobietę` was wanted and rejected as verified NEW** — the Accusative singular
of `kobieta` is untaught after 209 nodes, which cost the natural *I know a woman
who speaks Polish*. Another instance of the gap class batch 8 flagged.

### `c1_part_adv` — the spine's own example is not buildable

C1-SPINE writes the headline sentence as *Robiąc obiad, słuchałem radia*.
**Both of the last two words are verified NEW.** There is no past of `słuchać`
anywhere in the course (only `słucham` ← `a2_phone_func` [89]), and `radia` was
already caught and replaced once, during `c1_gen_verbs`' own build one batch
ago. The sentence ships as *Robiąc obiad, słucham muzyki*, on the Genitive
`c1_gen_verbs` [207] taught three nodes back. **This is the second spine example
in three units that did not survive `check_new.py`**, after the virile
participles above.

**The opening move is the previous unit minus one letter**, which is exactly why
`c1_part_active` was built to fence the `-ąc` form completely rather than
contrast with it: *pracujący* agrees and names a person, *pracując* never
changes and names the circumstances. The formation is then free — the same 3pl
operation stopping one letter earlier.

**The one new fact is given as one fact with two consequences** rather than as
two rules: the `-ąc` form carries nothing, so it has no person (both halves must
be the same person, and the main verb says who) and no tense (*Czytając gazety,
piłem herbatę* is past only because *piłem* is). C1-SPINE names the subject half
only; the tense half falls out of the same fact and costs nothing to say.

**`zrobiwszy` is on one slide and in no stage** — not in Dopasuj, not as a
distractor, not in Pisanie, not in Użycie — and **no formation rule is stated
for it**. It is named as anterior, named as literary, and named as something to
recognise rather than make. That is O5's default, and both of its alternatives
stay rejected for the reasons O5 gives.

**Pisanie is eight cloze items and could not have been anything else**: every
sentence in the unit is two clauses, so the queue's composed-sentence rule makes
all of them cloze regardless of length. Six blank the teaching point — one per
productive participle, which is exactly the number of distinct answers available
and therefore the `c1_ktory_plural` situation — and two fall back onto the MAIN
verb (`piłem`, `myślę`) under the queue's fallback clause. Those two are not
arbitrary: the main verb is precisely where this unit says the tense and the
person live, so the fallback items drill the unit's own second fact.

### Judgment calls and open forks, this batch

1. **`zapisani` (`c1_part_attrib`)** — cut, argued above, one word from James to
   put it in.
2. **The `-ony` class has no oblique form anywhere** (`c1_part_attrib`).
   `zrobionym` and `zapłaconym` are real and both wanted a noun the course does
   not own in the right case (*rachunku*, *listu*, *zdjęcia*, *zadania* all
   verified NEW). The class is represented in the obliques only by `ugotowaną`,
   which is an `-ować` participle. Fixable later by teaching one noun form.
3. **Word order in `c1_part_adv` is fenced to participle-clause-first.** The
   trailing order (*Słucham muzyki, robiąc obiad*) is perfectly good Polish and
   is not taught, because a second order is a second fact and every subordinate
   shape this learner owns — `że`, `żeby`, `który`, `jeśli`, embedded questions
   — was taught in one position first. James's call whether the trailing order
   is worth a slide in `c1_wrapup`.
4. **`c1_part_attrib`'s Dopasuj board does not contain `zrobieni`**, so the
   "every form of the unit appears on the board" convention is met for nine of
   the ten taught strings. The tenth is the recognition-only virile form, and
   putting it on a board would be asking for recognition of a word the same
   pack calls rare. Logged rather than silently done either way.

### For James to smoke

1. **The virile-participle slide in `c1_part_attrib`.** It is the one place in
   the batch where the course says *here is a form, and you will not need it*.
   That is honest and it is the alternative to leaving `zrobieni` unnamed
   forever, but it is a slide that teaches nothing to use, and if it reads as
   filler it should be cut rather than softened.
2. **`śpiący` as `c1_part_active`'s opener.** It rests on a claim about a word
   he learned at A2 as *sleepy* — that it is really *sleeping*. True, and the
   whole slide depends on it landing rather than confusing.
3. **The *jestem pracujący* slide.** It names an error before he has made it.
   `b2_indirect_q` and `b2_jesli` both used that shape successfully, but this is
   the first time in C1 and it is worth confirming it reads as useful rather
   than as a warning about nothing.
4. **`c1_part_adv`'s Pisanie starts six of its eight frames with the blank.**
   `___ obiad, słucham muzyki.` House style already does this (`a2_dat_chunks`,
   `b1_polite`, `b2_double_neg` all have frames opening on `___`), but six in one
   stage is the most any pack has carried, and the answer is capitalised.
5. **Three participles in three consecutive units.** `c1_part_attrib` /
   `c1_part_active` / `c1_part_adv` are deliberately built as a ladder, each
   opening on the previous one. If the block reads as three units on one topic
   rather than three related ideas, the join to smoke is the second-to-third,
   where a single letter separates the two forms.

### Next run

`c1_zostac` [211] opens the next batch and **its agent phrase is available** —
`c1_przez` [205] is six nodes back, exactly as C1-SPINE planned, and
`b2_passive`'s closing slide already told the learner this edge was coming.
Then Block 7 opens the verb system: `c1_past_gaps` [212] (check the **`mógł`
quarantine against R6** — the past is fine, the conditional stays whole),
`c1_ea_shift` [213], `c1_sec_imperf` [214].

`data/case-map.json` is owed nothing until `c1_quantifiers` [229]; `c1_which_case`
[235] and `c1_case_gym` [236] remain the tail of the level.


---

## Batch 10 — `c1_zostac`, `c1_past_gaps`, `c1_ea_shift`

Block 6 closes and Block 7 opens. `codex/REPAIR-QUEUE.md` was checked first and
is still empty, so the whole run went to the C1 build track. Three units, one
commit each, pushed individually.

| unit | path | new strings | structure ID | commit |
|---|---|---|---|---|
| `c1_zostac` | 211 | 7 | `passive_dynamic` | `21e71a4` |
| `c1_past_gaps` | 212 | 20 | `past_gaps` | `ef66cda` |
| `c1_ea_shift` | 213 | **0** | `ea_shift` | `ae57a84` |

Audit after each: **0 errors**. Warns stayed at **6** across all three and the
warn set is unchanged — `c1_ea_shift` has empty `teaches_lemmas` but a non-empty
`teaches_structures`, and the `teaches_empty_grammar` warn fires only when both
are empty, which is why it did not add a seventh (checked, not assumed).

### How the units were verified

Same token-level checker as the which-case batches, re-run per unit against a
freshly generated position-aware pool (`make_pool.py --before <node>`): every
Polish string the learner is shown or asked to produce — match rows, quiz
prompts and choices, cloze frames and answers, Użycie answers, slide `title_pl`
/ `body_pl` / `examples` / table cells — split into words and checked against
that node's pool. Plus assertions: twelve match rows, one `___` per cloze frame,
answer present in `accepts`, no duplicate answer or prompt inside any stage, no
Pisanie frame reconstructing a Użycie sentence, every `uses_structure` and
`uses_lemma` genuinely in the pool, and every demanded word declared somewhere.

**It earned its keep three times, on things `audit.py` structurally cannot see:**

1. **`biura` (`c1_zostac`).** Wanted as a second plural subject; it is TAUGHT ←
   `a1_prep_review_2` [48] as the **Genitive singular** inside *do biura* / *z
   biura*, and has never been a nominative plural anywhere in the course.
   `banki` ← `plural_nom` [56] used instead.
2. **`siostry` (`c1_ea_shift`).** Drafted as the non-virile plural subject for
   *chciały*; TAUGHT ← `c1_od_source` [206] as the **Genitive singular**, inside
   *od siostry* / *starszy od siostry*. This is the AGENTS homograph table's
   *córki / wina / gazety* row exactly, and it is the second time in three
   batches that a `-y` feminine has been reached for as a plural and turned out
   to be a genitive. `dzieci` ← `a2_family2` [58] used instead.
3. **Nine untaught ordinary words on Polish shorthand lines**, across
   `c1_zostac` and `c1_past_gaps`: *słowa, bez, rodzajem, Rzeczy, tym,
   rozdziale, poziomu, całość, proces*. The AGENTS convention admits
   **metalanguage** on `body_pl`, not new lexis — the same finding
   `b2_which_case`'s build made with *czasem* and *bez*, and *bez* turned up
   again here, so it is worth naming as a recurring authoring reflex rather than
   a one-off. All nine rewritten. Two level codes (*A2*, *B1*) were also removed
   from `body_pl` lines, though level references in the English body prose were
   left alone after checking: 92 live packs say *since A2* and it is house style.

The checker was relaxed once, deliberately: ending fragments written as house
style (`-ć`, `-ł-`, `-eć`) and single letters naming a sound (`ó`) are not words
and are no longer flagged. `c1_part_adv` already ships *Forma „oni” → -ąc.*

### `c1_zostac` — the pair b2_passive wrote the brief for

`b2_passive`'s closing slide says, in terms: *"Polish has a second passive for
the action itself, the moment of the closing, and it is built with a different
verb. That verb is not taught in this course yet."* This is that verb, and slide
1 quotes the promise back rather than re-teaching the state passive.

**Not one new ending.** The four past forms are `past_rest`'s own `-ł/-ła/-ło/-ły`
on a new stem, and *zostanie*/*zostaną* are `perf_future` doing exactly what it
does for *kupię* — `zostać` is perfective, so its present-shaped forms are
future, which is the rule rather than an exception.

**The agent phrase is an upgrade, not a new fact**, and that is the whole reason
the unit sits six nodes after `c1_przez` [205]: that pack's slide 6 already
shipped *List jest napisany przez tatę* on the state passive. Putting the same
phrase on *został* is what finally makes it say what English *by* says.

**The plural is in, and it cost two strings rather than a paradigm.**
`b2_passive` was singular-only and logged why (*zrobione* is the neuter singular
there and also the non-virile plural); `c1_part_attrib` [208] named that second
job one block later, so the fence is spent and only *zostały*/*zostaną* were
new.

**Three fences, all named rather than silent.** No virile plural anywhere
(`zostali`, `zrobieni`, `zamknięci`, `otwarci`) — a dynamic passive of a group
of men is not a sentence this learner needs, and `c1_part_attrib` deliberately
left `zrobieni` unusable. No 1st or 2nd person, with the limit slide saying in
English that the construction is about things. And **`zostać` also means *to
stay***, which is named in English only, with no Polish form and nothing to
produce — not the AGENTS homograph trap, since the string is new here, but the
same class of ambush.

**One deliberate near-duplicate, logged so it does not read as padding.**
Kontrola items 1 and 2 share the frame *Sklep ___ zamknięty*, answered *został*
for the event and *jest* for the state. It is the minimal pair the unit exists
for and the prompts differ completely.

**A distractor was changed for a tooling reason worth recording.** The obvious
governor item was *ugotowany ___ mamę* choosing between `przez` / `do` / `od` /
`z`. Bare `do` and bare `z` are **not pool lemmas** — they live only inside
multi-word lemmas — so three of four choices would have been author-whitelisted
function words. The item asks for the **case** after `przez` instead
(*mamę/mama/mamie/mamą*, all four verified taught), which is the thing that can
actually go wrong.

### `c1_past_gaps` — the R6 gate, checked rather than assumed

C1-SPINE **O13** says to check `mógł` against James's live ruling before
building. **R6** (2026-08-07, LOCKED) reads: *"Past is fine; the conditional
stays whole… `mógłby` remains a memorised chunk — do not derive the conditional
paradigm."* So the past ships, and **no `-by-` form is built, derived or
demanded anywhere in the pack** — verified by assertion over every learner-facing
surface, not by eye. `mógłby` is named once, in English, on the limit slide, as
the frozen `b1_polite` phrase this unit does not take apart.

**Twenty new strings — five verbs by four cells** (1sg m/f, 3sg m/f), with the
`c1_przez` discipline held exactly: no 2sg, no plural, no neuter anywhere,
distractors included.

**Twelve of the twenty are pure rule application and the pack says so.**
`jechać`, `pomagać` and `chodzić` are completely regular, so `past_ac` [52] and
`past_rest` [53] do all the work; the table anchors on *czytać→czytałem* and
*robić→robiłem*, forms the learner has produced for a hundred and fifty nodes.
The headline is therefore not *here is something hard* but *here is something
you could have built yourself and were never given the chance to*.

**The exception is one cell, not two verbs.** `móc` and `pomóc` take the `ó` in
exactly the he-form (*mógł*, *pomógł*) and a plain `o` everywhere else, which is
why they share a slide instead of getting one each. The anchor is owned:
`b1_past_isc` [108] already taught *szedł* against *szła*.

**`chodziłem` is the real payoff.** `a2_chodzic` [72] taught the habitual walking
verb against *iść* for one journey, and `b1_past_isc` then gave the past of the
one-journey verb **only** — so *I walked to the shop yesterday* was sayable and
*I used to walk to school* was not. That contrast is slide 3 and it costs
nothing, both halves having been owned since A2.

**Two drops, both permanent because C1 is last, both logged:**

- **Bare `móc` is verified NEW and was not taught.** The course owns *mogę,
  możesz, może, można, mógłby* and has never had the dictionary form. It would
  have cost one string; R6 is a narrow permission for the *past*, every sentence
  in the pack uses a past form, and adding the infinitive of the verb under
  `b1_polite`'s MÓGŁBY QUARANTINE buys nothing. The verb is named on slides by
  its owned 1sg — *mogę → mógł* — which is `c1_part_adv`'s table idiom
  (*robią → robiąc*).
- **`wychodziłem` was dropped.** C1-SPINE names it beside `chodziłem`. It is the
  identical operation with an owned prefix, but it would have put a sixth verb
  and four more strings into a pack already carrying twenty, and it rides
  `b2_motion_prefixes2`'s mirror-table idiom rather than this unit's rule. **If
  James wants it, it is four strings on the `chodziłem` row and nothing else
  changes.**

**Coverage, stated honestly.** Dopasuj carries 12 of the 20 — the most a
twelve-row board holds — chosen to put every verb and both `ó` cells on screen.
The other eight are produced in Pisanie, and *pomogła* lives only in Użycie. All
twenty appear in at least one stage, checked by assertion.

**Pisanie is twelve single forms typed whole**, not cloze, and that is the
correct shape rather than a dodge: AGENTS names *a single form for conjugation*
as the minimal pattern unit, so a one-word answer is a pattern unit at any level
and nothing here is composed. This is `c1_przez`'s shape one block later, and it
makes Pisanie and Użycie disjoint by construction rather than by inspection.

### `c1_ea_shift` — a debt this catalogue has been carrying since A2

`SEQUENCING.md`'s own `past_rest` [53] entry reads: *"plus whole-form
miałem/chciałem (e→a shift **deliberately unexplained until B1**)"*. B1 never
explained it. This unit pays it four levels late.

**`teaches_lemmas` is empty and not one new form is taught or demanded** — the
`b2_passive` / `c1_adj_pl_loc` / `b1_two_futures` convention. Every string in
every stage is verified TAUGHT.

**The reversal is the point, and it costs nothing.** `-eć` verbs put `a` where
the `e` was once the past `-ł` arrives — but before `-li`, the group-with-a-man
form, the `e` comes back: *chciał* against *chcieli*. That is the only place the
learner can go wrong by applying the rule too eagerly, and **both plurals of
`chcieć` have been owned since `b1_conditional_pl` [116]**, so the rule can be
stated completely without a single new string.

**Two pairs were available and neither was taken, for different reasons.**
*mieli*/*miały* are verified NEW and unclaimed by any C1 unit — two strings, and
they would have shown the reversal on a second verb; left out because the unit's
whole selling point is that it teaches nothing new, and *chcieli*/*chciały*
already demonstrate the fact completely. *musieli*/*musiały* are **`c1_modal_pl`
[223]'s own material by name in C1-SPINE Block 7**, so taking them here would
have stolen a later unit's teaching point and taught the same forms twice.
Neither pair appears anywhere, distractors included.

**Kontrola is twelve form choices and no meta-question**, which matters more in
this genre than in most: a unit about a pattern invites *"which group does this
verb belong to?"*, and AGENTS bans exactly that. It also means **no `*miel-` or
`*miali` shape appears anywhere** — that being precisely the word a mis-applied
rule produces, and precisely what **O12** forbids putting on screen. The only
genuine discrimination the pattern permits is singular-and-non-virile against
virile, carried by items 7 and 8 on the one verb that owns both.

**One correction to the previous unit, made in this unit's commit.**
`c1_past_gaps`' note claimed *miałem/chciałem/musiałem are used freely here*.
They are not used in that pack at all, and holding them out is exactly what lets
`c1_ea_shift` open on them cold. The note now says so.

### Judgment calls and open forks, this batch

1. **`wychodziłem` (`c1_past_gaps`)** — dropped, argued above, four strings from
   James to put it in. Permanent otherwise.
2. **Bare `móc` (`c1_past_gaps`)** — dropped, argued above. One string, and it
   would mean the course ends with a modal whose dictionary form the learner has
   never seen.
3. **`mieli`/`miały` (`c1_ea_shift`)** — dropped to protect the unit's
   zero-new-forms claim. Two strings, no knock-on effects.
4. **`c1_zostac`'s Kontrola items 1 and 2 share a frame** on purpose. Logged
   rather than quietly shipped or quietly avoided.
5. **`stan` and `zdarzenie` on `c1_zostac`'s `body_pl` lines** were kept as
   metalanguage rather than rewritten. They are the standard Polish terms for
   exactly this contrast and `body_pl` is the one place the convention admits
   metalanguage — but they are closer to ordinary lexis than *mianownik* is, and
   it is the one place in the batch where that line was drawn by judgment rather
   than by rule.

### For James to smoke

1. **The *got closed* glosses in `c1_zostac`.** The whole unit turns on English
   being ambiguous where Polish is not, so the agentless past forms are glossed
   *the shop got closed* rather than *was closed*, and slide 1 says why. If
   *got* reads as too colloquial in the hand, the alternative is a parenthetical
   on every gloss, which is uglier.
2. **`c1_past_gaps` is the largest single-unit form load in C1** — twenty
   strings. Twelve of them are a rule you have had since A2 applied to verbs you
   use daily, which is the argument for it, but it is worth confirming the intro
   lands as *this is easy and overdue* rather than as a wall.
3. **The `mógłby` paragraph on `c1_past_gaps`' limit slide.** It names a phrase
   you have been saying since B1 and tells you **not** to take it apart, one
   slide after teaching *mógł*. That is R6 executed literally. If it reads as
   confusing rather than as a guard rail, cutting the paragraph entirely is the
   conservative fix — the fence holds either way, since nothing in the pack
   produces a conditional.
4. **`c1_ea_shift` teaches nothing new at all.** It is the first C1 unit of which
   that is true. It should feel like a light unit that explains something you
   have quietly wondered about; if it feels like a unit that does nothing, it is
   the first item on C1-SPINE **O1**'s trim list and folds into `c1_past_gaps`.
5. **Two `-y` feminines caught as genitives in three batches** (`siostry` here,
   the same class as `b2_which_case`'s finds). Nothing to smoke — but it is the
   most reliable authoring trap left in the course, and worth knowing it is still
   biting.

### Next run

`c1_sec_imperf` [214] opens the next batch and is **MANDATORY** — James-locked
Block 6a decision #4, the `-ywa-`/`-iwa-`/`-a-` rule-naming unit, stated as a
pattern with named exceptions and never as free derivation. Then
`c1_verb_family3` [215] (the `płacić` family) and `c1_verb_family4` [216], whose
root is the author's pick and must be logged with its alternative.
`c1_prefix_semantics` [217] is R1/R2's own unit and sits after both families.

`data/case-map.json` is owed nothing until `c1_quantifiers` [229] — no unit in
this batch shipped a case governor. `c1_which_case` [235] and `c1_case_gym` [236]
remain the tail of the level, and `c1_vocative_note` [237] sits after the gym per
**R5**.

---

## Batch 12 — `c1_prefix_semantics`, `c1_dawac_perf`, `c1_imperative_stems`

Block 7's tail. `codex/REPAIR-QUEUE.md` was checked first and is still empty
(*"Remaining in this queue: none"*, and no unticked box survives a grep), so the
whole run went to the C1 build track. Three units, one commit each, pushed
individually, plus one follow-up commit amending the first (see below).

| unit | path | new strings | structure ID | commit |
|---|---|---|---|---|
| `c1_prefix_semantics` | 217 | **0** | `prefix_semantics` | `089e501`, amended `f4facb0` |
| `c1_dawac_perf` | 218 | 19 | `dawac_perf` | `d681cc1` |
| `c1_imperative_stems` | 219 | 5 | `imperative_stems` | `63dc956` |

Audit after each: **0 errors**. Warns stayed at **6** throughout and the warn set
is unchanged — all six are `teaches_empty_grammar` on the four live which-case
units and the two review nodes `a2_prep_review` / `b1_two_futures`. Neither
`c1_dawac_perf` nor `c1_imperative_stems` contributed one, and
`c1_prefix_semantics` does not either despite teaching zero lemmas, because its
`teaches_structures` is non-empty. `data/tree.json` was diffed against HEAD
before every commit and proved to change exactly one node each time, with
`path_order` byte-identical.

### `c1_which_case` was again NOT built, and the reason is unchanged

It is still `planned` at [235] and the standing routine puts the five *Który
przypadek?* units ahead of new C1 work. Batches 2 and 11 both took the
conservative branch and logged it; this run re-verified the premise rather than
inheriting it, and it holds. `data/case-map.json` is current through
`c1_gen_verbs` [207] — **29 trigger rows, none later than 207, checked this
run** — and `c1_quantifiers` [229], `c1_collective_num` [228] and
`c1_dates_full` [227] will each ship governors that belong in this unit's table.
`WHICH-CASE-SPEC.md` derives that table from the file, filtered to rows at or
before the unit, and calls it *"verifiable, not authored from memory"*; building
now would derive a table missing its own level's last governors, which is the
drift rule #4 exists to prevent. **None of the three units in this batch ships a
governor, so no `case-map.json` row was owed or added.**

### The run's biggest finding: two units silently contradicted the course, and one of them was mine

`c1_prefix_semantics` is the R1/R2 unit — the only one in RUPL that teaches
productive prefix semantics. The obvious risk was pool leakage. The real risk
turned out to be **the course arguing with itself in plain English**, and it was
found by grepping every pack's learner-facing slide text for prefix claims
instead of trusting either the spine or the draft.

**Contradiction 1, expected and handled on purpose.** `b2_prefix_lens` [169]
slide 3 tells the learner: *"There are other front pieces — za-, po-, prze- and
more. They make no promise at all: there is no reliable meaning to read off
them, so do not try."* R2 promotes `prze-` to the reliable set. Those cannot
both stand, so slide 5 **names** the retraction: `prze-` upgraded by name,
za-/po- confirmed unchanged, and *przepłacić* given in the same breath as the
price of the upgrade. Silently reversing a plain-English warning would cost
trust that correct grammar does not buy back.

**Contradiction 2 was mine, it shipped, and it was fixed in a follow-up
commit.** The first version taught `pod-` as *underneath AND up close* with
*podawać* as the up-close example. Two packs had already fenced that exact verb:
`b2_verb_family2` [173] slide 2 — *"podawać is not in the lens at all. Note that
its pod- is the very same pod- you met in podpisać one unit ago, where it was
under. It is doing something else here."* — and `b2_pisac_family` [172], which
gives pod- = under as *"One memory hook, about podpisać and about no other
word."* **The fork, taken conservatively:** R2 glosses pod- as *(under/approach)*
and *podawać* is the only owned verb carrying the approach sense, so teaching it
means a third retraction on the one verb two packs went out of their way to
fence. Refused. pod- is taught as **underneath only**, on *podpisać* — which
`b2_verb_family2` itself endorses as *"where it was under"* — plus *podłoga*, and
*podawać* moved to the counterexample slide where it now **agrees** with what the
learner was already told.

> **Open for James (batch 12, item 1).** R2's *approach* sense of `pod-` is
> **untaught**, and `pod-` is consequently thin: two examples, one of them a
> noun. If you want it taught, *podawać* moves back to slide 2 and its
> retraction gets named on slide 5 exactly the way `prze-`'s is. It is a
> one-slide change in either direction and nothing else moves.

Slide 5 therefore names **two** lifts rather than one: `prze-` upgraded, and
pod-=underneath widened past the *"about no other word"* hook to cover *podłoga*
— a real widening of a stated limit, so it is stated rather than assumed, with
the same slide saying the lift still does not reach *podawać*.

### `roz-` is thin, and the thinness is structural

The course owns **exactly one** `roz-` verb — *rozmawiać* ← `a2_phone_func` [89]
— and only its infinitive: *rozmawiam/rozmawiasz/rozmawia* are all verified NEW.
So every `roz-` item in the unit is infinitival or nominal. The verb slide is
carried by the *mówić → rozmawiać* derivation, which is readable, true, and has
its base owned since [16]; the rest of `roz-` is shown in owned **nouns**
(*rozmowa, rozkład, rozwiązanie*). Teaching *rozmawiam* to thicken it was
refused — a semantics unit that quietly opens a paradigm is the load-split
AGENTS forbids. *rozwiązanie* and *rozkład* are glossed with **English-only
roots** (*an untying*, *laid out apart*), because their `roz-` is transparent
only against *wiązać* and *kłaść*, neither of which is taught: the morphology is
made readable without one untaught Polish string.

**No starred non-word is printed anywhere in the unit.** C1-SPINE names the
`*wyrobić` trap as the reason the productive ban existed, and slide 6 makes that
warning in full — a verb you assemble yourself may simply not exist and nothing
about the pieces will tell you — without printing one. Conservative call, and
arguable: a linguistically-minded adult probably learns more from seeing exactly
what an invented verb looks like, but AGENTS bans fabricated non-words and the
risk of the invention being the thing that sticks is not worth the illustration.

### `c1_dawac_perf`: the "new paradigm" was never new, and the unit's shape turned on one check

C1-SPINE quotes `b2_verb_family2`'s fence as this unit's whole reason for
existing: *"dać is irregular (dam/dasz/da, an -m/-sz paradigm **the course has
never taught**), so the family's perfective half is a genuine second system."*
It is not a second system. `check_new.py` against 209 live nodes: the -m/-sz
endings are owned **since A1 on `mieć`** (*mam/masz/ma/mamy/macie/mają* ← [9]),
and `c1_wiedziec` [185] already ran them down the page a second time as an
explicit `mieć` parallel — its own catalogue entry says so in as many words.
*jem/jesz* ← [75] and *umiem* ← [24] are the same set again. So *dam/dasz/da* is
the **fourth** meeting with these endings, slide 1 is a payoff rather than a new
paradigm, and the unit costs one new ending in total.

That one ending is **`dadzą`**, and it is the batch's best fact because the
learner has met the identical break once already: `c1_wiedziec` named *wiedzą* as
*"the ONE place the parallel breaks — mają would predict a form that does not
exist."* Slide 2 runs *mają / wiedzą / dadzą* side by side so the exceptions read
as a pattern rather than a list.

**The plural is taught on `dać` and no other verb, and an earlier draft this run
got it backwards — recorded so the reasoning is not rediscovered.** The draft was
going to fence the plural entirely, reasoning that `dawac_family` was
singular-only and so the *dadzą* break could not be demonstrated. Checked rather
than assumed: *dają/dajemy/dajecie* came back **TAUGHT since `b1_giving`
[120]** — that fence covered the three verbs `dawac_family` ADDED, not *dawać*
itself, which B1 had already given in full. So the perfective column now mirrors
the imperfective column exactly (*dać* full, the other three singular), which
buys two things: the break is **demonstrable**, because the learner owns the
*dają* he would wrongly predict; and no perfective outruns its own imperfective,
since *oddają/podają/wydają* are all verified NEW. The unit's whole shape rests
on that single `check_new.py` call.

R7 was honoured without being touched: *podać* is pass/serve only and *wydać* is
the money sense only, so **`wydaje mi się` appears nowhere** — it is
`c1_nuance`'s material by James's own ruling — and *wydaje* occurs exactly once,
as a distractor inside a money sentence, the sense it was taught in.

### `c1_imperative_stems`: both debts were named four levels ago, in learner-facing text

This unit pays two debts `b1_imperative_rule` [125] wrote into its own slides,
and reading that pack rather than this catalogue's summary of it was the whole
game. Debt 1, its slide 0, in parentheses: *"(Daj stays exactly as opaque as it
always was — its own dictionary form was never shown to you, and this unit
doesn't change that.)"* Debt 2, its slide 2, last line: *"A few common verbs need
one extra sound change on top of it — those are for a later unit, not this
one."*

**The `daj` payoff is why the unit sits at 219, and the spine's ordering was
already right for a reason it did not state.** The imperative rule needs a 3sg to
operate on, and *dać* had none until `c1_dawac_perf` [218] — one node back. So
*da* → vowel-final → add -j → *Daj!* now falls straight out of a rule owned since
B1, at **zero new strings**, and A2's last unexplained chunk becomes derivable.

**Two corrections to this catalogue's own `imperative_rule` entry, both found by
reading the pack.** (1) It says *robić→rób* and *"all other stem-alternating
irregulars are fenced out — not taught, not shown, not a distractor"*; in fact
slide 0 SHOWS *idź* and *chodź* with their sound change, labelled *"same rule,
plus the dzie→dź sound you already know by heart"*. That alternation is
therefore already explained, which is exactly why *jedź* costs one string and no
mechanism. (2) It lists A2's chunk set as *daj, idź, czekaj, patrz, słuchaj*;
*patrz* is verified **NEW**, and that pack's own slide-0 title gives the real five
as *Czekaj / Słuchaj / Idź / Chodź / Daj*. Nothing in the new unit rests on the
wrong inventory, and **`patrz` is still untaught** — worth knowing, since it is a
common command.

The o→ó shift is taught only where the derivation is fully anchored (*robi*,
*zrobi* both owned), with *mów* as the **contrast** case rather than a third
instance — its ó was there all along, so beside *rób* it separates a vowel that
appears from one that was always written. **Two o→ó verbs were drafted and
dropped for the same verifiable reason — the rule needs a 3sg and the 3sg is not
owned:** *pomóż* (*pomoże* verified NEW, and teaching it would open
*pomogę/pomożesz*' g/ż alternation, a separate system, and graze the MÓGŁBY
QUARANTINE's neighbourhood for no gain) and *otwórz* (*otworzyć* owned as an
infinitive since [24], but *otworzy* verified NEW). **`móc` appears nowhere in
the pack in any form.**

Regular imperatives are deliberately **not** taught: *napisz, podpisz, zapisz,
opisz, przepisz* are all verified NEW but all regular, so the productive rule
owned since [125] already generates them — and `b2_pisac_family`'s description of
*podpisz*/*zapisz* as *"imperative_rule's stem-alternating material"* is
inaccurate, since they alternate nothing.

### What the pre-commit checks caught that `audit.py` cannot see

The auditor reads tags, not learner-facing text, so all of this was found by a
token sweep over every Polish surface in each pack (titles, `title_pl`,
`body_pl`, table cells, examples, match, quiz prompts/choices, type answers and
`accepts`) plus a Python mirror of the engine's own `norm()`.

- **Five `body_pl` leaks in `c1_prefix_semantics`**, every one verified NEW:
  *każdy*; *niżej*; *bez* + *reguły*; *budujemy*; *tendencja*. Two of those are
  repeat offenders and worth naming as a class. *bez*/*reguły* were inherited
  straight from `b2_prefix_lens`' own `body_pl` line — so the leak is **stopped
  here rather than propagated**, and `b2_which_case` had already flagged *bez*.
  *budujemy* is the second time that root has tried to get in; `c1_sec_imperf`
  caught *buduj*. All six `body_pl` lines were rewritten to owned forms.
  **`Przedrostek` is the only untaught learner-facing string left in the pack**,
  and it is the licensed metalanguage `prefix_lens`, `prefix_two_jobs` and
  `sec_imperf` each kept on the same basis. *tendencja* was refused even though
  it is a transparent cognate and arguably metalanguage of the same class — the
  conservative call, since unlike *przedrostek* it names nothing the unit is
  about and was there for flavour.
- **Three quiz distractors that were coinages, not pool-legal forms**, in
  `c1_prefix_semantics`: *przepisuje*, *przepisała*, *przepłaciła*. All three
  came back NEW — the secondary imperfectives are infinitive-only by
  `placic_family`/`pisac_family2` policy, and neither counterexample verb has a
  taught feminine past. Replaced with *podpisuje* and a masculine subject.
- **`*dadzę` in `c1_dawac_perf`** — the shape a learner might build by analogy
  from *dam* — was drafted as a distractor on item 12 and removed.
- **A duplicate Kontrola answer in `c1_imperative_stems`** that an eye-scan
  passes: items 4 and 10 answered *Jedź* and *jedź*, which the engine's own
  `norm()` lowercases into one answer. Item 10 was rebuilt on *jedzie*, which
  also sharpens it into an imperative-versus-present discrimination.
- **A title-rule violation in the planned tree label for
  `c1_prefix_semantics`**: *Przedrostki · znaczenia* carries **two** untaught
  Polish words (*przedrostki*, *znaczenia*, both verified NEW) in
  learner-visible chrome. Retitled to three owned verbs, one per prefix. This is
  the same correction `prefix_lens` had to make against its own planned label
  (*Przedrostki · soczewka*) — **the third time a planned C1/B2 tree label has
  shipped untaught Polish, which is now a pattern rather than an accident.**
  `c1_dawac_perf`'s and `c1_imperative_stems`' planned labels were checked and
  are fine, because each names forms its own unit teaches.

### Open for James, from this batch

1. **`pod-`'s approach sense is untaught** (detailed above with the exact
   one-slide fix either way). The item that most wants your eye in this batch.
2. **`c1_prefix_semantics` prints no starred non-word**, so the *"a verb you
   build yourself may not exist"* warning is made in prose only. If you would
   rather he saw one concrete invented verb, that is one line on slide 6.
3. **Smoke the retraction slides.** `c1_prefix_semantics` slide 5 tells Dad that
   two things he was taught earlier were too strict. That is honest and it is
   the first time the course has done it out loud; whether it reassures or
   unsettles is a question only the hand can answer.
4. **`patrz` is untaught** and *Patrz!* is a genuinely common command. It is one
   row in a later pack if you want it; nothing schedules it at present.
5. **Still carried forward unresolved, not touched this run:** the 161 fold
   variants across 18 packs whose `accepts` contains the deaccented form of
   their own answer, suppressing the „z ogonkami" correction on precisely the
   words where the ogonki matter. Still a one-line script in either direction
   once you rule.
6. **Still carried forward from batch 11:** the course ends with no verb for
   cleaning (*sprzątać* refused by `c1_verb_family4`, cheapest home two rows in a
   later vocab pack).

### State at the end of this batch

Live: **211 nodes**. Block 7 has four units left — `c1_imperative_more` [220],
`c1_cond_past` [221], `c1_by_plural` [222], `c1_modal_pl` [223] — then
`c1_stac_sie` [224] and `c1_nuance` [225] close it. `c1_imperative_more` is the
natural next unit and it is well set up: this batch's own note fences *róbcie*,
*chodźmy*, *niech pan*/*niech pani* to it by name, and `niech` is verified NEW.
`data/case-map.json` is owed nothing until `c1_dates_full` [227]. `c1_which_case`
[235] and `c1_case_gym` [236] remain the tail of the level, with
`c1_vocative_note` [237] after the gym per **R5**.

---

## Batch 11 — `c1_sec_imperf`, `c1_verb_family3`, `c1_verb_family4`

Block 7's middle. `codex/REPAIR-QUEUE.md` was checked first and is still empty
(*"Remaining in this queue: none"*, and no unticked box survives a grep), so the
whole run went to the C1 build track. Three units, one commit each, pushed
individually.

| unit | path | new strings | structure ID | commit |
|---|---|---|---|---|
| `c1_sec_imperf` | 214 | 4 | `sec_imperf` | `30edd17` |
| `c1_verb_family3` | 215 | 13 | `placic_family` | `c004251` |
| `c1_verb_family4` | 216 | 14 | `pisac_family2` | `4beb075` |

Audit after each: **0 errors**. Warns stayed at **6** throughout, and the warn
set is unchanged — all six are `teaches_empty_grammar` on the four which-case
units and the two review nodes `a2_prep_review` / `b1_two_futures`. None of the
three new packs contributed one; each has a non-empty `teaches_structures`.

### The first decision of the run: `c1_which_case` was NOT built, and why

The standing routine puts the five *Który przypadek?* units ahead of new C1
work whenever any is still `planned`. One is: `c1_which_case` [235]. It was
**deliberately not taken**, and this is the conservative branch of a real fork,
logged rather than guessed.

`WHICH-CASE-SPEC.md` derives each unit's intro table from `data/case-map.json`,
filtered to rows whose `taught_by` sits **at or before that unit on
`path_order`** — *"that set IS the lesson, and it is verifiable, not authored
from memory."* `c1_which_case` sits at 235, behind **twenty-one unbuilt C1
nodes** (214–234). At least three of them will ship governors that belong in
its table: `c1_quantifiers` [229] (*wiele*/*wielu*/*kilka* + Genitive),
`c1_collective_num` [228] (*pięcioro* + Genitive), and `c1_dates_full` [227]
(the Genitive date). Building the unit now would derive a table **missing its
own level's last governors**, which is precisely the drift the spec's rule #4
exists to prevent.

The spec agrees on its own terms — `c1_which_case` *"folds in … everything C1
closed"* and is *"the whole system on one page … the last teaching unit of the
course before the capstone."* Batch 2 of the which-case work recorded it as
blocked for the same reason.

One inherited claim was checked and is **narrower than it reads**:
`SEQUENCING.md`'s `gen_verbs` entry says *"with them Block 5's governors are
complete and `c1_which_case` becomes buildable for the first time."* That is
true of **Block 5** and was written by Block 5's builder; it is not a statement
about Blocks 8 and 9, which had not been built. `data/case-map.json` is current
through `c1_gen_verbs` [207] — verified this run, 29 trigger rows, none after
207 — and no row was added by any of the three units below, because none of them
ships a governor.

**So `c1_which_case` is not skipped, it is queued in its own path position**: it
becomes buildable once 234 is live. If James wants it sooner, the cost is that
its table has to be revisited when Block 8 lands.

### `c1_sec_imperf` — the rule B2 was forbidden to name, and it is three rules

Mandatory by James-locked Block 6a decision #4. One new verb and four new
strings: *zapisywać* + *zapisuję/zapisujesz/zapisuje*. It is a debt rather than
a coinage — `b2_pisac_family` [172] fenced *zapisywać* by name with *"a later
run or C1 may pay it."* Zero new endings; it runs on `present_uje`, already
carried on this verb's own twin *podpisywać*.

**The pack corrects its own brief, and this is the batch's most important
authoring call.** C1-SPINE names five owned pairs to state the rule over. They
do not work alike, and saying they do would teach something false about the two
commonest verbs in the course:

| shape | pairs | what actually happens |
|---|---|---|
| `-ywa-` | *podpisać→podpisywać*, *zapisać→zapisywać* | mechanical |
| `-a-` | *wyjechać→wyjeżdżać*, *przyjechać→przyjeżdżać* | **the stem moves too** (*jech*→*jeżdż*) |
| none | *wyjść→wychodzić*, *przyjść→przychodzić* | **no suffix at all** — swaps to the `chodzić` stem |

Collapsing row three into "the rule" is the error the unit exists to avoid, so
it gets its own slide and the limit is stated rather than discovered.

Decision #1 still stands and slide 5 says so: a pattern for **reading**, never a
licence to build; `a2_aspect`'s *learn the pair whole* is restated, not retired.
`-iwa-` is **named as existing and no example is shown**, because the course owns
no pair of that shape and inventing one is the ban itself.

### `c1_verb_family3` — a 140-node gap that `check_new.py` found, not the brief

The spine's brief for this unit is *dopłacić*/*przepłacić*. The best thing in it
turned out to be neither. **`płaci` and `płacisz` are verified NEW**: *płacić*
has been owned since `leaf_shopping_a1` [20] and *płacę* since
`a2_shopping_func` [63], so for **140 nodes** the learner has been able to say
*I pay* and has had no way at all to say *he pays* or *do you pay*. That is the
`dawac_family` [173] situation exactly — *wydawać* owned as a dictionary word
for a hundred nodes with no present — and it is repaired the same way, by
building the unit **on** the gap. Thirteen new strings, two new verbs, zero new
endings.

**The `za` + Accusative trap was named in advance, and the pack caught itself
walking into it.** `dawac_family`'s note had rejected *płacić* as its own root
precisely because *"płacić would want za + Accusative and za is owned only in
polite's thanking job — a governor homograph on a function word, the trap that
earned `prosic_o` its own unit."* A drafted Kontrola item read **`Brat ___ za
bilet`**. `audit.py` **would have passed it** — *za* is a taught string ←
`b1_polite` [107] — and it is exactly the homograph the paragraph refuses.
Rebuilt as *Brat ___ w hotelu*. The same sweep caught **`czasem`**, verified NEW,
in another prompt (the identical catch `b2_which_case` made on that word);
replaced with *często*. Every complement in the shipped pack is an Accusative
object, an owned Instrumental chunk, an indeclinable amount, a Locative phrase,
or nothing at all.

*złoty*/*złotych* were available and refused: they are `c1_quantifiers` [229]'s
own material by name, so every amount here is *euro*, which is taught and
indeclinable — no new ending rides in on the money.

### `c1_verb_family4` — the root chosen, the alternative costed

Root chosen: **`pisać`, extended** (*opisać*, *przepisać*) — the cut
`b2_pisac_family` logged as its own *"only if load allows"* drop. Chosen for
depth (six owned members already, so slide 1 is a payoff board and not a list of
strangers), for zero new endings, and for the prefix pairing below.

**Alternative rejected and costed, as the node note requires:**
*sprzątać*/*posprzątać*, which `b2_aspect_prefixes` dropped as *"the only pair
that would cost two verbs"* and sent to the C1 inbox. Refused because it is **not
a family** — one aspect pair on a root that grows nothing else in this course, so
it would sit inside a root-family unit as an unrelated lodger and break the
one-new-thing shape — and because both members are verified NEW.

### The prefix pairing, built across two units on purpose

The best fact in the batch, and it needed two units to make:

- `c1_verb_family3` teaches **`przepłacić`** and says out loud that its `prze-`
  means TOO MUCH and **cannot** be read off the front of the word. No hook.
- `c1_verb_family4` teaches **`przepisać`**, where the **same** `prze-` **can**
  be read — writing something across, one place to another. That is **R2**'s
  through/across/re- tendency, arriving on a real owned verb.

So the learner meets the identical prefix twice, two nodes apart, opaque once and
transparent once, **before `c1_prefix_semantics` [217] claims any tendency at
all**. Slide 4 of the second unit says precisely that and claims no rule.

**For the `c1_prefix_semantics` builder:** R2 requires every slide to state that
the tendency is strong but not guaranteed. `przepłacić` is now a real, owned,
already-named counterexample sitting one node before you, and `przepisać` is the
positive case. Use the pair — it is the honest exception R2 asks for, and the
learner has already been told it exists.

`do-` in *dopłacić* and `o-` in *opisać* each get **one** memory hook for that
word only, on `b2_pisac_family`'s stated precedent (*"labelled as a hook for that
one word and not a rule"*). One hook per unit is the standing ceiling and was
not exceeded. Neither is presented as the James-locked core-4 lens extending to
non-motion verbs — that is the productive prefixation decision #1 refused and
**R1** lifted for `c1_prefix_semantics` alone.

### Judgment calls and open forks, this batch

1. **Secondary imperfectives held to infinitives only** in both family units
   (*dopłacać*, *przepłacać*, *opisywać*, *przepisywać*). Their presents would
   be free — the `-uję` class is owned and was produced in `c1_sec_imperf` — and
   were still not taken. Logged as a **policy** rather than an oversight: two
   families in a row stopping at the infinitive reads as one decision, where one
   of each reads as an accident. Cheap to lift if James wants production.
2. **The prescribing sense of `przepisać`** is named in **one line** with one
   example, not drilled. AGENTS' homograph rule requires naming a second
   reading rather than letting it sting, and *recepta*/*lekarz* have been owned
   since A2 — but a second sense is not a second teaching point.
3. **`c1_sec_imperf` teaches only one new verb.** A rule-naming unit could have
   carried more; it deliberately does not, because its selling point is that
   almost everything in it is already owned.

### Three things the pre-commit checks caught that `audit.py` cannot see

Recorded for the class of error, since all three would have shipped clean:

1. **A duplicate answer inside Kontrola** — `c1_verb_family4` items 5 and 6 both
   answered *przepisał* (the copy-out sentence and the prescribing sentence).
   The two prompts read as different questions, which is exactly why an eye-scan
   misses it; only a `norm()`-mirroring compare finds it. Rebuilt item 5 on
   *przepiszesz*, the one cell of the paradigm no item had claimed.
2. **Four `body_pl` leaks across two packs** — *nieprzewidywalny*, *regularny*,
   *słowa*, *czytaj*, *buduj*, *wzór* in `c1_sec_imperf`; *rdzeń* and *czymś* in
   `c1_verb_family4`. All verified NEW. The AGENTS convention admits
   **metalanguage** on that line, not new lexis — the `b2_which_case`
   *czasem*/*bez* finding exactly — and *rdzeń* is a grammar term this learner
   has never been given. All rewritten to owned forms. **This line is now the
   single most reliable source of leaks in the project: four of five units
   across the last two batches leaked on it.** Worth a standing check.
3. **Builder chrome inside a learner-facing table** — `c1_verb_family4`'s family
   board carried a third column of level codes (A1/B2/C1), and its *zapisywać*
   row read *since C1* for something taught three nodes earlier. Column dropped.

### For James to smoke — batch 11

1. **The three-shapes slide in `c1_sec_imperf`.** The unit says plainly that the
   two commonest verbs in the course (*wyjść*, *przyjść*) sit **outside** the
   rule it has just taught. That is honest and it is also deflating. If it reads
   as "so why did you tell me the rule", the fix is to lead with the payoff
   rather than the limit — say the word.
2. **`płacisz` / `płaci`.** These close a gap you have had since A2 without
   knowing it. Worth checking that *Czy płacisz kartą?* feels like a sentence
   you would actually use at a till.
3. **The `prze-` pairing across units 2 and 3.** This is the batch's design bet:
   opaque on *przepłacić*, readable on *przepisać*, two nodes apart, with the
   verdict deferred to `c1_prefix_semantics`. If meeting the contradiction
   **before** the explanation is confusing rather than priming, that unit's
   builder needs to know before it is written.
4. **One hook per unit** (*do-* = paying up to; *o-* = writing about). These are
   the first prefix hooks outside the locked core-4 lens. If they feel like the
   start of free derivation rather than two mnemonics, say so — they are cheap
   to remove.

### Still open after batch 11

- **`sprzątać`/`posprzątać` — now permanently untaught unless overruled.**
  C1-SPINE's opening states that anything unscheduled is not deferred but
  **out of RUPL forever**, so refusing them in `c1_verb_family4` means the
  course ends with no verb for cleaning. Raised here rather than dropped in
  silence. Cheapest home if wanted: two rows in a later vocab pack, not a
  grammar unit.
- **`c1_which_case` [235]** — queued at its own path position, buildable once
  234 is live. See the top of this entry.
- **The 161 fold variants** whose `accepts` contains the deaccented form of
  their own answer, suppressing the „z ogonkami" correction on exactly the words
  where the ogonki matter. Carried forward unresolved since the fifth repair run;
  still a one-line script in either direction, still James's call.
- **The vocabulary volume finding** (`codex/LEVEL-AUDIT-2026-08-07.md`): C1 adds
  24 curated words across the whole level. Untouched this run, and none of these
  three units changes it — they are grammar units by design.

### Next run

`c1_prefix_semantics` [217] is next in `path_order`, and it is the R1/R2 unit —
read the prefix-pairing section above before writing it. Then `c1_dawac_perf`
[218] and `c1_imperative_stems` [219]. **Every C1 unit that ships a new governor
must add its row to `data/case-map.json` in the same commit** — Block 8's
`c1_time_minutes`, `c1_dates_full`, `c1_collective_num` and `c1_quantifiers` are
the ones that will, and `c1_which_case` derives its table from that file.

---

## Batch 13 — `c1_imperative_more`, `c1_cond_past`, `c1_by_plural`

Block 7 continued. `codex/REPAIR-QUEUE.md` was checked first and is still empty
(every box ticked, and the closing line reads *"Remaining in this queue:
none"*), so the whole run went to the C1 build track. Three units, one commit
each, pushed individually.

| unit | path | new strings | structure ID(s) | commit |
|---|---|---|---|---|
| `c1_imperative_more` | 220 | 11 | `imperative_plural`, `imperative_niech` | `757973b` |
| `c1_cond_past` | 221 | 6 | `cond_past` | `550e8f3` |
| `c1_by_plural` | 222 | 4 | `by_plural` | `042560f` |

Audit after each: **0 errors**. Warns stayed at **6** throughout and the warn set
is byte-identical to batch 12's — all six `teaches_empty_grammar`, on the four
live which-case units and the two review nodes. None of these three contributed
one. `data/tree.json` was diffed against the previous commit programmatically
after each push and proved to change **exactly one node** each time, with
`path_order` identical.

### `c1_which_case` was again NOT built, and the reason is unchanged

It sits at path 235 and its intro table is DERIVED from `data/case-map.json`
filtered to `taught_by` at or before that position. Paths 223–234 are still
`planned`, so the derivation would be missing its own level. Batches 1 and 2 of
the which-case family said so; this run confirms it a third time. **None of
these three units ships a governor, so no `case-map.json` row was added** — the
file still has no rows after `b2_prosic_o` [165], and Block 8's
`c1_time_minutes`, `c1_dates_full`, `c1_collective_num` and `c1_quantifiers`
remain the ones that must add theirs in the same commit.

### How the three units were verified

`audit.py` only ever checks **declared tags**, so it cannot see a stray Polish
word in a slide, a distractor or a cloze frame. Two checkers were written for
this batch and run on every unit:

1. **A token-level pool checker** over every unambiguously-Polish learner-facing
   surface — `title_pl`, `body_pl`, slide `examples`, match rows, quiz choices,
   quiz prompt frames, cloze frames, and every Pisanie/Użycie answer and
   `accepts` — splitting each into words and checking them against
   `make_pool.py --before <node>`. Intro **table cells are mixed English and
   Polish by design**, so they are excluded from the automated pass and were
   reviewed by hand instead, cell by cell.
2. **A structural checker** mirroring the engine's own `norm()` from
   `js/practice-grammar.js` (lowercase, strip punctuation) — twelve match rows,
   no duplicate answers or prompts within any stage, every quiz answer present in
   its own choices, one `___` per cloze frame, the ≤3-word cap on typed-whole
   answers, every `teaches_lemma` present on the match board, and no Pisanie
   cloze reconstructing a Użycie sentence.

**The second checker caught a real bug in `c1_cond_past` that eye-checking had
passed:** the Pisanie cloze `Gdybym ___ czas, byłbym zrobił obiad.` reconstructed
Użycie item 5 character-for-character. The frame was rebuilt on `tata`. This is
the same class of defect the which-case batch-1 checker was written for, and it
is the second time it has been caught by assertion rather than by reading.

Three flag classes were examined and **deliberately ruled not-leaks**, each
against live shipped precedent rather than by assumption:

- **`bym` / `byś` / `śmy` / `ście` on `body_pl`.** These are the person markers
  the units teach. `b2_gdyby` ships live with `body_pl` reading
  `gdyby + m → gdybym · gdyby + ś → gdybyś` and a slide body that says *"You know
  bym, byś, by from the conditional"*. Identical shorthand, identical function.
- **`ty` in learner-facing English** (`c1_imperative_more` slide 4's register
  table). Verified NEW as a lemma, but it is established course metalanguage:
  `a1_present_gym` prompts read `ty · mieszkać → ending`, `a2_bedzie` says
  *"będziesz belongs to ty"*, `a2_jechac` says *"ty is inside the je- block"*.
- **`na autobus`** (`c1_imperative_more` Użycie). NEW as a multi-word lemma, but
  composed from the owned `na_acc` governor plus the owned `autobus`, exactly as
  `c1_imperative_stems` [219] shipped *Czekaj na autobus!*. Only `autobus` is
  declared.

### `c1_imperative_more` — the strand closes, and the hard part was already bought

Every singular command the unit builds on is an **owned string**:
`imperative_rule` [125] gave the formation and `c1_imperative_stems` [219], one
node back, paid the last sound change. So the plural is that owned base plus
`-cie` or `-my` with **nothing else happening** — no stem change, no vowel
change, no exception in the set taught. That is a true statement about these
forms and the slide says it plainly; it is **not** generalised into a promise
about every verb in Polish.

**Both endings are already produced in the present**, which is the anchor the
unit opens on rather than a coincidence noted late: `robicie/robimy`,
`idziecie/idziemy`, `mówicie/mówimy`, `kupujecie/kupujemy`, `macie/mamy`,
`jesteście/jesteśmy` — all verified owned. The unit's real content is *which
base* they attach to.

**Not one imperative plural collides with its present-tense twin**, checked
string by string across the whole taught set: `róbcie/robicie`,
`zróbcie/zrobicie`, `idźcie/idziecie`, `jedźcie/jedziecie`,
`chodźcie/chodzicie`, `kupcie/kupicie`, `dajcie/dacie`, `róbmy/robimy`,
`zróbmy/zrobimy`, `chodźmy/chodzimy`. Twelve pairs, twelve distinct strings —
which is what makes the command-versus-statement discrimination real rather than
a coin toss, and is why two Kontrola items are **statements** whose right answer
is the present form. Shown as a table of the pairs he owns, never as a law.

**Two mechanisms in one unit is a load call, and it is the spine's** — Block 7
schedules the plural and `niech` together as *"the rest of the imperative"*. It
is defensible because only one of the two involves any morphology, and that one
is an ending already produced in the present; `niech pan` costs one invariable
word and no morphology at all, since what follows it is the owned 3sg the
command was built from. Registered as **two** structure IDs rather than smuggled
under one, so the count is visible. **If it reads heavy in the hand, the clean
split is `niech` into its own small unit beside `c1_register`.**

**Negative plural commands are a logged scope refusal, not an omission.**
`nie róbcie`, `nie idźcie` are each derivable from two rules he owns
(`imperative_rule`'s *nie* + imperfective, plus this unit's `-cie`), and adding
them would put a third thing in a unit already carrying two.
`c1_imperative_stems`' precedent of teaching `nie rób`/`nie jedź` alongside was
considered and **not** followed: there the negative demonstrated the aspect flip
biting on a form taught in that very unit, here it would demonstrate nothing new.

### `c1_cond_past` — and the fact `b2_gdyby` withheld on purpose

B2-SPINE **O6**'s explicit deferral, paid. The six new strings arrive as a
**regular application of an owned rule** rather than a new paradigm:
`b1_conditional_sg` taught L-form + `bym`/`byś`/`by` on *chcieć*, *kupić*,
*zrobić*, and nobody had ever run it on *być*. The set taught **mirrors that
pack's own six singular persons exactly** rather than inventing a different cut.
It also closes a gap the B2 digest logged verbatim — *"`byłbym` is NEW too, so
'I would be…' is unavailable and every result clause that wanted it was rebuilt
around `chciałbym być`"* — so *Tata byłby w domu* is now sayable directly.

**Slide 2 is the headline and it was reserved for this unit by name.**
`b2_gdyby`'s digest states: *"the L-form after gdyby is glossed ONLY as a present
unreal ('if I had time', never 'if I had had time'), and the fact that Polish
uses one shape for both readings is NOT MENTIONED AT ALL rather than
half-taught."* That is told here. It is the high-value half of the unit because
it makes his **owned** sentence do more work — it reduces what he has to produce
rather than adding to it.

**The register line is the course's own ruling, not a new opinion.** B2-SPINE O6
rejected a `b2_cond_past` on the stated ground that the construction *"is
comparatively rare in speech"*. Saying so on the slide is therefore consistent
with the decision that deferred it, and it follows the treatment C1 already gives
rare forms (R5's vocative footnote, O5's `zrobiwszy` shown but never demanded).
The slide says plainly that this belongs more to writing than to talking and that
the plain conditional is what he will hear — then teaches the form anyway,
because he will **read** it and because the course is closing.

**The if-half is explicitly left alone**, and this is the unit's main load-split.
Strict Polish can also mark the past inside the *gdyby* clause
(*gdybym był miał czas*). That is **not taught, not shown, not a distractor**: it
doubles the person marker in a clause `b2_gdyby` only just settled, and it is
rarer still. **Logged as a permanent scope refusal — and there is no later spine
to reopen it.**

`zrobiłbym` is **verified NEW** (`b1_conditional_sg` taught only the 2sg and 3sg
of *zrobić*) and is used **nowhere**; every 1sg plain conditional in the pack is
the owned `kupiłbym`. This was checked rather than assumed and it changed two
drafted items. `byłoby` is **deliberately held** and logged: the neuter would
give *Byłoby dobrze*, which is genuinely useful, but `b1_conditional_sg` taught
no neuter conditional and adding one would extend the paradigm past the set the
unit is mirroring. Cheapest home if wanted: one row in `c1_nuance` or
`c1_register`.

### `c1_by_plural` — two findings the pool caught that reading would not have

Four new strings, **zero new mechanism**, paying two logged holds at once
(`b2_gdyby`'s plural-*gdyby* C1-inbox hold and `b1_zeby`'s plural-*żeby* scope
cut). The marker family is exceptionally well anchored: `-śmy`/`-ście` are
already produced in the present (`jesteśmy`), the past (`byliśmy`, `robiliśmy`)
and the plural conditional (`chcielibyśmy`). `b1_zeby`'s own slide already told
the learner the family was shared — *"the SAME family you already own from the
conditional: -m (bym), -ś (byś), nothing extra for the 3rd person (by)"* — and
this unit finishes that sentence.

**1. The brief's obvious headline sentence is illegal.** *Gdybyśmy mieli
czas…* is the natural first draft and it cannot be written: **`mieli` and
`miały` are BOTH verified NEW.** The course has never taught the plural past of
*mieć*. Every plural L-form in the pack is therefore drawn from the closed owned
set `byli / były / chcieli / chciały / kupili / kupiły / zrobili / zrobiły`, and
the if-halves run on *być* and on the shop rather than on having time.

**2. `b1_conditional_pl`'s grid is deliberately partial, and it shaped every
result clause.** Verified form by form: *chcieć* has all six plural
conditionals; *kupić* has 1pl and 3pl but **not** 2pl (`kupilibyście` is NEW);
*zrobić* has 2pl and 3pl but **not** 1pl (`zrobilibyśmy` is NEW). So **"we would
make" is unsayable in this course** and no item asks for it — the 1pl result
clauses all use `chcielibyśmy` or `kupilibyśmy`, the 2pl ones `zrobilibyście` or
`chcielibyście`. Three drafted sentences were rewritten when this was checked.
`bylibyśmy`/`byliby` — the plural of the *był*-conditional taught one node back —
are also NEW and appear **nowhere**; extending that paradigm is not this unit's
job and is logged as untaught.

**`b1_zeby`'s wanter-must-differ-from-doer rule is respected rather than quietly
broken.** That pack states: *"The wanter and the doer must be different
people… If you want to do something yourself, you still just say chcę zrobić, no
żeby at all."* A first-person wanter with `żebyśmy` puts the speaker inside the
doer group and sits awkwardly against that rule, so **every** `żebyśmy` and
`żebyście` item uses a **third-person** wanter (*Mama chce, żebyśmy…*), where
wanter and doer are unambiguously different. One Kontrola item keeps the owned
singular `żebyś` against a first-person wanter, which is `b1_zeby`'s own shape.

**Caught in my own draft before wiring:** slide 0's `body_pl` read
`-śmy = my · -ście = wy`, using the two pronouns the batch fences by hand.
Rewritten to owned forms. `my`/`wy` sit in `audit.py`'s `GLUE_LEMMAS`, so the
auditor would have passed it silently — which is exactly the failure mode the
spine warns about, and it happened in this run's own output.

### For James to smoke — batch 13

1. **`niech pan` sharing a unit with the imperative plural.** Two mechanisms,
   registered as two structure IDs so the call is visible. It is the spine's
   design, not a drift, and only one of the two involves morphology — but this
   is the unit to say the word on if it feels like two lessons. The clean split
   is `niech` into its own small unit beside `c1_register`.
2. **`c1_cond_past`'s honesty line.** Slide 4 tells you outright that the
   construction belongs more to writing than to speech and that you will not be
   caught out for not saying it — then teaches it anyway. That is the R5 /
   `zrobiwszy` treatment applied to a whole unit rather than a footnote. If
   being told "you probably won't need this" makes the unit feel like a waste of
   a slot, that is worth knowing before `c1_register` takes the same posture.
3. **Slide 2 of `c1_cond_past` retracts nothing but adds a lot.** It tells you
   that *Gdybym miał czas, kupiłbym samochód* has covered the past reading all
   along. Worth checking it lands as a widening rather than as "you were told
   half the truth at B2" — the wording was chosen to avoid the second reading,
   and B2 held the fact back deliberately so this unit could have it.
4. **The command-versus-statement pairs** (`Róbcie!` against `Robicie.`). Six
   pairs on one slide, and two Kontrola items where the right answer is the
   **statement**. This is the unit's sharpest discrimination and also the
   easiest place to feel tricked; if the statement items read as gotchas rather
   than as the point, they are the two to convert.

### Still open after batch 13

- **`c1_which_case` [235]** — buildable once path 234 is live. Third run in a
  row it has had to wait.
- **`byłoby`**, **`bylibyśmy`/`byliby`**, and **`mieli`/`miały`** — all verified
  NEW, all deliberately untaught, all logged above. `mieli`/`miały` is the one
  worth a second look: the course ends with **no plural past of *mieć***, which
  is a commoner verb than several this level does teach. Cheapest home is a use
  item or two in a later Block 8 or 9 pack, not a unit.
- **`sprzątać`/`posprzątać`** — carried unresolved from batch 11; the course
  still ends with no verb for cleaning unless overruled.
- **The 161 fold variants** whose `accepts` contains the deaccented form of
  their own answer, suppressing the „z ogonkami" correction. Carried unresolved
  since the fifth repair run; still a one-line script in either direction, still
  James's call.
- **The vocabulary volume finding** (`codex/LEVEL-AUDIT-2026-08-07.md`).
  Untouched — these three are grammar units by design.

### Next run

`c1_modal_pl` [223] is next in `path_order`, then `c1_stac_sie` [224] and
`c1_nuance` [225]. Two notes for whoever takes them. **`c1_modal_pl` sits after
`c1_cond_past` on purpose** — it carries `powinienem był`, the conditional-past
modal, and the construction it leans on now exists. **`c1_nuance` carries R7**
(*wydaje mi się* as a chunk, with the explicit homograph line naming
`wydawać` = *spend* from `b2_verb_family2`) and is the pack that could cheaply
absorb `byłoby` and the `sprzątać` pair if either is wanted. **Every C1 unit that
ships a new governor must add its row to `data/case-map.json` in the same
commit.**

---

## Batch 14 — `c1_modal_pl`, `c1_stac_sie`, `c1_nuance`

Three units, one commit each, pushed individually, plus one repair to
already-shipped content that a control test turned up. `codex/REPAIR-QUEUE.md`
was checked first and is still empty (all 19 packs ticked), so the run's whole
capacity went to the build track.

| unit | path | new strings | structure IDs | commit |
|---|---|---|---|---|
| `c1_modal_pl` | 223 | 12 | `modal_pl`, `powinien_byl` | `52a623d` |
| `c1_stac_sie` | 224 | 14 | `stac_sie` | `c086575` |
| `c1_nuance` | 225 | 14 (12 words) | — (vocab) | `8a1a432` |
| _repair_ `c1_society` | 197 | — | — | `bb6f12e` |

Audit after each: **0 errors**. Warns stayed at **6** throughout — the same six
`teaches_empty_grammar` nodes (`a2_prep_review`, `b1_two_futures`, and the four
`*_which_case` units). Not one new warn. 217 live nodes; **13 non-station nodes
remain**, all C1.

### Why this was a C1 build run and not a which-case run

The standing priority is the five `Który przypadek?` units, and `c1_which_case`
[235] is still `planned` — but it is **blocked by its own spec**, not skipped.
`WHICH-CASE-SPEC.md` says its table is *derived* from `case-map.json` filtered
to rows at or before it on `path_order`, and calls it *"the whole system on one
page… the last teaching unit of the course."* Twelve C1 nodes still sit between
here and there. Building it now would derive a table missing its own level.
Batch 1 and batch 2 of the which-case digest both said so; this is the third
run to confirm it. **No `case-map.json` row was added this run** — none of the
three units ships a governor, which was checked rather than assumed.

### `c1_modal_pl` — one mechanism wearing two words, and one that isn't

`b2_powinien` fenced the whole plural in a single sentence: *"the virile plural
would drag `virile_past`'s gender split back into a unit that already has two."*
The thing it was avoiding is the **same** split for both modals —
`powinni`/`powinny` and `musieli`/`musiały` differ by exactly the `-i`/`-y`
contrast owned since `a2_past_plural`'s *byli*/*były* and met again as *ci*/*te*,
in `c1_irreg_virile` and in `c1_adj_pl_virile`. So the unit does not **teach**
the virile split; it applies an owned split to two modals at once. That is the
argument for one unit rather than two, and it is why the pair is registered
under one ID.

The person markers cost nothing: `-śmy`/`-ście` attach to *powinni* exactly as
they attached to *gdyby*/*żeby* one node back in `c1_by_plural`, on their fifth
job. **Not one new ending in the whole unit.**

`powinien był` is registered **separately** as `powinien_byl`, following batch
13's `imperative_niech` precedent — when a unit carries two mechanisms, the call
should be visible rather than smuggled under one ID. Its anchor is deliberately
**`b2_powinien`'s own move, not `c1_cond_past`'s**: that pack taught *trzeba
było* / *można było*, a modal put into the past by **adding** an owned word
rather than reshaping, which is a smaller step than *byłbym zrobił* — and
reading the construction as "the conditional again" would invite \*`powinienem
byłbym`. `cond_past` is cited on no slide.

**The sharpest scope cut, logged rather than silent:** `powinnyśmy` and
`powinnyście` are verified NEW and appear **nowhere** — not in a table, not as a
distractor. Polish takes the virile form whenever the group contains any man, so
Dad produces *powinniśmy* in every group he belongs to; the non-virile 1pl/2pl is
producible only by women speaking about themselves. `b2_powinien`'s own reason
for dropping neuter *powinno* — *"no everyday first-person payoff"* — applies
with more force. No slide claims the 1pl/2pl has only one shape. If James wants
the paradigm closed it is a one-line addition to slide 0 and costs no mechanism.

**Caught in my own draft before wiring:** slide 1's `body_pl` read *grupa z
mężczyzną*. `mężczyzną` is verified **NEW** — the course owns *mężczyzna* and
*mężczyźni* and has never taught the Instrumental. Rewritten to *ci lekarze → powinni · te kobiety → powinny*, both owned. The auditor would have passed it.

### `c1_stac_sie` — and a sense collision O13 did not list

`b1_stories_func` handed `stało` over as *"one closed word inside three fixed
frames, never conjugated, no się-stać paradigm"* and logged the opening as a
fork. This is that opening. The homograph is the unit's first move, as the spine
requires: **`stać` without `się` is a different verb, *to stand*, verified NEW** —
named on slide 0, tagged because the string is on screen, given one match row so
the contrast is drilled rather than merely mentioned, and demanded nowhere in
that sense.

**The finding worth having from building it.** `zostać` is already TAUGHT
(`c1_zostac` [211]) — but **only** as the dynamic-passive auxiliary, always with
a participle. It also means *become*, and for a job title **`został lekarzem` is
the commoner Polish**. This is not in O13's homograph table. Saying nothing would
have taught `stać się` as though it were the only option; teaching `zostać`'s
second job would ship a governor out of turn in the last level. Taken the R7 way:
**one honest English line on slide 2 naming both verbs and which one native
speakers reach for with a job title**, with `zostać` demanded nowhere in that
sense — not in a stage, not as a distractor. **This is the unit's biggest
judgment call and the first thing to smoke.**

**Adjective complements are refused.** `stać się` + NOUN takes the Instrumental
unambiguously, and that is exactly `być`'s own complement (`inst_identity`), so
*Jestem lekarzem* → *Stałem się lekarzem* is one new verb on an owned case.
`stać się` + ADJECTIVE is genuinely variable in modern Polish, and the precedent
that governs is the one that killed the fleeting-e rule in `b2_gen_pl_full`:
*this learner gets no value from a rule he cannot trust.* No adjective complement
appears anywhere.

**Why the paradigm is the singular past.** *Happen* takes `co`/`coś`/`nic`, all
neuter, so its past is effectively the one owned form *stało się* — a
happen-only unit would carry almost no new material, which is why the label says
*Becoming*. The person forms only earn their place in the second job. Six
singular pasts, complete; **the plural (`stali się`/`stały się`) is fenced** and
appears nowhere; every ending is `past_ac`'s own, so the only new thing in the
past set is the stem `stał-`.

**The future is an addition beyond the spine brief and is logged as one.**
*Co się stanie?* and *Nic się nie stanie.* are the future twins of the two B1
chunks. The stem shift `stać`→`stanie` is unpredictable, so the slide says so and
hands the form over whole in the `a2_aspect` idiom; `stanę`/`staniesz`/`staną`
appear nowhere and no future paradigm is claimed. The conservative alternative
was a past-only unit — rejected because *What will happen?* is a sentence Dad
will want on a day something has gone wrong, and it costs one stem.

**Caught before wiring:** the Pisanie cloze *Mama ___ się nauczycielką.* +
`stała` reconstructed Użycie item 2 character-for-character. Rewritten to
*Siostra ___ się lekarką.*

### `c1_nuance` — R7 executed, and the last vocab pack in the course

**R7 is done.** *wydaje mi się* is taught as a chunk with an explicit homograph
line naming both senses. `b2_discussion_func` dropped it and called the drop
*"the loudest judgment call in the batch"*: `wydaje` is TAUGHT since
`b2_verb_family2` as the 3sg of *wydawać*, **to spend money**, and `mi` and `się`
are owned too — three familiar strings, every one of them doing something else,
colliding at the worst possible distance. That pack said the phrase *"needs its
own moment naming the collision out loud… not a line in a chunk board."* It has
that moment: the item's `explain` names *wydawać* = spend, names the pack that
taught it, and says the seeming-sense lives **only** in the whole three-word
phrase. Nothing in the pack decomposes it, and no sentence anywhere uses `wydaje`
in its spending job.

**Twelve words in four jobs**, which is `b2_discussion_func`'s own shape and its
own warning — near-synonymous adverbs dumped together is the cliff load-splitting
forbids. HEDGING (`pewnie`, `wydaje mi się`, `byłoby dobrze`) · PRECISION
(`naprawdę`, `dokładnie`, `właściwie`, `przynajmniej`) · DEGREE (`całkiem`,
`zupełnie`) · FRAMING (`szczerze mówiąc`) · and opening `uważać` (`uważasz`,
`uważa`). **No two items are interchangeable in a sentence** — that was the test
each candidate had to pass, and it is what killed `prawdopodobnie`.

`pewnie` is a trap and is named: `na pewno` (owned since B1) means **definitely**;
`pewnie` alone is the other end of the same scale. `byłoby` is absorbed from
`c1_cond_past`, which logged it held with *"cheapest home `c1_nuance` or
`c1_register`"* — it arrives as `byłoby dobrze`, genuinely on-register for a
hedging pack rather than a form parked in a convenient bin. `uważasz`/`uważa`
pay `b2_discussion_func`'s logged cost, which that pack stated plainly: Dad could
say what **he** considered and could not ask.

**`sprzątać`/`posprzątać` was NOT taken, and that is now permanent unless James
overrules.** Carried unresolved since batch 11; batch 13 named this pack as the
one that "could cheaply absorb" it. It was refused because the vocab register
principle carried unchanged from B1 and B2 forbids revisiting an earlier topic
domain, and a cleaning verb in a hedging pack reads as a dumping ground. **This
was the last vocab pack on the path** — every remaining C1 node is grammar, a
gym, a footnote or the capstone — so **the course now ends with no verb for
cleaning.** The fix is one line in this pack's block plus two sentences.

Also refused, all verified: `około` (real and useful, but it is a **Genitive
governor**, and this course's vocab packs do not ship governors; it would need a
`case-map.json` row and would step on `c1_time_minutes`' *około piątej*); `wcale`
(`c1_neg_polarity`'s, three nodes ahead); `racja`/`rację` (NEW as bare forms —
`b1_opinions` owns *mam rację* whole, and chunks are never decomposed, so
*masz rację* appears entire and nothing blanks inside it).

### How the three units were verified, and the one live defect it found

Beyond `audit.py` — which only ever checks **declared** tags and so cannot see a
stray Polish word — each pack was run through a token-level checker over every
learner-facing surface against its own position-aware pool. It asserts twelve
match rows, no duplicate answers or prompts inside any stage under a mirror of
the engine's `norm()`, one `___` per cloze frame, the Pisanie ≤3-word cap, that
no Pisanie frame reconstructs a Użycie sentence, that every declared
`uses_lemma`/`uses_structure` is pool-legal, and that the GLUE_LEMMAS pronouns
(`on`/`ona`/`my`/`wy`) — which the auditor structurally cannot see — appear
nowhere. It was **tightened mid-run**: English situational prose in a quiz prompt
was masking the Polish check, so the checker now treats a prompt carrying `___`
as a Polish frame and one without as English, and grades a diacritic-bearing
unknown as an error against an ASCII-only unknown as a warn to read by eye.

**The vocab checker was then run against an already-shipped pack as a control,
to prove it was not passing vacuously — and it failed.** `c1_society`
[197] had **two `Czy…?` sentences whose `accepts` did not include the czy-less
form**, which is a live false wrong on exactly the correction James smoke-flagged
on 2026-08-07. A course-wide scan of every `sentences[]`, `use_items[]` and
`type_items[]` answer in all 216 packs confirms those two were the **only**
survivors of that sweep — everywhere else the rule holds. Fixed in `bb6f12e`.

### For James to smoke — batch 14

1. **`stać się` against `został`.** Slide 2 of `c1_stac_sie` tells you that for a
   job title Polish more often says *został lekarzem*, then goes on to drill
   *stał się lekarzem*. That is honest and it is the only complement the pool
   offers — every Instrumental identity noun the course owns is a profession. If
   it reads as "here is a verb, but use the other one", the fix is to move the
   unit's centre of gravity onto the *happen* sense and cut the become half to
   one slide.
2. **`stać` = to stand, as a scored match row.** Naming the homograph is the
   spine's instruction; giving it a board row goes one step further and teaches
   the string. It is the safest way to stop the collision stinging, but it does
   put a sense in the learner's head that nothing else in the course uses.
3. **`powinnyśmy`/`powinnyście` missing.** The paradigm you meet is 4-of-6 by
   design, for a stated reason. Say the word if you want it closed.
4. **`powinienem był` at all.** Slide 3 says outright that it belongs more to
   careful speech and writing and that nobody will pull you up for leaving the
   *był* out — the same posture `c1_cond_past` took one node earlier, now twice
   in three units. Two units in a row telling you "you probably won't need this"
   is worth a check before `c1_register` takes the same line a third time.
5. **`sprzątać`.** Last call, and it has now passed. See above.

### Still open after batch 14

- **`c1_which_case` [235]** — still buildable only once path 234 is live. Fourth
  run in a row it has had to wait; **9 nodes to go**.
- **`sprzątać`/`posprzątać`** — no longer "carried"; the last vocab pack has
  shipped without it. James's call or it is out of RUPL for good.
- **`bylibyśmy`/`byliby`**, **`mieli`/`miały`**, **`stali się`/`stały się`**,
  **`stanę`/`staniesz`/`staną`**, **`uważają`**, **`powinnyśmy`/`powinnyście`**,
  **`powinniśmy byli`** — all verified NEW, all deliberately untaught, each
  logged in its own pack's note.
- **The 161 fold variants** whose `accepts` contains the deaccented form of their
  own answer, suppressing the „z ogonkami" correction. Unresolved since the fifth
  repair run; still a one-line script in either direction, still James's call.
- **The vocabulary volume finding** (`codex/LEVEL-AUDIT-2026-08-07.md`) — untouched.

### Next run

`c1_time_minutes` [226] is next in `path_order`, then `c1_dates_full` [227] and
`c1_collective_num` [228] — Block 8, numerals and time. Two warnings for whoever
takes them. **`za` is TAUGHT in the thanking job only** (`b1_polite`), and
`c1_time_minutes` owns its second, time job — *za piętnaście* — so that unit must
name the two-job split the way `b2_prosic_o` named `o`'s. **`c1_time_minutes`
also carries `a2_ordinals_time`'s second fence**, the feminine Nominative hour
(*Jest trzecia*), which that pack called "a THIRD inflected set" and deferred
under load-splitting. And the standing rule holds: **every C1 unit that ships a
new governor must add its row to `data/case-map.json` in the same commit** —
`około` was refused here partly on that ground, and `case-map.json` still has no
rows after `b2_prosic_o` [165] except the ones Block 5 added.

---

## Batch 15 — Block 8 opened: the clock, the calendar, and the third set of numbers

Three units, one commit each, pushed individually. `codex/REPAIR-QUEUE.md` was
checked first and is **still empty** — every one of its 19 packs and 104 items
is ticked, so the whole run went to the build track. The five "Który przypadek?"
units were checked next: four are live and `c1_which_case` [235] is still the
last of the family and still blocked, so this is a C1 build run under step 2 of
the routine.

| unit | path | new strings | commit |
|---|---|---|---|
| `c1_time_minutes` | 226 | 14 | `8773aac` |
| `c1_dates_full` | 227 | 24 production + 8 recognition | `b7e3e34` (+ `b95d3af`) |
| `c1_collective_num` | 228 | 7 | `261e109` |

Audit after each: **0 errors**. Warns held at **6** throughout — the same six
`teaches_empty_grammar` nodes (`a2_prep_review`, `b1_two_futures` and the four
shipped which-case units). Nothing else entered the warn set.

Structure IDs `time_minutes`, `dates_full` and `collective_num` were registered
in `codex/SEQUENCING.md` **and** `audit.py`'s `STRUCTURE_CATALOGUE` before any
audit ran, per the build protocol.

### How the three were verified

Beyond `audit.py` — which only ever checks **declared** tags and so structurally
cannot see a stray Polish word — each pack was run through a token-level checker
over every learner-facing surface (slide `title_pl` / `body_pl` / every table
cell / every example, match rows, quiz choices, cloze frames, and every Pisanie
and Użycie answer and accept) against its own position-aware pool from
`make_pool.py --before <node>`. It also asserts twelve match rows, one `___` per
cloze frame, the Pisanie ≤3-word cap on typed-whole answers, no duplicate
answers or prompts inside a stage under a mirror of the engine's `norm()`, that
no Pisanie frame reconstructs a Użycie sentence, that every declared
`uses_lemma`/`uses_structure` is pool-legal, and that no `teaches_lemma` is
already owned upstream.

**It found three live defects, and a fourth was caught by hand.** All four are
the class the auditor cannot reach:

1. **`c1_time_minutes` declared `do` and `na` in `uses_lemmas`.** Both are the
   function-word artifact C1-SPINE warns about for `na`: they never appear as
   bare lemmas because they live inside multi-word lemmas, and their case jobs
   are carried by the `prep_do_gen` / `na_acc` **structures**. Left in, they
   would have been hard auditor errors. Removed.
2. **`c1_collective_num`'s Użycie item 12 read *Czterej koledzy grają w
   piłkę*.** `piłkę` is TAUGHT (`a2_sport` [94], inside *Mam nową piłkę*), so
   `check_new.py` says yes and the auditor says yes — but **`grać w piłkę` is
   `w` + ACCUSATIVE**, and the only `w` this course has ever taught is
   `prep_w_loc`, `w` + Locative. An untaught governor smuggled in behind a
   taught noun. Replaced with *Czterej koledzy piją kawę*.
3. **`c1_collective_num`'s Użycie item 3 reconstructed a Pisanie cloze frame**
   character for character (*Dwaj studenci są w parku.*). Both moved to
   `w szkole`, which also keeps the deliberate two-shape pair (item 3 and item
   4 are the same English sentence in `dwaj studenci są` and `dwóch studentów
   jest`) intact.
4. **`c1_dates_full` shipped a garbled explain** — "Kwiecień turns its ie into
   ie plus -nia" — corrected in `b95d3af` to what actually happens: the e in
   front of the ń drops and the ń hardens.

**No diacritic-bearing unknown token survived in any of the three packs**, and
the GLUE_LEMMAS pronouns (`on`/`ona`/`my`/`wy`/`oni`/`one`), which the auditor
structurally cannot see, were scanned for by hand across every surface: every
hit was the English word *on* or *one* in explanatory prose. None of the three
units uses a Polish personal pronoun anywhere.

### `c1_time_minutes` — and a correction to the spine that made the unit easier

**The unit pays both of `a2_ordinals_time` [90]'s fences at once**, which is
what the spine asked for: its largest, quoted in its own note — *"wpół do, za
piętnaście, kwadrans po, any minutes-past-the-hour, any half-past or quarter
form"* — and its second, the feminine Nominative hour (*Jest trzecia*), which
that pack called *"a THIRD inflected set"* and deferred under load-splitting.

**The load turned out to be far smaller than four mechanisms suggest, and that
is the finding.** The only genuinely new inflected set is the feminine
Nominative ordinal, and it is the A1 `zgoda` rule (*dobry → dobra*) applied to
twelve ordinals the learner already owns — **fully regular, no exception in the
twelve, derivable rather than memorised**. Everything after `o` / `po` / `do` /
`od` is the **-ej form `a2_ordinals_time` already taught whole**, and
`c1_od_source` [206] has already used it in a Genitive job (*od piątej do
siódmej*), so **not one clock word changes shape anywhere in the unit**. That
left fourteen new strings — twelve hours, plus `wpół` and `po` — for four phrase
shapes, and one idea to hold them together: after half past, Polish stops
counting up from the hour gone and starts counting down to the hour coming.
*Wpół do czwartej is 3:30, not 4:30* is the single fact the learner most needs
and it gets its own slide.

**C1-SPINE O13 is wrong about `za`, and it was checked rather than assumed.**
The spine and the batch-14 digest both say *"`za` is TAUGHT in the thanking job
only (`b1_polite`)"* and instruct this unit to name a two-job split the way
`b2_prosic_o` named `o`'s. In fact **`b1_plans` [104] teaches `za tydzień` and
states the rule in its own explain** — *"za + a stretch of time means that far
into the future"*. So *za piętnaście czwarta* is **not a new job at all**: it is
`b1_plans`' own rule applied to minutes instead of weeks, and the unit anchors
it there explicitly. The two jobs that do need naming side by side are
*dziękuję za* (thanks FOR) and `za` + time (that far ahead), and slide 4 names
both.

**No `case-map.json` row was added, and this was a decision rather than an
oversight.** `po` appears only in front of the closed set of twelve clock words,
taught whole, and the unit **states no case rule about it** — so by the
`b2_which_case` precedent, which refused rows for `za` (`b1_polite`) and
`według` (`b2_discussion_func`) on exactly that ground ("that pack is chunk-lane
— it teaches `situation_chunk`, states no case rule, and its complements are a
closed set"), it does not earn a row. The same reasoning holds for `za`. **Both
remain James's call**, and the `za` question is now sharper than the
`b2_which_case` digest could make it: the word has had two jobs since B1, not
since this unit.

**One line is recognition-only and never drilled:** slide 5 names the digital
reading (*trzecia dwadzieścia*) in a sentence, because the learner will hear it
constantly and it costs nothing new once slide 1 has landed. It appears in no
item. **Deliberately not taught:** minutes above twenty as single words, the
24-hour clock, `w nocy` (`nocy` is NEW), and `po południu` (still not in pool
four levels after `a2_ordinals_time` logged the same absence).

### `c1_dates_full` — the spine's own example is not buildable, and that is the run's loudest finding

The unit's one new thing is small and clean: **a Polish date is two Genitives
with nothing in front of either** — *pierwszego stycznia*, against English's
*on the first OF January*. The day half is not new machinery at all, since
ordinals are adjectives and `b2_adj_gen` [137] has owned `-ego` for a level; the
month half is the real content and it is a **closed set of whole forms** in the
`gen_pl_full` idiom (*marzec → marca*, *kwiecień → kwietnia*, *wrzesień →
września*), with `luty` the odd one because it is an old adjective and so makes
*lutego*.

**But C1-SPINE names this node's example as *piętnastego stycznia*, and that
phrase cannot be built at this path position.** `a2_ordinals_time` taught
ordinals **1st–12th only** — verified, not assumed — so `piętnasty`,
`dwudziesty` and `trzydziesty` are all NEW and none of them is owned. Closing
days 13–31 needs seven teens ordinals, plus `dwudziesty`/`trzydziesty`, plus
every one of their Genitives, plus the compound rule (*dwudziestego piątego* —
**both** words decline): roughly eighteen further strings and a second formation
rule stacked on top of twelve irregular month forms. AGENTS' load-splitting rule
forbids that in one unit, and James's stated reason for the rule — *"if students
get frustrated they give up"* — applies exactly here.

**So production is fenced to days 1–12, and slide 4 says so out loud** rather
than hiding it: the rule for the higher days is named, four rows
(13/15/20/30) are shown as **recognition only**, tagged in `teaches_lemmas` so
nothing leaks past the auditor, and demanded **nowhere** in match, quiz, Pisanie
or Użycie. The slide names the cost in the sharpest available terms — the course
cannot say *dwudziestego piątego grudnia*, Christmas Day.

**This is James's call and it has a cheap fix.** `c1_quantifiers` [229] is the
last numeral unit on the path and is the next-but-one node to be built; it could
absorb the teens ordinals for the price of one slide, since `-nasty` is a rule
the learner has already seen in *jedenaście → jedenasty*. Whoever builds it
should read this section first.

**The node's learner-visible label was corrected at the wire**, per the standing
title instruction from `b1_wrapup`'s digest: `Piętnastego stycznia` →
**`Pierwszego stycznia`**, so the map does not advertise a form the unit never
drills. `label_en` stays *Full dates*.

**Also fenced, logged rather than forgotten:** years (`roku` is NEW), the
Locative month (*w styczniu*, `styczniu` NEW), and **`Którego?` as the date
question** — `którego` is TAUGHT (`b1_ktory_cases` [121]) but **only as a
relative pronoun**, so asking a date with it would be a homograph sting for no
gain. The unit asks with `Kiedy?`, which is owned.

**A near-homograph found in self-review and named on the item:** *maja*, the
Genitive of *maj*, differs from *mają*, the 3pl of *mieć* (`a1_miec` [9]), **by
the ogonek alone** — and the grammar engine's accent near-miss branch makes that
difference live at the keyboard. The *trzeciego maja* Pisanie explain says so.

### `c1_collective_num` — two facts, seven strings, no new machinery

The spine puts collective numerals and `dwaj` in one unit because both are about
counting people. That is defensible here for a reason worth stating: **seven new
strings carry not one new ending and not one new agreement rule.**

`dwoje` / `troje` / `czworo` / `pięcioro` pull the Genitive plural (owned) and
the neuter-singular verb (owned — `b2_num_subject` [159] taught exactly this for
five-and-up), and `dzieci` is its own many-form already, so the four words are
the entire cost. `dwaj` is the shape `b2_num_virile` [160] fenced by name:
*"it is a second system — nominative numeral, nominative noun, plural verb — and
would undo slide 2's entire claim in one line."* That claim (with the
man-numbers there is no 2–4 exception) is a level behind now, so the two shapes
can sit side by side, and slide 3 does exactly that: **dwóch studentów jest ≡
dwaj studenci są**, same meaning, opposite machinery, choose either.

The unit's sharpest single fact is the three-way contrast, which no earlier unit
could state: **`dwóch studentów`** = two male students · **`dwaj studenci`** =
the same thing in the naming shape · **`dwoje studentów`** = one man and one
woman. Same noun, same number, and the numeral is the only thing that says so.

**Deliberate deviation from the spine's letter, logged as required.** The spine
says `dwaj`; the unit teaches **`dwaj`, `trzej` and `czterej`** — the complete
closed set, since there is no nominative virile numeral above four. Teaching one
of three would hand the learner a shape he cannot use at the other two numbers
he meets constantly, which is the half-teaching this course avoids everywhere
else. Two extra strings, no extra mechanism, and slide 3 states plainly that the
set stops at four and that from five up *pięciu studentów jest* is the only
option.

**`b2_num_virile`'s feminine guard is carried forward intact** — that pack called
it *"the most important thing in the pack"*, and it is: `osoba` means person but
is grammatically feminine, so it takes the ordinary numbers (*pięć osób*) and
neither the man-numbers nor the collectives. Quiz item 8 and Użycie item 10 are
that guard. **`kobiet` was wanted for a second guard example and refused** — the
Genitive plural of `kobieta` is untaught anywhere in the course, so `osób` does
the work, which is `b2_num_virile`'s own example.

**Refused, all logged:** collectives with plural-only nouns (*dwoje drzwi* — the
same word in a third job, and `drzwi`/`okulary`/`spodnie` are the only owned
members); the `-oro` set above `pięcioro`, named as continuing upward with **no
forms shown** so nothing untagged reaches the screen; and the oblique numerals
`dwiema`/`dwoma`, which no remaining unit needs.

### For James to smoke — batch 15

1. **`wpół do czwartej` = 3:30.** This is the one thing in the batch most likely
   to be got wrong in the hand, and it is a fact about Polish rather than about
   the unit. Slide 3 does nothing but that, and quiz items 2, 3 and 9 all attack
   it from different angles. If it still slips, the fix is a second pass at the
   Which-one-is-4:30 shape rather than more prose.
2. **A cloze frame that OPENS with the blank.** `c1_collective_num` Pisanie item
   10 is `___ dzieci było w domu.` — the fifth repair run flagged `b2_jesli` #6
   as the first frame to *end* at the blank; this is the first to *begin* at
   one. It should render fine, but it is worth one look, and the answer is
   capitalised (`Pięcioro`) with the lower-case form also accepted.
3. **Days 13–31, and Christmas.** See the `c1_dates_full` section. The course
   currently cannot say *dwudziestego piątego grudnia*, and slide 4 tells the
   learner so. Say the word and `c1_quantifiers` absorbs the teens ordinals next
   run.
4. **`dwaj` / `trzej` / `czterej` against `dwóch` / `trzech` / `czterech`.**
   Użycie items 3 and 4 are deliberately the *same English sentence* in the two
   shapes, back to back. That is honest — Polish really does allow both — but it
   is the first time the course has asked for one sentence twice, and it may
   read as a mistake rather than as a point.
5. **`za` in the map.** The correction above means `za` has carried two jobs
   since `b1_plans` at B1, not since this unit. If you want it in the **Przypadki**
   panel, its row is *za… (that far ahead in time / thanks FOR) → Accusative*,
   and `taught_by` should be `b1_plans` — which would mean backfilling
   `b1_which_case` and `b2_which_case`, exactly as `od` was backfilled in
   which-case batch 2.

### Still open after batch 15

- **`c1_which_case` [235]** — still blocked until the C1 build track reaches path
  234. **Six nodes to go**: `c1_quantifiers`, `c1_concessive`, `c1_cause_time`,
  `c1_neg_polarity`, `c1_comp_analytic`, `c1_register`.
- **Days 13–31 of the month** — new this batch, and the largest open gap in the
  course. James's call; `c1_quantifiers` is the cheapest home.
- **`po` and `za` as `case-map.json` rows** — refused this run on the settled
  chunk-lane precedent, still James's call, now with better evidence on `za`.
- **`sprzątać`/`posprzątać`** — unchanged; the last vocab pack has shipped
  without it.
- **`kobiet`** — the Genitive plural of *kobieta* is untaught anywhere in the
  course, found while writing the feminine guard. One row in any remaining pack
  would close it; nothing in Block 8 or 9 has an honest home for it.
- **The 161 fold variants** whose `accepts` contains the deaccented form of their
  own answer — unresolved since the fifth repair run. None of this batch's items
  adds to the count; every `accepts` here is exact-only.
- **The vocabulary volume finding** (`codex/LEVEL-AUDIT-2026-08-07.md`) —
  untouched.

### Next run

`c1_quantifiers` [229] is next in `path_order`, then `c1_concessive` [230] and
`c1_cause_time` [231]. Two things for whoever takes them. **Read the
`c1_dates_full` section above before starting `c1_quantifiers`** — it is the last
numeral unit on the path and the only cheap home for the teens ordinals if James
wants dates past the twelfth. And the standing rule still holds: **every unit
that ships a new case governor must add its row to `data/case-map.json` in the
same commit**; Block 8 added none, for the reasons logged above, so the map is
unchanged since Block 5.

---

## Batch 16 — `c1_quantifiers`, `c1_concessive`, `c1_cause_time` (Block 8 closed, Block 9 opened)

Three units, one commit each, pushed individually.
`codex/REPAIR-QUEUE.md` was checked first and is still empty, so the whole run
went to the build track. `c1_which_case` [235] remains blocked — its table is
derived and it sits behind three more Block 9 units; see the note at the end.

| unit | path | new strings | new mechanism | commit |
|---|---|---|---|---|
| `c1_quantifiers` | 229 | 7 | none | `fd27b2d` |
| `c1_concessive` | 230 | 2 | none | `41fc864` |
| `c1_cause_time` | 231 | 5 | none | `475da3b` |

Audit after each: **0 errors**, warns **6** throughout — the same six
`teaches_empty_grammar` review nodes (`a2_prep_review`, `b1_two_futures`, and the
four shipped which-case units). Not one of the three units adds a warn, because
all three have real `teaches_*`.

**Fourteen new strings across three units and not one new ending, agreement rule
or paradigm.** That is not a coincidence of the material — it is what Block 8's
tail and Block 9's head actually are, and it is the reason three units could ship
in one run where Block 2 managed two.

### How the three were verified

Beyond `audit.py`, which only ever checks *declared* tags and so cannot see a
stray Polish word, each pack was run through a token-level checker over every
learner-facing surface — slide `title_pl` / `body_pl`, table cells, examples,
match rows, quiz prompts and choices, cloze frames, every `answer` and every
`accepts` string — split into words and checked against that node's own
position-aware pool (`make_pool.py --before <node>`). It also asserts twelve
match rows, one `___` per cloze frame, every answer present in its own
`accepts`, every quiz answer present among its own choices, no typed-whole
answer over three words, no duplicate prompts or answers within a stage under a
Python mirror of the engine's `norm()`, and that no Pisanie frame reconstructs a
Użycie sentence. A second pass scans the *English* surfaces for smuggled Polish.

It earned its keep four times, each caught before the audit ran:

1. **`gazetę` is NEW** — the Accusative of *gazeta* is untaught anywhere; only
   the plural `gazety` is. Wanted twice, in `c1_concessive` and again in
   `c1_cause_time`. This is the same catch the which-case batch made at A2, so
   it is now a standing trap rather than a one-off.
2. **`gotowała` does not exist in the pool.** Only `gotowałam`/`gotowałem` and
   the perfective `ugotowała` are taught, so the 3sg feminine past of *gotować*
   is unavailable — which killed the obvious *Mama gotowała obiad, podczas gdy…*
   and sent every `podczas gdy` sentence in `c1_cause_time` onto
   `pracowała`/`czytał`/`czytała`.
3. **`czekał` likewise** — *czekać* has no past form anywhere in the course
   (`czeka`, `czekaj`, `czekam`, `czekanie` only), which removed a
   `c1_quantifiers` use item.
4. **An untaught `body_pl` line.** `c1_cause_time`'s *podczas gdy* slide read
   *w tym samym czasie*; `tym`, `samym` and `czasie` are all untaught. The
   AGENTS convention admits **metalanguage** on that line, not new lexis — the
   exact defect `b2_which_case` had to fix in `czasem`/`bez`. Replaced with a
   taught example sentence.

A fifth was caught by inspection rather than by the checker: a
`c1_quantifiers` quiz distractor read **`pięć złotów`**, which is a fabricated
non-word and banned outright. `pięć dolarów` replaced it and discriminates the
currency instead, which is the better item.

### `c1_quantifiers` — and the case-map row Block 8 finally owed

`wiele` / `kilka` and their virile partners `wielu` / `kilku` behave in every
particular like `pięć` / `pięciu`: Genitive plural on the noun, the
neuter-singular verb `b2_num_subject` taught for five-and-up, and the identical
men-versus-everything split. Four words, no rule. `złoty` / `złote` / `złotych`
is the currency `a2_shopping2` omitted **by name** — *"it declines adjectivally
(pięć złotych) and teaching it would invite \*pięć złoty"* — and `c1_adj_pl_gen`
has since taught `-ych`, so the stated objection is gone.

The money half is anchored on **`dolar`**, and that was checked rather than
assumed: `dolar`, `dolary` and `dolarów` are all TAUGHT, so an ordinary money
noun stands beside the adjectival one and the contrast carries the slide instead
of a rule. Same shape `c1_na_acc` used with its two owned `na` chunks.

**This is the first C1 unit since Block 5 to add a `case-map.json` row**, and it
adds exactly one: `wiele · wielu · kilka · kilku` → Genitive, `taught_by:
c1_quantifiers`, landed in the same commit as the unit. Blocks 8 and 9 owe
nothing further — `mimo że` and `podczas gdy` are conjunctions and govern
nothing, on which see below.

### The `dużo` problem, and the rule this batch settled for the rest of the course

`dużo` is TAUGHT [32] and is **correct Polish wherever `wiele` takes a countable
plural**. Marking it wrong would be precisely the false-wrong James smoke-flagged
on 2026-08-07. So slide 1 states the relationship plainly rather than pretending
the words compete, and every *many* item in Pisanie and Użycie carries the `dużo`
variant in `accepts`. `kilka` has no such twin, which is why the `kilka` items
are the clean ones.

The same problem then arrived twice more, and the answer generalised into a rule
the two later units follow:

> **Where two taught words are genuine synonyms, they are never offered as
> competing quiz choices, and the owned one always sits in `accepts`.**

Concretely: no Kontrola item in `c1_concessive` offers `chociaż` beside
`mimo że`; no item in `c1_cause_time` offers `jeśli` beside `jeżeli`, `kiedy`
beside `gdy`, `dlatego` where `więc` would also be right, or `bo` where
`dlatego że` would. Every one of those items discriminates the new word against
an owned joiner that is genuinely *wrong* in the slot — which is also the sharper
lesson, since the best pair in the batch is `bo` against `chociaż`: the same two
clauses, opposite claims.

**The cost, stated plainly:** a learner can pass several Użycie items in
`c1_cause_time` without ever typing the new word, because `bo`, `więc`, `Kiedy`
and `Jeśli` are all accepted. That is deliberate — production of each new form is
forced once in Pisanie, where the English gloss names the form and no synonym can
fill the slot, and Użycie is where the sentence is assembled rather than where
the word is drilled. If James would rather Użycie forced the new word, the fix is
to strip the synonym variants from `accepts`, and it is a one-line script.

### `c1_concessive` — two words, and two fences

`chociaż` and `mimo że`, invariable, on clauses the learner can already build.
`b2_conjunctions`' idiom exactly, with the `ale` / `bo` / `więc` / `chociaż`
contrast taught by table rather than derived.

Two fences, both deliberate:

- **`choć`** — the everyday short form of `chociaż` — reports NEW and is **not
  shown**. Putting it on screen untagged would breach the every-form-taught rule,
  and teaching it would be a third word in a unit whose whole point is that it
  costs nothing. It is a one-line addition to slide 1 plus a `teaches_lemmas`
  entry if James wants it. `jednak`, `natomiast` and `pomimo` are out on the same
  reasoning.
- **Bare `mimo`** is a **preposition governing the Genitive** (*mimo deszczu*) —
  a new case governor, which would owe its own `case-map.json` row and is a
  second fact about the word. The unit teaches `mimo że` as one indivisible
  joiner and says on the slide that the two words are never separated.

The `że` inside `mimo że` is **named**, not left to collide with `b2_ze_clauses`'
complementiser: slide 2 says in one line that here it has no verb of saying
anywhere near it and the two words together are the joiner. The
chunk-versus-slot treatment `dziękuję`, `której` and `nowego` all received.

### `c1_cause_time` — the `że` that reverses the sentence, and two IOUs paid

Five new strings and the batch's biggest word-count, but a **smaller** load than
its size suggests: `jeżeli` and `gdy` are the formal twins of `jeśli` and
`kiedy` that `b2_jesli` fenced by name, and they are a line each rather than a
fact.

The headline is the reason bare `dlatego` and `dlatego że` share a unit instead
of splitting: **one word, and the `że` decides which way it points.**
*Idę do domu, dlatego że jestem zmęczony* points backward at the reason;
*Jestem zmęczony, dlatego idę do domu* points forward at the result. Slide 1 is
a 2×2 against the owned pair `bo` / `więc`, which point the same two ways — so
the new material lands inside a frame the learner already has, and the whole
lesson is one syllable.

This pays **`b2_conjunctions`' logged scope cut in full**. That pack dropped
`dlatego` *because* its everyday partner `dlatego że` was on the C1 list and it
refused to ship "a half-taught pair pointing at a fenced construction". Both
halves land here together, which is the entire reason the cut was made.

**Bare `podczas` is fenced exactly as bare `mimo` was one node earlier** — alone
it governs the Genitive (*podczas obiadu*) and would owe a case-map row. Two
units in a row have now hit the same shape: a two-word conjunction whose first
word is a preposition in disguise. Worth knowing when Block 9's remaining units
reach for `zanim`, `dopóki` or anything of that kind.

**`b2_jesli`'s two holds are both paid, and neither costs a lemma.** The reversed
clause order rides slide 3 as reinforcement (`c1_concessive` established it one
node back for `chociaż`). The **resumptive `to`** — *Jeśli masz czas, to zrobię
obiad* — is shown, stated to add nothing and to be droppable at will, and carried
in `accepts` on every Użycie item whose condition comes first. It is **never
demanded**, which is the conservative reading of an item `b2_jesli` held rather
than refused.

### Where the Pisanie blanks landed, and where they could not

Both Block 9 units hit the wall `b1_vocative_chunks` hit first: a unit whose
teaching points are a **small closed set of invariable words** cannot put them in
twelve Pisanie slots without breaking the no-duplicate-answers rule, because
`norm()` lowercases and a sentence-initial *Chociaż* collides with a bare
*chociaż*.

The two units answered it the same way, and it is worth ruling on once:

- **Items 1–N are the new joiners typed bare**, with an English gloss that names
  the form (*"because (the fuller two-word form)"*). This is `b2_conjunctions`'
  own genre and — given the synonym rule above — the **only** shape in which the
  new word can be demanded with nothing else able to fill the slot.
- **The remaining items are clozes with the joiner printed in the frame**,
  blanking the load-bearing form of the clause. Logged per the repair-queue's
  fallback clause. The learner still reads the pattern whole while producing the
  clause content, and sentence-level production of the joiners lives in Użycie,
  where the whole sentence is typed.

`c1_quantifiers` did not have this problem — its seven strings gave nine clean
teaching-point items — and one of its blanks (`sklepów`, item 11) falls on the
governed noun rather than the quantity word, which is the ending `kilka`
actually chooses.

### Homographs, checked not assumed

- **`drogi`** is used only in its TAUGHT sense, *expensive* (`leaf_shopping_a1`
  [20]). C1-SPINE **O13** names this as the trap and it is why the C1 capstone is
  not titled *Koniec drogi*. The **feminine `droga`** was refused outright in a
  `c1_concessive` use item, because the learner reads that string as the noun.
- **`złoty`** reports NEW in all four forms, so the adjective *golden* is not in
  the course and there was no collision to name. It is never boarded beside
  `żółty`.
- **`osób`, `kluczy`, `kolegów`, `lekarzy`, `studentów`** are used only in their
  Genitive-plural jobs. `klucze`, `koledzy`, `studenci`, `osoby` appear only as
  wrong-slot distractors, which is what they are — real taught forms in the wrong
  case, never fabricated words.

### Open for James — carried forward and added to

- **Days 13–31 of the month.** Carried from batch 15, which named
  `c1_quantifiers` as the cheapest home. It was **not** taken there. `c1_dates_full`
  taught `trzynastego`, `piętnastego`, `dwudziestego` and `trzydziestego`;
  `czternastego`, `szesnastego`, `siedemnastego`, `osiemnastego`,
  `dziewiętnastego` and `trzydziestego pierwszego` are all still NEW. Bolting a
  third inflected set onto a unit already carrying two counting systems would
  have broken the load-splitting rule outright, and the gap is a **word-list**,
  not a mechanism — the learner who owns *piętnastego stycznia* can read any of
  them. **Block 9 has no honest home for it either**; if it is to be closed, it
  is a note on `c1_wrapup` or a one-off addition to `c1_dates_full`, and it is
  James's call.
- **`choć`** — new this batch. One line if wanted; see above.
- **`za` and `po` as `case-map.json` rows** — unchanged, still James's call.
- **The synonym-in-`accepts` policy** — new this batch, applied three times, and
  the one thing in this run most worth a smoke test. See the cost stated above.
- **`kobiet`, `sprzątać`/`posprzątać`, the 161 fold variants, the vocabulary
  volume finding** — all unchanged. No item in this batch adds a fold variant;
  every `accepts` entry here is either the exact answer, the no-final-stop
  variant, or a genuine alternative wording.

### Next run

`c1_neg_polarity` [232], `c1_comp_analytic` [233] and `c1_register` [234] are the
last three teaching units before `c1_which_case`. Two things for whoever takes
them:

1. **`c1_which_case` [235] unblocks the moment [234] is live.** Its table is
   derived from `data/case-map.json` filtered to `taught_by` at or before its
   path position, and the map is now complete through [229]. If any of the three
   remaining units ships a governor — `c1_neg_polarity` is the one to watch,
   since `żaden` rides `neg_gen` rather than adding a trigger — its row must land
   in the same commit.
2. **`c1_comp_analytic` will hit the synonym problem head-on.** `bardziej` +
   adjective and the `-szy` comparative are not freely interchangeable, but the
   line between them is a tendency and not a test — C1-SPINE says so explicitly.
   Read this batch's synonym rule before authoring its Kontrola stage; the
   temptation to mark a defensible answer wrong will be stronger there than it
   was here.
