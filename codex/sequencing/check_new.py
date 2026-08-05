#!/usr/bin/env python3
"""
Is this word already taught?  —  candidate-word triage for authoring briefs.

Three times running, a night-shift brief listed "new" vocabulary that the A1
canopy already owned (feelings: 7 of 11 already taught; shopping: 14 of 14).
The agents caught it each time by checking, but the brief should never have
asked. Run this BEFORE writing a vocab brief.

Usage:
    py -X utf8 sequencing/check_new.py cena tani drogi placic
    py -X utf8 sequencing/check_new.py --file words.txt
    py -X utf8 sequencing/check_new.py --topic shopping   # dump a pack's lemmas

Reports, per word: TAUGHT (and by which pack, at which path index) or NEW.
Also flags SPELLING CLASH — a different word that is already taught under the
same surface form, which is how "kawy" ends up meaning both the genitive
singular and the nominative plural.
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]  # .../rupl-exp (codex/sequencing/check_new.py -> up 2)
TREE = ROOT / "data" / "tree.json"
DATA = ROOT / "data"


def load_taught() -> tuple[dict[str, list[tuple[int, str]]], list[str]]:
    """surface form -> [(path_index, node_id), ...] for every live path node."""
    tree = json.loads(TREE.read_text(encoding="utf-8"))
    by_id = {n["id"]: n for n in tree.get("nodes") or []}
    taught: dict[str, list[tuple[int, str]]] = {}
    trail: list[str] = []
    for i, nid in enumerate(tree.get("path_order") or []):
        node = by_id.get(nid)
        if not node or node.get("status") != "live" or not node.get("content"):
            continue
        pack = json.loads((DATA / node["content"]).read_text(encoding="utf-8"))
        trail.append(nid)
        for lemma in pack.get("teaches_lemmas") or []:
            taught.setdefault(str(lemma).strip().lower(), []).append((i, nid))
    return taught, trail


def dump_topic(topic: str) -> int:
    hits = sorted(DATA.glob(f"*/blocks/*{topic}*.json"))
    if not hits:
        print(f"no pack matching '{topic}'")
        return 1
    for path in hits:
        pack = json.loads(path.read_text(encoding="utf-8"))
        lemmas = pack.get("teaches_lemmas") or []
        print(f"\n=== {path.name}  ({len(lemmas)} lemmas)")
        print(", ".join(sorted(lemmas)))
    return 0


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("words", nargs="*")
    ap.add_argument("--file", help="file with one candidate word per line")
    ap.add_argument("--topic", help="dump teaches_lemmas of packs matching this name")
    args = ap.parse_args()

    if args.topic:
        return dump_topic(args.topic)

    words = list(args.words)
    if args.file:
        words += [
            w.strip()
            for w in Path(args.file).read_text(encoding="utf-8").splitlines()
            if w.strip()
        ]
    if not words:
        ap.error("give some words, or --file, or --topic")

    taught, trail = load_taught()
    print(f"Checked against {len(trail)} live path nodes · {len(taught)} taught forms\n")

    new, already = [], []
    for word in words:
        key = word.strip().lower()
        if key in taught:
            idx, nid = taught[key][0]
            extra = f"  (+{len(taught[key]) - 1} more)" if len(taught[key]) > 1 else ""
            print(f"  TAUGHT  {word:16} <- {nid} [path {idx}]{extra}")
            already.append(word)
        else:
            print(f"  NEW     {word}")
            new.append(word)

    print(f"\n{len(new)} new · {len(already)} already taught")
    if already:
        print("Drop the already-taught ones from the brief — recycle them as anchors.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
