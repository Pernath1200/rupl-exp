# "Który przypadek?" build digest

Running log for the five case-selection units specified in
`WHICH-CASE-SPEC.md` (James-locked, 2026-08-07). They live in their own digest
rather than in `A1-`/`A2-`/`B1-`/`B2-`/`C1-DIGEST.md` because they are one
family with one contract, built as a block, and spread across five levels — a
reader chasing "why does the A1 map say X" should not have to guess which
level's digest holds the answer.

Each entry: what shipped, judgment calls, and anything James should smoke-check.

**The contract, in one line:** these units teach NOTHING new
(`teaches_lemmas: []`, `teaches_structures: []`), they are organised by
TRIGGER rather than by case, and their intro table is DERIVED from
`data/case-map.json` filtered to rows whose `taught_by` sits at or before the
unit on `path_order` — never authored from memory.

---

## Batch 1 — `a1_which_case`, `a2_which_case`, `b1_which_case`

Three of the five shipped, in `path_order` order, one commit each, pushed
individually. `codex/REPAIR-QUEUE.md` was checked first and is still empty, so
the whole run went to these units.

| unit | path | derived rows | cases | commit |
|---|---|---|---|---|
| `a1_which_case` | 44 | 9 | 5 | `ecf8f5d` |
| `a2_which_case` | 97 | 15 | 6 | `d73a167` |
| `b1_which_case` | 129 | 17 | 6 | `c6e8ee7` |

Audit after each: **0 errors**. Warns went 2 → 5, and all three new ones are
the `teaches_empty_grammar` class the genre necessarily produces — the same
warn `b1_two_futures` and `a2_prep_review` have always carried. Nothing else
changed in the warn set.

### How the units were verified

Beyond `audit.py` (which only ever checks *declared* tags and so cannot see a
stray Polish word), each pack was run through a token-level checker written for
this batch: every Polish string the learner is shown or asked to produce —
match rows, quiz choices, cloze frames and answers, Użycie answers, slide
`title_pl` / `body_pl`, slide `examples` — was split into words and checked
against the position-aware pool for that node (`make_pool.py --before <node>`).
Bare prepositions and the case-name metalanguage were whitelisted explicitly
and nothing else was. It also asserts twelve match rows, empty `teaches_*`,
one `___` per cloze frame, no duplicate answers or prompts inside Pisanie /
Użycie / Dopasuj, that no Pisanie frame reconstructs a Użycie sentence, and
that every declared `uses_lemma` is actually in the pool.

Two of its rules were deliberately relaxed after checking the course rather
than assuming: repeated quiz *answers* are normal house style (52 of 134
grammar packs have one) and AGENTS.md's no-duplicates rule is about repeating
an *item*, which the prompt check still catches; and grammatical metalanguage
(`mianownik`, `liczby mnogiej`, `przyimek`, `rodzaj`) is allowed in the Polish
shorthand lines by the convention AGENTS.md states.

### Case-map fixes — the source of truth was wrong in three places

`data/case-map.json` feeds both these units and the in-app **Przypadki** panel,
so a bad row leaks twice. Deriving the tables surfaced three defects, all fixed
in the commit of the unit that found them:

1. **`mało` was named as an A1 Genitive governor.** The quantity row read
   `dużo · mało · blisko` under `taught_by: a1_gen_endings`. `check_new.py` puts
   `mało` at `b1_adverb_comp` [126], and there it is a degree adverb in the
   `mniej`/`najmniej` ladder — never a noun-governing quantifier. Row is now
   `dużo · blisko`, the two governors `a1_gen_endings` actually teaches. **No
   `mało` row was invented**, because the course never teaches it as a governor
   anywhere; inventing one would have been exactly the authoring-from-memory the
   spec forbids.
2. **`to są` was dated a whole level early.** The naming row read
   `to jest… / to są…` under `a1_gender` [1], but `to są` is `a2_plural_nom`
   [56] and A1 owns no plural noun to put after it. Row split: `to jest…` stays
   at `a1_gender`, and a new `to są…` row sits at `a2_plural_nom`, where it is
   true and where `a2_which_case` picks it up.
3. **`daję` was dated two units early.** The Dative row read
   `pomagam · dziękuję · daję` under `b1_dative_sg` [118], which teaches only
   `pomagać` and `dziękować`; `dawać`/`oddawać` land at `b1_giving` [120], whose
   own note records that `b1_dative_sg` deferred them. Row split accordingly.
   This one does not change any derived table (both nodes are before
   `b1_which_case`) — it is purely a panel fix.

**A fourth, of the same class, was found and deliberately NOT changed —
James's call if he wants it.** Several rows carry a `taught_by` that names
where the *structure* lands rather than where the last word in the trigger
string lands, so the panel can show a word a few units before the learner meets
it. The clearest is the Accusative row `mam · piję · chcę · lubię · kupuję`
under `a1_miec` [9]: `lubię`, `piję` and `kupuję` arrive at [16], [17] and [18].
The conservative fix (bump `taught_by` to `a1_present_uje`) would hide the
Accusative row from a learner at [9–17] who is actively drilling `Mam kawę` —
which is worse than the leak. Splitting the row is possible but starts
multiplying rows for one idea. Left alone, flagged here.

### Judgment calls, per unit

**`a1_which_case` — the spec's own "z does two jobs" line was not written.**
This is the one place the batch departs from its brief, and it was checked
rather than assumed: `a1_prep_do_z` teaches `z` + Genitive (origin) only, and
`z` + Instrumental is `a2_inst_z` [64]. At path 44 `z` has exactly **one** job.
Writing the spec's line would have been false at that position *and* would have
broken the spec's own harder rule that cases the level has not taught appear
nowhere. The point is real and it became `a2_which_case`'s headline slide
instead. **If James disagrees, the fix is in `a2_which_case`, not A1 — there is
nothing true to say about a second job of `z` one level down.**

