# Curriculum Codex — Grammar (Polish)

**PL grammar units for A1 (live RUPL2 / RUPL-exp).**  
Topology seats: see `../topology.json`. Influenced by EN `rue-codex` Grammar Codex — **not** a copy of English titles.

**Status:** `planned` | `drafted` | `app-integrated`

## Schema

| Column | Purpose |
|--------|---------|
| `unit_id` | `G_PL_[SEAT]-[BAND]-[NN]` |
| `title` | Human (can be PL or EN gloss for authors) |
| `tree_part` | Seat id from topology |
| `label_pl` | Student-facing root label |
| `band` | A1B1 / … |
| `status` | Build progress |
| `app_ref` | RUPL2 / rupl-exp node ids |

## Units (A1 live seed)

| unit_id | title | tree_part | label_pl | band | cefr | status | app_ref |
|---------|-------|-----------|----------|------|------|--------|---------|
| G_PL_FORM-A1-01 | Gender + to jest (Nom) | forms | Formy | A1B1 | A1 | app-integrated | a1_gender |
| G_PL_FORM-A1-02 | Noun–adjective agreement (dobry/a/e) | forms | Formy | A1B1 | A1 | app-integrated | a1_gender_check |
| G_PL_FORM-A1-03 | Accusative light (f -ę) | forms | Formy | A1B1 | A1 | app-integrated | a1_miec (acc), a1_acc_gym |
| G_PL_VP-A1-01 | Być present grid | verbs | Czasowniki | A1B1 | A1 | app-integrated | a1_hello |
| G_PL_VP-A1-02 | Present person endings (light set) | verbs | Czasowniki | A1B1 | A1 | app-integrated | a1_present, a1_present_gym |
| G_PL_VP-A1-03 | Mieć present + object frames | verbs | Czasowniki | A1B1 | A1 | app-integrated | a1_miec |
| G_PL_TAP-A1-01 | Foundation / sentence seed | tap_root | Kół | A1B1 | A1 | drafted | foundation packs |
| G_PL_SS-A1-01 | Questions & word order light | sentence | Zdanie | A1B1 | A1 | planned | a1_questions, a1_word_order |
| G_PL_PP-A1-01 | Place prepositions + form | links | Spójniki | A1B1 | A1 | planned | a1_prep_place |
| G_PL_VP-A2-01 | Past person × gender (ending gym) | verbs | Czasowniki | A1B1 | A2 | planned | a2_past_endings |

## Notes

- Student UI never shows `forms` / `verbs` English teacher codes as primary labels — uses `label_pl`.
- Acc lives under **Formy** for PL A1 (case), not a separate universal seat yet.
- Clause linking / verb complementation seats exist in topology but stay **dim** until planned.
