# B2 Spine — drafted 2026-08-06 by the cloud routine (James not present)

Status: **AGENT-AUTHORED DEFAULT, not a James-locked design.** B1-SPINE.md
recorded eight decisions James made interactively; nobody made those decisions
for B2. So every real fork below was taken on the **clearly conservative,
most load-split** path and logged in the section immediately following, with
the alternative spelled out. Where this document and James disagree, James
wins — overrule anything in the next section and the build agents will follow
the amended spine.

Everything else carries forward unchanged: AGENTS.md's authoring contract
(anchor rule, stage contracts, homograph trap, load-splitting, gender badges,
title rules, glossing rules), the build protocol that produced A2 and B1, and
B1-SPINE.md's decision #8 (all standing A2 rules carry forward).

**Size: 45 nodes** (39 grammar/chunk, 4 vocab, 2 permanent station placeholders).
For calibration: A1 = 48 nodes, A2 = 53, B1 = 30.

---

## Open for James to overrule

Each item is a genuine fork. The **Default** is what the build agents will do
unless told otherwise; the **Alternative** is the option that was rejected and
why.

### O1 · B2 is a completion level, and it is large

**Default:** 45 nodes. B2's job in this course is not exotica — it is closing
the case system, the pronoun system and the clause system, all three of which
A1/A2/B1 deliberately left open in named, documented places. Every fence those
levels set is either paid here or explicitly re-deferred to C1 in §"What B2
leaves to C1" below.

**Alternative:** merge the units flagged in O2, O8 and O9 → about 38 nodes.
Rejected because every one of those merges puts two new endings or two new
facts in one unit, against the load-splitting rule and the do/z-cliff
precedent.

### O2 · The adjective case system gets five teaching units + a gym

