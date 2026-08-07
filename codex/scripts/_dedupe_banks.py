# -*- coding: utf-8 -*-
"""Remove (again) padding from path-24 grammar packs.

Rules (user 2026-07-30):
- Match: clean person/phrase pairs + error-spotting — never duplicate the same row
- Volume: second -am verb czytać in a1_present; varied items elsewhere
- EN prompts: clean labels (I / you (sg) / he/she / we / you (pl) / they)
"""
from __future__ import annotations

import json
from pathlib import Path

RUPL2 = Path(__file__).resolve().parents[2] / "rupl-exp" / "data" / "grammar" / "blocks"


def save(name: str, d: dict) -> None:
    (RUPL2 / name).write_text(
        json.dumps(d, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print("saved", name, "match", len(d.get("match", [])), "quiz", len(d.get("quiz", [])),
          "type", len(d.get("type_items", [])), "use", len(d.get("use_items", [])))


def load(name: str) -> dict:
    return json.loads((RUPL2 / name).read_text(encoding="utf-8"))


def pair(en: str, pl: str, *extra: str) -> dict:
    base = pl if pl.endswith((".", "?")) else pl + "."
    acc = [base, base.rstrip(".?")]
    for e in extra:
        e2 = e if e.endswith((".", "?")) else e + "."
        acc.extend([e2, e2.rstrip(".?")])
    seen: set[str] = set()
    out: list[str] = []
    for a in acc:
        if a and a not in seen:
            seen.add(a)
            out.append(a)
    return {"prompt_en": f"Type: {en}", "answer": base, "accepts": out}


def tw(prompt: str, answer: str) -> dict:
    return {"prompt_en": prompt, "mode": "full_word", "answer": answer, "accepts": [answer]}


def qz(prompt: str, answer: str, choices: list[str]) -> dict:
    return {"prompt": prompt, "choices": choices, "answer": answer}


def rewrite_present() -> None:
    d = load("a1_present.json")
    d["title"] = "Teraźniejszy · wzór -am (mieszkać / czytać)"
    d["title_en"] = "Present · -am class (mieszkać / czytać)"
    d["note"] = (
        "ONE class (-am). Verbs: mieszkać + czytać. Full 6 persons. "
        "Match = clean pairs + error-spot (no duplicate rows). "
        "Użycie: Nom subjects / bare forms only — no w/na."
    )
    d["intro"] = [
        {
            "title": "One pattern · two verbs",
            "title_pl": "Jeden wzorzec · dwa czasowniki",
            "body": (
                "This unit is only the -am set.\n\n"
                "mieszkać (to live) and czytać (to read) share the same endings:\n"
                "-am / -asz / -a / -amy / -acie / -ają\n\n"
                "All six persons. Not być / mieć."
            ),
            "body_pl": "Tylko wzór -am: mieszkać i czytać. 6 osób.",
        },
        {
            "title": "mieszkać",
            "table": {
                "headers": ["Person", "Form", "English"],
                "rows": [
                    ["ja", "mieszkam", "I live"],
                    ["ty", "mieszkasz", "you live (sg)"],
                    ["on / ona", "mieszka", "he / she lives"],
                    ["my", "mieszkamy", "we live"],
                    ["wy", "mieszkacie", "you live (pl)"],
                    ["oni / one", "mieszkają", "they live"],
                ],
            },
        },
        {
            "title": "czytać — same endings",
            "table": {
                "headers": ["Person", "Form", "English"],
                "rows": [
                    ["ja", "czytam", "I read"],
                    ["ty", "czytasz", "you read (sg)"],
                    ["on / ona", "czyta", "he / she reads"],
                    ["my", "czytamy", "we read"],
                    ["wy", "czytacie", "you read (pl)"],
                    ["oni / one", "czytają", "they read"],
                ],
            },
        },
        {
            "title": "Examples",
            "examples": [
                {"en": "I live.", "pl": "Mieszkam."},
                {"en": "I read.", "pl": "Czytam."},
                {"en": "Mum lives.", "pl": "Mama mieszka."},
                {"en": "Brother reads.", "pl": "Brat czyta."},
                {"en": "We live.", "pl": "Mieszkamy."},
                {"en": "They read.", "pl": "Czytają."},
            ],
        },
    ]
    # Match: 6 clean mieszkać + 6 error-spot (not the same EN twice)
    d["match"] = [
        {"en": "I live", "pl": "mieszkam"},
        {"en": "you live (sg)", "pl": "mieszkasz"},
        {"en": "he/she lives", "pl": "mieszka"},
        {"en": "we live", "pl": "mieszkamy"},
        {"en": "you live (pl)", "pl": "mieszkacie"},
        {"en": "they live", "pl": "mieszkają"},
        {"en": "I · not *mieszka", "pl": "mieszkam"},
        {"en": "you (sg) · not *mieszkam", "pl": "mieszkasz"},
        {"en": "he/she · not *mieszkam", "pl": "mieszka"},
        {"en": "we · not *mieszkam", "pl": "mieszkamy"},
        {"en": "you (pl) · not *mieszkasz", "pl": "mieszkacie"},
        {"en": "they · not *mieszka", "pl": "mieszkają"},
    ]
    d["quiz"] = [
        qz("I live →", "mieszkam", ["mieszkam", "mieszkasz", "mieszka", "mieszkamy"]),
        qz("You live (sg) →", "mieszkasz", ["mieszkam", "mieszkasz", "mieszka", "mieszkacie"]),
        qz("He/she lives →", "mieszka", ["mieszkam", "mieszkasz", "mieszka", "mieszkają"]),
        qz("We live →", "mieszkamy", ["mieszkam", "mieszkamy", "mieszkacie", "mieszkają"]),
        qz("You live (pl) →", "mieszkacie", ["mieszkasz", "mieszkamy", "mieszkacie", "mieszkają"]),
        qz("They live →", "mieszkają", ["mieszka", "mieszkamy", "mieszkacie", "mieszkają"]),
        qz("I read →", "czytam", ["czytam", "czytasz", "czyta", "czytamy"]),
        qz("You read (sg) →", "czytasz", ["czytam", "czytasz", "czyta", "czytacie"]),
        qz("He/she reads →", "czyta", ["czytam", "czytasz", "czyta", "czytają"]),
        qz("We read →", "czytamy", ["czytam", "czytamy", "czytacie", "czytają"]),
        qz("ERROR — ja mieszka →", "mieszkam", ["mieszkam", "mieszkasz", "mieszka", "mieszkamy"]),
        qz("ERROR — ty czytam →", "czytasz", ["czytam", "czytasz", "czyta", "czytacie"]),
    ]
    d["type_items"] = [
        tw("I live", "mieszkam"),
        tw("you live (sg)", "mieszkasz"),
        tw("he/she lives", "mieszka"),
        tw("we live", "mieszkamy"),
        tw("you live (pl)", "mieszkacie"),
        tw("they live", "mieszkają"),
        tw("I read", "czytam"),
        tw("you read (sg)", "czytasz"),
        tw("he/she reads", "czyta"),
        tw("we read", "czytamy"),
        tw("you read (pl)", "czytacie"),
        tw("they read", "czytają"),
    ]
    d["use_items"] = [
        pair("I live.", "Mieszkam."),
        pair("You live. (sg)", "Mieszkasz."),
        pair("Mum lives.", "Mama mieszka.", "Ona mieszka."),
        pair("We live.", "Mieszkamy."),
        pair("You live. (pl)", "Mieszkacie."),
        pair("They live.", "Mieszkają."),
        pair("I read.", "Czytam."),
        pair("You read. (sg)", "Czytasz."),
        pair("Brother reads.", "Brat czyta.", "On czyta."),
        pair("We read.", "Czytamy."),
        pair("Sister reads.", "Siostra czyta."),
        pair("They read.", "Czytają."),
    ]
    d["teaches_lemmas"] = [
        "mieszkać", "mieszkam", "mieszkasz", "mieszka", "mieszkamy", "mieszkacie", "mieszkają",
        "czytać", "czytam", "czytasz", "czyta", "czytamy", "czytacie", "czytają",
    ]
    d["uses_lemmas"] = d["teaches_lemmas"] + ["mama", "brat", "siostra", "tata", "ojciec"]
    d["teaches_structures"] = ["present_am", "present"]
    d["uses_structures"] = ["present_am", "present"]
    save("a1_present.json", d)


def rewrite_present_esz() -> None:
    d = load("a1_present_e_esz.json")
    d["note"] = (
        "Third class only. chcieć · 6 persons. Match = clean + error-spot (no duplicate rows)."
    )
    d["match"] = [
        {"en": "I want", "pl": "chcę"},
        {"en": "you want (sg)", "pl": "chcesz"},
        {"en": "he/she wants", "pl": "chce"},
        {"en": "we want", "pl": "chcemy"},
        {"en": "you want (pl)", "pl": "chcecie"},
        {"en": "they want", "pl": "chcą"},
        {"en": "I · not *chcisz", "pl": "chcę"},
        {"en": "you (sg) · not *chcisz (→ -esz)", "pl": "chcesz"},
        {"en": "he/she · not *chcę", "pl": "chce"},
        {"en": "we · not *chcę", "pl": "chcemy"},
        {"en": "you (pl) · not *chcesz", "pl": "chcecie"},
        {"en": "they · not *chce", "pl": "chcą"},
    ]
    # rebuild quiz without again; keep 12 distinct
    d["quiz"] = [
        qz("I want →", "chcę", ["chcę", "chcesz", "chce", "chcemy"]),
        qz("You want (sg) →", "chcesz", ["chcę", "chcesz", "chce", "chcecie"]),
        qz("He/she wants →", "chce", ["chcę", "chcesz", "chce", "chcą"]),
        qz("We want →", "chcemy", ["chcę", "chcemy", "chcecie", "chcą"]),
        qz("You want (pl) →", "chcecie", ["chcesz", "chcemy", "chcecie", "chcą"]),
        qz("They want →", "chcą", ["chce", "chcemy", "chcecie", "chcą"]),
        qz("ERROR — ty *chcisz →", "chcesz", ["chcę", "chcesz", "chce", "chcisz"]),
        qz("ERROR — ja *chce →", "chcę", ["chcę", "chcesz", "chce", "chcemy"]),
        qz("ERROR — my *chcę →", "chcemy", ["chcę", "chcemy", "chcecie", "chcą"]),
        qz("I want coffee → form of want", "chcę", ["chcę", "chcesz", "lubię", "mam"]),
        qz("You (sg) want tea → form of want", "chcesz", ["chcę", "chcesz", "lubisz", "masz"]),
        qz("They want → form", "chcą", ["chce", "chcemy", "chcecie", "chcą"]),
    ]
    d["type_items"] = [
        tw("I want", "chcę"),
        tw("you want (sg)", "chcesz"),
        tw("he/she wants", "chce"),
        tw("we want", "chcemy"),
        tw("you want (pl)", "chcecie"),
        tw("they want", "chcą"),
        tw("I want (full word — watch ę)", "chcę"),
        tw("you want (sg) — not *chcisz", "chcesz"),
        tw("we want — not *chcę", "chcemy"),
        tw("they want — not *chce", "chcą"),
        tw("he/she wants — not *chcę", "chce"),
        tw("you want (pl) — not *chcesz", "chcecie"),
    ]
    # use stays 12 with objects — no again labels
    uses = d.get("use_items") or []
    cleaned = []
    for u in uses:
        pe = (u.get("prompt_en") or "").replace(" (again)", "").replace("(again)", "").strip()
        u = dict(u)
        u["prompt_en"] = pe if pe.startswith("Type:") else f"Type: {pe.replace('Type: ', '')}"
        if "(again)" in pe.lower() or pe in {c.get("prompt_en") for c in cleaned}:
            continue
        cleaned.append(u)
    # ensure 12 unique use with objects if short
    if len(cleaned) < 12:
        extra = [
            pair("I want coffee.", "Chcę kawę."),
            pair("You want tea. (sg)", "Chcesz herbatę."),
            pair("He wants water.", "On chce wodę.", "Chce wodę."),
            pair("We want coffee.", "Chcemy kawę."),
            pair("You want a book. (pl)", "Chcecie książkę."),
            pair("They want tea.", "Chcą herbatę."),
            pair("I want water.", "Chcę wodę."),
            pair("She wants coffee.", "Ona chce kawę.", "Chce kawę."),
            pair("You want coffee. (sg)", "Chcesz kawę."),
            pair("We want tea.", "Chcemy herbatę."),
            pair("They want water.", "Chcą wodę."),
            pair("I want a book.", "Chcę książkę."),
        ]
        seen = {c["prompt_en"] for c in cleaned}
        for e in extra:
            if e["prompt_en"] not in seen:
                cleaned.append(e)
                seen.add(e["prompt_en"])
            if len(cleaned) >= 12:
                break
    d["use_items"] = cleaned[:12]
    save("a1_present_e_esz.json", d)


def rewrite_prep_place() -> None:
    d = load("a1_prep_place.json")
    d["match"] = [
        {"en": "at home / in the house", "pl": "w domu"},
        {"en": "in the shop", "pl": "w sklepie"},
        {"en": "in the city", "pl": "w mieście"},
        {"en": "at school", "pl": "w szkole"},
        {"en": "on the table", "pl": "na stole"},
        {"en": "at the station", "pl": "na dworcu"},
        {"en": "static · not *do domu", "pl": "w domu"},
        {"en": "static · not *do sklepu", "pl": "w sklepie"},
        {"en": "static · not *do miasta", "pl": "w mieście"},
        {"en": "static · not *do szkoły", "pl": "w szkole"},
        {"en": "on the table · not *w stole", "pl": "na stole"},
        {"en": "at the station · not *w dworcu", "pl": "na dworcu"},
    ]
    d["quiz"] = [
        qz("in the house →", "w domu", ["w domu", "do domu", "z domu", "na domu"]),
        qz("in the shop →", "w sklepie", ["w sklepie", "w sklep", "do sklepu", "na sklepie"]),
        qz("in the city →", "w mieście", ["w mieście", "w miasto", "do miasta", "na mieście"]),
        qz("at school →", "w szkole", ["w szkole", "w szkoła", "do szkoły", "na szkole"]),
        qz("on the table →", "na stole", ["na stole", "w stole", "do stołu", "na stół"]),
        qz("at the station →", "na dworcu", ["na dworcu", "w dworcu", "do dworca", "na dworzec"]),
        qz("ERROR — w dom →", "w domu", ["w domu", "w dom", "do domu", "na domu"]),
        qz("ERROR — w miasto →", "w mieście", ["w mieście", "w miasto", "do miasta", "na mieście"]),
        qz("I live at home →", "Mieszkam w domu.", ["Mieszkam w domu.", "Mieszkam do domu.", "Mieszkam z domu.", "Mieszkam."]),
        qz("She is at school →", "Ona jest w szkole.", ["Ona jest w szkole.", "Ona jest do szkoły.", "Ona jest szkoła.", "Jest szkoła."]),
        qz("static place (shop) · not direction →", "w sklepie", ["w sklepie", "do sklepu", "z sklepu", "na sklepie"]),
        qz("on the table · not in →", "na stole", ["na stole", "w stole", "do stołu", "na stół"]),
    ]
    d["type_items"] = [
        tw("at home", "w domu"),
        tw("in the shop", "w sklepie"),
        tw("in the city", "w mieście"),
        tw("at school", "w szkole"),
        tw("on the table", "na stole"),
        tw("at the station", "na dworcu"),
        tw("not *do domu (static home)", "w domu"),
        tw("not *do sklepu (static shop)", "w sklepie"),
        tw("not *w stole (on table)", "na stole"),
        tw("not *w dworcu (at station)", "na dworcu"),
        tw("not *w miasto", "w mieście"),
        tw("not *w szkoła", "w szkole"),
    ]
    # use already varied — strip again if any
    d["use_items"] = [u for u in d["use_items"] if "again" not in (u.get("prompt_en") or "").lower()]
    save("a1_prep_place.json", d)


def rewrite_prep_do_z() -> None:
    d = load("a1_prep_do_z.json")
    d["match"] = [
        {"en": "to home", "pl": "do domu"},
        {"en": "from home", "pl": "z domu"},
        {"en": "to the shop", "pl": "do sklepu"},
        {"en": "from the shop", "pl": "z sklepu"},
        {"en": "to the city", "pl": "do miasta"},
        {"en": "from the city", "pl": "z miasta"},
        {"en": "to school", "pl": "do szkoły"},
        {"en": "from school", "pl": "ze szkoły"},
        {"en": "direction home · not *w domu", "pl": "do domu"},
        {"en": "origin home · not *do domu", "pl": "z domu"},
        {"en": "to shop · not *w sklepie", "pl": "do sklepu"},
        {"en": "from school · not *do szkoły", "pl": "ze szkoły"},
    ]
    d["quiz"] = [
        qz("to the house →", "do domu", ["do domu", "w domu", "z domu", "na domu"]),
        qz("from home →", "z domu", ["z domu", "do domu", "w domu", "na domu"]),
        qz("to the shop →", "do sklepu", ["do sklepu", "w sklepie", "z sklepu", "do sklep"]),
        qz("from the shop →", "z sklepu", ["z sklepu", "do sklepu", "w sklepie", "ze sklep"]),
        qz("to the city →", "do miasta", ["do miasta", "w mieście", "z miasta", "do miasto"]),
        qz("from the city →", "z miasta", ["z miasta", "do miasta", "w mieście", "ze miasto"]),
        qz("to school →", "do szkoły", ["do szkoły", "w szkole", "ze szkoły", "do szkoła"]),
        qz("from school →", "ze szkoły", ["ze szkoły", "do szkoły", "w szkole", "z szkoła"]),
        qz("ERROR — do dom →", "do domu", ["do domu", "do dom", "w domu", "z domu"]),
        qz("direction (shop) · not location →", "do sklepu", ["do sklepu", "w sklepie", "z sklepu", "w sklepu"]),
        qz("origin (home) · not destination →", "z domu", ["z domu", "do domu", "w domu", "na domu"]),
        qz("from school · ze not z →", "ze szkoły", ["ze szkoły", "z szkoły", "do szkoły", "w szkole"]),
    ]
    d["type_items"] = [
        tw("to home", "do domu"),
        tw("from home", "z domu"),
        tw("to the shop", "do sklepu"),
        tw("from the shop", "z sklepu"),
        tw("to the city", "do miasta"),
        tw("from the city", "z miasta"),
        tw("to school", "do szkoły"),
        tw("from school", "ze szkoły"),
        tw("not *w domu (want: to home)", "do domu"),
        tw("not *do domu (want: from home)", "z domu"),
        tw("not *w sklepie (want: to shop)", "do sklepu"),
        tw("not *do szkoły (want: from school)", "ze szkoły"),
    ]
    d["use_items"] = [
        pair("to home", "do domu"),
        pair("from home", "z domu"),
        pair("to the shop", "do sklepu"),
        pair("from the shop", "z sklepu"),
        pair("to the city", "do miasta"),
        pair("from the city", "z miasta"),
        pair("to school", "do szkoły"),
        pair("from school", "ze szkoły"),
        pair("going home (to home)", "do domu"),
        pair("coming from school", "ze szkoły"),
        pair("to the shop (destination)", "do sklepu"),
        pair("from home (origin)", "z domu"),
    ]
    save("a1_prep_do_z.json", d)


def rewrite_questions() -> None:
    d = load("a1_questions.json")
    d["match"] = [
        {"en": "What?", "pl": "Co?"},
        {"en": "Who?", "pl": "Kto?"},
        {"en": "Where?", "pl": "Gdzie?"},
        {"en": "How?", "pl": "Jak?"},
        {"en": "What is this?", "pl": "Co to jest?"},
        {"en": "Who is this?", "pl": "Kto to jest?"},
        {"en": "How are you?", "pl": "Jak się masz?"},
        {"en": "Where do you live?", "pl": "Gdzie mieszkasz?"},
        {"en": "Do you have…?", "pl": "Czy masz…?"},
        {"en": "Where is…?", "pl": "Gdzie jest…?"},
        {"en": "What? · not *Kto?", "pl": "Co?"},
        {"en": "Who? · not *Co?", "pl": "Kto?"},
    ]
    d["quiz"] = [
        qz("What is this? →", "Co to jest?", ["Co to jest?", "Kto to jest?", "Gdzie to jest?", "Jak to jest?"]),
        qz("Who is this? →", "Kto to jest?", ["Kto to jest?", "Co to jest?", "Gdzie to jest?", "Jak się masz?"]),
        qz("How are you? →", "Jak się masz?", ["Jak się masz?", "Gdzie mieszkasz?", "Co to jest?", "Czy masz?"]),
        qz("Where do you live? →", "Gdzie mieszkasz?", ["Gdzie mieszkasz?", "Jak się masz?", "Co to jest?", "Czy masz kawę?"]),
        qz("What? →", "Co?", ["Co?", "Kto?", "Gdzie?", "Jak?"]),
        qz("Who? →", "Kto?", ["Kto?", "Co?", "Gdzie?", "Jak?"]),
        qz("Where? →", "Gdzie?", ["Gdzie?", "Co?", "Kto?", "Jak?"]),
        qz("How? →", "Jak?", ["Jak?", "Gdzie?", "Co?", "Czy?"]),
        qz("Do you have coffee? →", "Czy masz kawę?", ["Czy masz kawę?", "Masz kawę?", "Co masz kawę?", "Gdzie masz kawę?"]),
        qz("Where is mum? →", "Gdzie jest mama?", ["Gdzie jest mama?", "Co jest mama?", "Kto jest mama?", "Jak jest mama?"]),
        qz("ERROR — Co? when asking who →", "Kto?", ["Kto?", "Co?", "Gdzie?", "Jak?"]),
        qz("ERROR — Kto to jest? when asking what →", "Co to jest?", ["Co to jest?", "Kto to jest?", "Gdzie to jest?", "Jak to jest?"]),
    ]
    d["type_items"] = [
        tw("What?", "Co?"),
        tw("Who?", "Kto?"),
        tw("Where?", "Gdzie?"),
        tw("How?", "Jak?"),
        tw("What is this?", "Co to jest?"),
        tw("Who is this?", "Kto to jest?"),
        tw("How are you?", "Jak się masz?"),
        tw("Where do you live?", "Gdzie mieszkasz?"),
        tw("Do you have…? (shell)", "Czy masz…?"),
        tw("Where is…? (shell)", "Gdzie jest…?"),
        tw("What? · not Who?", "Co?"),
        tw("Who? · not What?", "Kto?"),
    ]
    d["use_items"] = [
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
        pair("Do you have tea?", "Czy masz herbatę?"),
        pair("Where is dad?", "Gdzie jest tata?", "Gdzie jest ojciec?"),
    ]
    save("a1_questions.json", d)


def rewrite_negation() -> None:
    d = load("a1_negation.json")
    d["match"] = [
        {"en": "I don't have coffee", "pl": "nie mam kawy"},
        {"en": "I don't have tea", "pl": "nie mam herbaty"},
        {"en": "I don't have water", "pl": "nie mam wody"},
        {"en": "I don't have time", "pl": "nie mam czasu"},
        {"en": "I don't have a book", "pl": "nie mam książki"},
        {"en": "I don't have a house", "pl": "nie mam domu"},
        {"en": "you don't have coffee (sg)", "pl": "nie masz kawy"},
        {"en": "she doesn't have tea", "pl": "nie ma herbaty"},
        {"en": "we don't have water", "pl": "nie mamy wody"},
        {"en": "you don't have a book (sg)", "pl": "nie masz książki"},
        {"en": "not *nie mam kawę", "pl": "nie mam kawy"},
        {"en": "not *nie mam czas", "pl": "nie mam czasu"},
    ]
    d["quiz"] = [
        qz("I don't have coffee →", "Nie mam kawy.", ["Nie mam kawy.", "Nie mam kawę.", "Mam kawy.", "Nie mam kawa."]),
        qz("I don't have time →", "Nie mam czasu.", ["Nie mam czasu.", "Nie mam czas.", "Mam czasu.", "Nie mam czasę."]),
        qz("I don't have tea →", "Nie mam herbaty.", ["Nie mam herbaty.", "Nie mam herbatę.", "Mam herbaty.", "Nie mam herbata."]),
        qz("You don't have coffee (sg) →", "Nie masz kawy.", ["Nie masz kawy.", "Nie masz kawę.", "Nie mam kawy.", "Masz kawy."]),
        qz("She doesn't have a book →", "Ona nie ma książki.", ["Ona nie ma książki.", "Ona nie ma książkę.", "Ona ma książki.", "Nie ma książkę."]),
        qz("ERROR — Nie mam kawę →", "Nie mam kawy.", ["Nie mam kawy.", "Nie mam kawę.", "Mam kawę.", "Nie mam kawa."]),
        qz("I don't have water →", "Nie mam wody.", ["Nie mam wody.", "Nie mam wodę.", "Mam wody.", "Nie mam woda."]),
        qz("I don't have a house →", "Nie mam domu.", ["Nie mam domu.", "Nie mam dom.", "Mam domu.", "Nie mam domem."]),
        qz("We don't have tea →", "Nie mamy herbaty.", ["Nie mamy herbaty.", "Nie mamy herbatę.", "Mamy herbaty.", "Nie mam herbaty."]),
        qz("You don't have time (sg) →", "Nie masz czasu.", ["Nie masz czasu.", "Nie masz czas.", "Nie mam czasu.", "Masz czasu."]),
        qz("ERROR — Nie mam książkę →", "Nie mam książki.", ["Nie mam książki.", "Nie mam książkę.", "Mam książkę.", "Nie ma książki."]),
        qz("she doesn't have tea → form", "nie ma herbaty", ["nie ma herbaty", "nie ma herbatę", "nie mam herbaty", "ma herbaty"]),
    ]
    d["type_items"] = [
        tw("I don't have coffee", "nie mam kawy"),
        tw("I don't have tea", "nie mam herbaty"),
        tw("I don't have water", "nie mam wody"),
        tw("I don't have time", "nie mam czasu"),
        tw("I don't have a book", "nie mam książki"),
        tw("I don't have a house", "nie mam domu"),
        tw("you don't have coffee (sg)", "nie masz kawy"),
        tw("she doesn't have tea", "nie ma herbaty"),
        tw("we don't have water", "nie mamy wody"),
        tw("you don't have a book (sg)", "nie masz książki"),
        tw("not *nie mam kawę", "nie mam kawy"),
        tw("not *nie mam czas", "nie mam czasu"),
    ]
    d["use_items"] = [
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
        pair("He doesn't have a book.", "On nie ma książki.", "Nie ma książki."),
        pair("They don't have coffee.", "Nie mają kawy."),
    ]
    # add nie mają if used
    if "nie mają" not in d.get("teaches_lemmas", []):
        d.setdefault("teaches_lemmas", []).append("nie mają")
        d.setdefault("uses_lemmas", []).append("nie mają")
    save("a1_negation.json", d)


def rewrite_inst() -> None:
    d = load("a1_inst_job.json")
    # type had again — rewrite all type clean
    d["type_items"] = [
        tw("student (m) after Jestem", "studentem"),
        tw("student (f) after Jestem", "studentką"),
        tw("teacher (m)", "nauczycielem"),
        tw("teacher (f)", "nauczycielką"),
        tw("doctor (m)", "lekarzem"),
        tw("doctor (f)", "lekarką"),
        tw("waiter (m)", "kelnerem"),
        tw("waitress (f)", "kelnerką"),
        tw("not *student (m after Jestem)", "studentem"),
        tw("not *nauczyciel (m after Jestem)", "nauczycielem"),
        tw("not *lekarz (m after Jestem)", "lekarzem"),
        tw("not *studentka (f after Jestem — need Inst)", "studentką"),
    ]
    # match already 12 unique jobs — ensure no again
    d["match"] = [m for m in d["match"] if "again" not in (m.get("en") or "").lower()]
    if len(d["match"]) < 12:
        # already 12 from author
        pass
    d["use_items"] = [u for u in d["use_items"] if "again" not in (u.get("prompt_en") or "").lower()]
    save("a1_inst_job.json", d)


def rewrite_present_isz_prompts() -> None:
    """Clean person labels; match already 12 unique (2 verbs) — no change needed unless again sneaks in."""
    d = load("a1_present_e_isz.json")
    # normalize EN labels to clean style
    for m in d.get("match") or []:
        en = m.get("en") or ""
        en = en.replace("you speak (sg)", "you speak (sg)").replace("you like (sg)", "you like (sg)")
        m["en"] = en
    # type_items should cover 6+6 unique without again
    d["type_items"] = [
        tw("I speak", "mówię"),
        tw("you speak (sg)", "mówisz"),
        tw("he/she speaks", "mówi"),
        tw("we speak", "mówimy"),
        tw("you speak (pl)", "mówicie"),
        tw("they speak", "mówią"),
        tw("I like", "lubię"),
        tw("you like (sg)", "lubisz"),
        tw("he/she likes", "lubi"),
        tw("we like", "lubimy"),
        tw("you like (pl)", "lubicie"),
        tw("they like", "lubią"),
    ]
    save("a1_present_e_isz.json", d)


def main() -> None:
    rewrite_present()
    rewrite_present_isz_prompts()
    rewrite_present_esz()
    rewrite_prep_place()
    rewrite_prep_do_z()
    rewrite_questions()
    rewrite_negation()
    rewrite_inst()
    # verify no again
    for f in [
        "a1_present.json",
        "a1_present_e_isz.json",
        "a1_present_e_esz.json",
        "a1_prep_place.json",
        "a1_prep_do_z.json",
        "a1_questions.json",
        "a1_negation.json",
        "a1_inst_job.json",
    ]:
        d = load(f)
        blob = json.dumps(d, ensure_ascii=False).lower()
        n = blob.count("again")
        print(f"  {f}: 'again' count = {n}")


if __name__ == "__main__":
    main()
