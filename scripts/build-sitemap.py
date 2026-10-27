#!/usr/bin/env python3
"""
Generate robots.txt and sitemap.xml listing one canonical URL per page.

Run after scripts/build-bravo-university.py so new courses are included.
"""

import json
import os
from datetime import date

ORIGIN = "https://talkwithbravo.com"

# Canonical URL for each Next page. The course decks are added from the catalog.
STATIC = [
    ("/", "1.0", "weekly"),
    ("/bravo-university", "0.9", "weekly"),
    ("/make-the-switch", "0.8", "monthly"),
    ("/support", "0.6", "monthly"),
    ("/schedule", "0.6", "monthly"),
    ("/privacy", "0.4", "yearly"),
    ("/terms", "0.4", "yearly"),
    ("/eula", "0.4", "yearly"),
    ("/notices", "0.4", "yearly"),
]


def main():
    urls = [(ORIGIN + path, prio, freq) for path, prio, freq in STATIC]

    catalog = "lib/bravo-university-courses.json"
    if os.path.exists(catalog):
        for course in json.load(open(catalog)):
            # the decks load images by relative path, so the trailing slash is required
            urls.append((ORIGIN + course["href"], "0.7", "monthly"))

    today = date.today().isoformat()
    lines = ['<?xml version="1.0" encoding="UTF-8"?>',
             '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for loc, prio, freq in urls:
        lines += ["  <url>", f"    <loc>{loc}</loc>", f"    <lastmod>{today}</lastmod>",
                  f"    <changefreq>{freq}</changefreq>", f"    <priority>{prio}</priority>", "  </url>"]
    lines.append("</urlset>")

    os.makedirs("public", exist_ok=True)
    open("public/sitemap.xml", "w").write("\n".join(lines) + "\n")

    # Nothing is disallowed on purpose. The .html duplicates must stay crawlable
    # or Google never reads the canonical tag that points at the clean URL, and
    # blocking *.html would also hide Search Console's verification file.
    open("public/robots.txt", "w").write(
        "User-agent: *\n"
        "Allow: /\n\n"
        f"Sitemap: {ORIGIN}/sitemap.xml\n"
    )

    print(f"sitemap.xml: {len(urls)} URLs")
    for loc, _, _ in urls:
        print(f"  {loc}")
    print("robots.txt written")


if __name__ == "__main__":
    main()
