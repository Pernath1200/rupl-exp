# Sequencing audit · 2026-08-06

**Spec:** `codex/SEQUENCING.md`  
**Path source:** `data/tree.json`  
**Nodes audited:** 127 · **errors:** 0 · **warns:** 2 · **missing_tags:** 0

## Errors

_None._

## Warnings

- **a2_prep_review** [teaches_empty_grammar] `a2_prep_review` — Grammar teach node has empty teaches_*; confirm intentional.
- **b1_two_futures** [teaches_empty_grammar] `b1_two_futures` — Grammar teach node has empty teaches_*; confirm intentional.

## Path unlock trail

| i | node_id | teaches_structures | teach lem n | uses_structures |
|---|---------|--------------------|-------------|-----------------|
| 0 | `trunk_social_a1` | `social_chunk` | 20 | `social_chunk` |
| 1 | `a1_gender` | `to_jest` | 9 | `to_jest` |
| 2 | `a1_poss_simple` | `poss_nom` | 6 | `poss_nom`, `to_jest` |
| 3 | `leaf_home_family` | — | 32 | `poss_nom`, `to_jest` |
| 4 | `a1_hello` | `byc_present`, `to_jest` | 6 | `byc_present`, `poss_nom`, `to_jest` |
| 5 | `trunk_be_have_a1` | — | 36 | `byc_present`, `poss_nom`, `to_jest` |
| 6 | `a1_gender_check` | `zgoda` | 6 | `to_jest`, `zgoda` |
| 7 | `a1_gender_gym` | `ten_ta_to` | 4 | `ten_ta_to`, `to_jest` |
| 8 | `trunk_adjectives_a1` | `byc_adj` | 26 | `byc_adj`, `byc_present`, `poss_nom`, `to_jest`, `zgoda` |
| 9 | `a1_miec` | `miec_acc`, `miec_present` | 20 | `miec_acc`, `miec_present` |
| 10 | `a1_acc_gym` | — | 0 | `miec_acc`, `miec_present`, `to_jest` |
| 11 | `leaf_food_a1` | — | 47 | `byc_present`, `miec_acc`, `miec_present`, `poss_nom`, `to_jest` |
| 12 | `leaf_animals_a1` | — | 24 | `byc_adj`, `byc_present`, `miec_acc`, `miec_present`, `poss_nom`, `to_jest`, `zgoda` |
| 13 | `leaf_colours_a1` | — | 12 | `byc_adj`, `byc_present`, `to_jest`, `zgoda` |
| 14 | `leaf_numbers_a1` | — | 39 | `miec_present`, `social_chunk` |
| 15 | `a1_present` | `present`, `present_am` | 35 | `miec_acc`, `present`, `present_am` |
| 16 | `a1_present_e_isz` | `present`, `present_e_isz` | 21 | `miec_acc`, `present`, `present_e_isz` |
| 17 | `a1_present_e_esz` | `present`, `present_e_esz` | 14 | `miec_acc`, `present`, `present_e_esz` |
| 18 | `a1_present_uje` | `present`, `present_uje` | 20 | `miec_acc`, `present`, `present_uje` |
| 19 | `a1_present_gym` | — | 0 | `miec_acc`, `present`, `present_am`, `present_e_esz`, `present_e_isz`, `present_uje` |
| 20 | `leaf_shopping_a1` | — | 37 | `byc_adj`, `byc_present`, `miec_acc`, `miec_present`, `present_uje`, `to_jest`, `zgoda` |
| 21 | `leaf_freetime_a1` | — | 80 | `byc_adj`, `byc_present`, `miec_acc`, `miec_present`, `poss_nom`, `present`, `present_am`, `present_e_esz`, `present_e_isz`, `present_uje`, `to_jest`, `zgoda` |
| 22 | `leaf_tech_a1` | — | 22 | `byc_adj`, `byc_present`, `miec_acc`, `miec_present`, `poss_nom`, `present_am`, `to_jest`, `zgoda` |
| 23 | `trunk_want_like_a1` | — | 32 | `byc_present`, `miec_acc`, `miec_present`, `poss_nom`, `present`, `present_e_esz`, `present_e_isz`, `ten_ta_to`, `to_jest` |
| 24 | `trunk_can_a1` | `can_inf` | 16 | `can_inf`, `miec_acc`, `social_chunk` |
| 25 | `leaf_nature_a1` | — | 36 | `byc_adj`, `byc_present`, `to_jest`, `zgoda` |
| 26 | `a1_comparatives` | `comparative` | 28 | `byc_adj`, `byc_present`, `comparative`, `zgoda` |
| 27 | `leaf_clothes_a1` | — | 23 | `byc_adj`, `byc_present`, `miec_acc`, `miec_present`, `poss_nom`, `present_uje`, `to_jest`, `zgoda` |
| 28 | `a1_questions` | `question` | 10 | `byc_present`, `miec_acc`, `miec_present`, `present_am`, `question`, `to_jest` |
| 29 | `leaf_school_a1` | — | 47 | `byc_adj`, `byc_present`, `miec_acc`, `miec_present`, `poss_nom`, `present_am`, `present_uje`, `to_jest`, `zgoda` |
| 30 | `a1_prep_place` | `prep_place`, `prep_w_loc` | 17 | `byc_present`, `prep_place`, `prep_w_loc`, `present_am` |
| 31 | `leaf_places` | — | 35 | `byc_present`, `miec_acc`, `miec_present`, `poss_nom`, `prep_place`, `prep_w_loc`, `present`, `present_am`, `present_e_esz`, `present_e_isz`, `question`, `to_jest` |
| 32 | `a1_gen_endings` | `gen_endings` | 14 | `byc_present`, `gen_endings`, `present_am` |
| 33 | `a1_prep_do_z` | `prep_do_gen`, `prep_place`, `prep_z_gen` | 11 | `gen_endings`, `prep_do_gen`, `prep_place`, `prep_w_loc`, `prep_z_gen` |
| 34 | `a1_motion` | `motion_chunk` | 4 | `motion_chunk`, `prep_do_gen`, `prep_place`, `prep_z_gen` |
| 35 | `leaf_city_a1` | — | 29 | `byc_adj`, `byc_present`, `miec_acc`, `miec_present`, `poss_nom`, `prep_do_gen`, `prep_place`, `prep_w_loc`, `prep_z_gen`, `present_am`, `to_jest`, `zgoda` |
| 36 | `leaf_body_a1` | — | 24 | `byc_adj`, `byc_present`, `poss_nom`, `to_jest`, `zgoda` |
| 37 | `leaf_time_cal_a1` | — | 48 | `byc_adj`, `byc_present`, `miec_acc`, `present_am`, `present_e_esz`, `present_uje`, `social_chunk`, `to_jest`, `zgoda` |
| 38 | `a1_prep_review_1` | — | 15 | `byc_present`, `gen_endings`, `motion_chunk`, `prep_do_gen`, `prep_place`, `prep_w_loc`, `prep_z_gen`, `present_am` |
| 39 | `a1_gen_ki` | `gen_endings` | 13 | `byc_present`, `gen_endings`, `prep_do_gen`, `prep_z_gen`, `present_am`, `present_e_esz` |
| 40 | `a1_negation` | `negation` | 14 | `miec_acc`, `miec_present`, `negation` |
| 41 | `trunk_there_time_a1` | `existential_jest` | 1 | `byc_present`, `existential_jest`, `negation`, `social_chunk` |
| 42 | `leaf_health_a1` | — | 24 | `byc_adj`, `byc_present`, `miec_acc`, `miec_present`, `to_jest`, `zgoda` |
| 43 | `a1_inst_job` | `inst_identity` | 18 | `byc_present`, `inst_identity` |
| 44 | `a1_case_gym` | — | 15 | `byc_present`, `gen_endings`, `miec_acc`, `negation`, `prep_do_gen`, `prep_place`, `prep_w_loc`, `prep_z_gen`, `present_am`, `present_e_esz`, `to_jest` |
| 45 | `leaf_work_a1` | — | 35 | `byc_adj`, `byc_present`, `inst_identity`, `miec_acc`, `miec_present`, `poss_nom`, `prep_w_loc`, `present_uje`, `to_jest`, `zgoda` |
| 46 | `leaf_ideas_a1` | — | 48 | `byc_adj`, `byc_present`, `comparative`, `miec_acc`, `miec_present`, `poss_nom`, `to_jest`, `zgoda` |
| 47 | `a1_prep_review_2` | — | 21 | `byc_present`, `gen_endings`, `motion_chunk`, `prep_do_gen`, `prep_place`, `prep_w_loc`, `prep_z_gen`, `present_am` |
| 48 | `a2_past_byc` | `past_byc` | 8 | `byc_adj`, `byc_present`, `past_byc`, `prep_w_loc`, `question`, `zgoda` |
| 49 | `a2_weather` | `weather_chunk` | 14 | `byc_adj`, `byc_present`, `existential_jest`, `past_byc`, `weather_chunk`, `zgoda` |
| 50 | `a2_time_past` | `time_past_chunk` | 9 | `byc_adj`, `past_byc`, `prep_w_loc`, `question`, `time_past_chunk`, `weather_chunk`, `zgoda` |
| 51 | `a2_past_ac` | `past_ac` | 31 | `miec_acc`, `past_ac`, `past_byc`, `poss_nom`, `prep_w_loc`, `present`, `present_am`, `present_uje`, `question` |
| 52 | `a2_past_rest` | `past_rest` | 35 | `miec_acc`, `past_byc`, `past_rest`, `poss_nom`, `present_e_esz`, `question` |
| 53 | `a2_past_gym` | — | 0 | `byc_adj`, `gen_endings`, `miec_acc`, `negation`, `past_ac`, `past_byc`, `past_rest`, `prep_w_loc`, `question`, `zgoda` |
| 54 | `a2_smalltalk` | `smalltalk_chunk` | 16 | `byc_adj`, `past_byc`, `past_rest`, `prep_w_loc`, `question`, `smalltalk_chunk`, `social_chunk`, `time_past_chunk` |
| 55 | `a2_feelings` | — | 14 | `byc_adj`, `byc_present`, `past_byc`, `poss_nom`, `prep_w_loc`, `question`, `time_past_chunk`, `zgoda` |
| 56 | `a2_plural_nom` | `plural_nom` | 16 | `byc_adj`, `byc_present`, `gen_endings`, `miec_acc`, `past_ac`, `plural_nom`, `poss_nom`, `present_am`, `question`, `to_jest` |
| 57 | `a2_past_plural` | `past_plural` | 19 | `miec_acc`, `past_ac`, `past_byc`, `past_plural`, `past_rest`, `prep_place`, `prep_w_loc`, `question` |
| 58 | `a2_family2` | — | 12 | `byc_adj`, `byc_present`, `inst_identity`, `miec_acc`, `past_ac`, `past_byc`, `past_plural`, `past_rest`, `poss_nom`, `prep_w_loc`, `present_e_isz`, `present_uje`, `question`, `zgoda` |
| 59 | `a2_gen_pl` | `gen_pl` | 18 | `existential_jest`, `gen_endings`, `gen_pl`, `miec_present`, `negation`, `plural_nom`, `prep_w_loc`, `present_am` |
| 61 | `a2_numbers_gen` | `numbers_gen` | 7 | `byc_present`, `existential_jest`, `gen_pl`, `miec_acc`, `miec_present`, `numbers_gen`, `plural_nom`, `present_e_esz`, `social_chunk` |
| 62 | `a2_shopping2` | — | 19 | `byc_adj`, `byc_present`, `can_inf`, `gen_pl`, `miec_acc`, `miec_present`, `past_ac`, `past_byc`, `poss_nom`, `prep_place`, `prep_w_loc`, `present_am`, `time_past_chunk`, `to_jest`, `zgoda` |
| 63 | `a2_shopping_func` | `situation_chunk` | 36 | `can_inf`, `existential_jest`, `miec_acc`, `present_am`, `present_e_isz`, `present_uje`, `question`, `situation_chunk`, `social_chunk`, `ten_ta_to` |
| 64 | `a2_inst_z` | `inst_z` | 24 | `byc_present`, `inst_identity`, `inst_z`, `miec_acc`, `motion_chunk`, `past_ac`, `past_byc`, `past_rest`, `poss_nom`, `prep_do_gen`, `prep_w_loc`, `prep_z_gen`, `present`, `present_am`, `present_uje`, `question` |
| 65 | `a2_people2` | — | 22 | `byc_adj`, `byc_present`, `past_byc`, `poss_nom`, `prep_w_loc`, `question`, `ten_ta_to`, `time_past_chunk`, `zgoda` |
| 66 | `a2_jechac` | `jechac` | 7 | `jechac`, `motion_chunk`, `plural_nom`, `poss_nom`, `prep_do_gen`, `present`, `present_e_esz`, `question` |
| 67 | `a2_inst_transport` | `inst_transport` | 7 | `byc_present`, `inst_identity`, `inst_transport`, `inst_z`, `jechac`, `motion_chunk`, `plural_nom`, `poss_nom`, `prep_do_gen`, `question` |
| 68 | `a2_transport2` | — | 14 | `byc_adj`, `byc_present`, `existential_jest`, `inst_transport`, `jechac`, `miec_acc`, `miec_present`, `negation`, `past_byc`, `poss_nom`, `prep_place`, `prep_w_loc`, `present`, `question`, `to_jest`, `zgoda` |
| 69 | `a2_directions_func` | `situation_chunk` | 37 | `byc_present`, `existential_jest`, `negation`, `prep_do_gen`, `prep_place`, `question`, `situation_chunk`, `social_chunk`, `ten_ta_to`, `zgoda` |
| 70 | `a2_travel` | — | 17 | `byc_adj`, `byc_present`, `miec_acc`, `miec_present`, `negation`, `past_ac`, `past_byc`, `past_plural`, `past_rest`, `plural_nom`, `poss_nom`, `prep_place`, `prep_w_loc`, `present_am`, `question`, `time_past_chunk`, `to_jest`, `zgoda` |
| 71 | `a2_countries` | — | 27 | `byc_adj`, `byc_present`, `inst_identity`, `miec_acc`, `negation`, `poss_nom`, `prep_w_loc`, `present_am`, `present_e_isz`, `question`, `to_jest`, `zgoda` |
| 72 | `a2_chodzic` | `chodzic` | 13 | `chodzic`, `jechac`, `motion_chunk`, `plural_nom`, `prep_do_gen`, `present`, `present_e_esz`, `present_e_isz`, `question` |
| 74 | `a2_sie` | `sie_reflexive` | 23 | `byc_adj`, `poss_nom`, `prep_w_loc`, `present`, `present_am`, `present_e_isz`, `present_uje`, `question`, `sie_reflexive` |
| 75 | `a2_routine` | — | 25 | `byc_adj`, `byc_present`, `motion_chunk`, `prep_do_gen`, `prep_w_loc`, `prep_z_gen`, `present`, `present_am`, `present_e_esz`, `present_e_isz`, `question`, `sie_reflexive`, `zgoda` |
| 76 | `a2_house` | — | 22 | `byc_adj`, `byc_present`, `existential_jest`, `past_byc`, `poss_nom`, `prep_place`, `prep_w_loc`, `question`, `ten_ta_to`, `to_jest`, `zgoda` |
| 77 | `a2_bedzie` | `bedzie` | 6 | `bedzie`, `can_inf`, `inst_transport`, `miec_acc`, `past_byc`, `poss_nom`, `prep_w_loc`, `present`, `question` |
| 78 | `a2_musiec` | `musiec` | 9 | `bedzie`, `can_inf`, `inst_transport`, `miec_acc`, `musiec`, `past_ac`, `past_byc`, `plural_nom`, `poss_nom`, `prep_place`, `prep_w_loc`, `present`, `present_am`, `present_uje`, `question`, `situation_chunk` |
| 79 | `a2_work2` | — | 17 | `bedzie`, `byc_adj`, `byc_present`, `gen_endings`, `miec_acc`, `miec_present`, `past_byc`, `poss_nom`, `prep_w_loc`, `present_am`, `question`, `to_jest`, `zgoda` |
| 80 | `a2_school2` | — | 14 | `bedzie`, `byc_adj`, `byc_present`, `can_inf`, `existential_jest`, `miec_acc`, `miec_present`, `past_byc`, `poss_nom`, `prep_place`, `present_am`, `question`, `to_jest`, `zgoda` |
| 81 | `a2_aspect` | `aspect_past` | 22 | `aspect_past`, `miec_acc`, `past_ac`, `past_byc`, `past_rest`, `poss_nom`, `prep_w_loc`, `present_e_esz`, `present_uje`, `question` |
| 82 | `a2_food2` | — | 24 | `byc_adj`, `byc_present`, `existential_jest`, `miec_acc`, `miec_present`, `past_byc`, `poss_nom`, `prep_place`, `ten_ta_to`, `to_jest`, `zgoda` |
| 83 | `a2_ordering_func` | `situation_chunk` | 16 | `byc_adj`, `byc_present`, `can_inf`, `existential_jest`, `miec_acc`, `past_byc`, `present_am`, `question`, `situation_chunk`, `social_chunk`, `ten_ta_to`, `zgoda` |
| 84 | `a2_dat_chunks` | `dat_chunks` | 12 | `dat_chunks`, `negation`, `poss_nom`, `prep_w_loc`, `present`, `present_am`, `present_e_isz`, `present_uje`, `sie_reflexive`, `ten_ta_to` |
| 85 | `a2_health2` | — | 16 | `byc_adj`, `byc_present`, `dat_chunks`, `existential_jest`, `miec_acc`, `miec_present`, `poss_nom`, `prep_w_loc`, `question`, `situation_chunk`, `to_jest`, `zgoda` |
| 87 | `a2_o_loc` | `o_loc` | 17 | `o_loc`, `past_rest`, `plural_nom`, `poss_nom`, `prep_do_gen`, `prep_place`, `prep_w_loc`, `prep_z_gen`, `present`, `present_e_isz`, `question` |
| 88 | `a2_tech2` | — | 19 | `byc_adj`, `byc_present`, `can_inf`, `existential_jest`, `miec_acc`, `miec_present`, `musiec`, `poss_nom`, `prep_do_gen`, `prep_place`, `prep_w_loc`, `present_am`, `present_e_isz`, `present_uje`, `question`, `to_jest`, `zgoda` |
| 89 | `a2_phone_func` | `situation_chunk` | 25 | `byc_present`, `can_inf`, `inst_z`, `miec_acc`, `miec_present`, `negation`, `prep_do_gen`, `present_am`, `present_e_isz`, `present_uje`, `question`, `situation_chunk`, `social_chunk`, `to_jest`, `zgoda` |
| 90 | `a2_ordinals_time` | `ordinals_time` | 36 | `byc_present`, `chodzic`, `existential_jest`, `jechac`, `miec_acc`, `miec_present`, `ordinals_time`, `prep_do_gen`, `present`, `present_e_esz`, `present_uje`, `question`, `social_chunk` |
| 91 | `a2_celebrations` | — | 17 | `aspect_past`, `byc_adj`, `byc_present`, `inst_z`, `miec_acc`, `past_ac`, `past_byc`, `past_plural`, `past_rest`, `prep_place`, `prep_w_loc`, `present_e_isz`, `present_uje`, `question`, `time_past_chunk`, `to_jest`, `zgoda` |
| 92 | `a2_superlatives` | `superlative` | 29 | `byc_adj`, `byc_present`, `comparative`, `gen_endings`, `poss_nom`, `superlative`, `ten_ta_to`, `zgoda` |
| 93 | `a2_nature2` | — | 22 | `bedzie`, `byc_adj`, `byc_present`, `existential_jest`, `inst_z`, `miec_acc`, `miec_present`, `motion_chunk`, `past_ac`, `past_byc`, `past_plural`, `past_rest`, `poss_nom`, `prep_do_gen`, `prep_w_loc`, `present_e_isz`, `ten_ta_to`, `to_jest`, `zgoda` |
| 94 | `a2_sport` | — | 19 | `byc_adj`, `byc_present`, `existential_jest`, `inst_identity`, `miec_acc`, `miec_present`, `motion_chunk`, `past_byc`, `past_rest`, `poss_nom`, `prep_w_loc`, `present_am`, `to_jest`, `zgoda` |
| 95 | `a2_imperative` | `imperative` | 18 | `byc_adj`, `byc_present`, `imperative`, `miec_acc`, `motion_chunk`, `negation`, `prep_do_gen`, `prep_w_loc`, `present_am`, `question`, `situation_chunk`, `social_chunk` |
| 96 | `a2_questions2` | `questions2` | 8 | `byc_adj`, `byc_present`, `existential_jest`, `musiec`, `present_e_esz`, `present_e_isz`, `present_uje`, `question`, `questions2`, `ten_ta_to` |
| 97 | `a2_case_gym2` | — | 0 | `byc_present`, `existential_jest`, `gen_endings`, `gen_pl`, `inst_identity`, `inst_transport`, `inst_z`, `jechac`, `miec_acc`, `negation`, `o_loc`, `plural_nom`, `prep_do_gen`, `prep_place`, `prep_w_loc`, `prep_z_gen`, `present_am`, `present_e_isz`, `to_jest` |
| 98 | `a2_prep_review` | — | 0 | `chodzic`, `inst_transport`, `inst_z`, `jechac`, `o_loc`, `past_ac`, `past_byc`, `past_plural`, `past_rest`, `poss_nom`, `prep_do_gen`, `prep_place`, `prep_w_loc`, `prep_z_gen`, `present_e_isz`, `question` |
| 99 | `a2_wrapup_func` | `situation_chunk` | 0 | `byc_adj`, `byc_present`, `can_inf`, `existential_jest`, `inst_z`, `miec_acc`, `miec_present`, `negation`, `past_byc`, `past_rest`, `prep_do_gen`, `prep_place`, `prep_w_loc`, `present_am`, `present_e_isz`, `present_uje`, `question`, `situation_chunk`, `smalltalk_chunk`, `social_chunk`, `ten_ta_to`, `time_past_chunk`, `to_jest`, `zgoda` |
| 101 | `b1_perf_future` | `perf_future` | 24 | `aspect_past`, `bedzie`, `miec_acc`, `past_ac`, `perf_future`, `poss_nom`, `present_am`, `present_e_esz`, `present_e_isz`, `present_uje`, `question`, `questions2` |
| 102 | `b1_two_futures` | — | 0 | `aspect_past`, `bedzie`, `miec_acc`, `past_ac`, `perf_future`, `poss_nom`, `prep_w_loc`, `present_am`, `present_e_esz`, `present_e_isz`, `present_uje`, `question`, `questions2` |
| 103 | `b1_plans` | — | 18 | `bedzie`, `byc_present`, `can_inf`, `existential_jest`, `inst_z`, `miec_acc`, `miec_present`, `negation`, `perf_future`, `prep_place`, `present_am`, `present_uje`, `question`, `questions2`, `zgoda` |
| 104 | `b1_aspect_gym` | — | 0 | `aspect_past`, `bedzie`, `miec_acc`, `past_ac`, `past_rest`, `perf_future`, `poss_nom`, `present_am`, `present_e_isz`, `present_uje` |
| 105 | `b1_conditional_sg` | `conditional_sg` | 14 | `aspect_past`, `conditional_sg`, `miec_acc`, `past_byc`, `past_rest`, `poss_nom`, `present`, `question` |
| 106 | `b1_polite` | `situation_chunk` | 25 | `conditional_sg`, `dat_chunks`, `existential_jest`, `miec_acc`, `negation`, `question`, `situation_chunk`, `social_chunk` |
| 107 | `b1_past_isc` | `past_isc` | 7 | `chodzic`, `past_byc`, `past_isc`, `past_rest`, `prep_do_gen`, `question` |
| 108 | `b1_arrive_leave` | `motion_prefixed` | 43 | `can_inf`, `chodzic`, `inst_transport`, `jechac`, `motion_chunk`, `motion_prefixed`, `ordinals_time`, `past_ac`, `past_isc`, `perf_future`, `poss_nom`, `prep_do_gen`, `prep_z_gen`, `question` |
| 109 | `b1_journeys` | — | 25 | `aspect_past`, `byc_adj`, `byc_present`, `can_inf`, `musiec`, `negation`, `past_byc`, `past_isc`, `past_plural`, `prep_do_gen`, `prep_place`, `prep_w_loc`, `sie_reflexive`, `ten_ta_to`, `time_past_chunk`, `zgoda` |
| 110 | `b1_virile_reco` | `virile_reco` | 9 | `byc_adj`, `byc_present`, `plural_nom`, `prep_w_loc`, `present`, `present_uje`, `ten_ta_to`, `virile_reco`, `zgoda` |
| 111 | `b1_virile_nom` | `virile_nom` | 8 | `byc_adj`, `byc_present`, `plural_nom`, `prep_w_loc`, `present`, `present_am`, `present_uje`, `ten_ta_to`, `virile_nom`, `virile_reco`, `zgoda` |
| 112 | `b1_virile_past` | `virile_past` | 4 | `byc_adj`, `byc_present`, `past_ac`, `past_byc`, `past_plural`, `plural_nom`, `prep_w_loc`, `ten_ta_to`, `virile_nom`, `virile_past`, `virile_reco`, `zgoda` |
| 113 | `b1_people` | — | 21 | `byc_adj`, `byc_present`, `past_plural`, `plural_nom`, `prep_w_loc`, `present_uje`, `ten_ta_to`, `to_jest`, `virile_nom`, `virile_past`, `virile_reco`, `zgoda` |
| 114 | `b1_virile_gym` | — | 0 | `byc_adj`, `byc_present`, `past_plural`, `plural_nom`, `prep_w_loc`, `ten_ta_to`, `virile_nom`, `virile_past`, `virile_reco`, `zgoda` |
| 115 | `b1_conditional_pl` | `conditional_pl` | 20 | `conditional_pl`, `conditional_sg`, `miec_acc`, `past_plural`, `plural_nom`, `question`, `virile_nom`, `virile_past`, `virile_reco` |
| 117 | `b1_dative_sg` | `dative_sg` | 17 | `dat_chunks`, `dative_sg`, `inst_identity`, `inst_z`, `miec_acc`, `present_am`, `present_uje`, `question`, `virile_nom` |
| 118 | `b1_dative_pron` | `dative_pron` | 6 | `dat_chunks`, `dative_pron`, `dative_sg`, `negation`, `question`, `sie_reflexive`, `ten_ta_to`, `virile_reco` |
| 119 | `b1_giving` | — | 15 | `dat_chunks`, `dative_pron`, `dative_sg`, `miec_acc`, `question` |
| 120 | `b1_ktory_cases` | `ktory_cases` | 6 | `ktory_cases`, `negation`, `past_ac`, `past_rest`, `to_jest` |
| 121 | `b1_zeby` | `zeby` | 3 | `aspect_past`, `miec_acc`, `prep_do_gen`, `zeby` |
| 122 | `b1_stories` | — | 6 | `aspect_past`, `can_inf`, `motion_prefixed`, `negation`, `past_byc`, `past_plural`, `prep_do_gen`, `prep_w_loc`, `sie_reflexive`, `virile_past` |
| 123 | `b1_stories_func` | `situation_chunk` | 5 | `aspect_past`, `byc_adj`, `motion_prefixed`, `negation`, `past_byc`, `past_isc`, `past_plural`, `prep_do_gen`, `prep_w_loc`, `question`, `sie_reflexive`, `situation_chunk`, `virile_past`, `zgoda` |
| 124 | `b1_imperative_rule` | `imperative_rule` | 12 | `byc_adj`, `gen_endings`, `imperative`, `imperative_rule`, `miec_acc`, `negation`, `perf_future`, `present_am`, `present_e_esz`, `present_e_isz`, `present_uje` |
| 125 | `b1_adverb_comp` | `adverb_comp` | 12 | `adverb_comp`, `comparative`, `gen_endings`, `present`, `present_am`, `present_e_isz`, `present_uje`, `superlative` |
| 126 | `b1_vocative_chunks` | `vocative_chunk` | 12 | `byc_adj`, `conditional_sg`, `question`, `situation_chunk`, `social_chunk`, `vocative_chunk` |
| 127 | `b1_opinions` | — | 10 | `adverb_comp`, `byc_adj`, `conditional_sg`, `inst_z`, `miec_acc`, `miec_present`, `motion_prefixed`, `perf_future`, `question`, `superlative`, `virile_nom`, `virile_reco`, `vocative_chunk` |
| 128 | `b1_case_gym` | — | 0 | `byc_adj`, `byc_present`, `dative_pron`, `dative_sg`, `gen_endings`, `gen_pl`, `inst_identity`, `inst_z`, `miec_acc`, `negation`, `o_loc`, `plural_nom`, `prep_do_gen`, `prep_w_loc`, `prep_z_gen`, `ten_ta_to`, `to_jest`, `virile_nom`, `virile_past`, `virile_reco`, `zgoda` |
| 129 | `b1_wrapup` | `situation_chunk` | 0 | `conditional_sg`, `dat_chunks`, `miec_present`, `musiec`, `past_byc`, `past_isc`, `prep_do_gen`, `question`, `sie_reflexive`, `situation_chunk`, `zgoda` |
| 131 | `b2_conjunctions` | `conjunctions` | 7 | `byc_adj`, `byc_present`, `conjunctions`, `gen_endings`, `miec_acc`, `miec_present`, `motion_chunk`, `negation`, `prep_do_gen`, `prep_w_loc`, `present_e_esz`, `present_uje` |
| 132 | `b2_copular_future` | `copular_future` | 0 | `bedzie`, `byc_adj`, `byc_present`, `conjunctions`, `copular_future`, `inst_identity`, `poss_nom`, `prep_w_loc`, `virile_reco`, `weather_chunk`, `zgoda` |

