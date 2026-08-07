# Sequencing Phase 4 — done

**Date:** 2026-07-30  
**Result:** `py rupl-codex/sequencing/audit.py` → **errors: 0 · warns: 0 · exit 0**

## Changes

| Item | Action |
|------|--------|
| `a1_gender_check` | `teaches_lemmas` += `ser`, `woda`, `auto` |
| `a1_miec` | `teaches_lemmas` += `książkę` |
| `a1_acc_gym` | Full rewrite: only *kawa / herbata / woda / książka* Acc + *mam/masz/ma* frames |
| `apply_tags.py` | Gym packs: do not merge every content surface into `uses_lemmas` |

## Verify

```powershell
py rupl-codex\sequencing\apply_tags.py
py rupl-exp\scripts\sync_from_stable.py
py rupl-codex\sequencing\audit.py
```

## Optional Phase 5 (later)

CI on sync, off-path canopy, item-level want_like deep check, author-mode warn in app.
