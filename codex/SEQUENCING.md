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
| `adj_acc` | Attributive adjectives in the ACCUSATIVE — the first unit of B2's adjective-case block. Adds no new ending: `a1_miec` already taught the feminine swap (*dobra kawa → Mam dobrą kawę*) and already stated the masculine-thing/neuter relief in its own `body_pl` (*Męskie rzeczy i nijakie bez zmian*). What this ID covers is the two things that were genuinely missing: the same mechanical *-a → -ą* on six more already-owned adjectives (*małą, dużą, zimną, gorącą, starą, ładną*), and the generalisation off *mieć* to every accusative-governing verb the learner owns (*mam, piję, czytam, kupuję, kupię, robi, poproszę*) — which is what turns a fact about having things into a rule. FENCED: all oblique adjective endings (*-ego, -ej, -ym, -emu*) appear nowhere, not even as distractors, since `adj_gen` is the very next unit; masculine-ANIMATE accusative (*dobrego psa*) is fenced with it and named in one English line only, masculine animates appearing here solely as grammatical subjects. No plural objects anywhere. |
| `adj_gen` | Attributive adjectives in the GENITIVE — one paradigm row: *-ego* for masculine and neuter, *-ej* for feminine. Deliberately only four adjectives (*dobry, nowy, mały, zimny*), each in BOTH forms, so the learner sees a symmetrical paradigm rather than a word list (*duży*, *stary* dropped for form-count reasons alone). No new governors: the three triggers are all already owned — *nie mam / nie ma* + Gen (`negation`), *do* + Gen (`prep_do_gen`), *dużo* + Gen (`gen_endings`, which itself teaches *dużo kawy / dużo wody / dużo mleka*). MASCULINE-ANIMATE ACCUSATIVE folds in here as AGENTS.md's named honest exception and closes the gap `adj_acc` left open by design one unit earlier: for masculine people and animals the object form IS this form (*Mam małego psa*), and the nouns have been Acc≡Gen since `a1_miec`. HOMOGRAPH, predicted by B2-SPINE O16 a batch in advance and confirmed: *nowego* reports TAUGHT (`a2_smalltalk`) but only frozen inside the chunk *Nic nowego* — re-taught explicitly here as a chunk-to-paradigm reveal, the *dziękuję* / *której* precedent. FENCED: *z*/*ze* + Genitive is kept out entirely even though it is an owned Genitive governor, because inserting an adjective flips the learner's whole-form *ze sklepu* back to *z nowego sklepu* — a second fact about the preposition, not the adjective; *-ym* and *-emu* appear nowhere, not even as distractors; no plural genitive adjectives (C1, spine O3); *pracy* is unused because `fem_dat_loc` taught it one unit earlier as the Dative/Locative form. |
| `adj_loc` | Attributive adjectives in the LOCATIVE — *-ym* for masculine and neuter (the unit's only new ending), *-ej* for feminine, which is the very same form `adj_gen` taught one unit earlier. Same four adjectives as `adj_gen` (*dobry, nowy, mały, zimny*), so the block stays one paradigm widening rather than a growing word list: **four new forms in the whole unit** (*dobrym, nowym, małym, zimnym*). No new governors — all three Locative triggers are already owned: *w* and *na* (`prep_w_loc`, `prep_place`) and *o* (`o_loc`), the last of which supplies its chunks *o domu / o sklepie / o pracy* etc. wholesale. THE UNIT'S CENTRAL CONTRAST, and the reason it can be small: for feminine words the ADJECTIVE does not move between Genitive and Locative but the NOUN does (*do dobrej szkoły* → *w dobrej szkole*), while for masculine/neuter the reverse can happen — *dom* is *domu* in both cases, so only the adjective marks the difference (*do nowego domu* → *w nowym domu*). That minimal pair is the discrimination the Kontrola stage is built on. FENCED: *-emu* appears nowhere, not even as a distractor (`adj_dat` owns it); no plural oblique adjectives (C1, spine O3); *nowe* and *duże* are avoided entirely as neuter singulars and as distractors, since `a2_plural_nom` taught both as PLURALS — `adj_acc`'s standing line, held here too; *filmie*, *wodzie*, *mleku*, *samochodzie* and *restauracji* are all NEW noun forms and appear nowhere, which is why B2-SPINE's own illustrative example *Myślę o dobrym filmie* could not be used. |
| `adj_inst` | Attributive adjectives in the INSTRUMENTAL — **no new endings at all**, and no new lemmas: masculine/neuter reuse the *-ym* `adj_loc` taught one unit earlier, feminine reuses the *-ą* the learner has had as an object form since `a1_miec`. All six forms in the unit (*dobrym, nowym, małym, dobrą, nową, małą*) report TAUGHT. This is the fourth turn of the course's signature "same endings, another job" idiom (`inst_identity` → `inst_z` → `inst_transport` → here), and `copular_future` is the precedent for a grammar unit with `teaches_lemmas` legitimately empty. Runs all three already-owned Instrumental jobs with the adjective added: identity after *być* (`inst_identity`), accompaniment after *z* (`inst_z`), and bare means-of-transport (`inst_transport`). THE ONE DISCRIMINATION IT ADDS, and the reason it earns a slot rather than folding into `adj_loc`: for masculine and neuter the Locative and Instrumental adjective is the *same* form (*w dobrym hotelu* / *z dobrym kolegą*), but for feminine they *differ* (*w dobrej firmie* / *z dobrą siostrą*) — so the gender decides whether the two cases are distinguishable at all. SECOND, SMALLER POINT, one line and one table row: *kolega* is a masculine noun whose Instrumental ends in *-ą*, so *z dobrym kolegą* pairs a masculine adjective with an *-ą* noun. The learner has owned *kolegą* since `inst_z` and its masculinity since A1; putting an adjective in front is the first time that masculinity becomes visible, which makes it a gift rather than a load. FENCED: *-emu* still appears nowhere (`adj_dat` is the very next unit); no plural oblique adjectives (C1, spine O3); *zimny* is left out of the unit entirely because the Instrumental's three jobs (people's identity, accompaniment, transport) give it no natural home — *wodą* is NEW in any case; *starym* and *dużym* are NEW and appear nowhere, which is why the most idiomatic transport phrase *starym samochodem* could not be used. B2-SPINE's own illustration *Jadę z miłą siostrą* was rejected: *miłą* reports NEW. |
| `adj_dat` | Attributive adjectives in the DATIVE — *-emu* (m/n) is the unit's one new ending; the feminine *-ej* is recycled for the **third** time (Genitive, Locative, and now here), which is the observation slide 2 is built on. Three new forms only: *dobremu, nowemu, małemu*. Small by design, as B2-SPINE said it should be. Rides the three Dative governors the learner already owns — *pomagać* and *dziękować* (`dative_sg`) and *dawać* (`b1_giving`, which paid `dative_sg`'s own logged deferral of that verb) — and the Dative nouns those units taught: *studentowi, nauczycielowi, bratu, siostrze, mamie* (`dative_sg`) plus *kobiecie* (`fem_dat_loc`). Every one is reused in the same slot it was taught in. NEUTER IS STATED BUT NOT DRILLED, and this is the unit's one real judgment call: *dziecku* reports NEW, and it is the only plausible neuter Dative noun in reach, so the course owns **no** neuter noun in this case. Rather than bolt a new noun form onto a unit that is already adding an ending, the neuter is named in one English line and in the recap table's neuter column — true, consistent with every other oblique case in the block where m and n share an ending, and demanding no form the learner has not met. CLOSES THE BLOCK: this is the last teaching unit before `b2_adj_gym`, so slide 4 is a six-row recap of the whole adjective across all four cases in three genders, every cell a form taught at or before this point. FENCED: *zimny* is left out again (no natural Dative recipient is cold, and *zimnemu* would be a fourth new form for nothing); *nowe* and *duże* still unused; no plural obliques (C1, spine O3). |
| `pron_acc` | The ACCUSATIVE (object) personal pronouns: *mnie, cię, go, ją, nas, was, ich* — the column that stands beside the Dative pronouns `dative_pron` completed at B1 (*mi, ci, mu, jej, nam, wam, im*). THE UNIT PAYS AN IOU THREE LEVELS OLD: `dat_chunks` taught *boli mnie* as a frozen block and its own note says "mnie in boli mnie is accusative, not dative — deliberately NOT explained"; `dative_pron` then refused to generalise *boleć* onto the dative set and said why ("it takes the accusative in every person, a different pronoun set the course has not taught… this unit does not touch that fence"). The set now exists, so the fence comes down here and nowhere earlier, and *boli* is finally run across persons (*boli mnie / boli cię / boli go*). HALF THE MATERIAL IS ALREADY OWNED — the Dative column is recycled unchanged, and the only new fact is that a given verb always reaches into one column or the other (*kochać, lubić, znać, boleć* → object; *podobać się, smakować, pomagać, dziękować* → dative). *mnie* itself reports TAUGHT (`dat_chunks`) but only inside its frozen block, and is re-taught explicitly as a paradigm slot — the *dziękuję* / *której* / *nowego* precedent. WORD ORDER: the object pronoun sits immediately after its verb, the same placement rule `sie_reflexive` already states; where the pronoun is a short clitic the verb is also clause-initial (*Kocham cię*, *Lubię go*), and noun-subject sentences use only the full forms (*Mama zna nas*), because *Mama kocha cię* is marked where *Mama cię kocha* is neutral — a word-order fact, not a pronoun fact, and left to C1. FENCED: all *n-* forms after prepositions (*niego, niej, nim, nich, nimi*) — `pron_prep` is the very next unit and owns them, and note that the auditor CANNOT see this fence at all because person pronouns sit in `GLUE_LEMMAS`; *je* (neuter and non-virile-plural accusative), both because the virile split arriving in a new place is a second fact and because it collides with *je* 'he/she eats' — consequence stated openly, "them" is expressible only for people until C1; the long emphatic forms *jego* and *ciebie*; *siebie*/*sobie* (C1, spine O15); and negated objects anywhere, since *nie znam jej* would put the object in the Genitive, which is `neg_gen`'s job later in B2. ADVANCE WARNING: *ich* is also the possessive "their" — no collision today, since only *mój*/*twój* are taught, but whichever unit extends the possessives will be re-teaching this string as an unrelated word and should expect the *ci*/*ci* treatment. *ci* appears in this unit only in its Dative sense, never as the virile demonstrative — *cię* and *ci* are already a one-letter minimal pair carrying the unit's central contrast. |
| `pron_prep` | The *n-* forms of the third-person pronouns after a preposition: *niego, niej, nim, nią, nich, nimi* (all verified NEW). Pays `o_loc`'s named fence, which said in its own note: "pronoun objects — *o tobie, o mnie, o nim, o niej* are new pronoun forms, absent from POOL, and are never shown, glossed or demanded… They need their own small unit." THE WHOLE RULE IS ONE LINE: after a preposition, the him/her/them pronouns all start with *n-*. The three governors are the three already owned and each keeps the case it has always had — *o* + Locative (`o_loc`), *z* + Instrumental (`inst_z`), *do* + Genitive (`prep_do_gen`) — so nothing about the prepositions changes; a clean 3×3 grid with only six distinct shapes in it. THE GIFT: the pronoun collapses its cases in exactly the pattern the adjective block just taught — *nim* covers Locative and Instrumental for masculine precisely as *dobrym* does, and *niej* covers Genitive and Locative for feminine precisely as *dobrej* does. THE ONE JUDGMENT CALL, conservative branch taken: **third person only**. *o mnie, o tobie, ze mną, z tobą, do ciebie, z nami, z wami* appear nowhere, because *tobie, tobą, mną, ciebie, nami, wami* are all NEW (six more forms) and *ze mną* additionally needs the *ze*-shape of *z* before m + consonant, which is a fact about the PREPOSITION. The tempting middle option was rejected on purpose: *o mnie / o nas / o was* would cost zero new strings, but shipping them without *o tobie* leaves the most frequent cell of the row missing, and a half-row whose hole is the useful cell is worse than a clean fence — so no first or second person is shown at all. FENCED: *dla* (B2-SPINE's own example *dla niej* is unusable — *dla* reports NEW and is a governor the course has never taught); *niemu*, because no preposition in this course governs the Dative, so the form would have no legal sentence to sit in; *w*/*na* + pronoun, which would put *nim* into a third job inside the unit that introduces it; and, held from `pron_acc`, *je*/*nie*, *jego*, *ciebie*, *siebie*/*sobie* and negated objects. THE RISK THE UNIT IS BUILT AROUND: the learner has owned *go*, *ją*, *ich* for exactly one unit, and the wrong sentence is **do go** rather than *do niego* — so every bare-form / *n*-form pair is drilled against itself, and the Match board deliberately carries the three bare object forms alongside their *n*- partners. As with `pron_acc`, none of these fences is machine-enforced: person pronouns sit in `GLUE_LEMMAS`. |
| `ze_clauses` | *że* as a productive complement conjunction attaching a whole finite clause to a verb of knowing or saying (*Wiem, że mama jest w domu*). ZERO new lemmas — the unit's entire content is the joint, and nothing inside the subordinate clause moves. CHUNK-TO-PARADIGM REVEAL, predicted by B2-SPINE O16 a block in advance: *że* reports TAUGHT (`b1_polite`) but only frozen inside *Przepraszam, że przeszkadzam*, whose own note records "że and przeszkadzam both verified untaught… never built". Re-taught explicitly here, the *dziękuję* / *której* / *nowego* / *mnie* precedent, and per the `adj_gen` convention the already-owned string stays in `uses_lemmas`, leaving `teaches_lemmas` legitimately empty (`copular_future` / `adj_inst` precedent). *wiem* is a SECOND chunk-to-slot reveal and carries `a2_directions_func`'s quarantine with it — that pack's note says it "never conjugates wiem", so *wiem* appears in the first person only and *wiesz*, *wie*, *wiedzieć* appear nowhere. THE MATRIX IS PRESENT-TENSE ONLY, a deliberate deviation from B2-SPINE's brief (which said the unit rides *mówił*/*mówiła*): the instant a past-tense verb of saying takes a *że*-clause the learner meets Polish's lack of tense back-shift, which is `reported`'s single new fact on the very next node, so spending it here would buy nothing. It also sidesteps AGENTS.md's dynamic-verb glossing rule, which would force "was saying" in a reporting frame. SECOND FACT, one line: the comma before *że* is compulsory and *że* itself is never dropped — English does the opposite on both counts, which is exactly why an English speaker under-produces them. THE TWO DISCRIMINATIONS, both zero-new-material: *że* vs *żeby* (`zeby`), a predictable confusion now that both sit in the same slot — *że* reports what is so, *żeby* gives a purpose or a wish; and *że* vs *który* (`ktory_cases`), whose difficulty is caused by ENGLISH rather than Polish, since English "that" is both conjunction and relative pronoun while Polish keeps them wholly apart. FENCED: all past-tense matrix verbs (above); INDIRECT QUESTIONS ABSOLUTELY — no question word after a matrix verb anywhere, since that is `indirect_q`'s one new fact two nodes later and `questions2` fenced it by name; *Nie wiem, że*, which is not idiomatic in any case because negated *wiedzieć* takes *czy* or a wh-word; *mam nadzieję* (*nadzieję* verified NEW), *cieszę się*, *uważam* and *wydaje mi się* (the last two belong to `discussion_func`); *słyszę, że*, since *słyszę* is itself a frozen phone chunk and would be a third chunk-to-slot reveal in one unit; and object pronouns anywhere, whose placement inside a subordinate clause raises word-order questions `pron_acc` left to C1. |
| `reported` | Reported speech: a PAST-tense verb of saying takes a `ze_clauses` complement (*Tata powiedział, że sklep jest zamknięty*). ONE NEW FACT — Polish does NOT back-shift the tense. Whatever tense the speaker actually used is kept, so English "said the shop WAS closed" is Polish *...że sklep JEST zamknięty*; likewise *będzie* where English reaches for "would be", and *kupił* where English reaches for "had bought". Framed as a gift (the `bedzie` "the future has no gender" idiom): one thing FEWER to do than in English. CASHES IN `ze_clauses`' LOGGED DEFERRAL — that unit kept every matrix verb in the present precisely so this fact would land here, so the joint itself is entirely owned and the only addition is the past-tense matrix verb. ONE NEW WORD: *powiedzieć*, the perfective twin of the owned *mówić*, handed over WHOLE in five forms (*powiedzieć, powiedziałem, powiedziałam, powiedział, powiedziała*) per B2-SPINE O7.2's closed-list treatment and `aspect_past`'s standing "learn the pair whole, never build the second verb from the first" framing — which it honours cleanly, being suppletive rather than prefixed. The gender split is not new, just `past_ac` on a new verb. GLOSSING per AGENTS.md: *powiedzieć* is perfective and glosses plain "said"; *mówił*/*mówiła* is dynamic imperfective and is glossed "was saying" / "kept saying" everywhere it appears, which is exactly the pair contrast the unit teaches. THE PERSON SHIFT IS FENCED, conservative branch, logged: no item asks the learner to turn a quoted *jestem zmęczony* into a reported *jest zmęczony*. Intro transformations use noun-subject quotes so nothing inside the clause moves at all, and third-person reports are only ever driven from English prompts that already say "he". The counter-argument is recorded in the pack — the person shift is not a Polish-specific fact, since English shifts identically — but load-splitting decides ties. FENCED: PLURAL past of both verbs (*powiedzieli*, *powiedziały*, *mówili* all verified NEW, and virile forms in a unit about tense); the non-past *powiem*/*powiesz* (verified NEW, and perfective FUTURE, a second tense job on the new word); *wiedzieć*/*wiesz*/*wie*, still under `directions_func`'s quarantine; INDIRECT QUESTIONS ABSOLUTELY, `indirect_q` being the very next node; masculine-ANIMATE relatives (`ktory_full`, two nodes later), so the one *który* item keeps `ktory_cases`' inanimate antecedent; *pamiętam* (verified NEW), the obvious second matrix verb, simply not owned. Tense distractors are real owned past forms (*był*, *była*, *miała*, *miałem*) — the wrong answer is precisely what an English speaker produces by back-shifting, which is what makes the item a real discrimination. |
| `indirect_q` | An embedded (indirect) question: a matrix verb takes a question as its complement (*Nie wiem, gdzie jest apteka*). ZERO NEW LEMMAS — every question word is owned and so is *czy*. Pays `questions2`'s fence by name, that pack's note saying "no indirect questions (Nie wiem, kiedy... is B1)"; never built at B1. THE HEADLINE IS A GIFT, the third consecutive unit that removes work rather than adding it (`copular_future`, `reported`, this): English REORDERS a question when it goes inside a sentence ("Where IS the chemist's?" → "I don't know where the chemist's IS"), and Polish never inverted in the first place, so there is nothing to undo — the question goes in exactly as it stands, after the comma `ze_clauses` already taught. THE ONE NEW JOB is *czy* = "whether"/"if": owned since `a1_questions` as the yes-or-no marker (*Czy jest chleb?*), and framed honestly as the SAME word doing the SAME job inside a bigger sentence, the asymmetry being on the English side, which switches words where Polish does not. Chunk-to-slot extension, so *czy* stays in `uses_lemmas` and `teaches_lemmas` is legitimately empty (`adj_gen` convention; `copular_future` / `adj_inst` / `ze_clauses` precedent). THE że/czy MINIMAL PAIR is the sharpest item and costs nothing: *Wiem, że mama jest w domu* vs *Nie wiem, czy mama jest w domu* — same clause, the opener alone decides settled versus open. It also guards the predictable error of over-reaching for *że*, freshly taught two nodes back. MATRIX VERBS ARE CONSTRAINED BY A STANDING QUARANTINE, logged not worked around: `directions_func` quarantined *wiem* ("never conjugates wiem") and `ze_clauses` held it, so the only openers are *Wiem*, *Nie wiem* (a taught chunk) and *powiedział*/*powiedziała* from `reported` one node earlier. Consequence stated plainly in the pack: Dad can say "I don't know where..." but not "Do you know where...?". LIFTING THE QUARANTINE — *wiedzieć* proper, with the *wiedzieć*/*znać* split — is C1 inbox, not smuggled in here. THE MATCH BOARD IS TWELVE QUESTION WORDS, one per row (*gdzie, kiedy, ile, czy, dlaczego, który, kto, co, kogo, kim, czym, komu*); five come from `question_cases`, which fenced embedded questions absolutely, so this is the first place they do real work. IOU CREATED FOR `jesli`, flagged because it will not be obvious later: the classic error is confusing *czy* with *jeśli*, and that error is IMPOSSIBLE today since *jeśli* is verified NEW and untaught until `jesli` two nodes on — so `jesli` should carry the *czy*/*jeśli* discrimination. FENCED: *wiesz*/*wie*/*wiedzieć*/*pamiętam* (all NEW); *jeśli* (NEW); *czego*, though `question_cases` taught it, since its natural home is *szukać* + Genitive and importing a governor to fill one board row is not worth it; question word + INFINITIVE (*nie wiem, co robić*), a separate construction; masculine-animate relatives (`ktory_full`, the very next node), so *który* appears only as an interrogative inside the embedded question, never as a relative. *otwarty* and *zamknięty* are used as the PLAIN ADJECTIVES `leaf_shopping_a1` taught, not as the participles `participle_pass` later reveals. |
| `ktory_full` | *który* completed: the relative pronoun after a preposition, plus masculine-ANIMATE antecedents. PAYS B1-DIGEST DEFERRED ITEM #2, both halves. (a) Locative and Instrumental relatives (*film, o którym mówiłem*; *kolega, z którym pracuję*), which `ktory_cases` fenced completely and logged as "deferred to a later pass or a dedicated unit"; governors are the three already owned — *o* + Loc (`o_loc`), *w* + Loc (`prep_w_loc`), *z* + Inst (`inst_z`) — plus the bare Instrumental of transport (`inst_transport`, *autobus, którym jadę*), so no preposition changes behaviour. (b) Masculine-animate antecedents (*pies, którego mam*), which `ktory_cases` fenced because *którego* would then sit in the Accusative table for a DIFFERENT reason than in the Genitive table — an objection that dissolved when `adj_gen` taught Acc≡Gen for masculine animates as a general fact, which is why the spine placed this unit after the adjective block. ONE NEW STRING IN THE ENTIRE UNIT: *którym*. *której*, *którą* and *którego* are all owned and are extended to new jobs — the "same endings, another job" idiom, fifth turn. THE GIFT (slide 4): every merger here has been met three or four times already — *którym* covers Loc+Inst exactly as *dobrym* (`adj_loc`→`adj_inst`), *nim* (`pron_prep`) and *kim* (`question_cases`) do; *której* covers Gen+Loc as *dobrej* and *niej* do; *którą* covers Acc+Inst as *dobrą* and *nią* do; *którego* covers Gen+Acc-animate as *dobrego* and *kogo* do. HOMOGRAPH TRAP, LIVE AND NAMED ON SLIDE 2 — the sharpest of the level: *o której* is a FROZEN CHUNK owned since `ordinals_time` meaning "at what time" (*O której jest spotkanie?*), and the relative *o której* is the same two strings doing an unrelated job. `check_new.py` reports *której* TAUGHT and names `ordinals_time` as owner. Quiz item 12 puts the frozen chunk directly beside the relative (the *ci*/*ci*, *może*/*może* treatment). Note this is the SECOND re-opening of the string — `ktory_cases` already re-taught it as a Genitive. THE ANIMACY CONTRAST is drilled as a pair (*film, który oglądałem* vs *pies, którego mam*), quiz items 6-8. FENCED, all verified NEW: ALL PLURAL RELATIVES (*którzy*, *których*, *którymi*, plural *którym*) — the relative declines like an adjective, so shipping them would breach B2-SPINE O3's plural-oblique-adjective hand-over to C1 by the back door; *któremu*, the DATIVE relative, a fifth case and fifth new string in a unit already landing four jobs, mirroring `pron_prep`'s fencing of *niemu* — a logged scope cut for the C1 inbox, not an oversight; *kolegę* and *filmie*, both verified NEW, which killed two natural draft sentences and were replaced rather than smuggled in; *dla* (NEW); negated objects, needing `neg_gen` later in B2; *siebie*/*sobie* (C1, O15). *mówiłem* is glossed "was talking about" per AGENTS.md's dynamic-verb rule, which reads naturally here unlike in a reporting frame. |
| `jesli` | REAL conditions: *jeśli* + a clause, with the result clause following after a comma (*Jeśli masz czas, zrobię obiad*). ONE NEW WORD IN THE WHOLE UNIT — *jeśli*, verified NEW — and zero new morphology: both halves are tenses the learner already owns, and `copular_future` back in Block 1 is what makes the natural result clause (*będę w parku*) expressible at all, which is why the spine put that unit second in the level. THE ONE REAL TEACHING POINT BEYOND THE WORD is the tense in the *jeśli*-clause, and it is framed as ENGLISH being the odd one out rather than Polish demanding something extra — the `bedzie` / `indirect_q` gift idiom, fourth outing. English uses a present after "if" even when it plainly means the future ("If the weather **is** nice, I **will** be in the park"); Polish simply puts in the tense it means (*Jeśli pogoda **będzie** ładna, będę w parku*), so there is no rule to learn, only an English habit to drop. Present-tense conditions stay present (*Jeśli masz czas…*), so both tenses are drilled and the choice is always "what do you actually mean". PAYS `indirect_q`'S EXPLICIT IOU, created there and flagged as one that would not be obvious later: that pack noted the classic error is confusing *czy* with *jeśli*, observed the error was impossible at the time because *jeśli* was still untaught, and handed the discrimination forward to this unit. It lands as a minimal pair on one clause — *Nie wiem, **czy** to jest dobra decyzja* versus ***Jeśli** to jest dobra decyzja, będzie dobrze* — with a test the learner can apply in English: swap "if" for "whether" and it is *czy*; swap it for "in the case that" and it is *jeśli*. Second contrast, one quiz item, zero new material: *jeśli* (condition) versus *bo* (reason, `questions2`), which an English speaker mixes far less often but which sharpens what a condition actually is. THE COMMA is the same fact `ze_clauses` taught and costs one line. WORD ORDER IS FENCED TO *jeśli*-FIRST, conservative branch, logged: the reversed order (*Będę w parku, jeśli pogoda będzie ładna*) is grammatical and common but is a second fact, and every subordinate clause the learner owns so far — *że*, *żeby*, *który*, embedded questions — comes second, so *jeśli*-first is already the new shape. Handed to the C1 inbox. ALSO FENCED, all verified NEW: *jeżeli* (the formal twin, a second word for one job); *gdy*; the resumptive *to* / *wtedy* in the result clause (*Jeśli…, to…*), a new job for a string the learner reads as "this", deliberately not planted one node before `gdyby`; and every unreal conditional, which is `gdyby`'s entire content on the very next node — no *by* form appears anywhere in the pack, not in a table, not as a distractor. The existential *będzie kawa* stays fenced per `copular_future`, so conditions about the weather are built subject-first (*Jeśli pogoda będzie ładna*), never *Jeśli będzie ładna pogoda*. *otwarty* and *zamknięty* are used as the PLAIN ADJECTIVES `leaf_shopping_a1` taught, not as the participles `participle_pass` later reveals. |
| `gdyby` | UNREAL conditions: *gdyby* + a person marker + the plain L-form, with the result clause in the conditional the learner already owns (*Gdybym miał czas, kupiłbym samochód*). PAYS `conditional_sg`'S NAMED FENCE — that pack restricted itself to "simple wishes and soft requests only, no *gdybym*/*jeśli…by* clauses" — and it is deliberately the node after `jesli`, so real and unreal conditions arrive back to back and can be taught against each other. THREE NEW STRINGS, nothing else: *gdybym*, *gdybyś*, *gdyby*. THE PERSON MARKER IS THE THIRD TURN OF ONE PATTERN, not a new fact, and the pack says so out loud: *-m* / *-ś* / nothing is the same family already owned twice over as *bym*/*byś*/*by* (`conditional_sg`) and as *żebym*/*żebyś* (`zeby`). THE SHAPE PARALLEL WITH `zeby` IS THE UNIT'S BEST ANCHOR and is drilled, not merely mentioned: *Chcę, żebyś zrobił obiad* and *Gdybyś miał czas, zrobiłbyś obiad* have the identical skeleton — marker welded to the function word, plain L-form on the verb, never *\*żebyś zrobiłbyś* and never *\*gdybyś miałbyś*. THE DOUBLE MARKER is named once: in a full sentence *-bym* surfaces twice, once on *gdyby* and once on the result verb (*Gdybym miał czas, kupiłbym…*), which looks like a mistake until it is pointed at. REAL vs UNREAL is the discrimination the unit carries forward from `jesli`, as a minimal pair on one clause — *Jeśli mama ma czas, zrobi obiad* (she might) against *Gdyby mama miała czas, zrobiłaby obiad* (she hasn't) — and the three-way English collapse is held open by one quiz item, since English "if" is *czy*, *jeśli* and *gdyby* depending on the job. THE APODOSIS IS SHARPLY LIMITED BY WHAT `conditional_sg` ACTUALLY TAUGHT, and this constrained the whole pack: *zrobiłbym* is verified NEW, so "I would make dinner" is NOT expressible and appears nowhere; the owned first-person conditionals are only *chciałbym*/*chciałabym* and *kupiłbym*/*kupiłabym*, so every 1sg result clause is built from those two verbs. Third person is freer (*zrobiłby*, *zrobiłaby*, *kupiłby*, *kupiłaby*, *mógłby*, *mogłaby*), which is why most of the board runs on *mama*/*tata* subjects. FENCED, all verified NEW: *byłbym*/*byłby* — the conditional of *być* is NOT taught, so "I would be…" is unavailable and every result clause needing it was rebuilt around *chciałbym być*; *zrobiłbym*, *zrobiłabyś*, *kupiłbyś*, *miałbym*, *mógłbym*, *poszedłbym* (the spine's own drafted example sentence, and the third prefix on *iść*'s suppletive stem that `b1_wrapup` already caught and rejected once); ALL PLURAL *gdyby* forms (*gdybyśmy*, *gdybyście*), mirroring `conditional_sg`'s and `zeby`'s own singular-first splits; the CONDITIONAL PAST (*byłbym miał*), B2-SPINE **O6**'s explicit deferral to C1 — so the L-form after *gdyby* is glossed only as a present-tense unreal ("if I had time", never "if I had had time"), and the fact that Polish uses one shape for both is not mentioned rather than half-taught; *jeżeli*, *gdy* and the resumptive *to*, all held from `jesli`. Distractors are owned forms in the wrong slot throughout — *miałem*, *mam*, *zrobił*, *zrobi*, *kupiła*, *kupi*, *byłeś* — never an untaught-but-real conditional such as *miałby*, which would teach a string through the back door. GLOSSING is clean without special handling: the L-forms used are all stative (*mieć*, *być*, *chcieć*), which AGENTS.md already glosses as plain simple past, and the perfective result verbs map straight onto English "would buy" / "would make". |
| `loc_pl` | The LOCATIVE PLURAL, `-ach` — one ending for every gender, and among the words this course owns there is no exception to it. B2-SPINE **O9**'s first of three one-ending plural-oblique units, deliberately the smallest thing in Block 5. THE ANCHOR IS A WHOLE PHRASE ALREADY OWNED: `a2_travel` taught *w górach* as a frozen holiday chunk, and `check_new.py` confirms *górach* TAUGHT there, so the unit opens by pointing at a form the learner has been producing since A2 rather than by announcing a new case. *górach* is recycled and is the one match row that is not new. ELEVEN NEW FORMS, all verified NEW: *domach, sklepach, hotelach, bankach, szkołach, firmach, gazetach, miastach, biurach, mieszkaniach, biurkach* — four masculine, four feminine, four neuter counting *górach*, because the unit's whole claim is that gender stops mattering here and the board has to show that. THE RULE IS STATED IN THE FORM IT IS ACTUALLY TRUE IN. Neither 'add `-ach` to the plural' nor 'add `-ach` to the Locative singular' is true of these words (*w mieście* → *w miastach*); the honest statement, and the one on slide 2, is: take the plain dictionary word, drop a final vowel if there is one, add `-ach`. THE HOMOGRAPH DECISION SHAPED THE WHOLE PACK. The obvious intro table pairs the nominative plural with the new form (*szkoły* → *szkołach*), and it is wrong: `check_new.py` reports *szkoły* TAUGHT, but the owners are `a1_gen_endings` (*szkoła* → *szkoły*, GENITIVE singular) and `a1_prep_do_z` (*ze szkoły*). The identical trap holds for *miasta* (`a1_gen_endings`, *do miasta*), *książki* (`a1_gen_ki`, *nie mam książki*), *biura* and *firmy* (`a1_prep_review_2`, *do biura* / *do firmy*) — every one owned as a genitive singular, none as a nominative plural. So the left-hand column is the LOCATIVE SINGULAR the learner genuinely owns (*w szkole, w mieście, w biurze, w firmie*). The nominative plurals that ARE honestly owned as plurals (*sklepy, banki, hotele, domy, okna, telefony, klucze*, `a2_plural_nom`) are used only as sentence subjects, the job that pack taught them in. THE PREDICTABLE ERROR IS NOT THE SINGULAR BUT THE GENITIVE PLURAL, and slide 4 plus four quiz items guard it: `a2_gen_pl` taught *domów, sklepów, banków, gazet, miast, biur* alongside *dużo*, *blisko* and *nie ma*, and those forms are also plural and also not the subject form, so a learner fresh from `-ach` reaches for it after *dużo*. The split is named out loud (*dużo sklepów*, never *dużo sklepach*), both halves of every negative illustration being owned strings. QUIZ ITEM 1 IS DELIBERATELY NOT THIS LESSON'S FORM — the answer is *domu* with *domach* on the button row — because a unit whose every answer is the new ending teaches button-picking, not reading. FENCED: NO PLURAL ADJECTIVES OF ANY KIND (B2-SPINE **O3**'s hand-over to C1), which makes this an entirely bare-noun unit and is why 'in the big cities' is nowhere in it; *gór, szkół, firm* — the genitive plurals of the feminine nouns used here — all verified NEW, so only `a2_gen_pl`'s own word list appears in the *dużo* contrast, with completion left to `gen_pl_full`; *oknie, mieszkania, biurka, restauracje, komputery, tych, moi, wiele*, all verified NEW; and *dzieciach* / *ludziach*, which are regular and would have been legal but whose two nouns head the irregular INSTRUMENTAL plurals `inst_pl` must decide about one node later — *dzieci* and *ludzie* appear as subjects only. |
| `question_cases` | The question words *kto* and *co* in the oblique cases: *kogo, czego, komu, kim, czym* (all five verified NEW; *kto* and *co* are `a1_questions` anchors, recycled and never re-taught). Pays TWO named fences at once — `inst_z`'s ("*kim* is a new pronoun form and is not in POOL… if James wants *Z kim?* as a live question it needs its own small unit", the fence behind one of AGENTS.md's three title-rule violations) and `o_loc`'s (*o czym* kept out of every slide **and** out of `body_pl` there). NO NEW GOVERNORS: every case here is assigned by a verb or preposition the learner already owns — object verbs (`miec_acc`), *do* + Gen (`prep_do_gen`), *nie ma* + Gen (`negation`), *pomagać*/*dziękować* + Dat (`dative_sg`), *o* + Loc (`o_loc`), *z* + Inst (`inst_z`), bare Inst of transport (`inst_transport`), and *być* + Inst identity (`inst_identity`). THE GIFT: five forms carry eight jobs, and all three mergers are re-sightings rather than new facts — *kogo* merges object with Genitive exactly as `adj_gen` taught for masculine animates (*Mam małego psa* / *do małego psa*), while *kim* and *czym* each merge Locative with Instrumental exactly as *nim* does (`pron_prep`, one unit earlier) and *dobrym* does (`adj_loc`→`adj_inst`). THE HONEST COUNTER-CASE, one line and one quiz pair: for a THING the object form is just *co* (*Co masz?*), because only people and animals merge object with Genitive. FENCED: *czemu* appears nowhere at all — not in a table, not as a distractor — on two independent grounds, that the Dative of a thing earns this learner nothing and that *czemu* is also colloquial "why", so shipping it here would plant a homograph inside the unit introducing the form; the Dative row therefore carries an em dash in the thing column. *czyj* (NEW); any preposition other than *o* and *z* with a question word (*dla* itself reports NEW and was already dropped from `pron_prep`); negated objects, held from `pron_acc`, since *Nie znam kogo* needs the Genitive of negation (`neg_gen`'s job later in B2); and *Kogo nie ma?*, grammatical but deliberately unshown, since it puts a person into the *nie ma* slot the pack has just used for things. INDIRECT QUESTIONS ARE FENCED ABSOLUTELY — every question word in the pack sits in a DIRECT question with a question mark, because embedded questions are `indirect_q`'s single new fact and `questions2` fenced them by name. |
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
