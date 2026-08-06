# Agent rules — RUPL v0.2 (Polish unified)

## Product

| | |
|--|--|
| **Folder** | `projects/rupl-exp` |
| **Live site** | https://pernath1200.github.io/rupl-exp/ |
| **Version** | **v0.2** active · **v0.1** = fallback tag |
| **Progress key** | `rupl-exp-v0.1-progress` — **never rename** |
| **Local port** | 8096 |

## Git

| | |
|--|--|
| **Remote** | `Pernath1200/rupl-exp` |
| **Pages** | branch **`main`** (deploy) |
| **Work** | branch `agent/…` → **draft PR into `main`** |
| **Never** | push straight to `main` overnight · never force-push `fallback/*` |

## Critical — where fixes go

`rupl-exp` is the **one canonical repo** (decided 2026-07-30). Everything is edited here:

| Kind | Edit here |
|------|-----------|
| **Shell** (HTML/CSS/JS) | `rupl-exp/` directly |
| **Grammar content / blocks** | `rupl-exp/data/grammar/blocks/` directly |
| **Vocab content / blocks** | `rupl-exp/data/vocab/blocks/` directly |
| **Path / node wiring** | `rupl-exp/data/tree.json` (`path_order` + `nodes`) |

> **`rupl2` / `rupl3` are FROZEN archives — never edit them, never sync from them.**
> `scripts/sync_from_stable.py` is retired and carries a hard guard. The old
> "edit stable then sync" instruction was wrong and is gone.

## Quality gate

The sequencing auditor, pool generator and vocab-triage tool live in `codex/`
inside this same repo (merged 2026-08-06 from the sibling repo `rupl-codex`,
which had no git remote — a single clone is now self-sufficient):

```powershell
cd C:\Users\ADMIN\Documents\projects\rupl-exp\codex\sequencing
py -X utf8 audit.py     # must report: errors 0 · warns 0
```

It walks `tree.json` `path_order`, and for every **live** node checks that the pack
never *uses* a structure or lemma that was not *taught* at or before that point.
Spec + structure-ID catalogue: `codex/SEQUENCING.md`. **Never invent structure
IDs** — add them to the catalogue and to `STRUCTURE_CATALOGUE` in `audit.py` first.

