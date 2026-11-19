---
layout: academic
permalink: /
title: "Ramazan Bora"
eyebrow: "Economics · Monash University"
subtitle: "Research Fellow, Department of Economics"
description: "Ramazan Bora is an applied economist at Monash University who studies political economy and institutions using data he builds from satellite imagery, administrative records and court judgments."
redirect_from:
  - /about/
  - /about.html
---

<p class="intro">I am an applied economist working on political economy and institutions. I study how authority is organised and used, and what that means for those far from the centre: villages absorbed into metropolitan governments, regions that do or do not produce a national leader, litigants seeking a hearing in a final court.</p>

These questions often lack data at the resolution where the mechanism operates, so I build it. For my doctoral thesis at the University of Queensland (2026) I reconstructed village boundaries across Turkey and linked them to monthly satellite night lights to evaluate a major local-government reform, replicated and extended the evidence on leaders’ birthplace favouritism with open data for 2012–2025, and scored 16 million online chess moves against an engine to measure decision quality.

As a Research Fellow in the Department of Economics at Monash University I work with Russell Smyth on special leave to appeal to the High Court of Australia. I built a corpus of appellate judgments linked to High Court applications and designed the language-model workflow, with staged verification, that measures dissent, citations and judicial signals in each judgment.

I have taught microeconomics, mathematics for economists and econometrics since 2006, as instructor of record at Penn State and as tutor and Senior Tutor at Queensland.

<div class="action-links">
  <a class="button-link" href="{{ '/research/' | relative_url }}">Explore research</a>
  <a href="{{ site.cv_pdf | relative_url }}">CV (PDF)</a>
  <a href="mailto:{{ site.author.email }}">Get in touch</a>
</div>

## Research interests

<ul class="research-fields">
  <li>Political economy</li>
  <li>Institutions and governance</li>
  <li>Law and economics</li>
  <li>Development economics</li>
  <li>Applied microeconometrics</li>
  <li>Measurement from satellite, administrative and text data</li>
</ul>

<div class="section-heading">
  <h2>Selected research</h2>
  <a href="{{ '/research/' | relative_url }}">All research →</a>
</div>
<div class="paper-list">
{% for paper in site.data.research limit:2 %}
  <article class="paper-item">
    <p class="paper-status">{{ paper.status }}{% if paper.coauthors %} · with {{ paper.coauthors }}{% endif %}</p>
    <h3><a href="{{ paper.url | relative_url }}">{{ paper.title }}</a></h3>
    <p>{{ paper.summary }}</p>
  </article>
{% endfor %}
</div>
