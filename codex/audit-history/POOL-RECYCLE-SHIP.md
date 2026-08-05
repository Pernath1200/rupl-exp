# Pool · focus · recycle — shipped

**Date:** 2026-07-30  
**Audit:** errors **0** · warns **0**

## Done (priorities 1–6)

| # | Work | Status |
|---|------|--------|
| 1 | Spec §1.1 cumulative pool + focus + recycle | `SEQUENCING.md` + `PL-A1-SPINE.md` |
| 2 | Food `sentences[]` (miec_acc focus + to_jest/poss/być + Dom recycle) | 16 items; path **after** `a1_miec` |
| 3 | Grammar recycle: `a1_miec` + `a1_present` use/type | Dom/food lemmas in use items |
| 4 | Freetime + places Zdanie; want_like frames cleaned | 16 + 16 + 16 frames |
| 5 | Auditor richness warns | `structure_spread_thin`, `lemma_recycle_thin` |
| 6 | Weighted sampling | `FOCUS_WEIGHT=3` on focus structures in vocab/grammar passes |

## Path order (exp)

```text
social → gender → poss → Dom → być → być-ramy → zgoda
  → mieć → acc gym → **Jedzenie** → present → present gym
  → free time → want·like → places → city → work
```

## Verify

```powershell
py rupl-codex\sequencing\apply_tags.py
py rupl-exp\scripts\sync_from_stable.py
py rupl-codex\sequencing\audit.py
```

Open **http://localhost:8096** · Ctrl+F5 · Jedzenie → **4 · Zdanie** should show EN→PL (not wkrótce).
