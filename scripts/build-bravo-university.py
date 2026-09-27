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
