# Jade Remodeling, Inc. — Website Mockup

A modern, mobile-first marketing website for **Jade Remodeling, Inc.** — a family-owned remodeling, repair &
handyman business in **Jacksonville, FL** (owner **Jesse Cortez**). Kitchen & bathroom specialists.

Built as a hand-coded **static site** (HTML + CSS + vanilla JS — no framework) so it's fast,
cheap to host, and easy to edit.

> **Status: polished demo / proposal.** Some content is intentionally a clearly-marked placeholder (see below). Built
> from the project spec at `~/Documents/Claude/Projects/specs/jade-remodeling-website.md`.

## Pages
| File | Purpose |
|------|---------|
| `index.html` | Home — hero, trust band, services overview, project gallery (with before/after slider), about, reviews, service area, CTA |
| `services.html` | Full services, grouped into Remodels / Repairs & Trades / Exterior & Handyman |
| `contact.html` | "Request a Free Estimate" form + click-to-call/text + contact details |

## Structure
```
index.html  services.html  contact.html  vercel.json
assets/
  css/styles.css      # all styles, design tokens in :root
  js/main.js          # nav, before/after slider, gallery filter, scroll reveals, form validation
  img/
    logo-icon.svg     # the logo, recreated as vector (also the favicon)
    icons.svg         # inline SVG icon sprite
    og-image.svg      # social preview image
    hero.svg          # hero background art
```

## Brand
- **Green** `#178052` (action / CTAs) · **Indigo** `#3B2F8F` (structure) · warm off-white `#FBFAF7`
- Headings **Plus Jakarta Sans**, body **Inter** (Google Fonts, loaded non-render-blocking)

## Confirm before using as a final client site
1. **Photos** — most gallery images are real Jade project photos; the bathroom card is still marked as a sample until a real photo is available.
2. **License / insurance language** — do not publish license-number or "licensed and insured" claims until Jade confirms the exact wording.
3. **Email** — currently `cortezjade18@gmail.com` (from the business card); confirm before launch.
4. **Reviews** — the Trevor-Tami Kettle review is presented as verified; the other review cards are clearly marked as slots until approved testimonials are added.
5. **Contact form** — the demo validates fields and opens a prefilled email. For a production lead flow, wire it to Formspree, Web3Forms, Vercel Functions, or a CRM.

## Run locally
```bash
# from this folder
python3 -m http.server 8080
# open http://localhost:8080

npm test
npm run build
```

## Deploy (Vercel)
Static site — no build command, output is the repo root. Deploy with the Vercel dashboard/CLI, or push to a
connected Git repo. `vercel.json` adds asset caching + basic security headers.
