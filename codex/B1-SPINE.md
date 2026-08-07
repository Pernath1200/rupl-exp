# B1 Spine — locked 2026-08-05 (James, dropdown design session)

Status: **DECIDED, not draft.** The eight structural decisions below were made
by James interactively, the same way the A2 decisions were. Agents execute
this; they do not re-open it. Genuine forks *within* a unit still get the
conservative default + a logged note, as always.

## James's locked decisions

| # | Decision | Ruling |
|---|----------|--------|
| 1 | Virile plural | **Three units**: recognition → Nominative production → past agreement. One new thing per unit, matching the do/z-cliff precedent. |
| 2 | Perfective future | **Own unit first** (the future of the taught twins: kupiłem → kupię), **contrast unit second** (kupię vs będę kupować). The A2 "Polish has one future" claim is amended in a dedicated moment, never in passing. |
| 3 | Conditional | **Singular first** (bym/byś/by, chciałbym/chciałabym payoff). Plural conditional (-libyśmy/-łybyśmy) waits until AFTER the virile block — it inherits the -li/-ły problem. |
| 4 | Vocative | **Chunk-lane only.** Mamo, Tato, Babciu, panie/pani + name, learned whole. Never taught as a case, no endings rule. |
| 5 | Build cadence | Grammar spine prioritised, vocab interleaved where the spine calls for it; verified batch-by-batch; pushed to b1-build as each audit passes. |
| 6 | Authoring model | Fable for unit authoring (James's standing rule: shippable target-language content). |
| 7 | Cloud routine | Disabled while local night builds run; re-enable only when no local session is building. |
| 8 | Standing A2 rules carry forward | Both-gender production, load-splitting, anchor rule, homograph checks, every-form-taught, title rules — all of AGENTS.md, unchanged. |

## Standing fences for ALL of B1

- **No plural conditional before `b1_conditional_pl`** (which sits after the virile block).
- **oni/one pronouns are untaught until `b1_virile_past`** — A2 deliberately dropped them; nothing before that unit may use them.
- **Vocative appears only in `b1_vocative_chunks`**, only as whole address forms.
- **The perfective future is fenced until `b1_perf_future`** — same absolute fence A2 held, lifted only there.
- **iść's past (szedłem/szłam…) is fenced until `b1_past_isc`** — it is the one suppletive past in the course so far and gets its own moment.
- Aspect glossing rules from AGENTS.md apply throughout; after `b1_two_futures`, future glosses must distinguish "will do (once, finished)" from "will be doing".

## The spine, in path order

### Block 1 — Aspect completed (payoff of a2_aspect, highest value first)

| id | domain | what it does |
|----|--------|--------------|
| `b1_perf_future` | GRAM | The four taught twins get their future: kupię, zrobię, wypiję, przeczytam (+ persons, singular + plural — no gender in future, same relief as będę). Framed as "the past you know, pointed forwards": kupiłem → kupię, same stem. Explicitly amends A2's one-future claim: "you now know the second future — it was waiting for these verbs." |
| `b1_two_futures` | GRAM | The honest contrast: będę kupować (ongoing/repeated) vs kupię (once, finished). Decision rule taught through time words (jutro rano kupię chleb / codziennie będę kupować chleb). No new forms — pure discrimination on the two futures now owned. |
| `b1_plans` | VOCAB | Plans & arrangements register riding the new future. Candidates (CHECK each with check_new.py): planować, zamierzać, spotkać się (check — pf was pooled early), termin, kalendarz, obiecać?, załatwić? Keep to 10–12 genuinely new. |
| `b1_aspect_gym` | GRAM gym | Past + future aspect discrimination, zero new material. |

### Block 2 — Conditional (singular)

| id | domain | what it does |
|----|--------|--------------|
| `b1_conditional_sg` | GRAM | bym/byś/by riding the past forms he owns: chciałbym/chciałabym, kupiłbym, zrobiłabyś. Polite-request payoff (Chciałbym kawę → politer than Chcę). Gender agreement comes free from the past stems. PLURAL FENCED. |
| `b1_polite` | GRAM chunk | Politeness register chunks: Czy mógłby pan…? / Poproszę o… — mógłby taught WHOLE (móc's conditional is irregular; no paradigm). Situation-chunk genre. |

### Block 3 — Motion completed

| id | domain | what it does |
|----|--------|--------------|
| `b1_past_isc` | GRAM | The suppletive past of iść: szedłem/szłam, szedłeś/szłaś, szedł/szła/szło — taught WHOLE like miałem, with the m/f stem split (szed-/sz-) named as a table fact, not a rule. The one truly irregular past so far; gets its own undiluted unit. |
| `b1_arrive_leave` | GRAM | przyjść/wyjść (przyszedłem/wyszedłem — the szedł stems + prefix, so b1_past_isc must precede) and przyjechać/wyjechać (regular -ał). Arrive/leave as aspect-natural pairs; future forms (przyjdę/wyjdę/przyjadę/wyjadę) taught here too since b1_perf_future precedes. |
| `b1_journeys` | VOCAB | Narrative-journey register: spóźnić się (check), zgubić się?, po drodze, w drodze, wracać już pooled — verify everything. |

### Block 4 — The virile block (James: three units)

| id | domain | what it does |
|----|--------|--------------|
| `b1_virile_reco` | GRAM | RECOGNITION only: reading ci/-i/-y virile forms (ci studenci, dobrzy lekarze, Polacy). Learner never produces a virile form; every task is comprehension/discrimination. |
| `b1_virile_nom` | GRAM | PRODUCTION of virile Nominative plural, REGULAR consonant sets only (student→studenci, Polak→Polacy, lekarz→lekarze). Irregulars (brat→bracia, człowiek→ludzie) taught whole or fenced — author decides conservatively and logs it. |
| `b1_virile_past` | GRAM | The full agreement system: oni byli/pracowali vs one były/pracowały. Extends A2's people-vs-everything-else rule into real grammar. **Teaches oni/one at last.** |
| `b1_people` | VOCAB | People/professions in the plural register — the vocab that makes the virile units worth having. |
| `b1_virile_gym` | GRAM gym | Virile vs non-virile discrimination, zero new. |
| `b1_conditional_pl` | GRAM | Plural conditional (chcielibyśmy/chciałybyśmy…) — deferred to here by James's decision #3, since it rides -li/-ły. |
| `b1_station_1` | station | Rep bank placeholder (planned; bank authored when the block is live, engine still future work). |

### Block 5 — Dative completed

| id | domain | what it does |
|----|--------|--------------|
| `b1_dative_sg` | GRAM | The case behind the A2 chunks: noun datives singular (mamie, tacie, bratu, siostrze) with pomagać/dawać/dziękować. The mi/mnie chunks finally explained as a case doing a job. |
| `b1_dative_pron` | GRAM | The pronoun set A2 fenced: ci/mu/jej (nam/wam/im only after virile block is live — author checks path position and keeps to what's legal). podoba ci się payoff. |
| `b1_giving` | VOCAB | Giving/helping register: pożyczać, oddawać, prosić o (check everything). |

### Block 6 — Complex sentences

| id | domain | what it does |
|----|--------|--------------|
| `b1_ktory_cases` | GRAM | który beyond the Nominative: Accusative and Genitive relative clauses on known material (książka, którą czytałem; film, którego nie ma). Loc/Inst relatives deferred within B1 or fenced — author's conservative call, logged. |
| `b1_zeby` | GRAM | żeby: purpose (+ infinitive) and want-that (chcę, żebyś… + past-form). The past-form-after-żeby oddity taught as a pattern fact, not explained historically. |
| `b1_stories` | VOCAB | Narrative connectives: najpierw, potem, w końcu, nagle, niestety (check each — potem was confirmed untaught during A2). This unlocks TELLING A STORY, which is the real B1 milestone. |
| `b1_stories_func` | GRAM chunk | Situations unit: telling what happened — recombining past, aspect, motion and connectives into short narratives. |

### Block 7 — Completions

| id | domain | what it does |
|----|--------|--------------|
| `b1_imperative_rule` | GRAM | The formation A2 deliberately withheld: imperative from the 3sg present stem (robi→rób is irregular-ish — author picks the honest regular core set, anchors on the five A2 chunks, fences the irregulars or teaches them whole). Negative imperative (nie + IMPERFECTIVE) taught as a one-line rule with the aspect flip named plainly. |
| `b1_adverb_comp` | GRAM | Adverb comparison, explicitly fenced out of a2_superlatives: szybko→szybciej, dobrze→lepiej, dużo→więcej. |
| `b1_vocative_chunks` | GRAM chunk | James decision #4: address forms as whole chunks. Mamo, Tato, Babciu, Dziadku, panie/pani + first name. Never analysed. |
| `b1_opinions` | VOCAB | Opinion/discussion register: moim zdaniem (whole chunk), zgadzać się, mieć rację, na pewno, może (check — może pooled as "maybe"? verify sense). |
| `b1_case_gym` | GRAM gym | All cases including Dative + virile forms, mixed. Zero new. |
| `b1_wrapup` | GRAM chunk | B1 capstone: recombines narrative, plans, politeness and opinions into mixed scenes, same genre as a2_wrapup_func. |
| `b1_station_2` | station | Placeholder (end-of-level exit-velocity bank). |

## Vocab register principle (carried from routine prompt, now binding)

B1 vocab does NOT revisit A1/A2 topic domains. It adds registers: plans,
journeys-as-narrative, people-in-the-plural, giving/helping, storytelling,
opinions. Every candidate word goes through check_new.py BEFORE the brief
claims it is new; every reused form gets the taught-AS homograph check.

## Build protocol (unchanged from A2)

Position-aware pool (`make_pool.py --before <node>`) regenerated before every
batch · one agent = one file · orchestrator wires, audits, commits, pushes ·
audit must be 0 errors before any commit · structure IDs registered in
SEQUENCING.md + audit.py BEFORE the audit runs · independent verification of
every pack regardless of how confident its self-report reads.
