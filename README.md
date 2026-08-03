# RUPL · **v0.2** (unified Polish)

Grammar (**RUPL2**) + vocab (**RUPL3**) in **one** shell.

**Live:** [https://pernath1200.github.io/rupl-exp/](https://pernath1200.github.io/rupl-exp/)  
**Repo:** [Pernath1200/rupl-exp](https://github.com/Pernath1200/rupl-exp)

| | |
|--|--|
| **Product version** | **v0.2** (active) |
| **Fallback** | tag **`v0.1`** · branch **`fallback/v0.1`** — [FALLBACK.md](./FALLBACK.md) |
| **Progress key** | `rupl-exp-v0.1-progress` (do not rename) |
| **Agents** | [AGENTS.md](./AGENTS.md) |

Stable siblings (separate apps):  
[RUPL2 grammar](https://pernath1200.github.io/rupl2/) · [RUPL3 vocab](https://pernath1200.github.io/rupl3/)

Read **[CHARTER.md](./CHARTER.md)** before changing scope.

```powershell
py scripts\smoke.py
```

## GitHub Pages

Deploy: branch **`main`** · folder **`/` (root)** →  
`https://pernath1200.github.io/rupl-exp/`

Progress is **local to each browser** (`rupl-exp-v0.1-progress`). Testers do not share scores with you or each other.

## Run locally (your smoke tests)

```powershell
cd C:\Users\ADMIN\documents\projects\rupl-exp
py scripts\sync_from_stable.py
py -m http.server 8096
```

Open **http://localhost:8096** · hard-refresh **Ctrl+F5** after code or sync changes.

| App | Port / URL |
|-----|------------|
| rupl3 stable | 8094 · Pages |
| rupl2 stable | 8095 · Pages |
| **rupl-exp** | **8096** · **https://pernath1200.github.io/rupl-exp/** |

## What it does

- **Ścieżka spine** — teach grammar then use vocab for each unit  
- **Dual panels** — korzenie fill + słówka fill  
- **Ćwicz** — opens grammar ladder or vocab ladder  
- Progress only in `rupl-exp-v0.1-progress` (never overwrites stable apps)

## Sync from stable

Re-copy blocks and rebuild tree from `rupl2` + `rupl3`:

```powershell
py scripts\sync_from_stable.py
```

Then commit + push if you want Pages to match localhost.

## Deploy after local smoke

```powershell
cd C:\Users\ADMIN\documents\projects\rupl-exp
py scripts\sync_from_stable.py
git add -A
git commit -m "Sync from stable + smoke fixes"
git push origin main
```

Pages rebuilds in about a minute.

## Version

**v0.2** · active unified shell · does not replace rupl2/rupl3  
**v0.1** · fallback save only
