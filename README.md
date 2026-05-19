# Ezenwa Chidera Emmanuel — Philosophical Quote Site

> "Nothing in life delays, only our readiness does."  
> — Ezenwa Chidera Emmanuel

A semantic identity platform and philosophical quote site, designed to build Google entity recognition for the authorship relationship between **Ezenwa Chidera Emmanuel** and his core philosophy.

**Live site:** https://emezch93.github.io/quote-site-ezenwa-chidera-emmanuel/

---

## File Structure

```
quote-site-ezenwa-chidera-emmanuel/
├── index.html          # Homepage / identity hub
├── quote.html          # Primary quote deep-dive
├── example.html        # Real-life scenario (JAMB/WAEC)
├── quotes.html         # All quotes (loads from quotes.json)
├── articles.html       # Medium articles index
├── about.html          # Author identity page
├── style.css           # Shared design system
├── main.js             # Shared JS (scroll animations, nav)
├── quotes.json         # Quote data store (scalable)
├── sitemap.xml         # XML sitemap
├── robots.txt          # Crawl directives
├── manifest.json       # PWA manifest
├── favicon.svg         # SVG favicon
└── README.md           # This file
```

---

## GitHub Pages Deployment

### First-time setup

1. Push all files to your GitHub repository:
   ```
   github.com/emezch93/quote-site-ezenwa-chidera-emmanuel
   ```

2. In GitHub: **Settings → Pages → Source: Deploy from a branch → Branch: `main` → / (root)**

3. Wait 1–2 minutes. Your site will be live at:  
   `https://emezch93.github.io/quote-site-ezenwa-chidera-emmanuel/`

### Updating content

To add new quotes, edit `quotes.json` — add a new object to the `quotes` array. The `quotes.html` page loads and renders all quotes automatically.

---

## Profile Image Setup

Place your profile image in the root directory as:
```
IMG_20250810_093813_451.jpg
```

Then in `about.html`, uncomment the `<img>` tag and remove the placeholder `<div>`.

---

## OG Image

Create an Open Graph image at `1200×630px` and save it as:
```
og-image.jpg
```

Recommended content: Dark background, the quote text in Cormorant Garamond, and your name in Syne.

---

## PWA Icons

Generate icon files for full PWA support:
- `icon-192.png` — 192×192px
- `icon-512.png` — 512×512px
- `apple-touch-icon.png` — 180×180px

Use the same ECE monogram style as the favicon, on `#080A0F` background.

---

## SEO Infrastructure

Every page includes:
- Canonical URLs
- Open Graph tags
- Twitter Card tags
- JSON-LD structured data (Person, Article, WebSite, BreadcrumbList, CollectionPage, ProfilePage)
- Semantic HTML5 with ARIA labels
- Crawlable internal link architecture

---

## Adding New Pages or Quotes

**New quote:** Add to `quotes.json`. Done.

**New page:** Copy the nav and footer from any existing page. Add JSON-LD structured data. Add to `sitemap.xml`. Link it from relevant existing pages.

---

## Author

**Ezenwa Chidera Emmanuel**  
Frontend Developer · Founder of CodeVent Digital · Nigeria

- Portfolio: https://emezch93.github.io/portfolio-ezenwa-chidera-emmanuel/  
- GitHub: https://github.com/emezch93  
- Medium: https://medium.com/@emmanuelezenwa_78715  

© 2026 Ezenwa Chidera Emmanuel. All rights reserved.  
Original content and ideas are intellectual property.
