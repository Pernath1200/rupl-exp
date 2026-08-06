#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""verify_pack.py — the pre-wiring self-check the B2 digest keeps describing.

The auditor (codex/sequencing/audit.py) only compares TAG LISTS. It cannot see
a word that appears in a learner-facing string but was never declared, it cannot
see a duplicate quiz choice, and it cannot see a builder unit code printed on a
slide. Every one of those has been a real defect in this build.

This tool reads a pack JSON plus the position-aware pool for that node and
reports, per pack:

  * TOKEN LEAKS   - every Polish token in an authored learner-facing string that
                    is neither in the pool nor in this pack's teaches_lemmas.
  * UNIT CODES    - /(a1|a2|b1|b2)_[a-z_]+/ anywhere outside `note`.
  * DEAD TAGS     - teaches_lemmas / uses_lemmas declared but never used.
  * STAGE CHECKS  - match row count + duplicate pl/en; duplicate quiz prompts,
                    answers not among their own choices, duplicate choices;
                    duplicate type answers; duplicate use answers; a Uzycie item
                    that is verbatim a Pisanie item.

`note` is excluded from the token scan on purpose: a note legitimately names
what it fences.

Usage:
    py -X utf8 codex/scripts/verify_pack.py <pack.json> --pool <pool.md>

Exit code is non-zero if anything in the FAIL class is found.
"""

import argparse
import json
import re
import sys
import unicodedata

# Strings that are apparatus, not Polish material: stage labels, gender marks,
# case names sanctioned for body_pl, and the English the learner actually reads.
GENDER_MARKS = {"m", "ż", "n", "ż.", "m.", "n."}

# Case / grammar metalanguage allowed in body_pl and title_pl by AGENTS.md.
METALANGUAGE = {
    "mianownik", "dopełniacz", "celownik", "biernik", "narzędnik",
    "miejscownik", "wołacz", "liczba", "mnoga", "pojedyncza", "rodzina",
    "rodziny", "czasownik", "przymiotnik", "rzeczownik", "przyimek",
    "słowa", "które", "się", "zmieniają", "czas", "przeszły", "przyszły",
    "teraźniejszy", "aspekt", "tryb", "przypadek", "odmiana", "końcówka",
    "końcówki", "forma", "formy", "osoba", "liczebnik", "zaimek",
}

TOKEN_RE = re.compile(r"[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]+", re.UNICODE)
UNIT_CODE_RE = re.compile(r"\b(?:a1|a2|b1|b2|c1)_[a-z_]+\b")

# Fields whose contents the learner reads.
LEARNER_FIELDS = (
    "title", "title_en", "title_pl", "body", "body_pl", "prompt", "prompt_en",
    "en", "pl", "answer", "explain", "hint", "label", "text",
)


def is_polish_token(tok):
    """True if the token carries Polish-only letters or is a known Polish word
    shape. We cannot tell 'ma' (Polish) from 'ma' (nothing) by spelling alone,
    so the caller resolves ambiguity against the pool: anything IN the pool is
    fine by definition, and anything not in the pool gets reported for a human
    to look at. That is the correct bias for this tool."""
    return bool(tok)


def norm(s):
    return unicodedata.normalize("NFC", s).strip().lower()


def walk_strings(obj, path="", skip_keys=("note",)):
    """Yield (path, key, string) for every learner-facing string."""
    if isinstance(obj, dict):
        for k, v in obj.items():
            if k in skip_keys:
                continue
            yield from walk_strings(v, "%s.%s" % (path, k), skip_keys)
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            yield from walk_strings(v, "%s[%d]" % (path, i), skip_keys)
    elif isinstance(obj, str):
        yield (path, obj)


def load_pool(pool_path):
    """Parse make_pool.py's markdown output into a lemma set + structure set."""
    text = open(pool_path, encoding="utf-8").read()
    lemmas, structures = set(), set()
    m = re.search(r"## Lemmas \(\d+\)\n(.+?)(?:\n##|\Z)", text, re.S)
    if m:
        for item in m.group(1).split(","):
            item = norm(item)
            if item:
                lemmas.add(item)
    m = re.search(r"## Structures \(\d+\)\n(.+?)(?:\n##|\Z)", text, re.S)
    if m:
        for item in m.group(1).split(","):
            structures.add(item.strip().strip("`"))
    return lemmas, structures


