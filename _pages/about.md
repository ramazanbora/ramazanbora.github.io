---
layout: academic
permalink: /
title: "Ramazan Bora"
eyebrow: "Economics · Monash University"
subtitle: "Research Fellow, Department of Economics"
description: "Ramazan Bora is a Research Fellow in Economics at Monash University, studying institutions, governance and decision-making with granular data."
redirect_from:
  - /about/
  - /about.html
---

<p class="intro">I am a Research Fellow in the Department of Economics at Monash University. I study institutions, governance and decision-making by combining applied econometrics with granular spatial, administrative and behavioural data.</p>

I received my PhD in Economics from the University of Queensland in 2026. My thesis asks what becomes visible when economic measurement is made more granular across space, time and behaviour. Across my research, I build datasets from fragmented sources and examine how measurement and comparison choices shape empirical conclusions.

My current work with Russell Smyth examines how features of appellate judgments relate to special-leave applications and decisions in the High Court of Australia. My other research studies local government reform, political favoritism and behaviour in online chess.

<div class="action-links">
  <a class="button-link" href="{{ '/research/' | relative_url }}">Explore research</a>
  <a href="{{ site.cv_pdf | relative_url }}">CV (PDF)</a>
  <a href="mailto:{{ site.author.email }}">Get in touch</a>
</div>

## Research interests

<ul class="research-fields">
  <li>Applied microeconomics</li>
  <li>Political economy</li>
  <li>Economics of institutions</li>
  <li>Computational social science</li>
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
