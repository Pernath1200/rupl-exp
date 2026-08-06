#!/usr/bin/env python3
"""
Phase 2: read-only sequencing auditor (RUPL spine path).

Walks path_order, accumulates teaches_*, checks uses_* ⊆ available ∪ glue.
Writes sequencing-audit.json + SEQUENCING-AUDIT.md

Spec: codex/SEQUENCING.md

Merged into rupl-exp 2026-08-06 (was the sibling repo rupl-codex, which had
no git remote — moved in-repo so a single clone is self-sufficient).
"""
from __future__ import annotations

import argparse
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]  # .../rupl-exp (codex/sequencing/audit.py -> up 2)
SEQ_DIR = Path(__file__).resolve().parent
DEFAULT_TREE = ROOT / "data" / "tree.json"
DEFAULT_SIDECAR = SEQ_DIR / "tags.json"
DEFAULT_OUT_DIR = ROOT / "audit"

# Catalogue from SEQUENCING.md §5
STRUCTURE_CATALOGUE = {
    "to_jest",
    "poss_nom",
    "byc_present",
    "byc_adj",
    "zgoda",
    "miec_present",
    "miec_acc",
    "present",
    "present_am",
    "present_e_isz",
    "present_e_esz",
    "prep_w_loc",
    "prep_do_gen",
    "prep_z_gen",
    "motion_chunk",
    "gen_endings",
    "prep_place",
    "negation",
    "question",
    "nazywam_sie",
    "existential_jest",
    "inst_identity",
    "social_chunk",
    "can_inf",
    "present_uje",
    "comparative",
    "ten_ta_to",
    "past_byc",
    "weather_chunk",
    "time_past_chunk",
    "past_ac",
    "past_rest",
    "smalltalk_chunk",
    "plural_nom",
    "past_plural",
    "gen_pl",
    "numbers_gen",
    "inst_z",
    "situation_chunk",
    "jechac",
    "inst_transport",
    "chodzic",
    "sie_reflexive",
    "bedzie",
    "musiec",
    "aspect_past",
    "dat_chunks",
    "o_loc",
    "ordinals_time",
    "superlative",
    "imperative",
    "questions2",
    "case_gym2",
    "prep_review2",
    "wrapup_func",
    "perf_future",
    "conditional_sg",
    "past_isc",
    "motion_prefixed",
    "virile_reco",
    "virile_nom",
    "virile_past",
    "conditional_pl",
    "dative_sg",
    "dative_pron",
    "ktory_cases",
    "zeby",
    "imperative_rule",
    "adverb_comp",
    "vocative_chunk",
    "conjunctions",
    "copular_future",
    "fem_dat_loc",
    "adj_acc",
    "adj_gen",
    "adj_loc",
    "adj_inst",
    "adj_dat",
    "pron_acc",
    "pron_prep",
    "question_cases",
    "ze_clauses",
}

GLUE_LEMMAS = {
    "tak",
    "nie",
    "ja",
    "ty",
    "on",
    "ona",
    "ono",
    "my",
    "wy",
    "oni",
    "one",
    "to",
    "anna",
    "piotr",
    "maria",
    "jan",
    "ola",
    "adam",
}


def norm_lemma(s: str) -> str:
    t = str(s).lower().strip()
    for ch in ".!?,;:\"'()":
        t = t.replace(ch, " ")
    t = " ".join(t.split())
    if "/" in t:
        t = t.split("/")[0].strip()
    if "(" in t:
        t = t.split("(")[0].strip()
    return t


def load_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def resolve_pack_path(content: str | None, domain: str) -> Path | None:
    if not content:
        return None
    # tree content like "grammar/blocks/a1_gender.json" relative to rupl-exp/data
    # or "blocks/..." relative to app
    # rupl-exp is canonical (2026-07-30); rupl2/3 are frozen archives — never read.
    c = content.replace("\\", "/").lstrip("./")
    candidates = [
        ROOT / "data" / c,
    ]
    base = Path(c).name
    if domain == "grammar":
        candidates.append(ROOT / "data" / "grammar" / "blocks" / base)
    else:
        candidates.append(ROOT / "data" / "vocab" / "blocks" / base)
    for p in candidates:
        if p.is_file():
            return p
    return None