This is the single largest untaught system left in the course. Verified with
`check_new.py`: `dobrego`, `dobrej`, `dobrym`, `dobremu`, `małego`, `nowym`,
`zimnej`, `polskiego` — **all NEW**. Adjectives have only ever been taught in
the Nominative (`zgoda`, `byc_adj`, `plural_nom`'s `-e`), plus two accidental
feminine accusatives.

**Default:** split by case, in this order, because it produces a ladder where
no unit introduces more than two new endings and two units introduce none:

| unit | new endings | why it sits here |
|---|---|---|
| `b2_adj_acc` | **none** | `dobrą`/`nową` are already taught (`a1_miec`, *Mam dobrą kawę*); masc-inanimate and neuter don't change. The opener is "you already do this." |
| `b2_adj_gen` | `-ego`, `-ej` | one paradigm row; also the honest home for masculine-animate Accusative (`dobrego psa` = Acc≡Gen, AGENTS.md's named exception) |
| `b2_adj_loc` | `-ym` | `-ej` recycles from Gen |
| `b2_adj_inst` | **none** | `-ym` recycles from Loc, `-ą` from Acc — the course's "same endings, another job" idiom (cf. `inst_identity`→`inst_z`→`inst_transport`) |
| `b2_adj_dat` | `-emu` | `-ej` recycles again |

**Alternative:** merge `b2_adj_loc` + `b2_adj_inst` into one `-ym`/`-ej`/`-ą`
unit (they share every form). Defensible; rejected only because the two cases
have different governors and the course has never taught two governors in one
unit.

### O3 · Adjective PLURAL oblique cases are deferred to C1

**Default:** B2 teaches plural oblique **nouns** (`-ach`, `-ami`, `-om`) but
not plural oblique adjectives (`dobrych`, `dobrymi`, `dobrym`). This mirrors
exactly how the course did the singular: nouns first (A1/A2/B1), adjectives
much later (B2).

**Alternative:** a `b2_adj_pl_cases` unit after `b2_inst_pl`. Rejected as one
system too many for one level; C1 has room and this is on its list.

### O4 · Participles: one type at B2, the rest at C1

The routine brief says "decide how much is B2 vs C1 — log it." This is that log.

**Default:** B2 teaches **only the passive adjectival participle**
(`zrobiony`, `napisany`, `otwarty`, `zamknięty`), and only in **predicate
position** (*Sklep jest zamknięty*). The anchor is unusually good:
`check_new.py` confirms `otwarty` and `zamknięty` are **already taught** — as
plain adjectives, by `leaf_shopping_a1`. So the unit's whole new idea is "two
words you have used since A1 are actually built from verbs, and the pattern is
regular."

**Deferred to C1:** adverbial participles (`robiąc`, `zrobiwszy`), the active
adjectival participle (`pracujący`), and participles used **attributively and
declined** (*w zamkniętym sklepie*).

**Alternative:** pull `pracujący` into B2 as well. Rejected — a second
participle formation in the same level, with no anchor comparable to
`otwarty`.

### O5 · Passive: `być` + participle only

**Default:** `b2_passive` teaches the state passive (*Praca jest zrobiona*),
which is just the O4 participle plus already-owned `być`. The dynamic passive
with `zostać` (*Sklep został zamknięty*) is C1 — `zostać` is an untaught verb
with its own conjugation, so teaching it here would stack a new verb on a new
construction.

### O6 · Conditional past is deferred to C1 entirely

**Default:** `byłbym zrobił` does not appear anywhere in B2. B2 does teach the
two clause types that matter far more (`b2_jesli` real conditions, `b2_gdyby`
unreal conditions), both riding the conditional forms B1 already owns in full.

**Alternative:** a small `b2_cond_past` after `b2_gdyby`. Rejected: it is
comparatively rare in speech, and B1's conditional units are the newest
grammar in the learner's hands.

### O7 · Word-formation: motion prefixes extended, aspect prefixes as a closed list, semantic prefixes to C1

**Default, three separate calls:**
1. `b2_motion_prefixes2` extends the `szedł`/`jadę` stems the learner owns to
   more prefixes (`po-`, `we-`, `do-`, `prze-`). This pays a real catch:
   `b1_wrapup`'s digest records `poszedłem` being rejected during drafting as
   "a THIRD prefix on *iść*'s suppletive past stem" that was never taught.
2. `b2_aspect_prefixes` teaches a **closed set of new aspect pairs learned
   whole** (`pisać/napisać`, `gotować/ugotować`, `jeść/zjeść`,
   `płacić/zapłacić`, `sprzątać/posprzątać`) and states **no productive
   rule** — honouring `a2_aspect`'s own line, "the prefixes are unpredictable;
   learn the pair whole, never build the second verb from the first."
3. Productive **semantic** prefixation (`pod-`, `prze-`, `roz-`, `wy-` on
   non-motion verbs) is **C1**.

**Alternative:** a B2 unit teaching 3–4 prefix meanings productively.
Rejected as directly contradicting `a2_aspect`'s standing framing.

**JAMES OVERRULE, 2026-08-06 (dropdown session — LOCKED, not draft):** O7's
defaults 1–3 stand, but the strand is EXTENDED with a recognition lens and
four more units — see "Block 6a — Prefix strand (JAMES-LOCKED)" below. The
locked decisions, binding on every unit in that block:

1. **Goal = recognition lens + taught families.** Dad learns to DECODE
   unfamiliar prefixed verbs receptively and to PRODUCE only verbs the
   course explicitly taught. Free derivation is never asked for and never
   implied to work. This sits BETWEEN O7's default (no lens at all) and its
   rejected alternative (productive rules): the lens is receptive-only,
   which does not contradict a2_aspect's "prefixes are unpredictable" line —
   that line is about *building* words, not *reading* them.
2. **Lens prefix set = core 4 only: wy-, przy-, do-, od-** (the ~90%-reliable
   spatial set). za-/po-/prze-/na- verbs still get taught where needed, but
   only as vocabulary — never as lens examples, never with a claimed meaning.
3. **The two jobs of prefixes get a dedicated discrimination unit**
   (b1_two_futures idiom, zero new material): zrobić/wypić = same verb,
   "done" (aspect job) vs przyjść/oddawać = a different verb (word-building
   job). This is the level's honest answer to a question the course has
   been silently stepping around since a2_aspect.
4. **Secondary imperfectives: whole forms at B2, rule at C1.** Pairs like
   wychodzić/wyjść are taught as memorized twins (miałem/mógłby treatment);
   the -ywa-/-iwa-/-a- formation rule is NAMED only at C1, when enough
   examples are owned. C1 spine MUST include that rule-naming unit.
5. **Unit organisation: lens units cut across roots; vocab/family units go
   root-by-root** (anchor rule: one unknown per item, anchored in a deeply
   known root).
6. **B2 gets the motion bridge + 2 families** (pisać family + one more, the
   author picks the root and logs it); further families are C1 material.

### O8 · Numerals split into two units — and a correction to the brief

**Correction, stated plainly because the routine brief is out of date on this
point:** the brief lists "numeral government (pięć piw Gen-pl — explicitly
deferred since A1)" as a B2 candidate. It is **not** deferred — `a2_numbers_gen`
teaches it, and *pięć piw* is literally one of its own frames. What
`a2_numbers_gen`'s note actually still defers, in its own words, is two other
things, both labelled "B1" there and **neither ever built**:

- "NO PEOPLE-COUNTING anywhere — virile numerals (pięciu) are B1."
- "5+ phrases never stand as the subject of a verb in this pack, because that
  would need the neuter-singular agreement rule (B1)."

**Default:** B2 adopts exactly those two, as two units — `b2_num_subject`
(*Pięć osób było…* — the numeral phrase as subject takes a neuter-singular
verb) and `b2_num_virile` (*pięciu studentów*). Verified NEW: `pięciu`,
`wielu`, `osób`.

**Alternative:** one combined unit. Rejected: virile numerals and
subject-agreement are unrelated facts that happen to share a word class.

### O9 · Plural obliques are three one-ending units

**Default:** `b2_loc_pl` (`-ach`), `b2_inst_pl` (`-ami`), `b2_dat_pl` (`-om`),
in that order, each deliberately small. `b2_inst_pl` pays `a2_inst_z`'s named
fence ("plural instrumental (z rodzicami, z dziećmi) — B1, different ending
set"); the true irregulars `dziećmi`/`ludźmi` are handed over whole or fenced,
author's conservative call, logged in the pack.

**Alternative:** one combined plural-oblique unit. Rejected — three endings at
once is the do/z cliff.

### O10 · Genitive-plural completion is taught as closed sets, not a rule

**Default:** `b2_gen_pl_full` opens what `a2_gen_pl` fenced (vowel-shift
`szkół`; fleeting-e `książek`, `okien`; soft-stem masculines) as **whole forms
grouped into visible families**, never as a productive rule the learner is
asked to apply to an unseen noun — the `kelnerzy`/`mógłby`/family-datives
treatment. Verified NEW: `szkół`, `książek`, `okien`.

**Alternative:** state the fleeting-e rule productively. Rejected: it has
genuine exceptions and this learner gets no value from a rule he cannot trust.

### O11 · `prosić o` gets its own small unit

**Default:** `b2_prosic_o`. `b1_giving`'s note deferred it and asked James to
decide whether it needs a slot; `b1_polite` separately dropped *Poproszę o…*
for the same reason. Both gave the same argument: `o` is already taught as a
**Locative** governor (`o_loc`: *mówię o pracy*), so `o` + **Accusative** is a
live homograph trap **on a function word**. That is precisely why it deserves
its own moment rather than a line inside a vocab leaf.

### O12 · Travel logistics is a SITUATIONS unit, not a vocab leaf

**Default:** `b2_travel_func`, chunk-lane. Evidence, not preference: of 16
obvious travel-logistics nouns run through `check_new.py`, **12 are already
taught** — `lotnisko`, `peron`, `dworzec`, `bilet`, `przesiadka`,
`opóźnienie`, `bagaż`, `walizka`, `rezerwacja`, `odjazd`, `przyjazd`,
`rozkład`. The learner's gap in this domain is not words, it is what to *say*
at the desk. Only `nocleg`, `zakwaterowanie`, `odlot`, `przylot` came back NEW.

**Alternative:** a thin 8-word vocab leaf. Rejected — it would re-teach owned
material to fill a board, exactly what the vocab-register principle forbids.

### O13 · `b2_double_neg` added beyond the brief's list

**Default:** included. Polish obligatory double negation (*Nikt nie wie*,
*Nigdzie nie idę*) is an honest everyday gap: `nikt`, `nigdzie`, `żaden` all
verified NEW, while `nic` and `nigdy` are already taught — so the learner has
half the set and none of the syntax. Logged as an addition, not a silent guess
(the `na szczęście` / `nie zgadzać się` / `mało` precedent).

### O14 · `b2_conjunctions` is the first unit of B2

**Default:** first, before the adjective block. `check_new.py` returns **NEW**
for `ale`, `a`, `też`, `więc`, `albo`, `już`, `jeszcze`, `dlatego` — a
genuinely surprising hole (three separate B1 packs record catching `ale`, `a`
and `też` leaking into drafts and having to rewrite around them). It costs no
grammar and every B2 example sentence written after it is better for it.

### O15 · Vocative stays closed; `siebie`/`sobie` deferred to C1

**Default:** James's B1 decision #4 (vocative = chunk lane only, never a case,
no endings rule) carries forward unchanged through B2. `siebie`/`sobie` (the
true reflexive pronoun, as opposed to `a2_sie`'s "word belonging to the verb")
is C1.

### O16 · Three homograph / frozen-chunk traps that `check_new.py` will report as TAUGHT

Not forks — advance warnings, in the tradition of `b1_virile_reco`'s note
predicting the `ci`/`ci` collision one batch before it bit.

| Form | `check_new.py` says | What it actually is | Who must handle it |
|---|---|---|---|
| `że` | TAUGHT ← `b1_polite` | frozen inside *Przepraszam, że przeszkadzam*; never a productive conjunction. `b1_polite`'s own note says "że and przeszkadzam both verified untaught… never built" | `b2_ze_clauses` — re-teach explicitly, `dziękuję`/`której` precedent (chunk → real slot) |
| `nowego` | TAUGHT ← `a2_smalltalk` | frozen inside *nic nowego*; a genitive adjective the learner has never been shown as one | `b2_adj_gen` |
| `o` | TAUGHT ← `a2_o_loc` | taught as a **Locative** governor only | `b2_prosic_o` (see O11) |
| `mnie` | TAUGHT ← `a2_dat_chunks` | frozen inside *boli mnie*, and `a2_dat_chunks`' note says outright it is **accusative, deliberately not explained** | `b2_pron_acc` — this unit finally pays that IOU |

And one genuine **anchor**, not a trap: `dobrą`/`nową` really were taught as
feminine accusatives (`a1_miec`, *Mam dobrą kawę*). `b2_adj_acc` should lean on
that hard.

---

## Standing fences for ALL of B2

- **Stations stay `planned` forever.** `b2_station_1` / `b2_station_2` are
  permanent placeholders, same as A2's four and B1's two. Never authored,
  never flipped live.
- **No participle except the passive adjectival one** (O4), and only in
  predicate position. `robiąc`, `zrobiwszy`, `pracujący` appear nowhere in B2
  — not in a slide, not as a distractor.
- **No `zostać` passive** anywhere in B2 (O5).
- **No conditional past** anywhere in B2 (O6).
- **No plural oblique adjectives** anywhere in B2 (O3) — including as quiz
  distractors.
- **No productive prefix-semantics rule** (O7.3); aspect prefixes are a closed
  memorised list and every pack must say so.
- **The Vocative is never named as a case** (O15).
- **`siebie`/`sobie` appear nowhere** (O15).
- **Adjective oblique endings are fenced until their own unit.** `b2_adj_acc`
  must not show `-ego`; `b2_adj_gen` must not show `-ym`; and so on down the
  ladder in O2. This is the single easiest fence in B2 to break by accident,
  because the forms are so close together.
- **Oblique pronouns are fenced until `b2_pron_acc` / `b2_pron_prep`** — `go`,
  `ją`, `cię`, `nim`, `niej`, `nich`, `nimi` were all verified NEW and several
  were caught leaking into B1 drafts (`b1_case_gym` rejected `go`/`jemu`,
  `a2_phone_func` dropped `cię`). Note the known auditor blind spot: person
  pronouns sit in `audit.py`'s `GLUE_LEMMAS`, so **the machine will not catch
  a pronoun leak — this fence is author discipline only.**
- Aspect glossing rules from AGENTS.md apply throughout, including
  `b1_two_futures`' rule that future glosses distinguish "will do (once,
  finished)" from "will be doing".

---

## The spine, in path order

### Block 1 — Cheap wins first

| id | domain | what it does |
|----|--------|--------------|
| `b2_conjunctions` | GRAM (links) | The function words the course somehow never taught (O14). All verified NEW: **ale, a, więc, albo, też, już, jeszcze**. Zero new morphology — these are invariable words joining clauses the learner can already build. `bo` (a2_questions2) and `i` (a2_past_plural) are anchors, never re-taught. The one real teaching point is `ale` vs `a` (contrast vs mere juxtaposition) — one contrast, taught with a table, not derived. |
| `b2_copular_future` | GRAM | *Będę w domu. Będzie dobrze. Będę zmęczony.* Pays `a2_bedzie`'s explicitly accepted gap: "the COPULAR future is NOT taught… consequence, accepted: 'I will be at home' is not yet expressible." **Zero new forms** — `będę`…`będą` are all owned, every place phrase and predicate adjective is owned. The whole unit is the syntactic fact that `być`'s future needs no infinitive after it. Cheapest high-value unit in B2; that is why it is second. |
| `b2_fem_soft` | GRAM | **Pays B1-DIGEST deferred item #1.** The general feminine Dative/Locative rule `b1_dative_sg` refused to derive: feminine `-a` → `-e` **with softening of the stem consonant** (`mama→mamie`, `siostra→siostrze`, `szkoła→szkole`, `kobieta→kobiecie`), plus the `-i` sub-class after a soft stem (`kuchnia→kuchni`, `praca→pracy`). `b1_dative_sg` handed `mamie/tacie/siostrze` over as four memorised words and logged "the general feminine dative/locative rule stays untaught… James should decide whether it needs a slot." This is that slot. **The gift, stated openly:** Dative and Locative are the *same form* for feminine nouns, so one rule pays for two cases. Anchors on both sides are already taught: `szkole`, `pracy` (Locative, `a1_prep_place`), `mamie`, `siostrze`, `tacie` (Dative, `b1_dative_sg`). Verified NEW and available to teach: `kuchni`, `sypialni`, `łazience`, `ulicy`. |

### Block 2 — The adjective takes cases (O2)

| id | domain | what it does |
|----|--------|--------------|
| `b2_adj_acc` | GRAM | Adjectives in the Accusative. **No new endings.** Feminine `-ą` is already owned (`dobrą`, `nową`, `a1_miec`) and is generalised to more adjectives; masculine-inanimate and neuter are unchanged from the Nominative, which is the relief slide. **FENCED:** masculine-**animate** (`dobrego psa`) waits for `b2_adj_gen`, where `-ego` is actually taught. |
| `b2_adj_gen` | GRAM | `-ego` (m/n) and `-ej` (f). Payoffs on owned governors only: `nie ma dobrej kawy` (`negation`), `do dużego sklepu` (`prep_do_gen`), `dużo zimnej wody` (`a1_gen_endings`). Masculine-animate Accusative folds in here as the honest Acc≡Gen exception AGENTS.md already names. **Trap:** `nowego` reports TAUGHT (O16). |
| `b2_work` | VOCAB | Work & office register. Verified NEW: **wynagrodzenie, zwolnienie, nadgodziny, obowiązek, stanowisko, podanie, rozmowa, zatrudnienie, wykształcenie, kwalifikacje, etat, raport**. Anchors, never re-taught (all verified TAUGHT): umowa, awans, premia, pracodawca, doświadczenie (`a2_work2`); pensja, firma, szef, pracownik, biuro, spotkanie, kariera (`leaf_work_a1`); zarabiać (`a2_shopping2`). Interleaved here so the adjective block is not six grammar units in a row. |
| `b2_adj_loc` | GRAM | `-ym` (m/n) new; `-ej` (f) recycled from Gen one unit ago. Rides all three Locative governors already owned: `w`/`na` (`prep_w_loc`), `o` (`o_loc`). *W nowej pracy. Myślę o dobrym filmie.* |
| `b2_adj_inst` | GRAM | **No new endings** — `-ym` from Loc, `-ą` from Acc. The course's signature "same endings, another job" unit (`inst_identity` → `inst_z` → `inst_transport` is the precedent, and this is the fourth turn of it). *Jestem dobrym nauczycielem. Jadę z miłą siostrą. Jadę nowym autobusem.* |
| `b2_adj_dat` | GRAM | `-emu` (m/n) new; `-ej` (f) recycled twice over. Small by design. Rides `pomagać`/`dawać`/`dziękować` from B1's dative block. |
| `b2_adj_gym` | GRAM gym | Zero new. Six-way adjective-case discrimination on one or two adjectives across many nouns. `teaches_*` empty, gym idiom (`a1_case_gym` line). |

### Block 3 — Pronouns take cases

| id | domain | what it does |
|----|--------|--------------|
| `b2_pron_acc` | GRAM | Accusative personal pronouns: **mnie, cię, go, ją, nas, was, ich** (all NEW except `mnie`). **The payoff is an IOU three levels old:** `a2_dat_chunks` taught *boli mnie* and its note says "mnie in boli mnie is accusative, not dative — deliberately NOT explained." This unit explains it. Contrast with the Dative set `b1_dative_pron` already owns (mi/ci/mu/jej) is the unit's second half, and it is a *contrast*, not new material. |
| `b2_pron_prep` | GRAM | The `n-` forms after prepositions: **o nim, o niej, z nim, z nią, do niego, dla niej** (`nim`, `niej`, `nich`, `nimi` all NEW). Pays `a2_o_loc`'s named fence: "pronoun objects — o tobie, o mnie, o nim, o niej… need their own small unit." This is it. Each preposition reuses its already-taught case; only the pronoun shape is new. |
| `b2_kim_czym` | GRAM | The oblique question words: **kim, czym, kogo, czego, komu** (all NEW). Pays two named fences at once — `a2_inst_z`'s ("`kim` is a new pronoun form and is not in POOL… if James wants *Z kim?* as a live question it needs its own small unit", the fence behind one of AGENTS.md's three title-rule violations) and `a2_o_loc`'s (`o czym` kept out of every slide *and* out of `body_pl`). Deliberately small. |
| `b2_health_system` | VOCAB | Health *system* register — navigating care, not body parts (A1/A2 own those). Verified NEW: **skierowanie, leczenie, objaw, diagnoza, oddział, pogotowie, zabieg, operacja, specjalista, rejestracja, wyniki, izba**. Anchors, never re-taught: karetka (`leaf_health_a1`), ubezpieczenie (`a2_health2`), kolejka (`leaf_shopping_a1`), and all of `a1_health`/`a2_health2`'s vocabulary. |
| `b2_station_1` | station | Placeholder. `planned` forever. |