`audit.py` writes straight to `rupl-exp/audit/` (no separate copy step needed —
that used to be a manual cross-repo mirror; it's now the same directory).

**Before authoring a batch, regenerate the position-aware pool:**

```powershell
py -X utf8 make_pool.py <output-path> --before <the-next-unbuilt-node-id>
```

Hand agents the pool file, not the raw tree — a stale or position-blind pool
has caused a real sequencing bug and repeatedly made agents wrongly cautious.
`--before` matters: the pool for a unit is everything taught *strictly before
it* on `path_order`, not everything taught anywhere (units are authored out of
order, so live nodes routinely sit later than the one being written).

**Before treating a vocabulary candidate as new, check it:**

```powershell
py -X utf8 check_new.py word1 word2 word3
```

It reports which pack already teaches each word, at which path index — and
what it was taught **as** (see the homograph trap below). Several briefs this
project wrongly assumed a word was new when an earlier pack already owned it.

## Windows gotchas

- Use `py -X utf8` for anything touching Polish text.
- **Never** use PowerShell `-replace` + `Set-Content` on files with Polish
  characters — it mojibakes UTF-8. Use the Edit tool or Python with
  `encoding="utf-8"`.
- Documents sync can fork a file mid-edit into a `(# Name clash … #)` copy and
  roll back the original. **Check `git status` for clash files before every
  commit.**

## Do

- `agent-ready` + `size:S|M` only  
- Run `py scripts/smoke.py` · paste output in PR  
- Dual engines stay separate: `practice-grammar.js` + `practice-vocab.js`

## Don’t

- Replace rupl2/rupl3 stable apps  
- Rename progress / smoke-flag keys  
- Merge engines into one mega-file without a human plan  

## Smoke

```powershell
cd C:\Users\ADMIN\documents\projects\rupl-exp
py scripts\smoke.py
```

James smoke-tests by hand — agents never claim a unit is "tested", only
"audit-clean". Flag-button smoke is his job, not yours.

---

# Authoring contract (learner-facing content)

These are James's standing rules. They are not style preferences; breaking them
has produced real learner failures. The auditor catches **none** of them.

## Who the learner is

Dad — a distractible absolute beginner who **reads no Polish**. Every must-read
instruction, hint, prompt and button is in **English**. Polish appears only as
the material being learned. No teacher/builder surfaces (unit codes, case tags,
structure IDs, notes) are ever visible unless *Tryb autorski* is on.

Use plain, real grammar terms — *preposition*, *genitive*, *neuter*. Baby-talk
("its little word") is **banned**. Naming the real category is respectful and
it is what makes the pattern learnable.

## The anchor rule (most-broken, highest-cost)

> Every frame sentence contains **exactly one unknown** — the new word — anchored
> by material already taught, so the learner can work it out from context.

Never write lookalike frames where both halves are new (*To jest łatwe / trudne*).
Where no lexical anchor exists, use a **visual anchor**: `icon` (emoji) or
`swatch` ("#hex") on the item renders in Match/Quiz/type.

## Stage contracts (grammar packs)

| Stage | Contract |
|-------|----------|
| **Wstęp** (intro) | Slides may carry `table` + `examples`. Tables/bullets, never prose walls. |
| **Dopasuj** (match) | Exactly **12 balanced rows**; whole board is shown, so every verb/form of the unit must appear. Clean pairs — no object phrases padding a form board. |
| **Kontrola** (quiz) | Discrimination items. Real forms, not meta-questions *about* the language. |
| **Pisanie** (type) | The **minimal pattern unit only** — a single form for conjugation; a phrase where the pattern *is* a phrase (*dobra kawa, w domu*); a frame for to-jest/questions. **HARD CAP (James 2026-08-06): a typed-whole answer is at most 3 words.** Anything longer is a **cloze** (`mode:"cloze"`, `frame` with one `___`, `answer` = the missing word) with the blank on the **unit's teaching point** — never ask the learner to type a full sentence in Pisanie. See `codex/REPAIR-QUEUE.md` for the conversion of pre-rule packs. |
| **Użycie** (use) | **Real sentences with a noun subject and/or object.** Pronoun+verb alone is pro-drop-degenerate (*On pracuje* ≈ *pracuje*) and bare 1sg declaratives are Pisanie material. One-word questions (*Pracujesz?*) are exempt. |

**No duplicates within a stage** — never pad a stage by repeating an item.

**Stage overlap IS allowed and wanted** (James, 2026-08-05): Match and Pisanie may
drill the same core paradigm. That is the ladder — recognition then production —
and it holds the form-count per unit down, which matters more for a distractible
learner than breadth. Do **not** force the two stages to be disjoint.

**Użycie ≠ Pisanie**: a use item must never be a bare form repeating the type stage.

## Glossing the past (imperfective)

All A2 past is imperfective; aspect is fenced to `a2_aspect`. English glosses must
not teach a mapping that breaks when aspect arrives. Rule (James, 2026-08-05) —
**split by verb type**:

| Verb type | Gloss | Why |
|---|---|---|
| **Dynamic** (*kupować, czytać, robić, pić, pracować, grać, mówić*) | progressive or habitual — "was buying", "used to read" | "Mum bought bread" really maps to perfective *kupiła*; teaching it against *kupowała* has to be un-taught later. |
| **Stative** (*znać, lubić, mieć, chcieć*) | plain simple past — "knew", "liked", "had", "wanted" | "I was knowing the address" is not English, and these verbs have no everyday perfective, so simple past is unambiguous. |

## Every-form-taught rule

Any inflected form a prompt demands must (a) appear in intro/match/type, and
(b) be listed in `teaches_lemmas` so the auditor polices it. Tagging only the
citation form (*biuro*) while the sentence uses *biurze* **evades the check** —
tag the inflected surface form too.

## Homograph trap — the auditor cannot see this one

The auditor matches **strings**. A form can be tagged as taught while meaning
something completely different, and a pack that reuses the string will audit
clean while showing the learner a form they read as the wrong word.

Real examples, all caught by agents rather than by the gate:

| Form | Taught as | Would have been used as |
|---|---|---|
| `mamy` | the verb *we have* (`a1_miec`) | genitive of *mama* — "than mum" |
| `córki`, `wina`, `gazety`, `okna` | nominative **plurals** (`a2_plural_nom`) | genitive **singulars** |
| `góry` | plural noun *mountains* (`a2_travel`) | genitive of *góra* |
| `kawy`, `szkoły` | genitive singular (`a1_gen_endings`) | nominative plural |

**So:** before reusing a form, check not just that it is taught but **what it was
taught AS**. `check_new.py` names the owning pack — read it. If the function
differs, either pick a different word or teach the form yourself and say so.

Masculine-animate nouns are the honest exception: *brata / psa / kota* really are
identical in the accusative and the genitive. Using them across both is legitimate
— but name it in one line rather than letting it slip past.

## Load-splitting

If a unit would teach two new systems at once, **split it**. Precedent: the old
do/z unit was a cliff (first genitive endings + ze-rule + 3-way contrast) and
became three units. James's reason: *"if students get frustrated they give up —
I can't allow this."* An assembly unit should introduce only one new thing.

## Gyms — drill only what's hard (James, 2026-08-06)

James retired `a2_past_gym` from the live path after smoking it: *"heavy
drilling is needed for some endings, at early stages, as this is a major
sticking point in reaching automaticity, but this was a repetition of things
that were not difficult, and just seemed a waste of time."* The binding rule
for every future gym decision:

- A gym earns its path slot ONLY when it drills endings that are genuinely
  hard at that stage (case endings, virile alternations — the cliffs).
  Comfortable material gets NO gym.
- The default recycling mechanism is not a gym at all: **use new grammar and
  vocabulary actively in later units' sentences** (the pool makes this free).
- Massed reps on easy material belong to the future rep-stations layer, not
  the teaching path. A retired gym's bank is stations feed, not dead work.
- Existing gyms are subject to James's live smoke verdicts, one by one —
  do not add new gyms beyond the current spines without a spine-level note
  justifying them against this rule.

## Vocab packs

- Every Polish noun carries `gender: m|f|n|pl` → renders as a colour-coded badge
  on the **PL side only**, never on an EN prompt. Watch soft feminines (*mysz,
  noc*) and -a masculines (*tata, kolega*).
- Sense-indicators on ambiguous glosses: `cost (verb)`, `cough (noun)`.
- `sentences[]` (Zdanie) is the pack's fruit; tag `structures` + `lemmas` per item.
- Recycle a range of unlocked structures, not just the last grammar unit.
- Never re-teach a lemma an earlier pack already taught — recycle it instead,
  and list it in `uses_lemmas`.

## Unit titles are learner-visible chrome

Both `title` (Polish) and `title_en` appear on the map and in practice. So:

- **Never put an untaught Polish form in a title.** Caught three times in one
  night: *Z kim?* (`kim`), *Jechać · pojazdem* (`pojazdem`), and A1's own
  *Być · fundament* — where *być* itself was untaught for 45 units.
- Prefer the house pattern — name the case or the contrast with material the
  learner already has: `Mieć + biernik`, `Z + narzędnik`, `Idę czy jadę?`.
- **No builder jargon in `title_en`.** *seed*, *light*, *shells* are not learner
  English. A1 still carries "Być seed (not greetings)" and "Have + accusative
  light"; don't add more.

The Polish shorthand line (`body_pl`) is the one place untaught metalanguage is
allowed by convention — case names like *miejscownik* already live there.

## Explanations

Items may carry an optional `explain` string (learner English). It renders as an
on-demand **"Dlaczego? · Why?"** link at answer reveal — never shown unprompted.
Author them from A2 onward, especially on hard or exceptional forms. Explain
*why the form is what it is*; do not restate the answer.

## Progress rules

First completion of the ladder earns the fruit — the app is **not strict on a
first pass** (James, 2026-08-04). Spaced reviews keep the 75% bar. Never
reintroduce a first-pass score gate.

## Honesty

Report what you actually did. If a unit was parked, say so. If the audit failed,
paste the failure. Never describe unbuilt work as built.
