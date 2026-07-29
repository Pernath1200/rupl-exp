#!/usr/bin/env python3
"""Copy content from rupl2/rupl3 and build spine-first unified tree for rupl-exp."""
from __future__ import annotations

import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PROJECTS = ROOT.parent
RUPL2 = PROJECTS / "rupl2"
RUPL3 = PROJECTS / "rupl3"
SPINE_SRC = PROJECTS / "pl-a1-spine.json"
CODEX = PROJECTS / "rupl-codex" / "codex.json"

OUT_G = ROOT / "data" / "grammar" / "blocks"
OUT_V = ROOT / "data" / "vocab" / "blocks"
OUT_TREE = ROOT / "data" / "tree.json"
OUT_SPINE = ROOT / "data" / "spine.json"

# Fallback tree_part when codex has no row yet
GRAMMAR_ROOT_TO_PART = {
    "forms": "forms",
    "verbs": "verbs",
    "sentence": "sentence",
    "chunks": "chunks",
    "links": "links",
    "tap_root": "tap_root",
}
VOCAB_ID_TO_PART = {
    "trunk_social_a1": "trunk",
    "trunk_be_have_a1": "trunk",
    "trunk_want_like_a1": "trunk",
    "trunk_prepositions_a1": "trunk",
    "trunk_adjectives_a1": "trunk",
    "trunk_can_a1": "trunk",
    "trunk_there_time_a1": "trunk",
    "trunk_verbs_daily_a1": "trunk",
    "leaf_home_family": "home_family",
    "leaf_food_a1": "food_shopping",
    "leaf_freetime_a1": "free_time",
    "leaf_city_a1": "travel_city",
    "leaf_places": "travel_city",
    "leaf_work_a1": "work_routine",
    "leaf_health_a1": "health_body",
    "leaf_body_a1": "self_body",
    "leaf_shopping_a1": "food_shopping",
    "leaf_school_a1": "knowledge",
    "leaf_time_a1": "free_time",
}


def load_codex_index():
    """app_ref node_id -> { unit_id, tree_part, label_pl }"""
    idx = {}
    if not CODEX.is_file():
        return idx
    data = load(CODEX)
    for u in data.get("units", []):
        for ref in u.get("app_ref") or []:
            idx[ref] = {
                "codex_unit": u["unit_id"],
                "tree_part": u.get("tree_part"),
                "label_pl": u.get("label_pl"),
            }
    return idx


def load(p: Path):
    return json.loads(p.read_text(encoding="utf-8"))


def copy_blocks():
    OUT_G.mkdir(parents=True, exist_ok=True)
    OUT_V.mkdir(parents=True, exist_ok=True)
    for src, dst in ((RUPL2 / "data" / "blocks", OUT_G), (RUPL3 / "data" / "blocks", OUT_V)):
        for f in src.glob("*.json"):
            shutil.copy2(f, dst / f.name)
    print(f"grammar blocks: {len(list(OUT_G.glob('*.json')))}")
    print(f"vocab blocks:   {len(list(OUT_V.glob('*.json')))}")


