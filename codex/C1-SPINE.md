# C1 Spine — drafted 2026-08-07 by the cloud routine (James not present)

Status: **AGENT-AUTHORED DEFAULT, not a James-locked design.** Same standing as
`B2-SPINE.md`: B1-SPINE recorded eight decisions James made interactively;
nobody made those decisions for B2 or for C1. So every real fork below was taken
on the **clearly conservative, most load-split** path and logged in the section
immediately following, with the alternative spelled out. Where this document and
James disagree, James wins — overrule anything in that section and the build
agents will follow the amended spine.

Everything else carries forward unchanged: AGENTS.md's authoring contract
(anchor rule, stage contracts incl. the Pisanie ≤3-word cap and the
composed-sentence cloze rule, the gyms drill-only-what's-hard rule, homograph
trap, load-splitting, gender badges, title rules, glossing rules), the build
protocol that produced A2, B1 and B2, B1-SPINE decision #8, and every
**James-locked** decision from B2-SPINE's Block 6a overrule.

**C1 IS THE LAST LEVEL.** That changes what this document has to be. B1-SPINE
and B2-SPINE could defer; this one cannot. Anything not scheduled below is not
deferred — it is **permanently out of RUPL**, and §"What C1 refuses, and why"
says so item by item. The reconciliation table in §"Inbox → disposition" carries
**every** IOU found by an independent sweep of both digests and all 175 pack
notes, each mapped either to a unit or to a logged refusal. No inbox item is
silently dropped.

**Size: 53 nodes** (48 grammar/chunk, 3 vocab, 2 permanent station placeholders).
For calibration: A1 = 48, A2 = 53, B1 = 30, B2 = 45. The last level is the size
of the level that opened the case system, which is the right shape for a level
whose whole job is closing it.

---

## What this run actually verified

The B2 digest's closing warning was taken literally — *"Whoever writes
`C1-SPINE.md` should assume its own inventory is wrong until checked."* Every
claim below marked NEW or TAUGHT was run through `check_new.py` against the 172
live nodes (2506 taught forms) during this scoping run, not inherited from the
inbox. **Six inbox claims turned out to be wrong or stale**, and they changed
the design:

| Inbox said | `check_new.py` says | Consequence |
|---|---|---|
| `pójść`/`pojechać` are C1 material (`b2_prefix_two_jobs` "logged for C1") | **TAUGHT** ← `b2_motion_prefixes2` [164] | That was a fence *inside one unit*, not a level hand-over. Removed from the inbox; C1 owes nothing. |
| `pożyczać` in the borrow-**from** sense needs a new governor (item 13) | `pożyczać` **TAUGHT** [118], `od` **TAUGHT** ← `a2_superlatives` [91] | Only the **second job of `od`** is missing (source, not comparison). Shrinks a unit to a small governor-homograph unit — the `b2_prosic_o` shape. |
| `boleć` and its verb class are untaught (item 24) | `boleć` **TAUGHT** [42], `bolą` **TAUGHT** [84] | The forms exist and `b2_pron_acc` already explained *boli mnie*. Only the class as a productive category is open — refused, see O12. |
| `znać` must be taught alongside `wiedzieć` | `znać`/`znam` **TAUGHT** ← `a1_present` [15] | The `wiedzieć`/`znać` split costs **one** paradigm, not two. Cheap enough to move to the second unit of the level. |
| `dzieci` is a suppletive still owing a unit | **TAUGHT** ← `a2_family2` [57] | `c1_suppl_pl` is `oczy`/`uszy`/`ręce` only; `dzieci` is its anchor. |
| a `na` + Accusative unit has no anchor | `na spacer` **TAUGHT** [93], `na czas` **TAUGHT** [108] | Two frozen `na` + Accusative chunks have been in the learner's mouth since A2. `c1_na_acc` gets the same "you already say this" opener `b2_adj_acc` and `b2_verbal_nouns` had. |

One tooling note for whoever builds Block 5: **`check_new.py` reports the bare
preposition `na` as NEW**, because `na` never appears as a bare lemma — it lives
inside multi-word lemmas (`na stole`, `na biurku`, `na spacer`) and its Locative
job is carried by the `prep_w_loc` *structure*. That is a function-word artifact,
not a finding. `na` has been on screen since A1. Do not "teach" it.

---

## Open for James to overrule

Each item is a genuine fork. The **Default** is what the build agents will do
unless told otherwise; the **Alternative** is the option that was rejected and
why. These are C1's O-numbers and are distinct from B2-SPINE's.

### O1 · 53 nodes, and a named trim if that is too many

**Default:** 53. C1's inbox is 60-odd distinct items across both digests and
every pack note. Closing them at one-new-thing-per-unit produces this many; the
alternative to size is not a smaller C1 but a course that ends with fences still
standing and no level left to pay them.

**Alternative — the trim, named so it is a decision and not an erosion.** If C1
must be shorter, cut in this order and nothing else: `c1_verb_family4` (decision
#6 says "further families", two is already a reading), `c1_ea_shift` (fold into
`c1_past_gaps`), `c1_adj_pl_loc` (fold into `c1_adj_pl_gen` — one ending, two
governors, which is the merge B2's O2 refused), `c1_dates_full` (fold into
`c1_time_minutes`), `c1_evaluation`, `c1_register`, `c1_part_adv`,
`c1_collective_num`. That lands at **45**, the size of B2. Below 45 the block
ladders start breaking and the cuts stop being safe.

### O2 · The plural adjective gets four teaching units, a virile unit and a gym

This is the single largest untaught system left — B2-SPINE **O3** sent it here,
and **nine consecutive B2 units shipped bare-noun because of it** (`b2_loc_pl`
through `b2_sie_impersonal` each logged the same line). Verified NEW: `dobrych`,
`dobrymi`, `mali`, `duzi`, `zmęczeni`.

**Default:** split by case, exactly the ladder B2's O2 used, and it is shorter
here because the plural paradigm is smaller than the singular:

| unit | new endings | why it sits here |
|---|---|---|
| `c1_adj_pl_gen` | `-ych` | one ending, one governor; the Genitive is where quantity words already live (*dużo dobrych książek*) |
| `c1_adj_pl_loc` | **none** | `-ych` again, second job — the `b2_adj_inst` idiom, fifth turn |
| `c1_adj_pl_inst` | `-ymi` | one ending; rides `z` + Instrumental, owned since `a2_inst_z` |
| `c1_adj_pl_dat` | `-ym` | one ending; rides B1's dative verbs and `b2_dat_pl`'s `-om` nouns |
| `c1_adj_pl_virile` | virile Nom `-i`/`-y`, virile Acc `-ych` | the men-group forms, plus the **plural predicate adjectives** `b2_copular_future` fenced (*Jesteśmy zmęczeni*) |
| `c1_adj_pl_gym` | — | see O11 |

**Alternative:** merge `c1_adj_pl_gen` + `c1_adj_pl_loc` (identical ending) →
one fewer unit. Rejected for the same reason B2 refused to merge `b2_adj_loc` +
`b2_adj_inst`: different governors, and the course has never taught two
governors in one unit. It is the first item on O1's trim list precisely because
it is the most defensible merge.