### Block 4 — Complex sentences

| id | domain | what it does |
|----|--------|--------------|
| `b2_ze_clauses` | GRAM | `że` as a productive complement conjunction: *Wiem, że… / Myślę, że… / Mówił, że…* Rides `wiem` (`a2_directions_func`), `myślę` (`a2_o_loc`), `mówił`/`mówiła` (`a2_past_rest`) — all owned, so the only new thing is the joint. **Trap: `że` reports TAUGHT** (O16) — frozen inside *Przepraszam, że przeszkadzam*. Re-teach explicitly, same treatment `b1_dative_sg` gave `dziękuję` and `b1_ktory_cases` gave `której`, and say so on the slide: "you already say this word, just never like this." Also teaches the comma, which Polish requires and English does not — one line, one fact. |
| `b2_reported` | GRAM | Reported speech. **One new fact, and it is a relief:** Polish does not back-shift the tense. *"Jestem zmęczony" → Powiedział, że jest zmęczony* — the reported verb keeps the tense actually spoken. Framed like `a2_bedzie`'s "the future has no gender" gift. Verbs: `mówił`/`mówiła` (owned) carry the unit; `powiedział`/`powiedziała` (NEW) taught here as the perfective twin, whole, per the O7.2 closed-list treatment. |
| `b2_indirect_q` | GRAM | Indirect questions — **`a2_questions2`'s own fence, named there and never built**: "no indirect questions (Nie wiem, kiedy… is B1)." *Nie wiem, gdzie on mieszka. Nie wiem, czy…* Every question word is already owned (`gdzie`, `kiedy`, `ile`, `czy`, `dlaczego`, `który`); `czy` doing double duty as "whether" is the one new job and is named as such. |
| `b2_ktory_full` | GRAM | **Pays B1-DIGEST deferred item #2**, both halves. (a) Locative and Instrumental relatives (*film, o którym mówiłem*; *kolega, z którym pracuję*) — `b1_ktory_cases` fenced these completely and logged "deferred to a later pass or a dedicated unit." (b) Masculine-**animate** antecedents (*pies, którego mam*) — fenced there because `którego` would then sit in the Accusative table for a *different* reason than in the Genitive table; that objection dissolves now, because `b2_adj_gen` has since taught Acc≡Gen for masculine animates as a general fact. Sits after the adjective block for exactly that reason. |
| `b2_abstract` | VOCAB | Abstract-discussion nouns — the vocabulary opinions actually need. Verified NEW: **przyczyna, skutek, wpływ, zmiana, rozwiązanie, korzyść, wada, zaleta, cel, sposób, wartość, możliwość, wybór, decyzja, społeczeństwo, środowisko**. Anchors, never re-taught: powód, sytuacja, przyszłość, przeszłość (`leaf_ideas_a1`), problem, przykład, znaczenie (`leaf_school_a1`), and all of `b1_opinions`. Trim to 12; the list is deliberately longer than the unit needs so the author can drop any word whose oblique forms would cost extra. |
| `b2_jesli` | GRAM | Real conditions: `jeśli` + present/future. *Jeśli będzie ładna pogoda, będę w parku.* (`jeśli` NEW.) Zero new morphology — both halves are tenses the learner owns, and `b2_copular_future` back in Block 1 is what makes the natural apodosis expressible. |
| `b2_gdyby` | GRAM | Unreal conditions: `gdybym`/`gdybyś`/`gdyby` + L-form, main clause in the conditional. *Gdybym miał czas, poszedłbym…* Pays `b1_conditional_sg`'s named fence ("no gdybym/jeśli…by clauses — simple wishes and soft requests only"). The person marker on `gdyby` is the **identical** `-m`/`-ś`/zero family already owned twice over (`bym/byś/by` from the conditional units, `żebym/żebyś` from `b1_zeby`) — say so; it is the third turn of one pattern, not a new one. |

