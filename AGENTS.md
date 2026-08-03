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

| Kind | Edit here |
|------|-----------|
| **Shell** (HTML/CSS/JS in rupl-exp) | `rupl-exp` directly |
| **Grammar content / blocks** | **`rupl2`** then `py scripts/sync_from_stable.py` |
| **Vocab content / blocks** | **`rupl3`** then sync |

If you only patch `rupl-exp/data/` copies, **sync will overwrite them**.

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
