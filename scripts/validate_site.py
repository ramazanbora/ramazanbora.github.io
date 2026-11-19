#!/usr/bin/env python3
"""Check the generated public site for broken links and template leakage."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse
import hashlib
import json
import re
import sys
import xml.etree.ElementTree as ET


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.links = []
        self.ids = set()
        self.canonical = []
        self.h1_count = 0
        self.main_count = 0
        self.refresh = False
        self.menu_buttons = []
        self.feed(text)

    def handle_starttag(self, tag, pairs):
        attrs = dict(pairs)
        if attrs.get("id"):
            self.ids.add(attrs["id"])
        if tag == "h1":
            self.h1_count += 1
        if tag == "main":
            self.main_count += 1
        if tag == "meta" and attrs.get("http-equiv", "").lower() == "refresh":
            self.refresh = True
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonical.append(attrs.get("href", ""))
        if tag == "button" and "menu-toggle" in attrs.get("class", ""):
            self.menu_buttons.append(attrs)
        for key in ("href", "src"):
            if attrs.get(key):
                self.links.append(attrs[key])


site = Path(sys.argv[1] if len(sys.argv) > 1 else "_site").resolve()
if not (site / "index.html").is_file():
    raise SystemExit("Build the site first: bundle exec jekyll build --safe")

errors = []
pages = {}
checked_links = 0
expected_routes = [
    "/", "/research/", "/cv/", "/teaching/", "/contact/", "/sitemap/",
    "/research/hinterland-abstract/", "/research/birthplace-abstract/",
    "/research/ramadan-chess-abstract/", "/research/cues-from-below/",
]
retired_paths = [
    "files/paper1.pdf", "files/paper2.pdf", "files/paper3.pdf",
    "files/slides1.pdf", "files/slides2.pdf", "files/slides3.pdf",
    "files/cv_final.tex", "files/chapter_abstracts.txt", "files/thesis_intro.txt",
    "files/Ramazan_Bora_Monash_cover_letter.txt",
    "files/BORA_ramazan_PhD_Thesis_Title_Page_Abstract.txt",
    "publications", "publication", "talks", "talkmap", "portfolio",
    "year-archive", "markdown", "non-menu-page", "feed.xml",
]


def target_for(path, source=None):
    if path.startswith("/"):
        target = site / unquote(path).lstrip("/")
    else:
        target = (source.parent if source else site) / unquote(path)
    target = target.resolve()
    if not target.is_relative_to(site):
        return None
    if target.is_dir():
        target = target / "index.html"
    if not target.exists() and not target.suffix:
        target = target.with_suffix(".html")
    return target


for path in site.rglob("*.html"):
    text = path.read_text(encoding="utf-8")
    page = pages[path] = Page(text)
    for forbidden in [
        r"PhD candidate", r"thesis under examination", r"expected completion",
        r"Paper Title Number", r"Your Name", r"University 1", r"Lorem ipsum",
        r"/Users/", r"\{%", r"\{\{",
    ]:
        if re.search(forbidden, text, re.I):
            errors.append(f"{path.relative_to(site)} contains retired/private/template text: {forbidden}")
    if len(page.canonical) != 1 or not page.canonical[0].startswith("https://ramazanbora.com/"):
        errors.append(f"{path.relative_to(site)} has incorrect canonical metadata")
    if not page.refresh:
        if page.h1_count != 1 or page.main_count != 1 or "main-content" not in page.ids:
            errors.append(f"{path.relative_to(site)} lacks a single page heading/main landmark")
        if len(page.menu_buttons) != 1 or page.menu_buttons[0].get("aria-controls") != "primary-links" or page.menu_buttons[0].get("aria-expanded") != "false":
            errors.append(f"{path.relative_to(site)} has incomplete responsive-menu semantics")

for path, page in pages.items():
    for link in page.links:
        parsed = urlparse(link)
        if parsed.scheme or parsed.netloc:
            if parsed.scheme == "mailto" and "+" in parsed.query:
                errors.append(f"{path.relative_to(site)} has ambiguous mailto header encoding: {link}")
            if parsed.netloc in {"ramazanbora.github.io", "www.ramazanbora.com"}:
                errors.append(f"{path.relative_to(site)} uses retired/noncanonical host: {link}")
            continue
        target = target_for(parsed.path, path) if parsed.path else path
        checked_links += 1
        if target is None or not target.is_file():
            errors.append(f"{path.relative_to(site)} has broken local link: {link}")
        elif parsed.fragment and target.suffix == ".html":
            target_page = pages.get(target)
            if target_page is None or unquote(parsed.fragment) not in target_page.ids:
                errors.append(f"{path.relative_to(site)} has broken fragment: {link}")

for route in expected_routes:
    target = target_for(route)
    if target not in pages or pages[target].refresh:
        errors.append(f"Expected content page missing: {route}")
for retired in retired_paths:
    if (site / retired).exists():
        errors.append(f"Retired sample/private asset is still published: {retired}")

cv = site / "files/cv_final.pdf"
cv_alias = site / "files/Ramazan_Bora_CV.pdf"
if not cv.is_file() or not cv.read_bytes().startswith(b"%PDF-"):
    errors.append("Current CV is missing or is not a PDF")
elif not cv_alias.is_file() or cv.read_bytes() != cv_alias.read_bytes():
    errors.append("CV download aliases do not contain the same document")

expected_sitemap = {"https://ramazanbora.com" + route for route in expected_routes}
expected_sitemap |= {
    "https://ramazanbora.com/files/cv_final.pdf",
    "https://ramazanbora.com/files/Ramazan_Bora_CV.pdf",
    "https://ramazanbora.com/files/Bora_JMP.pdf",
}
actual_sitemap = {e.text for e in ET.parse(site / "sitemap.xml").findall(".//{http://www.sitemaps.org/schemas/sitemap/0.9}loc")}
if actual_sitemap != expected_sitemap:
    errors.append(f"Unexpected sitemap inventory: {sorted(actual_sitemap ^ expected_sitemap)}")
if (site / "CNAME").read_text().strip() != "ramazanbora.com":
    errors.append("Custom-domain CNAME changed")

report = {
    "status": "failed" if errors else "passed",
    "html_files": len(pages),
    "content_pages": sum(not p.refresh for p in pages.values()),
    "internal_references_checked": checked_links,
    "sitemap_entries": len(actual_sitemap),
    "cv_sha256": hashlib.sha256(cv.read_bytes()).hexdigest() if cv.is_file() else None,
    "errors": errors,
}
print(json.dumps(report, indent=2))
raise SystemExit(bool(errors))
