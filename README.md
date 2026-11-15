# Ramazan Bora — academic website

Source for [ramazanbora.com](https://ramazanbora.com), hosted by GitHub Pages from the `master` branch. The site uses Jekyll 3.10 and a lightweight personal academic layout. The earlier AcademicPages template files remain in the repository; unused examples and assets are explicitly excluded from the public build.

## Content map

- `_pages/about.md`: first-person home page and research overview.
- `_pages/research.md` and `_data/research.yml`: job market paper, working papers and work in progress. Research titles, status, summaries and links have a single data source.
- `_pages/research-*.md`: paper-specific summary pages. Existing URLs are retained.
- `_pages/cv.md`: concise HTML CV; `files/cv_final.pdf`: current downloadable CV. `files/Ramazan_Bora_CV.pdf` is an identical alias.
- `_pages/teaching.html` and `_pages/contact.md`: teaching and current contact details.
- `_layouts/academic.html`, `assets/css/academic.css`, `assets/js/academic.js`: responsive layout, accessible navigation and styles.
- `_config.yml`: canonical host, current email, update date, output exclusions and plugins.

## Local build and preview

With Ruby and Bundler installed:

```sh
bundle install
bundle exec jekyll build --safe
python3 scripts/validate_site.py
bundle exec jekyll serve --safe --host 127.0.0.1
```

Open the URL printed by Jekyll. The committed configuration always uses the custom domain for canonical metadata; navigation and assets use relative, same-origin paths.

The validator checks internal file/fragment references, the real sitemap inventory, one main heading per content page, menu semantics, stale template/identity text, retired downloads, matching CV aliases and the custom-domain CNAME. Browser checks should also cover mobile menu pointer/keyboard activation, Escape, no-JavaScript navigation, light/dark preference and 320/390/768/1440px layouts.

## Updating research and documents

Keep the job market designation distinct from publication or submission readiness. The metropolitan-reform paper remains the job market paper by the author's choice. The UQ Discussion Paper 671 link points to its public November 2025 version; later revisions belong to the same project. Do not label a discussion paper as a peer-reviewed article.

Only publish manuscript files whose release is established. Private drafts, reviewer material, employment records, teaching records and research data do not belong in this repository. Update both CV PDF filenames together. Existing applicant text extracts, old TeX and sample paper/slide PDFs are excluded from deployment; their older repository history is not rewritten by an ordinary website update.

The site does not load external font, analytics, mathematics or diagram scripts. Native navigation remains available if JavaScript is disabled. Colour preference follows the browser/operating system.

## Hosting

Preserve `CNAME` (`ramazanbora.com`), the existing repository and GitHub Pages configuration. A production update is a reviewed commit to the configured publishing branch followed by a successful GitHub Pages build. A local preview is not evidence that the public site has changed.
