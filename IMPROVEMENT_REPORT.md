# dulceilustra.com - Improvement Backlog

**Last Updated:** May 13, 2026  
**Project:** dulceilustra.com portfolio website  
**Stack:** Eleventy 3.1.2 Static Site Generator  
**Current Size:** 6.1MB build output, 27KB main.css, 2.9MB home video

---

## Context

This is an AI-agent-optimized improvement backlog for the dulceilustra.com portfolio website. Each item is a specific, actionable improvement. Items can be referenced by number (e.g., "implement item 3"). After completing an item, remove it from the list and renumber.

**Current Project Structure:**
- `_content/` - Markdown source files with frontmatter (index.md, contact.md, gallery/)
- `_includes/` - Templates, CSS, images, and media assets
  - `layouts/` - main.html, pages/home.html, pages/contact.html, pages/gallery.html
  - `css/` - main.css (27KB, 1,383 lines)
  - `images/` - Static images (828KB total)
  - `media/` - home_animation.mp4 (2.9MB)
- `docs/` - Build output directory
- `eleventy.config.js` - Eleventy configuration
- `package.json` - Dependencies and build scripts

**Key Asset Sizes:**
- home_animation.mp4: 2.9MB
- dulceilustra__contacto.gif: 344KB
- dulceilustra__firma.png (logo, every page): 272KB
- dulceilustra__estrellas.png: 152KB
- Gallery images: 2.3MB total (16 images, mix of .webp, .png, .jpg)

**Current SEO Status:**
- Site currently has `<meta name="robots" content="noindex, nofollow" />` blocking all search engines
- Missing: meta descriptions, Open Graph tags, Twitter Cards, canonical URLs, structured data
- Generic titles on most pages
- No sitemap.xml or RSS feed

---

## Improvements Backlog

### 1. Remove noindex/nofollow meta tag from main.html (CRITICAL)
**File:** `_includes/layouts/main.html`
**Action:** Remove or comment out `<meta name="robots" content="noindex, nofollow" />` to allow search engine indexing.
**Context:** The site is currently invisible to all search engines. This must be removed before launch.
**Related files:** `_includes/layouts/main.html` (in `<head>` section)

### 2. Add lazy loading to all images
**Files to update:** 
- `_includes/layouts/pages/home.html`
- `_includes/layouts/pages/contact.html`
- `_includes/layouts/pages/gallery.html`
- `_includes/layouts/pages/gallery/item.html`
**Action:** Add `loading="lazy"` attribute to all `<img>` tags to improve initial page load performance.
**Example:** `<img src="/images/artwork.jpg" alt="Artwork" loading="lazy" />`

### 3. Create site data file for centralized configuration
**Action:** Create `_content/_data/site.js` with site metadata (title, url, description, social links, etc.)
**Content needed:**
```javascript
export default {
    title: "dulceilustra",
    url: "https://dulceilustra.com",
    description: "Portfolio de ilustración y arte digital por @dulceilustra. Arte digital, pinturas, dibujos y cómics.",
    defaultOgImage: "/images/dulceilustra__firma.png",
    author: "dulceilustra",
    social: {
        instagram: "https://www.instagram.com/dulceilustra/",
        tiktok: "https://www.tiktok.com/@dulceilustra",
        pinterest: "https://www.pinterest.com/dulceilustra/",
    }
};
```

### 4. Add SEO meta tags to main.html template
**File:** `_includes/layouts/main.html`
**Action:** Add dynamic title tags, meta descriptions, and canonical URLs to `<head>`.
**Requirements:**
- Dynamic page titles using frontmatter: `{{ title }}{% if title != site.title %} | {{ site.title }}{% endif %}`
- Meta description: `<meta name="description" content="{{ description or site.description }}" />`
- Canonical URL: `<link rel="canonical" href="{{ site.url }}{{ page.url }}" />`
**Dependencies:** Item 3 must be completed first

### 5. Add Open Graph and Twitter Card meta tags
**File:** `_includes/layouts/main.html`
**Action:** Add social sharing meta tags for Facebook, Twitter, and other platforms in `<head>`.
**Tags needed:** og:type, og:url, og:title, og:description, og:image, og:site_name, twitter:card, twitter:title, twitter:description, twitter:image
**Dependencies:** Item 3 must be completed first

