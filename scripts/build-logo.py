#!/usr/bin/env python3
"""
Produce a transparent, trimmed PNG of the Bravo logo from the source JPEG.

The source is a JPEG, so it carries an opaque white box around the wordmark.
That box shows as a white rectangle anywhere the logo sits on a colour, and it
defeats the footer's brightness-0/invert treatment. Here the background is
removed by flooding inwards from the edges, so white *inside* the artwork --
the speech bubble's face -- is kept.
"""

from collections import deque

from PIL import Image

SRC = "public/images/bravo-logo.jpg"
DEST = "public/images/bravo-logo.png"
TOLERANCE = 18  # how far from pure white still counts as background


def main():
    im = Image.open(SRC).convert("RGBA")
    w, h = im.size
    px = im.load()

    def is_bg(x, y):
        r, g, b, _ = px[x, y]
        return r >= 255 - TOLERANCE and g >= 255 - TOLERANCE and b >= 255 - TOLERANCE

    # flood fill inwards from the border; interior white is never reached
    seen = bytearray(w * h)
    q = deque()
    for x in range(w):
        for y in (0, h - 1):
            if is_bg(x, y) and not seen[y * w + x]:
                seen[y * w + x] = 1
                q.append((x, y))
    for y in range(h):
        for x in (0, w - 1):
            if is_bg(x, y) and not seen[y * w + x]:
                seen[y * w + x] = 1
                q.append((x, y))

    while q:
        x, y = q.popleft()
        px[x, y] = (255, 255, 255, 0)
        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h and not seen[ny * w + nx] and is_bg(nx, ny):
                seen[ny * w + nx] = 1
                q.append((nx, ny))

    cleared = sum(seen)
    im = im.crop(im.getbbox())  # trim the empty margin the JPEG carried
    im.save(DEST, optimize=True)

    print(f"  source      {w} x {h}")
    print(f"  transparent {cleared:,} px cleared ({cleared / (w * h):.0%} of the image)")
    print(f"  trimmed to  {im.size[0]} x {im.size[1]}")
    print(f"  written     {DEST}")


if __name__ == "__main__":
    main()
