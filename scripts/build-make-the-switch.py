#!/usr/bin/env python3
"""
Prepare the Make the Switch downloads and part illustrations.

Reads the STL files and RP2040 firmware from maketheswitch/, copies them to
public/make-the-switch/files/ as downloads, bundles everything into one zip,
renders a shaded illustration of each printed part, and measures each part's
bounding box and cylindrical features so the build guide can state real
dimensions instead of guesses.

Usage:  python3 scripts/build-make-the-switch.py
Idempotent: safe to re-run.
"""

import json
import math
import os
import shutil
import struct
import zipfile
from collections import defaultdict

from PIL import Image, ImageDraw

SRC = "maketheswitch"
STL_DIR = os.path.join(SRC, "USB Switch Holder STL Files")
FW_DIR = os.path.join(SRC, "RP2040 Files")
OUT = "public/make-the-switch"
FILES_OUT = os.path.join(OUT, "files")
IMG_OUT = os.path.join(OUT, "img")
DATA_OUT = os.path.join("lib", "make-the-switch-parts.json")

# STL filename fragment -> (slug, display name)
PARTS = [
    ("Base", "base", "Base"),
    ("Button Housing", "button-housing", "Button Housing"),
    ("Cap holder", "cap-holder", "Cap Holder"),
    ("Bolts", "bolts", "Bolts"),
    ("Cap", "cap", "Cap"),
]

RENDER_SIZE = 900
SUPERSAMPLE = 2


def read_stl(path):
    """Parse a binary STL into a list of (normal, (v0, v1, v2))."""
    with open(path, "rb") as fh:
        fh.read(80)
        count = struct.unpack("<I", fh.read(4))[0]
        tris = []
        for _ in range(count):
            data = struct.unpack("<12fH", fh.read(50))
            n = data[0:3]
            v = (data[3:6], data[6:9], data[9:12])
            tris.append((n, v))
    return tris


def bbox(tris):
    lo = [float("inf")] * 3
    hi = [float("-inf")] * 3
    for _, verts in tris:
        for p in verts:
            for i in range(3):
                lo[i] = min(lo[i], p[i])
                hi[i] = max(hi[i], p[i])
    return lo, hi


def cylinders(tris, tol=0.08):
    """
    Find Z-axis-aligned cylindrical surfaces and report their diameters.

    Triangles whose normals are nearly horizontal belong to vertical walls.
    Grouping those by shared vertices and fitting a circle to each group's XY
    points identifies holes and posts; the normal direction relative to the
    fitted centre says which it is.
    """
    walls = [(n, v) for n, v in tris if abs(n[2]) < 0.2]
    if not walls:
        return []

    # union-find over quantised vertices so one wall surface becomes one group
    parent = {}

    def key(p):
        return (round(p[0], 3), round(p[1], 3), round(p[2], 3))

    def find(a):
        while parent[a] != a:
            parent[a] = parent[parent[a]]
            a = parent[a]
        return a

    def union(a, b):
        ra, rb = find(a), find(b)
        if ra != rb:
            parent[ra] = rb

    for _, verts in walls:
        ks = [key(p) for p in verts]
        for k in ks:
            parent.setdefault(k, k)
        union(ks[0], ks[1])
        union(ks[1], ks[2])

    groups = defaultdict(list)
    for idx, (n, verts) in enumerate(walls):
        groups[find(key(verts[0]))].append(idx)

    found = []
    for members in groups.values():
        if len(members) < 8:
            continue
        pts, norms, zs = [], [], []
        for i in members:
            n, verts = walls[i]
            for p in verts:
                pts.append((p[0], p[1]))
                zs.append(p[2])
            norms.append(n)
        cx = sum(p[0] for p in pts) / len(pts)
        cy = sum(p[1] for p in pts) / len(pts)
        radii = [math.hypot(p[0] - cx, p[1] - cy) for p in pts]
        r = sum(radii) / len(radii)
        if r <= 0.3:
            continue
        spread = max(abs(x - r) for x in radii) / r
        if spread > tol:
            continue  # not a circle

        # normals pointing back toward the axis mean we are inside a bore
        inward = 0
        for n, verts in (walls[i] for i in members):
            mx = sum(p[0] for p in verts) / 3 - cx
            my = sum(p[1] for p in verts) / 3 - cy
            if mx * n[0] + my * n[1] < 0:
                inward += 1
        found.append({
            "diameter": round(r * 2, 2),
            "centre": [round(cx, 2), round(cy, 2)],
            "height": round(max(zs) - min(zs), 2),
            "kind": "hole" if inward > len(members) / 2 else "post",
        })

    found.sort(key=lambda f: (f["kind"], f["diameter"]))
    return found


