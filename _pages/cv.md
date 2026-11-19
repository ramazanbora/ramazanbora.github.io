---
layout: academic
title: "Curriculum vitae"
permalink: /cv/
description: "Curriculum vitae of Ramazan Bora, Research Fellow at Monash University and PhD in Economics, University of Queensland, 2026."
redirect_from:
  - /resume
  - /resume/
  - /cv-json/
  - /resume-json
---

<p><a class="button-link" href="{{ site.cv_pdf | relative_url }}">Download CV (PDF)</a></p>

## Current appointment

<div class="cv-entry">
  <h3>Research Fellow</h3>
  <p class="entry-meta">Department of Economics, Monash Business School, Monash University · Melbourne · 2026–present</p>
  <p>Postdoctoral research with Professor Russell Smyth on how the High Court of Australia selects the cases it hears.</p>
</div>

## Education

<div class="cv-entry">
  <h3>PhD in Economics</h3>
  <p class="entry-meta">The University of Queensland · 2026</p>
  <p>Thesis: <em>Granularity in time, space, and behavior: Essays in empirical economics using open data.</em></p>
  <p>Advisors: Alicia Rambaldi (principal) and Haishan Yuan.</p>
</div>
<div class="cv-entry">
  <h3>MA in Economics</h3>
  <p class="entry-meta">Koç University, Istanbul · 2010</p>
  <p>Thesis on strategic communication and the allocation of decision rights in organisations. Advisor: Levent Koçkesen.</p>
</div>
<div class="cv-entry">
  <h3>BSc in Electrical and Electronics Engineering</h3>
  <p class="entry-meta">Koç University, Istanbul · 2008</p>
</div>

## Research

{% for paper in site.data.research %}
<div class="cv-entry">
  <h3>{% if paper.url %}<a href="{{ paper.url | relative_url }}">{{ paper.title }}</a>{% else %}{{ paper.title }}{% endif %}</h3>
  <p class="entry-meta">{{ paper.status }}{% if paper.coauthors %} · with {{ paper.coauthors }}{% endif %}{% if paper.paper_file %} · <a href="{{ paper.paper_file | relative_url }}">Paper (PDF)</a>{% elsif paper.paper_url %} · <a href="{{ paper.paper_url }}">Paper (PDF)</a>{% endif %}</p>
</div>
{% endfor %}

## Presentations

- **December 2026 (scheduled) — Australian National University.** “Cues from Below”, workshop on Accessing Judicial Power in the Australian Political System.
- **September 2025 — UQ Applied Micro Day, The University of Queensland.** “Birthplace Favoritism Revisited: Replication, Modern Evidence, and Crisis Dynamics.”
- **August 2025 — Society for Institutional and Organizational Economics (SIOE) Annual Conference, UNSW Sydney.** Job market paper, presented as “An Examination of Centralized Local Governance and Development.”
- **November 2024 — 38th Annual PhD Conference in Economics and Business, Australian National University.** Job market paper, presented as “An Examination of Centralized Local Governance and Development Through Turkey’s New Mega-Municipalities.”

## Scholarships and awards

- Australian Government Research Training Program Scholarship — 2021–2026.
- Scholarship, Pennsylvania State University — 2010–2015.
- Graduate Fellowship and Research Grant, TÜBİTAK (national research council of Turkey) — 2008–2010.
- Research Grant and Graduate School Scholarship, Koç University — 2008–2010.
- Merit Scholarship, Koç University — 2003–2008.
- Vehbi Koç Scholar, Koç University (four semesters) — 2005–2006.
- Dean’s Honor Roll, Koç University (three semesters) — 2004–2008.

## Research experience

<div class="cv-entry">
  <h3>Casual Senior Research Assistant</h3>
  <p class="entry-meta">Queensland Centre for Population Research, The University of Queensland · 2022–2025</p>
  <p>With Dr Pia Wohland. Small-area population estimates by age, sex and Indigenous status for the Queensland Government Statistician’s Office: a modified iterative proportional fitting routine, a new integerisation step, intercensal estimates, and documentation for handover.</p>
</div>
<div class="cv-entry">
  <h3>Casual Research Assistant</h3>
  <p class="entry-meta">School of Economics, The University of Queensland · 2021–2025</p>
  <p>With Professor Alicia Rambaldi. <em>Commercial property and transport:</em> built the project dataset from the New South Wales Valuer General’s raw sales files (semi-structured text, about five million sale records): parsing, cleaning and geocoding, public-transport access from timetable (GTFS) data, and a measure of the surrounding residential market constructed from the residential sales in the same files. <em>UQ International Comparisons Database:</em> code refactoring, regional aggregation pipelines and dashboards for purchasing-power-parity indicators.</p>
</div>
<div class="cv-entry">
  <h3>Research Assistant</h3>
  <p class="entry-meta">Ibn Haldun University, Istanbul · 2018–2021</p>
  <p>Research assistance to faculty on empirical projects, including text analysis of social media data.</p>
</div>
<div class="cv-entry">
  <h3>Research Assistant</h3>
  <p class="entry-meta">Pennsylvania State University · 2010–2017</p>
  <p>With Vijay Krishna on the welfare properties of voting rules, and with Bill Goffe on a Python tool to detect irregularities in assessment data.</p>
</div>
<div class="cv-entry">
  <h3>Research Assistant</h3>
  <p class="entry-meta">Koç University, Istanbul · 2006–2009</p>
  <p>With Levent Koçkesen on communication in multi-divisional organisations.</p>
</div>

## Teaching

At the University of Queensland I was a tutor and Senior Tutor from 2022 to 2026. As Senior Tutor, 2024–2026, for Tools of Economic Analysis (first year) and Mathematical Economics (second year), I coordinated tutors and markers and liaised with course coordinators. I tutored Managerial Economics (third year), Consumer and Firm Behaviour and Mathematical Techniques for Economics (master’s). Student evaluations, 2023–2026: 4.54 out of 5 across 206 responses in 12 course-semester reports.

At Penn State I was instructor of record for Intermediate Microeconomics (2013) and Introduction to Econometrics (2015, online). I was a teaching assistant at Ibn Haldun University (2018–2021) and an instructor and teaching assistant at Koç University (2006–2009).

I build the tools my teaching needs: **Class Groups** (with Axel Wieneke), a web application for team formation and presentation scheduling used by about 200 students, and a lightning-round quiz website.

[Teaching experience and approach]({{ '/teaching/' | relative_url }})

## Skills

- **Econometrics:** difference-in-differences and event studies, border designs, high-dimensional fixed effects, placebo and simulation-based inference checks.
- **Data and computing:** R, Python, Stata, SQL, MATLAB; GIS and remote sensing (QGIS, Google Earth Engine); cloud computing (AWS, Google Cloud); Git; LaTeX.
- **AI-assisted research:** language-model pipelines for large text corpora with staged verification; agentic coding tools; embeddings; LoRA and QLoRA fine-tuning of open-weight models.
- **Languages:** Turkish (native), English (fluent).
