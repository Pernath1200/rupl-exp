# RUPL sequencing audit — Phase 0 spec

**Status:** locked for v1 auditor design (2026-07-30)  
**Scope v1:** live A1 **spine path only** (see `../pl-a1-spine.json` → exp `path_order`)  
**Apps:** RUPL2 grammar · RUPL3 vocab · RUPL-exp combined  
**First pass:** **report only** — no auto-edit of content  

Related: [PL-A1-SPINE.md](../PL-A1-SPINE.md) · [CODEX-FIRST](../rue-codex/CODEX-FIRST.md) (EN parent spirit)

---

## 1. Goal

Two honest constraints on every live path node:

| Direction | Rule |
|-----------|------|
| **Vocab → grammar** | A vocab pack must not **use** structures the learner has not been **taught** yet. |
| **Grammar → vocab** | A grammar pack must not **use** lemmas (content words) the learner has not been **taught** yet. |

“Taught” = appeared in some earlier path node’s **`teaches_*`**, or in **this node’s** `teaches_*` (see unlock rule).

### 1.1 Growing pools · focus · recycle (course design)

Unlock sets are not only a guardrail — they are the **material pools** for authoring and (optionally) sampling.

| Pool at path index *i* | Definition |
|--------------------------|------------|
| **Structure pool** | Union of all `teaches_structures` on path nodes `0..i` (inclusive after applying this node’s teach) |
| **Lemma pool** | Union of all `teaches_lemmas` on path nodes `0..i` |

**Dual growth rule**

| Activity | Focus (new / weighted) | Recycle (rest of pool) |
|----------|------------------------|-------------------------|
| **Grammar practice** | Today’s structure(s) in `focus_structures` or `teaches_structures` | **Any unlocked lemmas** in examples, type, and use |
| **Vocab Zdanie** | New leaf lemmas (`teaches_lemmas` / this pack) | **Range of unlocked structures** in `sentences[]` — not only the previous grammar unit |

Rules of thumb:

1. Path still **alternates** grammar ↔ vocab where possible (zigzag).  
2. **Never** use future structure or future lemma (hard auditor errors).  
3. **Do** reuse earlier Dom/food/etc. when drilling new grammar.  
4. **Do** mix several unlocked structures in a vocab sentence bank (bias toward recent teach is fine).  
5. Both pools **only grow** along the path.

Optional pack fields (Phase 5+ / authoring):

| Field | Meaning |
|-------|---------|
| `focus_structures` | Structures this node emphasises (defaults to `teaches_structures`) |
| `focus_lemmas` | Lemmas this node emphasises (defaults to this pack’s new teaches) |
| `recycle_min_structures` | Soft target: Zdanie bank should use at least N distinct structures from the pool when pool size ≥ 3 |

---

## 2. Source of truth for order

**Spine path order** is authoritative for v1.

1. Prefer RUPL-exp `data/tree.json` → `path_order` after sync (includes gyms inserted after support targets).  
2. Else walk `pl-a1-spine.json` steps: for each step, emit live `rupl2.node_id` then live `rupl3.node_id` (skip `status: skip` / null).  
3. Only nodes with `status: live` and loadable content are audited.

Off-path canopy packs are **out of scope** for v1 (no fail, no pass).

---

## 3. Unlock rule

Walk the path in order. Maintain two cumulative sets:

- `unlocked_structures: Set<structure_id>`
- `unlocked_lemmas: Set<lemma_id>`  (normalised — see §6)

**At node N (before checking N):**

```text
available_structures = unlocked_structures ∪ teaches_structures(N)
available_lemmas     = unlocked_lemmas     ∪ teaches_lemmas(N)
```

**Check N:**

```text
uses_structures(N) ⊆ available_structures
uses_lemmas(N)     ⊆ available_lemmas ∪ GLUE_LEMMAS
```

**After N passes (or after check, always for walking):**

```text
unlocked_structures ∪= teaches_structures(N)
unlocked_lemmas     ∪= teaches_lemmas(N)
```

### Same-step / zigzag

- Unlock is **path-linear**, not “spine step pair” magic.  
- Example: `a1_gender` before `leaf_home_family` → Dom may use `to_jest` if gender **teaches** it and Dom is later on `path_order`.  
- A pure **use** node typically has empty or thin `teaches_*`; it only **uses**.  
- Gyms (`spine_support_of`) appear after their support teach on exp path — they must not introduce new structures/lemmas beyond what support already taught (or declare them explicitly in `teaches_*`).

