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
  <p>Applied economics and computational research on institutions, including appellate judgments and High Court special-leave selection with Russell Smyth.</p>
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

## Teaching

My economics teaching at the University of Queensland includes mathematical techniques, tools of economic analysis and managerial economics. At Penn State, I was the instructor for Introduction to Econometrics (World Campus, Summer 2015).

[Teaching experience and approach]({{ '/teaching/' | relative_url }})

## Methods and tools

- **Methods and data:** applied econometrics, panel data, spatial analysis, remote sensing, administrative data and text analysis.
- **Programming:** Python, R, Stata and MATLAB.
- **Research tools:** GIS, Google Earth Engine, Git and LaTeX.