def tags_from_pack(pack: dict) -> dict:
    """Effective tags: pack fields ∪ item-level roll-up."""
    teaches_s = set(pack.get("teaches_structures") or [])
    uses_s = set(pack.get("uses_structures") or [])
    teaches_l = {norm_lemma(x) for x in (pack.get("teaches_lemmas") or []) if x}
    uses_l = {norm_lemma(x) for x in (pack.get("uses_lemmas") or []) if x}

    item_structs: set[str] = set()
    item_lemmas: set[str] = set()
    for s in pack.get("sentences") or []:
        for t in s.get("structures") or []:
            item_structs.add(t)
        for lem in s.get("lemmas") or []:
            item_lemmas.add(norm_lemma(lem))
    for b in pack.get("blocks") or []:
        for it in b.get("items") or []:
            for t in it.get("structures") or []:
                item_structs.add(t)
            for lem in it.get("lemmas") or []:
                item_lemmas.add(norm_lemma(lem))

    uses_s |= item_structs
    uses_l |= item_lemmas

    has_any = bool(
        teaches_s
        or uses_s
        or teaches_l
        or uses_l
        or pack.get("teaches_structures") is not None
        or pack.get("uses_structures") is not None
    )
    return {
        "teaches_structures": teaches_s,
        "uses_structures": uses_s,
        "teaches_lemmas": teaches_l,
        "uses_lemmas": uses_l,
        "item_structures": item_structs,
        "item_lemmas": item_lemmas,
        "has_tags": has_any
        or "teaches_structures" in pack
        or "uses_structures" in pack
        or "teaches_lemmas" in pack
        or "uses_lemmas" in pack,
        "pack_id": pack.get("id"),
    }


def tags_from_sidecar(sidecar: dict, pack_id: str, node_id: str) -> dict | None:
    packs = sidecar.get("packs") or {}
    row = packs.get(pack_id)
    if not row:
        for r in packs.values():
            if r.get("node_id") == node_id:
                row = r
                break
    if not row:
        return None
    return {
        "teaches_structures": set(row.get("teaches_structures") or []),
        "uses_structures": set(row.get("uses_structures") or []),
        "teaches_lemmas": {norm_lemma(x) for x in (row.get("teaches_lemmas") or [])},
        "uses_lemmas": {norm_lemma(x) for x in (row.get("uses_lemmas") or [])},
        "item_structures": set(),
        "item_lemmas": set(),
        "has_tags": True,
        "pack_id": row.get("pack_id") or pack_id,
    }


def is_glue(lemma: str) -> bool:
    if lemma in GLUE_LEMMAS:
        return True
    # single capitalized-looking name already lowercased — short given names list only
    return False


def suggest_structure(sid: str) -> str:
    hints = {
        "prep_w_loc": "Rewrite without w+loc, or add prep-place teach earlier on the path.",
        "prep_z_gen": "Rewrite without z+gen origin, or teach prep_z_gen earlier.",
        "miec_acc": "Move after a1_miec, or drop Acc objects until taught.",
        "miec_present": "Move after a1_miec or teach mieć forms earlier.",
        "byc_adj": "Drop predicative adjectives until zgoda/byc_adj is taught.",
        "zgoda": "Move after a1_gender_check, or drop attributive adjectives.",
        "present": "Move after a1_present, or use only być/mieć already taught.",
        "poss_nom": "Move after a1_poss_simple, or drop mój/twój.",
        "to_jest": "Move after a1_gender, or drop To jest frames.",
        "byc_present": "Move after a1_hello, or drop jestem/jest forms.",
        "nazywam_sie": "Remove Nazywam się until a dedicated teach exists.",
        "existential_jest": "Use to_jest instead, or teach existential later.",
        "inst_identity": "Park until a1_inst_job (instrumental identity).",
        "social_chunk": "Keep in social trunk only, or teach social_chunk earlier.",
    }
    return hints.get(
        sid,
        f"Unlock `{sid}` earlier on the path, or remove it from this pack's uses.",
    )


def suggest_lemma(lem: str) -> str:
    return (
        f"Teach lemma `{lem}` on an earlier path node (teaches_lemmas), "
        "or remove it from prompts/answers, or add to glue only if truly glue."
    )