### O3 · Productive semantic prefixation is the ONE inbox item C1 refuses — and it is a real conflict

**This needs James's eye more than anything else in this document.**

B2-SPINE's hand-over list, item 5, sends *"productive semantic prefixation
(`pod-`, `prze-`, `roz-`, `wy-` on non-motion verbs)"* to C1. But James's own
**LOCKED** Block 6a overrule then said, in decision #1: *"Free derivation is
never asked for and never implied to work"*, and in decision #2 that any *"lens
extension beyond the core 4 prefixes"* is *"James's call, not the scoper's."*

Those two instructions cannot both be executed. O7.3 was written **before** the
overrule; the overrule is James's and is locked. A scoping agent may not
unilaterally lift a locked decision.

**Default:** C1 does **not** teach productive prefix semantics, and does not
extend the lens past `wy-`/`przy-`/`do-`/`od-`. It pays the strand instead the
way locked decision **#6** explicitly authorises — *"further families are C1
material"* — with `c1_verb_family3` (the `płacić` family: `dopłacić`,
`przepłacić`, both verified NEW) and `c1_verb_family4`. Plus `c1_sec_imperf`,
which decision #4 makes mandatory.

**Alternative:** build a productive `pod-`/`prze-`/`roz-` unit as O7.3 asks. It
requires James to say out loud that decision #1 is lifted for C1. If he does,
the unit slots after `c1_verb_family4` and the two families can shrink to one.

### O4 · The Vocative stays closed, permanently

B1 decision **#4** was James's own, made interactively: *"Chunk-lane only…
Never taught as a case, no endings rule."* B2-SPINE's O15 carried it forward and
listed the case treatment (item 7b) and the general proper-name pattern (item
18) as C1 material *"if James ever overrules B1 decision #4."*

**Default:** he has not, so it stays closed and the course ends with the
Vocative as six memorised address chunks. Logged as a **refusal**, not an
oversight — see O12.

**Alternative:** two units (`c1_vocative_rule` for the feminine `-o`/`-u`/`-i`
endings, `c1_vocative_names` for `Piotrze`/`Anno`). Only James can open this.

### O5 · Adverbial participles: `robiąc` produced, `zrobiwszy` recognition-only

**Default:** `c1_part_adv` teaches the contemporaneous `-ąc` participle as
production (*Robiąc obiad, słuchałem radia*) and shows `zrobiwszy` on one slide,
named as literary and never demanded. Both verified NEW.

**Alternative:** teach both, or drop `zrobiwszy` entirely. Rejected in both
directions: teaching it is a second formation for a form this learner will read
in a book and never say; dropping it silently would leave the only anterior
participle unnamed in the last level of the course.

### O6 · Word order gets one unit, deliberately two-shape and recognition-leaning