### Block 5 — Plural cases completed

| id | domain | what it does |
|----|--------|--------------|
| `b2_loc_pl` | GRAM | Locative plural `-ach`. One ending, no gender split, essentially no exceptions — the easiest unit in B2 and placed first in the block for that reason. *W domach. W sklepach.* Note `w górach` is already taught whole (`a2_travel`) and is the anchor: "you have been saying one of these since A2." |
| `b2_inst_pl` | GRAM | Instrumental plural `-ami`. Pays `a2_inst_z`'s named fence. *Z rodzicami. Z kolegami.* (`rodzicami` NEW; `rodzice` owned from `a2_family2`.) `dziećmi`/`ludźmi` are irregular — taught whole or fenced, author's conservative call, logged in the pack. |
| `b2_dat_pl` | GRAM | Dative plural `-om`. One ending. Rides B1's dative verbs. *Pomagam studentom. Dziękuję rodzicom.* Deliberately small (O9). |
| `b2_gen_pl_full` | GRAM | Opens what `a2_gen_pl` fenced, as closed families of whole forms, not a rule (O10): vowel-shift (`szkół`), fleeting-e (`książek`, `okien`), soft-stem masculines. Every noun used must already be owned in the Nominative plural. |
| `b2_num_subject` | GRAM | 5+ numeral phrase as grammatical **subject** → neuter-singular verb (*Pięć osób było w sklepie*). `a2_numbers_gen`'s own deferral, never built (O8). One fact, one unit. |
| `b2_num_virile` | GRAM | Virile numerals: *pięciu studentów, dwóch lekarzy*. `a2_numbers_gen`'s other deferral (O8). Sits deep in B2 because it needs the whole virile block (B1) **and** Gen-pl completion. Closed set of numerals only; no derivation rule. |
| `b2_plural_gym` | GRAM gym | Zero new. All seven plural jobs the learner now owns (Nom, Acc, Gen, Loc, Inst, Dat, + virile Nom) in one discrimination board. |