def audit(tree_path: Path, sidecar_path: Path | None) -> dict:
    tree = load_json(tree_path)
    path_order = tree.get("path_order") or []
    nodes_by_id = {n["id"]: n for n in tree.get("nodes") or []}
    sidecar = load_json(sidecar_path) if sidecar_path and sidecar_path.is_file() else None

    findings: list[dict] = []
    fid = 0

    def add(sev: str, code: str, **kwargs):
        nonlocal fid
        fid += 1
        findings.append(
            {
                "id": f"SEQ-{fid:03d}",
                "severity": sev,
                "code": code,
                **kwargs,
            }
        )

    unlocked_s: set[str] = set()
    unlocked_l: set[str] = set()
    trail: list[dict] = []
    nodes_audited = 0

    for path_index, node_id in enumerate(path_order):
        node = nodes_by_id.get(node_id)
        if not node:
            add(
                "error",
                "pack_load_failed",
                node_id=node_id,
                pack_id=None,
                domain=None,
                path_index=path_index,
                missing={"kind": "node", "id": node_id},
                available_sample=sorted(unlocked_s)[:12],
                suggest="Node id on path_order missing from tree.nodes.",
                item_ref=None,
            )
            continue

        # Planned spine nodes (e.g. the A2 draft) have no content yet by
        # design — count them, don't error on them.
        if node.get("status") == "planned":
            continue

        domain = node.get("domain") or "?"
        content = node.get("content")
        pack_path = resolve_pack_path(content, domain)
        pack = None
        tags = None

        if pack_path:
            try:
                pack = load_json(pack_path)
                tags = tags_from_pack(pack)
            except Exception as e:
                add(
                    "error",
                    "pack_load_failed",
                    node_id=node_id,
                    pack_id=None,
                    domain=domain,
                    path_index=path_index,
                    missing={"kind": "file", "id": str(pack_path)},
                    available_sample=[],
                    suggest=f"Could not read pack: {e}",
                    item_ref=None,
                )
                continue
        else:
            add(
                "error",
                "pack_load_failed",
                node_id=node_id,
                pack_id=None,
                domain=domain,
                path_index=path_index,
                missing={"kind": "content", "id": content or ""},
                available_sample=[],
                suggest="No content file found for live path node.",
                item_ref=None,
            )
            continue

        pack_id = tags.get("pack_id") or (Path(pack_path).stem if pack_path else node_id)

        # Sidecar fill if pack has empty tag lists but sidecar has data
        if sidecar and (
            not tags["has_tags"]
            or (
                not tags["teaches_structures"]
                and not tags["uses_structures"]
                and not tags["teaches_lemmas"]
                and not tags["uses_lemmas"]
            )
        ):
            sc = tags_from_sidecar(sidecar, pack_id, node_id)
            if sc:
                tags = sc
                pack_id = sc.get("pack_id") or pack_id

        nodes_audited += 1

        if not tags["has_tags"]:
            add(
                "warn",
                "missing_tags",
                node_id=node_id,
                pack_id=pack_id,
                domain=domain,
                path_index=path_index,
                missing={"kind": "tags", "id": pack_id},
                available_sample=sorted(unlocked_s)[:12],
                suggest="Run apply_tags.py or author teaches_*/uses_* on this pack.",
                item_ref=None,
            )

        if domain == "grammar" and not tags["teaches_structures"] and not tags["teaches_lemmas"]:
            # gyms may intentionally teach nothing
            if "gym" not in node_id and "gym" not in pack_id:
                add(
                    "warn",
                    "teaches_empty_grammar",
                    node_id=node_id,
                    pack_id=pack_id,
                    domain=domain,
                    path_index=path_index,
                    missing={"kind": "teaches", "id": pack_id},
                    available_sample=[],
                    suggest="Grammar teach node has empty teaches_*; confirm intentional.",
                    item_ref=None,
                )

        # unknown structure ids
        for sid in sorted(tags["teaches_structures"] | tags["uses_structures"]):
            if sid not in STRUCTURE_CATALOGUE:
                add(
                    "warn",
                    "unknown_structure_id",
                    node_id=node_id,
                    pack_id=pack_id,
                    domain=domain,
                    path_index=path_index,
                    missing={"kind": "structure", "id": sid},
                    available_sample=sorted(STRUCTURE_CATALOGUE),
                    suggest="Add to SEQUENCING.md catalogue or fix typo.",
                    item_ref=None,
                )

        # item tags not in pack declaration (if pack declared uses)
        pack_uses_s = set(pack.get("uses_structures") or [])
        if pack_uses_s and tags["item_structures"] - pack_uses_s:
            for sid in sorted(tags["item_structures"] - pack_uses_s):
                add(
                    "warn",
                    "item_tag_not_in_pack",
                    node_id=node_id,
                    pack_id=pack_id,
                    domain=domain,
                    path_index=path_index,
                    missing={"kind": "structure", "id": sid},
                    available_sample=sorted(pack_uses_s),
                    suggest="Add structure to pack uses_structures (roll-up).",
                    item_ref=None,
                )

        available_s = unlocked_s | tags["teaches_structures"]
        available_l = unlocked_l | tags["teaches_lemmas"]

        for sid in sorted(tags["uses_structures"]):
            if sid not in available_s:
                add(
                    "error",
                    "structure_not_unlocked",
                    node_id=node_id,
                    pack_id=pack_id,
                    domain=domain,
                    path_index=path_index,
                    missing={"kind": "structure", "id": sid},
                    available_sample=sorted(available_s)[:16],
                    suggest=suggest_structure(sid),
                    item_ref=None,
                )

        for lem in sorted(tags["uses_lemmas"]):
            if not lem:
                continue
            if is_glue(lem):
                continue
            if lem not in available_l:
                add(
                    "error",
                    "lemma_not_unlocked",
                    node_id=node_id,
                    pack_id=pack_id,
                    domain=domain,
                    path_index=path_index,
                    missing={"kind": "lemma", "id": lem},
                    available_sample=sorted(available_l)[:16],
                    suggest=suggest_lemma(lem),
                    item_ref=None,
                )

        # --- Richness warns (pool / focus / recycle model) ---
        # Structure spread: vocab Zdanie / frames should use >1 structure when pool is rich
        pool_s_before = set(unlocked_s)  # before this node's teach
        sent_structs = tags.get("item_structures") or set()
        pack_uses_s = tags["uses_structures"]
        if domain == "vocab" and (sent_structs or pack.get("sentences") or pack.get("practice") == "frames"):
            used_s = sent_structs or pack_uses_s
            if len(pool_s_before) >= 3 and len(used_s) == 1:
                add(
                    "warn",
                    "structure_spread_thin",
                    node_id=node_id,
                    pack_id=pack_id,
                    domain=domain,
                    path_index=path_index,
                    missing={"kind": "structure_spread", "id": next(iter(used_s))},
                    available_sample=sorted(pool_s_before)[:12],
                    suggest="Sentence bank uses only one structure while pool has ≥3 — add recycle frames (to_jest/poss/być/miec/present).",
                    item_ref=None,
                )
            if len(pool_s_before) >= 2 and len(used_s) == 0 and pack.get("sentences"):
                add(
                    "warn",
                    "structure_spread_thin",
                    node_id=node_id,
                    pack_id=pack_id,
                    domain=domain,
                    path_index=path_index,
                    missing={"kind": "structure_spread", "id": "(none)"},
                    available_sample=sorted(pool_s_before)[:12],
                    suggest="sentences[] present but no structure tags — tag items for pool recycling.",
                    item_ref=None,
                )

        # Grammar recycle: use_lemmas should not be only this pack's brand-new list
        # when earlier lemma pool is large (skip pure morphology form lists)
        if domain == "grammar" and "gym" not in pack_id and path_index >= 3:
            prior_l = set(unlocked_l)
            uses_l = tags["uses_lemmas"]
            teaches_l = tags["teaches_lemmas"]
            # content words = uses minus pure function forms if any
            if len(prior_l) >= 15 and uses_l:
                overlap = uses_l & prior_l
                only_new = uses_l - prior_l - teaches_l
                # if almost no overlap with prior pool, warn
                if len(overlap) < 2 and len(uses_l) >= 4:
                    add(
                        "warn",
                        "lemma_recycle_thin",
                        node_id=node_id,
                        pack_id=pack_id,
                        domain=domain,
                        path_index=path_index,
                        missing={"kind": "lemma_recycle", "id": pack_id},
                        available_sample=sorted(prior_l)[:12],
                        suggest="Grammar pack barely recycles earlier lemmas — add Dom/food nouns to use/type items.",
                        item_ref=None,
                    )

        # advance unlock after check
        unlocked_s |= tags["teaches_structures"]
        unlocked_l |= tags["teaches_lemmas"]

        trail.append(
            {
                "path_index": path_index,
                "node_id": node_id,
                "pack_id": pack_id,
                "domain": domain,
                "teaches_structures": sorted(tags["teaches_structures"]),
                "teaches_lemmas_n": len(tags["teaches_lemmas"]),
                "uses_structures": sorted(tags["uses_structures"]),
                "unlocked_structures_after": sorted(unlocked_s),
            }
        )

    errors = sum(1 for f in findings if f["severity"] == "error")
    warns = sum(1 for f in findings if f["severity"] == "warn")
    infos = sum(1 for f in findings if f["severity"] == "info")
    missing_tags = sum(1 for f in findings if f["code"] == "missing_tags")

    return {
        "version": 1,
        "spec": "codex/SEQUENCING.md",
        "generated_at": datetime.now(timezone.utc).astimezone().isoformat(timespec="seconds"),
        "path_source": str(tree_path.relative_to(ROOT)).replace("\\", "/")
        if tree_path.is_relative_to(ROOT)
        else str(tree_path),
        "path": path_order,
        "summary": {
            "nodes_audited": nodes_audited,
            "errors": errors,
            "warns": warns,
            "infos": infos,
            "missing_tags": missing_tags,
        },
        "findings": findings,
        "trail": trail,
    }