Inbox item 19 (`a2_sie`'s clitic fence, `b2_pron_acc`'s "fuller story left to
C1", `b2_sie_impersonal`'s refusal to claim *się* goes second, `b2_ze_clauses`'
object-clitic-in-subordinate-clause note, `b2_num_subject`'s and
`b2_plural_gym`'s held inversion).

**Default:** `c1_word_order` shows **two** shapes as a picture and states in
plain English that Polish word order is freer than English and that stress moves
with it — the `a2_jechac` / `b2_sie_impersonal` treatment. It covers: where an
object pronoun stands relative to the verb, *się* in a clause that starts with
something else, inverted counted subjects (*W domu było pięć okien*), and
sentence-initial emphatic `jego`/`ciebie`.

**Alternative:** a full clitic-position and topic-comment treatment. Rejected —
it is a genuine research area, and the AGENTS line that governs here is the same
one that killed the fleeting-e rule in `b2_gen_pl_full`: *this learner gets no
value from a rule he cannot trust.*

### O7 · Register (item 22) is a chunk-lane situations unit, not a systematic topic

**Default:** `c1_register` is genre-`b2_discussion_func` — the same errand said
formally and casually, side by side, using material the learner already owns
(*Cześć* / *Dzień dobry*, *Chcę* / *Chciałbym*, *Możesz…?* / *Czy mógłby pan…?*).
Zero or near-zero new lemmas.

**Alternative:** treat formal/colloquial and the written/spoken split as a
system. Refused — it is a lifetime's material, not a unit. See O12.

### O8 · Three vocab packs, not four

**Default:** `c1_evaluation` (evaluative adjectives), `c1_society` (society,
values, environment), `c1_nuance` (hedging and precision adverbs). C1's inbox is
overwhelmingly grammar closure, and the vocab-register principle forbids
revisiting A1/A2/B1/B2 topic domains — after four levels there is genuinely less
register left than there was at B2.

All three packs' candidate words were verified NEW this run: `łatwy`, `trudny`,
`gotowy`, `pusty`, `pełny`, `dziwny`, `zwykły`, `oczywisty`, `konieczny`,
`możliwy`, `niemożliwy`, `skuteczny` (evaluation); `społeczeństwo`,
`środowisko`, `wartość`, `korzyść`, `wolność`, `sprawiedliwość`, `obowiązki`,
`nauka`, `technologia` (society — the first four are `b2_abstract`'s own logged
drops, coming home); `pewnie`, `naprawdę`, `dokładnie` (nuance — all three are
`b2_discussion_func`'s logged drops). Anchors, never re-taught: `wpływ`,
`przyczyna`, `skutek`, `zaleta`, `wada`, `cel` (`b2_abstract`); `wolny`,
`zajęty`, `ciekawy`, `nudny` (`leaf_freetime_a1`); `kultura`, `historia`,
`sztuka`, `prawo`.

### O9 · Two more root families, not more

Locked decision #6 says *"further families are C1 material"* — plural, no
number. **Default:** two, mirroring B2's two (`b2_pisac_family`,
`b2_verb_family2`). `c1_verb_family3` is the `płacić` family (`zapłacić` owned →
`dopłacić`, `przepłacić`); `c1_verb_family4` is the author's pick, logged, with
the `pisać` extension (`opisać`, `przepisać` — both verified NEW, both named as
"if load allows" in `b2_pisac_family`'s own scope cut) as the obvious candidate.

### O10 · The `wiem` quarantine is lifted at unit 2 of the level

The standing quarantine dates to `a2_directions_func` (*"never conjugates
wiem"*) and was re-held by `b2_ze_clauses`, `b2_indirect_q` and `b2_double_neg`
— the last of which could not even use the spine's own headline phrase *Nikt nie
wie* because `wie` is NEW. `b2_indirect_q`'s digest entry states the cost
plainly: **"Dad can say 'I don't know where…' but not 'Do you know where…?' —
which is the more useful sentence in a street."**

**Default:** lift it early — `c1_wiedziec` is the **second** unit of C1, not a
Block 7 tidy-up. It is cheap (`znać`/`znam` are TAUGHT since A1, so the
`wiedzieć`/`znać` split costs one irregular paradigm, not two) and it unblocks
question-asking for the whole rest of the level.

**Alternative:** leave it late, or leave it closed. Rejected — four packs have
now paid for this fence and it buys nothing further.

### O11 · One new gym, plus the mandatory closer

AGENTS' gyms rule: *"A gym earns its path slot ONLY when it drills endings that
are genuinely hard at that stage (case endings, virile alternations — the
cliffs)."* `a2_past_gym` was retired for failing exactly this test.

**Default:** `c1_adj_pl_gym` earns its slot — three new strings (`-ych`, `-ymi`,
`-ym`) spread across five jobs plus a virile split, which is a case-ending
cliff by the rule's own definition, and the `-ych`-does-three-jobs collision is
precisely what massed discrimination is for. `c1_case_gym` is the level closer
in the `b1_case_gym`/`b2_case_gym` line. **No other gym anywhere in C1** — every
other C1 system recycles through later units' sentences, which the rule names as
the default mechanism.

### O12 · What C1 refuses — and therefore what RUPL will never teach

C1 being last makes these permanent. Each is a real inbox item, refused with a
reason, not skipped.

| Item | Source | Why it stays out |
|---|---|---|
| Productive semantic prefixation on non-motion verbs | B2-SPINE item 5 (O7.3) | Directly contradicts James's locked Block 6a decision #1. See **O3** — the one item where a locked decision and a hand-over list disagree. |
| The Vocative as a case; the general proper-name pattern | items 7b, 18 | B1 decision #4 is James's own and locked. See **O4**. |
| Written/spoken split and register as a *system* | item 22 | Not a unit. `c1_register` takes the usable half. See **O7**. |
| The accusative-experiencer verb class as a productive category | item 24 | `boleć`/`bolą` are already TAUGHT and `b2_pron_acc` already explained *boli mnie*. The class has ~3 everyday members; teaching it as a class buys a rule where three memorised verbs already do the job. |
| An exhaustive noun-declension exception inventory | item 8, tail | C1 closes the four families that are frequent (`-owie`, `bracia`-type virile irregulars, the `oczy`/`uszy`/`ręce` set, the `r→rz` alternations). Beyond those the tail is dictionary work. |
| `zrobiwszy` as production | O5 | Recognition-only. Literary. |
| Fabricated non-words as distractors, anywhere | AGENTS | Restated because C1's alternation units (`c1_virile_alt`, `c1_ea_shift`, `c1_sec_imperf`) are the exact genre where the temptation is strongest, and `b2_verbal_nouns` already had to rebuild a whole quiz shape for it. |

### O13 · Homograph and frozen-chunk traps C1 will hit

Not forks — advance warnings, in the tradition of B2's O16 and
`b1_virile_reco`'s `ci`/`ci` prediction. Every one verified this run.

| Form | `check_new.py` says | What it actually is | Who must handle it |
|---|---|---|---|
| `je` | NEW | but it is **also** the 3sg of *jeść* (`jem`/`jesz` TAUGHT ← `a2_routine`). `b2_pron_acc` fenced it and named this collision. | `c1_pron_je` — teach the pronoun and the verb form **together**, or the first *Ona je* the learner meets reads as "she them". |
| `drogi` | TAUGHT ← `leaf_shopping_a1` | the adjective **expensive**, not the noun *road*. `b2_gen_pl_full` calls this "the sharpest homograph catch of the unit" and fenced it entirely. | Anything reaching for *road/way*. It is why the C1 capstone is **not** titled *Koniec drogi*. |
| `za` | TAUGHT ← `b1_polite` | the **thanking** job only (*dziękuję za*). *za piętnaście* is a time job on the same word. | `c1_time_minutes` — name it, `b2_prosic_o`'s treatment of `o`. |
| `mógł` | NEW (`mógłby` TAUGHT ← `b1_polite`) | `b1_polite` carries the standing **MÓGŁBY QUARANTINE**; teaching *móc*'s plain past touches it. | `c1_past_gaps` — the quarantine bans *paradigming* the conditional, not the past. Check it against James's live ruling before building, do not assume. |
| `czemu` | NEW | the Dative of *co* — but colloquially it also means **why**. `b2_kim_czym` fenced it twice over for this reason. | `c1_pron_je` — one line naming both, or leave the second sense out and say so. |
| `stać` | NEW (`stało` TAUGHT ← `b1_stories_func`) | `stało` is frozen inside *Nic się nie stało*; `stać` also means **to stand**. | `c1_stac_sie` — chunk → real slot, the `że`/`której`/`dziękuję` precedent. |
| `prawo` | TAUGHT ← `leaf_places` | taught inside *na prawo* (to the right), not as **law/right**. | `c1_society` if it reaches for the legal sense. |
| `wydaje` | TAUGHT ← `b2_verb_family2` | **spends**, sense-cut deliberately. This is why *wydaje mi się* is absent from the course. | `c1_nuance` — B2 batch 17 flagged this as still James's call; see the digest note. |
| `na` | reported NEW | tooling artifact — never a bare lemma, always inside `na stole`/`na spacer`. TAUGHT since A1 via `prep_w_loc`. | `c1_na_acc` — do not "teach" `na`; teach its **second governor**. |

---

## Standing fences for ALL of C1

- **Stations stay `planned` forever.** `c1_station_1` / `c1_station_2` are
  permanent placeholders, same as A2's four, B1's two and B2's two. Never
  authored, never flipped live. `a2_past_gym` stays retired and is never
  re-wired.
- **The Vocative is never named as a case** (O4) — B1 decision #4, unchanged
  through three levels.
- **No productive prefix-semantics rule** anywhere (O3). Every prefixed verb C1
  teaches is a taught family member or a lens-legal core-4 example; the packs
  must keep restating `a2_aspect`'s "the piece on the front is unpredictable,
  learn the pair whole" line, as B2's whole prefix strand does.
- **The lens set stays at four** — `wy-`, `przy-`, `do-`, `od-`. `za-`/`po-`/
  `prze-`/`na-` keep their one-line "no promise" treatment.
- **Plural adjective endings are fenced until their own unit**, ladder-wise, and
  this is the single easiest fence in C1 to break by accident because the three
  strings are `-ych`, `-ym`, `-ymi`: `c1_adj_pl_gen` must not show `-ymi`;
  `c1_adj_pl_inst` must not show `-ym`; and virile forms appear nowhere before
  `c1_adj_pl_virile`. Exactly B2's O2 warning, one paradigm later.
- **Oblique pronouns remain author discipline, not machine-checked.** Person
  pronouns sit in `audit.py`'s `GLUE_LEMMAS`, so **the auditor cannot see a
  single pronoun fence in Block 3.** Every B2 pronoun pack said this in its own
  note; C1's three pronoun units must be scanned by hand, string by string, over
  every learner-facing surface.
- **`zostać` is fenced until `c1_zostac`**, and `przez` until `c1_przez` — which
  is why `c1_przez` sits **before** `c1_zostac` on the path. The agent phrase is
  the dynamic passive's whole point and it needs the governor first.
- Aspect glossing rules from AGENTS.md apply throughout, including
  `b1_two_futures`' rule that future glosses distinguish "will do (once,
  finished)" from "will be doing".
- **Pisanie stage rule applies from the first unit**, not retroactively: typed
  answers ≤3 words **and** a frozen chunk or pattern phrase; every composed
  sentence is a `mode:"cloze"` item blanking the teaching point. C1 must not add
  a single item to the repair queue.

---

## The spine, in path order

### Block 1 — Cheap wins, and the fence that four packs have paid for

| id | domain | what it does |
|----|--------|--------------|
| `c1_existential` | GRAM | The existential *być* across three tenses: *Jest kawa. Była kawa. Będzie kawa.* — and its negative twin, which the learner can already half-build: *Nie ma kawy. Nie było kawy. Nie będzie kawy.* **Zero new forms.** Pays `b2_copular_future`'s explicit fence ("the plain existential future *Będzie kawa* is fenced… it is the twin of the negative"), and `b2_neg_gen` supplies the Genitive half. The cheapest high-value unit in C1, which is why it opens the level — the `b2_copular_future` slot, one level on. |
| `c1_wiedziec` | GRAM | **Lifts the `wiem` quarantine** (O10). Conjugates *wiedzieć* (`wiesz`, `wie`, `wiemy`, `wiecie`, `wiedzą` — all NEW; `wiem` owned since A2) and teaches the **`wiedzieć`/`znać` split** that English hides under one word: *wiedzieć* takes a clause (*Wiesz, gdzie…?*), *znać* takes a person or a thing (*Znam Annę*). `znać`/`znam` are TAUGHT since `a1_present` [15], so the split is a contrast, not new material. Unblocks *Czy wiesz, gdzie…?* — the sentence `b2_indirect_q`'s digest named as the one Dad most needs and cannot say. |

### Block 2 — The plural adjective (closes B2-SPINE O3, the largest remaining hole)

| id | domain | what it does |
|----|--------|--------------|
| `c1_adj_pl_gen` | GRAM | `-ych`. One ending, one governor. Rides quantity words and negation, both owned: *dużo dobrych książek*, *nie mam nowych butów*. The nouns are `b2_gen_pl_full`'s own closed families, so no new noun form rides along. |
| `c1_adj_pl_loc` | GRAM | **No new endings** — `-ych` doing its second job, after `w`/`na`/`o`. *W dużych sklepach. Myślę o starych filmach.* The course's "same ending, another job" idiom, fifth turn (`inst_identity`→`inst_z`→`inst_transport`→`b2_adj_inst`→here). Directly unblocks the sentence `b2_loc_pl`'s digest flagged as unsayable: *in the big cities*. |
| `c1_adj_pl_inst` | GRAM | `-ymi`. Rides `z` + Instrumental (`a2_inst_z`) and `b2_inst_pl`'s `-ami` nouns: *z dobrymi kolegami*, *z małymi dziećmi*. |
| `c1_adj_pl_dat` | GRAM | `-ym`. Rides B1's dative verbs and `b2_dat_pl`'s `-om` nouns: *Pomagam nowym studentom.* Deliberately small. **Trap:** `-ym` is also the singular m/n Locative and Instrumental ending (`b2_adj_loc`, `b2_adj_inst`) — same string, third job. Name it. |
| `c1_adj_pl_virile` | GRAM | The men-group forms: `mali`, `duzi`, `zmęczeni` (all NEW), generalising the whole-form `dobrzy` `b1_virile_reco` handed over. Virile Accusative `-ych` folds in as the plural echo of the Acc≡Gen fact `b2_adj_gen` already taught for masculine animates. **Also pays `b2_copular_future`'s absolute fence** on plural predicate adjectives — *Jesteśmy zmęczeni / Jesteśmy zmęczone* — which `b1_virile_gym` and `b1_conditional_pl` each record nearly shipping by mistake, one batch apart. |
| `c1_adj_pl_gym` | GRAM gym | Zero new (O11). `-ych` / `-ym` / `-ymi` across five jobs plus the virile split, on one or two adjectives across many nouns. `teaches_*` empty, gym idiom. |
| `c1_evaluation` | VOCAB | Evaluative adjectives — placed here so the block's new endings get a wider adjective set to run on than *dobry*/*duży*. All verified NEW: **łatwy, trudny, gotowy, pusty, pełny, dziwny, zwykły, oczywisty, konieczny, możliwy, niemożliwy, skuteczny.** Trim to 12. `łatwy`/`trudny` pay `a1_trunk_adjectives`' own deferral ("no anchorable noun this early") — there are hundreds now. `gotowy` pays `b2_passive`'s logged absence. Anchors, never re-taught: `wolny`, `zajęty`, `ciekawy`, `nudny` (`leaf_freetime_a1`), `ważny` (`b2_travel_func`). |

### Block 3 — Relatives and pronouns completed

| id | domain | what it does |
|----|--------|--------------|
| `c1_ktory_plural` | GRAM | Plural relatives — `którzy`, `których`, `którymi`, plural `którym` (all NEW) — plus **`któremu`**, the Dative singular relative. `b2_ktory_full` fenced every one of these and logged exactly why: *"the relative declines like an adjective, so shipping plural relatives would breach O3 by the back door."* Block 2 has just removed that objection, which is why this unit sits immediately after it and not inside B2. |
| `c1_pron_12_prep` | GRAM | First and second person after a preposition: **o mnie, o tobie, ze mną, z tobą, do ciebie, z nami, z wami** (`tobie`, `ciebie`, `mną`, `tobą`, `nami`, `wami` all NEW). `b2_pron_prep` took the third-person-only branch and named this unit as its own alternative; `b2_case_gym` has since shipped a table with **two visibly empty cells**, which is the argument for closing it. Includes the **`ze`-shape rule** (*ze mną*, not *z mną*) — `a1_prep_do_z` only ever taught `ze` inside the frozen *ze szkoły* / *ze sklepu*. |
| `c1_pron_je` | GRAM | The forms for **things, not people** — the half of the pronoun system B2 left open on purpose. `je` (neuter and non-virile-plural Accusative) pays `b2_pron_acc`'s stated consequence, *"after this unit 'them' is expressible only for people."* `czemu` (Dative of *co*) pays `b2_kim_czym`'s double fence and the em dash `b2_case_gym`'s slide-2 table still carries. **Two homograph traps in one small unit** (O13): `je` = *she eats*, `czemu` = colloquial *why*. Both named on the slide, neither left to sting. |
| `c1_siebie` | GRAM | `siebie` / `sobie` — the true reflexive pronoun (B2-SPINE O15, fenced by name in eight B2 packs). The whole unit is the contrast with `a2_sie`'s framing: *się* **belongs to the verb** and cannot be moved or stressed; *siebie* is a real pronoun with a real case. `a2_sie`'s framing must survive intact — this unit adds a second thing, it does not correct the first. |
| `c1_word_order` | GRAM | Where the small words stand (O6, inbox item 19). Two shapes, shown as a picture, no rule claimed: object pronoun relative to the verb (`b2_pron_acc`'s "one line and a real fence"), *się* in a clause that opens with something else (`b2_sie_impersonal`'s two shapes, extended by one), inverted counted subjects (*W domu było pięć okien* — held by both `b2_num_subject` and `b2_plural_gym`), and sentence-initial emphatic `jego`/`ciebie` (`b2_pron_acc`'s fence). Recognition-leaning throughout. |
| `c1_station_1` | station | Placeholder. `planned` forever. |

### Block 4 — Noun declension irregulars closed (B2-SPINE items 8, 9)

| id | domain | what it does |
|----|--------|--------------|
| `c1_virile_alt` | GRAM | The consonant alternations `b1_virile_nom` left recognition-only: `kelner→kelnerzy` (`r→rz`), and the rest of the set that pack fenced. `kelnerzy` is TAUGHT ← `b1_virile_reco` [109] as a whole form, so the unit's idea is "a form you have read since B1 is built by a rule" — the `b2_verbal_nouns`/`b2_participle_pass` anchor shape. |
| `c1_owie` | GRAM | The `-owie` masculine plural family: `dziadkowie`, `synowie`, `szefowie`, `wujkowie` (all NEW). `b1_virile_nom` fenced the whole family by name. A closed list of **relationship and rank nouns**, which is what makes it learnable as a family rather than an exception. |
| `c1_irreg_virile` | GRAM | `brat→bracia`, `kolega→koledzy`, `mężczyzna→mężczyźni`, `człowiek→ludzie` **as a class** rather than four memorised words — inbox item 8's exact wording. `ludzie` is TAUGHT [112] and `koledzy`/`bracia`/`mężczyźni` are NEW. Also carries their obliques: `braciom` vs the wrong `bratom`, which `b2_dat_pl` set up as a distractor and explicitly fenced. |
| `c1_suppl_pl` | GRAM | `oczy`, `uszy`, `ręce` (all NEW) — `a2_plural_nom`'s fenced suppletives. `dzieci` is **TAUGHT** ← `a2_family2` [57] and is the anchor, not a teaching item (an inbox claim corrected this run). Small, closed, body-and-family lexis the learner has wanted since A1. |
| `c1_society` | VOCAB | Society, values and environment register. Verified NEW: **społeczeństwo, środowisko, wartość, korzyść, wolność, sprawiedliwość, obowiązki, nauka, technologia** — the first four being `b2_abstract`'s own four logged drops, coming home in the level that has room for them. Trim to 12; top up from `b2_abstract`'s note before inventing candidates. Anchors, never re-taught: `przyczyna`, `skutek`, `wpływ`, `zmiana`, `cel`, `sposób` (`b2_abstract`), `kultura`, `historia`, `sztuka`. **Homograph:** `prawo` is TAUGHT as *na prawo* only (O13). |

### Block 5 — Prepositional and verbal governors closed

| id | domain | what it does |
|----|--------|--------------|
| `c1_na_acc` | GRAM | `na` + **Accusative**, the second job of a preposition the learner has used as a Locative governor since A1. **Exceptionally well anchored, and this was verified rather than assumed:** `na spacer` (`a2_sport` [93]) and `na czas` (`b1_journeys` [108]) are TAUGHT frozen chunks that are *already* `na` + Accusative. So the unit's whole idea is "two phrases you already say are built from a rule" — the `b2_verbal_nouns` shape. Pays `b2_health_system`'s fence (*czekam na wyniki*, *dzwonię na pogotowie*) and `b2_abstract`'s, which cost it *mieć wpływ na* and which its own note calls **"the strongest single argument for a na + Accusative unit at C1."** `pieszo` / `na piechotę` (`a2_inst_transport`'s fence) come along for free. |
| `c1_przez` | GRAM | `przez` + Accusative (NEW): through, across, and — the reason this unit precedes `c1_zostac` — **by** in an agent phrase. Payoff: **`przejść przez ulicę`** and `wjechać`, which `b2_motion_prefixes2` fenced with the words *"it needs either its own small slot after a przez unit, or C1."* This is that slot. The verbs ride the prefixed-motion stem table that pack already built, so each is one new word, not a new system. |
| `c1_od_source` | GRAM | The **second job of `od`** — source, not comparison. `od` is TAUGHT ← `a2_superlatives` [91] as the comparison governor (*starszy od brata*), and `pożyczać` is TAUGHT ← `b1_giving` [118]; the inbox claimed both were missing and both are wrong (see §"What this run actually verified"). So this is a small governor-homograph unit in the exact `b2_prosic_o` shape: *pożyczam od mamy*, *list od siostry*. |
| `c1_gen_verbs` | GRAM | Verbs that govern the Genitive — and it closes **two** IOUs at once. `a2_sie` fenced *uczę się polskiego* by name (`uczę` TAUGHT, `polskiego` NEW — and derivable now that `b2_adj_gen` owns `-ego`); `b2_verbal_nouns` fenced **genitive objects after a verbal noun** (*gotowanie obiadu*, *słuchanie muzyki*) as its one significant scope cut. Anchor, and it is a good one: **`szukam pracy` is TAUGHT** ← `a2_work2` [78] as a whole chunk and is already this construction. `słucham` is TAUGHT ← `a2_phone_func` [88]. |

### Block 6 — Participles and the passive completed (B2-SPINE O4, O5)

| id | domain | what it does |
|----|--------|--------------|
| `c1_part_attrib` | GRAM | The passive participle in front of the noun and **declined** — *w zamkniętym sklepie*, *na napisanym liście* — plus **the plural** (`zamknięci`, `otwarci`, `zrobieni`, all NEW), which `b2_participle_pass` fenced as "a homograph inside the paradigm rather than a scope choice". One idea, two consequences: the participle is a full adjective, and Block 2 has just taught every plural adjective ending it needs. |
| `c1_part_active` | GRAM | The active adjectival participle `pracujący` (NEW) — B2-SPINE O4's second deferral. Formed off the 3pl present, which the learner owns for every present class. Declines like the participle taught one unit earlier, so agreement costs nothing. |
| `c1_part_adv` | GRAM | Adverbial participles (O5): `robiąc` produced (*Robiąc obiad, słuchałem radia*), `zrobiwszy` shown once and named literary. The one new fact is that the `-ąc` form has **no subject of its own** — it borrows the main clause's. |
| `c1_zostac` | GRAM | The dynamic passive (B2-SPINE O5): `zostać`, `został`, `zostanie` (all NEW) + participle. *Sklep został zamknięty o piątej.* The contrast with `b2_passive`'s state passive is the unit — **that pack's final slide already told the learner this edge was coming**, so the two read as a pair. The agent phrase (*przez kogoś*) works here and nowhere earlier, because `c1_przez` is three units back. |

### Block 7 — The verb system completed

| id | domain | what it does |
|----|--------|--------------|
| `c1_past_gaps` | GRAM | The pasts the course never gave: `jechał`, `pomagał`, `pomógł`, `mógł`/`mogłem` — inbox item 25, named specifically in `b1_wrapup`'s digest as forms rejected during drafting. All verified NEW. Also the `-ić` past of the motion imperfectives (`chodziłem`, `wychodziłem`), which `b2_motion_imperf` fenced as "a second new system in one unit". Every form is a straight application of the `past_ac`/`past_rest` rules owned since A2, **except `pomógł`/`mógł`**, whose `ó→o` shift is handed over whole. **Check the MÓGŁBY QUARANTINE against James's current ruling before building** (O13). |
| `c1_ea_shift` | GRAM | The `e→a` alternation, **named at last**. `SEQUENCING.md`'s own `past_rest` entry records it as *"deliberately unexplained until B1"* and it was never explained; inbox item 17 books `chcieć`'s `chcie-`/`chcia-` for C1. `mieć→miałem`, `chcieć→chciałem`, `musieć→musiałem` are all TAUGHT as whole forms — so this unit teaches **no new form at all**, only the pattern behind three sets the learner has produced correctly for four levels. First item to fold into `c1_past_gaps` if C1 must shrink (O1). |
| `c1_sec_imperf` | GRAM | **MANDATORY — James-locked Block 6a decision #4**, which reads: *"the -ywa-/-iwa-/-a- formation rule is NAMED only at C1, when enough examples are owned. C1 spine MUST include that rule-naming unit."* The owned pairs it names the rule over: `wyjść`/`wychodzić`, `przyjść`/`przychodzić`, `wyjechać`/`wyjeżdżać`, `przyjechać`/`przyjeżdżać` (`b2_motion_imperf`), `podpisać`/`podpisywać` (`b2_pisac_family`). Unlocks **`zapisywać`**, which `b2_pisac_family` fenced with the words *"a later run or C1 may pay it."* The rule is stated as a **pattern with named exceptions**, never as free derivation — decision #1 still stands. |
| `c1_verb_family3` | GRAM | Root family 3 (O9, locked decision #6): the `płacić` family. `zapłacić` TAUGHT ← `b2_aspect_prefixes` [165]; `dopłacić`, `przepłacić` both NEW. Register: money and admin, which is where this learner actually meets them. Secondary imperfectives come free now that the previous unit named the rule. |
| `c1_verb_family4` | GRAM | Root family 4 — **author picks the root and logs the choice + the alternative**, exactly as `b2_verb_family2` did. Obvious candidate: the `pisać` extension `b2_pisac_family` named as its own "if load allows" cut — `opisać`, `przepisać` (both NEW). First item on O1's trim list. |
| `c1_dawac_perf` | GRAM | `dać`/`oddać`/`wydać`/`podać` (all NEW) and the **`-m`/`-sz` irregular paradigm** (`dam`, `dasz`, `da`). `b2_verb_family2` fenced the entire perfective half of the `dawać` family and said exactly why: *"dać is irregular (dam/dasz/da, an -m/-sz paradigm the course has never taught), so the family's perfective half is a genuine second system and belongs to C1 or a later run."* This is that unit. One new paradigm, four verbs that already exist imperfectively. |
| `c1_imperative_stems` | GRAM | `robić→rób` and the stem-alternating imperatives (inbox item 15) — fenced by name in `b1_imperative_rule`, which even had to cut a quiz item and a line of intro prose to hold it. Also **`daj` explained** rather than opaque: TAUGHT ← `a2_imperative` [94] as a frozen chunk since A2, and it turns out to be regular once the stem is right. |
| `c1_imperative_more` | GRAM | The rest of the imperative (item 15's tail): the **plural** (`róbcie`, `chodźmy` — both NEW) and the formal **`niech pan`/`niech pani`** (`niech` NEW), which is what Dad will actually hear addressed to him. `pan`/`pani` owned since A2. |
| `c1_cond_past` | GRAM | The conditional past — B2-SPINE **O6**'s explicit deferral. `byłbym miał`, `byłbym zrobił` (`byłbym` NEW; `zrobił` TAUGHT). `b2_gdyby` glossed its L-form **only** as a present unreal precisely so this unit could arrive without contradicting it, and its digest says so. The unit's one fact: Polish uses one shape for "if I had time" and adds a piece for "if I had had time". |
| `c1_by_plural` | GRAM | The `-by-` system in the plural, in one unit because it is **one** person-marker family seen a fourth time: `gdybyśmy`/`gdybyście` (`b2_gdyby`'s logged C1-inbox hold) and `żebyśmy`/`żebyście` (`b1_zeby`'s logged scope cut, inbox item 16). All NEW. `b1_conditional_pl` already owns `-libyśmy`/`-łybyśmy`, so the endings are recycled and only the conjunction forms are new. |
| `c1_modal_pl` | GRAM | `powinniśmy`/`powinniście`/`powinni`/`powinny` and `musieli`/`musiały` (all NEW) — `b2_powinien` fenced the whole plural because *"the virile plural would drag virile_past's gender split back into a unit that already has two."* Block 2 and B1 have both since paid for that split. Also **`powinienem był`**, the conditional-past modal `a2_musiec` dropped by name and O6 fenced for all of B2 — which is why this unit sits **after** `c1_cond_past`. |
| `c1_stac_sie` | GRAM | `stać się` as a real reflexive paradigm rather than the three frozen chunks `b1_stories_func` shipped (inbox item 14, that pack's own logged fork). **Homograph, and it is the unit's opening move** (O13): `stało` is TAUGHT only inside *Nic się nie stało*, and `stać` on its own means *to stand* — chunk → real slot, the `że`/`której`/`dziękuję` treatment, said out loud on the slide. |
| `c1_nuance` | VOCAB | Hedging and precision — the register that makes an opinion sound like an opinion. Verified NEW: **pewnie, naprawdę, dokładnie** (all three are `b2_discussion_func`'s own logged drops, held back there because they would have "flattened four contrasting jobs into a pile of interchangeable adverbs" — with `uważam`/`zależy`/`raczej`/`właśnie` now owned and spaced, the contrast survives). Trim to 12; top up from `b2_discussion_func`'s note. **`wydaje mi się` is James's open call** (O13) — `wydaje` is TAUGHT as *spends*. |

### Block 8 — Numerals, time and quantity completed

| id | domain | what it does |
|----|--------|--------------|
| `c1_time_minutes` | GRAM | Minutes past and to the hour — `a2_ordinals_time`'s largest fence, in its own words: *"wpół do, za piętnaście, kwadrans po, any minutes-past-the-hour, any half-past or quarter form."* Plus that pack's **second** fence, the feminine Nominative hour (*Jest trzecia*), which it called "a THIRD inflected set" and deferred under the load-splitting rule. `piętnaście`, `minut`, `kwadrans` all TAUGHT; only the phrase shapes are new. **Homograph:** `za` is TAUGHT in its thanking job only (O13). |
| `c1_dates_full` | GRAM | Full dates with month forms (*piętnastego stycznia*) — `a2_ordinals_time`'s and `a2_celebrations`' shared fence, inbox item 20's second half. Month Genitives all NEW. Rides the ordinals `a2_ordinals_time` owns. |
| `c1_collective_num` | GRAM | Collective numerals `dwoje`, `troje`, `pięcioro` (inbox item 21) and **`dwaj`**, which `b2_num_virile` fenced with *"it is a second system — nominative numeral, nominative noun, plural verb — and would undo slide 2's entire claim in one line."* Both facts are about counting **people**, which is why they share a unit and why it sits after the whole virile apparatus. |
| `c1_quantifiers` | GRAM | `wiele`/`wielu`/`kilka` (all NEW) — logged as C1 items by `b2_num_subject` and `b2_plural_gym`. Plus **`złoty`/`złotych`**, the currency `a2_shopping2` omitted because *"it declines adjectivally (pięć złotych) and teaching it would invite \*pięć złoty"* — and Block 2 has since taught `-ych`, so the objection is gone. Money is the most everyday counted noun there is; it should not end the course untaught. |

### Block 9 — Subordination, negation, comparison, register

| id | domain | what it does |
|----|--------|--------------|
| `c1_concessive` | GRAM (links) | Concession: `chociaż`, `mimo że` (both NEW) — inbox item 23. Zero new morphology, `b2_conjunctions`' idiom: invariable words joining clauses the learner can already build. One contrast taught with a table (concession vs the plain contrast `ale` already does), not derived. |
| `c1_cause_time` | GRAM (links) | Cause and time: `dlatego że`, bare `dlatego`, `podczas gdy` (all NEW), plus `jeżeli` and `gdy`, the formal twins `b2_jesli` fenced. Pays `b2_conjunctions`' logged scope cut in full — that pack dropped `dlatego` *because* its everyday partner `dlatego że` was on the C1 list, and refused to ship "a half-taught pair pointing at a fenced construction." Both halves land here together. |
| `c1_neg_polarity` | GRAM | Negative polarity and the last negative word: `już nie` / `jeszcze nie` (`b2_conjunctions` fenced both senses absolutely, having taught `już`/`jeszcze` in their positive jobs) and **`żaden`/`żadna`/`żadne`**, which `b2_double_neg` dropped from the spine's own list because *"żaden is adjective-shaped with a full declension and stacks a new declining word on top of neg_gen, taught one node earlier."* Block 2 and `b2_neg_gen` are both far behind now. |
| `c1_comp_analytic` | GRAM | `bardziej` / `najbardziej` + adjective (inbox item 11, both NEW) — deferred by `a1_comparatives` **and** by `a2_superlatives`, twice over. The decision rule (which adjectives take the ending, which take `bardziej`) is taught as a **tendency with a closed list of the ones he owns**, never as a productive test — `b2_gen_pl_full`'s fleeting-e precedent. |
| `c1_register` | GRAM chunk | Formal and casual, side by side (O7, inbox item 22). Situations genre, near-zero new lemmas: the same errand said both ways with material already owned — *Cześć* / *Dzień dobry*, *Chcę* / *Chciałbym*, *Możesz…?* / *Czy mógłby pan…?*, `ty` / `pan`. The one honest fact: Polish forces the choice earlier and more visibly than English does. |

### Block 10 — Closers

| id | domain | what it does |
|----|--------|--------------|
| `c1_case_gym` | GRAM gym | Zero new (O11). The final case board: everything `b2_case_gym` had, plus plural adjectives in five jobs, the closed pronoun system including 1st/2nd person after prepositions, and the irregular plurals. **This board will be denser than `b2_case_gym`'s**, which already had to split across two intro slides — plan for three and log the call rather than compressing. |
| `c1_wrapup` | GRAM chunk | **The course capstone.** Genre of `a2_wrapup_func` / `b1_wrapup` / `b2_wrapup`, zero new. Recombines the registers C1 added — evaluation, society, nuance, register-switching — into mixed scenes. **Four registers, no fifth**, holding `b1_wrapup`'s deliberate limit for the fourth time. |
| `c1_station_2` | station | Placeholder. `planned` forever. |

---

## Inbox → disposition

Every item from B2-SPINE's "What B2 deliberately leaves to C1" (**25 items —
note the source numbers two items 7; both are real and both are carried**), plus
every C1-inbox item logged in the B2 digest after that list was written, plus
every phrase-level IOU found by this run's independent sweep of all 175 pack
notes. **Nothing here is unresolved.**

### From B2-SPINE's hand-over list

| # | Item | Disposition |
|---|---|---|
| 1 | Adjective plural oblique cases | Block 2, five units + gym |
| 2 | Adverbial / active / declined participles | `c1_part_adv`, `c1_part_active`, `c1_part_attrib` |
| 3 | `zostać` dynamic passive | `c1_zostac` |
| 4 | Conditional past | `c1_cond_past` |
| 5 | Productive semantic prefixation | **REFUSED — O3.** Conflicts with locked decision #1. Paid instead by `c1_sec_imperf` + two families. |
| 6 | `siebie` / `sobie` | `c1_siebie` |
| 7 (first) | Secondary-imperfective formation rule | **`c1_sec_imperf` — MANDATORY**, locked decision #4. Further families → `c1_verb_family3`, `c1_verb_family4`. Lens extension → refused, O3. |
| 7 (second) | Vocative as a case | **REFUSED — O4.** B1 decision #4 is James's and locked. |
| 8 | Soft-stem / irregular declensions; `-owie`; `bracia` etc. as a class | `c1_owie`, `c1_irreg_virile`, `c1_suppl_pl`. Tail beyond those four families **refused — O12**. |
| 9 | `kelner→kelnerzy` and the virile alternations | `c1_virile_alt` |
| 10 | Virile plural adjectives | `c1_adj_pl_virile` |
| 11 | `bardziej` / `najbardziej` | `c1_comp_analytic` |
| 12 | `nie mieć racji`; the soft `-cja` Genitive class | `c1_gen_verbs` carries `racji` (`rację`/`racji` NEW); the `-cja` class rides `c1_society`'s soft feminines. Also fenced by name in `b2_discussion_func`. |
| 13 | `pożyczać` borrow-**from** | `c1_od_source` — **and the claim was wrong**: both `pożyczać` and `od` are TAUGHT. Only `od`'s second job was missing. |
| 14 | `stać się` as a real paradigm | `c1_stac_sie` |
| 15 | `robić→rób`; `daj` explained; imperative plural; `niech pan` | `c1_imperative_stems` + `c1_imperative_more` |
| 16 | Plural `żebyśmy`/`żebyście` | `c1_by_plural` |
| 17 | `chcieć`'s `chcie-`/`chcia-` alternation | `c1_ea_shift` |
| 18 | General proper-name Vocative | **REFUSED — O4**, with item 7 (second). |
| 19 | Clitic and general word order; `się` placement | `c1_word_order` (O6) |
| 20 | Minutes past the hour; `wpół do`; `za piętnaście`; full dates | `c1_time_minutes` + `c1_dates_full` |
| 21 | Collective numerals | `c1_collective_num` |
| 22 | Stylistic register; written/spoken split | `c1_register` takes the usable half (O7); the split as a **system refused — O12**. |
| 23 | `mimo że`, `chociaż`, `dlatego że`, `podczas gdy` | `c1_concessive` + `c1_cause_time` |
| 24 | `boleć` and the accusative-governing class | **REFUSED — O12**, and the claim was stale: `boleć`/`bolą` are TAUGHT and `b2_pron_acc` already explained *boli mnie*. |
| 25 | Pasts of present-only verbs (`jechać`, `pomagać`, `pomóc`) | `c1_past_gaps` |

### Logged in the B2 digest after that list was written

| Item | Disposition |
|---|---|
| `wiedzieć` properly + the `wiedzieć`/`znać` split | `c1_wiedziec` — **O10, promoted to unit 2 of the level** |
| Plural relatives + `któremu` | `c1_ktory_plural` |
| Plural `gdyby` (`gdybyśmy`/`gdybyście`) | `c1_by_plural` |
| 1st/2nd person after a preposition + the `ze` shape | `c1_pron_12_prep` |
| `je` and the neuter / non-virile-plural Accusative | `c1_pron_je` |
| `czemu` and the Dative of a thing | `c1_pron_je` |
| `prosić o` + a pronoun; the second job of `o` | `c1_pron_je` (the pronoun forms) — the governor itself is owned since `b2_prosic_o`; nothing further needed |
| `dwaj` | `c1_collective_num` |
| `żaden`/`żadna`/`żadne` | `c1_neg_polarity` |
| `sprzątać`/`posprzątać` | `c1_verb_family4`'s pack or `c1_evaluation`'s bank — **author's call, must be logged**; both NEW, taught whole as a pair, never derived |
| `przejść` + the `przez` governor; `wjechać` | `c1_przez` |
| `pójść`/`pojechać` | **Already TAUGHT** [164] — inbox item withdrawn, see §"What this run actually verified" |
| `korzyść`, `wartość`, `społeczeństwo`, `środowisko` | `c1_society` |
| `pewnie`, `naprawdę`, `dokładnie` | `c1_nuance` |
| `wydaje mi się` (collides with *spends*) | `c1_nuance` — **still James's call**, carried unresolved from B2 batch 17 |
| Other persons of `uważać`; the rest of `według`'s complements | `c1_nuance`'s bank |
| Inverted counted subject (*W domu było pięć okien*) | `c1_word_order` |
| Reversed `jeśli` order; `jeżeli`, `gdy`, resumptive `to` | `c1_cause_time` |
| Genitive objects after a verbal noun; oblique verbal nouns | `c1_gen_verbs` |
| Existential future `Będzie kawa` | `c1_existential` |
| Plural predicate adjectives `zmęczeni`/`zmęczone` | `c1_adj_pl_virile` |
| Plural of the passive participle | `c1_part_attrib` |
| Plural `powinien`; `musieli`/`musiały`; `powinienem był` | `c1_modal_pl` |
| Past of the imperfective motion verbs; `chodziłem` | `c1_past_gaps` |
| `przyjaciółmi`, `gośćmi` (further `-mi` irregulars) | `c1_irreg_virile`'s pack if load allows — **author's call, logged**; `b2_inst_pl` refused them to avoid turning a marked box into a paradigm, and that reasoning still applies |
| `dawać` family perfectives (`dać`/`oddać`/`wydać`/`podać`) | `c1_dawac_perf` |
| `zapisywać`; `opisać`/`przepisać` | `c1_sec_imperf` (`zapisywać`); `c1_verb_family4` |
| `wiele`, `kilka`, `pięcioro` | `c1_quantifiers`, `c1_collective_num` |
| `braciom` vs `bratom` | `c1_irreg_virile` |
| `gotowy` | `c1_evaluation` |
| Dative plural noun in the *podoba się* frame | `c1_adj_pl_dat`'s pack, as a use item — the ending is owned, only the frame shape is new; **logged, not a unit** |
| `nie mieć racji` | with item 12 above |

### Found by this run's pack-note sweep, not in either list

| Item | Source pack | Disposition |
|---|---|---|
| `złoty` / `złotych`, the adjectivally-declined currency | `a2_shopping2` fork (1) | `c1_quantifiers` — the objection (`\*pięć złoty`) dies with Block 2 |
| `pieszo` / `na piechotę` | `a2_inst_transport` fence | `c1_na_acc` |
| `uczyć się` + Genitive (`polskiego`) | `a2_sie` fence | `c1_gen_verbs` |
| `łatwy` / `trudny` | `a1_trunk_adjectives` deferral, A1 | `c1_evaluation` — the oldest open IOU in the course, four levels old |
| The feminine Nominative hour (*Jest trzecia*) | `a2_ordinals_time` second fence | `c1_time_minutes` |
| `oczy` / `uszy` / `ręce` | `a2_plural_nom` suppletive fence | `c1_suppl_pl` |
| Past of `zdać` / `oblać` | `a2_school2` fence | **REFUSED — O12 tail.** Two perfectives with no imperfective partner in the course; `c1_past_gaps` covers the verbs Dad actually uses. |
| `k/g`-stem feminine `-i`, masculine-animate `-a` Genitive | `a1_gen_endings` deferral | Owned in practice since `b2_adj_gen` taught Acc≡Gen for masculine animates and `b2_gen_pl_full` closed the families. **Nothing outstanding** — verified, not assumed. |
| `mógł` / `mogłem` under the MÓGŁBY QUARANTINE | `b1_polite` | `c1_past_gaps`, **gated on James's ruling** — O13 |

---

## Vocab register principle (carried from B1 and B2, unchanged)

C1 vocab does not revisit A1/A2/B1/B2 topic domains. It adds three registers:
evaluation, society/values/environment, and hedging. B2's standing warning holds
and is now doubly earned — *"a domain that feels obviously C1 may already be
almost entirely taught"* — and this run proved it applies to grammar too, with
six inbox claims falsified by `check_new.py` before a single unit was planned.

Run `check_new.py` on every candidate before any brief claims it is new, and run
the taught-**AS** check on every reused form.

---

## Build protocol (unchanged from A2, B1 and B2)

Position-aware pool (`make_pool.py --before <node>`) regenerated before every
batch · author each unit directly, in full, one at a time, no sub-agents · every
recycled form re-checked for what it was taught **AS** · new structure IDs
registered in `SEQUENCING.md` **and** `audit.py`'s `STRUCTURE_CATALOGUE`
**before** the audit runs · `audit.py` reports **0 errors** before any commit ·
commit and push per unit, not batched · digest entry appended to
`codex/C1-DIGEST.md` per batch · 2–3 units per run, never a whole block.

**Standing title instruction, from `b1_wrapup`'s digest and re-earned by
`b2_wrapup`:** every `label` / `label_en` written into `tree.json` when these
nodes were created as `planned` is a **draft**. B1 batch 10 caught two
learner-visible titles carrying untaught Polish and a raw level code; B2's
capstone had to change `droga`→`podróż` at the wire. **Re-run `check_new.py` on
every word of every title at the moment the unit is wired live** and correct
`tree.json` to match. The drafts in this document were word-checked at scoping
time against the 172-node pool, which is not the same as checking them at their
own path position.

**When C1 closes:** the run that wires `c1_wrapup` live writes
`codex/COURSE-COMPLETE.md` — final node count, per-level unit counts, and every
overrule item and deferred item from all four spines and all digests gathered in
one place — provided the repair queue is fully ticked.