### Violations

| Severity | When |
|----------|------|
| **error** | `uses_*` item not in available ∪ glue |
| **warn** | pack missing required tag fields; empty `teaches` on a live grammar teach node; item-level tag not rolled into pack |
| **info** | glue used; bank shorter than DEFAULT_PASS (12); off-path skipped |

v1 auditor: **exit non-zero if any error** (optional flag to warn-only).

---

## 4. Authored tags (pack / node metadata)

v1 prefers **authored tags**, not NLP.

### 4.1 Fields (pack JSON or sidecar)

| Field | Type | Meaning |
|-------|------|---------|
| `teaches_structures` | `string[]` | Structure IDs this node introduces or drills as **teach** |
| `teaches_lemmas` | `string[]` | Lemma IDs this node introduces as **learnable content** |
| `uses_structures` | `string[]` | Structures required to complete practice honestly |
| `uses_lemmas` | `string[]` | Lemmas required in prompts/answers (beyond glue) |

Optional item-level (already on Dom sentences; auditor may roll up):

| Field | Type | Meaning |
|-------|------|---------|
| `structures` | `string[]` | Per sentence / frame |
| `lemmas` | `string[]` | Per sentence / frame |

**Roll-up rule:** pack `uses_*` should be a superset of all item-level tags. Auditor may **compute** union of item tags and **warn** if pack field omits them; **errors** still use the **effective** set = pack ∪ items.

### 4.2 Where tags live (**Phase 1 decision**)

| Option | Status |
|--------|--------|
| **A. In pack JSON** | **Primary** — `teaches_*` / `uses_*` on each live path pack; sync copies into rupl-exp |
| **B. Sidecar** | **Mirror** — `sequencing/tags.json` for auditor convenience (regenerate via `sequencing/apply_tags.py`) |

Auditor should accept **pack fields first**, then sidecar if pack fields missing.

### 4.3 Missing tags

If a live path pack has **no** `teaches_*` and **no** `uses_*` and no item-level tags:

- **warn:** `missing_tags`  
- Do **not** treat as clean pass  

---

## 5. Structure ID catalogue

Stable IDs (snake_case). One line each.  
Extend only by PR/docs update — agents must not invent IDs.

