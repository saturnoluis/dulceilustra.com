---
title: dulceilustra.com
layout: gallery
foo: |
  # This is the Foo Section
  This content is **stored in front matter** and rendered as markdown using the `| markdown` filter.
  
  You can use all markdown features:
  - Lists
  - **Bold text**
  - [Links](#)
bar: |
  ## This is the Bar Section
  
  Another section with *italic text* and more **markdown** support!
  
  1. Numbered lists work too
  2. Second item
  3. Third item
---

This is the main content area rendered by {{ content }}.

It comes from the markdown body after the front matter.