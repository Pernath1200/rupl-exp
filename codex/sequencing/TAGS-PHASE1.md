# Sequencing tags · Phase 1

**Spec:** [SEQUENCING.md](../SEQUENCING.md)  
**Sidecar:** [tags.json](./tags.json)  
**Packs:** tags written in-place under `rupl2/data/blocks` and `rupl3/data/blocks`.

Run after edit: `py rupl-codex/sequencing/apply_tags.py` then `py rupl-exp/scripts/sync_from_stable.py`.

| pack_id | node_id | domain | teach struct | use struct | teach lem | use lem |
|---------|---------|--------|--------------|------------|-----------|---------|
| `a1_trunk_social` | `trunk_social_a1` | vocab | 1 | 1 | 20 | 20 |
| `a1_gender` | `a1_gender` | grammar | 1 | 1 | 9 | 9 |
| `a1_poss_simple` | `a1_poss_simple` | grammar | 1 | 2 | 6 | 15 |
| `a1_home_family` | `leaf_home_family` | vocab | 0 | 2 | 32 | 38 |
| `a1_hello` | `a1_hello` | grammar | 2 | 3 | 6 | 12 |
| `a1_trunk_be_have` | `trunk_be_have_a1` | vocab | 0 | 3 | 36 | 41 |
| `a1_gender_check` | `a1_gender_check` | grammar | 1 | 2 | 6 | 15 |
| `a1_food` | `leaf_food_a1` | vocab | 0 | 5 | 47 | 47 |
| `a1_miec` | `a1_miec` | grammar | 2 | 2 | 12 | 20 |
| `a1_acc_gym` | `a1_acc_gym` | grammar | 0 | 3 | 0 | 19 |
| `a1_present` | `a1_present` | grammar | 2 | 2 | 14 | 19 |
| `a1_present_e_isz` | `a1_present_e_isz` | grammar | 2 | 3 | 14 | 19 |
| `a1_present_e_esz` | `a1_present_e_esz` | grammar | 2 | 3 | 7 | 16 |
| `a1_present_gym` | `a1_present_gym` | grammar | 0 | 5 | 0 | 30 |
| `a1_questions` | `a1_questions` | grammar | 1 | 6 | 10 | 15 |
| `a1_prep_place` | `a1_prep_place` | grammar | 2 | 4 | 15 | 29 |
| `a1_prep_do_z` | `a1_prep_do_z` | grammar | 3 | 4 | 11 | 18 |
| `a1_negation` | `a1_negation` | grammar | 1 | 3 | 11 | 20 |
| `a1_inst_job` | `a1_inst_job` | grammar | 1 | 2 | 16 | 11 |
| `a1_freetime` | `leaf_freetime_a1` | vocab | 0 | 9 | 78 | 78 |
| `a1_trunk_want_like` | `trunk_want_like_a1` | vocab | 0 | 8 | 32 | 35 |
| `a1_places` | `leaf_places` | vocab | 0 | 12 | 35 | 35 |
| `a1_city` | `leaf_city_a1` | vocab | 0 | 7 | 28 | 28 |
| `a1_work` | `leaf_work_a1` | vocab | 0 | 4 | 35 | 35 |

## Structure teaches (by pack)

- **a1_trunk_social**: `social_chunk`
- **a1_gender**: `to_jest`
- **a1_poss_simple**: `poss_nom`
- **a1_hello**: `byc_present, to_jest`
- **a1_gender_check**: `zgoda`
- **a1_miec**: `miec_present, miec_acc`
- **a1_present**: `present_am, present`
- **a1_present_e_isz**: `present_e_isz, present`
- **a1_present_e_esz**: `present_e_esz, present`
- **a1_questions**: `question`
- **a1_prep_place**: `prep_w_loc, prep_place`
- **a1_prep_do_z**: `prep_do_gen, prep_z_gen, prep_place`
- **a1_negation**: `negation`
- **a1_inst_job**: `inst_identity`

## Notes

- Vocab word-only leaves (`food`, `places`, …): `uses_structures` empty until Zdanie banks exist.
- `a1_trunk_want_like` honestly declares `present` + `miec_acc` (acc objects); Phase 2 may flag if path order wrong.
- Gyms teach nothing new; they only **use** prior structures.
- Item-level Dom `structures` rolled into pack `uses_structures`.
