---
layout: academic
title: "Research"
permalink: /research/
description: "Research by Ramazan Bora on institutions, political economy, appellate courts and decision-making, including his job market paper on metropolitan government in Turkey."
---

The questions I ask are about how authority is organised and used: who decides, at what level, and with what consequences for the people and cases far from the centre. What happens to villages when the local government that served them is absorbed into a metropolitan one? How does a final court with a discretionary docket decide which disputes deserve its attention, and what do the judges below it do to be heard? How much do national leaders steer resources to their home regions, and when are they restrained?

Questions of this kind usually stall for lack of data at the resolution where the mechanism operates. So in each project I first build the measurement from public raw material, and then spend at least as much effort trying to break the result as I spent producing it.

{% assign categories = 'Job market paper|Papers|Work in progress' | split: '|' %}
{% for category in categories %}
<h2>{{ category }}</h2>
<div class="paper-list">
{% assign papers = site.data.research | where: 'category', category %}
{% for paper in papers %}
  <article class="paper-item">
    <p class="paper-status">{{ paper.status }}{% if paper.coauthors %} · with {{ paper.coauthors }}{% endif %}</p>
    <h3>{% if paper.url %}<a href="{{ paper.url | relative_url }}">{{ paper.title }}</a>{% else %}{{ paper.title }}{% endif %}</h3>
    <p>{{ paper.summary }}</p>
    {% if paper.url %}<p class="paper-links"><a href="{{ paper.url | relative_url }}">Research summary</a>{% if paper.paper_file %}<a href="{{ paper.paper_file | relative_url }}">Paper (PDF)</a>{% elsif paper.paper_url %}<a href="{{ paper.paper_url }}">Discussion paper (PDF)</a><a href="{{ paper.record_url }}">RePEc record</a>{% elsif paper.request_paper %}<a href="mailto:{{ site.author.email }}?subject={{ paper.title | url_encode | replace: '+', '%20' }}">Paper available on request</a>{% endif %}</p>{% endif %}
  </article>
{% endfor %}
</div>
{% endfor %}

## Research and data experience

My applied research experience also includes small-area population estimation, international purchasing-power comparisons, and geospatial linkage of property transactions with transport data. These projects inform my interest in transparent and reproducible data construction.
