# RUPL · Charter **v0.2**

**Status:** active · grammar + vocab in one shell  
**Folder:** `projects/rupl-exp` only  
**Live:** https://pernath1200.github.io/rupl-exp/  
**Fallback:** tag `v0.1` / `fallback/v0.1` — [FALLBACK.md](./FALLBACK.md)  
**Does not replace:** `rupl2` (grammar) · `rupl3` (vocab)

---

## One-liner

One local tree: **teach system** (grammar roots) then **use on themes** (vocab leaves), with a shared spine and dual practice engines.

---

## Locks

| | Value |
|--|--------|
| Port | **8096** |
| Progress | `rupl-exp-v0.1-progress` (never rupl2/rupl3 keys) |
| Smoke | `rupl-exp-v0.1-smoke-flags` |
| Architecture | Dual practice modules (not one mega-engine) |
| Spine | In-app teach→use (no hard lock) |
| Content | Synced from stable via `scripts/sync_from_stable.py` |
| Scope v0.1 | Spine-linked nodes + grammar gyms |

---

## Sync

```powershell
cd C:\Users\ADMIN\documents\projects\rupl-exp
py scripts\sync_from_stable.py
py -m http.server 8096
```

---

## Non-goals v0.1

- Replace stable apps  
- Hard cross-locks  
- Full lemma gender migration  
- Instrumental identity in vocab  
- Single practice.js  
