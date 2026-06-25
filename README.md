# Jade Remodeling, Inc. — Website Mockup

A modern, mobile-first marketing website for **Jade Remodeling, Inc.** — a family-owned remodeling, repair &
handyman business in **Jacksonville, FL** (owner **Jesse Cortez**). Kitchen & bathroom specialists.

Built as a hand-coded **static site** (HTML + CSS + vanilla JS — no framework, no build step) so it's fast,
cheap to host, and easy to edit.

> **Status: mockup / proposal.** Some content is intentionally a clearly-marked placeholder (see below). Built
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
    hero.svg          # hero background placeholder
    *.svg             # gallery / about placeholders
```

## Brand
- **Green** `#178052` (action / CTAs) · **Indigo** `#3B2F8F` (structure) · warm off-white `#FBFAF7`
- Headings **Plus Jakarta Sans**, body **Inter** (Google Fonts, loaded non-render-blocking)

## ⚠️ Placeholders to replace before going live
1. **Photos** — every image in `assets/img/` except `logo-icon.svg` / `icons.svg` is an on-brand placeholder.
   Drop real job photos in `assets/img/` (keep the same filenames, or update the `src`/`srcset` in the HTML).
   Gallery filenames: `kitchen-before/after`, `bath-before/after`, `g-kitchen`, `g-bath`, `g-tile`,
   `g-exterior`, `g-paint`, `g-handyman`, `about`, `hero`.
2. **License #** — the footer shows `FL License # [add yours]`. Add the real number (or remove if not licensed).
3. **Email** — currently `cortezjade18@gmail.com` (from the business card); confirm before launch.
4. **Reviews** — the lead review (Trevor‑Tami Kettle) is real; the other two are tagged **"Sample"** — replace
   with real reviews or remove.
5. **Contact form** — client-side only (validates + shows a success message). To receive real leads, wire it to
   an email/Form service (e.g. Formspree / Web3Forms) or a small backend.

## Run locally
```bash
# from this folder
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy (Vercel)
Static site — no build command, output is the repo root. Deploy with the Vercel dashboard/CLI, or push to a
connected Git repo. `vercel.json` adds asset caching + basic security headers.
