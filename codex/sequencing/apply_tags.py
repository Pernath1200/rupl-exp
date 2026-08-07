#!/usr/bin/env python3
"""
Phase 1: write teaches_*/uses_* sequencing tags onto live spine packs.

Canonical packs (2026-07-30): rupl-exp/data/grammar/blocks · rupl-exp/data/vocab/blocks
(rupl2/3 are frozen archives — do not write there.)
Also writes sidecar: rupl-codex/sequencing/tags.json

Spec: rupl-codex/SEQUENCING.md
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
RUPL2 = ROOT / "rupl-exp" / "data" / "grammar" / "blocks"
RUPL3 = ROOT / "rupl-exp" / "data" / "vocab" / "blocks"
OUT_SIDECAR = Path(__file__).resolve().parent / "tags.json"
OUT_SUMMARY = Path(__file__).resolve().parent / "TAGS-PHASE1.md"


def norm_lemma(s: str) -> str:
    t = str(s).lower().strip()
    t = t.replace(".", "").replace("!", "").replace("?", "")
    t = t.split("/")[0].strip()
    # drop parenthetical notes
    if "(" in t:
        t = t.split("(")[0].strip()
    return t


def vocab_item_lemmas(pack: dict) -> list[str]:
    out: list[str] = []
    for b in pack.get("blocks") or []:
        for it in b.get("items") or []:
            if it.get("pl"):
                out.append(norm_lemma(it["pl"]))
            for a in it.get("accepts") or []:
                # accepts often synonyms — still taught alternatives
                out.append(norm_lemma(a))
    for s in pack.get("sentences") or []:
        for lem in s.get("lemmas") or []:
            out.append(norm_lemma(lem))
    # frame items at top-level (rare)
    for it in pack.get("items") or []:
        if it.get("pl") and " " not in str(it.get("pl", "")).strip():
            out.append(norm_lemma(it["pl"]))
        ga = it.get("gap_answer")
        if ga and " " not in str(ga).strip():
            out.append(norm_lemma(ga))
    # frames inside blocks with full sentences: collect gap_answer
    for b in pack.get("blocks") or []:
        for it in b.get("items") or []:
            ga = it.get("gap_answer")
            if ga:
                out.append(norm_lemma(ga))
    return sorted({x for x in out if x})


def sentence_structures(pack: dict) -> list[str]:
    tags: set[str] = set()
    for s in pack.get("sentences") or []:
        for t in s.get("structures") or []:
            tags.add(t)
    for b in pack.get("blocks") or []:
        for it in b.get("items") or []:
            for t in it.get("structures") or []:
                tags.add(t)
    return sorted(tags)


def uniq(xs: list[str]) -> list[str]:
    seen: set[str] = set()
    out: list[str] = []
    for x in xs:
        if x and x not in seen:
            seen.add(x)
            out.append(x)
    return out


# Manual structure + lemma teaches/uses per pack id (Phase 1 authored).
# Lemmas often filled/merged from pack content below.

MANUAL: dict[str, dict] = {
    "a1_trunk_social": {
        "node_id": "trunk_social_a1",
        "domain": "vocab",
        "teaches_structures": ["social_chunk"],
        "uses_structures": ["social_chunk"],
        # lemmas from content
    },
    "a1_gender": {
        "node_id": "a1_gender",
        "domain": "grammar",
        "teaches_structures": ["to_jest"],
        "uses_structures": ["to_jest"],
        "teaches_lemmas": [
            "dom",
            "kawa",
            "miasto",
            "książka",
            "kot",
            "piwo",
            "herbata",
            "sklep",
            "morze",
        ],
        "uses_lemmas": [
            "dom",
            "kawa",
            "miasto",
            "książka",
            "kot",
            "piwo",
            "herbata",
            "sklep",
            "morze",
        ],
    },
    "a1_poss_simple": {
        "node_id": "a1_poss_simple",
        "domain": "grammar",
        "teaches_structures": ["poss_nom"],
        "uses_structures": ["poss_nom", "to_jest"],
        "teaches_lemmas": [
            "mój",
            "moja",
            "moje",
            "twój",
            "twoja",
            "twoje",
        ],
        # nouns reused from gender — uses, not re-teach
        "uses_lemmas": [
            "mój",
            "moja",
            "moje",
            "twój",
            "twoja",
            "twoje",
            "dom",
            "kawa",
            "piwo",
            "książka",
            "miasto",
            "kot",
            "herbata",
            "sklep",
            "morze",
        ],
    },
    "a1_home_family": {
        "node_id": "leaf_home_family",
        "domain": "vocab",
        "teaches_structures": [],
        "focus_structures": ["to_jest", "poss_nom"],
        "uses_structures": ["to_jest", "poss_nom"],
        # lemmas from content merge
    },
    "a1_hello": {
        "node_id": "a1_hello",
        "domain": "grammar",
        "teaches_structures": ["byc_present", "to_jest"],
        "uses_structures": ["byc_present", "to_jest", "poss_nom"],
        "teaches_lemmas": [
            "jestem",
            "jesteś",
            "jest",
            "jesteśmy",
            "jesteście",
            "są",
        ],
        "uses_lemmas": [
            "jestem",
            "jesteś",
            "jest",
            "jesteśmy",
            "jesteście",
            "są",
            "kawa",
            "dom",
            "książka",
            "mój",
            "moja",
            "twoja",
        ],
    },
    "a1_trunk_be_have": {
        "node_id": "trunk_be_have_a1",
        "domain": "vocab",
        "teaches_structures": [],
        "uses_structures": ["byc_present", "to_jest", "poss_nom"],
        # lemmas from frames / gap_answer merge
    },
    "a1_gender_check": {
        "node_id": "a1_gender_check",
        "domain": "grammar",
        "teaches_structures": ["zgoda"],
        "uses_structures": ["zgoda", "to_jest"],
        # Phase 4 triage: ser/woda/auto introduced in this unit's intro table
        "teaches_lemmas": ["dobry", "dobra", "dobre", "ser", "woda", "auto"],
        "uses_lemmas": [
            "dobry",
            "dobra",
            "dobre",
            "dom",
            "kawa",
            "piwo",
            "książka",
            "miasto",
            "kot",
            "sklep",
            "ser",
            "woda",
            "auto",
            "morze",
            "herbata",
        ],
    },
    "a1_food": {
        "node_id": "leaf_food_a1",
        "domain": "vocab",
        "teaches_structures": [],
        "focus_structures": ["miec_acc", "miec_present"],
        "uses_structures": [
            "miec_acc",
            "miec_present",
            "to_jest",
            "poss_nom",
            "byc_present",
        ],
        # lemmas merge from items + sentences
    },
    "a1_miec": {
        "node_id": "a1_miec",
        "domain": "grammar",
        "teaches_structures": ["miec_present", "miec_acc"],
        "focus_structures": ["miec_present", "miec_acc"],
        "uses_structures": ["miec_present", "miec_acc"],
        # Acc surfaces + Dom recycle targets taught here
        "teaches_lemmas": [
            "mam",
            "masz",
            "ma",
            "mamy",
            "macie",
            "mają",
            "kawę",
            "herbatę",
            "wodę",
            "książkę",
            "siostrę",
            "kota",
        ],
        "uses_lemmas": [
            "mam",
            "masz",
            "ma",
            "mamy",
            "macie",
            "mają",
            "kawa",
            "kawę",
            "herbata",
            "herbatę",
            "woda",
            "wodę",
            "piwo",
            "dom",
            "książka",
            "książkę",
            "siostra",
            "siostrę",
            "kot",
            "kota",
        ],
    },
    "a1_acc_gym": {
        "node_id": "a1_acc_gym",
        "domain": "grammar",
        "teaches_structures": [],
        "focus_structures": ["miec_acc", "miec_present", "to_jest"],
        "uses_structures": ["miec_acc", "miec_present", "to_jest"],
        "teaches_lemmas": [],
        # Nom vs Acc drill on known pool (Dom/food/gender)
        "uses_lemmas": [
            "mam",
            "masz",
            "ma",
            "kawa",
            "kawę",
            "herbata",
            "herbatę",
            "woda",
            "wodę",
            "książka",
            "książkę",
            "siostra",
            "siostrę",
            "dom",
            "piwo",
            "kot",
            "kota",
            "sklep",
            "miasto",
        ],
    },
    "a1_present": {
        "node_id": "a1_present",
        "domain": "grammar",
        "teaches_structures": ["present_am", "present"],
        "focus_structures": ["present_am"],
        "uses_structures": ["present_am", "present"],
        "teaches_lemmas": [
            "mieszkać",
            "mieszkam",
            "mieszkasz",
            "mieszka",
            "mieszkamy",
            "mieszkacie",
            "mieszkają",
            "czytać",
            "czytam",
            "czytasz",
            "czyta",
            "czytamy",
            "czytacie",
            "czytają",
        ],
        # Dom family Nom subjects only (no w/na until a1_prep_place)
        "uses_lemmas": [
            "mieszkać",
            "mieszkam",
            "mieszkasz",
            "mieszka",
            "mieszkamy",
            "mieszkacie",
            "mieszkają",
            "czytać",
            "czytam",
            "czytasz",
            "czyta",
            "czytamy",
            "czytacie",
            "czytają",
            "mama",
            "tata",
            "ojciec",
            "brat",
            "siostra",
        ],
    },
    "a1_present_e_isz": {
        "node_id": "a1_present_e_isz",
        "domain": "grammar",
        "teaches_structures": ["present_e_isz", "present"],
        "focus_structures": ["present_e_isz"],
        "uses_structures": ["present_e_isz", "present", "miec_acc"],
        "teaches_lemmas": [
            "mówić",
            "mówię",
            "mówisz",
            "mówi",
            "mówimy",
            "mówicie",
            "mówią",
            "lubić",
            "lubię",
            "lubisz",
            "lubi",
            "lubimy",
            "lubicie",
            "lubią",
        ],
        "uses_lemmas": [
            "mówić",
            "mówię",
            "mówisz",
            "mówi",
            "mówimy",
            "mówicie",
            "mówią",
            "lubić",
            "lubię",
            "lubisz",
            "lubi",
            "lubimy",
            "lubicie",
            "lubią",
            "kawa",
            "kawę",
            "herbata",
            "herbatę",
            "piwo",
        ],
    },
    "a1_present_e_esz": {
        "node_id": "a1_present_e_esz",
        "domain": "grammar",
        "teaches_structures": ["present_e_esz", "present"],
        "focus_structures": ["present_e_esz"],
        "uses_structures": ["present_e_esz", "present", "miec_acc"],
        "teaches_lemmas": [
            "chcieć",
            "chcę",
            "chcesz",
            "chce",
            "chcemy",
            "chcecie",
            "chcą",
        ],
        "uses_lemmas": [
            "chcieć",
            "chcę",
            "chcesz",
            "chce",
            "chcemy",
            "chcecie",
            "chcą",
            "kawa",
            "kawę",
            "herbata",
            "herbatę",
            "woda",
            "wodę",
            "piwo",
            "książka",
            "książkę",
        ],
    },
    "a1_present_gym": {
        "node_id": "a1_present_gym",
        "domain": "grammar",
        "teaches_structures": [],
        "uses_structures": [
            "present_am",
            "present_e_isz",
            "present_e_esz",
            "present",
            "miec_acc",
        ],
        "teaches_lemmas": [],
        "uses_lemmas": [
            "mieszkam",
            "mieszkasz",
            "mieszka",
            "mieszkamy",
            "mieszkacie",
            "mieszkają",
            "mówię",
            "mówisz",
            "mówi",
            "mówimy",
            "mówicie",
            "mówią",
            "lubię",
            "lubisz",
            "lubi",
            "lubimy",
            "lubicie",
            "lubią",
            "chcę",
            "chcesz",
            "chce",
            "chcemy",
            "chcecie",
            "chcą",
            "mama",
            "brat",
            "kawa",
            "kawę",
            "herbata",
            "herbatę",
        ],
    },
    "a1_questions": {
        "node_id": "a1_questions",
        "domain": "grammar",
        "teaches_structures": ["question"],
        "focus_structures": ["question"],
        "uses_structures": [
            "question",
            "to_jest",
            "miec_acc",
            "miec_present",
            "byc_present",
            "present_am",
        ],
    },
    "a1_prep_place": {
        "node_id": "a1_prep_place",
        "domain": "grammar",
        "teaches_structures": ["prep_w_loc", "prep_place"],
        "focus_structures": ["prep_w_loc"],
        "uses_structures": ["prep_w_loc", "prep_place", "present_am", "byc_present"],
    },
    "a1_prep_do_z": {
        "node_id": "a1_prep_do_z",
        "domain": "grammar",
        "teaches_structures": ["prep_do_gen", "prep_z_gen", "prep_place"],
        "focus_structures": ["prep_do_gen", "prep_z_gen"],
        "uses_structures": [
            "prep_do_gen",
            "prep_z_gen",
            "prep_place",
            "prep_w_loc",
        ],
    },
    "a1_negation": {
        "node_id": "a1_negation",
        "domain": "grammar",
        "teaches_structures": ["negation"],
        "focus_structures": ["negation"],
        "uses_structures": ["negation", "miec_present", "miec_acc"],
    },
    "a1_inst_job": {
        "node_id": "a1_inst_job",
        "domain": "grammar",
        "teaches_structures": ["inst_identity"],
        "focus_structures": ["inst_identity"],
        "uses_structures": ["inst_identity", "byc_present"],
    },
    "a1_freetime": {
        "node_id": "leaf_freetime_a1",
        "domain": "vocab",
        "teaches_structures": [],
        "focus_structures": ["present_e_isz", "present_e_esz"],
        "uses_structures": [
            "present_am",
            "present_e_isz",
            "present_e_esz",
            "present",
            "miec_acc",
            "miec_present",
            "to_jest",
            "poss_nom",
            "byc_present",
        ],
    },
    "a1_trunk_want_like": {
        "node_id": "trunk_want_like_a1",
        "domain": "vocab",
        "teaches_structures": [],
        "focus_structures": ["present_e_esz", "present_e_isz", "miec_acc"],
        "uses_structures": [
            "present_e_esz",
            "present_e_isz",
            "present",
            "miec_acc",
            "miec_present",
            "to_jest",
            "poss_nom",
            "byc_present",
        ],
    },
    "a1_places": {
        "node_id": "leaf_places",
        "domain": "vocab",
        "teaches_structures": [],
        "focus_structures": ["prep_w_loc", "to_jest"],
        "uses_structures": [
            "to_jest",
            "poss_nom",
            "miec_acc",
            "miec_present",
            "byc_present",
            "present_am",
            "present_e_isz",
            "present_e_esz",
            "present",
            "prep_w_loc",
            "prep_place",
            "question",
        ],
    },
    "a1_city": {
        "node_id": "leaf_city_a1",
        "domain": "vocab",
        "teaches_structures": [],
        "focus_structures": ["prep_do_gen", "prep_z_gen"],
        "uses_structures": [
            "prep_do_gen",
            "prep_z_gen",
            "prep_w_loc",
            "prep_place",
            "to_jest",
            "miec_acc",
            "byc_present",
        ],
    },
    "a1_work": {
        "node_id": "leaf_work_a1",
        "domain": "vocab",
        "teaches_structures": [],
        "focus_structures": ["inst_identity"],
        "uses_structures": ["inst_identity", "byc_present", "to_jest", "poss_nom"],
    },
}

PACK_PATHS = {
    "a1_trunk_social": RUPL3 / "a1_trunk_social.json",
    "a1_gender": RUPL2 / "a1_gender.json",
    "a1_poss_simple": RUPL2 / "a1_poss_simple.json",
    "a1_home_family": RUPL3 / "a1_home_family.json",
    "a1_hello": RUPL2 / "a1_hello.json",
    "a1_trunk_be_have": RUPL3 / "a1_trunk_be_have.json",
    "a1_gender_check": RUPL2 / "a1_gender_check.json",
    "a1_food": RUPL3 / "a1_food.json",
    "a1_miec": RUPL2 / "a1_miec.json",
    "a1_acc_gym": RUPL2 / "a1_acc_gym.json",
    "a1_present": RUPL2 / "a1_present.json",
    "a1_present_e_isz": RUPL2 / "a1_present_e_isz.json",
    "a1_present_e_esz": RUPL2 / "a1_present_e_esz.json",
    "a1_present_gym": RUPL2 / "a1_present_gym.json",
    "a1_questions": RUPL2 / "a1_questions.json",
    "a1_prep_place": RUPL2 / "a1_prep_place.json",
    "a1_prep_do_z": RUPL2 / "a1_prep_do_z.json",
    "a1_negation": RUPL2 / "a1_negation.json",
    "a1_inst_job": RUPL2 / "a1_inst_job.json",
    "a1_freetime": RUPL3 / "a1_freetime.json",
    "a1_trunk_want_like": RUPL3 / "a1_trunk_want_like.json",
    "a1_places": RUPL3 / "a1_places.json",
    "a1_city": RUPL3 / "a1_city.json",
    "a1_work": RUPL3 / "a1_work.json",
}


def apply_one(pack_id: str, path: Path) -> dict:
    pack = json.loads(path.read_text(encoding="utf-8"))
    meta = dict(MANUAL[pack_id])
    node_id = meta.pop("node_id")
    domain = meta.pop("domain")

    content_lemmas = vocab_item_lemmas(pack)
    sent_structs = sentence_structures(pack)

    teaches_s = list(meta.get("teaches_structures") or [])
    uses_s = uniq(list(meta.get("uses_structures") or []) + sent_structs)
    teaches_l = list(meta.get("teaches_lemmas") or [])
    uses_l = list(meta.get("uses_lemmas") or [])
    # Preserve authored pack lemmas when MANUAL omits them
    if not teaches_l:
        teaches_l = list(pack.get("teaches_lemmas") or [])
    if not uses_l:
        uses_l = list(pack.get("uses_lemmas") or [])

    # Vocab leaves/trunks: auto-merge content lemmas into teaches (citation forms)
    if domain == "vocab":
        teaches_l = uniq(teaches_l + content_lemmas)
        uses_l = uniq(uses_l + content_lemmas)
    elif "gym" in pack_id:
        # Gyms: manual uses only — do not vacuum every drill surface into uses
        pass
    else:
        # grammar teach packs: keep manual teaches; merge gap answers into uses
        uses_l = uniq(uses_l + content_lemmas)

    # home_family: ensure poss forms listed as uses (taught earlier)
    if pack_id == "a1_home_family":
        uses_l = uniq(
            uses_l
            + ["mój", "moja", "moje", "twój", "twoja", "twoje", "brat", "siostra"]
        )

    if pack_id == "a1_trunk_be_have":
        uses_l = uniq(
            uses_l
            + [
                "jestem",
                "mój",
                "moja",
                "moje",
                "twój",
                "brat",
                "siostra",
                "mama",
                "dom",
                "kawa",
                "książka",
                "dziecko",
                "stół",
                "kuchnia",
            ]
        )

    if pack_id == "a1_trunk_want_like":
        uses_l = uniq(
            uses_l
            + [
                "chcę",
                "lubię",
                "kawę",
                "piwo",
                "herbatę",
                "wodę",
                "proszę",
            ]
        )

    focus_s = list(meta.get("focus_structures") or teaches_s)
    pack["teaches_structures"] = teaches_s
    pack["uses_structures"] = uses_s
    pack["teaches_lemmas"] = teaches_l
    pack["uses_lemmas"] = uses_l
    if focus_s:
        pack["focus_structures"] = focus_s
    pack["sequencing"] = {
        "spec": "rupl-codex/SEQUENCING.md",
        "phase": 1,
        "node_id": node_id,
        "pool_model": "cumulative_focus_recycle",
    }

    path.write_text(
        json.dumps(pack, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )

    return {
        "pack_id": pack_id,
        "node_id": node_id,
        "domain": domain,
        "path": str(path.relative_to(ROOT)).replace("\\", "/"),
        "teaches_structures": teaches_s,
        "uses_structures": uses_s,
        "focus_structures": focus_s,
        "teaches_lemmas": teaches_l,
        "uses_lemmas": uses_l,
        "counts": {
            "teaches_structures": len(teaches_s),
            "uses_structures": len(uses_s),
            "teaches_lemmas": len(teaches_l),
            "uses_lemmas": len(uses_l),
        },
    }


def main():
    rows = []
    for pack_id, path in PACK_PATHS.items():
        if not path.is_file():
            raise SystemExit(f"missing {path}")
        rows.append(apply_one(pack_id, path))

    sidecar = {
        "version": 1,
        "spec": "rupl-codex/SEQUENCING.md",
        "phase": 1,
        "note": "Mirror of in-pack tags for auditor convenience. Pack JSON is primary.",
        "packs": {r["pack_id"]: r for r in rows},
        "path_order_pack_ids": list(PACK_PATHS.keys()),
    }
    OUT_SIDECAR.write_text(
        json.dumps(sidecar, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )

    lines = [
        "# Sequencing tags · Phase 1",
        "",
        "**Spec:** [SEQUENCING.md](../SEQUENCING.md)  ",
        "**Sidecar:** [tags.json](./tags.json)  ",
        "**Packs:** tags written in-place under `rupl-exp/data/grammar/blocks` and `rupl-exp/data/vocab/blocks` (canonical).",
        "",
        "Run after edit: `py rupl-codex/sequencing/apply_tags.py` — no sync step; rupl-exp is canonical.",
        "",
        "| pack_id | node_id | domain | teach struct | use struct | teach lem | use lem |",
        "|---------|---------|--------|--------------|------------|-----------|---------|",
    ]
    for r in rows:
        c = r["counts"]
        lines.append(
            f"| `{r['pack_id']}` | `{r['node_id']}` | {r['domain']} | "
            f"{c['teaches_structures']} | {c['uses_structures']} | "
            f"{c['teaches_lemmas']} | {c['uses_lemmas']} |"
        )
    lines.extend(
        [
            "",
            "## Structure teaches (by pack)",
            "",
        ]
    )
    for r in rows:
        if r["teaches_structures"]:
            lines.append(
                f"- **{r['pack_id']}**: `{', '.join(r['teaches_structures'])}`"
            )
    lines.extend(
        [
            "",
            "## Notes",
            "",
            "- Vocab word-only leaves (`food`, `places`, …): `uses_structures` empty until Zdanie banks exist.",
            "- `a1_trunk_want_like` honestly declares `present` + `miec_acc` (acc objects); Phase 2 may flag if path order wrong.",
            "- Gyms teach nothing new; they only **use** prior structures.",
            "- Item-level Dom `structures` rolled into pack `uses_structures`.",
            "",
        ]
    )
    OUT_SUMMARY.write_text("\n".join(lines), encoding="utf-8")
    print(f"tagged {len(rows)} packs")
    print(f"sidecar -> {OUT_SIDECAR}")
    print(f"summary -> {OUT_SUMMARY}")


if __name__ == "__main__":
    main()