### 6. Add JSON-LD structured data for Person schema
**File:** `_includes/layouts/main.html`
**Action:** Add Schema.org Person structured data before `</head>` to improve SEO.
**Schema type:** Person (illustrator/artist)
**Include:** name, url, jobTitle, sameAs (social media links)
**Dependencies:** Item 3 must be completed first

### 7. Update content frontmatter with SEO metadata
**Files to update:**
- `_content/index.md`
- `_content/contact.md`
- `_content/gallery/index.md`
- All gallery item markdown files (16 files)
**Action:** Add title, description, ogImage, and lang properties to frontmatter.
**Example for index.md:**
```yaml
---
title: "dulceilustra - Ilustradora y Artista Digital"
description: "Portfolio oficial de @dulceilustra. Explora arte digital, pinturas, dibujos y cómics originales."
ogImage: "/images/dulceilustra__firma.png"
lang: "es"
layout: home
---
```

### 8. Optimize home_animation.mp4 video file
**File:** `_includes/media/home_animation.mp4` (current size: 2.9MB)
**Action:** Compress video using modern codecs (H.265 or WebM VP9) to reduce file size by 50-70%.
**Commands:**
```bash
# Option 1: H.265
ffmpeg -i home_animation.mp4 -c:v libx265 -crf 28 -preset medium -tag:v hvc1 home_animation_optimized.mp4

# Option 2: WebM (better browser support)
ffmpeg -i home_animation.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 home_animation.webm
```
**Template update:** Update `_includes/layouts/pages/home.html` to use `<video>` with multiple sources and poster image.
**Expected result:** 1-2MB file size reduction

### 9. Convert contact GIF to video format
**File:** `_includes/images/dulceilustra__contacto.gif` (current size: 344KB)
**Action:** Convert animated GIF to MP4 video format for 60-90% size reduction.
**Command:**
```bash
ffmpeg -i dulceilustra__contacto.gif -movflags +faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" dulceilustra__contacto.mp4
```
**Template update:** Update `_includes/layouts/pages/contact.html` to use `<video>` tag instead of `<img>`.
**Expected result:** 200-300KB file size reduction

### 10. Convert logo and large PNGs to WebP format
**Files to convert:**
- `_includes/images/dulceilustra__firma.png` (272KB, used on every page)
- `_includes/images/dulceilustra__estrellas.png` (152KB)
- `_includes/images/dulceilustra__pie-de-pagina.png` (56KB)
**Action:** Convert to WebP format and update all template references to use `<picture>` element with fallback.
**Commands:**
```bash
npm install --save-dev sharp
npx sharp -i _includes/images/dulceilustra__firma.png -o _includes/images/dulceilustra__firma.webp --webp
# Repeat for other files
```
**Template pattern:**
```html
<picture>
  <source srcset="/images/dulceilustra__firma.webp" type="image/webp">
  <img src="/images/dulceilustra__firma.png" alt="@dulceilustra">
</picture>
```
**Expected result:** 80-150KB total reduction

### 11. Standardize gallery images to WebP format
**Location:** Gallery images in `_content/gallery/` subdirectories (16 images, 2.3MB total)
**Current state:** Mix of .jpg, .png, and some .webp files
**Action:** Convert all gallery images to optimized WebP format for consistency and size reduction.
**Note:** Some images already use WebP (.opti.webp files). Standardize naming and ensure all use WebP.

### 12. Extract carousel JavaScript to external file
**Current state:** 111 lines of inline JavaScript in `_includes/layouts/pages/home.html`
**Action:** 
1. Create `_includes/js/carousel.js` and move carousel code there
2. Update `eleventy.config.js` to copy JS files: `eleventyConfig.addPassthroughCopy({ "_includes/js": "js" });`
3. Replace inline script in home.html with: `<script defer src="/js/carousel.js"></script>`
**Benefits:** Better caching, cleaner HTML, can minify independently

### 13. Extract prefetch script to external file
**Current state:** Prefetch script inline in `_includes/layouts/main.html`
**Action:** Similar to item 12, extract to `_includes/js/prefetch.js` and reference externally.
**Benefits:** Better caching, consistent with other JS files

