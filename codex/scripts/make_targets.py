# -*- coding: utf-8 -*-
"""Generate the authorable target wordlists for the B1-capped vocab build.

Outputs
  rue-exp  : Oxford A1-B1 words not taught anywhere in RUE           (band, word, pos)
  rupl-exp : Oxford A1-B1 words whose EN gloss RUPL does not carry   (band, word, pos)
             + appendix: high-frequency Polish words the Oxford route would miss
"""
import csv, json, glob, os, re, collections

OX = r"C:/Users/ADMIN/AppData/Local/Temp/ox5k.csv"
RUE = r"C:/Users/ADMIN/Documents/projects/rue-exp"
RUPL = r"C:/Users/ADMIN/Documents/projects/rupl-exp"
SCRATCH = os.path.dirname(os.path.abspath(__file__))
ORDER = ["a1", "a2", "b1", "b2", "c1"]
TARGET_BANDS = ("a1", "a2", "b1")

# ---- Oxford inventory, lowest band per word ---------------------------
band, pos_of = {}, collections.defaultdict(set)
for row in csv.DictReader(open(OX, encoding="utf-8")):
    w, lv, p = row["word"].strip().lower(), row["level"].strip().lower(), row["pos"].strip()
    if lv not in ORDER:
        continue
    pos_of[w].add(p)
    if w not in band or ORDER.index(lv) < ORDER.index(band[w]):
        band[w] = lv
inventory = [(band[w], w) for w in band if band[w] in TARGET_BANDS]
print(f"Oxford A1-B1 inventory: {len(inventory):,} words")

# ---- RUE: every token appearing anywhere in any pack ------------------
def all_tokens(paths):
    s = set()
    for p in paths:
        try:
            d = json.load(open(p, encoding="utf-8"))
        except Exception:
            continue
        for tok in re.findall(r"[a-z]+(?:'[a-z]+)?", json.dumps(d, ensure_ascii=False).lower()):
            s.add(tok)
    return s

rue_seen = all_tokens(glob.glob(os.path.join(RUE, "data/vocab/blocks/*.json"))) | \
           all_tokens(glob.glob(os.path.join(RUE, "data/grammar/**/*.json"), recursive=True))
rue_gap = sorted([(b, w) for b, w in inventory if w not in rue_seen],
                 key=lambda x: (ORDER.index(x[0]), x[1]))
print(f"RUE gap: {len(rue_gap):,}")

# ---- RUPL: which Oxford concepts does its EN gloss already carry? -----
# Sweep English-BEARING fields only — the whole JSON blob would be polluted by
# Polish. Grammar packs are included: RUPL's carry title_en/en/explain too, and
# omitting them measured RUPL more harshly than RUE (883 vs 1,549 — the whole
# difference was method, not content).
EN_FIELDS = ("en", "title_en", "gloss", "explain", "note")

def en_tokens(paths):
    s = set()
    for p in paths:
        try:
            d = json.load(open(p, encoding="utf-8"))
        except Exception:
            continue
        def walk(o):
            if isinstance(o, dict):
                for k, v in o.items():
                    if k in EN_FIELDS and isinstance(v, str):
                        for t in re.findall(r"[a-z]+", re.sub(r"\([^)]*\)", " ", v.lower())):
                            s.add(t)
                    else:
                        walk(v)
            elif isinstance(o, list):
                for v in o:
                    walk(v)
        walk(d)
    return s

rupl_en = en_tokens(glob.glob(os.path.join(RUPL, "data/vocab/blocks/*.json"))) | \
          en_tokens(glob.glob(os.path.join(RUPL, "data/grammar/**/*.json"), recursive=True))
print(f"RUPL distinct EN gloss tokens: {len(rupl_en):,}")

rupl_gap = sorted([(b, w) for b, w in inventory if w not in rupl_en],
                  key=lambda x: (ORDER.index(x[0]), x[1]))
print(f"RUPL gap (Oxford concepts unglossed): {len(rupl_gap):,}")
for lv in TARGET_BANDS:
    n = sum(1 for b, _ in rupl_gap if b == lv)
    tot = sum(1 for b, _ in inventory if b == lv)
    print(f"   {lv.upper()}: {tot-n}/{tot} covered, {n} to author")

def write(path, rows, header):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8", newline="") as fh:
        fh.write(header)
        for b, w in rows:
            fh.write(f"{b}\t{w}\t{'/'.join(sorted(pos_of[w]))}\n")
    print(f"wrote {path} ({len(rows):,} rows)")

write(os.path.join(RUE, "codex/vocab/oxford-b1-gap.tsv"), rue_gap,
      "# Oxford A1-B1 words not present anywhere in rue-exp packs.\n"
      "# Floor, not exact: a word counts as present if it appears in ANY pack field,\n"
      "# including notes and distractors. True gap is larger. band\\tword\\tpos\n")

write(os.path.join(RUPL, "codex/vocab/oxford-b1-gap.tsv"), rupl_gap,
      "# Oxford A1-B1 concepts with no matching EN gloss in rupl-exp vocab packs.\n"
      "# These are the concepts to realise in Polish. Cross-check each against Polish\n"
      "# frequency before authoring - concept frequency differs between languages.\n"
      "# band\\tword\\tpos\n")

# ---- appendix: what the Oxford route would miss for Polish -----------
missing_pl = []
with open(os.path.join(SCRATCH, "missing_pl.txt"), encoding="utf-8") as f:
    for line in f:
        r, w = line.rstrip("\n").split("\t")
        if int(r) <= 1000:
            missing_pl.append((int(r), w))
ap = os.path.join(RUPL, "codex/vocab/pl-frequency-crosscheck.tsv")
with open(ap, "w", encoding="utf-8", newline="") as fh:
    fh.write("# Untaught Polish lemmas inside the top 1,000 by corpus frequency.\n"
             "# Cross-check for the Oxford route: any word here that the translated\n"
             "# Oxford inventory does not produce is a Polish-specific gap.\n"
             "# Source is OpenSubtitles - expect conversational skew and some junk.\n"
             "# rank\\tlemma\n")
    for r, w in missing_pl:
        fh.write(f"{r}\t{w}\n")
print(f"wrote {ap} ({len(missing_pl):,} rows)")