def write_md(report: dict, path: Path) -> None:
    s = report["summary"]
    lines = [
        f"# Sequencing audit · {report['generated_at'][:10]}",
        "",
        f"**Spec:** `{report['spec']}`  ",
        f"**Path source:** `{report['path_source']}`  ",
        f"**Nodes audited:** {s['nodes_audited']} · **errors:** {s['errors']} · **warns:** {s['warns']} · **missing_tags:** {s['missing_tags']}",
        "",
    ]

    errors = [f for f in report["findings"] if f["severity"] == "error"]
    warns = [f for f in report["findings"] if f["severity"] == "warn"]

    lines.append("## Errors")
    lines.append("")
    if not errors:
        lines.append("_None._")
        lines.append("")
    else:
        by_node: dict[str, list] = {}
        for f in errors:
            by_node.setdefault(f.get("node_id") or "?", []).append(f)
        for nid, flist in by_node.items():
            pack = flist[0].get("pack_id") or ""
            lines.append(f"### `{nid}` ({pack})")
            lines.append("")
            for f in flist:
                miss = f.get("missing") or {}
                mid = miss.get("id", "")
                lines.append(
                    f"- **[{f['code']}]** `{mid}` — {f.get('suggest', '')}"
                )
            lines.append("")

    lines.append("## Warnings")
    lines.append("")
    if not warns:
        lines.append("_None._")
        lines.append("")
    else:
        for f in warns:
            miss = (f.get("missing") or {}).get("id", "")
            lines.append(
                f"- **{f['node_id']}** [{f['code']}] `{miss}` — {f.get('suggest', '')}"
            )
        lines.append("")

    lines.append("## Path unlock trail")
    lines.append("")
    lines.append("| i | node_id | teaches_structures | teach lem n | uses_structures |")
    lines.append("|---|---------|--------------------|-------------|-----------------|")
    for row in report.get("trail") or []:
        ts = ", ".join(f"`{x}`" for x in row.get("teaches_structures") or []) or "—"
        us = ", ".join(f"`{x}`" for x in row.get("uses_structures") or []) or "—"
        lines.append(
            f"| {row['path_index']} | `{row['node_id']}` | {ts} | {row.get('teaches_lemmas_n', 0)} | {us} |"
        )
    lines.append("")

    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main(argv=None) -> int:
    ap = argparse.ArgumentParser(description="RUPL sequencing auditor (Phase 2)")
    ap.add_argument(
        "--tree",
        type=Path,
        default=DEFAULT_TREE,
        help="rupl-exp tree.json with path_order",
    )
    ap.add_argument(
        "--sidecar",
        type=Path,
        default=DEFAULT_SIDECAR,
        help="optional tags.json sidecar",
    )
    ap.add_argument(
        "--out-dir",
        type=Path,
        default=DEFAULT_OUT_DIR,
        help="output directory for reports",
    )
    ap.add_argument(
        "--warn-only",
        action="store_true",
        help="exit 0 even when errors present",
    )
    args = ap.parse_args(argv)

    if not args.tree.is_file():
        print(f"tree not found: {args.tree}", file=sys.stderr)
        return 2

    report = audit(args.tree, args.sidecar if args.sidecar.is_file() else None)
    args.out_dir.mkdir(parents=True, exist_ok=True)
    json_path = args.out_dir / "sequencing-audit.json"
    md_path = args.out_dir / "SEQUENCING-AUDIT.md"
    json_path.write_text(
        json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    write_md(report, md_path)

    # Pre-merge (sibling-repo layout) this block mirrored the report into
    # rupl-exp/audit. Now that codex lives inside rupl-exp, DEFAULT_OUT_DIR
    # already IS rupl-exp/audit — writing here again would just overwrite the
    # same two files with themselves. Removed 2026-08-06.

    s = report["summary"]
    print(
        f"audited {s['nodes_audited']} nodes · errors {s['errors']} · warns {s['warns']}"
    )
    print(f"json -> {json_path}")
    print(f"md   -> {md_path}")

    if s["errors"] and not args.warn_only:
        return 1
    return 0


if __name__ == "__main__":
    # Path.is_relative_to is 3.9+; polyfill for safety
    if not hasattr(Path, "is_relative_to"):

        def _is_relative_to(self, other):
            try:
                self.relative_to(other)
                return True
            except ValueError:
                return False

        Path.is_relative_to = _is_relative_to  # type: ignore

    raise SystemExit(main())