### 14. Create reusable social links component
**Current state:** Social media links duplicated in:
- `_includes/layouts/pages/home.html` (lines 86-120)
- `_includes/layouts/pages/contact.html` (lines 7-42)
**Action:** Create `_includes/components/social-links.html` with parameterized social links (containerClass, showHeading).
**Usage:** `{% include "components/social-links.html", containerClass: "home__social-media", showHeading: true %}`
**Dependencies:** Item 3 (site data file) should be completed first to use `site.social.*` variables

### 15. Create reusable bilingual heading component
**Current state:** Bilingual headings (ES/EN) repeated throughout templates
**Action:** Create `_includes/components/bilingual-heading.html` with parameters (tag, spanish, english, class).
**Usage:** `{% include "components/bilingual-heading.html", tag: "h2", spanish: "Galería", english: "Gallery" %}`

### 16. Consolidate duplicate social media CSS
**Current state:** Duplicate styles in main.css:
- `.home__social-media` (lines 477-558)
- `.contact-page__social-media` (lines 655-727)
**Action:** Create shared utility classes (`.social-media__container`, `.social-media__list`, `.social-media__link`, etc.) and refactor page-specific classes to use them.
**Expected result:** 5-10KB CSS reduction

### 17. Optimize Google Fonts loading
**Current state:** Two `@import` statements in main.css blocking CSS parsing:
```css
@import url("https://fonts.googleapis.com/css2?family=Staatliches&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap");
```
**Action:** 
1. Remove `@import` statements from CSS
2. Add combined preconnect and font link in `_includes/layouts/main.html` `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;600&family=Staatliches&display=swap" rel="stylesheet">
```
**Note:** Limit Roboto weights to only 400 and 600 (currently loading all weights 100-900)

### 18. Add resource hints for critical assets
**File:** `_includes/layouts/main.html`
**Action:** Add preload and dns-prefetch hints in `<head>`:
```html
<link rel="preload" href="/css/main.css" as="style" />
<link rel="preload" href="/images/dulceilustra__firma.webp" as="image" />
<link rel="dns-prefetch" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />
```

### 19. Add CSS minification to build process
**Action:**
1. Install dependencies: `npm install --save-dev postcss postcss-cli cssnano autoprefixer`
2. Create `postcss.config.js` with cssnano configuration
3. Update `package.json` scripts: `"build": "./rm-build.sh && eleventy && npm run minify:css"` and `"minify:css": "postcss docs/css/main.css -o docs/css/main.css"`
**Expected result:** 5-8KB CSS reduction (20-30% smaller)

### 20. Generate sitemap.xml
**Action:**
1. Install plugin: `npm install --save-dev @quasibit/eleventy-plugin-sitemap`
2. Update `eleventy.config.js`:
```javascript
import sitemap from "@quasibit/eleventy-plugin-sitemap";
eleventyConfig.addPlugin(sitemap, {
    sitemap: { hostname: "https://dulceilustra.com" }
});
```
3. Update `robots.txt` to reference sitemap: `Sitemap: https://dulceilustra.com/sitemap.xml`

### 21. Update robots.txt for production
**File:** `docs/robots.txt` (or create if missing)
**Current state:** Should currently have `Disallow: /` (blocking all crawlers)
**Action:** When ready to launch, update to:
```
User-agent: *
Allow: /

Sitemap: https://dulceilustra.com/sitemap.xml
```
**Critical:** Only do this after items 1-7 are complete (SEO foundation in place)

### 22. Add RSS feed for gallery updates
**Action:**
1. Install plugin: `npm install --save-dev @11ty/eleventy-plugin-rss`
2. Update `eleventy.config.js` to add RSS plugin
3. Create `_content/feed.njk` with Atom feed template (iterate over collections.newArt or similar)
4. Add feed link to `_includes/layouts/main.html` `<head>`: `<link rel="alternate" type="application/atom+xml" title="{{ site.title }}" href="/feed.xml" />`
**Dependencies:** Item 3 (site data file)

### 23. Improve gallery item metadata
**Files:** All gallery item markdown files in `_content/gallery/` subdirectories
**Current state:** Minimal frontmatter (just title, cover, layout)
**Action:** Enhance frontmatter with: description, coverAlt, date, category, tags, featured, ogImage
**Example:**
```yaml
---
title: "Comic de Octubre - Vida Diaria"
description: "Un cómic sobre las pequeñas alegrías de la vida cotidiana"
cover: cover.png
coverAlt: "Cómic mostrando una persona disfrutando de un café por la mañana"
date: 2025-10-05
category: comics
tags: [humor, vida-diaria, café]
featured: false
ogImage: cover.png
layout: gallery.item
---
```
**Note:** This is ongoing for new items; updating existing items would take 2-3 hours total

