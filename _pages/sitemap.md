---
layout: academic
title: "Sitemap"
permalink: /sitemap/
description: "Pages and research summaries on Ramazan Bora’s academic website."
---

## Main pages

{% for link in site.data.navigation.main %}
- [{{ link.title }}]({{ link.url | relative_url }})
{% endfor %}

## Research summaries

{% for paper in site.data.research %}{% if paper.url %}
- [{{ paper.title }}]({{ paper.url | relative_url }})
{% endif %}{% endfor %}

[XML sitemap]({{ '/sitemap.xml' | relative_url }})