def tokens_of(pool_lemmas, teaches):
    """Every single-word token reachable from a declared lemma or chunk."""
    out = set()
    for phrase in list(pool_lemmas) + list(teaches):
        for tok in TOKEN_RE.findall(phrase):
            out.add(norm(tok))
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("pack")
    ap.add_argument("--pool", required=True)
    ap.add_argument("--english", default="codex/scripts/english_allow.txt",
                    help="newline list of English words to ignore in the token scan")
    args = ap.parse_args()

    full = json.load(open(args.pack, encoding="utf-8"))
    # Only these carry learner-facing text. id / tree_node / sequencing.node_id
    # legitimately contain the unit code, and the tag lists are builder data —
    # scanning them produced four false positives on already-shipped packs
    # during calibration, which is exactly what calibration is for.
    pack = {k: full[k] for k in
            ("title", "title_en", "intro", "match", "quiz", "type_items", "use_items")
            if k in full}
    pool_lemmas, pool_structures = load_pool(args.pool)
    teaches = [norm(x) for x in full.get("teaches_lemmas", [])]

    try:
        english = {norm(w) for w in open(args.english, encoding="utf-8").read().split()}
    except OSError:
        english = set()

    allowed = tokens_of(pool_lemmas, teaches) | METALANGUAGE | english | GENDER_MARKS

    fails, warns = [], []

    # ---- token leaks -----------------------------------------------------
    leaks = {}
    for path, s in walk_strings(pack):
        for tok in TOKEN_RE.findall(s):
            t = norm(tok)
            if t in allowed:
                continue
            leaks.setdefault(t, []).append(path)
    if leaks:
        for tok in sorted(leaks):
            warns.append("TOKEN  %-18s %s" % (tok, leaks[tok][0]))

    # ---- builder unit codes on learner surfaces --------------------------
    for path, s in walk_strings(pack):
        for m in UNIT_CODE_RE.finditer(s):
            fails.append("UNITCODE  %s in %s" % (m.group(0), path))

    # ---- dead tags -------------------------------------------------------
    body = " ".join(s for _, s in walk_strings(pack))
    body_tokens = {norm(t) for t in TOKEN_RE.findall(body)}
    for lem in full.get("teaches_lemmas", []):
        toks = {norm(t) for t in TOKEN_RE.findall(lem)}
        if not toks <= body_tokens:
            fails.append("DEADTAG teaches_lemmas: %s never used" % lem)
    for lem in full.get("uses_lemmas", []):
        toks = {norm(t) for t in TOKEN_RE.findall(lem)}
        if not toks <= body_tokens:
            warns.append("DEADTAG uses_lemmas: %s never used" % lem)

    # ---- uses_lemmas must be in the pool ---------------------------------
    for lem in full.get("uses_lemmas", []):
        if norm(lem) not in pool_lemmas:
            fails.append("USES_LEMMA not in pool: %s" % lem)
    for sid in full.get("uses_structures", []):
        if sid not in pool_structures and sid not in full.get("teaches_structures", []):
            fails.append("USES_STRUCTURE not in pool: %s" % sid)

    # ---- stage checks ----------------------------------------------------
    match = pack.get("match", [])
    if len(match) != 12:
        fails.append("MATCH has %d rows, contract says exactly 12" % len(match))
    for side in ("pl", "en"):
        seen = {}
        for row in match:
            v = row.get(side)
            if v in seen:
                fails.append("MATCH duplicate %s: %s" % (side, v))
            seen[v] = True

    quiz = pack.get("quiz", [])
    seen_prompt, seen_answer = set(), set()
    for i, q in enumerate(quiz):
        p, a, ch = q.get("prompt"), q.get("answer"), q.get("choices", [])
        if p in seen_prompt:
            fails.append("QUIZ duplicate prompt #%d: %s" % (i + 1, p))
        seen_prompt.add(p)
        # NOT a fail: 18 shipped packs repeat a quiz answer, and a
        # discrimination unit over a six-form paradigm cannot avoid it.
        # AGENTS.md's "no duplicates within a stage" bars duplicate ITEMS,
        # which the prompt check above catches.
        if a in seen_answer:
            warns.append("QUIZ repeated answer #%d: %s" % (i + 1, a))
        seen_answer.add(a)
        if a not in ch:
            fails.append("QUIZ #%d answer %r not among its own choices" % (i + 1, a))
        if len(set(ch)) != len(ch):
            fails.append("QUIZ #%d duplicate choice: %s" % (i + 1, ch))

    type_items = pack.get("type_items", [])
    seen = set()
    for t in type_items:
        a = t.get("answer")
        if a in seen:
            fails.append("TYPE duplicate answer: %s" % a)
        seen.add(a)
    type_answers = seen

    use_items = pack.get("use_items", [])
    seen = set()
    for u in use_items:
        a = u.get("answer")
        if a in seen:
            fails.append("USE duplicate answer: %s" % a)
        seen.add(a)
        if a in type_answers:
            fails.append("USE item repeats a Pisanie item verbatim: %s" % a)

    # ---- report ----------------------------------------------------------
    print("== %s ==" % full.get("id"))
    print("   pool: %d lemmas / %d structures · teaches %d lemmas"
          % (len(pool_lemmas), len(pool_structures), len(teaches)))
    for w in warns:
        print("   warn  " + w)
    for f in fails:
        print("   FAIL  " + f)
    print("   %d FAIL · %d warn" % (len(fails), len(warns)))
    print("   (warn TOKEN lines are for human eyes — English prose lands here too;")
    print("    read every one, they are where the real leaks hide.)")
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