### 24. Clean up duplicate gallery items
**Location:** Several "(Copy)" folders exist in `_content/gallery/digital-art/` directory
**Action:** Review and remove or properly rename duplicate gallery item directories to clean up the project structure.

### 25. Create automated image optimization pipeline
**Action:**
1. Install: `npm install --save-dev sharp imagemin imagemin-webp imagemin-mozjpeg`
2. Create `_build/optimize-images.js` script to automatically generate WebP versions and optimize originals
3. Add to `eleventy.config.js`: Hook into `eleventy.after` event to run optimization
4. Update build scripts in `package.json`
**Benefits:** Automatic optimization on every build, no manual intervention needed
**Risk level:** Medium (test thoroughly to avoid breaking images)

### 26. Add build size reporting
**Action:**
1. Create `_build/build-report.js` script to report total size, CSS size, images size, gallery size after each build
2. Update `package.json` build script to run report: `"build": "./rm-build.sh && eleventy && npm run optimize && npm run report"`
**Benefits:** Track size over time, catch unexpected increases, monitor optimization impact

### 27. Extract header and footer into separate components
**Current state:** Header and footer embedded directly in `_includes/layouts/main.html`
**Action:** Create `_includes/components/header.html` and `_includes/components/footer.html`, then include them in main.html
**Benefits:** Better organization, easier to maintain navigation and footer independently

### 28. Add dynamic language attribute
**Current state:** `<html lang="en">` hardcoded in main.html
**Action:** Change to `<html lang="{{ lang or 'es' }}">` to use frontmatter lang value with Spanish as default
**Note:** Frontmatter already should have `lang: "es"` in most pages (verify as part of item 7)

### 29. Add favicon references
**Current state:** No favicon links in `<head>`
**Action:** Add favicon references in `_includes/layouts/main.html`:
```html
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
```
**Prerequisites:** Favicon files must exist in appropriate location (or create if missing)

### 30. Self-host Google Fonts (advanced performance optimization)
**Current state:** Fonts loaded from Google Fonts CDN
**Action:** Download Roboto (weights 400, 600) and Staatliches fonts, add to `_includes/fonts/` directory, update CSS to use local fonts
**Benefits:** Better performance, no external requests, GDPR-friendly
**Alternative:** Keep using Google Fonts CDN if simplicity preferred (item 17 already optimizes the loading)

---

## Quick Reference

**Most Critical Items:**
1. Remove noindex/nofollow (item 1)
2. Add SEO meta tags (items 3-7)
3. Optimize large media files (items 8-10)

**Quick Wins (< 30 minutes each):**
- Items 2, 3, 4, 5, 6, 18, 19, 20

**High Impact Items:**
- Items 1, 4, 5, 8, 9, 10, 16, 17, 20

**Component Extraction (code quality):**
- Items 12, 13, 14, 15, 27

**Build Process Improvements:**
- Items 19, 20, 22, 25, 26

**Before Launch Checklist:**
- Complete items 1-7 (SEO foundation)
- Complete items 8-10 (major file size reduction)
- Complete item 21 (update robots.txt)
- Test all pages load correctly
- Verify Open Graph tags with https://www.opengraph.xyz/
- Test social sharing previews
- Submit sitemap to Google Search Console

---

## Project Information

**Current Dependencies:**
- Eleventy 3.1.2
- markdown-it with markdown-it-attrs plugin
- passthrough copy for static assets

**Build Commands:**
- `npm run dev` - Development server with watch mode
- `npm run build` - Production build (runs rm-build.sh then eleventy)
- Build output: `docs/` directory

**Template Engine:** Liquid (Eleventy default)

**Collections Defined:**
- digitalArt, paintings, drawings, comics
- latestDigitalArt, latestPaintings, latestDrawings, latestComics (limited to 4 each)

**Data Files:**
- `_content/_data/navigation.json` - Site navigation structure
- `_content/_data/gallery.js` - Gallery category descriptions (already exists)

---

**End of Backlog**

*This document is intended for AI agent consumption. Each numbered item is a discrete, actionable task that can be implemented independently (unless dependencies are noted). Remove completed items and renumber remaining items.*