def render(tris, path):
    """Orthographic shaded view, painter's algorithm, transparent background."""
    size = RENDER_SIZE * SUPERSAMPLE
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    az, el = math.radians(35), math.radians(28)
    ca, sa, ce, se = math.cos(az), math.sin(az), math.cos(el), math.sin(el)

    def project(p):
        x, y, z = p
        rx = x * ca - y * sa
        ry = x * sa + y * ca
        sx = rx
        sy = ry * se - z * ce
        depth = ry * ce + z * se
        return sx, sy, depth

    # View direction in model space, so back faces can be culled before drawing.
    # Without this, interior surfaces paint over the outside of the part.
    view = (sa * ce, ca * ce, se)

    projected = []
    for n, verts in tris:
        if n[0] * view[0] + n[1] * view[1] + n[2] * view[2] <= 0:
            continue
        pts = [project(p) for p in verts]
        projected.append((sum(p[2] for p in pts) / 3, pts, n))

    xs = [p[0] for _, pts, _ in projected for p in pts]
    ys = [p[1] for _, pts, _ in projected for p in pts]
    minx, maxx, miny, maxy = min(xs), max(xs), min(ys), max(ys)
    span = max(maxx - minx, maxy - miny) or 1
    pad = size * 0.08
    scale = (size - 2 * pad) / span
    ox = pad + (span - (maxx - minx)) / 2 * scale - minx * scale
    oy = pad + (span - (maxy - miny)) / 2 * scale - miny * scale

    light = (-0.35, -0.55, 0.76)
    base = (234, 88, 12)  # orange-600, matching the site

    projected.sort(key=lambda t: t[0])
    for _, pts, n in projected:
        nl = math.sqrt(n[0] ** 2 + n[1] ** 2 + n[2] ** 2) or 1
        lam = (n[0] * light[0] + n[1] * light[1] + n[2] * light[2]) / nl
        shade = 0.38 + 0.62 * max(0.0, lam)
        colour = tuple(int(40 + (c - 40) * shade) for c in base) + (255,)
        poly = [(p[0] * scale + ox, p[1] * scale + oy) for p in pts]
        draw.polygon(poly, fill=colour)

    img = img.resize((RENDER_SIZE, RENDER_SIZE), Image.LANCZOS)
    img.save(path, optimize=True)
    return os.path.getsize(path)


def main():
    os.makedirs(FILES_OUT, exist_ok=True)
    os.makedirs(IMG_OUT, exist_ok=True)

    stls = os.listdir(STL_DIR)
    parts = []

    print("Parts:")
    for fragment, slug, name in PARTS:
        match = next((f for f in stls if fragment.lower() in f.lower()), None)
        if not match:
            raise SystemExit(f"no STL matching {fragment!r}")
        src = os.path.join(STL_DIR, match)

        download = f"{slug}.stl"
        shutil.copyfile(src, os.path.join(FILES_OUT, download))

        tris = read_stl(src)
        lo, hi = bbox(tris)
        dims = [round(hi[i] - lo[i], 1) for i in range(3)]
        feats = cylinders(tris)

        png = f"part-{slug}.png"
        png_bytes = render(tris, os.path.join(IMG_OUT, png))

        holes = [f for f in feats if f["kind"] == "hole"]
        print(f"  {name:<15} {dims[0]:>5.1f} x {dims[1]:>5.1f} x {dims[2]:>5.1f} mm   "
              f"{len(tris):>5} tris   bores: {sorted({h['diameter'] for h in holes}) or '-'}")

        parts.append({
            "slug": slug,
            "name": name,
            "stl": f"/make-the-switch/files/{download}",
            "image": f"/make-the-switch/img/{png}",
            "dimensions": {"x": dims[0], "y": dims[1], "z": dims[2]},
            "triangles": len(tris),
            "bores": sorted({h["diameter"] for h in holes}),
        })

    print("\nFirmware:")
    fw = []
    for name in sorted(os.listdir(FW_DIR)):
        srcp = os.path.join(FW_DIR, name)
        if os.path.isfile(srcp):
            shutil.copyfile(srcp, os.path.join(FILES_OUT, name))
            fw.append(name)
            print(f"  {name}  ({os.path.getsize(srcp):,} bytes)")

    lib_src = os.path.join(FW_DIR, "lib")
    lib_files = []
    if os.path.isdir(lib_src):
        dest = os.path.join(FILES_OUT, "lib")
        if os.path.isdir(dest):
            shutil.rmtree(dest)
        shutil.copytree(lib_src, dest)
        for root, _, names in os.walk(lib_src):
            for nm in names:
                lib_files.append(os.path.relpath(os.path.join(root, nm), FW_DIR))
        print(f"  lib/ ({len(lib_files)} files)")

    # one archive with everything, so a maker can grab the lot
    bundle = os.path.join(FILES_OUT, "make-the-switch-bravo.zip")
    with zipfile.ZipFile(bundle, "w", zipfile.ZIP_DEFLATED) as z:
        for _, slug, name in PARTS:
            z.write(os.path.join(FILES_OUT, f"{slug}.stl"), f"STL/{name}.stl")
        for name in fw:
            z.write(os.path.join(FW_DIR, name), f"RP2040/{name}")
        for rel in lib_files:
            z.write(os.path.join(FW_DIR, rel), f"RP2040/{rel}")
    print(f"\nBundle: {bundle} ({os.path.getsize(bundle):,} bytes)")

    json.dump({"parts": parts}, open(DATA_OUT, "w"), indent=2)
    open(DATA_OUT, "a").write("\n")
    print(f"Data:   {DATA_OUT}")


if __name__ == "__main__":
    main()
