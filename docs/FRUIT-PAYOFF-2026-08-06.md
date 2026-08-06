# First-fruit payoff + gates · 2026-08-06

Ported from **rue2-grok-v1.0** into **rupl-exp**.

## Rules

| | |
|--|--|
| **Grammar fruit** | Check clear + Type clear + Use finished |
| **Vocab fruit** | Match done + Quiz clear + Type clear + Sentence finished |
| **Clear** | best ratio ≥ 1 or sticky cleanPass (retry until clear) |
| **Use / Zdanie entry** | **Blocked** until prior stages clear (RUE2-style) |
| **Soft 0.8 / 0.75** | Reviews only — not first-learn tick |
| **Payoff** | Tick + level chip + Learned bar only on `!wasFruit → nowFruit` |

## Bug fixed

Modes-only fruit fired after one Use/Sentence round with open misses.  
Now partial scores do **not** fruit; ladder jump to Use is blocked.

## Tests

```powershell
cd projects\rupl-exp
node scripts\_test_fruit_gates.js
```
