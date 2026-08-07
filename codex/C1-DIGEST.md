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