**`a1_which_case` — a fact worth having found.** `domu`, `parku`, `banku` and
`hotelu` are the *same string* in the Genitive and the Locative, so on those
nouns the trigger is the only thing that identifies the case. That got its own
slide. `a2_case_gym2`'s note names the same dual duty, so the unit is consistent
with what already ships; A2's version of the slide is `praca`, which collapses
its Genitive and Locative into `pracy` across four different prepositions
(`do` / `z` / `w` / `o`) and is the sharper example.

**`a2_which_case` — the spec's "mi/mnie Dative chunks" was narrowed to `mi`.**
`mnie` is **not** Dative: `a2_dat_chunks` teaches it inside `boli mnie`, an
Accusative experiencer that `b2_pron_acc` later explains as such (the C1 spine
records this too). Naming it Dative would have planted a claim the learner has
to undo at B2. `mnie` therefore appears nowhere in any of the three units — not
in a table, not as a distractor.

**All three — Kontrola is 8 form-choice + 4 name-the-case.** The spec
authorises both shapes ("name the case, or pick the right form"); AGENTS.md
says Kontrola wants "real forms, not meta-questions *about* the language". The
two-thirds/one-third weighting is the conservative reading of both: naming the
case is this unit's actual teaching point rather than trivia, but real forms
still carry the stage. **If the naming items feel like quiz-show questions in
the hand, they are the four to cut or convert.**

**All three — distractors.** Every one is real, pool-legal Polish. Where an A1
noun had only three taught forms, the fourth choice is a *different trigger*
carrying its own correct form (`dużo kawy` / `mam kawę` / `to jest kawa`), which
discriminates the governor rather than inventing a word. `a1_case_gym`'s own
`kawie` distractor was **not** copied — it is untaught at that position.
`mamy` was avoided everywhere: it is the verb *we have* from `a1_miec`, never
the Genitive of *mama* (AGENTS.md's own homograph example). One distractor was
chosen against the obvious one and is worth knowing about: `a1_which_case` item
8 offers `mam książka` (plain wrong case) rather than `mam książki`, because
`książki` is the Genitive singular *here* but becomes a correct Nominative
plural at `a2_plural_nom` — marking it wrong at A1 would plant a mis-learning
twelve units before it is corrected.

**Words wanted and refused**, all caught by the pool rather than by eye:
`mało` (A1, above), `gazetę` (A2 — the Accusative of *gazeta* is untaught; only
the plural `gazety` is, so Pisanie blanks `książkę` instead), `wraca` (A2 — the
chunk lane taught `wracam`/`wracasz` only, and `a2_chodzic` closed the *iść*
grid, not *wracać*), `filmu` (B1 — so the Genitive relative example is
`b1_ktory_cases`' own `film, którego nie ma`), `samochodu`, `o książce`,
`o filmie`.

### For James to smoke

1. **The title.** All five units are titled `Który przypadek?` — your own
   naming, locked in the spec, and it carries two untaught words at A1
   (`który` arrives at `a2_questions2`; `przypadek` is metalanguage). It was
   kept as specified rather than softened, on the precedent that
   `a1_case_gym` already ships as *Przypadki · trening* one node later. Say
   the word if you want a learner-English title on the map instead.
2. **The nine-row A1 table on one slide.** It is the whole lesson and it is
   derived, so it cannot be trimmed without dropping a trigger the learner
   owns — but it is the densest single slide in A1. If it reads as a wall, the
   split is by case (Nominative + Accusative on one slide, the four Genitive
   triggers on the next, Locative + Instrumental on a third), not by cutting
   rows.
3. **`b1_which_case`'s two `który` Pisanie items** blank `którą` and `którego`
   *inside* a relative clause — the only items in the batch where the blank is
   not a noun. In those items the pronoun is the form the trigger chooses, so
   blanking the noun would have missed the point entirely.
4. **The Dative slide in `b1_which_case` restates the endings**
   (`mamie`/`tacie`/`siostrze`/`bratu`/`studentowi`/`nauczycielowi`) as a table.
   Every form is `b1_dative_sg`'s, so it is recycling and `teaches_lemmas`
   stays empty — but it is the closest any of these units comes to looking like
   a teaching unit, and it is worth a glance to confirm it reads as a reminder
   rather than as a new paradigm.

### Next run

`b2_which_case` (path 180, before `b2_case_gym`) and `c1_which_case` (path 235,
before `c1_case_gym`) are still `planned`. Per the spec, B2 folds in the
adjective agreeing in all five cases, negation taking the Genitive on **any**
verb, `prosić o` + Accusative as `o`'s second job, and the three plural obliques
`-ach`/`-ami`/`-om`. C1 is the whole system on one page and is the last teaching
unit of the course before the capstone — it should be built **after** the C1
units that feed it, since its table is derived and will otherwise be missing
`na`/`przez`/`od` and the Genitive-taking verbs. Note that `c1_which_case` sits
at path 235, so on the current tree it is the **second-to-last** thing to
build; the C1 build track has to reach it. `b2_which_case` has no such
dependency and can be built next.

**Reminder for whoever builds them:** `data/case-map.json` currently has no
rows for anything after `b2_prosic_o` [165]. Every C1 unit that ships a new
governor (`c1_na_acc`, `c1_przez`, `c1_od_source`, `c1_gen_verbs`) must add its
row in the same commit, or `c1_which_case` will derive a table that is missing
its own level.
