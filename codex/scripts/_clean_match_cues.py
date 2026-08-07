# -*- coding: utf-8 -*-
"""Replace cryptic 'not *form' match cues with clean EN labels.

Match is pairing — not error correction. ERROR stays in quiz only.
Volume for -am: 6 mieszkać + 6 czytać.
"""
from __future__ import annotations

import json
from pathlib import Path

RUPL2 = Path(__file__).resolve().parents[2] / "rupl-exp" / "data" / "grammar" / "blocks"


def load(name: str) -> dict:
    return json.loads((RUPL2 / name).read_text(encoding="utf-8"))


def save(name: str, d: dict) -> None:
    (RUPL2 / name).write_text(
        json.dumps(d, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    ens = [m["en"] for m in d.get("match", [])]
    print(name, "match", len(ens), "→", ens[:4], "...")


def tw(prompt: str, answer: str, *accepts: str) -> dict:
    acc = [answer, *accepts]
    seen: set[str] = set()
    out: list[str] = []
    for a in acc:
        if a and a not in seen:
            seen.add(a)
            out.append(a)
    return {"prompt_en": prompt, "mode": "full_word", "answer": answer, "accepts": out}


def main() -> None:
    # --- present: 6 live + 6 read ---
    d = load("a1_present.json")
    d["match"] = [
        {"en": "I live", "pl": "mieszkam"},
        {"en": "you live (sg)", "pl": "mieszkasz"},
        {"en": "he/she lives", "pl": "mieszka"},
        {"en": "we live", "pl": "mieszkamy"},
        {"en": "you live (pl)", "pl": "mieszkacie"},
        {"en": "they live", "pl": "mieszkają"},
        {"en": "I read", "pl": "czytam"},
        {"en": "you read (sg)", "pl": "czytasz"},
        {"en": "he/she reads", "pl": "czyta"},
        {"en": "we read", "pl": "czytamy"},
        {"en": "you read (pl)", "pl": "czytacie"},
        {"en": "they read", "pl": "czytają"},
    ]
    d["note"] = (
        "ONE class (-am). mieszkać + czytać. Match = clean EN→form only "
        "(no error-cues on the match board). ERROR items live in Quiz. No w/na."
    )
    save("a1_present.json", d)

    # --- e_esz: forms + forms with known Acc objects ---
    d = load("a1_present_e_esz.json")
    d["match"] = [
        {"en": "I want", "pl": "chcę"},
        {"en": "you want (sg)", "pl": "chcesz"},
        {"en": "he/she wants", "pl": "chce"},
        {"en": "we want", "pl": "chcemy"},
        {"en": "you want (pl)", "pl": "chcecie"},
        {"en": "they want", "pl": "chcą"},
        {"en": "I want coffee", "pl": "chcę kawę"},
        {"en": "you want tea (sg)", "pl": "chcesz herbatę"},
        {"en": "he wants water", "pl": "chce wodę"},
        {"en": "we want coffee", "pl": "chcemy kawę"},
        {"en": "you want a book (pl)", "pl": "chcecie książkę"},
        {"en": "they want tea", "pl": "chcą herbatę"},
    ]
    d["type_items"] = [
        tw("I want", "chcę"),
        tw("you want (sg)", "chcesz"),
        tw("he/she wants", "chce"),
        tw("we want", "chcemy"),
        tw("you want (pl)", "chcecie"),
        tw("they want", "chcą"),
        tw("I want coffee", "chcę kawę", "Chcę kawę"),
        tw("you want tea (sg)", "chcesz herbatę"),
        tw("we want water", "chcemy wodę"),
        tw("they want coffee", "chcą kawę"),
        tw("she wants a book", "chce książkę"),
        tw("you want coffee (pl)", "chcecie kawę"),
    ]
    save("a1_present_e_esz.json", d)

    # --- prep place ---
    d = load("a1_prep_place.json")
    d["match"] = [
        {"en": "at home", "pl": "w domu"},
        {"en": "in the shop", "pl": "w sklepie"},
        {"en": "in the city", "pl": "w mieście"},
        {"en": "at school", "pl": "w szkole"},
        {"en": "on the table", "pl": "na stole"},
        {"en": "at the station", "pl": "na dworcu"},
        {"en": "I live at home", "pl": "Mieszkam w domu"},
        {"en": "she is in the shop", "pl": "Ona jest w sklepie"},
        {"en": "he is in the city", "pl": "On jest w mieście"},
        {"en": "I am at school", "pl": "Jestem w szkole"},
        {"en": "coffee is on the table", "pl": "Kawa jest na stole"},
        {"en": "we live at home", "pl": "Mieszkamy w domu"},
    ]
    d["type_items"] = [
        tw("at home", "w domu"),
        tw("in the shop", "w sklepie"),
        tw("in the city", "w mieście"),
        tw("at school", "w szkole"),
        tw("on the table", "na stole"),
        tw("at the station", "na dworcu"),
        tw("I live at home", "Mieszkam w domu", "mieszkam w domu"),
        tw("she is in the shop", "Ona jest w sklepie", "Jest w sklepie"),
        tw("I am at school", "Jestem w szkole"),
        tw("he is in the city", "On jest w mieście", "Jest w mieście"),
        tw("coffee is on the table", "Kawa jest na stole"),
        tw("we live at home", "Mieszkamy w domu"),
    ]
    save("a1_prep_place.json", d)

    # --- do/z: 8 unique pairs (honest; no fake padding) ---
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
    ]
    save("a1_prep_do_z.json", d)

    # --- questions ---
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
        {"en": "Do you have coffee?", "pl": "Czy masz kawę?"},
        {"en": "Where is mum?", "pl": "Gdzie jest mama?"},
    ]
    d["type_items"] = [
        tw("What?", "Co?", "co"),
        tw("Who?", "Kto?", "kto"),
        tw("Where?", "Gdzie?", "gdzie"),
        tw("How?", "Jak?", "jak"),
        tw("What is this?", "Co to jest?"),
        tw("Who is this?", "Kto to jest?"),
        tw("How are you?", "Jak się masz?"),
        tw("Where do you live?", "Gdzie mieszkasz?"),
        tw("Do you have coffee?", "Czy masz kawę?"),
        tw("Where is mum?", "Gdzie jest mama?"),
        tw("Do you have tea?", "Czy masz herbatę?"),
        tw("Where is dad?", "Gdzie jest tata?"),
    ]
    save("a1_questions.json", d)

    # --- negation ---
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
        {"en": "he doesn't have coffee", "pl": "nie ma kawy"},
        {"en": "they don't have time", "pl": "nie mają czasu"},
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
        tw("you don't have time (sg)", "nie masz czasu"),
        tw("he doesn't have a book", "nie ma książki"),
        tw("they don't have coffee", "nie mają kawy"),
    ]
    save("a1_negation.json", d)

    # --- inst ---
    d = load("a1_inst_job.json")
    d["type_items"] = [
        tw("student (m)", "studentem"),
        tw("student (f)", "studentką"),
        tw("teacher (m)", "nauczycielem"),
        tw("teacher (f)", "nauczycielką"),
        tw("doctor (m)", "lekarzem"),
        tw("doctor (f)", "lekarką"),
        tw("waiter (m)", "kelnerem"),
        tw("waitress (f)", "kelnerką"),
        tw("I am a student (m) — job word", "studentem"),
        tw("I am a teacher (f) — job word", "nauczycielką"),
        tw("he is a doctor — job word", "lekarzem"),
        tw("she is a waitress — job word", "kelnerką"),
    ]
    save("a1_inst_job.json", d)

    # sanity: no not * in match
    for name in [
        "a1_present.json",
        "a1_present_e_esz.json",
        "a1_prep_place.json",
        "a1_prep_do_z.json",
        "a1_questions.json",
        "a1_negation.json",
    ]:
        d = load(name)
        for m in d["match"]:
            if "not" in m["en"].lower() or "*" in m["en"]:
                raise SystemExit(f"still cryptic in {name}: {m}")
    print("OK — all match cues clean")


if __name__ == "__main__":
    main()
