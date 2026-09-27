#!/usr/bin/env python3
"""
Publish Bravo University course exports and build the search index.

Source exports live in bravo_university/ as single-file HTML decks with every
screenshot inlined as base64, which makes them ~8 MB each and forces a full
download before the first slide paints. This script extracts those images to
files (deduplicating repeats), writes the slimmed page to
public/bravo-university/<number>/, and builds a search index of every slide.

Usage:  python3 scripts/build-bravo-university.py
Idempotent: safe to re-run; it rewrites the published copies from source.
"""

import base64
import hashlib
import json
import os
import re
import shutil
import sys

SRC_DIR = "bravo_university"
OUT_DIR = "public/bravo-university"
INDEX_PATH = os.path.join(OUT_DIR, "search-index.json")

# Exit control injected into every published deck. The exports have no way out
# except the browser back button. Fixed at top-left: the deck's own pager sits
# bottom-right, and the player goes fullscreen on documentElement, so a fixed
# element stays visible there too.
EXIT_BUTTON = """
<style>
.bu-exit{position:fixed;z-index:999999;top:max(12px,env(safe-area-inset-top));
left:max(12px,env(safe-area-inset-left));display:inline-flex;align-items:center;gap:8px;
min-height:44px;padding:10px 18px;border-radius:999px;border:1px solid rgba(255,255,255,.35);
background:rgba(17,17,17,.72);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);
color:#fff;font:600 14px/1 ui-sans-serif,system-ui,-apple-system,sans-serif;
text-decoration:none;box-shadow:0 2px 10px rgba(0,0,0,.35);
transition:background-color .2s,border-color .2s,transform .2s}
.bu-exit:hover{background:#ea580c;border-color:#ea580c;transform:translateY(-1px)}
.bu-exit:focus-visible{outline:3px solid #fb923c;outline-offset:2px}
.bu-exit svg{flex:none}
@media print{.bu-exit{display:none}}
</style>
<a class="bu-exit" href="/bravo-university" aria-label="Exit this lesson and return to Bravo University">
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
Exit Lesson</a>
"""

BLOCK_END = re.compile(r"</(?:div|p|li|h[1-6]|section|td|tr)>", re.I)
TAG = re.compile(r"<[^>]+>")
WS = re.compile(r"\s+")


def clean(fragment: str) -> str:
    """Tag-strip an HTML fragment into collapsed plain text."""
    text = TAG.sub(" ", fragment)
    for entity, char in (("&amp;", "&"), ("&lt;", "<"), ("&gt;", ">"),
                         ("&quot;", '"'), ("&#x27;", "'"), ("&nbsp;", " "),
                         ("&middot;", "·"), ("&mdash;", "—")):
        text = text.replace(entity, char)
    return WS.sub(" ", text).strip()


def slide_lines(fragment: str) -> list:
    """Split a slide's HTML into the visible text of its block elements."""
    parts = BLOCK_END.split(fragment)
    out, seen = [], set()
    for part in parts:
        line = clean(part)
        if line and line not in seen:
            seen.add(line)
            out.append(line)
    return out


def publish(src_path: str) -> dict:
    raw = open(src_path, encoding="utf-8", errors="replace").read()

    title_match = re.search(r"<title[^>]*>(.*?)</title>", raw, re.S)
    full_title = clean(title_match.group(1)) if title_match else os.path.basename(src_path)

    num_match = re.search(r"Bravo University\s+(\d+)", full_title) or re.search(r"(\d{3})", os.path.basename(src_path))
    if not num_match:
        raise SystemExit(f"cannot determine course number for {src_path}")
    number = num_match.group(1)

    # "Bravo University 102: Why Does Bravo Have 2 Different Interfaces?" -> the part after the colon
    short_title = full_title.split(":", 1)[1].strip() if ":" in full_title else full_title

    course_dir = os.path.join(OUT_DIR, number)
    img_dir = os.path.join(course_dir, "img")
    if os.path.isdir(img_dir):
        shutil.rmtree(img_dir)
    os.makedirs(img_dir, exist_ok=True)

    seen, counter = {}, [0]

    def extract(match):
        ext, data = match.group(1), match.group(2)
        blob = base64.b64decode(data)
        key = hashlib.sha1(blob).hexdigest()
        if key not in seen:
            counter[0] += 1
            name = f"{counter[0]:02d}." + ("jpg" if ext == "jpeg" else ext)
            open(os.path.join(img_dir, name), "wb").write(blob)
            seen[key] = name
        return "img/" + seen[key]

    page = re.sub(r"data:image/([a-z]+);base64,([A-Za-z0-9+/=]+)", extract, raw)

    # images now load from this origin rather than from data: URIs
    page = page.replace("img-src data: blob:", "img-src 'self' data: blob:")

    if "bu-exit" not in page:
        if "</body>" in page:
            page = page.replace("</body>", EXIT_BUTTON + "</body>", 1)
        else:
            page += EXIT_BUTTON

    open(os.path.join(course_dir, "index.html"), "w", encoding="utf-8").write(page)

    slides = []
    for m in re.finditer(r'<section[^>]*class="[^"]*deck-slide[^"]*"[^>]*id="(\d+)"[^>]*>(.*?)</section>', page, re.S):
        n, body = int(m.group(1)), m.group(2)
        lines = slide_lines(body)
        # drop the repeated footer chrome ("Bravo University · 101 ...", page numbers)
        lines = [l for l in lines if not re.fullmatch(r"\d+", l) and not l.startswith("Bravo University ·")]
        if not lines:
            continue
        heading = next((l for l in lines if 3 <= len(l) <= 70), lines[0][:70])
        slides.append({"n": n, "title": heading, "text": " ".join(lines)})

    print(f"  {number}: {len(seen)} images, {len(slides)} slides, "
          f"{len(raw):,} -> {len(page):,} chars ({len(page)/len(raw):.1%})")

    return {"number": number, "title": short_title, "href": f"/bravo-university/{number}/", "slides": slides}


def main():
    if not os.path.isdir(SRC_DIR):
        raise SystemExit(f"missing {SRC_DIR}/")
    sources = sorted(f for f in os.listdir(SRC_DIR) if f.lower().endswith(".html"))
    if not sources:
        raise SystemExit(f"no .html exports in {SRC_DIR}/")

    print(f"Publishing {len(sources)} course(s):")
    courses = [publish(os.path.join(SRC_DIR, f)) for f in sources]
    courses.sort(key=lambda c: c["number"])

    os.makedirs(OUT_DIR, exist_ok=True)
    json.dump(courses, open(INDEX_PATH, "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
    size = os.path.getsize(INDEX_PATH)
    print(f"Search index: {INDEX_PATH} ({size:,} bytes, "
          f"{sum(len(c['slides']) for c in courses)} slides)")


if __name__ == "__main__":
    main()
