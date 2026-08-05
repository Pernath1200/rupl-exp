# -*- coding: utf-8 -*-
"""Author path-24 grammar packs + fix present leaks. Run from anywhere."""
from __future__ import annotations

import json
from pathlib import Path

RUPL2 = Path(__file__).resolve().parents[2] / "rupl-exp" / "data" / "grammar" / "blocks"


def save(name: str, d: dict) -> None:
    p = RUPL2 / name
    p.write_text(json.dumps(d, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("wrote", name)


def pair(en: str, pl: str, *extra_accepts: str) -> dict:
    base = pl if (pl.endswith(".") or pl.endswith("?")) else pl + "."
    acc = [base, base.rstrip(".?")]
    for e in extra_accepts:
        e2 = e if (e.endswith(".") or e.endswith("?")) else e + "."
        acc.extend([e2, e2.rstrip(".?")])
    seen: set[str] = set()
    out: list[str] = []
    for a in acc:
        if a and a not in seen:
            seen.add(a)
            out.append(a)
    return {"prompt_en": f"Type: {en}", "answer": base, "accepts": out}


def mk_type_fw(prompt: str, answer: str) -> dict:
    return {"prompt_en": prompt, "mode": "full_word", "answer": answer, "accepts": [answer]}


def mk_quiz(prompt: str, answer: str, choices: list[str]) -> dict:
    return {"prompt": prompt, "choices": choices, "answer": answer}


def full_pack(
    id_: str,
    title: str,
    title_en: str,
    note: str,
    focus: list[str],
    intro: list,
    match: list,
    quiz: list,
    type_items: list,
    use_items: list,
    teaches_s: list[str],
    uses_s: list[str],
    teaches_l: list[str],
    uses_l: list[str],
    kind: str = "morphology",
) -> dict:
    return {
        "id": id_,
        "title": title,
        "title_en": title_en,
        "level": "A1",
        "tree_node": id_,
        "default_direction": "en_to_pl",
        "kind": kind,
        "type": {"mode": "full_word"},
        "check": {"sequence": ["match", "quiz"]},
        "note": note,
        "focus_structures": focus,
        "intro": intro,
        "match": match,
        "quiz": quiz,
        "type_items": type_items,
        "use_items": use_items,
        "teaches_structures": teaches_s,
        "uses_structures": uses_s,
        "teaches_lemmas": teaches_l,
        "uses_lemmas": uses_l,
        "sequencing": {
            "spec": "rupl-codex/SEQUENCING.md",
            "phase": 1,
            "node_id": id_,
            "pool_model": "cumulative_focus_recycle",
        },
    }


def fix_present() -> None:
    p = json.loads((RUPL2 / "a1_present.json").read_text(encoding="utf-8"))
    for block in p["intro"]:
        if block.get("title") == "Examples":
            block["examples"] = [
                {"en": "I live.", "pl": "Mieszkam."},
                {"en": "You live. (sg)", "pl": "Mieszkasz."},
                {"en": "Mum lives.", "pl": "Mama mieszka."},
                {"en": "We live.", "pl": "Mieszkamy."},
                {"en": "Brother lives.", "pl": "Brat mieszka."},
                {"en": "They live.", "pl": "Mieszkają."},
            ]
    p["use_items"] = [
        pair("I live.", "Mieszkam."),
        pair("You live. (sg)", "Mieszkasz."),
        pair("Mum lives.", "Mama mieszka.", "Ona mieszka."),
        pair("We live.", "Mieszkamy."),
        pair("You live. (pl)", "Mieszkacie."),
        pair("They live.", "Mieszkają."),
        pair("Dad lives.", "Tata mieszka.", "Ojciec mieszka.", "On mieszka."),
        pair("Brother lives.", "Brat mieszka."),
        pair("Sister lives.", "Siostra mieszka."),
        pair("I live. (again)", "Mieszkam."),
        pair("We live. (again)", "Mieszkamy."),
        pair("You live. (sg, again)", "Mieszkasz."),
    ]
    p["uses_lemmas"] = [
        "mieszkać",
        "mieszkam",
        "mieszkasz",
        "mieszka",
        "mieszkamy",
        "mieszkacie",
        "mieszkają",
        "mama",
        "tata",
        "ojciec",
        "brat",
        "siostra",
    ]
    p["note"] = (
        "P0: ONE conjugation class only (-am). Full 6 persons. Verb: mieszkać. "
        "Użycie recycles Dom family as Nom subjects only — no w/na (prep+Loc later)."
    )
    save("a1_present.json", p)

    g = json.loads((RUPL2 / "a1_present_gym.json").read_text(encoding="utf-8"))
    g["use_items"] = [
        pair("Mum lives.", "Mama mieszka.", "Ona mieszka."),
        pair("I speak.", "Mówię."),
        pair("I want coffee.", "Chcę kawę."),
        pair("You (sg) like tea.", "Lubisz herbatę."),
        pair("Brother lives.", "Brat mieszka."),
        pair("We live.", "Mieszkamy."),
        pair("They want coffee.", "Chcą kawę."),
        pair("She likes tea.", "Ona lubi herbatę.", "Lubi herbatę."),
    ]
    g["uses_lemmas"] = [
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
    ]
    g["uses_structures"] = [
        "present_am",
        "present_e_isz",
        "present_e_esz",
        "present",
        "miec_acc",
    ]
    g["note"] = (
        "After all three present classes. Mixed discrimination. "
        "No prep/Loc until a1_prep_place."
    )
    save("a1_present_gym.json", g)


def write_prep_place() -> None:
    d = full_pack(
        "a1_prep_place",
        "Przyimki · w / na + miejscownik",
        "Prepositions · w/na + locative",
        "P0: static place only. w + Loc, na + Loc. Closed form set. No do/z yet.",
        ["prep_w_loc"],
        [
            {
                "title": "Where something is (static)",
                "title_pl": "Gdzie coś jest (statycznie)",
                "body": (
                    "To say in / on / at a place (not going to it), Polish often uses "
                    "w or na + the locative case (miejscownik).\n\n"
                    "w = in / inside (w domu, w sklepie, w mieście)\n"
                    "na = on / at some places (na stole, na dworcu)\n\n"
                    "Direction (do / z) is the next prep unit — do not mix."
                ),
                "body_pl": "Miejsce (nie kierunek): w / na + miejscownik. Kierunek (do / z) — następna jednostka.",
            },
            {
                "title": "w + locative · closed set",
                "table": {
                    "headers": ["Nominative", "w + Loc", "English"],
                    "rows": [
                        ["dom", "w domu", "in the house / at home"],
                        ["sklep", "w sklepie", "in the shop"],
                        ["miasto", "w mieście", "in the city"],
                        ["szkoła", "w szkole", "at school"],
                    ],
                },
            },
            {
                "title": "na + locative · light",
                "table": {
                    "headers": ["Phrase", "English"],
                    "rows": [
                        ["na stole", "on the table"],
                        ["na dworcu", "at the station"],
                    ],
                },
                "body": "Learn these as fixed place phrases. More na-places come with Miejsca vocab.",
            },
            {
                "title": "Examples",
                "examples": [
                    {"en": "at home / in the house", "pl": "w domu"},
                    {"en": "in the shop", "pl": "w sklepie"},
                    {"en": "in the city", "pl": "w mieście"},
                    {"en": "at school", "pl": "w szkole"},
                    {"en": "on the table", "pl": "na stole"},
                    {"en": "I live at home.", "pl": "Mieszkam w domu."},
                ],
            },
        ],
        match=[
            {"en": "at home / in the house", "pl": "w domu"},
            {"en": "in the shop", "pl": "w sklepie"},
            {"en": "in the city", "pl": "w mieście"},
            {"en": "at school", "pl": "w szkole"},
            {"en": "on the table", "pl": "na stole"},
            {"en": "at the station", "pl": "na dworcu"},
            {"en": "in the house (again)", "pl": "w domu"},
            {"en": "in the shop (again)", "pl": "w sklepie"},
            {"en": "in the city (again)", "pl": "w mieście"},
            {"en": "at school (again)", "pl": "w szkole"},
            {"en": "on the table (again)", "pl": "na stole"},
            {"en": "at the station (again)", "pl": "na dworcu"},
        ],
        quiz=[
            mk_quiz("in the house →", "w domu", ["w domu", "do domu", "z domu", "na domu"]),
            mk_quiz("in the shop →", "w sklepie", ["w sklepie", "w sklep", "do sklepu", "na sklepie"]),
            mk_quiz("in the city →", "w mieście", ["w mieście", "w miasto", "do miasta", "na mieście"]),
            mk_quiz("at school →", "w szkole", ["w szkole", "w szkoła", "do szkoły", "na szkole"]),
            mk_quiz("on the table →", "na stole", ["na stole", "w stole", "do stołu", "na stół"]),
            mk_quiz("at the station →", "na dworcu", ["na dworcu", "w dworcu", "do dworca", "na dworzec"]),
            mk_quiz("ERROR — w dom →", "w domu", ["w domu", "w dom", "do domu", "na domu"]),
            mk_quiz("ERROR — w miasto →", "w mieście", ["w mieście", "w miasto", "do miasta", "na mieście"]),
            mk_quiz(
                "I live at home. →",
                "Mieszkam w domu.",
                ["Mieszkam w domu.", "Mieszkam do domu.", "Mieszkam z domu.", "Mieszkam."],
            ),
            mk_quiz(
                "She is at school. →",
                "Ona jest w szkole.",
                ["Ona jest w szkole.", "Ona jest do szkoły.", "Ona jest szkoła.", "Jest szkoła."],
            ),
            mk_quiz("in the shop (form) →", "w sklepie", ["w sklepie", "w sklep", "sklep", "do sklepu"]),
            mk_quiz("on the table (form) →", "na stole", ["na stole", "w stole", "stół", "na stół"]),
        ],
        type_items=[
            mk_type_fw("at home (phrase)", "w domu"),
            mk_type_fw("in the shop (phrase)", "w sklepie"),
            mk_type_fw("in the city (phrase)", "w mieście"),
            mk_type_fw("at school (phrase)", "w szkole"),
            mk_type_fw("on the table (phrase)", "na stole"),
            mk_type_fw("at the station (phrase)", "na dworcu"),
            mk_type_fw("at home (again)", "w domu"),
            mk_type_fw("in the shop (again)", "w sklepie"),
            mk_type_fw("in the city (again)", "w mieście"),
            mk_type_fw("at school (again)", "w szkole"),
            mk_type_fw("on the table (again)", "na stole"),
            mk_type_fw("at the station (again)", "na dworcu"),
        ],
        use_items=[
            pair("I live at home.", "Mieszkam w domu."),
            pair("You live at home. (sg)", "Mieszkasz w domu."),
            pair("Mum lives at home.", "Mama mieszka w domu."),
            pair("We live at home.", "Mieszkamy w domu."),
            pair("She is in the shop.", "Ona jest w sklepie.", "Jest w sklepie."),
            pair("He is in the city.", "On jest w mieście.", "Jest w mieście."),
            pair("I am at school.", "Jestem w szkole."),
            pair("You are at school. (sg)", "Jesteś w szkole."),
            pair("The coffee is on the table.", "Kawa jest na stole."),
            pair("Brother lives at home.", "Brat mieszka w domu."),
            pair("They live at home.", "Mieszkają w domu."),
            pair("I am in the shop.", "Jestem w sklepie."),
        ],
        teaches_s=["prep_w_loc", "prep_place"],
        uses_s=["prep_w_loc", "prep_place", "present_am", "byc_present"],
        teaches_l=[
            "w domu",
            "w sklepie",
            "w mieście",
            "w szkole",
            "na stole",
            "na dworcu",
            "domu",
            "sklepie",
            "mieście",
            "szkole",
            "stole",
            "dworcu",
            "szkoła",
            "stół",
            "dworzec",
        ],
        uses_l=[
            "w domu",
            "w sklepie",
            "w mieście",
            "w szkole",
            "na stole",
            "na dworcu",
            "dom",
            "domu",
            "sklep",
            "sklepie",
            "miasto",
            "mieście",
            "szkoła",
            "szkole",
            "stół",
            "stole",
            "dworzec",
            "dworcu",
            "mieszkam",
            "mieszkasz",
            "mieszka",
            "mieszkamy",
            "mieszkają",
            "jestem",
            "jesteś",
            "jest",
            "mama",
            "brat",
            "kawa",
        ],
    )
    save("a1_prep_place.json", d)


def write_prep_do_z() -> None:
    d = full_pack(
        "a1_prep_do_z",
        "Przyimki · do / z + dopełniacz",
        "Prepositions · do/z + genitive",
        "P1: direction/origin. do + Gen (to), z + Gen (from). Not static w/na.",
        ["prep_do_gen", "prep_z_gen"],
        [
            {
                "title": "Going to / coming from",
                "title_pl": "Kierunek i pochodzenie",
                "body": (
                    "Static place was w/na + locative.\n\n"
                    "Direction uses different prepositions and usually the genitive:\n"
                    "· do + Gen = to / into (do domu, do sklepu, do miasta)\n"
                    "· z + Gen = from / out of (z domu, z sklepu, z miasta)\n\n"
                    "Do not mix: w domu (location) ≠ do domu (destination)."
                ),
                "body_pl": "Statycznie: w/na + miejscownik. Kierunek: do / z + dopełniacz.",
            },
            {
                "title": "do / z · closed set",
                "table": {
                    "headers": ["Nom", "do + Gen", "z + Gen"],
                    "rows": [
                        ["dom", "do domu", "z domu"],
                        ["sklep", "do sklepu", "z sklepu"],
                        ["miasto", "do miasta", "z miasta"],
                        ["szkoła", "do szkoły", "ze szkoły"],
                    ],
                },
                "body": "Note ze szkoły (ze before s-cluster) — learn as a fixed form.",
            },
            {
                "title": "Examples",
                "examples": [
                    {"en": "to the house / home", "pl": "do domu"},
                    {"en": "from home", "pl": "z domu"},
                    {"en": "to the shop", "pl": "do sklepu"},
                    {"en": "from the shop", "pl": "z sklepu"},
                    {"en": "to the city", "pl": "do miasta"},
                    {"en": "from school", "pl": "ze szkoły"},
                ],
            },
        ],
        match=[
            {"en": "to home / to the house", "pl": "do domu"},
            {"en": "from home", "pl": "z domu"},
            {"en": "to the shop", "pl": "do sklepu"},
            {"en": "from the shop", "pl": "z sklepu"},
            {"en": "to the city", "pl": "do miasta"},
            {"en": "from the city", "pl": "z miasta"},
            {"en": "to school", "pl": "do szkoły"},
            {"en": "from school", "pl": "ze szkoły"},
            {"en": "to home (again)", "pl": "do domu"},
            {"en": "from home (again)", "pl": "z domu"},
            {"en": "to the shop (again)", "pl": "do sklepu"},
            {"en": "from school (again)", "pl": "ze szkoły"},
        ],
        quiz=[
            mk_quiz("to the house →", "do domu", ["do domu", "w domu", "z domu", "na domu"]),
            mk_quiz("from home →", "z domu", ["z domu", "do domu", "w domu", "na domu"]),
            mk_quiz("to the shop →", "do sklepu", ["do sklepu", "w sklepie", "z sklepu", "do sklep"]),
            mk_quiz("from the shop →", "z sklepu", ["z sklepu", "do sklepu", "w sklepie", "ze sklep"]),
            mk_quiz("to the city →", "do miasta", ["do miasta", "w mieście", "z miasta", "do miasto"]),
            mk_quiz("from the city →", "z miasta", ["z miasta", "do miasta", "w mieście", "ze miasto"]),
            mk_quiz("to school →", "do szkoły", ["do szkoły", "w szkole", "ze szkoły", "do szkoła"]),
            mk_quiz("from school →", "ze szkoły", ["ze szkoły", "do szkoły", "w szkole", "z szkoła"]),
            mk_quiz("ERROR — do dom →", "do domu", ["do domu", "do dom", "w domu", "z domu"]),
            mk_quiz(
                "ERROR — w sklepu (want: to shop) →",
                "do sklepu",
                ["do sklepu", "w sklepie", "z sklepu", "w sklepu"],
            ),
            mk_quiz("to home (again) →", "do domu", ["do domu", "w domu", "z domu", "na domu"]),
            mk_quiz("from school (again) →", "ze szkoły", ["ze szkoły", "do szkoły", "w szkole", "z szkoły"]),
        ],
        type_items=[
            mk_type_fw("to home (phrase)", "do domu"),
            mk_type_fw("from home (phrase)", "z domu"),
            mk_type_fw("to the shop (phrase)", "do sklepu"),
            mk_type_fw("from the shop (phrase)", "z sklepu"),
            mk_type_fw("to the city (phrase)", "do miasta"),
            mk_type_fw("from the city (phrase)", "z miasta"),
            mk_type_fw("to school (phrase)", "do szkoły"),
            mk_type_fw("from school (phrase)", "ze szkoły"),
            mk_type_fw("to home (again)", "do domu"),
            mk_type_fw("from home (again)", "z domu"),
            mk_type_fw("to the shop (again)", "do sklepu"),
            mk_type_fw("from school (again)", "ze szkoły"),
        ],
        use_items=[
            pair("to home", "do domu"),
            pair("from home", "z domu"),
            pair("to the shop", "do sklepu"),
            pair("from the shop", "z sklepu"),
            pair("to the city", "do miasta"),
            pair("from the city", "z miasta"),
            pair("to school", "do szkoły"),
            pair("from school", "ze szkoły"),
            pair("I am going home. (phrase: to home)", "do domu"),
            pair("from school (again)", "ze szkoły"),
            pair("to the shop (again)", "do sklepu"),
            pair("from home (again)", "z domu"),
        ],
        teaches_s=["prep_do_gen", "prep_z_gen", "prep_place"],
        uses_s=["prep_do_gen", "prep_z_gen", "prep_place", "prep_w_loc"],
        teaches_l=[
            "do domu",
            "z domu",
            "do sklepu",
            "z sklepu",
            "do miasta",
            "z miasta",
            "do szkoły",
            "ze szkoły",
            "sklepu",
            "miasta",
            "szkoły",
        ],
        uses_l=[
            "do domu",
            "z domu",
            "do sklepu",
            "z sklepu",
            "do miasta",
            "z miasta",
            "do szkoły",
            "ze szkoły",
            "dom",
            "domu",
            "sklep",
            "sklepu",
            "miasto",
            "miasta",
            "szkoła",
            "szkoły",
            "w domu",
            "w sklepie",
        ],
    )
    save("a1_prep_do_z.json", d)


def write_inst_job() -> None:
    d = full_pack(
        "a1_inst_job",
        "Być + zawód · narzędnik",
        "Be + job · instrumental",
        "P1: identity only — jestem + Inst job. After Acc + place preps.",
        ["inst_identity"],
        [
            {
                "title": "Who you are (job / role)",
                "title_pl": "Kim jesteś (zawód)",
                "body": (
                    "English: I am a teacher (same form as the noun).\n"
                    "Polish: Jestem nauczycielem — the job noun often takes the "
                    "instrumental (narzędnik) after być for identity.\n\n"
                    "This unit: a small job set, masculine and feminine pairs."
                ),
                "body_pl": "Jestem + narzędnik zawodu. Mały zestaw.",
            },
            {
                "title": "jestem / jesteś / jest + Inst",
                "table": {
                    "headers": ["EN", "PL (m)", "PL (f)"],
                    "rows": [
                        ["student", "studentem", "studentką"],
                        ["teacher", "nauczycielem", "nauczycielką"],
                        ["doctor", "lekarzem", "lekarką"],
                        ["waiter / waitress", "kelnerem", "kelnerką"],
                    ],
                },
            },
            {
                "title": "Examples",
                "examples": [
                    {"en": "I am a student. (m)", "pl": "Jestem studentem."},
                    {"en": "I am a student. (f)", "pl": "Jestem studentką."},
                    {"en": "You are a teacher. (sg, m)", "pl": "Jesteś nauczycielem."},
                    {"en": "She is a doctor.", "pl": "Ona jest lekarką."},
                    {"en": "He is a waiter.", "pl": "On jest kelnerem."},
                ],
            },
        ],
        match=[
            {"en": "I am a student (m)", "pl": "Jestem studentem"},
            {"en": "I am a student (f)", "pl": "Jestem studentką"},
            {"en": "you are a teacher (sg, m)", "pl": "Jesteś nauczycielem"},
            {"en": "you are a teacher (sg, f)", "pl": "Jesteś nauczycielką"},
            {"en": "he is a doctor", "pl": "On jest lekarzem"},
            {"en": "she is a doctor", "pl": "Ona jest lekarką"},
            {"en": "he is a waiter", "pl": "On jest kelnerem"},
            {"en": "she is a waitress", "pl": "Ona jest kelnerką"},
            {"en": "I am a teacher (m)", "pl": "Jestem nauczycielem"},
            {"en": "I am a doctor (f)", "pl": "Jestem lekarką"},
            {"en": "you are a student (sg, m)", "pl": "Jesteś studentem"},
            {"en": "she is a teacher", "pl": "Ona jest nauczycielką"},
        ],
        quiz=[
            mk_quiz(
                "I am a student (m) →",
                "Jestem studentem.",
                ["Jestem studentem.", "Jestem student.", "Jestem studenta.", "To jest student."],
            ),
            mk_quiz(
                "I am a student (f) →",
                "Jestem studentką.",
                ["Jestem studentką.", "Jestem studentka.", "Jestem studentem.", "Jestem student."],
            ),
            mk_quiz(
                "You are a teacher (sg, m) →",
                "Jesteś nauczycielem.",
                ["Jesteś nauczycielem.", "Jesteś nauczyciel.", "Jesteś nauczyciela.", "Jest nauczycielem."],
            ),
            mk_quiz(
                "She is a doctor →",
                "Ona jest lekarką.",
                ["Ona jest lekarką.", "Ona jest lekarz.", "Ona jest lekarka.", "Jest lekarzem."],
            ),
            mk_quiz(
                "He is a waiter →",
                "On jest kelnerem.",
                ["On jest kelnerem.", "On jest kelner.", "On jest kelnera.", "Jest kelnerką."],
            ),
            mk_quiz(
                "I am a teacher (f) →",
                "Jestem nauczycielką.",
                ["Jestem nauczycielką.", "Jestem nauczycielka.", "Jestem nauczycielem.", "Jesteś nauczycielką."],
            ),
            mk_quiz(
                "ERROR — Jestem student →",
                "Jestem studentem.",
                ["Jestem studentem.", "Jestem student.", "Jestem studenta.", "To student."],
            ),
            mk_quiz(
                "You are a doctor (sg, m) →",
                "Jesteś lekarzem.",
                ["Jesteś lekarzem.", "Jesteś lekarz.", "Jesteś lekarza.", "Jestem lekarzem."],
            ),
            mk_quiz(
                "She is a waitress →",
                "Ona jest kelnerką.",
                ["Ona jest kelnerką.", "Ona jest kelnerka.", "Ona jest kelnerem.", "Jest kelner."],
            ),
            mk_quiz(
                "I am a doctor (m) →",
                "Jestem lekarzem.",
                ["Jestem lekarzem.", "Jestem lekarz.", "Jestem lekarką.", "Jesteś lekarzem."],
            ),
            mk_quiz(
                "He is a student →",
                "On jest studentem.",
                ["On jest studentem.", "On jest student.", "On jest studenta.", "Jestem studentem."],
            ),
            mk_quiz(
                "You are a teacher (sg, f) →",
                "Jesteś nauczycielką.",
                ["Jesteś nauczycielką.", "Jesteś nauczycielka.", "Jesteś nauczycielem.", "Jest nauczycielką."],
            ),
        ],
        type_items=[
            mk_type_fw("I am a student (m) — form after Jestem", "studentem"),
            mk_type_fw("I am a student (f)", "studentką"),
            mk_type_fw("teacher (m) after Jestem/Jesteś", "nauczycielem"),
            mk_type_fw("teacher (f)", "nauczycielką"),
            mk_type_fw("doctor (m)", "lekarzem"),
            mk_type_fw("doctor (f)", "lekarką"),
            mk_type_fw("waiter (m)", "kelnerem"),
            mk_type_fw("waitress (f)", "kelnerką"),
            mk_type_fw("student (m) again", "studentem"),
            mk_type_fw("student (f) again", "studentką"),
            mk_type_fw("teacher (m) again", "nauczycielem"),
            mk_type_fw("doctor (f) again", "lekarką"),
        ],
        use_items=[
            pair("I am a student. (m)", "Jestem studentem."),
            pair("I am a student. (f)", "Jestem studentką."),
            pair("You are a teacher. (sg, m)", "Jesteś nauczycielem."),
            pair("You are a teacher. (sg, f)", "Jesteś nauczycielką."),
            pair("He is a doctor.", "On jest lekarzem.", "Jest lekarzem."),
            pair("She is a doctor.", "Ona jest lekarką.", "Jest lekarką."),
            pair("He is a waiter.", "On jest kelnerem.", "Jest kelnerem."),
            pair("She is a waitress.", "Ona jest kelnerką.", "Jest kelnerką."),
            pair("I am a teacher. (m)", "Jestem nauczycielem."),
            pair("I am a doctor. (f)", "Jestem lekarką."),
            pair("You are a student. (sg, m)", "Jesteś studentem."),
            pair("She is a teacher.", "Ona jest nauczycielką.", "Jest nauczycielką."),
        ],
        teaches_s=["inst_identity"],
        uses_s=["inst_identity", "byc_present"],
        teaches_l=[
            "studentem",
            "studentką",
            "nauczycielem",
            "nauczycielką",
            "lekarzem",
            "lekarką",
            "kelnerem",
            "kelnerką",
            "student",
            "studentka",
            "nauczyciel",
            "nauczycielka",
            "lekarz",
            "lekarka",
            "kelner",
            "kelnerka",
        ],
        uses_l=[
            "studentem",
            "studentką",
            "nauczycielem",
            "nauczycielką",
            "lekarzem",
            "lekarką",
            "kelnerem",
            "kelnerką",
            "jestem",
            "jesteś",
            "jest",
        ],
    )
    save("a1_inst_job.json", d)


def write_questions() -> None:
    d = full_pack(
        "a1_questions",
        "Pytania · skorupy",
        "Question shells",
        "P2: phrase shells — high-frequency question words and fixed patterns. No new case theory.",
        ["question"],
        [
            {
                "title": "Question words as chunks",
                "title_pl": "Pytajniki jako kawałki",
                "body": (
                    "Learn these as ready-made shells. Answers come from earlier units "
                    "(to jest…, jestem…, mieszkam…, mam…).\n\n"
                    "Co? — What?\nKto? — Who?\nGdzie? — Where?\nJak? — How?\nCzy…? — Yes/no starter"
                ),
                "body_pl": "Skorupy pytań. Odpowiedzi z wcześniejszych jednostek.",
            },
            {
                "title": "Useful shells",
                "table": {
                    "headers": ["Polish", "English"],
                    "rows": [
                        ["Co to jest?", "What is this?"],
                        ["Kto to jest?", "Who is this?"],
                        ["Gdzie jest…?", "Where is…?"],
                        ["Jak się masz?", "How are you?"],
                        ["Czy masz…?", "Do you have…?"],
                        ["Gdzie mieszkasz?", "Where do you live?"],
                    ],
                },
                "body": (
                    "Gdzie mieszkasz? is a shell — answer can be bare Mieszkam. "
                    "or later Mieszkam w domu. after prep."
                ),
            },
            {
                "title": "Examples",
                "examples": [
                    {"en": "What is this?", "pl": "Co to jest?"},
                    {"en": "Who is this?", "pl": "Kto to jest?"},
                    {"en": "How are you?", "pl": "Jak się masz?"},
                    {"en": "Where do you live?", "pl": "Gdzie mieszkasz?"},
                    {"en": "Do you have coffee?", "pl": "Czy masz kawę?"},
                ],
            },
        ],
        match=[
            {"en": "What?", "pl": "Co?"},
            {"en": "Who?", "pl": "Kto?"},
            {"en": "Where?", "pl": "Gdzie?"},
            {"en": "How?", "pl": "Jak?"},
            {"en": "What is this?", "pl": "Co to jest?"},
            {"en": "Who is this?", "pl": "Kto to jest?"},
            {"en": "How are you?", "pl": "Jak się masz?"},
            {"en": "Where do you live?", "pl": "Gdzie mieszkasz?"},
            {"en": "Do you have…? (shell)", "pl": "Czy masz…?"},
            {"en": "Where is…? (shell)", "pl": "Gdzie jest…?"},
            {"en": "What is this? (again)", "pl": "Co to jest?"},
            {"en": "How are you? (again)", "pl": "Jak się masz?"},
        ],
        quiz=[
            mk_quiz("What is this? →", "Co to jest?", ["Co to jest?", "Kto to jest?", "Gdzie to jest?", "Jak to jest?"]),
            mk_quiz("Who is this? →", "Kto to jest?", ["Kto to jest?", "Co to jest?", "Gdzie to jest?", "Jak się masz?"]),
            mk_quiz("How are you? →", "Jak się masz?", ["Jak się masz?", "Gdzie mieszkasz?", "Co to jest?", "Czy masz?"]),
            mk_quiz(
                "Where do you live? →",
                "Gdzie mieszkasz?",
                ["Gdzie mieszkasz?", "Jak się masz?", "Co to jest?", "Czy masz kawę?"],
            ),
            mk_quiz("What? →", "Co?", ["Co?", "Kto?", "Gdzie?", "Jak?"]),
            mk_quiz("Who? →", "Kto?", ["Kto?", "Co?", "Gdzie?", "Jak?"]),
            mk_quiz("Where? →", "Gdzie?", ["Gdzie?", "Co?", "Kto?", "Jak?"]),
            mk_quiz("How? →", "Jak?", ["Jak?", "Gdzie?", "Co?", "Czy?"]),
            mk_quiz(
                "Do you have coffee? →",
                "Czy masz kawę?",
                ["Czy masz kawę?", "Masz kawę?", "Co masz kawę?", "Gdzie masz kawę?"],
            ),
            mk_quiz(
                "Where is mum? →",
                "Gdzie jest mama?",
                ["Gdzie jest mama?", "Co jest mama?", "Kto jest mama?", "Jak jest mama?"],
            ),
            mk_quiz("What is this? (again) →", "Co to jest?", ["Co to jest?", "Kto to jest?", "To jest co?", "Jak to jest?"]),
            mk_quiz(
                "How are you? (again) →",
                "Jak się masz?",
                ["Jak się masz?", "Gdzie mieszkasz?", "Co słychać?", "Czy jesteś?"],
            ),
        ],
        type_items=[
            mk_type_fw("What?", "Co?"),
            mk_type_fw("Who?", "Kto?"),
            mk_type_fw("Where?", "Gdzie?"),
            mk_type_fw("How?", "Jak?"),
            mk_type_fw("What is this?", "Co to jest?"),
            mk_type_fw("Who is this?", "Kto to jest?"),
            mk_type_fw("How are you?", "Jak się masz?"),
            mk_type_fw("Where do you live?", "Gdzie mieszkasz?"),
            mk_type_fw("What is this? (again)", "Co to jest?"),
            mk_type_fw("How are you? (again)", "Jak się masz?"),
            mk_type_fw("Where? (again)", "Gdzie?"),
            mk_type_fw("Who is this? (again)", "Kto to jest?"),
        ],
        use_items=[
            pair("What is this?", "Co to jest?"),
            pair("Who is this?", "Kto to jest?"),
            pair("How are you?", "Jak się masz?"),
            pair("Where do you live?", "Gdzie mieszkasz?"),
            pair("Do you have coffee?", "Czy masz kawę?"),
            pair("Where is mum?", "Gdzie jest mama?"),
            pair("What?", "Co?"),
            pair("Who?", "Kto?"),
            pair("Where?", "Gdzie?"),
            pair("How?", "Jak?"),
            pair("What is this? (again)", "Co to jest?"),
            pair("How are you? (again)", "Jak się masz?"),
        ],
        teaches_s=["question"],
        uses_s=["question", "to_jest", "miec_acc", "miec_present", "byc_present", "present_am"],
        teaches_l=[
            "co",
            "kto",
            "gdzie",
            "jak",
            "czy",
            "co to jest",
            "kto to jest",
            "jak się masz",
            "gdzie mieszkasz",
            "czy masz",
        ],
        uses_l=[
            "co",
            "kto",
            "gdzie",
            "jak",
            "czy",
            "co to jest",
            "kto to jest",
            "jak się masz",
            "gdzie mieszkasz",
            "mama",
            "kawa",
            "kawę",
            "masz",
            "jest",
            "mieszkasz",
        ],
        kind="chunks",
    )
    save("a1_questions.json", d)


def write_negation() -> None:
    d = full_pack(
        "a1_negation",
        "Przeczenie · nie mam + dopełniacz",
        "Negation · nie mam + genitive",
        "P2: nie + mieć flips object to genitive (nie mam kawy). Positive Acc already known.",
        ["negation"],
        [
            {
                "title": "I don't have…",
                "title_pl": "Nie mam…",
                "body": (
                    "Positive: Mam kawę. (accusative)\n"
                    "Negative: Nie mam kawy. (genitive)\n\n"
                    "Genitive of negation after nie mam — A1 only with mieć + a small object set."
                ),
                "body_pl": "Mam kawę. → Nie mam kawy. (dopełniacz po przeczeniu mieć).",
            },
            {
                "title": "Closed set",
                "table": {
                    "headers": ["Have (Acc)", "Don't have (Gen)"],
                    "rows": [
                        ["mam kawę", "nie mam kawy"],
                        ["mam herbatę", "nie mam herbaty"],
                        ["mam wodę", "nie mam wody"],
                        ["mam czas", "nie mam czasu"],
                        ["mam książkę", "nie mam książki"],
                        ["mam dom", "nie mam domu"],
                    ],
                },
            },
            {
                "title": "Examples",
                "examples": [
                    {"en": "I don't have coffee.", "pl": "Nie mam kawy."},
                    {"en": "I don't have time.", "pl": "Nie mam czasu."},
                    {"en": "You don't have tea. (sg)", "pl": "Nie masz herbaty."},
                    {"en": "She doesn't have a book.", "pl": "Ona nie ma książki."},
                ],
            },
        ],
        match=[
            {"en": "I don't have coffee", "pl": "nie mam kawy"},
            {"en": "I don't have tea", "pl": "nie mam herbaty"},
            {"en": "I don't have water", "pl": "nie mam wody"},
            {"en": "I don't have time", "pl": "nie mam czasu"},
            {"en": "I don't have a book", "pl": "nie mam książki"},
            {"en": "I don't have a house", "pl": "nie mam domu"},
            {"en": "you don't have coffee (sg)", "pl": "nie masz kawy"},
            {"en": "she doesn't have tea", "pl": "nie ma herbaty"},
            {"en": "I don't have coffee (again)", "pl": "nie mam kawy"},
            {"en": "I don't have time (again)", "pl": "nie mam czasu"},
            {"en": "you don't have a book (sg)", "pl": "nie masz książki"},
            {"en": "we don't have water", "pl": "nie mamy wody"},
        ],
        quiz=[
            mk_quiz(
                "I don't have coffee →",
                "Nie mam kawy.",
                ["Nie mam kawy.", "Nie mam kawę.", "Mam kawy.", "Nie mam kawa."],
            ),
            mk_quiz(
                "I don't have time →",
                "Nie mam czasu.",
                ["Nie mam czasu.", "Nie mam czas.", "Mam czasu.", "Nie mam czasę."],
            ),
            mk_quiz(
                "I don't have tea →",
                "Nie mam herbaty.",
                ["Nie mam herbaty.", "Nie mam herbatę.", "Mam herbaty.", "Nie mam herbata."],
            ),
            mk_quiz(
                "You don't have coffee (sg) →",
                "Nie masz kawy.",
                ["Nie masz kawy.", "Nie masz kawę.", "Nie mam kawy.", "Masz kawy."],
            ),
            mk_quiz(
                "She doesn't have a book →",
                "Ona nie ma książki.",
                ["Ona nie ma książki.", "Ona nie ma książkę.", "Ona ma książki.", "Nie ma książkę."],
            ),
            mk_quiz(
                "ERROR — Nie mam kawę →",
                "Nie mam kawy.",
                ["Nie mam kawy.", "Nie mam kawę.", "Mam kawę.", "Nie mam kawa."],
            ),
            mk_quiz(
                "I don't have water →",
                "Nie mam wody.",
                ["Nie mam wody.", "Nie mam wodę.", "Mam wody.", "Nie mam woda."],
            ),
            mk_quiz(
                "I don't have a house →",
                "Nie mam domu.",
                ["Nie mam domu.", "Nie mam dom.", "Mam domu.", "Nie mam domem."],
            ),
            mk_quiz(
                "We don't have tea →",
                "Nie mamy herbaty.",
                ["Nie mamy herbaty.", "Nie mamy herbatę.", "Mamy herbaty.", "Nie mam herbaty."],
            ),
            mk_quiz(
                "You don't have time (sg) →",
                "Nie masz czasu.",
                ["Nie masz czasu.", "Nie masz czas.", "Nie mam czasu.", "Masz czasu."],
            ),
            mk_quiz(
                "I don't have a book (again) →",
                "Nie mam książki.",
                ["Nie mam książki.", "Nie mam książkę.", "Mam książki.", "Nie ma książki."],
            ),
            mk_quiz(
                "I don't have coffee (again) →",
                "Nie mam kawy.",
                ["Nie mam kawy.", "Nie mam kawę.", "Nie masz kawy.", "Mam kawy."],
            ),
        ],
        type_items=[
            mk_type_fw("I don't have coffee (phrase)", "nie mam kawy"),
            mk_type_fw("I don't have tea", "nie mam herbaty"),
            mk_type_fw("I don't have water", "nie mam wody"),
            mk_type_fw("I don't have time", "nie mam czasu"),
            mk_type_fw("I don't have a book", "nie mam książki"),
            mk_type_fw("I don't have a house", "nie mam domu"),
            mk_type_fw("you don't have coffee (sg)", "nie masz kawy"),
            mk_type_fw("she doesn't have tea (form)", "nie ma herbaty"),
            mk_type_fw("I don't have coffee (again)", "nie mam kawy"),
            mk_type_fw("I don't have time (again)", "nie mam czasu"),
            mk_type_fw("I don't have a book (again)", "nie mam książki"),
            mk_type_fw("we don't have water", "nie mamy wody"),
        ],
        use_items=[
            pair("I don't have coffee.", "Nie mam kawy."),
            pair("I don't have tea.", "Nie mam herbaty."),
            pair("I don't have water.", "Nie mam wody."),
            pair("I don't have time.", "Nie mam czasu."),
            pair("I don't have a book.", "Nie mam książki."),
            pair("I don't have a house.", "Nie mam domu."),
            pair("You don't have coffee. (sg)", "Nie masz kawy."),
            pair("She doesn't have tea.", "Ona nie ma herbaty.", "Nie ma herbaty."),
            pair("We don't have water.", "Nie mamy wody."),
            pair("You don't have time. (sg)", "Nie masz czasu."),
            pair("I don't have coffee. (again)", "Nie mam kawy."),
            pair("I don't have time. (again)", "Nie mam czasu."),
        ],
        teaches_s=["negation"],
        uses_s=["negation", "miec_present", "miec_acc"],
        teaches_l=[
            "nie mam",
            "nie masz",
            "nie ma",
            "nie mamy",
            "kawy",
            "herbaty",
            "wody",
            "czasu",
            "książki",
            "czas",
        ],
        uses_l=[
            "nie mam",
            "nie masz",
            "nie ma",
            "nie mamy",
            "kawy",
            "herbaty",
            "wody",
            "czasu",
            "książki",
            "domu",
            "kawa",
            "herbata",
            "woda",
            "czas",
            "książka",
            "dom",
            "mam",
            "masz",
            "ma",
        ],
    )
    save("a1_negation.json", d)


def main() -> None:
    assert RUPL2.is_dir(), RUPL2
    fix_present()
    write_prep_place()
    write_prep_do_z()
    write_inst_job()
    write_questions()
    write_negation()
    for f in [
        "a1_present.json",
        "a1_present_gym.json",
        "a1_prep_place.json",
        "a1_prep_do_z.json",
        "a1_inst_job.json",
        "a1_questions.json",
        "a1_negation.json",
    ]:
        d = json.loads((RUPL2 / f).read_text(encoding="utf-8"))
        print(
            f,
            "match",
            len(d["match"]),
            "quiz",
            len(d["quiz"]),
            "type",
            len(d["type_items"]),
            "use",
            len(d["use_items"]),
        )


if __name__ == "__main__":
    main()