| ID | Meaning |
|----|---------|
| `to_jest` | *To jest* + nominative noun phrase (“this is…”) |
| `poss_nom` | *mój/moja/moje* and/or *twój/twoja/twoje* in **nominative** with noun |
| `byc_present` | Present of *być*: *jestem, jesteś, jest, jesteśmy, jesteście, są* |
| `byc_adj` | *być* + predicative adjective (*Jestem zmęczony*) — agreement |
| `zgoda` | Attributive adjective–noun agreement (*dobry dom, dobra kawa*) |
| `miec_present` | Present of *mieć*: *mam, masz, ma, …* (form only) |
| `miec_acc` | *mieć* + **accusative** object (*Mam książkę*) |
| `present` | Legacy umbrella for “any regular present” (prefer class IDs below) |
| `present_am` | Present class *-am* (mieszkać: -am/-asz/-a/-amy/-acie/-ają) |
| `present_e_isz` | Present class *-ę/-isz* (mówić, lubić) |
| `present_e_esz` | Present class *-ę/-esz* (chcieć, pić) |
| `present_uje` | Present class *-ować → -uję* (pracować, kupować, gotować, studiować) |
| `prep_w_loc` | *w* / *na* + locative (*w domu, w sklepie, na stole*) |
| `prep_do_gen` | *do* + genitive destination (*do domu, do sklepu*) |
| `prep_z_gen` | *z* / *ze* + genitive origin (*z domu, ze szkoły*) |
| `prep_place` | Bucket for place-preposition family (prefer specific IDs above) |
| `motion_chunk` | Fixed motion forms *Idę / Idziesz / Wracam / Wracasz* + do/z phrases (chunk lane; full verbs A2) |
| `gen_endings` | Regular genitive sg by gender: m *-u*, n *-o→-a*, f *-a→-y* (endings only, no governor; k/g-stem *-i* and masc animate *-a* deferred) |
| `negation` | *nie mam* + genitive object (A1); broader *nie* + verb later |
| `question` | *czy* / wh- question shells (*Co? Gdzie? Jak się masz?*) |
| `nazywam_sie` | *Nazywam się* / *Mam na imię* name frames |
| `existential_jest` | Existential *jest/są* “there is/are” (≠ *to jest*) |
| `inst_identity` | Instrumental identity (*Jestem studentem*) — late |
| `social_chunk` | Fixed polite chunks (*Dzień dobry*, *dziękuję*) as wholes |
| `can_inf` | Modal + infinitive (*mogę / umiem / muszę + bezokolicznik*) — case-free complement |
| `comparative` | Closed-set comparatives (*lepszy, większy…*) + *niż* + Nominative (od+Gen = A2) |
| `ten_ta_to` | Demonstrative gender probe *ten / ta / to / te* + noun (classification reflex) |
| `past_byc` | Past of *być*, **singular only**, both genders (*byłem/byłam/byłeś/byłaś/był/była/było*); plural = `a2_past_plural` |
| `weather_chunk` | Impersonal weather frames (*Pada deszcz, Jest zimno*) incl. fixed past 3sg chunks (*padał, świeciło, wiał, było zimno*); full past classes = `a2_past_ac`+ |
| `time_past_chunk` | Fixed *w + time-phrase* adverbials learned whole (*w zeszłym tygodniu/miesiącu/roku, w poniedziałek, w weekend, dawno temu*); the adjective-locative machinery inside them is deliberately NOT taught. Bare past adverbs (*przedwczoraj, ostatnio, niedawno, wtedy*) are plain lexis and carry no structure tag. |
| `past_ac` | Past of *-ać* / *-ować* verbs, **singular, both genders** (*mieszkałem/mieszkałam … mieszkał/mieszkała/mieszkało*); rule = infinitive − *ć* + *ł* + person ending |
| `past_rest` | Same past rule on *-ić/-eć/-ić*-type verbs (*robiłem, mówiłem, piłem*) plus whole-form *miałem/chciałem* (e→a shift deliberately unexplained until B1) |
| `plural_nom` | Non-virile plural Nom/Acc (identical for non-virile): m/f hard *-y*, after k/g *-i*, soft *-e*, neuter *-a*; adjectives *-e*. Virile (*ci studenci*) = B1. Suppletives (*dzieci, oczy, ręce*) fenced. |
| `past_plural` | Plural past: *-li* for any group including a man, *-ły* for everything else. Być fully + the rule on known verbs. Full virile system = B1. |
| `gen_pl` | Genitive plural, REGULAR ONLY: masc hard *-ów*; fem/neut zero-ending on non-shifting stems (*kaw, piw, miast*). Vowel-shift (*szkół*) and fleeting-e (*książek, okien*) stems deliberately fenced. |
| `numbers_gen` | Numeral government: 2–4 + Nominative plural, 5+ + Genitive plural. Frames = money, shopping quantities, time amounts. |
| `inst_z` | *z* + Instrumental for accompaniment (*z mamą, z bratem*) and later transport; extends `inst_identity` to a governed preposition |
| `situation_chunk` | Functional survival chunks for one setting (shop, directions, ordering, phone), learned whole; no rule slides |
| `jechac` | *jechać* present (*jadę/jedziesz/jedzie…*) = going BY VEHICLE, against already-taught *idę* on foot. Habitual *jeździć/chodzić* is a later unit. |
| `inst_transport` | Bare Instrumental of means of transport (*jadę autobusem, pociągiem*) — no preposition; extends `inst_z` endings to a third job |
| `chodzic` | Full *iść* present + habitual *chodzić*: on-the-way-now vs regularly. Closes the on-foot grid `a2_jechac` left open. *jeździć* deferred. |
| `sie_reflexive` | Verbs that travel with *się* (*nazywam się, uczę się, czuję się*). Taught as a word belonging to the verb, NOT as "self". Default position after the verb; full clitic placement is far later. |
| `bedzie` | Compound future: *będę/będziesz/będzie/będziemy/będziecie/będą* + infinitive. Perfective future (*napiszę*) is B1. |
| `musiec` | *muszę/musisz…* + infinitive, plus impersonal *można / trzeba* + infinitive. Completes the modal set begun in `can_inf`. |
| `aspect_past` | Imperfective/perfective twins **in the past only** (*kupowałem / kupiłem*). The first place aspect is named at all; future perfective stays B1. |
| `dat_chunks` | Dative **pronoun chunks only** (*podoba mi się, smakuje mi, boli mnie*). NOT the dative case as a system — full dative with nouns is B1. |
| `o_loc` | *o* + Locative for topic (*mówię o pracy, myślę o domu*) — the same case and endings as `prep_w_loc`, a third governor. Pronoun objects (*o tobie*) deferred. |
| `ordinals_time` | Ordinals 1st–12th + clock time as fixed chunks (*o trzeciej*). The feminine-locative machinery behind *o trzeciej* is NOT taught. |
| `superlative` | *naj-* on the closed comparative set (*najlepszy, najwiekszy*) + *od* + Genitive comparison. Extends `comparative`. |
| `imperative` | Imperative as a small closed CHUNK set (*daj, idz, czekaj, patrz, sluchaj*) — not a formation rule. |
| `questions2` | Second question wave: *dlaczego/bo, kiedy, ile, ktory/ktora/ktore* (Nominative agreement only). |
| `case_gym2` | Gym: discrimination across Nom/Acc/Gen/Loc/Inst singular + Nom/Gen plural, all cases already taught. Zero new material. |
| `prep_review2` | A2-vocabulary review pass over the already-taught preposition families (w/na, do/z, o), plus the transport/company Instrumental. Zero new material. |
| `perf_future` | Perfective future of the four taught twins (*kupie, zrobie, wypije, przeczytam* + persons). Lifts the A2 one-future fence in a dedicated unit. |
| `conditional_sg` | Conditional SINGULAR only (*bym/bys/by* on taught past stems; *chcialbym/chcialabym*). Plural conditional deferred past the virile block. |
| `past_isc` | Suppletive past of *isc* (*szedlem/szlam/szedl/szla/szlo*), taught whole; m/f stem split is a table fact, not a rule. |
| `motion_prefixed` | Prefixed motion pairs *przyjsc/wyjsc* (on the *szedl* stems) and *przyjechac/wyjechac* (regular), past + perfective future. Other prefixes deferred. |
| `virile_reco` | Virile (masculine-personal) plural, RECOGNITION only: *ci* vs *te*, and whole ready-made virile plural noun/adjective forms (*studenci, Polacy, lekarze, dobrzy* …) handed over with no formation rule. Extends `plural_nom`'s people-vs-everything-else split into the virile subtype itself. Production of the same forms via the actual consonant-alternation rule = `virile_nom` (next unit). |
| `virile_nom` | PRODUCTION of virile nominative plural, REGULAR consonant sets only: stem -t → -ci (student→studenci), stem -k → -cy (Polak→Polacy), stem already soft → +e (lekarz→lekarze). r→rz (kelnerzy) and all true irregulars (brat→bracia, kolega→koledzy, mężczyzna→mężczyźni, the -owie family) are explicitly fenced out. |
| `virile_past` | The FULL past-tense agreement system, closing the virile block: introduces `oni`/`one` pronouns (fenced until here) and applies the already-taught `past_plural` -li/-ły rule to real virile-noun subjects (ci studenci pracowali) vs non-virile subjects (te kobiety pracowały, te domy były), not just the a2_past_plural "name i name" workaround. Extends `past_plural`'s people-vs-everything-else test to actual grammatical subjects. |
| `conditional_pl` | PLURAL conditional (James decision #3, deferred until after the virile block since it rides -li/-ły): my/wy/oni/one + by, built the same way `conditional_sg` built ja/ty/on/ona — attach `by` to the plural L-form already owned (`chcieli`/`chciały` from the `past_plural` rule extended to new verbs) then the `byśmy`/`byście` person markers already owned from `byliśmy`/`byłyście` (`a2_past_plural`). No new formation rule, only the plural person slot the singular unit explicitly fenced out. |
| `dative_pron` | Completes the dative pronoun grid the A2 `dat_chunks` fenced: ci/mu/jej/nam/wam/im, generalising `podobać się` (full paradigm) and `smakować` (partial) — both genuine dative-governing verbs. `boleć` is deliberately EXCLUDED from the generalisation: it governs the accusative (boli mnie/cię/go), a different pronoun set entirely, and extending it here would be a real grammar error, not a simplification. HOMOGRAPH, flagged loudly (already predicted by `b1_virile_reco`'s own note): `ci` was already taught as the virile demonstrative ("these people," ci studenci) — this unit re-teaches the same string as an unrelated word, the 2sg dative clitic ("to/for you," podoba ci się). Disambiguated explicitly in the pack's intro and reinforced by placing both senses in real sentences close together, not by a meta quiz question. |
| `ktory_cases` | *który/która/które* as a genuine RELATIVE pronoun (not just the Nominative interrogative `questions2` already owns) — extended to Accusative (*książka, którą czytałem* — case comes from the already-known transitive verb inside the clause) and Genitive (*film, którego nie ma* — case comes from the already-known `nie ma` + Gen pattern). Antecedents restricted to inanimate/abstract nouns only; masculine-**animate** antecedents (where Acc merges with Gen, *pies, którego...*) are deliberately fenced out to avoid stacking a second alternation in the same unit — logged as an open question for James. *który* (masc Acc, unchanged from Nom) and *które* (neut Acc, unchanged from Nom) are the same strings extended to a new syntactic function, not new morphology. HOMOGRAPH: *której* was already taught by `a2_ordinals_time`, frozen inside *o której?* ("at what time") — same word, same underlying feminine genitive form, never before generalised as a productive case. Re-taught here explicitly, same treatment `b1_dative_sg` gave *dziękuję* (chunk → real paradigm slot), not a from-scratch new word. |
| `dative_sg` | The Dative case with NOUNS, singular — the case behind the A2 `dat_chunks` pronouns (mi/mnie). Verbs `pomagać`/`dziękować` (both riding already-taught present classes) govern it. Regular masculine `-owi` (studentowi, nauczycielowi) is taught as a real productive rule; the spine's family-word examples (mamie/tacie/bratu/siostrze) are handed over as four memorized whole forms, NOT derived from a stated feminine rule (that would require three distinct consonant-softening classes at once — deliberately fenced, logged as an open question for James). `dawać` (spine-named) is deferred to `b1_giving`, logged. |
| `zeby` | *żeby*, two uses taught together since both ride owned material. (1) Purpose: *żeby* + bare infinitive (*Idę do sklepu, żeby kupić chleb* — infinitive already known, e.g. the `aspect_past` twins). (2) Want-that: *żeby* + a person marker from the already-owned conditional family (*żebym/żebyś/żeby*, singular only — plural deferred, logged) + the bare L-form verb (*zrobił*, not *zrobiłby*) — the new fact, stated as a pattern not explained historically, is that the person marker attaches to *żeby* itself rather than to the verb. Every want-that example keeps the wanter and the doer as different people (*chcę, żebyś...* / *mama chce, żebym...*), since wanting yourself to do something does not use *żeby* in Polish. |
| `wrapup_func` | Combined recombination of the five Situations units (shop, directions, restaurant, phone) into mixed scenes. Zero new material. |
| `imperative_rule` | The imperative FORMATION rule A2's `imperative` deliberately withheld: take the 3sg present (or, for perfective verbs, the 3sg future — same shape, same rule) and drop its ending — add *-j* if what's left ends in a vowel (*czeka→czekaj*), leave it bare if it already ends in *j* (*kupuje→kupuj*, *piję→pij*) or any other consonant (*mówi→mów*, *kupi→kup*). REGULAR STEMS ONLY: *robić→rób* (the *o→ó* shift) and all other stem-alternating irregulars are fenced out — not taught, not shown, not a distractor. Negative imperative rule taught as one line: *nie* + the IMPERFECTIVE verb, always — even where the positive command uses a perfective (*Kup wodę!* vs *Nie kupuj wody!*; *Wypij wodę!* vs *Nie pij wody!*) — the aspect flip is named plainly, not derived. Retroactively explains all five of A2's `imperative` chunk forms as regular instances of this same rule. |
| `adverb_comp` | Comparison of ADVERBS, fenced out of `a2_superlatives` (which covers adjectives only). Same naj- prefix rule the learner already owns from `superlative`, now applied to a second word class that never agrees for gender/number (unlike adjective comparatives, which do). Closed set of four families: *szybko→szybciej→najszybciej* (regular, -o adverb → -iej), *dobrze→lepiej→najlepiej* and *dużo→więcej→najwięcej* (irregular, but the base adverb is already-taught recycled material), *mało→mniej→najmniej* (irregular, new base word, added as the natural opposite of already-taught `dużo`, logged as a scope addition beyond the spine's three named examples so Match could reach a clean 12-row board). `niż` and `od`+Genitive both recycle unchanged from `a2_superlatives` — the adverb itself never changes shape after either. |
| `fem_dat_loc` | The general feminine Dative/Locative form `b1_dative_sg` refused to derive (its own note: "the general feminine dative/locative rule stays untaught… James should decide whether it needs a slot"). THE GIFT, exceptionless here: for feminine nouns the Dative and the Locative are **the same form**, so one rule pays for two cases. Two classes, both shown as visible closed families rather than a rule to run on an unseen noun: **hard stem** *-a* → *-e* with the preceding consonant softening (*mama→mamie*, *siostra→siostrze*, *szkoła→szkole*, *kobieta→kobiecie*, *łazienka→łazience*), and **already-soft stem** → *-y*/*-i* with nothing else changing (*praca→pracy*, *ulica→ulicy*, *kuchnia→kuchni*, *sypialnia→sypialni*). Four of the nine forms were already in the pool as one case each, so the unit is mostly revelation. *tata→tacie* is named in one line as the masculine *-a* noun that follows the same pattern, never drilled. FENCED: masculine datives (*bratu*, *-owi* — `dative_sg` owns those), feminine accusatives (*mamę*, *siostrę* appear only as wrong-slot distractors), and all plurals. |
| `copular_future` | The future of *być* used as a copula: bare *będę/będziesz/będzie/będziemy/będziecie/będą* followed **directly** by a complement, with no infinitive after it (*będę być* is not Polish). Pays the fork `a2_bedzie` took and logged in its own note ("the COPULAR future is NOT taught… consequence, accepted: 'I will be at home' is not yet expressible"). Zero new forms and zero new lemmas — all four complement types are already owned from the present-tense *jestem* + X frames: place (`prep_w_loc`), predicate adjective (`byc_adj`), Instrumental identity (`inst_identity`), impersonal adverb predicate (*będzie dobrze*, *będzie zimno*, twin of `a2_smalltalk`'s taught *Było dobrze*). `a2_bedzie`'s "the future has no gender" relief still holds: the verb is one form, only the adjective after it agrees. FENCED: negated *nie będzie* + Genitive and the plain existential *będzie kawa* (both open the `nie ma`/Genitive pattern in a new tense — deferred to `b2_neg_gen`); plural predicate adjectives (*zmęczeni*, *zmęczone*) absolutely, so every plural sentence takes a place phrase. |
| `conjunctions` | The invariable joining words and in-sentence particles the course never taught: *ale* (but — real contradiction), *a* (and/whereas — two different things side by side, no contradiction), *więc* (so — result), *albo* (or), plus *też* (too), *już* (already), *jeszcze* (still). Zero morphology: none of these words ever changes shape. *i* (`a2_past_plural`) and *bo* (`a2_questions2`) are already-owned anchors, recycled and used as distractors but never re-taught. The one taught contrast is i/a/ale. FENCED: `dlatego` (its partner *dlatego że* is on the C1 subordination list), and the negative-polarity readings *już nie* ("not any more") and *jeszcze nie* ("not yet") — each flips its word's meaning rather than extending it. |
| `vocative_chunk` | James's spine decision #4: the Vocative stays CHUNK-LANE ONLY — never taught as a case, no endings rule stated anywhere. Six frozen calling-forms: *mama→Mamo!, tata→Tato!, babcia→Babciu!, dziadek→Dziadku!* plus two formal panie/pani+name chunks named in the spine text itself, *Panie Piotrze!* and *Pani Anno!* (using the already-glue names *piotr*/*anna*). The name-vocative pattern is NOT generalised beyond these two named examples — no rule connecting a name to its calling-form is ever stated. |

**UI labels** (exp vocab hints) may map a subset; catalogue above is the audit vocabulary.

### Typical teach owners (A1 spine — indicative)

| Structure | Often taught at |
|-----------|-----------------|
| `to_jest` | `a1_gender` |
| `poss_nom` | `a1_poss_simple` |
| `byc_present` | `a1_hello` |
| `zgoda` | `a1_gender_check` |
| `miec_present` + `miec_acc` | `a1_miec` |
| `present` / class IDs | `a1_present` · `a1_present_e_isz` · `a1_present_e_esz` · `a1_present_uje` |
| `social_chunk` | `trunk_social_a1` |
| `question` | `a1_questions` |
| `prep_w_loc` | `a1_prep_place` |
| `prep_do_gen` / `prep_z_gen` | `a1_prep_do_z` |
| `motion_chunk` | `a1_motion` |
| `gen_endings` | `a1_gen_endings` |
| `negation` | `a1_negation` |
| `inst_identity` | `a1_inst_job` |
| `byc_adj` | `trunk_adjectives_a1` (vocab trunk teaches the frame) |
| `can_inf` | `trunk_can_a1` (vocab trunk teaches the frame) |
| `existential_jest` | `trunk_there_time_a1` (after `a1_negation` — *nie ma* + Gen) |
| `past_byc` | `a2_past_byc` (first A2 unit) |
| `weather_chunk` | `a2_weather` (vocab leaf riding `a2_past_byc`) |
| `time_past_chunk` | `a2_time_past` (vocab leaf) |
| `past_ac` | `a2_past_ac` |
| `past_rest` | `a2_past_rest` (`a2_past_gym` drills both, teaches nothing) |

### A2 authoring decisions (James, 2026-08-04 — design session)

1. **Past gender:** FULL both-gender production — learner types *byłam/byłaś* too, not recognition-only.
2. **Shape:** interleave grammar + vocab like A1 (not spine-first, not grammar-only).
3. **A2 vocab leaves:** travel & transport, weather & seasons, opinions & feelings (celebrations dropped).
4. **Explain button:** `explain` field authored from A2 unit 1; engine renders on-demand "Dlaczego? · Why?" at answer reveal (js/explain.js). A1 backfill opportunistic.
5. **Aspect:** imperfective-only past until `a2_aspect`; weather past 3sg forms are fenced chunks under `weather_chunk`.
6. **Past plural:** split out — singular in `a2_past_byc`, plural in `a2_past_plural` **after** `a2_plural_nom` (people-vs-everything-else rule; full virile = B1).
7. **Numbers 5+ frames:** money & prices, shopping quantities, time amounts. People-counting dropped (virile numeral risk).
8. **Batch 1:** `a2_past_byc` + `a2_weather` (weather recycles a1_nature nouns; teaches frames + 6 new words).

---

## 6. Lemma IDs and glue

### 6.1 Normalisation

- Lowercase  
- Strip leading/trailing punctuation and extra spaces  
- For multi-word teaches, store the **citation form** used in the pack (`dom`, `książka`, `dzień dobry`)  
- Do **not** require full paradigm listing in v1 (`domu` locative → either teach `dom` + structure `prep_w_loc`, or list surface `domu` under `uses_lemmas` only if explicitly taught as form)

### 6.2 Glue allowlist (`GLUE_LEMMAS`)

Allowed anywhere without a prior `teaches_lemmas` entry. Keep **tiny**.

| Glue | Notes |
|------|--------|
| `tak` | yes |
| `nie` | no (particle; full negation patterns are `negation`) |
| `ja` `ty` `on` `ona` `ono` `my` `wy` `oni` `one` | person pronouns in grids |
| `to` | in *to jest* (structure carries the frame) |
| `anna` | default demo name (and other **given names** — see below) |

**Given names:** any single token matching a proper name used only as a name slot (e.g. Anna, Piotr) counts as glue if not a common noun. v1 implementation: explicit list + optional `Name`-shaped tokens in a small config.

**Not glue:** content nouns (*dom, kawa, torba*), place names used with case (*Warszawy*), prepositions as vocab (*w, z* as words to produce), adjectives (*zmęczony*).

### 6.3 Function words vs structures

If the learner must **produce** a preposition+case frame, that is a **structure** (`prep_w_loc`), not a glue lemma.  
Listing `w` alone in `uses_lemmas` without unlocking `prep_w_loc` is still an **error** if the item is the full frame *Jestem w domu*.

---

## 7. Report schema

### 7.1 File outputs (Phase 2)

| File | Role |
|------|------|
| `sequencing-audit.json` | Machine-readable full report |
| `SEQUENCING-AUDIT.md` | Human summary (same run) |

Suggested path: `rupl-exp/audit/` or `rupl-codex/audit/` (run-configurable).

### 7.2 Top-level JSON

```json
{
  "version": 1,
  "spec": "rupl-codex/SEQUENCING.md",
  "generated_at": "2026-07-30T12:00:00+02:00",
  "path_source": "rupl-exp/data/tree.json#path_order",
  "path": ["trunk_social_a1", "a1_gender", "a1_poss_simple"],
  "summary": {
    "nodes_audited": 0,
    "errors": 0,
    "warns": 0,
    "infos": 0,
    "missing_tags": 0
  },
  "findings": []
}
```

### 7.3 Finding object

```json
{
  "id": "SEQ-001",
  "severity": "error",
  "code": "structure_not_unlocked",
  "node_id": "trunk_be_have_a1",
  "pack_id": "a1_trunk_be_have",
  "domain": "vocab",
  "path_index": 5,
  "item_ref": {
    "block_id": "be_have_seed",
    "item_index": 3,
    "en": "She is at school.",
    "pl": "Ona jest w szkole."
  },
  "missing": {
    "kind": "structure",
    "id": "prep_w_loc"
  },
  "available_sample": ["to_jest", "byc_present", "poss_nom"],
  "suggest": "Rewrite without place preps, or move item after prep-place teach; or add prep teach earlier on path."
}
```

### 7.4 Finding codes

| code | severity | Meaning |
|------|----------|---------|
| `structure_not_unlocked` | error | `uses` structure not available |
| `lemma_not_unlocked` | error | `uses` lemma not available and not glue |
| `missing_tags` | warn | no teach/use tags on live path pack |
| `teaches_empty_grammar` | warn | grammar live node teaches nothing |
| `item_tag_not_in_pack` | warn | item structures/lemmas not ⊆ pack uses (if pack declared) |
| `pack_load_failed` | error | content path missing/unreadable |
| `unknown_structure_id` | warn | tag not in catalogue §5 |
| `structure_spread_thin` | warn | vocab Zdanie uses only one structure while pool has ≥3 |
| `lemma_recycle_thin` | warn | grammar pack barely recycles earlier lemmas |
| `off_path_skipped` | info | canopy not audited |
| `glue_used` | info | optional verbosity |

### 7.5 Markdown summary shape

```markdown
# Sequencing audit · YYYY-MM-DD

**Path:** N nodes · **errors:** E · **warns:** W

## Errors
### node_id (pack_id)
- [structure_not_unlocked] item "…" needs `prep_w_loc` — suggest …

## Warnings
…

## Path unlock trail (optional appendix)
| i | node_id | teaches_structures | teaches_lemmas (n) |
```

---

## 8. Non-goals (v1)

- Auto-deleting or rewriting items  
- Full morphological analysis of Polish  
- Off-path canopy  
- Runtime gating in the learner app (author-mode warn later)  
- Perfect synonym graphs (*matka* vs *mama* — list both in teaches/uses or accepts only after teach)

---

## 9. Phase map (after this spec)

| Phase | Deliverable |
|-------|-------------|
| **0** | This document |
| **1** | Tags on live path packs (+ catalogue freeze) — **done 2026-07-30** · `sequencing/apply_tags.py` · `TAGS-PHASE1.md` |
| **2** | Read-only auditor → report files — **done 2026-07-30** · `sequencing/audit.py` · `audit/SEQUENCING-AUDIT.md` |
| **3** | Human triage of report — **done 2026-07-30** · `audit/TRIAGE-PHASE3.md` |
| **4** | Content fix pass + re-audit — **done 2026-07-30** · audit **errors: 0** |
| **5** | Pool/recycle ship — **done 2026-07-30** · food/freetime/places Zdanie · weighted sample · richness warns |
| **6** | CI / canopy / item-level optional |

---

## 10. Changelog

| Date | Change |
|------|--------|
| 2026-07-30 | Phase 0 locked: path unlock, structure catalogue, glue, report schema |
| 2026-07-30 | Phase 1: in-pack tags on 17 live path packs; sidecar `sequencing/tags.json` |
| 2026-07-30 | Phase 2: `sequencing/audit.py` → `audit/sequencing-audit.json` + `SEQUENCING-AUDIT.md` |
| 2026-07-30 | Phase 3: triage of 7 errors → `audit/TRIAGE-PHASE3.md` |
| 2026-07-30 | Phase 4: tags + acc_gym rewrite → audit clean (0 errors) |
| 2026-08-04 | A2 begins: `past_byc` + `weather_chunk` added to catalogue; A2 authoring decisions recorded (§ teach owners); `a2_past_byc` + `a2_weather` live on path (path-50) |
