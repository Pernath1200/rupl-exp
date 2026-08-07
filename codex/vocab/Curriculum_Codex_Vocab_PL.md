# Curriculum Codex — Vocab (Polish)

**PL vocab units for spine / A1 live canopy.**  
Houses and trunk seats from `../topology.json`. Influenced by EN `V_THM` / house model in `rue-codex`.

## Schema

| Column | Purpose |
|--------|---------|
| `unit_id` | `V_PL_[CODE]-[BAND]-[NN]` |
| `title` | Author title |
| `tree_part` | `trunk` or house id |
| `band` | A1B1 |
| `status` | Build progress |
| `app_ref` | RUPL3 / exp node ids |

## Units (spine + live A1 seed)

### Trunk / frames

| unit_id | title | tree_part | status | app_ref |
|---------|-------|-----------|--------|---------|
| V_PL_COR-A1-01 | Core frames · social | trunk | app-integrated | trunk_social_a1 |
| V_PL_COR-A1-02 | Core frames · be/have | trunk | app-integrated | trunk_be_have_a1 |
| V_PL_COR-A1-03 | Core frames · want/like | trunk | app-integrated | trunk_want_like_a1 |

### Themes / leaves (A1 near-stem)

| unit_id | title | tree_part | status | app_ref |
|---------|-------|-----------|--------|---------|
| V_PL_HOM-A1-01 | Dom i rodzina | home_family | app-integrated | leaf_home_family |
| V_PL_FOOD-A1-01 | Jedzenie i picie | food_shopping | app-integrated | leaf_food_a1 |
| V_PL_FREE-A1-01 | Czas wolny | free_time | app-integrated | leaf_freetime_a1 |
| V_PL_CITY-A1-01 | Miasto i transport | travel_city | app-integrated | leaf_city_a1 |
| V_PL_PLACE-A1-01 | Miejsca | travel_city | app-integrated | leaf_places |
| V_PL_WRK-A1-01 | Praca | work_routine | app-integrated | leaf_work_a1 |

## Notes

- Full RUPL3 canopy (colours, animals, …) can add rows without changing topology seats.
- Lemma `gender` field is a Phase-2 app contract, not required in this thin seed.
