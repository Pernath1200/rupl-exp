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