def build_spine():
    spine = load(SPINE_SRC)
    spine.setdefault("urls", {})
    spine["urls"]["rupl_exp_local"] = "http://localhost:8096/"
    spine["urls"]["rupl2_local"] = "http://localhost:8095/"
    spine["urls"]["rupl3_local"] = "http://localhost:8094/"
    spine["note"] = (
        "Exp zigzag: both sides resolve in-app on :8096. "
        "Stable apps remain on 8094/8095. " + (spine.get("note") or "")
    )
    OUT_SPINE.write_text(json.dumps(spine, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return spine


def node_from_grammar(n: dict, partner: str | None, codex_idx: dict) -> dict:
    content = n.get("content")
    if content and not str(content).startswith("grammar/"):
        content = "grammar/" + str(content).lstrip("./")
    cx = codex_idx.get(n["id"], {})
    tree_part = cx.get("tree_part") or GRAMMAR_ROOT_TO_PART.get(n.get("root") or "", "forms")
    out = {
        "id": n["id"],
        "domain": "grammar",
        "label": n.get("label"),
        "label_en": n.get("label_en"),
        "kind": n.get("kind", "topic"),
        "root": n.get("root"),
        "tree_part": tree_part,
        "codex_unit": cx.get("codex_unit"),
        "levels": n.get("levels", ["A1"]),
        "status": n.get("status", "planned"),
        "foundation": n.get("foundation", False),
        "content": content,
        "practice": "grammar",
        "note": n.get("note"),
        "unit_id": n.get("unit_id"),
        "case_tags": n.get("case_tags") or [],
        "spine_steps": n.get("spine_steps") or [],
        "pedagogy": n.get("pedagogy") or "teach",
        "partner_id": partner,
    }
    if n.get("spine_support_of"):
        out["spine_support_of"] = n["spine_support_of"]
    return {k: v for k, v in out.items() if v is not None and v != []}


def node_from_vocab(n: dict, partner: str | None, codex_idx: dict) -> dict:
    content = n.get("content")
    if content and not str(content).startswith("vocab/"):
        content = "vocab/" + str(content).lstrip("./")
    cx = codex_idx.get(n["id"], {})
    tree_part = (
        cx.get("tree_part")
        or VOCAB_ID_TO_PART.get(n["id"])
        or ("trunk" if n.get("kind") == "trunk" else "free_time")
    )
    out = {
        "id": n["id"],
        "domain": "vocab",
        "label": n.get("label"),
        "kind": n.get("kind", "leaf"),
        "parent": n.get("parent"),
        "tree_part": tree_part,
        "codex_unit": cx.get("codex_unit"),
        "levels": n.get("levels", ["A1"]),
        "status": n.get("status", "planned"),
        "content": content,
        "practice": "vocab",
        "note": n.get("note"),
        "unit_id": n.get("unit_id"),
        "case_tags": n.get("case_tags") or [],
        "spine_steps": n.get("spine_steps") or [],
        "pedagogy": n.get("pedagogy") or "use",
        "partner_id": partner,
    }
    return {k: v for k, v in out.items() if v is not None and v != []}


def build_tree(spine: dict):
    g_tree = load(RUPL2 / "data" / "tree.json")
    v_tree = load(RUPL3 / "data" / "tree.json")
    codex_idx = load_codex_index()
    g_by_id = {n["id"]: n for n in g_tree.get("nodes", [])}
    v_by_id = {n["id"]: n for n in v_tree.get("nodes", [])}

    # partner maps from spine
    g2v: dict[str, str] = {}
    v2g: dict[str, str] = {}
    path_order: list[str] = []
    for step in spine.get("steps", []):
        gs = (step.get("rupl2") or {}).get("node_id")
        vs = (step.get("rupl3") or {}).get("node_id")
        gstatus = (step.get("rupl2") or {}).get("status")
        vstatus = (step.get("rupl3") or {}).get("status")
        if gs and gstatus not in ("skip", None) and vs and vstatus not in ("skip", None):
            g2v[gs] = vs
            v2g[vs] = gs
        if gs and gstatus == "live":
            path_order.append(gs)
        if vs and vstatus == "live":
            path_order.append(vs)

    # Also include live grammar gyms after their support targets (not on spine)
    for n in g_tree.get("nodes", []):
        if n.get("status") == "live" and n["id"] not in path_order:
            support = n.get("spine_support_of")
            if support and support in path_order:
                i = path_order.index(support) + 1
                path_order.insert(i, n["id"])
            else:
                path_order.append(n["id"])

    # Dedupe path_order preserving first occurrence
    deduped: list[str] = []
    seen_path: set[str] = set()
    for nid in path_order:
        if nid in seen_path:
            continue
        seen_path.add(nid)
        deduped.append(nid)
    path_order = deduped

    nodes: list[dict] = []
    seen: set[str] = set()

    def add_g(nid: str):
        if nid in seen or nid not in g_by_id:
            return
        seen.add(nid)
        nodes.append(node_from_grammar(g_by_id[nid], g2v.get(nid), codex_idx))

    def add_v(nid: str):
        if nid in seen or nid not in v_by_id:
            return
        seen.add(nid)
        nodes.append(node_from_vocab(v_by_id[nid], v2g.get(nid), codex_idx))

    for nid in path_order:
        if nid in g_by_id:
            add_g(nid)
        elif nid in v_by_id:
            add_v(nid)

    # Author "full canopy" ids listed separately
    all_vocab_live = [
        n["id"]
        for n in v_tree.get("nodes", [])
        if n.get("status") == "live" and n.get("kind") in ("trunk", "leaf")
    ]
    all_grammar_live = [n["id"] for n in g_tree.get("nodes", []) if n.get("status") == "live"]

    tree = {
        "version": 1,
        "app": "rupl-exp",
        "title": "Polski · drzewo eksperymentalne",
        "levels": ["A1", "A2", "B1", "B2"],
        "levels_locked": ["A2", "B1", "B2"],
        "default_direction": "en_to_pl",
        "path_order": path_order,
        "path_order_note": "Spine teach→use pairs; grammar gyms inserted after support targets.",
        "spine": "data/spine.json",
        "show_full_canopy_ids": {
            "grammar": all_grammar_live,
            "vocab": all_vocab_live,
        },
        "roots": g_tree.get("roots", []),
        "tap_root": g_tree.get("tap_root"),
        "nodes": nodes,
        "synced_from": {
            "rupl2": str(RUPL2),
            "rupl3": str(RUPL3),
            "spine": str(SPINE_SRC),
            "codex": str(CODEX) if CODEX.is_file() else None,
        },
        "topology_ref": "../rupl-codex/topology.json",
    }
    OUT_TREE.write_text(json.dumps(tree, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"tree nodes: {len(nodes)} path: {len(path_order)}")
    for p in path_order:
        print(" ", p)


def main():
    assert RUPL2.is_dir() and RUPL3.is_dir(), "rupl2 and rupl3 must exist"
    copy_blocks()
    spine = build_spine()
    build_tree(spine)
    print("OK →", ROOT)


if __name__ == "__main__":
    main()