### Block 6 — The verb system completed

| id | domain | what it does |
|----|--------|--------------|
| `b2_neg_gen` | GRAM | The genitive of negation, generalised past `nie mam`. `a1_negation` taught *nie mam kawy* as a fact about `mieć`; it is a fact about **every** negated transitive verb (*Nie kupiłem chleba. Nie widzę kawy.*). One rule extension, high frequency, and it explains a pattern the learner has already met without a name. |
| `b2_double_neg` | GRAM | Obligatory double negation (O13): **nikt, nigdzie, żaden** (NEW) with an obligatory second `nie` on the verb — *Nikt nie wie. Nigdzie nie idę.* `nic` and `nigdy` are already owned and are the anchors. English speakers get this wrong permanently unless it is named, so it is named. |
| `b2_sie_impersonal` | GRAM | Impersonal `się`: *Jak się mówi po polsku? Tu się nie pali. Mówi się, że…* Extends `a2_sie`'s framing (`się` belongs to the verb) to a construction with no subject at all. Verb always 3sg. Big functional payoff for someone reading signs. |
| `b2_prosic_o` | GRAM | `prosić o` + **Accusative** (O11). `prosić` NEW; `o` reports TAUGHT as a Locative governor (O16). Restores *Poproszę o…*, which `b1_polite` dropped for exactly this reason. Small, contrastive, and the contrast (*mówię o pracy* vs *proszę o kawę*) is the unit. |
| `b2_jezdzic` | GRAM | Closes the motion grid `a2_chodzic` left open. That pack fenced `jeździć` so hard its own note says the word is "not named, glossed, hinted at or used as a distractor anywhere in this file, note included." Four verbs finally in one table: `idę`/`chodzę` (on foot, now/habitually) × `jadę`/`jeżdżę` (by vehicle, now/habitually). Only `jeżdżę`'s forms are new; the whole four-way grid is the payoff. |
| `b2_motion_prefixes2` | GRAM | More prefixes on the owned motion stems (O7.1): `pójść`, `wejść`, `dojść`, `przejść` and their `-jechać` partners. `b1_arrive_leave` taught only `przy-`/`wy-`; `b1_wrapup`'s digest records `poszedłem` being caught and rejected as an untaught third prefix. Same treatment as `b1_arrive_leave`: the prefix welds onto a stem table the learner already has. |
| `b2_aspect_prefixes` | GRAM | A closed set of new aspect pairs, learned whole, **no rule** (O7.2): `pisać/napisać`, `gotować/ugotować`, `jeść/zjeść`, `płacić/zapłacić`, `sprzątać/posprzątać`. Every imperfective member is already owned, so each pair is one new word, not two. Pays `a2_aspect`'s four-twins-only limit without breaking its "prefixes are unpredictable" framing — the pack must restate that framing out loud. |
| `b2_powinien` | GRAM | Modal completion, paying two `a2_musiec` fences ("past of musieć — it would hand back the gender this unit just removed"; "conditional powinienem" dropped). Teaches `powinienem`/`powinnam`/`powinien`/`powinna` (NEW — obligation with gender, unusual and worth naming) plus the past of the modals the learner owns: `musiałem`/`musiała`, `trzeba było`, `można było` — all straight applications of the `past_ac` rule he has had since A2. |

