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
  <p class="entry-meta">Monash University · Department of Economics · 2026–present</p>
  <p>I led the data development and empirical analysis for research on Australian appellate courts and selection into High Court review, coauthored with Russell Smyth.</p>
</div>

## Education

<div class="cv-entry">
  <h3>PhD in Economics</h3>
  <p class="entry-meta">University of Queensland · 2026</p>
  <p>Thesis: <em>Granularity in time, space, and behavior: Essays in empirical economics using open data.</em></p>
  <p>Principal advisor: Alicia Rambaldi. Associate advisor: Haishan Yuan.</p>
</div>
<div class="cv-entry">
  <h3>MA in Economics</h3>
  <p class="entry-meta">Koç University · 2010</p>
</div>
<div class="cv-entry">
  <h3>BSc in Electrical and Electronics Engineering</h3>
  <p class="entry-meta">Koç University · 2008</p>
</div>

## Research

{% for paper in site.data.research %}
<div class="cv-entry">
  <h3>{% if paper.url %}<a href="{{ paper.url | relative_url }}">{{ paper.title }}</a>{% else %}{{ paper.title }}{% endif %}</h3>
  <p class="entry-meta">{{ paper.status }}{% if paper.coauthors %} · with {{ paper.coauthors }}{% endif %}</p>
</div>
{% endfor %}

## Selected presentations

- **September 2025 — UQ Applied Micro Day, The University of Queensland.** “Birthplace Favoritism Revisited: Replication, Modern Evidence, and Crisis Dynamics.”
- **2025 — Society for Institutional and Organizational Economics, Sydney.** “An Examination of Centralized Local Governance and Development.”
- **2024 — 38th Annual PhD Conference in Economics and Business, Australian National University.** “An Examination of Centralized Local Governance and Development Through Turkey’s New Mega-Municipalities.”

## Awards, scholarships and research funding

- University of Queensland Scholarship — commenced 2021.
- Penn State University Scholarship — 2010–2015.
- Koç University Scholarship — 2003–2010.
- Fellowship, The Scientific and Technical Research Council of Turkey (TÜBİTAK) — 2008–2010.
- Research funding: Koç University, 2008–2010; The Scientific and Technical Research Council of Turkey (TÜBİTAK), 2008–2009.
- Vehbi Koç Scholar, Koç University — Spring and Fall 2005 and 2006.
- Dean’s Honor Roll, Koç University — Fall 2004, Fall 2007 and Spring 2008.

## Selected research experience

<div class="cv-entry">
  <h3>Small-area population estimation</h3>
  <p class="entry-meta">Queensland Centre for Population Research · University of Queensland</p>
  <p>I developed demographic estimation workflows using iterative proportional fitting and integerisation, with documentation and handover materials for small-area population estimation.</p>
</div>
<div class="cv-entry">
  <h3>International purchasing-power comparisons</h3>
  <p class="entry-meta">UQ International Comparisons Database · University of Queensland</p>
  <p>I worked on R code, data harmonisation and regional aggregation workflows supporting international purchasing-power comparisons.</p>
</div>
<div class="cv-entry">
  <h3>Property and transport research</h3>
  <p class="entry-meta">University of Queensland · with Alicia Rambaldi</p>
  <p>I linked administrative property transactions to geospatial and transport data, constructing accessibility measures and nearby-market indicators.</p>
</div>
<div class="cv-entry">
  <h3>Research assistance at Penn State</h3>
  <p class="entry-meta">Pennsylvania State University · 2010–2017</p>
  <p>I worked on voting rules and welfare with Vijay Krishna and a Python assessment-data tool with Bill Goffe.</p>
</div>

## Teaching

At the University of Queensland, I served as Senior Tutor in undergraduate microeconomics. My teaching also includes mathematical techniques, tools of economic analysis and managerial economics. At Penn State, I was the instructor for Introduction to Econometrics (World Campus, Summer 2015).

I co-developed **Class Groups** with Axel Wieneke, a Python/Flask and SQLite prototype for student group formation and presentation scheduling. I specified classroom rules and directed AI-assisted implementation and testing.

[Teaching experience and approach]({{ '/teaching/' | relative_url }})

## Methods and tools

- **Methods and data:** applied econometrics, panel data, spatial analysis, remote sensing, administrative data and text analysis.
- **Programming:** Python, R, Stata and MATLAB.
- **Research tools:** GIS, Google Earth Engine, Git and LaTeX.
- **Experimental model adaptation:** LoRA fine-tuning for equation-image transcription in Colab, with comparisons on a small repeated evaluation set.
