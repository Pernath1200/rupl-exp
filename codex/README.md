# rupl-codex

**Polish (PL) curriculum unit register** — sibling of EN [`rue-codex`](../rue-codex).

## Model

| Layer | Shared? | Where |
|-------|---------|--------|
| Tree **topology** | Yes (universal seats) | **Canonical: `rue-codex/topology.json`** (promoted there 2026-08-08); local `topology.json` = PL-labelled mirror |
| Unit **lists** | Per language | This repo for PL |
| EN source of influence | Parent model | `../rue-codex` |

Seat changes go to the parent first, then propagate to this mirror (which additionally carries `label_pl` / `student_labels_pl`).

Apps: RUPL2 (grammar) · RUPL3 (vocab) · **RUPL-exp** (combined).  
Student UI uses PL labels only — never NP/VP teacher codes.

## Pipeline

```text
rupl-codex (unit_id)  →  app tree node (codex_unit + tree_part)  →  practice
```

## Files

| File | Role |
|------|------|
| `topology.json` | Universal seats (grammar laterals + vocab houses) |
| `grammar/Curriculum_Codex_Grammar_PL.md` | PL grammar units |
| `vocab/Curriculum_Codex_Vocab_PL.md` | PL vocab units (spine/A1 live) |
| `codex.json` | Machine list (hand-maintained thin seed for now) |
| `SEQUENCING.md` | Teach/use unlock rules, structure IDs, glue, audit report schema |
| `sequencing/` | Tags + auditor: `apply_tags.py`, `audit.py`, `tags.json` |
| `audit/` | Latest sequencing report (`SEQUENCING-AUDIT.md`, `.json`) |

## Status

`planned` | `drafted` | `app-integrated`

## Relation to EN

Derived from / influenced by `rue-codex` topology and banding.  
**Not** a fork of English unit titles. Multi-lang merge later if useful (vocab easier than grammar).