### Block 6a — Prefix strand (JAMES-LOCKED 2026-08-06 — see O7 overrule)

Sits immediately after `b2_aspect_prefixes` on the path, which is deliberate:
by then the learner owns prefixed motion (przy-/wy- since B1, po-/we-/do-/prze-
from `b2_motion_prefixes2`), five new aspect twins, and `oddawać` (b1_giving) —
everything the lens needs to point at, all of it already taught.

| id | domain | what it does |
|----|--------|--------------|
| `b2_motion_imperf` | GRAM | The secondary-imperfective bridge: `wychodzić`/`przychodzić` (+ `wyjeżdżać`/`przyjeżdżać` if load allows — author's call, logged) as the everyday "I leave the house at 8" partners of the owned `wyjść`/`przyjść`/`wyjechać`/`przyjechać`. Taught as MEMORIZED WHOLE TWINS (miałem/mógłby treatment) — the -ywa-/-a- formation rule is NOT stated; C1 names it (locked decision #4). These conjugate as owned classes (wychodzę like chodzę), so each is one new word, not a new system. |
| `b2_prefix_lens` | GRAM | RECEPTIVE-ONLY recognition lens on the core 4: **wy- = out, przy- = to/arrive, do- = reach/up-to, od- = away/back**. Every example is an ALREADY-TAUGHT verb re-seen through the lens (wyjść/wychodzić/wyjechać, przyjść/przyjechać, dojść, oddawać) — zero or near-zero new lemmas. Tasks are recognition/discrimination only (match meaning-halves, quiz on which direction a sentence implies); the learner NEVER types a prefixed verb the course didn't teach, and the intro says out loud: "you can READ these; don't build new ones — Polish doesn't always cooperate." za-/po-/prze- are explicitly named as "no promise" prefixes, one line, no examples drilled. |
| `b2_prefix_two_jobs` | GRAM | The James-question unit (locked decision #3), b1_two_futures idiom, ZERO new material: prefixes do two different jobs — (1) `robić→zrobić`, `pić→wypić`: same verb, prefix just means DONE (and the future flips: zrobię); (2) `iść→przyjść`, `dawać→oddawać`: a NEW verb with its own meaning (and its own twin: przychodzić). Discrimination tasks: given an owned pair, which job is the prefix doing? Uses only verbs taught by this point. The honest line the unit must land: "same machinery, two jobs — you always learn which job from the pair itself, not from the prefix." |
| `b2_pisac_family` | GRAM | First root family (locked decision #6): `pisać`/`napisać` (owned by now) grows `podpisać` (sign) and `zapisać` (write down/note) — office/admin register, real-life payoff for forms. Each new perfective comes with its everyday imperfective partner as a whole twin where genuinely needed (`podpisywać` — sign habitually, e.g. documents at work); `przepisać`/`opisać` only if load allows, author's call, logged. Family framing: "one root you know deeply, new directions bolted on" — the lens applies where honest (za- is NOT lens-claimed; podpisać's pod- gets a one-line story, not a rule). |
| `b2_verb_family2` | GRAM | Second root family — AUTHOR PICKS the root, logs the choice + alternative: `dawać` (oddawać owned → `wydawać` spend, `podawać` pass/serve) or `płacić` (zapłacić owned → `dopłacić`, `przepłacić`). Pick whichever yields the more useful everyday register with fewer untaught-case landmines; same whole-twin treatment for any imperfective partners. Further families are C1 material (locked decision #6). |

### Block 7 — Verbal nouns and the first participle

| id | domain | what it does |
|----|--------|--------------|
| `b2_verbal_nouns` | GRAM | The `-anie`/`-enie` pattern. **Exceptionally well anchored:** `check_new.py` confirms `pisanie`, `czytanie`, `pływanie`, `bieganie`, `spotkanie` are **already taught** — as ordinary nouns, since A1. So the unit's whole idea is "five words you already know are made from verbs you already know, and the pattern is regular." Produces `gotowanie`, `sprzątanie`, `mówienie`, `robienie` (NEW). Gender is uniformly neuter — a second gift, since it makes every one of them decline in a pattern already owned. |
| `b2_participle_pass` | GRAM | The passive adjectival participle (O4), predicate position only: `zrobiony`, `napisany` (NEW), anchored on `otwarty`/`zamknięty`, **already taught as plain adjectives** (`leaf_shopping_a1`). Agrees like any adjective — which the learner has just spent Block 2 learning, so agreement costs nothing. Attributive/declined use is fenced to C1. |
| `b2_passive` | GRAM | `być` + participle (O5): *Sklep jest zamknięty. Praca jest zrobiona. Obiad był ugotowany.* Zero new forms — the participles come from the unit before, `być` is owned in all three tenses. `zostać` is fenced. |

### Block 8 — Registers and closers

| id | domain | what it does |
|----|--------|--------------|
| `b2_travel_func` | GRAM chunk | Situations unit, travel logistics (O12): checking in, the delayed train, the booked room. Genre of `a2_directions_func` / `b1_polite`. Verified NEW and available: `nocleg`, `odlot`, `przylot`, `wsiadać`, `wysiadać`, `potwierdzić`, `ważny`, `doba`, plus `opóźniony`/`odwołany` — which are **passive participles**, so this unit sits immediately after `b2_participle_pass` on purpose and gets them for free. Every noun (`peron`, `dworzec`, `bagaż`, `rozkład`, `rezerwacja`…) is recycled, never re-taught. |
| `b2_discussion_func` | GRAM chunk | Situations unit: taking part in a discussion. Agreeing, disagreeing politely, asking someone to expand, conceding a point. Recombines `b1_opinions`, `b2_ze_clauses`, `b2_abstract` and the conditional. Candidates verified NEW: `uważam`, `wydaje mi się`, `zależy`, `raczej`, `właśnie`, `według`. |
| `b2_case_gym` | GRAM gym | Zero new. Extends `b1_case_gym`'s eleven jobs with everything B2 added: adjective agreement in five cases, oblique pronouns, the three plural obliques. This board will be dense — split across two intro slides rather than compressing, and log the call. |
| `b2_wrapup` | GRAM chunk | B2 capstone, genre of `a2_wrapup_func` / `b1_wrapup`. Zero new. Recombines the registers B2 added — work, health system, travel logistics, discussion — into mixed scenes. Four registers, matching `b1_wrapup`'s own deliberate four-way limit; do not stack a fifth. |
| `b2_station_2` | station | Placeholder. `planned` forever. |

---

## Vocab register principle (carried from B1, unchanged and reinforced)

B2 vocab does not revisit A1/A2/B1 topic domains. It adds four registers:
work & office, the health *system*, travel *logistics* (as chunks, per O12),
and abstract discussion.

The travel finding in O12 is the standing warning for whoever writes these:
**a domain that feels obviously "B2" may already be almost entirely taught.**
Run `check_new.py` on every candidate before the brief claims it is new, and
run the taught-**AS** check on every reused form.

---

## What B2 deliberately leaves to C1

C1 is the last level, so this list is C1's inbox and must be complete. Every
item here is either a B2 fork logged above or an older IOU B2 chose not to
take:

1. Adjective plural oblique cases — `dobrych`, `dobrym`, `dobrymi` (O3).
2. Adverbial participles `robiąc` / `zrobiwszy`; active adjectival participle
   `pracujący`; attributive **declined** participles (O4).
3. The `zostać` dynamic passive (O5).
4. Conditional past `byłbym zrobił` (O6).
5. Productive semantic prefixation on non-motion verbs (O7.3).
6. `siebie` / `sobie`, the true reflexive pronoun (O15).
7. **The secondary-imperfective formation rule** (-ywa-/-iwa-/-a-: podpisać→
   podpisywać, wychodzić from wyjść) — B2 teaches these pairs as memorized
   whole twins only (Block 6a, James-locked decision #4); C1 MUST name the
   rule in its own unit, once enough pairs are owned for it to click. Also
   C1's inbox: further root families beyond pisać + family2 (decision #6),
   and any lens extension beyond the core 4 prefixes (James's call, not the
   scoper's).
7. The Vocative as a case, if James ever overrules B1 decision #4 (O15).
8. Soft-stem and irregular noun declensions not reached by B2's closed sets;
   the `-owie` masculine plural family; `brat→bracia`, `kolega→koledzy`,
   `mężczyzna→mężczyźni`, `człowiek→ludzie` as a derivable class rather than
   individually-memorised words (`b1_virile_nom`'s fence).
9. `kelner→kelnerzy` (`r→rz`) and the rest of the virile alternations
   `b1_virile_nom` left recognition-only.
10. Virile plural **adjectives** beyond the whole-form `dobrzy`
    (`mali`, `duzi`, `zmęczeni` — all verified NEW; flagged as needing a
    James decision in `b1_virile_nom`'s own note and again in
    `b1_virile_gym`'s).
11. `bardziej` / `najbardziej` + adjective — the analytic comparative
    `a1_comparatives` and `a2_superlatives` both deferred (both verified NEW).
12. `nie mieć racji` and the soft `-cja` genitive class (`b1_opinions`' logged
    scope cut).
13. `pożyczać` in its borrow-**from** sense, needing `od` + Genitive as a new
    job (`b1_giving`'s logged sense cut).
14. `stać się` as a real reflexive paradigm rather than the three frozen chunks
    `b1_stories_func` shipped (its own logged fork).
15. `robić→rób` and the stem-alternating imperatives `b1_imperative_rule`
    fenced; `daj` explained rather than opaque; imperative plural and the
    `niech pan…` formal imperative.
16. Plural `żebyśmy`/`żebyście` (`b1_zeby`'s logged scope cut).
17. `chcieć`'s `chcie-`/`chcia-` vowel alternation, still handed over as
    memorised whole forms (`b1_conditional_pl`'s flagged call).
18. The general proper-name Vocative pattern beyond `Panie Piotrze!` /
    `Pani Anno!` (`b1_vocative_chunks`' logged scope cut).
19. Clitic and general word order; `się` placement beyond "after the verb"
    (`a2_sie`'s fence).
20. Minutes-past-the-hour, `wpół do`, `za piętnaście`, and full dates with
    month Locatives (`a2_ordinals_time`' and `a2_celebrations`' fences).
21. Collective numerals (`dwoje`, `troje`).
22. Stylistic register: formal vs colloquial, and the written/spoken split.
23. Complex subordination beyond B2's `że`/`żeby`/`jeśli`/`gdyby`/`który`:
    `mimo że`, `chociaż`, `dlatego że`, `podczas gdy` (all verified NEW).
24. `boleć` and the accusative-governing verb class `b1_dative_pron`
    deliberately excluded.
25. Past forms of verbs the course only ever taught in the present — the
    `b1_wrapup` digest names `jechać`, `pomagać`, `pomóc` specifically.

Whoever writes `codex/C1-SPINE.md` should treat this list as the starting
inventory, then re-sweep `tree.json` and both digests independently rather than
trusting it to be complete.

---

## Build protocol (unchanged from A2 and B1)

Position-aware pool (`make_pool.py --before <node>`) regenerated before every
batch · author each unit directly, in full, one at a time · every recycled form
re-checked for what it was taught **AS** · new structure IDs registered in
`SEQUENCING.md` **and** `audit.py`'s `STRUCTURE_CATALOGUE` **before** the audit
runs · `audit.py` reports **0 errors** before any commit · commit and push per
unit, not batched · digest entry appended to `codex/B2-DIGEST.md` per batch ·
2–3 units per run, never a whole block.

**One extra standing instruction, from `b1_wrapup`'s digest:** the `label` and
`label_en` this document implies, and any `label` written into `tree.json` when
these nodes are created as `planned`, are **drafts**. Batch 10 of B1 caught two
learner-visible titles carrying untaught Polish (`wszystkie przypadki`) and a
raw level code. Re-run `check_new.py` on every word of every title at the
moment the unit is wired live, and correct `tree.json` to match.
